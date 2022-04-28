/* Thumb */
(function (window){
	
	var FWDEVPPoster = function(
			prt, 
			backgroundColor,
			showPoster,
			fillEntireScreenWithPoster_bl
		){
		
		var _s  = this;
		var prototype = FWDEVPPoster.prototype;
		
		
		_s.img_img = new Image();
		_s.img_do = null;
		_s.imgW = 0;
		_s.imgH = 0;
		_s.finalW = 0;
		_s.finalH = 0;
		_s.finalX = 0;
		_s.finalY = 0;
		
		_s.curPath_str;
		_s.backgroundColor_str = backgroundColor;
		_s.fillEntireScreenWithPoster_bl = fillEntireScreenWithPoster_bl;
		
		_s.isTransparent_bl = false;
		_s.showPoster_bl = showPoster;
		_s.showOrLoadOnMobile_bl = false;
		_s.isShowed_bl = true;
		_s.allowToShow_bl = true;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
	
		_s.init = function(){
			_s.img_img = new Image();
			_s.img_do = new FWDEVPDisplayObject("img");
			_s.hide();
			_s.setBkColor(_s.backgroundColor_str);
		};
		
		_s.positionAndResize = function(){
			if(!prt.sW) return;
			_s.setWidth(prt.sW);
			_s.setHeight(prt.sH);
		
			if(!_s.imgW) return;
			var scX = prt.sW/_s.imgW;
			var scY = prt.sH/_s.imgH;
			var ttSc;
			
			if(_s.fillEntireScreenWithPoster_bl){
				if(scX >= scY){
					ttSc = scX;
				}else{
					ttSc = scY;
				}
			}else{
				if(scX <= scY){
					ttSc = scX;
				}else{
					ttSc = scY;
				}
			}
			
			
			_s.finalW = Math.round(ttSc * _s.imgW);
			_s.finalH = Math.round(ttSc * _s.imgH);
			_s.finalX = parseInt((prt.sW - _s.finalW)/2);
			_s.finalY = parseInt((prt.sH - _s.finalH)/2);
		
			_s.img_do.setX(_s.finalX);
			_s.img_do.setY(_s.finalY);
			_s.img_do.setWidth(_s.finalW);
			_s.img_do.setHeight(_s.finalH);		
		};
		
		_s.setPoster = function(path){
			if(path && (FWDEVPUtils.trim(path) == "") || path =="none"){
				_s.showOrLoadOnMobile_bl = true;
				_s.isTransparent_bl = true;
				_s.show();
				return;
			}else if(path == "youtubemobile"){
				_s.isTransparent_bl = false;
				_s.showOrLoadOnMobile_bl = false;
				_s.img_img.src = null;
				_s.imgW = 0;
				return;
			}else if(path == _s.curPath_str){
				_s.isTransparent_bl = false;
				_s.showOrLoadOnMobile_bl = true;
				_s.show();
				return;
			}
			
			_s.isTransparent_bl = false;
			_s.showOrLoadOnMobile_bl = true;
			_s.curPath_str = path;
			if(_s.allowToShow_bl) _s.isShowed_bl = false;
			if(!path) return;
			//_s.img_do.setAlpha(0);
			if(_s.img_do) _s.img_do.src = "";
			_s.img_img.onload = _s.posterLoadHandler;
			_s.img_img.src = _s.curPath_str;
		};
		
		_s.posterLoadHandler = function(e){
			_s.imgW = _s.img_img.width;
			_s.imgH = _s.img_img.height;
			_s.img_do.setScreen(_s.img_img);
			_s.addChild(_s.img_do);
			_s.show();
			_s.positionAndResize();
		};
		
		//################################//
		/* show / hide */
		//################################//
		_s.show = function(allowToShow_bl, overwrite){
			
			if((!_s.allowToShow_bl || _s.isShowed_bl || !_s.showOrLoadOnMobile_bl) && !overwrite) return;
			
			_s.isShowed_bl = true;
			
			if(_s.isTransparent_bl){
				if(_s.alpha != 0) _s.setAlpha(0);
			}else {
				if(_s.alpha != 1) _s.setAlpha(1);
			}
			
			_s.setVisible(true);
			
			if(!_s.isMobile_bl && !_s.isTransparent_bl){
				FWDAnimation.killTweensOf(_s);
				_s.setAlpha(0);
				FWDAnimation.to(_s, .6, {alpha:1, delay:.4});	
				
			}
			
			_s.positionAndResize();
		};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			_s.setVisible(false);
		};
		
		
		_s.init();
	};
	
	/* set prototype */
    FWDEVPPoster.setPrototype = function(){
    	FWDEVPPoster.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPPoster.prototype = null;
	window.FWDEVPPoster = FWDEVPPoster;
}(window));