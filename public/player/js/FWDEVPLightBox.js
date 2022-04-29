/* FWDEVPLightBox */
(function (window){
	
	var FWDEVPLightBox = function(
			prt,
			mainBackgroundColor_str,
			holderBackgroundColor_str,
			lightBoxBackgroundOpacity,
			lightBoxWidth,
			lightBoxHeight
		){
		
		var _s  = this;
		var prototype = FWDEVPLightBox.prototype;

		_s.mainLightBox_do = null;
		_s.lightBoxBackground_sdo = null;
		_s.lightBoxGridHolder_do = null;
		_s.clsBtn = null;
		
		_s.mainBackgroundColor_str = mainBackgroundColor_str;
		_s.holderBackgroundColor_str = holderBackgroundColor_str;
		
		_s.lightBoxBackgroundOpacity = lightBoxBackgroundOpacity;
		_s.lightBoxWidth = lightBoxWidth;
		_s.lightBoxHeight = lightBoxHeight;
		
		_s.setupButtonWithDelayId_to;
		
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.closeButtonIsTweening_bl = true;
	
		_s.init = function(){
			_s.getStyle().zIndex = 9999999;
			_s.setupMainContainers();
		};
		
		//#############################################//
		/* setup main containers */
		//#############################################//
		_s.setupMainContainers = function(){
			
			if(_s.isMobile_bl && _s.hasPointerEvent_bl) _s.getStyle().msTouchAction = "none";
			
			_s.lightBoxBackground_sdo = new FWDEVPDisplayObject("div"); 
			_s.lightBoxBackground_sdo.setResizableSizeAfterParent();
			_s.lightBoxBackground_sdo.setBkColor(_s.mainBackgroundColor_str);
			_s.lightBoxBackground_sdo.screen.addEventListener('click', _s.closeButtonOnStartHandler);
			_s.addChild(_s.lightBoxBackground_sdo);
			
			_s.mainLightBox_do = new FWDEVPDisplayObject("div");
			//_s.mainLightBox_do.getStyle().boxShadow = "0px 0px 5px #999999";
			_s.mainLightBox_do.setBkColor(_s.holderBackgroundColor_str);
			_s.mainLightBox_do.setWidth(1);
			_s.mainLightBox_do.setHeight(1);

			_s.addChild(_s.mainLightBox_do);
			
			document.documentElement.appendChild(_s.screen);

			_s.setX(-10000);
			_s.setY(-10000);
			_s.setWidth(0);
			_s.setHeight(0);
		};
		
		_s.show = function(){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			if(_s.clsBtn){
				_s.hideCloseButton(false);
				_s.showCloseButton(true);
				_s.clsBtn.setX(-200);
			}else{
				_s.loadClsoeButtonImage();
			}
			
			var viewportSize = FWDEVPUtils.getViewportSize();
			var scrollOffsets = FWDEVPUtils.getScrollOffsets();
			
			_s.setWidth(viewportSize.w);
			_s.setHeight(viewportSize.h);
			_s.setX(scrollOffsets.x);
			_s.setY(scrollOffsets.y);
			
			_s.lightBoxBackground_sdo.setAlpha(0);
			FWDAnimation.to(_s.lightBoxBackground_sdo, .8, {alpha:_s.lightBoxBackgroundOpacity});
			_s.setX(scrollOffsets.x);
			_s.setY(scrollOffsets.y);
			
			_s.mainLightBox_do.setX(parseInt(viewportSize.w/2));
			_s.mainLightBox_do.setY(parseInt(viewportSize.h/2));
			
			if(_s.lightBoxWidth > viewportSize.w){
				_s.finalLightBoxWidth = viewportSize.w;
				_s.finalLightBoxHeight = parseInt(_s.lightBoxHeight * (viewportSize.w/_s.lightBoxWidth));
			}else{
				_s.finalLightBoxWidth = _s.lightBoxWidth;
				_s.finalLightBoxHeight = _s.lightBoxHeight;
			}
			
			FWDAnimation.to(_s.mainLightBox_do, .8, {
				w:_s.finalLightBoxWidth, 
				h:_s.finalLightBoxHeight,
				x:parseInt((viewportSize.w - _s.finalLightBoxWidth)/2),
				y:parseInt((viewportSize.h - _s.finalLightBoxHeight)/2),
				delay:.4,
				onComplete:_s.showComplete,
				ease:Expo.easeInOut});
				
			prt.stageContainer = _s.mainLightBox_do.screen;
			if(prt.main_do){
				prt.main_do.setX(-5000);
				if(!prt.stageContainer.contains(prt.main_do.screen)) prt.stageContainer.appendChild(prt.main_do.screen);
			}
			_s.dispatchEvent(FWDEVPLightBox.SHOW);
		}
		
		_s.showComplete = function(){
			_s.clsBtn.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.closeButtonOnStartHandler);
			_s.addKeyboardSupport();
			prt.startResizeHandler();
			_s.showComplete_bl = true;
			
			if(prt._d.autoPlay_bl){
				prt.play();
			}
		}
		
		
		//####################################//
		/* Add keyboard support */
		//#####################################//
		_s.addKeyboardSupport = function(){
			document.addEventListener("keydown",  _s.onKeyDownHandler);	
		}
		
		_s.onKeyDownHandler = function(e){
			if(e.keyCode == 27) _s.closeButtonOnStartHandler();
		}
		
		//#############################################//
		/* setup lightbox close button */
		//#############################################//
		_s.loadClsoeButtonImage = function(){
			_s.closeN_img = new Image();
			_s.closeN_img.onload = _s.setupCloseButton;
			_s.closeN_img.src = prt.mainFolderPath_str + prt.sknPth + "embed-close-button.png";
			_s.closeSPath_str = prt.mainFolderPath_str + prt.sknPth + "embed-close-button-over.png";
		}
		
		_s.setupCloseButton = function(e){
			var viewportSize = FWDEVPUtils.getViewportSize();
			FWDEVPSimpleButton.setPrototype();
			_s.clsBtn = new FWDEVPSimpleButton(_s.closeN_img, _s.closeSPath_str, undefined, true);
			
			_s.hideCloseButton(false);
			_s.showCloseButton(true);
			_s.clsBtn.setX(viewportSize.w - _s.clsBtn.w - 15);
			_s.clsBtn.setY(- 15);
			_s.addChild(_s.clsBtn);
		};
		
		_s.showCloseButtonComplete = function(){
			_s.closeButtonIsTweening_bl = false;
		}
		
		_s.hideCloseButton = function(animate){
			FWDAnimation.killTweensOf(_s.clsBtn);
			if(!animate){
				_s.clsBtn.setAlpha(0);
			}else{
				FWDAnimation.to(_s.clsBtn, .9, {alpha:0});	
			}
		}
		
		_s.showCloseButton = function(animate){
			
			FWDAnimation.killTweensOf(_s.clsBtn);
			if(!animate){
				_s.clsBtn.setAlpha(1);
			}else{
				FWDAnimation.to(_s.clsBtn, .9, {alpha:1, delay:.8});	
			}
		}
		
		
		_s.mouseDummyHandler = function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
			
		_s.closeButtonOnStartHandler = function(e){
			if(!_s.isShowed_bl || !_s.showComplete_bl) return;
			_s.isShowed_bl = false;
			var viewportSize = FWDEVPUtils.getViewportSize();
			
			_s.clsBtn.removeListener(FWDEVPSimpleButton.MOUSE_UP, _s.closeButtonOnStartHandler);
			
			FWDAnimation.to(_s.clsBtn, .9, {alpha:0});
			
			FWDAnimation.to(_s.mainLightBox_do, .8, {
				w:0, 
				h:0,
				x:parseInt(viewportSize.w/2),
				y:parseInt(viewportSize.h/2),
				delay:.4,
				ease:Expo.easeInOut});
			
			FWDAnimation.to(_s.lightBoxBackground_sdo, .8, {alpha:0, delay:.8});
			FWDAnimation.to(prt.main_do, .8, {x:-prt.main_do.w/2, y:-prt.main_do.h/2 , ease:Expo.easeInOut, delay:.4});
			_s.lighboxAnimDoneId_to = setTimeout(_s.lighboxHideAnimationDone, 1600);
			
			
			_s.dispatchEvent(FWDEVPLightBox.CLOSE);
		};
		
		_s.lighboxHideAnimationDone = function(){
			_s.setX(-10000);
			_s.setY(-10000);
			_s.setWidth(0);
			_s.setHeight(0);
			_s.dispatchEvent(FWDEVPLightBox.HIDE_COMPLETE);
		};
		
		
		_s.init();
	};
	
	/* set prototype */
    FWDEVPLightBox.setPrototype = function(){
    	FWDEVPLightBox.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPLightBox.CLOSE = "ligtBoxClose";
    FWDEVPLightBox.SHOW = "show";
    FWDEVPLightBox.HIDE_COMPLETE = "hideComplete";
    
    FWDEVPLightBox.prototype = null;
	window.FWDEVPLightBox = FWDEVPLightBox;
}(window));