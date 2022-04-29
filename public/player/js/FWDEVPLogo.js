/* Thumb */
(function (window){
	
	var FWDEVPLogo = function(
			prt, 
			source,
			position,
			margins
		){
		
		var _s  = this;
		var prototype = FWDEVPLogo.prototype;
		
		_s.img_img = null;
		
		_s.logoImage_do = null;
		
		_s.position_str = position;
		_s.source_str = source;
		_s.logoLink_str = prt._d.logoLink_str;
		
		_s.margins = margins;
		
		_s.isShowed_bl = true;
		_s.allowToShow_bl = true;
	
		_s.init = function(){
			
			if(_s.logoLink_str == "none"){
				_s.getStyle().pointerEvents = "none";
			}else{
				_s.setButtonMode(true);
				_s.screen.onclick = function(){window.open(_s.logoLink_str, "_blank");};
			}
			
			_s.logoImage_do = new FWDEVPDisplayObject("img");
			
			_s.img_img = new Image();
			_s.img_img.onerror = null;
			_s.img_img.onload = _s.loadDone;
			_s.img_img.src = _s.source_str + "?" + (new Date()).getTime();
			_s.hide();
		};
		
		_s.loadDone = function(){
			_s.setWidth(_s.img_img.width);
			_s.setHeight(_s.img_img.height);
			
			_s.logoImage_do.setScreen(_s.img_img);
			_s.addChild(_s.logoImage_do);
			_s.logoImage_do.setWidth(_s.img_img.width);
			_s.logoImage_do.setHeight(_s.img_img.height);
			
			_s.positionAndResize();
		};
		
		_s.positionAndResize = function(){
			
			if(_s.position_str == "topleft"){
				_s.finalX = _s.margins;
				_s.finalY = _s.margins;
			}else if(_s.position_str == "topright"){
				_s.finalX = prt.sW - _s.w - _s.margins;
				_s.finalY = _s.margins;
			}else if(_s.position_str == "bottomright"){
				_s.finalX = prt.sW - _s.w - _s.margins;
				_s.finalY = prt.sH - _s.h - _s.margins;
			}else if(_s.position_str == "bottomleft"){
				_s.finalX = _s.margins;
				_s.finalY = prt.sH - _s.h - _s.margins;
			}
		
			_s.setX(_s.finalX);
			_s.setY(_s.finalY);
		};
		
		//################################//
		/* show / hide */
		//################################//
		_s.show = function(animate){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			_s.setVisible(true);
			FWDAnimation.killTweensOf(_s);
			if(animate){
				FWDAnimation.to(_s, .8, {alpha:1, ease:Expo.easeInOut});
			}else{
				_s.setAlpha(1);
			}
		};
		
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite) return;
			_s.isShowed_bl = false;
			FWDAnimation.killTweensOf(_s);
			if(animate){
				FWDAnimation.to(_s, .8, {alpha:0, ease:Expo.easeInOut, onComplete:function(){
					_s.setVisible(false);
				}});
			}else{
				_s.setAlpha(0);
				_s.setVisible(false);
			}
		};
		
		_s.init();
	};
	
	/* set prototype */
    FWDEVPLogo.setPrototype = function(){
    	FWDEVPLogo.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPLogo.prototype = null;
	window.FWDEVPLogo = FWDEVPLogo;
}(window));