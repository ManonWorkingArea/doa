/* Thumb */
(function (window){
	
	var FWDEVPPreloader = function(prt, preloaderPostion, radius, backgroundColor, fillColor, strokeSize, animDuration){
		
		var _s  = this;
		var prototype = FWDEVPPreloader.prototype;
		_s.main_do;
		_s.preloaderPostion = preloaderPostion;
		_s.backgroundColor = backgroundColor;
		_s.fillColor = fillColor;
		_s.radius = radius;
		_s.strokeSize = strokeSize;
		_s.animDuration = animDuration || 300;
		_s.strtAngle = 270;
		_s.countAnimation = 0;
		_s.isShowed_bl = true;
		_s.slideshowAngle = {n:0};
		
		//###################################//
		/* init */
		//###################################//
		_s.init = function(){
			_s.main_do = new FWDEVPDisplayObject("div");
			_s.main_do.setOverflow("visible");
			_s.main_do.setWidth(_s.radius * 2 + _s.strokeSize);
			_s.main_do.setHeight(_s.radius * 2 + _s.strokeSize);
			_s.addChild(_s.main_do);
			_s.setOverflow('visible');
			_s.setWidth((_s.radius * 2) + _s.strokeSize);
			_s.setHeight((_s.radius * 2) + _s.strokeSize);
			_s.bkCanvas =  new FWDEVPDisplayObject("canvas");
			_s.bkCanvasContext = _s.bkCanvas.screen.getContext('2d');
			_s.fillCircleCanvas = new FWDEVPDisplayObject("canvas");
			_s.fillCircleCanvasContext = _s.fillCircleCanvas.screen.getContext('2d');
			_s.main_do.screen.style.transformOrigin = "50% 50%";
		
			_s.main_do.addChild(_s.bkCanvas);
			_s.main_do.addChild(_s.fillCircleCanvas);
			_s.drawBackground();
			_s.drawFill();
			_s.hide();
		};

		/*
			Postion
		*/
		_s.positionAndResize = function(){

			if(_s.preloaderPostion == 'bottomleft'){
				_s.setX(prt.offsetPreloader);
				_s.setY(prt.sH - _s.h - prt.offsetPreloader);
			}else if(_s.preloaderPostion == 'bottomright'){
				_s.setX(prt.sW - _s.w - prt.offsetPreloader);
				_s.setY(prt.sH - _s.h - prt.offsetPreloader);
			}else if(_s.preloaderPostion == 'topright'){
				_s.setX(prt.sW - _s.w - prt.offsetPreloader);
				_s.setY(prt.offsetPreloader);
			}else if(_s.preloaderPostion == 'topleft'){
				_s.setX(prt.offsetPreloader);
				_s.setY(prt.offsetPreloader);
			}else if(_s.preloaderPostion == 'center'){
				_s.setX(Math.round(prt.sW - _s.w)/2);
				_s.setY(Math.round(Math.min(prt.sH, prt.viewportSize.h) - _s.h)/2);
			}
		}	

		/* draw background */
		_s.drawBackground = function(){
			_s.bkCanvas.screen.width = (_s.radius * 2) + _s.strokeSize * 2;
			_s.bkCanvas.screen.height = (_s.radius * 2) + _s.strokeSize * 2;
			_s.bkCanvasContext.lineWidth = _s.thicknessSize;
			_s.bkCanvasContext.translate(_s.strokeSize/2, _s.strokeSize/2);
			_s.bkCanvasContext.shadowColor = '#333333';
		    _s.bkCanvasContext.shadowBlur = 1;
		   
			_s.bkCanvasContext.lineWidth=_s.strokeSize;
			_s.bkCanvasContext.strokeStyle = _s.backgroundColor;
			_s.bkCanvasContext.beginPath();
			_s.bkCanvasContext.arc(_s.radius, _s.radius,  _s.radius, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
			_s.bkCanvasContext.stroke();
			_s.bkCanvasContext.closePath();
		};
		
		/* draw fill */
		_s.drawFill = function(){	
			_s.fillCircleCanvas.screen.width = (_s.radius * 2) + _s.strokeSize * 2;
			_s.fillCircleCanvas.screen.height = (_s.radius * 2) + _s.strokeSize * 2;
			_s.fillCircleCanvasContext.lineWidth = _s.thicknessSize;
			_s.fillCircleCanvasContext.translate(_s.strokeSize/2, _s.strokeSize/2);
			_s.fillCircleCanvasContext.lineWidth=_s.strokeSize;
			_s.fillCircleCanvasContext.strokeStyle = _s.fillColor;
			_s.fillCircleCanvasContext.beginPath();
			_s.fillCircleCanvasContext.arc(_s.radius, _s.radius,  _s.radius, (Math.PI/180) * _s.strtAngle, (Math.PI/180) * (_s.strtAngle +  _s.slideshowAngle.n), false);
			_s.fillCircleCanvasContext.stroke();
			_s.fillCircleCanvasContext.closePath()
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		_s.startSlideshow = function(){
			if(_s == null) return;
			FWDAnimation.killTweensOf(_s.slideshowAngle);
			FWDAnimation.to(_s.slideshowAngle, _s.animDuration, {n:360, onUpdate:_s.drawFill, onComplete:_s.stopSlideshow});
		};
		
		_s.stopSlideshow = function(){
			FWDAnimation.killTweensOf(_s.slideshowAngle);
			FWDAnimation.to(_s.slideshowAngle, .8, {n:0, onupdate:_s.drawFill, onUpdate:_s.drawFill, ease:Expo.easiInOut});
		};
		
		_s.startPreloader = function(){
			_s.stopPreloader();
			_s.slideshowAngle = {n:0};
			FWDAnimation.to(_s.slideshowAngle, _s.animDuration, {n:360, onUpdate:_s.drawFill, repeat:100, yoyo:true, ease:Expo.easInOut});
			FWDAnimation.to(_s.main_do.screen, _s.animDuration, {rotation:360,  repeat:100});
		}

		_s.stopPreloader = function(){
			FWDAnimation.killTweensOf(_s.slideshowAngle);
			FWDAnimation.killTweensOf(_s.main_do.screen);
			FWDAnimation.to(_s.main_do.screen, 0.00001, {rotation:0});
		}
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		_s.show = function(){
			if(_s.isShowed_bl) return;
			_s.setVisible(true);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, 1, {alpha:1, delay:.2});
			_s.stopPreloader();
			_s.startPreloader();
			_s.isShowed_bl = true;
		};
		
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			FWDAnimation.killTweensOf(this);
			if(animate){
				FWDAnimation.to(this, .2, {alpha:0, onComplete:_s.onHideComplete});
			}else{
				_s.setVisible(false);
				_s.setAlpha(0);
			}
			_s.isShowed_bl = false;
		};
		
		_s.onHideComplete = function(){
			_s.setVisible(false);
			_s.stopPreloader();
			_s.dispatchEvent(FWDEVPPreloader.HIDE_COMPLETE);
		};
		
		_s.init();
	};
	
	/* set prototype */
    FWDEVPPreloader.setPrototype = function(){
    	FWDEVPPreloader.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDEVPPreloader.prototype = null;
	window.FWDEVPPreloader = FWDEVPPreloader;
}(window));