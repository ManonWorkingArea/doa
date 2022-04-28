/* Data */
(function(window){
	
	var FWDEVPData = function(props, playListElement, root){
		
		var _s = this;
		var prototype = FWDEVPData.prototype;
		
		_s.skipIconPath_img = null;
		_s.mainPreloader_img = null;
		_s.bkLeft_img = null;
		_s.bkMiddle_img = null;
		_s.bkRight_img = null;
		_s.playN_img = null;
		_s.pauseN_img = null;
		_s.mainScrubberBkLeft_img = null;
		_s.mainScrubberBkRight_img = null;
		_s.mainScrubberDragLeft_img = null;
		_s.mainScrubberLine_img = null;
		_s.volumeScrubberBkLeft_img = null;
		_s.volumeScrubberBkRight_img = null;
		_s.volumeScrubberDragLeft_img = null;
		_s.volumeScrubberLine_img = null;
		_s.volumeN_img = null;
		_s.progressLeft_img = null;
		_s.largePlayN_img = null;
		_s.fullScreenN_img = null;
		_s.ytbQualityN_img = null;
		_s.ytbQualityD_img = null;
		_s.shareN_img = null;
		_s.normalScreenN_img = null;
		_s.embedN_img = null;
		_s.embedColoseN_img = null;
	
		_s.props = props;
		_s.skinPaths_ar = [];
		_s.images_ar = [];
	
		_s.sknPth = null;
		_s.flashPath_str = null;
		_s.flashCopyToCBPath_str = null;
		_s.mainFolderPath_str = null;
		_s.bkMiddlePath_str = null;
		_s.hdPath_str = null;
		_s.youtubeQualityArrowPath_str = null;
		_s.mainScrubberBkMiddlePath_str = null;
		_s.volumeScrubberBkMiddlePath_str = null;
		_s.mainScrubberDragMiddlePath_str = null;
		_s.volumeScrubberDragMiddlePath_str = null;
		_s.timeColor_str = null;
		_s.progressMiddlePath_str = null;
		_s.facebookAppId_str = null;
		_s.ytbQualityButtonPointerPath_str = null;
		_s.youtubeQualityButtonNormalColor_str = null;
		_s.youtubeQualityButtonSelectedColor_str = null;
		_s.controllerBkPath_str = null;
		_s.logoPosition_str = null;
		_s.logoPath_str = null;
		_s.shareAndEmbedTextColor_str = null;
		_s.inputBackgroundColor_str = null;
		_s.borderColor_str = null;
		_s.inputColor_str = null;
		_s.secondaryLabelsColor_str = null;
		_s.mainLabelsColor_str = null;
		_s.embedPathS_str = null;
		_s.embedWindowClosePathS_str = null;
		_s.embedWindowInputBackgroundPath_str = null;
		_s.embedCopyButtonNPath_str = null;
		_s.embedCopyButtonSPath_str = null;
		_s.sendButtonNPath_str = null;
		_s.sendButtonSPath_str = null;
		_s.embedWindowBackground_str = null;
		
		_s.controllerHeight = 0;
		_s.countLoadedSkinImages = 0;
		_s.volume = 1;
		_s.controllerHideDelay = 0;
		_s.startSpaceBetweenButtons = 0;
		_s.spaceBetweenButtons = 0;
		_s.scrubbersOffsetWidth = 0;
		_s.volumeScrubberOffsetRightWidth = 0;
		_s.timeOffsetLeftWidth = 0;
		_s.timeOffsetTop = 0;
		_s.logoMargins = 0;
		_s.embedWindowCloseButtonMargins = 0;
		
		_s.loadImageId_to;
		_s.dispatchLoadSkinCompleteWithDelayId_to;
		
		_s.showEmbedButton_bl;
		_s.showShareButton_bl;
		_s.allowToChangeVolume_bl = true;
		_s.showContextMenu_bl = false;
		_s.autoPlay_bl = false;
		_s.showPoster_bl = false;
		_s.loop_bl = false;
		_s.showVolumeScrubber_bl = false;
		_s.showVolumeButton_bl = false;
		_s.showControllerWhenVideoIsStopped_bl = false;
		_s.showLogo_bl = false;
		_s.hideLogoWithController_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		_s.init = function(){
			_s.parseProperties();
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		_s.parseProperties = function(){
			
			_s.useHEX = _s.props.useHEXColorsForSkin; 
			_s.useHEX = _s.useHEX == "yes" ? true : false;
			if(location.protocol.indexOf("file:") != -1) _s.useHEX = false;
			
			_s.mainFolderPath_str = _s.props.mainFolderPath;
			if(!_s.mainFolderPath_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((_s.mainFolderPath_str.lastIndexOf("/") + 1) != _s.mainFolderPath_str.length){
				_s.mainFolderPath_str += "/";
			}
			
			_s.sknPth = _s.props.skinPath;
			if(!_s.sknPth){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			/*
			if(!_s.useHEX){
				if(_s.sknPth.indexOf("dark") != -1){
					_s.sknPth = "minimal_skin_dark"
				}else if(_s.sknPth.indexOf("white") != -1){
					_s.sknPth = "minimal_skin_white";
				}
			}
			*/
			
			if((_s.sknPth.lastIndexOf("/") + 1) != _s.sknPth.length){
				_s.sknPth += "/";
			}
			
			_s.sknPth = _s.mainFolderPath_str + _s.sknPth;
			_s.flashPath_str = _s.mainFolderPath_str + "flashlsChromeless.swf";
			_s.flashCopyToCBPath_str = _s.mainFolderPath_str + "cb.swf";
			_s.sendToAFriendPath_str = _s.mainFolderPath_str + "sendMailToAFriend.php"; 
			_s.videoDownloaderPath_str = _s.mainFolderPath_str  + "downloader.php";
			_s.mailPath_str = _s.mainFolderPath_str  + "sendMail.php";
			_s.hlsPath_str = _s.mainFolderPath_str  + "java/hls.js";
			_s.dashPath_str = _s.mainFolderPath_str  + "java/dash.all.min.js";
			_s.threeJsPath_str = _s.mainFolderPath_str  + "java/three.js";
			_s.threeJsControlsPath_str = _s.mainFolderPath_str  + "java/threeControled.js";

			_s.isDark = true;
			if(_s.sknPth.indexOf('dark') == -1){
				_s.isDark = false;
			}

			
			//_s.videoSourcePath_str = _s.props.videoSourcePath || undefined;
			_s.timeColor_str = _s.props.timeColor || "#FF0000";
			
			_s.privateVideoPassword_str = _s.props.privateVideoPassword;
			
			_s.adsVideoSourcePath_str = _s.props.adsVideoSourcePath;
			_s.adsPageToOpenURL_str = _s.props.adsPageToOpenURL;
			_s.adsPageToOpenTarget_str = _s.props.adsPageToOpenTarget || "_blank";
			_s.adsThumbnailPath_str = _s.props.adsThumbnailPath;
		
			_s.youtubeQualityButtonNormalColor_str = _s.props.youtubeQualityButtonNormalColor || "#FF0000";
			_s.youtubeQualityButtonSelectedColor_str = _s.props.youtubeQualityButtonSelectedColor || "#FF0000";
			_s.posterBackgroundColor_str = _s.props.posterBackgroundColor || "transparent";
			
			_s.logoPosition_str = _s.props.logoPosition || "topleft";
			_s.logoPosition_str = String(_s.logoPosition_str).toLowerCase();
			test = _s.logoPosition_str == "topleft" 
					   || _s.logoPosition_str == "topright"
					   || _s.logoPosition_str == "bottomleft"
					   || _s.logoPosition_str == "bottomright";
						   
			if(!test) _s.logoPosition_str = "topleft";
			
			_s.adsButtonsPosition_str = _s.props.adsButtonsPosition || "left";
			_s.adsButtonsPosition_str = String(_s.adsButtonsPosition_str).toLowerCase();
			test = _s.adsButtonsPosition_str == "left" 
					   || _s.adsButtonsPosition_str == "right";
					 	   
			if(!test) _s.adsButtonsPosition_str = "left";
			
			
			_s.rightClickContextMenu_str = _s.props.rightClickContextMenu || "developer";
			test = _s.rightClickContextMenu_str == "developer" 
				   || _s.rightClickContextMenu_str == "disabled"
				   || _s.rightClickContextMenu_str == "default";
			if(!test) _s.rightClickContextMenu_str = "developer";
			
			_s.logoLink_str = _s.props.logoLink || "none";
			_s.skipToVideoButtonText_str = _s.props.skipToVideoButtonText || "not defined";
			
			_s.skipToVideoText_str = _s.props.skipToVideoText;
			
			_s.shareAndEmbedTextColor_str = _s.props.shareAndEmbedTextColor || "#FF0000";
			_s.inputBackgroundColor_str = _s.props.inputBackgroundColor || "#FF0000";
			_s.borderColor_str = _s.props.borderColor || "#FF0000";
			_s.inputColor_str = _s.props.inputColor || "#FF0000";
			_s.secondaryLabelsColor_str = _s.props.secondaryLabelsColor || "#FF0000"; 
			_s.mainLabelsColor_str = _s.props.mainLabelsColor || "#FF0000"; 
			_s.adsTextNormalColor = _s.props.adsTextNormalColor || "#FF0000";
			_s.adsTextSelectedColor = _s.props.adsTextSelectedColor || "#FF0000";
			_s.adsBorderNormalColor_str = _s.props.adsBorderNormalColor || "#FF0000";
			_s.adsBorderSelectedColor_str = _s.props.adsBorderSelectedColor || "#FF0000";
			
			_s.nBC = _s.props.normalHEXButtonsColor || "#FFFFFF";
			//_s.sBC = _s.props.selectedHEXButtonsColor || "#999999";

			if(_s.sknPth.indexOf('dark') != -1){
				_s.sBC = '#FFFFFF';
			}else{
				_s.sBC = '#000000';
			}
		
			_s.volume = _s.props.volume;
			if(_s.volume == undefined) _s.volume = 1;
			if(isNaN(_s.volume)) volume = 1;
			
			if(_s.volume > 1){
				_s.volume = 1;
			}else if(_s.volume <=0){
				_s.volume = 0;
			}
			
			_s.audioVisualizerLinesColor_str = _s.props.audioVisualizerLinesColor || "#0099FF";
			_s.audioVisualizerCircleColor_str = _s.props.audioVisualizerCircleColor || "#00FF00";
			
			_s.controllerHeight = _s.props.controllerHeight || 50;
			_s.startSpaceBetweenButtons = _s.props.startSpaceBetweenButtons || 0;
			_s.controllerHideDelay = _s.props.controllerHideDelay || 2;
			_s.controllerHideDelay *= 1000;
			_s.spaceBetweenButtons = _s.props.spaceBetweenButtons || 0;
			_s.scrubbersOffsetWidth = _s.props.scrubbersOffsetWidth || 0;
			_s.volumeScrubberOffsetRightWidth = _s.props.volumeScrubberOffsetRightWidth || 0;
			_s.timeOffsetLeftWidth = _s.props.timeOffsetLeftWidth || 0;
			_s.timeOffsetRightWidth = _s.props.timeOffsetRightWidth || 0;
			_s.timeOffsetTop = _s.props.timeOffsetTop || 0;
			_s.embedWindowCloseButtonMargins = _s.props.embedWindowCloseButtonMargins || 0;
			_s.logoMargins = _s.props.logoMargins || 0;
			_s.mainScrubberOffestTop = _s.props.mainScrubberOffestTop || 0;
			_s.volumeScrubberWidth = _s.props.volumeScrubberWidth || 10;
			if(_s.volumeScrubberWidth > 200) _s.volumeScrubberWidth = 200;
			_s.timeToHoldAds = 4;

			_s.greenScreenTolerance = _s.props.greenScreenTolerance || 200;
			
			
			if(_s.isMobile_bl) _s.allowToChangeVolume_bl = false;
			
			_s.showContextMenu_bl = _s.props.showContextMenu; 
			_s.showContextMenu_bl = _s.showContextMenu_bl == "no" ? false : true;
			
			_s.showDefaultControllerForVimeo_bl = _s.props.showDefaultControllerForVimeo; 
			_s.showDefaultControllerForVimeo_bl = _s.showDefaultControllerForVimeo_bl == "yes" ? true : false;

			_s.showScrubberWhenControllerIsHidden_bl = _s.props.showScrubberWhenControllerIsHidden; 
			_s.showScrubberWhenControllerIsHidden_bl = _s.showScrubberWhenControllerIsHidden_bl == "no" ? false : true;

			_s.addKeyboardSupport_bl = _s.props.addKeyboardSupport; 
			_s.addKeyboardSupport_bl = _s.addKeyboardSupport_bl == "no" ? false : true;
			
			_s.autoPlay_bl = _s.props.autoPlay; 
			_s.autoPlay_bl = _s.autoPlay_bl == "yes" ? true : false;
			_s.autoPlayText = _s.props.autoPlayText;
			
			_s.contextMenuType = _s.props.contextMenuType || 'default';
			
			_s.scrubAtTimeAtFirstPlay = _s.props.scrubAtTimeAtFirstPlay || "00:00:00";
			_s.scrubAtTimeAtFirstPlay = FWDEVPUtils.getSecondsFromString(_s.scrubAtTimeAtFirstPlay);
			
			_s.loop_bl = _s.props.loop;
			_s.loop_bl = _s.loop_bl == "yes" ? true : false;
			
			_s.showSkipButton_bl = true;
			
			_s.showLogo_bl = _s.props.showLogo; 
			_s.showLogo_bl = _s.showLogo_bl == "yes" ? true : false;
			
			
			_s.showRewindButton_bl = _s.props.showRewindButton; 
			_s.showRewindButton_bl = _s.showRewindButton_bl == "yes" ? true : false;

			_s.clsLghtbPlayFinish = _s.props.closeLightBoxWhenPlayComplete; 
			_s.clsLghtbPlayFinish = _s.clsLghtbPlayFinish == "yes" ? true : false;
			
			_s.openDownloadLinkOnMobile_bl = _s.props.openDownloadLinkOnMobile; 
			_s.openDownloadLinkOnMobile_bl = _s.openDownloadLinkOnMobile_bl == "yes" ? true : false;
			
			_s.thumbnailsPreview = _s.props.thumbnailsPreview || false;
			
			_s.thumbnailsPreviewWidth = _s.props.thumbnailsPreviewWidth || 300
			_s.thumbnailsPreviewHeight = _s.props.thumbnailsPreviewHeight || 168
			_s.thumbnailsPreviewBackgroundColor =  _s.props.thumbnailsPreviewBackgroundColor || "#000";
			_s.thumbnailsPreviewBorderColor =	_s.props.thumbnailsPreviewBorderColor || "#333";
			_s.thumbnailsPreviewLabelBackgroundColor =	_s.props.thumbnailsPreviewLabelBackgroundColor || "#FFF";
			_s.thumbnailsPreviewLabelFontColor =	_s.props.thumbnailsPreviewLabelFontColor || "#000";

			_s.contextMenuBackgroundColor_str = _s.props.contextMenuBackgroundColor || "#000000";
			_s.contextMenuBorderColor_str = _s.props.contextMenuBorderColor || "#FF0000";
			_s.contextMenuSpacerColor_str = _s.props.contextMenuSpacerColor || "#FF0000";
			_s.contextMenuItemNormalColor_str = _s.props.contextMenuItemNormalColor || "#FF0000";
			_s.contextMenuItemSelectedColor_str = _s.props.contextMenuItemSelectedColor || "#FF0000";
			_s.contextMenuItemDisabledColor_str = _s.props.contextMenuItemDisabledColor || "#FF0000";
		
			//loggin
			_s.playVideoOnlyWhenLoggedIn_bl = _s.props.playVideoOnlyWhenLoggedIn; 
			_s.playVideoOnlyWhenLoggedIn_bl = _s.playVideoOnlyWhenLoggedIn_bl == "yes" ? true : false;
			
			_s.isLoggedIn_bl = _s.props.isLoggedIn; 
			_s.isLoggedIn_bl = _s.isLoggedIn_bl == "yes" ? true : false;
			
			_s.useVectorIcons_bl = _s.props.useVectorIcons; 
			_s.useVectorIcons_bl = _s.useVectorIcons_bl == "yes" ? true : false;
					
			_s.loggedInMessage_str = _s.props.loggedInMessage || "Only loggedin users can view this video";
					
			_s.hideLogoWithController_bl = _s.props.hideLogoWithController; 
			_s.hideLogoWithController_bl = _s.hideLogoWithController_bl == "yes" ? true : false;
			
			_s.showDefaultControllerForVimeo_bl = _s.props.showDefaultControllerForVimeo; 
			_s.showDefaultControllerForVimeo_bl = _s.showDefaultControllerForVimeo_bl == "yes" ? true : false;
			
			_s.aopwSource = _s.props.aopwSource; 
			_s.aopwBorderSize = _s.props.aopwBorderSize || 0; 
			_s.aopwTitle = _s.props.aopwTitle || "Advertisement";
			_s.aopwTitleColor_str = _s.props.aopwTitleColor || "#FFFFFF"; 
			
			_s.openerAlignment_str = _s.props.openerAlignment;
			_s.openerEqulizerOffsetTop = _s.props.openerEqulizerOffsetTop || 0;
			_s.openerEqulizerOffsetLeft = _s.props.openerEqulizerOffsetLeft || 0;
			
			_s.showOpener_bl = _s.props.showOpener; 
			_s.showOpener_bl = _s.showOpener_bl == "yes" ? true : false;
			
			_s.showOpenerPlayPauseButton_bl = _s.props.showOpenerPlayPauseButton;
			_s.showOpenerPlayPauseButton_bl = _s.showOpenerPlayPauseButton_bl == "yes" ? true : false;
			
			_s.animate_bl = _s.props.animatePlayer; 
			_s.animate_bl = _s.animate_bl == "yes" ? true : false;

			_s.contextMenuType = _s.props.contextMenuType || 'default';
			
			_s.useAToB = _s.props.useAToB == "yes" ? true : false;
			_s.playsinline = _s.props.playsinline == "yes" ? true : false;
		
			_s.atbTimeBackgroundColor = _s.props.atbTimeBackgroundColor || "transparent";
			_s.atbTimeTextColorNormal = _s.props.atbTimeTextColorNormal ||  "#888888";
			_s.atbTimeTextColorSelected = _s.props.atbTimeTextColorSelected || "#FFFFFF";
			_s.atbButtonTextNormalColor = _s.props.atbButtonTextNormalColor || "#888888";
			_s.atbButtonTextSelectedColor = _s.props.atbButtonTextSelectedColor || "#FFFFFF";
			_s.atbButtonBackgroundNormalColor = _s.props.atbButtonBackgroundNormalColor || "#FFFFFF";
			_s.atbButtonBackgroundSelectedColor = _s.props.atbButtonBackgroundSelectedColor || "#000000";

			_s.scrubbersToolTipLabelBackgroundColor = _s.props.scrubbersToolTipLabelBackgroundColor || "#FFFFFF";
			_s.scrubbersToolTipLabelFontColor  = _s.props.scrubbersToolTipLabelFontColor || "#000000";
			
			_s.showMainScrubberToolTipLabel_bl = _s.props.showMainScrubberToolTipLabel;
			_s.showMainScrubberToolTipLabel_bl = _s.showMainScrubberToolTipLabel_bl == "yes" ? true : false;
			
			//if(_s.thumbnailsPreview) _s.showMainScrubberToolTipLabel_bl = false;
			
			_s.aopwWidth = _s.props.aopwWidth || 200; 
			_s.aopwHeight = _s.props.aopwHeight || 200; 
			if(_s.aopwSource && String(_s.aopwSource.length) > 5){
				_s.showAopwWindow_bl = true;
			}else{
				_s.showAopwWindow_bl = false;
			}
			
			_s.fillEntireScreenWithPoster_bl = _s.props.fillEntireScreenWithPoster; 
			_s.fillEntireScreenWithPoster_bl = _s.fillEntireScreenWithPoster_bl == "yes" ? true : false;

			_s.fillEntireposterScreen = _s.props.fillEntireposterScreen; 
			_s.fillEntireposterScreen = _s.fillEntireposterScreen == "yes" ? true : false;
			
			_s.startAtTime = _s.props.startAtTime;
			if(_s.startAtTime == "00:00:00" || !FWDEVPUtils.checkTime(_s.startAtTime)) _s.startAtTime = undefined;
			
			_s.stopAtTime = _s.props.stopAtTime;
			if(_s.stopAtTime == "00:00:00" || !FWDEVPUtils.checkTime(_s.stopAtTime)) _s.stopAtTime = undefined;
		
			_s.showPoster_bl = _s.props.showPoster; 
			_s.showPoster_bl = _s.showPoster_bl == "yes" ? true : false;
			
			_s.showVolumeScrubber_bl = _s.props.showVolumeScrubber; 
			_s.showVolumeScrubber_bl = _s.showVolumeScrubber_bl == "no" ? false : true;
			
			_s.showVolumeButton_bl = _s.props.showVolumeButton; 
			_s.showVolumeButton_bl = _s.showVolumeButton_bl == "no" ? false : true;
			
			_s.showControllerWhenVideoIsStopped_bl = _s.props.showControllerWhenVideoIsStopped; 
			_s.showControllerWhenVideoIsStopped_bl = _s.showControllerWhenVideoIsStopped_bl == "yes" ? true : false;
			
			_s.showTime_bl = _s.props.showTime; 
			_s.showTime_bl = _s.showTime_bl == "no" ? false : true;
			
			_s.showAnnotationsPositionTool_bl = _s.props.showAnnotationsPositionTool; 
			_s.showAnnotationsPositionTool_bl = _s.showAnnotationsPositionTool_bl == "yes" ? true : false;
			
			_s.showDownloadVideoButton_bl = _s.props.showDownloadButton; 
			_s.showDownloadVideoButton_bl = _s.showDownloadVideoButton_bl == "yes" ? true : false;
			
			_s.showFullScreenButton_bl = _s.props.showFullScreenButton; 
			_s.showFullScreenButton_bl = _s.showFullScreenButton_bl == "no" ? false : true;

			_s.showChromecastButton_bl = _s.props.showChromecastButton; 
			_s.showChromecastButton_bl = _s.showChromecastButton_bl == "yes" ? true : false;
			if(!FWDEVPUtils.isChrome || FWDEVPUtils.isLocal || location.href.indexOf("https:") == -1) _s.showChromecastButton_bl = false;
			
			_s.executeCuepointsOnlyOnce_bl = _s.props.executeCuepointsOnlyOnce; 
			_s.executeCuepointsOnlyOnce_bl = _s.executeCuepointsOnlyOnce_bl == "yes" ? true : false;
			
			if(_s.showAnnotationsPositionTool_bl) _s.showFullScreenButton_bl = false;

			_s.goFullScreenOnPlay_bl = _s.props.goFullScreenOnButtonPlay; 
			_s.goFullScreenOnPlay_bl = _s.goFullScreenOnPlay_bl == "yes" ? true : false;
			
			_s.repeatBackground_bl = _s.props.repeatBackground; 
			_s.repeatBackground_bl = _s.repeatBackground_bl == "no" ? false : true;
			
			_s.showShareButton_bl = _s.props.showShareButton; 
			_s.showShareButton_bl = _s.showShareButton_bl == "no" ? false : true;
			
			_s.showEmbedButton_bl = _s.props.showEmbedButton; 
			_s.showEmbedButton_bl = _s.showEmbedButton_bl == "no" ? false : true;
			
			_s.showController_bl = _s.props.showController; 
			_s.showController_bl = _s.showController_bl == "no" ? false : true;
			
			_s.fillEntireVideoScreen_bl = _s.props.fillEntireVideoScreen; 
			_s.fillEntireVideoScreen_bl = _s.fillEntireVideoScreen_bl == "yes" ? true : false;
														    
			_s.showSubtitileByDefault_bl = _s.props.showSubtitleByDefault; 
			_s.showSubtitileByDefault_bl = _s.showSubtitileByDefault_bl == "no" ? false : true;

			_s.useResumeOnPlay_bl = _s.props.useResumeOnPlay; 
			_s.useResumeOnPlay_bl = _s.useResumeOnPlay_bl == "yes" ? true : false;
			
			_s.showPopupAdsCloseButton_bl = _s.props.showPopupAdsCloseButton; 
			_s.showPopupAdsCloseButton_bl = _s.showPopupAdsCloseButton_bl == "no" ? false : true;
			
			_s.showSubtitleButton_bl = _s.props.showSubtitleButton;
			_s.showSubtitleButton_bl = _s.showSubtitleButton_bl == "no" ? false : true;
			
			_s.useChromeless_bl = _s.props.useChromeless;
			_s.useChromeless_bl = _s.useChromeless_bl == "yes" ? true : false;

			_s.stickyOnScrollShowOpener_bl = _s.props.stickyOnScrollShowOpener; 
			_s.stickyOnScrollShowOpener_bl = _s.stickyOnScrollShowOpener_bl == "yes" ? true : false;

			_s.hasAds_bl = _s.adsVideoSourcePath_str;
			_s.hasAds_bl = _s.hasAds_bl == "none" ? false : true;
			if(!_s.adsVideoSourcePath_str) _s.hasAds_bl = false;
		
			_s.openNewPageAtTheEndOfTheAds_bl =  _s.props.openNewPageAtTheEndOfTheAds;
			_s.openNewPageAtTheEndOfTheAds_bl = _s.openNewPageAtTheEndOfTheAds_bl == "yes" ? true : false;
			
			_s.vastXML = _s.props.vastSource;
			if(_s.vastXML && FWDEVPUtils.isIMA(_s.vastXML)){
				_s.imaURL = _s.vastXML;
				_s.vastXML = undefined;
			}
			_s.vastLinearStartTime = _s.props.vastLinearStartTime || "00:00:00";
			_s.vastNonLinearStartTime = _s.props.vastNonLinearStartTime || "00:00:00";
			_s.vastClickTroughTarget = _s.props.vastClickTroughTarget || "_blank";
			
			_s.redirectURL = _s.props.redirectURL;
			if(_s.redirectURL != undefined && _s.redirectURL.length < 4) _s.redirectURL = undefined;
			_s.redirectTarget = _s.props.redirectTarget || "_self";
			if(_s.redirectTarget != "_self" 
				&& _s.redirectTarget != "_blank" 
				&& _s.redirectTarget != "_parent"
			){
				_s.redirectTarget = "_blank";
			}
		
			_s.showYoutubeQualityButton_bl = _s.props.showQualityButton;
			_s.showYoutubeQualityButton_bl = _s.showYoutubeQualityButton_bl == "no" ? false : true;
			//if(FWDEVPlayer.useYoutube == "no" || _s.isMobile_bl) _s.showYoutubeQualityButton_bl = false;
			
			_s.showPlaybackRateButton_bl = _s.props.showPlaybackRateButton;
			_s.showPlaybackRateButton_bl = _s.showPlaybackRateButton_bl == "yes" ? true : false;
			
			_s.defaultPlaybackRate_str = _s.props.defaultPlaybackRate;
			_s.defaultPlaybackRate_ar = ["0.25", "0.5", "1", "1.25", "1.5", "2"];
			_s.startAtPlaybackIndex = 3;
			_s.defaultPlaybackRate_ar.reverse();
			var found_bl = false;
			for(var i=0; i<_s.defaultPlaybackRate_ar.length; i++){
				if(_s.defaultPlaybackRate_ar[i] == _s.defaultPlaybackRate_str){
					found_bl = true;
					_s.startAtPlaybackIndex = i;
				}
			}
			
			if(!found_bl){
				_s.defaultPlaybackRate_str = 1;
			}
			
			//setup skin paths
			_s.logoPath_str = _s.sknPth + "logo.png";
			_s.handPath_str = _s.sknPth + "hand.cur";
			_s.grabPath_str = _s.sknPth + "grab.cur";
			if(_s.props.logoPath) _s.logoPath_str = _s.props.logoPath;
			
			
			
			_s.popupAddCloseNPath_str = _s.sknPth + "close-button-normal.png"; 
			_s.popupAddCloseSPath_str = _s.sknPth + "close-button-selected.png";
			
			_s.annotationAddCloseNPath_str = _s.sknPth + "annotation-close-button-normal.png"; 
			_s.annotationAddCloseSPath_str = _s.sknPth + "annotation-close-button-selected.png";
			
			
			_s.adLinePat_str = _s.sknPth + "ad-line.png";
			_s.playSPath_str = _s.sknPth + "play-over.png"; 
			var pauseNPath_str = _s.sknPth + "pause.png"; 
			_s.pauseSPath_str = _s.sknPth + "pause-over.png";
			_s.bkMiddlePath_str = _s.sknPth + "controller-middle.png";
			_s.hdPath_str = _s.sknPth + "hd.png";
			_s.youtubeQualityArrowPath_str = _s.sknPth + "youtube-quality-arrow.png";
			_s.ytbQualityButtonPointerPath_str = _s.sknPth + "youtube-quality-pointer.png";
			_s.controllerBkPath_str = _s.sknPth + "controller-background.png";
			_s.skipIconSPath_str = _s.sknPth + "skip-icon-over.png";
			_s.adsBackgroundPath_str = _s.sknPth + "ads-background.png";
			_s.showSubtitleSPath_str = _s.sknPth + "show-subtitle-icon-over.png";
			_s.hideSubtitleSPath_str = _s.sknPth + "hide-subtitle-icon-over.png";
	
			_s.mainScrubberBkMiddlePath_str = _s.sknPth + "scrubber-middle-background.png";
			_s.mainScrubberDragMiddlePath_str = _s.sknPth + "scrubber-middle-drag.png";
			_s.mainScrubberDragLeftAddPath_str = _s.sknPth + "scrubber-left-drag-add.png";
			_s.mainScrubberDragMiddleAddPath_str = _s.sknPth + "scrubber-middle-drag-add.png";
			
			_s.volumeScrubberBkMiddlePath_str = _s.sknPth + "scrubber-middle-background.png";
			_s.volumeScrubberDragMiddlePath_str = _s.sknPth + "scrubber-middle-drag.png";	

			_s.volumeSPath_str = _s.sknPth + "volume-over.png";
			_s.volumeDPath_str = _s.sknPth + "volume-disabled.png";
			_s.largePlayS_str = _s.sknPth + "large-play-over.png";
			_s.fullScreenSPath_str = _s.sknPth + "full-screen-over.png";
			_s.ytbQualitySPath_str = _s.sknPth + "youtube-quality-over.png";
			_s.ytbQualityDPath_str = _s.sknPth + "youtube-quality-hd.png";
			_s.shareSPath_str = _s.sknPth + "share-over.png";
			_s.normalScreenSPath_str = _s.sknPth + "normal-screen-over.png";
			
			_s.progressMiddlePath_str = _s.sknPth + "progress-middle.png";
			
			_s.embedPathS_str = _s.sknPth + "embed-over.png"; 
			_s.embedWindowClosePathS_str = _s.sknPth + "embed-close-button-over.png"; 
			_s.shareWindowClosePathS_str = _s.sknPth + "embed-close-button-over.png"; 
			_s.embedWindowInputBackgroundPath_str = _s.sknPth + "embed-window-input-background.png";
			_s.embedCopyButtonNPath_str = _s.sknPth + "embed-copy-button.png";;
			_s.embedCopyButtonSPath_str = _s.sknPth + "embed-copy-button-over.png";
			_s.sendButtonNPath_str = _s.sknPth + "send-button.png";
			_s.sendButtonSPath_str = _s.sknPth + "send-button-over.png";
			_s.embedWindowBackground_str = _s.sknPth + "embed-window-background.png";
			_s.playbackRateSPath_str = _s.sknPth + "playback-rate-selected.png";
			_s.passButtonNPath_str = _s.sknPth + "pass-button.png";
			_s.passButtonSPath_str = _s.sknPth + "pass-button-over.png";
			
			_s.mainPreloader_img = new Image();
			_s.mainPreloader_img.onerror = _s.onSkinLoadErrorHandler;
			_s.mainPreloader_img.onload = _s.onPreloaderLoadHandler;
			_s.mainPreloader_img.src = _s.sknPth + "preloader.jpg";
			_s.hdIcn = _s.sknPth + 'hd.png';
			
			_s.annotiationsListId_str = _s.props.annotiationsListId;
			
			
			//annotations
			_s.annotations_el = FWDEVPUtils.getChildById(_s.annotiationsListId_str);
			_s.hasAnnotiations_bl = Boolean(_s.annotations_el);
			
			if(_s.hasAnnotiations_bl){
				var annotations_ar = FWDEVPUtils.getChildren(_s.annotations_el);
				_s.annotations_ar = [];
				
				var child;
				var tt = annotations_ar.length;
				
				
				for(var i=0; i<tt; i++){
					var obj = {};
					child = annotations_ar[i];
				
					obj.start = FWDEVPSubtitle.getDuration(FWDEVPUtils.getAttributeValue(child, "data-start-time"));
					obj.end = FWDEVPSubtitle.getDuration(FWDEVPUtils.getAttributeValue(child, "data-end-time"));
					obj.left = parseInt(FWDEVPUtils.getAttributeValue(child, "data-left"), 10);
					obj.top = parseInt(FWDEVPUtils.getAttributeValue(child, "data-top"), 10);
					
					obj.showCloseButton_bl = FWDEVPUtils.getAttributeValue(child, "data-show-close-button") == "yes" ? true : false; 
					obj.clickSource = FWDEVPUtils.getAttributeValue(child, "data-click-source");
					obj.clickSourceTarget = FWDEVPUtils.getAttributeValue(child, "data-click-source-target");
					obj.normalStateClass = FWDEVPUtils.getAttributeValue(child, "data-normal-state-class");
					obj.selectedStateClass = FWDEVPUtils.getAttributeValue(child, "data-selected-state-class");
					
					obj.content = child.innerHTML;
					
					_s.annotations_ar[i] = obj
				}
				
				try{
					_s.annotations_el.parentNode.removeChild(_s.annotations_el)
				}catch(e){};
			}
			
			
			//video sources
			_s.startAtVideoSource = _s.props.startAtVideoSource || 0;
			_s.videoSource_ar = _s.props.videoSource;
			if(_s.videoSource_ar){
				_s.videosSource_ar = [];
				_s.videoLabels_ar = [];
				for(var i=0; i<_s.videoSource_ar.length; i++){
					var obj={};
					obj.source = _s.videoSource_ar[i]["source"];

					if(obj.source.indexOf("encrypt:") != -1){
						obj.source = atob(obj.source.substr(8));
					}

					obj.source = FWDEVPUtils.getValidSource(obj.source);


					obj.source2 = _s.videoSource_ar[i]["source2"];
					if(obj.source2){
						if(obj.source2.indexOf("encrypt:") != -1){
							obj.source2 = atob(obj.source2.substr(8));
						}
						obj.source2 = FWDEVPUtils.getValidSource(obj.source2);
					}
					
					obj.videoType = _s.videoSource_ar[i]["videoType"] || "normal";
					
					obj.label = _s.videoSource_ar[i]["label"];
					_s.videoSource_ar[i].videoType = obj.videoType;
					obj.isLive = _s.videoSource_ar[i]["isLive"] || "no";
					obj.isLive = obj.isLive == "yes" ? true : false;
					
					_s.videoLabels_ar[i] = _s.videoSource_ar[i]["label"];
					obj.isPrivate = _s.videoSource_ar[i]["isPrivate"] || "no";
					obj.isPrivate = obj.isPrivate == "yes" ? true : false;
					_s.videosSource_ar[i] = obj;
				}
				_s.videoLabels_ar.reverse();
				if(_s.startAtVideoSource > _s.videoLabels_ar.length - 1) _s.startAtVideoSource = _s.videoLabels_ar.length - 1;
			}
			
			if(!_s.videosSource_ar || (_s.videoLabels_ar && _s.videoSource_ar.length == 0)){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "Please specify at least a video source!";
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 100);
				return;
			}
			
			if(_s.videosSource_ar[_s.startAtVideoSource]["source"].indexOf(".mp4") == -1)  _s.showDownloadVideoButton_bl = false;
			
			//subtitles
			_s.startAtSubtitle = _s.props.startAtSubtitle || 0;
			_s.subtitlesSource_ar = _s.props.subtitlesSource;
			_s.subtitlesOffLabel_str = _s.props.subtitlesOffLabel || "Subtitle off";
			if(_s.subtitlesSource_ar){
				_s.subtitles_ar = [];
				for(var i=0; i<_s.subtitlesSource_ar.length; i++){
					var obj={};
					obj.source = _s.subtitlesSource_ar[i]["subtitlePath"];
					if(obj.source.indexOf("encrypt:") != -1){
						obj.source = atob(obj.source.substr(8));
					}
					obj.source = FWDEVPUtils.getValidSource(obj.source);
					
					obj.label = _s.subtitlesSource_ar[i]["subtileLabel"];
					_s.subtitles_ar[i] = obj;
				}
				_s.subtitles_ar.splice(0,0, {source:"none", label:_s.subtitlesOffLabel_str});
				_s.subtitles_ar.reverse();
			}
			
			
			
			if(!_s.subtitlesSource_ar) _s.showSubtitleButton_bl = false;
			//if(_s.subtitlesSource_ar && _s.subtitlesSource_ar.length == 1) _s.showSubtitleButton_bl = false;
			
			//video popup adds
			_s.popupAds_ar = _s.props.popupCommercialAdsSource;
			if(_s.popupAds_ar){
				for(var i=0; i<_s.popupAds_ar.length; i++){
					_s.popupAds_ar[i]["timeStart"] = FWDEVPUtils.getSecondsFromString(_s.popupAds_ar[i]["timeStart"]);
					_s.popupAds_ar[i]["timeEnd"] = FWDEVPUtils.getSecondsFromString(_s.popupAds_ar[i]["timeEnd"]);
					_s.popupAds_ar[i]["google_ad_width"] = _s.popupAds_ar[i]["google_ad_width"] || 600;
					_s.popupAds_ar[i]["google_ad_height"] = _s.popupAds_ar[i]["google_ad_height"] || 200;
				}
			}
			
			//ads
			_s.ads_ar = _s.props.adsSource;
			_s.adsSource_ar = [];
			if(_s.ads_ar){
				for(var i=0; i<_s.ads_ar.length; i++){
					var adsObj = {}
					adsObj.timeStart = FWDEVPUtils.getSecondsFromString(_s.ads_ar[i]["timeStart"]);
					adsObj.addDuration = FWDEVPUtils.getSecondsFromString(_s.ads_ar[i]["addDuration"]) || 10;
					adsObj.thumbnailSource = _s.ads_ar[i]["thumbnailSource"];
					
					adsObj.timeToHoldAds = _s.ads_ar[i]["timeToHoldAds"] || 0;
					adsObj.source = FWDEVPUtils.getValidSource(_s.ads_ar[i]["source"]);
					
					adsObj.link = _s.ads_ar[i]["link"];
					adsObj.target = _s.ads_ar[i]["target"];
					_s.adsSource_ar[i] = adsObj;
				}
			}

			if(_s.imaURL){
				_s.adsSource_ar = _s.popupAds_ar = [];
			}
			
			//cue points
			_s.cuePoints_ar = _s.props.cuepoints;
			_s.cuePointsSource_ar = [];
			if(_s.cuePoints_ar){
				for(var i=0; i<_s.cuePoints_ar.length; i++){
					var cuePointsObj = {}
					cuePointsObj.timeStart = FWDEVPUtils.getSecondsFromString(_s.cuePoints_ar[i]["timeStart"]);
					cuePointsObj.javascriptCall = _s.cuePoints_ar[i]["javascriptCall"];
					cuePointsObj.isPlayed_bl = false;
					
					_s.cuePointsSource_ar[i] = cuePointsObj;
				}
			}
		
			if(!_s.useChromeless_bl){
				
				_s.skinPaths_ar = [
				     {img:_s.largePlayN_img = new Image(), src:_s.sknPth + "large-play.png"},
				     {img:_s.skipIconPath_img = new Image(), src:_s.sknPth + "skip-icon.png"}
				];

				if(_s.showController_bl){
					_s.skinPaths_ar.push( 
					     {img:_s.mainScrubberBkLeft_img = new Image(), src:_s.sknPth + "scrubber-left-background.png"},
					     {img:_s.mainScrubberBkRight_img = new Image(), src:_s.sknPth + "scrubber-right-background.png"},
					     {img:_s.mainScrubberDragLeft_img = new Image(), src:_s.sknPth + "scrubber-left-drag.png"},
					     {img:_s.mainScrubberLine_img = new Image(), src:_s.sknPth + "scrubber-line.png"},
					     {img:_s.volumeScrubberBkLeft_img = new Image(), src:_s.sknPth + "scrubber-left-background.png"},
					     {img:_s.volumeScrubberBkRight_img = new Image(), src:_s.sknPth + "scrubber-right-background.png"},
					     {img:_s.volumeScrubberDragLeft_img = new Image(), src:_s.sknPth + "scrubber-left-drag.png"},
					     {img:_s.volumeScrubberLine_img = new Image(), src:_s.sknPth + "scrubber-line.png"},
					     {img:_s.progressLeft_img = new Image(), src:_s.sknPth + "progress-left.png"}
					)
				}
				
				if((_s.showOpener_bl && root.displayType == FWDEVPlayer.STICKY) 
					|| (_s.stickyOnScrollShowOpener_bl && root.stickyOnScroll)){
					_s.skinPaths_ar.push(
					     {img:_s.openerPauseN_img = new Image(), src:_s.sknPth + "open-pause-button-normal.png"},
						 {img:_s.openerPlayN_img = new Image(), src:_s.sknPth + "open-play-button-normal.png"},
						 {img:_s.animationPath_img = new Image(), src:_s.sknPth + "equalizer.png"},
						 {img:_s.closeN_img = new Image(), src:_s.sknPth + "opener-close.png"},
						 {img:_s.openTopN_img = new Image(), src:_s.sknPth + "open-button-normal-top.png"},
						 {img:_s.openBottomN_img = new Image(), src:_s.sknPth + "open-button-normal-bottom.png"}
						 
					)
					_s.openerPauseS_str = _s.sknPth + "open-pause-button-selected.png";
					_s.openerPlayS_str = _s.sknPth + "open-play-button-selected.png";
					_s.openerAnimationPath_str = _s.sknPth + "equalizer.png";	
					_s.openTopSPath_str = _s.sknPth + "open-button-selected-top.png";	
					_s.openBottomSPath_str = _s.sknPth + "open-button-selected-bottom.png";	
					_s.openTopSPath_str = _s.sknPth + "open-button-selected-top.png";
					_s.openBottomSPath_str = _s.sknPth + "open-button-selected-bottom.png";
					
					_s.closeSPath_str = _s.sknPth + "opener-close-over.png"
				}
				
				if(_s.showRewindButton_bl){
					_s.skinPaths_ar.push(
					     {img:_s.rewindN_img = new Image(), src:_s.sknPth + "rewind.png"}
					)
					_s.rewindSPath_str = _s.sknPth + "rewind-over.png";
				}
				
				
				if(_s.showShareButton_bl){
	
					_s.shareSPath_str = _s.sknPth + "share-over.png";
					_s.facebookSPath_str = _s.sknPth + "facebook-over.png";
					_s.googleSPath_str = _s.sknPth + "google-plus-over.png";
					_s.twitterSPath_str = _s.sknPth + "twitter-over.png";
					_s.likedInSPath_str = _s.sknPth + "likedin-over.png";
					_s.bufferSPath_str = _s.sknPth + "buffer-over.png";
					_s.diggSPath_str = _s.sknPth + "digg-over.png";
					_s.redditSPath_str = _s.sknPth + "reddit-over.png";
					_s.thumbrlSPath_str = _s.sknPth + "thumbrl-over.png";
					
				}
			}

			_s.atbSPath_str = _s.sknPth + "a-to-b-button-over.png";
			
			if(!_s.useVectorIcons_bl){
				_s.skinPaths_ar.push(
					 {img:_s.playN_img = new Image(), src:_s.sknPth + "play.png"},
					 {img:_s.pauseN_img = new Image(), src:_s.sknPth + "pause.png"},
					 {img:_s.volumeN_img = new Image(), src:_s.sknPth + "volume.png"},
					 {img:_s.downloadN_img = new Image(), src:_s.sknPth + "download-button.png"},
					 {img:_s.fullScreenN_img = new Image(), src:_s.sknPth + "full-screen.png"},
					 {img:_s.ytbQualityN_img = new Image(), src:_s.sknPth + "youtube-quality.png"},
					 {img:_s.normalScreenN_img = new Image(), src:_s.sknPth + "normal-screen.png"},
					 {img:_s.embedN_img = new Image(), src:_s.sknPth + "embed.png"},
					 {img:_s.embedColoseN_img = new Image(), src:_s.sknPth + "embed-close-button.png"},
					 {img:_s.passColoseN_img = new Image(), src:_s.sknPth + "embed-close-button.png"},
					 {img:_s.showSubtitleNPath_img = new Image(), src:_s.sknPth + "show-subtitle-icon.png"},
					 {img:_s.hideSubtitleNPath_img = new Image(), src:_s.sknPth + "hide-subtitle-icon.png"},
					 {img:_s.playbackRateNPath_img = new Image(), src:_s.sknPth + "playback-rate-normal.png"}
				);
				if(_s.showShareButton_bl || _s.showEmbedButton_bl){
					_s.skinPaths_ar.push(
						{img:_s.shareClooseN_img = new Image(), src:_s.sknPth + "embed-close-button.png"},
						{img:_s.embedClooseN_img = new Image(), src:_s.sknPth + "embed-close-button.png"}
					);
				}
				if(_s.showShareButton_bl){
					_s.skinPaths_ar.push(
						{img:_s.shareN_img = new Image(), src:_s.sknPth + "share.png"},
						{img:_s.facebookN_img = new Image(), src:_s.sknPth + "facebook.png"},
						{img:_s.googleN_img = new Image(), src:_s.sknPth + "google-plus.png"},
						{img:_s.twitterN_img = new Image(), src:_s.sknPth + "twitter.png"},
						{img:_s.likedInkN_img = new Image(), src:_s.sknPth + "likedin.png"},
						{img:_s.bufferkN_img = new Image(), src:_s.sknPth + "buffer.png"},
						{img:_s.diggN_img = new Image(), src:_s.sknPth + "digg.png"},
						{img:_s.redditN_img = new Image(), src:_s.sknPth + "reddit.png"},
						{img:_s.thumbrlN_img = new Image(), src:_s.sknPth + "thumbrl.png"}
					)
				}

				if(_s.useAToB){
					_s.skinPaths_ar.push(
						{img:_s.atbNPath_img = new Image(), src:_s.sknPth + "a-to-b-button.png"}
					)
				}
			}

			if(_s.showChromecastButton_bl){
				_s.skinPaths_ar.push(
					{img:_s.castN_img = new Image(), src:_s.sknPth + "cast.png"},
					{img:_s.uncastN_img = new Image(), src:_s.sknPth + "uncast.png"}
				)
				_s.castSPath_str = _s.sknPth + "cast-over.png";
				_s.uncastSPath_str = _s.sknPth + "uncast-over.png";
			}
				
			
			_s.downloadSPath_str = _s.sknPth + "download-button-over.png";
			if(_s.showHelpScreen_bl){
				_s.skinPaths_ar.push(
				    {img:_s.helpScreen_img = new Image(), src:_s.sknPth + _s.helpScreenPath_str},
				    {img:_s.pauseN_img = new Image(), src:_s.sknPth + "ok-button.png"}
				);
			};
			
			if(_s.showAopwWindow_bl){
				_s.skinPaths_ar.push(
				    {img:_s.popwColseN_img = new Image(), src:_s.sknPth + "popw-close-button.png"}
				);
				_s.popwColseSPath_str = _s.sknPth + "popw-close-button-over.png";
				_s.popwWindowBackgroundPath_str = _s.sknPth + "popw-window-background.png";
				_s.popwBarBackgroundPath_str = _s.sknPth + "popw-bar-background.png";
			};
			
			
			
			_s.totalGraphics = _s.skinPaths_ar.length;		
		};
		
		//####################################//
		/* Preloader load done! */
		//###################################//
		_s.onPreloaderLoadHandler = function(){
			_s.countLoadedSCript = 0;
			_s.scripts = [];
			if(_s.useAToB){
				_s.scripts.push('FWDEVPATB.js');
			}
			if(_s.thumbnailsPreview){
				_s.scripts.push('FWDEVPThumbnailsPreview.js');
			}
			if(_s.showChromecastButton_bl){
				_s.scripts.push('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
				_s.scripts.push('FWDEVPCC.js');
			}
			_s.totalScripts = _s.scripts.length;
	
			
			_s.dispatchEvent(FWDEVPData.PRELOADER_LOAD_DONE);
			if(_s.useChromeless_bl){
				setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.SKIN_LOAD_COMPLETE);
				}, 50);
			}else{
				_s.loadPlugin();
			}
			
		};

		_s.loadPlugin = function(){
			if(_s.countLoadedSCript == _s.totalScripts){
				_s.loadSkin();	
			}else{
				var script = document.createElement('script');
				var scriptURI = _s.scripts[_s.countLoadedSCript] 
				if(/\?/.test(scriptURI)){
					scriptURI += '&version=' + FWDEVPlayer.V;
				}else{
					scriptURI += '?version=' + FWDEVPlayer.V;
				}
				document.head.appendChild(script);
				if(scriptURI.indexOf('gstatic') != -1){
					script.src = scriptURI;
				}else{
					script.src =  _s.mainFolderPath_str + 'java/' + scriptURI;
				}
				
				script.onload = _s.loadPlugin;
				script.onerror = function(e){
					console.log(e);
					if(scriptURI == 'FWDEVPATB.js'){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'You have enabled the A to B plugin<br>A to B js file named <font color="#FF0000">FWDEVPATB.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDEVPATB.js</font> file. '});
					}else if(scriptURI == 'FWDEVPThumbnailsPreview.js'){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'You have enabled the thumbnal preview plugin<br>thumbnail preview js file named <font color="#FF0000">FWDEVPThumbnailsPreview.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDEVPThumbnailsPreview.js</font> file. '});
					}else if(scriptURI == 'FWDEVPCC.js'){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'You have enabled the chromecast plugin<br>js file named <font color="#FF0000">FWDEVPCC.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDEVPCC.js</font> file.'});
					}else if(scriptURI.indexOf('gstatic') != -1){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'Choromecast framework javascript file can\'t be loaded<font color="#FF0000"> ' + scriptURI +  ' </font>'});
					}
				
				}
			}
			_s.countLoadedSCript++;
		}

		//#####################################//
		/* Load IMA SDK */
		//#####################################//
		_s.countImaLoadedSCript = 0;
		_s.startToLoadIMA = function(){
			
			if(_s.imaScripts) return;
			_s.imaScripts = ['//imasdk.googleapis.com/js/sdkloader/ima3.js',  _s.mainFolderPath_str + 'java/FWDEVPIMA.js'];
			_s.totalImaScripts = _s.imaScripts.length;
			_s.loadIMA();
		}
		
		_s.loadIMA = function(){
			
			if(_s.countImaLoadedSCript == _s.totalImaScripts){
				_s.imaReady = true;
				_s.dispatchEvent(FWDEVPData.IMA_READY);
			}else{
				var script = document.createElement('script');
				var scriptURI = _s.imaScripts[_s.countImaLoadedSCript];
				document.head.appendChild(script);
				
				script.src = scriptURI;
				script.onload = _s.loadIMA;
				script.onerror = function(e){
					if(_s.countImaLoadedSCript == 1){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'IMA SDK can\'t be loaded'});
					}else if(_s.countImaLoadedSCript == 2){
						_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'IMA file <font color="#FF0000">FWDEVPIMA.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDEVPIMA.js</font> file. '});
					}
					_s.dispatchEvent(FWDEVPData.IMA_ERROR);
				}
				_s.countImaLoadedSCript++;
			}
		}
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		_s.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<_s.totalGraphics; i++){
				img = _s.skinPaths_ar[i].img;
				src = _s.skinPaths_ar[i].src;
				img.onload = _s.onSkinLoadHandler;
				img.onerror = _s.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		_s.onSkinLoadHandler = function(e){
			_s.countLoadedSkinImages++;
			if(_s.countLoadedSkinImages == _s.totalGraphics){
				setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		_s.onSkinLoadErrorHandler = function(e){
			if (FWDEVPUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin graphics with label <font color='#FF0000'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				_s.dispatchEvent(FWDEVPData.LOAD_ERROR, err);
			}, 50);
		};
	
		
		//####################################//
		/* load buttons graphics */
		//###################################//
	
		_s.onSkinLoadHandlersss = function(e){
	
			_s.countLoadedSkinImages++;
			if(_s.countLoadedSkinImages < _s.totalGraphics){
				if(FWDEVPUtils.isIEAndLessThen9){
					_s.loadImageId_to = setTimeout(_s.loadSkin, 16);
				}else{
					_s.loadSkin();
				}
			}else{
				setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		//##########################################//
		/* Download video */
		//##########################################//
		_s.downloadVideo = function(sourcePath, pName){
			
			if(FWDEVPUtils.isLocal){
				_s.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Downloading video files local is not allowed or possible! To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(!sourcePath){
				_s.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Not allowed to download this video!"});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(String(sourcePath.indexOf(".mp4")) == -1){
				_s.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Only mp4 video files hosted on your server can be downloaded."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
				
			}
			
			var defaultSourcePath = sourcePath;
			var path1 = location.origin;
			var path2 = location.pathname;
		
			if(path2.indexOf(".") != -1){
				path2 = path2.substr(0, path2.lastIndexOf("/") + 1);
			}
			
			var hasHTTPorHTTPS_bl = sourcePath.indexOf("http:") == -1 && sourcePath.indexOf("https:") == -1;
		
			if(hasHTTPorHTTPS_bl){
				sourcePath = path1 + path2 + sourcePath;
			}
	
			if(!pName) return;
		
			pName = pName.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
			if(pName.length > 40) pName = pName.substr(0, 40) + "...";
			if(!(/\.(mp4)$/i).test(pName)){
				 pName+='.mp4';
			}else if(!(/\.(mp3)$/i).test(pName)){
				 pName+='.mp3';
			}
			
			sourcePath = sourcePath;
			
			var url = _s.videoDownloaderPath_str;
			
			if(!_s.dlIframe){
				_s.dlIframe = document.createElement("IFRAME");
				_s.dlIframe.style.display = "none";
				document.documentElement.appendChild(_s.dlIframe);
			}
			
			if(_s.isMobile_bl && !FWDEVPUtils.isAndroid){
				
				if(_s.openDownloadLinkOnMobile_bl){
					window.open(defaultSourcePath, "_blank");
					return;
				}
			
				var email = _s.getValidEmail();
				if(!email) return;
				
				if(_s.emailXHR != null){
					try{_s.emailXHR.abort();}catch(e){}
					_s.emailXHR.onreadystatechange = null;
					_s.emailXHR.onerror = null;
					_s.emailXHR = null;
				}
				
				_s.emailXHR = new XMLHttpRequest();
				
				_s.emailXHR.onreadystatechange = function(e){
					if(_s.emailXHR.readyState == 4){
						if(_s.emailXHR.status == 200){
							if(_s.emailXHR.responseText == "sent"){
								alert("Email sent.");
							}else{
								alert("Error sending email, this is a server side error, the php file can't send the email!");
							}
							
						}else{
							alert("Error sending email: " + _s.emailXHR.status + ": " + _s.emailXHR.statusText);
						}
					}
				};
				
				_s.emailXHR.onerror = function(e){
					try{
						if(window.console) console.log(e);
						if(window.console) console.log(e.message);
					}catch(e){};
					alert("Error sending email: " + e.message);
				};

				_s.emailXHR.open("get", _s.mailPath_str + "?mail=" + email + "&name=" + pName + "&path=" + sourcePath, true);
				_s.emailXHR.send();
				return;
			}
			
		
			_s.dlIframe.src = url + "?path="+ sourcePath +"&name=" + pName;
		};
		
		_s.getValidEmail = function(){
			var email = prompt("Please enter your email address where the video download link will be sent:");
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
			while(!emailRegExp.test(email) || email == ""){
				if(email === null) return;
				email = prompt("Please enter a valid email address:");
			}
			return email;
		};
		
		//####################################//
		/* load vast */
		//####################################//
		_s.setVastSource = function(source){
			if(!_s.vastLoaded_bl){
				_s.vastScript = document.createElement('script');
				var scriptURI = _s.scripts[_s.countLoadedSCript];
				document.head.appendChild(_s.vastScript);
				_s.vastScript.src =  _s.mainFolderPath_str + 'java/FWDEVPVast.js';
				
				_s.vastScript.onload = function(){
					FWDEVPVast.setPrototype();
					_s.vast = new FWDEVPVast(_s);
					_s.vast.setSource(source);
				}
				
				_s.vastScript.onerror = function(e){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:'VAST js plugin named <font color="#FF0000">FWDEVPVast.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDEVPVast.js</font> file. '});
				}
				_s.vastLoaded_bl = true;
				return;
			}
			_s.vast.setSource(source);
		}
		
		_s.closeVast = function(){
			if(_s.vast) _s.vast.closeVast();
		}
		
		_s.fixVmapTimes = function(duration){
			if(_s.vast) _s.vast.fixVmapTimes(duration);
		}
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		_s.showPropertyError = function(error){
			_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"The property called <font color='#FF0000'>" + error + "</font> is not defined."});
		};
		
		_s.init();
	};
	
	/* set prototype */
	FWDEVPData.setPrototype = function(){
		FWDEVPData.prototype = new FWDEVPEventDispatcher();
	};
	
	FWDEVPData.prototype = null;
	
	FWDEVPData.IMA_READY = 'IMAReady';
	FWDEVPData.IMA_ERROR = 'IMAError';
	FWDEVPData.VAST_LOADED = "vastLoaded";
	FWDEVPData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDEVPData.LOAD_DONE = "onLoadDone";
	FWDEVPData.LOAD_ERROR = "onLoadError";
	FWDEVPData.IMAGE_LOADED = "onImageLoaded";
	FWDEVPData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDEVPData.SKIN_PROGRESS = "onSkinProgress";
	FWDEVPData.IMAGES_PROGRESS = "onImagesPogress";
	FWDEVPData.VAST_LOADING = 'vastLoading';
	FWDEVPData.VAST_LOADED_DONE = 'vastLoadingDone';
	
	window.FWDEVPData = FWDEVPData;
}(window));