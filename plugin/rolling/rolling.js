(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],b)}else{b(a.jQuery)}}(this,function(d){var a=false;var e={data:{index:0,name:"scrollbar"},macosx:navigator.platform.toLowerCase().indexOf("mac")!==-1,mobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/WebKit/.test(navigator.userAgent)};e.scrolls.add=function(k){this.remove(k).push(k)};e.scrolls.remove=function(k){while(d.inArray(k,this)>=0){this.splice(d.inArray(k,this),1)}return this};var c={"autoScrollSize":true,"autoUpdate":true,"debug":false,"disableBodyScroll":false,"duration":200,"ignoreMobile":false,"ignoreOverlay":false,"scrollStep":30,"showArrows":false,"stepScrolling":true,"scrollx":null,"scrolly":null,"onDestroy":null,"onInit":null,"onScroll":null,"onUpdate":null};var f=function(k){if(!e.scroll){e.overlay=b();e.scroll=j();g();d(window).resize(function(){var m=false;if(e.scroll&&(e.scroll.height||e.scroll.width)){var l=j();if(l.height!==e.scroll.height||l.width!==e.scroll.width){e.scroll=l;m=true}}g(m)})}this.container=k;this.namespace=".scrollbar_"+e.data.index++;this.options=d.extend({},c,window.jQueryScrollbarOptions||{});this.scrollTo=null;this.scrollx={};this.scrolly={};k.data(e.data.name,this);e.scrolls.add(this)};f.prototype={destroy:function(){if(!this.wrapper){return}this.container.removeData(e.data.name);e.scrolls.remove(this);var l=this.container.scrollLeft();var k=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({"height":"","margin":"","max-height":""}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(k);this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace);this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace);this.wrapper.remove();d(document).add("body").off(this.namespace);if(d.isFunction(this.options.onDestroy)){this.options.onDestroy.apply(this,[this.container])}},init:function(v){var m=this,p=this.container,n=this.containerWrapper||p,l=this.namespace,k=d.extend(this.options,v||{}),u={x:this.scrollx,y:this.scrolly},q=this.wrapper;var r={"scrollLeft":p.scrollLeft(),"scrollTop":p.scrollTop()};if((e.mobile&&k.ignoreMobile)||(e.overlay&&k.ignoreOverlay)||(e.macosx&&!e.webkit)){return false}if(!q){this.wrapper=q=d("<div>").addClass("scroll-wrapper").addClass(p.attr("class")).css("position",p.css("position")=="absolute"?"absolute":"relative").insertBefore(p).append(p);if(p.is("textarea")){this.containerWrapper=n=d("<div>").insertBefore(p).append(p);q.addClass("scroll-textarea")}n.addClass("scroll-content").css({"height":"auto","margin-bottom":e.scroll.height*-1+"px","margin-right":e.scroll.width*-1+"px","max-height":""});p.on("scroll"+l,function(o){if(d.isFunction(k.onScroll)){k.onScroll.call(m,{"maxScroll":u.y.maxScrollOffset,"scroll":p.scrollTop(),"size":u.y.size,"visible":u.y.visible},{"maxScroll":u.x.maxScrollOffset,"scroll":p.scrollLeft(),"size":u.x.size,"visible":u.x.visible})}u.x.isVisible&&u.x.scroll.bar.css("left",p.scrollLeft()*u.x.kx+"px");u.y.isVisible&&u.y.scroll.bar.css("top",p.scrollTop()*u.y.kx+"px")});q.on("scroll"+l,function(){q.scrollTop(0).scrollLeft(0)});if(k.disableBodyScroll){var t=function(o){h(o)?u.y.isVisible&&u.y.mousewheel(o):u.x.isVisible&&u.x.mousewheel(o)};q.on("MozMousePixelScroll"+l,t);q.on("mousewheel"+l,t);if(e.mobile){q.on("touchstart"+l,function(s){var x=s.originalEvent.touches&&s.originalEvent.touches[0]||s;var o={"pageX":x.pageX,"pageY":x.pageY};var w={"left":p.scrollLeft(),"top":p.scrollTop()};d(document).on("touchmove"+l,function(y){var z=y.originalEvent.targetTouches&&y.originalEvent.targetTouches[0]||y;p.scrollLeft(w.left+o.pageX-z.pageX);p.scrollTop(w.top+o.pageY-z.pageY);y.preventDefault()});d(document).on("touchend"+l,function(){d(document).off(l)})})}}if(d.isFunction(k.onInit)){k.onInit.apply(this,[p])}}else{n.css({"height":"auto","margin-bottom":e.scroll.height*-1+"px","margin-right":e.scroll.width*-1+"px","max-height":""})}d.each(u,function(A,B){var w=null;var z=1;var s=(A==="x")?"scrollLeft":"scrollTop";var y=k.scrollStep;var o=function(){var C=p[s]();p[s](C+y);if(z==1&&(C+y)>=x){C=p[s]()}if(z==-1&&(C+y)<=x){C=p[s]()}if(p[s]()==C&&w){w()}};var x=0;if(!B.scroll){B.scroll=m._getScroll(k["scroll"+A]).addClass("scroll-"+A);if(k.showArrows){B.scroll.addClass("scroll-element_arrows_visible")}B.mousewheel=function(D){if(!B.isVisible||(A==="x"&&h(D))){return true}if(A==="y"&&!h(D)){u.x.mousewheel(D);return true}var E=D.originalEvent.wheelDelta*-1||D.originalEvent.detail;var C=B.size-B.visible-B.offset;if((E>0&&x<C)||(E<0&&x>0)){x=x+E;if(x<0){x=0}if(x>C){x=C}m.scrollTo=m.scrollTo||{};m.scrollTo[s]=x;setTimeout(function(){if(m.scrollTo){p.stop().animate(m.scrollTo,240,"linear",function(){x=p[s]()});m.scrollTo=null}},1)}D.preventDefault();return false};B.scroll.on("MozMousePixelScroll"+l,B.mousewheel).on("mousewheel"+l,B.mousewheel).on("mouseenter"+l,function(){x=p[s]()
});B.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+l,function(C){if(C.which!=1){return true}z=1;var E={"eventOffset":C[(A==="x")?"pageX":"pageY"],"maxScrollValue":B.size-B.visible-B.offset,"scrollbarOffset":B.scroll.bar.offset()[(A==="x")?"left":"top"],"scrollbarSize":B.scroll.bar[(A==="x")?"outerWidth":"outerHeight"]()};var D=0,F=0;if(d(this).hasClass("scroll-arrow")){z=d(this).hasClass("scroll-arrow_more")?1:-1;y=k.scrollStep*z;x=z>0?E.maxScrollValue:0}else{z=(E.eventOffset>(E.scrollbarOffset+E.scrollbarSize)?1:(E.eventOffset<E.scrollbarOffset?-1:0));y=Math.round(B.visible*0.75)*z;x=(E.eventOffset-E.scrollbarOffset-(k.stepScrolling?(z==1?E.scrollbarSize:0):Math.round(E.scrollbarSize/2)));x=p[s]()+(x/B.kx)}m.scrollTo=m.scrollTo||{};m.scrollTo[s]=k.stepScrolling?p[s]()+y:x;if(k.stepScrolling){w=function(){x=p[s]();clearInterval(F);clearTimeout(D);D=0;F=0};D=setTimeout(function(){F=setInterval(o,40)},k.duration+100)}setTimeout(function(){if(m.scrollTo){p.animate(m.scrollTo,k.duration);m.scrollTo=null}},1);return m._handleMouseDown(w,C)});B.scroll.bar.on("mousedown"+l,function(D){if(D.which!=1){return true}var C=D[(A==="x")?"pageX":"pageY"];var E=p[s]();B.scroll.addClass("scroll-draggable");d(document).on("mousemove"+l,function(F){var G=parseInt((F[(A==="x")?"pageX":"pageY"]-C)/B.kx,10);p[s](E+G)});return m._handleMouseDown(function(){B.scroll.removeClass("scroll-draggable");x=p[s]()},D)})}});d.each(u,function(w,x){var o="scroll-scroll"+w+"_visible";var s=(w=="x")?u.y:u.x;x.scroll.removeClass(o);s.scroll.removeClass(o);n.removeClass(o)});d.each(u,function(o,s){d.extend(s,(o=="x")?{"offset":parseInt(p.css("left"),10)||0,"size":p.prop("scrollWidth"),"visible":q.width()}:{"offset":parseInt(p.css("top"),10)||0,"size":p.prop("scrollHeight"),"visible":q.height()})});this._updateScroll("x",this.scrollx);this._updateScroll("y",this.scrolly);if(d.isFunction(k.onUpdate)){k.onUpdate.apply(this,[p])}d.each(u,function(B,A){var w=(B==="x")?"left":"top";var s=(B==="x")?"outerWidth":"outerHeight";var y=(B==="x")?"width":"height";var z=parseInt(p.css(w),10)||0;var x=A.size;var C=A.visible+z;var o=A.scroll.size[s]()+(parseInt(A.scroll.size.css(w),10)||0);if(k.autoScrollSize){A.scrollbarSize=parseInt(o*C/x,10);A.scroll.bar.css(y,A.scrollbarSize+"px")}A.scrollbarSize=A.scroll.bar[s]();A.kx=((o-A.scrollbarSize)/(x-C))||1;A.maxScrollOffset=x-C});p.scrollLeft(r.scrollLeft).scrollTop(r.scrollTop).trigger("scroll")},_getScroll:function(k){var l={advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")};if(l[k]){k=l[k]}if(!k){k=l["simple"]}if(typeof(k)=="string"){k=d(k).appendTo(this.wrapper)}else{k=d(k)}d.extend(k,{bar:k.find(".scroll-bar"),size:k.find(".scroll-element_size"),track:k.find(".scroll-element_track")});return k},_handleMouseDown:function(m,l){var k=this.namespace;d(document).on("blur"+k,function(){d(document).add("body").off(k);m&&m()});d(document).on("dragstart"+k,function(n){n.preventDefault();return false});d(document).on("mouseup"+k,function(){d(document).add("body").off(k);m&&m()});d("body").on("selectstart"+k,function(n){n.preventDefault();return false});l&&l.preventDefault();return false},_updateScroll:function(q,p){var l=this.container,r=this.containerWrapper||l,s="scroll-scroll"+q+"_visible",o=(q==="x")?this.scrolly:this.scrollx,n=parseInt(this.container.css((q==="x")?"left":"top"),10)||0,k=this.wrapper;var m=p.size;var t=p.visible+n;p.isVisible=(m-t)>1;if(p.isVisible){p.scroll.addClass(s);o.scroll.addClass(s);r.addClass(s)}else{p.scroll.removeClass(s);o.scroll.removeClass(s);r.removeClass(s)}if(q==="y"){if(l.is("textarea")||m<t){r.css({"height":(t+e.scroll.height)+"px","max-height":"none"})}else{r.css({"max-height":(t+e.scroll.height)+"px"})}}if(p.size!=l.prop("scrollWidth")||o.size!=l.prop("scrollHeight")||p.visible!=k.width()||o.visible!=k.height()||p.offset!=(parseInt(l.css("left"),10)||0)||o.offset!=(parseInt(l.css("top"),10)||0)){d.extend(this.scrollx,{"offset":parseInt(l.css("left"),10)||0,"size":l.prop("scrollWidth"),"visible":k.width()});d.extend(this.scrolly,{"offset":parseInt(l.css("top"),10)||0,"size":this.container.prop("scrollHeight"),"visible":k.height()});this._updateScroll(q==="x"?"y":"x",o)
}}};var i=f;d.fn.scrollbar=function(l,k){if(typeof l!=="string"){k=l;l="init"}if(typeof k==="undefined"){k=[]}if(!d.isArray(k)){k=[k]}this.not("body, .scroll-wrapper").each(function(){var n=d(this),m=n.data(e.data.name);if(m||l==="init"){if(!m){m=new i(n)}if(m[l]){m[l].apply(m,k)}}});return this};d.fn.scrollbar.options=c;var g=(function(){var l=0,k=0;return function(q){var p,n,o,m,t,s,r;for(p=0;p<e.scrolls.length;p++){m=e.scrolls[p];n=m.container;o=m.options;t=m.wrapper;s=m.scrollx;r=m.scrolly;if(q||(o.autoUpdate&&t&&t.is(":visible")&&(n.prop("scrollWidth")!=s.size||n.prop("scrollHeight")!=r.size||t.width()!=s.visible||t.height()!=r.visible))){m.init();if(o.debug){window.console&&console.log({scrollHeight:n.prop("scrollHeight")+":"+m.scrolly.size,scrollWidth:n.prop("scrollWidth")+":"+m.scrollx.size,visibleHeight:t.height()+":"+m.scrolly.visible,visibleWidth:t.width()+":"+m.scrollx.visible},true);k++}}}if(a&&k>10){window.console&&console.log("Scroll updates exceed 10");g=function(){}}else{clearTimeout(l);l=setTimeout(g,300)}}})();function j(l){if(e.webkit&&!l){return{"height":0,"width":0}}if(!e.data.outer){var k={"border":"none","box-sizing":"content-box","height":"200px","margin":"0","padding":"0","width":"200px"};e.data.inner=d("<div>").css(d.extend({},k));e.data.outer=d("<div>").css(d.extend({"left":"-1000px","overflow":"scroll","position":"absolute","top":"-1000px"},k)).append(e.data.inner).appendTo("body")}e.data.outer.scrollLeft(1000).scrollTop(1000);return{"height":Math.ceil((e.data.outer.offset().top-e.data.inner.offset().top)||0),"width":Math.ceil((e.data.outer.offset().left-e.data.inner.offset().left)||0)}}function b(){var k=j(true);return !(k.height||k.width)}function h(k){var l=k.originalEvent;if(l.axis&&l.axis===l.HORIZONTAL_AXIS){return false}if(l.wheelDeltaX){return false}return true}if(window.angular){(function(k){k.module("jQueryScrollbar",[]).provider("jQueryScrollbar",function(){var l=c;return{setOptions:function(m){k.extend(l,m)},$get:function(){return{options:k.copy(l)}}}}).directive("jqueryScrollbar",function(m,l){return{"restrict":"AC","link":function(r,q,p){var o=l(p.jqueryScrollbar),n=o(r);q.scrollbar(n||m.options).on("$destroy",function(){q.scrollbar("destroy")})}}})})(window.angular)}}));