/*! DarAudio - v0.2.0 - 2013-08-22
* https://github.com/darrenmce/dar-audio
* Copyright (c) 2013 Darren; Licensed MIT */
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
(function ($) {
    'use strict';

    //default bootstrap template locals
    var defaultTemplateLocals = {
        da: {
            classes: {
                row: "row-fluid", span3: "span3", span8: "span8", progress: "progress", textRight: "text-right", controlsContainer: "fluid-container", buttonGroup: "btn-group", button: "btn", iconPrev: "icon-step-backward", iconPlay: "icon-play", iconPause: "icon-pause", iconNext: "icon-step-forward"
            }
        }
    };

    var PlayList = function (options) {
        this.name = options.name || 'default';
        this.pos = 0;
        this.playList = options.playList || '';
        this.index = 0;
        this.loaded = false;
        this.folder = options.folder || '';
    };

    PlayList.prototype = {
        load: function (callback) {
            var self = this;
            //self.pos = -1;
            if (self.loaded) {
                if (typeof callback === 'function') {
                    callback.call(self);
                }
            } else if (typeof self.playList === 'object') {
                self.loaded = true;
                if (typeof callback === 'function') {
                    callback.call(self);
                }
            } else if (typeof self.playList === 'string') {
                $.getJSON(self.playList).done(function (data) {
                    self.playList = data.playList;
                    self.loaded = true;
                    if (typeof callback === 'function') {
                        callback.call(self);
                    }
                });
            }
        },
        length: function () {
            return this.playList.length;
        },
        getKey: function (key) {
            return this.playList[this.pos][key];
        }
    };

    var DarAudio = function (element, options) {
        this.$ele = $(element);
        this.volume = options.defaultVolume || 0.5;
        this.playList = 0;
        this.playLists = [];
        this.playListDef = options.playListDef || [];
        this.TemplateLocals = options.templateLocals || defaultTemplateLocals;
    };

    DarAudio.prototype = {
        loadPlayLists: function () {
            var self = this;
            var index = 0;
            $.each(self.playListDef, function () {
                var pl = this;
                var list = new PlayList(pl);
                list.index = index;
                self.playLists.push(list);
                index++;
            });
            return self;
        }, pl: function () {
            return this.playLists[this.playList];
        }, play: function () {
            if (this.pl().pos < 0) {
                this.next();
            } else if (this.ap.canPlayType && this.ap.canPlayType(this.pl().getKey("type"))) {
                this.ap.play();
            } else {
                if (confirm('Cannot Play Type: ' + this.pl().getKey("type") + '. Proceed to Next Song?')) {
                    this.next();
                }
            }
        }, pause: function () {
            this.ap.pause();
        },
        prev: function () {
            this.pl().pos--;
            if (this.pl().pos < 0) {
                this.pl().pos = this.pl().length() - 1;
            }
            this.ap.pause();
            //update mp3 url
            $(this.ap).attr('src', this.pl().folder + this.pl().getKey("url"));

            this.ap.load();
        },
        next: function (bypass) {
            //use bypass to load current position (ie playlist change)
            if (!bypass) {
                this.pl().pos++;
            }
            if (this.pl().pos === this.pl().length()) {
                this.pl().pos = 0;
            }
            this.pause();
            //update mp3 url
            $(this.ap).attr('src', this.pl().folder + this.pl().getKey("url"));

            this.ap.load();

        },
        seekTo: function (time) {
            this.ap.currentTime = time;

        },
        init: function () {
            var self = this;

            //define audio tag (ap)
            this.ap = this.$ele.find('.da-audio').get(0);

            //SET click handlers
            self.$ele.find('.da-play').on('click', function () {
                self.play();
            });
            self.$ele.find('.da-pause').on('click', function () {
                self.pause();
            });
            self.$ele.find('.da-prev').on('click', function () {
                self.prev();
            });
            self.$ele.find('.da-next').on('click', function () {
                self.next();
            });

            //played progress bar
            self.$ele.find('.da-progress').on('click',function (event) {
                var totalWidth = parseInt(self.$ele.find('.da-progress').css('width'), 10);
                self.seekTo((event.offsetX / totalWidth) * self.ap.duration);
            }).css('cursor', 'pointer');

            //playlist picker
            $.each(self.playLists, function () {
                var pl = this;
                self.$ele.find('.da-pl-select').append($('<option>' + pl.name + '</option>').attr('value', pl.index))
                    .on('change', function () {
                        self.playList = $(this).val();
                        self.pl().load(function () {
                            self.next(true);
                        });
                    });
            });
            //set starting list
            self.$ele.find('.da-pl-select').val(self.playList);

            //volume slider handler
            self.$ele.find('.da-volume')
                .on('change', function () {
                    self.volume = self.ap.volume = this.value / 100;
                });

            //load title, total duration, and initialize progress
            $(self.ap).bind('loadstart', function () {
                //set volume
                self.ap.volume = self.volume;

                self.$ele.find('.da-title').html($('<h2></h2>').html(self.pl().getKey("Title")));
                self.$ele.find('.da-progress .bar').css('width', 0);
                self.$ele.find('.da-loaded').addClass('progress-striped progress-danger active').find('.bar').css('width', '100%');
            });
            //set play times
            $(self.ap).bind('loadedmetadata', function () {
                self.$ele.find('.da-time-progress').html('0:00');
                self.$ele.find('.da-time-total').html(' / ' + self.msToTimeStamp(self.ap.duration));
            });
            //update function (progress bar)
            $(self.ap).bind('timeupdate', function () {
                var totalWidth = parseInt(self.$ele.find('.da-progress').css('width'), 10);
                var progressWidth = Math.ceil(totalWidth * self.ap.currentTime / self.ap.duration);
                self.$ele.find('.da-time-progress').html(self.msToTimeStamp(self.ap.currentTime));
                self.$ele.find('.da-progress .bar').css('width', progressWidth);
            });
            //progress function (loaded bar)
            $(self.ap).bind('progress', function () {
                var totalWidth = parseInt(self.$ele.find('.da-progress').css('width'), 10);
                var loadedWidth = Math.ceil(totalWidth * (this.buffered.length > 0 && this.buffered.end(0)) / this.duration);
                if (loadedWidth > 0) {
                    self.$ele.find('.da-loaded').removeClass('progress-striped progress-danger active').find('.bar').removeClass('bar-danger');
                }

                self.$ele.find('.da-loaded .bar').css('width', loadedWidth);
            });

            //auto play
            $(self.ap).bind('canplay', function () {
                self.play();
            });
            $(self.ap).bind('ended', function () {
                self.next();
            });

            //load first list then play
            if (self.playLists.length <= 0) {
                self.$ele.find('.da-title').html('<h2>No Playlist Loaded.</h2>');
            } else {
                this.pl().load(function () {
                    self.next(true);
                });
            }


            return self;
        },
        msToTimeStamp: function (ms) {
            var minutes = Math.floor((((ms % 31536000) % 86400) % 3600) / 60);
            var seconds = '' + Math.floor((((ms % 31536000) % 86400) % 3600) % 60);
            if (seconds.length < 2) {
                seconds = '0' + seconds;
            }
            return minutes + ':' + seconds;
        },
        loadHtml: function () {
            var self = this;
            this.$ele.html(templatizer.daraudioTemplate(self.TemplateLocals));
            return self;
        }
    };


    /* PLUGIN DEFINITION */

    $.fn.daraudio = function (options) {
        var opts = options || {};
        return this.each(function () {
            var $self = $(this);
            var data = $self.data('daraudio');
            if (!data) {
                $self.data('daraudio', (data = new DarAudio(this, opts)));
                data.loadHtml().loadPlayLists().init();
            }
        });
    };

    $.fn.daraudio.Constructor = DarAudio;
})(jQuery);
