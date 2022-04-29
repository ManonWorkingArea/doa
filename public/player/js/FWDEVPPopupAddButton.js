/* FWDEVPPopupAddButton */
(function (){
var FWDEVPPopupAddButton = function(
		    prt,
			imageSource,
			start,
			end,
			link,
			target,
			id,
			google_ad_client,
			google_ad_slot,
			google_ad_width,
			google_ad_height,
			tracking,
			popupAddCloseNPath_str,
			popupAddCloseSPath_str,
			showPopupAdsCloseButton_bl
		){
		
		var _s = this;
		var prototype = FWDEVPPopupAddButton.prototype;
		
		_s.closeButton_do;
		_s.image_do;
		_s.imageSource = imageSource;
		_s.link = link;
		_s.target = target;
		_s.start = start;
		_s.end = end;
		_s.google_ad_client = google_ad_client;
		_s.google_ad_slot = google_ad_slot
		_s.originalW = _s.google_ad_width = google_ad_width;
		_s.originalH = _s.google_ad_height = google_ad_height;
		_s.tracking = tracking;
		
		
		_s.finalW = 0;
		_s.finalH = 0;
		
		if(Boolean(_s.google_ad_client)){
			_s.type = 'adsense';
		}else if(_s.imageSource.match(/.png|.jpg|.jpeg|.gif/ig)){
			_s.type = 'image';
		}else{
			_s.type = 'iframe';
		}
		
		
		_s.id = id;
		
		_s.showPopupAdsCloseButton_bl = showPopupAdsCloseButton_bl;
		_s.popupAddCloseNPath_str = popupAddCloseNPath_str;
		_s.popupAddCloseSPath_str = popupAddCloseSPath_str;
		
		_s.isClosed_bl = false;
		_s.isLoaded_bl = false;
		_s.isShowed_bl = false;

		
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setBkColor("rgba(0, 0, 0, 0.6)");
			_s.setX(-5000);
			if(_s.showPopupAdsCloseButton_bl){
				FWDEVPSimpleSizeButton.setPrototype();
				_s.closeButton_do = new FWDEVPSimpleSizeButton(
						_s.popupAddCloseNPath_str, 
						_s.popupAddCloseSPath_str,
						21,
						21
						);
				_s.closeButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, _s.closeClickButtonCloseHandler);
			}
			
			
			if(_s.type == 'image'){
				_s.image = new Image();
				_s.image.src = _s.imageSource;
				_s.image.onload = _s.onLoadHandler;
			}else{
				_s.isLoaded_bl = true;
				_s.setWidth(_s.originalW);
				_s.setHeight(_s.originalH);
			}
			
			if(_s.closeButton_do){
				_s.addChild(_s.closeButton_do);
				_s.closeButton_do.setX(-300);
			}
			
			if(_s.link){
				_s.setButtonMode(true);
			}
		};
		
		_s.closeClickButtonCloseHandler = function(){
			_s.hide();
			_s.isClosed_bl = true;
		};
		
		_s.clickHandler = function(){
			if(_s.link){
				prt.prt.pause();
				if(_s.tracking){
					prt.prt.executeVastEvent(_s.tracking);
				}
				window.open(_s.link, _s.target);
			}
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.onLoadHandler = function(){
			_s.originalW = _s.image.width;
			_s.originalH = _s.image.height;
			_s.image_do = new FWDEVPDisplayObject("img");
			_s.image_do.setScreen(_s.image);
			_s.image_do.setWidth(_s.originalW);
			_s.image_do.setHeight(_s.originalH);
			_s.addChild(_s.image_do);
			_s.isLoaded_bl = true;
			if(_s.closeButton_do){
				_s.addChild(_s.closeButton_do);
				_s.closeButton_do.setX(-300);
			}
			//_s.resizeAndPosition(true);
			_s.image_do.screen.addEventListener("click", _s.clickHandler);
		};
		
		_s.hide = function(remove){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			var scale = Math.min(1, prt.prt.tempVidStageWidth/(_s.originalW));			
			var finalH = parseInt(scale * _s.originalH);
			
			finalY = parseInt(prt.prt.tempVidStageHeight);
			prt.setY(finalY);
			
			_s.setX(-5000);
			FWDAnimation.killTweensOf(prt);
			if(remove){
				prt.removeChild(_s);
				prt.setWidth(0);
				prt.setHeight(0);
			}else{
				_s.setWidth(0);
				_s.setHeight(0);
				prt.setVisible(false);
				_s.setVisible(false);
			}
		};
		
		_s.show = function(){
			
			if(_s.isShowed_bl || _s.isClosed_bl || !_s.isLoaded_bl) return;	
			_s.isShowed_bl = true;
			
			_s.setX(0);
			setTimeout(function(){
				FWDAnimation.killTweensOf(prt);
				prt.setVisible(true);
				_s.setVisible(true);

				if(_s.type == 'adsense' && !_s.isGooglAdCreated_bl){
					
					_s.isGooglAdCreated_bl = true;
					
					window.google_ad_client = _s.google_ad_client;
					window.google_ad_slot = _s.google_ad_slot;
					window.google_ad_width = _s.originalW;
					window.google_ad_height = _s.originalH;
					
					// container is where you want the ad to be inserted
					_s.container = new FWDEVPTransformDisplayObject("div");
					_s.container.setWidth(_s.originalW);
					_s.container.setHeight(_s.originalH);
					
					_s.addChild(_s.container);
				
					var w = document.write;
					document.write = function (content) {
						_s.container.screen.innerHTML = content;
						document.write = w;
					};

					var script = document.createElement('script');
					script.type = 'text/javascript';
					if(location.href.indexOf("https") != -1){
						script.src = 'https://pagead2.googlesyndication.com/pagead/show_ads.js';
					}else{
						script.src = 'http://pagead2.googlesyndication.com/pagead/show_ads.js';
					}
					
					document.body.appendChild(script);
					if(_s.closeButton_do){
						_s.addChild(_s.closeButton_do);
						_s.closeButton_do.setX(-300);
					}
				}else if(_s.type == 'iframe'){
					// container is where you want the ad to be inserted
					_s.container = new FWDEVPTransformDisplayObject("div");
					_s.container.setWidth(_s.originalW);
					_s.container.setHeight(_s.originalH);
					
					_s.ifr = new FWDEVPTransformDisplayObject("IFRAME");
					_s.ifr.screen.scrolling = 'no';
					_s.ifr.setWidth(_s.originalW);
					_s.ifr.setHeight(_s.originalH);
					_s.ifr.screen.src = _s.imageSource;
					_s.container.addChild(_s.ifr);
				
					if(_s.link){
						_s.clicker = new FWDEVPDisplayObject('div');
						_s.clicker.screen.style.width = '100%';
						_s.clicker.screen.style.height = '100%';
						_s.container.addChild(_s.clicker);
						_s.container.addChild(_s.clicker);
						_s.container.screen.addEventListener("click", _s.clickHandler);
					}
					_s.addChild(_s.container);
					if(_s.closeButton_do){
						_s.addChild(_s.closeButton_do);
						_s.closeButton_do.setX(-300);
					}
				}
				
				
				
				var scale = Math.min(1, prt.prt.tempVidStageWidth/(_s.originalW));			
				var finalH = parseInt(scale * _s.originalH) - 2;
				
				if(prt.prt.controller_do.isShowed_bl){
					finalY = parseInt(prt.prt.tempVidStageHeight - prt.prt.controller_do.h - (_s.originalH * scale) + 2 + finalH);
				}else{
					finalY = parseInt(prt.prt.tempVidStageHeight - (_s.originalH * scale) + 2 + finalH);
				}	
				prt.setY(finalY);
			
				_s.resizeAndPosition(true);
			}, 100);
		};
		
		//###############################//
		/* set final size */
		//###############################//
		_s.resizeAndPosition = function(animate){
			if(!_s.isLoaded_bl || _s.isClosed_bl || !_s.isShowed_bl) return;
	
			var finalY;
			var hasScale_bl = !FWDEVPUtils.isIEAndLessThen9;
			var scale = 1;
		
			scale = Math.min(1, prt.prt.tempVidStageWidth/(_s.originalW));			
		
		
			_s.finalW = parseInt(scale * _s.originalW);
			_s.finalH = parseInt(scale * _s.originalH);
			
			if(_s.finalW == _s.prevFinalW && _s.finalH == _s.prevFinalH) return;
		
			_s.setWidth(_s.finalW);
			_s.setHeight(_s.finalH);
	
			if(_s.type == 'image'){
				_s.image_do.setWidth(_s.finalW);
				_s.image_do.setHeight(_s.finalH);
			}else if(_s.container){
				_s.container.setScale2(scale);
				_s.container.setX((_s.finalW - _s.originalW)/2);
				_s.container.setY((_s.finalH - _s.originalH)/2);
			}
			
			if(prt.prt.controller_do){
				if(prt.prt.controller_do.isShowed_bl){
					finalY = parseInt(prt.prt.tempVidStageHeight - prt.prt.controller_do.h - (_s.originalH * scale) - 10);
				}else{
					finalY = parseInt(prt.prt.tempVidStageHeight - (_s.originalH * scale) - 10);
				}	
			}else{
				finalY = parseInt(prt.prt.tempVidStageHeight - (_s.originalH * scale));
			}
			
			prt.setX(parseInt((prt.prt.tempVidStageWidth - _s.finalW)/2));
			
			FWDAnimation.killTweensOf(prt);
			if(animate){
				FWDAnimation.to(prt, .8, {y:finalY, ease:Expo.easeInOut});
			}else{
				prt.setY(finalY);
			}
			
			if(_s.closeButton_do){
				_s.closeButton_do.setY(2);
				_s.closeButton_do.setX(parseInt(_s.finalW - 21 - 2));
			}
			
			
			_s.prevFinalW = _s.finalW;
			_s.prevFinallH = _s.finalH;
			prt.setWidth(_s.finalW);
			prt.setHeight(_s.finalH);
		};

		_s.init();
	};
	
	/* set prototype */
	FWDEVPPopupAddButton.setPrototype = function(){
		FWDEVPPopupAddButton.prototype = new FWDEVPDisplayObject("div", "absolute", "visible");
	};
	
	FWDEVPPopupAddButton.MOUSE_OVER = "onMouseOver";
	FWDEVPPopupAddButton.MOUSE_OUT = "onMouseOut";
	FWDEVPPopupAddButton.CLICK = "onClick";
	
	FWDEVPPopupAddButton.prototype = null;
	window.FWDEVPPopupAddButton = FWDEVPPopupAddButton;
}(window));