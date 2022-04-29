/* Info screen */
(function (window){
	
	var FWDEVPShareWindow = function(_d, prt){
		
		var _s = this;
		var prototype = FWDEVPShareWindow.prototype;
				
		this.embedColoseN_img = _d.embedColoseN_img;
		
		this.bk_do = null;
		this.mainHld = null;
		this.clsBtn = null;
		
		this.btns_ar = [];
		
		this.embedWindowBackground_str = _d.embedWindowBackground_str;
		this.embedWindowCloseButtonMargins = _d.embedWindowCloseButtonMargins;
			
		this.totalWidth = 0;
		this.sW = 0;
		this.sH = 0;
		this.minMrgXSpc = 20;
		this.hSpace = 20;
		this.minHSpace = 10;
		this.vSpace = 15;
		
		this.isShowed_bl = false;
		this.isMbl = FWDEVPUtils.isMobile;
		this.useVectorIcons_bl = _d.useVectorIcons_bl;
	
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			this.setupButtons();
		};

		this.stpInit =  function(){
			if(_s.clsBtn) return;
			/*if(_d.sknPth.indexOf("hex_white") != -1){
				_s.sBC = "#FFFFFF";
			}else{
				_s.sBC = sBC;
			}*/
		
			var sBC = _d.sBC;
			if(window['isWhite']){
				sBC = '#000000';
			}

			_s.setBackfaceVisibility();
			_s.mainHld = new FWDEVPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();
			
			_s.bk_do = new FWDEVPDisplayObject("div");
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			var pth = _s.embedWindowBackground_str;

			if(window['isWhite']){
				pth = 'content/hex_white/embed-window-background.png';
			}
			_s.bk_do.getStyle().background = "url('" + pth + "')";

		
			//setup close button
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-close';
				_s.clsBtn = new FWDEVPSimpleButton(
						0, 0, 0, true, 0, 0, 0,
						"<div class='table-fwdevp-button'><span class='table-cell-fwdevp-button " + ic + "'></span></div>",
						undefined,
						"EVPCloseButtonNormalState",
						"EVPCloseButtonSelectedState"
				);
			}else{
				
				FWDEVPSimpleButton.setPrototype();
				_s.clsBtn = new FWDEVPSimpleButton(_d.shareClooseN_img, _d.embedWindowClosePathS_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC,
						false, false, false, false, true);
			}

			_s.clsBtn.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			_s.addChild(_s.mainHld);
			_s.mainHld.addChild(_s.bk_do);
			_s.mainHld.addChild(_s.clsBtn); 
		}
	
		this.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
		};
		
	
		this.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
				
			_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins);
			_s.clsBtn.setY(_s.embedWindowCloseButtonMargins);
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			_s.positionButtons();
		};
		
		
		//###########################################//
		/* Setup buttons */
		//###########################################//
		this.setupButtons = function(){
			if(_s.btsCrted){
				return;
			}

			_s.stpInit();	
			
			_s.btsCrted = true;
			var sBC = _d.sBC;
			if(window['isWhite']){
				sBC = '#000000';
			}
		
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-facebook';
				_s.facebookButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.facebookButton_do = new FWDEVPSimpleButton(_d.facebookN_img, _d.facebookSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			_s.facebookButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.facebookOnMouseUpHandler);
			this.btns_ar.push(_s.facebookButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-google-plus';
				_s.googleButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.googleButton_do = new FWDEVPSimpleButton(_d.googleN_img, _d.googleSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
				
			}
			_s.googleButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.googleOnMouseUpHandler);
			this.btns_ar.push(_s.googleButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-twitter';
				_s.twitterButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.twitterButton_do = new FWDEVPSimpleButton(_d.twitterN_img, _d.twitterSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			_s.twitterButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.twitterOnMouseUpHandler);
			this.btns_ar.push(_s.twitterButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-linkedin';
				_s.likedinButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				_s.likedinButton_do = new FWDEVPSimpleButton(_d.likedInkN_img, _d.likedInSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			_s.likedinButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.likedinOnMouseUpHandler);
			this.btns_ar.push(_s.likedinButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-comments';
				_s.bufferButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.bufferButton_do = new FWDEVPSimpleButton(_d.bufferkN_img, _d.bufferSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			_s.bufferButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.bufferOnMouseUpHandler);
			this.btns_ar.push(_s.bufferButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-digg';
				_s.diggButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.diggButton_do = new FWDEVPSimpleButton(_d.diggN_img, _d.diggSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			_s.diggButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.diggOnMouseUpHandler);
			this.btns_ar.push(_s.diggButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-reddit';
				_s.redditButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.redditButton_do = new FWDEVPSimpleButton(_d.redditN_img, _d.redditSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);	
			}
			_s.redditButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.redditOnMouseUpHandler);
			this.btns_ar.push(_s.redditButton_do);
			
			if(_s.useVectorIcons_bl){
				FWDEVPSimpleButton.setPrototype();
				FWDEVPUtils.smpBtnNPos();
				var ic = 'fwdicon-tumblr';
				_s.thumbrlButton_do = new FWDEVPSimpleButton(
						undefined, undefined, undefined, true, undefined, undefined, undefined,
						"<span class='" + ic + "'></span>",
						undefined,
						"EVPSocialMediaButtonsNormalState",
						"EVPSocialMediaButtonsSelectedState"
				);
			}else{
				FWDEVPSimpleButton.setPrototype();
				_s.thumbrlButton_do = new FWDEVPSimpleButton(_d.thumbrlN_img, _d.thumbrlSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						sBC);
			}
			
			_s.thumbrlButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.thumbrlOnMouseUpHandler);
			this.btns_ar.push(_s.thumbrlButton_do);
			
			
			_s.mainHld.addChild(_s.facebookButton_do);
			_s.mainHld.addChild(_s.googleButton_do);
			_s.mainHld.addChild(_s.twitterButton_do);
			_s.mainHld.addChild(_s.likedinButton_do);
			_s.mainHld.addChild(_s.bufferButton_do);
			_s.mainHld.addChild(_s.diggButton_do);
			_s.mainHld.addChild(_s.redditButton_do);
			_s.mainHld.addChild(_s.thumbrlButton_do);
		}
		
		this.facebookOnMouseUpHandler = function(){
			var url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.googleOnMouseUpHandler = function(){
			var url = "https://plus.google.com/share?url=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.twitterOnMouseUpHandler = function(){
			var url = "http://twitter.com/home?status=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.likedinOnMouseUpHandler = function(){
			var url = "https://www.linkedin.com/cws/share?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.bufferOnMouseUpHandler = function(){
			var url = "https://buffer.com/add?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.diggOnMouseUpHandler = function(){
			var url = "http://digg.com/submit?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.redditOnMouseUpHandler = function(){
			var url = "https://www.reddit.com/?submit=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		this.thumbrlOnMouseUpHandler = function(){
			var url = "http://www.tumblr.com/share/link?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
	
		
		//########################################//
		/* Position buttons */
		//########################################//
		this.positionButtons = function(){
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var rowsThumbsWidthAr = [];
			var tempX;
			var tempY = 0;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = _s.btns_ar[0].totalWidth;
			rowsThumbsWidthAr[rowsNr] = _s.btns_ar[0].totalWidth;
			_s.totalButtons = _s.btns_ar.length;
			
			for (var i=1; i<_s.totalButtons; i++){
				button = _s.btns_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + _s.minHSpace > _s.sW - _s.minMrgXSpc){	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
					rowsThumbsWidthAr[rowsNr] = button.totalWidth;
				}else{
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] += button.totalWidth + _s.minHSpace;
					rowsThumbsWidthAr[rowsNr] += button.totalWidth;
				}
			}
		
			tempY = parseInt((_s.sH - ((rowsNr + 1) * (button.totalHeight + _s.vSpace) - _s.vSpace))/2);
			
			for (var i=0; i<rowsNr + 1; i++){
				var rowMarginXSpace = 0;
				
				var rowHSpace;
				
				if (rowsAr[i].length > 1){
					rowHSpace = Math.min((_s.sW - _s.minMrgXSpc - rowsThumbsWidthAr[i]) / (rowsAr[i].length - 1), _s.hSpace);
					
					var rowWidth = rowsThumbsWidthAr[i] + rowHSpace * (rowsAr[i].length - 1);
					
					rowMarginXSpace = parseInt((_s.sW - rowWidth)/2);
				}else{
					rowMarginXSpace = parseInt((_s.sW - rowsWidthAr[i])/2);
				}
				
				if (i > 0) tempY += button.h + _s.vSpace;
				
				for (var j=0; j<rowsAr[i].length; j++){
					button = _s.btns_ar[rowsAr[i][j]];
				
					if (j == 0){
						tempX = rowMarginXSpace;
					}else{
						prevButton = _s.btns_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + rowHSpace;
					}
					

					button.finalX = tempX;
					button.finalY = tempY;
						
					if (maxY < button.finalY) maxY = button.finalY;
					
					_s.buttonsBarTotalHeight = maxY + button.totalHeight + _s.startY ;
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
		}
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);
			_s.init();
	
		
			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					if(_s.clsBtn.w != 0){
				
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					}
				
				}, 50);
			}else{
				_s.positionAndResize();
			
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}

			
		};
		
		
		this.showCompleteHandler = function(){
			//if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) prt.main_do.setSelectable(true);
		};
		
		this.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
			_s.positionAndResize();
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			//if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
		};
		
		this.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDEVPShareWindow.HIDE_COMPLETE);
		};
		
		if(_d.useHEX){
			_s.init();
		}
	};

	/* set prototype */
	FWDEVPShareWindow.setPrototype = function(){
		FWDEVPShareWindow.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPShareWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDEVPShareWindow.prototype = null;
	window.FWDEVPShareWindow = FWDEVPShareWindow;
}(window));