/* FWDEVPVolumeButton */
(function (window){
var FWDEVPVolumeButton = function(
			nImg,
			sPath,
			dPath,
			useHEX,
			nBC,
			sBC,
			iconCSSString1, 
			iconCSSString2, 
			normalCalssName,
			selectedCalssName
		){
		
		var _s = this;
		var prototype = FWDEVPVolumeButton.prototype;
		
		_s.iconCSSString1 = iconCSSString1;
		_s.iconCSSString2 = iconCSSString2;
		_s.nImg = nImg;
		_s.sPath_str = sPath;
		_s.dPath_str = dPath;
		
		_s.n_sdo;
		_s.s_sdo;
		_s.d_sdo;
		
		_s.toolTipLabel_str;
		
		if(_s.nImg){
			_s.totalWidth = _s.nImg.width;
			_s.totalHeight = _s.nImg.height;
		}
		
		_s.normalCalssName = normalCalssName;
		_s.selectedCalssName = selectedCalssName;
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.isSetToDisabledState_bl = true;
		_s.isDisabled_bl = false;
		_s.isSelectedFinal_bl = false;
		_s.isActive_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.allowToCreateSecondButton_bl = true;
		_s.useFontAwesome_bl = Boolean(_s.iconCSSString1);
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setupMainContainers();
			_s.setNormalState(false);
			_s.setEnabledState();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
	
			if(_s.useFontAwesome_bl){
				_s.setOverflow('visible');
				_s.n_sdo = new FWDEVPTransformDisplayObject("div");	
				_s.n_sdo.hasTransform3d_bl = false;
				_s.n_sdo.hasTransform2d_bl = false;
				_s.n_sdo.setInnerHTML(_s.iconCSSString1);
				_s.addChild(_s.n_sdo);
				
				_s.d_sdo = new FWDEVPTransformDisplayObject("div");
				_s.d_sdo.hasTransform3d_bl = false;
				_s.d_sdo.hasTransform2d_bl = false;
				_s.d_sdo.setInnerHTML(_s.iconCSSString2);
				_s.addChild(_s.d_sdo);
				
				_s.setFinalSize();
			}else{
				if(_s.useHEX){
					_s.n_sdo = new FWDEVPTransformDisplayObject("div");
					_s.n_sdo.setWidth(_s.totalWidth);
					_s.n_sdo.setHeight(_s.totalHeight);
					_s.n_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.nImg, _s.nBC).canvas;
					_s.n_sdo.screen.appendChild(_s.n_sdo_canvas);
					_s.addChild(_s.n_sdo);
				}else{
					_s.n_sdo = new FWDEVPTransformDisplayObject("img");	
					_s.n_sdo.setScreen(_s.nImg);
					_s.addChild(_s.n_sdo);
				}
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.img1 = new Image();
					_s.img1.src = _s.sPath_str;
					var img2 = new Image();
					_s.sImg = img2;
					
					if(_s.useHEX){
						_s.s_sdo = new FWDEVPTransformDisplayObject("div");
						_s.s_sdo.setWidth(_s.totalWidth);
						_s.s_sdo.setHeight(_s.totalHeight);
						_s.img1.onload = function(){
							_s.s_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.img1, _s.sBC).canvas;
							_s.s_sdo.screen.appendChild(_s.s_sdo_canvas);
						}
						_s.s_sdo.setAlpha(0);
						_s.addChild(_s.s_sdo);
					}else{
						_s.s_sdo = new FWDEVPDisplayObject("img");
						_s.s_sdo.setScreen(_s.img1);
						_s.s_sdo.setWidth(_s.totalWidth);
						_s.s_sdo.setHeight(_s.totalHeight);
						_s.s_sdo.setAlpha(0);
						_s.addChild(_s.s_sdo);
					}
					
					if(_s.dPath_str){
						img2.src = _s.dPath_str;
						_s.d_sdo = new FWDEVPDisplayObject("img");
						_s.d_sdo.setScreen(img2);
						_s.d_sdo.setWidth(_s.totalWidth);
						_s.d_sdo.setHeight(_s.totalHeight);
						_s.d_sdo.setX(-100);
						_s.addChild(_s.d_sdo);
					};
				}
			}
			
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
			_s.setButtonMode(true);
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.onMouseOver);
				_s.screen.addEventListener("pointerout", _s.onMouseOut);
			}else if(_s.screen.addEventListener){	
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("mouseup", _s.onMouseUp);
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
		};
		
		_s.setFinalSize = function(){
			
			_s.setWidth(_s.n_sdo.getWidth());
			_s.setHeight(_s.n_sdo.getHeight());
			
			if(_s.w == 0){
				setTimeout(function(){
					_s.setFinalSize();
				},200);
			}
		}
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(animate){
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n_sdo.screen);
				FWDAnimation.killTweensOf(_s.d_sdo.screen);
				if(animate){
					FWDAnimation.to(_s.n_sdo.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});
					FWDAnimation.to(_s.d_sdo.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});
				}else{
					_s.n_sdo.screen.className = _s.normalCalssName;
					_s.d_sdo.screen.className = _s.normalCalssName;
				}
			}else{
				FWDAnimation.killTweensOf(_s.s_sdo);
				FWDAnimation.to(_s.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
			}
		};
		
		_s.setSelectedState = function(animate){
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n_sdo.screen);
				FWDAnimation.killTweensOf(_s.d_sdo.screen);
				if(animate){
					FWDAnimation.to(_s.n_sdo.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});	
					FWDAnimation.to(_s.d_sdo.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});
				}else{
					_s.n_sdo.screen.className = _s.selectedCalssName;
					_s.d_sdo.screen.className = _s.selectedCalssName
				}
			}else{
				FWDAnimation.killTweensOf(_s.s_sdo);
				FWDAnimation.to(_s.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
		
		_s.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(_s.isDisabled_bl || _s.isSelectedFinal_bl) return;
				_s.dispatchEvent(FWDEVPVolumeButton.MOUSE_OVER, {e:e});
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(_s.isDisabled_bl || _s.isSelectedFinal_bl) return;
				_s.dispatchEvent(FWDEVPVolumeButton.MOUSE_OUT, {e:e});
				_s.setNormalState(true);
			}
		};
		
		_s.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(_s.isDisabled_bl || e.button == 2 || _s.isSelectedFinal_bl) return;
			_s.dispatchEvent(FWDEVPVolumeButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		_s.setSelctedFinal = function(){
			_s.isSelectedFinal_bl = true;
			FWDAnimation.killTweensOf(_s.s_sdo);
			FWDAnimation.to(_s.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
			_s.setButtonMode(false);
		};
		
		_s.setUnselctedFinal = function(){
			_s.isSelectedFinal_bl = false;
			FWDAnimation.to(_s.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			_s.setButtonMode(true);
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		_s.setDisabledState = function(){
			if(_s.isSetToDisabledState_bl) return;
			
			_s.isSetToDisabledState_bl = true;
			if(_s.useFontAwesome_bl){
				_s.n_sdo.setX(-10000);
				_s.d_sdo.setX(0);
			}else{_s.d_sdo.setX(0);
				FWDAnimation.killTweensOf(_s.d_sdo);
				FWDAnimation.to(_s.d_sdo, .8, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		_s.setEnabledState = function(){
			if(!_s.isSetToDisabledState_bl) return;
			
			_s.isSetToDisabledState_bl = false;
			if(_s.useFontAwesome_bl){
				_s.n_sdo.setX(0);
				_s.d_sdo.setX(-10000);
			}else{
				_s.d_sdo.setX(-10000);
				FWDAnimation.killTweensOf(_s.d_sdo);
				FWDAnimation.to(_s.d_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			}
		};
		
		_s.disable = function(){
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
		};
		
		_s.enable = function(){
			_s.isDisabled_bl = false;
			_s.setButtonMode(true);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			FWDEVPUtils.changeCanvasHEXColor(_s.nImg, _s.n_sdo_canvas, nBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.img1, _s.s_sdo_canvas, sBC);
		}
		
		//##############################//
		/* destroy */
		//##############################//
		_s.destroy = function(){
			if(_s.isMobile_bl){
				if(_s.hasPointerEvent_bl){
					_s.screen.removeEventListener("pointerdown", _s.onMouseUp);
					_s.screen.removeEventListener("pointerover", _s.onMouseOver);
					_s.screen.removeEventListener("pointerout", _s.onMouseOut);
				}else{
					_s.screen.removeEventListener("touchend", _s.onMouseUp);
				}
			}else if(_s.screen.removeEventListener){	
				_s.screen.removeEventListener("mouseover", _s.onMouseOver);
				_s.screen.removeEventListener("mouseout", _s.onMouseOut);
				_s.screen.removeEventListener("mousedown", _s.onMouseUp);
			}else if(_s.screen.detachEvent){
				_s.screen.detachEvent("onmouseover", _s.onMouseOver);
				_s.screen.detachEvent("onmouseout", _s.onMouseOut);
				_s.screen.detachEvent("onmousedown", _s.onMouseUp);
			}
		
			FWDAnimation.killTweensOf(_s.s_sdo);
			_s.n_sdo.destroy();
			_s.s_sdo.destroy();
			
			if(_s.d_sdo){
				FWDAnimation.killTweensOf(_s.d_sdo);
				_s.d_sdo.destroy();
			}
			
			_s.nImg = null;
			_s.sImg = null;
			_s.dImg = null;
			_s.n_sdo = null;
			_s.s_sdo = null;
			_s.d_sdo = null;
			
			nImg = null;
			sImg = null;
			dImg = null;
			
			_s.toolTipLabel_str = null;
			
			_s.init = null;
			_s.setupMainContainers = null;
			_s.onMouseOver = null;
			_s.onMouseOut = null;
			_s.onClick = null;
			_s.onMouseDown = null;  
			_s.setSelctedFinal = null;
			_s.setUnselctedFinal = null;
			
			_s.setInnerHTML("");
			prototype.destroy();
			_s = null;
			prototype = null;
			FWDEVPVolumeButton.prototype = null;
		};
	
		_s.init();
	};
	
	/* set prototype */
	FWDEVPVolumeButton.setPrototype = function(){
		FWDEVPVolumeButton.prototype = null;
		FWDEVPVolumeButton.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPVolumeButton.CLICK = "onClick";
	FWDEVPVolumeButton.MOUSE_OVER = "onMouseOver";
	FWDEVPVolumeButton.MOUSE_OUT = "onMouseOut";
	FWDEVPVolumeButton.MOUSE_UP = "onMouseDown";
	
	FWDEVPVolumeButton.prototype = null;
	window.FWDEVPVolumeButton = FWDEVPVolumeButton;
}(window));