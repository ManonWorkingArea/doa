/* FWDEVPController */
(function(){
var FWDEVPController = function(
			_d,
			prt
		){
		
		var _s = this;
		_s.prt = prt;
		var prototype = FWDEVPController.prototype;
		_s._d = _d;
		_s.bkLeft_img = _d.bkLeft_img;
		_s.bkRight_img = _d.bkRight_img;
		_s.playN_img = _d.playN_img;
		_s.playS_img = _d.playS_img;
		_s.pauseN_img = _d.pauseN_img;
		_s.pauseS_img = _d.pauseS_img;
		_s.mainScrubberBkLeft_img = _d.mainScrubberBkLeft_img;
		_s.mainScrubberBkRight_img = _d.mainScrubberBkRight_img;
		_s.mainScrubberDragLeft_img = _d.mainScrubberDragLeft_img;
		_s.mainScrubberDragLeftSource = _d.mainScrubberDragLeft_img.src;
		_s.mainScrubberLine_img = _d.mainScrubberLine_img;
		_s.volumeScrubberBkLeft_img = _d.volumeScrubberBkLeft_img;
		_s.volumeScrubberBkRight_img = _d.volumeScrubberBkRight_img;
		_s.volumeScrubberDragLeft_img = _d.volumeScrubberDragLeft_img;
		_s.volumeScrubberLine_img = _d.volumeScrubberLine_img;
		_s.volumeN_img = _d.volumeN_img;
		_s.volumeS_img = _d.volumeS_img;
		_s.volumeD_img = _d.volumeD_img;
		_s.progressLeft_img = _d.progressLeft_img;
		_s.ytbQualityN_img = _d.ytbQualityN_img;
		_s.ytbQualityS_img = _d.ytbQualityS_img;
		_s.ytbQualityD_img = _d.ytbQualityD_img;
		_s.shareN_img = _d.shareN_img;
		_s.subtitleN_img = _d.subtitleNPath_img;
		_s.facebookS_img = _d.facebookS_img;
		_s.fullScreenN_img = _d.fullScreenN_img;
		_s.fullScreenS_img = _d.fullScreenS_img;
		_s.normalScreenN_img = _d.normalScreenN_img;
		_s.normalScreenS_img = _d.normalScreenS_img;
		_s.embedN_img = _d.embedN_img;
		_s.showSubtitileByDefault_bl = _d.showSubtitileByDefault_bl;
		
		_s.buttons_ar = [];
		_s.ytbQuality_ar = null;
		_s.ytbButtons_ar = null;
		
		_s.pointer_do;
		_s.ytbDisabledButton_do = null;
		_s.disable_do = null;
		_s.mainHolder_do = null;
		_s.ytbButtonsHolder_do = null;
		_s.playPauseButton_do = null;
		_s.mainScrubber_do = null;
		_s.mainScrubberBkLeft_do = null;
		_s.mainScrubberBkMiddle_do = null;
		_s.mainScrubberBkRight_do = null;
		_s.mainScrubberDrag_do = null;
		_s.mainScrubberDragLeft_do = null;
		_s.mainScrubberDragMiddle_do = null;
		_s.mainScrubberBarLine_do = null;
		_s.mainProgress_do = null;
		_s.progressLeft_do = null;
		_s.progressMiddle_do = null;
		_s.time_do = null;
		_s.volumeButton_do = null;
		_s.volumeScrubber_do = null;
		_s.volumeScrubberBkLeft_do = null;
		_s.volumeScrubberBkMiddle_do = null;
		_s.volumeScrubberBkRight_do = null;
		_s.volumeScrubberDrag_do = null;
		_s.volumeScrubberDragLeft_do = null;
		_s.volumeScrubberDragMiddle_do = null;
		_s.volumeScrubberBarLine_do = null;
		_s.ytbQualityButton_do = null;
		_s.shareButton_do = null;
		_s.fullScreenButton_do = null;
		_s.ytbQualityArrow_do = null;
		_s.bk_do = null;
		
		_s.isMainScrubberOnTop_bl = true;
		_s.bkMiddlePath_str = _d.bkMiddlePath_str;
		_s.mainScrubberBkMiddlePath_str = _d.mainScrubberBkMiddlePath_str;
		_s.volumeScrubberBkMiddlePath_str = _d.volumeScrubberBkMiddlePath_str;
		_s.mainScrubberDragMiddlePath_str = _d.mainScrubberDragMiddlePath_str;
		_s.volumeScrubberDragMiddlePath_str = _d.volumeScrubberDragMiddlePath_str;
		_s.timeColor_str = _d.timeColor_str;
		_s.progressMiddlePath_str = _d.progressMiddlePath_str;
		_s.youtubeQualityButtonNormalColor_str = _d.youtubeQualityButtonNormalColor_str;
		_s.youtubeQualityButtonSelectedColor_str = _d.youtubeQualityButtonSelectedColor_str;
		_s.youtubeQualityArrowPath_str = _d.youtubeQualityArrowPath_str;
		_s.controllerBkPath_str = _d.controllerBkPath_str;
		_s.ytbQualityButtonPointerPath_str = _d.ytbQualityButtonPointerPath_str;
		_s.subtitleSPath_str = _d.subtitleSPath_str;

		_s.mainScrubberOffestTop = _d.mainScrubberOffestTop;
		_s.totalYtbButtons = 0;
		_s.sW = 0;
		_s.sH = _d.controllerHeight;
		_s.scrubbersBkLeftAndRightWidth = _s.mainScrubberBkLeft_img.width;
		_s.mainScrubberWidth = 0;
		_s.mainScrubberMinWidth = 100;
		_s.volumeScrubberWidth = _d.volumeScrubberWidth;
		_s.scrubbersHeight = _s.mainScrubberBkLeft_img.height;
		_s.mainScrubberDragLeftWidth = _s.mainScrubberDragLeft_img.width;
		_s.scrubbersOffsetWidth = _d.scrubbersOffsetWidth;
		_s.volumeScrubberOffsetRightWidth = _d.volumeScrubberOffsetRightWidth;
		_s.volume = _d.volume;
		_s.lastVolume = _s.volume;
		_s.startSpaceBetweenButtons = _d.startSpaceBetweenButtons;
		_s.spaceBetweenButtons = _d.spaceBetweenButtons;
		_s.percentPlayed = 0;
		_s.percentLoaded = 0;
		_s.lastTimeLength = 0;
		_s.prevYtbQualityButtonsLength = 0;
		_s.pointerWidth = 8;
		_s.pointerHeight = 5;
		_s.timeOffsetLeftWidth = _d.timeOffsetLeftWidth;
		_s.timeOffsetRightWidth = _d.timeOffsetRightWidth;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.sBC = _d.sBC;

		_s.showFullScreenButton_bl = _d.showFullScreenButton_bl;
		_s.showYoutubeQualityButton_bl = _d.showYoutubeQualityButton_bl;
		_s.showSubtitleButton_bl = _d.showSubtitleButton_bl;
		_s.showShareButton_bl = _d.showShareButton_bl;
		_s.showVolumeScrubber_bl = _d.showVolumeScrubber_bl;
		_s.allowToChangeVolume_bl = true;
		_s.showTime_bl = _d.showTime_bl;
		_s.showVolumeButton_bl = _d.showVolumeButton_bl;
		_s.showRewindButton_bl = _d.showRewindButton_bl;
		
		_s.showControllerWhenVideoIsStopped_bl = _d.showControllerWhenVideoIsStopped_bl;
		_s.showDownloadVideoButton_bl = _d.showDownloadVideoButton_bl;
		
		_s.showEmbedButton_bl = _d.showEmbedButton_bl;
		_s.showPlaybackRateButton_bl = _d.showPlaybackRateButton_bl;
		_s.isMainScrubberScrubbing_bl = false;
		_s.isMainScrubberDisabled_bl = false;
		_s.isVolumeScrubberDisabled_bl = false;
		_s.isMainScrubberLineVisible_bl = false;
		_s.isVolumeScrubberLineVisible_bl = false;
		_s.useVectorIcons_bl = _d.useVectorIcons_bl
		_s.hasYtbButton_bl = false;
		_s.muted = false;
		_s.isShowed_bl = true;
		_s.areYtbQualityButtonsShowed_bl = true;
		_s.repeatBackground_bl = _d.repeatBackground_bl;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.mainHolder_do = new FWDEVPDisplayObject("div");
			if(_d.useAToB) _s.setupATB();
			
			if(_d.thumbnailsPreview) _s.setupThumbnailsPreview();
			if(_s.repeatBackground_bl){
				_s.bk_do = new FWDEVPDisplayObject("div"); 
				_s.bk_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
			}else{
				_s.bk_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = _s.controllerBkPath_str;
				_s.bk_do.setScreen(img);	
			}
			_s.mainHolder_do.addChild(_s.bk_do);
			
			//_s.mainHolder_do.getStyle().backgroundColor = "#000000";
			
			_s.mainHolder_do.setOverflow("visible");
		
			_s.addChild(_s.mainHolder_do);
			if(_s.showYoutubeQualityButton_bl){
				_s.ytbQuality_ar = ["hd2880", "hd2160", "hd2160", "hd1440", "highres", "hd1080", "hd720", "large", "medium", "small", "tiny"];
				_s.ytbButtons_ar = [];
				_s.totalYtbButtons = _s.ytbQuality_ar.length;
				_s.setupYtbButtons();
			}
		
			_s.setupPlayPauseButton();
			if(_s.showRewindButton_bl) _s.setupRewindButton();
			_s.setupMainScrubber();
			if(_s.showTime_bl) _s.setupTime();
			if(_s.showVolumeButton_bl) _s.setupVolumeButton();
			
			if(_s.showVolumeScrubber_bl) _s.setupVolumeScrubber();
			if(_s.showPlaybackRateButton_bl) _s.setupPlaybackRateButton();
			if(_s.showYoutubeQualityButton_bl) _s.setupYoutubeQualityButton();
			if(_s.showSubtitleButton_bl) _s.setupSubtitleButton();
			if(_s.showShareButton_bl) _s.setupShareButton();
			if(_s.showEmbedButton_bl) _s.setupEmbedButton();
			if(_d.useAToB) _s.setupAtbButton();
			if(_s.showDownloadVideoButton_bl) _s.setupDownloadButton();
			if(_d.showChromecastButton_bl) _s.setupChromecastButton();
			if(_s.showFullScreenButton_bl) _s.setupFullscreenButton();
			
			if(!_s.isMobile_bl) _s.setupDisable();
			_s.hide(false, true);
			if(_s.showControllerWhenVideoIsStopped_bl) _s.show(true);
		};
		
		
		//###########################################//
		// Resize and position _s...
		//###########################################//
		_s.resizeAndPosition = function(){
			_s.sW = prt.sW;
			_s.positionButtons();
			_s.setY(prt.sH - _s.sH);
			_s.hideQualityButtons(false);
			
			if(_s.ytbButtonsHolder_do){
				FWDAnimation.killTweensOf(_s.ytbButtonsHolder_do);
				_s.ytbButtonsHolder_do.setY(prt.sH);
			}
			
			if(_s.subtitlesButtonsHolder_do){
				FWDAnimation.killTweensOf(_s.subtitlesButtonsHolder_do);
				_s.subtitlesButtonsHolder_do.setY(prt.sH);
			}
			
			if(_s.playbackRatesButtonsHolder_do){
				FWDAnimation.killTweensOf(_s.playbackRatesButtonsHolder_do);
				_s.playbackRatesButtonsHolder_do.setY(prt.sH);
			}
	
			_s.positionAdsLines();
		};
		
		//##############################//
		/* Position buttons */
		//##############################//
		_s.positionButtons = function(){
			if(!_s.sW) return;


			var button;
			var prevButton;
			var totalButtonsWidth = 0;
			var hasTime_bl = _s.showTime_bl;
			var hasVolumeScrubber_bl = _s.volumeScrubber_do;
			
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			
			var buttonsCopy_ar = [];
			for (var i=0; i < _s.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = _s.buttons_ar[i];
			}
			
			if(prt.videoType_str == FWDEVPlayer.VIMEO && !_d.showDefaultControllerForVimeo_bl){
				_s.setX(-5000);
			}else{
				_s.setX(0);
			}
			
			_s.mainScrubberWidth = _s.sW - _s.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != _s.mainScrubber_do){
					_s.mainScrubberWidth -= button.w + _s.spaceBetweenButtons;
				}
			};
			
			var testLegnth = 3;
			if(_s.hasYtbButton_bl) testLegnth = 4;

			var cnt = 0;
			while(_s.mainScrubberWidth < _s.mainScrubberMinWidth && cnt < 10){

				_s.mainScrubberWidth = _s.sW - _s.startSpaceBetweenButtons * 2;
				
				if(_s.volumeScrubber_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.volumeScrubber_do), 1);
					_s.volumeScrubber_do.setX(-1000);
				}else if(_s.time_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.time_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.time_do), 1);
					_s.time_do.setX(-1000);
					hasTime_bl = false;
				}else if(_s.volumeButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.volumeButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.volumeButton_do), 1);
					_s.volumeButton_do.setX(-1000);
				}else if(_s.atbButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.atbButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.atbButton_do), 1);
					_s.atbButton_do.setX(-1000);
				}else if(_s.subtitleButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.subtitleButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.subtitleButton_do), 1);
					_s.subtitleButton_do.setX(-1000);
				}else if(_s.shareButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.shareButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.shareButton_do), 1);
					_s.shareButton_do.setX(-1000);
				}else if(_s.embedButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.embedButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, _s.embedButton_do), 1);
					_s.embedButton_do.setX(-1000);
				}
				
				totalButtons = buttonsCopy_ar.length;
				
				for (var i=0; i < totalButtons; i++) {
					button = buttonsCopy_ar[i];
					if(button != _s.mainScrubber_do){
						_s.mainScrubberWidth -=  button.w + _s.spaceBetweenButtons;
					}
				};
				cnt++;	
			};

			
			if(hasTime_bl) _s.mainScrubberWidth -= _s.timeOffsetLeftWidth * 2;
			if(hasVolumeScrubber_bl)  _s.mainScrubberWidth -= _s.volumeScrubberOffsetRightWidth;
			
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				
				if(i == 0){
					button.setX(_s.startSpaceBetweenButtons);
					button.setY(parseInt((_s.sH - button.h)/2));
				}else if(button == _s.mainScrubber_do){
					prevButton = buttonsCopy_ar[i - 1];
					FWDAnimation.killTweensOf(_s.mainScrubber_do);
					_s.mainScrubber_do.setX(prevButton.x + prevButton.w + _s.spaceBetweenButtons);
					_s.mainScrubber_do.setY(parseInt((_s.sH - _s.scrubbersHeight)/2));
					_s.mainScrubber_do.setWidth(_s.mainScrubberWidth + 1);
					_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
					_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
					_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				}else if(button == _s.time_do){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + _s.spaceBetweenButtons + _s.timeOffsetLeftWidth);
					var timeOffset = 0;
					if(_s.isLive) timeOffset = 2;
					button.setY(parseInt((_s.sH - button.h)/2) + timeOffset);
				}else if(button == _s.volumeButton_do && hasTime_bl){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + _s.spaceBetweenButtons + _s.timeOffsetRightWidth);
					button.setY(parseInt((_s.sH - button.h)/2));
				}else{
					prevButton = buttonsCopy_ar[i - 1];
					if(hasVolumeScrubber_bl && prevButton == _s.volumeScrubber_do){
						button.setX(prevButton.x + prevButton.w + _s.spaceBetweenButtons + _s.volumeScrubberOffsetRightWidth);
					}else{
						button.setX(prevButton.x + prevButton.w + _s.spaceBetweenButtons);
					}
					button.setY(parseInt((_s.sH - button.h)/2));
				}
			};	
		
			
			if(_s.disable_do){
				_s.disable_do.setWidth(_s.sW);
				_s.disable_do.setHeight(_s.sH);
			}
			
			if(_s.bk_do){
				_s.bk_do.setWidth(_s.sW);
				_s.bk_do.setHeight(_s.sH);
				//_s.bk_do.setBkColor("#FF0000")
			}
			
			if(_s.isShowed_bl){
				_s.isMainScrubberOnTop_bl = false;
			}else{
				_s.isMainScrubberOnTop_bl = true;
				_s.positionScrollBarOnTopOfTheController();
			}
			
			if(_s.progressMiddle_do) _s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
			_s.updateMainScrubber(_s.percentPlayed);
			_s.updatePreloaderBar(_s.percentLoaded);

			if(_s.atb) _s.atb.resize();
		};
		
		_s.positionScrollBarOnTopOfTheController = function(){

			_s.mainScrubberWidth = _s.sW;
			_s.updatePreloaderBar(_s.percentLoaded);
			
			_s.mainScrubber_do.setWidth(_s.mainScrubberWidth + 1);
			_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
			_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
			
			FWDAnimation.killTweensOf(_s.mainScrubber_do);
			_s.mainScrubber_do.setX(0);
			var offset = 0;
			if(_s.atb && _s.atb.isShowed_bl) offset = _s.sH + 1;
			if(_d.showScrubberWhenControllerIsHidden_bl){
				if(_s.isMainScrubberOnTop_bl || _s.isShowed_bl){
					_s.mainScrubber_do.setY(- _s.mainScrubberOffestTop - offset);
				}else if(_s.mainScrubber_do.y != - _s.mainScrubberOffestTop && !_s.isLive){
					FWDAnimation.to(_s.mainScrubber_do, .8, {y:- _s.mainScrubberOffestTop - offset, ease:Expo.easeOut});
				}
			}
			
			_s.isMainScrubberOnTop_bl = true;
		};
		
		
		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDEVPDisplayObject("div");
			if(FWDEVPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0);
			}
		};
		
		
		//##########################################//
		/* Setup thumbnails preview */
		//##########################################//
		_s.setupThumbnailsPreview =  function(){
			FWDEVPThumbnailsPreview.setPrototype();
			_s.thumbnailsPreview_do = new FWDEVPThumbnailsPreview(_s);
			_s.thumbnailsPreview_do.addListener(FWDEVPData.LOAD_ERROR, function(e){
				_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:e.text});
			});
		}

		//##########################################//
		/* Setup a to b button */
		//##########################################//
		_s.setupATB = function(){
			FWDEVPATB.setPrototype();
			_s.atb = new FWDEVPATB(_s);
			_s.mainHolder_do.addChild(_s.atb);
			_s.atb.addListener(FWDEVPATB.START_TO_SCRUB, _s.atbStartToScrub);
			_s.atb.addListener(FWDEVPATB.STOP_TO_SCRUB, _s.atbStopToScrub);
		}

		_s.atbStartToScrub = function(){
			prt.showDisable();
		}

		_s.atbStopToScrub = function(){
			prt.hideDisable();
		}

		_s.setupAtbButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-AB';
				_s.atbButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.atbButton_do = new FWDEVPSimpleButton(
						_d.atbNPath_img,
						_d.atbSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.atbButton_do.setX(-5000);
			_s.buttons_ar.push(_s.atbButton_do);
			_s.atbButton_do.setY(parseInt((_s.sH - _s.atbButton_do.h)/2));
			var checkIconInterval = setInterval(function(){
				if(_s.atbButton_do.buttonHeight > 0){
					clearInterval(checkIconInterval);
					_s.atbButton_do.setY(parseInt((_s.sH - _s.atbButton_do.buttonHeight)/2));
				}
			}, 50);
			_s.atbButton_do.addListener(FWDEVPSimpleButton.SHOW_TOOLTIP, _s.atbButtonShowTooltipHandler);
			_s.atbButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.atbButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.atbButton_do);
		};
		
		_s.atbButtonShowTooltipHandler = function(e){
			//_s.showToolTip(_s.atbButton_do, _s.atbButtonToolTip_do, e.e);
		};
		
	
		_s.atbButtonMouseUpHandler = function(){
			if(_s.atbButton_do.isSelected){
				_s.atbButton_do.doNotallowToSetNormal = false;
				_s.atbButton_do.isSelected = false;
				_s.atb.hide(true);
			}else{
				_s.atbButton_do.isSelected = true;
				_s.atbButton_do.doNotallowToSetNormal = true;
				_s.atbButton_do.setSelectedState();
				_s.atb.show(true);
			}
			
		};

		_s.disableAtbButton = function(){
			if(_s.atbButton_do) _s.atbButton_do.disable();
		};
		
		_s.enableAtbButton = function(){
			if(_s.atbButton_do) _s.atbButton_do.enable();
		};
		
		//##########################################//
		/* Setup playback rate button */
		//##########################################//
		_s.playbackRatesSource_ar = _d.defaultPlaybackRate_ar;
		_s.playbackRateButtons_ar = [];
		_s.totalPlaybackRateButtons = 6;
		_s.arePlaybackRateButtonsShowed_bl = true;
		if(!_s.showPlaybackRateButton_bl) _s.arePlaybackRateButtonsShowed_bl = false;
		
		_s.setupPlaybackRateButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-watch-later';
				_s.playbackRateButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
				
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.playbackRateButton_do = new FWDEVPSimpleButton(_d.playbackRateNPath_img,
															 _d.playbackRateSPath_str, 
															 undefined, 
															 true,
															 _s.useHEX,
															 _s.nBC,
															 _s.sBC);
			}
		
			_s.buttons_ar.push(_s.playbackRateButton_do);
			_s.playbackRateButton_do.setY(parseInt((_s.sH - _s.playbackRateButton_do.h)/2));
			_s.playbackRateButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.playbackRateButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.playbackRateButton_do);
			
			_s.disablePlaybackRateButton();
			_s.setupPlaybackRateButtons();
			
		}
		
		_s.playbackRateButtonMouseUpHandler = function(){
			if(_s.arePlaybackRateButtonsShowed_bl){
				_s.hidePlaybackRateButtons(true);
			}else{
				_s.showPlaybackRateButtons(true);
			}
		};
		
		_s.disablePlaybackRateButton = function(){
			if(_s.playbackRateButton_do) _s.playbackRateButton_do.disable();
		};
		
		_s.enablePlaybackRateButton = function(){
			if(_s.playbackRateButton_do) _s.playbackRateButton_do.enable();
		};
		
		
		
		_s.removePlaybackRateButton = function(){
			if(!_s.playbackRateButton_do) return;
			if(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.playbackRateButton_do) != -1){
				_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.playbackRateButton_do), 1);
				_s.playbackRateButton_do.setX(-300);
				_s.positionButtons();
			}
		};
		
		_s.addPlaybackRateButton = function(){
			if(!_s.playbackRateButton_do) return;
			
			if(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.playbackRateButton_do) == -1){
				if(_s.ytbQualityButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ytbQualityButton_do) != -1){
					_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ytbQualityButton_do), 0, _s.playbackRateButton_do);
				}else if(_s.subtitleButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.subtitleButton_do) != -1){
					_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.subtitleButton_do), 0, _s.playbackRateButton_do);
				}else if(_s.shareButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.shareButton_do) != -1){
					_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.shareButton_do), 0, _s.playbackRateButton_do);
				}else if(_s.fullScreenButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do) != -1){
					_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do), 0, _s.playbackRateButton_do);
				}else{
					_s.buttons_ar.splice(_s.buttons_ar.length, 0, _s.playbackRateButton_do);
				}
				_s.positionButtons();
			}
		};
		
		//###################################################//
		/* Setup PlaybackRatebuttons */
		//###################################################//
		_s.updatePlaybackRateButtons = function(playbackRates, playbackRateIndex){
			if(!_s.playbackRateButton_do) return;
			//_s.playbackRateButton_do.enable();
			_s.positionAndResizePlaybackRateButtons(playbackRates);
			setTimeout(function(){
				//playbackRateIndex = _s.playbackRatesSource_ar.length - 1 - playbackRateIndex;
				_s.disablePlaybackRateButtons(playbackRateIndex);
			},65);
			_s.prevplaybackRateIndex = playbackRateIndex;
		};	
		
		_s.setupPlaybackRateButtons = function(){
			
			_s.playbackRatesButtonsHolder_do = new FWDEVPDisplayObject("div");
			_s.playbackRatesButtonsHolder_do.setOverflow("visible");
			
			if(_s.repeatBackground_bl){
				_s.playbackRatesButtonsHolder_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
			}else{
				_s.playbackRatesButtonsBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = _s.controllerBkPath_str;
				_s.playbackRatesButtonsBackground_do.setScreen(img);
				_s.playbackRatesButtonsHolder_do.addChild(_s.playbackRatesButtonsBackground_do);
			}
			
			_s.playbackRatesButtonsHolder_do.setX(300);
			_s.playbackRatesButtonsHolder_do.setY(-300);
			prt.main_do.addChild(_s.playbackRatesButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = _s.ytbQualityButtonPointerPath_str;
			_s.playbackRatesPonter_do = new FWDEVPDisplayObject("img");
			_s.playbackRatesPonter_do.setScreen(img);
			_s.playbackRatesPonter_do.setWidth(_s.pointerWidth);
			_s.playbackRatesPonter_do.setHeight(_s.pointerHeight);
			_s.playbackRatesButtonsHolder_do.addChild(_s.playbackRatesPonter_do);
	
			
			var img = new Image();
			img.src = _s.youtubeQualityArrowPath_str;
			_s.playbackRateQualityArrow_do = new FWDEVPDisplayObject("img");
			_s.playbackRateQualityArrow_do.setScreen(img);
			_s.playbackRateQualityArrow_do.setX(7);
			_s.playbackRateQualityArrow_do.setWidth(5);
			_s.playbackRateQualityArrow_do.setHeight(7);
			_s.playbackRatesButtonsHolder_do.addChild(_s.playbackRateQualityArrow_do);
			
			var btn;
			
			for(var i=0; i<_s.totalPlaybackRateButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton("no source", 
						_s.youtubeQualityButtonNormalColor_str, 
						_s.youtubeQualityButtonSelectedColor_str,
						undefined,
						i);
				
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, _s.plbkQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, _s.plbkQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, _s.plbkQualityClick);
				_s.playbackRateButtons_ar[i] = btn;
				_s.playbackRatesButtonsHolder_do.addChild(btn);
			}
			_s.positionAndResizePlaybackRateButtons(_s.playbackRatesSource_ar);
			_s.hidePlaybackRateButtons(false);
		};
		
		_s.plbkQualityOver = function(e){
			_s.setPlaybackRateArrowPosition(e.target);
		};
		
		_s.plbkQualityOut = function(e){
			_s.setPlaybackRateArrowPosition(undefined);
		};
		
		_s.plbkQualityClick = function(e){
			_s.startAtPlaybackRate = e.id;
			_s.disablePlaybackRateButtons(_s.startAtPlaybackRate);
			_s.hidePlaybackRateButtons(true);
			_s.dispatchEvent(FWDEVPController.CHANGE_PLAYBACK_RATES, {rate:_s.playbackRatesSource_ar[e.id]});
		};
		
		_s.positionAndResizePlaybackRateButtons = function(ar){
			if(!ar) return;
			
			var totalButtons = ar.length;
			if(_s.prevplaybackRatesQualityButtonsLength == totalButtons) return;
			_s.prevplaybackRatesQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<totalButtons; i++){
				btn = _s.playbackRateButtons_ar[i];
				if(ar[i] == 1){
					btn.updateText("normal");
				}else{
					btn.updateText(ar[i]);
				}
				
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<totalButtons; i++){
					btn = _s.playbackRateButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
				
				for(var i=0; i<totalButtons; i++){
					btn = _s.playbackRateButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
				
				totalHeight = startY + 5;
				_s.playbackRatesPonter_do.setX(parseInt((totalWidth - _s.playbackRatesPonter_do.w)/2));
				_s.playbackRatesPonter_do.setY(totalHeight);
				if(_s.playbackRatesButtonsBackground_do){	
					_s.playbackRatesButtonsBackground_do.setWidth(totalWidth);
					_s.playbackRatesButtonsBackground_do.setHeight(totalHeight);
				}
				_s.playbackRatesButtonsHolder_do.setWidth(totalWidth);
				_s.playbackRatesButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		_s.disablePlaybackRateButtons = function(index){
			for(var i=0; i<_s.totalPlaybackRateButtons; i++){
				btn = _s.playbackRateButtons_ar[i];
				if(i == index){
					FWDAnimation.killTweensOf(_s.playbackRateQualityArrow_do);
					_s.playbackRateQualityArrow_do.setY(btn.y + parseInt((btn.h - _s.playbackRateQualityArrow_do.h)/2) - 1);
					btn.disable();
					_s.playbackRateDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
		
			/*
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720" || curQualityLevel == "hd1440" || curQualityLevel == "hd2160"){
				_s.playbackRateButton_do.showDisabledState();
			}else{
				_s.playbackRateButton_do.hideDisabledState();
			}
			*/
		};
		
		_s.setPlaybackRateArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = _s.playbackRateDisabledButton_do.y + parseInt((_s.playbackRateDisabledButton_do.h - _s.playbackRateQualityArrow_do.h)/2 - 1);
			}else{
				curY = target.y + parseInt((target.h - _s.playbackRateQualityArrow_do.h)/2 - 1);
			}
			FWDAnimation.killTweensOf(_s.playbackRateQualityArrow_do);
			FWDAnimation.to(_s.playbackRateQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		_s.showPlaybackRateButtons = function(animate){
			if(_s.arePlaybackRateButtonsShowed_bl) return;
			_s.hideQualityButtons();
			_s.arePlaybackRateButtonsShowed_bl = true;
			//var finalX = parseInt(_s.playbackRateButton_do.x + (parseInt(_s.playbackRateButton_do.w - _s.playbackRatesButtonsHolder_do.w)/2));
			//var finalY = parseInt(- _s.playbackRatesButtonsHolder_do.h - 6);
			var finalX = parseInt(_s.playbackRateButton_do.x + (parseInt(_s.playbackRateButton_do.w - _s.playbackRatesButtonsHolder_do.w)/2));
			var finalY = parseInt(prt.sH - _s.sH - _s.playbackRatesButtonsHolder_do.h - 6);
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerdown", _s.hideplaybackRatesButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.addEventListener("mousedown", _s.hideplaybackRatesButtonsHandler);
				}
				window.addEventListener("touchstart", _s.hideplaybackRatesButtonsHandler);
			}
			
			_s.playbackRatesButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(_s.playbackRatesButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.playbackRatesButtonsHolder_do);
				_s.playbackRatesButtonsHolder_do.setY(finalY);
			}
		};
	
		_s.hidePlaybackRateButtons = function(animate){
			if(!_s.arePlaybackRateButtonsShowed_bl || !_s.showPlaybackRateButton_bl) return;
			_s.arePlaybackRateButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(_s.playbackRatesButtonsHolder_do, .6, {y:_s.sH, ease:Expo.easeInOut});
				FWDAnimation.to(_s.playbackRatesButtonsHolder_do, .6, {y:prt.sH, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.playbackRatesButtonsHolder_do);
				//_s.playbackRatesButtonsHolder_do.setY(_s.sH);
				_s.playbackRatesButtonsHolder_do.setY(prt.sH);
			}
			
			
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", _s.hideplaybackRatesButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.removeEventListener("mousedown", _s.hideplaybackRatesButtonsHandler);
				}
				window.removeEventListener("touchstart", _s.hideplaybackRatesButtonsHandler);
			}
		};
		
		_s.hideplaybackRatesButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(_s.playbackRateButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(_s.playbackRatesButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			_s.hidePlaybackRateButtons(true);
		};
		
		//################################################//
		/* Setup main scrubber */
		//################################################//
		_s.setupAdsLines = function(linesAr){
			if(_s.createdAdsOnce_bl || !linesAr || (linesAr && linesAr.length == 0)) return;
		
			if(_s.line_ar){
				for(var i=0; i<_s.line_ar.length; i++){
					FWDAnimation.killTweensOf(_s.line_ar[i]);
					_s.linesHolder_do.removeChild(_s.line_ar[i]);
				}
				_s.line_ar = null;
			}
			
			if(!_s.linesHolder_do){
				_s.linesHolder_do = new FWDEVPDisplayObject("div");
				_s.linesHolder_do.setOverflow("visible");
				_s.mainScrubber_do.addChild(_s.linesHolder_do);
			}
			_s.createdAdsOnce_bl = true;
			_s.lines_ar = linesAr;
			
			if(_s.lines_ar){
				var line;
				_s.line_ar = [];
				for(var i=0; i<_s.lines_ar.length; i++){
					line = new FWDEVPDisplayObject("div");
					line.getStyle().background = "url('" + _d.adLinePat_str + "') repeat-x";
					line.timeStart = linesAr[i].timeStart;
					line.setWidth(2);
					line.setHeight(_s.mainScrubberDragLeft_img.height);
					line.isUsed_bl = false;
					line.isShowed_bl = false;
					line.setAlpha(0);
					_s.line_ar[i] = line;
					_s.linesHolder_do.addChild(line);
					if(_s.lines_ar[i]['timeStart'] == 0) line.setWidth(0);
				}
			}
			_s.totalDuration = 0;
		};
		
		_s.hideAdsLines = function(){
			if(!_s.line_ar) return;
			
			if(_s.linesHolder_do) _s.linesHolder_do.setX(-5000);
			
			if(_s.line_ar){
				for(var i=0; i<_s.line_ar.length; i++){
					var line = _s.line_ar[i];

					//_s.line_ar[i].isUsed_bl = true;
					FWDAnimation.killTweensOf(line)
					line.setAlpha(0);
					line.isShowed_bl = false;
				}
			}
			
		}
		
		_s.positionAdsLines = function(totalDuration){
			
			if(!_s.linesHolder_do || !_s.line_ar) return;
			
			if(totalDuration) _s.totalDuration = totalDuration;
			
			if(prt.isAdd_bl || _s.isIMA){
				_s.linesHolder_do.setX(-5000);
			}else{
				_s.linesHolder_do.setX(0);
			}
			
			if(_s.line_ar){
				var line;
			
				for(var i=0; i<_s.line_ar.length; i++){
					line = _s.line_ar[i];
					
					var lineX = Math.round((line.timeStart/_s.totalDuration) * _s.mainScrubberWidth) - 1;
					
					if(lineX == Infinity) lineX = 0;
					if(isNaN(lineX)) lineX = 0;
					if(lineX < 0) lineX = 0;
					line.setX(lineX);
					
					if(!line.isUsed_bl && _s.totalDuration != 0 && !line.isShowed_bl){
						FWDAnimation.to(line, 1, {alpha:1, ease:Expo.easeOut});
						line.isShowed_bl = true;
					}
				}
			}
		}
		
		_s.resetsAdsLines = function(){
			_s.line_ar = null;
		}
		
		//###############################################//
		/* Set is live */
		//###############################################//
		_s.setIsLive = function(isLive){
			_s.isLive = isLive;
			if(isLive){
				if(!_s.mainScrubber_do.contains(_s.live_do)){
					_s.mainScrubber_do.setAlpha(.2);
					_s.mainHolder_do.addChild(_s.live_do);
					setTimeout(function(){
							_s.live_do.setX(4);
							_s.live_do.setY(- _s.live_do.getHeight() - 4);
					}, 100)
					_s.disableMainScrubber();
				}
			}else{
				if(_s.mainHolder_do.contains(_s.live_do)){
					_s.mainHolder_do.removeChild(_s.live_do);
					_s.mainScrubber_do.setAlpha(1);
					
					_s.enableMainScrubber();
				}
			}
		}
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		_s.setupMainScrubber = function(){
			//setup background bar
			_s.mainScrubber_do = new FWDEVPDisplayObject("div");
			_s.mainScrubber_do.setHeight(_s.scrubbersHeight);
			
			_s.mainScrubberBkLeft_do = new FWDEVPDisplayObject("img");
			_s.mainScrubberBkLeft_do.setScreen(_s.mainScrubberBkLeft_img);
			
			_s.mainScrubberBkRight_do = new FWDEVPDisplayObject("img");
			_s.mainScrubberBkRight_do.setScreen(_s.mainScrubberBkRight_img);
			
			var middleImage = new Image();
			middleImage.src = _s.mainScrubberBkMiddlePath_str;
			
			//if(_s.isMobile_bl){
				_s.mainScrubberBkMiddle_do = new FWDEVPDisplayObject("div");	
				_s.mainScrubberBkMiddle_do.getStyle().background = "url('" + _s.mainScrubberBkMiddlePath_str + "') repeat-x";
			//}else{
				//_s.mainScrubberBkMiddle_do = new FWDEVPDisplayObject("img");
				//_s.mainScrubberBkMiddle_do.setScreen(middleImage);
			//}
				
			_s.mainScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			_s.mainProgress_do = new FWDEVPDisplayObject("div");
			_s.mainProgress_do.setHeight(_s.scrubbersHeight);
		
			_s.progressLeft_do = new FWDEVPDisplayObject("img");
			_s.progressLeft_do.setScreen(_s.progress);
			
			middleImage = new Image();
			middleImage.src = _s.progressMiddlePath_str;
			
			_s.progressMiddle_do = new FWDEVPDisplayObject("div");	
			_s.progressMiddle_do.getStyle().background = "url('" + _s.progressMiddlePath_str + "') repeat-x";
		
			_s.progressMiddle_do.setHeight(_s.scrubbersHeight);
			_s.progressMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			_s.mainScrubberDrag_do = new FWDEVPDisplayObject("div");
			_s.mainScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			
			if(_s.useHEX){
				_s.mainScrubberDragLeft_do = new FWDEVPDisplayObject("div");
				_s.mainScrubberDragLeft_do.setWidth(_s.mainScrubberDragLeft_img.width + 20);
				_s.mainScrubberDragLeft_do.setHeight(_s.mainScrubberDragLeft_img.height + 20);
				_s.mainScrubberDragLeft_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.mainScrubberDragLeft_img, _s.nBC).canvas;
				_s.mainScrubberDragLeft_do.screen.appendChild(_s.mainScrubberDragLeft_canvas);	
			}else{
				_s.mainScrubberDragLeft_do = new FWDEVPDisplayObject("img");
				_s.mainScrubberDragLeft_do.setScreen(_s.mainScrubberDragLeft_img);
			}
			
			_s.mainScrubberMiddleImage = new Image();
			_s.mainScrubberMiddleImage.src = _s.mainScrubberDragMiddlePath_str;
			_s.volumeScrubberDragMiddle_do = new FWDEVPDisplayObject("div");
			
			if(_s.useHEX){
				_s.mainScrubberDragMiddle_do = new FWDEVPDisplayObject("div");
				_s.mainScrubberMiddleImage.onload = function(){
					var testCanvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.mainScrubberMiddleImage, _s.nBC, true);
					_s.mainSCrubberMiddleCanvas = testCanvas.canvas;
					_s.mainSCrubberDragMiddleImageBackground = testCanvas.image;
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
					setTimeout(function(){
						_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
					},50)
				}
			}else{
				_s.mainScrubberDragMiddle_do = new FWDEVPDisplayObject("div");	
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
		
			_s.mainScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			
			_s.mainScrubberBarLine_do = new FWDEVPDisplayObject("img");
			_s.mainScrubberBarLine_do.setScreen(_s.mainScrubberLine_img);
			_s.mainScrubberBarLine_do.setAlpha(0);
			_s.mainScrubberBarLine_do.hasTransform3d_bl = false;
			_s.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			_s.buttons_ar.push(_s.mainScrubber_do);
			
			
			_s.live_do = new FWDEVPDisplayObject("div");
			_s.live_do.hasTransform3d_bl = false;
			_s.live_do.hasTransform2d_bl = false;
			_s.live_do.setBackfaceVisibility();
			_s.live_do.getStyle().fontFamily = "Arial";
			_s.live_do.getStyle().fontSize= "12px";
			_s.live_do.getStyle().whiteSpace= "nowrap";
			_s.live_do.getStyle().textAlign = "center";
			_s.live_do.getStyle().padding = "4px";
			_s.live_do.getStyle().paddingLeft = "6px";
			_s.live_do.getStyle().paddingRIght = "6px";
			_s.live_do.getStyle().color = "#FFFFFF";
			_s.live_do.getStyle().fontSmoothing = "antialiased";
			_s.live_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.live_do.getStyle().textRendering = "optimizeLegibility";
			_s.live_do.getStyle().backgroundColor = "rgba(255,0,0,0.8)";
			_s.live_do.setInnerHTML("&#x25C9; LIVE");
			
			
			//add all children
			_s.mainScrubber_do.addChild(_s.mainScrubberBkLeft_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkRight_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBarLine_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragLeft_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragMiddle_do);
			_s.mainProgress_do.addChild(_s.progressLeft_do);
			_s.mainProgress_do.addChild(_s.progressMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainProgress_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberDrag_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBarLine_do);
			_s.mainHolder_do.addChild(_s.mainScrubber_do);
			
		
			if(!_s.disableVideoScrubber_bl){
				if(_s.hasPointerEvent_bl){
					_s.mainScrubber_do.screen.addEventListener("pointerover", _s.mainScrubberOnOverHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerout", _s.mainScrubberOnOutHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerdown", _s.mainScrubberOnDownHandler);
				}else if(_s.screen.addEventListener){	
					if(!_s.isMobile_bl){
						_s.mainScrubber_do.screen.addEventListener("mouseover", _s.mainScrubberOnOverHandler);
						_s.mainScrubber_do.screen.addEventListener("mouseout", _s.mainScrubberOnOutHandler);
						_s.mainScrubber_do.screen.addEventListener("mousemove", _s.updateTooltipOnMove);
						_s.mainScrubber_do.screen.addEventListener("mousedown", _s.mainScrubberOnDownHandler);
					}
					_s.mainScrubber_do.screen.addEventListener("touchstart", _s.mainScrubberOnDownHandler);
				}
			}
			
			_s.disableMainScrubber();
			_s.updateMainScrubber(0);

			FWDEVPScrubberToolip.setPrototype();
			_s.ttm = new FWDEVPScrubberToolip(_s.mainScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, test);
			_s.addChild(_s.ttm);

		};

		_s.updateToolTip = function(localX, percentScrubbed){
			if(!_d.showMainScrubberToolTipLabel_bl) return;
			if(prt.isCasting){
				_s.ttm.setLabel(FWDEVPUtils.formatTime(Math.round(prt.cc.getDuration() * percentScrubbed)));
			}else{
				_s.ttm.setLabel(FWDEVPUtils.formatTime(Math.round(prt.totalDuration * percentScrubbed)));
			}
			
			_s.ttm.setX(Math.round(_s.mainScrubber_do.x + localX - _s.ttm.getWidth()/2) + 1);
			_s.ttm.setY(_s.mainScrubber_do.y - _s.ttm.h - 2);
		}
		
		_s.updateThumbnailsPreview = function(localX, percentScrubbed){
			if(!_d.thumbnailsPreview) return;
			
			var x = Math.round(_s.mainScrubber_do.x + localX - _s.thumbnailsPreview_do.getWidth()/2) + 1;
			var pointerOffsetX = 0;

			if(x < 1){
				pointerOffsetX = x;
				x = 1;
			}else if(x > _s.sW - _s.thumbnailsPreview_do.w - 1){
				pointerOffsetX = x - _s.sW + _s.thumbnailsPreview_do.w;
				x = _s.sW - _s.thumbnailsPreview_do.w - 1;
			}
			_s.thumbnailsPreview_do.setLabel(FWDEVPUtils.formatTime(Math.round(prt.totalDuration * percentScrubbed)), Math.round(prt.totalDuration * percentScrubbed), pointerOffsetX);
			_s.thumbnailsPreview_do.setX(x);
			_s.thumbnailsPreview_do.setY(_s.mainScrubber_do.y - _s.thumbnailsPreview_do.h - 2);
		}

		_s.updateTooltipOnMove = function(e){
			if(_s.isMainScrubberDisabled_bl) return;
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;
			_s.updateToolTip(localX, percentScrubbed);
			_s.updateThumbnailsPreview(localX, percentScrubbed);
		}
		
		_s.mainScrubberOnOverHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl) return;

			if(_d.tempShowMainScrubberToolTipLabel_bl) _s.ttm.show();
			if(_d.thumbnailsPreview) _s.thumbnailsPreview_do.show();

			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;

			_s.updateToolTip(localX, percentScrubbed);
			_s.updateThumbnailsPreview(localX, percentScrubbed);
		};
		
		_s.mainScrubberOnOutHandler =  function(e){
			//if(_s.isMainScrubberDisabled_bl) return;
			if(!_s.isMainScrubberScrubbing_bl){
				if(_s.ttm) _s.ttm.hide();
				if(_s.thumbnailsPreview_do) _s.thumbnailsPreview_do.hide();
			}
		};
		
		_s.mainScrubberOnDownHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			_s.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
		
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;
		
			if(_s.disable_do) _s.addChild(_s.disable_do);
			if(_d.tempShowMainScrubberToolTipLabel_bl) _s.ttm.show();
			if(_d.thumbnailsPreview) _s.thumbnailsPreview_do.show();
			_s.updateToolTip(localX, percentScrubbed);
			_s.updateThumbnailsPreview(localX, percentScrubbed);
			_s.updateMainScrubber(percentScrubbed);

			_s.dispatchEvent(FWDEVPController.START_TO_SCRUB);
			_s.dispatchEvent(FWDEVPController.SCRUB, {percent:percentScrubbed});
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.addEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.addEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.addEventListener("touchmove", _s.mainScrubberMoveHandler);
				window.addEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/_s.mainScrubberWidth;
			_s.updateToolTip(localX, percentScrubbed);
			_s.updateThumbnailsPreview(localX, percentScrubbed);
			_s.updateMainScrubber(percentScrubbed);
			_s.dispatchEvent(FWDEVPController.SCRUB, {percent:percentScrubbed});
		};
		
		_s.mainScrubberEndHandler = function(e){
			_s.isMainScrubberScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				_s.mainScrubberMoveHandler(e);
			}
			*/

			if(e){
				var wp = FWDEVPUtils.getViewportMouseCoordinates(e);
				if(!FWDEVPUtils.hitTest(_s.mainScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm) _s.ttm.hide();
					if(_s.thumbnailsPreview_do) _s.thumbnailsPreview_do.hide();
				}
			}
			_s.dispatchEvent(FWDEVPController.STOP_TO_SCRUB);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.removeEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.removeEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.removeEventListener("touchmove", _s.mainScrubberMoveHandler);
				window.removeEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.disableMainScrubber = function(){
			if(!_s.mainScrubber_do) return;
			_s.isMainScrubberDisabled_bl = true;
			_s.mainScrubber_do.setButtonMode(false);
			_s.mainScrubberEndHandler();
			_s.mainScrubberOnOutHandler();
			_s.updateMainScrubber(0);
			_s.updatePreloaderBar(0);
		};
		
		
		_s.enableMainScrubber = function(){
			if(!_s.mainScrubber_do || _s.isLive) return;
			_s.isMainScrubberDisabled_bl = false;
			_s.mainScrubber_do.setButtonMode(true);
		};
		
		_s.updateMainScrubber = function(percent){
			if(!_s.mainScrubber_do) return;
			if(_s.isLive) percent = 0;
			
			var finalWidth = parseInt(percent * _s.mainScrubberWidth); 
			if(isNaN(finalWidth)) return;
			
			_s.percentPlayed = percent;
			if(!FWDEVPlayer.hasHTML5Video && finalWidth >= _s.mainProgress_do.w) finalWidth = _s.mainProgress_do.w;
			
			if(finalWidth < 1 && _s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !_s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:1});
			}
			_s.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		_s.updatePreloaderBar = function(percent){
			if(!_s.mainProgress_do) return;
			if(_s.isLive) percent = 0;
			
			_s.percentLoaded = percent;
			var finalWidth = parseInt(Math.max(0,_s.percentLoaded * _s.mainScrubberWidth)); 
			
			if(_s.percentLoaded >= 0.98){
				_s.mainProgress_do.setY(-30);
			}else if(_s.mainProgress_do.y != 0 && _s.percentLoaded!= 1){
				_s.mainProgress_do.setY(0);
			}
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = Math.max(0,_s.mainScrubberWidth - _s.scrubbersOffsetWidth);
			if(finalWidth < 0) finalWidth = 0;
			_s.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup play button */
		//################################################//
		_s.setupPlayPauseButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPComplexButton.setPrototype();
				FWDEVPUtils.cmpBtnNPos();
				var ic1 = 'fwdicon fwdicon-play';
				var ic2 = 'fwdicon fwdicon-pause';
				_s.playPauseButton_do = new FWDEVPComplexButton(undefined, undefined, undefined, undefined, true, undefined, undefined, undefined,
					"<span class='" + ic1 + "'></span>",
					"<span class='" + ic2 + "'></span>",
					"EVPMainButtonsNormalState",
					"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPComplexButton.setPrototype();
				_s.playPauseButton_do = new FWDEVPComplexButton(
						_s.playN_img,
						_d.playSPath_str,
						_s.pauseN_img,
						_d.pauseSPath_str,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.buttons_ar.push(_s.playPauseButton_do);
			_s.playPauseButton_do.setY(parseInt((_s.sH - _s.playPauseButton_do.buttonHeight)/2));
			_s.playPauseButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, _s.playButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.playPauseButton_do);
		};
		
		_s.showPlayButton = function(){
			if(!_s.playPauseButton_do || (!_d.showDefaultControllerForVimeo_bl && prt.videoType_str == FWDEVPlayer.VIMEO)) return;
			_s.playPauseButton_do.setButtonState(1);
		};
		
		_s.showPauseButton = function(){
			if(!_s.playPauseButton_do ||  (!_d.showDefaultControllerForVimeo_bl && prt.videoType_str == FWDEVPlayer.VIMEO)) return;
			_s.playPauseButton_do.setButtonState(0);
		};
		
		_s.playButtonMouseUpHandler = function(){
			if(_s.playPauseButton_do.currentState == 0){
				_s.dispatchEvent(FWDEVPController.PAUSE);
			}else{
				_s.dispatchEvent(FWDEVPController.PLAY);
			}
		};
		
		//##########################################//
		/* Setup embed button */
		//#########################################//
		_s.setupEmbedButton = function(){
			
			if(_s.useVectorIcons_bl){			
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-embed';
				_s.embedButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.embedButton_do = new FWDEVPSimpleButton(_s.embedN_img,
														 _d.embedPathS_str, 
														 undefined, 
														 true,
														 _s.useHEX,
														 _s.nBC,
														 _s.sBC);
				
			}
										
			
			_s.embedButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.embedButtonOnMouseUpHandler);
			_s.embedButton_do.setY(parseInt((_s.sH - _s.embedButton_do.h)/2));
			_s.buttons_ar.push(_s.embedButton_do);
			_s.mainHolder_do.addChild(_s.embedButton_do);
		};
	
		_s.embedButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDEVPController.SHOW_EMBED_WINDOW);
		};
		
		//###################################################//
		/* Setup youtube quality buttons */
		//###################################################//
		_s.setupYtbButtons = function(){
			_s.ytbButtonsHolder_do = new FWDEVPDisplayObject("div");
			_s.ytbButtonsHolder_do.setOverflow("visible");
			if(_s.repeatBackground_bl){
				_s.ytbButtonsHolder_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
			}else{
				_s.ytbButtonBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = _s.controllerBkPath_str;
				_s.ytbButtonBackground_do.setScreen(img);
				_s.ytbButtonsHolder_do.addChild(_s.ytbButtonBackground_do);
			}
			
			_s.ytbButtonsHolder_do.setX(300);
			_s.ytbButtonsHolder_do.setY(-300);
			prt.main_do.addChild(_s.ytbButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = _s.ytbQualityButtonPointerPath_str;
			_s.pointer_do = new FWDEVPDisplayObject("img");
			_s.pointer_do.setScreen(img);
			_s.pointer_do.setWidth(_s.pointerWidth);
			_s.pointer_do.setHeight(_s.pointerHeight);
			_s.ytbButtonsHolder_do.addChild(_s.pointer_do);
			
			var img = new Image();
			img.src = _s.youtubeQualityArrowPath_str;
			_s.ytbQualityArrow_do = new FWDEVPDisplayObject("img");
			_s.ytbQualityArrow_do.setScreen(img);
			_s.ytbQualityArrow_do.setX(7);
			_s.ytbQualityArrow_do.setWidth(5);
			_s.ytbQualityArrow_do.setHeight(7);
			
			
			var btn;
			
			for(var i=0; i<_s.totalYtbButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton(_s.ytbQuality_ar[i], 
						_s.youtubeQualityButtonNormalColor_str, 
						_s.youtubeQualityButtonSelectedColor_str,
						_d.hdPath_str,
						i);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, _s.ytbQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, _s.ytbQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, _s.ytbQualityClick);
				_s.ytbButtons_ar[i] = btn;
				_s.ytbButtonsHolder_do.addChild(btn);
				
			}
			_s.ytbButtonsHolder_do.addChild(_s.ytbQualityArrow_do);
			_s.hideQualityButtons(false);
		};
		
		_s.ytbQualityOver = function(e){
			_s.setYtbQualityArrowPosition(e.target);
		};
		
		_s.ytbQualityOut = function(e){
			_s.setYtbQualityArrowPosition(undefined);
		};
		
		_s.ytbQualityClick = function(e){
			//if(prt.videoType_str == FWDEVPlayer.VIDEO) _s.disableQualityButtons(e.target.label_str);
			_s.hideQualityButtons(true);
			_s.dispatchEvent(FWDEVPController.CHANGE_YOUTUBE_QUALITY, {quality:e.target.label_str, id:e.id});
		};
		
		_s.positionAndResizeYtbQualityButtons = function(ar){
			if(!ar) return;
			var totalButtons = ar.length;
			if(_s.prevYtbQualityButtonsLength == totalButtons) return;
			_s.prevYtbQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<totalButtons; i++){
				btn = _s.ytbButtons_ar[i];
				btn.updateText(ar[i]);
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<_s.totalYtbButtons; i++){
					btn = _s.ytbButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -10000) btn.setX(-10000);
					}
				}
				
				for(var i=0; i<_s.totalYtbButtons; i++){
					btn = _s.ytbButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
			
				totalHeight = startY + 5;
				_s.pointer_do.setX(parseInt((totalWidth - _s.pointer_do.w)/2));
				_s.pointer_do.setY(totalHeight);
				if(_s.ytbButtonBackground_do){
					_s.ytbButtonBackground_do.setWidth(totalWidth);
					_s.ytbButtonBackground_do.setHeight(totalHeight);
				}
				_s.ytbButtonsHolder_do.setWidth(totalWidth);
				_s.ytbButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		_s.disableQualityButtons = function(curQualityLevel){
			if(curQualityLevel == "highres"
			    || curQualityLevel == "hd1080"
			 	|| curQualityLevel == "hd720" 
			 	|| curQualityLevel == "hd1440" 
			 	|| curQualityLevel == "hd2160"
			 	|| curQualityLevel == "hd2880"
			){
				_s.ytbQualityButton_do.showDisabledState();
			}else{
				_s.ytbQualityButton_do.hideDisabledState();
			}
			
			for(var i=0; i<_s.totalYtbButtons; i++){
				btn = _s.ytbButtons_ar[i];
				
				if(btn.label_str == curQualityLevel){
					FWDAnimation.killTweensOf(_s.ytbQualityArrow_do);
					if(btn.y != 0){
						_s.ytbQualityArrow_do.setY(btn.y + Math.round((btn.h - _s.ytbQualityArrow_do.h)/2));
						_s.ytbDisabledButton_do = btn;
					}
					
					btn.disable();
				}else{
					btn.enable();
				}
			}
		};
		
		_s.setYtbQualityArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = _s.ytbDisabledButton_do.y + Math.round((_s.ytbDisabledButton_do.h - _s.ytbQualityArrow_do.h)/2);
			}else{
				curY = target.y + Math.round((target.h - _s.ytbQualityArrow_do.h)/2);
			}
			
			FWDAnimation.killTweensOf(_s.ytbQualityArrow_do);
			FWDAnimation.to(_s.ytbQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		_s.showQualityButtons = function(animate){
			if(_s.areYtbQualityButtonsShowed_bl || !_s.showYoutubeQualityButton_bl) return;
			_s.hideSubtitleButtons();
			_s.areYtbQualityButtonsShowed_bl = true;
			//var finalX = parseInt(_s.ytbQualityButton_do.x + (parseInt(_s.ytbQualityButton_do.w - _s.ytbButtonsHolder_do.w)/2));
			//var finalY = parseInt(- _s.ytbButtonsHolder_do.h - 6);
			var finalX = parseInt(_s.ytbQualityButton_do.x + (parseInt(_s.ytbQualityButton_do.w - _s.ytbButtonsHolder_do.w)/2));
			var finalY = parseInt(prt.sH - _s.sH - _s.ytbButtonsHolder_do.h - 6);
			
			if(window.hasPointerEvent_bl){
				window.addEventListener("pointerdown", _s.hideQualityButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.addEventListener("mousedown", _s.hideQualityButtonsHandler);
				}
				window.addEventListener("touchstart", _s.hideQualityButtonsHandler);
			}
			
			_s.ytbButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(_s.ytbButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.ytbButtonsHolder_do);
				_s.ytbButtonsHolder_do.setY(finalY);
			}
		};
	
		_s.hideQualityButtons = function(animate){
			if(!_s.areYtbQualityButtonsShowed_bl || !_s.showYoutubeQualityButton_bl) return;
			_s.areYtbQualityButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(_s.ytbButtonsHolder_do, .6, {y:_s.sH, ease:Expo.easeInOut});
				FWDAnimation.to(_s.ytbButtonsHolder_do, .6, {y:prt.sH, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.ytbButtonsHolder_do);
				//_s.ytbButtonsHolder_do.setY(_s.sH);
				_s.ytbButtonsHolder_do.setY(prt.sH);
			}
			
			if(window.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", _s.hideQualityButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.removeEventListener("mousedown", _s.hideQualityButtonsHandler);
				}
				window.removeEventListener("touchstart", _s.hideQualityButtonsHandler);
			}
		};
		
		
		//##########################################//
		/* Setup youtube quality button */
		//##########################################//
		_s.setupYoutubeQualityButton = function(){
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.prototype = new FWDEVPTransformDisplayObject("div");
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-settings';
				_s.ytbQualityButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						_d.hdIcn,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.prototype = new FWDEVPTransformDisplayObject("div");
				_s.ytbQualityButton_do = new FWDEVPSimpleButton(
						_s.ytbQualityN_img,
						_d.ytbQualitySPath_str,
						_d.ytbQualityDPath_str,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
		
			_s.ytbQualityButton_do.setX(-300);
			_s.ytbQualityButton_do.setY(parseInt((_s.sH - _s.ytbQualityButton_do.h)/2));
			_s.ytbQualityButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.ytbQualityMouseUpHandler);
			_s.mainHolder_do.addChild(_s.ytbQualityButton_do);
		};
		
		_s.ytbQualityMouseUpHandler = function(){
			if(_s.areYtbQualityButtonsShowed_bl){
				_s.hideQualityButtons(true);
			}else{
				_s.showQualityButtons(true);
			}
		};
		
		_s.hideQualityButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(_s.ytbQualityButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(_s.ytbButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			_s.hideQualityButtons(true);
		};
		
		_s.addYtbQualityButton = function(){
			if(_s.hasYtbButton_bl || !_s.showYoutubeQualityButton_bl) return;
			_s.hasYtbButton_bl = true;
			
			if(_s.shareButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.shareButton_do) != -1){
				_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.shareButton_do), 0, _s.ytbQualityButton_do);
			}else if(_s.fullScreenButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do) != -1){
				_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do), 0, _s.ytbQualityButton_do);
			}else{
				_s.buttons_ar.splice(_s.buttons_ar.length, 0, _s.ytbQualityButton_do);
			}
			
			_s.ytbQualityButton_do.disable();
			_s.ytbQualityButton_do.rotation = 0;
			_s.ytbQualityButton_do.setRotation(_s.ytbQualityButton_do.rotation);
			_s.ytbQualityButton_do.hideDisabledState();
			_s.hideQualityButtons(false);
			
			_s.positionButtons();
		};
		
		_s.removeYtbQualityButton = function(){
			if(!_s.hasYtbButton_bl || !_s.showYoutubeQualityButton_bl) return;
			_s.hasYtbButton_bl = false;
			if(_s.volumeScrubber_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ytbQualityButton_do) != -1){
				_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ytbQualityButton_do), 1);
			}
			
			_s.ytbQualityButton_do.setX(-300);
			_s.ytbQualityButton_do.hideDisabledState();
			_s.hideQualityButtons(false);
			_s.positionButtons();
		};
		
		_s.updateQuality = function(qualityLevels, curQualityLevel){
			if(!_s.hasYtbButton_bl || !_s.showYoutubeQualityButton_bl || prt.isAdd_bl) return;
			_s.positionAndResizeYtbQualityButtons(qualityLevels);
			setTimeout(function(){
				_s.disableQualityButtons(curQualityLevel);
			},65);
			
		};	
		
		_s.enableQualtyButton = function(){
			if(_s.ytbQualityButton_do) _s.ytbQualityButton_do.enable();
		}
		
		_s.disableQualtyButton = function(){
			if(_s.ytbQualityButton_do) _s.ytbQualityButton_do.disable();
		}
		
		//##########################################//
		/* Setup subtitle button */
		//##########################################//
		_s.showSubtitleButton_bl
		_s.subtitlesSource_ar = _d.subtitles_ar;
		_s.subtitleButtons_ar = [];
		_s.totalSubttleButtons = 10;
		
		_s.setupSubtitleButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPComplexButton.setPrototype();
				FWDEVPUtils.cmpBtnNPos();
				var ic1 = 'fwdicon fwdicon-CC';
				var ic2 = 'fwdicon fwdicon-CC-off';
				_s.subtitleButton_do = new FWDEVPComplexButton(undefined, undefined, undefined, undefined, true, undefined, undefined, undefined,
					"<span class='" + ic1 + "'></span>",
					"<span class='" + ic2 + "'></span>",
					"EVPMainButtonsNormalState",
					"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPComplexButton.setPrototype();
				_s.subtitleButton_do = new FWDEVPComplexButton(
						_d.showSubtitleNPath_img,
						_d.showSubtitleSPath_str,
						_d.hideSubtitleNPath_img,
						_d.hideSubtitleSPath_str,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.subtitleButton_do.setX(-10000);
			_s.buttons_ar.push(_s.subtitleButton_do);
			_s.subtitleButton_do.setY(parseInt((_s.sH - _s.subtitleButton_do.h)/2));
			_s.subtitleButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, _s.subtitleButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.subtitleButton_do);
			
			_s.setupSubtitleButtons();
			
			if(location.protocol.indexOf("file:") != -1) _s.disableSubtitleButton();
			
			if(prt.subtitle_do.showSubtitileByDefault_bl) _s.subtitleButton_do.setButtonState(0);
		}
		
		_s.subtitleButtonMouseUpHandler = function(){
			/*
			if(_s.subtitleButton_do.currentState == 1){
				_s.dispatchEvent(FWDEVPController.SHOW_SUBTITLE);
				_s.subtitleButton_do.setButtonState(0);
			}else{
				_s.dispatchEvent(FWDEVPController.HIDE_SUBTITLE);
				_s.subtitleButton_do.setButtonState(1);
			}
			*/
			if(_s.areSubtitleButtonsShowed_bl){
				_s.hideSubtitleButtons(true);
			}else{
				_s.showSubtitleButtons(true);
			}
		};
		
		_s.disableSubtitleButton = function(){
			if(_s.subtitleButton_do) _s.subtitleButton_do.disable();
		};
		
		_s.enableSubtitleButton = function(){
			if(_s.subtitleButton_do) _s.subtitleButton_do.enable();
		};
		
		//###################################################//
		/* Setup subtitlebuttons */
		//###################################################//
		_s.updateSubtitleButtons = function(subtitles, subtitleIndex){

			if(!_s.subtitleButton_do) return;
			_s.subtitleButton_do.enable();
			_s.positionAndResizeSubtitleButtons(subtitles);
			setTimeout(function(){
				subtitleIndex = _s.subtitlesSource_ar.length - 1 - subtitleIndex;
				_s.disableSubtitleButtons(subtitleIndex);
			},65);
			_s.prevSubtitleIndex = subtitleIndex;
		};	
		
		_s.setupSubtitleButtons = function(){

			_s.subtitlesButtonsHolder_do = new FWDEVPDisplayObject("div");
			_s.subtitlesButtonsHolder_do.setOverflow("visible");
			if(_s.repeatBackground_bl){
				_s.subtitlesButtonsHolder_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
			}else{
				_s.subtitlesButtonsBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = _s.controllerBkPath_str;
				_s.subtitlesButtonsBackground_do.setScreen(img);
				_s.subtitlesButtonsHolder_do.addChild(_s.subtitlesButtonsBackground_do);
			}
			
			_s.subtitlesButtonsHolder_do.setX(300);
			_s.subtitlesButtonsHolder_do.setY(-300);
			prt.main_do.addChild(_s.subtitlesButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = _s.ytbQualityButtonPointerPath_str;
			_s.subtitlesPonter_do = new FWDEVPDisplayObject("img");
			_s.subtitlesPonter_do.setScreen(img);
			_s.subtitlesPonter_do.setWidth(_s.pointerWidth);
			_s.subtitlesPonter_do.setHeight(_s.pointerHeight);
			_s.subtitlesButtonsHolder_do.addChild(_s.subtitlesPonter_do);
	
			
			var img = new Image();
			img.src = _s.youtubeQualityArrowPath_str;
			_s.subtitleQualityArrow_do = new FWDEVPDisplayObject("img");
			_s.subtitleQualityArrow_do.setScreen(img);
			_s.subtitleQualityArrow_do.setX(7);
			_s.subtitleQualityArrow_do.setWidth(5);
			_s.subtitleQualityArrow_do.setHeight(7);
			_s.subtitlesButtonsHolder_do.addChild(_s.subtitleQualityArrow_do);
			
			var btn;
			
			for(var i=0; i<_s.totalSubttleButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton("no source", 
						_s.youtubeQualityButtonNormalColor_str, 
						_s.youtubeQualityButtonSelectedColor_str,
						_d.hdPath_str,
						i);
				
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, _s.sbtQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, _s.sbtQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, _s.sbtQualityClick);
				_s.subtitleButtons_ar[i] = btn;
				_s.subtitlesButtonsHolder_do.addChild(btn);
			}
			_s.hideSubtitleButtons(false);
		};
		
		_s.sbtQualityOver = function(e){
			_s.setSubtitleArrowPosition(e.target);
		};
		
		_s.sbtQualityOut = function(e){
			_s.setSubtitleArrowPosition(undefined);
		};
		
		_s.sbtQualityClick = function(e){
			_s.startAtSubtitle = e.id;
			_s.disableSubtitleButtons(_s.startAtSubtitle);
			_s.hideSubtitleButtons(true);
			_s.dispatchEvent(FWDEVPController.CHANGE_SUBTITLE, {id:_s.subtitlesSource_ar.length -1 - e.id});
		};
		
		_s.positionAndResizeSubtitleButtons = function(ar){

			if(!ar) return;
			
			var totalButtons = ar.length;
			if(_s.prevSubtitlesQualityButtonsLength == totalButtons) return;
			_s.prevSubtitlesQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;

			for(var i=0; i<totalButtons; i++){
				btn = _s.subtitleButtons_ar[i];
				btn.updateText(ar[i]["label"]);
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<_s.totalSubttleButtons; i++){
					btn = _s.subtitleButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -10000) btn.setX(-10000);
					}
				}
				
				for(var i=0; i<_s.totalSubttleButtons; i++){
					btn = _s.subtitleButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
				
				totalHeight = startY + 5;
				_s.subtitlesPonter_do.setX(parseInt((totalWidth - _s.subtitlesPonter_do.w)/2));
				_s.subtitlesPonter_do.setY(totalHeight);
				if(_s.subtitlesButtonsBackground_do){	
					_s.subtitlesButtonsBackground_do.setWidth(totalWidth);
					_s.subtitlesButtonsBackground_do.setHeight(totalHeight);
				}
				_s.subtitlesButtonsHolder_do.setWidth(totalWidth);
				_s.subtitlesButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		_s.disableSubtitleButtons = function(index){

			for(var i=0; i<_s.totalSubttleButtons; i++){
				btn = _s.subtitleButtons_ar[i];
				if(i == index){
					FWDAnimation.killTweensOf(_s.subtitleQualityArrow_do);
					_s.subtitleQualityArrow_do.setY(btn.y + parseInt((btn.h - _s.subtitleQualityArrow_do.h)/2) + 1);
					btn.disable();
					_s.subtitleDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
			if(_s.subtitlesSource_ar.length -1 - index == 0){
				_s.subtitleButton_do.setButtonState(0);
			}else{
				_s.subtitleButton_do.setButtonState(1);
			}
			
			
			
			/*
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720" || curQualityLevel == "hd1440" || curQualityLevel == "hd2160"){
				_s.subtitleButton_do.showDisabledState();
			}else{
				_s.subtitleButton_do.hideDisabledState();
			}
			*/
		};
		
		_s.setSubtitleArrowPosition = function(target){

			var curY = 0;
			if(!target){
				curY = _s.subtitleDisabledButton_do.y + parseInt((_s.subtitleDisabledButton_do.h - _s.subtitleQualityArrow_do.h)/2);
			}else{
				curY = target.y + parseInt((target.h - _s.subtitleQualityArrow_do.h)/2);
			}
			FWDAnimation.killTweensOf(_s.subtitleQualityArrow_do);
			FWDAnimation.to(_s.subtitleQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		_s.showSubtitleButtons = function(animate){
		
			if(_s.areSubtitleButtonsShowed_bl) return;
			_s.hideQualityButtons();
			_s.areSubtitleButtonsShowed_bl = true;
			//var finalX = parseInt(_s.subtitleButton_do.x + (parseInt(_s.subtitleButton_do.w - _s.subtitlesButtonsHolder_do.w)/2));
			//var finalY = parseInt(- _s.subtitlesButtonsHolder_do.h - 6);
			var finalX = parseInt(_s.subtitleButton_do.x + (parseInt(_s.subtitleButton_do.w - _s.subtitlesButtonsHolder_do.w)/2));
			var finalY = parseInt(prt.sH - _s.sH - _s.subtitlesButtonsHolder_do.h - 6);
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerdown", _s.hideSubtitlesButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.addEventListener("mousedown", _s.hideSubtitlesButtonsHandler);
				}
				window.addEventListener("touchstart", _s.hideSubtitlesButtonsHandler);
			}
			
			_s.subtitlesButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(_s.subtitlesButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.subtitlesButtonsHolder_do);
				_s.subtitlesButtonsHolder_do.setY(finalY);
			}
		};
	
		_s.hideSubtitleButtons = function(animate){
			if(!_s.areSubtitleButtonsShowed_bl || !_s.showSubtitleButton_bl) return;
			_s.areSubtitleButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(_s.subtitlesButtonsHolder_do, .6, {y:_s.sH, ease:Expo.easeInOut});
				FWDAnimation.to(_s.subtitlesButtonsHolder_do, .6, {y:prt.sH, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.subtitlesButtonsHolder_do);
				//_s.subtitlesButtonsHolder_do.setY(_s.sH);
				_s.subtitlesButtonsHolder_do.setY(prt.sH);
			}
			
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", _s.hideSubtitlesButtonsHandler);
			}else{
				if(!_s.isMobile_bl){
					window.removeEventListener("mousedown", _s.hideSubtitlesButtonsHandler);
				}
				window.removeEventListener("touchstart", _s.hideSubtitlesButtonsHandler);
			}
		};
		
		_s.hideSubtitlesButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(_s.subtitleButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(_s.subtitlesButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			_s.hideSubtitleButtons(true);
		};
		
	
		//##########################################//
		/* Setup facebook button */
		//##########################################//
		_s.setupRewindButton = function(){
			if(_s.useVectorIcons_bl){				
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-10';
				_s.rewindButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.rewindButton_do = new FWDEVPSimpleButton(
						_d.rewindN_img,
						_d.rewindSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.buttons_ar.push(_s.rewindButton_do);
			_s.rewindButton_do.setY(parseInt((_s.sH - _s.rewindButton_do.h)/2));
			_s.rewindButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.rewindButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.rewindButton_do);
		};
		
	
		_s.rewindButtonMouseUpHandler = function(){
			_s.dispatchEvent(FWDEVPController.REWIND);
		};
		
		_s.disableRewindButton = function(){
			if(_s.rewindButton_do) _s.rewindButton_do.disable();
		}
		
		_s.enableRewindButton = function(){
			if(_s.rewindButton_do) _s.rewindButton_do.enable();
		}
	
		//##########################################//
		/* Setup facebook button */
		//##########################################//
		_s.setupShareButton = function(){
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-share';
				_s.shareButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.shareButton_do = new FWDEVPSimpleButton(
						_s.shareN_img,
						_d.shareSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.buttons_ar.push(_s.shareButton_do);
			_s.shareButton_do.setY(parseInt((_s.sH - _s.shareButton_do.h)/2));
			_s.shareButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.facebookButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.shareButton_do);
		};
		
	
		_s.facebookButtonMouseUpHandler = function(){
			_s.dispatchEvent(FWDEVPController.SHARE);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		_s.setupDownloadButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon fwdicon-download';
				_s.downloadButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPMainButtonsNormalState",
						"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.downloadButton_do = new FWDEVPSimpleButton(_d.downloadN_img, _d.downloadSPath_str, undefined, true, _s.useHEX,
						_s.nBC,
						_s.sBC);
			}
			//_s.downloadButton_do.addListener(FWDEVPSimpleButton.SHOW_TOOLTIP, _s.downloadButtonShowToolTipHandler);
			_s.downloadButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.downloadButtonOnMouseUpHandler);
			//_s.downloadButton_do.setY(parseInt((_s.sH - _s.downloadButton_do.h)/2));
			_s.buttons_ar.push(_s.downloadButton_do);
			_s.mainHolder_do.addChild(_s.downloadButton_do); 
		};
		
		_s.downloadButtonShowToolTipHandler = function(e){
			//_s.showToolTip(_s.downloadButton_do, _s.downloadButtonToolTip_do, e.e);
		};
		
		_s.downloadButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDEVPController.DOWNLOAD_VIDEO);
		};

		//##########################################//
		/* Setup chromecast button */
		//##########################################//
		_s.setupChromecastButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPComplexButton.setPrototype();
				FWDEVPUtils.cmpBtnNPos();
				var ic1 = 'fwdicon fwdicon-cast';
				var ic2 = 'fwdicon fwdicon-uncast';
				_s.ccBtn_do = new FWDEVPComplexButton(undefined, undefined, undefined, undefined, true, undefined, undefined, undefined,
					"<span class='" + ic1 + "'></span>",
					"<span class='" + ic2 + "'></span>",
					"EVPMainButtonsNormalState cast",
					"EVPMainButtonsSelectedState cast"
				);
			}else{
				FWDEVPComplexButton.setPrototype();
				_s.ccBtn_do = new FWDEVPComplexButton(
					_d.castN_img,
					_d.castSPath_str,
					_d.uncastN_img,
					_d.uncastSPath_str,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC
				);
			}

			//_s.buttons_ar.push(_s.ccBtn_do);
			
			_s.ccBtn_do.addListener(FWDEVPComplexButton.MOUSE_UP, _s.chormecastMouseUpHandler);
			_s.ccBtn_do.setY(100);
			_s.mainHolder_do.addChild(_s.ccBtn_do);
		}

		_s.chormecastMouseUpHandler = function(){
			if(_s.ccBtn_do.currentState == 0){
				_s.dispatchEvent(FWDEVPController.UNCAST);
			}else{
				_s.dispatchEvent(FWDEVPController.CAST);
			}
		}
		
		_s.removeCCButton = function(){
			if(!_s.ccBtn_do) return;
			if(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ccBtn_do) != -1){
				_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ccBtn_do), 1);
				_s.ccBtn_do.setY(parseInt((_s.sH - _s.ccBtn_do.buttonHeight)/2));
				_s.positionButtons();
			}
		};
		
		_s.addCCButton = function(){
			
			if(!_s.ccBtn_do) return;
			
			if(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.ccBtn_do) == -1){
				if(_s.fullScreenButton_do && FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do) != -1){
					_s.buttons_ar.splice(FWDEVPUtils.indexOfArray(_s.buttons_ar, _s.fullScreenButton_do), 0, _s.ccBtn_do);
				}else{
					_s.buttons_ar.splice(_s.buttons_ar.length, 0, _s.ccBtn_do);
				}
				_s.positionButtons();
			}
		};
		
		//##########################################//
		/* Setup fullscreen button */
		//##########################################//
		_s.setupFullscreenButton = function(){
			
			if(_s.useVectorIcons_bl){
				FWDEVPComplexButton.setPrototype();
				FWDEVPUtils.cmpBtnNPos();
				var ic1 = 'fwdicon fwdicon-fullscreen';
				var ic2 = 'fwdicon fwdicon-normalscreen';
				_s.fullScreenButton_do = new FWDEVPComplexButton(undefined, undefined, undefined, undefined, true, undefined, undefined, undefined,
					"<span class='" + ic1 + "'></span>",
					"<span class='" + ic2 + "'></span>",
					"EVPMainButtonsNormalState",
					"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPComplexButton.setPrototype();
				_s.fullScreenButton_do = new FWDEVPComplexButton(
					_s.fullScreenN_img,
					_d.fullScreenSPath_str,
					_s.normalScreenN_img,
					_d.normalScreenSPath_str,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC
				);
			}
			
			
			
			_s.buttons_ar.push(_s.fullScreenButton_do);
			_s.fullScreenButton_do.setY(parseInt((_s.sH - _s.fullScreenButton_do.buttonHeight)/2));
			_s.fullScreenButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, _s.fullScreenButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.fullScreenButton_do);
		};
		
		_s.showFullScreenButton = function(){
			if(!_s.fullScreenButton_do) return;
			_s.fullScreenButton_do.setButtonState(1);
		};
		
		_s.showNormalScreenButton = function(){
			if(!_s.fullScreenButton_do) return;
			_s.fullScreenButton_do.setButtonState(0);
		};
		
		_s.setNormalStateToFullScreenButton = function(){
			if(!_s.fullScreenButton_do) return;
			_s.fullScreenButton_do.setNormalState(true);
			_s.hideQualityButtons(false);
		};
		
		_s.fullScreenButtonMouseUpHandler = function(){
			
			if(_s.fullScreenButton_do.currentState == 1){
				_s.dispatchEvent(FWDEVPController.FULL_SCREEN);
			}else{
				_s.dispatchEvent(FWDEVPController.NORMAL_SCREEN);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		_s.setupTime = function(){
			_s.time_do = new FWDEVPDisplayObject("div");
			_s.time_do.hasTransform3d_bl = false;
			_s.time_do.hasTransform2d_bl = false;
			_s.time_do.setBackfaceVisibility();
			_s.time_do.getStyle().fontFamily = "Arial";
			_s.time_do.getStyle().fontSize= "12px";
			_s.time_do.getStyle().whiteSpace= "nowrap";
			_s.time_do.getStyle().textAlign = "center";
			_s.time_do.getStyle().color = _s.timeColor_str;
			_s.time_do.getStyle().fontSmoothing = "antialiased";
			_s.time_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.time_do.getStyle().textRendering = "optimizeLegibility";	
			_s.mainHolder_do.addChild(_s.time_do);
			_s.updateTime("00:00/00:00");
			_s.buttons_ar.push(_s.time_do);
		};
		
		_s.updateTime = function(time){
			if(!_s.time_do) return;
			if(_s.isLive) time = time.substr(0, time.indexOf("/"));
			_s.time_do.setInnerHTML(time);
			
			if(_s.lastTimeLength != time.length){
				_s.time_do.w = _s.time_do.getWidth();
				_s.positionButtons();
				setTimeout(function(){
					_s.time_do.w = _s.time_do.getWidth();
					_s.time_do.h = _s.time_do.getHeight();
					
					_s.positionButtons();
				}, 50);
				_s.lastTimeLength = time.length;
			}
		};
		
		//##########################################//
		/* Setup volume button */
		//#########################################//
		_s.setupVolumeButton = function(){
			if(_s.useVectorIcons_bl){
				FWDEVPVolumeButton.setPrototype();
				FWDEVPVolumeButton.prototype.hasTransform3d_bl = false;
				FWDEVPVolumeButton.prototype.hasTransform2d_bl = false;
				_s.volumeButton_do = new FWDEVPVolumeButton(undefined, undefined, undefined, undefined, undefined, undefined,
					"<span class='fwdicon fwdicon-sound'></span>",
					"<span class='fwdicon fwdicon-sound-off'></span>",
					"EVPMainButtonsNormalState",
					"EVPMainButtonsSelectedState"
				);
			}else{
				FWDEVPVolumeButton.setPrototype();
				_s.volumeButton_do = new FWDEVPVolumeButton(_s.volumeN_img, _d.volumeSPath_str, _d.volumeDPath_str,
						_s.useHEX,
						_s.nBC,
						_s.sBC);
			}
			_s.volumeButton_do.addListener(FWDEVPVolumeButton.MOUSE_UP, _s.volumeOnMouseUpHandler);
			_s.volumeButton_do.setX(-10000);
			_s.volumeButton_do.setY(parseInt((_s.sH - _s.volumeButton_do.h)/2));
			_s.buttons_ar.push(_s.volumeButton_do);
			_s.mainHolder_do.addChild(_s.volumeButton_do); 
			if(!_s.allowToChangeVolume_bl) _s.volumeButton_do.disable();
			if(_s.volume == 0) _s.volumeButton_do.setDisabledState();
		};
		
		_s.volumeOnMouseUpHandler = function(){
			var vol = _s.lastVolume;
			
			if(_s.muted){
				vol = _s.lastVolume;
				_s.muted = false;
			}else{
				vol = 0;
				_s.muted = true;
			};
			_s.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		_s.setupVolumeScrubber = function(){
			//setup background bar
			_s.volumeScrubber_do = new FWDEVPDisplayObject("div");
			_s.volumeScrubber_do.setHeight(_s.scrubbersHeight);
			
			_s.volumeScrubberBkLeft_do = new FWDEVPDisplayObject("img");
			_s.volumeScrubberBkLeft_do.setScreen(_s.volumeScrubberBkLeft_img);
			
			_s.volumeScrubberBkRight_do = new FWDEVPDisplayObject("img");
			_s.volumeScrubberBkRight_do.setScreen(_s.volumeScrubberBkRight_img);
			
			var middleImage = new Image();
			middleImage.src = _s.volumeScrubberBkMiddlePath_str;
			
			i//f(_s.isMobile_bl){
				_s.volumeScrubberBkMiddle_do = new FWDEVPDisplayObject("div");	
				_s.volumeScrubberBkMiddle_do.getStyle().background = "url('" + _s.volumeScrubberBkMiddlePath_str + "') repeat-x";
			//}else{
				//_s.volumeScrubberBkMiddle_do = new FWDEVPDisplayObject("img");
				//_s.volumeScrubberBkMiddle_do.setScreen(middleImage);
			//}
				
			_s.volumeScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			_s.volumeScrubberDrag_do = new FWDEVPDisplayObject("div");
			_s.volumeScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			
			if(_s.useHEX){
				_s.volumeScrubberDragLeft_do = new FWDEVPDisplayObject("div");
				_s.volumeScrubberDragLeft_do.setWidth(_s.volumeScrubberDragLeft_img.width);
				_s.volumeScrubberDragLeft_do.setHeight(_s.volumeScrubberDragLeft_img.height);
				_s.volumeScrubberDragLeft_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.volumeScrubberDragLeft_img, _s.nBC).canvas;
				_s.volumeScrubberDragLeft_do.screen.appendChild(_s.volumeScrubberDragLeft_canvas);	
			}else{
				_s.volumeScrubberDragLeft_do = new FWDEVPDisplayObject("img");
				_s.volumeScrubberDragLeft_do.setScreen(_s.volumeScrubberDragLeft_img);
			}
			
			
			if(!_s.useHEX){
				_s.volumeScrubberDragMiddle_do = new FWDEVPDisplayObject("div");	
				_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			_s.volumeScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
		
			_s.volumeScrubberBarLine_do = new FWDEVPDisplayObject("img");
			_s.volumeScrubberBarLine_do.setScreen(_s.volumeScrubberLine_img);
			
			_s.volumeScrubberBarLine_do.setAlpha(0);
			_s.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			_s.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			
			_s.volumeScrubber_do.setWidth(_s.volumeScrubberWidth);
			_s.volumeScrubberBkMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
			_s.volumeScrubberBkRight_do.setX(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.volumeScrubberDragMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
			
			//add all children
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkLeft_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkRight_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragLeft_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberDrag_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			
			_s.buttons_ar.push(_s.volumeScrubber_do);
			
			_s.mainHolder_do.addChild(_s.volumeScrubber_do);
		
			
			if(!_s.disableVideoScrubber_bl){
				if(_s.hasPointerEvent_bl){
					_s.volumeScrubber_do.screen.addEventListener("pointerover", _s.volumeScrubberOnOverHandler);
					_s.volumeScrubber_do.screen.addEventListener("pointerout", _s.volumeScrubberOnOutHandler);
					_s.volumeScrubber_do.screen.addEventListener("pointerdown", _s.volumeScrubberOnDownHandler);
				}else if(_s.screen.addEventListener){	
					if(!_s.isMobile_bl){
						_s.volumeScrubber_do.screen.addEventListener("mouseover", _s.volumeScrubberOnOverHandler);
						_s.volumeScrubber_do.screen.addEventListener("mouseout", _s.volumeScrubberOnOutHandler);
						_s.volumeScrubber_do.screen.addEventListener("mousedown", _s.volumeScrubberOnDownHandler);
						_s.volumeScrubber_do.screen.addEventListener("click", _s.volumeScrubberOnDownHandler);
					}
					_s.volumeScrubber_do.screen.addEventListener("touchstart", _s.volumeScrubberOnDownHandler);
				}
			}

			if(_d.showMainScrubberToolTipLabel_bl){
				FWDEVPScrubberToolip.setPrototype();
				_s.ttm2 = new FWDEVPScrubberToolip(_s.volumeScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, '10');
				_s.addChild(_s.ttm2);
			}
			
			_s.enableVolumeScrubber();
			_s.updateVolumeScrubber(_s.volume);
		};

		_s.updateVolumeToolTip = function(){
			if(!_d.showMainScrubberToolTipLabel_bl) return;
			_s.ttm2.setLabel(Math.round(_s.volume * 100));
			/*var x = _s.volumeScrubber_do.x + prt.main_do.x;
			if(prt.displayType == FWDEVPlayer.STICKY){}*/
			var x =  _s.volumeScrubber_do.x
			x = Math.round(x + (_s.volume * _s.volumeScrubberWidth) - _s.ttm2.getWidth()/2);
			_s.ttm2.setX(x);
			_s.ttm2.setY(_s.volumeScrubber_do.y - _s.ttm2.h - 2);
		}
		
		_s.volumeScrubberOnOverHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			_s.updateVolumeToolTip();
		};
		
		_s.volumeScrubberOnOutHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(!_s.isVolumeScrubberScrubbing_bl){
				if(_s.ttm2) _s.ttm2.hide();
			}
		};
		
		_s.volumeScrubberOnDownHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			
			_s.isVolumeScrubberScrubbing_bl = true;
			_s.updateVolume(percentScrubbed);
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			if(_s.disable_do) _s.addChild(_s.disable_do);
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			_s.updateVolumeToolTip();
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointermove", _s.volumeScrubberMoveHandler);
				window.addEventListener("pointerup", _s.volumeScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.addEventListener("mouseup", _s.volumeScrubberEndHandler);		
				window.addEventListener("touchmove", _s.volumeScrubberMoveHandler);
				window.addEventListener("touchend", _s.volumeScrubberEndHandler);
			}	
		};
		
		_s.volumeScrubberMoveHandler = function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			_s.updateVolumeToolTip();
		};
		
		_s.volumeScrubberEndHandler = function(e){
			_s.isVolumeScrubberScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			if(e){
				var wp = FWDEVPUtils.getViewportMouseCoordinates(e);
				if(!FWDEVPUtils.hitTest(_s.volumeScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm2) _s.ttm2.hide();
				}
			}
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointermove", _s.volumeScrubberMoveHandler);
				window.removeEventListener("pointerup",  _s.volumeScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.removeEventListener("mouseup",  _s.volumeScrubberEndHandler);		
				window.removeEventListener("touchmove", _s.volumeScrubberMoveHandler);
				window.removeEventListener("touchend", _s.volumeScrubberEndHandler);
			}
		};
		
		_s.disableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = true;
			_s.volumeScrubber_do.setButtonMode(false);
			_s.volumeScrubberEndHandler();
		};
		
		_s.enableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = false;
			_s.volumeScrubber_do.setButtonMode(true);
		};
		
		_s.updateVolumeScrubber = function(percent){
			if(!_s.showVolumeScrubber_bl) return;
			var finalWidth = parseInt(percent * _s.volumeScrubberWidth); 
			_s.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && _s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !_s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.volumeScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		_s.updateVolume = function(volume, preventEvent){
			if(!_s.showVolumeScrubber_bl) return;
			_s.volume = volume;
			if(_s.volume <= 0.000001){
				_s.muted = true;
				_s.volume = 0;
			}else if(_s.voume >= 1){
				_s.muted = false;
				_s.volume = 1;
			}else{
				_s.muted = false;
			}
			
			if(_s.volume == 0){
				if(_s.volumeButton_do) _s.volumeButton_do.setDisabledState();
			}else{
				if(_s.volumeButton_do) _s.volumeButton_do.setEnabledState();
			}
			
			if(_s.volumeScrubberBarLine_do) _s.updateVolumeScrubber(_s.volume);
			if(!preventEvent) _s.dispatchEvent(FWDEVPController.CHANGE_VOLUME, {percent:_s.volume});
		};
		
		_s.mute = function(){
			_s.updateVolume();
		}
	
		
		//###################################//
		/* show / hide */
		//###################################//
		_s.show = function(animate){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(0);
			}
			setTimeout(_s.positionButtons, 200);
		};
		
		_s.hide = function(animate, hideForGood){
			if(!_s.isShowed_bl && !hideForGood) return;
			_s.isShowed_bl = false;
			var offsetY = 0;
			if(hideForGood) offsetY = _s.mainScrubberOffestTop;

			if(_s.atb && _s.atb.isShowed_bl) offsetY += _s.h + 1;
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:_s.sH + offsetY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(_s.sH + offsetY);
			}
			_s.hideQualityButtons(true);
			_s.hidePlaybackRateButtons(true);
			_s.hideSubtitleButtons(true);
		};
		
		
		_s.mainScrubberDragMiddleAddPath_str = _d.mainScrubberDragMiddleAddPath_str;
		_s.updateHexColorForScrubber = function(isAdd){
			if(isAdd){
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddleAddPath_str + "') repeat-x";
				_s.mainScrubberDragLeft_do.screen.src = _d.mainScrubberDragLeftAddPath_str;
			}else{
				if(_s.useHEX && _s.mainSCrubberMiddleCanvas){
					var newCenterImage = FWDEVPUtils.changeCanvasHEXColor(_s.mainScrubberMiddleImage, _s.mainSCrubberMiddleCanvas, _s.nBC, true);
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
				}else{
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
					_s.mainScrubberDragLeft_do.screen.src = _s.mainScrubberDragLeftSource;
				}
			}
		}

		_s.updateHEXColors = function(nBC, sBC){
		 	_s.nBC = nBC;
            _s.sBC = sBC;
		}
		
	
		_s.init();
	};
	
	/* set prototype */
	FWDEVPController.setPrototype = function(){
		FWDEVPController.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPController.CAST = 'cast';
	FWDEVPController.UNCAST = 'uncast';
	FWDEVPController.REWIND = "rewind";
	FWDEVPController.DOWNLOAD_VIDEO = "downloadVideo";
	FWDEVPController.SHOW_SUBTITLE = "showSubtitle";
	FWDEVPController.HIDE_SUBTITLE = "hideSubtitle";
	FWDEVPController.SHARE = "share";
	FWDEVPController.FULL_SCREEN = "fullScreen";
	FWDEVPController.NORMAL_SCREEN = "normalScreen";
	FWDEVPController.PLAY = "play";
	FWDEVPController.PAUSE = "pause";
	FWDEVPController.START_TO_SCRUB = "startToScrub";
	FWDEVPController.SCRUB = "scrub";
	FWDEVPController.STOP_TO_SCRUB = "stopToScrub";
	FWDEVPController.CHANGE_VOLUME = "changeVolume";
	FWDEVPController.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality";
	FWDEVPController.SHOW_EMBED_WINDOW = "showEmbedWindow";
	FWDEVPController.CHANGE_SUBTITLE = "changeSubtitle";
	FWDEVPController.CHANGE_PLAYBACK_RATES = "changePlaybackRates";
	
	
	FWDEVPController.prototype = null;
	window.FWDEVPController = FWDEVPController;
	
}(window));