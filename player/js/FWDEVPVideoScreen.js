/* thumbs manager */
(function(window){
	
	var FWDEVPVideoScreen = function(prt, backgroundColor_str, volume){
		
		var _s = this;
		var prototype = FWDEVPVideoScreen.prototype;
	
		_s.video_el = null;
	
		_s.sourcePath_str = null;
		
		_s.backgroundColor_str = backgroundColor_str;
		
		_s.controllerHeight = prt._d.controllerHeight;
		_s.sW = 0;
		_s.sH = 0;
		_s.lastPercentPlayed = 0;
		_s.volume = volume;
		_s.curDuration = 0;
		_s.countNormalMp3Errors = 0;
		_s.countShoutCastErrors = 0;
		_s.maxShoutCastCountErrors = 5;
		_s.maxNormalCountErrors = 1;
		
		_s.disableClickForAWhileId_to;
		
		_s.greenScreenTolerance = prt._d.greenScreenTolerance;
		
		_s.disableClick_bl = false;
		_s.allowScrubing_bl = false;
		_s.hasError_bl = true;
		_s.isPlaying_bl = false;
		_s.isStopped_bl = true;
		_s.hasPlayedOnce_bl = false;
		_s.isStartEventDispatched_bl = false;
		_s.isSafeToBeControlled_bl = false;
		_s.hastStaredToPlayHLS_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.setupVideo();
			_s.setBkColor(_s.backgroundColor_str);
			_s.getStyle().width = '100%';
			_s.getStyle().height = '100%';
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		_s.setupVideo = function(){
			if(_s.video_el == null){
				_s.video_el = document.createElement("video");
				_s.screen.className = 'video-screen-holder';
				_s.screen.appendChild(_s.video_el);
				_s.video_el.controls = false;
				
				_s.video_el.volume = _s.volume;
				if(prt.displayType == FWDEVPlayer.BACKGROUND_VIDEO || prt._d.autoPlay_bl){
					_s.video_el.muted = true;
				}
				
				if(prt._d.playsinline){
					_s.video_el.WebKitPlaysInline = true;
					_s.video_el.playsinline = true;
					_s.video_el.setAttribute("playsinline", "");
					_s.video_el.setAttribute("webkit-playsinline", "");
				}
				_s.video_el.style.position = "relative";
				_s.video_el.style.left = "0px";
				_s.video_el.style.top = "0px";
				_s.video_el.style.width = "100%";
				_s.video_el.style.height = "100%";
				_s.video_el.style.margin = "0px";
				_s.video_el.style.padding = "0px";
				_s.video_el.style.maxWidth = "none";
				_s.video_el.style.maxHeight = "none";
				_s.video_el.style.border = "none";
				_s.video_el.style.lineHeight = "0";
				_s.video_el.style.msTouchAction = "none";
				if(prt.isAdd_bl){
					_s.setPlaybackRate(1);
				}else{
					_s.setPlaybackRate(prt._d.defaultPlaybackRate_ar[prt._d.startAtPlaybackIndex]);
				}
				
				
				_s.screen.appendChild(_s.video_el);
			}
			
			_s.video_el.addEventListener("error", _s.errorHandler);
			
			_s.video_el.addEventListener("progress", _s.updateProgress);
			_s.video_el.addEventListener("timeupdate", _s.updateVideo);
			_s.video_el.addEventListener("pause", _s.pauseHandler);
			_s.video_el.addEventListener("play", _s.playHandler);
			if(!FWDEVPUtils.isIE){
				_s.video_el.addEventListener("waiting", _s.startToBuffer);
			}
			_s.video_el.addEventListener("playing", _s.stopToBuffer);
			_s.video_el.addEventListener("ended", _s.endedHandler);
			
		};	
		
		_s.destroyVideo = function(){
			if(_s.video_el){
				_s.video_el.removeEventListener("error", _s.errorHandler);
				
				_s.video_el.removeEventListener("progress", _s.updateProgress);
				_s.video_el.removeEventListener("timeupdate", _s.updateVideo);
				_s.stopToUpdateSubtitles();
				_s.video_el.removeEventListener("pause", _s.pauseHandler);
				_s.video_el.removeEventListener("play", _s.playHandler);
				if(!FWDEVPUtils.isIE){
					_s.video_el.removeEventListener("waiting", _s.startToBuffer);
				}
				_s.video_el.removeEventListener("playing", _s.stopToBuffer);
				_s.video_el.removeEventListener("ended", _s.endedHandler);
				
				_s.video_el.style.visibility = "hidden";
				_s.video_el.src = "";
				_s.video_el.load();
			}
		};
		
		_s.startToBuffer = function(overwrite){
			_s.dispatchEvent(FWDEVPVideoScreen.START_TO_BUFFER);
		};
		
		_s.stopToBuffer = function(){
			_s.dispatchEvent(FWDEVPVideoScreen.STOP_TO_BUFFER);
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		_s.errorHandler = function(e){
			if(prt.videoType_str != FWDEVPlayer.VIDEO) return
			var error_str;
			_s.hasError_bl = true;
			
			if(_s.video_el.networkState == 0){
				error_str = "error '_s.video_el.networkState = 0'";
			}else if(_s.video_el.networkState == 1){
				error_str = "error '_s.video_el.networkState = 1'";
			}else if(_s.video_el.networkState == 3){
				//error_str = "source not found <font color='#FF0000'>" + _s.sourcePath_str + "</font>";
				error_str = "source not found";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(_s.video_el.networkState);
			_s.dispatchEvent(FWDEVPVideoScreen.ERROR, {text:error_str });
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(width, height){
			if(width){
				_s.sW = width;
				_s.sH = height;
			}
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.video_el.style.width = '100%';
			if(prt.is360 && _s.renderer){
				_s.camera.aspect = _s.sW / _s.sH;
				_s.camera.updateProjectionMatrix();
				_s.renderer.setSize(_s.sW, _s.sH);
			}
			_s.resizeGR();
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			
			_s.stopToUpdateSubtitles();
			if(prt.is360 || prt.isGR && _s.video_el){
				_s.video_el.style.visibility = "hidden";
			}
			_s.sourcePath_str = sourcePath;
			
			if(_s.video_el) _s.stop();
			_s.initVideo();
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite, reHLS){
			FWDEVPlayer.curInstance = prt;
			if(_s.isStopped_bl && prt.videoType_str != FWDEVPlayer.HLS_JS || reHLS){
				_s.initVideo();
				_s.play();
				_s.isPlaying_bl = true;
				_s.hastStaredToPlayHLS_bl = true;
				_s.startToBuffer(true);
			}else if(!_s.video_el.ended || overwrite){
				try{
					_s.hasError_bl = false;
					_s.isStopped_bl = false;
					_s.isPlaying_bl = true;
					_s.hasPlayedOnce_bl = true;
					_s.hastStaredToPlayHLS_bl = true;
					_s.video_el.play();
					_s.setVolume();
					if(FWDEVPUtils.isIE) _s.dispatchEvent(FWDEVPVideoScreen.PLAY);
				}catch(e){};
			}
			
			if(prt.is360){
				_s.add360Vid();
			}else if(prt.isGR){
				_s.addGreenScreen();
			}
		};
		
		_s.initVideo = function(){
			
			_s.isPlaying_bl = false;
			_s.hasError_bl = false;
			_s.allowScrubing_bl = false;
			_s.isStopped_bl = false;
			_s.setupVideo();
			_s.setVolume();
			_s.video_el.src = _s.sourcePath_str;

			if(!_s.isMobile_bl){
				FWDAnimation.killTweensOf(_s);
				_s.setAlpha(0);
				FWDAnimation.to(_s, .6, {alpha:1, delay:.4});	
				
			}
		}

		_s.pause = function(){
			if(_s == null || _s.isStopped_bl || _s.hasError_bl) return;
			if(!_s.video_el.ended){
				try{
					_s.video_el.pause();
					_s.isPlaying_bl = false;
					if(FWDEVPUtils.isIE) _s.dispatchEvent(FWDEVPVideoScreen.PAUSE);
				}catch(e){};
			}
		};
		
		_s.togglePlayPause = function(){
			if(_s == null) return;
			if(!_s.isSafeToBeControlled_bl) return;
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		
		_s.pauseHandler = function(){
			if(_s.allowScrubing_bl) return;
			//_s.stop360Render();
			_s.stopGRRender();
			_s.dispatchEvent(FWDEVPVideoScreen.PAUSE);
		};
		
		_s.playHandler = function(){
			if(_s.allowScrubing_bl) return;
			_s.hastStaredToPlayHLS_bl = true;
			_s.startToUpdateSubtitles();
			if(!_s.isStartEventDispatched_bl){
				_s.dispatchEvent(FWDEVPVideoScreen.START);
				_s.isStartEventDispatched_bl = true;
			}
			if(prt.is360){
				_s.start360Render();
			}else if(prt.isGR){
				_s.startGRRender();
			}
			_s.dispatchEvent(FWDEVPVideoScreen.PLAY);
		};
		
		_s.endedHandler = function(){
			_s.stopToUpdateSubtitles();
			_s.dispatchEvent(FWDEVPVideoScreen.PLAY_COMPLETE);
		};
		
		_s.resume = function(){
			if(_s.isStopped_bl) return;
			_s.play();
		};
		
		_s.stop = function(overwrite){
			if((_s == null || _s.video_el == null || _s.isStopped_bl) && !overwrite) return;
			
			//logger.log("# VID stop #" + prt.instanceName_str);
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.hastStaredToPlayHLS_bl = false;
			_s.hasPlayedOnce_bl = true;
			_s.isSafeToBeControlled_bl = false;
			_s.isStartEventDispatched_bl = false;
			_s.stopToUpdateSubtitles();
			_s.stop360Render();
			_s.stopGRRender();
			
			if(_s.contextGR2){
				_s.contextGR2.save();
				_s.contextGR2.globalCompositeOperation = 'copy';
				_s.contextGR2.fillStyle = 'rgba(0,0,0,0)';
				//draw shape to cover up stuff underneath
				_s.contextGR2.fill();
				_s.contextGR2.restore();
			}
			if(_s.contains(_s.canvasGR2)) _s.removeChild(_s.canvasGR2);
			_s.destroyVideo();
			_s.dispatchEvent(FWDEVPVideoScreen.LOAD_PROGRESS, {percent:0});
			_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			_s.dispatchEvent(FWDEVPVideoScreen.STOP);
			_s.stopToBuffer();
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		_s.safeToBeControlled = function(){
			
			if(prt.videoType_str == FWDEVPlayer.HLS_JS && !_s.hastStaredToPlayHLS_bl) return;
			if(!_s.isSafeToBeControlled_bl){
				prt.resizeHandler();
				_s.stopToScrub();
				_s.hasHours_bl = Math.floor(_s.video_el.duration / (60 * 60)) > 0;
				_s.isPlaying_bl = true;
				_s.isSafeToBeControlled_bl = true;
				if(!prt.is360 && !prt.isGR) _s.video_el.style.visibility = "visible";
				_s.dispatchEvent(FWDEVPVideoScreen.SAFE_TO_SCRUBB);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		_s.updateProgress = function(){
			if(prt.videoType_str == FWDEVPlayer.HLS_JS && !_s.hastStaredToPlayHLS_bl) return;
			var buffered;
			var percentLoaded = 0;
			
			if(_s.video_el.buffered.length > 0){
				buffered = _s.video_el.buffered.end(_s.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/_s.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) _s.video_el.removeEventListener("progress", _s.updateProgress);
			
			_s.dispatchEvent(FWDEVPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		_s.updateVideo = function(){
			var percentPlayed; 
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.video_el.currentTime /_s.video_el.duration;
				_s.dispatchEvent(FWDEVPVideoScreen.UPDATE, {percent:percentPlayed});
			}
			
			if(_s.video_el.currentTime && _s.video_el.currentTime >= 0.1) _s.safeToBeControlled();
		
			var totalTime = FWDEVPUtils.formatTime(_s.video_el.duration);
			var curTime = FWDEVPUtils.formatTime(_s.video_el.currentTime);
			
			if(!isNaN(_s.video_el.duration)){
				_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:Math.round(_s.video_el.currentTime), totalTimeInSeconds:Math.round(_s.video_el.duration)});
			}else{
				_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
			}
			
			_s.lastPercentPlayed = percentPlayed;
			_s.curDuration = curTime;
		};
		
		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			_s.video_el.currentTime = duration;
			var totalTime = FWDEVPUtils.formatTime(_s.video_el.duration);
			var curTime = FWDEVPUtils.formatTime(_s.video_el.currentTime);
			_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
		}
		
		_s.scrub = function(percent, e){
			//if(!_s.allowScrubing_bl) return;
			if(e) _s.startToScrub();
			try{
				_s.video_el.currentTime = _s.video_el.duration * percent;
				var totalTime = FWDEVPUtils.formatTime(Math.round(_s.video_el.duration));
				var curTime = FWDEVPUtils.formatTime(Math.round(_s.video_el.currentTime));
				_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		_s.replay = function(){
			_s.scrub(0);
			_s.play();
		};
		
		
		_s.setPlaybackRate = function(rate){
			if(!_s.video_el) return;
			_s.video_el.defaultPlaybackRate = rate;
			_s.video_el.playbackRate = rate;
		}
		
		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			if(vol !=  undefined) _s.volume = vol;
			if(_s.video_el){
				_s.video_el.volume = _s.volume;
				if(vol) _s.video_el.muted = false;
			}
		};
		
		
		//##################################################//
		/* Subtitles */
		//##################################################//
		_s.stopToUpdateSubtitles = function(){
			clearInterval(_s.startToUpdateSubtitleId_int);	
		}
		
		_s.startToUpdateSubtitles = function(){
			clearInterval(_s.startToUpdateSubtitleId_int);
			_s.startToUpdateSubtitleId_int = setInterval(_s.updateSubtitleHandler, 10);
		}
		
		_s.updateSubtitleHandler = function(){
			_s.dispatchEvent(FWDEVPVideoScreen.UPDATE_SUBTITLE, {curTime:_s.video_el.currentTime});
		}
		
		//###############################################//
		/* Setup green screen */
		//###############################################//
		_s.addGreenScreen = function(){
			if(!_s.canvasGR2){
				_s.canvasGR1 = new FWDEVPDisplayObject('canvas');
				_s.contextGR1 = _s.canvasGR1.screen.getContext('2d');
				_s.canvasGR2 = new FWDEVPDisplayObject('canvas');
				_s.contextGR2 = _s.canvasGR2.screen.getContext('2d');
			}
			//_s.addChild(_s.canvasGR2);
			_s.video_el.style.visibility = "hidden";
			_s.renderFR();
		}
		
		_s.startGRRender = function(){
			_s.isGRRendering_bl = true;
			if(FWDEVPUtils.isLocal) return;
			if(!_s.contains(_s.canvasGR2)) _s.addChild(_s.canvasGR2);
			cancelAnimationFrame(_s.requestId);
			_s.requestId = requestAnimationFrame(_s.renderFR);
		}
		
		_s.stopGRRender = function(){
			_s.isGRRendering_bl = false;
			cancelAnimationFrame(_s.requestId);
			
		}
		
		_s.renderFR = function(){
			if(FWDEVPUtils.isLocal) return;
			if(_s.isGRRendering_bl) cancelAnimationFrame(_s.requestId);
			
			if(_s.contextGR1){
				if(_s.video_el.videoWidth != 0 && _s.prevCurCavasGRWidth != _s.video_el.videoWidth){
					_s.canvasGR1.screen.width = _s.video_el.videoWidth;
					_s.canvasGR1.screen.height = _s.video_el.videoHeight;
					_s.canvasGR2.screen.width = _s.video_el.videoWidth;
					_s.canvasGR2.screen.height = _s.video_el.videoHeight;
				}
				_s.prevCurCavasGRWidth = _s.video_el.videoWidth;
				
				_s.contextGR1.drawImage(_s.video_el, 0, 0, _s.canvasGR1.screen.width, _s.canvasGR1.screen.height);
				var imageData = _s.contextGR1.getImageData(0, 0,  _s.canvasGR1.screen.width, _s.canvasGR1.screen.height);
				var _d = imageData.data;
				
				// iterate over all pixels
				for(var i = 0, n = _d.length; i < n; i += 4) {
				var diff = Math.abs(_d[i] - _d[0]) + Math.abs(_d[i+1] - _d[1]) + Math.abs(_d[i+2] - _d[2]);
					if(diff < _s.greenScreenTolerance) {
						_d[i + 3] = 0;
					}
				}
				_s.contextGR2.putImageData(imageData, 0, 0);
			}
			
			_s.resizeGR();
			
			_s.requestId = requestAnimationFrame(_s.renderFR);
		}
		
		_s.resizeGR =  function(){
			if(prt.isGR && _s.canvasGR2){
				_s.canvasGR2.setWidth(_s.sW);
				//_s.canvasGR2.setHeight(_s.sH);
				_s.canvasGR2.setX(Math.round((prt.sW - _s.sW)/2));
				_s.canvasGR2.setY(Math.round((prt.sH - _s.canvasGR2.getHeight())/2));
			}
		}
			
		
		//###############################################//
		/* Setup 360 vid */
		//###############################################//
		_s.add360Vid = function(){
			if(_s.renderer){
				_s.screen.appendChild(_s.renderer.domElement);
				return;
			}
			
			_s.renderer = new THREE.WebGLRenderer({ antialias: true });
			_s.renderer.setSize(_s.sW, _s.sH);
			_s.renderer.domElement.style.position = "absolute";
			_s.renderer.domElement.style.left = "0px";
			_s.renderer.domElement.style.top = "0px";
			_s.renderer.domElement.style.margin = "0px";
			_s.renderer.domElement.style.padding = "0px";
			_s.renderer.domElement.style.maxWidth = "none";
			_s.renderer.domElement.style.maxHeight = "none";
			_s.renderer.domElement.style.border = "none";
			_s.renderer.domElement.style.lineHeight = "1";
			_s.renderer.domElement.style.backgroundColor = "transparent";
			_s.renderer.domElement.style.backfaceVisibility = "hidden";
			_s.renderer.domElement.style.webkitBackfaceVisibility = "hidden";
			_s.renderer.domElement.style.MozBackfaceVisibility = "hidden";	
			_s.renderer.domElement.style.MozImageRendering = "optimizeSpeed";	
			_s.renderer.domElement.style.WebkitImageRendering = "optimizeSpeed";
			_s.screen.appendChild(_s.renderer.domElement);
			
			_s.scene = new THREE.Scene();
			
			_s.video_el.setAttribute('crossorigin', 'anonymous');
			
			_s.canvas = document.createElement('canvas');
			_s.context = _s.canvas.getContext('2d');
			//document.documentElement.appendChild(_s.canvas);
			
			if(FWDEVPUtils.isFirefox){
				_s.videoTexture = new THREE.Texture(_s.video_el);
			}else{
				_s.videoTexture = new THREE.Texture(_s.canvas);
			}
			
			_s.videoTexture.minFilter = THREE.LinearFilter;
			_s.videoTexture.magFilter = THREE.LinearFilter;
			_s.videoTexture.format = THREE.RGBFormat;

			_s.cubeGeometry = new THREE.SphereGeometry(500, 60, 40);
			_s.sphereMat = new THREE.MeshBasicMaterial({map: _s.videoTexture});
			_s.sphereMat.side = THREE.BackSide;
			_s.cube = new THREE.Mesh(_s.cubeGeometry, _s.sphereMat);
			_s.scene.add(_s.cube);

			_s.camera = new THREE.PerspectiveCamera(45, _s.sW / _s.sH, 0.1, 10000);
			_s.camera.position.y = 0;
			_s.camera.position.z = 500;
			_s.camera.position.x = 0;

			_s.scene.add(_s.camera);
			
			_s.controls = new THREE.OrbitControls(_s.camera, prt.dClk_do.screen);
			_s.controls.enableDamping = true;
			_s.controls.enableZoom = true; 
			_s.controls.dampingFactor = 0.25;
			_s.controls.maxDistance = 500;
			_s.controls.minDistance = 500;
			_s.controls.maxAzimuthAngle = Infinity;
			_s.controls.rotateLeft(90 * Math.PI/180);
			
			_s.controls.enabled=true;
			_s.render();
		}
		
		_s.start360Render = function(){
			_s.is360Rendering_bl = true;
			cancelAnimationFrame(_s.requestId);
			_s.requestId = requestAnimationFrame(_s.render);
		}
		
		_s.stop360Render = function(){
			_s.is360Rendering_bl = false;
			if(!_s.camera) return;
			_s.camera.position.y = 0;
			_s.camera.position.z = 500;
			_s.camera.position.x = 0;
			cancelAnimationFrame(_s.requestId);
			try{
				_s.screen.removeChild(_s.renderer.domElement);
			}catch(e){};
		}
		
		_s.render = function(){
			if(!_s.camera) return;
			if(_s.is360Rendering_bl) cancelAnimationFrame(_s.requestId);
			if( _s.video_el.readyState === _s.video_el.HAVE_ENOUGH_DATA ){
				_s.videoTexture.needsUpdate = true;
			}
			
			if(!FWDEVPUtils.isFirefox && _s.context){
				if(_s.video_el.videoWidth != 0){
					_s.canvas.width = _s.video_el.videoWidth;
					_s.canvas.height = _s.video_el.videoHeight;
				}
				_s.context.save();
				_s.context.scale(-1,1);
				_s.context.drawImage(_s.video_el,0,0,_s.canvas.width * -1,_s.canvas.height);
				_s.context.restore();
			}
		
			_s.controls.update();
			_s.renderer.render(_s.scene, _s.camera);
			_s.requestId = requestAnimationFrame(_s.render);
		}
	
		_s.init();
	};

	/* set prototype */
	FWDEVPVideoScreen.setPrototype = function(){
		FWDEVPVideoScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPVideoScreen.UPDATE_SUBTITLE = "updateSubtitle";
	FWDEVPVideoScreen.ERROR = "error";
	FWDEVPVideoScreen.UPDATE = "update";
	FWDEVPVideoScreen.UPDATE_TIME = "updateTime";
	FWDEVPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDEVPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPVideoScreen.START = "start";
	FWDEVPVideoScreen.PLAY = "play";
	FWDEVPVideoScreen.PAUSE = "pause";
	FWDEVPVideoScreen.STOP = "stop";
	FWDEVPVideoScreen.PLAY_COMPLETE = "playCompvare";
	FWDEVPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDEVPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDEVPVideoScreen = FWDEVPVideoScreen;

}(window));