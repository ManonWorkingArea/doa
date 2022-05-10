
/* thumbs manager */
(function(window){
	
	var FWDEVPVimeoScreen = function(prt, volume){
		
		var _s = this;
		var prototype = FWDEVPVimeoScreen.prototype;
		
		_s.iframe_do = null;
		_s.vimeoPlayer = null;
		
		_s.lastQuality_str = "auto";
		
		_s.volume = volume;
		
		_s.updateVideoId_int;
		_s.updatePreloadId_int;
	
		_s.controllerHeight = prt._d.controllerHeight;
		_s.hasBeenCreatedOnce_bl = true;
		_s.hasHours_bl = false;
		_s.allowScrubing_bl = false;
		_s.hasError_bl = false;
		_s.isPlaying_bl = false;
		_s.isStopped_bl = true;
		_s.isStartEventDispatched_bl = false;
		_s.isSafeToBeControlled_bl = false;
		_s.isPausedInEvent_bl = true;
		_s.isShowed_bl = true;
		_s.isCued_bl = false;
		_s.isVideoLoaded_bl = false;
		_s.isReady_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		
		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
		
			_s.setBackfaceVisibility();
			prt.main_do.addChildAt(_s, 1);
			_s.resizeAndPosition();
			_s.setupVideo();
			_s.setupDisableClick();
			_s.setBkColor("#000000");
		};
	
		
		//#####################################//
		/* Setup disable click */
		//#####################################//
		_s.setupDisableClick = function(){
			_s.disableClick_do = new FWDEVPDisplayObject("div");
			_s.disableClick_do.setBkColor(prt.backgroundColor_str);	
			_s.disableClick_do.setAlpha(0.00000001);
			_s.addChild(_s.disableClick_do);
		};
		
		_s.showDisable = function(){
			if(!prt.tempVidStageWidth || _s.disableClick_do.w == _s.sW) return;
			_s.disableClick_do.setWidth(prt.tempVidStageWidth);
			if(FWDEVPUtils.isIphone){	
				_s.disableClick_do.setHeight(prt.tempVidStageHeight - _s.controllerHeight);
			}else{
				_s.disableClick_do.setHeight(prt.tempVidStageHeight);
			}
		};
		
		_s.hideDisable = function(){
			if(_s.disableClick_do.w == 0) return;
			_s.disableClick_do.setWidth(0);
			_s.disableClick_do.setHeight(0);
		};
	
		//###############################################//
		/* Setup youtube video */
		//##############################################//
		_s.setupVideo = function(){
			if(_s.vimeoPlayer) return;
			_s.iframe_do = new FWDEVPDisplayObject("iframe");
			_s.iframe_do.hasTransform3d_bl = false;
			_s.iframe_do.hasTransform2d_bl = false;
			_s.iframe_do.screen.setAttribute("id", prt.instanceName_str + "vimeo");
			if(_s.isMobile_bl){
				_s.iframe_do.screen.setAttribute("webkitallowfullscreen", "1");
				_s.iframe_do.screen.setAttribute("mozallowfullscreen", "1");
				_s.iframe_do.screen.setAttribute("allowfullscreen", "1");
			}

			_s.iframe_do.screen.setAttribute("allow", "autoplay");
			if(prt._d.autoPlay_bl){
				_s.iframe_do.screen.setAttribute("muted", "1");
			}
			var bk = 0;
			if(prt._d.showDefaultControllerForVimeo_bl && !_s.isMobile_bl) bk = 1;

			var inl = 0;
			if(prt._d.playsinline) inl = 1;
			
			_s.iframe_do.screen.setAttribute("src", "https://player.vimeo.com/video/76979871" + "?player_id=" + prt.instanceName_str + "vimeo&playsinline=" + inl + "&autoplay=0&background=" + bk +"");
		
			_s.iframe_do.getStyle().width = "100%";
			_s.iframe_do.getStyle().height = "100%";
			_s.iframe_do.setBackfaceVisibility();
			_s.addChild(_s.iframe_do);
			
			_s.vimeoPlayer = new Vimeo.Player(_s.iframe_do.screen); 
			_s.vimeoPlayer.on('play', function(_d) {
			
				_s.playHandler();
			});
			
			_s.vimeoPlayer.on('pause', function(_d) {
				_s.pauseHandler();
			});
			
			_s.vimeoPlayer.on('loadProgress', function(_d) {
				_s.loadProgressHandler();
			});
			
			_s.vimeoPlayer.on('ended', function(_d) {
				_s.finishHandler();
			});
			
			_s.vimeoPlayer.on('loaded', function(_d) {
				_s.loadedHandler();
			});
			
			_s.vimeoPlayer.ready().then(function(){
				_s.readyHandler();
			});
			
			_s.blackOverlay_do = new FWDEVPDisplayObject("div");
			_s.blackOverlay_do.getStyle().backgroundColor = "#000000";
			_s.blackOverlay_do.getStyle().width = "100%";
			_s.blackOverlay_do.getStyle().height = "100%";
			_s.addChild(_s.blackOverlay_do);
			
			//_s.setX(-5000);
		};
			
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(){
			if(!prt.tempVidStageWidth) return;
			_s.setWidth(prt.tempVidStageWidth);
			_s.setHeight(prt.tempVidStageHeight);
		};

		
		//##############################################//
		/* Set source and initialize player */
		//##############################################//
		_s.setSource = function(sourcePath){
			if(sourcePath) _s.sourcePath_str = sourcePath;
			_s.stopToUpdateSubtitles();
			_s.stop();
			var videoId = _s.sourcePath_str.match(/[^\/]+$/i);	
		
			_s.vimeoPlayer.loadVideo(videoId).then(function(id) {
				if(!prt.isMobile_bl && (prt._d.autoPlay_bl || prt.isThumbClick_bl) || prt.isAdd_bl || prt.wasAdd_bl){
					prt.play();
				}
				_s.setVolume(prt.volume);
			}).catch(function(error) {
				if(console) console.log(error);
				_s.displayErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDEVPVimeoScreen.ERROR, {text:error});
				} , 2000);
				if(console) console.log(error);
			});
		};
		
		//########################################//
		/* Ready handler */
		//########################################//
		_s.readyHandler = function(){
			
			clearTimeout(_s.intitErrorId_to);
			if(_s.contains(_s.blackOverlay_do)){
				clearTimeout(_s.removeChildWithDelayId_to);
				_s.removeChildWithDelayId_to = setTimeout(function(){
					_s.removeChild(_s.blackOverlay_do);
				}, 1500);
			}
			_s.resizeAndPosition();
			
			
			if(_s.isReady_bl){
				try{
					_s.vimeoPlayer.api("setColor", '#FFFFFF');
				}catch(e){}
				if(prt.videoType_str == FWDEVPlayer.VIMEO) _s.setX(0);
				if(prt._d.autoPlay_bl) prt.play();
			
				return;
			}
			_s.isReady_bl = true;
		
			_s.dispatchEvent(FWDEVPVimeoScreen.READY);
		};
		
		_s.loadedHandler = function(){
			_s.isVideoLoaded_bl = true;
		};
		
		_s.playHandler = function(){
				
			//if(_s.isPlaying_bl ) return;
			//if(!_s.isSafeToBeControlled_bl){
				clearInterval(_s.startToPlayWithDelayId_to);
				clearTimeout(_s.displayErrorId_to);
				_s.isStopped_bl = false;
				_s.isSafeToBeControlled_bl = true;
				_s.isPlaying_bl = true;
				_s.startToUpdateSubtitles();
				_s.startToUpdate();
			
				_s.dispatchEvent(FWDEVPVimeoScreen.SAFE_TO_SCRUBB);
				_s.dispatchEvent(FWDEVPVimeoScreen.PLAY);
				_s.hasHours_bl = Math.floor(_s.getDuration() / (60 * 60)) > 0;
			
				
			//}
			
		};
		
		_s.loadProgressHandler = function(e){
			if(_s.isShowed_bl) return;
			_s.dispatchEvent(FWDEVPVimeoScreen.LOAD_PROGRESS, {percent:e.percent});
		};
		
		_s.pauseHandler = function(){
			if(!_s.isPlaying_bl ) return;
		
			_s.isPlaying_bl = false;
			clearInterval(_s.startToPlayWithDelayId_to);
			_s.dispatchEvent(FWDEVPVimeoScreen.PAUSE);
			_s.stopToUpdate();
		};
		
		_s.finishHandler = function(){
			if(prt._d.loop_bl){
				_s.stop();
				setTimeout(_s.play, 200);
			}
			_s.dispatchEvent(FWDEVPVimeoScreen.PLAY_COMPLETE);
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
			FWDEVPlayer.curInstance = prt;
			var dl = 200;
			//_s.isPlaying_bl = true;
			_s.hasError_bl = false;
			if(prt.prevVideoType_str != FWDEVPlayer.VIMEO) dl = 1000;
			_s.vimeoPlayer.play();
			if(!_s.isMobile_bl) _s.isStopped_bl = false;
			
			
		};

		_s.pause = function(){
			if(_s.isStopped_bl || _s.hasError_bl) return;
			//_s.isPlaying_bl = false;
			clearInterval(_s.startToPlayWithDelayId_to);
			_s.vimeoPlayer.pause();
			_s.stopToUpdate();
		};
		
		_s.togglePlayPause = function(){
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		
		_s.resume = function(){
			if(_s.isStopped_bl) return;
			_s.play();
		};
		
		//###########################################//
		/* Updates ... */
		//###########################################//
		_s.startToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
			_s.updateVideoId_int = setInterval(_s.updateVideo, 500);

		};
		
		_s.stopToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
		};
		
		_s.updateVideo = function(){
		
			var percentPlayed; 
			if(!_s.vimeoPlayer){
				stopToUpdate();
				return;
			}
			
			var totalTime = FWDEVPUtils.formatTime(_s.getDuration());
			var curTime = FWDEVPUtils.formatTime(_s.getCurrentTime());
			
			percentPlayed = _s.getCurrentTime()/_s.getDuration();
			if(isNaN(percentPlayed)) percentPlayed = 0;
			
			_s.dispatchEvent(FWDEVPYoutubeScreen.UPDATE, {percent:percentPlayed});

			_s.dispatchEvent(FWDEVPVimeoScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:_s.getCurrentTime(), totalTimeInSeconds:_s.getCurrentTime()});
		};	
		
		//###########################################//
		/* Event handlers */
		//###########################################//	
		_s.stop = function(addEvents){
			_s.isVideoLoaded_bl = false;
			if(_s.isStopped_bl) return;
			
			clearInterval(_s.startToPlayWithDelayId_to);
			clearTimeout(_s.displayErrorId_to);
			//if(logger) logger.log("# VIMEO stop #" + prt.instanceName_str);
			_s.stopVideo();
			_s.stopToUpdateSubtitles();
			
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.isCued_bl = false;
			_s.allowScrubing_bl = false;
			_s.isSafeToBeControlled_bl = false;
			_s.isPausedInEvent_bl = true;
			
			_s.stopToUpdate();
			if(!addEvents){
				_s.stopVideo();
				_s.dispatchEvent(FWDEVPVimeoScreen.STOP);
				//_s.dispatchEvent(FWDEVPVimeoScreen.LOAD_PROGRESS, {percent:0});
				//_s.dispatchEvent(FWDEVPVimeoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			}
			
		};
		
		_s.destroy = function(){
			if(_s.iframe_do){
				_s.iframe_do.screen.removeAttribute("id", prt.instanceName_str + "vimeo");
				_s.removeChild(_s.iframe_do);
				_s.iframe_do.destroy();
				_s.iframe_do = null;
			}
			_s.vimeoPlayer = null;
		};
		
		_s.stopVideo = function(){
			_s.vimeoPlayer.unload().then(function() {
				// the video was unloaded
			}).catch(function(error) {
				// an error occurred
			});
			//_s.setSource(_s.sourcePath_str);
		};
		

		//########################################//
		/* Various Vimeo API methods */
		//########################################//
		_s.startToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			//if(!_s.isSafeToBeControlled_bl) return;
		
			_s.vimeoPlayer.setCurrentTime(duration).then(function(seconds) {
				// seconds = the actual time that the player seeked to
			})
		}
		
		_s.scrub = function(percent){
			
			if(!_s.isSafeToBeControlled_bl) return;
		
			_s.vimeoPlayer.setCurrentTime(percent * _s.getDuration()).then(function(seconds) {
				// seconds = the actual time that the player seeked to
			})
		};
	
		_s.setVolume = function(vol){
			if(vol != undefined) _s.volume = vol;
			if(_s.vimeoPlayer){
				_s.vimeoPlayer.setVolume(vol);
				if(vol) _s.iframe_do.screen.removeAttribute("muted");
			} 
		};
		
		
		_s.getDuration = function(){
			if(!_s.isSafeToBeControlled_bl) return;
				_s.vimeoPlayer.getDuration().then(function(duration) {
				_s.duration = Math.round(duration);
            });
			return _s.duration;
		};
		
		_s.getCurrentTime = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.vimeoPlayer.getCurrentTime().then(function(time) {
               _s.currentTime = Math.round(time);
            });
			
			return _s.currentTime;
		};

	
		//##################################################//
		/* Suntitles */
		//##################################################//
		_s.stopToUpdateSubtitles = function(){
			clearInterval(_s.startToUpdateSubtitleId_int);	
		}
		
		_s.startToUpdateSubtitles = function(){
			clearInterval(_s.startToUpdateSubtitleId_int);
			_s.startToUpdateSubtitleId_int = setInterval(_s.updateSubtitleHandler, 10);
		}
		
		_s.updateSubtitleHandler = function(){
			if(!_s.getCurrentTime()) return;
			_s.dispatchEvent(FWDEVPVimeoScreen.UPDATE_SUBTITLE, {curTime:_s.getCurrentTime()});
		}
		
	
		_s.init();
	};

	/* set prototype */
	FWDEVPVimeoScreen.setPrototype = function(){
		FWDEVPVimeoScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPVimeoScreen.UPDATE_SUBTITLE = "updateSubtitle";
	FWDEVPVimeoScreen.SAFE_TO_SCRUBB = "safeToScrub";
	FWDEVPVimeoScreen.READY = "ready";
	FWDEVPVimeoScreen.ERROR = "initError";
	FWDEVPVimeoScreen.UPDATE = "update";
	FWDEVPVimeoScreen.UPDATE_TIME = "updateTime";
	FWDEVPVimeoScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPVimeoScreen.PLAY = "play";
	FWDEVPVimeoScreen.PAUSE = "pause";
	FWDEVPVimeoScreen.STOP = "stop";
	FWDEVPVimeoScreen.PLAY_COMPLETE = "playComplete";
	FWDEVPVimeoScreen.CUED = "cued";
	FWDEVPVimeoScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDEVPVimeoScreen = FWDEVPVimeoScreen;

}(window));