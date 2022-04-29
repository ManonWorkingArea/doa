/* thumbs manager */
(function(window){
	
	var FWDEVPYoutubeScreen = function(prt, volume){
		
		var _s = this;
		var prototype = FWDEVPYoutubeScreen.prototype;
		
		_s.main_do = null;
		_s.ytb = null;
		
		_s.lastQuality_str = "auto";
		
		_s.volume = volume;
		
		_s.updateVideoId_int;
		_s.updatePreloadId_int;
		
		_s.controllerHeight = prt._d.controllerHeight;
		_s.hasHours_bl = false;
		_s.hasBeenCreatedOnce_bl = false;
		_s.allowScrubing_bl = false;
		_s.hasError_bl = false;
		_s.isPlaying_bl = false;
		_s.isStopped_bl = true;
		_s.isStartEventDispatched_bl = false;
		_s.isSafeToBeControlled_bl = false;
		_s.isPausedInEvent_bl = true;
		_s.isShowed_bl = true;
		_s.isCued_bl = false;
		_s.playsinline = prt._d.playsinline ? 1 : 0;
		_s.isQualityArrayDisapatched_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
			_s.setBackfaceVisibility();
			prt.main_do.addChildAt(_s, 0);
			_s.resizeAndPosition();
			_s.setupVideo();
			_s.setupDisableClick();
			_s.setWidth(1);
			_s.setHeight(1);
		};
		
		//#####################################//
		/* Setup disable click */
		//#####################################//
		_s.setupDisableClick = function(){
			_s.disableClick_do = new FWDEVPDisplayObject("div");
			//_s.disableClick_do.setBkColor(prt.backgroundColor_str);
			_s.addChild(_s.disableClick_do);
		};
		
		_s.showDisable = function(){
			if(!prt.tempVidStageWidth || _s.disableClick_do.w == _s.sW){
				return;
			}
			
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
			if(_s.ytb) return;
			
			_s.main_do = new FWDEVPDisplayObject("div");
			_s.main_do.hasTransform3d_bl = false;
			_s.main_do.hasTransform2d_bl = false;
			_s.main_do.screen.setAttribute("id", prt.instanceName_str + "youtube");
			_s.main_do.getStyle().width = "100%";
			_s.main_do.getStyle().height = "100%";
			_s.main_do.setBackfaceVisibility();
			_s.addChild(_s.main_do);
			_s.ytb = new YT.Player(prt.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0,
					playsinline:_s.playsinline
			  	},
			  	events: {
			  		"onReady":_s.playerReadyHandler,
			  		"onError":_s.playerErrorHandler,
			  		"onStateChange":_s.stateChangeHandler,
			  		"onPlaybackQualityChange":_s.qualityChangeHandler
			  	}
		    });
		};
		
		_s.playerReadyHandler = function(){
			
			if(_s.ytb && !_s.ytb.playVideo && !_s.ytb.cueVideoById){
				_s.updateReadyId_int = setInterval(function(){
					_s.playerReadyHandler();
				}, 50);
				return;
			}else{
				clearInterval(_s.updateReadyId_int);
			}
			
			if(prt._d.autoPlay_bl){
				 _s.ytb.mute();
			}
			
			_s.resizeAndPosition();

			_s.dispatchEvent(FWDEVPYoutubeScreen.READY);
			_s.hasBeenCreatedOnce_bl = true;
			
		};
		
		_s.stateChangeHandler = function(e){
			//if(logger) logger.log(e.data + " " + prt.instanceName_str + " " + _s.isCued_bl)
			/*
			if(e.data == -1 && _s.isCued_bl && _s.isMobile_bl){
				
				if(_s.isStopped_bl){
					_s.isStopped_bl = false;
				}
				FWDEVPlayer.stopAllVideos(prt);
			}'*/
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!_s.isSafeToBeControlled_bl){
					_s.isStopped_bl = false;
					
					_s.isSafeToBeControlled_bl = true;
					
					_s.isPlaying_bl = true;
					_s.hasHours_bl = Math.floor(_s.ytb.getDuration() / (60 * 60)) > 0;
					_s.startToUpdate();
					_s.startToPreload();
					if(!_s.isMobile_bl) _s.ytb.seekTo(0.000001);
					if(!_s.isMobile_bl) _s.setQuality(_s.lastQuality_str);
					
					if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
						_s.dispatchEvent(FWDEVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality(), levels:_s.ytb.getAvailableQualityLevels()});
					}
					_s.setPlaybackRate();
				    _s.dispatchEvent(FWDEVPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				
				_s.startToUpdateSubtitles();
				if(_s.isPausedInEvent_bl) _s.dispatchEvent(FWDEVPYoutubeScreen.PLAY);
				_s.isPausedInEvent_bl = false;
				_s.hasError_bl = false;
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!_s.isSafeToBeControlled_bl) return;
				//_s.isStopped_bl = false;
				if(!_s.isPausedInEvent_bl) _s.dispatchEvent(FWDEVPYoutubeScreen.PAUSE);
				_s.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(_s.ytb.getCurrentTime() && _s.ytb.getCurrentTime() > 0 && _s.isSafeToBeControlled_bl){
					//_s.isStopped_bl = false;
					_s.stopToUpdateSubtitles();
					setTimeout(function(){_s.dispatchEvent(FWDEVPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!_s.isStopped_bl){
					_s.setVolume(prt.volume);
					_s.dispatchEvent(FWDEVPYoutubeScreen.CUED);
				}
				_s.isCued_bl = true;
			}
			
		};
		
		_s.qualityChangeHandler = function(e){
			if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
				_s.dispatchEvent(FWDEVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality()});
			}
		};
		
		_s.playerErrorHandler = function(e){
			_s.isPausedInEvent_bl = true;
			
			if(_s.isStopped_bl || _s.hasError_bl || !_s.sourcePath_str) return;
			
			var error_str = "";
			_s.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			
			_s.dispatchEvent(FWDEVPYoutubeScreen.ERROR, {text:error_str});
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(){
			if(!prt.tempVidStageWidth) return;
			_s.setX(-1);
			_s.setY(-1);
			_s.setWidth(prt.tempVidStageWidth + 2);
			_s.setHeight(prt.tempVidStageHeight + 2);
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			
			if(sourcePath) _s.sourcePath_str = sourcePath;
			_s.ytb.cueVideoById(_s.sourcePath_str);
			_s.isStopped_bl = false;
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
			FWDEVPlayer.curInstance = prt;
			_s.isPlaying_bl = true;
			_s.hasError_bl = false;
			
			_s.ytb.playVideo();
			_s.startToUpdate();
			if(!_s.isMobile_bl || prt._d.autoPlay_bl) _s.isStopped_bl = false;
		};

		_s.pause = function(){
			if(_s.isStopped_bl || _s.hasError_bl) return;
			_s.isPlaying_bl = false;
			try{
				_s.ytb.pauseVideo();
			}catch(e){}
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
			if(!_s.ytb){
				stopToUpdate();
				return;
			}
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.ytb.getCurrentTime() /_s.ytb.getDuration();
				_s.dispatchEvent(FWDEVPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = FWDEVPUtils.formatTime(_s.ytb.getDuration());
			var curTime = FWDEVPUtils.formatTime(_s.ytb.getCurrentTime());
			
			_s.dispatchEvent(FWDEVPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:_s.ytb.getCurrentTime(), totalTimeInSeconds:_s.ytb.getDuration()});
		};
		
		_s.startToPreload = function(){
			clearInterval(_s.preloadVideoId_int);
			_s.updatePreloadId_int = setInterval(_s.updateProgress, 500);
		};
		
		_s.stopToPreload = function(){
			clearInterval(_s.updatePreloadId_int);
		};
		
		_s.updateProgress = function(){
			if(!_s.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = _s.ytb.getVideoLoadedFraction();
			
			_s.dispatchEvent(FWDEVPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//###########################################//
		/* Event handlers */
		//###########################################//	
		_s.stop = function(){
			if(_s.isStopped_bl) return;
			//if(logger) logger.log("# YTB stop #" + prt.instanceName_str);
			
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.isCued_bl = false;
			_s.allowScrubing_bl = false;
			_s.isSafeToBeControlled_bl = false;
			_s.isQualityArrayDisapatched_bl = false;
			_s.isPausedInEvent_bl = true;
			clearInterval(_s.updateReadyId_int);
			_s.stopToUpdateSubtitles();
			_s.stopToUpdate();
			_s.stopToPreload();
			_s.stopVideo();
			_s.dispatchEvent(FWDEVPYoutubeScreen.STOP);
			_s.dispatchEvent(FWDEVPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			_s.dispatchEvent(FWDEVPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		_s.destroyYoutube = function(){
			
			if(_s.main_do){
				_s.main_do.screen.removeAttribute("id", prt.instanceName_str + "youtube");
				_s.main_do.destroy();
				_s.main_do = null;
			}
			if(_s.ytb) _s.ytb.destroy();
			_s.ytb = null;
		};
		
		_s.stopVideo = function(){
			//if(!_s.isMobile_bl) 
			if(_s.ytb && _s.ytb.cueVideoById) _s.ytb.cueVideoById(_s.sourcePath_str);
			//_s.ytb.seekTo(0);
			//_s.ytb.clearVideo();
			//_s.ytb.stopVideo();
		};

		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = true;
		};
		
		_s.scrubbAtTime = function(duration){
			if(!_s.isSafeToBeControlled_bl) return;
			
			_s.ytb.seekTo(duration);
		}
		
		_s.stopToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = false;
		};
		
		_s.scrub = function(percent){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.ytb.seekTo(percent * _s.ytb.getDuration());
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.ytb || _s.isMobile_bl) return;
			if(rate) _s.rate = rate;
			if(_s.ytb && _s.ytb.setPlaybackRate) _s.ytb.setPlaybackRate(_s.rate);
		};
	
		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			if(vol != undefined) _s.volume = vol;
			if(_s.ytb){
				_s.ytb.setVolume(vol * 100);
				if(vol) _s.ytb.unMute();
			}
			
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
			
			_s.dispatchEvent(FWDEVPYoutubeScreen.UPDATE_SUBTITLE, {curTime:_s.ytb.getCurrentTime()});
		}
		
		//###############################################//
		/* set quality */
		//###############################################//
		_s.setQuality = function(quality){
		
			_s.lastQuality_str = quality;
			_s.ytb.setPlaybackQuality(quality);
		};
		
	
		_s.init();
	};

	/* set prototype */
	FWDEVPYoutubeScreen.setPrototype = function(){
		FWDEVPYoutubeScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPYoutubeScreen.UPDATE_SUBTITLE = "updateSubtitle";
	FWDEVPYoutubeScreen.READY = "ready";
	FWDEVPYoutubeScreen.ERROR = "error";
	FWDEVPYoutubeScreen.UPDATE = "update";
	FWDEVPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDEVPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDEVPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPYoutubeScreen.PLAY = "play";
	FWDEVPYoutubeScreen.PAUSE = "pause";
	FWDEVPYoutubeScreen.STOP = "stop";
	FWDEVPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDEVPYoutubeScreen.CUED = "cued";
	FWDEVPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDEVPYoutubeScreen = FWDEVPYoutubeScreen;

}(window));