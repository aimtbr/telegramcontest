(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){e.exports=a(61)},40:function(e,t,a){},41:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(14),c=a(25),o=a.n(c),s=(a(40),a(11)),h=a(12),l=a(16),u=a(13),d=a(15),m=(a(41),a(5)),p=a(3),f=a(1),v=a(8),b=function(){return{type:"MAKE_LOADING"}},g=function(e){return{type:"MAKE_FAILURE",error:e}},y=function(e,t){return{type:"CHANGE_RANGE_SUCCESS",chartTitle:e,payload:t}},w=function(e,t){return{type:"SWITCH_LINE_SUCCESS",payload:e,chartTitle:t}},O=function(e){return{type:"GET_DATA_SUCCESS",payload:{charts:e}}};function j(e){e(b()),fetch("chart_data.json",{method:"get",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){return function(e){var t=[],a=function(a){var n=e[a],r="chart".concat(+a+1),i=n.colors,c=n.names,o=n.columns,s={},h={};o.forEach(function(e){var t=e.slice(1),a=Object(p.a)({},e[0],t);"x"!==e[0]?s=Object(f.a)({},s,a):t.map(function(e,t){var a=new Date(e).toDateString().slice(4,-5);h=Object(f.a)({},h,Object(p.a)({},a,t))})});var l={chartTitle:r,series_names:c,x:h,lines:s,colors:i,disabled:{}};t.push(l)};for(var n in e)a(n);return t}(e)}).then(function(t){e(O(t))}).catch(function(t){e(g(t.message))})}function C(e){var t=Object.keys(e);if(t.length<2)throw new Error("Invalid input data");var a=t.filter(function(e){return-1!==e.indexOf("y")}),n=[];a.map(function(t){return n=[].concat(Object(m.a)(n),Object(m.a)(e[t]))});for(var r=e.x,i=r.length,c=[],o=[0],s=Math.ceil(Math.max.apply(Math,Object(m.a)(n))/6),h=2;h<7;h++)o.push(s*h);var l=Math.round(i/6),u=i-i%6;for(h=l-1;h<u;h+=l)c.push(r[h]);return[l,{axisX:c,axisY:o}]}var x=a(6),E=a(26),k=a.n(E),M=a(27),S=a.n(M),T=(a(58),a(21)),A=a.n(T),N=a(28),_=function(e){var t=e.chart,a=e.lineName,n=e.mode,i=e.switchLine,c=e.redrawChart,o=e.drawMiniChart,s=t.chartTitle,h=t.series_names,l=t.colors,u=h[a],d=l[a],m=n?"#FFF":"#000",p=!0;return r.a.createElement("button",{id:"".concat(s,"-").concat(a),className:"btn line-switcher",type:"button",style:{background:d,color:m},onClick:function(){var t=Object(N.a)(A.a.mark(function t(n){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),document.getElementById("".concat(s,"-").concat(a)).style.backgroundColor=p?"transparent":d,p=!p,t.next=6,i(s,a,e.chart.rangeToShow,e.chart.disabled,p);case 6:c(),o();case 8:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},u)},L=function(e){function t(e){var a;Object(s.a)(this,t);var n=(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).props.chart.x,r=Object.values(n);return a.minV=Math.min.apply(Math,Object(m.a)(r)),a.maxV=Math.max.apply(Math,Object(m.a)(r)),a.miniChartHeight=64,a.defaultMin=6,a.canvWidth="700",a.state={currentValue:{min:a.minV,max:a.minV+6}},a.getRange(a.state.currentValue),a.redrawChart=a.redrawChart.bind(Object(x.a)(Object(x.a)(a))),a.drawMiniChart=a.drawMiniChart.bind(Object(x.a)(Object(x.a)(a))),a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.markUpChart(),this.drawMiniChart()}},{key:"markUpChart",value:function(){var e=this.props.chart.chartTitle,t=document.getElementById(e),a=t.getContext("2d"),n=Math.round(t.height/13),r=this.markUpArea(t,a,n),i=Object(v.a)(r,4),c=i[0],o=i[1],s=i[2],h=i[3];this.drawLines(t,s,h,n,c,o)}},{key:"markUpArea",value:function(e,t,a){var n=e.width,r=e.height,i=Math.round(n/50);t.strokeStyle="#c5c5c5",t.lineWidth=.5,t.font="".concat(i,"px Verdana"),t.fillStyle="#9e9e9e";for(var c=this.props.chart.rangeToShow.axes,o=c.axisY,s=c.axisX,h=r-a,l=n-a,u=Math.round(h/6),d=Math.floor(l/6),m=0,p=0;p<6;p++){var f=h-u*p,v=d*p;t.beginPath(),t.moveTo(0,f),t.fillText(o[p],0,f-8),t.fillText(s[m],d/4+v+a,h+20),t.lineTo(n,f),t.stroke(),m+=1}return[u,d,h,l]}},{key:"drawLines",value:function(e,t,a,n,r,i){var c,o,s,h=arguments.length>6&&void 0!==arguments[6]&&arguments[6],l=this.props.chart,u=l.rangeToShow,d=l.disabled,v=u.axes.axisY,b=1;if(h){var g=this.props.chart;c=g.lines,s=g.x;var y=Object.keys(d);o=Object.values(k.a.sortBy(s));var w={};for(var O in c)-1===y.indexOf(O)&&(w=Object(f.a)({},w,Object(p.a)({},O,c[O])));c=Object(f.a)({},w)}else c=u.lines,o=u.range,b=u.step;var j=Object.values(c).reduce(function(e,t){return e.concat(t)}),C=Math.max.apply(Math,Object(m.a)(j)),x=o.length,E=i/b,M=r/(h?Math.ceil(C/6):v[1]);for(var S in c)this.drawLine(e,S,c[S],i,M,x,E,t,n,h)}},{key:"drawLine",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=[].concat(t),r=n[0],i=n[1],c=n[2],o=n[3],s=n[4],h=n[5],l=n[6],u=n[7],d=n[8],m=n[9],p=r.getContext("2d");p.strokeStyle=this.props.chart.colors[i],p.lineWidth=m?1:h>30?2:3;var f=1,v=[m?3*d:d+(o===l?l/2:l),u-s*c[0]];for(p.beginPath(),p.lineCap="square";f!==h;){var b=c[f];if(b){p.moveTo(v[0],v[1]);var g=v[0],y=u-s*b;g+=l,p.lineTo(g,y),v=[g,y],f++}else f++}p.stroke()}},{key:"placeLineSwitchers",value:function(){var e=this,t=this.props,a=t.chart,n=t.mode,i=t.switchLine,c=a.series_names;return Object.keys(c).map(function(t){return r.a.createElement(_,{key:"line-switcher-".concat(t),chart:a,mode:n,lineName:t,switchLine:i,redrawChart:e.redrawChart,drawMiniChart:e.drawMiniChart})})}},{key:"redrawChart",value:function(){var e=this.props.chart.chartTitle,t=document.getElementById(e);t.getContext("2d").clearRect(0,0,t.width,t.height),this.markUpChart()}},{key:"getRange",value:function(e){for(var t=this.props.chart,a=t.chartTitle,n=t.x,r=t.lines,i=t.disabled,c=e.min,o=e.max,s=[],h=c;h<o;h++)s.push(this.getKeyByValue(n,h));this.props.changeRange(a,s,n,r,i)}},{key:"getKeyByValue",value:function(e,t){return Object.keys(e).find(function(a){return e[a]===t})}},{key:"drawMiniChart",value:function(){var e=this.props.chart,t=e.chartTitle,a=e.x,n=Object.keys(a).length,r=document.getElementById("mini-".concat(t)),i=r.getContext("2d"),c=r.height,o=r.width;i.clearRect(0,0,r.width,r.height);var s=Math.round(c/13),h=c-s,l=o-s,u=Math.round(h/6),d=l/n;this.drawLines(r,h,l,s,u,d,!0)}},{key:"onChangeInputRange",value:function(e){var t=e.min,a=e.max,n=this.maxV-this.defaultMin,r=t<this.minV?this.minV:t>n?n:t,i=a>this.maxV?this.maxV:a<this.defaultMin?this.defaultMin:a;e={min:r+=(i-r)%this.defaultMin,max:i},this.setState({currentValue:e}),this.getRange(e),this.redrawChart()}},{key:"render",value:function(){var e=this,t=this.props.chart.chartTitle;return r.a.createElement("div",{className:"chart-wrapper"},r.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12"},r.a.createElement("h2",{className:"chart-title"},t)),r.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12"},r.a.createElement("canvas",{id:t,width:this.canvWidth,height:"400"})),r.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12"},r.a.createElement("canvas",{id:"mini-".concat(t),className:"mini-chart",width:this.canvWidth,height:this.miniChartHeight})),r.a.createElement(S.a,{minValue:this.minV,maxValue:this.maxV,draggableTrack:!0,value:this.state.currentValue,onChange:function(t){return e.onChangeInputRange(t)},formatLabel:function(){},allowSameValues:!1,step:6}),r.a.createElement("div",{className:"switchers-wrapper"},this.placeLineSwitchers()))}}]),t}(r.a.Component),V=function(e){return r.a.createElement("div",{id:"switcher",className:"col-lg-12 col-md-12 col-sm-12"},r.a.createElement("button",{id:"switch-mode",className:"btn",type:"button",onClick:function(){return e.switchMode(e.mode)}},"Switch to ",e.mode?"Day":"Night"," Mode"))},I=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).props.getData(),a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"repaintApp",value:function(){var e=this.props.mode,t=document.body.style;t.color=e?"#FFF":"#000",t.backgroundColor=e?"#1d2333":"#FFF"}},{key:"displayCharts",value:function(){var e=this,t=this.props,a=t.mode;return t.charts.map(function(t){return r.a.createElement(L,{chart:t,mode:a,changeRange:e.props.changeRange,switchLine:e.props.switchLine})})}},{key:"render",value:function(){return this.repaintApp(),r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},this.displayCharts(),r.a.createElement(V,{switchMode:this.props.switchMode,mode:this.props.mode})))}}]),t}(n.Component),R=Object(i.b)(function(e){return{charts:e.charts.charts,mode:e.charts.nightMode}},function(e){return{getData:function(){return j(e)},changeRange:function(t,a,n,r,i){return function(e,t,a,n,r,i){var c={},o=Object.keys(i),s=[],h={},l=!0,u=!1,d=void 0;try{for(var m,b=a[Symbol.iterator]();!(l=(m=b.next()).done);l=!0){var g=m.value;s.push(n[g])}}catch(M){u=!0,d=M}finally{try{l||null==b.return||b.return()}finally{if(u)throw d}}var w=function(e){var t=s.map(function(t){return r[e][t]});-1===o.indexOf(e)?c=Object(f.a)({},c,Object(p.a)({},e,t)):h=Object(f.a)({},h,Object(p.a)({},e,t))};for(var O in r)w(O);var j=C(Object(f.a)({},c,{x:a})),x=Object(v.a)(j,2),E=x[0],k=x[1];e(y(t,{rangeToShow:{step:E,range:a,lines:c,axes:k},disabled:h}))}(e,t,a,n,r,i)},switchMode:function(t){return function(e,t){e({type:"SWITCH_MODE",payload:{nightMode:!t}})}(e,t)},switchLine:function(t,a,n,r){return function(e,t,a,n,r){var i=n,c=r;Promise.resolve(e(b())).then(function(){var n,r=i.lines,o=i.axes.axisX;if(-1!==Object.keys(c).indexOf(a))n=Object(p.a)({},a,c[a]),delete c[a],i.lines=Object(f.a)({},r,n);else{if(1===Object.keys(r).length)return;n=Object(p.a)({},a,r[a]),delete i.lines[a],c=Object(f.a)({},c,n)}var s=C(Object(f.a)({},i.lines,{x:o})),h=Object(v.a)(s,2);i.axes=h[1],e(w({rangeToShow:i,disabled:c},t))}).catch(function(t){return e(g(t.message))})}(e,t,a,n,r)}}})(I),D=a(4),U=a(29),F=a(30),W={charts:[],nightMode:!1,error:!1,loading:!1},B=Object(D.c)({charts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MAKE_LOADING":return Object(f.a)({},e,{loading:!0,error:!1});case"MAKE_FAILURE":return Object(f.a)({},e,{loading:!1,error:t.error});case"CHANGE_RANGE_SUCCESS":var a=e.charts,n=!0,r=!1,i=void 0;try{for(var c,o=a[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var s=c.value;if(s.chartTitle===t.chartTitle){var h=t.payload,l=h.rangeToShow,u=h.disabled;return s.rangeToShow=l,s.disabled=u,Object(f.a)({},e,{charts:a})}}}catch(C){r=!0,i=C}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return e;case"SWITCH_LINE_SUCCESS":var d=e.charts,m=!0,p=!1,v=void 0;try{for(var b,g=d[Symbol.iterator]();!(m=(b=g.next()).done);m=!0){var y=b.value;if(y.chartTitle===t.chartTitle){var w=t.payload,O=w.rangeToShow,j=w.disabled;return y.rangeToShow=O,y.disabled=j,Object(f.a)({},e,{charts:d,loading:!1})}}}catch(C){p=!0,v=C}finally{try{m||null==g.return||g.return()}finally{if(p)throw v}}return e;case"SWITCH_MODE":case"CHANGE_AXES":return Object(f.a)({},e,t.payload);case"GET_DATA_SUCCESS":return Object(f.a)({},e,t.payload,{loading:!1});default:return e}}}),G=Object(F.createLogger)(),H=Object(D.d)(B,Object(D.a)(U.a,G));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(i.a,{store:H},r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.1cc69cbf.chunk.js.map