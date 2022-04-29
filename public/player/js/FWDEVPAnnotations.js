/* FWDEVPAnnotations */
(function (window){
var FWDEVPAnnotations = function(prt, _d){
		
		var _s = this;
		var prototype = FWDEVPAnnotations.prototype;
		
		_s.source_ar = _d.annotations_ar;
		_s.ann_ar = [];
		_s.totalAnnotations = _s.source_ar.length;
		_s.showAnnotationsPositionTool_bl = _d.showAnnotationsPositionTool_bl;
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupAnnotations();
		};
		
		//##########################################//
		/* setup text containers */
		//##########################################//
		_s.setupAnnotations = function(){
			
			for(var i=0; i<_s.totalAnnotations; i++){
				
				FWDEVPAnnotation.setPrototype();
				var ann = new FWDEVPAnnotation({
					id:i,
					start:_s.source_ar[i].start,
					end:_s.source_ar[i].end,
					left:_s.source_ar[i].left,
					top:_s.source_ar[i].top,
					clickSource:_s.source_ar[i].clickSource,
					clickSourceTarget:_s.source_ar[i].clickSourceTarget,
					content:_s.source_ar[i].content,
					showCloseButton_bl:_s.source_ar[i].showCloseButton_bl,
					closeButtonNpath:_d.annotationAddCloseNPath_str,
					closeButtonSPath:_d.annotationAddCloseSPath_str,
					normalStateClass:_s.source_ar[i].normalStateClass,
					selectedStateClass:_s.source_ar[i].selectedStateClass,
					showAnnotationsPositionTool_bl:_s.showAnnotationsPositionTool_bl,
					prt:_s,
					handPath_str:_d.handPath_str,
					grabPath_str:_d.grabPath_str
				}) 
				
				_s.ann_ar[i] = ann;
				
				_s.addChild(ann);
			}	
		};
		
		_s.update = function(duration){
			
			if(_s.totalAnnotations == 0 || duration == 0) return;
			var annotation;
			
			for(var i=0; i<_s.totalAnnotations; i++){
				annotation = _s.ann_ar[i];
				if(duration <0){
					annotation.hide();
				}else if(duration >= annotation.startTime && duration <= annotation.endTime){
					annotation.show();
					_s.position();
				}else{
					annotation.hide();
				}
			}	
		
		};
		
		
		_s.position = function(animate){
			
			var selfScale = prt.sW/prt.maxWidth;
			_s.setX(Math.round((prt.sW - (selfScale * prt.maxWidth))/2));
			_s.setY(Math.round((prt.tempVidStageHeight - (selfScale * prt.maxHeight))/2));
			
			_s.scale = prt.sW/prt.maxWidth;
			_s.scaleY = _s.scale;
			_s.scaleX = _s.scale;
			
			_s.scaleInverse = prt.maxWidth/prt.sW;
			
			if(_s.showAnnotationsPositionTool_bl) return;
			for(var i=0; i<_s.totalAnnotations; i++){
				var ann_do = _s.ann_ar[i];
				//if(ann_do.isShowed_bl){
					var finalX = 0;
					var finalY = 0;
					
					ann_do.setScale2(_s.scale);
				
					ann_do.finalX = Math.floor(ann_do.left * _s.scaleX);
					ann_do.finalY = Math.floor(ann_do.top * _s.scaleY);
					
					if(ann_do.closeButton_do){
						ann_do.closeButton_do.setWidth(ann_do.closeButton_do.buttonWidth * _s.scaleInverse);
						ann_do.closeButton_do.setHeight(ann_do.closeButton_do.buttonHeight * _s.scaleInverse);
						ann_do.closeButton_do.n_do.setWidth(ann_do.closeButton_do.buttonWidth * _s.scaleInverse);
						ann_do.closeButton_do.n_do.setHeight(ann_do.closeButton_do.buttonHeight * _s.scaleInverse);
						ann_do.closeButton_do.s_do.setWidth(ann_do.closeButton_do.buttonWidth * _s.scaleInverse);
						ann_do.closeButton_do.s_do.setHeight(ann_do.closeButton_do.buttonHeight * _s.scaleInverse);
						ann_do.closeButton_do.setX(Math.floor(ann_do.getWidth() - ((ann_do.closeButton_do.w/2))));
						ann_do.closeButton_do.setY(Math.floor(-(ann_do.closeButton_do.h/2)));
					}
					
					if(ann_do.prevFinalX != ann_do.finalX){
						if(animate){
							FWDAnimation.to(ann_do, .8, {x:ann_do.finalX, ease:Expo.easeInOut});
						}else{
							ann_do.setX(ann_do.finalX);
						}
						
					}
				
					if(ann_do.prevFinalY != ann_do.finalY){
						if(animate){
							FWDAnimation.to(ann_do, .8, {y:ann_do.finalY, ease:Expo.easeInOut});
						}else{
							ann_do.setY(ann_do.finalY);
						}
					}
					
					ann_do.prevFinalX = ann_do.finalX;
					ann_do.prevFinalY = ann_do.finalY
				//}
			}

			
		};
	
		_s.init();
	};
	
	/* set prototype */
	FWDEVPAnnotations.setPrototype = function(){
		FWDEVPAnnotations.prototype = null;
		FWDEVPAnnotations.prototype = new FWDEVPDisplayObject("div", "absolute");
	};
	
	
	FWDEVPAnnotations.prototype = null;
	window.FWDEVPAnnotations = FWDEVPAnnotations;
}(window));