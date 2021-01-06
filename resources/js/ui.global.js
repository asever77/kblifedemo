'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'netiveUI.plugins';
	
	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) { 
				return createNameSpace(identifier, module); 
			}
		});
	}
	function createNameSpace(identifier, module) {
		var name = identifier.split('.'),
			w = win,
			p;

		if (!!identifier) {
			for (var i = 0, len = name.length; i < len; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//jquery easing add
	var easings = {
		linear : function(t,b,c,d){return c*t/d+b;},
		easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
		easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
		easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
		easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
		easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
		easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
		easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
		easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
		easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
		easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
		easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
		easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
		easeInExpo : function(t,b,c,d){return (t===0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
		easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
		easeInOutExpo : function(t,b,c,d){if(t===0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
		easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
		easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
		easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
		easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
		easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
		easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
		easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
		easeInOutElastic : function(t,b,c,d,a,p){if(t===0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
		easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
		easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
		easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
		easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
		easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
		easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
		easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
	};
	var easing;
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			};
		})(easing);
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
		var html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'];
		var width = $('html').outerWidth(),
			colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4',
			i = 0,
			size_len = devsize.length,
			max = html5tags.length,
			sizeMode,
			timer;

		win[global].breakpoint = width >= devsize[5] ? true : false;

		var deviceSizeClassName = function(w) {
			for (var i = 0; i < size_len; i++) {
				if (w >= devsize[i]) {
					
					sizeMode = devsize[i];
					win[global].breakpoint = width >= devsize[5] ? true : false;
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		};

		for (i = 0; i < max; i++) {
			doc.createElement(html5tags[i]);
		}

		deviceSizeClassName(width);
		var sizeCls = 's' + sizeMode;
		
		$()
		$('html').addClass(sizeCls).addClass(colClass);
		win.addEventListener('resize', function() {
			clearTimeout(timer);			
			timer = setTimeout(function () {
				var $html = $('html');
				
				width = win.innerWidth; 
				// document.body.offsetWidth === $(win).outerWidth()
				// win.innerWidth : scroll 포함된 width (+17px)
				// win.outerWidth === screen.availWidth 
				deviceSizeClassName(width);

				colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4';
				$html.removeClass('s1920 s1600 s1440 s1280 s1024 s940 s840 s720 s600 s480 s400 s360 s300 col-12 col-8 col-4');
				win[global].breakpoint = width >= devsize[5] ? true : false;

				deviceSizeClassName(width);
				sizeCls = 's' + sizeMode;
				$html.addClass(sizeCls).addClass(colClass);
			}, 100);
		});
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option 
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
			//http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
		uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		partsAdd0 :function(x) {
			//숫자 한자리수 일때 0 앞에 붙이기
			return Number(x) < 10 ? '0' + x : x;
		}
	};

	// set device information
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {},
			support = win[global].support = {},
			i = 0,
			version,
			device;

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();


	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */

	/* ------------------------
	 * [base] selector type
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelectorType: function (v) {
			return createUiSelectorType(v);
		}
	});
	function createUiSelectorType(v) {
		var selector = $('body');
		if (v === null) {
			selector = $('body')
		} else {
			if (typeof v === 'string') {
				selector = $('#' + v);
			} else {
				selector = v;
			}
		}

		return selector;
	}

	/* ------------------------
	 * [base] loading
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	win[global].uiLoading.timerShow = {};
	win[global].uiLoading.timerHide = {};
	win[global].uiLoading.option = {
		id: null,
		visible: true,
		txt : null,
		styleClass : 'orbit' //time
	}
	function createUiLoading(opt) {
		var opt = $.extend(true, {}, win[global].uiLoading.option, opt);
		var id = opt.id;
		var styleClass = opt.styleClass;
		var loadingVisible = opt.visible;
		var txt = opt.txt;
		var	$selector = win[global].uiSelectorType(id);
		var htmlLoading = '';

		$('.ui-loading').not('.visible').remove();

		id === null ?
			htmlLoading += '<div class="ui-loading '+ styleClass +'">':
			htmlLoading += '<div class="ui-loading '+ styleClass +'" style="position:absolute">';
		htmlLoading += '<div class="ui-loading-wrap">';

		txt !== null ?
			htmlLoading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>':
			htmlLoading += '';

		htmlLoading += '</div>';
		htmlLoading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';
		htmlLoading += '</div>';

		if(loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			clearTimeout(win[global].uiLoading.timerHide);
			win[global].uiLoading.timerShow = setTimeout(function(){
				showLoading();
			},300);
			
		}
		if(!loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			win[global].uiLoading.timerHide = setTimeout(function(){
				hideLoading();
			},300)
			
		}	

		function showLoading(){
			!$selector.find('.ui-loading').length && $selector.append(htmlLoading);	
			htmlLoading = '';		
			$selector.data('loading', true);
			$('.ui-loading').addClass('visible').removeClass('close');			
		}
		function hideLoading(){
			$selector.data('loading', false);
			$('.ui-loading').addClass('close');	
			setTimeout(function(){
				$('.ui-loading').removeClass('visible')
				$('.ui-loading').remove();
			},300);
		}
	}


	/* ------------------------
	 * [base] console guide
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		}
	});
	function createUiConsoleGuide(opt) {
		if (!win[global].browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}

	/* ------------------------
	 * [base] Ajax
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		}
	});
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		effect: false,
		loading:false,
		callback: false,
		errorCallback: false,

		type: 'GET',
		cache: false,
		async: true,
		contType: 'application/x-www-form-urlencoded',
		dataType: 'html'
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt;
		var opt = $.extend(true, {}, win[global].uiAjax.option, opt);
		var $id = typeof opt.id === 'string' ? $('#' + opt.id) : typeof opt.id === 'object' ? opt.id : $('body');
		var loading = opt.loading;
		var effect = opt.effect;
		var callback = opt.callback === undefined ? false : opt.callback;
		var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		if (loading) {
			win[global].uiLoading({
				visible: true
			});
		}

		if (effect) {
			$id.removeClass('changeover action');
			$id.addClass('changeover');
		}

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: opt.cache,
			async: opt.async,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}
				//console.log(request, status, err);
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}

				if (opt.page) {
					opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
					callback && callback();
					effect && $id.addClass('action');
				} else {
					callback && callback(v);
				}
			},
			complete: function(v){
				//console.log(v);
			}
		});
	}


	/* ------------------------
	 * [base] scroll move
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScroll: function (opt) {
			return createUiScroll(opt);
		}
	});
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		addLeft: false,
		focus: false,
		target: 'html, body'
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			psVal = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			addLeft = opt.addLeft,
			overlap = false,
			f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus,
			$target = typeof opt.target === 'string' ? $(opt.target) : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
					scrollTop : psVal 
				}, { 
					duration: s,
					step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
					scrollLeft : psVal
				}, { 
					duration: s,
					step: function(now) { 
						!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		} else if (p === 'center') {
			var w = $target.outerWidth();

			$target.stop().animate({ 
				scrollLeft : psVal - (w / 2) + addLeft
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		}
	}


	/* ------------------------
	 * [base] URL parameter
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPara: function (v) {
			return createUiPara(v);
		}
	});
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}


	/* ------------------------
	 * scroll bar
	 * date : 2020.06.12
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScrollBar: function (opt) {
			return createuiScrollBar(opt);
		}
	});
	win[global].uiScrollBar.option = {
		id: false,
		callback:false,
		infiniteCallback:false,
		space: false,
		remove: false
	};
	sessionStorage.setItem('scrollbarID', 0);
	win[global].uiScrollBar.timer = {}
	function createuiScrollBar(opt) {
		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			id = opt.id,
			space = opt.space,
			callback = opt.callback,
			infiniteCallback = opt.infiniteCallback,
			remove = opt.remove,
			$base = !id ? $('.ui-scrollbar') : typeof id === 'object' ? id : $('[scroll-id="' + id +'"]');
		
		var timerResize;

		if (win[global].support.touch) {
			return false;
		} 

		$base.each(function () {
			!remove ? scrollbarReady($(this)) : scrollbarRemove($(this));
		});
		function scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space){
			var $wrap = t;
			var	$item = $wrap.children('.ui-scrollbar-item');

			if (!$item.length) {
				return false;
			}
			
			var nWrapH = $wrap.outerHeight();
			var nWrapW = $wrap.outerWidth();
			var nItemH = $item.prop('scrollHeight');
			var nItemW = $item.prop('scrollWidth');

			var changeH = (itemH !== nItemH || wrapH !== nWrapH);
			var changeW = (itemW !== nItemW || wrapW !== nWrapW);


			$(win).on('resize', function(){
				clearTimeout(timerResize);
				timerResize = setTimeout(function(){
					console.log(111);
					$wrap.removeAttr('style');
					//$wrap.css('overflow', 'hidden');
					
					nWrapH = $wrap.outerHeight();
					//nWrapW = $wrap.outerWidth();
					//$wrap.css('width', nWrapW);
					$wrap.css('height', nWrapH);
				}, 300);
				
			});
			
			if (changeH || changeW) {
				var barH = Math.floor(nWrapH / (nItemH / 100));
				var barW = Math.floor(nWrapW / (nItemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

				changeH && $barY.css('height', barH + '%').data('height', barH);
				changeW && $barX.css('width', barW + '%').data('width', barW);
				
				(nWrapH < nItemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(nWrapW < nItemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');
				$wrap.data('opt', {'itemH':nItemH, 'itemW':nItemW, 'wrapH':nWrapH, 'wrapW':nWrapW });
				eventFn();
				scrollEvent($item, space);
			}

			var timer;

			clearTimeout(timer);
			timer = setTimeout(function(){
				scrollbarUpdate(t, nWrapH, nWrapW, nItemH, nItemW);
			}, 300);
		}
		function scrollbarRemove(t){
			var $wrap = t;

			$wrap.removeClass('ready view-scrollbar').removeData('infiniteCallback').removeData('ready').removeAttr('style');
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();
		}
		function scrollbarReady(t) {
			var $wrap = t;
			var	html_scrollbar = '';

			$wrap.removeClass('ready').data('infiniteCallback', infiniteCallback).data('ready', false);
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();

			var wrapW = $wrap.innerWidth();
			var wrapH = $wrap.outerHeight();

			$wrap.wrapInner('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap"></div></div>');

			var	$item = $wrap.find('> .ui-scrollbar-item');
			var	$itemWrap = $item.find('> .ui-scrollbar-wrap');

			var cssDisplay = $wrap.css('display');
			var cssPadding = $wrap.css('padding');

			$itemWrap.css({
				display: cssDisplay,
				padding: cssPadding
			});

			if (!space) {
				cssDisplay === 'inline-block' && $itemWrap.css('display','block');
				$itemWrap.css('width','100%');
			} 

			!space && $item.css('width','100%');
			$wrap.css('overflow','hidden');

			var itemW =  $item.prop('scrollWidth');
			var itemH =$item.prop('scrollHeight');

			$wrap.data('opt', {'itemH':itemH, 'itemW':itemW, 'wrapH':wrapH, 'wrapW':wrapW });
			
			var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

			//idN = idN === undefined ? 0 : idN;
			
			if (!$wrap.data('ready') || !$wrap.attr('scroll-id')) {
				
				if (!$wrap.attr('scroll-id')) {
					$wrap.attr('scroll-id', 'uiScrollBar_' + idN).data('ready', true).addClass('ready');
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					$wrap.data('ready', true).addClass('ready');
				}

				$item.attr('tabindex', 0);
				$wrap.css('height', wrapH + 'px');
				
				if (space) {
					$item.addClass('scroll-y-padding');
					$item.addClass('scroll-x-padding');
				} else {
					!!$wrap.parent('.ui-tablescroll').length && $wrap.parent('.ui-tablescroll').addClass('not-space');
				}

				html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				
				$wrap.prepend(html_scrollbar);

				(wrapH < itemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(wrapW < itemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

				var barH = Math.floor(wrapH / (itemH / 100));
				var barW = Math.floor(wrapW / (itemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
				
				$barY.css('height', barH + '%').data('height', barH);
				$barX.css('width', barW + '%').data('width', barW);

				$wrap.addClass('view-scrollbar');
				!!callback && callback(); 
				scrollEvent($item);
				scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space);
				eventFn();
			}
		}	
		function eventFn(){
			$(doc).find('.ui-scrollbar-item').off('scroll.uiscr').on('scroll.uiscr', function(){
				scrollEvent(this);
			});
			$(doc).find('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e) {
				dragMoveAct(e, this);
			});
		}	
		function scrollEvent(t){
			var $this = $(t),
				$wrap = $this.closest('.ui-scrollbar'),
				$barY = $wrap.find('> .type-y .ui-scrollbar-bar'),
				$barX = $wrap.find('> .type-x .ui-scrollbar-bar');
			
			var opt = $wrap.data('opt');

			if (opt === undefined) {
				return false;
			}

			var itemH = opt.itemH,
				itemW = opt.itemW,
				wrapH = opt.wrapH,
				wrapW = opt.wrapW;

			var scrT = $this.scrollTop(),
				scrL = $this.scrollLeft(),
				barH = $barY.data('height'),
				barW = $barX.data('width');
			
			var hPer = Math.round(scrT / (itemH - wrapH) * 100),
				_hPer = (barH / 100) * hPer,
				wPer = Math.round(scrL / (itemW - wrapW) * 100),
				_wPer = (barW / 100) * wPer;

			var _infiniteCallback = $wrap.data('infiniteCallback');

			$barY.css('top', hPer - _hPer + '%');
			$barX.css('left', wPer - _wPer + '%');

			if (!!_infiniteCallback) {
				hPer === 100 && _infiniteCallback(); 
			}
		}
		function dragMoveAct(e, t) {
			var $bar = $(t),
				$uiScrollbar = $bar.closest('.ui-scrollbar'),
				$barWrap = $bar.closest('.ui-scrollbar-barwrap'),
				$wrap = $bar.closest('.ui-scrollbar'),
				$item = $uiScrollbar.find('> .ui-scrollbar-item');

			var off_t = $barWrap.offset().top,
				w_h = $barWrap.innerHeight(),
				off_l = $barWrap.offset().left,
				w_w = $barWrap.innerWidth(),
				barH = $bar.data('height'),
				barW = $bar.data('width'),
				opt = $wrap.data('opt');

			var yRPer, xRPer;
			var $btn = e.target;
			var isXY = $btn.getAttribute('data-scrollxy');
			
			$('body').addClass('scrollbar-move');

			$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function (e) {
				var y_m, 
					x_m;
				
				if (e.touches === undefined) {
					if (e.pageY !== undefined) {
						y_m = e.pageY;
					} else if (e.pageY === undefined) {
						y_m = e.clientY;
					}

					if (e.pageX !== undefined) {
						x_m = e.pageX;
					} else if (e.pageX === undefined) {
						x_m = e.clientX;
					}
				}

				var yR = y_m - off_t;
				var xR = x_m - off_l;

				yR < 0 ? yR = 0 : '';
				yR > w_h ? yR = w_h : '';
				xR < 0 ? xR = 0 : '';
				xR > w_w ? xR = w_w : '';

				yRPer = yR / w_h * 100;
				xRPer = xR / w_w * 100;
				var nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
				var nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

				if (isXY === 'y') {
					$bar.css('top', nPerY + '%');
					$item.scrollTop(opt.itemH * nPerY / 100);
				} else {
					$bar.css('left', nPerX + '%');
					$item.scrollLeft(opt.itemW * nPerX / 100);
				}

			}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function () {
				var _infiniteCallback = $wrap.data('infiniteCallback');

				if (!!_infiniteCallback) {
					yRPer === 100 && _infiniteCallback(); 
				}

				$('body').removeClass('scrollbar-move');
				$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
			});
		}
	}


	/* ------------------------
	 * [base] scroll or not
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiHasScrollBarY: function (opt) {
			return createuiHasScrollBarY(opt);
		},
		uiHasScrollBarX: function (opt) {
			return createUiHasScrollBarX(opt);
		}
	});
	function createuiHasScrollBarY(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	function createUiHasScrollBarX(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollWidth') == 0 && $this.prop('clientWidth') == 0) || ($this.prop('scrollWidth') > $this.prop('clientWidth'));
	}


	/* ------------------------
	 * [base] focus scope
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		}
	});
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},300);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}

	/* ------------------------
	 * table caption
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiCaption: function () {
			return createUiCaption();
		}
	});
	function createUiCaption(){
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function(){
			var $table = $(this).closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $(this).closest('table').find('> tbody th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';
			if (isthead) {
				$th = $(this).closest('table').find('> thead th');
				th_len = $th.length
			}

			for (i = 0; i < th_len; i++) {
				if ($th.eq(i).text() !== '') {
					cp_txt += $th.eq(i).text();
				}
				if (i < th_len - 1) {
					cp_txt += ', ';
				}
			}
			$(this).text(cp_txt + ' 정보입니다.');
		});
	}

	/* ------------------------
	* table scroll(vertical)
	* date : 2020-05-17
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTableScroll: function (opt) {
			return createUiTableScroll(opt);
		}
	});
	win[global].uiTableScroll.option = {
		callback:false
	};
	function createUiTableScroll(opt){
		var opt = $.extend(true, {}, win[global].uiTableScroll.option, opt);
		var callback = opt.callback;
		var $tblWrap = $('.ui-tablescroll');

		for (var i = 0, len = $tblWrap.length; i < len; i++) {
			var $tbl = $tblWrap.eq(i),
				_$tblWrap = $tbl.find('.ui-tablescroll-wrap'),
				_$tbl = _$tblWrap.find('table'),
				cloneTable = _$tbl.clone();
			
			if (!$tbl.find('.ui-tablescroll-clone').length) {
				$tbl.prepend(cloneTable);

				var $cloneTable = $tbl.find('> table:first-child'),
					$cloneTableTh = $cloneTable.find('th');

				$cloneTable.find('caption').remove();
				$cloneTable.find('tbody').remove();
				$cloneTable.addClass('ui-tablescroll-clone');
				$cloneTable.attr('aria-hidden', true);
				$cloneTableTh.each(function(){
					$(this).attr('aria-hidden', true);
				});
			}
		}

		!!callback && callback();
	}


	/* ------------------------
	* name : dropdown
	* date : 2020-06-10
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	win[global].uiDropdown.option = {
		ps: 'BL',
		hold: true,
		dropSpace: $('body'),
		dropSrc: false,
		dropOffset: false,
		openback:false,
		closeback:false
	};
	function createUiDropdown(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
			id = opt.id,
			ps = opt.ps,
			hold = opt.hold,
			dropSpace = opt.dropSpace,
			dropSrc = opt.dropSrc,
			dropOffset = opt.dropOffset,
			openback = opt.openback,
			closeback = opt.closeback;

		if (!!dropSrc && !$('[data-id="' + opt.id + '"]').length) {
			$plugins.uiAjax({
				id: dropSpace,
				url: dropSrc,
				add: true,
				callback: function(){
					setDropdown();
				}
			});
		} else {
			setDropdown();
		}
		
		function setDropdown(){
			var $btn = $('#' + id),
				$pnl = $('[data-id="'+ id +'"]'); 

			//set up
			$btn.attr('aria-expanded', false)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			
			//event
			$btn.off('click.dp').on('click.dp', function(e){
				action(this);
			});
			$(doc).find('.ui-drop-close').off('click.dp').on('click.dp', function(e){
				var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');
				win[global].uiDropdownToggle({ 
					id: pnl_opt.id 
				});
				$('#' + pnl_opt.id).focus();
			})

			//dropdown 영역 외에 클릭 시 
			$(doc).off('click.dpb').on('click.dpb', function(e){
				if (!!$('body').data('dropdownOpened')){
					if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
						win[global].uiDropdownHide();
					}
				}
			});

			function action(t) {
				var $this = $(t),
					btn_opt = $this.data('opt');

				$this.data('sct', $(doc).scrollTop());
				win[global].uiDropdownToggle({ 
					id: btn_opt.id 
				});
			}
		}
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			
			ps = opt.ps,
			openback = opt.openback,
			closeback = opt.closeback,
			hold = opt.hold,
			state = opt.state,
			dropOffset = opt.dropOffset,
			btnExpanded =  $btn.attr('aria-expanded'),
			is_modal = !!$btn.closest('.ui-modal').length,

			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top) + parseInt($btn.css('margin-top')),
			btn_l = Math.ceil($btn.position().left) + parseInt($btn.css('margin-left')),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//dropOffset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (dropOffset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		//test 
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';
		
		if (state === 'open') {
			btnExpanded = 'false';
		} else if (state === 'close') {
			btnExpanded = 'true';
		}

		btnExpanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var drop_inner = $btn.closest('.ui-drop-pnl').data('id');
			
			//dropdown in dropdown 인 경우
			if (!!drop_inner) {
				$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
				$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]')
						.attr('aria-hidden', true)
						.attr('tabindex', -1)
						.removeAttr('style');
			} else {
				win[global].uiDropdownHide();
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).attr('tabindex', 0).addClass('on');

			//focus hold or sense
			hold ?	
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'BL': 
					$pnl.css({ 
						top: btn_t + btn_h, 
						left: btn_l
					}); 
					break;
				case 'BC': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'BR': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'TL': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'TC': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'TR': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'RT': 
					$pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'RM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'RB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'LT': 
					$pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'LM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'LB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
				case 'CM': 
					$pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
				setTimeout(function(){
					$pnl.focus();
				},0);
			},0);

			!!openback ? openback() : '';			
		}
		function pnlHide(){
			if ($('#' + id).closest('.ui-drop-pnl').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}

			$btn.attr('aria-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			
			!!closeback ? closeback() : '';
		}
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ui-drop').attr('aria-expanded', false);
		$('.ui-drop-pnl[aria-hidden="false"]').each(function(){
			var $pnl = $(this),
				defaults = $pnl.data('opt'),
				opt = $.extend(true, {}, defaults),
				closeback = opt.closeback;
			
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			!!closeback ? closeback() : '';
		});	
	}

	/* ------------------------
	* name : modal
	* date : 2020-06-11
	------------------------ */	
	
	win[global] = win[global].uiNameSpace(namespace, {
		uiModalOpen: function (opt) {
			return createUiModalOpen(opt);
		},
		uiModalClose: function (opt) {
			return createUiModalClose(opt);
		},
		uiSystemModalClose: function () {
			return createUiSystemModalClose();
		}
	});
	win[global].uiModalOpen.option = {
		type: 'normal',
		wrap: false,
		mobileFull: false,
		ps: 'center',
		src: false,
		remove: false,
		modalWidth: false,
		modalHeight: false,
		innerScroll: false,
		mg: 10,
		callback:false,
		closeCallback:false,
		endfocus:false,

		sMessage: '',
		sBtnConfirmTxt: 'Ok',
		sBtnCancelTxt: 'Cancel',
		sZindex: false,
		sClass: 'type-system',
		sConfirmCallback: false,
		sCancelCallback: false
	}
	function createUiModalOpen(opt) {
		var opt = $.extend(true, {}, win[global].uiModalOpen.option, opt),
			wrap = opt.wrap === false ? $('body') : typeof opt.wrap === 'object' ? opt.wrap : $('#' + opt.wrap),
			type = opt.type,
			id = opt.id,
			src = opt.src,
			mobileFull = opt.mobileFull,
			ps = opt.ps,
			mg = opt.mg,
			remove = opt.remove,
			w = opt.modalWidth,
			h = opt.modalHeight,
			innerScroll = opt.innerScroll,
			scr_t = $(win).scrollTop(),
			endfocus = opt.endfocus === false ? document.activeElement : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus,
			callback = opt.callback,
			closeCallback = opt.closeCallback,
			timer;
		
		var sMessage = opt.sMessage,
			sBtnConfirmTxt = opt.sBtnConfirmTxt,
			sBtnCancelTxt = opt.sBtnCancelTxt,
			sZindex = opt.sZindex,
			sClass = opt.sClass,
			sConfirmCallback = opt.sConfirmCallback,
			sCancelCallback = opt.sCancelCallback;

		if (type === 'normal') {
			if (!!src && !$('#' + opt.id).length) {
				$plugins.uiAjax({
					id: wrap,
					url: src,
					add: true,
					callback: function(){
						act();
					}
				});
			} else {
				act();
			}
		} else {
			endfocus = null;
			remove = true;
			id = 'uiSystemModal';
			makeSystemModal();
		}

		if (endfocus === 'body') {
			endfocus = $('body').data('active');
		}

		function makeSystemModal(){
			var htmlSystem = '';
			
			htmlSystem += '<div class="ui-modal type-system '+ sClass +'" id="uiSystemModal">';
			htmlSystem += '<div class="ui-modal-wrap">';
			htmlSystem += '<div class="ui-modal-body">';
			htmlSystem += sMessage;
			htmlSystem += '</div>';
			htmlSystem += '<div class="ui-modal-footer">';
			htmlSystem += '<div class="btn-wrap">';

			if (type === 'confirm') {
				htmlSystem += '<button type="button" class="btn-base ui-modal-cancel"><span>'+ sBtnCancelTxt +'</span></button>';
			}

			htmlSystem += '<button type="button" class="btn-base ui-modal-confirm"><span>'+ sBtnConfirmTxt +'</span></button>';	
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';

			$('body').append(htmlSystem);
			htmlSystem = '';
			act();
		}

		function act(){
			var $modal = $('#' + id);
			var $modalWrap = $modal.find('> .ui-modal-wrap');
			var $modalBody = $modalWrap.find('> .ui-modal-body');
			var $modalHeader = $modalWrap.find('> .ui-modal-header');
			var $modalFooter = $modalWrap.find('> .ui-modal-footer');
			var headerH = 0;
			var footerH = 0;

			$('.ui-modal').removeClass('current');
			$('body').addClass('scroll-no');
			
			$modal
				.attr('tabindex', '0')
				.attr('n', $('.ui-modal.open').length)
				.attr('role', 'dialog')
				.addClass('n' + $('.ui-modal.open').length + ' current')
				.data('scrolltop', scr_t)
				.data('active', endfocus)
				.data('closecallback', closeCallback);

			if (mobileFull && !$plugins.breakpoint) {
				$modal.addClass('type-full');
				mg = 0;
			} 

			$('html').addClass('is-modal');
			
			switch (ps) {
				case 'center' :
					$modal.addClass('ready ps-center');
					break;
				case 'top' :
					$modal.addClass('ready ps-top');
					break;
				case 'bottom' :
					$modal.addClass('ready ps-bottom');
					break;
			}

			if (innerScroll) {
				headerH = $modalHeader.length ? $modalHeader.outerHeight() : 0;
				footerH = $modalFooter.length ? $modalFooter.outerHeight() : 0;

				if (!h) {
					$modalBody
						.addClass('is-scrollable')
						.css({
							'max-height' : 'calc(100vh - '+ (headerH + footerH + (mg * 2)) +'px)',
							'overflow-y' : 'auto',
							'height' : '100%'
						});
				} else {
					$modalBody
						.addClass('is-scrollable')
						.css({
							'overflow-y' : 'auto',
							'height' : h + 'px'
						});
				}
				
			} else {
				!!w && $modalWrap.css('width', w);
				!!h && $modalBody.css({ 'height': h + 'px', 'overflow-y' : 'auto' });
			}
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				win[global].uiFocusTab({ 
					selector: $modal, 
					type:'hold' 
				});

				$modal.addClass('open');

				!!sZindex && $modal.css('z-index', sZindex);
				callback && callback(opt);

				$('html').off('click.uimodaldim').on('click.uimodaldim', function(e){
					if(!$(e.target).closest('.ui-modal-wrap').length) {
						var openN = [];
						
						$('.ui-modal.open').each(function(){
							var thisN = $(this).attr('n');

							thisN !== undefined ?
								openN.push(thisN) : '';
						});
						
						var currentID = $('.ui-modal.open[n="'+ Math.max.apply(null, openN) +'"]').attr('id');

						if (currentID !== 'uiSystemModal') {
							$plugins.uiModalClose({ 
								id: currentID, 
								remove: remove,
								closeCallback: closeCallback
							});
						}
					}
				});

				$(win).outerHeight() < $modal.find('.ui-modal-wrap').outerHeight() ?
					$modal.addClass('is-over'):
					$modal.removeClass('is-over');
			},150);

			$(doc).find('.ui-modal-close').off('click.close').on('click.close', function(e){
				$plugins.uiModalClose({ 
					id: $(this).closest('.ui-modal').attr('id'), 
					remove: remove,
					closeCallback: closeCallback
				});
			});
			$(doc).find('.ui-modal-confirm').off('click.callback').on('click.callback', function(e){
				sConfirmCallback();
			});
			$(doc).find('.ui-modal-cancel').off('click.callback').on('click.callback', function(e){
				sCancelCallback();
			});
			$(doc).find('.ui-modal').find('button, a').off('click.act').on('click.act', function(e){
				var $this = $(this); 
				$this.closest('.ui-modal').data('active', $this);
			});
		}
	}
	win[global].uiModalClose.option = {
		remove: false,
		endfocus: false
	}
	function createUiSystemModalClose(){
		$plugins.uiModalClose({ 
			id: 'uiSystemModal', 
			remove: true
		});
	}
	function createUiModalClose(v) {
		var opt = $.extend(true, {}, win[global].uiModalClose.option, v),
			id = opt.id,
			remove = opt.remove,
			$modal = $('#' + id),
			endfocus = opt.endfocus,
			closeCallback = opt.closeCallback === undefined ? $modal.data('closecallback') === undefined ? false : $modal.data('closecallback') : opt.closeCallback;

		$modal.removeClass('open').addClass('close');

		var timer;
		var $modalPrev = $('.ui-modal.open.n' + ($('.ui-modal.open').length - 1));

		if (!$('.ui-modal.open').length) {
			endfocus = endfocus === false ? $('body').data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;

			$('html').off('click.uimodaldim');
			$('html').removeClass('is-modal');
		} else {
			endfocus = endfocus === false ? $modalPrev.data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;
		}

		$modalPrev.addClass('current');
		
		win[global].uiScroll({
			value: Number($modal.data('scrolltop'))
		});
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			$modal.find('.ui-modal-wrap').removeAttr('style');
			$modal.find('.ui-modal-body').removeAttr('style');
			$modal.removeClass('ready is-over current close ps-bottom ps-top ps-center type-normal type-full n0 n1 n2 n3 n4 n5 n6 n7');
			$modal.removeAttr('n');
			
			if (!$('.ui-modal.open').length) {
				$("html, body").removeClass('scroll-no');
			}
			closeCallback ? closeCallback(opt) : '';
			remove ? $modal.remove() : '';

			console.log($modal.attr('id'), endfocus);

			!!endfocus ? endfocus.focus() : '';
		},210);
	}


	/* ------------------------
	* name : tab
	* date : 2020-06-14
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAction: function (opt) {
			return createuiTabAction(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		onePanel: false,
		callback: false,
		effect: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			effect = opt.effect,
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			callback = opt.callback,
			align = opt.align;
			
		var	$tab = $('#' + id),
			$btns = $tab.find('> .ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.find('> .ui-tab-pnls'),
			$pnl = $pnls.find('> .ui-tab-pnl');

		var	len = $btn.length,
			keys = win[global].option.keys;
			
		var	para = win[global].uiPara('tab'),
			paras,
			paraname;

		//set up
		if (!!para) {
			if (para.split('+').length > 1) {
				//2 or more : tab=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				} else {
					current = Number(para);
				}
			}
		}

		//set up
		!!effect && $tab.addClass(effect);
		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		var ps_l = [];

		for (var i = 0; i < len; i++) {
			var $btnN = $btn.eq(i);
			var $pnlN = $pnl.eq(i);
			
			if ($btnN.data('tabnum') === undefined ) {
				$btnN.attr('data-tabnum', i);
			}

			var tabN = Number($btnN.data('tabnum'));
			var isCurrent = current === tabN;
			var cls = isCurrent ? 'addClass' : 'removeClass';
			var attrs = isCurrent ? 'removeAttr' : 'attr';
			
			//make ID
			$btnN.attr('id') === undefined ? $btnN.attr('id', id + 'Btn' + tabN) : '';
			$pnlN.attr('id') === undefined ? $pnlN.attr('id', id + 'Pnl' + tabN) : '';
			
			var btnID = $btnN.attr('id');
			var pnlID = $pnlN.attr('id');

			if (!onePanel) {
				$btnN.attr('aria-controls', pnlID)[cls]('selected');
				$btnN.attr('aria-controls', $pnlN.attr('id'));
				$pnlN.attr('aria-labelledby', btnID).attr('aria-hidden', (current === tabN) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				$btnN.attr('aria-controls', $pnl.eq(0).attr('id')).addClass('selected');
				isCurrent && $pnl.attr('aria-labelledby', btnID).addClass('selected');
			}

			if (isCurrent) {
				$btnN.attr('aria-selected', true).addClass('selected');
			} else {
				$btnN.attr('aria-selected', false).removeClass('selected');
			}
				
			ps_l.push(Math.ceil($btnN.position().left));

			i === 0 ? $btnN.attr('tab-first', true) : '';
			i === len - 1 ? $btnN.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';
		$btn.data('psl', ps_l).data('len', len);

		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btns,
			speed: 0, 
			ps: align
		});

		//event
		$btn.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAction({ 
				id: id, 
				current: $(this).index(), 
				align:align 
			}); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAction({ id: id, current: n - 1, align:align }): 
				win[global].uiTabAction({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAction({ id: id, current: n + 1, align:align }): 
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
		}
	}
	function createuiTabAction(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			$target = $btns;

		var ps_l = $btn.data('psl'),
			
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			align = opt.align,
			callback = opt.callback;

		//$btn.eq(current).append('<b class="hide">선택됨</b>');

		var currentPnl = $btns.find('.ui-tab-btn[data-tabnum="'+ current +'"]').index();
		$btn.removeClass('selected').eq(current).addClass('selected').focus();

		var $btnN = $btn.eq(current),
			btnId = $btn.eq(currentPnl).attr('id');

		if ($btns.hasClass('ui-scrollbar')) {
			$target = $btns.find('> .ui-scrollbar-item');
		}

		win[global].uiScroll({ 
			value: ps_l[current], 
			addLeft : $btn.outerWidth(),
			target: $target, 
			speed: 300, 
			ps: align 
		});

		if (onePanel === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1');
			$pnl.eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		} else {
			$pnl.attr('aria-labelledby', btnId);
		}

		!!callback ? callback(opt) : '';
	}   

	/* ------------------------
	* name : date picker
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiDatePicker: function (opt) {
			return createUiDatePicker(opt);
		}
	});
	win[global].uiDatePicker.option = {
		selector: '.ui-datepicker',
		type : 'normal',
		period: false,
		title: false,
		dateSplit: '-',

		openback: false,
		closeback: false,
		dual: false,
		callback: null,
		shortDate: false, //DDMMYYYY
		dateMonths: new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
		weekDay: new Array('일', '월', '화', '수', '목', '금', '토')
	};
	function createUiDatePicker(opt) {
		var opt = $.extend(true, {}, win[global].uiDatePicker.option, opt),
			dateSplit = opt.dateSplit,
			selector = opt.selector,
			period = opt.period,
			dual = opt.dual,
			type = opt.type,
			openback = opt.openback,
			date_title = opt.title,
			closeback = opt.closeback,
			callback = opt.callback,
			dateMonths = opt.dateMonths,
			weekDay = opt.weekDay,
			shortDate = opt.shortDate;

		var	$datepicker = $(selector),
			date = new Date(),
			dateToday = date,
			calVar,
			day_start,
			day_end;

		win[global].uiDatePicker.option.dual = dual;
		$datepicker.data('opt', { callback: callback, shortDate: shortDate, openback: openback, closeback: closeback, period: period });

		//이달의 날짜 텍스트화
		function textDate(d, m, y, whatday) {
			var _date = new Date(y, m - 1, d);
			var gDate = _date.getFullYear() + dateSplit + dateMonths[_date.getMonth()] + dateSplit + win[global].option.partsAdd0(_date.getDate());

			if (whatday === true) {
				//요일 추가
				return (gDate + " (" + weekDay[_date.getDay()] + ")");
			} else {
				return (gDate);
			}
		}

		//사용여부확인 필요
		function subtractDate(oneDate, anotherDate) {
			return (anotherDate - oneDate);
		}

		//DD.MM.YYYY 순으로 정렬
		function toDDMMYYYY(d) {
			var d = new Date(d);
			return (win[global].option.partsAdd0(d.getDate()) + dateSplit + win[global].option.partsAdd0(d.getMonth() + 1) + dateSplit + d.getFullYear());
		}

		//input에 출력
		function writeInputDateValue(calendarEl, obj, end) {
			var d = $(obj).data("day"),
				id = calendarEl.inputId,
				org_id = id,
				opt = $("#" + id).closest('.ui-datepicker').data('opt');

			!!end ? id = id + '_end' : '';

			//DD.MM.YYYY로 설정
			calendarEl.shortDate ? d = toDDMMYYYY(d) : '';

			$("#" + id).val(d);

			//기간설정
			d !== '' ? $("#" + id).closest('.field-inlabel').addClass('activated') : '';
			!!opt.callback ? opt.callback({ id: id, value: d, name: end ? $('#' + id).attr('name') : $('#' + org_id).attr('name')}) : '';
		}
		function writeInputMonthValue(calendarEl, obj) {
			var getMonth = $(obj).data("month"),
				getyear = $(obj).closest('.datepicker-head-select').find('select').val(),
				id = calendarEl.inputId,
				opt = $("#" + id).closest('.ui-datepicker').data('opt'),
				getYM = getyear + dateSplit + win[global].option.partsAdd0(getMonth);

			//DD.MM.YYYY로 설정
			calendarEl.shortDate ? getYM = toDDMMYYYY(getYM) : '';

			$("#" + id).val(getYM);

			//기간설정
			getYM !== '' ? $("#" + id).closest('.field-inlabel').addClass('activated') : '';
			!!opt.callback ? opt.callback({ id: id, value: getYM, name: $('#' + id).attr('name')}) : '';
		}

		function calendarObject(opt) {
			this.calId = opt.calId;
			this.dpId = opt.dpId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = opt.shortDate;
		}

		//사용여부확인 필요
		function matchToday() {
			$('.tbl-datepicker button').not(':disabled').each(function () {
				var $this = $(this);

				$this.data('day') === textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false)
					? $this.attr('title', $this.attr('aria-label') + ' 오늘 입니다.').addClass('today')
					: '';
			});
		}

		//달력 Build
		function buildCalendar(date, calendarEl, v) {
			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(dateSplit),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = !date_title ? $input.attr('title') : date_title,
				_minDay = new Array(),
				_maxDay = new Array(),
				htmlHead = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';

			$('#' + calendarEl.dpId).data('min-month', _minDay[0] + _minDay[1]).data('max-month', _maxDay[0] + _maxDay[1]);

			/* datepicker-head -------------------- */
			htmlHead += '<button type="button" class="btn-close ui-datepicker-close"><span class="hide">닫기</span></button>';
			htmlHead += '<div class="datepicker-head">';

			/* title: datepicker-head-tit */
			if (period && !date_title) {
				htmlHead += '<div class="datepicker-head-tit">' + tit + ' ~ '+ $('#' + calendarEl.inputId + '_end').attr('title') +'</div>';
			} else {
				htmlHead += '<div class="datepicker-head-tit">' + tit + '</div>';
			}
			
			/* 년월 선택: datepicker-head-select */
			// if (type === 'normal') {
				
			// 	htmlHead += '<div class="datepicker-head-select">';
			// 	htmlHead += '<div class="ui-select datepicker-head-year">';
			// 	htmlHead += '<select title="년도 선택" id="sel_' + calendarEl.inputId + '_year">';
			// 	console.log('_minDay[0]', _minDay[0], _minDay[1],  _maxDay[1])
			// 	for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
			// 		htmlHead += y === year ? '<option value="' + y + '" selected>' + y + '년</option>' : '<option value="' + y + '">' + y + '년</option>';
			// 	}

			// 	htmlHead += '</select>';
			// 	htmlHead += '</div>';
			// 	htmlHead += '<div class="ui-select datepicker-head-month">';
			// 	htmlHead += '<select title="월 선택" id="sel_' + calendarEl.inputId + '_month">';

			// 	for (var m = Number(_minDay[1]); m < Number(_maxDay[1]) + 1; m++) {
			// 		m < 10 ? m = '0' + m : '';
			// 		htmlHead += m === month + 1 ? '<option value="' + Number(m) + '" selected>' + m + '월</option>' : '<option value="' + Number(m) + '">' + m + '월</option>';
			// 		m = Number(m);
			// 	}

			// 	htmlHead += '</select>';
			// 	htmlHead += '</div>';
			// 	htmlHead += '</div>';
		
			// }  
			if (type === 'month') {
				htmlHead += '<div class="datepicker-head-select">';
				htmlHead += '<div class="ui-select">';
				htmlHead += '<select title="년도 선택" id="sel_' + calendarEl.inputId + '_year">';

				for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
					htmlHead += y === year ? '<option value="' + y + '" selected>' + y + '년</option>' : '<option value="' + y + '">' + y + '년</option>';
				}

				htmlHead += '</select>';
				htmlHead += '</div>';
				htmlHead += '<div class="datepicker-head-month">';
				for (var m = 1; m < 13; m++) {
					m < 10 ? m = '0' + m : '';
					htmlHead += m === month + 1 ? 
						'<button type="button" class="btn-base datepicker-month" data-month="' + Number(m) + '" selected><span>' + m + '월</span></button>' : 
						'<button type="button" class="btn-base datepicker-month" data-month="' + Number(m) + '"><span>' + m + '월</span></button>';
					m = Number(m);
				}
				htmlHead += '</div>';
				htmlHead += '</div>';
			}
			

			if (type === 'normal') {
				/* 년월 선택: button */
				htmlHead += '<div class="datepicker-head-btn">';
				htmlHead += '<div class="datepicker-head-y">';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-prev-y" title="이전 년도"><span class="hide">이전 ' + (year - 1) + ' 년으로 이동</span></button>';
				htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-next-y" title="다음 년도"><span class="hide">다음 ' + (year + 1) + ' 년으로 이동</span></button>';
				htmlHead += '</div>';

				htmlHead += '<div class="datepicker-head-m">';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-prev" title="이전 달">';
				(dual) 
					? htmlHead += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 2] + ' 월로 이동</span></button>'
					: htmlHead += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</span></button>';
				htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-next" title="다음 달">';
				(dual) 
					? htmlHead += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 2] + ' 월로 이동</span></button>'
					: htmlHead += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</span></button>';
				
				htmlHead += '</div>';

				htmlHead += '</div>';

				/* today */
				htmlHead += '<div class="datepicker-head-today">';
				htmlHead += '<button type="button" class="btn-today" data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false) + ' title="오늘'+ textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) +'로 이동"><span class="hide">today</span></button>';
				htmlHead += '</div>';
				htmlHead += '<div class="datepicker-head-week">';
				htmlHead += '<span scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></span>';
				htmlHead += '<span scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></span>';
				htmlHead += '</div>';

				/* datepicker-head-date */
				// htmlHead += '<div class="datepicker-head-date">';

				// if (dual) {
				// 	htmlHead += '<div class="datepicker-period-head">';

				// 	htmlHead += '<div class="n1">';
				// 	htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 	htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				// 	htmlHead += '</div>';

				// 	htmlHead += '<div class="n2">';

				// 	if (month === 11) {
				// 		htmlHead += '<span class="year2" data-y="' + (year + 1) + '"><strong>' + (year + 1) + '</strong>년</span> ';
				// 		htmlHead += '<span class="month2" data-m="' + dateMonths[0] + '"><strong>' + dateMonths[0] + '</strong>월</span>';
				// 	} else {
				// 		htmlHead += '<span class="year2" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 		htmlHead += '<span class="month2" data-m="' + dateMonths[month + 1] + '"><strong>' + dateMonths[month + 1] + '</strong>월</span>';
				// 	}

				// 	htmlHead += '</div>';
				// 	htmlHead += '</div>';
					
				// } else {
				// 	htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 	htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				// }

				// htmlHead += '</div>';
				htmlHead += '</div>';

				/* datepicker-core -------------------- */
				htmlHead += '<div class="datepicker-core"></div>';
			}
			
			htmlHead += '<div class="datepicker-foot">';
			htmlHead += '<button type="button" class="btn-base-s ui-datepicker-close"><span>닫기</span></button>';
			htmlHead += '</div>';


			return htmlHead;
		}
		function buildCore(date, calendarEl, v , endMinMax) {
			var $base = $('#' + calendarEl.calId);
			var $end = $('#' + calendarEl.inputId + '_end');
			var $prevM = $base.find('.ui-datepicker-prev');
			var $nextM = $base.find('.ui-datepicker-next');
			var $prevY = $base.find('.ui-datepicker-prev-y');
			var $nextY = $base.find('.ui-datepicker-next-y')
			var $headDate = $base.find('.datepicker-head-btn');
			var $headDateYearE = $headDate.find('.year2');
			var $headDateMonthE = $headDate.find('.month2');
			var $headYear = $base.find('.datepicker-head-year');
			var $headmonth = $base.find('.datepicker-head-month');

			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(dateSplit),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				nextMonth2 = new Date(year, month + 2, 1),
				firstWeekDay = thisMonth.getDay(),
				nextWeekDay = nextMonth.getDay(),
				prevWeekDay = prevMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_next = Math.floor((nextMonth2.getTime() - nextMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				mm = nextMonth.getMonth(),
				week_day,
				empty_before = daysInMonth_prev - firstWeekDay,
				empty_after = 0,
				endMinMax = endMinMax === undefined ? false : endMinMax;

			var dateMonthsNext = dateMonths[month + 1];
			var dateMonthsNow = dateMonths[month];

			dateMonthsNext === undefined ? dateMonthsNext = '01' : '';

			// 최소,최대 선택 가능
			if (endMinMax) {
				$end.attr('data-min', $input.attr('data-min'));
				$end.attr('data-min') !== undefined ? _minDay = $end.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;
				$end.attr('data-max') !== undefined ? _maxDay = $end.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;
			} else {
				$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;
				$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;
			}

			month === 2 ? daysInMonth = 31 : '';
			
			if (dual) {
				$prevM.find('span').text('이전 ' + dateMonths[(month - 2 < 0) ? (month - 2 < -1) ? 10 : 11 : month - 2] + '월로 이동');
				$nextM.find('span').text('다음 ' + dateMonths[(month + 2 > 11) ? (month + 2 > 12) ? 1 : 0 : month + 2] + '월로 이동');
			} else {
				$prevM.find('span').text('이전 ' + dateMonths[(month - 1 < 0) ? 11 : month - 1] + '월로 이동');
				$nextM.find('span').text('다음 ' + dateMonths[(month + 1 > 11) ? 0 : month + 1] + '월로 이동');
			}
			
			$headDate.find('.year').data('y', year).find('strong').text(year);
			$headDate.find('.month').data('m', dateMonthsNow).find('strong').text(dateMonthsNow);

			if (dual) {
				if (month + 1 === 12) {
					$headDateYearE.data('y', year + 1).find('strong').text(year + 1);
					$headDateMonthE.data('m', dateMonths[0]).find('strong').text(dateMonths[0]);
				} else {
					$headDateYearE.data('y', year).find('strong').text(year);
					$headDateMonthE.data('m', dateMonthsNext).find('strong').text(dateMonthsNext);
				}
			}

			$headYear.find('option').prop('selected', false).removeAttr('selected');
			$headYear.find('option[value="' + year + '"]').prop('selected', true);
			$headmonth.find('option').prop('selected', false).removeAttr('selected');
			$headmonth.find('option[value="' + (month + 1) + '"]').prop('selected', true);

			year <= _minDay[0] && dateMonthsNow <= _minDay[1] ?
				$prevM.addClass('disabled').attr('disabled') :
				$prevM.removeAttr('disabled').removeClass('disabled');

			year <= _minDay[0] ?
				$prevY.addClass('disabled').attr('disabled') :
				$prevY.removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] && dateMonthsNow >= _maxDay[1] ?
				$nextM.addClass('disabled').attr('disabled') :
				$nextM.removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] ?
				$nextY.addClass('disabled').attr('disabled') :
				$nextY.removeAttr('disabled').removeClass('disabled');

			//table datepicker
			var htmlCalendar = '';
			htmlCalendar += '<div class="tbl-datepicker" data-date="' + year + '' + dateMonthsNow + '">';

			htmlCalendar += '<div class="tbl-datepicker-head" role="text">';
			htmlCalendar += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
			htmlCalendar += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
			htmlCalendar += '</div>';

			htmlCalendar += '<table>';
			// htmlCalendar += '<caption>' + year + '년 ' + dateMonthsNow + '월 일자 선택</caption>';
			htmlCalendar += '<colgroup>';
			htmlCalendar += '<col class="n1">';
			htmlCalendar += '<col span="5" class="n1">';
			htmlCalendar += '<col class="n1">';
			htmlCalendar += '</colgroup>';
			// htmlCalendar += '<thead><tr>';
			// htmlCalendar += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
			// htmlCalendar += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
			// htmlCalendar += '</tr></thead>';
			htmlCalendar += '<tbody><tr>';

			//이전 달
			prevMonthday(firstWeekDay);

			mm < 1 ? mm = 12 : '';
			mm = win[global].option.partsAdd0(mm);
			week_day = firstWeekDay;

			//현재 달
			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? htmlCalendar += '</tr>' : htmlCalendar += '</tr><tr>' : '';

				if (week_day === 0) {
					htmlCalendar += '<td class="day-sun">';
				} else if (week_day === 6) {
					htmlCalendar += '<td class="day-sat">';
				} else {
					htmlCalendar += '<td>';
				}

				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonthsNow < _minDay[1]) || (year == _minDay[0] && dateMonthsNow == _minDay[1] && dayCounter < _minDay[2])) {
					//선택 불가월
					htmlCalendar += '<button type="button" disabled class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonthsNow > _maxDay[1]) || (year == _maxDay[0] && dateMonthsNow == _maxDay[1] && dayCounter > _maxDay[2])) {
					//선택 불가일
					htmlCalendar += '<button type="button" disabled class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				} else {
					//선택가능 일
					htmlCalendar += '<button type="button" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				}
				week_day++;
			}

			//다음 달
			nextMonthday(week_day);

			htmlCalendar += '</tr></tbody></table></div>';

			// period datepicker table
			if (dual) {
				empty_after = 0;
				empty_before = daysInMonth - nextWeekDay;
				htmlCalendar += '<div class="tbl-datepicker type-period" data-date="' + year + '' + dateMonthsNext + '">';
				htmlCalendar += '<div class="tbl-datepicker-head" role="text">';
				htmlCalendar += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				htmlCalendar += '<span class="month" data-m="' + dateMonthsNext + '"><strong>' + dateMonthsNext + '</strong>월</span>';
				htmlCalendar += '</div>';
				htmlCalendar += '<table>';
				// htmlCalendar += '<caption>' + year + '년 ' + dateMonthsNext + '월 일자 선택</caption>';
				htmlCalendar += '<colgroup>';
				htmlCalendar += '<col class="n1">';
				htmlCalendar += '<col span="5" class="n1">';
				htmlCalendar += '<col class="n1">';
				htmlCalendar += '</colgroup>';
				// htmlCalendar += '<thead><tr>';
				// htmlCalendar += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
				// htmlCalendar += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
				// htmlCalendar += '</tr></thead>';
				htmlCalendar += '<tbody><tr>';

				//이전 달
				prevMonthday(nextWeekDay);

				mm = Number(mm) + 1;
				mm < 1 ? mm = 12 : '';

				if (mm > 12) {
					mm = 1;
					year = year + 1;
				};

				mm = win[global].option.partsAdd0(mm);
				week_day = nextWeekDay;

				//현재 달
				for (var dayCounter = 1; dayCounter <= daysInMonth_next; dayCounter++) {
					week_day %= 7;
					week_day === 0 ? daysInMonth_next - dayCounter < 7 ? htmlCalendar += '</tr>' : htmlCalendar += '</tr><tr>' : '';

					if (week_day === 0) {
						htmlCalendar += '<td class="day-sun">';
					} else if (week_day === 6) {
						htmlCalendar += '<td class="day-sat">';
					} else {
						htmlCalendar += '<td>';
					}

					if ((year < _minDay[0]) || (year == _minDay[0] && dateMonthsNext < _minDay[1]) || (year == _minDay[0] && dateMonthsNext == _minDay[1] && dayCounter < _minDay[2])) {
						htmlCalendar += '<button type="button" class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'" disabled>' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					} 
					else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonthsNext > _maxDay[1]) || (year == _maxDay[0] && dateMonthsNext == _maxDay[1] && dayCounter > _maxDay[2])) {
						htmlCalendar += '<button type="button"class="disabled"  aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'" disabled>' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					} 
					else {
						htmlCalendar += '<button type="button" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					}
					week_day++;
				}

				//다음 달
				nextMonthday(week_day);

				htmlCalendar += '</tr></tbody></table></div>';
			}

			//이전달 다시보기
			function prevMonthday(weekDay) {
				for (var week = 0; week < weekDay; week++) {
					empty_before = empty_before + 1;

					if (week < weekDay - 1) {
						htmlCalendar += '<td class="empty"><button type="button" disabled>' + win[global].option.partsAdd0(empty_before) + '</button></td>';
					} else {
						htmlCalendar += '<td class="empty last"><button type="button" disabled>' + win[global].option.partsAdd0(empty_before) + '</button></td>';
					}
				}
			}
			//다음달 미리보기
			function nextMonthday(week_day) {
				for (var _week_day = week_day; _week_day < 7; _week_day++) {
					empty_after = empty_after + 1;
					if (_week_day > week_day) {
						htmlCalendar += '<td class="empty"><button type="button" disabled>' + win[global].option.partsAdd0(empty_after) + '</button></td>';
					} else {
						htmlCalendar += '<td class="empty first"><button type="button" disabled>' + win[global].option.partsAdd0(empty_after) + '</button></td>';
					}
					

				}
			}
			return htmlCalendar;
		}

		//달력 Hide&Remove
		function hideCalendar() {
			var $dp = $('.ui-datepicker.visible'),
				$wrap = $dp.find('.datepicker-sec');
			
			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);
			$dp.on('transitionend', function(){
				$wrap.remove();
			});

		}
		function datepickerClose(calendarEl) {
			var $btn = $('#' + calendarEl.calId).closest('.ui-datepicker').find('.ui-datepicker-btn'),
				$dp = $("#" + calendarEl.dpId),
				$sec = $('#' + calendarEl.calId);

			$('body').removeClass('open-datepicker');
			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);

			var closeback = !!$dp.data('opt').closeback ? $dp.data('opt').closeback : false;

			closeback ? closeback() : '';
			
			$dp.on('transitionend', function(){
				//win[global].uiScroll({ value: $btn.data('sct'), speed: 200 });
				
				$sec.remove();
			});
		}

		//달력 table
		function reDisplayCalendar(calendarEl, v, endMinMax) {
			var $calWrap = $("#" + calendarEl.calId),
				endMinMax = endMinMax === undefined ? false : endMinMax;

			if (endMinMax) {
				$calWrap.find('.tbl-datepicker').remove();
				$calWrap.find('.datepicker-core').append(buildCore(date, calendarEl, v, endMinMax));
			} else {
				$calWrap.find('.datepicker-core').empty().append(buildCore(date, calendarEl, v, false));
			}
			matchToday();
			dayPeriodSelect(calendarEl);
		}
		//달력 layout
		function displayCalendar(calendarEl, v) {
			var id_ = "#" + calendarEl.calId,
				$dp = $("#" + calendarEl.dpId),
				$calWrap = $(id_);
				
			//date = new Date();
			$calWrap.empty().append(buildCalendar(date, calendarEl, v));
			reDisplayCalendar(calendarEl, v);
			$dp.addClass('visible');
			win[global].uiFocusTab({ selector: $calWrap, type: 'hold' });

			//datepicker event--------------------------------------------------------
			$('.datepicker-head-year select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'year');
			});
			$('.datepicker-head-month select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'month');
			});
			$('.ui-datepicker-prev').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'next');
			});
			$('.ui-datepicker-prev-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'next');
			});
			$('.ui-datepicker-close').off('click.uidayclose').on('click.uidayclose', function () {
				datepickerClose(calendarEl);
			});

			function yearMonthSelect(t, v) {
				var $currentDate = $(t).closest('.datepicker-sec').find('.tbl-datepicker-head'),
					$core = $(t).closest('.ui-datepicker').find('.datepicker-core'),
					_y = v === 'year' ?
						$(t).closest('.datepicker-head-year').find('select').eq(0).val() :
						Number($currentDate.find('.year').data('y')),
					_m = v === 'month' ?
						$(t).closest('.datepicker-head-month').find('select').eq(0).val() :
						Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'year' ? new Date(_y, _m, 1) : new Date(_y, _m - 1, 1);

				date = dateTemp;

				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);

				v === 'year' ?
					$calWrap.find('.datepicker-head-year select').eq(0).focus() :
					$calWrap.find('.datepicker-head-month select').eq(0).focus();
			}
			function monthNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-sec').find('.tbl-datepicker-head'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? (dual) ? new Date(_y, _m + 2, 1) : new Date(_y, _m + 1, 1) : (dual) ? new Date(_y, _m - 2, 1) : new Date(_y, _m - 1, 1);

				date = dateTemp;

				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
				$this.eq(0).focus();
			}
			function yearNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-sec').find('.tbl-datepicker-head'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y + 1, _m, 1) : new Date(_y - 1, _m, 1);

				date = dateTemp;
				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
				$this.eq(0).focus();
			}

			if (period) {
				$(doc).off('click.'+ id_).on('click.'+ id_, id_ + ' td button', function (e) {
					e.preventDefault();
					daySelectAct(calendarEl, this);
				}).off('mouseover.'+ id_ +'sel').on('mouseover.'+ id_ +'sel', id_ + ' td button', function () {
					dayHover(this);
				}).off('mouseover.'+ id_ +'sel2').on('mouseover.'+ id_ +'sel2', id_ + ' .type-period td button', function () {
					monthHover(this);
				}).off('mouseleave.'+ id_ +'sel3').on('mouseleave.'+ id_ +'sel3', id_ + ' .tbl-datepicker', function () {
					$('.tbl-datepicker').find('.hover').removeClass('hover');
				});

				$(doc).off('click.'+ id_ +'today').on('click.'+ id_ +'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
				}).off('click.'+ id_ +'d').on('click.'+ id_ +'d', id_ + ' .btn-base', function () {
					day_start ? writeInputDateValue(calendarEl, day_start) : '';
					day_end ? writeInputDateValue(calendarEl, day_end, true) : '';

					datepickerClose(calendarEl);
				});
			} else {
				$(doc).off('click.'+ id_).on('click.'+ id_ , id_ + ' td button', function () {
					var $this = $(this);

					writeInputDateValue(calendarEl, $this);
					datepickerClose(calendarEl);
				}).off('click.'+ id_ +'today').on('click.'+ id_+'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
					$calWrap.find('td button.today').eq(0).focus();
				});
			}	
			
			$('.datepicker-month').on('click', function(){
				var $this = $(this);
				writeInputMonthValue(calendarEl, $this);
				datepickerClose(calendarEl);
			});
			return false;
		}

		function monthHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				$tbl = $this.closest('.tbl-datepicker');

			if ($tbl.hasClass('on-start-tbl')) {
				$tbl.prev().addClass('off-tbl')
			}

			if (!!$core.data('start') && !$tbl.hasClass('on-start-tbl')) {

				if ($tbl.prev().data('date') > $this.closest('.ui-datepicker').data('min-month')) {
					$tbl.prev().find('tr').addClass('hover').find('td').addClass('hover');
				}
				
			}
		}
		function dayHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core');

			if (!!$core.data('start')) {
				$this.closest('td').addClass('hover').prevAll().addClass('hover');
				$this.closest('tr').addClass('hover').prevAll().find('td').addClass('hover');

				$this.closest('td').nextAll().removeClass('hover');
				$this.closest('tr').removeClass('hover').nextAll().find('td').removeClass('hover');
			}
		}
		function daySelectAct(calendarEl, t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				n_day = $this.data('day').replace(/\-/g, ''),
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\-/g, '');

			if (win[global].uiDatePicker.option.dateSplit === '.') {
				n_day = $this.data('day').replace(/\./g, '');
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\./g, '');
			}

			var sam_day = n_day === n_day_,
				next_day = n_day > n_day_,
				prev_day = n_day < n_day_;

			//first event start, next event end
			if (!$core.data('start') && !$core.data('end')) {
				$core.data('end', false);
				$core.data('start', true);
				$core.data('day', n_day);

				//init
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.disabled').removeClass('disabled');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				//선택 및 반영
				$core.addClass('state-ready');
				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$('.on-start').find('tr.on-start').find('button').attr('disabled');
				$('#' + $this.closest('.ui-datepicker').find('.inp-base').attr('id') + '_end').val('');

				day_start = $this;
				writeInputDateValue(calendarEl, $this);
				reDisplayCalendar(calendarEl, $this, true);
			} else if (next_day || sam_day) {
				$core.data('start', false);
				$core.removeClass('state-ready');
				$core.data('end', true).data('endday', n_day);
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$this.addClass('selected-end').attr('aria-selected', true);
				$core.find('.on-ing').removeClass('on-ing');
				$core.find('.on-end').removeClass('on-end');
				$this.closest('td').addClass('on-end');
				$this.closest('tr').addClass('on-end');
				$core.find('.hover').addClass('on-ing');
				$core.addClass('date-ing-on');

				day_end = $this;
				writeInputDateValue(calendarEl, $this, true);
				datepickerClose(calendarEl);
			} else if (prev_day) {
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.data('day', n_day);
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$this.closest('td').addClass('on-start').nextAll().removeClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').nextAll().removeClass('disabled').find('td').removeClass('disabled').find('button');
				$('.on-start').find('tr.on-start').find('button').attr('disabled');

				day_start = $this;
				writeInputDateValue(calendarEl, $this);
			}
		}

		//event
		$datepicker.find('.ui-datepicker-btn').off('click.uidatepicker').on('click.uidatepicker', function () {
			var btn = $(this);

			if (!btn.data('selected')) {
				$('.ui-datepicker-btn').data('selected', false);
				btn.data('selected', true);
				datepickerReady(this);
			} else {
				btn.data('selected', false);
				hideCalendar();
			}
		});
		$datepicker.find('.inp-base').off('focus.uidpinp').on('focus.uidpinp', function () {
			$(this).closest('.inp-datepicker').addClass('focus');
		}).off('blur.uidpinp').on('blur.uidpinp', function () {
			$(this).closest('.inp-datepicker').removeClass('focus');
		});

		//datepicker ready
		function datepickerReady(v) {
			var $this = $(v),
				$datepicker = $this.closest('.ui-datepicker'),
				dataPeriod = $datepicker.attr('data-period'),
				dataDual = $datepicker.attr('data-dual'),
				dataTitle = $datepicker.attr('data-title'),
				dataType = $datepicker.attr('data-type'),
				$this_inp = $datepicker.find('.ui-datepicker-inp'),
				dp_id = $datepicker.attr('id'),
				inputId = $this_inp.attr('id'),
				regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g,
				_val = $this_inp.val();
				//_val = $('#' + inputId).val();

			(win[global].uiDatePicker.option.date_split === '.') ? regExp = /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g : '';
			
			var openback = !!$datepicker.data('opt').openback ? $datepicker.data('opt').openback : false;
			openback ? openback() : '';
			
			win[global].browser.mobile && $('body').addClass('open-datepicker');

			hideCalendar();
			
			if (!!dataType) {
				type = dataType;
			}
			if (!!dataPeriod) {
				period = dataPeriod === 'true' ? true : false;
			}
			if (!!dataDual) {
				dual = dataDual === 'true' ? true : false;
			}
			if (!!dataTitle) {
				date_title = dataTitle;
			}

			var reset = regExp.test(_val),
				htmlWrap = '';

			$this.data('sct', $(doc).scrollTop());
			!reset ? $this_inp.val('') : '';
			date = new Date();
			$datepicker.find('.datepicker-sec').remove();

			calVar = new calendarObject({
				calId: "calWrap_" + dp_id,
				dpId: dp_id,
				inputId: inputId,
				buttonId: "calBtn_" + dp_id,
				shortDate: shortDate
			});

			htmlWrap += '<div id="' + calVar.calId + '" class="datepicker-sec">';
			htmlWrap += '<div class="datepicker-wrap">';
			htmlWrap += '</div>';
			htmlWrap += '</div>';

			$this.closest('.ui-datepicker').find('.ui-datepicker-wrap').append(htmlWrap);
			
			displayCalendar(calVar, 'generate');

			dual ? $datepicker.addClass('type-dual') : $datepicker.removeClass('type-dual');
			dataType === 'month' ? $datepicker.addClass('type-month') : $datepicker.removeClass('type-month');
			(period && dual) && $datepicker.find('.ui-datepicker-wrap').addClass('period');

		}

		function dayPeriodSelect(calendarEl) {
			if (period) {
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected-start').attr('aria-selected', true).closest('td').addClass('on-start').closest('tr').addClass('on-start').closest('table').addClass('on-start-tbl');
				
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId + '_end').val() + '"]').addClass('selected-end').attr('aria-selected', true).closest('td').addClass('on-end').closest('tr').addClass('on-end').closest('table').addClass('on-end-tbl');

				var s = $('#' + calendarEl.inputId).val().replace(/\-/g, '').substring(0, 6),
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\-/g, '').substring(0, 6);

				if (win[global].uiDatePicker.option.dateSplit === '.') {
					s = $('#' + calendarEl.inputId).val().replace(/\./g, '').substring(0, 6);
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\./g, '').substring(0, 6);
				}
				
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().addClass('disabled').find('td').addClass('disabled');
				$datepicker.find('.tbl-datepicker').find('.on-start').nextAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').prevAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').nextAll().removeClass('hover-on').find('td').removeClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().removeClass('hover-on').find('td').removeClass('hover-on');

				if (!$('#' + calendarEl.inputId + '_end').val()) {
					$datepicker.find('.hover-on').removeClass('hover-on');
				} else {
					$datepicker.find('.tbl-datepicker').each(function () {
						var $this = $(this);
						var thisDate = $this.data('date');

						if (s < thisDate && thisDate < e) {
							$this.find('table').addClass('on-ing-tbl');
							$this.find('td').addClass('hover-on');
						}
					});
				}
			} else {
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected').attr('aria-selected', true);
			}
		}
	}  

	/* ------------------------
	* name : select
	* date : 2020-06-16
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAction: function (opt) {
			return createuiSelectAction(opt);
		}
	});
	win[global].uiSelect.option = {
		id: false, 
		current: null,
		customscroll: true,
		callback: false
	};
	function createUiSelect(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelect.option, opt),
			current = opt.current,
			callback = opt.callback,
			customscroll = opt.customscroll,
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.find('.ui-select') : $('.ui-select'),
			keys = win[global].option.keys,
			len = $ui_select.length;

		var $sel,
			$selectCurrent,
			selectID,
			listID,
			optionSelectedID,
			selectN,
			selectTitle,
			selectDisabled,
			btnTxt = '',
			hiddenClass = '',
			htmlOption = '',
			htmlButton = '' ;

		//init
		win[global].browser.mobile ? customscroll = false : '';

		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();

		var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

		//select set
		for (var i = 0; i < len; i++) {
			$selectCurrent = $ui_select.eq(i);
			$sel = $selectCurrent.find('select');
			
			selectID = $sel.attr('id');
			selectID === undefined && $sel.attr('id', 'uiSelect_' + idN);
			listID = selectID + '_list';
			selectDisabled = $sel.prop('disabled');
			selectTitle = $sel.attr('title');
			hiddenClass = '';
			
			(!$sel.data('callback') || !!callback) && $sel.data('callback', callback);

			if (customscroll) {
				htmlOption += '<div class="ui-select-wrap ui-scrollbar" scroll-id="uiSelectScrollBar_'+ idN +'">';
				idN = idN + 1;
				sessionStorage.setItem('scrollbarID', idN);
			} else {
				htmlOption += '<div class="ui-select-wrap" style="min-width:' + $selectCurrent.outerWidth() + 'px">';
			}

			htmlOption += '<strong class="ui-select-title">'+ selectTitle +'</strong>';
			htmlOption += '<div class="ui-select-opts" role="listbox" id="' + listID + '" aria-hidden="false">';

			setOption();

			htmlOption += '</div>';
			htmlOption += '<button type="button" class="ui-select-confirm"><span>확인</span></strong>';
			htmlOption += '</div>';
			htmlButton = '<button type="button" class="ui-select-btn '+ hiddenClass +'" id="' + selectID + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + listID + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + optionSelectedID + '" data-n="' + selectN + '" data-id="' + selectID + '" tabindex="-1"><span>' + btnTxt + '</span></button>';

			$selectCurrent.append(htmlButton);
			$sel.addClass('off');
			//$sel.attr('aria-hidden', true).attr('tabindex', -1);
			$selectCurrent.append(htmlOption);

			selectDisabled ? $selectCurrent.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';

			htmlOption = '';
			htmlButton = '';
		}
		
		function setOption(t, v){
			var _$sel = (t !== undefined) ? $(t).closest('.ui-select').find('select') : $sel;
			var _$option = _$sel.find('option');
			var _$optionCurrent = _$option.eq(0);

			selectID = _$sel.attr('id');

			var _optionID = selectID + '_opt';
			var _optLen = _$option.length;
			var _current = current;
			var _selected = false;
			var _disabled = false;
			var _hidden = false;
			var _val = false;
			var _hiddenCls;
			var _optionIdName;

			if (v !== undefined) {
				_current = v;
			}

			for (var j = 0; j < _optLen; j++) {
				_$optionCurrent = _$option.eq(j);
				_hidden = _$optionCurrent.prop('hidden');

				if (_current !== null) {
					
					if (_current === j) {
						_selected = true;
						_$optionCurrent.prop('selected', true);
					} else {
						_selected = false;
						_$optionCurrent.prop('selected', false);
					}

				} else {
					_selected = _$optionCurrent.prop('selected');
				}

				_disabled = _$optionCurrent.prop('disabled');
				_hiddenCls =  _hidden ? 'hidden' : '';

				if (_selected) {
					_val = _$optionCurrent.val();
					btnTxt = _$optionCurrent.text();
					optionSelectedID = _optionID + '_' + j;
					selectN = j;
				}

				_selected && _hidden ? hiddenClass = 'opt-hidden' : '';
				_optionIdName = _optionID + '_' + j;

				if (win[global].browser.mobile) {
					_disabled ?
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
				} else {
					_disabled ?
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
				}

				htmlOption += '<span class="ui-select-txt">' + _$optionCurrent.text() + '</span>';
				htmlOption += '</button>';
			}

			if (t !== undefined) {
				_$sel.closest('.ui-select').find('.ui-select-opts button').remove();
				_$sel.closest('.ui-select').find('.ui-select-opts').append(htmlOption);
				htmlOption = '';
				eventFn();
			}
		}

		//event
		eventFn();
		function eventFn(){
			var $doc = $(doc);

			$doc.find('.dim-select').off('click.dim').on('click.dim', function () {
				if ($('body').data('select-open')) {
					optBlur();
				}
			});
			$doc.find('.ui-select-confirm').off('click.cfm').on('click.cfm', optClose);
			$doc.find('.ui-select-btn').off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui').on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'mouseleave.ui': selectLeave
			});
			$doc.find('.ui-select-opt').off('click.ui mouseover.ui').on({
				'click.ui': optClick,
				'mouseover.ui': selectOver
			});
			$doc.find('.ui-select-wrap').off('mouseleave.ui').on({ 'mouseleave.ui': selectLeave });
			$doc.find('.ui-select-wrap').off('blur.ui').on({ 'blur.ui': optBlur });
			$doc.find('.ui-select-label').off('click.ui').on('click.ui', function () {
				var idname = $(this).attr('for');

				setTimeout(function () {
					$('#' + idname + '_inp').focus();
				}, 0);
			});
			$doc.find('.ui-select select').off('change.ui').on({ 'change.ui': selectChange });
		}

		function selectLeave() {
			$('body').data('select-open', true);
		}
		function selectChange() {
			var $this = $(this);
			$this.closest('.ui-select').data('fn');

			win[global].uiSelectAction({
				id:$this .attr('id'),
				current: $this.find('option:selected').index(),
				callback: $this.data('callback'), original:true
			});
		}
		function optBlur() {
			optClose();
		}
		function selectClick() {
			var $btn = $(this);
			$btn.data('sct', $(doc).scrollTop());

			setOption(this, $btn.closest('.ui-select').find('option:selected').index() );
			optExpanded(this);
		}
		function optClick() {
			var t = this;
			var idx =  $(t).index();

			if (customscroll) {
				win[global].uiSelectAction({ 
					id: $(t).closest('.ui-select').find('.ui-select-btn').data('id'), 
					current: idx 
				});

				$(t).closest('.ui-select').find('.ui-select-btn').focus();
				optClose();
			} else {
				scrollSelect(idx, $(t).closest('.ui-select').find('.ui-select-wrap') );
			}
		}
		function selectOver() {
			$('body').data('select-open', false);
		}
		function selectKey(e) {
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$list = $('#' + id + '_list'),
				$wrap = $list.closest('.ui-select-wrap'),
				$opts = $wrap.find('.ui-select-opts'),
				$opt = $wrap.find('.ui-select-opt'),

				n = Number($list.find('.selected').index()),
				nn = 0,
				nnn = 0,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;

			if (e.altKey) {
				if (e.keyCode === keys.up) {
					optOpen(t);
				}

				e.keyCode === keys.down && optClose();
				return;
			}

			switch (e.keyCode) {
				case keys.up:
				case keys.left:
					nn = n - 1 < 0 ? 0 : n - 1;
					nnn = Math.abs($opts.position().top);
					n_top = $opt.eq(nn).position().top + nnn;

					optScroll($wrap, n_top, wrap_h, 'up');
					optPrev(e, id, n, len);
					break;

				case keys.down:
				case keys.right:
					nn = n + 1 > len - 1 ? len - 1 : n + 1;
					nnn = Math.abs($opts.position().top);
					n_top = $opt.eq(nn).position().top + nnn;
					
					optScroll($wrap, n_top, wrap_h, 'down');
					optNext(e, id, n, len);
					break;
			}
		}
		function optExpanded(t) {
			if (win[global].browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();
				}
			}
		}
		function optScroll($wrap, n_top, wrap_h, key) {
			win[global].uiScroll({ 
				value: Number(n_top), 
				target: customscroll ? $wrap.find('> .ui-scrollbar-item') : $wrap, 
				speed: 0, 
				ps: 'top' 
			});
		}
		function optPrev(e, id, n, len) {
			e.preventDefault();
			n === 0 ? n = 0 : n = n - 1;
			win[global].uiSelectAction({ id: id, current: n });
		}
		function optNext(e, id, n, len) {
			e.preventDefault();
			n === len - 1 ? n = len - 1 : n = n + 1;
			win[global].uiSelectAction({ id: id, current: n });
		}
		function optOpen(t) {
			var $body = $('body'),
				_$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt');

			var offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btn_h = _$sel.outerHeight(),
				opt_h = _$opt.outerHeight(),
				win_h = $(win).outerHeight(),
				className = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';

			$body.addClass('dim-select');

			if (!_$sel.data('expanded')) {
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + className).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':selected').index());
			}
			
			if (customscroll) {
				win[global].uiScrollBar({
					id : _$wrap
				});
				win[global].uiScroll({ 
					value: Number(opt_h * _$uisel.find(':checked').index()), 
					target: _$wrap.find('> .ui-scrollbar-item'), 
					speed: 0, 
					ps: 'top' 
				});
			} else {
				win[global].uiScroll({ 
					value: Number(opt_h * _$uisel.find(':checked').index()), 
					target: _$wrap, 
					speed: 0, 
					ps: 'top' 
				});
			}

			openScrollMove(_$uisel);

			var timerScroll = null;
			var touchMoving = false;

			_$wrap.off('touchstart.uiscroll').on('touchstart.uiscroll', function(e){
				var $this = $(this);
				var getScrollTop = $this.scrollTop();
				var currentN = 0;
				clearTimeout(timerScroll);
				touchMoving = false;

				$this.stop();
				
				_$wrap.off('touchmove.uiscroll').on('touchmove.uiscroll', function(e){
					touchMoving = true;
					getScrollTop = $this.scrollTop();
				}).off('touchcancel.uiscroll touchend.uiscroll').on('touchcancel.uiscroll touchend.uiscroll', function(e){
					var _$this = $(this);

					

					function scrollCompare(){
						timerScroll = setTimeout(function(){
							if (getScrollTop !== _$wrap.scrollTop()) {
								getScrollTop = _$wrap.scrollTop();
								scrollCompare();
							} else {
								currentN = Math.floor((Math.floor(getScrollTop) + 20) / 40);
								scrollSelect(currentN, _$this );
							}
						},100);
					} 
					touchMoving && scrollCompare();
					_$wrap.off('touchmove.uiscroll');
				});
			});
		}

		function scrollSelect(v, _$this){
			_$this.stop().animate({
				scrollTop : 40 * v
			}, 100);
			win[global].uiSelectAction({ 
				id: _$this.closest('.ui-select').find('.ui-select-btn').data('id'), 
				current: v
			});
		}

		function openScrollMove(_$uisel){
			var __$uiSel = _$uisel;
			var __scrollTop = Math.floor($(doc).scrollTop());
			var __winH = $(win).outerHeight();
			var __$uiSelBtn = __$uiSel.find('.ui-select-btn');
			var __btnTop = __$uiSelBtn.offset().top;
			var __btnH = __$uiSelBtn.outerHeight();
			var a = Math.floor(__btnTop - __scrollTop);
			var b = __winH - 240;

			__$uiSel.data('orgtop', __scrollTop);

			(a > b) && $('html, body').scrollTop(a - b + __btnH + 10 + __scrollTop);
		}


		function optClose() {
			var $body = $('body');
			var $btn = $('.ui-select-btn[aria-expanded="true"]');
			var $select = $btn.closest('.ui-select');
			var $wrap = $select.find('.ui-select-wrap');
			var orgTop = $select.data('orgtop');

			$body.removeClass('dim-select');
			$btn.data('expanded', false).attr('aria-expanded', false).focus();
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
			$('html, body').scrollTop(orgTop);
		}
	}
	function createuiSelectAction(opt) {
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$sel = $('#' + id),
			$uiSelect = $sel.closest('.ui-select');

		var dataCallback = $sel.data('callback'),
			callback = opt.callback === undefined ? dataCallback === undefined ? false : dataCallback : opt.callback,
			current = opt.current,
			org = opt.original === undefined ? false : opt.original;

		//!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true);
		!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change');
		//trigger 오류 확인필요
		
		var $optCurrent = $sel.find('option').eq(current);
		var $selButton = $sel.closest('.ui-select').find('.ui-select-btn');

		!$optCurrent.prop('hidden')
			?  $selButton.removeClass('opt-hidden')
			:  $selButton.addClass('opt-hidden');

		$uiSelect.find('.ui-select-btn span').text($optCurrent.text());
		$uiSelect.find('.ui-select-opt').removeClass('selected').eq(current).addClass('selected');

		win[global].browser.mobile && $uiSelect.find('.ui-select-opt').eq(current).focus();

		callback && callback({ 
			id: id, 
			current: current, 
			val: $optCurrent.val() 
		});
	}


})(jQuery, window, document);