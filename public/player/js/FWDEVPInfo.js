/* Info screen */
(function (window){
	
	var FWDEVPInfo = function(prt, warningIconPath, showErrorInfo){
		
		var _s = this;
		var prototype = FWDEVPInfo.prototype;
		
		_s.bk_do = null;
		_s.textHolder_do = null;
		
		_s.warningIconPath_str = warningIconPath;
		
		_s.showErrorInfo_bl = showErrorInfo;
		_s.show_to = null;
		_s.isShowed_bl = false;
		_s.isShowedOnce_bl = false;
		_s.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			_s.setResizableSizeAfterParent();
			
			_s.bk_do = new FWDEVPDisplayObject("div");
			_s.bk_do.setAlpha(.2);
			_s.bk_do.setBkColor("#000000");
			_s.addChild(_s.bk_do);
			
			_s.textHolder_do = new FWDEVPDisplayObject("div");
			if(!FWDEVPUtils.isIEAndLessThen9) _s.textHolder_do.getStyle().font = "Arial";
			_s.textHolder_do.getStyle().wordWrap = "break-word";
			_s.textHolder_do.getStyle().padding = "10px";
			_s.textHolder_do.getStyle().paddingLeft = "42px";
			_s.textHolder_do.getStyle().lineHeight = "18px";
			_s.textHolder_do.getStyle().color = "#000000";
			_s.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = this.warningIconPath_str;
			this.img_do = new FWDEVPDisplayObject("img");
			this.img_do.setScreen(img_img);
			this.img_do.setWidth(28);
			this.img_do.setHeight(28);
			
			_s.addChild(_s.textHolder_do);
			_s.addChild(_s.img_do);
		};
		
		this.showText = function(txt){
			
			if(!_s.isShowedOnce_bl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("pointerdown", _s.closeWindow);
				}else{
					_s.screen.addEventListener("click", _s.closeWindow);
					_s.screen.addEventListener("touchend", _s.closeWindow);
				}
				_s.isShowedOnce_bl = true;
			}
			
			_s.setVisible(false);
			
			_s.textHolder_do.getStyle().paddingBottom = "10px";
			_s.textHolder_do.setInnerHTML(txt);
			
			
			clearTimeout(_s.show_to);
			_s.show_to = setTimeout(_s.show, 60);
			setTimeout(function(){
				_s.positionAndResize();
			}, 10);
		};
		
		this.show = function(){
			var finalW = Math.min(640, prt.sW - 120);
			_s.isShowed_bl = true;
		
			_s.textHolder_do.setWidth(finalW);
			setTimeout(function(){
				if(_s.showErrorInfo_bl)_s.setVisible(true);
				_s.positionAndResize();
			}, 100);
		};
		
		this.positionAndResize = function(){
			
			var finalW = _s.textHolder_do.getWidth();
			var finalH = _s.textHolder_do.getHeight();
			var finalX = parseInt((prt.sW - finalW)/2);
			var finalY = parseInt((prt.sH - finalH)/2);
			
			_s.bk_do.setWidth(prt.sW);
			_s.bk_do.setHeight(prt.sH);
			_s.textHolder_do.setX(finalX);
			_s.textHolder_do.setY(finalY);
			
			_s.img_do.setX(finalX + 6);
			_s.img_do.setY(finalY + parseInt((_s.textHolder_do.getHeight() - _s.img_do.h)/2));
			//_s.img_do.setY(finalY + 6);
		};
		
		this.closeWindow = function(){
			if(!_s.allowToRemove_bl) return;
			_s.isShowed_bl = false;
			clearTimeout(_s.show_to);
			try{prt.main_do.removeChild(_s);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDEVPInfo.setPrototype = function(){
		FWDEVPInfo.prototype = new FWDEVPDisplayObject("div", "relative");
	};
	
	FWDEVPInfo.prototype = null;
	window.FWDEVPInfo = FWDEVPInfo;
}(window));