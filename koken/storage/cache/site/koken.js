/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;s[n]||(s[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function i(t,i,s,o){if(Object.defineProperty)try{return Object.defineProperty(t,i,{configurable:!0,enumerable:!0,get:function(){return r(o),s},set:function(e){r(o),s=e}}),n}catch(u){}e._definePropertyBroken=!0,t[i]=s}var s={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){s={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,u=e.attr,a=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},f=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,c=/^[238]$/,h=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,p=/^(?:checked|selected)$/i;i(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,i,s,a){var f=i.toLowerCase(),d=t&&t.nodeType;return a&&(4>u.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!c.test(d)&&(o?i in o:e.isFunction(e.fn[i])))?e(t)[i](s):("type"===i&&s!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[f]&&h.test(f)&&(e.attrHooks[f]={get:function(t,r){var i,s=e.prop(t,r);return s===!0||"boolean"!=typeof s&&(i=t.getAttributeNode(r))&&i.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var i;return n===!1?e.removeAttr(t,r):(i=e.propFix[r]||r,i in t&&(t[i]=!0),t.setAttribute(r,r.toLowerCase())),r}},p.test(f)&&r("jQuery.fn.attr('"+f+"') may use property instead of attribute")),u.call(e,t,i,s))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?a.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var i=(e.nodeName||"").toLowerCase();return"button"===i?f.apply(this,arguments):("input"!==i&&"option"!==i&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var d,v,m=e.fn.init,g=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,i){var s;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(s=y.exec(e.trim(t)))&&s[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),s[3]&&r("$(html) HTML text after last tag is ignored"),"#"===s[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?m.call(this,e.parseHTML(s[2],n,!0),n,i):m.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?g.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(d=e.uaMatch(navigator.userAgent),v={},d.browser&&(v[d.browser]=!0,v.version=d.version),v.chrome?v.webkit=!0:v.webkit&&(v.safari=!0),e.browser=v),i(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,i){return i&&i instanceof e&&!(i instanceof t)&&(i=t(i)),e.fn.init.call(this,r,i,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var i,s,o=this[0];return!o||"events"!==t||1!==arguments.length||(i=e.data(o,t),s=e._data(o,t),i!==n&&i!==s||s===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),s)};var w=/\/(java|ecma)script/i,E=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),E.apply(this,arguments)},e.clean||(e.clean=function(t,i,s,o){i=i||document,i=!i.nodeType&&i[0]||i,i=i.ownerDocument||i,r("jQuery.clean() is deprecated");var u,a,f,l,c=[];if(e.merge(c,e.buildFragment(t,i).childNodes),s)for(f=function(e){return!e.type||w.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):s.appendChild(e):n},u=0;null!=(a=c[u]);u++)e.nodeName(a,"script")&&f(a)||(s.appendChild(a),a.getElementsByTagName!==n&&(l=e.grep(e.merge([],a.getElementsByTagName("script")),f),c.splice.apply(c,[u+1,0].concat(l)),u+=l.length));return c});var S=e.event.add,x=e.event.remove,T=e.event.trigger,N=e.fn.toggle,C=e.fn.live,k=e.fn.die,L="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",A=RegExp("\\b(?:"+L+")\\b"),O=/(?:^|\s)hover(\.\S+|)\b/,M=function(t){return"string"!=typeof t||e.event.special.hover?t:(O.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(O,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&i(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,i,s){e!==document&&A.test(t)&&r("AJAX events should be attached to document: "+t),S.call(this,e,M(t||""),n,i,s)},e.event.remove=function(e,t,n,r,i){x.call(this,e,M(t)||"",n,r,i)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var i=arguments,s=t.guid||e.guid++,o=0,u=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),i[r].apply(this,arguments)||!1};for(u.guid=s;i.length>o;)i[o++].guid=s;return this.click(u)},e.fn.live=function(t,n,i){return r("jQuery.fn.live() is deprecated"),C?C.apply(this,arguments):(e(this.context).on(t,this.selector,n,i),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),k?k.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,i){return n||A.test(e)||r("Global events are undocumented and deprecated"),T.call(this,e,t,n||document,i)},e.each(L.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window),function(){window.$K={scrollContainer:!1,loadUrl:function(e){window.Turbolinks&&window.Turbolinks.supported?(e=e.replace(RegExp("https?://"+location.host),""),Turbolinks.visit(e)):location.href=e},pulse:{plugins:{},groups:{},refs:{},overrides:{},teardown:function(){$.each(this.refs,function(e,t){t.kill()}),this.refs={}},register:function(e){this.refs[e.id]&&(this.refs[e.id].kill(),delete this.refs[e.id]);var t="#"+e.id,n=$(t).data("pulse-group");$(t).children(":not(div.cover)").remove(),this.groups[n]||(this.groups[n]=e.options);var r=this.groups[n],i=["width","height","dataUrl","data","next","previous"];return r.link_to===undefined&&i.push("link_to"),this.overrides[e.id]||(this.overrides[e.id]={}),$.each(i,$.proxy(function(t,n){e.options[n]&&(this.overrides[e.id][n]=e.options[n])},this)),this.refs[e.id]=Pulse(t,$.extend(r,this.overrides[e.id])),$.each(this.plugins,$.proxy(function(t,n){r[t+"_enabled"]&&this.refs[e.id][t](r)},this)),this.refs[e.id]}},navigation:{sets:[],init:!1,toggleChilds:function(e,t){var n=t&&t==="none"||$(e).hasClass("k-nav-open"),r=e.siblings("ul");if(!r.length)return;n?$(e).removeClass("k-nav-open"):$(e).addClass("k-nav-open"),r.css("display",n?"none":"block")},nest:function(){var e=$("a.k-nav-set"),t=this;if(this.sets.length===e.length)return;this.sets=e,$.each(this.sets,$.proxy(function(e,t){t.onclick===null&&(t.onclick=$.proxy(function(e){$(".k-nav-current").removeClass("k-nav-current"),this.toggleChilds($(t)),e.preventDefault()},this))},this)),this.setCurrent()},setCurrent:function(e){var t=RegExp("(http://"+location.host+")?"+$K.location.root_folder+"(/(index|preview).php)?"),e=e||location.href,n=e.replace(t,"").replace(/&rand=.*$/,"")||"/";$.each(this.sets,$.proxy(function(e,t){this.toggleChilds($(t),"none")},this)),$(".k-nav-current").removeClass("k-nav-current"),$.each($(".k-nav-root a:not(.k-nav-set)"),$.proxy(function(e,r){r=$(r);var i=r.attr("href").replace(t,"");if(n===i){r.addClass("k-nav-current");for(;;){r=r.parent();if(r.hasClass("k-nav-root"))break;r.get(0).nodeName.toLowerCase()==="ul"&&r.show()}}},this))}},keyboardBind:function(){$("[data-bind-to-key]").each(function(){var e=$(this),t=e.attr("data-bind-to-key");t.indexOf("→")!==-1&&(t=t.replace("→","right")),t.indexOf("←")!==-1&&(t=t.replace("←","left")),key.unbind(t),key(t,function(t,n){var r=e.attr("href");if(!r||r==="#"){e.trigger("click");return}if(location.pathname===r||location.href===r)return;var i=$._data(e.get(0),"events")&&$._data(e.get(0),"events").click;if(!i){var s=$._data(document,"events");s&&s.click&&$.each(s.click,function(t,n){if($.inArray(e.get(0),$(n.selector))!==-1)return i=!0,!1})}i?e.trigger("click"):e.attr("data-koken-internal")!==undefined?$K.loadUrl(r):location.href=r})})},keyboardScroll:function(e,t){t=t||0;var n=$(e),r=n.length-1,i=0,s=!1,o,u=function(n){if(n===37&&i===0||n===39&&i===r||n!==37&&n!==39)return;n===37?i--:n===39&&i++;var s=$(e).get(i).offsetTop+t;return $("html,body").animate({scrollTop:s}),!1};$(document).off(".kScroll").on("scroll.kScroll",function(){n.each(function(e,n){if($(n).offset().top+t>=$(document).scrollTop())return i=e,!1})}).on("keydown.kScroll",function(e){u(e.which)})},lazy:{queue:[],working:[],fails:{},max:4,out:function(e){$K.lazy.working.splice($.inArray(e,$K.lazy.working),1),$K.lazy.worker()},fail:function(e){$K.lazy.fails[e]?$K.lazy.fails[e]++:$K.lazy.fails[e]=1,$K.lazy.fails[e]<3&&$K.lazy.queue.push(e),$K.lazy.out(e)},worker:function(){if($K.lazy.queue.length&&$K.lazy.working.length<$K.lazy.max){var e=$K.lazy.queue.shift(),t=$('img.k-lazy-loading[data-src="'+e+'"]').add('.k-lazy-loading-background[data-src="'+e+'"]'),n=new Image;if($K.lazy.fails[e]&&$K.lazy.fails[e]>2)return;$K.lazy.working.push(e),n.onerror=function(){$K.lazy.fail(e)},n.onload=function(){var n=t.filter("img"),r=t.filter(".k-lazy-loading-background");n.removeClass("k-lazy-loading"),r.removeClass("k-lazy-loading-background");var i=n.first().data("lazy-fade");i&&n.css("opacity",.001),i=r.first().data("lazy-fade"),i&&r.each(function(){$(this).find("i.k-bg-fader").remove();var e=$(this).html();$(this).empty().css("position","relative"),$("<i/>").addClass("k-bg-fader").css({width:"100%",height:"100%","float":"left",backgroundPosition:$(this).css("background-position"),opacity:0,backgroundRepeat:"no-repeat",zIndex:1}).appendTo($(this)),$("<span>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:2}).html(e).appendTo($(this))}),setTimeout(function(){$K.lazy.out(e),n.addClass("k-lazy-loaded"),n.attr("src",e),n.animate({opacity:1},i,null,function(){$(this).trigger("k-image-loaded")}),r.each(function(){$(this).addClass("k-lazy-background-loaded"),i?$(this).find("i.k-bg-fader").css("backgroundImage","url("+e+")").animate({opacity:1},i,null,function(){$(this).trigger("k-background-loaded")}):($(this).css("backgroundImage","url("+e+")"),$(this).trigger("k-background-loaded"))})},0)},n.src=e,$K.lazy.worker()}},load:function(){var e=$(window).height()*1.3+$(window).scrollTop(),t=$(window).width()*2+$(window).scrollLeft(),n=this;$K.lazy.queue=[],$.each($("img.k-lazy-loading").add(".k-lazy-loading-background"),function(n,r){r=$(r);if(!r.attr("data-src")||!r.is(":visible"))return;var i=r.offset();if(i.top<=e&&i.top+r.height()>=$(window).scrollTop()&&i.left<=t&&i.left+r.width()>=$(window).scrollLeft()){var s=r.attr("data-src");$.inArray(s,$K.lazy.queue)===-1&&$K.lazy.queue.push(s)}}),$K.lazy.worker()},init:function(){var e=$("img.k-lazy-loading"),t=$(".k-lazy-loading-background");e.length&&$.each(e,function(e,t){$(t).attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")}),(e.length||t.length)&&setTimeout(function(){$K.lazy.load()},100)}},isRetinaCache:null,isRetina:function(){return this.isRetinaCache!==null?this.isRetinaCache:(this.isRetinaCache=$K.retinaEnabled&&("devicePixelRatio"in window&&devicePixelRatio>1||"matchMedia"in window&&matchMedia("(min-resolution:144dpi)").matches),this.isRetinaCache)},retinafyUrl:function(e){e=e.replace(".2x.",".");if(this.isRetina()){var t=e.lastIndexOf(".");e=e.substr(0,t)+".2x"+e.substr(t)}return e},layout:{mosaic:function(e){e=e||"ul.k-mosaic";var t=$(e);if(t.length){var n=function(){t.each(function(e,t){var n=t.className.match(/k-mosaic-(\d+)/)[1],r=$(t),i=r.children(),s=i.filter(":not(.k-mosaic-uneven)"),o=s.length,u=i.length,a=u%n,f=r.width(),l=f/n,c=0,h=parseInt(i.first().css("margin-right"),10);i.css({width:Math.floor(l-(n-1)/n*h),height:l});if(a!==0){var p=$($.makeArray(i).reverse().slice(0,a));h=Math.ceil((p.length-1)/p.length*h),p.addClass("k-mosaic-uneven").css({width:Math.min(f,Math.floor(f*(100/a)/100-h))})}var d=0,v=1;$.each(r.children(),function(e,t){d+=$(t).outerWidth(!0),v==n||u===e+1?(d<f&&$(t).width($(t).width()+(f-d)),d=0,v=1):v++})}),$K.responsiveBackgrounds(),$K.lazy.init()};$(window).on("k-resize",n),n()}}},loadImages:function(){var e=$("img[data-src]"),t=this;e.length&&$.each(e,function(e,n){var r=$(n),i=t.retinafyUrl(r.attr("data-src"));r.hasClass("k-lazy-loading")?r.attr("data-src",i):r.attr("src",i)})},resizeVideos:function(){$(".mejs-container video").each(function(){$v=$(this);var e=$v.data("aspect"),t=Math.min($v.parents(".mejs-container").parent().width(),$v.data("width")),n=t/e,r=this.player;r&&(r.setPlayerSize(t,n),r.setControlsSize());if(this.pluginType==="native"){var i={width:t,height:n};$v.attr(i).css(i)}else r&&(r.options.videoWidth=t,r.options.videoHeight=n/e,r.media.setVideoSize&&r.media.setVideoSize(t,n))})},responsiveBackgrounds:function(){var e=$("[data-bg-presets]"),t=this;$.each(e,function(){var e=$(this),n=e.width(),r=e.height(),i=n/r,s=n>=r?"width":"height",o=!1,u,a=/([a-z_\.]+)\,([0-9]+)\,([0-9]+)/g,f=e.data("bg-presets"),l=e.data("position")||"focal",c=e.css("background-image"),h=e.data("aspect"),p={backgroundRepeat:"no-repeat",backgroundSize:"cover"};if(n===0||r===0)return;if(l==="focal"){var d=e.data("focal-point").split(","),v=50,m=49;i>=h?m=d[1]:v=d[0],p.backgroundPosition=v+"% "+m+"%"}else p.backgroundPosition=l;while(u=a.exec(f)){o=t.retinafyUrl(e.data("base")+u[1]+"."+e.data("extension"));if(u[2]>=n&&u[3]>=r)break}e.hasClass("k-lazy-loading-background")?e.attr("data-src",o):(o="url("+o+")",o&&o!==c&&(p.backgroundImage=o)),e.css(p)})},responsiveImages:function(){var e=$("img[data-presets]"),t=e.length,n=this,r,i,s,o,u,a,f,l,c,h=$.browser.msie||/Trident\/7\./.test(navigator.userAgent);$.each(e,function(e,t){t=$(t),typeof t.data("originalDom")=="object"&&(t=t.replaceWith(t.data("originalDom")),t.css("opacity",1))}),window.setTimeout(function(){e=$("img[data-presets]").filter(function(){return $(this).css("display")!=="none"&&$(this).css("visibility")!=="hidden"}),$.each(e,function(e,t){t=$(t),$(document).trigger("k-img-resize-start",t),typeof t.data("originalDom")=="object"&&(t=t.replaceWith(t.data("originalDom")));var r=t.data("presets"),i=t.attr("src")||"",a=h||t.css("width").indexOf("%")!==-1?0:parseInt(t.css("width"),10)||0,p=h||t.css("height").indexOf("%")!==-1?0:parseInt(t.css("height"),10)||0,d=0,v=t,m;a<10&&(a=0),p<10&&(p=0);while(d===0){v=v.parent();var g=v.css("display");if(g==="none")return;g!="inline"&&!v.attr("data-koken-ignore-responsive")&&(d=v.width())}c=v.css("box-sizing");var y=p>0?p:v.height(),b=t.css("max-height"),w=parseInt(t.css("max-height"),10);b.indexOf("%")!==-1&&(w=y*(w/100)),t.data("originalDom")||(a>0&&a!==d?(t.data("originalDom",t.clone()),d=Math.min(d,a)):t.data("originalDom","noreplace")),l=t.data("respond-to")||"width",isNaN(w)||(y=w,l==="width"&&(l=!1));var E=d/y,S,x=/([a-z_\.]+)\,([0-9]+)\,([0-9]+)/g;s=t.data("base"),o=t.data("extension"),cropTo=t.data("retain-aspect")||!1,t.attr("data-alt")&&(t.attr("alt",t.data("alt")),t.attr("data-alt",null));if(cropTo){var T=cropTo.split(":");E=T[0]/T[1],y=Math.round(d/E),t.attr("width",d),t.attr("height",y);var N=i.match(/[\,\/]([0-9]+)/);if(N){var C=Math.abs(d-N[1]);if(C/N[1]<.2)return}var k=Math.max(d,y),L={tiny:60,small:100,medium:480,medium_large:800,large:1024,xlarge:1600,huge:2048},A="",O=!1;$.each(L,function(e,t){if(k<=t){var n=t-k;if(!O||k-O>n)A=e;return!1}A=e,O=t}),A=$K.imageDefaults[A],i=s+d+"."+y+"."+A.quality+"."+Math.round(A.sharpening*100)+".crop."+o}else{var M=!1,_=!1,D=0;while(S=x.exec(r)){u=S[1].indexOf(".crop")!==-1,f=S[2]/S[3],i=s+S[1]+"."+o,M=_=!1;if(u){if(l==="width"){if(S[2]>=d){D=d;break}}else if(l==="height"||w){if(S[3]>=y){D=y;break}}else if(S[2]>=d&&S[3]>=y){D=Math.min(d,y);break}}else if(l==="width"){if(S[2]>=d){t.attr("width",d),t.attr("height",Math.ceil(d/f));break}}else if(l==="height"){if(S[3]>=y){t.attr("height",y),t.attr("width",Math.ceil(y*f));break}}else{if(f>=E&&S[2]>=d){t.attr("width",d),t.attr("height",d/f);break}if(f<E&&S[3]>=y){t.attr("height",y),t.attr("width",Math.ceil(y*f));break}}M=S[2],_=S[3]}u?(t.attr("width",D),t.attr("height",D)):M&&(l==="height"&&_<y&&(_=y,M=Math.ceil(y*f)),t.attr("width",M),t.attr("height",_))}i=n.retinafyUrl(i),(t.hasClass("k-lazy-loading")||t.hasClass("k-lazy-loaded"))&&i!==t.attr("src")?(t.removeClass("k-lazy-loaded"),t.addClass("k-lazy-loading"),t.attr("data-src",i),t.attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")):t.attr("src",i),$(document).trigger("k-img-resize",t)}),setTimeout(function(){$K.lazy.init(),$(window).trigger("k-resize")},1)},1)},infinity:{$target:!1,isLoading:!1,bttn:!1,next:function(){if($K.location.parameters.page<this.totalPages){$(window).trigger("k-infinite-loading"),$K.location.parameters.page++,this.isLoading=!0;var e=this,t=location.href.match(/&preview=.*/)||"";$.ajax({url:$K.location.root+$K.location.here.replace(/\/$/,"")+"/page/"+$K.location.parameters.page+"/"+t,success:function(t){e.$target.before($(t).find(".k-infinite-load").children()),e.isLoading=!1,$(window).trigger("k-infinite-loaded"),$K.ready(),e.check()}}),$K.location.parameters.page===this.totalPages&&this.bttn&&this.bttn.addClass("k-disabled")}},check:function(){this.$target&&!this.isLoading&&this.$target.prev().length&&this.$target.prev().offset().top<$(window).scrollTop()+$(window).height()&&this.next()},init:function(){if(this.$target)return;var e=$("span.k-infinite-load").first();if(e.length){e.append($("<br/>").css("display","none").addClass("k-infinite-marker")),e.replaceWith(e.html()),this.$target=$(".k-infinite-marker").first();if(this.selector!==""){var t=$(this.selector),n=this;this.bttn=t,t.length&&(this.totalPages>1?t.on("click",function(){n.next()}):t.remove())}}}},textPreview:function(e){var t=this.location.host+this.location.real_root_folder+"/admin/#/text/selection:"+e;$("<div/>").attr("id","k_essay_preview").html('You are previewing a draft of this essay. <a href="'+t+'" title="Return to the console">Go back and make edits</a>.').prependTo("body")},ready:function(){$("noscript").remove(),$("time.k-relative-time").timeago(),$K.responsiveImages(),$K.responsiveBackgrounds(),$K.loadImages(),$K.lazy.init(),$K.navigation.nest(),$K.infinity.init(),$K.keyboardBind(),$K.layout.mosaic(),$("img").off(".kjs").on("error.kjs",function(){var e=$(this),t=e.data("fails")||0;$K.lazy.working.splice($.inArray(e.attr("src"),$K.lazy.working),1),t<3&&(t++,e.attr("data-src")||e.attr("data-src",e.attr("src")),e.removeClass("k-lazy-loaded").addClass("k-lazy-loading"),setTimeout(function(){$K.lazy.init()},100),e.data("fails",t))}),$(window).off(".kjs");var e,t=$(window).add("body");$K.scrollContainer&&(t=t.add($($K.scrollContainer))),t.off(".kjs").on("scroll.kjs",function(){clearTimeout(e),e=setTimeout(function(){$K.lazy.load(),$K.infinity.bttn||$K.infinity.check(),$(window).trigger("k-scroll")},150)});var n;$(window).on("resize.kjs",function(){$K.resizeVideos(),clearTimeout(n),n=setTimeout(function(){$K.responsiveImages(),$K.responsiveBackgrounds(),$(window).trigger("k-resize")},250)}),$K.infinity.bttn||$K.infinity.check(),$(".k-content-embed").fitVids(),$(".k-content-embed iframe").show(),$(".k-select").off("change").on("change",function(){if($(this).val()==="__label__")return;$K.loadUrl($K.location.root+$(this).val()+($K.location.preview?"&preview="+$K.location.preview:""))});var r=RegExp("https?://"+location.host+$K.location.root_folder+"(/(index|preview).php\\?)?"),i=document.referrer.replace(r,"");i.indexOf("http:")===0&&(i=!1);if($K.location.urls.album){var s=RegExp($K.location.urls.album.replace(/:[a-z_]+/,"[^/]+")+"/lightbox/?$");s.test(i)&&(i=i.replace(/\/lightbox\/?$/,""))}/\/lightbox\/?$/.test(i)&&$.cookie("koken_referrer")?i=$.cookie("koken_referrer"):/\/lightbox\/?$/.test(i)||$.cookie("koken_referrer",i,{path:"/"}),$K.location.referrer=i,$(document).trigger("k-ready")}},$(document).ready(function(){(!window.Turbolinks||!window.Turbolinks.supported)&&$K.ready(),$(window).on("k-pjax-end",function(){var e=$("body").attr("class")||"";$("body").attr("class",e.replace(/k\-source\-([^\s]+)(\sk\-lens\-([^\s]+))?/,$K.location.page_class)),$K.navigation.setCurrent()}),$(window).on("pjax:transition:start pjax:transition:restore",function(){$K.ready()}),$(document).on("page:fetch pjax:start",function(){$(".mejs-container video").each(function(){$(this).parents("#pjax-container-staging").length===0&&(this.player.remove(),$(this).remove())}),$K.lazy.queue=[],$K.infinity.$target=!1,$K.pulse.teardown(),$(document).trigger("k-page-fetch")}),$(document).on("page:change",function(){$K.ready(),$(document).trigger("k-page-change")}),$(document).on("page:restore",function(){$(document).trigger("k-page-restore")})})}(),function(e){"use strict";e.fn.fitVids=function(t){var n={customSelector:null},r=document.createElement("div"),i=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];return r.className="fit-vids-style",r.innerHTML="&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>",e(".fit-vids-style").length<=0&&i.parentNode.insertBefore(r,i),t&&e.extend(n,t),this.each(function(){var t=["iframe[src*='player.vimeo.com']","iframe[src*='www.youtube.com']","iframe[src*='www.youtube-nocookie.com']","iframe[src*='www.kickstarter.com']","object","embed"];n.customSelector&&t.push(n.customSelector);var r=e(this).find(t.join(","));r.each(function(){var t=e(this);if(this.tagName.toLowerCase()==="embed"&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)return;var n=this.tagName.toLowerCase()==="object"||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height(),r=t.attr("width"),i=isNaN(parseInt(r,10))?t.width():parseInt(r,10),s=n/i;if(!t.attr("id")){var o="fitvid"+Math.floor(Math.random()*999999);t.attr("id",o)}t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",s*100+"%"),r&&t.parent(".fluid-width-video-wrapper").wrap('<div class="k-video max-width-video-wrapper"></div>').parent(".max-width-video-wrapper").css("max-width",r+"px"),t.removeAttr("height").removeAttr("width")})})}}(jQuery),function(e){function t(e,t){var n=e.length;while(n--)if(e[n]===t)return n;return-1}function n(e,t){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function r(e){for(b in E)E[b]=e[k[b]]}function i(e,n){var i,s,o,a,f;i=e.keyCode,t(C,i)==-1&&C.push(i);if(i==93||i==224)i=91;if(i in E){E[i]=!0;for(o in x)x[o]==i&&(u[o]=!0);return}r(e);if(!u.filter.call(this,e))return;if(!(i in w))return;for(a=0;a<w[i].length;a++){s=w[i][a];if(s.scope==n||s.scope=="all"){f=s.mods.length>0;for(o in E)if(!E[o]&&t(s.mods,+o)>-1||E[o]&&t(s.mods,+o)==-1)f=!1;(s.mods.length==0&&!E[16]&&!E[18]&&!E[17]&&!E[91]||f)&&s.method(e,s)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}}function s(e){var n=e.keyCode,r,i=t(C,n);i>=0&&C.splice(i,1);if(n==93||n==224)n=91;if(n in E){E[n]=!1;for(r in x)x[r]==n&&(u[r]=!1)}}function o(){for(b in E)E[b]=!1;for(b in x)u[b]=!1}function u(e,t,n){var r,i,s,o;r=v(e),n===undefined&&(n=t,t="all");for(s=0;s<r.length;s++)i=[],e=r[s].split("+"),e.length>1&&(i=m(e),e=[e[e.length-1]]),e=e[0],e=N(e),e in w||(w[e]=[]),w[e].push({shortcut:r[s],scope:t,method:n,key:r[s],mods:i})}function a(e,t){var r=e.split("+"),i=[],s,o;r.length>1&&(i=m(r),e=r[r.length-1]),e=N(e),t===undefined&&(t=p());if(!w[e])return;for(s in w[e])o=w[e][s],o.scope===t&&n(o.mods,i)&&(w[e][s]={})}function f(e){return typeof e=="string"&&(e=N(e)),t(C,e)!=-1}function l(){return C.slice(0)}function c(e){var t=(e.target||e.srcElement).tagName;return t!="INPUT"&&t!="SELECT"&&t!="TEXTAREA"}function h(e){S=e||"all"}function p(){return S||"all"}function d(e){var t,n,r;for(t in w){n=w[t];for(r=0;r<n.length;)n[r].scope===e?n.splice(r,1):r++}}function v(e){var t;return e=e.replace(/\s/g,""),t=e.split(","),t[t.length-1]==""&&(t[t.length-2]+=","),t}function m(e){var t=e.slice(0,e.length-1);for(mi=0;mi<t.length;mi++)t[mi]=x[t[mi]];return t}function g(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,function(){n(window.event)})}function y(){var t=e.key;return e.key=L,t}var b,w={},E={16:!1,18:!1,17:!1,91:!1},S="all",x={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},T={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},N=function(e){return T[e]||e.toUpperCase().charCodeAt(0)},C=[];for(b=1;b<20;b++)T["f"+b]=111+b;var k={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(b in x)u[b]=!1;g(document,"keydown",function(e){i(e,S)}),g(document,"keyup",s),g(window,"focus",o);var L=e.key;e.key=u,e.key.setScope=h,e.key.getScope=p,e.key.deleteScope=d,e.key.filter=c,e.key.isPressed=f,e.key.getPressedKeyCodes=l,e.key.noConflict=y,e.key.unbind=a,typeof module!="undefined"&&(module.exports=key)}(this),function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){e.indexOf('"')===0&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return s.json?JSON.parse(e):e}catch(t){}}var t=/\+/g,s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires=="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}return o=s.json?JSON.stringify(o):String(o),document.cookie=[s.raw?t:encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r,c=document.cookie.split("; "),h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("="),m=l(v.shift()),g=l(v.join("="));if(t&&t===m){h=i(g);break}t||(h[m]=i(g))}return h};s.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==undefined?(e.cookie(t,"",e.extend(n,{expires:-1})),!0):!1}}(jQuery),function(e){function n(){var t=r(this);return isNaN(t.datetime)||e(this).text(i(t.datetime)),this}function r(n){n=e(n);if(!n.data("timeago")){n.data("timeago",{datetime:t.datetime(n)});var r=e.trim(n.text());r.length>0&&n.attr("title",r)}return n.data("timeago")}function i(e){return t.inWords(s(e))}function s(e){return(new Date).getTime()-e.getTime()}e.timeago=function(t){return t instanceof Date?i(t):typeof t=="string"?i(e.timeago.parse(t)):i(e.timeago.datetime(t))};var t=e.timeago;e.extend(e.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(t){function l(r,i){var s=e.isFunction(r)?r(i,t):r,o=n.numbers&&n.numbers[i]||i;return s.replace(/%d/i,o)}var n=this.settings.strings,r=n.prefixAgo,i=n.suffixAgo;this.settings.allowFuture&&t<0&&(r=n.prefixFromNow,i=n.suffixFromNow);var s=Math.abs(t)/1e3,o=s/60,u=o/60,a=u/24,f=a/365,c=s<45&&l(n.seconds,Math.round(s))||s<90&&l(n.minute,1)||o<45&&l(n.minutes,Math.round(o))||o<90&&l(n.hour,1)||u<24&&l(n.hours,Math.round(u))||u<42&&l(n.day,1)||a<30&&l(n.days,Math.round(a))||a<45&&l(n.month,1)||a<365&&l(n.months,Math.round(a/30))||f<1.5&&l(n.year,1)||l(n.years,Math.round(f));return e.trim([r,c,i].join(n.wordSeparator))},parse:function(t){var n=e.trim(t);return n=n.replace(/\.\d\d\d+/,""),n=n.replace(/-/,"/").replace(/-/,"/"),n=n.replace(/T/," ").replace(/Z/," UTC"),n=n.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(n)},datetime:function(n){var r=e(n).get(0).tagName.toLowerCase()==="time",i=r?e(n).attr("datetime"):e(n).attr("title");return t.parse(i)}}),e.fn.timeago=function(){var e=this;e.each(n);var r=t.settings;return r.refreshMillis>0&&setInterval(function(){e.each(n)},r.refreshMillis),e},document.createElement("abbr"),document.createElement("time")}(jQuery);$K.location = {"root":"","root_folder":"","real_root_folder":"\/koken","rewrite":true,"host":"http:\/\/roymurdock.com","hostname":"roymurdock.com","site_url":"http:\/\/roymurdock.com","preview":false,"theme_path":"\/koken\/storage\/themes\/madison","urls":{"archive_contents":"\/content\/:year(?:\/:month(?:\/:day)?)?\/","tag_contents":"\/tags\/:slug\/content\/","category_contents":"\/categories\/:slug\/content\/","contents":"\/content\/","favorites":"\/favorites\/","album":"\/albums\/:slug\/","tag_album":"\/tags\/:tag_slug\/albums\/:slug\/","category_album":"\/categories\/:category_slug\/albums\/:slug\/","essay":"\/essays\/:year\/:month\/:slug\/","tag_essay":"\/tags\/:tag_slug\/essays\/:slug\/","category_essay":"\/categories\/:category_slug\/essays\/:slug\/","archive_essays":"\/essays\/:year(?:\/:month(?:\/:day)?)?\/","tag_essays":"\/tags\/:slug\/essays\/","category_essays":"\/categories\/:slug\/essays\/","essays":"\/essays\/","page":"\/pages\/:slug\/","tag":"\/tags\/:slug\/","category":"\/categories\/:slug\/","timeline":"\/timeline\/","archive_timeline":"\/timeline\/:year(?:\/:month)?\/","event_timeline":"\/timeline\/:year\/:month\/:day\/","tag_albums":"\/tags\/:slug\/","category_albums":"\/categories\/:slug\/","archive_albums":"\/timeline\/:year\/:month\/:day\/"}};$K.lazy.max = 4;$K.imageDefaults = {"tiny":{"quality":"80","sharpening":"0.7"},"small":{"quality":"80","sharpening":"0.6"},"medium":{"quality":"85","sharpening":"0.6"},"medium_large":{"quality":"85","sharpening":"0.6"},"large":{"quality":"85","sharpening":"0.6"},"xlarge":{"quality":"90","sharpening":"0.3"},"huge":{"quality":"90","sharpening":"0"}};$K.theme = 'madison';$K.retinaEnabled = true;
(function(){window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){setTimeout(e,16)}})(),jQuery.extend(jQuery.easing,{def:"ease-in-out",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},"ease-in":function(e,t,n,r,i){return r*(t/=i)*t+n},"ease-out":function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},"ease-in-out":function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t+n:-r/2*(--t*(t-2)-1)+n}});var Pulse=function(){var P={};with(this){(function(e){typeof define=="function"&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)})(function(e){function N(t){return t&&t.allowPageScroll===undefined&&(t.swipe!==undefined||t.swipeStatus!==undefined)&&(t.allowPageScroll=u),t.click!==undefined&&t.tap===undefined&&(t.tap=t.click),t||(t={}),t=e.extend({},e.fn.swipe.defaults,t),this.each(function(){var n=e(this),r=n.data(x);r||(r=new C(this,t),n.data(x,r))})}function C(T,N){function nt(t){if(jt())return;if(e(t.target).closest(N.excludedElements,X).length>0)return;var n=t.originalEvent?t.originalEvent:t,r,i=S?n.touches[0]:n;V=y,S?$=n.touches.length:t.preventDefault(),P=0,H=null,z=null,B=0,F=0,I=0,R=1,U=0,J=Ut(),W=Xt(),Ht();if(!S||$===N.fingers||N.fingers===m||gt()){It(0,i),K=en(),$==2&&(It(1,n.touches[1]),F=I=Jt(J[0].start,J[1].start));if(N.swipeStatus||N.pinchStatus)r=ft(n,V)}else r=!1;return r===!1?(V=E,ft(n,V),r):(Ft(!0),null)}function rt(e){var t=e.originalEvent?e.originalEvent:e;if(V===w||V===E||Bt())return;var n,r=S?t.touches[0]:t,i=qt(r);Q=en(),S&&($=t.touches.length),V=b,$==2&&(F==0?(It(1,t.touches[1]),F=I=Jt(J[0].start,J[1].start)):(qt(t.touches[1]),I=Jt(J[0].end,J[1].end),z=Qt(J[0].end,J[1].end)),R=Kt(F,I),U=Math.abs(F-I));if($===N.fingers||N.fingers===m||!S||gt()){H=Zt(i.start,i.end),vt(e,H),P=Gt(i.start,i.end),B=$t(),zt(H,P);if(N.swipeStatus||N.pinchStatus)n=ft(t,V);if(!N.triggerOnTouchEnd||N.triggerOnTouchLeave){var s=!0;if(N.triggerOnTouchLeave){var o=tn(this);s=nn(i.end,o)}!N.triggerOnTouchEnd&&s?V=at(b):N.triggerOnTouchLeave&&!s&&(V=at(w)),(V==E||V==w)&&ft(t,V)}}else V=E,ft(t,V);n===!1&&(V=E,ft(t,V))}function it(e){var t=e.originalEvent;return S&&t.touches.length>0?(Pt(),!0):(Bt()&&($=Y),e.preventDefault(),Q=en(),B=$t(),ht()?(V=E,ft(t,V)):N.triggerOnTouchEnd||N.triggerOnTouchEnd==0&&V===b?(V=w,ft(t,V)):!N.triggerOnTouchEnd&&Tt()?(V=w,lt(t,V,c)):V===b&&(V=E,ft(t,V)),Ft(!1),null)}function st(){$=0,Q=0,K=0,F=0,I=0,R=1,Ht(),Ft(!1)}function ot(e){var t=e.originalEvent;N.triggerOnTouchLeave&&(V=at(w),ft(t,V))}function ut(){X.unbind(L,nt),X.unbind(D,st),X.unbind(O,rt),X.unbind(M,it),_&&X.unbind(_,ot),Ft(!1)}function at(e){var t=e,n=dt(),r=ct(),i=ht();return!n||i?t=E:r&&e==b&&(!N.triggerOnTouchEnd||N.triggerOnTouchLeave)?t=w:!r&&e==w&&N.triggerOnTouchLeave&&(t=E),t}function ft(e,t){var n=undefined;return Et()||wt()?n=lt(e,t,f):(yt()||gt())&&n!==!1&&(n=lt(e,t,l)),_t()&&n!==!1?n=lt(e,t,h):Dt()&&n!==!1?n=lt(e,t,p):Mt()&&n!==!1&&(n=lt(e,t,c)),t===E&&st(e),t===w&&(S?e.touches.length==0&&st(e):st(e)),n}function lt(u,a,d){var v=undefined;if(d==f){X.trigger("swipeStatus",[a,H||null,P||0,B||0,$]);if(N.swipeStatus){v=N.swipeStatus.call(X,u,a,H||null,P||0,B||0,$);if(v===!1)return!1}if(a==w&&bt()){X.trigger("swipe",[H,P,B,$]);if(N.swipe){v=N.swipe.call(X,u,H,P,B,$);if(v===!1)return!1}switch(H){case t:X.trigger("swipeLeft",[H,P,B,$]),N.swipeLeft&&(v=N.swipeLeft.call(X,u,H,P,B,$));break;case n:X.trigger("swipeRight",[H,P,B,$]),N.swipeRight&&(v=N.swipeRight.call(X,u,H,P,B,$));break;case r:X.trigger("swipeUp",[H,P,B,$]),N.swipeUp&&(v=N.swipeUp.call(X,u,H,P,B,$));break;case i:X.trigger("swipeDown",[H,P,B,$]),N.swipeDown&&(v=N.swipeDown.call(X,u,H,P,B,$))}}}if(d==l){X.trigger("pinchStatus",[a,z||null,U||0,B||0,$,R]);if(N.pinchStatus){v=N.pinchStatus.call(X,u,a,z||null,U||0,B||0,$,R);if(v===!1)return!1}if(a==w&&mt())switch(z){case s:X.trigger("pinchIn",[z||null,U||0,B||0,$,R]),N.pinchIn&&(v=N.pinchIn.call(X,u,z||null,U||0,B||0,$,R));break;case o:X.trigger("pinchOut",[z||null,U||0,B||0,$,R]),N.pinchOut&&(v=N.pinchOut.call(X,u,z||null,U||0,B||0,$,R))}}if(d==c){if(a===E||a===w)clearTimeout(et),Nt()&&!Lt()?(Z=en(),et=setTimeout(e.proxy(function(){Z=null,X.trigger("tap",[u.target]),N.tap&&(v=N.tap.call(X,u,u.target))},this),N.doubleTapThreshold)):(Z=null,X.trigger("tap",[u.target]),N.tap&&(v=N.tap.call(X,u,u.target)))}else if(d==h){if(a===E||a===w)clearTimeout(et),Z=null,X.trigger("doubletap",[u.target]),N.doubleTap&&(v=N.doubleTap.call(X,u,u.target))}else d==p&&(a===E||a===w)&&(clearTimeout(et),Z=null,X.trigger("longtap",[u.target]),N.longTap&&(v=N.longTap.call(X,u,u.target)));return v}function ct(){var e=!0;return N.threshold!==null&&(e=P>=N.threshold),e}function ht(){var e=!1;return N.cancelThreshold!==null&&H!==null&&(e=Wt(H)-P>=N.cancelThreshold),e}function pt(){return N.pinchThreshold!==null?U>=N.pinchThreshold:!0}function dt(){var e;return N.maxTimeThreshold?B>=N.maxTimeThreshold?e=!1:e=!0:e=!0,e}function vt(e,s){if(N.allowPageScroll===u||gt())e.preventDefault();else{var o=N.allowPageScroll===a;switch(s){case t:(N.swipeLeft&&o||!o&&N.allowPageScroll!=d)&&e.preventDefault();break;case n:(N.swipeRight&&o||!o&&N.allowPageScroll!=d)&&e.preventDefault();break;case r:(N.swipeUp&&o||!o&&N.allowPageScroll!=v)&&e.preventDefault();break;case i:(N.swipeDown&&o||!o&&N.allowPageScroll!=v)&&e.preventDefault()}}}function mt(){var e=St(),t=xt(),n=pt();return e&&t&&n}function gt(){return!!(N.pinchStatus||N.pinchIn||N.pinchOut)}function yt(){return!!mt()&&!!gt()}function bt(){var e=dt(),t=ct(),n=St(),r=xt(),i=ht(),s=!i&&r&&n&&t&&e;return s}function wt(){return!!(N.swipe||N.swipeStatus||N.swipeLeft||N.swipeRight||N.swipeUp||N.swipeDown)}function Et(){return!!bt()&&!!wt()}function St(){return $===N.fingers||N.fingers===m||!S}function xt(){return J[0].end.x!==0}function Tt(){return!!N.tap}function Nt(){return!!N.doubleTap}function Ct(){return!!N.longTap}function kt(){if(Z==null)return!1;var e=en();return Nt()&&e-Z<=N.doubleTapThreshold}function Lt(){return kt()}function At(){return($===1||!S)&&(isNaN(P)||P===0)}function Ot(){return B>N.longTapThreshold&&P<g}function Mt(){return!!At()&&!!Tt()}function _t(){return!!kt()&&!!Nt()}function Dt(){return!!Ot()&&!!Ct()}function Pt(){G=en(),Y=event.touches.length+1}function Ht(){G=0,Y=0}function Bt(){var e=!1;if(G){var t=en()-G;t<=N.fingerReleaseThreshold&&(e=!0)}return e}function jt(){return X.data(x+"_intouch")===!0}function Ft(e){e===!0?(X.bind(O,rt),X.bind(M,it),_&&X.bind(_,ot)):(X.unbind(O,rt,!1),X.unbind(M,it,!1),_&&X.unbind(_,ot,!1)),X.data(x+"_intouch",e===!0)}function It(e,t){var n=t.identifier!==undefined?t.identifier:0;return J[e].identifier=n,J[e].start.x=J[e].end.x=t.pageX||t.clientX,J[e].start.y=J[e].end.y=t.pageY||t.clientY,J[e]}function qt(e){var t=e.identifier!==undefined?e.identifier:0,n=Rt(t);return n.end.x=e.pageX||e.clientX,n.end.y=e.pageY||e.clientY,n}function Rt(e){for(var t=0;t<J.length;t++)if(J[t].identifier==e)return J[t]}function Ut(){var e=[];for(var t=0;t<=5;t++)e.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return e}function zt(e,t){t=Math.max(t,Wt(e)),W[e].distance=t}function Wt(e){return W[e]?W[e].distance:undefined}function Xt(){var e={};return e[t]=Vt(t),e[n]=Vt(n),e[r]=Vt(r),e[i]=Vt(i),e}function Vt(e){return{direction:e,distance:0}}function $t(){return Q-K}function Jt(e,t){var n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return Math.round(Math.sqrt(n*n+r*r))}function Kt(e,t){var n=t/e*1;return n.toFixed(2)}function Qt(){return R<1?o:s}function Gt(e,t){return Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))}function Yt(e,t){var n=e.x-t.x,r=t.y-e.y,i=Math.atan2(r,n),s=Math.round(i*180/Math.PI);return s<0&&(s=360-Math.abs(s)),s}function Zt(e,s){var o=Yt(e,s);return o<=45&&o>=0?t:o<=360&&o>=315?t:o>=135&&o<=225?n:o>45&&o<135?i:r}function en(){var e=new Date;return e.getTime()}function tn(t){t=e(t);var n=t.offset(),r={left:n.left,right:n.left+t.outerWidth(),top:n.top,bottom:n.top+t.outerHeight()};return r}function nn(e,t){return e.x>t.left&&e.x<t.right&&e.y>t.top&&e.y<t.bottom}var C=S||!N.fallbackToMouseEvents,L=C?"touchstart":"mousedown",O=C?"touchmove":"mousemove",M=C?"touchend":"mouseup",_=C?null:"mouseleave",D="touchcancel",P=0,H=null,B=0,F=0,I=0,R=1,U=0,z=0,W=null,X=e(T),V="start",$=0,J=null,K=0,Q=0,G=0,Y=0,Z=0,et=null;try{X.bind(L,nt),X.bind(D,st)}catch(tt){e.error("events not supported "+L+","+D+" on jQuery.swipe")}this.enable=function(){return X.bind(L,nt),X.bind(D,st),X},this.disable=function(){return ut(),X},this.destroy=function(){return ut(),X.data(x,null),X},this.option=function(t,n){if(N[t]!==undefined){if(n===undefined)return N[t];N[t]=n}else e.error("Option "+t+" does not exist on jQuery.swipe.options");return null}}var t="left",n="right",r="up",i="down",s="in",o="out",u="none",a="auto",f="swipe",l="pinch",c="tap",h="doubletap",p="longtap",d="horizontal",v="vertical",m="all",g=10,y="start",b="move",w="end",E="cancel",S="ontouchstart"in window,x="TouchSwipe",T={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(t){var n=e(this),r=n.data(x);if(r&&typeof t=="string"){if(r[t])return r[t].apply(this,Array.prototype.slice.call(arguments,1));e.error("Method "+t+" does not exist on jQuery.swipe")}else if(!r&&(typeof t=="object"||!t))return N.apply(this,arguments);return n},e.fn.swipe.defaults=T,e.fn.swipe.phases={PHASE_START:y,PHASE_MOVE:b,PHASE_END:w,PHASE_CANCEL:E},e.fn.swipe.directions={LEFT:t,RIGHT:n,UP:r,DOWN:i,IN:s,OUT:o},e.fn.swipe.pageScroll={NONE:u,HORIZONTAL:d,VERTICAL:v,AUTO:a},e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:m}});var _ns={},_handles="fullscreen item itemnext contentclick contentmouseover contentmousemove contentmouseout dataloaded hasloaded waiting transition transitionstart transitionend playing built playbacktimer resizecomplete ended start ready videobegin videoend",_id,_bind=function(e){var t=this;if(_handles.indexOf(e.type)<0)return;this.contentContainer.bind(e.type,function(n,r){typeof r=="boolean"||r instanceof Array?n=r:n=$.extend({},n,r);if(e.type==t.triggered){if(!e.fn)return;if(e.type==="transition")e.fn.call(t.container,{current:t.last,next:t.current,forward:t.forward},e.type);else if(e.type==="playing")e.fn.call(t.container,t.state==="playing"?!0:!1,e.type);else{if(n.nodeType&&e.type==="transitionend")return;e.fn.call(t.container,n.nodeType?$(n):n,e.type)}}})},_queue=function(e){e=e||!1;var t=[],n=this;return{add:function(e){return t.push(e),this},load:function(){var r=t.length;for(var i=0;i<r;i++){var s=t[i],o=s.priority||n.loadQueue.internal.length;delete s.priority,e?(s.node.bind("load",function(){_popQueue.call(n)}),n.loadQueue.external.push(s)):o===1?n.loadQueue.internal.unshift(s):n.loadQueue.internal.splice(o,0,s)}t=[],_popQueue.call(n)}}},_popQueue=function(){var e=this.loadQueue.internal.shift();if(!e){if(!this.loadQueue.canLoadExternal)return;e=this.loadQueue.external.shift()}e?e.node?e.node.attr("src",e.src):_popQueue.call(this):(clearInterval(this.loadQueue.interval),this.loadQueue.interval=!1)},_hasLoaded=function(e){var t=e.parent("div.pulse-content-container"),n;t.length&&t.data("asset")&&(n=t.data("asset").index),e.addClass("loaded"),n===this.options.index&&t.parent("div").css("opacity")==0&&(this.contentContainer.trigger(this.triggered="waiting",[!1]),_display.call(this)),this.contentContainer.trigger(this.triggered="hasloaded"),_popQueue.call(this)},_loadItemById=function(e){_pause.call(this);var t=this.idMap[e];t<this.options.index?t=-(this.options.index-t):t-=this.options.index,_update.call(this,t)},_get=function(e){return this.contentContainer.find('div[data-pulse-container="'+e+'"]')},_pause=function(){this.state="paused",clearTimeout(this.playTimer.id),this.contentContainer.trigger(this.triggered="playing")},_play=function(){this.state="playing",_update.call(this,1),this.contentContainer.trigger(this.triggered="playing")},_options=function(){return this.options},_toggle=function(e,t){this.firstTime=!1,this.state=="playing"?_pause.call(this):_play.call(this)},_toggleFullScreen=function(){var e=Pulse.fullScreenApi;if(e.isFullScreen())this.lastHeight&&this.contentContainer.css("height",this.lastHeight),e.cancelFullScreen(),this.contentContainer.trigger(this.triggered="fullscreen",[!1]);else{this.lastHeight=this.contentContainer.css("height");var t=this.container.children(":not(.pulse-main-container)").height();this.contentContainer.css("height","-webkit-calc(100% - "+t+"px)"),this.contentContainer.css("height","-moz-calc(100% - "+t+"px)"),this.contentContainer.css("height","-ms-calc(100% - "+t+"px)"),this.contentContainer.css("height","-o-calc(100% - "+t+"px)"),this.contentContainer.css("height","calc(100% - "+t+"px)"),e.requestFullScreen(this.options.fullScreenRoot[0]),this.contentContainer.trigger(this.triggered="fullscreen",[!0])}},_startPlaybackTimer=function(){if(typeof this.firstTime=="undefined"&&!this.options.autostart){this.firstTime=!1;return}if(this.state==="playing"){var e=this,t=+(new Date),n={total:this.options.speed};this.playTimer.remaining=this.playTimer.remaining||this.options.speed,clearInterval(this.playTimer.id),this.playTimer.id=setInterval(function(){var r=+(new Date);e.playTimer.remaining-=r-t,t=r,n.remaining=Math.max(e.playTimer.remaining,0),n.totalItems=e.totalItems,e.contentContainer.trigger(e.triggered="playbacktimer",n),e.playTimer.remaining<=0&&_update.call(e,1)},50)}},_exists=function(e){var t=$.inArray(e,this.handlers);return t===-1?!1:this.handlers[t]},_loadPreset=function(e,t){t=t||!1;var n={width:e.width(),height:e.height()},r=!1,i=e.data("asset"),s={},o=e.find("img"),u=Math.max(Math.abs(this.options.index-i.index),1),a;e.removeClass("loaded");for(var f in i.presets){a=i.presets[f];if(this.options.size==="expand"&&a.width>n.width||a.width>n.width&&a.height>n.height){r=window.$K&&$K.isRetina()?a.hidpi_url:a.url,s.width=a.width,s.height=a.height;break}}r||(r=$K.isRetina()?a.hidpi_url:a.url),e.data("size",s);var l={node:o,src:r,priority:u};if(!t)return l;_queue.call(this).add(l).load()},_load=function(){var e=[this.loaded[this.options.index].id],t=this,n,r;for(i=1;i<=this.cushion;i++)n=this.options.index-i,n<0&&(n=this.loaded.length+n),this.loaded[n]&&(_get.call(this,this.loaded[n].id).length<=0&&this.contentContainer.append(_build.call(this,n)),e.push(this.loaded[n].id));_get.call(this,this.loaded[this.options.index].id).length<=0&&this.contentContainer.append(_build.call(this,this.options.index));for(i=1;i<=this.cushion;i++)r=this.options.index+i,r>=this.loaded.length&&(r-=this.loaded.length),this.loaded[r]&&(_get.call(this,this.loaded[r].id).length<=0&&this.contentContainer.append(_build.call(this,r)),e.push(this.loaded[r].id));var s=_queue.call(this);this.contentContainer.find("div.pulse-content-container").each(function(){var n=$(this),r=n.find("img"),i=n.data("asset"),o=n.parent(),u=i&&i.id;$.inArray(u,e)===-1?(r.attr("src",""),o.remove()):r.hasClass("loaded")||s.add(_loadPreset.call(t,n))}),s.load()},_ratio=function(e,t){t&&(this.realDims={width:e.parents("div").width(),height:e.parents("div").height()},e=e.data("asset"));var n=this.options.size!=="expand"||this.options.maxHeight===Infinity?this.realDims.height:this.options.maxHeight;return this.containerRatio=this.containerRatio&&this.containerRatio<Infinity?this.containerRatio:this.realDims.width/n,e.aspect_ratio>=this.containerRatio?{w:this.realDims.width,h:Math.round(this.realDims.width/e.aspect_ratio)}:{w:Math.round(n*e.aspect_ratio),h:n}},_kill=function(){this.dead=!0,this.contentContainer.off(),this.state="paused",clearInterval(this.loadQueue.interval),clearTimeout(this.playTimer.id);var e=this.container.attr("id");delete _ns[e],$.each(_ns.all,function(t,n){n&&n.container.attr("id")===e&&_ns.all.splice(t,1)})},_update=function(e){if(this.transitioning)return;var t=parseInt(this.options.index,10)+e;clearInterval(this.playTimer.id),this.playTimer.remaining=!1,e<0?(_pause.call(this),this.forward=!1):this.forward=!0;if(this.loaded.length<=1||this.options&&typeof this.options.loop!="undefined"&&this.options.loop===!1&&t>=this.loaded.length){this.contentContainer.trigger(this.triggered="ended");return}this.options.index=t<0?this.loaded.length-1:t>=this.loaded.length?0:t;var n=_get.call(this,this.loaded[this.options.index].id);n.length?n.find("img").hasClass("loaded")?_display.call(this):_loadPreset.call(this,n.find("div.pulse-content-container"),!0):(this.contentContainer.trigger(this.triggered="waiting",[!0]),n=_build.call(this,this.options.index),this.contentContainer.append(n),_loadPreset.call(this,n.find("div.pulse-content-container"),!0))},_getItem=function(){return this.currentData},_getNextItem=function(){var e=this.options.index+1;return e>=this.loaded.length&&this.options.loop===!0&&(e=0),this.loaded[e]||!1},_display=function(){var e=this;this.transitioning=!0,this.current&&this.current.css("z-index",9),this.currentData=this.loaded[this.options.index],this.current=_get.call(this,this.currentData.id);if(this.options.size==="expand"){var t=Math.min(this.options.maxHeight,this.realDims.width/this.currentData.aspect_ratio);this.contentContainer.animate({height:t},this.realDims.height===0||this.options.transition_type==="none"?0:this.options.transition_duration),this.realDims.height=t}this.current.css("z-index",10),this.last?(this.last.find(".video-container").css({left:-1e4}),this.last.find("img").show()):this.options.autostart===!0&&(this.state="playing",this.contentContainer.trigger(this.triggered="playing")),this.contentContainer.trigger(this.triggered="transitionstart",{dom:this.current,data:this.currentData}),this.contentContainer.trigger(this.triggered="itemnext",{dom:this.current,data:this.currentData});if(this.options.next&&!this.options.loop){var n=$(this.options.next);n.length&&(this.currentData.is_last?n.addClass("k-pulse-button-disabled"):n.removeClass("k-pulse-button-disabled"))}if(this.options.previous&&!this.options.loop){var r=$(this.options.previous);r.length&&(this.currentData.is_first?r.addClass("k-pulse-button-disabled"):r.removeClass("k-pulse-button-disabled"))}this.loadQueue.canLoadExternal=!0,this.contentContainer.trigger(this.triggered="transition",this.current),this.last=this.current},_build=function(e){var t=this.loaded[e],n=$('<div data-pulse-container="'+t.id+'" />'),r=$("<div />"),i=$("<img />"),s=this,o,u;t.index=e,t.position=e+1,t.total=this.totalItems,t.is_first=t.position===1,t.is_last=t.position===this.totalItems,n.css({position:"absolute",background:this.options.background,width:"100%",height:"100%",top:0,left:0,right:"auto",bottom:"auto",opacity:0,margin:0,padding:0,border:0,overflow:"hidden",zIndex:9});var a=_position.call(this,t);r.addClass("pulse-content-container").css({position:"absolute",width:a.width,height:a.height,left:a.left,top:a.top}).data("asset",t),i.attr({alt:t.title||t.filename,width:"100%",height:"100%"}).css({position:"absolute",top:0,left:0}).one("load",function(){_hasLoaded.call(s,$(this))}),r.append(i);if(t.file_type==="video"){r.append($("<div/>").addClass("mejs-overlay-button").css({cursor:"pointer"}).bind("mousedown",function(e){e.preventDefault(),e.stopPropagation();var o=r.find(".video-container"),u=o.find("video")[0].player;u.setCurrentTime(0),u.play(),o.css("left",0),i.hide(),o.data("resume",s.state==="playing"),_pause.call(s),s.contentContainer.trigger(s.triggered="videobegin"),_crop.call(s,t.aspect_ratio)&&r.find(".mejs-controls").css({width:n.width(),left:Math.abs(s.realDims.width/2-n.find(".pulse-content-container").width()/2)})}));var f=$("<video/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%"}).attr({width:"100%",height:"100%",src:t.original.url}),l=$("<div/>").addClass("video-container").css({position:"absolute",top:0,left:-1e4,width:"100%",height:"100%"});l.append(f),r.append(l),requestAnimationFrame(function(){var e=$(f).mediaelementplayer({success:function(e){e.addEventListener("ended",function(){s.current.find(".video-container").data("resume")&&(_update.call(s,1),s.state="playing"),s.contentContainer.trigger(s.triggered="videoend")})}})})}return n.append(r),this.contentContainer.trigger(this.triggered="built",{dom:n,data:t}),n},_data=function(e){e=e||!1;var t=function(e){if(!e.content)if(e.covers)e.content=e.covers;else{if(!e.albums)return;var t=[];$.each(e.albums,function(e,n){t.push(n.covers[0])}),e.content=t}this.options.index>e.total-1&&(this.options.index=0),this.options.order==="random"&&e.content.sort(function(){return.5-Math.random()});if(e.total===0){this.contentContainer.trigger(this.triggered="dataloaded",{items:!1,source:e.site_link||!1}),this.options.fallbackText?(this.container.html('<span class="k-note k-note-pulse" style="display:block;">'+this.options.fallbackText+"</span>"),this.container.get(0).style.height.length&&this.container.find(".k-note").css("line-height",this.container.outerHeight(!0)+"px"),this.container.addClass("k-pulse-no-data")):this.options.fallbackElement&&(this.container.hide(),this.options.fallbackElement.show());return}var n=!1,r=!1;if(this.totalItems===0){if(e.album||e.albums)this.options.can_link_to_album=!0;this.options.link_to==="album"&&e.album&&(this.options.link_to=e.album.__koken_url),this.options.link_to==="album"&&e.albums&&(this.originalData=e,this.options.link_to="albums"),this.options.dataUrl.match(/limit:[0-9]+/)?(r=!0,this.totalItems=e.content.count):this.totalItems=e.total,this.cushion=Math.max(this.totalItems<this.cushion*2+1?Math.floor((this.totalItems-.5)/2):this.cushion,1),n=!0}var i,s;for(i=0,s=e.content.length;i<s;i++)e.content[i].presets&&(this.loaded.push(e.content[i]),this.idMap[e.content[i].id]=this.loaded.length-1);if(this.options.size==="auto"){var o=0,u=0;$.each(e.content,function(e,t){if(isNaN(t.aspect_ratio))return;o+=t.aspect_ratio,u++});var a=o/u,f,l=Infinity,c=["1:10","2:10","3:10","4:10","5:10","6:10","7:10","8:10","9:10","10:10","10:9","10:8","10:7","10:6","10:5","10:4","10:3","10:2","10:1","4:3","3:4","3:2","2:3","1:1","16:9"];$.each(c,function(e,t){var n=t.split(":"),r=n[0]/n[1],i=Math.abs(a-r);i<l&&(f=t,l=i)}),this.options.size=f,_setSize.call(this),_resize.call(this)}this.contentContainer.trigger(this.triggered="dataloaded",{items:e.content,source:e.site_link||!1}),n&&(this.options.album_type=e.album?e.album.album_type:e.album_type?e.album_type:!1,this.options.album_id=e.album?e.album.id:e.id?e.id:!1,this.contentContainer.trigger(this.triggered="waiting",[!0]),_load.call(this),this.contentContainer.trigger(this.triggered="ready",this.container)),e.page<e.pages&&!r&&(this.options.dataUrl=this.options.dataUrl.replace(/\/page:[0-9]+/,"")+"/page:"+(e.page+1),_data.call(this))};if(e)t.call(this,e);else{var n=this;$.ajax({url:this.options.dataUrl,dataType:"json",success:function(e){t.call(n,e)}})}},_event=function(e,t,n,r){var i=this;$(document).on(t,e,{},function(e){this.forward=r<0?!1:!0,n.call(i,r,e),e.preventDefault()})},_resizePresets=function(){var e=_queue.call(this),t=this;this.contentContainer.find("div.pulse-content-container").each(function(){var n=$(this),r=n.data("size");typeof r=="object"&&(t.realDims.width>r.width||t.realDims.height>r.height)&&e.add(_loadPreset.call(t,n))}),e.load()},_position=function(e){var t=this.realDims.width,n=this.options.size!=="expand"||this.options.maxHeight===Infinity?this.realDims.height:this.options.maxHeight,r=Math.round(t/e.aspect_ratio),i,s;if(_crop.call(this,e.aspect_ratio))r<n&&(r=n,t=Math.round(r*e.aspect_ratio)),s=Math.min(0,Math.max(-(t-this.realDims.width),this.realDims.width/2-t/(100/e.focal_point.x))),i=Math.min(0,Math.max(-(r-n),n/2-r/(100/e.focal_point.y)));else if(this.options.size!=="expand"||r>this.options.maxHeight){n=this.options.size==="expand"?this.options.maxHeight:n;var o=_ratio.call(this,e);t=o.w,r=o.h,s=this.realDims.width/2-t/2,i=n/2-r/2}return{width:t,height:r,left:s,top:i}},_crop=function(e){var t=e<1,n=this.containerRatio<1;return this.options.crop==="fill"||this.options.crop==="adaptive"&&t===n||this.options.crop==="portrait"&&t||this.options.crop==="landscape"&&!t},_resize=function(){if(this.dead)return;var e=this;this.options.autoHeight&&this.contentContainer.css({height:this.container.width()*this.options.autoHeight}),this.options.maxHeightAuto&&(this.options.maxHeight=this.container.width()),this.options.size==="expand"&&this.currentData&&this.contentContainer.css("height",Math.min(this.options.maxHeight,this.container.width()/this.currentData.aspect_ratio)),this.realDims={width:this.contentContainer.width(),height:this.contentContainer.height()};if(this.realDims.width===0&&Pulse.fullScreenApi.isFullScreen()){this.options.fullScreenRoot.css("width","100%"),_resize.call(this);return}this.containerRatio=this.realDims.width/this.realDims.height;if(this.options.width.toString().indexOf("%")!==-1||this.options.height.toString().indexOf("%")!==-1)window.clearTimeout(this.resizeInterval),this.resizeInterval=window.setTimeout(function(){_resizePresets.call(e)},500);this.contentContainer.find("div.pulse-content-container").each(function(){var t=$(this);if(!t.data("asset"))return;var n=_position.call(e,t.data("asset"));t.css({width:n.width,height:n.height,left:n.left,top:n.top});var r=t.find("video");r.length&&r[0].player&&(r=r[0].player,r.setPlayerSize(n.width,n.height),r.setControlsSize(),r.pluginType!=="native"&&r.media.setVideoSize&&r.media.setVideoSize(n.width,n.height),_crop.call(e,t.data("asset").aspect_ratio)&&t.find(".mejs-controls").css({width:e.realDims.width,left:Math.abs(l)}))});var t=this.container.find(".k-note");t.length&&t.outerHeight()!==this.container.height()&&t.css("line-height",this.container.height()+"px")},_clone=function(e){if(!e)return!1;var t=$(e[0].cloneNode(!0));return t.find("[data-node-uid]").removeAttr("data-node-uid"),t},_setSize=function(){var e=this.options.size==="auto"?"3:2":this.options.size,t=e.split(":");this.options.height=t[1]+"/"+t[0];var n=this.options.height.split("/"),r=n[0]/n[1],i;return isNaN(this.options.width)?i=this.container.parent().width()*r:i=this.options.width*r,this.options.autoHeight=r,i},_setup=function(e,t){var n=$(e);_id=n.attr("id"),_ns[_id]={},_ns[_id].context=n,_ns[_id].container=n,_ns[_id].dead=!1,_ns[_id].parent=n.parent(),_ns[_id].platform=window.onorientationchange?4:10,_ns[_id].handlers=[],_ns[_id].loaded=[],_ns[_id].triggers=[],_ns[_id].touch={},_ns[_id].playTimer={id:0,remaining:!1},_ns[_id].cushion=3,_ns[_id].realDims={},_ns[_id].forward=!0,_ns[_id].transitioning=!1,_ns[_id].touch={},_ns[_id].totalItems=0,_ns[_id].idMap={},_ns[_id].loadQueue={internal:[],external:[],canLoadExternal:!1,interval:!1},_ns[_id].stack=0,_ns[_id].fsElWidth=0,_ns[_id].options={},_ns[_id].options.album_id=!1,_ns[_id].options.album_type=!1,_ns[_id].options.width=t&&t.width?t.width:"100%",_ns[_id].options.height=t&&t.height?t.height:!1,_ns[_id].options.background=t&&t.background||_ns[_id].container.css("background"),_ns[_id].options.speed=(t&&t.speed||5)*1e3,_ns[_id].options.index=t&&t.index||0,_ns[_id].options.crop=t&&t.crop||"none",_ns[_id].options.dataUrl=t&&t.dataUrl||"/api.php?/content",_ns[_id].options.autoHeight=!1,_ns[_id].options.size=t&&t.size&&(t.size==="auto"||t.size==="expand"||t.size.indexOf(":")>0)&&t.size||!1,_ns[_id].options.maxHeight=parseInt(n.css("max-height"),10),_ns[_id].options.maxHeightAuto=!1,_ns[_id].options.allowFullScreen=t&&t.hasOwnProperty("allowfullscreen")?t.allowfullscreen:!0,_ns[_id].options.fullScreenRoot=t&&t.fullscreenroot&&$(t.fullscreenroot)||_ns[_id].container,_ns[_id].options.fallbackText=t&&t.fallbacktext||!1,_ns[_id].options.fallbackElement=t&&t.fallbackelement?$(t.fallbackelement):!1,_ns[_id].options.link_to=t&&t.link_to!=="false"&&t.link_to,_ns[_id].options.transition_duration=t&&t.transition_duration||"500ms",_ns[_id].options.data=t.data||!1,_ns[_id].options.order=t&&t.random===!0?"random":"default",_ns[_id].options.album_url=t.albumUrl||!1,_ns[_id].options.can_link_to_album=!1,_ns[_id].options.transition_duration=function(){var e=_ns[_id].options.transition_duration,t=parseFloat(e,10),n=parseInt(e,10);return t===0?0:(t>0&&n.toString().length<=2&&(e+="s"),/\dms$/.test(e)?parseInt(e,10):/\ds$/.test(e)?parseFloat(e,10)*1e3:e)}(),_ns[_id].options.link_to&&$.inArray(t.link_to,["lightbox","content","album"])!==-1&&!window.$K&&(_ns[_id].options.link_to=!1),isNaN(_ns[_id].options.maxHeight)&&(_ns[_id].options.maxHeight=n.width(),_ns[_id].options.maxHeightAuto=!0),!_ns[_id].options.size&&!_ns[_id].options.height&&(_ns[_id].options.size="3:2");var r=_ns[_id].options.height;return _ns[_id].options.size&&_ns[_id].options.size!=="expand"&&(r=_setSize.call(_ns[_id])),t&&(t.transition_type?_ns[_id].options.transition=t.transition_type:_ns[_id].options.transition="dissolve",t.transition_easing?_ns[_id].options.transition_easing=t.transition_easing:_ns[_id].options.transition_easing="ease-in-out",typeof t.loop=="undefined"?_ns[_id].options.loop=!0:_ns[_id].options.loop=t.loop,_ns[_id].options.autostart=typeof t.autostart=="undefined"?!0:t.autostart,t.next&&_event.call(_ns[_id],t.next,"click",function(){(this.options.loop||!this.currentData.is_last)&&_update.call(this,1)}),t.previous&&_event.call(_ns[_id],t.previous,"click",function(){(this.options.loop||!this.currentData.is_first)&&_update.call(this,-1)}),t.toggle&&_event.call(_ns[_id],t.toggle,"click",_toggle),t.play&&_event.call(_ns[_id],t.play,"click",_play),t.pause&&_event.call(_ns[_id],t.pause,"click",_pause),t.pause&&_event.call(_ns[_id],t.pause,"click",_pause),t.fullscreen&&(Pulse.fullScreenApi.supportsFullScreen?_event.call(_ns[_id],t.fullscreen,"click",_toggleFullScreen):$(t.fullscreen).addClass("k-pulse-button-disabled"))),_ns[_id].container.css({background:_ns[_id].options.background,position:"relative",width:_ns[_id].options.width}),_ns[_id].options.size==="expand"?r=0:String(r).indexOf("%")!==-1&&_ns[_id].container.css("height",r),_ns[_id].contentContainer=$("<div/>").css({width:_ns[_id].options.width,height:r,position:"relative"}).attr("class","pulse-main-container"),_ns[_id].options.link_to&&_ns[_id].contentContainer.css("cursor","pointer"),_ns[_id].contentContainer.swipe({swipe:function(e,t,n,r,i){var s=_ns[$(e.target).closest(".pulse-content-container").closest(".pulse-main-container").parent().attr("id")];t==="left"?_update.call(s,1):t==="right"&&_update.call(s,-1)},allowPageScroll:"vertical"}),_ns[_id].contentContainer.bind("click mousedown mouseover mousemove mouseout touchstart touchmove touchend",function(e){if(e.type==="mousedown"){if($.inArray(e.target.tagName.toLowerCase(),["embed","object","video"])===-1)return;e.type="click"}if($(e.target).closest(".pulse-content-container").closest(".pulse-main-container").parent().length<=0)return;var t=_ns[$(e.target).closest(".pulse-content-container").closest(".pulse-main-container").parent().attr("id")],n=_exists.call(t,"content"+e.type);if(n){var r={dom:t.current,data:t.currentData};if(e.type.indexOf("touch")===-1){var i=t.contentContainer.offset(),s=e.pageX-i.left,o=i.top-e.pageY;r.cursor={percentageX:Math.abs(Math.round((s/t.contentContainer.width()).toFixed(2)*100)),percentageY:Math.abs(Math.round((o/t.contentContainer.height()).toFixed(2)*100))}}t.contentContainer.trigger(t.triggered="content"+e.type,r)}if(e.type==="click"&&t.options.link_to){var u=t.options.dataUrl,a=!1,f=window.$K?window.$K.location.defaults:!1,l;t.options.data&&t.options.data.album_id?a=t.options.data.album_id:t.options.album_id&&(a=t.options.album_id);switch(t.options.link_to){case"advance":_update.call(t,1);return;case"playback":_toggle.call(t);return;case"lightbox":case"content":l=t.currentData.__koken_url,t.options.link_to==="lightbox"&&!/\/lightbox\/$/.test(l)&&(l+="lightbox/");break;case"albums":l=t.originalData.albums[t.options.index].__koken_url;break;case"album":var c=RegExp(t.options.album_url.replace(/:[a-z_]+/,"[^/]+"));t.currentData.__koken_url&&c.test(t.currentData.__koken_url)?l=t.currentData.__koken_url.match(c)[0]:l=!1;break;default:l=t.options.link_to}if(l){var h=location.href.match(/&preview=.*/)||"";location.href=(l.indexOf("http://")===-1?window.$K.location.root:"")+l+(l.indexOf("http://")===-1?h:"")}}}),_ns[_id].container.append(_ns[_id].contentContainer),_ns[_id].realDims={width:_ns[_id].contentContainer.width(),height:_ns[_id].contentContainer.height()},$(window).bind("resize webkitfullscreenchange mozfullscreenchange fullscreenchange"
,function(e){if(!_ns.all||_ns.all.length<$(".pulse-main-container").length)_ns.all=[],$(".pulse-main-container").each(function(e,t){_ns.all.push(_ns[$(t).parent().attr("id")])});for(var t=0,n=_ns.all.length;t<n;t++){var r=_ns.all[t],i;i&&clearTimeout(i);if(!r)return;i=setTimeout(function(){r.contentContainer.trigger(r.triggered="resizecomplete")},200),_resize.call(r)}}).trigger("resize"),_ns[_id].triggers={},_ns[_id].triggers.play=function(){_play.call(this)},_ns[_id].triggers.pause=function(){_pause.call(this)},_ns[_id].triggers.toggle=function(){_toggle.call(this)},_ns[_id].triggers.toggleFullScreen=function(){_toggleFullScreen.call(this)},_ns[_id].triggers.transitionEnd=function(){this.transitioning=!1,_load.call(this),_startPlaybackTimer.call(this),this.contentContainer.trigger(this.triggered="transitionend",{dom:this.current,data:this.currentData}),this.contentContainer.trigger(this.triggered="item",{dom:this.current,data:this.currentData})},t&&$.each(t,function(e,t){_ns[_id].options.hasOwnProperty(e)||(_ns[_id].options[e]=t)}),_ns[_id]};P.init=function(e,t){var n=_setup(e,t),r={context:n.context,options:$.extend({},n.options),on:function(e,t){var r=[];return $.each(e.split(" "),function(e,t){RegExp("^|\\s"+t+"\\s|$").test(_handles)&&r.push(t)}),r.length&&$.each(r,function(e,r){n.handlers.push(r),_bind.call(n,{type:r,fn:t})}),this},off:function(e){n.container.unlisten(e)},kill:function(){_kill.call(n)},play:function(){_play.call(n)},pause:function(){_pause.call(n)},next:function(){_update.call(n,1)},options:function(){return _options.call(n)},previous:function(){_update.call(n,-1)},toggle:function(){_toggle.call(n)},toggleFullscreen:function(){Pulse.fullScreenApi.supportsFullScreen&&_toggleFullScreen.call(n)},loadItem:function(e){_loadItemById.call(n,e)},getItem:function(){return _getItem.call(n)},getNextItem:function(){return _getNextItem.call(n)},trigger:function(e){if(n.dead)return;return n.triggers[e]?n.triggers[e].call(n):n.contentContainer.trigger(n.triggered=e,n.contentContainer),this},ratio:function(e){return _ratio.call(n,e,!0)},append:function(e){e.css("position").length<=0&&e.css("position","relative"),e.css("zIndex",12),this.context.find(".pulse-main-container").append(e)},queue:function(){return _queue.call(n,!0)},clone:function(e){return _clone.call(n,e)}};Pulse.transitions[n.options.transition]?Pulse.transitions[n.options.transition].call(r,n.options):Pulse.transitions.dissolve.call(r,n.options);for(var i in window.Pulse.plugin)r[i]=window.Pulse.plugin[i];return $(function(){n.contentContainer.trigger(n.triggered="start",n.container);if(n.options.data&&n.options.data.content){var e={content:n.options.data.content,total:n.options.data.content.length,page:1,pages:1};_data.call(n,e)}else _data.call(n)}),r}}return P.init}.call({});window.Pulse.plugin={},window.Pulse.transitions={none:function(e){var t=this;this.on("transition",function(e){e.current&&e.current.css({opacity:0}),e.next.css({opacity:1}),t.trigger("transitionEnd")})},dissolve:function(e){var t=this;this.on("transition",function(n){n.current&&n.current.animate({opacity:0},{duration:e.transition_duration}),n.next.animate({opacity:1},{duration:e.transition_duration,complete:function(){t.trigger("transitionEnd")}})})},fade:function(e){var t=this;this.on("transition",function(n){n.current?n.current.animate({opacity:0},{duration:e.transition_duration/2,complete:function(){n.next.animate({opacity:1},{duration:e.transition_duration/2,complete:function(){t.trigger("transitionEnd")}})}}):n.next.animate({opacity:1},{duration:e.transition_duration,complete:function(){t.trigger("transitionEnd")}})})},slide:function(e){var t=this;this.on("transition",function(n){var r=t.context,i=t.clone(n.next),s=t.clone(n.current),o=r.width(),u=!1,a=$("<div/>").css({width:"100%",height:"100%",top:0,left:0,position:"absolute",overflow:"hidden"}),f=$("<div/>").css({width:o*2,height:"100%",top:0,left:n.forward?0:"-"+o+"px",position:"relative"}).appendTo(a),l=function(){n.next.css({opacity:1}),a.remove(),t.trigger("transitionEnd")},c=["Webkit","Moz","O","ms",""],h=!1;c.forEach(function(e,t){if(e+"Transform"in document.body.style)return h=e,!1}),h&&(h.length&&(h="-"+h.toLowerCase()+"-"),f.css(h+"transition",h+"transform "+e.transition_duration+"ms "+e.transition_easing),u=!0),s&&(n.forward||s.css({left:o+"px"}),f.append(s)),i.css({opacity:1}),n.forward&&i.css({left:o+"px"}),f.append(i),t.append(a),window.setTimeout(function(){if(!n.current){l();return}t.options.crop!=="fill"&&n.current.css({opacity:0}),requestAnimationFrame(function(){o=n.forward?"-"+o:o,u?(f.bind("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend",l),f.css(h+"transform","translate3d("+o+"px,0,0)")):f.animate({left:o},{duration:e.transition_duration,easing:e.transition_easing,complete:l})})},n.current?50:250)})}},window.Pulse.register_transition=function(e){window.Pulse.transitions=$.extend(window.Pulse.transitions,e)},function(){var e={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",prefix:""},t="webkit moz o ms khtml".split(" ");if(typeof document.cancelFullScreen!="undefined")e.supportsFullScreen=!0;else for(var n=0,r=t.length;n<r;n++){e.prefix=t[n];if(typeof document[e.prefix+"CancelFullScreen"]!="undefined"){e.supportsFullScreen=!0;break}}e.supportsFullScreen&&(e.fullScreenEventName=e.prefix+"fullscreenchange",e.isFullScreen=function(){switch(this.prefix){case"":return document.fullScreen;case"webkit":return document.webkitIsFullScreen;default:return document[this.prefix+"FullScreen"]}},e.requestFullScreen=function(e){return this.prefix===""?e.requestFullScreen():e[this.prefix+"RequestFullScreen"]()},e.cancelFullScreen=function(e){return this.prefix===""?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}),Pulse.fullScreenApi=e}();
$K.pulse.plugins = { 'koken_transition_pack': '/storage/plugins/koken-pulse-transition-pack/transitions.js', 'koken_pulse_timer': '/storage/plugins/koken-pulse-timer/timer.js' };
(function(P) {

	P.register_transition({

		koken_transition_pack_reveal: function(options) {

			var	self = this;

			this.on( 'transition', function(e) {

				var container	= self.context,
					vertical	= options.koken_transition_pack_direction && options.koken_transition_pack_direction === 'vertical' || false,
					half		= - ( vertical ? container.height() : container.width() ) / 2,
					c			= self.clone( e.current ),
					n			= self.clone( e.next ),
					wrap		= $('<div/>').css({
									width: '100%',
									height: '100%',
									position: 'absolute',
									top: 0,
									overflow: 'hidden'
								}),
					top			= $('<div/>').css({
										width: vertical ? '100%' : '50%',
										height: vertical ? '50%' : '100%',
										overflow: 'hidden',
										position: 'absolute',
										display: 'block'
									}).appendTo(wrap),
					bottom		= $( top[0].cloneNode(false) ).appendTo(wrap);


				if (vertical) {
					bottom.css({
						bottom: e.forward ? 0 : half
					});

					top.css({
						top: e.forward ? 0 : half
					});
				} else {
					bottom.css({
						top: 0,
						right: e.forward ? 0 : half
					});

					top.css({
						top: 0,
						left: e.forward ? 0 : half
					});
				}

				if (c) {

					var img = e.forward ? c.find('div.pulse-content-container') : n.find('div.pulse-content-container');
						imgB = $( img[0].cloneNode(true) );

					if (vertical) {
						imgB.css({
							top: parseInt( imgB.css('top'), 10 ) + half + 'px'
						});
					} else {
						imgB.css({
							left: parseInt( imgB.css('left'), 10 ) + half + 'px'
						});
					}

					top.append(img);
					bottom.append(imgB);

					self.append(wrap);

					window.setTimeout(function() {

						if (e.forward) {
							e.current.css({ opacity: 0 });
							e.next.css({ opacity: 1 });
						}

						var f = function() {
							wrap.remove();
							self.trigger('transitionEnd');
							e.current.css({ opacity: 0 });
							e.next.css({ opacity: 1 });
						};

						if (vertical) {
							top.animate({
								top: e.forward ? half : 0
							}, {
								duration: options.transition_duration
							});

							bottom.animate({
								bottom: e.forward ? half : 0
							}, {
								duration: options.transition_duration,
								complete: f
							});
						} else {
							top.animate({
								left: e.forward ? half : 0
							}, {
								duration: options.transition_duration
							});

							bottom.animate({
								right: e.forward ? half : 0
							}, {
								duration: options.transition_duration,
								complete: f
							});
						}

					}, 0);

				} else {

					e.next.animate({
						opacity: 1
					}, {
						duration: options.transition_duration,
						complete: function() {
							self.trigger('transitionEnd');
						}
					});

				}
			});

		},

		koken_transition_pack_zoom: function(options) {

			var self = this;

			this.on( 'transition', function(e) {

				var n		= self.clone( e.next ),
					c		= self.clone( e.current ),
					startN	= e.forward ? 0.75 : 1.25,
					endC	= e.forward ? 1.25 : 0.75,
					wrap	= $('<div/>').css({
									width: '100%',
									height: '100%',
									top: 0,
									left: 0,
									webkitTransformStyle: 'preserve-3d'
								});

				n.css({
					webkitTransform: 'translate3d(0,0,0) scale3d(' + startN + ', ' + startN + ', 0)',
					webkitTransformOrigin: '50% 50%',
					webkitTransition: 'all ' + options.transition_duration + 'ms'
				});

				wrap.append(n);

				if (c) {

					c.css({
						webkitTransform: 'translate3d(0,0,0) scale3d(1, 1, 0)',
						webkitTransformOrigin: '50% 50%',
						webkitTransition: 'all ' + options.transition_duration + 'ms'
					});

					wrap.append(c);

				}

				self.append(wrap);

				n.bind( 'webkitTransitionEnd', function() {
					e.next.css({
						opacity: 1
					});

					wrap.remove();

					self.trigger('transitionEnd');
				});

				window.setTimeout(function() {
					if (c) {

						e.current.css({ opacity: 0 });

						c.css({
							webkitTransform: 'translate3d(0,0,0) scale3d(' + endC + ', ' + endC + ', 0)',
							opacity: 0
						});
					}

					n.css({
						webkitTransform: 'translate3d(0,0,0) scale3d(1, 1, 0)',
						opacity: 1
					});
				}, 0);

			});

		},

		koken_transition_pack_cube: function(options) {

			var self = this,
				prefixes = ['Webkit', 'Moz', 'O', 'ms', ''],
				prefix = false;

			prefixes.forEach( function(p, i) {
				if ( p + 'Transform' in document.body.style ) {
					prefix = p;
					return false;
				}
			});

			// Not supported, fallback to default transition
			if (!prefix) return this;

			if (prefix.length) {
				prefix = '-' + prefix.toLowerCase() + '-';
			}

			this.on( 'transition', function(e) {

				var container	= self.context,
					ncopy		= self.clone( e.next ),
					ccopy		= self.clone( e.current ),
					containerW	= container.width();
					wrap		= $('<div/>').css({
										width: '100%',
										height: '100%',
										top: 0,
										left: 0,
										position: 'relative'
									});

				container.css(prefix + 'perspective', containerW);

				wrap.css(prefix + 'transform', 'translateZ(-' + (containerW/2) + 'px)');
				wrap.css(prefix + 'transition', prefix + 'transform ' + options.transition_duration + 'ms ease-in-out');
				wrap.css(prefix + 'transform-style', 'preserve-3d');

				if (ccopy) {
					wrap.append(ccopy);

					var ccss = {};
					ccss[prefix + 'transform'] = 'rotateY(0deg) translateZ(' + containerW / 2 + 'px)';
					ccss[prefix + 'backface-visibility'] = 'hidden';
					ccopy.css(ccss);
				}

				wrap.append(ncopy);

				var ncss = { opacity: 1 };
				ncss[prefix + 'transform'] = 'rotateY(' + (e.forward ? '' : '-') + '90deg) translateZ(' + (containerW / 2) + 'px)';
				ncss[prefix + 'backface-visibility'] = 'hidden';

				ncopy.css(ncss);

				self.append(wrap);

				requestAnimationFrame(function() {

					// Once transition ends, reset the dom back to how we found it
					wrap.bind( 'webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd transitionend', function() {
						e.next.css({
							opacity: 1
						});

						wrap.remove();

						self.trigger('transitionEnd');
					});

					// Need a reset here to make sure dom is redrawn first
					requestAnimationFrame(function() {

						if (e.current) {
							e.current.css({
								opacity: 0
							});
						}

						wrap.css(prefix + 'transform', 'translateZ(-' + (containerW / 2) + 'px) rotateY(' + ( e.forward ? '-' : '' ) + '90deg)');
					});
				});

			});

		},

		koken_transition_pack_flip: function(options) {

			var self = this,
				prefixes = ['Webkit', 'Moz', 'O', 'ms', ''],
				prefix = false;

			prefixes.forEach( function(p, i) {
				if ( p + 'Transform' in document.body.style ) {
					prefix = p;
					return false;
				}
			});

			// Not supported, fallback to default transition
			if (!prefix) return this;

			if (prefix.length) {
				prefix = '-' + prefix.toLowerCase() + '-';
			}

			this.on( 'transition', function(e) {

				var container	= self.context,
					ncopy		= self.clone( e.next ),
					ccopy		= self.clone( e.current ),
					wrap		= $('<div/>').css({
										width: '100%',
										height: '100%',
										top: 0,
										left: 0,
										position: 'relative'
									});

				container.css(prefix + 'perspective', container.width()*1.5);

				wrap.css(prefix + 'transform', 'translate3d(0,0,0)');
				wrap.css(prefix + 'transition', prefix + 'transform ' + options.transition_duration + 'ms');
				wrap.css(prefix + 'transform-style', 'preserve-3d');

				if (ccopy) {
					wrap.append(ccopy);

					var ccss = {};
					ccss[prefix + 'transform'] = 'translate3d(0,0,0) rotateY(0deg)';
					ccss[prefix + 'backface-visibility'] = 'hidden';
					ccopy.css(ccss);
				}

				wrap.append(ncopy);

				var ncss = { opacity: 1 };
				ncss[prefix + 'transform'] = 'translate3d(0,0,0) rotateY(180deg)';
				ncss[prefix + 'backface-visibility'] = 'hidden';

				ncopy.css(ncss);

				self.append(wrap);

				requestAnimationFrame(function() {
					// Once transition ends, reset the dom back to how we found it
					wrap.bind( 'webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd transitionend', function() {
						e.next.css({
							opacity: 1
						});

						wrap.remove();

						self.trigger('transitionEnd');
					});

					// Need a reset here to make sure dom is redrawn first
					requestAnimationFrame(function() {
						if (e.current) {
							e.current.css({
								opacity: 0
							});
						}

						wrap.css(prefix + 'transform', 'rotateY(' + ( e.forward ? '-' : '' ) + '180deg)');
					});
				});

			});

		},

		koken_transition_pack_flash: function(options) {

			var self = this;

			this.on( 'transition', function(e) {

				var overlay = $('<div />').css({
						background: '#fff',
						position: 'absolute',
						width: '100%',
						height: '100%'
					});

				self.append(overlay);

				if (e.current) {
					e.current.css({ opacity: 0 });
				}
				e.next.css({ opacity: 1 });

				overlay.animate({
					opacity: 0
				}, {
					duration: options.transition_duration,
					complete: function() {
						overlay.remove();
						self.trigger('transitionEnd');
					}
				});

			});

		}

	});

})(Pulse);/********************************
Pulse timer plugin
*********************************/

(function(P) {

	P.plugin.koken_pulse_timer = function(options) {

		var	diameter	= options && options.koken_pulse_timer_radius || 32,
			radius		= diameter / 2,
			weight		= options && options.koken_pulse_timer_weight || 3,
			type		= options && options.koken_pulse_timer_style || 'beam',
			countdown	= options && options.koken_pulse_timer_countdown || false,
			l			= Number(diameter) + Number(weight),
			self		= this,
			position	= (options && options.koken_pulse_timer_position || 'top right').toLowerCase().split(' '),
			vertical	= position[0],
			horizontal	= position[1] || 'center',
			color		= options && options.koken_pulse_timer_color || 'white',
			bgcolor		= options && options.koken_pulse_timer_bgcolor || 'rgba(0,0,0,.6)',
			showing		= false,
			css			= { position: 'absolute' };

		var progress = $('<canvas/>')
							.attr({
								width: l,
								height: l
							})
							.css( css ),
			ctx			= progress[0].getContext('2d');

		this.on( 'transitionend', function(e) {

			progress.remove();

			var con = e.dom.find('.pulse-content-container'),
				top = parseInt(con.css('top'), 10),
				left = parseInt(con.css('left'), 10),
				adjustTop = top < 0 ? -top : 0,
				adjustLeft = left < 0 ? -left : 0;

			switch(vertical) {
				case 'bottom':
					css.bottom = adjustTop + 8;
					break;

				case 'center':
					css.top = '50%';
					css.marginTop = -(l/2);
					break;

				default:
					css.top = adjustTop + 8;
					break;
			}

			switch(horizontal) {
				case 'left':
					css.left = adjustLeft + 8;
					break;

				case 'center':
					css.left = '50%';
					css.marginLeft = -(l/2);
					break;

				default:
					css.right = adjustLeft + 8;
					break;
			}

			css.display = 'none';

			progress.css(css);
			con.append( progress );
		});

		this.on( 'ended transitionstart videobegin', function() {
			progress.remove();
			showing = false;
		});

		progress.on( 'click', function() {
			self.trigger('toggle');
		});

		this.on( 'playbacktimer', function(e) {

			if (e.totalItems <= 1) { return false; }

			var p = (e.total - e.remaining)/e.total;
			ctx.clearRect(0, 0, l, l);

			if (type === 'bobber') {
				var r = radius - weight;
				ctx.beginPath();
				ctx.arc(radius, radius, r - (r*p), 0, Math.PI*2, false);
				ctx.fillStyle = color;
				ctx.fill();
			} else if (type === 'beam') {
				ctx.beginPath();
				ctx.arc(radius, radius, radius - weight, Math.PI/180 * 270, Math.PI/180 * 269.9, false);
				ctx.lineWidth = weight;
				ctx.strokeStyle = bgcolor;
				ctx.stroke();

				ctx.beginPath();
				if ( p < 1 ) {
					ctx.arc(radius, radius, radius - weight, Math.PI/180 * 270, Math.PI/180 * (359.9999*p - 90), countdown);
				} else if (!countdown) {
					ctx.arc(radius, radius, radius - weight, 0, Math.PI*2, false);
				}
				ctx.lineWidth = weight;
				ctx.strokeStyle = color;
				ctx.stroke();
			} else {
				ctx.beginPath();
				if ( p < 1 ) {
					ctx.arc(radius, radius, radius - weight, Math.PI/180 * 270, Math.PI/180 * (359.9999*p - 90), countdown);
					ctx.lineTo(radius, radius);
				} else if (!countdown) {
					ctx.arc(radius, radius, radius - weight, 0, Math.PI*2, false);
				}
				ctx.fillStyle = color;
				ctx.fill();
			}

			if ( !showing ) {
				progress.fadeIn(250);
				showing = true;
			}

		});

		// Always return this to keep chaining intact
		return this;

	};

})(Pulse);