/*
 * daraudio
 * https://github.com/darrenmce/dar-audio
 *
 * Copyright (c) 2013 Darren
 * Licensed under the MIT license.
 *
 * Version 0.1.0
 */

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
