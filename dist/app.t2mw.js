(()=>{"use strict";function e(e,o){var n=o.selector,c=o.options;function r(){!function(e,t){var o=t.selector,n=document.querySelector(o.input).value,c=e.convert(n,t.options),r=document.querySelector(o.output);null!=r&&(r.textContent=c)}(e,o)}t(n.input,"input",r),Object.keys(c).forEach((function(e,o){t(n[e],"change",(function(t){c[e]=t.target.checked,r()}))})),t(n.copyBtn,"click",(function(e){var t;e.preventDefault();var n,c=document.querySelector(o.selector.output);null!=c&&(n=null!==(t=c.textContent)&&void 0!==t?t:"",navigator.clipboard?function(e){navigator.clipboard.writeText(e).catch((function(e){return console.error("Error copying to clipboard: ".concat(e))}))}(n):function(e){var t=document.createElement("textarea");document.body.appendChild(t),t.value=e,t.select();try{document.execCommand("Copy")}catch(e){console&&console.log(e)}document.body.removeChild(t)}(n))}))}function t(e,t,o){var n;null===(n=document.querySelector(e))||void 0===n||n.addEventListener(t,o)}document.addEventListener("DOMContentLoaded",(function(){e(new Tab2Mediawiki,{options:{isIncludedHeader:!0,isReverse:!1,isOnlyItems:!1,isSortable:!1},selector:{isIncludedHeader:"#opt_included_header",isReverse:"#opt_reverse",isOnlyItems:"#opt_only_items",isSortable:"#opt_sortable",input:"#input",copyBtn:"#btn_copyresult",output:"#output"}})}))})();