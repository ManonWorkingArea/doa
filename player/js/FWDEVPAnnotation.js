/* FWDEVPAnnotation */
(function (window){
var FWDEVPAnnotation = function(props_obj){
		
		var _s = this;
		var prototype = FWDEVPAnnotation.prototype;
		
		_s.id = props_obj.id;
		_s.startTime = props_obj.start;
		_s.endTime = props_obj.end;
		_s.htmlContent_str = props_obj.content;
		_s.left = props_obj.left;
		_s.top = props_obj.top;
		_s.showCloseButton_bl = props_obj.showCloseButton_bl;
		_s.clickSource = props_obj.clickSource;
		_s.clickSourceTarget = props_obj.clickSourceTarget;
		_s.closeButtonNpath = props_obj.closeButtonNpath;
		_s.closeButtonSPath = props_obj.closeButtonSPath;
		_s.normalStateClass = props_obj.normalStateClass;
		_s.selectedStateClass = props_obj.selectedStateClass;
		_s.showAnnotationsPositionTool_bl = props_obj.showAnnotationsPositionTool_bl;
		_s.prt = props_obj.prt;
		_s.curX = _s.left;
		_s.curY = _s.top;
		
		_s.handPath_str = props_obj.handPath_str;
		_s.grabPath_str = props_obj.grabPath_str;
		
		_s.dummy_do = null;
		_s.isShowed_bl = false;
		_s.isClosed_bl = false;
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setAlpha(0);
			_s.setVisible(false);
			
			if(FWDEVPUtils.hasTransform2d){
				_s.getStyle().transformOrigin = "0% 0%";
			}
			
			_s.screen.innerHTML = _s.htmlContent_str;
			_s.screen.className = _s.normalStateClass;
			_s.setBackfaceVisibility();
			_s.getStyle().fontSmoothing = "antialiased";
			_s.getStyle().webkitFontSmoothing = "antialiased";
			_s.getStyle().textRendering = "optimizeLegibility";
			
			_s.dummy_do = new FWDEVPDisplayObject("div");
			_s.dummy_do.getStyle().width = "100%";
			_s.dummy_do.getStyle().height = "100%";
			_s.addChild(_s.dummy_do);
		
			setTimeout(function(){
				_s.w = _s.getWidth();
				_s.h = _s.getHeight();
			}, 100);
			
			if(_s.showCloseButton_bl && !_s.showAnnotationsPositionTool_bl){
				FWDEVPSimpleSizeButton.setPrototype();
				_s.closeButton_do = new FWDEVPSimpleSizeButton(
						_s.closeButtonNpath, 
						_s.closeButtonSPath,
						21,
						21
						);
			    _s.closeButton_do.setScale2(0);
				_s.closeButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, _s.closeClickButtonCloseHandler);
				_s.closeButton_do.getStyle().position = "absolute";
				_s.addChild(_s.closeButton_do);
			}
			
			if(_s.showAnnotationsPositionTool_bl){
				_s.info_do = new FWDEVPDisplayObject("div");
				_s.info_do.getStyle().backgroundColor = "#FFFFFF";
				_s.info_do.getStyle().boxShadow = "2px 2px 2px #888888;";
				
				_s.info_do.getStyle().fontSmoothing = "antialiased";
				_s.info_do.getStyle().webkitFontSmoothing = "antialiased";
				_s.info_do.getStyle().textRendering = "optimizeLegibility";
				_s.addChild(_s.info_do);
				
				setTimeout(function(){
					_s.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> _d-left=" + Math.round(_s.curX * _s.prt.scaleInverse)  + "</div><div style='padding:4px; margin:4px; color:#000000;'> _d-top=" + Math.round(_s.curY * _s.prt.scaleInverse)  + "</div>";
					
					_s.setX(Math.round(_s.curX * _s.prt.scale));
					_s.setY(Math.round(_s.curY * _s.prt.scale));
				}, 100)
				if(_s.isMobile_bl){
				if(_s.hasPointerEvent_bl){
						_s.screen.addEventListener("pointerdown", _s.selfOnDownHandler);
					}else{
						_s.screen.addEventListener("touchdown", _s.selfOnDownHandler);
					}
				}else{
					if(window.addEventListener){
						_s.screen.addEventListener("mousedown", _s.selfOnDownHandler);		
					}
				}
				_s.getStyle().cursor = 'url(' + _s.handPath_str + '), default';
			}
		
			if(_s.clickSource && !_s.showAnnotationsPositionTool_bl){
				_s.dummy_do.setButtonMode(true);
				_s.dummy_do.screen.addEventListener("click", _s.onClickHandler);
				_s.dummy_do.screen.addEventListener("mouseover", _s.onMouseOverHandler);
				_s.dummy_do.screen.addEventListener("mouseout", _s.onMouseOutHandler);
			}
			
			
		};
		
		_s.selfOnDownHandler =  function(e){
			if(e.preventDefault) e.preventDefault();
			
			_s.getStyle().cursor = 'url(' + _s.grabPath_str + '), default';
			_s.prt.addChild(_s);
			
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			_s.startX = viewportMouseCoordinates.screenX - _s.prt.getGlobalX();
			_s.startY = viewportMouseCoordinates.screenY - _s.prt.getGlobalY();
			_s.curX = _s.x;
			_s.curY = _s.y;
		
			if(_s.isMobile_bl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointermove", _s.selfMoveHandler);
					window.addEventListener("pointerup", _s.selfEndHandler);
				}else{
					window.addEventListener("touchmove", _s.selfMoveHandler);
					window.addEventListener("touchend", _s.selfEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", _s.selfMoveHandler);
					window.addEventListener("mouseup", _s.selfEndHandler);		
				}
			}
		};
		
		_s.selfMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			_s.localX = viewportMouseCoordinates.screenX - _s.prt.getGlobalX();
			_s.localY = viewportMouseCoordinates.screenY - _s.prt.getGlobalY();
			
			_s.curX = _s.x;
			_s.curY = _s.y;
			_s.curX += (_s.localX - _s.startX);
			_s.curY += (_s.localY - _s.startY);
			
			_s.setX(_s.curX);
			_s.setY(_s.curY);
			_s.startX = viewportMouseCoordinates.screenX - _s.prt.getGlobalX();
			_s.startY = viewportMouseCoordinates.screenY - _s.prt.getGlobalY();
			
			_s.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> _d-left=" + Math.round(_s.curX * _s.prt.scaleInverse)  + "</div><div style='padding:4px; margin:4px; color:#000000;'> _d-top=" + Math.round(_s.curY * _s.prt.scaleInverse)  + "</div>";
		};
		
		_s.selfEndHandler = function(e){
			_s.getStyle().cursor = 'url(' + _s.handPath_str + '), default';
			if(_s.isMobile_bl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("pointermove", _s.selfMoveHandler);
					window.removeEventListener("pointerup", _s.selfEndHandler);
				}else{
					window.removeEventListener("touchmove", _s.selfMoveHandler);
					window.removeEventListener("touchend", _s.selfEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", _s.selfMoveHandler);
					window.removeEventListener("mouseup", _s.selfEndHandler);		
				}
			}
		};
		
		_s.onMouseOverHandler = function(e){
			_s.setSelectedAtate();
		};
		
		_s.onMouseOutHandler = function(e){
			_s.setNormalState();
		};
		
		_s.onClickHandler = function(){
			if(_s.clickSource.indexOf("http") != -1){
				window.open(_s.clickSource, _s.target);
			}else{
				eval(_s.clickSource);
			}
		};
		
		_s.closeClickButtonCloseHandler = function(){
			_s.hide();
			_s.isClosed_bl = true;
		};
	
		_s.show = function(){
			if(_s.isShowed_bl || _s.isClosed_bl) return;
			_s.isShowed_bl = true;
			_s.setVisible(true);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .8, {alpha:1, ease:Quint.easeOut});
			if(_s.closeButton_do) FWDAnimation.to(_s.closeButton_do, .8, {scale:1, delay:.2, ease:Elastic.easeOut});
		};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			FWDAnimation.killTweensOf(_s);
			_s.isShowed_bl = false;
			_s.setVisible(false);
			_s.setAlpha(0);
			if(_s.closeButton_do){
				FWDAnimation.killTweensOf(_s.closeButton_do);
				_s.closeButton_do.setScale2(0);
			}
		};
		
		_s.setNormalState = function(){
			if(!_s.selectedStateClass) return;
			FWDAnimation.to(_s.screen, .8, {className:_s.normalStateClass, ease:Quint.easeOut});
		};
		
		_s.setSelectedAtate = function(){
			if(!_s.selectedStateClass) return;
			FWDAnimation.to(_s.screen, .8, {className:_s.selectedStateClass, ease:Quint.easeOut});
		};
		
		_s.init();
	};
	
	/* set prototype */
	FWDEVPAnnotation.setPrototype = function(){
		FWDEVPAnnotation.prototype = null;
		if(FWDEVPUtils.hasTransform2d){
			FWDEVPAnnotation.prototype = new FWDEVPTransformDisplayObject("div");
		}else{
			FWDEVPAnnotation.prototype = new FWDEVPDisplayObject("div", "absolute");
		}
	};
	
	
	FWDEVPAnnotation.prototype = null;
	window.FWDEVPAnnotation = FWDEVPAnnotation;
}(window));