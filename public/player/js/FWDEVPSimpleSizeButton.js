/* FWDEVPSimpleSizeButton */
(function (window){
var FWDEVPSimpleSizeButton = function(
		nImgPath, 
		sImgPath,
		buttonWidth,
		buttonHeight, 
	    useHEX,
	    nBC,
	    sBC,
	    showOver){
		
		var _s = this;
		var prototype = FWDEVPSimpleSizeButton.prototype;
		
		_s.nImg_img = null;
		_s.sImg_img = null;
	
		_s.n_do;
		_s.s_do;
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.nImgPath_str = nImgPath;
		_s.sImgPath_str = sImgPath;
		
		_s.buttonWidth = buttonWidth;
		_s.buttonHeight = buttonHeight;

		_s.showOver = showOver;
		if(!useHEX){
			_s.showOver = false;
		}

		_s.isMbl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize this */
		//##########################################//
		_s.init = function(){
			_s.setupMainContainers();
			_s.setWidth(_s.buttonWidth);
			_s.setHeight(_s.buttonHeight);
			_s.setButtonMode(true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.nImg = new Image();
			_s.nImg.src = _s.nImgPath_str;
			
			if(_s.useHEX && !_s.showOver){
				_s.n_do = new FWDEVPTransformDisplayObject("div");
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.nImg.onload = function(){	
					_s.n_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.nImg, _s.nBC).canvas;
					_s.n_do.screen.appendChild(_s.n_do_canvas);
				}
				_s.addChild(_s.n_do);
			}else{
				_s.n_do = new FWDEVPDisplayObject("img");
				_s.n_do.setScreen(_s.nImg);
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.n_do);
			}

			_s.sImg = new Image();
			_s.sImg.src = _s.sImgPath_str;
			
			if(_s.useHEX){
				_s.s_do = new FWDEVPTransformDisplayObject("div");
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				_s.sImg.onload = function(){
					_s.s_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.sImg, _s.nBC).canvas;
					_s.s_do.screen.appendChild(_s.s_do_canvas);
				}
				if(!_s.showOver){
					_s.s_do.setAlpha(0);
				}
				_s.addChild(_s.s_do);
			}else{
				_s.s_do = new FWDEVPDisplayObject("img");
				_s.s_do.setScreen(_s.sImg);
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.s_do);

				if(!_s.useHEX){
					_s.s_do.setAlpha(0);
				}
			}
			
			if(_s.showOver){
				_s.addChild(_s.s_do);
			}
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.setSelectedState);
				_s.screen.addEventListener("pointerout", _s.setNormalState);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMbl){
					_s.screen.addEventListener("mouseover", _s.setSelectedState);
					_s.screen.addEventListener("mouseout", _s.setNormalState);
					_s.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
			
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(e){
			if(_s.showOver){
				FWDAnimation.killTweensOf(_s.s_do);
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}else{
				FWDAnimation.killTweensOf(_s.s_do);
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}
		};
		
		_s.setSelectedState = function(e){
			if(_s.showOver){
				FWDAnimation.killTweensOf(_s.s_do);
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}else{
				FWDAnimation.killTweensOf(_s.s_do);
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}	
		};
		
		_s.onMouseUp = function(e){
			_s.dispatchEvent(FWDEVPSimpleSizeButton.MOUSE_UP);
			_s.dispatchEvent(FWDEVPSimpleSizeButton.CLICK);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			if(_s.n_do_canvas){
				FWDEVPUtils.changeCanvasHEXColor(_s.nImg, _s.n_do_canvas, nBC);
			}
			var clr = sBC;
			if(_s.showOver){
				clr = nBC;
			}
			FWDEVPUtils.changeCanvasHEXColor(_s.sImg, _s.s_do_canvas, clr);
		}
			
		_s.init();
	};
	
	/* set prototype */
	FWDEVPSimpleSizeButton.setPrototype = function(){
		FWDEVPSimpleSizeButton.prototype = null;
		FWDEVPSimpleSizeButton.prototype = new FWDEVPTransformDisplayObject("div", "relative");
	};
	
	FWDEVPSimpleSizeButton.MOUSE_UP = "onClick";
	FWDEVPSimpleSizeButton.CLICK = "onClick";
	
	FWDEVPSimpleSizeButton.prototype = null;
	window.FWDEVPSimpleSizeButton = FWDEVPSimpleSizeButton;
}(window));