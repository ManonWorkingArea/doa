/* FWDEVPAdsButton */
(function (window){
var FWDEVPAdsButton = function(
			prt,
			icon_img,
			iconOverPath_str,
			text_str,
			position_str,
			borderColorN_str,
			borderColorS_str,
			adsBackgroundPath_str,
			textNormalColor,
			textSelectedColor,
			useHEX,
		    nBC,
		    sBC
		){
		
		var _s = this;
		var prototype = FWDEVPAdsButton.prototype;
		
		_s.main_do = null;
		_s.icon_do = null;
		_s.iconS_do = null;
		_s.bk_do = null;
		_s.text_do = null;
		_s.border_do = null;
		_s.thumbHolder_do = null;
		_s.icon_img = icon_img;
		
		_s.useHEX = useHEX; 
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.borderNColor_str = borderColorN_str;
		_s.borderSColor_str = borderColorS_str;
		_s.adsBackgroundPath_str = adsBackgroundPath_str;
		_s.position_str = position_str;
		_s.textNormalColor_str = textNormalColor;
		_s.textSelectedColor_str = textSelectedColor;
		_s.text_str = text_str;
		_s.iconOverPath_str = iconOverPath_str;
		_s.totalWidth = 215;
		_s.totalHeight = 64;
		_s.fontSize = 12;
		
		_s.hasThumbanil_bl = false;
		_s.isShowed_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupMainContainers();
			_s.hide(false, true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.main_do = new FWDEVPDisplayObject("div");
			_s.main_do.hasTransform3d_bl = false;
			_s.main_do.hasTransform2d_bl = false;
			_s.main_do.setBackfaceVisibility();
			
			_s.bk_do = new FWDEVPDisplayObject("div");
			_s.bk_do.getStyle().background = "url('" + _s.adsBackgroundPath_str + "')";
		
			_s.text_do = new FWDEVPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.setBackfaceVisibility();
			_s.text_do.setOverflow("visible");
			_s.text_do.getStyle().display = "inline";
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "22px";
			//_s.text_do.getStyle().lineHeight = "18px";
			_s.text_do.getStyle().whiteSpace= "nowrap";
			//_s.text_do.getStyle().textAlign = "center";
			_s.text_do.getStyle().color = _s.textNormalColor_str;
			_s.text_do.getStyle().fontSmoothing = "antialiased";
			_s.text_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_do.getStyle().textRendering = "optimizeLegibility";
			
			
			_s.thumbHolder_do = new FWDEVPDisplayObject("div");
			_s.thumbHolder_do.setWidth(_s.totalHeight - 8);
			_s.thumbHolder_do.setHeight(_s.totalHeight - 8);
			_s.thumbHolder_do.setX(_s.totalWidth - _s.thumbHolder_do.w - 4);
			_s.thumbHolder_do.setY(4);
			
			_s.border_do = new FWDEVPDisplayObject("div");
			_s.border_do.getStyle().border = "1px solid " + _s.borderNColor_str + "";
			_s.border_do.setButtonMode(true);
			_s.main_do.setWidth(_s.totalWidth);
			_s.main_do.setHeight(_s.totalHeight);
			_s.bk_do.setWidth(_s.totalWidth);
			_s.bk_do.setHeight(_s.totalHeight);
			if(_s.position_str == "left"){
				_s.border_do.setX(-1);
				_s.border_do.setWidth(_s.totalWidth - 1);
				_s.border_do.setHeight(_s.totalHeight -2);
			}else{
				_s.border_do.setWidth(_s.totalWidth);
				_s.border_do.setHeight(_s.totalHeight -2);
			}
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
			
			if(_s.useHEX){
				_s.icon_do = new FWDEVPDisplayObject("div");
				_s.icon_do.setWidth(_s.icon_img.width);
				_s.icon_do.setHeight(_s.icon_img.height);
				_s.icon_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.icon_img, _s.nBC).canvas;
				_s.icon_do.screen.appendChild(_s.icon_do_canvas);
			}else{
				_s.icon_do = new FWDEVPDisplayObject("img");
				_s.icon_do.setScreen(_s.icon_img);
				_s.icon_do.setWidth(_s.icon_img.width);
				_s.icon_do.setHeight(_s.icon_img.height);
			}
			
			_s.iconS_img =  new Image();
			_s.iconS_img.src = _s.iconOverPath_str;
			
			if(_s.useHEX){
				_s.iconS_do = new FWDEVPDisplayObject("div");
				_s.iconS_do.setWidth(_s.icon_do.w);
				_s.iconS_do.setHeight(_s.icon_do.h);
				_s.iconS_img.onload = function(){
					_s.iconS_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.iconS_img, _s.sBC).canvas;
					_s.iconS_do.screen.appendChild(_s.iconS_do_canvas);
				}
			}else{
				_s.iconS_do = new FWDEVPDisplayObject("img");
				_s.iconS_do.setScreen(_s.iconS_img);
				_s.iconS_do.setWidth(_s.icon_do.w);
				_s.iconS_do.setHeight(_s.icon_do.h);
			}
			
			_s.iconS_do.setAlpha(0);
		
			_s.main_do.addChild(_s.bk_do);
			_s.main_do.addChild(_s.text_do);
			_s.main_do.addChild(_s.thumbHolder_do);
			_s.main_do.addChild(_s.icon_do);
			_s.main_do.addChild(_s.iconS_do);
			_s.main_do.addChild(_s.border_do);
			
			if(FWDEVPUtils.isIEAndLessThen9){
				_s.dumy_do = new FWDEVPDisplayObject("div");
				_s.dumy_do.setBkColor("#00FF00");
				_s.dumy_do.setAlpha(.0001);
				_s.dumy_do.setWidth(_s.totalWidth);
				_s.dumy_do.setHeight(_s.totalHeight);
				_s.dumy_do.setButtonMode(true);
				_s.main_do.addChild(_s.dumy_do);
			}
			
			_s.addChild(_s.main_do);
			_s.updateText(_s.text_str);
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.onMouseOver);
				_s.screen.addEventListener("pointerout", _s.onMouseOut);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMobile_bl){
					_s.screen.addEventListener("mouseover", _s.onMouseOver);
					_s.screen.addEventListener("mouseout", _s.onMouseOut);
					_s.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
			
		};
		
		_s.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setSelectedState();
			}
		};
			
		_s.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setNormalState();
			}
		};
		
		_s.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(e.button == 2 || !_s.isShowed_bl) return;
			_s.dispatchEvent(FWDEVPAdsButton.MOUSE_UP);
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		_s.updateText = function(text){
			var totalWidth;
			_s.text_do.setInnerHTML(text);
			setTimeout(function(){
				totalWidth = _s.text_do.getWidth() + 8 + _s.iconS_do.w;
				_s.text_do.setX(parseInt(_s.totalWidth - totalWidth)/2);
				_s.text_do.setY(parseInt((_s.totalHeight - _s.text_do.getHeight())/2) + 2);
				_s.icon_do.setX(_s.text_do.x + totalWidth - _s.iconS_do.w);
				_s.icon_do.setY(parseInt((_s.totalHeight - _s.iconS_do.h)/2) + 2);
				_s.iconS_do.setX(_s.text_do.x + totalWidth - _s.iconS_do.w);
				_s.iconS_do.setY(parseInt((_s.totalHeight - _s.iconS_do.h)/2) + 2);
			}, 50);
		};

		//Resize button.
		_s.prvW;
		this.resize = function(mbl){
			if(!_s.isShowed_bl) return;
			
			var tt = _s.totalWidth;
			 _s.prvW = prt.sW;

			if(mbl){
				_s.totalWidth = 64;
				tt = 64;	
			}else{
				_s.totalWidth = 215;
				tt = 215;
			}

			if(!_s.isShWithDl){
				if(_s.position_str == "right"){
					_s.main_do.setX(-_s.totalWidth);
				}
			}

			if(mbl){
				this.text_do.setVisible(false);
				_s.icon_do.setX(Math.round((tt - _s.iconS_do.w)/2) - 1);
				_s.icon_do.setY(Math.round((_s.totalHeight - _s.iconS_do.h)/2));
			}else{
				this.text_do.setVisible(true);
				_s.icon_do.setX(_s.text_do.x + _s.text_do.getWidth() + 8 + _s.iconS_do.w - _s.iconS_do.w);
				_s.icon_do.setY(parseInt((_s.totalHeight - _s.iconS_do.h)/2) + 2);
			}

			_s.iconS_do.setX(_s.icon_do.x);
			_s.iconS_do.setY(_s.icon_do.y);
			_s.setWidth(tt);
			_s.main_do.setWidth(tt);
			_s.bk_do.setWidth(tt);
			_s.border_do.setWidth(tt - 1);
			
		}
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(){
			FWDAnimation.to(_s.iconS_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDAnimation.to(_s.text_do.screen, .5, {css:{color:_s.textNormalColor_str}, ease:Expo.easeOut});	
			FWDAnimation.to(_s.border_do.screen, .5, {css:{borderColor:_s.borderNColor_str}, ease:Expo.easeOut});	
		};
		
		_s.setSelectedState = function(){
			FWDAnimation.to(_s.iconS_do, .5, {alpha:1, ease:Expo.easeOut});	
			FWDAnimation.to(_s.text_do.screen, .5, {css:{color:_s.textSelectedColor_str}, ease:Expo.easeOut});	
			FWDAnimation.to(_s.border_do.screen, .5, {css:{borderColor:_s.borderSColor_str}, ease:Expo.easeOut});	
		};
	
		_s.show = function(animate){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			_s.isShWithDl = true;
			setTimeout(function(){
				_s.isShWithDl = false;
			}, 500);
			_s.setVisible(true);
			
			FWDAnimation.killTweensOf(_s.main_do);
			if(animate && !_s.isMobile_bl){
				if(_s.position_str == "left"){
					FWDAnimation.to(_s.main_do, .8, {x:0, delay:.8, ease:Expo.easeInOut});
				}else{
					FWDAnimation.to(_s.main_do, .8, {x:-_s.totalWidth + 1, delay:.8,  ease:Expo.easeInOut});
				}
			}else{
				if(_s.position_str == "left"){
					_s.main_do.setX(0);
				}else{
					_s.main_do.setX(-_s.totalWidth);
				}
			}
		};	
			
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite) return;
			_s.isShowed_bl = false;
			_s.isShWithDl = true;
			_s.hasThumbanil_bl = false;
			
			FWDAnimation.killTweensOf(_s.main_do);
			if(animate && !_s.isMobile_bl){
				if(_s.position_str == "left"){
					FWDAnimation.to(_s.main_do, .8, {x:-_s.totalWidth, ease:Expo.easeInOut, onComplete:_s.hideCompleteHandler});
				}else{
					FWDAnimation.to(_s.main_do, .8, {x:0, ease:Expo.easeInOut, onComplete:_s.hideCompleteHandler});
				}
			}else{
				if(_s.position_str == "left"){
					_s.main_do.setX(-_s.totalWidth);
				}else{
					_s.main_do.setX(0);
				} 
				_s.hideCompleteHandler();
			}
		};
		
		_s.hideCompleteHandler = function(){
			if(_s.smallImage_img){
				_s.smallImage_img.onload = null;
				_s.smallImage_img.src = "";
				FWDAnimation.killTweensOf(_s.icon_do);
			}
			if(_s.main_do.alpha != 1) _s.main_do.setAlpha(1);
			_s.thumbHolder_do.setVisible(false);
			_s.setVisible(false);
		};
		
		//###########################################//
		/* hide / show  opacity */
		//###########################################//
		_s.hideWithOpacity = function(){
			if(!FWDEVPUtils.isIEAndLessThen9){
				FWDAnimation.to(_s.main_do, .8, {alpha:.5});
			}
		};
		
		_s.showWithOpacity = function(){
			if(!FWDEVPUtils.isIEAndLessThen9){
				FWDAnimation.to(_s.main_do, .8, {alpha:1});
			}
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			FWDEVPUtils.changeCanvasHEXColor(_s.icon_img, _s.icon_do_canvas, nBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.iconS_img, _s.iconS_do_canvas, sBC);
			_s.text_do.getStyle().color = nBC;
			
			_s.borderNColor_str = nBC;
			_s.borderSColor_str = sBC;
			_s.border_do.getStyle().border = "1px solid " + _s.borderNColor_str + "";
		}
			
		
		_s.init();
	};
	
	/* set prototype */
	FWDEVPAdsButton.setPrototype = function(){
		FWDEVPAdsButton.prototype = null;
		FWDEVPAdsButton.prototype = new FWDEVPTransformDisplayObject("div");
	};
	
	FWDEVPAdsButton.CLICK = "onClick";
	FWDEVPAdsButton.MOUSE_OVER = "onMouseOver";
	FWDEVPAdsButton.SHOW_TOOLTIP = "showTooltip";
	FWDEVPAdsButton.MOUSE_OUT = "onMouseOut";
	FWDEVPAdsButton.MOUSE_UP = "onMouseDown";
	
	FWDEVPAdsButton.prototype = null;
	window.FWDEVPAdsButton = FWDEVPAdsButton;
}(window));