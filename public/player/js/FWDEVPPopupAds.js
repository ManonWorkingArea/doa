/* FWDEVPPopupAds */
(function (window){
var FWDEVPPopupAds = function(prt, _d){
		
		var _s = this;
		var prototype = FWDEVPPopupAds.prototype;
		
		_s.prt = prt;
		_s.main_do = null;
		_s.reader = null;
		_s.subtitiles_ar = null;
		
		_s.totalAds = 0;
		_s.popupAds_ar;
		_s.popupAdsButtons_ar;
		
		_s.hasText_bl = false;
		_s.isLoaded_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.showSubtitleByDefault_bl = _d.showSubtitleByDefault_bl;
		_s.setSizeOnce_bl = false;
		
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			//_s.getStyle().pointerEvents = "none";
			_s.getStyle().cursor = "default";
		
			_s.setVisible(false);
		};
	
		//##########################################//
		/* Reset popup buttons ads */
		//##########################################//
		_s.resetPopups = function(popupAds_ar){

			
			if(popupAds_ar === _s.popupAds_ar || !popupAds_ar) return;
			
			_s.hideAllPopupButtons(true);
			_s.popupAds_ar = popupAds_ar;
			_s.totalAds = _s.popupAds_ar.length;

			var popupAdButton;
			_s.popupAdsButtons_ar = [];
		
			for(var i=0; i<_s.totalAds; i++){
				FWDEVPPopupAddButton.setPrototype();
				popupAdButton = new FWDEVPPopupAddButton(
						_s,
						_s.popupAds_ar[i].imagePath,
						_s.popupAds_ar[i].timeStart,
						_s.popupAds_ar[i].timeEnd,
						_s.popupAds_ar[i].link,
						_s.popupAds_ar[i].trget,
						i,
						_s.popupAds_ar[i].google_ad_client,
						_s.popupAds_ar[i].google_ad_slot,
						_s.popupAds_ar[i].google_ad_width,
						_s.popupAds_ar[i].google_ad_height,
						_s.popupAds_ar[i].tracking,
						_d.popupAddCloseNPath_str,
						_d.popupAddCloseSPath_str,
						_d.showPopupAdsCloseButton_bl
				);


				
				_s.popupAdsButtons_ar[i] = popupAdButton;
				_s.addChild(popupAdButton);
			}
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		_s.update = function(duration){
			
			if(_s.totalAds == 0 || !duration) return;
			var popupAdButton;
			
			for(var i=0; i<_s.totalAds; i++){
				popupAdButton = _s.popupAdsButtons_ar[i];
				//console.log(popupAdButton.start + ' ' + popupAdButton.end)
				
				if(duration >= popupAdButton.start && duration <= popupAdButton.end){
					popupAdButton.show();
				}else{
					popupAdButton.hide();
				}
			}	
		};
		
		_s.position = function(animate){
			if(_s.totalAds == 0) return;
			var popupAdButton;
			
			for(var i=0; i<_s.totalAds; i++){
				popupAdButton = _s.popupAdsButtons_ar[i];
				popupAdButton.resizeAndPosition(animate);
			}	
		};
		
		_s.hideAllPopupButtons = function(remove){
			if(_s.totalAds == 0) return;
			var popupAdButton;
			
			for(var i=0; i<_s.totalAds; i++){
				popupAdButton = _s.popupAdsButtons_ar[i];
				popupAdButton.hide(remove);
			}	
			if(remove){
				_s.popupAdsButtons_ar = null;
				_s.totalAds = 0;
			}
		};
		
		_s.init();
	};
	
	/* set prototype */
	FWDEVPPopupAds.setPrototype = function(){
		FWDEVPPopupAds.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPPopupAds.LOAD_ERROR = "error";
	FWDEVPPopupAds.LOAD_COMPLETE = "complete";
	
	
	FWDEVPPopupAds.prototype = null;
	window.FWDEVPPopupAds = FWDEVPPopupAds;
}(window));