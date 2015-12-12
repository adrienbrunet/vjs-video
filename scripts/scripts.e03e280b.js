"use strict";angular.module("vjsVideoApp",["vjs.video","gist"]),angular.module("vjsVideoApp").controller("MainCtrl",["$scope",function(a){var b={sources:[{src:"http://vjs.zencdn.net/v/oceans.mp4",type:"video/mp4"},{src:"http://vjs.zencdn.net/v/oceans.webm",type:"video/webm"}],tracks:[{kind:"subtitles",label:"English subtitles",src:"assets/subtitles.vtt",srclang:"en","default":!0}],poster:"http://vjs.zencdn.net/v/oceans.png"},c={sources:[{src:"http://html5videoformatconverter.com/data/images/happyfit2.mp4",type:"video/mp4"},{src:"http://html5videoformatconverter.com/data/images/happyfit2.webm",type:"video/webm"}],tracks:[],poster:"http://html5videoformatconverter.com/data/images/screen.jpg"},d=!1;this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.toggleMedia=function(){d=!d,a.mediaToggle=d?b:c},a.options={loop:!0},a.isSmallScreen=function(){return $(window).width()<650?!0:!1},a.media=b,a.mediaToggle=c,a.$on("vjsVideoReady",function(a,b){console.log("e.data.vid:",b.vid.player())})}]),function(){function a(){return window.videojs&&window.videojs.VERSION?window.videojs.VERSION:"0.0.0"}var b=angular.module("vjs.video",[]);b.controller("VjsVideoController",["$scope",function(b){function c(a,b){var c,d=null;if(!window.videojs)throw new Error("video.js was not found!");if(b){if(c=a[0].getElementsByTagName("video"),0===c.length)throw new Error("video tag must be defined within container directive!");if(c.length>1)throw new Error("only one video can be defined within the container directive!");d=c[0]}else{if("VIDEO"!==a[0].nodeName)throw new Error("directive must be attached to a video tag!");d=a[0]}return d}function d(a,b){var c,d,e,f=b,g=document.createElement("style"),h=function(a){var b=a.split(":"),c='the ratio must either be "wide", "standard" or decimal values in the format of w:h';if(2!==b.length)throw new Error(c);if(isNaN(b[0])||isNaN(b[1]))throw new Error(c);if(0===Number(b[0])||0===Number(b[1]))throw new Error("neither the width or height ratio can be zero!");return Number(b[1])/Number(b[0])*100},i=function(a){var b,c=a[0].querySelector(".vjs-tech");if(!c)throw new Error("Failed to find instance of video-js class!");return b="vjs-container-"+c.getAttribute("id"),a[0].setAttribute("id",b),b};switch(f||(f="16:9"),f){case"wide":f="16:9";break;case"standard":f="4:3"}c=i(a),d=h(f),e=["#",c," ",".video-js {padding-top:",d,"%;}\n",".vjs-fullscreen {padding-top: 0px;}"].join(""),g.type="text/css",g.rel="stylesheet",g.styleSheet?g.styleSheet.cssText=e:g.appendChild(document.createTextNode(e)),a[0].appendChild(g)}function e(a,b){var c,d,e="a sources and/or tracks element must be defined for the vjs-media attribute",f="sources must be an array of objects with at least one item",g="tracks must be an array of objects with at least one item";if(a.vjsMedia){if(!a.vjsMedia.sources&&!a.vjsMedia.tracks)throw new Error(e);if(a.vjsMedia.sources&&!(a.vjsMedia.sources instanceof Array))throw new Error(f);if(a.vjsMedia.tracks&&!(a.vjsMedia.tracks instanceof Array))throw new Error(g);c=document.createElement("div"),a.vjsMedia.sources&&a.vjsMedia.sources.forEach(function(a){d=document.createElement("source"),d.setAttribute("src",a.src||""),d.setAttribute("type",a.type||""),c.appendChild(d)}),a.vjsMedia.tracks&&a.vjsMedia.tracks.forEach(function(a){d=document.createElement("track"),d.setAttribute("kind",a.kind||""),d.setAttribute("label",a.label||""),d.setAttribute("src",a.src||""),d.setAttribute("srclang",a.srclang||""),a["default"]===!0&&d.setAttribute("default",""),c.appendChild(d)}),b.call(void 0,{element:c})}}function f(c,f,g,h){var i,j=f.vjsSetup||{},k=f.vjsRatio,l="VIDEO"===g[0].nodeName||a().match(/^5\./)?!1:!0;return window.videojs?(f.vjsMedia&&f.vjsMedia.poster&&(j.poster=f.vjsMedia.poster),e(f,h),i=b.$watch(function(){return f.vjsMedia},function(a,d){a&&!angular.equals(a,d)&&(i(),l?(window.videojs(c).dispose(),b.$emit("vjsVideoMediaChanged")):b.$emit("vjsVideoMediaChanged"))}),window.videojs(c,j,function(){l&&d(g,k),b.$emit("vjsVideoReady",{id:c.getAttribute("id"),vid:this,controlBar:this.controlBar})}),void b.$on("$destroy",function(){window.videojs(c).dispose()})):null}var g=this;g.initVideoJs=f,g.getVidElement=c}]),b.directive("vjsVideo",["$compile","$timeout",function(b,c){return{restrict:"A",transclude:!0,scope:{vjsSetup:"=?",vjsRatio:"@",vjsMedia:"=?"},controller:"VjsVideoController",controllerAs:"vjsCtrl",bindToController:!0,link:function(d,e,f,g,h){var i,j,k,l,m=function(a){e.children().remove(),e.append(a.element.childNodes)},n=function(){i=g.getVidElement(e),a().match(/^5\./)&&g.vjsRatio&&(g.vjsSetup||(g.vjsSetup={}),g.vjsSetup.aspectRatio=g.vjsRatio),h(function(a){e.append(a),g.initVideoJs(i,g,e,m)})};k=e.clone(),e.parent().hasClass("vjs-video-wrap")||e.wrap('<div class="vjs-video-wrap"></div>'),j=e.parent(),d.$on("vjsVideoMediaChanged",function(){var a=j.children()[0];c(function(){d.$destroy()}),l=k.clone(),j.append(l),l=b(l)(d.$parent),a.remove()}),n()}}}]),b.directive("vjsVideoContainer",[function(){return{restrict:"AE",transclude:!0,template:'<div class="vjs-directive-container"><div ng-transclude></div></div>',scope:{vjsSetup:"=?",vjsRatio:"@",vjsMedia:"=?"},controller:"VjsVideoController",controllerAs:"vjsCtrl",bindToController:!0,link:function(b,c,d,e,f){var g,h,i=function(a){var b=c[0].querySelector("video");if(b){for(;b.firstChild;)b.removeChild(b.firstChild);for(;a.element.childNodes.length>0;)b.appendChild(a.element.childNodes[0])}},j=function(){if(g=e.getVidElement(c,!0),null!==g.getAttribute("vjs-video"))throw new Error("vjs-video should not be used on the video tag when using vjs-video-container!");if(null!==g.getAttribute("vjs-setup")||null!==g.getAttribute("vjs-media")||null!==g.getAttribute("vjs-ratio"))throw new Error("directive attributes should not be used on the video tag when using vjs-video-container!");a().match(/^5\./)?e.vjsRatio&&(e.vjsSetup||(e.vjsSetup={}),e.vjsSetup.aspectRatio=e.vjsRatio):(g.setAttribute("width","auto"),g.setAttribute("height","auto")),e.initVideoJs(g,e,c,i)};f(function(a){h=a.clone()}),b.$on("vjsVideoMediaChanged",function(){c.children().remove(),c.append(h.clone()),j()}),j()}}}])}(),angular.module("vjsVideoApp").run(["$templateCache",function(a){a.put("views/main.html",'<h3>Fixed size</h3> <video ng-if="!isSmallScreen()" id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="http://vjs.zencdn.net/v/oceans.png" vjs-video vjs-setup="options"> <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm"> <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p> </video> <video ng-if="isSmallScreen()" id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" width="320" height="132" poster="http://vjs.zencdn.net/v/oceans.png" vjs-video vjs-setup="options"> <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm"> <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p> </video> <gist ng-if="!isSmallScreen()" id="793356c48eaea4451b6e"></gist> <div ng-show="isSmallScreen()"> <a class="btn btn-primary btn-sm btn-link code-btn" href="https://gist.github.com/LonnyGomes/793356c48eaea4451b6e">Veiw Code</a> </div> <h3>Responsive</h3> <vjs-video-container vjs-ratio="640:264"> <video class="video-js vjs-default-skin" width="50" height="50" controls preload="auto" poster="http://vjs.zencdn.net/v/oceans.png"> <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm"> <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p> </video> </vjs-video-container> <gist ng-if="!isSmallScreen()" id="e67dbc19e5548376cdc4"></gist> <div ng-show="isSmallScreen()"> <a class="btn btn-primary btn-sm btn-link code-btn" href="https://gist.github.com/LonnyGomes/e67dbc19e5548376cdc4">Veiw Code</a> </div> <h3>Bindable sources/tracks</h3> <video ng-if="!isSmallScreen()" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="http://vjs.zencdn.net/v/oceans.png" vjs-video vjs-media="media"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p> </video> <video ng-if="isSmallScreen()" class="video-js vjs-default-skin" controls preload="auto" width="320" height="132" poster="http://vjs.zencdn.net/v/oceans.png" vjs-video vjs-media="media"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p> </video> <gist ng-if="!isSmallScreen()" id="d75e8c1704668283e049"></gist> <div ng-show="isSmallScreen()"> <a class="btn btn-primary btn-sm btn-link code-btn" href="https://gist.github.com/LonnyGomes/d75e8c1704668283e049">Veiw Code</a> </div> <h3>Bindable sources toggle example</h3> <video ng-if="!isSmallScreen()" class="video-js vjs-default-skin" controls preload="auto" width="592" height="252" vjs-video vjs-media="mediaToggle"></video> <video ng-if="isSmallScreen()" class="video-js vjs-default-skin" controls preload="auto" width="340" height="145" vjs-video vjs-media="mediaToggle"></video> <button class="btn btn-primary btn-lg toggle-btn" ng-click="toggleMedia()">Toggle Media</button>')}]);