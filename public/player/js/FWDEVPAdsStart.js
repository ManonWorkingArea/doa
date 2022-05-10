/* FWDEVPAdsStart */
(function (window){
var FWDEVPAdsStart = function(
			position_str,
			borderColorN_str,
			borderColorS_str,
			adsBackgroundPath_str,
			timeColor_str
		){
		
		var _s = this;
		var prototype = FWDEVPAdsStart.prototype;
		
		_s.main_do = null;
		_s.bk_do = null;
		_s.text_do = null;
		_s.border_do = null;
		_s.thumbHolder_do = null;

		
		_s.borderNColor_str = borderColorN_str;
		_s.borderSColor_str = borderColorS_str;
		_s.adsBackgroundPath_str = adsBackgroundPath_str;
		_s.position_str = position_str;
		_s.timeColor_str = timeColor_str;
		
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
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().lineHeight = "18px";
			//_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().textAlign = "center";
			_s.text_do.getStyle().color = _s.timeColor_str;
			_s.text_do.getStyle().fontSmoothing = "antialiased";
			_s.text_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_do.getStyle().textRendering = "optimizeLegibility";
			_s.text_do.setInnerHTML("...");
			
			_s.thumbHolder_do = new FWDEVPDisplayObject("div");
			_s.thumbHolder_do.setWidth(_s.totalHeight - 8);
			_s.thumbHolder_do.setHeight(_s.totalHeight - 8);
			_s.thumbHolder_do.setX(_s.totalWidth - _s.thumbHolder_do.w - 4);
			_s.thumbHolder_do.setY(4);
			
			_s.border_do = new FWDEVPDisplayObject("div");
			_s.border_do.getStyle().border = "1px solid " + _s.borderNColor_str + "";
		
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
		
			_s.main_do.addChild(_s.bk_do);
			_s.main_do.addChild(_s.text_do);
			_s.main_do.addChild(_s.thumbHolder_do);
			_s.main_do.addChild(_s.border_do);
			
			_s.addChild(_s.main_do);
		};
		
		//#####################################//
		/* load thumbnail */
		//#####################################//
		_s.loadThumbnail = function(path){
			_s.hasThumbanil_bl = true;
			if(!_s.thumbnail_do){
				_s.thumbnail_do = new FWDEVPDisplayObject("img");
				_s.smallImage_img = new Image();
			}
			
			_s.thumbHolder_do.setVisible(true);
			_s.smallImage_img.onload = _s.onSmallImageLoad;
			_s.smallImage_img.src = path;
		};
		
		_s.onSmallImageLoad = function(){
			_s.smallImageOriginalW = _s.smallImage_img.width;
			_s.smallImageOriginalH = _s.smallImage_img.height;
			_s.thumbnail_do.setScreen(_s.smallImage_img);
			_s.thumbHolder_do.addChild(_s.thumbnail_do);
			
			var scaleX = _s.thumbHolder_do.w/_s.smallImageOriginalW;
			var scaleY = _s.thumbHolder_do.h/_s.smallImageOriginalH;
			var totalScale = 0;
			
			if(scaleX >= scaleY){
				totalScale = scaleX;
			}else if(scaleX <= scaleY){
				totalScale = scaleY;
			}
			
			_s.thumbnail_do.setWidth(Math.round(_s.smallImageOriginalW * totalScale));
			_s.thumbnail_do.setHeight(Math.round(_s.smallImageOriginalH * totalScale));
			_s.thumbnail_do.setX(Math.round((_s.thumbHolder_do.w - _s.thumbnail_do.w)/2));
			_s.thumbnail_do.setY(Math.round((_s.thumbHolder_do.h - _s.thumbnail_do.h)/2));
			_s.thumbnail_do.setAlpha(0);
			FWDAnimation.to(_s.thumbnail_do, .8, {alpha:1});
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		_s.updateText = function(text){
			_s.text_do.setInnerHTML(text);
			
			if(_s.hasThumbanil_bl){
				_s.text_do.setX(16);
				_s.text_do.setWidth(_s.totalWidth - _s.totalHeight - 26);
			}else{
				_s.text_do.setX(8);
				_s.text_do.setWidth(_s.totalWidth - 16);
			}
			
			_s.text_do.setY(parseInt((_s.totalHeight - _s.text_do.getHeight())/2));
		};
	
		//#####################################//
		/* show / hide */
		//#####################################//
		_s.show = function(animate){
			if(_s.isShowed_bl) return;
			
			_s.isShowed_bl = true;
			_s.setVisible(true);
			
			FWDAnimation.killTweensOf(_s.main_do);
			if(animate && !_s.isMobile_bl){
				if(_s.position_str == "left"){
					FWDAnimation.to(_s.main_do, .8, {x:0, delay:.2, ease:Expo.easeInOut});
				}else{
					FWDAnimation.to(_s.main_do, .8, {x:-_s.totalWidth + 1, delay:.2,  ease:Expo.easeInOut});
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
				FWDAnimation.killTweensOf(_s.thumbnail_do);
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
		
		_s.init();
	};
	
	/* set prototype */
	FWDEVPAdsStart.setPrototype = function(){
		FWDEVPAdsStart.prototype = null;
		FWDEVPAdsStart.prototype = new FWDEVPTransformDisplayObject("div");
	};
	
	FWDEVPAdsStart.CLICK = "onClick";
	FWDEVPAdsStart.MOUSE_OVER = "onMouseOver";
	FWDEVPAdsStart.SHOW_TOOLTIP = "showTooltip";
	FWDEVPAdsStart.MOUSE_OUT = "onMouseOut";
	FWDEVPAdsStart.MOUSE_UP = "onMouseDown";
	
	FWDEVPAdsStart.prototype = null;
	window.FWDEVPAdsStart = FWDEVPAdsStart;
}(window));