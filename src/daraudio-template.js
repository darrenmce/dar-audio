(function () {
var root = this, exports = {};

// The jade runtime:
var jade = exports.jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// daraudioTemplate.jade compiled template
exports.daraudioTemplate = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push("<div" + jade.attrs({
            "class": da.classes.row
        }, {
            "class": true
        }) + "><div" + jade.attrs({
            "class": da.classes.span3
        }, {
            "class": true
        }) + '><label>Playlist:</label><select class="da-pl-select"></select></div><div' + jade.attrs({
            "class": da.classes.span8
        }, {
            "class": true
        }) + '><div class="da-title"></div><div' + jade.attrs({
            "class": "da-progress" + " " + da.classes.progress
        }, {
            "class": true
        }) + '><div style="width: 0%;" class="bar bar-success"></div></div><div' + jade.attrs({
            "class": "da-loaded" + " " + da.classes.progress
        }, {
            "class": true
        }) + '><div style="width: 100%;" class="bar"></div></div><div' + jade.attrs({
            "class": "da-time" + " " + da.classes.textRight
        }, {
            "class": true
        }) + '><span class="da-time-progress"></span><span class="da-time-total"></span></div><div' + jade.attrs({
            "class": da.classes.controlsContainer
        }, {
            "class": true
        }) + "><div" + jade.attrs({
            "class": da.classes.row
        }, {
            "class": true
        }) + "><div" + jade.attrs({
            "class": da.classes.span3
        }, {
            "class": true
        }) + "><div" + jade.attrs({
            "class": da.classes.buttonGroup
        }, {
            "class": true
        }) + "><button" + jade.attrs({
            "class": "da-prev" + " " + da.classes.button
        }, {
            "class": true
        }) + "><i" + jade.attrs({
            "class": da.classes.iconPrev
        }, {
            "class": true
        }) + "></i></button><button" + jade.attrs({
            "class": "da-play" + " " + da.classes.button
        }, {
            "class": true
        }) + "><i" + jade.attrs({
            "class": da.classes.iconPlay
        }, {
            "class": true
        }) + "></i></button><button" + jade.attrs({
            "class": "da-pause" + " " + da.classes.button
        }, {
            "class": true
        }) + "><i" + jade.attrs({
            "class": da.classes.iconPause
        }, {
            "class": true
        }) + "></i></button><button" + jade.attrs({
            "class": "da-next" + " " + da.classes.button
        }, {
            "class": true
        }) + "><i" + jade.attrs({
            "class": da.classes.iconNext
        }, {
            "class": true
        }) + "></i></button></div></div><div" + jade.attrs({
            "class": "da-slider" + " " + da.classes.span3
        }, {
            "class": true
        }) + '><input type="range" min="0" max="100" step="1" value="50" class="da-volume"/></div></div></div></div></div><div' + jade.attrs({
            "class": da.classes.row
        }, {
            "class": true
        }) + '><audio class="da-audio"><p>Your Browser Does Not Support HTML5 Audio</p></audio></div>');
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();