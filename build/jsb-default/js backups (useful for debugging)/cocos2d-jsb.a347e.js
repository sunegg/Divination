(function(t, e, i) {
function n(i, r) {
var s = e[i];
if (!s) {
var a = t[i];
if (!a) return;
var o = {};
s = e[i] = {
exports: o
};
a[0]((function(t) {
return n(a[1][t] || t);
}), s, o);
}
return s.exports;
}
for (var r = 0; r < i.length; r++) n(i[r]);
})({
1: [ (function(t, e, i) {
"use strict";
var n, r = t("../core/event/event-target"), s = t("../core/platform/CCSys"), a = t("../core/assets/CCAudioClip").LoadMode, o = !1, c = [], l = function t(e) {
r.call(this);
this._shouldRecycleOnEnded = !1;
this._src = e;
this._element = null;
this.id = 0;
this._volume = 1;
this._loop = !1;
this._nextTime = 0;
this._state = t.State.INITIALZING;
this._onended = function() {
this._state = t.State.STOPPED;
this.emit("ended");
}.bind(this);
};
cc.js.extend(l, r);
l.State = {
ERROR: -1,
INITIALZING: 0,
PLAYING: 1,
PAUSED: 2,
STOPPED: 3
};
(function(t) {
t._bindEnded = function(t) {
t = t || this._onended;
var e = this._element;
this._src && e instanceof HTMLAudioElement ? e.addEventListener("ended", t) : e.onended = t;
};
t._unbindEnded = function() {
var t = this._element;
t instanceof HTMLAudioElement ? t.removeEventListener("ended", this._onended) : t && (t.onended = null);
};
t._onLoaded = function() {
this._createElement();
this.setVolume(this._volume);
this.setLoop(this._loop);
0 !== this._nextTime && this.setCurrentTime(this._nextTime);
this.getState(!1) === l.State.PLAYING ? this.play() : this._state = l.State.INITIALZING;
};
t._createElement = function() {
var t = this._src._nativeAsset;
if (t instanceof HTMLAudioElement) {
this._element || (this._element = document.createElement("audio"));
this._element.src = t.src;
} else this._element = new u(t, this);
};
t.play = function() {
this._state = l.State.PLAYING;
if (this._element) {
this._bindEnded();
this._element.play();
this._touchToPlay();
}
};
t._touchToPlay = function() {
this._src && this._src.loadMode === a.DOM_AUDIO && this._element.paused && c.push({
instance: this,
offset: 0,
audio: this._element
});
if (!o) {
o = !0;
var t = "ontouchend" in window ? "touchend" : "mousedown";
cc.game.canvas.addEventListener(t, (function() {
for (var t; t = c.pop(); ) t.audio.play(t.offset);
}));
}
};
t.destroy = function() {
this._element = null;
};
t.pause = function() {
if (this._element && this.getState() === l.State.PLAYING) {
this._unbindEnded();
this._element.pause();
this._state = l.State.PAUSED;
}
};
t.resume = function() {
if (this._element && this.getState() === l.State.PAUSED) {
this._bindEnded();
this._element.play();
this._state = l.State.PLAYING;
}
};
t.stop = function() {
if (this._element) {
this._element.pause();
try {
this._element.currentTime = 0;
} catch (t) {}
for (var t = 0; t < c.length; t++) if (c[t].instance === this) {
c.splice(t, 1);
break;
}
this._unbindEnded();
this.emit("stop");
this._state = l.State.STOPPED;
}
};
t.setLoop = function(t) {
this._loop = t;
this._element && (this._element.loop = t);
};
t.getLoop = function() {
return this._loop;
};
t.setVolume = function(t) {
this._volume = t;
this._element && (this._element.volume = t);
};
t.getVolume = function() {
return this._volume;
};
t.setCurrentTime = function(t) {
if (this._element) {
this._nextTime = 0;
this._unbindEnded();
this._bindEnded(function() {
this._bindEnded();
}.bind(this));
try {
this._element.currentTime = t;
} catch (i) {
var e = this._element;
if (e.addEventListener) {
e.addEventListener("loadedmetadata", (function i() {
e.removeEventListener("loadedmetadata", i);
e.currentTime = t;
}));
}
}
} else this._nextTime = t;
};
t.getCurrentTime = function() {
return this._element ? this._element.currentTime : 0;
};
t.getDuration = function() {
return this._element ? this._element.duration : 0;
};
t.getState = function(t) {
void 0 === t && (t = !0);
t && this._forceUpdatingState();
return this._state;
};
t._forceUpdatingState = function() {
var t = this._element;
t && (l.State.PLAYING === this._state && t.paused ? this._state = l.State.STOPPED : l.State.STOPPED !== this._state || t.paused || (this._state = l.State.PLAYING));
};
Object.defineProperty(t, "src", {
get: function() {
return this._src;
},
set: function(t) {
this._unbindEnded();
if (t) {
this._src = t;
if (t.loaded) this._onLoaded(); else {
var e = this;
t.once("load", (function() {
t === e._src && e._onLoaded();
}));
cc.loader.load({
url: t.nativeUrl,
skips: [ "Loader" ]
}, (function(e, i) {
e ? cc.error(e) : t.loaded || (t._nativeAsset = i);
}));
}
} else {
this._src = null;
this._element instanceof u ? this._element = null : this._element && (this._element.src = "");
this._state = l.State.INITIALZING;
}
return t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "paused", {
get: function() {
return !this._element || this._element.paused;
},
enumerable: !0,
configurable: !0
});
})(l.prototype);
n = cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE || cc.sys.browserType === cc.sys.BROWSER_TYPE_BAIDU || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC ? .01 : 0;
var u = function(t, e) {
this._audio = e;
this._context = s.__audioSupport.context;
this._buffer = t;
this._gainObj = this._context.createGain();
this.volume = 1;
this._gainObj.connect(this._context.destination);
this._loop = !1;
this._startTime = -1;
this._currentSource = null;
this.playedLength = 0;
this._currentTimer = null;
this._endCallback = function() {
this.onended && this.onended(this);
}.bind(this);
};
(function(t) {
t.play = function(t) {
if (this._currentSource && !this.paused) {
this._currentSource.onended = null;
this._currentSource.stop(0);
this.playedLength = 0;
}
var e = this._context.createBufferSource();
e.buffer = this._buffer;
e.connect(this._gainObj);
e.loop = this._loop;
this._startTime = this._context.currentTime;
(t = t || this.playedLength) && (this._startTime -= t);
var i, n = this._buffer.duration, r = t;
if (this._loop) e.start ? e.start(0, r) : e.notoGrainOn ? e.noteGrainOn(0, r) : e.noteOn(0, r); else {
i = n - t;
e.start ? e.start(0, r, i) : e.noteGrainOn ? e.noteGrainOn(0, r, i) : e.noteOn(0, r, i);
}
this._currentSource = e;
e.onended = this._endCallback;
if ((!e.context.state || "suspended" === e.context.state) && 0 === this._context.currentTime) {
var s = this;
clearTimeout(this._currentTimer);
this._currentTimer = setTimeout((function() {
0 === s._context.currentTime && c.push({
instance: s._audio,
offset: t,
audio: s
});
}), 10);
}
cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI && cc.sys.isMobile && "interrupted" === e.context.state && e.context.resume();
};
t.pause = function() {
clearTimeout(this._currentTimer);
if (!this.paused) {
this.playedLength = this._context.currentTime - this._startTime;
this.playedLength %= this._buffer.duration;
var t = this._currentSource;
this._currentSource = null;
this._startTime = -1;
t && t.stop(0);
}
};
Object.defineProperty(t, "paused", {
get: function() {
return (!this._currentSource || !this._currentSource.loop) && (-1 === this._startTime || this._context.currentTime - this._startTime > this._buffer.duration);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "loop", {
get: function() {
return this._loop;
},
set: function(t) {
this._currentSource && (this._currentSource.loop = t);
return this._loop = t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "volume", {
get: function() {
return this._volume;
},
set: function(t) {
this._volume = t;
if (this._gainObj.gain.setTargetAtTime) try {
this._gainObj.gain.setTargetAtTime(t, this._context.currentTime, n);
} catch (e) {
this._gainObj.gain.setTargetAtTime(t, this._context.currentTime, .01);
} else this._gainObj.gain.value = t;
if (s.os === s.OS_IOS && !this.paused && this._currentSource) {
this._currentSource.onended = null;
this.pause();
this.play();
}
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "currentTime", {
get: function() {
if (this.paused) return this.playedLength;
this.playedLength = this._context.currentTime - this._startTime;
this.playedLength %= this._buffer.duration;
return this.playedLength;
},
set: function(t) {
if (this.paused) this.playedLength = t; else {
this.pause();
this.playedLength = t;
this.play();
}
return t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "duration", {
get: function() {
return this._buffer.duration;
},
enumerable: !0,
configurable: !0
});
})(u.prototype);
e.exports = cc.Audio = l;
}), {
"../core/assets/CCAudioClip": 11,
"../core/event/event-target": 64,
"../core/platform/CCSys": 101
} ],
2: [ (function(t, e, i) {
"use strict";
var n = t("./CCAudio"), r = t("../core/assets/CCAudioClip"), s = cc.js, a = 0, o = s.createMap(!0), c = {}, l = [], u = function(t) {
if (t._shouldRecycleOnEnded) {
t._finishCallback = null;
t.off("ended");
t.off("stop");
t.src = null;
l.includes(t) || (l.length < 32 ? l.push(t) : t.destroy());
t._shouldRecycleOnEnded = !1;
}
}, h = function(t) {
var e = a++, i = c[t];
i || (i = c[t] = []);
if (d._maxAudioInstance <= i.length) {
var r = i.shift();
f(r).stop();
}
var s = l.pop() || new n(), h = function() {
if (f(this.id)) {
delete o[this.id];
var t = i.indexOf(this.id);
cc.js.array.fastRemoveAt(i, t);
}
u(this);
};
s.on("ended", (function() {
this._finishCallback && this._finishCallback();
h.call(this);
}), s);
s.on("stop", h, s);
s.id = e;
o[e] = s;
i.push(e);
return s;
}, f = function(t) {
return o[t];
}, _ = function(t) {
void 0 === t ? t = 1 : "string" == typeof t && (t = Number.parseFloat(t));
return t;
}, d = {
AudioState: n.State,
_maxWebAudioSize: 2097152,
_maxAudioInstance: 24,
_id2audio: o,
play: function(t, e, i) {
var n, s = t;
if ("string" == typeof t) {
cc.warnID(8401, "cc.audioEngine", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
n = h(s = t);
r._loadByUrl(s, (function(t, e) {
e && (n.src = e);
}));
} else {
if (!t) return;
s = t.nativeUrl;
(n = h(s)).src = t;
}
n._shouldRecycleOnEnded = !0;
n.setLoop(e || !1);
i = _(i);
n.setVolume(i);
n.play();
return n.id;
},
setLoop: function(t, e) {
var i = f(t);
i && i.setLoop && i.setLoop(e);
},
isLoop: function(t) {
var e = f(t);
return !(!e || !e.getLoop) && e.getLoop();
},
setVolume: function(t, e) {
var i = f(t);
i && i.setVolume(e);
},
getVolume: function(t) {
var e = f(t);
return e ? e.getVolume() : 1;
},
setCurrentTime: function(t, e) {
var i = f(t);
if (i) {
i.setCurrentTime(e);
return !0;
}
return !1;
},
getCurrentTime: function(t) {
var e = f(t);
return e ? e.getCurrentTime() : 0;
},
getDuration: function(t) {
var e = f(t);
return e ? e.getDuration() : 0;
},
getState: function(t) {
var e = f(t);
return e ? e.getState() : this.AudioState.ERROR;
},
setFinishCallback: function(t, e) {
var i = f(t);
i && (i._finishCallback = e);
},
pause: function(t) {
var e = f(t);
if (e) {
e.pause();
return !0;
}
return !1;
},
_pauseIDCache: [],
pauseAll: function() {
for (var t in o) {
var e = o[t];
if (e.getState() === n.State.PLAYING) {
this._pauseIDCache.push(t);
e.pause();
}
}
},
resume: function(t) {
var e = f(t);
e && e.resume();
},
resumeAll: function() {
for (var t = 0; t < this._pauseIDCache.length; ++t) {
var e = this._pauseIDCache[t], i = f(e);
i && i.resume();
}
this._pauseIDCache.length = 0;
},
stop: function(t) {
var e = f(t);
if (e) {
e.stop();
return !0;
}
return !1;
},
stopAll: function() {
for (var t in o) {
var e = o[t];
e && e.stop();
}
},
setMaxAudioInstance: function(t) {
this._maxAudioInstance = t;
},
getMaxAudioInstance: function() {
return this._maxAudioInstance;
},
uncache: function(t) {
var e = t;
if ("string" == typeof t) {
cc.warnID(8401, "cc.audioEngine", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
e = t;
} else {
if (!t) return;
e = t.nativeUrl;
}
var i = c[e];
if (i) for (;i.length > 0; ) {
var n = i.pop(), r = o[n];
if (r) {
r.stop();
delete o[n];
}
}
},
uncacheAll: function() {
this.stopAll();
var t;
for (var e in o) (t = o[e]) && t.destroy();
for (;t = l.pop(); ) t.destroy();
o = s.createMap(!0);
c = {};
},
getProfile: function(t) {},
preload: function(t, e) {
0;
cc.loader.load(t, e && function(t) {
t || e();
});
},
setMaxWebAudioSize: function(t) {
this._maxWebAudioSize = 1024 * t;
},
_breakCache: null,
_break: function() {
this._breakCache = [];
for (var t in o) {
var e = o[t];
if (e.getState() === n.State.PLAYING) {
this._breakCache.push(t);
e.pause();
}
}
},
_restore: function() {
if (this._breakCache) {
for (;this._breakCache.length > 0; ) {
var t = this._breakCache.pop(), e = f(t);
e && e.resume && e.resume();
}
this._breakCache = null;
}
},
_music: {
id: -1,
loop: !1,
volume: 1
},
_effect: {
volume: 1,
pauseCache: []
},
playMusic: function(t, e) {
var i = this._music;
this.stop(i.id);
i.id = this.play(t, e, i.volume);
i.loop = e;
return i.id;
},
stopMusic: function() {
this.stop(this._music.id);
},
pauseMusic: function() {
this.pause(this._music.id);
return this._music.id;
},
resumeMusic: function() {
this.resume(this._music.id);
return this._music.id;
},
getMusicVolume: function() {
return this._music.volume;
},
setMusicVolume: function(t) {
t = _(t);
var e = this._music;
e.volume = t;
this.setVolume(e.id, e.volume);
return e.volume;
},
isMusicPlaying: function() {
return this.getState(this._music.id) === this.AudioState.PLAYING;
},
playEffect: function(t, e) {
return this.play(t, e || !1, this._effect.volume);
},
setEffectsVolume: function(t) {
t = _(t);
var e = this._music.id;
this._effect.volume = t;
for (var i in o) {
var n = o[i];
n && n.id !== e && d.setVolume(i, t);
}
},
getEffectsVolume: function() {
return this._effect.volume;
},
pauseEffect: function(t) {
return this.pause(t);
},
pauseAllEffects: function() {
var t = this._music.id, e = this._effect;
e.pauseCache.length = 0;
for (var i in o) {
var n = o[i];
if (n && n.id !== t) {
if (n.getState() === this.AudioState.PLAYING) {
e.pauseCache.push(i);
n.pause();
}
}
}
},
resumeEffect: function(t) {
this.resume(t);
},
resumeAllEffects: function() {
for (var t = this._effect.pauseCache, e = 0; e < t.length; ++e) {
var i = t[e], n = o[i];
n && n.resume();
}
},
stopEffect: function(t) {
return this.stop(t);
},
stopAllEffects: function() {
var t = this._music.id;
for (var e in o) {
var i = o[e];
if (i && i.id !== t) {
i.getState() === d.AudioState.PLAYING && i.stop();
}
}
}
};
e.exports = cc.audioEngine = d;
}), {
"../core/assets/CCAudioClip": 11,
"./CCAudio": 1
} ],
3: [ (function(t, e, i) {
"use strict";
var n, r = t("./platform/utils"), s = (t("../../DebugInfos"), "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md");
cc.log = cc.warn = cc.error = cc.assert = console.log.bind ? console.log.bind(console) : console.log;
cc._throw = function(t) {
r.callInNextTick((function() {
throw t;
}));
};
function a(t) {
return function() {
var e = arguments[0], i = t + " " + e + ", please go to " + s + "#" + e + " to see details.";
if (1 === arguments.length) return i;
if (2 === arguments.length) return i + " Arguments: " + arguments[1];
var n = cc.js.shiftArguments.apply(null, arguments);
return i + " Arguments: " + n.join(", ");
};
}
var o = a("Log");
cc.logID = function() {
cc.log(o.apply(null, arguments));
};
var c = a("Warning");
cc.warnID = function() {
cc.warn(c.apply(null, arguments));
};
var l = a("Error");
cc.errorID = function() {
cc.error(l.apply(null, arguments));
};
var u = a("Assert");
cc.assertID = function(t) {
t || cc.assert(!1, u.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};
var h = cc.Enum({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
e.exports = cc.debug = {
DebugMode: h,
_resetDebugSetting: function(t) {
cc.log = cc.warn = cc.error = cc.assert = function() {};
if (t !== h.NONE) {
if (t > h.ERROR) {
var e = function(t) {
if (cc.game.canvas) {
if (!n) {
var e = document.createElement("Div");
e.setAttribute("id", "logInfoDiv");
e.setAttribute("width", "200");
e.setAttribute("height", cc.game.canvas.height);
var i = e.style;
i.zIndex = "99999";
i.position = "absolute";
i.top = i.left = "0";
(n = document.createElement("textarea")).setAttribute("rows", "20");
n.setAttribute("cols", "30");
n.setAttribute("disabled", "true");
var r = n.style;
r.backgroundColor = "transparent";
r.borderBottom = "1px solid #cccccc";
r.borderTopWidth = r.borderLeftWidth = r.borderRightWidth = "0px";
r.borderTopStyle = r.borderLeftStyle = r.borderRightStyle = "none";
r.padding = "0px";
r.margin = 0;
e.appendChild(n);
cc.game.canvas.parentNode.appendChild(e);
}
n.value = n.value + t + "\r\n";
n.scrollTop = n.scrollHeight;
}
};
cc.error = function() {
e("ERROR :  " + cc.js.formatStr.apply(null, arguments));
};
cc.assert = function(t, i) {
if (!t && i) {
i = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
e("ASSERT: " + i);
}
};
t !== h.ERROR_FOR_WEB_PAGE && (cc.warn = function() {
e("WARN :  " + cc.js.formatStr.apply(null, arguments));
});
t === h.INFO_FOR_WEB_PAGE && (cc.log = function() {
e(cc.js.formatStr.apply(null, arguments));
});
} else if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
throw new Error(e);
}
};
}
t !== h.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
t === h.INFO && ("JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log);
}
},
getError: a("ERROR"),
isDisplayStats: function() {
return !!cc.profiler && cc.profiler.isShowingStats();
},
setDisplayStats: function(t) {
if (cc.profiler && cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
t ? cc.profiler.showStats() : cc.profiler.hideStats();
cc.game.config.showFPS = !!t;
}
}
};
}), {
"../../DebugInfos": void 0,
"./platform/utils": 116
} ],
4: [ (function(t, e, i) {
"use strict";
var n = t("./event/event-target"), r = t("./load-pipeline/auto-release-utils"), s = t("./component-scheduler"), a = t("./node-activator"), o = t("./platform/CCObject"), c = t("./CCGame"), l = t("./renderer"), u = t("./event-manager"), h = t("./CCScheduler");
cc.Director = function() {
n.call(this);
this._paused = !1;
this._purgeDirectorInNextLoop = !1;
this._winSizeInPoints = null;
this._loadingScene = "";
this._scene = null;
this._totalFrames = 0;
this._lastUpdate = 0;
this._deltaTime = 0;
this._startTime = 0;
this._maxParticleDeltaTime = 0;
this._scheduler = null;
this._compScheduler = null;
this._nodeActivator = null;
this._actionManager = null;
var t = this;
c.on(c.EVENT_SHOW, (function() {
t._lastUpdate = performance.now();
}));
c.once(c.EVENT_ENGINE_INITED, this.init, this);
};
cc.Director.prototype = {
constructor: cc.Director,
init: function() {
this._totalFrames = 0;
this._lastUpdate = performance.now();
this._startTime = this._lastUpdate;
this._paused = !1;
this._purgeDirectorInNextLoop = !1;
this._winSizeInPoints = cc.size(0, 0);
this._scheduler = new h();
if (cc.ActionManager) {
this._actionManager = new cc.ActionManager();
this._scheduler.scheduleUpdate(this._actionManager, h.PRIORITY_SYSTEM, !1);
} else this._actionManager = null;
this.sharedInit();
return !0;
},
sharedInit: function() {
this._compScheduler = new s();
this._nodeActivator = new a();
u && u.setEnabled(!0);
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
this._scheduler.scheduleUpdate(this._animationManager, h.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
this._scheduler.scheduleUpdate(this._collisionManager, h.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this._scheduler.scheduleUpdate(this._physicsManager, h.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
if (cc.Physics3DManager) {
this._physics3DManager = new cc.Physics3DManager();
this._scheduler.scheduleUpdate(this._physics3DManager, h.PRIORITY_SYSTEM, !1);
} else this._physics3DManager = null;
cc._widgetManager && cc._widgetManager.init(this);
cc.loader.init(this);
},
calculateDeltaTime: function(t) {
t || (t = performance.now());
this._deltaTime = t > this._lastUpdate ? (t - this._lastUpdate) / 1e3 : 0;
0;
this._lastUpdate = t;
},
convertToGL: function(t) {
var e = c.container, i = cc.view, n = e.getBoundingClientRect(), r = n.left + window.pageXOffset - e.clientLeft, s = n.top + window.pageYOffset - e.clientTop, a = i._devicePixelRatio * (t.x - r), o = i._devicePixelRatio * (s + n.height - t.y);
return i._isRotated ? cc.v2(i._viewportRect.width - o, a) : cc.v2(a, o);
},
convertToUI: function(t) {
var e = c.container, i = cc.view, n = e.getBoundingClientRect(), r = n.left + window.pageXOffset - e.clientLeft, s = n.top + window.pageYOffset - e.clientTop, a = cc.v2(0, 0);
if (i._isRotated) {
a.x = r + t.y / i._devicePixelRatio;
a.y = s + n.height - (i._viewportRect.width - t.x) / i._devicePixelRatio;
} else {
a.x = r + t.x * i._devicePixelRatio;
a.y = s + n.height - t.y * i._devicePixelRatio;
}
return a;
},
end: function() {
this._purgeDirectorInNextLoop = !0;
},
getWinSize: function() {
return cc.size(cc.winSize);
},
getWinSizeInPixels: function() {
return cc.size(cc.winSize);
},
pause: function() {
this._paused || (this._paused = !0);
},
purgeCachedData: function() {
cc.loader.releaseAll();
},
purgeDirector: function() {
this._scheduler.unscheduleAll();
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
u && u.setEnabled(!1);
cc.isValid(this._scene) && this._scene.destroy();
this._scene = null;
cc.renderer.clear();
cc.AssetLibrary.resetBuiltins();
cc.game.pause();
cc.loader.releaseAll();
},
reset: function() {
this.purgeDirector();
u && u.setEnabled(!0);
this._actionManager && this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._animationManager && this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
cc.game.resume();
},
runSceneImmediate: function(t, e, i) {
cc.assertID(t instanceof cc.Scene, 1216);
t._load();
for (var n = Object.keys(c._persistRootNodes).map((function(t) {
return c._persistRootNodes[t];
})), s = 0; s < n.length; s++) {
var a = n[s], l = t.getChildByUuid(a.uuid);
if (l) {
var u = l.getSiblingIndex();
l._destroyImmediate();
t.insertChild(a, u);
} else a.parent = t;
}
var h = this._scene, f = h && h.autoReleaseAssets && h.dependAssets;
r.autoRelease(f, t.dependAssets, n);
cc.isValid(h) && h.destroy();
this._scene = null;
o._deferredDestroy();
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
this._scene = t;
t._activate();
cc.game.resume();
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
cc.assertID(t instanceof cc.Scene, 1216);
t._load();
this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
this.runSceneImmediate(t, e, i);
}), this);
},
_getSceneUuid: function(t) {
var e = c._sceneInfos;
if ("string" == typeof t) {
t.endsWith(".fire") || (t += ".fire");
"/" === t[0] || t.startsWith("db://") || (t = "/" + t);
for (var i = 0; i < e.length; i++) {
var n = e[i];
if (n.url.endsWith(t)) return n;
}
} else if ("number" == typeof t) {
if (0 <= t && t < e.length) return e[t];
cc.errorID(1206, t);
} else cc.errorID(1207, t);
return null;
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.warnID(1208, t, this._loadingScene);
return !1;
}
var n = this._getSceneUuid(t);
if (n) {
var r = n.uuid;
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
this._loadSceneByUuid(r, e, i);
return !0;
}
cc.errorID(1209, t);
return !1;
},
preloadScene: function(t, e, i) {
if (void 0 === i) {
i = e;
e = null;
}
var n = this._getSceneUuid(t);
if (n) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: n.uuid,
type: "uuid"
}, e, (function(e, n) {
e && cc.errorID(1210, t, e.message);
i && i(e, n);
}));
} else {
var r = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
i(new Error(r));
cc.error("preloadScene: " + r);
}
},
_loadSceneByUuid: function(t, e, i, n) {
0;
console.time("LoadScene " + t);
cc.AssetLibrary.loadAsset(t, (function(n, r) {
console.timeEnd("LoadScene " + t);
var s = cc.director;
s._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
} else {
if (r instanceof cc.SceneAsset) {
var a = r.scene;
a._id = r._uuid;
a._name = r._name;
s.runSceneImmediate(a, i, e);
return;
}
n = "The asset " + t + " is not a scene";
cc.error(n);
}
e && e(n);
}));
},
resume: function() {
if (this._paused) {
this._lastUpdate = performance.now();
this._lastUpdate || cc.logID(1200);
this._paused = !1;
this._deltaTime = 0;
}
},
setDepthTest: function(t) {
cc.Camera.main && (cc.Camera.main.depth = !!t);
},
setClearColor: function(t) {
cc.Camera.main && (cc.Camera.main.backgroundColor = t);
},
getRunningScene: function() {
return this._scene;
},
getScene: function() {
return this._scene;
},
getAnimationInterval: function() {
return 1e3 / c.getFrameRate();
},
setAnimationInterval: function(t) {
c.setFrameRate(Math.round(1e3 / t));
},
getDeltaTime: function() {
return this._deltaTime;
},
getTotalTime: function() {
return performance.now() - this._startTime;
},
getTotalFrames: function() {
return this._totalFrames;
},
isPaused: function() {
return this._paused;
},
getScheduler: function() {
return this._scheduler;
},
setScheduler: function(t) {
this._scheduler !== t && (this._scheduler = t);
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getPhysics3DManager: function() {
return this._physics3DManager;
},
startAnimation: function() {
cc.game.resume();
},
stopAnimation: function() {
cc.game.pause();
},
_resetDeltaTime: function() {
this._lastUpdate = performance.now();
this._deltaTime = 0;
},
mainLoop: function(t) {
if (this._purgeDirectorInNextLoop) {
this._purgeDirectorInNextLoop = !1;
this.purgeDirector();
} else {
this.calculateDeltaTime(t);
if (!this._paused) {
this.emit(cc.Director.EVENT_BEFORE_UPDATE);
this._compScheduler.startPhase();
this._compScheduler.updatePhase(this._deltaTime);
this._scheduler.update(this._deltaTime);
this._compScheduler.lateUpdatePhase(this._deltaTime);
this._compScheduler.clearup();
this.emit(cc.Director.EVENT_AFTER_UPDATE);
o._deferredDestroy();
}
this.emit(cc.Director.EVENT_BEFORE_DRAW);
l.render(this._scene, this._deltaTime);
this.emit(cc.Director.EVENT_AFTER_DRAW);
u.frameUpdateListeners();
this._totalFrames++;
}
},
__fastOn: function(t, e, i) {
this.on(t, e, i);
},
__fastOff: function(t, e, i) {
this.off(t, e, i);
}
};
cc.js.addon(cc.Director.prototype, n.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_VISIT = "director_before_draw";
cc.Director.EVENT_AFTER_VISIT = "director_before_draw";
cc.Director.EVENT_BEFORE_DRAW = "director_before_draw";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.PROJECTION_2D = 0;
cc.Director.PROJECTION_3D = 1;
cc.Director.PROJECTION_CUSTOM = 3;
cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_2D;
cc.Director.EVENT_BEFORE_PHYSICS = "director_before_physics";
cc.Director.EVENT_AFTER_PHYSICS = "director_after_physics";
cc.director = new cc.Director();
e.exports = cc.director;
}), {
"./CCGame": 5,
"./CCScheduler": 9,
"./component-scheduler": 39,
"./event-manager": 62,
"./event/event-target": 64,
"./load-pipeline/auto-release-utils": 74,
"./node-activator": 90,
"./platform/CCObject": 98,
"./renderer": 123
} ],
5: [ (function(t, e, i) {
"use strict";
var n = t("./event/event-target");
t("../audio/CCAudioEngine");
var r = t("./CCDebug"), s = t("./renderer/index.js"), a = t("../core/renderer/utils/dynamic-atlas/manager"), o = {
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESTART: "game_on_restart",
EVENT_GAME_INITED: "game_inited",
EVENT_ENGINE_INITED: "engine_inited",
EVENT_RENDERER_INITED: "engine_inited",
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
_persistRootNodes: {},
_paused: !0,
_configLoaded: !1,
_isCloning: !1,
_prepared: !1,
_rendererInitialized: !1,
_renderContext: null,
_intervalId: null,
_lastTime: null,
_frameTime: null,
_sceneInfos: [],
frame: null,
container: null,
canvas: null,
renderType: -1,
config: null,
onStart: null,
setFrameRate: function(t) {
this.config.frameRate = t;
this._intervalId && window.cancelAnimFrame(this._intervalId);
this._intervalId = 0;
this._paused = !0;
this._setAnimFrame();
this._runMainLoop();
},
getFrameRate: function() {
return this.config.frameRate;
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
if (!this._paused) {
this._paused = !0;
cc.audioEngine && cc.audioEngine._break();
this._intervalId && window.cancelAnimFrame(this._intervalId);
this._intervalId = 0;
}
},
resume: function() {
if (this._paused) {
this._paused = !1;
cc.audioEngine && cc.audioEngine._restore();
cc.director._resetDeltaTime();
this._runMainLoop();
}
},
isPaused: function() {
return this._paused;
},
restart: function() {
cc.director.once(cc.Director.EVENT_AFTER_DRAW, (function() {
for (var t in o._persistRootNodes) o.removePersistRootNode(o._persistRootNodes[t]);
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.audioEngine && cc.audioEngine.uncacheAll();
cc.director.reset();
o.pause();
cc.AssetLibrary._loadBuiltins((function() {
o.onStart();
o.emit(o.EVENT_RESTART);
}));
}));
},
end: function() {
close();
},
_initEngine: function() {
if (!this._rendererInitialized) {
this._initRenderer();
this._initEvents();
this.emit(this.EVENT_ENGINE_INITED);
}
},
_loadPreviewScript: function(t) {
t();
},
_prepareFinished: function(t) {
var e = this;
this._initEngine();
this._setAnimFrame();
cc.AssetLibrary._loadBuiltins((function() {
console.log("Cocos Creator v" + cc.ENGINE_VERSION);
e._prepared = !0;
e._runMainLoop();
e.emit(e.EVENT_GAME_INITED);
t && t();
}));
},
eventTargetOn: n.prototype.on,
eventTargetOnce: n.prototype.once,
on: function(t, e, i, n) {
this._prepared && t === this.EVENT_ENGINE_INITED || !this._paused && t === this.EVENT_GAME_INITED ? e.call(i) : this.eventTargetOn(t, e, i, n);
},
once: function(t, e, i) {
this._prepared && t === this.EVENT_ENGINE_INITED || !this._paused && t === this.EVENT_GAME_INITED ? e.call(i) : this.eventTargetOnce(t, e, i);
},
prepare: function(t) {
var e = this;
if (this._prepared) t && t(); else {
var i = this.config.jsList;
i && i.length > 0 ? cc.loader.load(i, (function(i) {
if (i) throw new Error(JSON.stringify(i));
e._loadPreviewScript((function() {
e._prepareFinished(t);
}));
})) : this._loadPreviewScript((function() {
e._prepareFinished(t);
}));
}
},
run: function(t, e) {
this._initConfig(t);
this.onStart = e;
this.prepare(o.onStart && o.onStart.bind(o));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
}
} else cc.warnID(3800);
},
removePersistRootNode: function(t) {
var e = t.uuid || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_setAnimFrame: function() {
this._lastTime = performance.now();
var t = o.config.frameRate;
this._frameTime = 1e3 / t;
cc.director._maxParticleDeltaTime = this._frameTime / 1e3 * 2;
jsb.setPreferredFramesPerSecond(t);
window.requestAnimFrame = window.requestAnimationFrame;
window.cancelAnimFrame = window.cancelAnimationFrame;
},
_stTime: function(t) {
var e = performance.now(), i = Math.max(0, o._frameTime - (e - o._lastTime)), n = window.setTimeout((function() {
t();
}), i);
o._lastTime = e + i;
return n;
},
_ctTime: function(t) {
window.clearTimeout(t);
},
_runMainLoop: function() {
0;
if (this._prepared) {
var t, e = this, i = e.config, n = cc.director;
i.frameRate;
r.setDisplayStats(i.showFPS);
t = function(i) {
if (!e._paused) {
e._intervalId = window.requestAnimFrame(t);
0;
n.mainLoop(i);
}
};
e._intervalId = window.requestAnimFrame(t);
e._paused = !1;
}
},
_initConfig: function(t) {
"number" != typeof t.debugMode && (t.debugMode = 0);
t.exposeClassName = !!t.exposeClassName;
"number" != typeof t.frameRate && (t.frameRate = 60);
var e = t.renderMode;
("number" != typeof e || e > 2 || e < 0) && (t.renderMode = 0);
"boolean" != typeof t.registerSystemEvent && (t.registerSystemEvent = !0);
t.showFPS = 1 !== e && !!t.showFPS;
this._sceneInfos = t.scenes || [];
this.collisionMatrix = t.collisionMatrix || [];
this.groupList = t.groupList || [];
r._resetDebugSetting(t.debugMode);
this.config = t;
this._configLoaded = !0;
},
_determineRenderType: function() {
var t = this.config, e = parseInt(t.renderMode) || 0;
this.renderType = this.RENDER_TYPE_CANVAS;
var i = !1;
if (0 === e) {
if (cc.sys.capabilities.opengl) {
this.renderType = this.RENDER_TYPE_WEBGL;
i = !0;
} else if (cc.sys.capabilities.canvas) {
this.renderType = this.RENDER_TYPE_CANVAS;
i = !0;
}
} else if (1 === e && cc.sys.capabilities.canvas) {
this.renderType = this.RENDER_TYPE_CANVAS;
i = !0;
} else if (2 === e && cc.sys.capabilities.opengl) {
this.renderType = this.RENDER_TYPE_WEBGL;
i = !0;
}
if (!i) throw new Error(r.getError(3820, e));
},
_initRenderer: function() {
if (!this._rendererInitialized) {
var t, e;
this.config.id;
this.container = e = document.createElement("DIV");
this.frame = e.parentNode === document.body ? document.documentElement : e.parentNode;
t = window.__canvas;
this.canvas = t;
this._determineRenderType();
if (this.renderType === this.RENDER_TYPE_WEBGL) {
var i = {
stencil: !0,
antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS
};
s.initWebGL(t, i);
this._renderContext = s.device._gl;
!cc.macro.CLEANUP_IMAGE_CACHE && a && (a.enabled = !0);
}
if (!this._renderContext) {
this.renderType = this.RENDER_TYPE_CANVAS;
s.initCanvas(t);
this._renderContext = s.device._ctx;
}
this.canvas.oncontextmenu = function() {
if (!cc._isContextMenuEnable) return !1;
};
this._rendererInitialized = !0;
}
},
_initEvents: function() {
var t, e = window;
this.config.registerSystemEvent && cc.internal.inputManager.registerSystemEvent(this.canvas);
"undefined" != typeof document.hidden ? t = "hidden" : "undefined" != typeof document.mozHidden ? t = "mozHidden" : "undefined" != typeof document.msHidden ? t = "msHidden" : "undefined" != typeof document.webkitHidden && (t = "webkitHidden");
var i = !1;
function n() {
if (!i) {
i = !0;
o.emit(o.EVENT_HIDE);
}
}
function r(t, e, n, r, s) {
if (i) {
i = !1;
o.emit(o.EVENT_SHOW, t, e, n, r, s);
}
}
if (t) for (var s = [ "visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange" ], a = 0; a < s.length; a++) document.addEventListener(s[a], (function(e) {
var i = document[t];
(i = i || e.hidden) ? n() : r();
})); else {
e.addEventListener("blur", n);
e.addEventListener("focus", r);
}
navigator.userAgent.indexOf("MicroMessenger") > -1 && (e.onfocus = r);
if ("onpageshow" in window && "onpagehide" in window) {
e.addEventListener("pagehide", n);
e.addEventListener("pageshow", r);
document.addEventListener("pagehide", n);
document.addEventListener("pageshow", r);
}
this.on(o.EVENT_HIDE, (function() {
o.pause();
}));
this.on(o.EVENT_SHOW, (function() {
o.resume();
}));
}
};
n.call(o);
cc.js.addon(o, n.prototype);
cc.game = e.exports = o;
}), {
"../audio/CCAudioEngine": 2,
"../core/renderer/utils/dynamic-atlas/manager": void 0,
"./CCDebug": 3,
"./event/event-target": 64,
"./renderer/index.js": 123
} ],
6: [ (function(t, e, i) {
"use strict";
var n = t("./value-types"), r = t("./utils/base-node"), s = t("./utils/prefab-helper"), a = t("./utils/trans-pool").NodeMemPool, o = t("./utils/affine-transform"), c = t("./event-manager"), l = t("./platform/CCMacro"), u = t("./platform/js"), h = (t("./event/event"), 
t("./event/event-target")), f = t("./renderer/render-flow"), _ = cc.Object.Flags.Destroying, d = Math.PI / 180, p = !!cc.ActionManager, v = function() {}, g = new n.Vec3(), m = new n.Quat(), y = new n.Vec3(), E = new n.Vec3(), C = new n.Quat(), A = new n.Quat(), T = new n.Vec3(), x = new n.Vec3(), S = new n.Vec3(), b = new n.Vec3(), R = new n.Vec3(), L = new n.Quat(), w = new n.Quat(), I = new n.Vec3(), O = new n.Quat(), D = new n.Vec3(), M = new n.Quat(), N = new n.Vec3(), P = new n.Vec3(), F = new n.Quat(), z = new n.Quat(), B = (new n.Quat(), 
cc.mat4()), U = new n.Vec3(), k = new Array(16);
k.length = 0;
var V = cc.Enum({
DEBUG: 31
}), H = cc.Enum({
POSITION: 1,
SCALE: 2,
ROTATION: 4,
SKEW: 8,
TRS: 7,
RS: 6,
TRSS: 15,
PHYSICS_POSITION: 16,
PHYSICS_SCALE: 32,
PHYSICS_ROTATION: 64,
PHYSICS_TRS: 112,
PHYSICS_RS: 96,
ALL_POSITION: 17,
ALL_SCALE: 34,
ALL_ROTATION: 68,
ALL_TRS: 119,
ALL: 65535
}), G = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel",
POSITION_CHANGED: "position-changed",
ROTATION_CHANGED: "rotation-changed",
SCALE_CHANGED: "scale-changed",
SIZE_CHANGED: "size-changed",
ANCHOR_CHANGED: "anchor-changed",
COLOR_CHANGED: "color-changed",
CHILD_ADDED: "child-added",
CHILD_REMOVED: "child-removed",
CHILD_REORDER: "child-reorder",
GROUP_CHANGED: "group-changed",
SIBLING_ORDER_CHANGED: "sibling-order-changed"
}), W = [ G.TOUCH_START, G.TOUCH_MOVE, G.TOUCH_END, G.TOUCH_CANCEL ], j = [ G.MOUSE_DOWN, G.MOUSE_ENTER, G.MOUSE_MOVE, G.MOUSE_LEAVE, G.MOUSE_UP, G.MOUSE_WHEEL ], Y = !0, X = function(t, e) {
if (0 !== t) {
var i = "";
Y && cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", i);
Y = !1;
}
}, q = null, K = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
e.type = G.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
return !0;
}
return !1;
}, Z = function(t, e) {
var i = this.owner;
e.type = G.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
}, Q = function(t, e) {
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = G.TOUCH_END : e.type = G.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
}, $ = function(t, e) {
t.getLocation();
var i = this.owner;
e.type = G.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
}, J = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = G.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
}
}, tt = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
if (!this._previousIn) {
if (q && q._mouseListener) {
t.type = G.MOUSE_LEAVE;
q.dispatchEvent(t);
q._mouseListener._previousIn = !1;
}
q = this.owner;
t.type = G.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = G.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = G.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
q = null;
}
t.stopPropagation();
}, et = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = G.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
t.stopPropagation();
}
}, it = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = G.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
t.stopPropagation();
}
};
function nt(t, e) {
if (e) {
for (var i = 0, n = null, r = t; r && cc.Node.isNode(r); r = r._parent, ++i) if (r.getComponent(e)) {
var s = {
index: i,
node: r
};
n ? n.push(s) : n = [ s ];
}
return n;
}
return null;
}
function rt(t, e) {
if (!(t._objFlags & _)) {
var i = 0;
if (t._bubblingListeners) for (;i < e.length; ++i) if (t._bubblingListeners.hasEventListener(e[i])) return !0;
if (t._capturingListeners) for (;i < e.length; ++i) if (t._capturingListeners.hasEventListener(e[i])) return !0;
return !1;
}
return !0;
}
function st(t, e) {
var i, n;
e.target = t;
k.length = 0;
t._getCapturingTargets(e.type, k);
e.eventPhase = 1;
for (n = k.length - 1; n >= 0; --n) if ((i = k[n])._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.emit(e.type, e, k);
if (e._propagationStopped) {
k.length = 0;
return;
}
}
k.length = 0;
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.emit(e.type, e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.emit(e.type, e);
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, k);
e.eventPhase = 3;
for (n = 0; n < k.length; ++n) if ((i = k[n])._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.emit(e.type, e);
if (e._propagationStopped) {
k.length = 0;
return;
}
}
}
k.length = 0;
}
function at(t) {
var e = t.groupIndex;
0 === e && t.parent && (e = at(t.parent));
return e;
}
function ot(t) {
var e = at(t);
t._cullingMask = 1 << e;
t._proxy && t._proxy.updateCullingMask();
for (var i = 0; i < t._children.length; i++) ot(t._children[i]);
}
function ct() {
if (this._localMatDirty & H.TRSS) {
var t = this._matrix, e = t.m;
n.Trs.toMat4(t, this._trs);
if (this._skewX || this._skewY) {
var i = e[0], r = e[1], s = e[4], a = e[5], o = Math.tan(this._skewX * d), c = Math.tan(this._skewY * d);
Infinity === o && (o = 99999999);
Infinity === c && (c = 99999999);
e[0] = i + s * c;
e[1] = r + a * c;
e[4] = s + i * o;
e[5] = a + r * o;
}
this._localMatDirty &= ~H.TRSS;
this._worldMatDirty = !0;
}
}
function lt() {
var t = this._localMatDirty;
if (t & H.TRSS) {
var e = this._matrix.m, i = this._trs;
if (t & (H.RS | H.SKEW)) {
var n = -this._eulerAngles.z, r = this._skewX || this._skewY, s = i[7], a = i[8];
if (n || r) {
var o = 1, c = 0, l = 0, u = 1;
if (n) {
var h = n * d;
l = Math.sin(h);
o = u = Math.cos(h);
c = -l;
}
e[0] = o *= s;
e[1] = c *= s;
e[4] = l *= a;
e[5] = u *= a;
if (r) {
var f = e[0], _ = e[1], p = e[4], v = e[5], g = Math.tan(this._skewX * d), m = Math.tan(this._skewY * d);
Infinity === g && (g = 99999999);
Infinity === m && (m = 99999999);
e[0] = f + p * m;
e[1] = _ + v * m;
e[4] = p + f * g;
e[5] = v + _ * g;
}
} else {
e[0] = s;
e[1] = 0;
e[4] = 0;
e[5] = a;
}
}
e[12] = i[0];
e[13] = i[1];
this._localMatDirty &= ~H.TRSS;
this._worldMatDirty = !0;
}
}
function ut() {
this._localMatDirty & H.TRSS && this._updateLocalMatrix();
if (this._parent) {
var t = this._parent._worldMatrix;
n.Mat4.mul(this._worldMatrix, t, this._matrix);
} else n.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
}
function ht() {
this._localMatDirty & H.TRSS && this._updateLocalMatrix();
var t = this._parent;
t ? this._mulMat(this._worldMatrix, t._worldMatrix, this._matrix) : n.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
}
function ft(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[4], l = n[5], u = n[12], h = n[13], f = r[0], _ = r[1], d = r[4], p = r[5], v = r[12], g = r[13];
if (0 !== o || 0 !== c) {
s[0] = f * a + _ * c;
s[1] = f * o + _ * l;
s[4] = d * a + p * c;
s[5] = d * o + p * l;
s[12] = a * v + c * g + u;
s[13] = o * v + l * g + h;
} else {
s[0] = f * a;
s[1] = _ * l;
s[4] = d * a;
s[5] = p * l;
s[12] = a * v + u;
s[13] = l * g + h;
}
}
var _t = n.Mat4.mul, dt = {
name: "cc.Node",
extends: r,
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_contentSize: cc.Size,
_anchorPoint: cc.v2(.5, .5),
_position: void 0,
_scale: void 0,
_trs: null,
_eulerAngles: cc.Vec3,
_skewX: 0,
_skewY: 0,
_zIndex: {
default: void 0,
type: cc.Integer
},
_localZOrder: {
default: 0,
serializable: !1
},
_is3DNode: !1,
_groupIndex: {
default: 0,
formerlySerializedAs: "groupIndex"
},
groupIndex: {
get: function() {
return this._groupIndex;
},
set: function(t) {
this._groupIndex = t;
ot(this);
this.emit(G.GROUP_CHANGED, this);
}
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
}
},
x: {
get: function() {
return this._trs[0];
},
set: function(t) {
var e = this._trs;
if (t !== e[0]) {
0;
e[0] = t;
this.setLocalDirty(H.ALL_POSITION);
1 & this._eventMask && this.emit(G.POSITION_CHANGED);
}
}
},
y: {
get: function() {
return this._trs[1];
},
set: function(t) {
var e = this._trs;
if (t !== e[1]) {
0;
e[1] = t;
this.setLocalDirty(H.ALL_POSITION);
1 & this._eventMask && this.emit(G.POSITION_CHANGED);
}
}
},
z: {
get: function() {
return this._trs[2];
},
set: function(t) {
var e = this._trs;
if (t !== e[2]) {
e[2] = t;
this.setLocalDirty(H.ALL_POSITION);
1 & this._eventMask && this.emit(G.POSITION_CHANGED);
}
}
},
rotation: {
get: function() {
0;
return -this.angle;
},
set: function(t) {
0;
this.angle = -t;
}
},
angle: {
get: function() {
return this._eulerAngles.z;
},
set: function(t) {
n.Vec3.set(this._eulerAngles, 0, 0, t);
n.Trs.fromAngleZ(this._trs, t);
this.setLocalDirty(H.ALL_ROTATION);
4 & this._eventMask && this.emit(G.ROTATION_CHANGED);
}
},
rotationX: {
get: function() {
0;
return this._eulerAngles.x;
},
set: function(t) {
0;
if (this._eulerAngles.x !== t) {
this._eulerAngles.x = t;
this._eulerAngles.x === this._eulerAngles.y ? n.Trs.fromAngleZ(this._trs, -t) : n.Trs.fromEulerNumber(this._trs, t, this._eulerAngles.y, 0);
this.setLocalDirty(H.ALL_ROTATION);
4 & this._eventMask && this.emit(G.ROTATION_CHANGED);
}
}
},
rotationY: {
get: function() {
0;
return this._eulerAngles.y;
},
set: function(t) {
0;
if (this._eulerAngles.y !== t) {
this._eulerAngles.y = t;
this._eulerAngles.x === this._eulerAngles.y ? n.Trs.fromAngleZ(this._trs, -t) : n.Trs.fromEulerNumber(this._trs, this._eulerAngles.x, t, 0);
this.setLocalDirty(H.ALL_ROTATION);
4 & this._eventMask && this.emit(G.ROTATION_CHANGED);
}
}
},
eulerAngles: {
get: function() {
return n.Trs.toEuler(this._eulerAngles, this._trs);
},
set: function(t) {
0;
n.Trs.fromEuler(this._trs, t);
this.setLocalDirty(H.ALL_ROTATION);
4 & this._eventMask && this.emit(G.ROTATION_CHANGED);
}
},
quat: {
get: function() {
var t = this._trs;
return new n.Quat(t[3], t[4], t[5], t[6]);
},
set: function(t) {
this.setRotation(t);
}
},
scale: {
get: function() {
return this._trs[7];
},
set: function(t) {
this.setScale(t);
}
},
scaleX: {
get: function() {
return this._trs[7];
},
set: function(t) {
if (this._trs[7] !== t) {
this._trs[7] = t;
this.setLocalDirty(H.ALL_SCALE);
2 & this._eventMask && this.emit(G.SCALE_CHANGED);
}
}
},
scaleY: {
get: function() {
return this._trs[8];
},
set: function(t) {
if (this._trs[8] !== t) {
this._trs[8] = t;
this.setLocalDirty(H.ALL_SCALE);
2 & this._eventMask && this.emit(G.SCALE_CHANGED);
}
}
},
scaleZ: {
get: function() {
return this._trs[9];
},
set: function(t) {
if (this._trs[9] !== t) {
this._trs[9] = t;
this.setLocalDirty(H.ALL_SCALE);
2 & this._eventMask && this.emit(G.SCALE_CHANGED);
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
X(t);
this._skewX = t;
this.setLocalDirty(H.SKEW);
this._proxy.updateSkew();
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
X(t);
this._skewY = t;
this.setLocalDirty(H.SKEW);
this._proxy.updateSkew();
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
t = cc.misc.clampf(t, 0, 255);
if (this._opacity !== t) {
this._opacity = t;
this._proxy.updateOpacity();
this._renderFlag |= f.FLAG_OPACITY_COLOR;
}
},
range: [ 0, 255 ]
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.set(t);
0;
this._renderFlag |= f.FLAG_COLOR;
32 & this._eventMask && this.emit(G.COLOR_CHANGED, t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
16 & this._eventMask && this.emit(G.ANCHOR_CHANGED);
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
16 & this._eventMask && this.emit(G.ANCHOR_CHANGED);
}
}
},
width: {
get: function() {
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
this._contentSize.width = t;
8 & this._eventMask && this.emit(G.SIZE_CHANGED);
}
}
},
height: {
get: function() {
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
this._contentSize.height = t;
8 & this._eventMask && this.emit(G.SIZE_CHANGED);
}
}
},
zIndex: {
get: function() {
return this._localZOrder >> 16;
},
set: function(t) {
if (t > l.MAX_ZINDEX) {
cc.warnID(1636);
t = l.MAX_ZINDEX;
} else if (t < l.MIN_ZINDEX) {
cc.warnID(1637);
t = l.MIN_ZINDEX;
}
if (this.zIndex !== t) {
this._localZOrder = 65535 & this._localZOrder | t << 16;
this.emit(G.SIBLING_ORDER_CHANGED);
this._onSiblingIndexChanged();
}
}
},
is3DNode: {
get: function() {
return this._is3DNode;
},
set: function(t) {
this._is3DNode = t;
this._update3DFunction();
}
},
up: {
get: function() {
return n.Vec3.transformQuat(D, n.Vec3.UP, this.getWorldRotation(M)).clone();
}
},
right: {
get: function() {
return n.Vec3.transformQuat(D, n.Vec3.RIGHT, this.getWorldRotation(M)).clone();
}
},
forward: {
get: function() {
return n.Vec3.transformQuat(D, n.Vec3.FORWARD, this.getWorldRotation(M)).clone();
}
}
},
ctor: function() {
this._reorderChildDirty = !1;
this._widget = null;
this._renderComponent = null;
this._capturingListeners = null;
this._bubblingListeners = null;
this._touchListener = null;
this._mouseListener = null;
this._initDataFromPool();
this._eventMask = 0;
this._cullingMask = 1;
this._childArrivalOrder = 1;
this._proxy = new renderer.NodeProxy(this._spaceInfo.unitID, this._spaceInfo.index, this._id, this._name);
this._proxy.init(this);
this._renderFlag = f.FLAG_TRANSFORM | f.FLAG_OPACITY_COLOR;
},
statics: {
EventType: G,
_LocalDirtyFlag: H,
isNode: function(t) {
return t instanceof pt && (t.constructor === pt || !(t instanceof cc.Scene));
},
BuiltinGroupIndex: V
},
_onSiblingIndexChanged: function() {
this._parent && this._parent._delaySort();
},
_onPreDestroy: function() {
this._onPreDestroyBase();
p && cc.director.getActionManager().removeAllActionsFromTarget(this);
q === this && (q = null);
if (this._touchListener || this._mouseListener) {
c.removeListeners(this);
if (this._touchListener) {
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
}
this._proxy.destroy();
this._proxy = null;
this._backDataIntoPool();
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
},
_onPostActivated: function(t) {
var e = p ? cc.director.getActionManager() : null;
if (t) {
this._renderFlag |= f.FLAG_WORLD_TRANSFORM;
e && e.resumeTarget(this);
c.resumeTarget(this);
this._checkListenerMask();
} else {
e && e.pauseTarget(this);
c.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._updateOrderOfArrival();
ot(this);
this._parent && this._parent._delaySort();
this._renderFlag |= f.FLAG_WORLD_TRANSFORM;
this._onHierarchyChangedBase(t);
cc._widgetManager && (cc._widgetManager._nodesOrderDirty = !0);
t && this._activeInHierarchy && this._checkListenerMask();
this._proxy.updateParent();
},
_update3DFunction: function() {
if (this._is3DNode) {
this._updateLocalMatrix = ct;
this._calculWorldMatrix = ut;
this._mulMat = _t;
} else {
this._updateLocalMatrix = lt;
this._calculWorldMatrix = ht;
this._mulMat = ft;
}
this._renderComponent && this._renderComponent._on3DNodeChanged && this._renderComponent._on3DNodeChanged();
this._renderFlag |= f.FLAG_TRANSFORM;
this._localMatDirty = H.ALL;
this._proxy.update3DNode();
},
_initDataFromPool: function() {
this._spaceInfo || (this._spaceInfo = a.pop());
var t = this._spaceInfo;
this._matrix = cc.mat4(t.localMat);
n.Mat4.identity(this._matrix);
this._worldMatrix = cc.mat4(t.worldMat);
n.Mat4.identity(this._worldMatrix);
this._localMatDirty = H.ALL;
this._worldMatDirty = !0;
var e = this._trs = this._spaceInfo.trs;
e[0] = 0;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 0;
e[5] = 0;
e[6] = 1;
e[7] = 1;
e[8] = 1;
e[9] = 1;
},
_backDataIntoPool: function() {
a.push(this._spaceInfo);
this._matrix = null;
this._worldMatrix = null;
this._trs = null;
this._spaceInfo = null;
},
_toEuler: function() {
if (this.is3DNode) n.Trs.toEuler(this._eulerAngles, this._trs); else {
var t = Math.asin(this._trs[5]) / d * 2;
n.Vec3.set(this._eulerAngles, 0, 0, t);
}
},
_fromEuler: function() {
this.is3DNode ? n.Trs.fromEuler(this._trs, this._eulerAngles) : n.Trs.fromAngleZ(this._trs, this._eulerAngles.z);
},
_upgrade_1x_to_2x: function() {
this._is3DNode && this._update3DFunction();
var t = this._trs;
if (t) {
var e = t;
t = this._trs = this._spaceInfo.trs;
11 === e.length ? t.set(e.subarray(1)) : t.set(e);
} else t = this._trs = this._spaceInfo.trs;
if (void 0 !== this._zIndex) {
this._localZOrder = this._zIndex << 16;
this._zIndex = void 0;
}
this._fromEuler();
0 !== this._localZOrder && (this._zIndex = (4294901760 & this._localZOrder) >> 16);
if (this._color.a < 255 && 255 === this._opacity) {
this._opacity = this._color.a;
this._color.a = 255;
}
this._renderFlag |= f.FLAG_TRANSFORM | f.FLAG_OPACITY_COLOR;
},
_onBatchCreated: function() {
var t = this._prefab;
if (t && t.sync && t.root === this) {
0;
s.syncWithPrefab(this);
}
this._upgrade_1x_to_2x();
this._updateOrderOfArrival();
this._cullingMask = 1 << at(this);
this._proxy && this._proxy.updateCullingMask();
if (!this._activeInHierarchy) {
p && cc.director.getActionManager().pauseTarget(this);
c.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
e.length > 0 && (this._renderFlag |= f.FLAG_CHILDREN);
this._proxy.initNative();
},
_onBatchRestored: function() {
this._upgrade_1x_to_2x();
this._cullingMask = 1 << at(this);
this._proxy && this._proxy.updateCullingMask();
if (!this._activeInHierarchy) {
var t = cc.director.getActionManager();
t && t.pauseTarget(this);
c.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchRestored();
e.length > 0 && (this._renderFlag |= f.FLAG_CHILDREN);
this._proxy.initNative();
},
_checkListenerMask: function() {
if (this._touchListener) {
var t = this._touchListener.mask = nt(this, cc.Mask);
this._mouseListener && (this._mouseListener.mask = t);
} else this._mouseListener && (this._mouseListener.mask = nt(this, cc.Mask));
},
_checknSetupSysEvent: function(t) {
var e = !1, i = !1;
if (-1 !== W.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: nt(this, cc.Mask),
onTouchBegan: K,
onTouchMoved: Z,
onTouchEnded: Q,
onTouchCancelled: $
});
c.addListener(this._touchListener, this);
e = !0;
}
i = !0;
} else if (-1 !== j.indexOf(t)) {
if (!this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: nt(this, cc.Mask),
onMouseDown: J,
onMouseMove: tt,
onMouseUp: et,
onMouseScroll: it
});
c.addListener(this._mouseListener, this);
e = !0;
}
i = !0;
}
e && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || c.pauseTarget(this);
}), this, 0, 0, 0, !1);
return i;
},
on: function(t, e, i, n) {
if (this._checknSetupSysEvent(t)) return this._onDispatch(t, e, i, n);
switch (t) {
case G.POSITION_CHANGED:
this._eventMask |= 1;
break;

case G.SCALE_CHANGED:
this._eventMask |= 2;
break;

case G.ROTATION_CHANGED:
this._eventMask |= 4;
break;

case G.SIZE_CHANGED:
this._eventMask |= 8;
break;

case G.ANCHOR_CHANGED:
this._eventMask |= 16;
break;

case G.COLOR_CHANGED:
this._eventMask |= 32;
}
this._bubblingListeners || (this._bubblingListeners = new h());
return this._bubblingListeners.on(t, e, i);
},
once: function(t, e, i, n) {
(this._checknSetupSysEvent(t) && n ? this._capturingListeners = this._capturingListeners || new h() : this._bubblingListeners = this._bubblingListeners || new h()).once(t, e, i);
},
_onDispatch: function(t, e, i, n) {
if ("boolean" == typeof i) {
n = i;
i = void 0;
} else n = !!n;
if (e) {
var r = null;
if (!(r = n ? this._capturingListeners = this._capturingListeners || new h() : this._bubblingListeners = this._bubblingListeners || new h()).hasEventListener(t, e, i)) {
r.on(t, e, i);
i && i.__eventTargets && i.__eventTargets.push(this);
}
return e;
}
cc.errorID(6800);
},
off: function(t, e, i, n) {
var r = -1 !== W.indexOf(t), s = !r && -1 !== j.indexOf(t);
if (r || s) {
this._offDispatch(t, e, i, n);
if (r) {
if (this._touchListener && !rt(this, W)) {
c.removeListener(this._touchListener);
this._touchListener = null;
}
} else if (s && this._mouseListener && !rt(this, j)) {
c.removeListener(this._mouseListener);
this._mouseListener = null;
}
} else if (this._bubblingListeners) {
this._bubblingListeners.off(t, e, i);
if (!this._bubblingListeners.hasEventListener(t)) switch (t) {
case G.POSITION_CHANGED:
this._eventMask &= -2;
break;

case G.SCALE_CHANGED:
this._eventMask &= -3;
break;

case G.ROTATION_CHANGED:
this._eventMask &= -5;
break;

case G.SIZE_CHANGED:
this._eventMask &= -9;
break;

case G.ANCHOR_CHANGED:
this._eventMask &= -17;
break;

case G.COLOR_CHANGED:
this._eventMask &= -33;
}
}
},
_offDispatch: function(t, e, i, n) {
if ("boolean" == typeof i) {
n = i;
i = void 0;
} else n = !!n;
if (e) {
var r = n ? this._capturingListeners : this._bubblingListeners;
if (r) {
r.off(t, e, i);
i && i.__eventTargets && u.array.fastRemove(i.__eventTargets, this);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(t);
this._bubblingListeners && this._bubblingListeners.removeAll(t);
}
},
targetOff: function(t) {
var e = this._bubblingListeners;
if (e) {
e.targetOff(t);
1 & this._eventMask && !e.hasEventListener(G.POSITION_CHANGED) && (this._eventMask &= -2);
2 & this._eventMask && !e.hasEventListener(G.SCALE_CHANGED) && (this._eventMask &= -3);
4 & this._eventMask && !e.hasEventListener(G.ROTATION_CHANGED) && (this._eventMask &= -5);
8 & this._eventMask && !e.hasEventListener(G.SIZE_CHANGED) && (this._eventMask &= -9);
16 & this._eventMask && !e.hasEventListener(G.ANCHOR_CHANGED) && (this._eventMask &= -17);
32 & this._eventMask && !e.hasEventListener(G.COLOR_CHANGED) && (this._eventMask &= -33);
}
this._capturingListeners && this._capturingListeners.targetOff(t);
t && t.__eventTargets && u.array.fastRemove(t.__eventTargets, this);
if (this._touchListener && !rt(this, W)) {
c.removeListener(this._touchListener);
this._touchListener = null;
}
if (this._mouseListener && !rt(this, j)) {
c.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
hasEventListener: function(t) {
var e = !1;
this._bubblingListeners && (e = this._bubblingListeners.hasEventListener(t));
!e && this._capturingListeners && (e = this._capturingListeners.hasEventListener(t));
return e;
},
emit: function(t, e, i, n, r, s) {
this._bubblingListeners && this._bubblingListeners.emit(t, e, i, n, r, s);
},
dispatchEvent: function(t) {
st(this, t);
k.length = 0;
},
pauseSystemEvents: function(t) {
c.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
c.resumeTarget(this, t);
},
_hitTest: function(t, e) {
var i = this._contentSize.width, r = this._contentSize.height, s = N, a = P, o = cc.Camera.findCamera(this);
o ? o.getScreenToWorldPoint(t, s) : s.set(t);
this._updateWorldMatrix();
if (!n.Mat4.invert(B, this._worldMatrix)) return !1;
n.Vec2.transformMat4(a, s, B);
a.x += this._anchorPoint.x * i;
a.y += this._anchorPoint.y * r;
var c = !1;
if (a.x >= 0 && a.y >= 0 && a.x <= i && a.y <= r) {
c = !0;
if (e && e.mask) for (var l = e.mask, u = this, h = l ? l.length : 0, f = 0, _ = 0; u && _ < h; ++f, 
u = u.parent) {
var d = l[_];
if (f === d.index) {
if (u !== d.node) {
l.length = _;
break;
}
var p = u.getComponent(cc.Mask);
if (p && p._enabled && !p._hitTest(s)) {
c = !1;
break;
}
_++;
} else if (f > d.index) {
l.length = _;
break;
}
}
}
return c;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i._capturingListeners && i._capturingListeners.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i._bubblingListeners && i._bubblingListeners.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
runAction: p ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
var e = cc.director.getActionManager();
if (!e._suppressDeprecation) {
e._suppressDeprecation = !0;
cc.warnID(1639);
}
e.addAction(t, this, !1);
return t;
}
} : v,
pauseAllActions: p ? function() {
cc.director.getActionManager().pauseTarget(this);
} : v,
resumeAllActions: p ? function() {
cc.director.getActionManager().resumeTarget(this);
} : v,
stopAllActions: p ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : v,
stopAction: p ? function(t) {
cc.director.getActionManager().removeAction(t);
} : v,
stopActionByTag: p ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : v,
getActionByTag: p ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: p ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
getPosition: function(t) {
t = t || new n.Vec3();
return n.Trs.toPosition(t, this._trs);
},
setPosition: function(t, e, i) {
var n;
if (void 0 === e) {
n = t.x;
e = t.y;
i = t.z || 0;
} else {
n = t;
i = i || 0;
}
var r = this._trs;
if (r[0] !== n || r[1] !== e || r[2] !== i) {
r[0] = n;
r[1] = e;
r[2] = i;
this.setLocalDirty(H.ALL_POSITION);
1 & this._eventMask && this.emit(G.POSITION_CHANGED);
}
},
getScale: function(t) {
if (void 0 !== t) return n.Trs.toScale(t, this._trs);
cc.errorID(1400, "cc.Node.getScale", "cc.Node.scale or cc.Node.getScale(cc.Vec3)");
return this._trs[7];
},
setScale: function(t, e, i) {
if (t && "number" != typeof t) {
e = t.y;
i = void 0 === t.z ? 1 : t.z;
t = t.x;
} else if (void 0 !== t && void 0 === e) {
e = t;
i = t;
} else void 0 === i && (i = 1);
var n = this._trs;
if (n[7] !== t || n[8] !== e || n[9] !== i) {
n[7] = t;
n[8] = e;
n[9] = i;
this.setLocalDirty(H.ALL_SCALE);
2 & this._eventMask && this.emit(G.SCALE_CHANGED);
}
},
getRotation: function(t) {
if (t instanceof n.Quat) return n.Trs.toRotation(t, this._trs);
0;
return -this.angle;
},
setRotation: function(t, e, i, n) {
if ("number" == typeof t && void 0 === e) {
0;
this.angle = -t;
} else {
var r = t;
if (void 0 === e) {
r = t.x;
e = t.y;
i = t.z;
n = t.w;
}
var s = this._trs;
if (s[3] !== r || s[4] !== e || s[5] !== i || s[6] !== n) {
s[3] = r;
s[4] = e;
s[5] = i;
s[6] = n;
this.setLocalDirty(H.ALL_ROTATION);
4 & this._eventMask && this.emit(G.ROTATION_CHANGED);
0;
}
}
},
getContentSize: function() {
return cc.size(this._contentSize.width, this._contentSize.height);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
0;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
0;
i.width = t;
i.height = e;
}
8 & this._eventMask && this.emit(G.SIZE_CHANGED);
},
getAnchorPoint: function() {
return cc.v2(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
this.setLocalDirty(H.ALL_POSITION);
16 & this._eventMask && this.emit(G.ANCHOR_CHANGED);
},
_invTransformPoint: function(t, e) {
this._parent ? this._parent._invTransformPoint(t, e) : n.Vec3.copy(t, e);
var i = this._trs;
n.Trs.toPosition(y, i);
n.Vec3.sub(t, t, y);
n.Trs.toRotation(C, i);
n.Quat.conjugate(A, C);
n.Vec3.transformQuat(t, t, A);
n.Trs.toScale(y, i);
n.Vec3.inverseSafe(E, y);
n.Vec3.mul(t, t, E);
return t;
},
getWorldPosition: function(t) {
n.Trs.toPosition(t, this._trs);
for (var e, i = this._parent; i; ) {
e = i._trs;
n.Trs.toScale(g, e);
n.Vec3.mul(t, t, g);
n.Trs.toRotation(m, e);
n.Vec3.transformQuat(t, t, m);
n.Trs.toPosition(g, e);
n.Vec3.add(t, t, g);
i = i._parent;
}
return t;
},
setWorldPosition: function(t) {
var e = this._trs;
this._parent ? this._parent._invTransformPoint(T, t) : n.Vec3.copy(T, t);
n.Trs.fromPosition(e, T);
this.setLocalDirty(H.ALL_POSITION);
1 & this._eventMask && this.emit(G.POSITION_CHANGED);
},
getWorldRotation: function(t) {
n.Trs.toRotation(F, this._trs);
n.Quat.copy(t, F);
for (var e = this._parent; e; ) {
n.Trs.toRotation(F, e._trs);
n.Quat.mul(t, F, t);
e = e._parent;
}
return t;
},
setWorldRotation: function(t) {
if (this._parent) {
this._parent.getWorldRotation(z);
n.Quat.conjugate(z, z);
n.Quat.mul(z, z, t);
} else n.Quat.copy(z, t);
n.Trs.fromRotation(this._trs, z);
0;
this.setLocalDirty(H.ALL_ROTATION);
},
getWorldScale: function(t) {
n.Trs.toScale(x, this._trs);
n.Vec3.copy(t, x);
for (var e = this._parent; e; ) {
n.Trs.toScale(x, e._trs);
n.Vec3.mul(t, t, x);
e = e._parent;
}
return t;
},
setWorldScale: function(t) {
if (this._parent) {
this._parent.getWorldScale(S);
n.Vec3.div(S, t, S);
} else n.Vec3.copy(S, t);
n.Trs.fromScale(this._trs, S);
this.setLocalDirty(H.ALL_SCALE);
},
getWorldRT: function(t) {
var e = b, i = L, r = this._trs;
n.Trs.toPosition(e, r);
n.Trs.toRotation(i, r);
for (var s = this._parent; s; ) {
r = s._trs;
n.Trs.toScale(R, r);
n.Vec3.mul(e, e, R);
n.Trs.toRotation(w, r);
n.Vec3.transformQuat(e, e, w);
n.Trs.toPosition(R, r);
n.Vec3.add(e, e, R);
n.Quat.mul(i, w, i);
s = s._parent;
}
n.Mat4.fromRT(t, i, e);
return t;
},
lookAt: function(t, e) {
this.getWorldPosition(I);
n.Vec3.sub(I, I, t);
n.Vec3.normalize(I, I);
n.Quat.fromViewUp(O, I, e);
this.setWorldRotation(O);
},
_updateLocalMatrix: lt,
_calculWorldMatrix: function() {
this._localMatDirty & H.TRSS && this._updateLocalMatrix();
var t = this._parent;
t ? this._mulMat(this._worldMatrix, t._worldMatrix, this._matrix) : n.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
},
_mulMat: ft,
_updateWorldMatrix: function() {
this._parent && this._parent._updateWorldMatrix();
if (this._worldMatDirty) {
this._calculWorldMatrix();
for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e]._worldMatDirty = !0;
}
},
setLocalDirty: function(t) {
this._localMatDirty |= t;
this._worldMatDirty = !0;
t === H.ALL_POSITION || t === H.POSITION ? this._renderFlag |= f.FLAG_WORLD_TRANSFORM : this._renderFlag |= f.FLAG_TRANSFORM;
},
setWorldDirty: function() {
this._worldMatDirty = !0;
},
getLocalMatrix: function(t) {
this._updateLocalMatrix();
return n.Mat4.copy(t, this._matrix);
},
getWorldMatrix: function(t) {
this._updateWorldMatrix();
return n.Mat4.copy(t, this._worldMatrix);
},
convertToNodeSpaceAR: function(t, e) {
this._updateWorldMatrix();
n.Mat4.invert(B, this._worldMatrix);
if (t instanceof cc.Vec2) {
e = e || new cc.Vec2();
return n.Vec2.transformMat4(e, t, B);
}
e = e || new cc.Vec3();
return n.Vec3.transformMat4(e, t, B);
},
convertToWorldSpaceAR: function(t, e) {
this._updateWorldMatrix();
if (t instanceof cc.Vec2) {
e = e || new cc.Vec2();
return n.Vec2.transformMat4(e, t, this._worldMatrix);
}
e = e || new cc.Vec3();
return n.Vec3.transformMat4(e, t, this._worldMatrix);
},
convertToNodeSpace: function(t) {
this._updateWorldMatrix();
n.Mat4.invert(B, this._worldMatrix);
var e = new cc.Vec2();
n.Vec2.transformMat4(e, t, B);
e.x += this._anchorPoint.x * this._contentSize.width;
e.y += this._anchorPoint.y * this._contentSize.height;
return e;
},
convertToWorldSpace: function(t) {
this._updateWorldMatrix();
var e = new cc.Vec2(t.x - this._anchorPoint.x * this._contentSize.width, t.y - this._anchorPoint.y * this._contentSize.height);
return n.Vec2.transformMat4(e, e, this._worldMatrix);
},
getNodeToParentTransform: function(t) {
t || (t = o.identity());
this._updateLocalMatrix();
var e = this._contentSize;
U.x = -this._anchorPoint.x * e.width;
U.y = -this._anchorPoint.y * e.height;
n.Mat4.copy(B, this._matrix);
n.Mat4.transform(B, B, U);
return o.fromMat4(t, B);
},
getNodeToParentTransformAR: function(t) {
t || (t = o.identity());
this._updateLocalMatrix();
return o.fromMat4(t, this._matrix);
},
getNodeToWorldTransform: function(t) {
t || (t = o.identity());
this._updateWorldMatrix();
var e = this._contentSize;
U.x = -this._anchorPoint.x * e.width;
U.y = -this._anchorPoint.y * e.height;
n.Mat4.copy(B, this._worldMatrix);
n.Mat4.transform(B, B, U);
return o.fromMat4(t, B);
},
getNodeToWorldTransformAR: function(t) {
t || (t = o.identity());
this._updateWorldMatrix();
return o.fromMat4(t, this._worldMatrix);
},
getParentToNodeTransform: function(t) {
t || (t = o.identity());
this._updateLocalMatrix();
n.Mat4.invert(B, this._matrix);
return o.fromMat4(t, B);
},
getWorldToNodeTransform: function(t) {
t || (t = o.identity());
this._updateWorldMatrix();
n.Mat4.invert(B, this._worldMatrix);
return o.fromMat4(t, B);
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
getBoundingBox: function() {
this._updateLocalMatrix();
var t = this._contentSize.width, e = this._contentSize.height, i = cc.rect(-this._anchorPoint.x * t, -this._anchorPoint.y * e, t, e);
return i.transformMat4(i, this._matrix);
},
getBoundingBoxToWorld: function() {
if (this._parent) {
this._parent._updateWorldMatrix();
return this._getBoundingBoxTo();
}
return this.getBoundingBox();
},
_getBoundingBoxTo: function() {
var t = this._contentSize.width, e = this._contentSize.height, i = cc.rect(-this._anchorPoint.x * t, -this._anchorPoint.y * e, t, e);
this._calculWorldMatrix();
i.transformMat4(i, this._worldMatrix);
if (!this._children) return i;
for (var n = this._children, r = 0; r < n.length; r++) {
var s = n[r];
if (s && s.active) {
var a = s._getBoundingBoxTo();
a && i.union(i, a);
}
}
return i;
},
_updateOrderOfArrival: function() {
var t = this._parent ? ++this._parent._childArrivalOrder : 0;
this._localZOrder = 4294901760 & this._localZOrder | t;
this.emit(G.SIBLING_ORDER_CHANGED);
},
addChild: function(t, e, i) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.parent = this;
void 0 !== e && (t.zIndex = e);
void 0 !== i && (t.name = i);
},
cleanup: function() {
p && cc.director.getActionManager().removeAllActionsFromTarget(this);
c.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
this._childArrivalOrder = 1;
for (var e = 0, i = t.length; e < i; e++) (r = t[e])._updateOrderOfArrival();
c._setDirtyForNode(this);
if (t.length > 1) {
for (var n, r, s = 1, a = t.length; s < a; s++) {
r = t[s];
n = s - 1;
for (;n >= 0 && r._localZOrder < t[n]._localZOrder; ) {
t[n + 1] = t[n];
n--;
}
t[n + 1] = r;
}
this.emit(G.CHILD_REORDER, this);
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_restoreProperties: !1,
onRestore: !1
};
0;
var pt = cc.Class(dt), vt = pt.prototype;
u.getset(vt, "position", vt.getPosition, vt.setPosition, !1, !0);
cc.Node = e.exports = pt;
}), {
"./event-manager": 62,
"./event/event": 65,
"./event/event-target": 64,
"./platform/CCMacro": 97,
"./platform/js": 112,
"./renderer/render-flow": 124,
"./utils/affine-transform": 146,
"./utils/base-node": 147,
"./utils/prefab-helper": 156,
"./utils/trans-pool": 162,
"./value-types": 168
} ],
7: [ (function(t, e, i) {
"use strict";
var n = t("./CCNode"), r = (t("./renderer/render-flow"), cc.Object.Flags.HideInHierarchy, 
n._LocalDirtyFlag), s = cc.Class({
name: "cc.PrivateNode",
extends: n,
properties: {
x: {
get: function() {
return this._originPos.x;
},
set: function(t) {
var e = this._originPos;
if (t !== e.x) {
e.x = t;
this._posDirty(!0);
}
},
override: !0
},
y: {
get: function() {
return this._originPos.y;
},
set: function(t) {
var e = this._originPos;
if (t !== e.y) {
e.y = t;
this._posDirty(!0);
}
},
override: !0
},
zIndex: {
get: function() {
return cc.macro.MIN_ZINDEX;
},
set: function() {
cc.warnID(1638);
},
override: !0
},
showInEditor: {
default: !1,
editorOnly: !0,
override: !0
}
},
ctor: function(t) {
this._localZOrder = cc.macro.MIN_ZINDEX << 16;
this._originPos = cc.v2();
0;
},
_posDirty: function(t) {
this.setLocalDirty(r.POSITION);
!0 === t && 1 & this._eventMask && this.emit(n.EventType.POSITION_CHANGED);
},
_updateLocalMatrix: function() {
if (this._localMatDirty) {
var t = this.parent;
if (t) {
this._trs[0] = this._originPos.x - (t._anchorPoint.x - .5) * t._contentSize.width;
this._trs[1] = this._originPos.y - (t._anchorPoint.y - .5) * t._contentSize.height;
}
this._super();
}
},
getPosition: function() {
return new cc.Vec2(this._originPos);
},
setPosition: function(t, e) {
void 0 === e && (e = (t = t.x).y);
var i = this._originPos;
if (i.x !== t || i.y !== e) {
i.x = t;
i.y = e;
this._posDirty(!0);
}
},
setParent: function(t) {
var e = this._parent;
this._super(t);
if (e !== t) {
e && e.off(n.EventType.ANCHOR_CHANGED, this._posDirty, this);
t && t.on(n.EventType.ANCHOR_CHANGED, this._posDirty, this);
}
},
_updateOrderOfArrival: function() {}
});
cc.js.getset(s.prototype, "parent", s.prototype.getParent, s.prototype.setParent);
cc.js.getset(s.prototype, "position", s.prototype.getPosition, s.prototype.setPosition);
cc.PrivateNode = e.exports = s;
}), {
"./CCNode": 6,
"./renderer/render-flow": 124
} ],
8: [ (function(t, e, i) {
"use strict";
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
_is3DNode: {
default: !0,
override: !0
},
autoReleaseAssets: {
default: void 0,
type: cc.Boolean
}
},
ctor: function() {
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
0;
this.dependAssets = null;
},
destroy: function() {
if (cc.Object.prototype.destroy.call(this)) for (var t = this._children, e = 0; e < t.length; ++e) t[e].active = !1;
this._active = !1;
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
0;
this._onBatchCreated();
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
0;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 6
} ],
9: [ (function(t, e, i) {
"use strict";
var n = t("./platform/js"), r = new (t("./platform/id-generater"))("Scheduler"), s = function(t, e, i, n) {
this.target = t;
this.priority = e;
this.paused = i;
this.markedForDeletion = n;
}, a = [];
s.get = function(t, e, i, n) {
var r = a.pop();
if (r) {
r.target = t;
r.priority = e;
r.paused = i;
r.markedForDeletion = n;
} else r = new s(t, e, i, n);
return r;
};
s.put = function(t) {
if (a.length < 20) {
t.target = null;
a.push(t);
}
};
var o = function(t, e, i, n) {
this.list = t;
this.entry = e;
this.target = i;
this.callback = n;
}, c = [];
o.get = function(t, e, i, n) {
var r = c.pop();
if (r) {
r.list = t;
r.entry = e;
r.target = i;
r.callback = n;
} else r = new o(t, e, i, n);
return r;
};
o.put = function(t) {
if (c.length < 20) {
t.list = t.entry = t.target = t.callback = null;
c.push(t);
}
};
var l = function(t, e, i, n, r, s) {
var a = this;
a.timers = t;
a.target = e;
a.timerIndex = i;
a.currentTimer = n;
a.currentTimerSalvaged = r;
a.paused = s;
}, u = [];
l.get = function(t, e, i, n, r, s) {
var a = u.pop();
if (a) {
a.timers = t;
a.target = e;
a.timerIndex = i;
a.currentTimer = n;
a.currentTimerSalvaged = r;
a.paused = s;
} else a = new l(t, e, i, n, r, s);
return a;
};
l.put = function(t) {
if (u.length < 20) {
t.timers = t.target = t.currentTimer = null;
u.push(t);
}
};
function h() {
this._lock = !1;
this._scheduler = null;
this._elapsed = -1;
this._runForever = !1;
this._useDelay = !1;
this._timesExecuted = 0;
this._repeat = 0;
this._delay = 0;
this._interval = 0;
this._target = null;
this._callback = null;
}
var f = h.prototype;
f.initWithCallback = function(t, e, i, n, r, s) {
this._lock = !1;
this._scheduler = t;
this._target = i;
this._callback = e;
this._elapsed = -1;
this._interval = n;
this._delay = s;
this._useDelay = this._delay > 0;
this._repeat = r;
this._runForever = this._repeat === cc.macro.REPEAT_FOREVER;
return !0;
};
f.getInterval = function() {
return this._interval;
};
f.setInterval = function(t) {
this._interval = t;
};
f.update = function(t) {
if (-1 === this._elapsed) {
this._elapsed = 0;
this._timesExecuted = 0;
} else {
this._elapsed += t;
if (this._runForever && !this._useDelay) {
if (this._elapsed >= this._interval) {
this.trigger();
this._elapsed = 0;
}
} else {
if (this._useDelay) {
if (this._elapsed >= this._delay) {
this.trigger();
this._elapsed -= this._delay;
this._timesExecuted += 1;
this._useDelay = !1;
}
} else if (this._elapsed >= this._interval) {
this.trigger();
this._elapsed = 0;
this._timesExecuted += 1;
}
this._callback && !this._runForever && this._timesExecuted > this._repeat && this.cancel();
}
}
};
f.getCallback = function() {
return this._callback;
};
f.trigger = function() {
if (this._target && this._callback) {
this._lock = !0;
this._callback.call(this._target, this._elapsed);
this._lock = !1;
}
};
f.cancel = function() {
this._scheduler.unschedule(this._callback, this._target);
};
var _ = [];
h.get = function() {
return _.pop() || new h();
};
h.put = function(t) {
if (_.length < 20 && !t._lock) {
t._scheduler = t._target = t._callback = null;
_.push(t);
}
};
cc.Scheduler = function() {
this._timeScale = 1;
this._updatesNegList = [];
this._updates0List = [];
this._updatesPosList = [];
this._hashForUpdates = n.createMap(!0);
this._hashForTimers = n.createMap(!0);
this._currentTarget = null;
this._currentTargetSalvaged = !1;
this._updateHashLocked = !1;
this._arrayForTimers = [];
};
cc.Scheduler.prototype = {
constructor: cc.Scheduler,
_removeHashElement: function(t) {
delete this._hashForTimers[t.target._id];
for (var e = this._arrayForTimers, i = 0, n = e.length; i < n; i++) if (e[i] === t) {
e.splice(i, 1);
break;
}
l.put(t);
},
_removeUpdateFromHash: function(t) {
var e = t.target._id, i = this._hashForUpdates[e];
if (i) {
for (var n = i.list, r = i.entry, a = 0, c = n.length; a < c; a++) if (n[a] === r) {
n.splice(a, 1);
break;
}
delete this._hashForUpdates[e];
s.put(r);
o.put(i);
}
},
_priorityIn: function(t, e, i) {
for (var n = 0; n < t.length; n++) if (i < t[n].priority) {
t.splice(n, 0, e);
return;
}
t.push(e);
},
_appendIn: function(t, e) {
t.push(e);
},
enableForTarget: function(t) {
t._id || (t.__instanceId ? cc.warnID(1513) : t._id = r.getNewId());
},
setTimeScale: function(t) {
this._timeScale = t;
},
getTimeScale: function() {
return this._timeScale;
},
update: function(t) {
this._updateHashLocked = !0;
1 !== this._timeScale && (t *= this._timeScale);
var e, i, n, r;
for (e = 0, n = (i = this._updatesNegList).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
for (e = 0, n = (i = this._updates0List).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
for (e = 0, n = (i = this._updatesPosList).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
var s, a = this._arrayForTimers;
for (e = 0; e < a.length; e++) {
s = a[e];
this._currentTarget = s;
this._currentTargetSalvaged = !1;
if (!s.paused) for (s.timerIndex = 0; s.timerIndex < s.timers.length; ++s.timerIndex) {
s.currentTimer = s.timers[s.timerIndex];
s.currentTimerSalvaged = !1;
s.currentTimer.update(t);
s.currentTimer = null;
}
if (this._currentTargetSalvaged && 0 === this._currentTarget.timers.length) {
this._removeHashElement(this._currentTarget);
--e;
}
}
for (e = 0, i = this._updatesNegList; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
for (e = 0, i = this._updates0List; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
for (e = 0, i = this._updatesPosList; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
this._updateHashLocked = !1;
this._currentTarget = null;
},
schedule: function(t, e, i, n, r, s) {
if ("function" != typeof t) {
var a = t;
t = e;
e = a;
}
if (4 === arguments.length || 5 === arguments.length) {
s = !!n;
n = cc.macro.REPEAT_FOREVER;
r = 0;
}
cc.assertID(e, 1502);
var o = e._id;
if (!o) if (e.__instanceId) {
cc.warnID(1513);
o = e._id = e.__instanceId;
} else cc.errorID(1510);
var c, u, f = this._hashForTimers[o];
if (f) f.paused !== s && cc.warnID(1511); else {
f = l.get(null, e, 0, null, null, s);
this._arrayForTimers.push(f);
this._hashForTimers[o] = f;
}
if (null == f.timers) f.timers = []; else for (u = 0; u < f.timers.length; ++u) if ((c = f.timers[u]) && t === c._callback) {
cc.logID(1507, c.getInterval(), i);
c._interval = i;
return;
}
(c = h.get()).initWithCallback(this, t, e, i, n, r);
f.timers.push(c);
this._currentTarget === f && this._currentTargetSalvaged && (this._currentTargetSalvaged = !1);
},
scheduleUpdate: function(t, e, i) {
var n = t._id;
if (!n) if (t.__instanceId) {
cc.warnID(1513);
n = t._id = t.__instanceId;
} else cc.errorID(1510);
var r = this._hashForUpdates[n];
if (r && r.entry) {
if (r.entry.priority === e) {
r.entry.markedForDeletion = !1;
r.entry.paused = i;
return;
}
if (this._updateHashLocked) {
cc.logID(1506);
r.entry.markedForDeletion = !1;
r.entry.paused = i;
return;
}
this.unscheduleUpdate(t);
}
var a, c = s.get(t, e, i, !1);
if (0 === e) {
a = this._updates0List;
this._appendIn(a, c);
} else {
a = e < 0 ? this._updatesNegList : this._updatesPosList;
this._priorityIn(a, c, e);
}
this._hashForUpdates[n] = o.get(a, c, t, null);
},
unschedule: function(t, e) {
if (e && t) {
var i = e._id;
if (!i) if (e.__instanceId) {
cc.warnID(1513);
i = e._id = e.__instanceId;
} else cc.errorID(1510);
var n = this._hashForTimers[i];
if (n) for (var r = n.timers, s = 0, a = r.length; s < a; s++) {
var o = r[s];
if (t === o._callback) {
o !== n.currentTimer || n.currentTimerSalvaged || (n.currentTimerSalvaged = !0);
r.splice(s, 1);
h.put(o);
n.timerIndex >= s && n.timerIndex--;
0 === r.length && (this._currentTarget === n ? this._currentTargetSalvaged = !0 : this._removeHashElement(n));
return;
}
}
}
},
unscheduleUpdate: function(t) {
if (t) {
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForUpdates[e];
i && (this._updateHashLocked ? i.entry.markedForDeletion = !0 : this._removeUpdateFromHash(i.entry));
}
},
unscheduleAllForTarget: function(t) {
if (t) {
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
if (i) {
var n = i.timers;
n.indexOf(i.currentTimer) > -1 && !i.currentTimerSalvaged && (i.currentTimerSalvaged = !0);
for (var r = 0, s = n.length; r < s; r++) h.put(n[r]);
n.length = 0;
this._currentTarget === i ? this._currentTargetSalvaged = !0 : this._removeHashElement(i);
}
this.unscheduleUpdate(t);
}
},
unscheduleAll: function() {
this.unscheduleAllWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
},
unscheduleAllWithMinPriority: function(t) {
var e, i, n, r = this._arrayForTimers;
for (e = r.length - 1; e >= 0; e--) {
i = r[e];
this.unscheduleAllForTarget(i.target);
}
var s = 0;
if (t < 0) for (e = 0; e < this._updatesNegList.length; ) {
s = this._updatesNegList.length;
(n = this._updatesNegList[e]) && n.priority >= t && this.unscheduleUpdate(n.target);
s == this._updatesNegList.length && e++;
}
if (t <= 0) for (e = 0; e < this._updates0List.length; ) {
s = this._updates0List.length;
(n = this._updates0List[e]) && this.unscheduleUpdate(n.target);
s == this._updates0List.length && e++;
}
for (e = 0; e < this._updatesPosList.length; ) {
s = this._updatesPosList.length;
(n = this._updatesPosList[e]) && n.priority >= t && this.unscheduleUpdate(n.target);
s == this._updatesPosList.length && e++;
}
},
isScheduled: function(t, e) {
cc.assertID(t, 1508);
cc.assertID(e, 1509);
var i = e._id;
if (!i) if (e.__instanceId) {
cc.warnID(1513);
i = e._id = e.__instanceId;
} else cc.errorID(1510);
var n = this._hashForTimers[i];
if (!n) return !1;
if (null == n.timers) return !1;
for (var r = n.timers, s = 0; s < r.length; ++s) {
if (t === r[s]._callback) return !0;
}
return !1;
},
pauseAllTargets: function() {
return this.pauseAllTargetsWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
},
pauseAllTargetsWithMinPriority: function(t) {
var e, i, n, r, s = [], a = this._arrayForTimers;
for (i = 0, n = a.length; i < n; i++) if (e = a[i]) {
e.paused = !0;
s.push(e.target);
}
if (t < 0) for (i = 0; i < this._updatesNegList.length; i++) if ((r = this._updatesNegList[i]) && r.priority >= t) {
r.paused = !0;
s.push(r.target);
}
if (t <= 0) for (i = 0; i < this._updates0List.length; i++) if (r = this._updates0List[i]) {
r.paused = !0;
s.push(r.target);
}
for (i = 0; i < this._updatesPosList.length; i++) if ((r = this._updatesPosList[i]) && r.priority >= t) {
r.paused = !0;
s.push(r.target);
}
return s;
},
resumeTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) this.resumeTarget(t[e]);
},
pauseTarget: function(t) {
cc.assertID(t, 1503);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
i && (i.paused = !0);
var n = this._hashForUpdates[e];
n && (n.entry.paused = !0);
},
resumeTarget: function(t) {
cc.assertID(t, 1504);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
i && (i.paused = !1);
var n = this._hashForUpdates[e];
n && (n.entry.paused = !1);
},
isTargetPaused: function(t) {
cc.assertID(t, 1505);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
if (i) return i.paused;
var n = this._hashForUpdates[e];
return !!n && n.entry.paused;
}
};
cc.Scheduler.PRIORITY_SYSTEM = 1 << 31;
cc.Scheduler.PRIORITY_NON_SYSTEM = cc.Scheduler.PRIORITY_SYSTEM + 1;
e.exports = cc.Scheduler;
}), {
"./platform/id-generater": 108,
"./platform/js": 112
} ],
10: [ (function(t, e, i) {
"use strict";
var n = t("./CCRawAsset");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: n,
ctor: function() {
this.loaded = !0;
this.url = "";
},
properties: {
nativeUrl: {
get: function() {
if (this._native) {
var t = this._native;
if (47 === t.charCodeAt(0)) return t.slice(1);
if (cc.AssetLibrary) {
var e = cc.AssetLibrary.getLibUrlNoExt(this._uuid, !0);
return 46 === t.charCodeAt(0) ? e + t : e + "/" + t;
}
cc.errorID(6400);
}
return "";
},
visible: !1
},
_native: "",
_nativeAsset: {
get: function() {
return this._$nativeAsset;
},
set: function(t) {
this._$nativeAsset = t;
}
}
},
statics: {
deserialize: !1,
preventDeferredLoadDependents: !1,
preventPreloadNativeObject: !1
},
toString: function() {
return this.nativeUrl;
},
serialize: !1,
createNode: null,
_setRawAsset: function(t, e) {
this._native = !1 !== e ? t || void 0 : "/" + t;
}
});
e.exports = cc.Asset;
}), {
"./CCRawAsset": 18
} ],
11: [ (function(t, e, i) {
"use strict";
var n = t("./CCAsset"), r = t("../event/event-target"), s = cc.Enum({
WEB_AUDIO: 0,
DOM_AUDIO: 1
}), a = cc.Class({
name: "cc.AudioClip",
extends: n,
mixins: [ r ],
ctor: function() {
this.loaded = !1;
this._audio = null;
},
properties: {
loadMode: {
default: s.WEB_AUDIO,
type: s
},
_nativeAsset: {
get: function() {
return this._audio;
},
set: function(t) {
t instanceof cc.AudioClip ? this._audio = t._nativeAsset : this._audio = t;
if (this._audio) {
this.loaded = !0;
this.emit("load");
}
},
override: !0
}
},
statics: {
LoadMode: s,
_loadByUrl: function(t, e) {
var i = cc.loader.getItem(t) || cc.loader.getItem(t + "?useDom=1");
i && i.complete ? i._owner instanceof a ? e(null, i._owner) : e(null, i.content) : cc.loader.load(t, (function(n, r) {
if (n) return e(n);
i = cc.loader.getItem(t) || cc.loader.getItem(t + "?useDom=1");
e(null, i.content);
}));
}
},
destroy: function() {
cc.audioEngine.uncache(this);
this._super();
}
});
cc.AudioClip = a;
e.exports = a;
}), {
"../event/event-target": 64,
"./CCAsset": 10
} ],
12: [ (function(t, e, i) {
"use strict";
var n = function() {
this.u = 0;
this.v = 0;
this.w = 0;
this.h = 0;
this.offsetX = 0;
this.offsetY = 0;
this.textureID = 0;
this.valid = !1;
this.xAdvance = 0;
}, r = function(t) {
this._letterDefinitions = {};
this._texture = t;
};
r.prototype = {
constructor: r,
addLetterDefinitions: function(t, e) {
this._letterDefinitions[t] = e;
},
cloneLetterDefinition: function() {
var t = {};
for (var e in this._letterDefinitions) {
var i = new n();
cc.js.mixin(i, this._letterDefinitions[e]);
t[e] = i;
}
return t;
},
getTexture: function() {
return this._texture;
},
getLetter: function(t) {
return this._letterDefinitions[t];
},
getLetterDefinitionForChar: function(t) {
var e = t.charCodeAt(0);
return this._letterDefinitions.hasOwnProperty(e) ? this._letterDefinitions[e] : null;
},
clear: function() {
this._letterDefinitions = {};
}
};
var s = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null,
_fontDefDictionary: null
},
onLoad: function() {
var t = this.spriteFrame;
!this._fontDefDictionary && t && (this._fontDefDictionary = new r(t._texture));
var e = this._fntConfig;
if (e) {
var i = e.fontDefDictionary;
for (var s in i) {
var a = new n(), o = i[s].rect;
a.offsetX = i[s].xOffset;
a.offsetY = i[s].yOffset;
a.w = o.width;
a.h = o.height;
a.u = o.x;
a.v = o.y;
a.textureID = 0;
a.valid = !0;
a.xAdvance = i[s].xAdvance;
this._fontDefDictionary.addLetterDefinitions(s, a);
}
}
}
});
cc.BitmapFont = s;
cc.BitmapFont.FontLetterDefinition = n;
cc.BitmapFont.FontAtlas = r;
e.exports = s;
}), {} ],
13: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.BufferAsset",
extends: cc.Asset,
ctor: function() {
this._buffer = null;
},
properties: {
_nativeAsset: {
get: function() {
return this._buffer;
},
set: function(t) {
this._buffer = t.buffer || t;
},
override: !0
},
buffer: function() {
return this._buffer;
}
}
});
cc.BufferAsset = e.exports = n;
}), {} ],
14: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = e.exports = n;
}), {} ],
15: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.JsonAsset",
extends: cc.Asset,
properties: {
json: null
}
});
e.exports = cc.JsonAsset = n;
}), {} ],
16: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont,
onLoad: function() {
this.spriteFrame ? this._fntConfig ? this._super() : cc.warnID(9101, this.name) : cc.warnID(9100, this.name);
}
});
cc.LabelAtlas = n;
e.exports = n;
}), {} ],
17: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
AUTO: 0,
SINGLE_INSTANCE: 1,
MULTI_INSTANCE: 2
}), r = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
ctor: function() {
this._createFunction = null;
this._instantiatedTimes = 0;
},
properties: {
data: null,
optimizationPolicy: n.AUTO,
asyncLoadAssets: !1,
readonly: {
default: !1,
editorOnly: !0
}
},
statics: {
OptimizationPolicy: n,
OptimizationPolicyThreshold: 3
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
if (this.optimizationPolicy !== n.SINGLE_INSTANCE && (this.optimizationPolicy === n.MULTI_INSTANCE || this._instantiatedTimes + 1 >= r.OptimizationPolicyThreshold)) {
t = this._doInstantiate();
this.data._instantiate(t);
} else {
this.data._prefab._synced = !0;
t = this.data._instantiate();
}
++this._instantiatedTimes;
return t;
},
destroy: function() {
this.data && this.data.destroy();
this._super();
}
});
cc.Prefab = e.exports = r;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 110
} ],
18: [ (function(t, e, i) {
"use strict";
var n = t("../platform/CCObject"), r = t("../platform/js");
cc.RawAsset = cc.Class({
name: "cc.RawAsset",
extends: n,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
}
});
r.value(cc.RawAsset, "isRawAssetType", (function(t) {
return r.isChildClassOf(t, cc.RawAsset) && !r.isChildClassOf(t, cc.Asset);
}));
r.value(cc.RawAsset, "wasRawAssetType", (function(t) {
return t === cc.Texture2D || t === cc.AudioClip || t === cc.ParticleAsset || t === cc.Asset;
}));
e.exports = cc.RawAsset;
}), {
"../platform/CCObject": 98,
"../platform/js": 112
} ],
19: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = n;
e.exports = n;
}), {} ],
20: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = n;
var r = cc.Class({
name: "cc.JavaScript",
extends: n
});
cc._JavaScript = r;
var s = cc.Class({
name: "cc.CoffeeScript",
extends: n
});
cc._CoffeeScript = s;
var a = cc.Class({
name: "cc.TypeScript",
extends: n
});
cc._TypeScript = a;
}), {} ],
21: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
var e = this._spriteFrames[t];
if (!e) return null;
e.name || (e.name = t);
return e;
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(this.getSpriteFrame(i));
return t;
}
});
cc.SpriteAtlas = n;
e.exports = n;
}), {} ],
22: [ (function(t, e, i) {
"use strict";
var n = t("../event/event-target"), r = t("../utils/texture-util"), s = [ {
u: 0,
v: 0
}, {
u: 0,
v: 0
}, {
u: 0,
v: 0
}, {
u: 0,
v: 0
} ], a = cc.Class({
name: "cc.SpriteFrame",
extends: t("../assets/CCAsset"),
mixins: [ n ],
properties: {
_textureSetter: {
set: function(t) {
if (t) {
0;
this._texture !== t && this._refreshTexture(t);
this._textureFilename = t.url;
}
}
},
insetTop: {
get: function() {
return this._capInsets[1];
},
set: function(t) {
this._capInsets[1] = t;
this._texture && this._calculateSlicedUV();
}
},
insetBottom: {
get: function() {
return this._capInsets[3];
},
set: function(t) {
this._capInsets[3] = t;
this._texture && this._calculateSlicedUV();
}
},
insetLeft: {
get: function() {
return this._capInsets[0];
},
set: function(t) {
this._capInsets[0] = t;
this._texture && this._calculateSlicedUV();
}
},
insetRight: {
get: function() {
return this._capInsets[2];
},
set: function(t) {
this._capInsets[2] = t;
this._texture && this._calculateSlicedUV();
}
}
},
ctor: function() {
n.call(this);
var t = arguments[0], e = arguments[1], i = arguments[2], r = arguments[3], s = arguments[4];
this._rect = null;
this.uv = [];
this._texture = null;
this._original = null;
this._offset = null;
this._originalSize = null;
this._rotated = !1;
this._flipX = !1;
this._flipY = !1;
this.vertices = null;
this._capInsets = [ 0, 0, 0, 0 ];
this.uvSliced = [];
this._textureFilename = "";
0;
void 0 !== t && this.setTexture(t, e, i, r, s);
},
textureLoaded: function() {
return this._texture && this._texture.loaded;
},
onTextureLoaded: function(t, e) {
if (!this.textureLoaded()) {
this.once("load", t, e);
this.ensureLoadTexture();
return !1;
}
t.call(e);
return !0;
},
isRotated: function() {
return this._rotated;
},
setRotated: function(t) {
this._rotated = t;
this._texture && this._calculateUV();
},
isFlipX: function() {
return this._flipX;
},
isFlipY: function() {
return this._flipY;
},
setFlipX: function(t) {
this._flipX = t;
this._texture && this._calculateUV();
},
setFlipY: function(t) {
this._flipY = t;
this._texture && this._calculateUV();
},
getRect: function() {
return cc.rect(this._rect);
},
setRect: function(t) {
this._rect = t;
this._texture && this._calculateUV();
},
getOriginalSize: function() {
return cc.size(this._originalSize);
},
setOriginalSize: function(t) {
if (this._originalSize) {
this._originalSize.width = t.width;
this._originalSize.height = t.height;
} else this._originalSize = cc.size(t);
},
getTexture: function() {
return this._texture;
},
_textureLoadedCallback: function() {
var t = this._texture;
if (t) {
var e = t.width, i = t.height;
this._rect ? this._checkRect(this._texture) : this._rect = cc.rect(0, 0, e, i);
this._originalSize || this.setOriginalSize(cc.size(e, i));
this._offset || this.setOffset(cc.v2(0, 0));
this._calculateUV();
this.emit("load");
}
},
_refreshTexture: function(t) {
this._texture = t;
t.loaded ? this._textureLoadedCallback() : t.once("load", this._textureLoadedCallback, this);
},
getOffset: function() {
return cc.v2(this._offset);
},
setOffset: function(t) {
this._offset = cc.v2(t);
},
clone: function() {
return new a(this._texture || this._textureFilename, this._rect, this._rotated, this._offset, this._originalSize);
},
setTexture: function(t, e, i, n, r) {
this._rect = e || null;
n ? this.setOffset(n) : this._offset = null;
r ? this.setOriginalSize(r) : this._originalSize = null;
this._rotated = i || !1;
var s = t;
if ("string" == typeof s && s) {
this._textureFilename = s;
this._loadTexture();
}
s instanceof cc.Texture2D && this._texture !== s && this._refreshTexture(s);
return !0;
},
_loadTexture: function() {
if (this._textureFilename) {
var t = r.loadImage(this._textureFilename);
this._refreshTexture(t);
}
},
ensureLoadTexture: function() {
if (this._texture) {
if (!this._texture.loaded) {
this._refreshTexture(this._texture);
r.postLoadTexture(this._texture);
}
} else this._textureFilename && this._loadTexture();
},
_checkRect: function(t) {
var e = this._rect, i = e.x, n = e.y;
if (this._rotated) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.width && cc.errorID(3300, t.url + "/" + this.name, i, t.width);
n > t.height && cc.errorID(3400, t.url + "/" + this.name, n, t.height);
},
_flipXY: function(t) {
if (this._flipX) {
var e = t[0];
t[0] = t[1];
t[1] = e;
e = t[2];
t[2] = t[3];
t[3] = e;
}
if (this._flipY) {
var i = t[0];
t[0] = t[2];
t[2] = i;
i = t[1];
t[1] = t[3];
t[3] = i;
}
},
_calculateSlicedUV: function() {
var t = this._rect, e = this._texture.width, i = this._texture.height, n = this._capInsets[0], r = this._capInsets[2], a = t.width - n - r, o = this._capInsets[1], c = this._capInsets[3], l = t.height - o - c, u = this.uvSliced;
u.length = 0;
if (this._rotated) {
s[0].u = t.x / e;
s[1].u = (t.x + c) / e;
s[2].u = (t.x + c + l) / e;
s[3].u = (t.x + t.height) / e;
s[3].v = t.y / i;
s[2].v = (t.y + n) / i;
s[1].v = (t.y + n + a) / i;
s[0].v = (t.y + t.width) / i;
this._flipXY(s);
for (var h = 0; h < 4; ++h) for (var f = s[h], _ = 0; _ < 4; ++_) {
var d = s[3 - _];
u.push({
u: f.u,
v: d.v
});
}
} else {
s[0].u = t.x / e;
s[1].u = (t.x + n) / e;
s[2].u = (t.x + n + a) / e;
s[3].u = (t.x + t.width) / e;
s[3].v = t.y / i;
s[2].v = (t.y + o) / i;
s[1].v = (t.y + o + l) / i;
s[0].v = (t.y + t.height) / i;
this._flipXY(s);
for (var p = 0; p < 4; ++p) for (var v = s[p], g = 0; g < 4; ++g) {
var m = s[g];
u.push({
u: m.u,
v: v.v
});
}
}
},
_setDynamicAtlasFrame: function(t) {
if (t) {
this._original = {
_texture: this._texture,
_x: this._rect.x,
_y: this._rect.y
};
this._texture = t.texture;
this._rect.x = t.x;
this._rect.y = t.y;
this._calculateUV();
}
},
_resetDynamicAtlasFrame: function() {
if (this._original) {
this._rect.x = this._original._x;
this._rect.y = this._original._y;
this._texture = this._original._texture;
this._original = null;
this._calculateUV();
}
},
_calculateUV: function() {
var t = this._rect, e = this._texture, i = this.uv, n = e.width, r = e.height;
if (this._rotated) {
var s = 0 === n ? 0 : t.x / n, a = 0 === n ? 0 : (t.x + t.height) / n, o = 0 === r ? 0 : (t.y + t.width) / r, c = 0 === r ? 0 : t.y / r;
i[0] = s;
i[1] = c;
i[2] = s;
i[3] = o;
i[4] = a;
i[5] = c;
i[6] = a;
i[7] = o;
} else {
var l = 0 === n ? 0 : t.x / n, u = 0 === n ? 0 : (t.x + t.width) / n, h = 0 === r ? 0 : (t.y + t.height) / r, f = 0 === r ? 0 : t.y / r;
i[0] = l;
i[1] = h;
i[2] = u;
i[3] = h;
i[4] = l;
i[5] = f;
i[6] = u;
i[7] = f;
}
if (this._flipX) {
var _ = i[0];
i[0] = i[2];
i[2] = _;
_ = i[1];
i[1] = i[3];
i[3] = _;
_ = i[4];
i[4] = i[6];
i[6] = _;
_ = i[5];
i[5] = i[7];
i[7] = _;
}
if (this._flipY) {
var d = i[0];
i[0] = i[4];
i[4] = d;
d = i[1];
i[1] = i[5];
i[5] = d;
d = i[2];
i[2] = i[6];
i[6] = d;
d = i[3];
i[3] = i[7];
i[7] = d;
}
var p = this.vertices;
if (p) {
p.nu.length = 0;
p.nv.length = 0;
for (var v = 0; v < p.u.length; v++) {
p.nu[v] = p.u[v] / n;
p.nv[v] = p.v[v] / r;
}
}
this._calculateSlicedUV();
},
_serialize: !1,
_deserialize: function(t, e) {
var i = t.rect;
i && (this._rect = new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this._rotated = 1 === t.rotated;
this._name = t.name;
var n = t.capInsets;
if (n) {
this._capInsets[0] = n[0];
this._capInsets[1] = n[1];
this._capInsets[2] = n[2];
this._capInsets[3] = n[3];
}
0;
this.vertices = t.vertices;
if (this.vertices) {
this.vertices.nu = [];
this.vertices.nv = [];
}
var r = t.texture;
r && e.result.push(this, "_textureSetter", r);
}
}), o = a.prototype;
o.copyWithZone = o.clone;
o.copy = o.clone;
o.initWithTexture = o.setTexture;
cc.SpriteFrame = a;
e.exports = a;
}), {
"../assets/CCAsset": 10,
"../event/event-target": 64,
"../utils/texture-util": 161
} ],
23: [ (function(t, e, i) {
"use strict";
var n = t("./CCFont"), r = cc.Class({
name: "cc.TTFFont",
extends: n,
properties: {
_fontFamily: null,
_nativeAsset: {
type: cc.String,
get: function() {
return this._fontFamily;
},
set: function(t) {
this._fontFamily = t || "Arial";
},
override: !0
}
}
});
cc.TTFFont = e.exports = r;
}), {
"./CCFont": 14
} ],
24: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.TextAsset",
extends: cc.Asset,
properties: {
text: ""
},
toString: function() {
return this.text;
}
});
e.exports = cc.TextAsset = n;
}), {} ],
25: [ (function(t, e, i) {
"use strict";
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../renderer/gfx"));
var r = t("../event/event-target"), s = t("../renderer");
t("../platform/CCClass");
var a = new (t("../platform/id-generater"))("Tex"), o = 1024, c = cc.Enum({
RGB565: n.default.TEXTURE_FMT_R5_G6_B5,
RGB5A1: n.default.TEXTURE_FMT_R5_G5_B5_A1,
RGBA4444: n.default.TEXTURE_FMT_R4_G4_B4_A4,
RGB888: n.default.TEXTURE_FMT_RGB8,
RGBA8888: n.default.TEXTURE_FMT_RGBA8,
RGBA32F: n.default.TEXTURE_FMT_RGBA32F,
A8: n.default.TEXTURE_FMT_A8,
I8: n.default.TEXTURE_FMT_L8,
AI8: n.default.TEXTURE_FMT_L8_A8,
RGB_PVRTC_2BPPV1: n.default.TEXTURE_FMT_RGB_PVRTC_2BPPV1,
RGBA_PVRTC_2BPPV1: n.default.TEXTURE_FMT_RGBA_PVRTC_2BPPV1,
RGB_A_PVRTC_2BPPV1: o++,
RGB_PVRTC_4BPPV1: n.default.TEXTURE_FMT_RGB_PVRTC_4BPPV1,
RGBA_PVRTC_4BPPV1: n.default.TEXTURE_FMT_RGBA_PVRTC_4BPPV1,
RGB_A_PVRTC_4BPPV1: o++,
RGB_ETC1: n.default.TEXTURE_FMT_RGB_ETC1,
RGBA_ETC1: o++,
RGB_ETC2: n.default.TEXTURE_FMT_RGB_ETC2,
RGBA_ETC2: n.default.TEXTURE_FMT_RGBA_ETC2
}), l = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
}), u = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
}), h = {
9728: 0,
9729: 1
}, f = [], _ = {
width: void 0,
height: void 0,
minFilter: void 0,
magFilter: void 0,
wrapS: void 0,
wrapT: void 0,
format: void 0,
genMipmaps: void 0,
images: void 0,
image: void 0,
flipY: void 0,
premultiplyAlpha: void 0
};
function d() {
for (var t in _) _[t] = void 0;
f.length = 0;
_.images = f;
return _;
}
var p = cc.Class({
name: "cc.Texture2D",
extends: t("../assets/CCAsset"),
mixins: [ r ],
properties: {
_nativeAsset: {
get: function() {
return this._image;
},
set: function(t) {
t._compressed && t._data ? this.initWithData(t._data, this._format, t.width, t.height) : this.initWithElement(t);
},
override: !0
},
_format: c.RGBA8888,
_premultiplyAlpha: !1,
_flipY: !1,
_minFilter: u.LINEAR,
_magFilter: u.LINEAR,
_mipFilter: u.LINEAR,
_wrapS: l.CLAMP_TO_EDGE,
_wrapT: l.CLAMP_TO_EDGE,
_genMipmaps: !1,
genMipmaps: {
get: function() {
return this._genMipmaps;
},
set: function(t) {
if (this._genMipmaps !== t) {
var e = d();
e.genMipmaps = t;
this.update(e);
}
}
},
_packable: !0,
packable: {
get: function() {
return this._packable;
},
set: function(t) {
this._packable = t;
}
}
},
statics: {
PixelFormat: c,
WrapMode: l,
Filter: u,
_FilterIndex: h,
extnames: [ ".png", ".jpg", ".jpeg", ".bmp", ".webp", ".pvr", ".pkm" ]
},
ctor: function() {
this._id = a.getNewId();
this.loaded = !1;
this.width = 0;
this.height = 0;
this._hashDirty = !0;
this._hash = 0;
this._texture = null;
0;
},
getImpl: function() {
return this._texture;
},
getId: function() {
return this._id;
},
toString: function() {
return this.url || "";
},
update: function(t) {
if (t) {
var e = !1;
void 0 !== t.width && (this.width = t.width);
void 0 !== t.height && (this.height = t.height);
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
t.minFilter = h[t.minFilter];
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
t.magFilter = h[t.magFilter];
}
if (void 0 !== t.mipFilter) {
this._mipFilter = t.mipFilter;
t.mipFilter = h[t.mipFilter];
}
void 0 !== t.wrapS && (this._wrapS = t.wrapS);
void 0 !== t.wrapT && (this._wrapT = t.wrapT);
void 0 !== t.format && (this._format = t.format);
if (void 0 !== t.flipY) {
this._flipY = t.flipY;
e = !0;
}
if (void 0 !== t.premultiplyAlpha) {
this._premultiplyAlpha = t.premultiplyAlpha;
e = !0;
}
void 0 !== t.genMipmaps && (this._genMipmaps = t.genMipmaps);
e && this._image && (t.image = this._image);
if (t.images && t.images.length > 0) this._image = t.images[0]; else if (void 0 !== t.image) {
this._image = t.image;
if (!t.images) {
f.length = 0;
t.images = f;
}
t.images.push(t.image);
}
this._texture && this._texture.update(t);
this._hashDirty = !0;
}
},
initWithElement: function(t) {
if (t) {
this._image = t;
if (t.complete || t instanceof HTMLCanvasElement) this.handleLoadedTexture(); else {
var e = this;
t.addEventListener("load", (function() {
e.handleLoadedTexture();
}));
t.addEventListener("error", (function(t) {
cc.warnID(3119, t.message);
}));
}
}
},
initWithData: function(t, e, i, n) {
var r = d();
r.image = t;
r.images = [ r.image ];
r.genMipmaps = this._genMipmaps;
r.premultiplyAlpha = this._premultiplyAlpha;
r.flipY = this._flipY;
r.minFilter = h[this._minFilter];
r.magFilter = h[this._magFilter];
r.wrapS = this._wrapS;
r.wrapT = this._wrapT;
r.format = this._getGFXPixelFormat(e);
r.width = i;
r.height = n;
this._texture ? this._texture.update(r) : this._texture = new s.Texture2D(s.device, r);
this.width = i;
this.height = n;
this._checkPackable();
this.loaded = !0;
this.emit("load");
return !0;
},
getHtmlElementObj: function() {
return this._image;
},
destroy: function() {
this._packable && cc.dynamicAtlasManager && cc.dynamicAtlasManager.deleteAtlasTexture(this);
this._image = null;
this._texture && this._texture.destroy();
this._super();
},
getPixelFormat: function() {
return this._format;
},
hasPremultipliedAlpha: function() {
return this._premultiplyAlpha || !1;
},
handleLoadedTexture: function() {
if (this._image && this._image.width && this._image.height) {
this.width = this._image.width;
this.height = this._image.height;
var t = d();
t.image = this._image;
t.images = [ t.image ];
t.width = this.width;
t.height = this.height;
t.genMipmaps = this._genMipmaps;
t.format = this._getGFXPixelFormat(this._format);
t.premultiplyAlpha = this._premultiplyAlpha;
t.flipY = this._flipY;
t.minFilter = h[this._minFilter];
t.magFilter = h[this._magFilter];
t.wrapS = this._wrapS;
t.wrapT = this._wrapT;
this._texture ? this._texture.update(t) : this._texture = new s.Texture2D(s.device, t);
this._checkPackable();
this.loaded = !0;
this.emit("load");
cc.macro.CLEANUP_IMAGE_CACHE && this._image instanceof HTMLImageElement && this._clearImage();
}
},
description: function() {
return "<cc.Texture2D | Name = " + this.url + " | Dimensions = " + this.width + " x " + this.height + ">";
},
releaseTexture: function() {
this._image = null;
this._texture && this._texture.destroy();
},
setWrapMode: function(t, e) {
if (this._wrapS !== t || this._wrapT !== e) {
var i = d();
i.wrapS = t;
i.wrapT = e;
this.update(i);
}
},
setFilters: function(t, e) {
if (this._minFilter !== t || this._magFilter !== e) {
var i = d();
i.minFilter = t;
i.magFilter = e;
this.update(i);
}
},
setFlipY: function(t) {
if (this._flipY !== t) {
var e = d();
e.flipY = t;
this.update(e);
}
},
setPremultiplyAlpha: function(t) {
if (this._premultiplyAlpha !== t) {
var e = d();
e.premultiplyAlpha = t;
this.update(e);
}
},
_checkPackable: function() {
var t = cc.dynamicAtlasManager;
if (t) if (this._isCompressed()) this._packable = !1; else {
var e = this.width, i = this.height;
!this._image || e > t.maxFrameSize || i > t.maxFrameSize || this._getHash() !== t.Atlas.DEFAULT_HASH ? this._packable = !1 : this._image && this._image instanceof HTMLCanvasElement && (this._packable = !0);
}
},
_getOpts: function() {
var t = d();
t.width = this.width;
t.height = this.height;
t.genMipmaps = this._genMipmaps;
t.format = this._format;
t.premultiplyAlpha = this._premultiplyAlpha;
t.anisotropy = this._anisotropy;
t.flipY = this._flipY;
t.minFilter = h[this._minFilter];
t.magFilter = h[this._magFilter];
t.mipFilter = h[this._mipFilter];
t.wrapS = this._wrapS;
t.wrapT = this._wrapT;
return t;
},
_getGFXPixelFormat: function(t) {
t === c.RGBA_ETC1 ? t = c.RGB_ETC1 : t === c.RGB_A_PVRTC_4BPPV1 ? t = c.RGB_PVRTC_4BPPV1 : t === c.RGB_A_PVRTC_2BPPV1 && (t = c.RGB_PVRTC_2BPPV1);
return t;
},
_resetUnderlyingMipmaps: function(t) {
var e = this._getOpts();
e.images = t || [ null ];
this._texture ? this._texture.update(e) : this._texture = new s.Texture2D(s.device, e);
},
_serialize: !1,
_deserialize: function(t, e) {
var i = cc.renderer.device, n = t.split(","), r = n[0];
if (r) {
for (var s = r.split("_"), a = "", o = "", l = 999, u = this._format, h = cc.macro.SUPPORT_TEXTURE_FORMATS, f = 0; f < s.length; f++) {
var _ = s[f].split("@"), d = _[0];
d = p.extnames[d.charCodeAt(0) - 48] || d;
var v = h.indexOf(d);
if (-1 !== v && v < l) {
var g = _[1] ? parseInt(_[1]) : this._format;
if (".pvr" === d && !i.ext("WEBGL_compressed_texture_pvrtc")) continue;
if (!(g !== c.RGB_ETC1 && g !== c.RGBA_ETC1 || i.ext("WEBGL_compressed_texture_etc1"))) continue;
if (!(g !== c.RGB_ETC2 && g !== c.RGBA_ETC2 || i.ext("WEBGL_compressed_texture_etc"))) continue;
if (".webp" === d && !cc.sys.capabilities.webp) continue;
l = v;
o = d;
u = g;
} else a || (a = d);
}
if (o) {
this._setRawAsset(o);
this._format = u;
} else {
this._setRawAsset(a);
cc.warnID(3120, e.customEnv.url, a, a);
}
}
if (8 === n.length) {
this._minFilter = parseInt(n[1]);
this._magFilter = parseInt(n[2]);
this._wrapS = parseInt(n[3]);
this._wrapT = parseInt(n[4]);
this._premultiplyAlpha = 49 === n[5].charCodeAt(0);
this._genMipmaps = 49 === n[6].charCodeAt(0);
this._packable = 49 === n[7].charCodeAt(0);
}
},
_getHash: function() {
if (!this._hashDirty) return this._hash;
var t = this._genMipmaps ? 1 : 0, e = this._premultiplyAlpha ? 1 : 0, i = this._flipY ? 1 : 0, n = this._minFilter === u.LINEAR ? 1 : 2, r = this._magFilter === u.LINEAR ? 1 : 2, s = this._wrapS === l.REPEAT ? 1 : this._wrapS === l.CLAMP_TO_EDGE ? 2 : 3, a = this._wrapT === l.REPEAT ? 1 : this._wrapT === l.CLAMP_TO_EDGE ? 2 : 3, o = this._format, c = this._image;
if (c) {
c._glFormat && 6408 !== c._glFormat && (o = 0);
e = c._premultiplyAlpha ? 1 : 0;
}
this._hash = Number("" + n + r + o + s + a + t + e + i);
this._hashDirty = !1;
return this._hash;
},
_isCompressed: function() {
return this._format < c.A8 || this._format > c.RGBA32F;
},
_clearImage: function() {
cc.loader.removeItem(this._image.id || this._image.src);
this._image.src = "";
}
});
cc.Texture2D = e.exports = p;
}), {
"../../renderer/gfx": 188,
"../assets/CCAsset": 10,
"../event/event-target": 64,
"../platform/CCClass": 92,
"../platform/id-generater": 108,
"../renderer": 123
} ],
26: [ (function(t, e, i) {
"use strict";
t("./CCRawAsset");
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("./CCSpriteFrame");
t("./CCTexture2D");
t("./CCRenderTexture");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
t("./CCTextAsset");
t("./CCJsonAsset");
t("./CCBufferAsset");
t("./material");
}), {
"./CCAsset": 10,
"./CCAudioClip": 11,
"./CCBitmapFont": 12,
"./CCBufferAsset": 13,
"./CCFont": 14,
"./CCJsonAsset": 15,
"./CCLabelAtlas": 16,
"./CCPrefab": 17,
"./CCRawAsset": 18,
"./CCRenderTexture": void 0,
"./CCSceneAsset": 19,
"./CCScripts": 20,
"./CCSpriteAtlas": 21,
"./CCSpriteFrame": 22,
"./CCTTFFont": 23,
"./CCTextAsset": 24,
"./CCTexture2D": 25,
"./material": 33
} ],
27: [ (function(t, e, i) {
"use strict";
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../CCAsset")), r = t("./effect-parser");
var s = cc.Class({
name: "cc.EffectAsset",
extends: n.default,
ctor: function() {
this._effect = null;
},
properties: {
properties: Object,
techniques: [],
shaders: []
},
onLoad: function() {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
for (var t = cc.renderer._forward._programLib, e = 0; e < this.shaders.length; e++) t.define(this.shaders[e]);
this._initEffect();
}
},
_initEffect: function() {
if (!this._effect) {
this._effect = (0, r.parseEffect)(this);
Object.freeze(this._effect);
}
},
getInstantiatedEffect: function() {
this._initEffect();
return this._effect.clone();
},
getEffect: function() {
this._initEffect();
return this._effect;
}
});
e.exports = cc.EffectAsset = s;
}), {
"../CCAsset": 10,
"./effect-parser": 30
} ],
28: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("../CCAsset"), r = t("../CCTexture2D"), s = r.PixelFormat, a = t("./CCEffectAsset"), o = t("../../utils/texture-util"), c = cc.gfx, l = cc.Enum({
SPRITE: "2d-sprite",
GRAY_SPRITE: "2d-gray-sprite",
UNLIT: "unlit"
}), u = cc.Class({
name: "cc.Material",
extends: n,
ctor: function() {
this._manualHash = !1;
this._dirty = !0;
this._effect = null;
},
properties: {
_defines: {
default: void 0,
type: Object
},
_props: {
default: void 0,
type: Object
},
_effectAsset: {
type: a,
default: null
},
_techniqueIndex: 0,
_techniqueData: Object,
effectName: void 0,
effectAsset: {
get: function() {
return this._effectAsset;
},
set: function(t) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
this._effectAsset = t;
t ? this._effect = this._effectAsset.getInstantiatedEffect() : cc.error("Can not set an empty effect asset.");
}
}
},
effect: {
get: function() {
return this._effect;
}
},
techniqueIndex: {
get: function() {
return this._techniqueIndex;
},
set: function(t) {
this._techniqueIndex = t;
this._effect.switchTechnique(t);
}
}
},
statics: {
getBuiltinMaterial: function(t) {
return cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? new cc.Material() : cc.AssetLibrary.getBuiltin("material", "builtin-" + t);
},
BUILTIN_NAME: l,
createWithBuiltin: function(t, e) {
void 0 === e && (e = 0);
var i = cc.AssetLibrary.getBuiltin("effect", "builtin-" + t);
return u.create(i, e);
},
create: function(t, e) {
void 0 === e && (e = 0);
if (!t) return null;
var i = new u();
i.effectAsset = t;
i.techniqueIndex = e;
return i;
}
},
setProperty: function(t, e, i, n) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
"string" == typeof i && (i = parseInt(i));
if (e instanceof r) {
var a = e.getPixelFormat(), c = a === s.RGBA_ETC1 || a === s.RGB_A_PVRTC_4BPPV1 || a === s.RGB_A_PVRTC_2BPPV1, l = "CC_USE_ALPHA_ATLAS_" + t, u = this.getDefine(l, i);
(c || u) && this.define(l, c);
if (!e.loaded) {
e.once("load", (function() {
this._effect.setProperty(t, e, i);
}), this);
o.postLoadTexture(e);
return;
}
}
this._effect.setProperty(t, e, i, n);
}
},
getProperty: function(t, e) {
"string" == typeof e && (e = parseInt(e));
return this._effect.getProperty(t, e);
},
define: function(t, e, i, n) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
"string" == typeof i && (i = parseInt(i));
this._effect.define(t, e, i, n);
}
},
getDefine: function(t, e) {
"string" == typeof e && (e = parseInt(e));
return this._effect.getDefine(t, e);
},
setCullMode: function(t, e) {
void 0 === t && (t = c.CULL_BACK);
this._effect.setCullMode(t, e);
},
setDepth: function(t, e, i, n) {
void 0 === t && (t = !1);
void 0 === e && (e = !1);
void 0 === i && (i = c.DS_FUNC_LESS);
this._effect.setDepth(t, e, i, n);
},
setBlend: function(t, e, i, n, r, s, a, o, l) {
void 0 === t && (t = !1);
void 0 === e && (e = c.BLEND_FUNC_ADD);
void 0 === i && (i = c.BLEND_SRC_ALPHA);
void 0 === n && (n = c.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === r && (r = c.BLEND_FUNC_ADD);
void 0 === s && (s = c.BLEND_SRC_ALPHA);
void 0 === a && (a = c.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === o && (o = 4294967295);
this._effect.setBlend(t, e, i, n, r, s, a, o, l);
},
setStencilEnabled: function(t, e) {
void 0 === t && (t = c.STENCIL_INHERIT);
this._effect.setStencilEnabled(t, e);
},
setStencil: function(t, e, i, n, r, s, a, o, l) {
void 0 === t && (t = c.STENCIL_INHERIT);
void 0 === e && (e = c.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === n && (n = 255);
void 0 === r && (r = c.STENCIL_OP_KEEP);
void 0 === s && (s = c.STENCIL_OP_KEEP);
void 0 === a && (a = c.STENCIL_OP_KEEP);
void 0 === o && (o = 255);
this._effect.setStencil(t, e, i, n, r, s, a, o, l);
},
updateHash: function(t) {
this._manualHash = t;
this._effect && this._effect.updateHash(t);
},
getHash: function() {
return this._manualHash || this._effect && this._effect.getHash();
},
onLoad: function() {
this.effectAsset = this._effectAsset;
if (this._effect) {
this._techniqueIndex && this._effect.switchTechnique(this._techniqueIndex);
this._techniqueData = this._techniqueData || {};
var t = this._techniqueData;
for (var e in t) {
var i = t[e = parseInt(e)];
if (i) {
for (var n in i.defines) this.define(n, i.defines[n], e);
for (var r in i.props) this.setProperty(r, i.props[r], e);
}
}
}
}
}), h = u;
i.default = h;
cc.Material = u;
e.exports = i.default;
}), {
"../../utils/texture-util": 161,
"../CCAsset": 10,
"../CCTexture2D": 25,
"./CCEffectAsset": 27
} ],
29: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../renderer/core/pass"));
function r(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function s(t, e, i) {
e && r(t.prototype, e);
i && r(t, i);
return t;
}
var a = cc.gfx, o = (function() {
function t() {
this._dirty = !0;
this._name = "";
this._technique = null;
}
var e = t.prototype;
e._createPassProp = function(t, e) {
var i = e._properties[t];
if (i) {
var n = Object.create(null);
n.name = t;
n.type = i.type;
i.value instanceof Float32Array ? n.value = new Float32Array(i.value) : n.value = i.value;
e._properties[t] = n;
return n;
}
};
e._setPassProperty = function(t, e, i, r) {
var s = i._properties.hasOwnProperty(t);
if (s) {
if (s.value === e) return;
} else s = this._createPassProp(t, i);
this._dirty = !0;
return n.default.prototype.setProperty.call(i, t, e, r);
};
e.setProperty = function(t, e, i, n) {
var r = !1, s = this.passes, a = 0, o = s.length;
void 0 !== i && (a = i, o = i + 1);
for (var c = a; c < o; c++) this._setPassProperty(t, e, s[c], n) && (r = !0);
r || cc.warnID(9103, this.name, t);
};
e.getProperty = function(t, e) {
var i = this.passes;
if (!(e >= i.length)) {
var n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) {
var a = i[s].getProperty(t);
if (void 0 !== a) return a;
}
}
};
e.define = function(t, e, i, n) {
var r = !1, s = this.passes, a = 0, o = s.length;
void 0 !== i && (a = i, o = i + 1);
for (var c = a; c < o; c++) s[c].define(t, e, n) && (r = !0);
r || cc.warnID(9104, this.name, t);
};
e.getDefine = function(t, e) {
var i = this.passes;
if (!(e >= i.length)) {
var n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) {
var a = i[s].getDefine(t);
if (void 0 !== a) return a;
}
}
};
e.setCullMode = function(t, e) {
void 0 === t && (t = a.CULL_BACK);
var i = this.passes, n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) i[s].setCullMode(t);
this._dirty = !0;
};
e.setDepth = function(t, e, i, n) {
var r = this.passes, s = 0, a = r.length;
void 0 !== n && (s = n, a = n + 1);
for (var o = s; o < a; o++) r[o].setDepth(t, e, i);
this._dirty = !0;
};
e.setBlend = function(t, e, i, n, r, s, a, o, c) {
var l = this.passes, u = 0, h = l.length;
void 0 !== c && (u = c, h = c + 1);
for (var f = u; f < h; f++) l[f].setBlend(t, e, i, n, r, s, a, o);
this._dirty = !0;
};
e.setStencilEnabled = function(t, e) {
void 0 === t && (t = a.STENCIL_INHERIT);
var i = this.passes, n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) i[s].setStencilEnabled(t);
this._dirty = !0;
};
e.setStencil = function(t, e, i, n, r, s, a, o, c) {
var l = this.passes, u = 0, h = l.length;
void 0 !== c && (u = c, h = c + 1);
for (var f = u; f < h; f++) {
var _ = l[f];
_.setStencilFront(t, e, i, n, r, s, a, o);
_.setStencilBack(t, e, i, n, r, s, a, o);
}
this._dirty = !0;
};
s(t, [ {
key: "name",
get: function() {
return this._name;
}
}, {
key: "technique",
get: function() {
return this._technique;
}
}, {
key: "passes",
get: function() {
return [];
}
} ]);
return t;
})();
i.default = o;
cc.EffectBase = o;
e.exports = i.default;
}), {
"../../../renderer/core/pass": 185
} ],
30: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.parseEffect = function(t) {
var e = f(t);
return new a.default(t.name, e, 0, t);
};
var n = c(t("../../../renderer/core/pass")), r = t("../../../renderer/types"), s = c(t("../../../renderer/enums")), a = c(t("./effect")), o = c(t("../../../renderer/core/technique"));
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function l(t) {
return cc.renderer._forward._programLib.getTemplate(t);
}
function u(t, e) {
var i = e.properties || {}, n = l(e.program), a = function(e) {
if (!n.uniforms.find((function(t) {
return t.name === e;
}))) {
cc.warnID(9107, t.name, e);
return "continue";
}
};
for (var o in i) a(o);
var c = {};
n.uniforms.forEach((function(t) {
var e = t.name, n = c[e] = Object.assign({}, t), a = i[e], o = r.enums2default[t.type];
o = a ? a.type === s.default.PARAM_TEXTURE_2D ? null : a.type === s.default.PARAM_INT || a.type === s.default.PARAM_FLOAT ? Array.isArray(a.value) ? a.value[0] : a.value : new Float32Array(a.value) : r.enums2default[t.type];
n.value = o;
}));
return c;
}
function h(t) {
var e = {};
l(t.program).defines.forEach((function(t) {
e[t.name] = r.enums2default[t.type];
}));
return e;
}
function f(t) {
for (var e = t.techniques.length, i = new Array(e), r = 0; r < e; ++r) {
for (var s = t.techniques[r], a = s.name || r, c = s.passes.length, l = new Array(c), f = 0; f < c; ++f) {
var _ = s.passes[f], d = _.name || f, p = t.name + "-" + a + "-" + d, v = _.stage || "opaque", g = u(t, _), m = h(_), y = l[f] = new n.default(d, p, _.program, v, g, m);
_.rasterizerState && y.setCullMode(_.rasterizerState.cullMode);
var E = _.blendState && _.blendState.targets[0];
E && y.setBlend(E.blend, E.blendEq, E.blendSrc, E.blendDst, E.blendAlphaEq, E.blendSrcAlpha, E.blendDstAlpha, E.blendColor);
var C = _.depthStencilState;
if (C) {
y.setDepth(C.depthTest, C.depthWrite, C.depthFunc);
y.setStencilFront(C.stencilTest, C.stencilFuncFront, C.stencilRefFront, C.stencilMaskFront, C.stencilFailOpFront, C.stencilZFailOpFront, C.stencilZPassOpFront, C.stencilWriteMaskFront);
y.setStencilBack(C.stencilTest, C.stencilFuncBack, C.stencilRefBack, C.stencilMaskBack, C.stencilFailOpBack, C.stencilZFailOpBack, C.stencilZPassOpBack, C.stencilWriteMaskBack);
}
}
i[r] = new o.default(a, l);
}
return i;
}
0;
}), {
"../../../renderer/core/pass": 185,
"../../../renderer/core/technique": 186,
"../../../renderer/enums": 187,
"../../../renderer/types": 190,
"./effect": 32
} ],
31: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../../../renderer/murmurhash2_gc")), r = a(t("./utils")), s = a(t("./effect-base"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
cc.gfx;
var u = (function(t) {
l(e, t);
c(e, [ {
key: "effect",
get: function() {
return this._effect;
}
}, {
key: "name",
get: function() {
return this._effect && this._effect.name + " (variant)";
}
}, {
key: "passes",
get: function() {
return this._passes;
}
}, {
key: "stagePasses",
get: function() {
return this._stagePasses;
}
} ]);
function e(e) {
var i;
(i = t.call(this) || this)._effect = void 0;
i._passes = [];
i._stagePasses = {};
i._hash = 0;
i.init(e);
return i;
}
var i = e.prototype;
i._onEffectChanged = function() {};
i.init = function(t) {
t instanceof e && (t = t.effect);
this._effect = t;
this._dirty = !0;
if (t) {
var i = t.passes, n = this._passes;
n.length = 0;
for (var r = this._stagePasses = {}, s = 0; s < i.length; s++) {
var a = n[s] = Object.setPrototypeOf({}, i[s]);
a._properties = Object.setPrototypeOf({}, i[s]._properties);
a._defines = Object.setPrototypeOf({}, i[s]._defines);
r[a._stage] || (r[a._stage] = []);
r[a._stage].push(a);
}
}
};
i.updateHash = function(t) {};
i.getHash = function() {
if (!this._dirty) return this._hash;
this._dirty = !1;
var t = "";
t += r.default.serializePasses(this._passes);
var e = this._effect;
e && (t += r.default.serializePasses(e.passes));
this._hash = (0, n.default)(t, 666);
this.updateHash(this._hash);
return this._hash;
};
return e;
})(s.default);
i.default = u;
cc.EffectVariant = u;
e.exports = i.default;
}), {
"../../../renderer/murmurhash2_gc": 189,
"./effect-base": 29,
"./utils": 36
} ],
32: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function r(t, e, i) {
e && n(t.prototype, e);
i && n(t, i);
return t;
}
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = (function(t) {
s(e, t);
r(e, [ {
key: "technique",
get: function() {
return this._technique;
}
}, {
key: "passes",
get: function() {
return this._technique.passes;
}
} ]);
function e(e, i, n, r) {
var s;
(s = t.call(this) || this)._techniques = [];
s._asset = null;
s.init(e, i, n, r, !0);
return s;
}
var i = e.prototype;
i.init = function(t, e, i, n, r) {
this._name = t;
this._techniques = e;
this._technique = e[i];
this._asset = n;
};
i.switchTechnique = function(t) {
t >= this._techniques.length ? cc.warn("Can not switch to technique with index [" + t + "]") : this._technique = this._techniques[t];
};
i.clear = function() {
this._techniques = [];
};
i.clone = function() {
for (var t = [], i = 0; i < this._techniques.length; i++) t.push(this._techniques[i].clone());
var n = this._techniques.indexOf(this._technique);
return new e(this._name, t, n, this._asset);
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("./effect-base")).default);
i.default = a;
cc.Effect = a;
e.exports = i.default;
}), {
"./effect-base": 29
} ],
33: [ (function(t, e, i) {
"use strict";
t("./CCEffectAsset");
t("./CCMaterial");
t("./material-variant");
}), {
"./CCEffectAsset": 27,
"./CCMaterial": 28,
"./material-variant": 35
} ],
34: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = s(t("./utils")), r = s(t("../../utils/pool"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
function a(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var o = new (function(t) {
a(e, t);
function e() {
for (var e, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
(e = t.call.apply(t, [ this ].concat(n)) || this).enabled = !1;
e._pool = {};
return e;
}
var i = e.prototype;
i.get = function(t, e) {
var i, r = this._pool;
if (t instanceof cc.MaterialVariant) {
if (!t._owner) {
t._owner = e;
return t;
}
if (t._owner === e) return t;
t = t.material;
}
if (this.enabled) {
var s = t.effectAsset._uuid;
if (r[s]) {
var a = n.default.serializeDefines(t._effect._defines) + n.default.serializeTechniques(t._effect._techniques);
i = r[s][a] && r[s][a].pop();
}
}
if (i) this.count--; else {
(i = new cc.MaterialVariant(t))._name = t._name + " (Instance)";
i._uuid = t._uuid;
}
i._owner = e;
return i;
};
i.put = function(t) {
if (this.enabled && t._owner) {
var e = this._pool, i = t.effectAsset._uuid;
e[i] || (e[i] = {});
var r = n.default.serializeDefines(t._effect._defines) + n.default.serializeTechniques(t._effect._techniques);
e[i][r] || (e[i][r] = []);
if (!(this.count > this.maxSize)) {
this._clean(t);
e[i][r].push(t);
this.count++;
}
}
};
i.clear = function() {
this._pool = {};
this.count = 0;
};
i._clean = function(t) {
t._owner = null;
};
return e;
}(r.default))();
r.default.register("material", o);
var c = o;
i.default = c;
e.exports = i.default;
}), {
"../../utils/pool": 155,
"./utils": 36
} ],
35: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = o(t("./CCMaterial")), s = o(t("./effect-variant")), a = o(t("./material-pool"));
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function l(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (0, cc._decorator.ccclass)("cc.MaterialVariant")(n = (function(t) {
u(e, t);
e.createWithBuiltin = function(t, i) {
return e.create(r.default.getBuiltinMaterial(t), i);
};
e.create = function(t, e) {
return t ? a.default.get(t, e) : null;
};
l(e, [ {
key: "uuid",
get: function() {
return this._material.uuid;
}
}, {
key: "owner",
get: function() {
return this._owner;
}
}, {
key: "material",
get: function() {
return this._material;
}
} ]);
function e(e) {
var i;
(i = t.call(this) || this)._owner = null;
i._material = null;
i.init(e);
return i;
}
e.prototype.init = function(t) {
this._effect = new s.default(t.effect);
this._effectAsset = t._effectAsset;
this._material = t;
};
return e;
})(r.default)) || n;
i.default = h;
cc.MaterialVariant = h;
e.exports = i.default;
}), {
"./CCMaterial": 28,
"./effect-variant": 31,
"./material-pool": 34
} ],
36: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../renderer/enums"));
function r(t) {
var e = "";
for (var i in t) e += i + t[i];
return e;
}
function s(t, e) {
var i = t._programName + t._cullMode;
t._blend && (i += t._blendEq + t._blendAlphaEq + t._blendSrc + t._blendDst + t._blendSrcAlpha + t._blendDstAlpha + t._blendColor);
t._depthTest && (i += t._depthWrite + t._depthFunc);
t._stencilTest && (i += t._stencilFuncFront + t._stencilRefFront + t._stencilMaskFront + t._stencilFailOpFront + t._stencilZFailOpFront + t._stencilZPassOpFront + t._stencilWriteMaskFront + t._stencilFuncBack + t._stencilRefBack + t._stencilMaskBack + t._stencilFailOpBack + t._stencilZFailOpBack + t._stencilZPassOpBack + t._stencilWriteMaskBack);
e || (i += a(t._properties));
return i += r(t._defines);
}
function a(t) {
var e = "";
for (var i in t) {
var r = t[i], s = r.value;
s && (r.type === n.default.PARAM_TEXTURE_2D || r.type === n.default.PARAM_TEXTURE_CUBE ? e += s._id + ";" : e += s.toString() + ";");
}
return e;
}
var o = {
serializeDefines: r,
serializePasses: function(t) {
for (var e = "", i = 0; i < t.length; i++) e += s(t[i]);
return e;
},
serializeUniforms: a
};
i.default = o;
e.exports = i.default;
}), {
"../../../renderer/enums": 187
} ],
37: [ (function(t, e, i) {
"use strict";
t("../CCNode").EventType;
var n = 56, r = 7, s = cc.Enum({
ONCE: 0,
ON_WINDOW_RESIZE: 1,
ALWAYS: 2
});
function a(t) {
return t instanceof cc.Scene ? cc.visibleRect : t._contentSize;
}
function o(t, e, i, n) {
for (var r = t._parent.scaleX, s = t._parent.scaleY, a = 0, o = 0, c = t._parent; ;) {
a += c.x;
o += c.y;
if (!(c = c._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (c === e) break;
var l = c.scaleX, u = c.scaleY;
a *= l;
o *= u;
r *= l;
s *= u;
}
n.x = 0 !== r ? 1 / r : 1;
n.y = 0 !== s ? 1 / s : 1;
i.x = -a;
i.y = -o;
}
var c = cc.Vec2.ZERO, l = cc.Vec2.ONE;
function u(t, e) {
var i, s, u, h = e._target;
h ? o(t, i = h, s = c, u = l) : i = t._parent;
var f = a(i), _ = i._anchorPoint, d = i instanceof cc.Scene, p = t.x, v = t.y, g = t._anchorPoint;
if (e._alignFlags & n) {
var m, y, E = f.width;
if (d) {
m = cc.visibleRect.left.x;
y = cc.visibleRect.right.x;
} else y = (m = -_.x * E) + E;
m += e._isAbsLeft ? e._left : e._left * E;
y -= e._isAbsRight ? e._right : e._right * E;
if (h) {
m += s.x;
m *= u.x;
y += s.x;
y *= u.x;
}
var C, A = g.x, T = t.scaleX;
if (T < 0) {
A = 1 - A;
T = -T;
}
if (e.isStretchWidth) {
C = y - m;
0 !== T && (t.width = C / T);
p = m + A * C;
} else {
C = t.width * T;
if (e.isAlignHorizontalCenter) {
var x = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * E, S = (.5 - _.x) * f.width;
if (h) {
x *= u.x;
S += s.x;
S *= u.x;
}
p = S + (A - .5) * C + x;
} else p = e.isAlignLeft ? m + A * C : y + (A - 1) * C;
}
}
if (e._alignFlags & r) {
var b, R, L = f.height;
if (d) {
R = cc.visibleRect.bottom.y;
b = cc.visibleRect.top.y;
} else b = (R = -_.y * L) + L;
R += e._isAbsBottom ? e._bottom : e._bottom * L;
b -= e._isAbsTop ? e._top : e._top * L;
if (h) {
R += s.y;
R *= u.y;
b += s.y;
b *= u.y;
}
var w, I = g.y, O = t.scaleY;
if (O < 0) {
I = 1 - I;
O = -O;
}
if (e.isStretchHeight) {
w = b - R;
0 !== O && (t.height = w / O);
v = R + I * w;
} else {
w = t.height * O;
if (e.isAlignVerticalCenter) {
var D = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * L, M = (.5 - _.y) * f.height;
if (h) {
D *= u.y;
M += s.y;
M *= u.y;
}
v = M + (I - .5) * w + D;
} else v = e.isAlignBottom ? R + I * w : b + (I - 1) * w;
}
}
t.setPosition(p, v);
}
function h(t) {
var e = t._widget;
if (e) {
0;
u(t, e);
e.alignMode !== s.ALWAYS ? e.enabled = !1 : _.push(e);
}
for (var i = t._children, n = 0; n < i.length; n++) {
var r = i[n];
r._active && h(r);
}
}
function f() {
var t = cc.director.getScene();
if (t) {
d.isAligning = !0;
if (d._nodesOrderDirty) {
_.length = 0;
h(t);
d._nodesOrderDirty = !1;
} else {
var e, i = d._activeWidgetsIterator;
for (i.i = 0; i.i < _.length; ++i.i) u((e = _[i.i]).node, e);
}
d.isAligning = !1;
}
0;
}
var _ = [];
var d = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(_),
init: function(t) {
t.on(cc.Director.EVENT_AFTER_UPDATE, f);
var e = this.onResized.bind(this);
window.addEventListener("resize", e);
window.addEventListener("orientationchange", e);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
0;
},
onResized: function() {
var t = cc.director.getScene();
t && this.refreshWidgetOnResized(t);
},
refreshWidgetOnResized: function(t) {
var e = cc.Node.isNode(t) && t.getComponent(cc.Widget);
e && e.alignMode === s.ON_WINDOW_RESIZE && (e.enabled = !0);
for (var i = t._children, n = 0; n < i.length; n++) {
var r = i[n];
this.refreshWidgetOnResized(r);
}
},
updateAlignment: function t(e) {
var i = e._parent;
cc.Node.isNode(i) && t(i);
var n = e._widget || e.getComponent(cc.Widget);
n && i && u(e, n);
},
AlignMode: s
};
0;
}), {
"../CCNode": 6
} ],
38: [ (function(t, e, i) {
"use strict";
var n = t("../value-types"), r = t("../geom-utils"), s = t("../utils/affine-transform"), a = t("../renderer/index"), o = t("../renderer/render-flow"), c = t("../CCGame"), l = null;
l = window.renderer.Camera;
var u = cc.mat4(), h = cc.mat4(), f = cc.v3(), _ = cc.v3(), d = cc.v3(), p = [], v = null;
function g() {
if (v) {
var t = v.getNode(), e = cc.game.canvas;
t.z = e.height / 1.1566;
t.x = e.width / 2;
t.y = e.height / 2;
}
}
var m = cc.Enum({
COLOR: 1,
DEPTH: 2,
STENCIL: 4
}), y = cc.Enum({
OPAQUE: 1,
TRANSPARENT: 2
}), E = cc.Class({
name: "cc.Camera",
extends: cc.Component,
ctor: function() {
if (c.renderType !== c.RENDER_TYPE_CANVAS) {
var t = new l();
t.setStages([ "opaque" ]);
t.dirty = !0;
this._inited = !1;
this._camera = t;
} else this._inited = !0;
},
editor: !1,
properties: {
_cullingMask: 4294967295,
_clearFlags: m.DEPTH | m.STENCIL,
_backgroundColor: cc.color(0, 0, 0, 255),
_depth: 0,
_zoomRatio: 1,
_targetTexture: null,
_fov: 60,
_orthoSize: 10,
_nearClip: 1,
_farClip: 4096,
_ortho: !0,
_rect: cc.rect(0, 0, 1, 1),
_renderStages: 1,
_alignWithScreen: !0,
zoomRatio: {
get: function() {
return this._zoomRatio;
},
set: function(t) {
this._zoomRatio = t;
},
tooltip: !1
},
fov: {
get: function() {
return this._fov;
},
set: function(t) {
this._fov = t;
},
tooltip: !1
},
orthoSize: {
get: function() {
return this._orthoSize;
},
set: function(t) {
this._orthoSize = t;
},
tooltip: !1
},
nearClip: {
get: function() {
return this._nearClip;
},
set: function(t) {
this._nearClip = t;
this._updateClippingpPlanes();
},
tooltip: !1
},
farClip: {
get: function() {
return this._farClip;
},
set: function(t) {
this._farClip = t;
this._updateClippingpPlanes();
},
tooltip: !1
},
ortho: {
get: function() {
return this._ortho;
},
set: function(t) {
this._ortho = t;
this._updateProjection();
},
tooltip: !1
},
rect: {
get: function() {
return this._rect;
},
set: function(t) {
this._rect = t;
this._updateRect();
},
tooltip: !1
},
cullingMask: {
get: function() {
return this._cullingMask;
},
set: function(t) {
this._cullingMask = t;
this._updateCameraMask();
},
tooltip: !1
},
clearFlags: {
get: function() {
return this._clearFlags;
},
set: function(t) {
this._clearFlags = t;
this._camera && this._camera.setClearFlags(t);
},
tooltip: !1
},
backgroundColor: {
get: function() {
return this._backgroundColor;
},
set: function(t) {
if (!this._backgroundColor.equals(t)) {
this._backgroundColor.set(t);
this._updateBackgroundColor();
}
},
tooltip: !1
},
depth: {
get: function() {
return this._depth;
},
set: function(t) {
this._depth = t;
this._camera && this._camera.setPriority(t);
},
tooltip: !1
},
targetTexture: {
get: function() {
return this._targetTexture;
},
set: function(t) {
this._targetTexture = t;
this._updateTargetTexture();
},
tooltip: !1
},
renderStages: {
get: function() {
return this._renderStages;
},
set: function(t) {
this._renderStages = t;
this._updateStages();
},
tooltip: !1
},
alignWithScreen: {
get: function() {
return this._alignWithScreen;
},
set: function(t) {
this._alignWithScreen = t;
}
},
_is3D: {
get: function() {
return this.node && this.node._is3DNode;
}
}
},
statics: {
main: null,
cameras: p,
ClearFlags: m,
findCamera: function(t) {
for (var e = 0, i = p.length; e < i; e++) {
var n = p[e];
if (n.containsNode(t)) return n;
}
return null;
},
_findRendererCamera: function(t) {
for (var e = a.scene._cameras, i = 0; i < e._count; i++) if (e._data[i]._cullingMask & t._cullingMask) return e._data[i];
return null;
},
_setupDebugCamera: function() {
if (!v && c.renderType !== c.RENDER_TYPE_CANVAS) {
var t = new l();
v = t;
t.setStages([ "opaque" ]);
t.setFov(60 * Math.PI / 180);
t.setNear(.1);
t.setFar(4096);
t.dirty = !0;
t.cullingMask = 1 << cc.Node.BuiltinGroupIndex.DEBUG;
t.setPriority(cc.macro.MAX_ZINDEX);
t.setClearFlags(0);
t.setColor(0, 0, 0, 0);
var e = new cc.Node();
t.setNode(e);
g();
cc.view.on("design-resolution-changed", g);
a.scene.addCamera(t);
}
}
},
_updateCameraMask: function() {
if (this._camera) {
var t = this._cullingMask & ~(1 << cc.Node.BuiltinGroupIndex.DEBUG);
this._camera.cullingMask = t;
}
},
_updateBackgroundColor: function() {
if (this._camera) {
var t = this._backgroundColor;
this._camera.setColor(t.r / 255, t.g / 255, t.b / 255, t.a / 255);
}
},
_updateTargetTexture: function() {
if (this._camera) {
var t = this._targetTexture;
this._camera.setFrameBuffer(t ? t._framebuffer : null);
}
},
_updateClippingpPlanes: function() {
if (this._camera) {
this._camera.setNear(this._nearClip);
this._camera.setFar(this._farClip);
}
},
_updateProjection: function() {
if (this._camera) {
var t = this._ortho ? 1 : 0;
this._camera.setType(t);
}
},
_updateRect: function() {
if (this._camera) {
var t = this._rect;
this._camera.setRect(t.x, t.y, t.width, t.height);
}
},
_updateStages: function() {
var t = this._renderStages, e = [];
t & y.OPAQUE && e.push("opaque");
t & y.TRANSPARENT && e.push("transparent");
this._camera.setStages(e);
},
_init: function() {
if (!this._inited) {
this._inited = !0;
var t = this._camera;
if (t) {
t.setNode(this.node);
t.setClearFlags(this._clearFlags);
t.setPriority(this._depth);
this._updateBackgroundColor();
this._updateCameraMask();
this._updateTargetTexture();
this._updateClippingpPlanes();
this._updateProjection();
this._updateStages();
this._updateRect();
this.beforeDraw();
}
}
},
onLoad: function() {
this._init();
},
onEnable: function() {
if (c.renderType !== c.RENDER_TYPE_CANVAS) {
cc.director.on(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
a.scene.addCamera(this._camera);
}
p.push(this);
},
onDisable: function() {
if (c.renderType !== c.RENDER_TYPE_CANVAS) {
cc.director.off(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
a.scene.removeCamera(this._camera);
}
cc.js.array.remove(p, this);
},
getScreenToWorldMatrix2D: function(t) {
this.getWorldToScreenMatrix2D(t);
n.Mat4.invert(t, t);
return t;
},
getWorldToScreenMatrix2D: function(t) {
this.node.getWorldRT(u);
var e = this.zoomRatio, i = u.m;
i[0] *= e;
i[1] *= e;
i[4] *= e;
i[5] *= e;
var r = i[12], s = i[13], a = cc.visibleRect.center;
i[12] = a.x - (i[0] * r + i[4] * s);
i[13] = a.y - (i[1] * r + i[5] * s);
t !== u && n.Mat4.copy(t, u);
return t;
},
getScreenToWorldPoint: function(t, e) {
if (this.node.is3DNode) {
e = e || new cc.Vec3();
this._camera.screenToWorld(e, t, cc.visibleRect.width, cc.visibleRect.height);
} else {
e = e || new cc.Vec2();
this.getScreenToWorldMatrix2D(u);
n.Vec2.transformMat4(e, t, u);
}
return e;
},
getWorldToScreenPoint: function(t, e) {
if (this.node.is3DNode) {
e = e || new cc.Vec3();
this._camera.worldToScreen(e, t, cc.visibleRect.width, cc.visibleRect.height);
} else {
e = e || new cc.Vec2();
this.getWorldToScreenMatrix2D(u);
n.Vec2.transformMat4(e, t, u);
}
return e;
},
getRay: function(t) {
if (!cc.geomUtils) return t;
n.Vec3.set(d, t.x, t.y, 1);
this._camera.screenToWorld(_, d, cc.visibleRect.width, cc.visibleRect.height);
if (this.ortho) {
n.Vec3.set(d, t.x, t.y, -1);
this._camera.screenToWorld(f, d, cc.visibleRect.width, cc.visibleRect.height);
} else this.node.getWorldPosition(f);
return r.Ray.fromPoints(new r.Ray(), f, _);
},
containsNode: function(t) {
return t._cullingMask & this.cullingMask;
},
render: function(t) {
if (!(t = t || cc.director.getScene())) return null;
this.node.getWorldMatrix(u);
this.beforeDraw();
o.render(t);
0;
},
_onAlignWithScreen: function() {
var t = cc.game.canvas.height / cc.view._scaleY;
this._targetTexture && (t = cc.visibleRect.height);
var e = this._fov * cc.macro.RAD;
this.node.z = t / (2 * Math.tan(e / 2));
e = 2 * Math.atan(Math.tan(e / 2) / this.zoomRatio);
this._camera.setFov(e);
this._camera.setOrthoHeight(t / 2 / this.zoomRatio);
this.node.setRotation(0, 0, 0, 1);
},
beforeDraw: function() {
if (this._camera) {
if (this._alignWithScreen) this._onAlignWithScreen(); else {
var t = this._fov * cc.macro.RAD;
t = 2 * Math.atan(Math.tan(t / 2) / this.zoomRatio);
this._camera.setFov(t);
this._camera.setOrthoHeight(this._orthoSize / this.zoomRatio);
}
this._camera.dirty = !0;
}
}
});
cc.js.mixin(E.prototype, {
getNodeToCameraTransform: function(t) {
var e = s.identity();
t.getWorldMatrix(h);
if (this.containsNode(t)) {
this.getWorldToCameraMatrix(u);
n.Mat4.mul(h, h, u);
}
s.fromMat4(e, h);
return e;
},
getCameraToWorldPoint: function(t, e) {
return this.getScreenToWorldPoint(t, e);
},
getWorldToCameraPoint: function(t, e) {
return this.getWorldToScreenPoint(t, e);
},
getCameraToWorldMatrix: function(t) {
return this.getScreenToWorldMatrix2D(t);
},
getWorldToCameraMatrix: function(t) {
return this.getWorldToScreenMatrix2D(t);
}
});
e.exports = cc.Camera = E;
}), {
"../../renderer/scene/camera": void 0,
"../CCGame": 5,
"../geom-utils": void 0,
"../renderer/index": 123,
"../renderer/render-flow": 124,
"../utils/affine-transform": 146,
"../value-types": 168
} ],
39: [ (function(t, e, i) {
"use strict";
t("./platform/CCClass");
var n = t("./platform/CCObject").Flags, r = t("./platform/js").array, s = n.IsStartCalled, a = n.IsOnEnableCalled;
n.IsEditorOnEnableCalled;
function o(t, e) {
for (var i = e.constructor._executionOrder, n = e._id, r = 0, s = t.length - 1, a = s >>> 1; r <= s; a = r + s >>> 1) {
var o = t[a], c = o.constructor._executionOrder;
if (c > i) s = a - 1; else if (c < i) r = a + 1; else {
var l = o._id;
if (l > n) s = a - 1; else {
if (!(l < n)) return a;
r = a + 1;
}
}
}
return ~r;
}
function c(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var r = i[n];
if (r._enabled && r.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (r._objFlags &= ~e);
}
}
}
var l = cc.Class({
__ctor__: function(t) {
var e = r.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
0;
this._invoke = t;
},
statics: {
stableRemoveInactive: c
},
add: null,
remove: null,
invoke: null
});
function u(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
var h = cc.Class({
extends: l,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
c(this._zero, t);
c(this._neg, t);
c(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(u);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(u);
this._invoke(e);
e.array.length = 0;
}
}
}), f = cc.Class({
extends: l,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = o(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = o(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
});
function _(t, e, i, n) {
var r = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + t + "}";
n = e ? Function("it", "dt", r) : Function("it", r);
t = Function("c", "dt", t);
return function(e, r) {
try {
n(e, r);
} catch (n) {
cc._throw(n);
var s = e.array;
i && (s[e.i]._objFlags |= i);
++e.i;
for (;e.i < s.length; ++e.i) try {
t(s[e.i], r);
} catch (t) {
cc._throw(t);
i && (s[e.i]._objFlags |= i);
}
}
};
}
var d = _("c.start();c._objFlags|=" + s, !1, s), p = _("c.update(dt)", !0), v = _("c.lateUpdate(dt)", !0);
function g() {
this.startInvoker = new h(d);
this.updateInvoker = new f(p);
this.lateUpdateInvoker = new f(v);
this.scheduleInNextFrame = [];
this._updating = !1;
}
var m = cc.Class({
ctor: g,
unscheduleAll: g,
statics: {
LifeCycleInvoker: l,
OneOffInvoker: h,
createInvokeImpl: _,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= a;
this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~a;
var e = this.scheduleInNextFrame.indexOf(t);
if (e >= 0) r.fastRemoveAt(this.scheduleInNextFrame, e); else {
!t.start || t._objFlags & s || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & a)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & a) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
!t.start || t._objFlags & s || this.startInvoker.add(t);
t.update && this.updateInvoker.add(t);
t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
var n = t[e];
this._scheduleImmediate(n);
}
t.length = 0;
},
_earlyStartForNewComps: function() {
if (this.scheduleInNextFrame.length > 0) {
this._deferredSchedule();
this.startInvoker.invoke();
}
},
startPhase: function() {
this._updating = !0;
this.scheduleInNextFrame.length > 0 && this._deferredSchedule();
this.startInvoker.invoke();
this._earlyStartForNewComps();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
},
clearup: function() {
this._earlyStartForNewComps();
}
});
e.exports = m;
}), {
"./platform/CCClass": 92,
"./platform/CCObject": 98,
"./platform/js": 112,
"./utils/misc": 153
} ],
40: [ (function(t, e, i) {
"use strict";
var n = t("../utils/misc"), r = t("./CCComponent"), s = t("../assets/CCAudioClip"), a = cc.Class({
name: "cc.AudioSource",
extends: r,
editor: !1,
ctor: function() {
this.audio = new cc.Audio();
},
properties: {
_clip: {
default: null,
type: s
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
isPlaying: {
get: function() {
return this.audio.getState() === cc.Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(t) {
if ("string" != typeof t) {
if (t !== this._clip) {
this._clip = t;
this.audio.stop();
this.preload && (this.audio.src = this._clip);
}
} else {
cc.warnID(8401, "cc.AudioSource", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
var e = this;
s._loadByUrl(t, (function(t, i) {
i && (e.clip = i);
}));
}
},
type: s,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = n.clamp01(t);
this._volume = t;
this._mute || this.audio.setVolume(t);
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_ensureDataLoaded: function() {
this.audio.src !== this._clip && (this.audio.src = this._clip);
},
_pausedCallback: function() {
if (this.audio.getState() === cc.Audio.State.PLAYING) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
},
onLoad: function() {
this.audio.setVolume(this._mute ? 0 : this._volume);
this.audio.setLoop(this._loop);
},
onEnable: function() {
this.preload && (this.audio.src = this._clip);
this.playOnLoad && this.play();
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.stop();
this.audio.destroy();
cc.audioEngine.uncache(this._clip);
},
play: function() {
if (this._clip) {
var t = this.audio;
this._clip.loaded && t.stop();
this._ensureDataLoaded();
t.setCurrentTime(0);
t.play();
}
},
stop: function() {
this.audio.stop();
},
pause: function() {
this.audio.pause();
},
resume: function() {
this._ensureDataLoaded();
this.audio.resume();
},
rewind: function() {
this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
return this.audio.getCurrentTime();
},
setCurrentTime: function(t) {
this.audio.setCurrentTime(t);
return t;
},
getDuration: function() {
return this.audio.getDuration();
}
});
cc.AudioSource = e.exports = a;
}), {
"../assets/CCAudioClip": 11,
"../utils/misc": 153,
"./CCComponent": 44
} ],
41: [ (function(t, e, i) {
"use strict";
var n = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ];
function r(t) {
t.stopPropagation();
}
var s = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block_input_events"
},
onEnable: function() {
for (var t = 0; t < n.length; t++) this.node.on(n[t], r, this);
},
onDisable: function() {
for (var t = 0; t < n.length; t++) this.node.off(n[t], r, this);
}
});
cc.BlockInputEvents = e.exports = s;
}), {
"./CCComponent": 44
} ],
42: [ (function(t, e, i) {
"use strict";
var n = t("./CCComponent"), r = t("../utils/gray-sprite-state"), s = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), a = cc.Enum({
NORMAL: 0,
HOVER: 1,
PRESSED: 2,
DISABLED: 3
}), o = cc.Class({
name: "cc.Button",
extends: n,
mixins: [ r ],
ctor: function() {
this._pressed = !1;
this._hovered = !1;
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = cc.Vec2.ZERO;
this._toScale = cc.Vec2.ZERO;
this._originalScale = null;
this._graySpriteMaterial = null;
this._spriteMaterial = null;
this._sprite = null;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function() {
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState();
}
},
transition: {
default: s.NONE,
tooltip: !1,
type: s,
animatable: !1,
notify: function(t) {
this._updateTransition(t);
},
formerlySerializedAs: "transition"
},
normalColor: {
default: cc.Color.WHITE,
displayName: "Normal",
tooltip: !1,
notify: function() {
this.transition === s.Color && this._getButtonState() === a.NORMAL && (this._getTarget().opacity = this.normalColor.a);
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1,
notify: function() {
this.transition === s.Color && this._getButtonState() === a.PRESSED && (this._getTarget().opacity = this.pressedColor.a);
this._updateState();
},
formerlySerializedAs: "pressedColor"
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1,
notify: function() {
this.transition === s.Color && this._getButtonState() === a.HOVER && (this._getTarget().opacity = this.hoverColor.a);
this._updateState();
},
formerlySerializedAs: "hoverColor"
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this.transition === s.Color && this._getButtonState() === a.DISABLED && (this._getTarget().opacity = this.disabledColor.a);
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function(t) {
this._applyTarget();
t && this.target !== t && this._unregisterTargetEvent(t);
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: s
},
__preload: function() {
this._applyTarget();
this._resetState();
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
var t = this._getTarget(), e = this.transition, i = this._originalScale;
e === s.COLOR && this.interactable ? this._setTargetColor(this.normalColor) : e === s.SCALE && i && t.setScale(i.x, i.y);
this._transitionFinished = !0;
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerNodeEvent();
},
onDisable: function() {
this._resetState();
this._unregisterNodeEvent();
},
_getTarget: function() {
return this.target ? this.target : this.node;
},
_onTargetSpriteFrameChanged: function(t) {
this.transition === s.SPRITE && this._setCurrentStateSprite(t.spriteFrame);
},
_onTargetColorChanged: function(t) {
this.transition === s.COLOR && this._setCurrentStateColor(t);
},
_onTargetScaleChanged: function() {
var t = this._getTarget();
if (this._originalScale && (this.transition !== s.SCALE || this._transitionFinished)) {
this._originalScale.x = t.scaleX;
this._originalScale.y = t.scaleY;
}
},
_setTargetColor: function(t) {
var e = this._getTarget();
e.color = t;
e.opacity = t.a;
},
_getStateColor: function(t) {
switch (t) {
case a.NORMAL:
return this.normalColor;

case a.HOVER:
return this.hoverColor;

case a.PRESSED:
return this.pressedColor;

case a.DISABLED:
return this.disabledColor;
}
},
_getStateSprite: function(t) {
switch (t) {
case a.NORMAL:
return this.normalSprite;

case a.HOVER:
return this.hoverSprite;

case a.PRESSED:
return this.pressedSprite;

case a.DISABLED:
return this.disabledSprite;
}
},
_setCurrentStateColor: function(t) {
switch (this._getButtonState()) {
case a.NORMAL:
this.normalColor = t;
break;

case a.HOVER:
this.hoverColor = t;
break;

case a.PRESSED:
this.pressedColor = t;
break;

case a.DISABLED:
this.disabledColor = t;
}
},
_setCurrentStateSprite: function(t) {
switch (this._getButtonState()) {
case a.NORMAL:
this.normalSprite = t;
break;

case a.HOVER:
this.hoverSprite = t;
break;

case a.PRESSED:
this.pressedSprite = t;
break;

case a.DISABLED:
this.disabledSprite = t;
}
},
update: function(t) {
var e = this._getTarget();
if (!this._transitionFinished && (this.transition === s.COLOR || this.transition === s.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
i >= 1 && (i = 1);
if (this.transition === s.COLOR) {
var n = this._fromColor.lerp(this._toColor, i);
this._setTargetColor(n);
} else this.transition === s.SCALE && this._originalScale && (e.scale = this._fromScale.lerp(this._toScale, i));
1 === i && (this._transitionFinished = !0);
}
},
_registerNodeEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_unregisterNodeEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_registerTargetEvent: function(t) {
0;
t.on(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
},
_unregisterTargetEvent: function(t) {
0;
t.off(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
var t = this._getTarget();
this._sprite = this._getTargetSprite(t);
this._originalScale || (this._originalScale = cc.Vec2.ZERO);
this._originalScale.x = t.scaleX;
this._originalScale.y = t.scaleY;
this._registerTargetEvent(t);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation()), n = this._getTarget(), r = this._originalScale;
if (this.transition === s.SCALE && r) if (i) {
this._fromScale.x = r.x;
this._fromScale.y = r.y;
this._toScale.x = r.x * this.zoomScale;
this._toScale.y = r.y * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
n.setScale(r.x, r.y);
} else {
var o;
o = i ? a.PRESSED : a.NORMAL;
this._applyTransition(o);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== s.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
_getButtonState: function() {
return this.interactable ? this._pressed ? a.PRESSED : this._hovered ? a.HOVER : a.NORMAL : a.DISABLED;
},
_updateColorTransitionImmediately: function(t) {
var e = this._getStateColor(t);
this._setTargetColor(e);
this._fromColor = e.clone();
this._toColor = e;
},
_updateColorTransition: function(t) {
if (t === a.DISABLED) this._updateColorTransitionImmediately(t); else {
var e = this._getTarget(), i = this._getStateColor(t);
this._fromColor = e.color.clone();
this._toColor = i;
this.time = 0;
this._transitionFinished = !1;
}
},
_updateSpriteTransition: function(t) {
var e = this._getStateSprite(t);
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
t === a.PRESSED ? this._zoomUp() : this._zoomBack();
},
_zoomUp: function() {
if (this._originalScale) {
this._fromScale.x = this._originalScale.x;
this._fromScale.y = this._originalScale.y;
this._toScale.x = this._originalScale.x * this.zoomScale;
this._toScale.y = this._originalScale.y * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
}
},
_zoomBack: function() {
if (this._originalScale) {
var t = this._getTarget();
this._fromScale.x = t.scaleX;
this._fromScale.y = t.scaleY;
this._toScale.x = this._originalScale.x;
this._toScale.y = this._originalScale.y;
this.time = 0;
this._transitionFinished = !1;
}
},
_updateTransition: function(t) {
t === s.COLOR ? this._updateColorTransitionImmediately(a.NORMAL) : t === s.SPRITE && this._updateSpriteTransition(a.NORMAL);
this._updateState();
},
_applyTransition: function(t) {
var e = this.transition;
e === s.COLOR ? this._updateColorTransition(t) : e === s.SPRITE ? this._updateSpriteTransition(t) : e === s.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function() {
if (this._sprite) {
var t = !1;
this.enableAutoGrayEffect && (this.transition === s.SPRITE && this.disabledSprite || this.interactable || (t = !0));
this._switchGrayMaterial(t, this._sprite);
}
}
});
cc.Button = e.exports = o;
}), {
"../utils/gray-sprite-state": 151,
"./CCComponent": 44
} ],
43: [ (function(t, e, i) {
"use strict";
var n = t("../camera/CCCamera"), r = t("./CCComponent");
var s = cc.Class({
name: "cc.Canvas",
extends: r,
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
_fitDesignResolution: !1,
__preload: function() {
if (s.instance) return cc.warnID(6700, this.node.name, s.instance.node.name);
s.instance = this;
this.applySettings();
var t = this.getComponent(cc.Widget);
t && t.updateAlignment();
0;
var e = cc.find("Main Camera", this.node);
if (!e) {
(e = new cc.Node("Main Camera")).parent = this.node;
e.setSiblingIndex(0);
}
var i = e.getComponent(n);
if (!i) {
i = e.addComponent(n);
var r = n.ClearFlags;
i.clearFlags = r.COLOR | r.DEPTH | r.STENCIL;
i.depth = -1;
}
n.main = i;
},
onDestroy: function() {
0;
s.instance === this && (s.instance = null);
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = s;
}), {
"../camera/CCCamera": 38,
"./CCComponent": 44
} ],
44: [ (function(t, e, i) {
"use strict";
var n = t("../platform/CCObject"), r = t("../platform/js"), s = new (t("../platform/id-generater"))("Comp"), a = (n.Flags.IsOnEnableCalled, 
n.Flags.IsOnLoadCalled), o = !!cc.ActionManager, c = cc.Class({
name: "cc.Component",
extends: n,
ctor: function() {
this._id = s.getNewId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
uuid: {
get: function() {
return this._id;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1,
animatable: !0
},
enabledInHierarchy: {
get: function() {
return this._enabled && this.node._activeInHierarchy;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & a;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
o && cc.director.getActionManager().removeAllActionsFromTarget(this);
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = t.length - 1; e >= 0; --e) {
var i = t[e];
i && i.targetOff(this);
}
t.length = 0;
0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
e = e || 0;
cc.assertID(e >= 0, 1620);
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var r = cc.director.getScheduler(), s = r.isTargetPaused(this);
r.schedule(t, this, e, i, n, s);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
c._requireComponent = null;
c._executionOrder = 0;
0;
r.value(c, "_registerEditorProps", (function(t, e) {
var i = e.requireComponent;
i && (t._requireComponent = i);
var n = e.executionOrder;
n && "number" == typeof n && (t._executionOrder = n);
}));
c.prototype.__scriptUuid = "";
cc.Component = e.exports = c;
}), {
"../platform/CCObject": 98,
"../platform/id-generater": 108,
"../platform/js": 112
} ],
45: [ (function(t, e, i) {
"use strict";
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: "",
_componentId: "",
_componentName: {
get: function() {
this._genCompIdIfNeeded();
return this._compId2Name(this._componentId);
},
set: function(t) {
this._componentId = this._compName2Id(t);
}
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
var e;
if (arguments.length > 0) for (var i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (var r = 0, s = t.length; r < s; r++) {
var a = t[r];
a instanceof cc.Component.EventHandler && a.emit(e);
}
}
},
emit: function(t) {
var e = this.target;
if (cc.isValid(e)) {
this._genCompIdIfNeeded();
var i = cc.js._getClassById(this._componentId), n = e.getComponent(i);
if (cc.isValid(n)) {
var r = n[this.handler];
if ("function" == typeof r) {
null != this.customEventData && "" !== this.customEventData && (t = t.slice()).push(this.customEventData);
r.apply(n, t);
}
}
}
},
_compName2Id: function(t) {
var e = cc.js.getClassByName(t);
return cc.js._getClassId(e);
},
_compId2Name: function(t) {
var e = cc.js._getClassById(t);
return cc.js.getClassName(e);
},
_genCompIdIfNeeded: function() {
if (!this._componentId) {
this._componentName = this.component;
this.component = "";
}
}
});
}), {} ],
46: [ (function(t, e, i) {
"use strict";
var n = t("../platform/CCMacro"), r = t("./CCRenderComponent"), s = (t("../assets/material/CCMaterial"), 
t("../renderer/utils/label/label-frame")), a = n.TextAlignment, o = n.VerticalTextAlignment, c = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
}), l = cc.Enum({
NONE: 0,
BITMAP: 1,
CHAR: 2
}), u = cc.Class({
name: "cc.Label",
extends: r,
ctor: function() {
0;
this._actualFontSize = 0;
this._assemblerData = null;
this._frame = null;
this._ttfTexture = null;
this._letterTexture = null;
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? this._updateMaterial = this._updateMaterialCanvas : this._updateMaterial = this._updateMaterialWebgl;
},
editor: !1,
properties: {
_useOriginalSize: !0,
_string: {
default: "",
formerlySerializedAs: "_N$string"
},
string: {
get: function() {
return this._string;
},
set: function(t) {
var e = this._string;
this._string = "" + t;
this.string !== e && this.setVertsDirty();
this._checkStringEmpty();
},
multiline: !0,
tooltip: !1
},
horizontalAlign: {
default: a.LEFT,
type: a,
tooltip: !1,
notify: function(t) {
this.horizontalAlign !== t && this.setVertsDirty();
},
animatable: !1
},
verticalAlign: {
default: o.TOP,
type: o,
tooltip: !1,
notify: function(t) {
this.verticalAlign !== t && this.setVertsDirty();
},
animatable: !1
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
return this._actualFontSize;
},
tooltip: !1
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
if (this._fontSize !== t) {
this._fontSize = t;
this.setVertsDirty();
}
},
range: [ 0, 512 ],
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function(t) {
this.fontFamily !== t && this.setVertsDirty();
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
return this._lineHeight;
},
set: function(t) {
if (this._lineHeight !== t) {
this._lineHeight = t;
this.setVertsDirty();
}
},
tooltip: !1
},
overflow: {
default: c.NONE,
type: c,
tooltip: !1,
notify: function(t) {
this.overflow !== t && this.setVertsDirty();
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
return this._enableWrapText;
},
set: function(t) {
if (this._enableWrapText !== t) {
this._enableWrapText = t;
this.setVertsDirty();
}
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(t) {
if (this.font !== t) {
t || (this._isSystemFontUsed = !0);
0;
this._N$file = t;
t && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
"string" == typeof t && cc.warnID(4e3);
this.enabledInHierarchy && this._forceUpdateRenderData();
}
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
if (this._isSystemFontUsed !== t) {
this._isSystemFontUsed = !!t;
0;
if (t) {
this.font = null;
if (!this.enabledInHierarchy) return;
this._forceUpdateRenderData();
}
this.markForValidate();
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
get: function() {
return this._N$file instanceof cc.BitmapFont ? this._N$file.fontSize : -1;
},
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
this.setVertsDirty();
},
tooltip: !1
},
_batchAsBitmap: !1,
cacheMode: {
default: l.NONE,
type: l,
tooltip: !1,
notify: function(t) {
if (this.cacheMode !== t) {
t !== l.BITMAP || this.font instanceof cc.BitmapFont || this._frame && this._frame._resetDynamicAtlasFrame();
t === l.CHAR && (this._ttfTexture = null);
this.enabledInHierarchy && this._forceUpdateRenderData();
}
},
animatable: !1
},
_styleFlags: 0,
enableBold: {
get: function() {
return !!(1 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 1 : this._styleFlags &= -2;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
enableItalic: {
get: function() {
return !!(2 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 2 : this._styleFlags &= -3;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
enableUnderline: {
get: function() {
return !!(4 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 4 : this._styleFlags &= -5;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
_underlineHeight: 0,
underlineHeight: {
get: function() {
return this._underlineHeight;
},
set: function(t) {
if (this._underlineHeight !== t) {
this._underlineHeight = t;
this.setVertsDirty();
}
},
tooltip: !1
}
},
statics: {
HorizontalAlign: a,
VerticalAlign: o,
Overflow: c,
CacheMode: l,
_shareAtlas: null,
clearCharCache: function() {
u._shareAtlas && u._shareAtlas.clearAllCache();
}
},
onLoad: function() {
if (this._batchAsBitmap && this.cacheMode === l.NONE) {
this.cacheMode = l.BITMAP;
this._batchAsBitmap = !1;
}
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS && (this.cacheMode = l.NONE);
},
onEnable: function() {
this._super();
this.node.on(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
this._forceUpdateRenderData();
},
onDisable: function() {
this._super();
this.node.off(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
},
onDestroy: function() {
this._assembler && this._assembler._resetAssemblerData && this._assembler._resetAssemblerData(this._assemblerData);
this._assemblerData = null;
this._letterTexture = null;
if (this._ttfTexture) {
this._ttfTexture.destroy();
this._ttfTexture = null;
}
this._super();
},
_nodeSizeChanged: function() {
this.overflow !== c.NONE && this.setVertsDirty();
},
_updateColor: function() {
this.font instanceof cc.BitmapFont || this.setVertsDirty();
r.prototype._updateColor.call(this);
},
_validateRender: function() {
if (this.string) {
if (this._materials[0]) {
var t = this.font;
if (!(t instanceof cc.BitmapFont)) return;
var e = t.spriteFrame;
if (e && e.textureLoaded() && t._fntConfig) return;
}
this.disableRender();
} else this.disableRender();
},
_resetAssembler: function() {
this._frame = null;
r.prototype._resetAssembler.call(this);
},
_checkStringEmpty: function() {
this.markForRender(!!this.string);
},
_on3DNodeChanged: function() {
this._resetAssembler();
this._applyFontTexture();
},
_onBMFontTextureLoaded: function() {
this._frame._texture = this.font.spriteFrame._texture;
this.markForRender(!0);
this._updateMaterial();
this._assembler && this._assembler.updateRenderData(this);
},
_applyFontTexture: function() {
var t = this.font;
if (t instanceof cc.BitmapFont) {
var e = t.spriteFrame;
this._frame = e;
e && e.onTextureLoaded(this._onBMFontTextureLoaded, this);
} else {
this._frame || (this._frame = new s());
if (this.cacheMode === l.CHAR) {
this._letterTexture = this._assembler._getAssemblerData();
this._frame._refreshTexture(this._letterTexture);
} else if (!this._ttfTexture) {
this._ttfTexture = new cc.Texture2D();
this._assemblerData = this._assembler._getAssemblerData();
this._ttfTexture.initWithElement(this._assemblerData.canvas);
}
if (this.cacheMode !== l.CHAR) {
this._frame._resetDynamicAtlasFrame();
this._frame._refreshTexture(this._ttfTexture);
}
this._updateMaterial();
this._assembler && this._assembler.updateRenderData(this);
}
this.markForValidate();
},
_updateMaterialCanvas: function() {
this._frame && (this._frame._texture.url = this.uuid + "_texture");
},
_updateMaterialWebgl: function() {
if (this._frame) {
var t = this.getMaterial(0);
t && t.setProperty("texture", this._frame._texture);
}
},
_forceUpdateRenderData: function() {
this.setVertsDirty();
this._resetAssembler();
this._applyFontTexture();
},
_enableBold: function(t) {
0;
this.enableBold = !!t;
},
_enableItalics: function(t) {
0;
this.enableItalic = !!t;
},
_enableUnderline: function(t) {
0;
this.enableUnderline = !!t;
}
});
cc.Label = e.exports = u;
}), {
"../assets/material/CCMaterial": 28,
"../platform/CCMacro": 97,
"../renderer/utils/label/label-frame": 126,
"./CCRenderComponent": 48
} ],
47: [ (function(t, e, i) {
"use strict";
var n = t("../CCNode").EventType, r = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), s = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), a = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), c = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), l = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: s.NONE,
_N$layoutType: r.NONE,
type: {
type: r,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: s,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== r.NONE || t !== s.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: a.HORIZONTAL,
tooltip: !1,
type: a,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: o.TOP_TO_BOTTOM,
type: o,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: c.LEFT_TO_RIGHT,
type: c,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
affectedByScale: {
default: !1,
notify: function() {
this._doLayoutDirty();
},
animatable: !1,
tooltip: !1
}
},
statics: {
Type: r,
VerticalDirection: o,
HorizontalDirection: c,
ResizeMode: s,
AxisDirection: a
},
onEnable: function() {
this._addEventListeners();
this.node.getContentSize().equals(cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_doScaleDirty: function() {
this._layoutDirty = this._layoutDirty || this.affectedByScale;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.on(n.SIZE_CHANGED, this._resized, this);
this.node.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.on(n.CHILD_ADDED, this._childAdded, this);
this.node.on(n.CHILD_REMOVED, this._childRemoved, this);
this.node.on(n.CHILD_REORDER, this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.off(n.SIZE_CHANGED, this._resized, this);
this.node.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.off(n.CHILD_ADDED, this._childAdded, this);
this.node.off(n.CHILD_REMOVED, this._childRemoved, this);
this.node.off(n.CHILD_REORDER, this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var i = t[e];
i.on(n.SCALE_CHANGED, this._doScaleDirty, this);
i.on(n.SIZE_CHANGED, this._doLayoutDirty, this);
i.on(n.POSITION_CHANGED, this._doLayoutDirty, this);
i.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
i.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_removeChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var i = t[e];
i.off(n.SCALE_CHANGED, this._doScaleDirty, this);
i.off(n.SIZE_CHANGED, this._doLayoutDirty, this);
i.off(n.POSITION_CHANGED, this._doLayoutDirty, this);
i.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
i.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_childAdded: function(t) {
t.on(n.SCALE_CHANGED, this._doScaleDirty, this);
t.on(n.SIZE_CHANGED, this._doLayoutDirty, this);
t.on(n.POSITION_CHANGED, this._doLayoutDirty, this);
t.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
t.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
t.off(n.SCALE_CHANGED, this._doScaleDirty, this);
t.off(n.SIZE_CHANGED, this._doLayoutDirty, this);
t.off(n.POSITION_CHANGED, this._doLayoutDirty, this);
t.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
t.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, n) {
var a = this.node.getAnchorPoint(), l = this.node.children, u = 1, h = this.paddingLeft, f = -a.x * t;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
u = -1;
f = (1 - a.x) * t;
h = this.paddingRight;
}
for (var _ = f + u * h - u * this.spacingX, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, C = 0; C < l.length; ++C) {
(T = l[C]).activeInHierarchy && E++;
}
var A = this.cellSize.width;
this.type !== r.GRID && this.resizeMode === s.CHILDREN && (A = (t - (this.paddingLeft + this.paddingRight) - (E - 1) * this.spacingX) / E);
for (C = 0; C < l.length; ++C) {
var T = l[C], x = this._getUsedScaleValue(T.scaleX), S = this._getUsedScaleValue(T.scaleY);
if (T.activeInHierarchy) {
if (this._resize === s.CHILDREN) {
T.width = A / x;
this.type === r.GRID && (T.height = this.cellSize.height / S);
}
var b = T.anchorX, R = T.width * x, L = T.height * S;
v > p && (p = v);
if (L >= p) {
v = p;
p = L;
y = T.getAnchorPoint().y;
}
this.horizontalDirection === c.RIGHT_TO_LEFT && (b = 1 - T.anchorX);
_ = _ + u * b * R + u * this.spacingX;
var w = u * (1 - b) * R;
if (e) {
var I = _ + w + u * (u > 0 ? this.paddingRight : this.paddingLeft), O = this.horizontalDirection === c.LEFT_TO_RIGHT && I > (1 - a.x) * t, D = this.horizontalDirection === c.RIGHT_TO_LEFT && I < -a.x * t;
if (O || D) {
if (L >= p) {
0 === v && (v = p);
d += v;
v = p;
} else {
d += p;
v = L;
p = 0;
}
_ = f + u * (h + b * R);
g++;
}
}
var M = i(T, d, g);
t >= R + this.paddingLeft + this.paddingRight && n && T.setPosition(cc.v2(_, M));
var N, P = 1, F = 0 === p ? L : p;
if (this.verticalDirection === o.TOP_TO_BOTTOM) {
m = m || this.node._contentSize.height;
(N = M + (P = -1) * (F * y + this.paddingBottom)) < m && (m = N);
} else {
m = m || -this.node._contentSize.height;
(N = M + P * (F * y + this.paddingTop)) > m && (m = N);
}
_ += w;
}
}
return m;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === s.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
if (r.activeInHierarchy) {
i++;
e += r.height * this._getUsedScaleValue(r.scaleY);
}
}
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, n) {
var a = this.node.getAnchorPoint(), l = this.node.children, u = 1, h = this.paddingBottom, f = -a.y * t;
if (this.verticalDirection === o.TOP_TO_BOTTOM) {
u = -1;
f = (1 - a.y) * t;
h = this.paddingTop;
}
for (var _ = f + u * h - u * this.spacingY, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, C = 0; C < l.length; ++C) {
(T = l[C]).activeInHierarchy && E++;
}
var A = this.cellSize.height;
this.type !== r.GRID && this.resizeMode === s.CHILDREN && (A = (t - (this.paddingTop + this.paddingBottom) - (E - 1) * this.spacingY) / E);
for (C = 0; C < l.length; ++C) {
var T = l[C], x = this._getUsedScaleValue(T.scaleX), S = this._getUsedScaleValue(T.scaleY);
if (T.activeInHierarchy) {
if (this.resizeMode === s.CHILDREN) {
T.height = A / S;
this.type === r.GRID && (T.width = this.cellSize.width / x);
}
var b = T.anchorY, R = T.width * x, L = T.height * S;
v > p && (p = v);
if (R >= p) {
v = p;
p = R;
y = T.getAnchorPoint().x;
}
this.verticalDirection === o.TOP_TO_BOTTOM && (b = 1 - T.anchorY);
_ = _ + u * b * L + u * this.spacingY;
var w = u * (1 - b) * L;
if (e) {
var I = _ + w + u * (u > 0 ? this.paddingTop : this.paddingBottom), O = this.verticalDirection === o.BOTTOM_TO_TOP && I > (1 - a.y) * t, D = this.verticalDirection === o.TOP_TO_BOTTOM && I < -a.y * t;
if (O || D) {
if (R >= p) {
0 === v && (v = p);
d += v;
v = p;
} else {
d += p;
v = R;
p = 0;
}
_ = f + u * (h + b * L);
g++;
}
}
var M = i(T, d, g);
t >= L + (this.paddingTop + this.paddingBottom) && n && T.setPosition(cc.v2(M, _));
var N, P = 1, F = 0 === p ? R : p;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
P = -1;
m = m || this.node._contentSize.width;
(N = M + P * (F * y + this.paddingLeft)) < m && (m = N);
} else {
m = m || -this.node._contentSize.width;
(N = M + P * (F * y + this.paddingRight)) > m && (m = N);
}
_ += w;
}
}
return m;
},
_doLayoutBasic: function() {
for (var t = this.node.children, e = null, i = 0; i < t.length; ++i) {
var n = t[i];
n.activeInHierarchy && (e ? e.union(e, n.getBoundingBoxToWorld()) : e = n.getBoundingBoxToWorld());
}
if (e) {
var r = this.node.convertToNodeSpaceAR(cc.v2(e.x, e.y));
r = cc.v2(r.x - this.paddingLeft, r.y - this.paddingBottom);
var s = this.node.convertToNodeSpaceAR(cc.v2(e.xMax, e.yMax)), a = (s = cc.v2(s.x + this.paddingRight, s.y + this.paddingTop)).sub(r);
if (0 !== (a = cc.size(parseFloat(a.x.toFixed(2)), parseFloat(a.y.toFixed(2)))).width) {
var o = -r.x / a.width;
this.node.anchorX = parseFloat(o.toFixed(2));
}
if (0 !== a.height) {
var c = -r.y / a.height;
this.node.anchorY = parseFloat(c.toFixed(2));
}
this.node.setContentSize(a);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, r = -t.y * e.height, a = this.paddingBottom;
if (this.verticalDirection === o.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * e.height;
a = this.paddingTop;
}
var c = function(t, e, i) {
return r + n * (e + t.anchorY * t.height * this._getUsedScaleValue(t.scaleY) + a + i * this.spacingY);
}.bind(this), l = 0;
if (this.resizeMode === s.CONTAINER) {
var u = this._doLayoutHorizontally(i, !0, c, !1);
(l = r - u) < 0 && (l *= -1);
r = -t.y * l;
if (this.verticalDirection === o.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * l;
}
}
this._doLayoutHorizontally(i, !0, c, !0);
this.resizeMode === s.CONTAINER && this.node.setContentSize(i, l);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, r = -t.x * e.width, a = this.paddingLeft;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * e.width;
a = this.paddingRight;
}
var o = function(t, e, i) {
return r + n * (e + t.anchorX * t.width * this._getUsedScaleValue(t.scaleX) + a + i * this.spacingX);
}.bind(this), l = 0;
if (this.resizeMode === s.CONTAINER) {
var u = this._doLayoutVertically(i, !0, o, !1);
(l = r - u) < 0 && (l *= -1);
r = -t.x * l;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * l;
}
}
this._doLayoutVertically(i, !0, o, !0);
this.resizeMode === s.CONTAINER && this.node.setContentSize(l, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === a.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === a.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === s.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
if (r.activeInHierarchy) {
i++;
e += r.width * this._getUsedScaleValue(r.scaleX);
}
}
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === r.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children);
this._doLayoutHorizontally(t, !1, (function(t) {
return t.y;
}), !0);
this.node.width = t;
} else if (this.type === r.VERTICAL) {
var e = this._getVerticalBaseHeight(this.node.children);
this._doLayoutVertically(e, !1, (function(t) {
return t.x;
}), !0);
this.node.height = e;
} else this.type === r.NONE ? this.resizeMode === s.CONTAINER && this._doLayoutBasic() : this.type === r.GRID && this._doLayoutGrid();
},
_getUsedScaleValue: function(t) {
return this.affectedByScale ? Math.abs(t) : 1;
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
cc.Layout = e.exports = l;
}), {
"../CCNode": 6,
"./CCComponent": 44
} ],
48: [ (function(t, e, i) {
"use strict";
var n = s(t("../renderer/assembler")), r = s(t("../assets/material/material-variant"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
var a = t("./CCComponent"), o = t("../renderer/render-flow"), c = t("../assets/material/CCMaterial"), l = cc.Class({
name: "RenderComponent",
extends: a,
editor: !1,
properties: {
_materials: {
default: [],
type: c
},
materials: {
get: function() {
return this._materials;
},
set: function(t) {
this._materials = t;
this._activateMaterial();
},
type: [ c ],
displayName: "Materials",
animatable: !1
}
},
ctor: function() {
this._vertsDirty = !0;
this._assembler = null;
},
_resetAssembler: function() {
n.default.init(this);
this._updateColor();
this.setVertsDirty();
},
__preload: function() {
this._resetAssembler();
this._activateMaterial();
},
onEnable: function() {
this.node._renderComponent && (this.node._renderComponent.enabled = !1);
this.node._renderComponent = this;
this.node._renderFlag |= o.FLAG_OPACITY_COLOR;
this.setVertsDirty();
},
onDisable: function() {
this.node._renderComponent = null;
this.disableRender();
},
onDestroy: function() {
for (var t = this._materials, e = 0; e < t.length; e++) cc.pool.material.put(t[e]);
t.length = 0;
cc.pool.assembler.put(this._assembler);
},
setVertsDirty: function() {
this._vertsDirty = !0;
this.markForRender(!0);
},
_on3DNodeChanged: function() {
this._resetAssembler();
},
_validateRender: function() {},
markForValidate: function() {
cc.RenderFlow.registerValidate(this);
},
markForRender: function(t) {
var e = o.FLAG_RENDER | o.FLAG_UPDATE_RENDER_DATA;
if (t) {
this.node._renderFlag |= e;
this.markForValidate();
} else this.node._renderFlag &= ~e;
},
disableRender: function() {
this.node._renderFlag &= ~(o.FLAG_RENDER | o.FLAG_UPDATE_RENDER_DATA);
},
getMaterial: function(t) {
if (t < 0 || t >= this._materials.length) return null;
var e = this._materials[t];
if (!e) return null;
var i = r.default.create(e, this);
i !== e && this.setMaterial(t, i);
return i;
},
getMaterials: function() {
for (var t = this._materials, e = 0; e < t.length; e++) t[e] = r.default.create(t[e], this);
return t;
},
setMaterial: function(t, e) {
if (e !== this._materials[t]) {
e = r.default.create(e, this);
this._materials[t] = e;
}
this._updateMaterial();
this.markForRender(!0);
return e;
},
_getDefaultMaterial: function() {
return c.getBuiltinMaterial("2d-sprite");
},
_activateMaterial: function() {
var t = this._materials;
if (!t[0]) {
var e = this._getDefaultMaterial();
t[0] = e;
}
for (var i = 0; i < t.length; i++) t[i] = r.default.create(t[i], this);
this._updateMaterial();
},
_updateMaterial: function() {},
_updateColor: function() {
this._assembler.updateColor && this._assembler.updateColor(this);
},
_checkBacth: function(t, e) {
var i = this._materials[0];
if (i && i.getHash() !== t.material.getHash() || t.cullingMask !== e) {
t._flush();
t.node = i.getDefine("CC_USE_MODEL") ? this.node : t._dummyNode;
t.material = i;
t.cullingMask = e;
}
}
});
cc.RenderComponent = e.exports = l;
}), {
"../assets/material/CCMaterial": 28,
"../assets/material/material-variant": 35,
"../renderer/assembler": 120,
"../renderer/render-flow": 124,
"./CCComponent": 44
} ],
49: [ (function(t, e, i) {
"use strict";
var n = t("../utils/misc"), r = (t("../CCNode").EventType, t("./CCRenderComponent")), s = t("../utils/blend-func"), a = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3,
MESH: 4
}), o = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
RADIAL: 2
}), c = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), l = cc.Enum({
NORMAL: 0,
GRAY: 1
}), u = cc.Class({
name: "cc.Sprite",
extends: r,
mixins: [ s ],
editor: !1,
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: a.SIMPLE,
_sizeMode: c.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t, e) {
var i = this._spriteFrame;
if (i !== t) {
this._spriteFrame = t;
this._applySpriteFrame(i);
0;
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
if (this._type !== t) {
this._type = t;
this.setVertsDirty();
this._resetAssembler();
}
},
type: a,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
if (t !== this._fillType) {
this._fillType = t;
this.setVertsDirty();
this._resetAssembler();
}
},
type: o,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter.x = t.x;
this._fillCenter.y = t.y;
this._type === a.FILLED && this.setVertsDirty();
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = n.clampf(t, -1, 1);
this._type === a.FILLED && this.setVertsDirty();
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = n.clampf(t, -1, 1);
this._type === a.FILLED && this.setVertsDirty();
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._type !== a.SIMPLE && this._type !== a.MESH || this.setVertsDirty();
}
},
animatable: !1,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== c.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: c,
tooltip: !1
}
},
statics: {
FillType: o,
Type: a,
SizeMode: c,
State: l
},
setVisible: function(t) {
this.enabled = t;
},
setState: function() {},
getState: function() {},
onEnable: function() {
this._super();
this._applySpriteFrame();
this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
},
onDisable: function() {
this._super();
this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
},
_updateMaterial: function() {
var t = this._spriteFrame && this._spriteFrame.getTexture(), e = this.getMaterial(0);
e && e.setProperty("texture", t);
s.prototype._updateMaterial.call(this);
},
_applyAtlas: !1,
_validateRender: function() {
var t = this._spriteFrame;
this._materials[0] && t && t.textureLoaded() || this.disableRender();
},
_applySpriteSize: function() {
if (this._spriteFrame && this.isValid) {
if (c.RAW === this._sizeMode) {
var t = this._spriteFrame._originalSize;
this.node.setContentSize(t);
} else if (c.TRIMMED === this._sizeMode) {
var e = this._spriteFrame._rect;
this.node.setContentSize(e.width, e.height);
}
this.setVertsDirty();
}
},
_applySpriteFrame: function(t) {
var e = t && t.getTexture();
e && !e.loaded && t.off("load", this._applySpriteSize, this);
var i = this._spriteFrame;
if (i) {
this._updateMaterial();
var n = i.getTexture();
if (e === n && n && n.loaded) this._applySpriteSize(); else {
this.disableRender();
i.onTextureLoaded(this._applySpriteSize, this);
}
} else this.disableRender();
0;
}
});
0;
cc.Sprite = e.exports = u;
}), {
"../CCNode": 6,
"../utils/blend-func": 148,
"../utils/misc": 153,
"./CCRenderComponent": 48
} ],
50: [ (function(t, e, i) {
"use strict";
var n = t("../base-ui/CCWidgetManager"), r = n.AlignMode, s = n._AlignFlags, a = s.TOP, o = s.MID, c = s.BOT, l = s.LEFT, u = s.CENTER, h = s.RIGHT, f = a | c, _ = l | h, d = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
0;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
this._setAlign(a, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & o) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= o;
} else this._alignFlags &= ~o;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
this._setAlign(c, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
this._setAlign(l, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & u) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= u;
} else this._alignFlags &= ~u;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & h) > 0;
},
set: function(t) {
this._setAlign(h, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & _) === _;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & f) === f;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
alignMode: {
default: r.ON_WINDOW_RESIZE,
type: r,
tooltip: !1
},
_wasAlignOnce: {
default: void 0,
formerlySerializedAs: "isAlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
statics: {
AlignMode: r
},
onLoad: function() {
if (void 0 !== this._wasAlignOnce) {
this.alignMode = this._wasAlignOnce ? r.ONCE : r.ALWAYS;
this._wasAlignOnce = void 0;
}
},
onEnable: function() {
n.add(this);
},
onDisable: function() {
n.remove(this);
},
_validateTargetInDEV: !1,
_setAlign: function(t, e) {
if (e !== (this._alignFlags & t) > 0) {
var i = (t & _) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
if (this.isStretchWidth) {
this._originalWidth = this.node.width;
0;
}
} else {
this.isAlignVerticalCenter = !1;
if (this.isStretchHeight) {
this._originalHeight = this.node.height;
0;
}
}
0;
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
n.updateAlignment(this.node);
}
});
Object.defineProperty(d.prototype, "isAlignOnce", {
get: function() {
0;
return this.alignMode === r.ONCE;
},
set: function(t) {
0;
this.alignMode = t ? r.ONCE : r.ALWAYS;
}
});
cc.Widget = e.exports = d;
}), {
"../base-ui/CCWidgetManager": 37,
"./CCComponent": 44
} ],
51: [ (function(t, e, i) {
"use strict";
var n = t("../../platform/CCMacro"), r = t("../editbox/EditBoxImplBase"), s = t("../CCLabel"), a = t("./types"), o = a.InputMode, c = a.InputFlag, l = a.KeyboardReturnType;
function u(t) {
return t.replace(/(?:^|\s)\S/g, (function(t) {
return t.toUpperCase();
}));
}
function h(t) {
return t.charAt(0).toUpperCase() + t.slice(1);
}
var f = cc.Class({
name: "cc.EditBox",
extends: cc.Component,
editor: !1,
properties: {
_useOriginalSize: !0,
_string: "",
string: {
tooltip: !1,
get: function() {
return this._string;
},
set: function(t) {
t = "" + t;
this.maxLength >= 0 && t.length >= this.maxLength && (t = t.slice(0, this.maxLength));
this._string = t;
this._updateString(t);
}
},
textLabel: {
tooltip: !1,
default: null,
type: s,
notify: function(t) {
if (this.textLabel && this.textLabel !== t) {
this._updateTextLabel();
this._updateLabels();
}
}
},
placeholderLabel: {
tooltip: !1,
default: null,
type: s,
notify: function(t) {
if (this.placeholderLabel && this.placeholderLabel !== t) {
this._updatePlaceholderLabel();
this._updateLabels();
}
}
},
background: {
tooltip: !1,
default: null,
type: cc.Sprite,
notify: function(t) {
this.background && this.background !== t && this._updateBackgroundSprite();
}
},
_N$backgroundImage: {
default: void 0,
type: cc.SpriteFrame
},
backgroundImage: {
get: function() {
return this.background ? this.background.spriteFrame : null;
},
set: function(t) {
this.background && (this.background.spriteFrame = t);
}
},
returnType: {
default: l.DEFAULT,
tooltip: !1,
displayName: "KeyboardReturnType",
type: l
},
_N$returnType: {
default: void 0,
type: cc.Float
},
inputFlag: {
tooltip: !1,
default: c.DEFAULT,
type: c,
notify: function() {
this._updateString(this._string);
}
},
inputMode: {
tooltip: !1,
default: o.ANY,
type: o,
notify: function(t) {
if (this.inputMode !== t) {
this._updateTextLabel();
this._updatePlaceholderLabel();
}
}
},
fontSize: {
get: function() {
return this.textLabel ? this.textLabel.fontSize : 0;
},
set: function(t) {
this.textLabel && (this.textLabel.fontSize = t);
}
},
_N$fontSize: {
default: void 0,
type: cc.Float
},
lineHeight: {
get: function() {
return this.textLabel ? this.textLabel.lineHeight : 0;
},
set: function(t) {
this.textLabel && (this.textLabel.lineHeight = t);
}
},
_N$lineHeight: {
default: void 0,
type: cc.Float
},
fontColor: {
get: function() {
return this.textLabel ? this.textLabel.node.color : cc.Color.BLACK;
},
set: function(t) {
if (this.textLabel) {
this.textLabel.node.color = t;
this.textLabel.node.opacity = t.a;
}
}
},
_N$fontColor: void 0,
placeholder: {
tooltip: !1,
get: function() {
return this.placeholderLabel ? this.placeholderLabel.string : "";
},
set: function(t) {
this.placeholderLabel && (this.placeholderLabel.string = t);
}
},
_N$placeholder: {
default: void 0,
type: cc.String
},
placeholderFontSize: {
get: function() {
return this.placeholderLabel ? this.placeholderLabel.fontSize : 0;
},
set: function(t) {
this.placeholderLabel && (this.placeholderLabel.fontSize = t);
}
},
_N$placeholderFontSize: {
default: void 0,
type: cc.Float
},
placeholderFontColor: {
get: function() {
return this.placeholderLabel ? this.placeholderLabel.node.color : cc.Color.BLACK;
},
set: function(t) {
if (this.placeholderLabel) {
this.placeholderLabel.node.color = t;
this.placeholderLabel.node.opacity = t.a;
}
}
},
_N$placeholderFontColor: void 0,
maxLength: {
tooltip: !1,
default: 20
},
_N$maxLength: {
default: void 0,
type: cc.Float
},
stayOnTop: {
default: !1,
notify: function() {
cc.warn("editBox.stayOnTop is removed since v2.1.");
}
},
_tabIndex: 0,
tabIndex: {
tooltip: !1,
get: function() {
return this._tabIndex;
},
set: function(t) {
if (this._tabIndex !== t) {
this._tabIndex = t;
this._impl && this._impl.setTabIndex(t);
}
}
},
editingDidBegan: {
default: [],
type: cc.Component.EventHandler
},
textChanged: {
default: [],
type: cc.Component.EventHandler
},
editingDidEnded: {
default: [],
type: cc.Component.EventHandler
},
editingReturn: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
_ImplClass: r,
KeyboardReturnType: l,
InputFlag: c,
InputMode: o
},
_init: function() {
this._upgradeComp();
this._isLabelVisible = !0;
this.node.on(cc.Node.EventType.SIZE_CHANGED, this._syncSize, this);
(this._impl = new f._ImplClass()).init(this);
this._updateString(this._string);
this._syncSize();
},
_updateBackgroundSprite: function() {
var t = this.background;
if (!t) {
var e = this.node.getChildByName("BACKGROUND_SPRITE");
e || (e = new cc.Node("BACKGROUND_SPRITE"));
(t = e.getComponent(cc.Sprite)) || (t = e.addComponent(cc.Sprite));
e.parent = this.node;
this.background = t;
}
t.type = cc.Sprite.Type.SLICED;
if (void 0 !== this._N$backgroundImage) {
t.spriteFrame = this._N$backgroundImage;
this._N$backgroundImage = void 0;
}
},
_updateTextLabel: function() {
var t = this.textLabel;
if (!t) {
var e = this.node.getChildByName("TEXT_LABEL");
e || (e = new cc.Node("TEXT_LABEL"));
(t = e.getComponent(s)) || (t = e.addComponent(s));
e.parent = this.node;
this.textLabel = t;
}
t.node.setAnchorPoint(0, 1);
t.overflow = s.Overflow.CLAMP;
if (this.inputMode === o.ANY) {
t.verticalAlign = n.VerticalTextAlignment.TOP;
t.enableWrapText = !0;
} else {
t.verticalAlign = n.VerticalTextAlignment.CENTER;
t.enableWrapText = !1;
}
t.string = this._updateLabelStringStyle(this._string);
if (void 0 !== this._N$fontColor) {
t.node.color = this._N$fontColor;
t.node.opacity = this._N$fontColor.a;
this._N$fontColor = void 0;
}
if (void 0 !== this._N$fontSize) {
t.fontSize = this._N$fontSize;
this._N$fontSize = void 0;
}
if (void 0 !== this._N$lineHeight) {
t.lineHeight = this._N$lineHeight;
this._N$lineHeight = void 0;
}
},
_updatePlaceholderLabel: function() {
var t = this.placeholderLabel;
if (!t) {
var e = this.node.getChildByName("PLACEHOLDER_LABEL");
e || (e = new cc.Node("PLACEHOLDER_LABEL"));
(t = e.getComponent(s)) || (t = e.addComponent(s));
e.parent = this.node;
this.placeholderLabel = t;
}
t.node.setAnchorPoint(0, 1);
t.overflow = s.Overflow.CLAMP;
if (this.inputMode === o.ANY) {
t.verticalAlign = n.VerticalTextAlignment.TOP;
t.enableWrapText = !0;
} else {
t.verticalAlign = n.VerticalTextAlignment.CENTER;
t.enableWrapText = !1;
}
t.string = this.placeholder;
if (void 0 !== this._N$placeholderFontColor) {
t.node.color = this._N$placeholderFontColor;
t.node.opacity = this._N$placeholderFontColor.a;
this._N$placeholderFontColor = void 0;
}
if (void 0 !== this._N$placeholderFontSize) {
t.fontSize = this._N$placeholderFontSize;
this._N$placeholderFontSize = void 0;
}
},
_upgradeComp: function() {
if (void 0 !== this._N$returnType) {
this.returnType = this._N$returnType;
this._N$returnType = void 0;
}
if (void 0 !== this._N$maxLength) {
this.maxLength = this._N$maxLength;
this._N$maxLength = void 0;
}
void 0 !== this._N$backgroundImage && this._updateBackgroundSprite();
void 0 === this._N$fontColor && void 0 === this._N$fontSize && void 0 === this._N$lineHeight || this._updateTextLabel();
void 0 === this._N$placeholderFontColor && void 0 === this._N$placeholderFontSize || this._updatePlaceholderLabel();
if (void 0 !== this._N$placeholder) {
this.placeholder = this._N$placeholder;
this._N$placeholder = void 0;
}
},
_syncSize: function() {
if (this._impl) {
var t = this.node.getContentSize();
this._impl.setSize(t.width, t.height);
}
},
_showLabels: function() {
this._isLabelVisible = !0;
this._updateLabels();
},
_hideLabels: function() {
this._isLabelVisible = !1;
this.textLabel && (this.textLabel.node.active = !1);
this.placeholderLabel && (this.placeholderLabel.node.active = !1);
},
_updateLabels: function() {
if (this._isLabelVisible) {
var t = this._string;
this.textLabel && (this.textLabel.node.active = "" !== t);
this.placeholderLabel && (this.placeholderLabel.node.active = "" === t);
}
},
_updateString: function(t) {
var e = this.textLabel;
if (e) {
var i = t;
i && (i = this._updateLabelStringStyle(i));
e.string = i;
this._updateLabels();
}
},
_updateLabelStringStyle: function(t, e) {
var i = this.inputFlag;
if (e || i !== c.PASSWORD) i === c.INITIAL_CAPS_ALL_CHARACTERS ? t = t.toUpperCase() : i === c.INITIAL_CAPS_WORD ? t = u(t) : i === c.INITIAL_CAPS_SENTENCE && (t = h(t)); else {
for (var n = "", r = t.length, s = 0; s < r; ++s) n += "●";
t = n;
}
return t;
},
editBoxEditingDidBegan: function() {
cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
this.node.emit("editing-did-began", this);
},
editBoxEditingDidEnded: function() {
cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
this.node.emit("editing-did-ended", this);
},
editBoxTextChanged: function(t) {
t = this._updateLabelStringStyle(t, !0);
this.string = t;
cc.Component.EventHandler.emitEvents(this.textChanged, t, this);
this.node.emit("text-changed", this);
},
editBoxEditingReturn: function() {
cc.Component.EventHandler.emitEvents(this.editingReturn, this);
this.node.emit("editing-return", this);
},
onEnable: function() {
this._registerEvent();
this._impl && this._impl.enable();
},
onDisable: function() {
this._unregisterEvent();
this._impl && this._impl.disable();
},
onDestroy: function() {
this._impl && this._impl.clear();
},
__preload: function() {
this._init();
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_unregisterEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_onTouchBegan: function(t) {
t.stopPropagation();
},
_onTouchCancel: function(t) {
t.stopPropagation();
},
_onTouchEnded: function(t) {
this._impl && this._impl.beginEditing();
t.stopPropagation();
},
setFocus: function() {
cc.errorID(1400, "setFocus()", "focus()");
this._impl && this._impl.setFocus(!0);
},
focus: function() {
this._impl && this._impl.setFocus(!0);
},
blur: function() {
this._impl && this._impl.setFocus(!1);
},
isFocused: function() {
return !!this._impl && this._impl.isFocused();
},
update: function() {
this._impl && this._impl.update();
}
});
cc.EditBox = e.exports = f;
cc.sys.isBrowser && t("./WebEditBoxImpl");
}), {
"../../platform/CCMacro": 97,
"../CCLabel": 46,
"../editbox/EditBoxImplBase": 52,
"./WebEditBoxImpl": 53,
"./types": 55
} ],
52: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
ctor: function() {
this._delegate = null;
this._editing = !1;
},
init: function(t) {},
enable: function() {},
disable: function() {
this._editing && this.endEditing();
},
clear: function() {},
update: function() {},
setTabIndex: function(t) {},
setSize: function(t, e) {},
setFocus: function(t) {
t ? this.beginEditing() : this.endEditing();
},
isFocused: function() {
return this._editing;
},
beginEditing: function() {},
endEditing: function() {}
});
e.exports = n;
}), {} ],
53: [ (function(t, e, i) {
"use strict";
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../value-types/mat4"));
var r = t("../../platform/utils"), s = t("../../platform/CCMacro"), a = t("./types"), o = t("../CCLabel"), c = t("./tabIndexUtil"), l = cc.EditBox, u = cc.js, h = a.InputMode, f = a.InputFlag, _ = a.KeyboardReturnType, d = {
zoomInvalid: !1
};
cc.sys.OS_ANDROID !== cc.sys.os || cc.sys.browserType !== cc.sys.BROWSER_TYPE_SOUGOU && cc.sys.browserType !== cc.sys.BROWSER_TYPE_360 || (d.zoomInvalid = !0);
var p = 0, v = cc.v3(), g = null, m = !1, y = !1, E = l._ImplClass;
function C() {
E.call(this);
this._domId = "EditBoxId_" + ++p;
this._placeholderStyleSheet = null;
this._elem = null;
this._isTextArea = !1;
this._worldMat = new n.default();
this._cameraMat = new n.default();
this._m00 = 0;
this._m01 = 0;
this._m04 = 0;
this._m05 = 0;
this._m12 = 0;
this._m13 = 0;
this._w = 0;
this._h = 0;
this._cacheViewportRect = cc.rect(0, 0, 0, 0);
this._inputMode = null;
this._inputFlag = null;
this._returnType = null;
this._eventListeners = {};
this._textLabelFont = null;
this._textLabelFontSize = null;
this._textLabelFontColor = null;
this._textLabelAlign = null;
this._placeholderLabelFont = null;
this._placeholderLabelFontSize = null;
this._placeholderLabelFontColor = null;
this._placeholderLabelAlign = null;
this._placeholderLineHeight = null;
}
u.extend(C, E);
l._ImplClass = C;
Object.assign(C.prototype, {
init: function(t) {
if (t) {
this._delegate = t;
t.inputMode === h.ANY ? this._createTextArea() : this._createInput();
c.add(this);
this.setTabIndex(t.tabIndex);
this._initStyleSheet();
this._registerEventListeners();
this._addDomToGameContainer();
m = cc.view.isAutoFullScreenEnabled();
y = cc.view._resizeWithBrowserSize;
}
},
clear: function() {
this._removeEventListeners();
this._removeDomFromGameContainer();
c.remove(this);
g === this && (g = null);
},
update: function() {},
setTabIndex: function(t) {
this._elem.tabIndex = t;
c.resort();
},
setSize: function(t, e) {
var i = this._elem;
i.style.width = t + "px";
i.style.height = e + "px";
},
beginEditing: function() {
g && g !== this && g.setFocus(!1);
this._editing = !0;
g = this;
this._delegate.editBoxEditingDidBegan();
this._showDom();
this._elem.focus();
},
endEditing: function() {
this._elem && this._elem.blur();
},
_createInput: function() {
this._isTextArea = !1;
this._elem = document.createElement("input");
},
_createTextArea: function() {
this._isTextArea = !0;
this._elem = document.createElement("textarea");
},
_addDomToGameContainer: function() {
cc.game.container.appendChild(this._elem);
document.head.appendChild(this._placeholderStyleSheet);
},
_removeDomFromGameContainer: function() {
r.contains(cc.game.container, this._elem) && cc.game.container.removeChild(this._elem);
r.contains(document.head, this._placeholderStyleSheet) && document.head.removeChild(this._placeholderStyleSheet);
delete this._elem;
delete this._placeholderStyleSheet;
},
_showDom: function() {
this._updateMatrix();
this._updateMaxLength();
this._updateInputType();
this._updateStyleSheet();
this._elem.style.display = "";
this._delegate._hideLabels();
cc.sys.isMobile && this._showDomOnMobile();
},
_hideDom: function() {
this._elem.style.display = "none";
this._delegate._showLabels();
cc.sys.isMobile && this._hideDomOnMobile();
},
_showDomOnMobile: function() {
if (cc.sys.os === cc.sys.OS_ANDROID) {
if (m) {
cc.view.enableAutoFullScreen(!1);
cc.screen.exitFullScreen();
}
y && cc.view.resizeWithBrowserSize(!1);
this._adjustWindowScroll();
}
},
_hideDomOnMobile: function() {
if (cc.sys.os === cc.sys.OS_ANDROID) {
y && cc.view.resizeWithBrowserSize(!0);
setTimeout((function() {
g || m && cc.view.enableAutoFullScreen(!0);
}), 800);
}
this._scrollBackWindow();
},
_adjustWindowScroll: function() {
var t = this;
setTimeout((function() {
window.scrollY < 100 && t._elem.scrollIntoView({
block: "start",
inline: "nearest",
behavior: "smooth"
});
}), 800);
},
_scrollBackWindow: function() {
setTimeout((function() {
var t = cc.sys;
t.browserType !== t.BROWSER_TYPE_WECHAT || t.os !== t.OS_IOS ? window.scrollTo(0, 0) : window.top && window.top.scrollTo(0, 0);
}), 800);
},
_updateMatrix: function() {
var t = this._delegate.node;
t.getWorldMatrix(this._worldMat);
var e = this._worldMat, i = e.m, r = cc.view;
if (this._m00 !== i[0] || this._m01 !== i[1] || this._m04 !== i[4] || this._m05 !== i[5] || this._m12 !== i[12] || this._m13 !== i[13] || this._w !== t._contentSize.width || this._h !== t._contentSize.height || !this._cacheViewportRect.equals(r._viewportRect)) {
this._m00 = i[0];
this._m01 = i[1];
this._m04 = i[4];
this._m05 = i[5];
this._m12 = i[12];
this._m13 = i[13];
this._w = t._contentSize.width;
this._h = t._contentSize.height;
this._cacheViewportRect.set(r._viewportRect);
var s, a = r._scaleX, o = r._scaleY, c = r._viewportRect, l = r._devicePixelRatio;
v.x = -t._anchorPoint.x * this._w;
v.y = -t._anchorPoint.y * this._h;
n.default.transform(e, e, v);
cc.Camera.findCamera(t).getWorldToScreenMatrix2D(this._cameraMat);
s = this._cameraMat;
n.default.mul(s, s, e);
a /= l;
o /= l;
var u = cc.game.container, h = s.m, f = h[0] * a, _ = h[1], p = h[4], g = h[5] * o, m = u && u.style.paddingLeft && parseInt(u.style.paddingLeft);
m += c.x / l;
var y = u && u.style.paddingBottom && parseInt(u.style.paddingBottom);
y += c.y / l;
var E = h[12] * a + m, C = h[13] * o + y;
if (d.zoomInvalid) {
this.setSize(t.width * f, t.height * g);
f = 1;
g = 1;
}
var A = this._elem, T = "matrix(" + f + "," + -_ + "," + -p + "," + g + "," + E + "," + -C + ")";
A.style.transform = T;
A.style["-webkit-transform"] = T;
A.style["transform-origin"] = "0px 100% 0px";
A.style["-webkit-transform-origin"] = "0px 100% 0px";
}
},
_updateInputType: function() {
var t = this._delegate, e = t.inputMode, i = t.inputFlag, n = t.returnType, r = this._elem;
if (this._inputMode !== e || this._inputFlag !== i || this._returnType !== n) {
this._inputMode = e;
this._inputFlag = i;
this._returnType = n;
if (this._isTextArea) {
var s = "none";
i === f.INITIAL_CAPS_ALL_CHARACTERS ? s = "uppercase" : i === f.INITIAL_CAPS_WORD && (s = "capitalize");
r.style.textTransform = s;
} else if (i !== f.PASSWORD) {
var a = r.type;
if (e === h.EMAIL_ADDR) a = "email"; else if (e === h.NUMERIC || e === h.DECIMAL) a = "number"; else if (e === h.PHONE_NUMBER) {
a = "number";
r.pattern = "[0-9]*";
} else if (e === h.URL) a = "url"; else {
a = "text";
n === _.SEARCH && (a = "search");
}
r.type = a;
var o = "none";
i === f.INITIAL_CAPS_ALL_CHARACTERS ? o = "uppercase" : i === f.INITIAL_CAPS_WORD && (o = "capitalize");
r.style.textTransform = o;
} else r.type = "password";
}
},
_updateMaxLength: function() {
var t = this._delegate.maxLength;
t < 0 && (t = 65535);
this._elem.maxLength = t;
},
_initStyleSheet: function() {
var t = this._elem;
t.style.display = "none";
t.style.border = 0;
t.style.background = "transparent";
t.style.width = "100%";
t.style.height = "100%";
t.style.active = 0;
t.style.outline = "medium";
t.style.padding = "0";
t.style.textTransform = "uppercase";
t.style.position = "absolute";
t.style.bottom = "0px";
t.style.left = "2px";
t.className = "cocosEditBox";
t.id = this._domId;
if (this._isTextArea) {
t.style.resize = "none";
t.style.overflow_y = "scroll";
} else {
t.type = "text";
t.style["-moz-appearance"] = "textfield";
}
this._placeholderStyleSheet = document.createElement("style");
},
_updateStyleSheet: function() {
var t = this._delegate, e = this._elem;
e.value = t.string;
e.placeholder = t.placeholder;
this._updateTextLabel(t.textLabel);
this._updatePlaceholderLabel(t.placeholderLabel);
},
_updateTextLabel: function(t) {
if (t) {
var e = t.font;
e = !e || e instanceof cc.BitmapFont ? t.fontFamily : e._fontFamily;
var i = t.fontSize * t.node.scaleY;
if (this._textLabelFont !== e || this._textLabelFontSize !== i || this._textLabelFontColor !== t.fontColor || this._textLabelAlign !== t.horizontalAlign) {
this._textLabelFont = e;
this._textLabelFontSize = i;
this._textLabelFontColor = t.fontColor;
this._textLabelAlign = t.horizontalAlign;
var n = this._elem;
n.style.fontSize = i + "px";
n.style.color = t.node.color.toCSS();
n.style.fontFamily = e;
switch (t.horizontalAlign) {
case o.HorizontalAlign.LEFT:
n.style.textAlign = "left";
break;

case o.HorizontalAlign.CENTER:
n.style.textAlign = "center";
break;

case o.HorizontalAlign.RIGHT:
n.style.textAlign = "right";
}
}
}
},
_updatePlaceholderLabel: function(t) {
if (t) {
var e = t.font;
e = !e || e instanceof cc.BitmapFont ? t.fontFamily : t.font._fontFamily;
var i = t.fontSize * t.node.scaleY;
if (this._placeholderLabelFont !== e || this._placeholderLabelFontSize !== i || this._placeholderLabelFontColor !== t.fontColor || this._placeholderLabelAlign !== t.horizontalAlign || this._placeholderLineHeight !== t.fontSize) {
this._placeholderLabelFont = e;
this._placeholderLabelFontSize = i;
this._placeholderLabelFontColor = t.fontColor;
this._placeholderLabelAlign = t.horizontalAlign;
this._placeholderLineHeight = t.fontSize;
var n, r = this._placeholderStyleSheet, s = t.node.color.toCSS(), a = t.fontSize;
switch (t.horizontalAlign) {
case o.HorizontalAlign.LEFT:
n = "left";
break;

case o.HorizontalAlign.CENTER:
n = "center";
break;

case o.HorizontalAlign.RIGHT:
n = "right";
}
r.innerHTML = "#" + this._domId + "::-webkit-input-placeholder,#" + this._domId + "::-moz-placeholder,#" + this._domId + ":-ms-input-placeholder{text-transform: initial; font-family: " + e + "; font-size: " + i + "px; color: " + s + "; line-height: " + a + "px; text-align: " + n + ";}";
cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE && (r.innerHTML += "#" + this._domId + "::-ms-clear{display: none;}");
}
}
},
_registerEventListeners: function() {
var t = this, e = this._elem, i = !1, n = this._eventListeners;
n.compositionStart = function() {
i = !0;
};
n.compositionEnd = function() {
i = !1;
t._delegate.editBoxTextChanged(e.value);
};
n.onInput = function() {
i || t._delegate.editBoxTextChanged(e.value);
};
n.onClick = function(e) {
t._editing && cc.sys.isMobile && t._adjustWindowScroll();
};
n.onKeydown = function(i) {
if (i.keyCode === s.KEY.enter) {
i.stopPropagation();
t._delegate.editBoxEditingReturn();
t._isTextArea || e.blur();
} else if (i.keyCode === s.KEY.tab) {
i.stopPropagation();
i.preventDefault();
c.next(t);
}
};
n.onBlur = function() {
t._editing = !1;
g = null;
t._hideDom();
t._delegate.editBoxEditingDidEnded();
};
n.onResize = function() {
t._updateMatrix();
};
e.addEventListener("compositionstart", n.compositionStart);
e.addEventListener("compositionend", n.compositionEnd);
e.addEventListener("input", n.onInput);
e.addEventListener("keydown", n.onKeydown);
e.addEventListener("blur", n.onBlur);
e.addEventListener("touchstart", n.onClick);
window.addEventListener("resize", n.onResize);
window.addEventListener("orientationchange", n.onResize);
},
_removeEventListeners: function() {
var t = this._elem, e = this._eventListeners;
t.removeEventListener("compositionstart", e.compositionStart);
t.removeEventListener("compositionend", e.compositionEnd);
t.removeEventListener("input", e.onInput);
t.removeEventListener("keydown", e.onKeydown);
t.removeEventListener("blur", e.onBlur);
t.removeEventListener("touchstart", e.onClick);
window.removeEventListener("resize", e.onResize);
window.removeEventListener("orientationchange", e.onResize);
e.compositionStart = null;
e.compositionEnd = null;
e.onInput = null;
e.onKeydown = null;
e.onBlur = null;
e.onClick = null;
e.onResize = null;
}
});
}), {
"../../platform/CCMacro": 97,
"../../platform/utils": 116,
"../../value-types/mat4": 170,
"../CCLabel": 46,
"./tabIndexUtil": 54,
"./types": 55
} ],
54: [ (function(t, e, i) {
"use strict";
e.exports = {
_tabIndexList: [],
add: function(t) {
var e = this._tabIndexList;
-1 === e.indexOf(t) && e.push(t);
},
remove: function(t) {
var e = this._tabIndexList, i = e.indexOf(t);
-1 !== i && e.splice(i, 1);
},
resort: function() {
this._tabIndexList.sort((function(t, e) {
return t._delegate._tabIndex - e._delegate._tabIndex;
}));
},
next: function(t) {
var e = this._tabIndexList, i = e.indexOf(t);
t.setFocus(!1);
if (-1 !== i) {
var n = e[i + 1];
n && n._delegate._tabIndex >= 0 && n.setFocus(!0);
}
}
};
}), {} ],
55: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
DEFAULT: 0,
DONE: 1,
SEND: 2,
SEARCH: 3,
GO: 4,
NEXT: 5
}), r = cc.Enum({
ANY: 0,
EMAIL_ADDR: 1,
NUMERIC: 2,
PHONE_NUMBER: 3,
URL: 4,
DECIMAL: 5,
SINGLE_LINE: 6
}), s = cc.Enum({
PASSWORD: 0,
SENSITIVE: 1,
INITIAL_CAPS_WORD: 2,
INITIAL_CAPS_SENTENCE: 3,
INITIAL_CAPS_ALL_CHARACTERS: 4,
DEFAULT: 5
});
e.exports = {
KeyboardReturnType: n,
InputMode: r,
InputFlag: s
};
}), {} ],
56: [ (function(t, e, i) {
"use strict";
t("./CCComponent");
t("./CCComponentEventHandler");
t("./missing-script");
var n = t("./WXSubContextView"), r = t("./SwanSubContextView");
n || (n = cc.Class({
name: "cc.WXSubContextView",
extends: cc.Component
}));
r || (r = cc.Class({
name: "cc.SwanSubContextView",
extends: cc.Component
}));
var s = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./editbox/CCEditBox"), t("./CCLabelOutline"), t("./CCLabelShadow"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents"), t("./CCMotionStreak"), n, r ];
e.exports = s;
}), {
"./CCAnimation": void 0,
"./CCAudioSource": 40,
"./CCBlockInputEvents": 41,
"./CCButton": 42,
"./CCCanvas": 43,
"./CCComponent": 44,
"./CCComponentEventHandler": 45,
"./CCLabel": 46,
"./CCLabelOutline": void 0,
"./CCLabelShadow": void 0,
"./CCLayout": 47,
"./CCMask": void 0,
"./CCMotionStreak": void 0,
"./CCPageView": void 0,
"./CCPageViewIndicator": void 0,
"./CCProgressBar": void 0,
"./CCRichText": void 0,
"./CCScrollBar": void 0,
"./CCScrollView": void 0,
"./CCSlider": void 0,
"./CCSprite": 49,
"./CCToggle": void 0,
"./CCToggleContainer": void 0,
"./CCToggleGroup": void 0,
"./CCWidget": 50,
"./SwanSubContextView": void 0,
"./WXSubContextView": void 0,
"./editbox/CCEditBox": 51,
"./missing-script": 57
} ],
57: [ (function(t, e, i) {
"use strict";
var n = cc.js, r = t("../utils/misc").BUILTIN_CLASSID_RE, s = cc.Class({
name: "cc.MissingClass",
properties: {
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
}
}), a = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t, e) {
var i = n._getClassById(t);
if (i) return i;
if (t) {
cc.deserialize.reportMissingClass(t);
return a.getMissingWrapper(t, e);
}
return null;
},
getMissingWrapper: function(t, e) {
return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || r.test(t)) ? a : s;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = a;
}), {
"../utils/misc": 153
} ],
58: [ (function(t, e, i) {
"use strict";
var n = cc.js;
t("../event/event");
var r = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
n.extend(r, cc.Event);
var s = r.prototype;
s.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
s.getScrollX = function() {
return this._scrollX;
};
s.getScrollY = function() {
return this._scrollY;
};
s.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
s.getLocation = function() {
return cc.v2(this._x, this._y);
};
s.getLocationInView = function() {
return cc.v2(this._x, cc.view._designResolutionSize.height - this._y);
};
s._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
s.getPreviousLocation = function() {
return cc.v2(this._prevX, this._prevY);
};
s.getDelta = function() {
return cc.v2(this._x - this._prevX, this._y - this._prevY);
};
s.getDeltaX = function() {
return this._x - this._prevX;
};
s.getDeltaY = function() {
return this._y - this._prevY;
};
s.setButton = function(t) {
this._button = t;
};
s.getButton = function() {
return this._button;
};
s.getLocationX = function() {
return this._x;
};
s.getLocationY = function() {
return this._y;
};
r.NONE = 0;
r.DOWN = 1;
r.UP = 2;
r.MOVE = 3;
r.SCROLL = 4;
r.BUTTON_LEFT = 0;
r.BUTTON_RIGHT = 2;
r.BUTTON_MIDDLE = 1;
r.BUTTON_4 = 3;
r.BUTTON_5 = 4;
r.BUTTON_6 = 5;
r.BUTTON_7 = 6;
r.BUTTON_8 = 7;
var a = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
n.extend(a, cc.Event);
(s = a.prototype).getEventCode = function() {
return this._eventCode;
};
s.getTouches = function() {
return this._touches;
};
s._setEventCode = function(t) {
this._eventCode = t;
};
s._setTouches = function(t) {
this._touches = t;
};
s.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
s.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
s.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
s.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
s.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
s.getID = function() {
return this.touch ? this.touch.getID() : null;
};
s.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
s.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
s.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
s.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
s.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
a.MAX_TOUCHES = 5;
a.BEGAN = 0;
a.MOVED = 1;
a.ENDED = 2;
a.CANCELED = 3;
var o = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
n.extend(o, cc.Event);
var c = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
n.extend(c, cc.Event);
cc.Event.EventMouse = r;
cc.Event.EventTouch = a;
cc.Event.EventAcceleration = o;
cc.Event.EventKeyboard = c;
e.exports = cc.Event;
}), {
"../event/event": 65
} ],
59: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js");
cc.EventListener = function(t, e, i) {
this._onEvent = i;
this._type = t || 0;
this._listenerID = e || "";
this._registered = !1;
this._fixedPriority = 0;
this._node = null;
this._target = null;
this._paused = !0;
this._isEnabled = !0;
};
cc.EventListener.prototype = {
constructor: cc.EventListener,
_setPaused: function(t) {
this._paused = t;
},
_isPaused: function() {
return this._paused;
},
_setRegistered: function(t) {
this._registered = t;
},
_isRegistered: function() {
return this._registered;
},
_getType: function() {
return this._type;
},
_getListenerID: function() {
return this._listenerID;
},
_setFixedPriority: function(t) {
this._fixedPriority = t;
},
_getFixedPriority: function() {
return this._fixedPriority;
},
_setSceneGraphPriority: function(t) {
this._target = t;
this._node = t;
},
_getSceneGraphPriority: function() {
return this._node;
},
checkAvailable: function() {
return null !== this._onEvent;
},
clone: function() {
return null;
},
setEnabled: function(t) {
this._isEnabled = t;
},
isEnabled: function() {
return this._isEnabled;
},
retain: function() {},
release: function() {}
};
cc.EventListener.UNKNOWN = 0;
cc.EventListener.TOUCH_ONE_BY_ONE = 1;
cc.EventListener.TOUCH_ALL_AT_ONCE = 2;
cc.EventListener.KEYBOARD = 3;
cc.EventListener.MOUSE = 4;
cc.EventListener.ACCELERATION = 6;
cc.EventListener.CUSTOM = 8;
var r = cc.EventListener.ListenerID = {
MOUSE: "__cc_mouse",
TOUCH_ONE_BY_ONE: "__cc_touch_one_by_one",
TOUCH_ALL_AT_ONCE: "__cc_touch_all_at_once",
KEYBOARD: "__cc_keyboard",
ACCELERATION: "__cc_acceleration"
}, s = function(t, e) {
this._onCustomEvent = e;
cc.EventListener.call(this, cc.EventListener.CUSTOM, t, this._callback);
};
n.extend(s, cc.EventListener);
n.mixin(s.prototype, {
_onCustomEvent: null,
_callback: function(t) {
null !== this._onCustomEvent && this._onCustomEvent(t);
},
checkAvailable: function() {
return cc.EventListener.prototype.checkAvailable.call(this) && null !== this._onCustomEvent;
},
clone: function() {
return new s(this._listenerID, this._onCustomEvent);
}
});
var a = function() {
cc.EventListener.call(this, cc.EventListener.MOUSE, r.MOUSE, this._callback);
};
n.extend(a, cc.EventListener);
n.mixin(a.prototype, {
onMouseDown: null,
onMouseUp: null,
onMouseMove: null,
onMouseScroll: null,
_callback: function(t) {
var e = cc.Event.EventMouse;
switch (t._eventType) {
case e.DOWN:
this.onMouseDown && this.onMouseDown(t);
break;

case e.UP:
this.onMouseUp && this.onMouseUp(t);
break;

case e.MOVE:
this.onMouseMove && this.onMouseMove(t);
break;

case e.SCROLL:
this.onMouseScroll && this.onMouseScroll(t);
}
},
clone: function() {
var t = new a();
t.onMouseDown = this.onMouseDown;
t.onMouseUp = this.onMouseUp;
t.onMouseMove = this.onMouseMove;
t.onMouseScroll = this.onMouseScroll;
return t;
},
checkAvailable: function() {
return !0;
}
});
var o = function() {
cc.EventListener.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, r.TOUCH_ONE_BY_ONE, null);
this._claimedTouches = [];
};
n.extend(o, cc.EventListener);
n.mixin(o.prototype, {
constructor: o,
_claimedTouches: null,
swallowTouches: !1,
onTouchBegan: null,
onTouchMoved: null,
onTouchEnded: null,
onTouchCancelled: null,
setSwallowTouches: function(t) {
this.swallowTouches = t;
},
isSwallowTouches: function() {
return this.swallowTouches;
},
clone: function() {
var t = new o();
t.onTouchBegan = this.onTouchBegan;
t.onTouchMoved = this.onTouchMoved;
t.onTouchEnded = this.onTouchEnded;
t.onTouchCancelled = this.onTouchCancelled;
t.swallowTouches = this.swallowTouches;
return t;
},
checkAvailable: function() {
if (!this.onTouchBegan) {
cc.logID(1801);
return !1;
}
return !0;
}
});
var c = function() {
cc.EventListener.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, r.TOUCH_ALL_AT_ONCE, null);
};
n.extend(c, cc.EventListener);
n.mixin(c.prototype, {
constructor: c,
onTouchesBegan: null,
onTouchesMoved: null,
onTouchesEnded: null,
onTouchesCancelled: null,
clone: function() {
var t = new c();
t.onTouchesBegan = this.onTouchesBegan;
t.onTouchesMoved = this.onTouchesMoved;
t.onTouchesEnded = this.onTouchesEnded;
t.onTouchesCancelled = this.onTouchesCancelled;
return t;
},
checkAvailable: function() {
if (null === this.onTouchesBegan && null === this.onTouchesMoved && null === this.onTouchesEnded && null === this.onTouchesCancelled) {
cc.logID(1802);
return !1;
}
return !0;
}
});
var l = function(t) {
this._onAccelerationEvent = t;
cc.EventListener.call(this, cc.EventListener.ACCELERATION, r.ACCELERATION, this._callback);
};
n.extend(l, cc.EventListener);
n.mixin(l.prototype, {
constructor: l,
_onAccelerationEvent: null,
_callback: function(t) {
this._onAccelerationEvent(t.acc, t);
},
checkAvailable: function() {
cc.assertID(this._onAccelerationEvent, 1803);
return !0;
},
clone: function() {
return new l(this._onAccelerationEvent);
}
});
var u = function() {
cc.EventListener.call(this, cc.EventListener.KEYBOARD, r.KEYBOARD, this._callback);
};
n.extend(u, cc.EventListener);
n.mixin(u.prototype, {
constructor: u,
onKeyPressed: null,
onKeyReleased: null,
_callback: function(t) {
t.isPressed ? this.onKeyPressed && this.onKeyPressed(t.keyCode, t) : this.onKeyReleased && this.onKeyReleased(t.keyCode, t);
},
clone: function() {
var t = new u();
t.onKeyPressed = this.onKeyPressed;
t.onKeyReleased = this.onKeyReleased;
return t;
},
checkAvailable: function() {
if (null === this.onKeyPressed && null === this.onKeyReleased) {
cc.logID(1800);
return !1;
}
return !0;
}
});
cc.EventListener.create = function(t) {
cc.assertID(t && t.event, 1900);
var e = t.event;
delete t.event;
var i = null;
if (e === cc.EventListener.TOUCH_ONE_BY_ONE) i = new o(); else if (e === cc.EventListener.TOUCH_ALL_AT_ONCE) i = new c(); else if (e === cc.EventListener.MOUSE) i = new a(); else if (e === cc.EventListener.CUSTOM) {
i = new s(t.eventName, t.callback);
delete t.eventName;
delete t.callback;
} else if (e === cc.EventListener.KEYBOARD) i = new u(); else if (e === cc.EventListener.ACCELERATION) {
i = new l(t.callback);
delete t.callback;
}
for (var n in t) i[n] = t[n];
return i;
};
e.exports = cc.EventListener;
}), {
"../platform/js": 112
} ],
60: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js");
t("./CCEventListener");
var r = cc.EventListener.ListenerID, s = function() {
this._fixedListeners = [];
this._sceneGraphListeners = [];
this.gt0Index = 0;
};
s.prototype = {
constructor: s,
size: function() {
return this._fixedListeners.length + this._sceneGraphListeners.length;
},
empty: function() {
return 0 === this._fixedListeners.length && 0 === this._sceneGraphListeners.length;
},
push: function(t) {
0 === t._getFixedPriority() ? this._sceneGraphListeners.push(t) : this._fixedListeners.push(t);
},
clearSceneGraphListeners: function() {
this._sceneGraphListeners.length = 0;
},
clearFixedListeners: function() {
this._fixedListeners.length = 0;
},
clear: function() {
this._sceneGraphListeners.length = 0;
this._fixedListeners.length = 0;
},
getFixedPriorityListeners: function() {
return this._fixedListeners;
},
getSceneGraphPriorityListeners: function() {
return this._sceneGraphListeners;
}
};
var a = function(t) {
var e = cc.Event, i = t.type;
if (i === e.ACCELERATION) return r.ACCELERATION;
if (i === e.KEYBOARD) return r.KEYBOARD;
if (i.startsWith(e.MOUSE)) return r.MOUSE;
i.startsWith(e.TOUCH) && cc.logID(2e3);
return "";
}, o = {
DIRTY_NONE: 0,
DIRTY_FIXED_PRIORITY: 1,
DIRTY_SCENE_GRAPH_PRIORITY: 2,
DIRTY_ALL: 3,
_listenersMap: {},
_priorityDirtyFlagMap: {},
_nodeListenersMap: {},
_toAddedListeners: [],
_toRemovedListeners: [],
_dirtyListeners: {},
_inDispatch: 0,
_isEnabled: !1,
_currentTouch: null,
_currentTouchListener: null,
_internalCustomListenerIDs: [],
_setDirtyForNode: function(t) {
var e = this._nodeListenersMap[t._id];
if (void 0 !== e) for (var i = 0, n = e.length; i < n; i++) {
var r = e[i]._getListenerID();
null == this._dirtyListeners[r] && (this._dirtyListeners[r] = !0);
}
if (t.childrenCount > 0) for (var s = t._children, a = 0, o = s.length; a < o; a++) this._setDirtyForNode(s[a]);
},
pauseTarget: function(t, e) {
if (t instanceof cc._BaseNode) {
var i, n, r = this._nodeListenersMap[t._id];
if (r) for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!0);
if (!0 === e) {
var s = t._children;
for (i = 0, n = s ? s.length : 0; i < n; i++) this.pauseTarget(s[i], !0);
}
} else cc.warnID(3506);
},
resumeTarget: function(t, e) {
if (t instanceof cc._BaseNode) {
var i, n, r = this._nodeListenersMap[t._id];
if (r) for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!1);
this._setDirtyForNode(t);
if (!0 === e) {
var s = t._children;
for (i = 0, n = s ? s.length : 0; i < n; i++) this.resumeTarget(s[i], !0);
}
} else cc.warnID(3506);
},
_addListener: function(t) {
0 === this._inDispatch ? this._forceAddEventListener(t) : this._toAddedListeners.push(t);
},
_forceAddEventListener: function(t) {
var e = t._getListenerID(), i = this._listenersMap[e];
if (!i) {
i = new s();
this._listenersMap[e] = i;
}
i.push(t);
if (0 === t._getFixedPriority()) {
this._setDirty(e, this.DIRTY_SCENE_GRAPH_PRIORITY);
var n = t._getSceneGraphPriority();
null === n && cc.logID(3507);
this._associateNodeAndEventListener(n, t);
n.activeInHierarchy && this.resumeTarget(n);
} else this._setDirty(e, this.DIRTY_FIXED_PRIORITY);
},
_getListeners: function(t) {
return this._listenersMap[t];
},
_updateDirtyFlagForSceneGraph: function() {
var t = this._dirtyListeners;
for (var e in t) this._setDirty(e, this.DIRTY_SCENE_GRAPH_PRIORITY);
this._dirtyListeners = {};
},
_removeAllListenersInVector: function(t) {
if (t) for (var e, i = t.length - 1; i >= 0; i--) {
(e = t[i])._setRegistered(!1);
if (null != e._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(e._getSceneGraphPriority(), e);
e._setSceneGraphPriority(null);
}
0 === this._inDispatch && cc.js.array.removeAt(t, i);
}
},
_removeListenersForListenerID: function(t) {
var e, i = this._listenersMap[t];
if (i) {
var n = i.getFixedPriorityListeners(), r = i.getSceneGraphPriorityListeners();
this._removeAllListenersInVector(r);
this._removeAllListenersInVector(n);
delete this._priorityDirtyFlagMap[t];
if (!this._inDispatch) {
i.clear();
delete this._listenersMap[t];
}
}
var s, a = this._toAddedListeners;
for (e = a.length - 1; e >= 0; e--) (s = a[e]) && s._getListenerID() === t && cc.js.array.removeAt(a, e);
},
_sortEventListeners: function(t) {
var e = this.DIRTY_NONE, i = this._priorityDirtyFlagMap;
i[t] && (e = i[t]);
if (e !== this.DIRTY_NONE) {
i[t] = this.DIRTY_NONE;
e & this.DIRTY_FIXED_PRIORITY && this._sortListenersOfFixedPriority(t);
if (e & this.DIRTY_SCENE_GRAPH_PRIORITY) {
cc.director.getScene() && this._sortListenersOfSceneGraphPriority(t);
}
}
},
_sortListenersOfSceneGraphPriority: function(t) {
var e = this._getListeners(t);
if (e) {
var i = e.getSceneGraphPriorityListeners();
i && 0 !== i.length && e.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes);
}
},
_sortEventListenersOfSceneGraphPriorityDes: function(t, e) {
var i = t._getSceneGraphPriority(), n = e._getSceneGraphPriority();
if (!(e && n && n._activeInHierarchy && null !== n._parent)) return -1;
if (!t || !i || !i._activeInHierarchy || null === i._parent) return 1;
for (var r = i, s = n, a = !1; r._parent._id !== s._parent._id; ) {
r = null === r._parent._parent ? (a = !0) && n : r._parent;
s = null === s._parent._parent ? (a = !0) && i : s._parent;
}
if (r._id === s._id) {
if (r._id === n._id) return -1;
if (r._id === i._id) return 1;
}
return a ? r._localZOrder - s._localZOrder : s._localZOrder - r._localZOrder;
},
_sortListenersOfFixedPriority: function(t) {
var e = this._listenersMap[t];
if (e) {
var i = e.getFixedPriorityListeners();
if (i && 0 !== i.length) {
i.sort(this._sortListenersOfFixedPriorityAsc);
for (var n = 0, r = i.length; n < r && !(i[n]._getFixedPriority() >= 0); ) ++n;
e.gt0Index = n;
}
}
},
_sortListenersOfFixedPriorityAsc: function(t, e) {
return t._getFixedPriority() - e._getFixedPriority();
},
_onUpdateListeners: function(t) {
var e, i, n, r = t.getFixedPriorityListeners(), s = t.getSceneGraphPriorityListeners(), a = this._toRemovedListeners;
if (s) for (e = s.length - 1; e >= 0; e--) if (!(i = s[e])._isRegistered()) {
cc.js.array.removeAt(s, e);
-1 !== (n = a.indexOf(i)) && a.splice(n, 1);
}
if (r) for (e = r.length - 1; e >= 0; e--) if (!(i = r[e])._isRegistered()) {
cc.js.array.removeAt(r, e);
-1 !== (n = a.indexOf(i)) && a.splice(n, 1);
}
s && 0 === s.length && t.clearSceneGraphListeners();
r && 0 === r.length && t.clearFixedListeners();
},
frameUpdateListeners: function() {
var t = this._listenersMap, e = this._priorityDirtyFlagMap;
for (var i in t) if (t[i].empty()) {
delete e[i];
delete t[i];
}
var n = this._toAddedListeners;
if (0 !== n.length) {
for (var r = 0, s = n.length; r < s; r++) this._forceAddEventListener(n[r]);
n.length = 0;
}
0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners();
},
_updateTouchListeners: function(t) {
var e = this._inDispatch;
cc.assertID(e > 0, 3508);
if (!(e > 1)) {
var i;
(i = this._listenersMap[r.TOUCH_ONE_BY_ONE]) && this._onUpdateListeners(i);
(i = this._listenersMap[r.TOUCH_ALL_AT_ONCE]) && this._onUpdateListeners(i);
cc.assertID(1 === e, 3509);
var n = this._toAddedListeners;
if (0 !== n.length) {
for (var s = 0, a = n.length; s < a; s++) this._forceAddEventListener(n[s]);
this._toAddedListeners.length = 0;
}
0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners();
}
},
_cleanToRemovedListeners: function() {
for (var t = this._toRemovedListeners, e = 0; e < t.length; e++) {
var i = t[e], n = this._listenersMap[i._getListenerID()];
if (n) {
var r, s = n.getFixedPriorityListeners(), a = n.getSceneGraphPriorityListeners();
a && -1 !== (r = a.indexOf(i)) && a.splice(r, 1);
s && -1 !== (r = s.indexOf(i)) && s.splice(r, 1);
}
}
t.length = 0;
},
_onTouchEventCallback: function(t, e) {
if (!t._isRegistered()) return !1;
var i = e.event, n = i.currentTouch;
i.currentTarget = t._node;
var r, s = !1, a = i.getEventCode(), c = cc.Event.EventTouch;
if (a === c.BEGAN) {
if (!cc.macro.ENABLE_MULTI_TOUCH && o._currentTouch) {
var l = o._currentTouchListener._node;
if (l && l.activeInHierarchy) return !1;
}
if (t.onTouchBegan && (s = t.onTouchBegan(n, i)) && t._registered) {
t._claimedTouches.push(n);
o._currentTouchListener = t;
o._currentTouch = n;
}
} else if (t._claimedTouches.length > 0 && -1 !== (r = t._claimedTouches.indexOf(n))) {
s = !0;
if (!cc.macro.ENABLE_MULTI_TOUCH && o._currentTouch && o._currentTouch !== n) return !1;
if (a === c.MOVED && t.onTouchMoved) t.onTouchMoved(n, i); else if (a === c.ENDED) {
t.onTouchEnded && t.onTouchEnded(n, i);
t._registered && t._claimedTouches.splice(r, 1);
o._clearCurTouch();
} else if (a === c.CANCELED) {
t.onTouchCancelled && t.onTouchCancelled(n, i);
t._registered && t._claimedTouches.splice(r, 1);
o._clearCurTouch();
}
}
if (i.isStopped()) {
o._updateTouchListeners(i);
return !0;
}
if (s && t.swallowTouches) {
e.needsMutableSet && e.touches.splice(n, 1);
return !0;
}
return !1;
},
_dispatchTouchEvent: function(t) {
this._sortEventListeners(r.TOUCH_ONE_BY_ONE);
this._sortEventListeners(r.TOUCH_ALL_AT_ONCE);
var e = this._getListeners(r.TOUCH_ONE_BY_ONE), i = this._getListeners(r.TOUCH_ALL_AT_ONCE);
if (null !== e || null !== i) {
var n = t.getTouches(), s = cc.js.array.copy(n), a = {
event: t,
needsMutableSet: e && i,
touches: s,
selTouch: null
};
if (e) for (var o = 0; o < n.length; o++) {
t.currentTouch = n[o];
t._propagationStopped = t._propagationImmediateStopped = !1;
this._dispatchEventToListeners(e, this._onTouchEventCallback, a);
}
if (i && s.length > 0) {
this._dispatchEventToListeners(i, this._onTouchesEventCallback, {
event: t,
touches: s
});
if (t.isStopped()) return;
}
this._updateTouchListeners(t);
}
},
_onTouchesEventCallback: function(t, e) {
if (!t._registered) return !1;
var i = cc.Event.EventTouch, n = e.event, r = e.touches, s = n.getEventCode();
n.currentTarget = t._node;
s === i.BEGAN && t.onTouchesBegan ? t.onTouchesBegan(r, n) : s === i.MOVED && t.onTouchesMoved ? t.onTouchesMoved(r, n) : s === i.ENDED && t.onTouchesEnded ? t.onTouchesEnded(r, n) : s === i.CANCELED && t.onTouchesCancelled && t.onTouchesCancelled(r, n);
if (n.isStopped()) {
o._updateTouchListeners(n);
return !0;
}
return !1;
},
_associateNodeAndEventListener: function(t, e) {
var i = this._nodeListenersMap[t._id];
if (!i) {
i = [];
this._nodeListenersMap[t._id] = i;
}
i.push(e);
},
_dissociateNodeAndEventListener: function(t, e) {
var i = this._nodeListenersMap[t._id];
if (i) {
cc.js.array.remove(i, e);
0 === i.length && delete this._nodeListenersMap[t._id];
}
},
_dispatchEventToListeners: function(t, e, i) {
var n, r, s = !1, a = t.getFixedPriorityListeners(), o = t.getSceneGraphPriorityListeners(), c = 0;
if (a && 0 !== a.length) for (;c < t.gt0Index; ++c) if ((r = a[c]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
if (o && !s) for (n = 0; n < o.length; n++) if ((r = o[n]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
if (a && !s) for (;c < a.length; ++c) if ((r = a[c]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
},
_setDirty: function(t, e) {
var i = this._priorityDirtyFlagMap;
null == i[t] ? i[t] = e : i[t] = e | i[t];
},
_sortNumberAsc: function(t, e) {
return t - e;
},
hasEventListener: function(t) {
return !!this._getListeners(t);
},
addListener: function(t, e) {
cc.assertID(t && e, 3503);
if (cc.js.isNumber(e) || e instanceof cc._BaseNode) {
if (t instanceof cc.EventListener) {
if (t._isRegistered()) {
cc.logID(3505);
return;
}
} else {
cc.assertID(!cc.js.isNumber(e), 3504);
t = cc.EventListener.create(t);
}
if (t.checkAvailable()) {
if (cc.js.isNumber(e)) {
if (0 === e) {
cc.logID(3500);
return;
}
t._setSceneGraphPriority(null);
t._setFixedPriority(e);
t._setRegistered(!0);
t._setPaused(!1);
this._addListener(t);
} else {
t._setSceneGraphPriority(e);
t._setFixedPriority(0);
t._setRegistered(!0);
this._addListener(t);
}
return t;
}
} else cc.warnID(3506);
},
addCustomListener: function(t, e) {
var i = new cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: t,
callback: e
});
this.addListener(i, 1);
return i;
},
removeListener: function(t) {
if (null != t) {
var e, i = this._listenersMap;
for (var n in i) {
var r = i[n], s = r.getFixedPriorityListeners(), a = r.getSceneGraphPriorityListeners();
(e = this._removeListenerInVector(a, t)) ? this._setDirty(t._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY) : (e = this._removeListenerInVector(s, t)) && this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY);
if (r.empty()) {
delete this._priorityDirtyFlagMap[t._getListenerID()];
delete i[n];
}
if (e) break;
}
if (!e) for (var o = this._toAddedListeners, c = o.length - 1; c >= 0; c--) {
var l = o[c];
if (l === t) {
cc.js.array.removeAt(o, c);
l._setRegistered(!1);
break;
}
}
this._currentTouchListener === t && this._clearCurTouch();
}
},
_clearCurTouch: function() {
this._currentTouchListener = null;
this._currentTouch = null;
},
_removeListenerInCallback: function(t, e) {
if (null == t) return !1;
for (var i = t.length - 1; i >= 0; i--) {
var n = t[i];
if (n._onCustomEvent === e || n._onEvent === e) {
n._setRegistered(!1);
if (null != n._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(n._getSceneGraphPriority(), n);
n._setSceneGraphPriority(null);
}
0 === this._inDispatch ? cc.js.array.removeAt(t, i) : this._toRemovedListeners.push(n);
return !0;
}
}
return !1;
},
_removeListenerInVector: function(t, e) {
if (null == t) return !1;
for (var i = t.length - 1; i >= 0; i--) {
var n = t[i];
if (n === e) {
n._setRegistered(!1);
if (null != n._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(n._getSceneGraphPriority(), n);
n._setSceneGraphPriority(null);
}
0 === this._inDispatch ? cc.js.array.removeAt(t, i) : this._toRemovedListeners.push(n);
return !0;
}
}
return !1;
},
removeListeners: function(t, e) {
var i = this;
if (cc.js.isNumber(t) || t instanceof cc._BaseNode) if (void 0 !== t._id) {
var n, s = i._nodeListenersMap[t._id];
if (s) {
var a = cc.js.array.copy(s);
for (n = 0; n < a.length; n++) i.removeListener(a[n]);
delete i._nodeListenersMap[t._id];
}
var o = i._toAddedListeners;
for (n = 0; n < o.length; ) {
var c = o[n];
if (c._getSceneGraphPriority() === t) {
c._setSceneGraphPriority(null);
c._setRegistered(!1);
o.splice(n, 1);
} else ++n;
}
if (!0 === e) {
var l, u = t.children;
for (n = 0, l = u.length; n < l; n++) i.removeListeners(u[n], !0);
}
} else t === cc.EventListener.TOUCH_ONE_BY_ONE ? i._removeListenersForListenerID(r.TOUCH_ONE_BY_ONE) : t === cc.EventListener.TOUCH_ALL_AT_ONCE ? i._removeListenersForListenerID(r.TOUCH_ALL_AT_ONCE) : t === cc.EventListener.MOUSE ? i._removeListenersForListenerID(r.MOUSE) : t === cc.EventListener.ACCELERATION ? i._removeListenersForListenerID(r.ACCELERATION) : t === cc.EventListener.KEYBOARD ? i._removeListenersForListenerID(r.KEYBOARD) : cc.logID(3501); else cc.warnID(3506);
},
removeCustomListeners: function(t) {
this._removeListenersForListenerID(t);
},
removeAllListeners: function() {
var t = this._listenersMap, e = this._internalCustomListenerIDs;
for (var i in t) -1 === e.indexOf(i) && this._removeListenersForListenerID(i);
},
setPriority: function(t, e) {
if (null != t) {
var i = this._listenersMap;
for (var n in i) {
var r = i[n].getFixedPriorityListeners();
if (r) {
if (-1 !== r.indexOf(t)) {
null != t._getSceneGraphPriority() && cc.logID(3502);
if (t._getFixedPriority() !== e) {
t._setFixedPriority(e);
this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY);
}
return;
}
}
}
}
},
setEnabled: function(t) {
this._isEnabled = t;
},
isEnabled: function() {
return this._isEnabled;
},
dispatchEvent: function(t) {
if (this._isEnabled) {
this._updateDirtyFlagForSceneGraph();
this._inDispatch++;
if (t && t.getType) if (t.getType().startsWith(cc.Event.TOUCH)) {
this._dispatchTouchEvent(t);
this._inDispatch--;
} else {
var e = a(t);
this._sortEventListeners(e);
var i = this._listenersMap[e];
if (null != i) {
this._dispatchEventToListeners(i, this._onListenerCallback, t);
this._onUpdateListeners(i);
}
this._inDispatch--;
} else cc.errorID(3511);
}
},
_onListenerCallback: function(t, e) {
e.currentTarget = t._target;
t._onEvent(e);
return e.isStopped();
},
dispatchCustomEvent: function(t, e) {
var i = new cc.Event.EventCustom(t);
i.setUserData(e);
this.dispatchEvent(i);
}
};
n.get(cc, "eventManager", (function() {
cc.errorID(1405, "cc.eventManager", "cc.EventTarget or cc.systemEvent");
return o;
}));
e.exports = cc.internal.eventManager = o;
}), {
"../platform/js": 112,
"./CCEventListener": 59
} ],
61: [ (function(t, e, i) {
"use strict";
cc.Touch = function(t, e, i) {
this._lastModified = 0;
this.setTouchInfo(i, t, e);
};
cc.Touch.prototype = {
constructor: cc.Touch,
getLocation: function() {
return cc.v2(this._point.x, this._point.y);
},
getLocationX: function() {
return this._point.x;
},
getLocationY: function() {
return this._point.y;
},
getPreviousLocation: function() {
return cc.v2(this._prevPoint.x, this._prevPoint.y);
},
getStartLocation: function() {
return cc.v2(this._startPoint.x, this._startPoint.y);
},
getDelta: function() {
return this._point.sub(this._prevPoint);
},
getLocationInView: function() {
return cc.v2(this._point.x, cc.view._designResolutionSize.height - this._point.y);
},
getPreviousLocationInView: function() {
return cc.v2(this._prevPoint.x, cc.view._designResolutionSize.height - this._prevPoint.y);
},
getStartLocationInView: function() {
return cc.v2(this._startPoint.x, cc.view._designResolutionSize.height - this._startPoint.y);
},
getID: function() {
return this._id;
},
setTouchInfo: function(t, e, i) {
this._prevPoint = this._point;
this._point = cc.v2(e || 0, i || 0);
this._id = t;
if (!this._startPointCaptured) {
this._startPoint = cc.v2(this._point);
cc.view._convertPointWithScale(this._startPoint);
this._startPointCaptured = !0;
}
},
_setPoint: function(t, e) {
if (void 0 === e) {
this._point.x = t.x;
this._point.y = t.y;
} else {
this._point.x = t;
this._point.y = e;
}
},
_setPrevPoint: function(t, e) {
this._prevPoint = void 0 === e ? cc.v2(t.x, t.y) : cc.v2(t || 0, e || 0);
}
};
}), {} ],
62: [ (function(t, e, i) {
"use strict";
t("./CCEvent");
t("./CCTouch");
t("./CCEventListener");
var n = t("./CCEventManager");
e.exports = n;
0;
}), {
"./CCEvent": 58,
"./CCEventListener": 59,
"./CCEventManager": 60,
"./CCTouch": 61
} ],
63: [ (function(t, e, i) {
"use strict";
var n = cc.js, r = t("../platform/callbacks-invoker");
function s() {
r.call(this);
}
n.extend(s, r);
s.prototype.emit = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var r = !n.isInvoking;
n.isInvoking = !0;
for (var s = n.callbackInfos, a = 0, o = s.length; a < o; ++a) {
var c = s[a];
if (c && c.callback) {
c.callback.call(c.target, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (r) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = s;
0;
}), {
"../platform/callbacks-invoker": 105
} ],
64: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("../platform/callbacks-invoker"), s = n.array.fastRemove;
function a() {
r.call(this);
}
n.extend(a, r);
var o = a.prototype;
o.__on = o.on;
o.on = function(t, e, i, n) {
if (e) {
if (!this.hasEventListener(t, e, i)) {
this.__on(t, e, i, n);
i && i.__eventTargets && i.__eventTargets.push(this);
}
return e;
}
cc.errorID(6800);
};
o.__off = o.off;
o.off = function(t, e, i) {
if (e) {
this.__off(t, e, i);
i && i.__eventTargets && s(i.__eventTargets, this);
} else {
var n = this._callbackTable[t];
if (!n) return;
for (var r = n.callbackInfos, a = 0; a < r.length; ++a) {
var o = r[a] && r[a].target;
o && o.__eventTargets && s(o.__eventTargets, this);
}
this.removeAll(t);
}
};
o.targetOff = function(t) {
this.removeAll(t);
t && t.__eventTargets && s(t.__eventTargets, this);
};
o.once = function(t, e, i) {
this.on(t, e, i, !0);
};
o.dispatchEvent = function(t) {
this.emit(t.type, t);
};
cc.EventTarget = e.exports = a;
}), {
"../platform/callbacks-invoker": 105,
"../platform/js": 112
} ],
65: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var r = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
n.extend(r, cc.Event);
r.prototype.reset = r;
r.prototype.setUserData = function(t) {
this.detail = t;
};
r.prototype.getUserData = function() {
return this.detail;
};
r.prototype.getEventName = cc.Event.prototype.getType;
var s = new n.Pool(10);
r.put = function(t) {
s.put(t);
};
r.get = function(t, e) {
var i = s._get();
i ? i.reset(t, e) : i = new r(t, e);
return i;
};
cc.Event.EventCustom = r;
e.exports = cc.Event;
}), {
"../platform/js": 112
} ],
66: [ (function(t, e, i) {
"use strict";
t("./event");
t("./event-listeners");
t("./event-target");
t("./system-event");
}), {
"./event": 65,
"./event-listeners": 63,
"./event-target": 64,
"./system-event": 67
} ],
67: [ (function(t, e, i) {
"use strict";
var n = t("../event/event-target"), r = t("../event-manager"), s = t("../platform/CCInputManager"), a = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), o = null, c = null, l = cc.Class({
name: "SystemEvent",
extends: n,
statics: {
EventType: a
},
setAccelerometerEnabled: function(t) {
0;
t && window.DeviceMotionEvent && "function" == typeof DeviceMotionEvent.requestPermission ? DeviceMotionEvent.requestPermission().then((function(t) {
console.log("Device Motion Event request permission: " + t);
s.setAccelerometerEnabled("granted" === t);
})) : s.setAccelerometerEnabled(t);
},
setAccelerometerInterval: function(t) {
0;
s.setAccelerometerInterval(t);
},
on: function(t, e, i, n) {
0;
this._super(t, e, i, n);
if (t === a.KEY_DOWN || t === a.KEY_UP) {
o || (o = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = a.KEY_DOWN;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = a.KEY_UP;
cc.systemEvent.dispatchEvent(e);
}
}));
r.hasEventListener(cc.EventListener.ListenerID.KEYBOARD) || r.addListener(o, 1);
}
if (t === a.DEVICEMOTION) {
c || (c = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = a.DEVICEMOTION;
cc.systemEvent.dispatchEvent(e);
}
}));
r.hasEventListener(cc.EventListener.ListenerID.ACCELERATION) || r.addListener(c, 1);
}
},
off: function(t, e, i) {
0;
this._super(t, e, i);
if (o && (t === a.KEY_DOWN || t === a.KEY_UP)) {
var n = this.hasEventListener(a.KEY_DOWN), s = this.hasEventListener(a.KEY_UP);
n || s || r.removeListener(o);
}
c && t === a.DEVICEMOTION && r.removeListener(c);
}
});
cc.SystemEvent = e.exports = l;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event-manager": 62,
"../event/event-target": 64,
"../platform/CCInputManager": 96
} ],
68: [ (function(t, e, i) {
"use strict";
t("./graphics");
}), {
"./graphics": void 0
} ],
69: [ (function(t, e, i) {
"use strict";
t("./platform");
t("./assets");
t("./CCNode");
t("./CCPrivateNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./geom-utils");
t("./mesh");
t("./3d");
t("./base-ui/CCWidgetManager");
}), {
"./3d": void 0,
"./CCNode": 6,
"./CCPrivateNode": 7,
"./CCScene": 8,
"./assets": 26,
"./base-ui/CCWidgetManager": 37,
"./camera/CCCamera": 38,
"./collider": void 0,
"./collider/CCIntersection": void 0,
"./components": 56,
"./geom-utils": void 0,
"./graphics": 68,
"./mesh": void 0,
"./physics": void 0,
"./platform": 109
} ],
70: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("./pipeline"), s = t("./loading-items"), a = t("./asset-loader"), o = t("./downloader"), c = t("./loader"), l = t("./asset-table"), u = t("../platform/utils").callInNextTick, h = t("./auto-release-utils"), f = Object.create(null);
f.assets = new l();
f.internal = new l();
var _ = {
url: null,
raw: !1
};
function d(t) {
var e, i, n;
if ("object" == typeof t) {
i = t;
if (t.url) return i;
e = t.uuid;
} else {
i = {};
e = t;
}
n = i.type ? "uuid" === i.type : cc.AssetLibrary._uuidInSettings(e);
cc.AssetLibrary._getAssetInfoInRuntime(e, _);
i.url = n ? _.url : e;
if (_.url && "uuid" === i.type && _.raw) {
i.type = null;
i.isRawAsset = !0;
} else n || (i.isRawAsset = !0);
return i;
}
var p = [], v = [];
function g() {
var t = new a(), e = new o(), i = new c();
r.call(this, [ t, e, i ]);
this.assetLoader = t;
this.md5Pipe = null;
this.downloader = e;
this.loader = i;
this.onProgress = null;
this._autoReleaseSetting = n.createMap(!0);
0;
}
n.extend(g, r);
var m = g.prototype;
m.init = function(t) {};
m.getXMLHttpRequest = function() {
return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
};
m.addDownloadHandlers = function(t) {
this.downloader.addHandlers(t);
};
m.addLoadHandlers = function(t) {
this.loader.addHandlers(t);
};
m.load = function(t, e, i) {
0;
if (void 0 === i) {
i = e;
e = this.onProgress || null;
}
var n, r = this, a = !1;
if (!(t instanceof Array)) if (t) {
a = !0;
t = [ t ];
} else t = [];
p.length = 0;
for (var o = 0; o < t.length; ++o) {
var c = t[o];
if (c && c.id) {
cc.warnID(4920, c.id);
c.uuid || c.url || (c.url = c.id);
}
if ((n = d(c)).url || n.uuid) {
var l = this._cache[n.url];
p.push(l || n);
}
}
var h = s.create(this, e, (function(t, e) {
u((function() {
if (i) {
if (a) {
var s = n.url;
i.call(r, t, e.getContent(s));
} else i.call(r, t, e);
i = null;
}
e.destroy();
}));
}));
s.initQueueDeps(h);
h.append(p);
p.length = 0;
};
m.flowInDeps = function(t, e, i) {
v.length = 0;
for (var n = 0; n < e.length; ++n) {
var r = d(e[n]);
if (r.url || r.uuid) {
var a = this._cache[r.url];
a ? v.push(a) : v.push(r);
}
}
var o = s.create(this, t ? function(t, e, i) {
this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i);
} : null, (function(e, n) {
i(e, n);
t && t.deps && (t.deps.length = 0);
n.destroy();
}));
if (t) {
var c = s.getQueue(t);
o._ownerQueue = c._ownerQueue || c;
}
var l = o.append(v, t);
v.length = 0;
return l;
};
m._assetTables = f;
m._getResUuid = function(t, e, i, n) {
var r = f[i = i || "assets"];
if (!t || !r) return null;
var s = t.indexOf("?");
-1 !== s && (t = t.substr(0, s));
var a = r.getUuid(t, e);
if (!a) {
var o = cc.path.extname(t);
if (o) {
t = t.slice(0, -o.length);
(a = r.getUuid(t, e)) && !n && cc.warnID(4901, t, o);
}
}
return a;
};
m._getReferenceKey = function(t) {
var e;
"object" == typeof t ? e = t._uuid || null : "string" == typeof t && (e = this._getResUuid(t, null, null, !0) || t);
if (!e) {
cc.warnID(4800, t);
return e;
}
cc.AssetLibrary._getAssetInfoInRuntime(e, _);
return this._cache[_.url] ? _.url : e;
};
m._urlNotFound = function(t, e, i) {
u((function() {
t = cc.url.normalize(t);
var r = (e ? n.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
i && i(new Error(r), []);
}));
};
m._parseLoadResArgs = function(t, e, i) {
if (void 0 === i) {
var r = t instanceof Array || n.isChildClassOf(t, cc.RawAsset);
if (e) {
i = e;
r && (e = this.onProgress || null);
} else if (void 0 === e && !r) {
i = t;
e = this.onProgress || null;
t = null;
}
if (void 0 !== e && !r) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
};
m.loadRes = function(t, e, i, n, r) {
if (5 !== arguments.length) {
r = n;
n = i;
i = "assets";
}
var s = this._parseLoadResArgs(e, n, r);
e = s.type;
n = s.onProgress;
r = s.onComplete;
var a = this, o = a._getResUuid(t, e, i);
o ? this.load({
type: "uuid",
uuid: o
}, n, (function(t, e) {
e && a.setAutoReleaseRecursively(o, !1);
r && r(t, e);
})) : a._urlNotFound(t, e, r);
};
m._loadResUuids = function(t, e, i, n) {
if (t.length > 0) {
var r = this, s = t.map((function(t) {
return {
type: "uuid",
uuid: t
};
}));
this.load(s, e, (function(t, e) {
if (i) {
for (var a = [], o = n && [], c = 0; c < s.length; ++c) {
var l = s[c].uuid, u = this._getReferenceKey(l), h = e.getContent(u);
if (h) {
r.setAutoReleaseRecursively(l, !1);
a.push(h);
o && o.push(n[c]);
}
}
n ? i(t, a, o) : i(t, a);
}
}));
} else i && u((function() {
n ? i(null, [], []) : i(null, []);
}));
};
m.loadResArray = function(t, e, i, n, r) {
if (5 !== arguments.length) {
r = n;
n = i;
i = "assets";
}
var s = this._parseLoadResArgs(e, n, r);
e = s.type;
n = s.onProgress;
r = s.onComplete;
for (var a = [], o = e instanceof Array, c = 0; c < t.length; c++) {
var l = t[c], u = o ? e[c] : e, h = this._getResUuid(l, u, i);
if (!h) {
this._urlNotFound(l, u, r);
return;
}
a.push(h);
}
this._loadResUuids(a, n, r);
};
m.loadResDir = function(t, e, i, n, r) {
if (5 !== arguments.length) {
r = n;
n = i;
i = "assets";
}
if (f[i]) {
var s = this._parseLoadResArgs(e, n, r);
e = s.type;
n = s.onProgress;
r = s.onComplete;
var a = [], o = f[i].getUuidArray(t, e, a);
this._loadResUuids(o, n, r, a);
}
};
m.getRes = function(t, e) {
var i = this._cache[t];
if (!i) {
var n = this._getResUuid(t, e, null, !0);
if (!n) return null;
var r = this._getReferenceKey(n);
i = this._cache[r];
}
i && i.alias && (i = i.alias);
return i && i.complete ? i.content : null;
};
m.getResCount = function() {
return Object.keys(this._cache).length;
};
m.getDependsRecursively = function(t) {
if (t) {
var e = this._getReferenceKey(t), i = h.getDependsRecursively(e);
i.push(e);
return i;
}
return [];
};
m.release = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
this.release(i);
} else if (t) {
var n = this._getReferenceKey(t);
if (n && n in cc.AssetLibrary.getBuiltinDeps()) return;
var r = this.getItem(n);
if (r) {
this.removeItem(n);
t = r.content;
0;
}
if (t instanceof cc.Asset) {
var s = t.nativeUrl;
s && this.release(s);
t.destroy();
}
}
};
m.releaseAsset = function(t) {
var e = t._uuid;
e && this.release(e);
};
m.releaseRes = function(t, e, i) {
var n = this._getResUuid(t, e, i);
n ? this.release(n) : cc.errorID(4914, t);
};
m.releaseResDir = function(t, e, i) {
if (f[i = i || "assets"]) for (var n = f[i].getUuidArray(t, e), r = 0; r < n.length; r++) {
var s = n[r];
this.release(s);
}
};
m.releaseAll = function() {
for (var t in this._cache) this.release(t);
};
m.removeItem = function(t) {
var e = r.prototype.removeItem.call(this, t);
delete this._autoReleaseSetting[t];
return e;
};
m.setAutoRelease = function(t, e) {
var i = this._getReferenceKey(t);
i && (this._autoReleaseSetting[i] = !!e);
};
m.setAutoReleaseRecursively = function(t, e) {
e = !!e;
var i = this._getReferenceKey(t);
if (i) {
this._autoReleaseSetting[i] = e;
for (var n = h.getDependsRecursively(i), r = 0; r < n.length; r++) {
var s = n[r];
this._autoReleaseSetting[s] = e;
}
} else 0;
};
m.isAutoRelease = function(t) {
var e = this._getReferenceKey(t);
return !!e && !!this._autoReleaseSetting[e];
};
cc.loader = new g();
0;
e.exports = cc.loader;
}), {
"../platform/js": 112,
"../platform/utils": 116,
"./asset-loader": 71,
"./asset-table": 72,
"./auto-release-utils": 74,
"./downloader": 76,
"./loader": 79,
"./loading-items": 80,
"./pipeline": 83,
"./released-asset-checker": 84
} ],
71: [ (function(t, e, i) {
"use strict";
t("../utils/CCPath");
var n = t("../CCDebug"), r = t("./pipeline"), s = t("./loading-items"), a = "AssetLoader", o = function(t) {
this.id = a;
this.async = !0;
this.pipeline = null;
};
o.ID = a;
var c = [];
o.prototype.handle = function(t, e) {
var i = t.uuid;
if (!i) return t.content || null;
cc.AssetLibrary.queryAssetInfo(i, (function(r, a, o) {
if (r) e(r); else {
t.url = t.rawUrl = a;
t.isRawAsset = o;
if (o) {
var l = cc.path.extname(a).toLowerCase();
if (!l) {
e(new Error(n.getError(4931, i, a)));
return;
}
l = l.substr(1);
var u = s.getQueue(t);
c[0] = {
queueId: t.queueId,
id: a,
url: a,
type: l,
error: null,
alias: t,
complete: !0
};
0;
u.append(c);
t.type = l;
e(null, t.content);
} else {
t.type = "uuid";
e(null, t.content);
}
}
}));
};
r.AssetLoader = e.exports = o;
}), {
"../CCDebug": 3,
"../utils/CCPath": 145,
"./loading-items": 80,
"./pipeline": 83
} ],
72: [ (function(t, e, i) {
"use strict";
var n = t("../utils/misc").pushToMap, r = t("../platform/js");
function s(t, e) {
this.uuid = t;
this.type = e;
}
function a() {
this._pathToUuid = r.createMap(!0);
}
function o(t, e) {
if (t.length > e.length) {
var i = t.charCodeAt(e.length);
return 46 === i || 47 === i;
}
return !0;
}
var c = a.prototype;
c.getUuid = function(t, e) {
t = cc.url.normalize(t);
var i = this._pathToUuid[t];
if (i) if (Array.isArray(i)) {
if (!e) return i[0].uuid;
for (var n = 0; n < i.length; n++) {
var s = i[n];
if (r.isChildClassOf(s.type, e)) return s.uuid;
}
} else {
if (!e || r.isChildClassOf(i.type, e)) return i.uuid;
0;
}
return "";
};
c.getUuidArray = function(t, e, i) {
"/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
var n = this._pathToUuid, s = [], a = r.isChildClassOf;
for (var c in n) if (c.startsWith(t) && o(c, t) || !t) {
var l = n[c];
if (Array.isArray(l)) for (var u = 0; u < l.length; u++) {
var h = l[u];
if (!e || a(h.type, e)) {
s.push(h.uuid);
i && i.push(c);
} else 0;
} else if (!e || a(l.type, e)) {
s.push(l.uuid);
i && i.push(c);
} else 0;
}
0;
return s;
};
c.add = function(t, e, i, r) {
t = t.substring(0, t.length - cc.path.extname(t).length);
var a = new s(e, i);
n(this._pathToUuid, t, a, r);
};
c._getInfo_DEBUG = !1;
c.reset = function() {
this._pathToUuid = r.createMap(!0);
};
e.exports = a;
}), {
"../platform/js": 112,
"../utils/misc": 153
} ],
73: [ (function(t, e, i) {
"use strict";
var n = t("../platform/CCSys"), r = t("../CCDebug"), s = n.__audioSupport, a = s.format, o = s.context;
function c(t, e) {
var i = document.createElement("audio");
i.src = t.url;
var n = function() {
clearTimeout(r);
i.removeEventListener("canplaythrough", a, !1);
i.removeEventListener("error", o, !1);
s.USE_LOADER_EVENT && i.removeEventListener(s.USE_LOADER_EVENT, a, !1);
}, r = setTimeout((function() {
0 === i.readyState ? o() : a();
}), 8e3), a = function() {
n();
e(null, i);
}, o = function() {
n();
var i = "load audio failure - " + t.url;
cc.log(i);
e(i);
};
i.addEventListener("canplaythrough", a, !1);
i.addEventListener("error", o, !1);
s.USE_LOADER_EVENT && i.addEventListener(s.USE_LOADER_EVENT, a, !1);
}
function l(t, e) {
o || e(new Error(r.getError(4926)));
var i = cc.loader.getXMLHttpRequest();
i.open("GET", t.url, !0);
i.responseType = "arraybuffer";
i.onload = function() {
o.decodeAudioData(i.response, (function(t) {
e(null, t);
}), (function() {
e("decode error - " + t.id, null);
}));
};
i.onerror = function() {
e("request error - " + t.id, null);
};
i.send();
}
e.exports = function(t, e) {
if (0 === a.length) return new Error(r.getError(4927));
var i;
i = s.WEB_AUDIO ? t._owner instanceof cc.AudioClip ? t._owner.loadMode === cc.AudioClip.LoadMode.WEB_AUDIO ? l : c : t.urlParam && t.urlParam.useDom ? c : l : c;
i(t, e);
};
}), {
"../CCDebug": 3,
"../platform/CCSys": 101
} ],
74: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js");
function r(t, e) {
var i = cc.loader.getItem(t);
if (i) {
var n = i.dependKeys;
if (n) for (var s = 0; s < n.length; s++) {
var a = n[s];
if (!e[a]) {
e[a] = !0;
r(a, e);
}
}
}
}
function s(t, e) {
if (t._uuid) {
var i = cc.loader._getReferenceKey(t);
if (!e[i]) {
e[i] = !0;
r(i, e);
}
}
}
function a(t, e) {
for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
var r = t[i[n]];
if ("object" == typeof r && r) if (Array.isArray(r)) for (var a = 0; a < r.length; a++) {
var o = r[a];
o instanceof cc.RawAsset && s(o, e);
} else if (r.constructor && r.constructor !== Object) r instanceof cc.RawAsset && s(r, e); else for (var c = Object.getOwnPropertyNames(r), l = 0; l < c.length; l++) {
var u = r[c[l]];
u instanceof cc.RawAsset && s(u, e);
}
}
}
function o(t, e) {
for (var i = 0; i < t._components.length; i++) a(t._components[i], e);
for (var n = 0; n < t._children.length; n++) o(t._children[n], e);
}
e.exports = {
autoRelease: function(t, e, i) {
var r = cc.loader._autoReleaseSetting, s = n.createMap();
if (e) for (var a = 0; a < e.length; a++) s[e[a]] = !0;
for (var c = 0; c < i.length; c++) o(i[c], s);
if (t) for (var l = 0; l < t.length; l++) {
var u = t[l];
!1 === r[u] || s[u] || cc.loader.release(u);
}
for (var h = Object.keys(r), f = 0; f < h.length; f++) {
var _ = h[f];
!0 !== r[_] || s[_] || cc.loader.release(_);
}
},
getDependsRecursively: function(t) {
var e = {};
r(t, e);
return Object.keys(e);
}
};
}), {
"../platform/js": 112
} ],
75: [ (function(t, e, i) {
"use strict";
e.exports = function(t, e) {
var i = t.url, n = cc.loader.getXMLHttpRequest(), r = "Load binary data failed: " + i;
n.open("GET", i, !0);
n.responseType = "arraybuffer";
n.onload = function() {
var t = n.response;
if (t) {
var i = new Uint8Array(t);
e(null, i);
} else e({
status: n.status,
errorMessage: r + "(no response)"
});
};
n.onerror = function() {
e({
status: n.status,
errorMessage: r + "(error)"
});
};
n.ontimeout = function() {
e({
status: n.status,
errorMessage: r + "(time out)"
});
};
n.send(null);
};
}), {} ],
76: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("../CCDebug");
t("../utils/CCPath");
var s, a = t("./pipeline"), o = t("./pack-downloader"), c = t("./binary-downloader"), l = t("./text-downloader"), u = t("./utils").urlAppendTimestamp;
function h() {
return null;
}
function f(t, e, i) {
var n = t.url, s = document, a = document.createElement("script");
"file:" !== window.location.protocol && (a.crossOrigin = "anonymous");
a.async = i;
a.src = u(n);
function o() {
a.parentNode.removeChild(a);
a.removeEventListener("load", o, !1);
a.removeEventListener("error", c, !1);
e(null, n);
}
function c() {
a.parentNode.removeChild(a);
a.removeEventListener("load", o, !1);
a.removeEventListener("error", c, !1);
e(new Error(r.getError(4928, n)));
}
a.addEventListener("load", o, !1);
a.addEventListener("error", c, !1);
s.body.appendChild(a);
}
function _(t, e, i, n) {
void 0 === i && (i = !0);
var s = u(t.url);
n = n || new Image();
i && "file:" !== window.location.protocol ? n.crossOrigin = "anonymous" : n.crossOrigin = null;
if (n.complete && n.naturalWidth > 0 && n.src === s) return n;
var a = function i() {
n.removeEventListener("load", i);
n.removeEventListener("error", o);
n.id = t.id;
e(null, n);
}, o = function i() {
n.removeEventListener("load", a);
n.removeEventListener("error", i);
"https:" !== window.location.protocol && n.crossOrigin && "anonymous" === n.crossOrigin.toLowerCase() ? _(t, e, !1, n) : e(new Error(r.getError(4930, s)));
};
n.addEventListener("load", a);
n.addEventListener("error", o);
n.src = s;
}
function d(t, e) {
e(null, t.url);
}
var p = {
js: f,
png: _,
jpg: _,
bmp: _,
jpeg: _,
gif: _,
ico: _,
tiff: _,
webp: _,
image: _,
pvr: c,
pkm: c,
mp3: s = t("./audio-downloader"),
ogg: s,
wav: s,
m4a: s,
txt: l,
xml: l,
vsh: l,
fsh: l,
atlas: l,
tmx: l,
tsx: l,
json: l,
ExportJson: l,
plist: l,
fnt: l,
font: h,
eot: h,
ttf: h,
woff: h,
svg: h,
ttc: h,
uuid: function(t, e) {
var i = o.load(t, e);
return void 0 === i ? this.extMap.json(t, e) : i || void 0;
},
binary: c,
bin: c,
dbbin: c,
skel: c,
mp4: d,
avi: d,
mov: d,
mpg: d,
mpeg: d,
rm: d,
rmvb: d,
default: l
}, v = "Downloader", g = function(t) {
this.id = v;
this.async = !0;
this.pipeline = null;
this._curConcurrent = 0;
this._loadQueue = [];
this._subpackages = {};
this.extMap = n.mixin(t, p);
};
g.ID = v;
g.PackDownloader = o;
g.prototype.addHandlers = function(t) {
n.mixin(this.extMap, t);
};
g.prototype._handleLoadQueue = function() {
for (;this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT; ) {
var t = this._loadQueue.shift();
if (!t) break;
var e = this.handle(t.item, t.callback);
void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e));
}
};
g.prototype.handle = function(t, e) {
var i = this, n = this.extMap[t.type] || this.extMap.default, r = void 0;
if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
this._curConcurrent++;
if (void 0 !== (r = n.call(this, t, (function(t, n) {
i._curConcurrent = Math.max(0, i._curConcurrent - 1);
i._handleLoadQueue();
e && e(t, n);
})))) {
this._curConcurrent = Math.max(0, this._curConcurrent - 1);
this._handleLoadQueue();
return r;
}
} else if (t.ignoreMaxConcurrency) {
if (void 0 !== (r = n.call(this, t, e))) return r;
} else this._loadQueue.push({
item: t,
callback: e
});
};
g.prototype.loadSubpackage = function(t, e, i) {
if (!i && e) {
i = e;
e = null;
}
var n = this._subpackages[t];
n ? n.loaded ? i && i() : f({
url: n.path + "index.js"
}, (function(t) {
t || (n.loaded = !0);
i && i(t);
})) : i && i(new Error("Can't find subpackage " + t));
};
a.Downloader = e.exports = g;
}), {
"../CCDebug": 3,
"../platform/js": 112,
"../utils/CCPath": 145,
"./audio-downloader": 73,
"./binary-downloader": 75,
"./pack-downloader": 82,
"./pipeline": 83,
"./text-downloader": 86,
"./utils": 88
} ],
77: [ (function(t, e, i) {
"use strict";
var n = t("../utils/text-utils"), r = null, s = "BES bswy:->@123丁ぁᄁ", a = {}, o = -1, c = [], l = 3e3, u = (function() {
var t = void 0;
return function() {
if (void 0 === t) if (window.FontFace) {
var e = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), i = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
t = e ? parseInt(e[1], 10) > 42 : !i;
} else t = !1;
return t;
};
})();
function h() {
for (var t = !0, e = Date.now(), i = c.length - 1; i >= 0; i--) {
var a = c[i], u = a.fontFamilyName;
if (e - a.startTime > l) {
cc.warnID(4933, u);
a.callback(null, u);
c.splice(i, 1);
} else {
var h = a.refWidth, f = "40px " + u;
r.font = f;
if (h !== n.safeMeasureText(r, s, f)) {
c.splice(i, 1);
a.callback(null, u);
} else t = !1;
}
}
if (t) {
clearInterval(o);
o = -1;
}
}
function f(t, e, i) {
var n = new Promise(function(i, n) {
(function r() {
Date.now() - t >= l ? n() : document.fonts.load("40px " + e).then((function(t) {
t.length >= 1 ? i() : setTimeout(r, 100);
}), (function() {
n();
}));
})();
}), r = null, s = new Promise(function(t, e) {
r = setTimeout(e, l);
});
Promise.race([ s, n ]).then((function() {
if (r) {
clearTimeout(r);
r = null;
}
i(null, e);
}), (function() {
cc.warnID(4933, e);
i(null, e);
}));
}
var _ = {
loadFont: function(t, e) {
var i = t.url, l = _._getFontFamily(i);
if (a[l]) return l;
if (!r) {
var d = document.createElement("canvas");
d.width = 100;
d.height = 100;
r = d.getContext("2d");
}
var p = "40px " + l;
r.font = p;
var v = n.safeMeasureText(r, s, p), g = document.createElement("style");
g.type = "text/css";
var m = "";
isNaN(l - 0) ? m += "@font-face { font-family:" + l + "; src:" : m += "@font-face { font-family:'" + l + "'; src:";
m += "url('" + i + "');";
g.textContent = m + "}";
document.body.appendChild(g);
var y = document.createElement("div"), E = y.style;
E.fontFamily = l;
y.innerHTML = ".";
E.position = "absolute";
E.left = "-100px";
E.top = "-100px";
document.body.appendChild(y);
if (u()) f(Date.now(), l, e); else {
var C = {
fontFamilyName: l,
refWidth: v,
callback: e,
startTime: Date.now()
};
c.push(C);
-1 === o && (o = setInterval(h, 100));
}
a[l] = g;
},
_getFontFamily: function(t) {
var e = t.lastIndexOf(".ttf");
if (-1 === e) return t;
var i, n = t.lastIndexOf("/");
-1 !== (i = -1 === n ? t.substring(0, e) + "_LABEL" : t.substring(n + 1, e) + "_LABEL").indexOf(" ") && (i = '"' + i + '"');
return i;
}
};
e.exports = _;
}), {
"../utils/text-utils": 160
} ],
78: [ (function(t, e, i) {
"use strict";
t("./downloader");
t("./loader");
t("./loading-items");
t("./pipeline");
t("./CCLoader");
}), {
"./CCLoader": 70,
"./downloader": 76,
"./loader": 79,
"./loading-items": 80,
"./pipeline": 83
} ],
79: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("../platform/CCSAXParser").plistParser, s = t("./pipeline"), a = t("../assets/CCTexture2D"), o = t("./uuid-loader"), c = t("./font-loader");
function l(t) {
if ("string" != typeof t.content) return new Error("JSON Loader: Input item doesn't contain string content");
try {
return JSON.parse(t.content);
} catch (e) {
return new Error("JSON Loader: Parse json [" + t.id + "] failed : " + e);
}
}
function u(t) {
if (t._owner instanceof cc.Asset) return null;
var e = t.content;
if (cc.sys.platform !== cc.sys.FB_PLAYABLE_ADS && !(e instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
var i = t.texture || new a();
i._uuid = t.uuid;
i.url = t.url;
i._setRawAsset(t.rawUrl, !1);
i._nativeAsset = e;
return i;
}
function h(t, e) {
if (t._owner instanceof cc.Asset) return null;
var i = new cc.AudioClip();
i._setRawAsset(t.rawUrl, !1);
i._nativeAsset = t.content;
i.url = t.url;
return i;
}
function f(t) {
return t.load ? t.load(t.content) : null;
}
var _ = 13, d = 55727696, p = 0, v = 6, g = 7, m = 12;
var y = 16, E = 6, C = 8, A = 10, T = 12, x = 14, S = 0, b = 1, R = 3;
function L(t, e) {
return t[e] << 8 | t[e + 1];
}
var w = {
png: u,
jpg: u,
bmp: u,
jpeg: u,
gif: u,
ico: u,
tiff: u,
webp: u,
image: u,
pvr: function(t) {
var e = t.content instanceof ArrayBuffer ? t.content : t.content.buffer, i = new Int32Array(e, 0, _);
if (i[p] != d) return new Error("Invalid magic number in PVR header");
var n = i[g], r = i[v], s = i[m] + 52;
return {
_data: new Uint8Array(e, s),
_compressed: !0,
width: n,
height: r
};
},
pkm: function(t) {
var e = t.content instanceof ArrayBuffer ? t.content : t.content.buffer, i = new Uint8Array(e), n = L(i, E);
if (n !== S && n !== b && n !== R) return new Error("Invalid magic number in ETC header");
var r = L(i, T), s = L(i, x);
L(i, C), L(i, A);
return {
_data: new Uint8Array(e, y),
_compressed: !0,
width: r,
height: s
};
},
mp3: h,
ogg: h,
wav: h,
m4a: h,
json: l,
ExportJson: l,
plist: function(t) {
if ("string" != typeof t.content) return new Error("Plist Loader: Input item doesn't contain string content");
var e = r.parse(t.content);
return e || new Error("Plist Loader: Parse [" + t.id + "] failed");
},
uuid: o,
prefab: o,
fire: o,
scene: o,
binary: f,
dbbin: f,
bin: f,
skel: f,
font: c.loadFont,
eot: c.loadFont,
ttf: c.loadFont,
woff: c.loadFont,
svg: c.loadFont,
ttc: c.loadFont,
default: function() {
return null;
}
}, I = function(t) {
this.id = "Loader";
this.async = !0;
this.pipeline = null;
this.extMap = n.mixin(t, w);
};
I.ID = "Loader";
I.prototype.addHandlers = function(t) {
this.extMap = n.mixin(this.extMap, t);
};
I.prototype.handle = function(t, e) {
return (this.extMap[t.type] || this.extMap.default).call(this, t, e);
};
s.Loader = e.exports = I;
}), {
"../assets/CCTexture2D": 25,
"../platform/CCSAXParser": 99,
"../platform/js": 112,
"./font-loader": 77,
"./pipeline": 83,
"./uuid-loader": 89
} ],
80: [ (function(t, e, i) {
"use strict";
var n = t("../platform/callbacks-invoker");
t("../utils/CCPath");
var r = t("../platform/js"), s = 0 | 998 * Math.random(), a = r.createMap(!0), o = [], c = {
WORKING: 1,
COMPLETE: 2,
ERROR: 3
}, l = r.createMap(!0);
function u(t) {
return "string" == typeof (t.url || t);
}
function h(t) {
if (t) {
var e = t.split("?");
if (e && e[0] && e[1]) {
var i = {};
e[1].split("&").forEach((function(t) {
var e = t.split("=");
i[e[0]] = e[1];
}));
return i;
}
}
}
function f(t, e) {
var i = "object" == typeof t ? t.url : t, n = {
queueId: e,
id: i,
url: i,
rawUrl: void 0,
urlParam: h(i),
type: "",
error: null,
content: null,
complete: !1,
states: {},
deps: null
};
if ("object" == typeof t) {
r.mixin(n, t);
if (t.skips) for (var s = 0; s < t.skips.length; s++) {
var a = t.skips[s];
n.states[a] = c.COMPLETE;
}
}
n.rawUrl = n.url;
i && !n.type && (n.type = cc.path.extname(i).toLowerCase().substr(1));
return n;
}
var _ = [];
function d(t, e, i) {
if (!t || !e) return !1;
var n = !1;
_.push(e.id);
if (e.deps) {
var r, s, a = e.deps;
for (r = 0; r < a.length; r++) {
if ((s = a[r]).id === t.id) {
n = !0;
break;
}
if (!(_.indexOf(s.id) >= 0) && (s.deps && d(t, s, !0))) {
n = !0;
break;
}
}
}
i || (_.length = 0);
return n;
}
var p = function(t, e, i, o) {
n.call(this);
this._id = ++s;
a[this._id] = this;
this._pipeline = t;
this._errorUrls = r.createMap(!0);
this._appending = !1;
this._ownerQueue = null;
this.onProgress = i;
this.onComplete = o;
this.map = r.createMap(!0);
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
this._pipeline ? this.active = !0 : this.active = !1;
e && (e.length > 0 ? this.append(e) : this.allComplete());
};
p.ItemState = new cc.Enum(c);
p.create = function(t, e, i, n) {
if (void 0 === i) {
if ("function" == typeof e) {
n = e;
e = i = null;
}
} else if (void 0 === n) if ("function" == typeof e) {
n = i;
i = e;
e = null;
} else {
n = i;
i = null;
}
var r = o.pop();
if (r) {
r._pipeline = t;
r.onProgress = i;
r.onComplete = n;
a[r._id] = r;
r._pipeline && (r.active = !0);
e && r.append(e);
} else r = new p(t, e, i, n);
return r;
};
p.getQueue = function(t) {
return t.queueId ? a[t.queueId] : null;
};
p.itemComplete = function(t) {
var e = a[t.queueId];
e && e.itemComplete(t.id);
};
p.initQueueDeps = function(t) {
var e = l[t._id];
if (e) {
e.completed.length = 0;
e.deps.length = 0;
} else e = l[t._id] = {
completed: [],
deps: []
};
};
p.registerQueueDep = function(t, e) {
var i = t.queueId || t;
if (!i) return !1;
var n = l[i];
if (n) -1 === n.deps.indexOf(e) && n.deps.push(e); else if (t.id) for (var r in l) {
var s = l[r];
-1 !== s.deps.indexOf(t.id) && -1 === s.deps.indexOf(e) && s.deps.push(e);
}
};
p.finishDep = function(t) {
for (var e in l) {
var i = l[e];
-1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t);
}
};
var v = p.prototype;
r.mixin(v, n.prototype);
v.append = function(t, e) {
if (!this.active) return [];
e && !e.deps && (e.deps = []);
this._appending = !0;
var i, n, r, s = [];
for (i = 0; i < t.length; ++i) if (!(n = t[i]).queueId || this.map[n.id]) {
if (u(n)) {
var o = (r = f(n, this._id)).id;
if (!this.map[o]) {
this.map[o] = r;
this.totalCount++;
e && e.deps.push(r);
p.registerQueueDep(e || this._id, o);
s.push(r);
}
}
} else {
this.map[n.id] = n;
e && e.deps.push(n);
if (n.complete || d(e, n)) {
this.totalCount++;
this.itemComplete(n.id);
continue;
}
var c = this, l = a[n.queueId];
if (l) {
this.totalCount++;
p.registerQueueDep(e || this._id, n.id);
l.addListener(n.id, (function(t) {
c.itemComplete(t.id);
}));
}
}
this._appending = !1;
this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(s);
return s;
};
v._childOnProgress = function(t) {
if (this.onProgress) {
var e = l[this._id];
this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t);
}
};
v.allComplete = function() {
var t = r.isEmptyObject(this._errorUrls) ? null : this._errorUrls;
this.onComplete && this.onComplete(t, this);
};
v.isCompleted = function() {
return this.completedCount >= this.totalCount;
};
v.isItemCompleted = function(t) {
return !!this.completed[t];
};
v.exists = function(t) {
return !!this.map[t];
};
v.getContent = function(t) {
var e = this.map[t], i = null;
e && (e.content ? i = e.content : e.alias && (i = e.alias.content));
return i;
};
v.getError = function(t) {
var e = this.map[t], i = null;
e && (e.error ? i = e.error : e.alias && (i = e.alias.error));
return i;
};
v.addListener = n.prototype.on;
v.hasListener = n.prototype.hasEventListener;
v.removeListener = n.prototype.off;
v.removeAllListeners = n.prototype.removeAll;
v.removeItem = function(t) {
var e = this.map[t];
if (e && this.completed[e.alias || t]) {
delete this.completed[t];
delete this.map[t];
if (e.alias) {
delete this.completed[e.alias.id];
delete this.map[e.alias.id];
}
this.completedCount--;
this.totalCount--;
}
};
v.itemComplete = function(t) {
var e = this.map[t];
if (e) {
var i = t in this._errorUrls;
e.error instanceof Error || r.isString(e.error) ? this._errorUrls[t] = e.error : e.error ? r.mixin(this._errorUrls, e.error) : !e.error && i && delete this._errorUrls[t];
this.completed[t] = e;
this.completedCount++;
p.finishDep(e.id);
if (this.onProgress) {
var n = l[this._id];
this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e);
}
this.emit(t, e);
this.removeAll(t);
!this._appending && this.completedCount >= this.totalCount && this.allComplete();
}
};
v.destroy = function() {
this.active = !1;
this._appending = !1;
this._pipeline = null;
this._ownerQueue = null;
r.clear(this._errorUrls);
this.onProgress = null;
this.onComplete = null;
this.map = r.createMap(!0);
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
n.call(this);
if (l[this._id]) {
l[this._id].completed.length = 0;
l[this._id].deps.length = 0;
}
delete a[this._id];
delete l[this._id];
-1 === o.indexOf(this) && o.length < 10 && o.push(this);
};
cc.LoadingItems = e.exports = p;
}), {
"../platform/callbacks-invoker": 105,
"../platform/js": 112,
"../utils/CCPath": 145
} ],
81: [ (function(t, e, i) {
"use strict";
var n = t("./pipeline"), r = "MD5Pipe", s = /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/, a = function(t, e, i) {
this.id = r;
this.async = !1;
this.pipeline = null;
this.md5AssetsMap = t;
this.md5NativeAssetsMap = e;
this.libraryBase = i;
};
a.ID = r;
a.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return null;
};
a.prototype.transformURL = function(t) {
var e = !t.startsWith(this.libraryBase) ? this.md5NativeAssetsMap : this.md5AssetsMap;
return t = t.replace(s, (function(t, i) {
var n = e[i];
return n ? t + "." + n : t;
}));
};
n.MD5Pipe = e.exports = a;
}), {
"./pipeline": 83
} ],
82: [ (function(t, e, i) {
"use strict";
var n = t("./unpackers"), r = t("../utils/misc").pushToMap, s = {
Invalid: 0,
Removed: 1,
Downloading: 2,
Loaded: 3
};
function a() {
this.unpacker = null;
this.state = s.Invalid;
this.duration = 0;
}
var o = {}, c = {}, l = {}, u = [], h = null;
function f(t, e) {
return new Error("Can not retrieve " + t + " from packer " + e);
}
e.exports = {
msToRelease: 12e4,
initPacks: function(t) {
c = t;
o = {};
for (var e in t) for (var i = t[e], n = 0; n < i.length; n++) {
var s = i[n], a = 1 === i.length;
r(o, s, e, a);
}
},
_loadNewPack: function(t, e, i) {
var n = this, r = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
cc.loader.load({
url: r,
ignoreMaxConcurrency: !0
}, (function(s, a) {
if (s) {
cc.errorID(4916, t);
return i(s);
}
l[e].url = r;
var o = n._doLoadNewPack(t, e, a);
o ? i(null, o) : i(f(t, e));
}));
},
_doPreload: function(t, e) {
var i = l[t];
i || ((i = l[t] = new a()).state = s.Downloading);
if (i.state !== s.Loaded) {
i.unpacker = new n.JsonUnpacker();
i.unpacker.load(c[t], e);
i.state = s.Loaded;
}
},
_doLoadNewPack: function(t, e, i) {
var r = l[e];
if (r.state !== s.Loaded) {
"string" == typeof i && (i = JSON.parse(i));
Array.isArray(i) ? r.unpacker = new n.JsonUnpacker() : i.type === n.TextureUnpacker.ID && (r.unpacker = new n.TextureUnpacker());
r.unpacker.load(c[e], i);
r.state = s.Loaded;
r.duration = 0;
u.push(e);
var a = this;
h || (h = setInterval((function() {
for (var t = a.msToRelease / 5e3, e = u.length - 1; e >= 0; e--) {
var i = u[e];
++l[i].duration > t && a.release(i);
}
if (0 === u.length) {
clearInterval(h);
h = null;
}
}), 5e3));
}
return r.unpacker.retrieve(t);
},
_selectLoadedPack: function(t) {
for (var e = s.Invalid, i = "", n = 0; n < t.length; n++) {
var r = t[n], a = l[r];
if (a) {
var o = a.state;
if (o === s.Loaded) return r;
if (o > e) {
e = o;
i = r;
}
}
}
return e !== s.Invalid ? i : t[0];
},
load: function(t, e) {
var i = t.uuid, n = o[i];
if (n) {
Array.isArray(n) && (n = this._selectLoadedPack(n));
var r = l[n];
if (r && r.state === s.Loaded) {
r.duration = 0;
var c = r.unpacker.retrieve(i);
return c || f(i, n);
}
if (!r) {
console.log("Create unpacker %s for %s", n, i);
(r = l[n] = new a()).state = s.Downloading;
}
this._loadNewPack(i, n, e);
return null;
}
},
release: function(t) {
var e = l[t];
if (e) {
cc.loader.release(e.url);
delete l[t];
cc.js.array.fastRemove(u, t);
}
}
};
0;
}), {
"../utils/misc": 153,
"./unpackers": 87
} ],
83: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("./loading-items"), s = r.ItemState;
function a(t, e) {
var i = t.id, n = e.states[i], r = t.next, o = t.pipeline;
if (!e.error && n !== s.WORKING && n !== s.ERROR) if (n === s.COMPLETE) r ? a(r, e) : o.flowOut(e); else {
e.states[i] = s.WORKING;
var c = t.handle(e, (function(t, n) {
if (t) {
e.error = t;
e.states[i] = s.ERROR;
o.flowOut(e);
} else {
n && (e.content = n);
e.states[i] = s.COMPLETE;
r ? a(r, e) : o.flowOut(e);
}
}));
if (c instanceof Error) {
e.error = c;
e.states[i] = s.ERROR;
o.flowOut(e);
} else if (void 0 !== c) {
null !== c && (e.content = c);
e.states[i] = s.COMPLETE;
r ? a(r, e) : o.flowOut(e);
}
}
}
var o = function(t) {
this._pipes = t;
this._cache = n.createMap(!0);
for (var e = 0; e < t.length; ++e) {
var i = t[e];
if (i.handle && i.id) {
i.pipeline = this;
i.next = e < t.length - 1 ? t[e + 1] : null;
}
}
};
o.ItemState = s;
var c = o.prototype;
c.insertPipe = function(t, e) {
if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921); else if (this._pipes.indexOf(t) > 0) cc.warnID(4922); else {
t.pipeline = this;
var i = null;
e < this._pipes.length && (i = this._pipes[e]);
var n = null;
e > 0 && (n = this._pipes[e - 1]);
n && (n.next = t);
t.next = i;
this._pipes.splice(e, 0, t);
}
};
c.insertPipeAfter = function(t, e) {
var i = this._pipes.indexOf(t);
i < 0 || this.insertPipe(e, i + 1);
};
c.appendPipe = function(t) {
if (t.handle && t.id) {
t.pipeline = this;
t.next = null;
this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t);
this._pipes.push(t);
}
};
c.flowIn = function(t) {
var e, i, n = this._pipes[0];
if (n) {
for (e = 0; e < t.length; e++) {
i = t[e];
this._cache[i.id] = i;
}
for (e = 0; e < t.length; e++) a(n, i = t[e]);
} else for (e = 0; e < t.length; e++) this.flowOut(t[e]);
};
c.flowInDeps = function(t, e, i) {
return r.create(this, (function(t, e) {
i(t, e);
e.destroy();
})).append(e, t);
};
c.flowOut = function(t) {
t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t);
t.complete = !0;
r.itemComplete(t);
};
c.copyItemStates = function(t, e) {
if (e instanceof Array) for (var i = 0; i < e.length; ++i) e[i].states = t.states; else e.states = t.states;
};
c.getItem = function(t) {
var e = this._cache[t];
if (!e) return e;
e.alias && (e = e.alias);
return e;
};
c.removeItem = function(t) {
var e = this._cache[t];
e && e.complete && delete this._cache[t];
return e;
};
c.clear = function() {
for (var t in this._cache) {
var e = this._cache[t];
delete this._cache[t];
if (!e.complete) {
e.error = new Error("Canceled manually");
this.flowOut(e);
}
}
};
cc.Pipeline = e.exports = o;
}), {
"../platform/js": 112,
"./loading-items": 80
} ],
84: [ (function(t, e, i) {
"use strict";
}), {
"../platform/js": 112
} ],
85: [ (function(t, e, i) {
"use strict";
var n = t("./pipeline"), r = "SubPackPipe", s = /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/;
function a(t) {
var e = t.match(s);
return e ? e[1] : "";
}
var o = Object.create(null), c = function(t) {
this.id = r;
this.async = !1;
this.pipeline = null;
for (var e in t) {
var i = t[e];
i.uuids && i.uuids.forEach((function(t) {
o[t] = i.path;
}));
}
};
c.ID = r;
c.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return null;
};
c.prototype.transformURL = function(t) {
var e = a(t);
if (e) {
var i = o[e];
if (i) return t.replace("res/raw-assets/", i + "raw-assets/");
}
return t;
};
n.SubPackPipe = e.exports = c;
}), {
"./pipeline": 83
} ],
86: [ (function(t, e, i) {
"use strict";
var n = t("./utils").urlAppendTimestamp;
e.exports = function(t, e) {
var i = t.url;
i = n(i);
var r = cc.loader.getXMLHttpRequest(), s = "Load text file failed: " + i;
r.open("GET", i, !0);
r.overrideMimeType && r.overrideMimeType("text/plain; charset=utf-8");
r.onload = function() {
4 === r.readyState ? 200 === r.status || 0 === r.status ? e(null, r.responseText) : e({
status: r.status,
errorMessage: s + "(wrong status)"
}) : e({
status: r.status,
errorMessage: s + "(wrong readyState)"
});
};
r.onerror = function() {
e({
status: r.status,
errorMessage: s + "(error)"
});
};
r.ontimeout = function() {
e({
status: r.status,
errorMessage: s + "(time out)"
});
};
r.send(null);
};
}), {
"./utils": 88
} ],
87: [ (function(t, e, i) {
"use strict";
var n = t("../assets/CCTexture2D"), r = t("../platform/js");
function s() {
this.jsons = {};
}
s.prototype.load = function(t, e) {
e.length !== t.length && cc.errorID(4915);
for (var i = 0; i < t.length; i++) {
var n = t[i], r = e[i];
this.jsons[n] = r;
}
};
s.prototype.retrieve = function(t) {
return this.jsons[t] || null;
};
function a() {
this.contents = {};
}
a.ID = r._getClassId(n);
a.prototype.load = function(t, e) {
var i = e.data.split("|");
i.length !== t.length && cc.errorID(4915);
for (var n = 0; n < t.length; n++) this.contents[t[n]] = i[n];
};
a.prototype.retrieve = function(t) {
var e = this.contents[t];
return e ? {
__type__: a.ID,
content: e
} : null;
};
0;
e.exports = {
JsonUnpacker: s,
TextureUnpacker: a
};
}), {
"../assets/CCTexture2D": 25,
"../platform/js": 112
} ],
88: [ (function(t, e, i) {
"use strict";
var n = /\?/;
e.exports = {
urlAppendTimestamp: function(t) {
cc.game.config.noCache && "string" == typeof t && (n.test(t) ? t += "&_t=" + (new Date() - 0) : t += "?_t=" + (new Date() - 0));
return t;
}
};
}), {} ],
89: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = t("../CCDebug");
t("../platform/deserialize");
var s = t("./loading-items");
function a(t) {
return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__);
}
function o(t, e, i, n) {
var r, s, a, o = i.uuidList, c = i.uuidObjList, l = i.uuidPropList, u = i._stillUseUrl, h = t.dependKeys = [];
if (n) {
r = [];
for (s = 0; s < o.length; s++) {
a = o[s];
var f = c[s], _ = l[s], d = cc.AssetLibrary._getAssetInfoInRuntime(a);
if (d.raw) {
var p = d.url;
f[_] = p;
h.push(p);
} else r.push({
type: "uuid",
uuid: a,
deferredLoadRaw: !0,
_owner: f,
_ownerProp: _,
_stillUseUrl: u[s]
});
}
} else {
r = new Array(o.length);
for (s = 0; s < o.length; s++) {
a = o[s];
r[s] = {
type: "uuid",
uuid: a,
_owner: c[s],
_ownerProp: l[s],
_stillUseUrl: u[s]
};
}
e._native && !e.constructor.preventPreloadNativeObject && r.push({
url: e.nativeUrl,
_owner: e,
_ownerProp: "_nativeAsset"
});
}
return r;
}
function c(t, e, i, n, r) {
e.content = i;
var a = e.dependKeys;
t.flowInDeps(e, n, (function(t, e) {
var o, c = e.map;
for (var l in c) (o = c[l]).uuid && o.content && (o.content._uuid = o.uuid);
function u(t) {
var e = t.content;
this._stillUseUrl && (e = e && cc.RawAsset.wasRawAssetType(e.constructor) ? e.nativeUrl : t.rawUrl);
"_nativeAsset" === this._ownerProp && (this._owner.url = t.url);
this._owner[this._ownerProp] = e;
t.uuid !== i._uuid && a.indexOf(t.id) < 0 && a.push(t.id);
}
for (var h = 0; h < n.length; h++) {
var f = n[h], _ = f.uuid, d = f.url;
f._owner, f._ownerProp;
if (o = c[d]) {
var p = f;
if (o.complete || o.content) if (o.error) {
cc._throw(o.error.message || o.error.errorMessage || o.error);
} else u.call(p, o); else {
var v = s.getQueue(o), g = v._callbackTable[_];
g ? g.unshift(u, p) : v.addListener(_, u, p);
}
}
}
if (!t && i.onLoad) try {
i.onLoad();
} catch (t) {
cc._throw(t);
}
r(t, i);
}));
}
function l(t, e, i) {
0;
var n = e.deferredLoadRaw;
n ? t instanceof cc.Asset && t.constructor.preventDeferredLoadDependents && (n = !1) : i && (t instanceof cc.SceneAsset || t instanceof cc.Prefab) && (n = t.asyncLoadAssets);
return n;
}
function u(t, e) {
var i, s;
if ("string" == typeof t.content) try {
i = JSON.parse(t.content);
} catch (e) {
return new Error(r.getError(4923, t.id, e.stack));
} else {
if ("object" != typeof t.content) return new Error(r.getError(4924));
i = t.content;
}
var u = a(i);
s = u ? cc._MissingScript.safeFindClass : function(t) {
var e = n._getClassById(t);
if (e) return e;
cc.warnID(4903, t);
return Object;
};
var h, f = cc.deserialize.Details.pool.get();
try {
h = cc.deserialize(i, f, {
classFinder: s,
target: t.existingAsset,
customEnv: t
});
} catch (e) {
cc.deserialize.Details.pool.put(f);
var _ = e + "\n" + e.stack;
return new Error(r.getError(4925, t.id, _));
}
h._uuid = t.uuid;
h.url = h.nativeUrl;
0;
var d = o(t, h, f, l(h, t, u));
cc.deserialize.Details.pool.put(f);
if (0 === d.length) {
h.onLoad && h.onLoad();
return e(null, h);
}
c(this.pipeline, t, h, d, e);
}
e.exports = u;
u.isSceneObj = a;
}), {
"../CCDebug": 3,
"../platform/deserialize": 107,
"../platform/js": 112,
"./loading-items": 80
} ],
90: [ (function(t, e, i) {
"use strict";
var n = t("./component-scheduler"), r = t("./platform/CCObject").Flags, s = t("./platform/js"), a = r.IsPreloadStarted, o = r.IsOnLoadStarted, c = r.IsOnLoadCalled, l = r.Deactivating, u = cc.Class({
extends: n.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
n.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), h = n.createInvokeImpl("c.__preload();"), f = n.createInvokeImpl("c.onLoad();c._objFlags|=" + c, !1, c), _ = new s.Pool(4);
_.get = function() {
var t = this._get() || {
preload: new u(h),
onLoad: new n.OneOffInvoker(f),
onEnable: new n.OneOffInvoker(n.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
function d(t, e, i) {
0;
e ? t._removeComponent(e) : s.array.removeAt(t._components, i);
}
function p() {
this._activatingStack = [];
}
var v = cc.Class({
ctor: p,
reset: p,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & l) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var r = t._components.length, s = 0; s < r; ++s) {
var a = t._components[s];
if (a instanceof cc.Component) this.activateComp(a, e, i, n); else {
d(t, a, s);
--s;
--r;
}
}
t._childArrivalOrder = t._children.length;
for (var o = 0, c = t._children.length; o < c; ++o) {
var u = t._children[o];
u._localZOrder = 4294901760 & u._localZOrder | o + 1;
u._active && this._activateNodeRecursively(u, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
0;
t._objFlags |= l;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~l;
return;
}
}
}
for (var r = 0, s = t._children.length; r < s; ++r) {
var a = t._children[r];
if (a._activeInHierarchy) {
this._deactivateNodeRecursively(a);
if (t._activeInHierarchy) {
t._objFlags &= ~l;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~l;
},
activateNode: function(t, e) {
if (e) {
var i = _.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
_.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, r = 0; r < n.length; r++) {
var s = n[r];
s.preload.cancelInactive(a);
s.onLoad.cancelInactive(o);
s.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(t, e, i, n) {
if (cc.isValid(t, !0)) {
if (!(t._objFlags & a)) {
t._objFlags |= a;
t.__preload && (e ? e.add(t) : t.__preload());
}
if (!(t._objFlags & o)) {
t._objFlags |= o;
if (t.onLoad) if (i) i.add(t); else {
t.onLoad();
t._objFlags |= c;
} else t._objFlags |= c;
}
if (t._enabled) {
if (!t.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(t, n);
}
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & c && t.onDestroy();
},
resetComp: !1
});
e.exports = v;
}), {
"./component-scheduler": 39,
"./platform/CCObject": 98,
"./platform/js": 112,
"./utils/misc": 153
} ],
91: [ (function(t, e, i) {
"use strict";
t("../assets/CCAsset");
var n = t("./utils").callInNextTick, r = t("../load-pipeline/CCLoader"), s = t("../load-pipeline/asset-table"), a = t("../load-pipeline/pack-downloader"), o = t("../load-pipeline/auto-release-utils"), c = t("../utils/decode-uuid"), l = t("../load-pipeline/md5-pipe"), u = t("../load-pipeline/subpackage-pipe"), h = t("./js"), f = "", _ = "", d = h.createMap(!0);
function p(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
}
function v(t, e) {
this.url = t;
this.type = e;
}
var g = {
loadAsset: function(t, e, i) {
if ("string" != typeof t) return n(e, new Error("[AssetLibrary] uuid must be string"), null);
var s = {
uuid: t,
type: "uuid"
};
i && i.existingAsset && (s.existingAsset = i.existingAsset);
r.load(s, (function(i, n) {
if (i || !n) {
var s = "string" == typeof i ? i : i ? i.message || i.errorMessage || JSON.stringify(i) : "Unknown error";
i = new Error("[AssetLibrary] loading JSON or dependencies failed:" + s);
} else {
if (n.constructor === cc.SceneAsset) {
var a = cc.loader._getReferenceKey(t);
n.scene.dependAssets = o.getDependsRecursively(a);
}
if (p(n)) {
var c = cc.loader._getReferenceKey(t);
r.removeItem(c);
}
}
e && e(i, n);
}));
},
getLibUrlNoExt: function(t, e) {
t = c(t);
return (e ? _ + "assets/" : f) + t.slice(0, 2) + "/" + t;
},
_queryAssetInfoInEditor: function(t, e) {
0;
},
_getAssetInfoInRuntime: function(t, e) {
e = e || {
url: null,
raw: !1
};
var i = d[t];
if (i && !h.isChildClassOf(i.type, cc.Asset)) {
e.url = _ + i.url;
e.raw = !0;
} else {
e.url = this.getLibUrlNoExt(t) + ".json";
e.raw = !1;
}
return e;
},
_uuidInSettings: function(t) {
return t in d;
},
queryAssetInfo: function(t, e) {
var i = this._getAssetInfoInRuntime(t);
e(null, i.url, i.raw);
},
parseUuidInEditor: function(t) {},
loadJson: function(t, e) {
var i = "" + (new Date().getTime() + Math.random()), n = {
uuid: i,
type: "uuid",
content: t,
skips: [ r.assetLoader.id, r.downloader.id ]
};
r.load(n, (function(t, n) {
if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message); else {
if (n.constructor === cc.SceneAsset) {
var s = cc.loader._getReferenceKey(i);
n.scene.dependAssets = o.getDependsRecursively(s);
}
if (p(n)) {
var a = cc.loader._getReferenceKey(i);
r.removeItem(a);
}
}
n._uuid = "";
e && e(t, n);
}));
},
getAssetByUuid: function(t) {
return g._uuidToAsset[t] || null;
},
init: function(t) {
0;
var e = t.libraryPath;
e = e.replace(/\\/g, "/");
f = cc.path.stripSep(e) + "/";
_ = t.rawAssetsBase;
if (t.subpackages) {
var i = new u(t.subpackages);
cc.loader.insertPipeAfter(cc.loader.assetLoader, i);
cc.loader.subPackPipe = i;
}
var n = t.md5AssetsMap;
if (n && n.import) {
var o = 0, p = 0, g = h.createMap(!0), m = n.import;
for (o = 0; o < m.length; o += 2) g[p = c(m[o])] = m[o + 1];
var y = h.createMap(!0);
m = n["raw-assets"];
for (o = 0; o < m.length; o += 2) y[p = c(m[o])] = m[o + 1];
var E = new l(g, y, f);
cc.loader.insertPipeAfter(cc.loader.assetLoader, E);
cc.loader.md5Pipe = E;
}
var C = r._assetTables;
for (var A in C) C[A].reset();
var T = t.rawAssets;
if (T) for (var x in T) {
var S = T[x];
for (var p in S) {
var b = S[p], R = b[0], L = b[1], w = cc.js._getClassById(L);
if (w) {
d[p] = new v(x + "/" + R, w);
var I = cc.path.extname(R);
I && (R = R.slice(0, -I.length));
var O = 1 === b[2];
C[x] || (C[x] = new s());
C[x].add(R, p, w, !O);
} else cc.error("Cannot get", L);
}
}
t.packedAssets && a.initPacks(t.packedAssets);
cc.url._init(t.mountPaths && t.mountPaths.assets || _ + "assets");
},
_uuidToAsset: {}
}, m = {
effect: {},
material: {}
}, y = {};
function E(t, e, i) {
var n = t + "s", r = m[t] = {}, s = "internal";
0;
cc.loader.loadResDir(n, e, s, (function() {}), (function(t, e) {
if (t) cc.error(t); else for (var n = 0; n < e.length; n++) {
var s = e[n];
cc.loader.getDependsRecursively(s).forEach((function(t) {
return y[t] = !0;
}));
r["" + s.name] = s;
}
i();
}));
}
g._loadBuiltins = function(t) {
if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return t && t();
E("effect", cc.EffectAsset, (function() {
E("material", cc.Material, t);
}));
};
g.getBuiltin = function(t, e) {
return m[t][e];
};
g.getBuiltins = function(t) {
return t ? m[t] : m;
};
g.resetBuiltins = function() {
m = {
effect: {},
material: {}
};
y = {};
};
g.getBuiltinDeps = function() {
return y;
};
e.exports = cc.AssetLibrary = g;
}), {
"../assets/CCAsset": 10,
"../load-pipeline/CCLoader": 70,
"../load-pipeline/asset-table": 72,
"../load-pipeline/auto-release-utils": 74,
"../load-pipeline/md5-pipe": 81,
"../load-pipeline/pack-downloader": 82,
"../load-pipeline/subpackage-pipe": 85,
"../utils/decode-uuid": 149,
"./js": 112,
"./utils": 116
} ],
92: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = t("./CCEnum"), s = t("./utils"), a = (s.isPlainEmptyObj_DEV, 
s.cloneable_DEV, t("./attribute")), o = a.DELIMETER, c = t("./preprocess-class");
t("./requiring-frame");
var l = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ];
function u(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
var h = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var t = this.datas;
if (t) {
for (var e = 0; e < t.length; ++e) {
var i = t[e], r = i.cls, s = i.props;
"function" == typeof s && (s = s());
var a = n.getClassName(r);
s ? L(r, a, s, r.$super, i.mixins) : cc.errorID(3633, a);
}
this.datas = null;
}
}
};
function f(t, e) {
0;
u(t.__props__, e);
}
function _(t, e, i, n, r) {
var s = n.default;
0;
a.setClassAttr(t, i, "default", s);
f(t, i);
O(t, n, e, i, !1);
}
function d(t, e, i, r, s) {
var o = r.get, c = r.set, l = t.prototype, u = Object.getOwnPropertyDescriptor(l, i), h = !u;
if (o) {
0;
O(t, r, e, i, !0);
0;
a.setClassAttr(t, i, "serializable", !1);
0;
s || n.get(l, i, o, h, h);
0;
}
if (c) {
if (!s) {
0;
n.set(l, i, c, h, h);
}
0;
}
}
function p(t) {
return "function" == typeof t ? t() : t;
}
function v(t, e, i) {
for (var r in e) t.hasOwnProperty(r) || i && !i(r) || Object.defineProperty(t, r, n.getPropertyDescriptor(e, r));
}
function g(t, e, i, r) {
var s, o, c = r.__ctor__, l = r.ctor, u = r.__ES6__;
if (u) {
s = [ l ];
o = l;
} else {
s = c ? [ c ] : S(e, i, r);
o = x(s, e, t, r);
n.value(o, "extend", (function(t) {
t.extends = this;
return w(t);
}), !0);
}
n.value(o, "__ctors__", s.length > 0 ? s : null, !0);
var h = o.prototype;
if (e) {
if (!u) {
n.extend(o, e);
h = o.prototype;
}
o.$super = e;
0;
}
if (i) {
for (var f = i.length - 1; f >= 0; f--) {
var _ = i[f];
v(h, _.prototype);
v(o, _, (function(t) {
return _.hasOwnProperty(t) && !0;
}));
w._isCCClass(_) && v(a.getClassAttrs(o), a.getClassAttrs(_));
}
h.constructor = o;
}
u || (h.__initProps__ = T);
n.setClassName(t, o);
return o;
}
function m(t, e, i, r) {
var s = cc.Component, a = cc._RF.peek();
if (a && n.isChildClassOf(e, s)) {
if (n.isChildClassOf(a.cls, s)) {
cc.errorID(3615);
return null;
}
0;
t = t || a.script;
}
var o = g(t, e, i, r);
if (a) if (n.isChildClassOf(e, s)) {
var c = a.uuid;
if (c) {
n._setClassId(c, o);
0;
}
a.cls = o;
} else n.isChildClassOf(a.cls, s) || (a.cls = o);
return o;
}
function y(t) {
for (var e = n.getClassName(t), i = t.constructor, r = "new " + e + "(", s = 0; s < i.__props__.length; s++) {
var a = t[i.__props__[s]];
0;
r += a;
s < i.__props__.length - 1 && (r += ",");
}
return r + ")";
}
function E(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function C(t, e) {
for (var i = [], n = "", r = 0; r < e.length; r++) {
var s = e[r], a = s + o + "default";
if (a in t) {
var c, l;
c = A.test(s) ? "this." + s + "=" : "this[" + E(s) + "]=";
var u = t[a];
if ("object" == typeof u && u) l = u instanceof cc.ValueType ? y(u) : Array.isArray(u) ? "[]" : "{}"; else if ("function" == typeof u) {
var h = i.length;
i.push(u);
l = "F[" + h + "]()";
0;
} else l = "string" == typeof u ? E(u) : u;
n += c = c + l + ";\n";
}
}
return 0 === i.length ? Function(n) : Function("F", "return (function(){\n" + n + "})")(i);
}
var A = /^[A-Za-z_$][0-9A-Za-z_$]*$/;
function T(t) {
var e = a.getClassAttrs(t), i = t.__props__;
if (null === i) {
h.init();
i = t.__props__;
}
var n = C(e, i);
t.prototype.__initProps__ = n;
n.call(this);
}
var x = function(t, e, i, n) {
var r = "return function CCClass(){\n";
e && R(e, n, i) && (r += "this._super=null;\n");
r += "this.__initProps__(CCClass);\n";
var s = t.length;
if (s > 0) {
0;
var a = "].apply(this,arguments);\n";
if (1 === s) r += "CCClass.__ctors__[0" + a; else {
r += "var cs=CCClass.__ctors__;\n";
for (var o = 0; o < s; o++) r += "cs[" + o + a;
}
0;
}
r += "}";
return Function(r)();
};
function S(t, e, i) {
function n(t) {
return w._isCCClass(t) ? t.__ctors__ || [] : [ t ];
}
for (var r = [], s = [ t ].concat(e), a = 0; a < s.length; a++) {
var o = s[a];
if (o) for (var c = n(o), l = 0; l < c.length; l++) u(r, c[l]);
}
var h = i.ctor;
h && r.push(h);
return r;
}
var b = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
function R(t, e, i) {
var r = !1;
for (var s in e) if (!(l.indexOf(s) >= 0)) {
var a = e[s];
if ("function" == typeof a) {
var o = n.getPropertyDescriptor(t.prototype, s);
if (o) {
var c = o.value;
if ("function" == typeof c) {
if (b.test(a)) {
r = !0;
e[s] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(c, a);
}
continue;
}
}
0;
}
}
return r;
}
function L(t, e, i, n, r, s) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (r) for (var l = 0; l < r.length; ++l) {
var u = r[l];
u.__props__ && (t.__props__ = t.__props__.concat(u.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
c.preprocessAttrs(i, e, t, s);
for (var h in i) {
var f = i[h];
"default" in f ? _(t, e, h, f) : d(t, e, h, f, s);
}
}
var p = a.getClassAttrs(t);
t.__values__ = t.__props__.filter((function(t) {
return !1 !== p[t + o + "serializable"];
}));
}
function w(t) {
var e = (t = t || {}).name, i = t.extends, r = t.mixins, s = m(e, i, r, t);
e || (e = cc.js.getClassName(s));
s._sealed = !0;
i && (i._sealed = !1);
var a = t.properties;
if ("function" == typeof a || i && null === i.__props__ || r && r.some((function(t) {
return null === t.__props__;
}))) {
h.push({
cls: s,
props: a,
mixins: r
});
s.__props__ = s.__values__ = null;
} else L(s, e, a, i, t.mixins, t.__ES6__);
var o = t.statics;
if (o) {
var u;
0;
for (u in o) s[u] = o[u];
}
for (var f in t) if (!(l.indexOf(f) >= 0)) {
var _ = t[f];
c.validateMethodWithProps(_, f, e, s, i) && n.value(s.prototype, f, _, !0, !0);
}
var d = t.editor;
d && n.isChildClassOf(i, cc.Component) && cc.Component._registerEditorProps(s, d);
return s;
}
w._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
w._fastDefine = function(t, e, i) {
n.setClassName(t, e);
for (var r = e.__props__ = e.__values__ = Object.keys(i), s = a.getClassAttrs(e), c = 0; c < r.length; c++) {
var l = r[c];
s[l + o + "visible"] = !1;
s[l + o + "default"] = i[l];
}
};
w.Attr = a;
w.attr = a.attr;
w.getInheritanceChain = function(t) {
for (var e = []; t = n.getSuper(t); ) t !== Object && e.push(t);
return e;
};
var I = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
};
function O(t, e, i, n, s) {
var c = null, l = "";
function u() {
l = n + o;
return c = a.getClassAttrs(t);
}
0;
var h = e.type;
if (h) {
var f = I[h];
if (f) {
(c || u())[l + "type"] = h;
0;
} else if ("Object" === h) 0; else if (h === a.ScriptUuid) {
(c || u())[l + "type"] = "Script";
c[l + "ctor"] = cc.ScriptAsset;
} else if ("object" == typeof h) if (r.isEnum(h)) {
(c || u())[l + "type"] = "Enum";
c[l + "enumList"] = r.getList(h);
} else 0; else if ("function" == typeof h) {
(c || u())[l + "type"] = "Object";
c[l + "ctor"] = h;
0;
} else 0;
}
function _(t, i) {
if (t in e) {
var n = e[t];
typeof n === i && ((c || u())[l + t] = n);
}
}
e.editorOnly && ((c || u())[l + "editorOnly"] = !0);
0;
e.url && ((c || u())[l + "saveUrlAsAsset"] = !0);
!1 === e.serializable && ((c || u())[l + "serializable"] = !1);
_("formerlySerializedAs", "string");
0;
var d = e.range;
if (d) if (Array.isArray(d)) if (d.length >= 2) {
(c || u())[l + "min"] = d[0];
c[l + "max"] = d[1];
d.length > 2 && (c[l + "step"] = d[2]);
} else 0; else 0;
_("min", "number");
_("max", "number");
_("step", "number");
}
cc.Class = w;
e.exports = {
isArray: function(t) {
t = p(t);
return Array.isArray(t);
},
fastDefine: w._fastDefine,
getNewValueTypeCode: y,
IDENTIFIER_RE: A,
escapeForJS: E,
getDefault: p
};
0;
}), {
"./CCEnum": 94,
"./attribute": 104,
"./js": 112,
"./preprocess-class": 113,
"./requiring-frame": 114,
"./utils": 116
} ],
93: [ (function(t, e, i) {
"use strict";
t("./CCClass");
var n = t("./preprocess-class"), r = t("./js"), s = "__ccclassCache__";
function a(t) {
return t;
}
function o(t, e) {
return t[e] || (t[e] = {});
}
function c(t) {
return function(e) {
return "function" == typeof e ? t(e) : function(i) {
return t(i, e);
};
};
}
function l(t, e, i) {
return function(t) {
0;
return function(i) {
return e(i, t);
};
};
}
var u = l.bind(null, !1);
function h(t) {
return l.bind(null, !1);
}
var f = h(), _ = h();
function d(t, e) {
0;
return o(t, s);
}
function p(t) {
var e;
try {
e = t();
} catch (e) {
return t;
}
return "object" != typeof e || null === e ? e : t;
}
function v(t) {
var e;
try {
e = new t();
} catch (t) {
0;
return {};
}
return e;
}
function g(t, e, i, s, a, o) {
var c, l = a && (a.get || a.set);
s && (c = n.getFullFormOfProperty(s, l));
var u = e[i], h = r.mixin(u || {}, c || s || {});
if (l) {
a.get && (h.get = a.get);
a.set && (h.set = a.set);
} else {
0;
var f = void 0;
if (a) {
if (a.initializer) {
f = p(a.initializer);
!0;
}
} else {
var _ = o.default || (o.default = v(t));
if (_.hasOwnProperty(i)) {
f = _[i];
!0;
}
}
0;
h.default = f;
}
e[i] = h;
}
var m = c((function(t, e) {
var i = r.getSuper(t);
i === Object && (i = null);
var n = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, a = t[s];
if (a) {
var o = a.proto;
o && r.mixin(n, o);
t[s] = void 0;
}
return cc.Class(n);
}));
function y(t, e, i) {
return t((function(t, n) {
var r = d(t);
if (r) {
var s = void 0 !== i ? i : n;
o(o(r, "proto"), "editor")[e] = s;
}
}), e);
}
function E(t) {
return t(a);
}
var C = E(c), A = y(u, "requireComponent"), T = E(f), x = y(_, "executionOrder"), S = E(c), b = E(c), R = E(f), L = E(f), w = E(f);
cc._decorator = e.exports = {
ccclass: m,
property: function(t, e, i) {
var n = null;
function r(t, e, i) {
var r = d(t.constructor);
if (r) {
var s = o(o(r, "proto"), "properties");
g(t.constructor, s, e, n, i, r);
}
}
if ("undefined" == typeof e) {
n = t;
return r;
}
r(t, e, i);
},
executeInEditMode: C,
requireComponent: A,
menu: T,
executionOrder: x,
disallowMultiple: S,
playOnFocus: b,
inspector: R,
icon: L,
help: w,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = d(e);
i && (o(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 92,
"./js": 112,
"./preprocess-class": 113,
"./utils": 116
} ],
94: [ (function(t, e, i) {
"use strict";
var n = t("./js");
function r(t) {
if ("__enums__" in t) return t;
n.value(t, "__enums__", null, !0);
for (var e = -1, i = Object.keys(t), r = 0; r < i.length; r++) {
var s = i[r], a = t[s];
if (-1 === a) {
a = ++e;
t[s] = a;
} else if ("number" == typeof a) e = a; else if ("string" == typeof a && Number.isInteger(parseFloat(s))) continue;
var o = "" + a;
if (s !== o) {
0;
n.value(t, o, s);
}
}
return t;
}
r.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
r.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
e.exports = cc.Enum = r;
}), {
"./js": 112
} ],
95: [ (function(t, e, i) {
"use strict";
var n, r = t("../event-manager"), s = t("./CCInputManager");
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
s.setAccelerometerEnabled = function(t) {
var e = this;
if (e._accelEnabled !== t) {
e._accelEnabled = t;
var i = cc.director.getScheduler();
i.enableForTarget(e);
if (e._accelEnabled) {
e._registerAccelerometerEvent();
e._accelCurTime = 0;
i.scheduleUpdate(e);
} else {
e._unregisterAccelerometerEvent();
e._accelCurTime = 0;
i.unscheduleUpdate(e);
}
jsb.device.setMotionEnabled(t);
}
};
s.setAccelerometerInterval = function(t) {
if (this._accelInterval !== t) {
this._accelInterval = t;
jsb.device.setMotionInterval(t);
}
};
s._registerKeyboardEvent = function() {
cc.game.canvas.addEventListener("keydown", (function(t) {
r.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !0));
t.stopPropagation();
t.preventDefault();
}), !1);
cc.game.canvas.addEventListener("keyup", (function(t) {
r.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !1));
t.stopPropagation();
t.preventDefault();
}), !1);
};
s._registerAccelerometerEvent = function() {
var t = window, e = this;
e._acceleration = new cc.Acceleration();
e._accelDeviceEvent = t.DeviceMotionEvent || t.DeviceOrientationEvent;
cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ && (e._accelDeviceEvent = window.DeviceOrientationEvent);
var i = e._accelDeviceEvent === t.DeviceMotionEvent ? "devicemotion" : "deviceorientation", r = navigator.userAgent;
(/Android/.test(r) || /Adr/.test(r) && cc.sys.browserType === cc.BROWSER_TYPE_UC) && (e._minus = -1);
n = e.didAccelerate.bind(e);
t.addEventListener(i, n, !1);
};
s._unregisterAccelerometerEvent = function() {
var t = window, e = this._accelDeviceEvent === t.DeviceMotionEvent ? "devicemotion" : "deviceorientation";
n && t.removeEventListener(e, n, !1);
};
s.didAccelerate = function(t) {
var e = this, i = window;
if (e._accelEnabled) {
var n, r, s, a = e._acceleration;
if (e._accelDeviceEvent === window.DeviceMotionEvent) {
var o = t.accelerationIncludingGravity;
n = e._accelMinus * o.x * .1;
r = e._accelMinus * o.y * .1;
s = .1 * o.z;
} else {
n = t.gamma / 90 * .981;
r = -t.beta / 90 * .981;
s = t.alpha / 90 * .981;
}
if (cc.view._isRotated) {
var c = n;
n = -r;
r = c;
}
a.x = n;
a.y = r;
a.z = s;
a.timestamp = t.timeStamp || Date.now();
var l = a.x;
if (90 === i.orientation) {
a.x = -a.y;
a.y = l;
} else if (-90 === i.orientation) {
a.x = a.y;
a.y = -l;
} else if (180 === i.orientation) {
a.x = -a.x;
a.y = -a.y;
}
if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ) {
a.x = -a.x;
a.y = -a.y;
}
}
};
}), {
"../event-manager": 62,
"./CCInputManager": 96
} ],
96: [ (function(t, e, i) {
"use strict";
var n = t("./CCMacro"), r = t("./CCSys"), s = t("../event-manager"), a = n.TOUCH_TIMEOUT, o = cc.v2(), c = {
_mousePressed: !1,
_isRegisterEvent: !1,
_preTouchPoint: cc.v2(0, 0),
_prevMousePoint: cc.v2(0, 0),
_preTouchPool: [],
_preTouchPoolPointer: 0,
_touches: [],
_touchesIntegerDict: {},
_indexBitsUsed: 0,
_maxTouches: 8,
_accelEnabled: !1,
_accelInterval: .2,
_accelMinus: 1,
_accelCurTime: 0,
_acceleration: null,
_accelDeviceEvent: null,
_canvasBoundingRect: {
left: 0,
top: 0,
adjustedLeft: 0,
adjustedTop: 0,
width: 0,
height: 0
},
_getUnUsedIndex: function() {
for (var t = this._indexBitsUsed, e = cc.sys.now(), i = 0; i < this._maxTouches; i++) {
if (!(1 & t)) {
this._indexBitsUsed |= 1 << i;
return i;
}
var n = this._touches[i];
if (e - n._lastModified > a) {
this._removeUsedIndexBit(i);
delete this._touchesIntegerDict[n.getID()];
return i;
}
t >>= 1;
}
return -1;
},
_removeUsedIndexBit: function(t) {
if (!(t < 0 || t >= this._maxTouches)) {
var e = 1 << t;
e = ~e;
this._indexBitsUsed &= e;
}
},
_glView: null,
_updateCanvasBoundingRect: function() {
var t = cc.game.canvas, e = this._canvasBoundingRect, i = document.documentElement, n = window.pageXOffset - i.clientLeft, r = window.pageYOffset - i.clientTop;
if (t.getBoundingClientRect) {
var s = t.getBoundingClientRect();
e.left = s.left + n;
e.top = s.top + r;
e.width = s.width;
e.height = s.height;
} else if (t instanceof HTMLCanvasElement) {
e.left = n;
e.top = r;
e.width = t.width;
e.height = t.height;
} else {
e.left = n;
e.top = r;
e.width = parseInt(t.style.width);
e.height = parseInt(t.style.height);
}
},
handleTouchesBegin: function(t) {
for (var e, i, n, a = [], o = this._touchesIntegerDict, c = r.now(), l = 0, u = t.length; l < u; l++) if (null == o[n = (e = t[l]).getID()]) {
var h = this._getUnUsedIndex();
if (-1 === h) {
cc.logID(2300, h);
continue;
}
(i = this._touches[h] = new cc.Touch(e._point.x, e._point.y, e.getID()))._lastModified = c;
i._setPrevPoint(e._prevPoint);
o[n] = h;
a.push(i);
}
if (a.length > 0) {
this._glView._convertTouchesWithScale(a);
var f = new cc.Event.EventTouch(a);
f._eventCode = cc.Event.EventTouch.BEGAN;
s.dispatchEvent(f);
}
},
handleTouchesMove: function(t) {
for (var e, i, n, a = [], o = this._touches, c = r.now(), l = 0, u = t.length; l < u; l++) {
n = (e = t[l]).getID();
if (null != (i = this._touchesIntegerDict[n]) && o[i]) {
o[i]._setPoint(e._point);
o[i]._setPrevPoint(e._prevPoint);
o[i]._lastModified = c;
a.push(o[i]);
}
}
if (a.length > 0) {
this._glView._convertTouchesWithScale(a);
var h = new cc.Event.EventTouch(a);
h._eventCode = cc.Event.EventTouch.MOVED;
s.dispatchEvent(h);
}
},
handleTouchesEnd: function(t) {
var e = this.getSetOfTouchesEndOrCancel(t);
if (e.length > 0) {
this._glView._convertTouchesWithScale(e);
var i = new cc.Event.EventTouch(e);
i._eventCode = cc.Event.EventTouch.ENDED;
s.dispatchEvent(i);
}
this._preTouchPool.length = 0;
},
handleTouchesCancel: function(t) {
var e = this.getSetOfTouchesEndOrCancel(t);
if (e.length > 0) {
this._glView._convertTouchesWithScale(e);
var i = new cc.Event.EventTouch(e);
i._eventCode = cc.Event.EventTouch.CANCELED;
s.dispatchEvent(i);
}
this._preTouchPool.length = 0;
},
getSetOfTouchesEndOrCancel: function(t) {
for (var e, i, n, r = [], s = this._touches, a = this._touchesIntegerDict, o = 0, c = t.length; o < c; o++) if (null != (i = a[n = (e = t[o]).getID()]) && s[i]) {
s[i]._setPoint(e._point);
s[i]._setPrevPoint(e._prevPoint);
r.push(s[i]);
this._removeUsedIndexBit(i);
delete a[n];
}
return r;
},
getPreTouch: function(t) {
for (var e = null, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--) if (i[r].getID() === n) {
e = i[r];
break;
}
e || (e = t);
return e;
},
setPreTouch: function(t) {
for (var e = !1, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--) if (i[r].getID() === n) {
i[r] = t;
e = !0;
break;
}
if (!e) if (i.length <= 50) i.push(t); else {
i[this._preTouchPoolPointer] = t;
this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
}
},
getTouchByXY: function(t, e, i) {
var n = this._preTouchPoint, r = this._glView.convertToLocationInView(t, e, i), s = new cc.Touch(r.x, r.y, 0);
s._setPrevPoint(n.x, n.y);
n.x = r.x;
n.y = r.y;
return s;
},
getMouseEvent: function(t, e, i) {
var n = this._prevMousePoint, r = new cc.Event.EventMouse(i);
r._setPrevCursor(n.x, n.y);
n.x = t.x;
n.y = t.y;
this._glView._convertMouseToLocationInView(n, e);
r.setLocation(n.x, n.y);
return r;
},
getPointByEvent: function(t, e) {
cc.sys.browserType !== cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC && cc.sys.browserType !== cc.sys.BROWSER_TYPE_SAFARI || this._updateCanvasBoundingRect();
if (null != t.pageX) return {
x: t.pageX,
y: t.pageY
};
e.left -= document.body.scrollLeft;
e.top -= document.body.scrollTop;
return {
x: t.clientX,
y: t.clientY
};
},
getTouchesByEvent: function(t, e) {
for (var i, n, s, a = [], c = this._glView, l = this._preTouchPoint, u = t.changedTouches.length, h = 0; h < u; h++) if (i = t.changedTouches[h]) {
var f = void 0;
f = r.BROWSER_TYPE_FIREFOX === r.browserType ? c.convertToLocationInView(i.pageX, i.pageY, e, o) : c.convertToLocationInView(i.clientX, i.clientY, e, o);
if (null != i.identifier) {
n = new cc.Touch(f.x, f.y, i.identifier);
s = this.getPreTouch(n).getLocation();
n._setPrevPoint(s.x, s.y);
this.setPreTouch(n);
} else (n = new cc.Touch(f.x, f.y))._setPrevPoint(l.x, l.y);
l.x = f.x;
l.y = f.y;
a.push(n);
}
return a;
},
registerSystemEvent: function(t) {
if (!this._isRegisterEvent) {
this._glView = cc.view;
var e = this, i = this._canvasBoundingRect;
window.addEventListener("resize", this._updateCanvasBoundingRect.bind(this));
var n = r.isMobile, a = "mouse" in r.capabilities, o = "touches" in r.capabilities;
if (a) {
if (!n) {
window.addEventListener("mousedown", (function() {
e._mousePressed = !0;
}), !1);
window.addEventListener("mouseup", (function(t) {
if (e._mousePressed) {
e._mousePressed = !1;
var n = e.getPointByEvent(t, i);
if (!cc.rect(i.left, i.top, i.width, i.height).contains(n)) {
e.handleTouchesEnd([ e.getTouchByXY(n.x, n.y, i) ]);
var r = e.getMouseEvent(n, i, cc.Event.EventMouse.UP);
r.setButton(t.button);
s.dispatchEvent(r);
}
}
}), !1);
}
for (var c = cc.Event.EventMouse, l = [ !n && [ "mousedown", c.DOWN, function(i, n, r, s) {
e._mousePressed = !0;
e.handleTouchesBegin([ e.getTouchByXY(r.x, r.y, s) ]);
t.focus();
} ], !n && [ "mouseup", c.UP, function(t, i, n, r) {
e._mousePressed = !1;
e.handleTouchesEnd([ e.getTouchByXY(n.x, n.y, r) ]);
} ], !n && [ "mousemove", c.MOVE, function(t, i, n, r) {
e.handleTouchesMove([ e.getTouchByXY(n.x, n.y, r) ]);
e._mousePressed || i.setButton(null);
} ], [ "mousewheel", c.SCROLL, function(t, e) {
e.setScrollData(0, t.wheelDelta);
} ], [ "DOMMouseScroll", c.SCROLL, function(t, e) {
e.setScrollData(0, -120 * t.detail);
} ] ], u = 0; u < l.length; ++u) {
var h = l[u];
h && (function() {
var n = h[0], r = h[1], a = h[2];
t.addEventListener(n, (function(t) {
var n = e.getPointByEvent(t, i), o = e.getMouseEvent(n, i, r);
o.setButton(t.button);
a(t, o, n, i);
s.dispatchEvent(o);
t.stopPropagation();
t.preventDefault();
}), !1);
})();
}
}
if (window.navigator.msPointerEnabled) {
var f = {
MSPointerDown: e.handleTouchesBegin,
MSPointerMove: e.handleTouchesMove,
MSPointerUp: e.handleTouchesEnd,
MSPointerCancel: e.handleTouchesCancel
}, _ = function(n) {
var r = f[n];
t.addEventListener(n, (function(t) {
var n = document.documentElement;
i.adjustedLeft = i.left - n.scrollLeft;
i.adjustedTop = i.top - n.scrollTop;
r.call(e, [ e.getTouchByXY(t.clientX, t.clientY, i) ]);
t.stopPropagation();
}), !1);
};
for (var d in f) _(d);
}
if (o) {
var p = {
touchstart: function(i) {
e.handleTouchesBegin(i);
t.focus();
},
touchmove: function(t) {
e.handleTouchesMove(t);
},
touchend: function(t) {
e.handleTouchesEnd(t);
},
touchcancel: function(t) {
e.handleTouchesCancel(t);
}
}, v = function(n) {
var r = p[n];
t.addEventListener(n, (function(t) {
if (t.changedTouches) {
var n = document.body;
i.adjustedLeft = i.left - (n.scrollLeft || window.scrollX || 0);
i.adjustedTop = i.top - (n.scrollTop || window.scrollY || 0);
r(e.getTouchesByEvent(t, i));
t.stopPropagation();
t.preventDefault();
}
}), !1);
};
for (var g in p) v(g);
}
this._registerKeyboardEvent();
this._isRegisterEvent = !0;
}
},
_registerKeyboardEvent: function() {},
_registerAccelerometerEvent: function() {},
update: function(t) {
if (this._accelCurTime > this._accelInterval) {
this._accelCurTime -= this._accelInterval;
s.dispatchEvent(new cc.Event.EventAcceleration(this._acceleration));
}
this._accelCurTime += t;
}
};
e.exports = cc.internal.inputManager = c;
}), {
"../event-manager": 62,
"./CCMacro": 97,
"./CCSys": 101
} ],
97: [ (function(t, e, i) {
"use strict";
cc.macro = {
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
REPEAT_FOREVER: Number.MAX_VALUE - 1,
FLT_EPSILON: 1.192092896e-7,
MIN_ZINDEX: -Math.pow(2, 15),
MAX_ZINDEX: Math.pow(2, 15) - 1,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: !0,
DIRECTOR_STATS_POSITION: cc.v2(0, 0),
ENABLE_STACKABLE_ACTIONS: !0,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_TILEDMAP_CULLING: !0,
DOWNLOAD_MAX_CONCURRENT: 64,
ENABLE_TRANSPARENT_CANVAS: !1,
ENABLE_WEBGL_ANTIALIAS: !1,
ENABLE_CULLING: !1,
CLEANUP_IMAGE_CACHE: !1,
SHOW_MESH_WIREFRAME: !1,
SHOW_MESH_NORMAL: !1,
ENABLE_MULTI_TOUCH: !0
};
Object.defineProperty(cc.macro, "ROTATE_ACTION_CCW", {
set: function(t) {
cc.RotateTo && cc.RotateBy && (cc.RotateTo._reverse = cc.RotateBy._reverse = t);
}
});
cc.macro.SUPPORT_TEXTURE_FORMATS = [ ".pkm", ".pvr", ".webp", ".jpg", ".jpeg", ".bmp", ".png" ];
cc.macro.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.macro.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.macro.BlendFactor = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.macro.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.macro.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
e.exports = cc.macro;
}), {} ],
98: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = t("./CCClass"), s = 1;
function a() {
this._name = "";
this._objFlags = 0;
}
r.fastDefine("cc.Object", a, {
_name: "",
_objFlags: 0
});
n.value(a, "Flags", {
Destroyed: s,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
LockedInEditor: 512,
HideInHierarchy: 1024,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var o = [];
function c() {
for (var t = o.length, e = 0; e < t; ++e) {
var i = o[e];
i._objFlags & s || i._destroyImmediate();
}
t === o.length ? o.length = 0 : o.splice(0, t);
0;
}
n.value(a, "_deferredDestroy", c);
0;
var l = a.prototype;
n.getset(l, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}), !0);
n.get(l, "isValid", (function() {
return !(this._objFlags & s);
}), !0);
0;
l.destroy = function() {
if (this._objFlags & s) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
o.push(this);
0;
return !0;
};
0;
function u(t, e) {
var i, n = t instanceof cc._BaseNode || t instanceof cc.Component, s = n ? "_id" : null, a = {};
for (i in t) if (t.hasOwnProperty(i)) {
if (i === s) continue;
switch (typeof t[i]) {
case "string":
a[i] = "";
break;

case "object":
case "function":
a[i] = null;
}
}
if (cc.Class._isCCClass(e)) for (var o = cc.Class.Attr.getClassAttrs(e), c = e.__props__, l = 0; l < c.length; l++) {
var u = (i = c[l]) + cc.Class.Attr.DELIMETER + "default";
if (u in o) {
if (n && "_id" === i) continue;
switch (typeof o[u]) {
case "string":
a[i] = "";
break;

case "object":
case "function":
a[i] = null;
break;

case "undefined":
a[i] = void 0;
}
}
}
var h = "";
for (i in a) {
var f;
f = r.IDENTIFIER_RE.test(i) ? "o." + i + "=" : "o[" + r.escapeForJS(i) + "]=";
var _ = a[i];
"" === _ && (_ = '""');
h += f + _ + ";\n";
}
return Function("o", h);
}
l._destruct = function() {
var t = this.constructor, e = t.__destruct__;
if (!e) {
e = u(this, t);
n.value(t, "__destruct__", e, !0);
}
e(this);
};
l._onPreDestroy = null;
l._destroyImmediate = function() {
if (this._objFlags & s) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= s;
}
};
0;
l._deserialize = null;
cc.isValid = function(t, e) {
return "object" == typeof t ? !(!t || t._objFlags & (e ? 4 | s : s)) : "undefined" != typeof t;
};
0;
cc.Object = e.exports = a;
}), {
"./CCClass": 92,
"./js": 112
} ],
99: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js");
cc.SAXParser = function() {
if (window.DOMParser) {
this._isSupportDOMParser = !0;
this._parser = new DOMParser();
} else {
this._isSupportDOMParser = !1;
this._parser = null;
}
};
cc.SAXParser.prototype = {
constructor: cc.SAXParser,
parse: function(t) {
return this._parseXML(t);
},
_parseXML: function(t) {
var e;
if (this._isSupportDOMParser) e = this._parser.parseFromString(t, "text/xml"); else {
(e = new ActiveXObject("Microsoft.XMLDOM")).async = "false";
e.loadXML(t);
}
return e;
}
};
cc.PlistParser = function() {
cc.SAXParser.call(this);
};
n.extend(cc.PlistParser, cc.SAXParser);
n.mixin(cc.PlistParser.prototype, {
parse: function(t) {
var e = this._parseXML(t), i = e.documentElement;
if ("plist" !== i.tagName) {
cc.warnID(5100);
return {};
}
for (var n = null, r = 0, s = i.childNodes.length; r < s && 1 !== (n = i.childNodes[r]).nodeType; r++) ;
e = null;
return this._parseNode(n);
},
_parseNode: function(t) {
var e = null, i = t.tagName;
if ("dict" === i) e = this._parseDict(t); else if ("array" === i) e = this._parseArray(t); else if ("string" === i) if (1 === t.childNodes.length) e = t.firstChild.nodeValue; else {
e = "";
for (var n = 0; n < t.childNodes.length; n++) e += t.childNodes[n].nodeValue;
} else "false" === i ? e = !1 : "true" === i ? e = !0 : "real" === i ? e = parseFloat(t.firstChild.nodeValue) : "integer" === i && (e = parseInt(t.firstChild.nodeValue, 10));
return e;
},
_parseArray: function(t) {
for (var e = [], i = 0, n = t.childNodes.length; i < n; i++) {
var r = t.childNodes[i];
1 === r.nodeType && e.push(this._parseNode(r));
}
return e;
},
_parseDict: function(t) {
for (var e = {}, i = null, n = 0, r = t.childNodes.length; n < r; n++) {
var s = t.childNodes[n];
1 === s.nodeType && ("key" === s.tagName ? i = s.firstChild.nodeValue : e[i] = this._parseNode(s));
}
return e;
}
});
cc.saxParser = new cc.SAXParser();
cc.plistParser = new cc.PlistParser();
e.exports = {
saxParser: cc.saxParser,
plistParser: cc.plistParser
};
}), {
"../platform/js": 112
} ],
100: [ (function(t, e, i) {
"use strict";
cc.screen = {
_supportsFullScreen: !1,
_onfullscreenchange: null,
_onfullscreenerror: null,
_preOnFullScreenChange: null,
_preOnFullScreenError: null,
_preOnTouch: null,
_touchEvent: "",
_fn: null,
_fnMap: [ [ "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement", "fullscreenerror" ], [ "requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement", "fullscreenerror" ], [ "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenerror" ], [ "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement", "mozfullscreenerror" ], [ "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement", "msfullscreenerror" ] ],
init: function() {
this._fn = {};
var t, e, i, n, r = this._fnMap;
for (t = 0, e = r.length; t < e; t++) if ((i = r[t]) && "undefined" != typeof document[i[1]]) {
for (t = 0, n = i.length; t < n; t++) this._fn[r[0][t]] = i[t];
break;
}
this._supportsFullScreen = void 0 !== this._fn.requestFullscreen;
this._touchEvent = "ontouchend" in window ? "touchend" : "mousedown";
},
fullScreen: function() {
return !!this._supportsFullScreen && !!(document[this._fn.fullscreenElement] || document[this._fn.webkitFullscreenElement] || document[this._fn.mozFullScreenElement]);
},
requestFullScreen: function(t, e, i) {
if (t && "video" === t.tagName.toLowerCase()) {
if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && t.readyState > 0) {
t.webkitEnterFullscreen && t.webkitEnterFullscreen();
return;
}
t.setAttribute("x5-video-player-fullscreen", "true");
}
if (this._supportsFullScreen) {
t = t || document.documentElement;
if (e) {
var n = this._fn.fullscreenchange;
this._onfullscreenchange && document.removeEventListener(n, this._onfullscreenchange);
this._onfullscreenchange = e;
document.addEventListener(n, e, !1);
}
if (i) {
var r = this._fn.fullscreenerror;
this._onfullscreenerror && document.removeEventListener(r, this._onfullscreenerror);
this._onfullscreenerror = i;
document.addEventListener(r, i, {
once: !0
});
}
t[this._fn.requestFullscreen]();
}
},
exitFullScreen: function(t) {
if (t && "video" === t.tagName.toLowerCase()) {
if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser) {
t.webkitExitFullscreen && t.webkitExitFullscreen();
return;
}
t.setAttribute("x5-video-player-fullscreen", "false");
}
return !this._supportsFullScreen || document[this._fn.exitFullscreen]();
},
autoFullScreen: function(t, e) {
t = t || document.body;
this._ensureFullScreen(t, e);
this.requestFullScreen(t, e);
},
disableAutoFullScreen: function(t) {
var e = cc.game.canvas || t, i = this._touchEvent;
if (this._preOnTouch) {
e.removeEventListener(i, this._preOnTouch);
this._preOnTouch = null;
}
},
_ensureFullScreen: function(t, e) {
var i = this, n = cc.game.canvas || t, r = this._fn.fullscreenerror;
if ("undefined" != typeof document[r]) {
var s = this._touchEvent;
this._preOnFullScreenError && t.removeEventListener(r, this._preOnFullScreenError);
this._preOnFullScreenError = a;
t.addEventListener(r, a, {
once: !0
});
}
function a() {
i._preOnFullScreenError = null;
i._preOnTouch && n.removeEventListener(s, i._preOnTouch);
i._preOnTouch = function() {
i._preOnTouch = null;
i.requestFullScreen(t, e);
};
n.addEventListener(s, i._preOnTouch, {
once: !0
});
}
}
};
cc.screen.init();
}), {} ],
101: [ (function(t, e, i) {
"use strict";
var n, r = "qgame" === (n = window._CCSettings ? _CCSettings.platform : void 0), s = "quickgame" === n, a = "huawei" === n, o = "jkw-game" === n, c = "qtt-game" === n, l = "undefined" == typeof window ? global : window;
var u = cc && cc.sys ? cc.sys : (function() {
cc.sys = {};
var t = cc.sys;
t.LANGUAGE_ENGLISH = "en";
t.LANGUAGE_CHINESE = "zh";
t.LANGUAGE_FRENCH = "fr";
t.LANGUAGE_ITALIAN = "it";
t.LANGUAGE_GERMAN = "de";
t.LANGUAGE_SPANISH = "es";
t.LANGUAGE_DUTCH = "du";
t.LANGUAGE_RUSSIAN = "ru";
t.LANGUAGE_KOREAN = "ko";
t.LANGUAGE_JAPANESE = "ja";
t.LANGUAGE_HUNGARIAN = "hu";
t.LANGUAGE_PORTUGUESE = "pt";
t.LANGUAGE_ARABIC = "ar";
t.LANGUAGE_NORWEGIAN = "no";
t.LANGUAGE_POLISH = "pl";
t.LANGUAGE_TURKISH = "tr";
t.LANGUAGE_UKRAINIAN = "uk";
t.LANGUAGE_ROMANIAN = "ro";
t.LANGUAGE_BULGARIAN = "bg";
t.LANGUAGE_UNKNOWN = "unknown";
t.OS_IOS = "iOS";
t.OS_ANDROID = "Android";
t.OS_WINDOWS = "Windows";
t.OS_MARMALADE = "Marmalade";
t.OS_LINUX = "Linux";
t.OS_BADA = "Bada";
t.OS_BLACKBERRY = "Blackberry";
t.OS_OSX = "OS X";
t.OS_WP8 = "WP8";
t.OS_WINRT = "WINRT";
t.OS_UNKNOWN = "Unknown";
t.UNKNOWN = -1;
t.WIN32 = 0;
t.LINUX = 1;
t.MACOS = 2;
t.ANDROID = 3;
t.IPHONE = 4;
t.IPAD = 5;
t.BLACKBERRY = 6;
t.NACL = 7;
t.EMSCRIPTEN = 8;
t.TIZEN = 9;
t.WINRT = 10;
t.WP8 = 11;
t.MOBILE_BROWSER = 100;
t.DESKTOP_BROWSER = 101;
t.EDITOR_PAGE = 102;
t.EDITOR_CORE = 103;
t.WECHAT_GAME = 104;
t.QQ_PLAY = 105;
t.FB_PLAYABLE_ADS = 106;
t.BAIDU_GAME = 107;
t.VIVO_GAME = 108;
t.OPPO_GAME = 109;
t.HUAWEI_GAME = 110;
t.XIAOMI_GAME = 111;
t.JKW_GAME = 112;
t.ALIPAY_GAME = 113;
t.WECHAT_GAME_SUB = 114;
t.BAIDU_GAME_SUB = 115;
t.QTT_GAME = 116;
t.BROWSER_TYPE_WECHAT = "wechat";
t.BROWSER_TYPE_WECHAT_GAME = "wechatgame";
t.BROWSER_TYPE_WECHAT_GAME_SUB = "wechatgamesub";
t.BROWSER_TYPE_BAIDU_GAME = "baidugame";
t.BROWSER_TYPE_BAIDU_GAME_SUB = "baidugamesub";
t.BROWSER_TYPE_XIAOMI_GAME = "xiaomigame";
t.BROWSER_TYPE_ALIPAY_GAME = "alipaygame";
t.BROWSER_TYPE_QQ_PLAY = "qqplay";
t.BROWSER_TYPE_ANDROID = "androidbrowser";
t.BROWSER_TYPE_IE = "ie";
t.BROWSER_TYPE_EDGE = "edge";
t.BROWSER_TYPE_QQ = "qqbrowser";
t.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
t.BROWSER_TYPE_UC = "ucbrowser";
t.BROWSER_TYPE_UCBS = "ucbs";
t.BROWSER_TYPE_360 = "360browser";
t.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
t.BROWSER_TYPE_BAIDU = "baidubrowser";
t.BROWSER_TYPE_MAXTHON = "maxthon";
t.BROWSER_TYPE_OPERA = "opera";
t.BROWSER_TYPE_OUPENG = "oupeng";
t.BROWSER_TYPE_MIUI = "miuibrowser";
t.BROWSER_TYPE_FIREFOX = "firefox";
t.BROWSER_TYPE_SAFARI = "safari";
t.BROWSER_TYPE_CHROME = "chrome";
t.BROWSER_TYPE_LIEBAO = "liebao";
t.BROWSER_TYPE_QZONE = "qzone";
t.BROWSER_TYPE_SOUGOU = "sogou";
t.BROWSER_TYPE_UNKNOWN = "unknown";
t.isNative = !0;
t.isBrowser = "object" == typeof window && "object" == typeof document && !1;
t.glExtension = function(t) {
return !!cc.renderer.device.ext(t);
};
t.getMaxJointMatrixSize = function() {
if (!t._maxJointMatrixSize) {
var e = cc.game._renderContext, i = Math.floor(e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS) / 4) - 10;
t._maxJointMatrixSize = i < 50 ? 0 : 50;
}
return t._maxJointMatrixSize;
};
if (l.__globalAdapter && l.__globalAdapter.adaptSys) l.__globalAdapter.adaptSys(t); else {
var e, i;
e = r ? t.VIVO_GAME : s ? t.OPPO_GAME : a ? t.HUAWEI_GAME : o ? t.JKW_GAME : c ? t.QTT_GAME : __getPlatform();
t.platform = e;
t.isMobile = e === t.ANDROID || e === t.IPAD || e === t.IPHONE || e === t.WP8 || e === t.TIZEN || e === t.BLACKBERRY || e === t.XIAOMI_GAME || r || s || a || o || c;
t.os = __getOS();
t.language = __getCurrentLanguage();
i = __getCurrentLanguageCode();
t.languageCode = i ? i.toLowerCase() : void 0;
t.osVersion = __getOSVersion();
t.osMainVersion = parseInt(t.osVersion);
t.browserType = null;
t.browserVersion = null;
var n, u = window.innerWidth, h = window.innerHeight, f = window.devicePixelRatio || 1;
t.windowPixelResolution = {
width: f * u,
height: f * h
};
t.localStorage = window.localStorage;
n = t.capabilities = {
canvas: !1,
opengl: !0,
webp: !0
};
if (t.isMobile) {
n.accelerometer = !0;
n.touches = !0;
} else {
n.keyboard = !0;
n.mouse = !0;
n.touches = !1;
}
t.__audioSupport = {
ONLY_ONE: !1,
WEB_AUDIO: !1,
DELAY_CREATE_CTX: !1,
format: [ ".mp3" ]
};
}
t.NetworkType = {
NONE: 0,
LAN: 1,
WWAN: 2
};
t.getNetworkType = function() {
return t.NetworkType.LAN;
};
t.getBatteryLevel = function() {
return 1;
};
t.garbageCollect = function() {};
t.restartVM = function() {};
t.getSafeAreaRect = function() {
var t = cc.view.getVisibleSize();
return cc.rect(0, 0, t.width, t.height);
};
t.isObjectValid = function(t) {
return !!t;
};
t.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
t.openURL = function(t) {
jsb.openURL(t);
};
t.now = function() {
return Date.now ? Date.now() : +new Date();
};
return t;
})();
e.exports = u;
}), {} ],
102: [ (function(t, e, i) {
"use strict";
var n = t("../event/event-target"), r = t("../platform/js"), s = t("../renderer");
t("../platform/CCClass");
var a = {
init: function() {
this.html = document.getElementsByTagName("html")[0];
},
availWidth: function(t) {
return t && t !== this.html ? t.clientWidth : window.innerWidth;
},
availHeight: function(t) {
return t && t !== this.html ? t.clientHeight : window.innerHeight;
},
meta: {
width: "device-width"
},
adaptationType: cc.sys.browserType
};
cc.sys.os === cc.sys.OS_IOS && (a.adaptationType = cc.sys.BROWSER_TYPE_SAFARI);
switch (a.adaptationType) {
case cc.sys.BROWSER_TYPE_SAFARI:
a.meta["minimal-ui"] = "true";
a.availWidth = cc.sys.isMobile ? function(t) {
return window.innerWidth;
} : function(t) {
return t.clientWidth;
};
a.availHeight = cc.sys.isMobile ? function(t) {
return window.innerHeight;
} : function(t) {
return t.clientHeight;
};
break;

case cc.sys.BROWSER_TYPE_SOUGOU:
case cc.sys.BROWSER_TYPE_UC:
a.meta["minimal-ui"] = "true";
a.availWidth = function(t) {
return t.clientWidth;
};
a.availHeight = function(t) {
return t.clientHeight;
};
}
var o = null, c = function() {
n.call(this);
var t = this, e = cc.ContainerStrategy, i = cc.ContentStrategy;
a.init(this);
t._frameSize = cc.size(0, 0);
t._designResolutionSize = cc.size(0, 0);
t._originalDesignResolutionSize = cc.size(0, 0);
t._scaleX = 1;
t._scaleY = 1;
t._viewportRect = cc.rect(0, 0, 0, 0);
t._visibleRect = cc.rect(0, 0, 0, 0);
t._autoFullScreen = !1;
t._devicePixelRatio = 1;
t._maxPixelRatio = 4;
t._retinaEnabled = !1;
t._resizeCallback = null;
t._resizing = !1;
t._resizeWithBrowserSize = !1;
t._orientationChanging = !0;
t._isRotated = !1;
t._orientation = cc.macro.ORIENTATION_AUTO;
t._isAdjustViewport = !0;
t._antiAliasEnabled = !1;
t._resolutionPolicy = null;
t._rpExactFit = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, i.EXACT_FIT);
t._rpShowAll = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, i.SHOW_ALL);
t._rpNoBorder = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, i.NO_BORDER);
t._rpFixedHeight = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, i.FIXED_HEIGHT);
t._rpFixedWidth = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, i.FIXED_WIDTH);
cc.game.once(cc.game.EVENT_ENGINE_INITED, this.init, this);
};
cc.js.extend(c, n);
cc.js.mixin(c.prototype, {
init: function() {
this._initFrameSize();
var t = cc.game.canvas.width, e = cc.game.canvas.height;
this._designResolutionSize.width = t;
this._designResolutionSize.height = e;
this._originalDesignResolutionSize.width = t;
this._originalDesignResolutionSize.height = e;
this._viewportRect.width = t;
this._viewportRect.height = e;
this._visibleRect.width = t;
this._visibleRect.height = e;
cc.winSize.width = this._visibleRect.width;
cc.winSize.height = this._visibleRect.height;
cc.visibleRect && cc.visibleRect.init(this._visibleRect);
},
_resizeEvent: function(t) {
var e;
e = this.setDesignResolutionSize ? this : cc.view;
var i = cc.sys;
if (i.browserType !== i.BROWSER_TYPE_UC || i.os !== i.OS_IOS) {
var n = e._frameSize.width, r = e._frameSize.height, s = e._isRotated;
if (cc.sys.isMobile) {
var a = cc.game.container.style, o = a.margin;
a.margin = "0";
a.display = "none";
e._initFrameSize();
a.margin = o;
a.display = "block";
} else e._initFrameSize();
if (!0 === t || e._isRotated !== s || e._frameSize.width !== n || e._frameSize.height !== r) {
var c = e._originalDesignResolutionSize.width, l = e._originalDesignResolutionSize.height;
e._resizing = !0;
c > 0 && e.setDesignResolutionSize(c, l, e._resolutionPolicy);
e._resizing = !1;
e.emit("canvas-resize");
e._resizeCallback && e._resizeCallback.call();
}
} else setTimeout((function() {
e._resizeEvent(t);
}), 0);
},
_orientationChange: function() {
cc.view._orientationChanging = !0;
cc.view._resizeEvent();
cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI && cc.sys.isMobile && setTimeout((function() {
window.innerHeight > window.innerWidth && window.scrollTo(0, 1);
}), 500);
},
resizeWithBrowserSize: function(t) {
if (t) {
if (!this._resizeWithBrowserSize) {
this._resizeWithBrowserSize = !0;
window.addEventListener("resize", this._resizeEvent);
window.addEventListener("orientationchange", this._orientationChange);
}
} else if (this._resizeWithBrowserSize) {
this._resizeWithBrowserSize = !1;
window.removeEventListener("resize", this._resizeEvent);
window.removeEventListener("orientationchange", this._orientationChange);
}
},
setResizeCallback: function(t) {
0;
"function" != typeof t && null != t || (this._resizeCallback = t);
},
setOrientation: function(t) {
if ((t &= cc.macro.ORIENTATION_AUTO) && this._orientation !== t) {
this._orientation = t;
var e = this._originalDesignResolutionSize.width, i = this._originalDesignResolutionSize.height;
this.setDesignResolutionSize(e, i, this._resolutionPolicy);
}
},
_initFrameSize: function() {
var t = this._frameSize, e = a.availWidth(cc.game.frame), i = a.availHeight(cc.game.frame), n = e >= i;
if (!cc.sys.isMobile || n && this._orientation & cc.macro.ORIENTATION_LANDSCAPE || !n && this._orientation & cc.macro.ORIENTATION_PORTRAIT) {
t.width = e;
t.height = i;
cc.game.container.style["-webkit-transform"] = "rotate(0deg)";
cc.game.container.style.transform = "rotate(0deg)";
this._isRotated = !1;
} else {
t.width = i;
t.height = e;
cc.game.container.style["-webkit-transform"] = "rotate(90deg)";
cc.game.container.style.transform = "rotate(90deg)";
cc.game.container.style["-webkit-transform-origin"] = "0px 0px 0px";
cc.game.container.style.transformOrigin = "0px 0px 0px";
this._isRotated = !0;
}
this._orientationChanging && setTimeout((function() {
cc.view._orientationChanging = !1;
}), 1e3);
},
_setViewportMeta: function(t, e) {
var i = document.getElementById("cocosMetaElement");
i && e && document.head.removeChild(i);
var n, r, s, a = document.getElementsByName("viewport"), o = a ? a[0] : null;
n = o ? o.content : "";
(i = i || document.createElement("meta")).id = "cocosMetaElement";
i.name = "viewport";
i.content = "";
for (r in t) if (-1 == n.indexOf(r)) n += "," + r + "=" + t[r]; else if (e) {
s = new RegExp(r + "s*=s*[^,]+");
n.replace(s, r + "=" + t[r]);
}
/^,/.test(n) && (n = n.substr(1));
i.content = n;
o && (o.content = n);
document.head.appendChild(i);
},
_adjustViewportMeta: function() {
this._isAdjustViewport, 0;
},
adjustViewportMeta: function(t) {
this._isAdjustViewport = t;
},
enableRetina: function(t) {
0;
this._retinaEnabled = !!t;
},
isRetinaEnabled: function() {
0;
return this._retinaEnabled;
},
enableAntiAlias: function(t) {
cc.warnID(9200);
if (this._antiAliasEnabled !== t) {
this._antiAliasEnabled = t;
if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
var e = cc.loader._cache;
for (var i in e) {
var n = e[i], r = n && n.content instanceof cc.Texture2D ? n.content : null;
if (r) {
var s = cc.Texture2D.Filter;
t ? r.setFilters(s.LINEAR, s.LINEAR) : r.setFilters(s.NEAREST, s.NEAREST);
}
}
} else if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
var a = cc.game.canvas.getContext("2d");
a.imageSmoothingEnabled = t;
a.mozImageSmoothingEnabled = t;
}
}
},
isAntiAliasEnabled: function() {
return this._antiAliasEnabled;
},
enableAutoFullScreen: function(t) {
if (t && t !== this._autoFullScreen && cc.sys.isMobile) {
this._autoFullScreen = !0;
cc.screen.autoFullScreen(cc.game.frame);
} else {
this._autoFullScreen = !1;
cc.screen.disableAutoFullScreen(cc.game.frame);
}
},
isAutoFullScreenEnabled: function() {
return this._autoFullScreen;
},
setCanvasSize: function(t, e) {
var i = cc.game.canvas, n = cc.game.container;
i.width = t * this._devicePixelRatio;
i.height = e * this._devicePixelRatio;
i.style.width = t + "px";
i.style.height = e + "px";
n.style.width = t + "px";
n.style.height = e + "px";
this._resizeEvent();
},
getCanvasSize: function() {
return cc.size(cc.game.canvas.width, cc.game.canvas.height);
},
getFrameSize: function() {
return cc.size(this._frameSize.width, this._frameSize.height);
},
setFrameSize: function(t, e) {
this._frameSize.width = t;
this._frameSize.height = e;
cc.game.frame.style.width = t + "px";
cc.game.frame.style.height = e + "px";
this._resizeEvent(!0);
},
getVisibleSize: function() {
return cc.size(this._visibleRect.width, this._visibleRect.height);
},
getVisibleSizeInPixel: function() {
return cc.size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
},
getVisibleOrigin: function() {
return cc.v2(this._visibleRect.x, this._visibleRect.y);
},
getVisibleOriginInPixel: function() {
return cc.v2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
},
getResolutionPolicy: function() {
return this._resolutionPolicy;
},
setResolutionPolicy: function(t) {
var e = this;
if (t instanceof cc.ResolutionPolicy) e._resolutionPolicy = t; else {
var i = cc.ResolutionPolicy;
t === i.EXACT_FIT && (e._resolutionPolicy = e._rpExactFit);
t === i.SHOW_ALL && (e._resolutionPolicy = e._rpShowAll);
t === i.NO_BORDER && (e._resolutionPolicy = e._rpNoBorder);
t === i.FIXED_HEIGHT && (e._resolutionPolicy = e._rpFixedHeight);
t === i.FIXED_WIDTH && (e._resolutionPolicy = e._rpFixedWidth);
}
},
setDesignResolutionSize: function(t, e, i) {
if (t > 0 || e > 0) {
this.setResolutionPolicy(i);
var n = this._resolutionPolicy;
n && n.preApply(this);
cc.sys.isMobile && this._adjustViewportMeta();
this._orientationChanging = !0;
this._resizing || this._initFrameSize();
if (n) {
this._originalDesignResolutionSize.width = this._designResolutionSize.width = t;
this._originalDesignResolutionSize.height = this._designResolutionSize.height = e;
var r = n.apply(this, this._designResolutionSize);
if (r.scale && 2 === r.scale.length) {
this._scaleX = r.scale[0];
this._scaleY = r.scale[1];
}
if (r.viewport) {
var a = this._viewportRect, o = this._visibleRect, c = r.viewport;
a.x = c.x;
a.y = c.y;
a.width = c.width;
a.height = c.height;
o.x = 0;
o.y = 0;
o.width = c.width / this._scaleX;
o.height = c.height / this._scaleY;
}
n.postApply(this);
cc.winSize.width = this._visibleRect.width;
cc.winSize.height = this._visibleRect.height;
cc.visibleRect && cc.visibleRect.init(this._visibleRect);
s.updateCameraViewport();
cc.internal.inputManager._updateCanvasBoundingRect();
this.emit("design-resolution-changed");
} else cc.logID(2201);
} else cc.logID(2200);
},
getDesignResolutionSize: function() {
return cc.size(this._designResolutionSize.width, this._designResolutionSize.height);
},
setRealPixelResolution: function(t, e, i) {
0;
this.setDesignResolutionSize(t, e, i);
},
setViewportInPoints: function(t, e, i, n) {
var r = this._scaleX, s = this._scaleY;
cc.game._renderContext.viewport(t * r + this._viewportRect.x, e * s + this._viewportRect.y, i * r, n * s);
},
setScissorInPoints: function(t, e, i, n) {
var r = this._scaleX, s = this._scaleY, a = Math.ceil(t * r + this._viewportRect.x), c = Math.ceil(e * s + this._viewportRect.y), l = Math.ceil(i * r), u = Math.ceil(n * s), h = cc.game._renderContext;
if (!o) {
var f = h.getParameter(h.SCISSOR_BOX);
o = cc.rect(f[0], f[1], f[2], f[3]);
}
if (o.x !== a || o.y !== c || o.width !== l || o.height !== u) {
o.x = a;
o.y = c;
o.width = l;
o.height = u;
h.scissor(a, c, l, u);
}
},
isScissorEnabled: function() {
return cc.game._renderContext.isEnabled(gl.SCISSOR_TEST);
},
getScissorRect: function() {
if (!o) {
var t = gl.getParameter(gl.SCISSOR_BOX);
o = cc.rect(t[0], t[1], t[2], t[3]);
}
var e = 1 / this._scaleX, i = 1 / this._scaleY;
return cc.rect((o.x - this._viewportRect.x) * e, (o.y - this._viewportRect.y) * i, o.width * e, o.height * i);
},
getViewportRect: function() {
return this._viewportRect;
},
getScaleX: function() {
return this._scaleX;
},
getScaleY: function() {
return this._scaleY;
},
getDevicePixelRatio: function() {
return this._devicePixelRatio;
},
convertToLocationInView: function(t, e, i, n) {
var r = n || cc.v2(), s = i.adjustedLeft ? i.adjustedLeft : i.left, a = i.adjustedTop ? i.adjustedTop : i.top, o = this._devicePixelRatio * (t - s), c = this._devicePixelRatio * (a + i.height - e);
if (this._isRotated) {
r.x = cc.game.canvas.width - c;
r.y = o;
} else {
r.x = o;
r.y = c;
}
return r;
},
_convertMouseToLocationInView: function(t, e) {
var i = this._viewportRect;
t.x = (this._devicePixelRatio * (t.x - e.left) - i.x) / this._scaleX;
t.y = (this._devicePixelRatio * (e.top + e.height - t.y) - i.y) / this._scaleY;
},
_convertPointWithScale: function(t) {
var e = this._viewportRect;
t.x = (t.x - e.x) / this._scaleX;
t.y = (t.y - e.y) / this._scaleY;
},
_convertTouchesWithScale: function(t) {
for (var e, i, n, r = this._viewportRect, s = this._scaleX, a = this._scaleY, o = 0; o < t.length; o++) {
i = (e = t[o])._point;
n = e._prevPoint;
i.x = (i.x - r.x) / s;
i.y = (i.y - r.y) / a;
n.x = (n.x - r.x) / s;
n.y = (n.y - r.y) / a;
}
}
});
cc.ContainerStrategy = cc.Class({
name: "ContainerStrategy",
preApply: function(t) {},
apply: function(t, e) {},
postApply: function(t) {},
_setupContainer: function(t, e, i) {
var n = cc.game.canvas;
this._setupStyle(t, e, i);
var r = t._devicePixelRatio = 1;
r = t._devicePixelRatio = window.devicePixelRatio;
n.width = e * r;
n.height = i * r;
},
_setupStyle: function(t, e, i) {
var n = cc.game.canvas, r = cc.game.container;
if (cc.sys.os === cc.sys.OS_ANDROID) {
document.body.style.width = (t._isRotated ? i : e) + "px";
document.body.style.height = (t._isRotated ? e : i) + "px";
}
r.style.width = n.style.width = e + "px";
r.style.height = n.style.height = i + "px";
},
_fixContainer: function() {
document.body.insertBefore(cc.game.container, document.body.firstChild);
var t = document.body.style;
t.width = window.innerWidth + "px";
t.height = window.innerHeight + "px";
t.overflow = "hidden";
var e = cc.game.container.style;
e.position = "fixed";
e.left = e.top = "0px";
document.body.scrollTop = 0;
}
});
cc.ContentStrategy = cc.Class({
name: "ContentStrategy",
ctor: function() {
this._result = {
scale: [ 1, 1 ],
viewport: null
};
},
_buildResult: function(t, e, i, n, r, s) {
Math.abs(t - i) < 2 && (i = t);
Math.abs(e - n) < 2 && (n = e);
var a = cc.rect((t - i) / 2, (e - n) / 2, i, n);
cc.game.renderType, cc.game.RENDER_TYPE_CANVAS;
this._result.scale = [ r, s ];
this._result.viewport = a;
return this._result;
},
preApply: function(t) {},
apply: function(t, e) {
return {
scale: [ 1, 1 ]
};
},
postApply: function(t) {}
});
(function() {
var t = cc.Class({
name: "EqualToFrame",
extends: cc.ContainerStrategy,
apply: function(t) {
var e = t._frameSize.height, i = cc.game.container.style;
this._setupContainer(t, t._frameSize.width, t._frameSize.height);
t._isRotated ? i.margin = "0 0 0 " + e + "px" : i.margin = "0px";
i.padding = "0px";
}
}), e = cc.Class({
name: "ProportionalToFrame",
extends: cc.ContainerStrategy,
apply: function(t, e) {
var i, n, r = t._frameSize.width, s = t._frameSize.height, a = cc.game.container.style, o = e.width, c = e.height, l = r / o, u = s / c;
l < u ? (i = r, n = c * l) : (i = o * u, n = s);
var h = Math.round((r - i) / 2), f = Math.round((s - n) / 2);
i = r - 2 * h;
n = s - 2 * f;
this._setupContainer(t, i, n);
t._isRotated ? a.margin = "0 0 0 " + s + "px" : a.margin = "0px";
a.paddingLeft = h + "px";
a.paddingRight = h + "px";
a.paddingTop = f + "px";
a.paddingBottom = f + "px";
}
}), i = (cc.Class({
name: "EqualToWindow",
extends: t,
preApply: function(t) {
this._super(t);
cc.game.frame = document.documentElement;
},
apply: function(t) {
this._super(t);
this._fixContainer();
}
}), cc.Class({
name: "ProportionalToWindow",
extends: e,
preApply: function(t) {
this._super(t);
cc.game.frame = document.documentElement;
},
apply: function(t, e) {
this._super(t, e);
this._fixContainer();
}
}), cc.Class({
name: "OriginalContainer",
extends: cc.ContainerStrategy,
apply: function(t) {
this._setupContainer(t, cc.game.canvas.width, cc.game.canvas.height);
}
})), n = ("undefined" == typeof window ? global : window).__globalAdapter;
if (n) {
n.adaptContainerStrategy && n.adaptContainerStrategy(cc.ContainerStrategy.prototype);
n.adaptView && n.adaptView(c.prototype);
}
cc.ContainerStrategy.EQUAL_TO_FRAME = new t();
cc.ContainerStrategy.PROPORTION_TO_FRAME = new e();
cc.ContainerStrategy.ORIGINAL_CONTAINER = new i();
var r = cc.Class({
name: "ExactFit",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = i / e.width, s = n / e.height;
return this._buildResult(i, n, i, n, r, s);
}
}), s = cc.Class({
name: "ShowAll",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i, n, r = cc.game.canvas.width, s = cc.game.canvas.height, a = e.width, o = e.height, c = r / a, l = s / o, u = 0;
c < l ? (i = r, n = o * (u = c)) : (i = a * (u = l), n = s);
return this._buildResult(r, s, i, n, u, u);
}
}), a = cc.Class({
name: "NoBorder",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i, n, r, s = cc.game.canvas.width, a = cc.game.canvas.height, o = e.width, c = e.height, l = s / o, u = a / c;
l < u ? (n = o * (i = u), r = a) : (n = s, r = c * (i = l));
return this._buildResult(s, a, n, r, i, i);
}
}), o = cc.Class({
name: "FixedHeight",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = n / e.height, s = i, a = n;
return this._buildResult(i, n, s, a, r, r);
}
}), l = cc.Class({
name: "FixedWidth",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = i / e.width, s = i, a = n;
return this._buildResult(i, n, s, a, r, r);
}
});
cc.ContentStrategy.EXACT_FIT = new r();
cc.ContentStrategy.SHOW_ALL = new s();
cc.ContentStrategy.NO_BORDER = new a();
cc.ContentStrategy.FIXED_HEIGHT = new o();
cc.ContentStrategy.FIXED_WIDTH = new l();
})();
cc.ResolutionPolicy = cc.Class({
name: "cc.ResolutionPolicy",
ctor: function(t, e) {
this._containerStrategy = null;
this._contentStrategy = null;
this.setContainerStrategy(t);
this.setContentStrategy(e);
},
preApply: function(t) {
this._containerStrategy.preApply(t);
this._contentStrategy.preApply(t);
},
apply: function(t, e) {
this._containerStrategy.apply(t, e);
return this._contentStrategy.apply(t, e);
},
postApply: function(t) {
this._containerStrategy.postApply(t);
this._contentStrategy.postApply(t);
},
setContainerStrategy: function(t) {
t instanceof cc.ContainerStrategy && (this._containerStrategy = t);
},
setContentStrategy: function(t) {
t instanceof cc.ContentStrategy && (this._contentStrategy = t);
}
});
r.get(cc.ResolutionPolicy.prototype, "canvasSize", (function() {
return cc.v2(cc.game.canvas.width, cc.game.canvas.height);
}));
cc.ResolutionPolicy.EXACT_FIT = 0;
cc.ResolutionPolicy.NO_BORDER = 1;
cc.ResolutionPolicy.SHOW_ALL = 2;
cc.ResolutionPolicy.FIXED_HEIGHT = 3;
cc.ResolutionPolicy.FIXED_WIDTH = 4;
cc.ResolutionPolicy.UNKNOWN = 5;
cc.view = new c();
cc.winSize = cc.size();
e.exports = cc.view;
}), {
"../event/event-target": 64,
"../platform/CCClass": 92,
"../platform/js": 112,
"../renderer": 123
} ],
103: [ (function(t, e, i) {
"use strict";
cc.visibleRect = {
topLeft: cc.v2(0, 0),
topRight: cc.v2(0, 0),
top: cc.v2(0, 0),
bottomLeft: cc.v2(0, 0),
bottomRight: cc.v2(0, 0),
bottom: cc.v2(0, 0),
center: cc.v2(0, 0),
left: cc.v2(0, 0),
right: cc.v2(0, 0),
width: 0,
height: 0,
init: function(t) {
var e = this.width = t.width, i = this.height = t.height, n = t.x, r = t.y, s = r + i, a = n + e;
this.topLeft.x = n;
this.topLeft.y = s;
this.topRight.x = a;
this.topRight.y = s;
this.top.x = n + e / 2;
this.top.y = s;
this.bottomLeft.x = n;
this.bottomLeft.y = r;
this.bottomRight.x = a;
this.bottomRight.y = r;
this.bottom.x = n + e / 2;
this.bottom.y = r;
this.center.x = n + e / 2;
this.center.y = r + i / 2;
this.left.x = n;
this.left.y = r + i / 2;
this.right.x = a;
this.right.y = r + i / 2;
}
};
}), {} ],
104: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = (t("./utils").isPlainEmptyObj_DEV, "$_$");
function s(t, e) {
var i = e ? Object.create(e) : {};
n.value(t, "__attrs__", i);
return i;
}
function a(t) {
if ("function" != typeof t) {
return s(t, c(t.constructor));
}
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var r = i[n];
r.hasOwnProperty("__attrs__") && r.__attrs__ || s(r, (e = i[n + 1]) && e.__attrs__);
}
s(t, (e = i[0]) && e.__attrs__);
return t.__attrs__;
}
function o(t, e, i) {
var n = c(t), s = e + r, a = {};
for (var o in n) o.startsWith(s) && (a[o.slice(s.length)] = n[o]);
return a;
}
function c(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || a(t);
}
function l(t, e) {
this.name = t;
this.default = e;
}
l.prototype.toString = function() {
return this.name;
};
cc.Integer = new l("Integer", 0);
cc.Float = new l("Float", 0);
0;
cc.Boolean = new l("Boolean", !1);
cc.String = new l("String", "");
e.exports = {
PrimitiveType: l,
attr: o,
getClassAttrs: c,
setClassAttr: function(t, e, i, n) {
c(t)[e + r + i] = n;
},
DELIMETER: r,
getTypeChecker_ET: !1,
getObjTypeChecker_ET: !1,
ScriptUuid: {}
};
}), {
"./CCClass": 92,
"./js": 112,
"./utils": 116
} ],
105: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = n.array.fastRemoveAt;
function s() {}
function a() {
this.callback = s;
this.target = void 0;
this.once = !1;
}
a.prototype.set = function(t, e, i) {
this.callback = t;
this.target = e;
this.once = !!i;
};
var o = new n.Pool(function(t) {
t.callback = s;
t.target = void 0;
t.once = !1;
return !0;
}, 32);
o.get = function() {
return this._get() || new a();
};
function c() {
this.callbackInfos = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
var l = c.prototype;
l.removeByCallback = function(t) {
for (var e = 0; e < this.callbackInfos.length; ++e) {
var i = this.callbackInfos[e];
if (i && i.callback === t) {
o.put(i);
r(this.callbackInfos, e);
--e;
}
}
};
l.removeByTarget = function(t) {
for (var e = 0; e < this.callbackInfos.length; ++e) {
var i = this.callbackInfos[e];
if (i && i.target === t) {
o.put(i);
r(this.callbackInfos, e);
--e;
}
}
};
l.cancel = function(t) {
var e = this.callbackInfos[t];
if (e) {
o.put(e);
this.callbackInfos[t] = null;
}
this.containCanceled = !0;
};
l.cancelAll = function() {
for (var t = 0; t < this.callbackInfos.length; t++) {
var e = this.callbackInfos[t];
if (e) {
o.put(e);
this.callbackInfos[t] = null;
}
}
this.containCanceled = !0;
};
l.purgeCanceled = function() {
for (var t = this.callbackInfos.length - 1; t >= 0; --t) {
this.callbackInfos[t] || r(this.callbackInfos, t);
}
this.containCanceled = !1;
};
l.clear = function() {
this.cancelAll();
this.callbackInfos.length = 0;
this.isInvoking = !1;
this.containCanceled = !1;
};
var u = new n.Pool(function(t) {
t.callbackInfos = [];
t.isInvoking = !1;
t.containCanceled = !1;
return !0;
}, 16);
u.get = function() {
return this._get() || new c();
};
function h() {
this._callbackTable = n.createMap(!0);
}
(l = h.prototype).on = function(t, e, i, n) {
var r = this._callbackTable[t];
r || (r = this._callbackTable[t] = u.get());
var s = o.get();
s.set(e, i, n);
r.callbackInfos.push(s);
};
l.hasEventListener = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var r = n.callbackInfos;
if (!e) {
if (n.isInvoking) {
for (var s = 0; s < r.length; ++s) if (r[s]) return !0;
return !1;
}
return r.length > 0;
}
for (var a = 0; a < r.length; ++a) {
var o = r[a];
if (o && o.callback === e && o.target === i) return !0;
}
return !1;
};
l.removeAll = function(t) {
if ("string" == typeof t) {
var e = this._callbackTable[t];
if (e) if (e.isInvoking) e.cancelAll(); else {
e.clear();
u.put(e);
delete this._callbackTable[t];
}
} else if (t) for (var i in this._callbackTable) {
var n = this._callbackTable[i];
if (n.isInvoking) for (var r = n.callbackInfos, s = 0; s < r.length; ++s) {
var a = r[s];
a && a.target === t && n.cancel(s);
} else n.removeByTarget(t);
}
};
l.off = function(t, e, i) {
var n = this._callbackTable[t];
if (n) for (var s = n.callbackInfos, a = 0; a < s.length; ++a) {
var c = s[a];
if (c && c.callback === e && c.target === i) {
if (n.isInvoking) n.cancel(a); else {
r(s, a);
o.put(c);
}
break;
}
}
};
l.emit = function(t, e, i, n, r, s) {
var a = this._callbackTable[t];
if (a) {
var o = !a.isInvoking;
a.isInvoking = !0;
for (var c = a.callbackInfos, l = 0, u = c.length; l < u; ++l) {
var h = c[l];
if (h) {
var f = h.target, _ = h.callback;
h.once && this.off(t, _, f);
f ? _.call(f, e, i, n, r, s) : _(e, i, n, r, s);
}
}
if (o) {
a.isInvoking = !1;
a.containCanceled && a.purgeCanceled();
}
}
};
0;
e.exports = h;
}), {
"./js": 112
} ],
106: [ (function(t, e, i) {
"use strict";
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var r = e[i];
Array.isArray(r) ? n(t, r) : t.push(r);
}
}
e.exports = {
flattenCodeArray: function(t) {
var e = [];
n(e, t);
return e.join("");
}
};
}), {} ],
107: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = t("./attribute"), s = t("./CCClass"), a = t("../utils/misc"), o = function() {
this.uuidList = [];
this.uuidObjList = [];
this.uuidPropList = [];
this._stillUseUrl = n.createMap(!0);
};
o.prototype.reset = function() {
this.uuidList.length = 0;
this.uuidObjList.length = 0;
this.uuidPropList.length = 0;
n.clear(this._stillUseUrl);
};
0;
o.prototype.push = function(t, e, i, n) {
n && (this._stillUseUrl[this.uuidList.length] = !0);
this.uuidList.push(i);
this.uuidObjList.push(t);
this.uuidPropList.push(e);
};
(o.pool = new n.Pool(function(t) {
t.reset();
}, 10)).get = function() {
return this._get() || new o();
};
var c = (function() {
function t(t, e, i, n, r) {
this.result = t;
this.customEnv = n;
this.deserializedList = [];
this.deserializedData = null;
this._classFinder = i;
0;
this._idList = [];
this._idObjList = [];
this._idPropList = [];
}
function e(t) {
var e, i, n, r = t.deserializedList, s = t._idPropList, a = t._idList, o = t._idObjList;
t._classFinder && t._classFinder.onDereferenced;
for (e = 0; e < a.length; e++) {
i = s[e];
n = a[e];
o[e][i] = r[n];
}
}
var i = t.prototype;
i.deserialize = function(t) {
if (Array.isArray(t)) {
var i = t, n = i.length;
this.deserializedList.length = n;
for (var r = 0; r < n; r++) if (i[r]) {
this.deserializedList[r] = this._deserializeObject(i[r], !1);
}
this.deserializedData = n > 0 ? this.deserializedList[0] : [];
} else {
this.deserializedList.length = 1;
this.deserializedData = t ? this._deserializeObject(t, !1) : null;
this.deserializedList[0] = this.deserializedData;
}
e(this);
return this.deserializedData;
};
i._deserializeObject = function(t, e, i, r, s) {
var a, o = null, c = null, u = t.__type__;
if ("TypedArray" === u) {
var h = t.array;
o = new window[t.ctor](h.length);
for (var f = 0; f < h.length; ++f) o[f] = h[f];
return o;
}
if (u) {
if (!(c = this._classFinder(u, t, r, s))) {
this._classFinder === n._getClassById && cc.deserialize.reportMissingClass(u);
return null;
}
if ((o = new c())._deserialize) {
o._deserialize(t.content, this);
return o;
}
cc.Class._isCCClass(c) ? l(this, o, t, c, i) : this._deserializeTypedObject(o, t, c);
} else if (Array.isArray(t)) {
o = new Array(t.length);
for (var _ = 0; _ < t.length; _++) "object" == typeof (a = t[_]) && a ? this._deserializeObjField(o, a, "" + _, null, e) : o[_] = a;
} else {
o = {};
this._deserializePrimitiveObject(o, t);
}
return o;
};
i._deserializeObjField = function(t, e, i, n, r) {
var s = e.__id__;
if (void 0 === s) {
var a = e.__uuid__;
a ? this.result.push(t, i, a, r) : t[i] = this._deserializeObject(e, r);
} else {
var o = this.deserializedList[s];
if (o) t[i] = o; else {
this._idList.push(s);
this._idObjList.push(t);
this._idPropList.push(i);
}
}
};
i._deserializePrimitiveObject = function(t, e) {
for (var i in e) if (e.hasOwnProperty(i)) {
var n = e[i];
"object" != typeof n ? "__type__" !== i && (t[i] = n) : n ? this._deserializeObjField(t, n, i) : t[i] = null;
}
};
i._deserializeTypedObject = function(t, e, i) {
if (i !== cc.Vec2) if (i !== cc.Vec3) if (i !== cc.Color) if (i !== cc.Size) for (var n = r.DELIMETER + "default", a = r.getClassAttrs(i), o = i.__props__ || Object.keys(t), c = 0; c < o.length; c++) {
var l = o[c], u = e[l];
void 0 !== u && e.hasOwnProperty(l) || (u = s.getDefault(a[l + n]));
"object" != typeof u ? t[l] = u : u ? this._deserializeObjField(t, u, l) : t[l] = null;
} else {
t.width = e.width || 0;
t.height = e.height || 0;
} else {
t.r = e.r || 0;
t.g = e.g || 0;
t.b = e.b || 0;
var h = e.a;
t.a = void 0 === h ? 255 : h;
} else {
t.x = e.x || 0;
t.y = e.y || 0;
t.z = e.z || 0;
} else {
t.x = e.x || 0;
t.y = e.y || 0;
}
};
function o(t, e, i, r, s, a) {
if (e instanceof cc.ValueType) {
s || t.push("if(prop){");
var o = n.getClassName(e);
t.push("s._deserializeTypedObject(o" + i + ",prop," + o + ");");
s || t.push("}else o" + i + "=null;");
} else {
t.push("if(prop){");
t.push("s._deserializeObjField(o,prop," + r + ",null," + !!a + ");");
t.push("}else o" + i + "=null;");
}
}
var c = function(t, e) {
for (var i = r.DELIMETER + "type", c = (r.DELIMETER, r.DELIMETER + "default"), l = r.DELIMETER + "saveUrlAsAsset", u = r.DELIMETER + "formerlySerializedAs", h = r.getClassAttrs(e), f = e.__values__, _ = [ "var prop;" ], d = a.BUILTIN_CLASSID_RE.test(n._getClassId(e)), p = 0; p < f.length; p++) {
var v, g, m = f[p];
0;
if (s.IDENTIFIER_RE.test(m)) {
g = '"' + m + '"';
v = "." + m;
} else v = "[" + (g = s.escapeForJS(m)) + "]";
var y = v;
if (h[m + u]) {
var E = h[m + u];
y = s.IDENTIFIER_RE.test(E) ? "." + E : "[" + s.escapeForJS(E) + "]";
}
_.push("prop=d" + y + ";");
_.push('if(typeof (prop)!=="undefined"){');
var C = h[m + l], A = s.getDefault(h[m + c]);
if (d) {
var T, x = h[m + i];
if (void 0 === A && x) T = x instanceof r.PrimitiveType; else {
var S = typeof A;
T = "string" === S && !C || "number" === S || "boolean" === S;
}
T ? _.push("o" + v + "=prop;") : o(_, A, v, g, !0, C);
} else {
_.push('if(typeof (prop)!=="object"){o' + v + "=prop;}else{");
o(_, A, v, g, !1, C);
_.push("}");
}
_.push("}");
}
if (cc.js.isChildClassOf(e, cc._BaseNode) || cc.js.isChildClassOf(e, cc.Component)) {
_.push("d._id&&(o._id=d._id);");
}
if ("_$erialized" === f[f.length - 1]) {
_.push("o._$erialized=JSON.parse(JSON.stringify(d));");
_.push("s._deserializePrimitiveObject(o._$erialized,d);");
}
return Function("s", "o", "d", "k", "t", _.join(""));
};
function l(t, e, i, r, s) {
var a;
if (r.hasOwnProperty("__deserialize__")) a = r.__deserialize__; else {
a = c(t, r);
n.value(r, "__deserialize__", a, !0);
}
a(t, e, i, r, s);
0;
}
t.pool = new n.Pool(function(t) {
t.result = null;
t.customEnv = null;
t.deserializedList.length = 0;
t.deserializedData = null;
t._classFinder = null;
0;
t._idList.length = 0;
t._idObjList.length = 0;
t._idPropList.length = 0;
}, 1);
t.pool.get = function(e, i, n, r, s) {
var a = this._get();
if (a) {
a.result = e;
a.customEnv = r;
a._classFinder = n;
0;
return a;
}
return new t(e, i, n, r, s);
};
return t;
})();
cc.deserialize = function(t, e, i) {
var r = (i = i || {}).classFinder || n._getClassById, s = i.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE, a = i.customEnv, l = i.ignoreEditorOnly;
0;
"string" == typeof t && (t = JSON.parse(t));
var u = !e;
e = e || o.pool.get();
var h = c.pool.get(e, !1, r, a, l);
cc.game._isCloning = !0;
var f = h.deserialize(t);
cc.game._isCloning = !1;
c.pool.put(h);
s && e.assignAssetsBy(Editor.serialize.asAsset);
u && o.pool.put(e);
return f;
};
cc.deserialize.Details = o;
cc.deserialize.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
}), {
"../utils/misc": 153,
"./CCClass": 92,
"./attribute": 104,
"./js": 112
} ],
108: [ (function(t, e, i) {
"use strict";
var n = ".";
function r(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + n : "";
}
r.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
r.global = new r("global");
e.exports = r;
}), {} ],
109: [ (function(t, e, i) {
"use strict";
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./url");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCAssetLibrary");
t("./CCVisibleRect");
}), {
"./CCAssetLibrary": 91,
"./CCClass": 92,
"./CCClassDecorator": 93,
"./CCEnum": 94,
"./CCMacro": 97,
"./CCObject": 98,
"./CCSys": 101,
"./CCVisibleRect": 103,
"./callbacks-invoker": 105,
"./deserialize": 107,
"./instantiate": 111,
"./instantiate-jit": 110,
"./js": 112,
"./requiring-frame": 114,
"./url": 115
} ],
110: [ (function(t, e, i) {
"use strict";
var n = t("./CCObject"), r = n.Flags.Destroyed, s = n.Flags.PersistentMask, a = t("./attribute"), o = t("./js"), c = t("./CCClass"), l = t("./compiler"), u = a.DELIMETER + "default", h = c.IDENTIFIER_RE, f = c.escapeForJS, _ = "var ", d = "o", p = "t", v = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
try {
!Float32Array.name && (Float32Array.name = "Float32Array");
!Float64Array.name && (Float64Array.name = "Float64Array");
!Int8Array.name && (Int8Array.name = "Int8Array");
!Int16Array.name && (Int16Array.name = "Int16Array");
!Int32Array.name && (Int32Array.name = "Int32Array");
!Uint8Array.name && (Uint8Array.name = "Uint8Array");
!Uint16Array.name && (Uint16Array.name = "Uint16Array");
!Uint32Array.name && (Uint32Array.name = "Uint32Array");
} catch (t) {}
function g(t) {
if (t === Float32Array) return "Float32Array";
if (t === Float64Array) return "Float64Array";
if (t === Int8Array) return "Int8Array";
if (t === Int16Array) return "Int16Array";
if (t === Int32Array) return "Int32Array";
if (t === Uint8Array) return "Uint8Array";
if (t === Uint16Array) return "Uint16Array";
if (t === Uint32Array) return "Uint32Array";
throw new Error("Unknown TypedArray could not be instantiated: " + t);
}
function m(t, e) {
this.varName = t;
this.expression = e;
}
m.prototype.toString = function() {
return _ + this.varName + "=" + this.expression + ";";
};
function y(t, e) {
return e instanceof m ? new m(e.varName, t + e.expression) : t + e;
}
function E(t, e, i) {
if (Array.isArray(i)) {
i[0] = y(e, i[0]);
t.push(i);
} else t.push(y(e, i) + ";");
}
function C(t) {
this._exps = [];
this._targetExp = t;
}
C.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
C.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(p + "=" + this._targetExp + ";");
e = p;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
E(t, e + T(n[0]) + "=", n[1]);
}
};
C.pool = new o.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1);
C.pool.get = function(t) {
var e = this._get() || new C();
e._targetExp = t;
return e;
};
function A(t, e) {
if ("function" == typeof t) try {
t = t();
} catch (t) {
return !1;
}
if (t === e) return !0;
if (t && e) {
if (t instanceof cc.ValueType && t.equals(e)) return !0;
if (Array.isArray(t) && Array.isArray(e) || t.constructor === Object && e.constructor === Object) try {
return Array.isArray(t) && Array.isArray(e) && 0 === t.length && 0 === e.length;
} catch (t) {}
}
return !1;
}
function T(t) {
return h.test(t) ? "." + t : "[" + f(t) + "]";
}
function x(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = o.createMap();
o.mixin(this.funcModuleCache, v);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(_ + d + "," + p + ";", "if(R){", d + "=R;", "}else{", d + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
o.value(t, "_iN$t", {
globalVar: "R"
}, !0);
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = _ + this.globalVariables.join(",") + ";");
var n = l.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var r = 0, s = this.objsToClear_iN$t.length; r < s; ++r) this.objsToClear_iN$t[r]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var S = x.prototype;
S.getFuncModule = function(t, e) {
var i = o.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var r = -1 !== i.indexOf(".");
if (r) try {
if (r = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var s = this.funcs.indexOf(t);
if (s < 0) {
s = this.funcs.length;
this.funcs.push(t);
}
var a = "F[" + s + "]";
e && (a = "(" + a + ")");
this.funcModuleCache[i] = a;
return a;
};
S.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
S.setValueType = function(t, e, i, n) {
var r = C.pool.get(n), s = e.constructor.__props__;
s || (s = Object.keys(e));
for (var a = 0; a < s.length; a++) {
var o = s[a], c = i[o];
if (e[o] !== c) {
var l = this.enumerateField(i, o, c);
r.append(o, l);
}
}
r.writeCode(t);
C.pool.put(r);
};
S.enumerateCCClass = function(t, e, i) {
for (var n = i.__values__, r = a.getClassAttrs(i), s = 0; s < n.length; s++) {
var o = n[s], l = e[o], h = r[o + u];
if (!A(h, l)) if ("object" == typeof l && l instanceof cc.ValueType && (h = c.getDefault(h)) && h.constructor === l.constructor) {
var f = d + T(o);
this.setValueType(t, h, l, f);
} else this.setObjProp(t, e, o, l);
}
};
S.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new m(e, "new Array(" + t.length + ")") ];
o.value(t, "_iN$t", {
globalVar: "",
source: i
}, !0);
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) {
E(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
}
return i;
};
S.instantiateTypedArray = function(t) {
var e = t.constructor.name || g(t.constructor);
if (0 === t.length) return "new " + e;
var i = "a" + ++this.localVariableId, n = [ new m(i, "new " + e + "(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
for (var r = 0; r < t.length; ++r) if (0 !== t[r]) {
E(n, i + "[" + r + "]=", t[r]);
}
return n;
};
S.enumerateField = function(t, e, i) {
if ("object" == typeof i && i) {
var r = i._iN$t;
if (r) {
var a = r.globalVar;
if (!a) {
a = r.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(a);
var o = r.source[0];
r.source[0] = y(a + "=", o);
}
return a;
}
return ArrayBuffer.isView(i) ? this.instantiateTypedArray(i) : Array.isArray(i) ? this.instantiateArray(i) : this.instantiateObj(i);
}
if ("function" == typeof i) return this.getFuncModule(i);
if ("string" == typeof i) return f(i);
"_objFlags" === e && t instanceof n && (i &= s);
return i;
};
S.setObjProp = function(t, e, i, n) {
E(t, d + T(i) + "=", this.enumerateField(e, i, n));
};
S.enumerateObject = function(t, e) {
var i = e.constructor;
if (cc.Class._isCCClass(i)) this.enumerateCCClass(t, e, i); else for (var n in e) if (e.hasOwnProperty(n) && (95 !== n.charCodeAt(0) || 95 !== n.charCodeAt(1) || "__type__" === n)) {
var r = e[n];
"object" == typeof r && r && r === e._iN$t || this.setObjProp(t, e, n, r);
}
};
S.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return c.getNewValueTypeCode(t);
if (t instanceof cc.Asset) return this.getObjRef(t);
if (t._objFlags & r) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new m(d, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new m(d, "{}"); else {
if (i) return this.getObjRef(t);
e = new m(d, "Object.create(null)");
}
var n = [ e ];
o.value(t, "_iN$t", {
globalVar: "",
source: n
}, !0);
this.objsToClear_iN$t.push(t);
this.enumerateObject(n, t);
return [ "(function(){", n, "return o;})();" ];
};
e.exports = {
compile: function(t) {
return new x(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: A
};
0;
}), {
"./CCClass": 92,
"./CCObject": 98,
"./attribute": 104,
"./compiler": 106,
"./js": 112
} ],
111: [ (function(t, e, i) {
"use strict";
var n = t("./CCObject"), r = t("../value-types/value-type"), s = n.Flags.Destroyed, a = n.Flags.PersistentMask, o = t("./utils").isDomNode, c = t("./js");
function l(t, e) {
if (!e) {
if ("object" != typeof t || Array.isArray(t)) {
0;
return null;
}
if (!t) {
0;
return null;
}
if (!cc.isValid(t)) {
0;
return null;
}
0;
}
var i;
if (t instanceof n) {
if (t._instantiate) {
cc.game._isCloning = !0;
i = t._instantiate();
cc.game._isCloning = !1;
return i;
}
if (t instanceof cc.Asset) {
0;
return null;
}
}
cc.game._isCloning = !0;
i = h(t);
cc.game._isCloning = !1;
return i;
}
var u = [];
function h(t, e) {
if (Array.isArray(t)) {
0;
return null;
}
if (o && o(t)) {
0;
return null;
}
var i;
if (t._iN$t) i = t._iN$t; else if (t.constructor) {
i = new (0, t.constructor)();
} else i = Object.create(null);
_(t, i, e);
for (var n = 0, r = u.length; n < r; ++n) u[n]._iN$t = null;
u.length = 0;
return i;
}
function f(t, e, i, n) {
for (var s = t.__values__, a = 0; a < s.length; a++) {
var o = s[a], c = e[o];
if ("object" == typeof c && c) {
var l = i[o];
l instanceof r && l.constructor === c.constructor ? l.set(c) : i[o] = c._iN$t || d(c, n);
} else i[o] = c;
}
}
function _(t, e, i) {
c.value(t, "_iN$t", e, !0);
u.push(t);
var r = t.constructor;
if (cc.Class._isCCClass(r)) f(r, t, e, i); else for (var s in t) if (t.hasOwnProperty(s) && (95 !== s.charCodeAt(0) || 95 !== s.charCodeAt(1) || "__type__" === s)) {
var o = t[s];
if ("object" == typeof o && o) {
if (o === e) continue;
e[s] = o._iN$t || d(o, i);
} else e[s] = o;
}
t instanceof n && (e._objFlags &= a);
}
function d(t, e) {
if (t instanceof r) return t.clone();
if (t instanceof cc.Asset) return t;
var i;
if (ArrayBuffer.isView(t)) {
var n = t.length;
i = new t.constructor(n);
t._iN$t = i;
u.push(t);
for (var a = 0; a < n; ++a) i[a] = t[a];
return i;
}
if (Array.isArray(t)) {
var o = t.length;
i = new Array(o);
c.value(t, "_iN$t", i, !0);
u.push(t);
for (var l = 0; l < o; ++l) {
var h = t[l];
i[l] = "object" == typeof h && h ? h._iN$t || d(h, e) : h;
}
return i;
}
if (t._objFlags & s) return null;
var f = t.constructor;
if (cc.Class._isCCClass(f)) {
if (e) if (e instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return t;
} else if (e instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(e)) return t;
} else if (t instanceof cc.Component && !t.node.isChildOf(e)) return t;
i = new f();
} else if (f === Object) i = {}; else {
if (f) return t;
i = Object.create(null);
}
_(t, i, e);
return i;
}
l._clone = h;
cc.instantiate = l;
e.exports = l;
}), {
"../value-types/value-type": 176,
"./CCObject": 98,
"./js": 112,
"./utils": 116
} ],
112: [ (function(t, e, i) {
"use strict";
var n = new (t("./id-generater"))("TmpCId.");
function r(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function s(t, e, i) {
var n = r(e, t);
Object.defineProperty(i, t, n);
}
var a = {
isNumber: function(t) {
return "number" == typeof t || t instanceof Number;
},
isString: function(t) {
return "string" == typeof t || t instanceof String;
},
addon: function(t) {
t = t || {};
for (var e = 1, i = arguments.length; e < i; e++) {
var n = arguments[e];
if (n) {
if ("object" != typeof n) {
cc.errorID(5402, n);
continue;
}
for (var r in n) r in t || s(r, n, t);
}
}
return t;
},
mixin: function(t) {
t = t || {};
for (var e = 1, i = arguments.length; e < i; e++) {
var n = arguments[e];
if (n) {
if ("object" != typeof n) {
cc.errorID(5403, n);
continue;
}
for (var r in n) s(r, n, t);
}
}
return t;
},
extend: function(t, e) {
0;
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
isChildClassOf: function(t, e) {
if (t && e) {
if ("function" != typeof t) return !1;
if ("function" != typeof e) {
0;
return !1;
}
if (t === e) return !0;
for (;;) {
if (!(t = a.getSuper(t))) return !1;
if (t === e) return !0;
}
}
return !1;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
isEmptyObject: function(t) {
for (var e in t) return !1;
return !0;
},
getPropertyDescriptor: r
}, o = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
a.value = function(t, e, i, n, r) {
o.value = i;
o.writable = n;
o.enumerable = r;
Object.defineProperty(t, e, o);
o.value = void 0;
};
var c = {
get: null,
set: null,
enumerable: !1
};
a.getset = function(t, e, i, n, r, s) {
if ("function" != typeof n) {
r = n;
n = void 0;
}
c.get = i;
c.set = n;
c.enumerable = r;
c.configurable = s;
Object.defineProperty(t, e, c);
c.get = null;
c.set = null;
};
var l = {
get: null,
enumerable: !1,
configurable: !1
};
a.get = function(t, e, i, n, r) {
l.get = i;
l.enumerable = n;
l.configurable = r;
Object.defineProperty(t, e, l);
l.get = null;
};
var u = {
set: null,
enumerable: !1,
configurable: !1
};
a.set = function(t, e, i, n, r) {
u.set = i;
u.enumerable = n;
u.configurable = r;
Object.defineProperty(t, e, u);
u.set = null;
};
a.getClassName = function(t) {
if ("function" == typeof t) {
var e = t.prototype;
if (e && e.hasOwnProperty("__classname__") && e.__classname__) return e.__classname__;
var i = "";
t.name && (i = t.name);
if (t.toString) {
var n, r = t.toString();
(n = "[" === r.charAt(0) ? r.match(/\[\w+\s*(\w+)\]/) : r.match(/function\s*(\w+)/)) && 2 === n.length && (i = n[1]);
}
return "Object" !== i ? i : "";
}
return t && t.constructor ? a.getClassName(t.constructor) : "";
};
(function() {
var t = {}, e = {};
function i(t, e, i) {
a.getset(a, e, (function() {
return Object.assign({}, i);
}), (function(t) {
a.clear(i);
Object.assign(i, t);
}));
return function(e, n) {
n.prototype.hasOwnProperty(t) && delete i[n.prototype[t]];
a.value(n.prototype, t, e);
if (e) {
var r = i[e];
if (r && r !== n) {
var s = "A Class already exists with the same " + t + ' : "' + e + '".';
0;
cc.error(s);
} else i[e] = n;
}
};
}
a._setClassId = i("__cid__", "_registeredClassIds", t);
var r = i("__classname__", "_registeredClassNames", e);
a.setClassName = function(t, e) {
r(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var i = t || n.getNewId();
i && a._setClassId(i, e);
}
};
a.unregisterClass = function() {
for (var i = 0; i < arguments.length; i++) {
var n = arguments[i].prototype, r = n.__cid__;
r && delete t[r];
var s = n.__classname__;
s && delete e[s];
}
};
a._getClassById = function(e) {
return t[e];
};
a.getClassByName = function(t) {
return e[t];
};
a._getClassId = function(t, e) {
e = "undefined" == typeof e || e;
if ("function" == typeof t && t.prototype.hasOwnProperty("__cid__")) {
0;
return t.prototype.__cid__;
}
if (t && t.constructor) {
var i = t.constructor.prototype;
if (i && i.hasOwnProperty("__cid__")) {
0;
return t.__cid__;
}
}
return "";
};
})();
a.obsolete = function(t, e, i, n) {
var r = /([^.]+)$/, s = r.exec(e)[0], o = r.exec(i)[0];
function c() {
0;
return this[o];
}
n ? a.getset(t, s, c, (function(t) {
0;
this[o] = t;
})) : a.get(t, s, c);
};
a.obsoletes = function(t, e, i, n) {
for (var r in i) {
var s = i[r];
a.obsolete(t, e + "." + r, s, n);
}
};
var h = /(%d)|(%s)/, f = /%s/;
a.formatStr = function() {
var t = arguments.length;
if (0 === t) return "";
var e = arguments[0];
if (1 === t) return "" + e;
if ("string" == typeof e && h.test(e)) for (var i = 1; i < t; ++i) {
var n = arguments[i], r = "number" == typeof n ? h : f;
r.test(e) ? e = e.replace(r, n) : e += " " + n;
} else for (var s = 1; s < t; ++s) e += " " + arguments[s];
return e;
};
a.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
a.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
function _(t, e) {
t.splice(e, 1);
}
function d(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
_(t, i);
return !0;
}
return !1;
}
var p = Array.prototype.indexOf;
a.array = {
remove: d,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: _,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) d(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
indexOf: p,
MutableForwardIterator: t("../utils/mutable-forward-iterator")
};
function v(t, e) {
if (void 0 === e) {
e = t;
t = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(e);
this._cleanup = t;
}
v.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
v.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
v.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
a.Pool = v;
cc.js = a;
e.exports = a;
}), {
"../utils/mutable-forward-iterator": 154,
"./id-generater": 108
} ],
113: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = t("./attribute"), s = {
url: {
canUsedInGet: !0
},
default: {},
serializable: {},
editorOnly: {},
formerlySerializedAs: {}
};
function a(t, e, i, n) {
if (t.get || t.set) 0; else if (t.hasOwnProperty("default")) {
var r = "_N$" + e;
t.get = function() {
return this[r];
};
t.set = function(t) {
var e = this[r];
this[r] = t;
i.call(this, e);
};
0;
var a = {};
n[r] = a;
for (var o in s) {
var c = s[o];
if (t.hasOwnProperty(o)) {
a[o] = t[o];
c.canUsedInGet || delete t[o];
}
}
} else 0;
}
function o(t, e, i, n) {
Array.isArray(n) && n.length > 0 && (n = n[0]);
0;
t.type = n;
}
function c(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
if (cc.RawAsset.isRawAssetType(e[0])) {
t.url = e[0];
delete t.type;
return;
}
t.type = e = e[0];
}
if ("function" == typeof e) if (e === String) {
t.type = cc.String;
0;
} else if (e === Boolean) {
t.type = cc.Boolean;
0;
} else if (e === Number) {
t.type = cc.Float;
0;
} else 0; else 0;
}
function l(t, e, i, n) {
var r = t ? {
_short: !0
} : {
_short: !0,
default: e
};
i && (n ? r.url = i : r.type = i);
return r;
}
i.getFullFormOfProperty = function(t, e, i, s) {
if (t && t.constructor === Object) return null;
if (Array.isArray(t) && t.length > 0) {
t[0];
0;
return l(e, [], t);
}
if ("function" == typeof t) {
var a = t;
if (!cc.RawAsset.isRawAssetType(a)) {
if (!cc.RawAsset.wasRawAssetType(a)) return l(e, n.isChildClassOf(a, cc.ValueType) ? new a() : null, a);
0;
}
return l(e, "", a, !0);
}
return t instanceof r.PrimitiveType ? l(e, t.default) : l(e, t);
};
i.preprocessAttrs = function(t, e, n, r) {
for (var s in t) {
var l = t[s], u = i.getFullFormOfProperty(l, !1, s, e);
u && (l = t[s] = u);
if (l) {
var h = l.notify;
h && a(l, s, h, t);
"type" in l && c(l, l.type, e, s);
"url" in l && o(l, 0, 0, l.url);
"type" in l && l.type;
}
}
};
i.validateMethodWithProps = function(t, e, i, n, r) {
0;
if ("function" != typeof t && null !== t) {
return !1;
}
0;
return !0;
};
}), {
"./CCClass": 92,
"./attribute": 104,
"./js": 112
} ],
114: [ (function(t, e, i) {
"use strict";
var n = [];
cc._RF = {
push: function(t, e, i) {
if (void 0 === i) {
i = e;
e = "";
}
n.push({
uuid: e,
script: i,
module: t,
exports: t.exports,
beh: null
});
},
pop: function() {
var t = n.pop(), e = t.module, i = e.exports;
if (i === t.exports) {
for (var r in i) return;
e.exports = i = t.cls;
}
},
peek: function() {
return n[n.length - 1];
}
};
0;
}), {} ],
115: [ (function(t, e, i) {
"use strict";
cc.url = {
_rawAssets: "",
normalize: function(t) {
t && (46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1)));
return t;
},
raw: function(t) {
0;
if ((t = this.normalize(t)).startsWith("resources/")) {
var e = cc.loader._getResUuid(t.slice(10), cc.Asset, null, !0);
if (e) return cc.AssetLibrary.getLibUrlNoExt(e, !0) + cc.path.extname(t);
} else cc.errorID(7002, t);
return this._rawAssets + t;
},
_init: function(t) {
this._rawAssets = cc.path.stripSep(t) + "/";
}
};
e.exports = cc.url;
}), {} ],
116: [ (function(t, e, i) {
"use strict";
t("./js");
e.exports = {
contains: function(t, e) {
if ("function" == typeof t.contains) return t.contains(e);
if ("function" == typeof t.compareDocumentPosition) return !!(16 & t.compareDocumentPosition(e));
var i = e.parentNode;
if (i) do {
if (i === t) return !0;
i = i.parentNode;
} while (null !== i);
return !1;
},
isDomNode: "object" == typeof window && ("function" == typeof Node ? function(t) {
return t instanceof Node;
} : function(t) {
return t && "object" == typeof t && "number" == typeof t.nodeType && "string" == typeof t.nodeName;
}),
callInNextTick: function(t, e, i) {
t && setTimeout((function() {
t(e, i);
}), 0);
}
};
0;
0;
}), {
"./js": 112
} ],
117: [ (function(t, e, i) {
"use strict";
t("./platform/js");
t("./value-types");
t("./utils");
t("./platform/CCInputManager");
t("./platform/CCInputExtension");
t("./event");
t("./platform/CCSys");
t("./platform/CCMacro");
t("./load-pipeline");
t("./CCDirector");
t("./renderer");
t("./platform/CCView");
t("./platform/CCScreen");
t("./CCScheduler");
t("./event-manager");
}), {
"./CCDirector": 4,
"./CCScheduler": 9,
"./event": 66,
"./event-manager": 62,
"./load-pipeline": 78,
"./platform/CCInputExtension": 95,
"./platform/CCInputManager": 96,
"./platform/CCMacro": 97,
"./platform/CCScreen": 100,
"./platform/CCSys": 101,
"./platform/CCView": 102,
"./platform/js": 112,
"./renderer": 123,
"./utils": 152,
"./value-types": 168
} ],
118: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("./assembler")), r = a(t("./utils/dynamic-atlas/manager")), s = a(t("./webgl/render-data"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function l(t) {
if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (function(t) {
u(e, t);
function e() {
var e;
(e = t.call(this) || this)._renderData = new s.default();
e._renderData.init(l(e));
e.initData();
e.initLocal();
return e;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createQuadData(0, this.verticesFloats, this.indicesCount);
};
i.initLocal = function() {
this._local = [];
this._local.length = 4;
};
i.updateColor = function(t, e) {
var i = this._renderData.uintVDatas[0];
if (i) {
e = e || t.node.color._val;
for (var n = this.floatsPerVert, r = this.colorOffset, s = i.length; r < s; r += n) i[r] = e;
}
};
i.getBuffer = function() {
return cc.renderer._handle._meshBuffer;
};
i.updateWorldVerts = function(t) {
var e = this._local, i = this._renderData.vDatas[0], n = t.node._worldMatrix.m, r = n[0], s = n[1], a = n[4], o = n[5], c = n[12], l = n[13], u = e[0], h = e[2], f = e[1], _ = e[3];
if (1 === r && 0 === s && 0 === a && 1 === o) {
i[0] = u + c;
i[1] = f + l;
i[5] = h + c;
i[6] = f + l;
i[10] = u + c;
i[11] = _ + l;
i[15] = h + c;
i[16] = _ + l;
} else {
var d = r * u, p = r * h, v = s * u, g = s * h, m = a * f, y = a * _, E = o * f, C = o * _;
i[0] = d + m + c;
i[1] = v + E + l;
i[5] = p + m + c;
i[6] = g + E + l;
i[10] = d + y + c;
i[11] = v + C + l;
i[15] = p + y + c;
i[16] = g + C + l;
}
};
i.fillBuffers = function(t, e) {
e.worldMatDirty && this.updateWorldVerts(t);
var i = this._renderData, n = i.vDatas[0], r = i.iDatas[0], s = this.getBuffer(e), a = s.request(this.verticesCount, this.indicesCount), o = a.byteOffset >> 2, c = s._vData;
n.length + o > c.length ? c.set(n.subarray(0, c.length - o), o) : c.set(n, o);
for (var l = s._iData, u = a.indiceOffset, h = a.vertexOffset, f = 0, _ = r.length; f < _; f++) l[u++] = h + r[f];
};
i.packToDynamicAtlas = function(t, e) {
0;
if (!e._original && r.default && e._texture.packable) {
var i = r.default.insertSpriteFrame(e);
i && e._setDynamicAtlasFrame(i);
}
var n = t._materials[0];
if (n && n.getProperty("texture") !== e._texture) {
t._vertsDirty = !0;
t._updateMaterial();
}
};
c(e, [ {
key: "verticesFloats",
get: function() {
return this.verticesCount * this.floatsPerVert;
}
} ]);
return e;
})(n.default);
i.default = h;
cc.js.addon(h.prototype, {
floatsPerVert: 5,
verticesCount: 4,
indicesCount: 6,
uvOffset: 2,
colorOffset: 4
});
cc.Assembler2D = h;
e.exports = i.default;
}), {
"./assembler": 120,
"./utils/dynamic-atlas/manager": void 0,
"./webgl/render-data": 143
} ],
119: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../utils/pool"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = 0;
function a(t) {
Object.getOwnPropertyDescriptor(t, "__assemblerId__") || (t.__assemblerId__ = ++s);
return t.__assemblerId__;
}
var o = new (function(t) {
r(e, t);
function e() {
for (var e, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
(e = t.call.apply(t, [ this ].concat(n)) || this)._pool = {};
return e;
}
var i = e.prototype;
i.put = function(t) {
if (t) if (this.enabled) {
var e = a(t.constructor), i = this._pool;
i[e] || (i[e] = []);
if (!(this.count > this.maxSize)) {
this._clean(t);
i[e].push(t);
this.count++;
}
} else t.destroy && t.destroy();
};
i.get = function(t) {
var e;
if (this.enabled) {
var i = this._pool, n = a(t);
e = i[n] && i[n].pop();
}
e ? this.count-- : e = new t();
return e;
};
i.clear = function() {
var t = this._pool;
for (var e in t) {
var i = t[e];
if (i) for (var n = 0; n < i.length; n++) i[n].destroy && i[n].destroy();
}
this._pool = {};
this.count = 0;
};
i._clean = function(t) {
t.reset();
t._renderComp = null;
};
return e;
}(n.default))();
n.default.register("assembler", o);
var c = o;
i.default = c;
e.exports = i.default;
}), {
"../utils/pool": 155
} ],
120: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("./webgl/vertex-format"), r = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("./assembler-pool"));
var s = (function() {
function t() {
this._extendNative && this._extendNative();
}
var e = t.prototype;
e.init = function(t) {
this._renderComp = t;
};
e.updateRenderData = function(t) {};
e.fillBuffers = function(t, e) {};
e.getVfmt = function() {
return n.vfmtPosUvColor;
};
return t;
})();
i.default = s;
s.register = function(t, e) {
t.__assembler__ = e;
};
s.init = function(t) {
for (var e = t.constructor, i = e.__assembler__; !i; ) {
if (!(e = e.$super)) {
cc.warn("Can not find assembler for render component : [" + cc.js.getClassName(t) + "]");
return;
}
i = e.__assembler__;
}
i.getConstructor && (i = i.getConstructor(t));
if (!t._assembler || t._assembler.constructor !== i) {
var n = r.default.get(i);
n.init(t);
t._assembler = n;
}
};
cc.Assembler = s;
e.exports = i.default;
}), {
"./assembler-pool": 119,
"./webgl/vertex-format": 144
} ],
121: [ (function(t, e, i) {
"use strict";
var n = function(t) {
var e;
try {
e = t.getContext("2d");
} catch (t) {
console.error(t);
return;
}
this._canvas = t;
this._ctx = e;
this._caps = {};
this._stats = {
drawcalls: 0
};
this._vx = this._vy = this._vw = this._vh = 0;
this._sx = this._sy = this._sw = this._sh = 0;
};
n.prototype._restoreTexture = function(t) {};
n.prototype.setViewport = function(t, e, i, n) {
if (this._vx !== t || this._vy !== e || this._vw !== i || this._vh !== n) {
this._vx = t;
this._vy = e;
this._vw = i;
this._vh = n;
}
};
n.prototype.setScissor = function(t, e, i, n) {
if (this._sx !== t || this._sy !== e || this._sw !== i || this._sh !== n) {
this._sx = t;
this._sy = e;
this._sw = i;
this._sh = n;
}
};
n.prototype.clear = function(t) {
var e = this._ctx;
e.clearRect(this._vx, this._vy, this._vw, this._vh);
if (t && (0 !== t[0] || 0 !== t[1] || 0 !== t[2])) {
e.fillStyle = "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")";
e.globalAlpha = t[3];
e.fillRect(this._vx, this._vy, this._vw, this._vh);
}
};
n.prototype.resetDrawCalls = function() {
this._stats.drawcalls = 0;
};
n.prototype.getDrawCalls = function() {
return this._stats.drawcalls;
};
e.exports = n;
}), {} ],
122: [ (function(t, e, i) {
"use strict";
var n = function(t, e) {
this._device = t;
this._width = 4;
this._height = 4;
this._image = null;
if (e) {
void 0 !== e.width && (this._width = e.width);
void 0 !== e.height && (this._height = e.height);
this.updateImage(e);
}
};
n.prototype.update = function(t) {
this.updateImage(t);
};
n.prototype.updateImage = function(t) {
if (t.images && t.images[0]) {
var e = t.images[0];
e && e !== this._image && (this._image = e);
}
};
n.prototype.destroy = function() {
this._image = null;
};
e.exports = n;
}), {} ],
123: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../../renderer/gfx")), r = a(t("../../renderer/core/input-assembler")), s = a(t("../../renderer/core/pass"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t) {
return {
defaultTexture: new n.default.Texture2D(t, {
images: [],
width: 128,
height: 128,
wrapS: n.default.WRAP_REPEAT,
wrapT: n.default.WRAP_REPEAT,
format: n.default.TEXTURE_FMT_RGB8,
mipmap: !1
}),
programTemplates: [],
programChunks: {}
};
}
var c = cc.renderer = {
Texture2D: null,
InputAssembler: r.default,
Pass: s.default,
renderEngine: null,
canvas: null,
device: null,
scene: null,
drawCalls: 0,
_handle: null,
_cameraNode: null,
_camera: null,
_forward: null,
_flow: null,
initWebGL: function(e, i) {
t("./webgl/assemblers");
t("./webgl/model-batcher");
this.Texture2D = n.default.Texture2D;
this.canvas = e;
this._flow = cc.RenderFlow;
this.device = n.default.Device.getInstance();
this.scene = new renderer.Scene();
var r = o(this.device);
this._forward = new renderer.ForwardRenderer(this.device, r);
var s = new renderer.RenderFlow(this.device, this.scene, this._forward);
this._flow.init(s);
},
initCanvas: function(e) {
var i = t("./canvas"), n = t("./canvas/Texture2D"), r = t("./canvas/Device");
this.Device = r;
this.Texture2D = n;
this.canvas = e;
this.device = new r(e);
this._camera = {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
this._handle = new i.RenderComponentHandle(this.device, this._camera);
this._forward = new i.ForwardRenderer();
this._flow = cc.RenderFlow;
this._flow.init(this._handle, this._forward);
},
updateCameraViewport: function() {
if (cc.director) {
var t = cc.director.getScene();
t && t.setScale(1, 1, 1);
}
if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
var e = cc.view.getViewportRect();
this.device.setViewport(e.x, e.y, e.width, e.height);
this._camera.a = cc.view.getScaleX();
this._camera.d = cc.view.getScaleY();
this._camera.tx = e.x;
this._camera.ty = e.y + e.height;
}
},
render: function(t, e) {
this.device.resetDrawCalls();
if (t) {
this._flow.render(t, e);
this.drawCalls = this.device.getDrawCalls();
}
},
clear: function() {
this._handle.reset();
this._forward.clear();
}
};
i.default = c;
e.exports = i.default;
}), {
"../../renderer/core/input-assembler": 184,
"../../renderer/core/pass": 185,
"../../renderer/gfx": 188,
"../../renderer/renderers/forward-renderer": void 0,
"../../renderer/scene/scene": void 0,
"./canvas": void 0,
"./canvas/Device": 121,
"./canvas/Texture2D": 122,
"./webgl/assemblers": 130,
"./webgl/model-batcher": void 0
} ],
124: [ (function(t, e, i) {
"use strict";
var n, r, s = 0, a = 1 << s++, o = 1 << s++, c = 1 << s++, l = 1 << s++, u = c | l, h = 1 << s++, f = 1 << s++, _ = 1 << s++, d = f | _, p = 1 << s++, v = 1 << s++, g = 1 << s++, m = 1 << s++, y = 0;
function E() {
this._func = b;
this._next = null;
}
var C = E.prototype;
C._doNothing = function() {};
C._localTransform = function(t) {
t._updateLocalMatrix();
t._renderFlag &= ~c;
this._next._func(t);
};
C._worldTransform = function(t) {
n.worldMatDirty++;
var e = t._matrix, i = t._trs, r = e.m;
r[12] = i[0];
r[13] = i[1];
r[14] = i[2];
t._mulMat(t._worldMatrix, t._parent._worldMatrix, e);
t._renderFlag &= ~l;
this._next._func(t);
n.worldMatDirty--;
};
C._opacity = function(t) {
n.parentOpacityDirty++;
t._renderFlag &= ~f;
this._next._func(t);
n.parentOpacityDirty--;
};
C._color = function(t) {
var e = t._renderComponent;
e && e._updateColor();
t._renderFlag &= ~_;
this._next._func(t);
};
C._updateRenderData = function(t) {
var e = t._renderComponent;
e._assembler.updateRenderData(e);
t._renderFlag &= ~h;
this._next._func(t);
};
C._render = function(t) {
var e = t._renderComponent;
e._checkBacth(n, t._cullingMask);
e._assembler.fillBuffers(e, n);
this._next._func(t);
};
C._children = function(t) {
for (var e = y, i = n, r = i.parentOpacity, s = i.parentOpacity *= t._opacity / 255, a = (i.worldMatDirty ? l : 0) | (i.parentOpacityDirty ? d : 0), o = t._children, c = 0, u = o.length; c < u; c++) {
var h = o[c];
h._renderFlag |= a;
if (h._activeInHierarchy && 0 !== h._opacity) {
y = h._cullingMask = 0 === h.groupIndex ? e : 1 << h.groupIndex;
var f = h._color._val;
h._color._fastSetA(h._opacity * s);
T[h._renderFlag]._func(h);
h._color._val = f;
}
}
i.parentOpacity = r;
this._next._func(t);
};
C._postRender = function(t) {
var e = t._renderComponent;
e._checkBacth(n, t._cullingMask);
e._assembler.postFillBuffers(e, n);
this._next._func(t);
};
var A = new E();
A._func = A._doNothing;
A._next = A;
var T = {};
function x(t, e) {
var i = new E();
i._next = e || A;
switch (t) {
case a:
case o:
i._func = i._doNothing;
break;

case c:
i._func = i._localTransform;
break;

case l:
i._func = i._worldTransform;
break;

case f:
i._func = i._opacity;
break;

case _:
i._func = i._color;
break;

case h:
i._func = i._updateRenderData;
break;

case p:
i._func = i._render;
break;

case v:
i._func = i._children;
break;

case g:
i._func = i._postRender;
}
return i;
}
function S(t) {
for (var e = null, i = m; i > 0; ) {
i & t && (e = x(i, e));
i >>= 1;
}
return e;
}
function b(t) {
var e = t._renderFlag;
(T[e] = S(e))._func(t);
}
E.flows = T;
E.createFlow = x;
var R = [];
E.registerValidate = function(t) {
if (!t._inValidateList) {
R.push(t);
t._inValidateList = !0;
}
};
E.validateRenderers = function() {
for (var t = 0, e = R.length; t < e; t++) {
var i = R[t];
if (i.isValid) {
i.enabledInHierarchy ? i._validateRender() : i.disableRender();
i._inValidateList = !1;
}
}
R.length = 0;
};
E.visitRootNode = function(t) {
E.validateRenderers();
y = 1 << t.groupIndex;
if (t._renderFlag & l) {
n.worldMatDirty++;
t._calculWorldMatrix();
t._renderFlag &= ~l;
T[t._renderFlag]._func(t);
n.worldMatDirty--;
} else T[t._renderFlag]._func(t);
};
E.render = function(t, e) {
n.reset();
n.walking = !0;
E.visitRootNode(t);
n.terminate();
n.walking = !1;
r.render(n._renderScene, e);
};
E.init = function(t, e) {
n = t;
r = e;
T[0] = A;
for (var i = 1; i < m; i++) T[i] = new E();
};
E.getBachther = function() {
return n;
};
E.FLAG_DONOTHING = a;
E.FLAG_BREAK_FLOW = o;
E.FLAG_LOCAL_TRANSFORM = c;
E.FLAG_WORLD_TRANSFORM = l;
E.FLAG_TRANSFORM = u;
E.FLAG_OPACITY = f;
E.FLAG_COLOR = _;
E.FLAG_OPACITY_COLOR = d;
E.FLAG_UPDATE_RENDER_DATA = h;
E.FLAG_RENDER = p;
E.FLAG_CHILDREN = v;
E.FLAG_POST_RENDER = g;
E.FLAG_FINAL = m;
e.exports = cc.RenderFlow = E;
}), {} ],
125: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../assembler-2d"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = t("../../../utils/text-utils"), a = t("../../../platform/CCMacro"), o = t("../../../components/CCLabel").Overflow, c = t("../utils").shareLabelInfo, l = function() {
this.char = "";
this.valid = !0;
this.x = 0;
this.y = 0;
this.line = 0;
this.hash = "";
}, u = cc.rect(), h = null, f = [], _ = [], d = [], p = [], v = null, g = 0, m = 0, y = 0, E = 0, C = 0, A = 1, T = null, x = cc.size(), S = "", b = 0, R = 0, L = 0, w = 0, I = 0, O = 0, D = 0, M = !1, N = 0, P = 0, F = 0, z = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
if (t._vertsDirty && h !== t) {
h = t;
this._reserveQuads(t, t.string.toString().length);
this._updateFontFamily(t);
this._updateProperties(t);
this._updateLabelInfo(t);
this._updateContent();
this.updateWorldVerts(t);
h._actualFontSize = b;
h.node.setContentSize(x);
h._vertsDirty = !1;
h = null;
this._resetProperties();
}
};
i._updateFontScale = function() {
A = b / R;
};
i._updateFontFamily = function(t) {
var e = t.font;
T = e.spriteFrame;
v = e._fntConfig;
c.fontAtlas = e._fontDefDictionary;
this.packToDynamicAtlas(t, T);
};
i._updateLabelInfo = function() {
c.hash = "";
c.margin = 0;
};
i._updateProperties = function(t) {
S = t.string.toString();
b = t.fontSize;
R = v ? v.fontSize : t.fontSize;
L = t.horizontalAlign;
w = t.verticalAlign;
I = t.spacingX;
D = t.overflow;
O = t._lineHeight;
x.width = t.node.width;
x.height = t.node.height;
if (D === o.NONE) {
M = !1;
x.width += 2 * c.margin;
x.height += 2 * c.margin;
} else if (D === o.RESIZE_HEIGHT) {
M = !0;
x.height += 2 * c.margin;
} else M = t.enableWrapText;
c.lineHeight = O;
c.fontSize = b;
this._setupBMFontOverflowMetrics();
};
i._resetProperties = function() {
v = null;
T = null;
c.hash = "";
c.margin = 0;
};
i._updateContent = function() {
this._updateFontScale();
this._computeHorizontalKerningForText();
this._alignText();
};
i._computeHorizontalKerningForText = function() {
for (var t = S, e = t.length, i = v.kerningDict, n = f, r = -1, s = 0; s < e; ++s) {
var a = t.charCodeAt(s), o = i[r << 16 | 65535 & a] || 0;
n[s] = s < e - 1 ? o : 0;
r = a;
}
};
i._multilineTextWrap = function(t) {
for (var e = S.length, i = 0, n = 0, r = 0, a = 0, l = 0, u = 0, h = 0, _ = null, p = cc.v2(0, 0), y = 0; y < e; ) {
var T = S.charAt(y);
if ("\n" !== T) {
for (var b = t(S, y, e), R = u, L = h, w = l, z = n, B = !1, U = 0; U < b; ++U) {
var k = y + U;
if ("\r" !== (T = S.charAt(k))) if (_ = c.fontAtlas.getLetterDefinitionForChar(T, c)) {
var V = z + _.offsetX * A - c.margin;
if (M && F > 0 && n > 0 && V + _.w * A > F && !s.isUnicodeSpace(T)) {
d.push(l);
l = 0;
i++;
n = 0;
r -= O * this._getFontScale() + 0;
B = !0;
break;
}
p.x = V;
p.y = r - _.offsetY * A + c.margin;
this._recordLetterInfo(p, T, k, i);
k + 1 < f.length && k < e - 1 && (z += f[k + 1]);
z += _.xAdvance * A + I - 2 * c.margin;
w = p.x + _.w * A - c.margin;
R < p.y && (R = p.y);
L > p.y - _.h * A && (L = p.y - _.h * A);
} else {
this._recordPlaceholderInfo(k, T);
console.log("Can't find letter definition in texture atlas " + v.atlasName + " for letter:" + T);
} else this._recordPlaceholderInfo(k, T);
}
if (!B) {
n = z;
l = w;
u < R && (u = R);
h > L && (h = L);
a < l && (a = l);
y += b;
}
} else {
d.push(l);
l = 0;
i++;
n = 0;
r -= O * this._getFontScale() + 0;
this._recordPlaceholderInfo(y, T);
y++;
}
}
d.push(l);
m = (g = i + 1) * O * this._getFontScale();
g > 1 && (m += 0 * (g - 1));
x.width = N;
x.height = P;
N <= 0 && (x.width = parseFloat(a.toFixed(2)) + 2 * c.margin);
P <= 0 && (x.height = parseFloat(m.toFixed(2)) + 2 * c.margin);
E = x.height;
C = 0;
if (D !== o.CLAMP) {
u > 0 && (E = x.height + u);
h < -m && (C = m + h);
}
return !0;
};
i._getFirstCharLen = function() {
return 1;
};
i._getFontScale = function() {
return D === o.SHRINK ? A : 1;
};
i._getFirstWordLen = function(t, e, i) {
var n = t.charAt(e);
if (s.isUnicodeCJK(n) || "\n" === n || s.isUnicodeSpace(n)) return 1;
var r = 1, a = c.fontAtlas.getLetterDefinitionForChar(n, c);
if (!a) return r;
for (var o = a.xAdvance * A + I, l = e + 1; l < i; ++l) {
n = t.charAt(l);
if (!(a = c.fontAtlas.getLetterDefinitionForChar(n, c))) break;
if (o + a.offsetX * A + a.w * A > F && !s.isUnicodeSpace(n) && F > 0) return r;
o += a.xAdvance * A + I;
if ("\n" === n || s.isUnicodeSpace(n) || s.isUnicodeCJK(n)) break;
r++;
}
return r;
};
i._multilineTextWrapByWord = function() {
return this._multilineTextWrap(this._getFirstWordLen);
};
i._multilineTextWrapByChar = function() {
return this._multilineTextWrap(this._getFirstCharLen);
};
i._recordPlaceholderInfo = function(t, e) {
if (t >= _.length) {
var i = new l();
_.push(i);
}
_[t].char = e;
_[t].hash = e.charCodeAt(0) + c.hash;
_[t].valid = !1;
};
i._recordLetterInfo = function(t, e, i, n) {
if (i >= _.length) {
var r = new l();
_.push(r);
}
var s = e.charCodeAt(0) + c.hash;
_[i].line = n;
_[i].char = e;
_[i].hash = s;
_[i].valid = c.fontAtlas.getLetter(s).valid;
_[i].x = t.x;
_[i].y = t.y;
};
i._alignText = function() {
m = 0;
d.length = 0;
this._multilineTextWrapByWord();
this._computeAlignmentOffset();
D === o.SHRINK && b > 0 && this._isVerticalClamp() && this._shrinkLabelToContentSize(this._isVerticalClamp);
this._updateQuads() || D === o.SHRINK && this._shrinkLabelToContentSize(this._isHorizontalClamp);
};
i._scaleFontSizeDown = function(t) {
var e = !0;
if (!t) {
t = .1;
e = !1;
}
b = t;
e && this._updateContent();
};
i._shrinkLabelToContentSize = function(t) {
for (var e = 0, i = 0 | b, n = 0; e < i; ) {
n = e + i + 1 >> 1;
if (n <= 0) break;
A = n / R;
this._multilineTextWrapByWord();
this._computeAlignmentOffset();
t() ? i = n - 1 : e = n;
}
var r = e;
r >= 0 && this._scaleFontSizeDown(r);
};
i._isVerticalClamp = function() {
return m > x.height;
};
i._isHorizontalClamp = function() {
for (var t = !1, e = 0, i = S.length; e < i; ++e) {
var n = _[e];
if (n.valid) {
var r = c.fontAtlas.getLetter(n.hash), s = n.x + r.w * A, a = n.line;
if (N > 0) if (M) {
if (d[a] > x.width && (s > x.width || s < 0)) {
t = !0;
break;
}
} else if (s > x.width) {
t = !0;
break;
}
}
}
return t;
};
i._isHorizontalClamped = function(t, e) {
var i = d[e], n = t > x.width || t < 0;
return M ? i > x.width && n : n;
};
i._updateQuads = function() {
var t = T ? T._texture : c.fontAtlas.getTexture(), e = h.node;
this.verticesCount = this.indicesCount = 0;
this._renderData && (this._renderData.dataLength = 0);
for (var i = x, n = e._anchorPoint.x * i.width, r = e._anchorPoint.y * i.height, s = !0, a = 0, l = S.length; a < l; ++a) {
var f = _[a];
if (f.valid) {
var d = c.fontAtlas.getLetter(f.hash);
u.height = d.h;
u.width = d.w;
u.x = d.u;
u.y = d.v;
var v = f.y + y;
if (P > 0) {
if (v > E) {
var g = v - E;
u.y += g;
u.height -= g;
v -= g;
}
v - d.h * A < C && D === o.CLAMP && (u.height = v < C ? 0 : (v - C) / A);
}
var m = f.line, b = f.x + d.w / 2 * A + p[m];
if (N > 0 && this._isHorizontalClamped(b, m)) if (D === o.CLAMP) u.width = 0; else if (D === o.SHRINK) {
if (x.width > d.w) {
s = !1;
break;
}
u.width = 0;
}
if (u.height > 0 && u.width > 0) {
var R = this._determineRect(u), L = f.x + p[f.line];
this.appendQuad(h, t, u, R, L - n, v - r, A);
}
}
}
this._quadsUpdated(h);
return s;
};
i._determineRect = function(t) {
var e = T.isRotated(), i = T._originalSize, n = T._rect, r = T._offset, s = r.x + (i.width - n.width) / 2, a = r.y - (i.height - n.height) / 2;
if (e) {
var o = t.x;
t.x = n.x + n.height - t.y - t.height - a;
t.y = o + n.y - s;
t.y < 0 && (t.height = t.height + a);
} else {
t.x += n.x - s;
t.y += n.y + a;
}
return e;
};
i._computeAlignmentOffset = function() {
p.length = 0;
switch (L) {
case a.TextAlignment.LEFT:
for (var t = 0; t < g; ++t) p.push(0);
break;

case a.TextAlignment.CENTER:
for (var e = 0, i = d.length; e < i; e++) p.push((x.width - d[e]) / 2);
break;

case a.TextAlignment.RIGHT:
for (var n = 0, r = d.length; n < r; n++) p.push(x.width - d[n]);
}
y = x.height;
if (w !== a.VerticalTextAlignment.TOP) {
var s = x.height - m + O * this._getFontScale() - R * A;
w === a.VerticalTextAlignment.BOTTOM ? y -= s : y -= s / 2;
}
};
i._setupBMFontOverflowMetrics = function() {
var t = x.width, e = x.height;
D === o.RESIZE_HEIGHT && (e = 0);
if (D === o.NONE) {
t = 0;
e = 0;
}
N = t;
P = e;
F = t;
};
i.updateWorldVerts = function() {};
i.appendQuad = function(t, e, i, n, r, s, a) {};
i._quadsUpdated = function(t) {};
i._reserveQuads = function() {};
return e;
})(n.default);
i.default = z;
e.exports = i.default;
}), {
"../../../components/CCLabel": 46,
"../../../platform/CCMacro": 97,
"../../../utils/text-utils": 160,
"../../assembler-2d": 118,
"../utils": 129
} ],
126: [ (function(t, e, i) {
"use strict";
function n() {
this._rect = null;
this.uv = [];
this._texture = null;
this._original = null;
}
n.prototype = {
constructor: n,
getRect: function() {
return cc.rect(this._rect);
},
setRect: function(t) {
this._rect = t;
this._texture && this._calculateUV();
},
_setDynamicAtlasFrame: function(t) {
if (t) {
this._original = {
_texture: this._texture,
_x: this._rect.x,
_y: this._rect.y
};
this._texture = t.texture;
this._rect.x = t.x;
this._rect.y = t.y;
this._calculateUV();
}
},
_resetDynamicAtlasFrame: function() {
if (this._original) {
this._rect.x = this._original._x;
this._rect.y = this._original._y;
this._texture = this._original._texture;
this._original = null;
this._calculateUV();
}
},
_refreshTexture: function(t) {
this._texture = t;
this._rect = cc.rect(0, 0, t.width, t.height);
this._calculateUV();
},
_calculateUV: function() {
var t = this._rect, e = this._texture, i = this.uv, n = e.width, r = e.height, s = 0 === n ? 0 : t.x / n, a = 0 === n ? 0 : (t.x + t.width) / n, o = 0 === r ? 0 : (t.y + t.height) / r, c = 0 === r ? 0 : t.y / r;
i[0] = s;
i[1] = o;
i[2] = a;
i[3] = o;
i[4] = s;
i[5] = c;
i[6] = a;
i[7] = c;
}
};
e.exports = n;
}), {} ],
127: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../webgl/assemblers/label/2d/bmfont"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = t("../../../components/CCLabel"), a = t("../../../components/CCLabelOutline"), o = t("../../../utils/text-utils"), c = t("../../../components/CCComponent"), l = t("../../../assets/CCRenderTexture"), u = cc.js.isChildClassOf(a, c), h = t("../utils").getFontFamily, f = t("../utils").shareLabelInfo, _ = cc.BitmapFont.FontLetterDefinition, d = cc.BitmapFont.FontAtlas, p = cc.Color.WHITE, v = 0, g = (1 / 255).toFixed(3);
function m(t, e) {
this._texture = null;
this._labelInfo = e;
this._char = t;
this._hash = null;
this._data = null;
this._canvas = null;
this._context = null;
this._width = 0;
this._height = 0;
this._offsetY = 0;
this._hash = t.charCodeAt(0) + e.hash;
}
m.prototype = {
constructor: m,
updateRenderData: function() {
this._updateProperties();
this._updateTexture();
},
_updateProperties: function() {
this._texture = new cc.Texture2D();
this._data = s._canvasPool.get();
this._canvas = this._data.canvas;
this._context = this._data.context;
this._context.font = this._labelInfo.fontDesc;
var t = o.safeMeasureText(this._context, this._char, this._labelInfo.fontDesc), e = 2 * this._labelInfo.margin + 2;
this._width = parseFloat(t.toFixed(2)) + e;
this._height = (1 + o.BASELINE_RATIO) * this._labelInfo.fontSize + e;
this._offsetY = -this._labelInfo.fontSize * o.BASELINE_RATIO / 2;
this._canvas.width !== this._width && (this._canvas.width = this._width);
this._canvas.height !== this._height && (this._canvas.height = this._height);
this._texture.initWithElement(this._canvas);
},
_updateTexture: function() {
var t = this._context, e = this._labelInfo, i = this._canvas.width, n = this._canvas.height, r = i / 2, s = n / 2 + this._labelInfo.fontSize * o.MIDDLE_RATIO, a = e.color;
t.textAlign = "center";
t.textBaseline = "alphabetic";
t.clearRect(0, 0, i, n);
t.fillStyle = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + g + ")";
t.fillRect(0, 0, i, n);
t.font = e.fontDesc;
t.lineJoin = "round";
t.fillStyle = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", 1)";
if (e.isOutlined && e.margin > 0) {
var c = e.out || p;
t.strokeStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + c.a / 255 + ")";
t.lineWidth = 2 * e.margin;
t.strokeText(this._char, r, s);
}
t.fillText(this._char, r, s);
this._texture.handleLoadedTexture();
},
destroy: function() {
this._texture.destroy();
this._texture = null;
s._canvasPool.put(this._data);
}
};
function y(t, e) {
var i = new l();
i.initWithSize(t, e);
i.update();
this._fontDefDictionary = new d(i);
this._x = v;
this._y = v;
this._nexty = v;
this._width = t;
this._height = e;
cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
}
cc.js.mixin(y.prototype, {
insertLetterTexture: function(t) {
var e = t._texture, i = e.width, n = e.height;
if (this._x + i + v > this._width) {
this._x = v;
this._y = this._nexty;
}
this._y + n > this._nexty && (this._nexty = this._y + n + v);
if (this._nexty > this._height) return null;
this._fontDefDictionary._texture.drawTextureAt(e, this._x, this._y);
this._dirty = !0;
var r = new _();
r.u = this._x + 1;
r.v = this._y + 1;
r.texture = this._fontDefDictionary._texture;
r.valid = !0;
r.w = t._width - 2;
r.h = t._height - 2;
r.xAdvance = r.w;
r.offsetY = t._offsetY;
this._x += i + v;
this._fontDefDictionary.addLetterDefinitions(t._hash, r);
return r;
},
update: function() {
if (this._dirty) {
this._fontDefDictionary._texture.update();
this._dirty = !1;
}
},
reset: function() {
this._x = v;
this._y = v;
this._nexty = v;
for (var t = this._fontDefDictionary._letterDefinitions, e = 0, i = t.length; e < i; e++) {
var n = t[e];
n.isValid && n.destroy();
}
this._fontDefDictionary.clear();
},
destroy: function() {
this.reset();
this._fontDefDictionary._texture.destroy();
this._fontDefDictionary._texture = null;
},
beforeSceneLoad: function() {
this.clearAllCache();
},
clearAllCache: function() {
this.destroy();
var t = new l();
t.initWithSize(this._width, this._height);
t.update();
this._fontDefDictionary._texture = t;
},
getLetter: function(t) {
return this._fontDefDictionary._letterDefinitions[t];
},
getTexture: function() {
return this._fontDefDictionary.getTexture();
},
getLetterDefinitionForChar: function(t, e) {
var i = t.charCodeAt(0) + e.hash, n = this._fontDefDictionary._letterDefinitions[i];
if (!n) {
var r = new m(t, e);
r.updateRenderData();
n = this.insertLetterTexture(r);
r.destroy();
}
return n;
}
});
function E(t) {
var e = t.color.toHEX("#rrggbb"), i = "";
t.isOutlined && t.margin > 0 && (i = i + t.margin + t.out.toHEX("#rrggbb"));
return "" + t.fontSize + t.fontFamily + e + i;
}
var C = null, A = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i._getAssemblerData = function() {
if (!C) {
C = new y(2048, 2048);
cc.Label._shareAtlas = C;
}
return C.getTexture();
};
i._updateFontFamily = function(t) {
f.fontAtlas = C;
f.fontFamily = h(t);
var e = u && t.getComponent(a);
if (e && e.enabled) {
f.isOutlined = !0;
f.margin = e.width;
f.out = e.color.clone();
f.out.a = e.color.a * t.node.color.a / 255;
} else {
f.isOutlined = !1;
f.margin = 0;
}
};
i._updateLabelInfo = function(t) {
f.fontDesc = this._getFontDesc();
f.color = t.node.color;
f.hash = E(f);
};
i._getFontDesc = function() {
var t = f.fontSize.toString() + "px ";
0;
return t += f.fontFamily;
};
i._computeHorizontalKerningForText = function() {};
i._determineRect = function(t) {
return !1;
};
return e;
})(n.default);
i.default = A;
e.exports = i.default;
}), {
"../../../assets/CCRenderTexture": void 0,
"../../../components/CCComponent": 44,
"../../../components/CCLabel": 46,
"../../../components/CCLabelOutline": void 0,
"../../../utils/text-utils": 160,
"../../webgl/assemblers/label/2d/bmfont": 131,
"../utils": 129
} ],
128: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../assembler-2d"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s, a = t("../../../utils/text-utils"), o = t("../../../platform/CCMacro"), c = t("../../../components/CCLabel"), l = t("../../../components/CCLabelOutline"), u = t("../../../components/CCLabelShadow"), h = c.Overflow, f = t("../utils").deleteFromDynamicAtlas, _ = t("../utils").getFontFamily, d = (1 / 255).toFixed(3), p = null, v = null, g = null, m = "", y = "", E = 0, C = 0, A = [], T = cc.Size.ZERO, x = 0, S = 0, b = 0, R = null, L = "", w = h.NONE, I = !1, O = null, D = cc.Color.WHITE, M = null, N = cc.Color.BLACK, P = cc.rect(), F = cc.Size.ZERO, z = cc.Size.ZERO, B = !1, U = !1, k = !1, V = 0, H = cc.Vec2.ZERO, G = 0, W = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i._getAssemblerData = function() {
(s = c._canvasPool.get()).canvas.width = s.canvas.height = 1;
return s;
};
i._resetAssemblerData = function(t) {
t && c._canvasPool.put(t);
};
i.updateRenderData = function(e) {
t.prototype.updateRenderData.call(this, e);
if (e._vertsDirty) {
this._updateFontFamily(e);
this._updateProperties(e);
this._calculateLabelFont();
this._calculateSplitedStrings();
this._updateLabelDimensions();
this._calculateTextBaseline();
this._updateTexture(e);
this._calDynamicAtlas(e);
e._actualFontSize = E;
e.node.setContentSize(z);
this.updateVerts(e);
e._vertsDirty = !1;
p = null;
v = null;
g = null;
}
};
i.updateVerts = function() {};
i._updatePaddingRect = function() {
var t = 0, e = 0, i = 0, n = 0, r = 0;
F.width = F.height = 0;
if (O) {
t = e = i = n = r = O.width;
F.width = F.height = 2 * r;
}
if (M) {
var s = M.blur + r;
i = Math.max(i, -M._offset.x + s);
n = Math.max(n, M._offset.x + s);
t = Math.max(t, M._offset.y + s);
e = Math.max(e, -M._offset.y + s);
}
if (U) {
var a = C * Math.tan(.20943951);
n += a;
F.width += a;
}
P.x = i;
P.y = t;
P.width = i + n;
P.height = t + e;
};
i._updateFontFamily = function(t) {
L = _(t);
};
i._updateProperties = function(t) {
var e = t._assemblerData;
p = e.context;
v = e.canvas;
g = t._frame._original ? t._frame._original._texture : t._frame._texture;
y = t.string.toString();
E = t._fontSize;
C = E;
V = t.underlineHeight || C / 8;
w = t.overflow;
T.width = t.node.width;
T.height = t.node.height;
z = t.node.getContentSize();
x = t._lineHeight;
S = t.horizontalAlign;
b = t.verticalAlign;
R = t.node.color;
B = t.enableBold;
U = t.enableItalic;
k = t.enableUnderline;
I = w !== h.NONE && (w === h.RESIZE_HEIGHT || t.enableWrapText);
(O = (O = l && t.getComponent(l)) && O.enabled && O.width > 0 ? O : null) && D.set(O.color);
if (M = (M = u && t.getComponent(u)) && M.enabled ? M : null) {
N.set(M.color);
N.a = N.a * t.node.color.a / 255;
}
this._updatePaddingRect();
};
i._calculateFillTextStartPosition = function() {
var t = 0;
S === o.TextAlignment.RIGHT ? t = T.width - P.width : S === o.TextAlignment.CENTER && (t = (T.width - P.width) / 2);
var e = this._getLineHeight() * (A.length - 1), i = E * (1 - a.BASELINE_RATIO / 2);
if (b !== o.VerticalTextAlignment.TOP) {
var n = e + P.height + E - T.height;
b === o.VerticalTextAlignment.BOTTOM ? i -= n += a.BASELINE_RATIO / 2 * E : i -= n / 2;
}
i += a.BASELINE_OFFSET * E;
return cc.v2(t + P.x, i + P.y);
};
i._setupOutline = function() {
p.strokeStyle = "rgba(" + D.r + ", " + D.g + ", " + D.b + ", " + D.a / 255 + ")";
p.lineWidth = 2 * O.width;
};
i._setupShadow = function() {
p.shadowColor = "rgba(" + N.r + ", " + N.g + ", " + N.b + ", " + N.a / 255 + ")";
p.shadowBlur = M.blur;
p.shadowOffsetX = M.offset.x;
p.shadowOffsetY = -M.offset.y;
};
i._drawUnderline = function(t) {
if (O) {
this._setupOutline();
p.strokeRect(H.x, H.y, t, V);
}
p.lineWidth = V;
p.fillStyle = "rgba(" + R.r + ", " + R.g + ", " + R.b + ", " + R.a / 255 + ")";
p.fillRect(H.x, H.y, t, V);
};
i._updateTexture = function() {
p.clearRect(0, 0, v.width, v.height);
var t = O ? D : R;
p.fillStyle = "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + d + ")";
p.fillRect(0, 0, v.width, v.height);
p.font = m;
var e = this._calculateFillTextStartPosition(), i = this._getLineHeight();
p.lineJoin = "round";
p.fillStyle = "rgba(" + R.r + ", " + R.g + ", " + R.b + ", 1)";
var n = A.length > 1, r = this._measureText(p, m), s = 0, a = 0;
M && this._setupShadow();
O && O.width > 0 && this._setupOutline();
for (var c = 0; c < A.length; ++c) {
s = e.x;
a = e.y + c * i;
if (M && n) {
O && O.width > 0 && p.strokeText(A[c], s, a);
p.fillText(A[c], s, a);
}
if (k) {
G = r(A[c]);
S === o.TextAlignment.RIGHT ? H.x = e.x - G : S === o.TextAlignment.CENTER ? H.x = e.x - G / 2 : H.x = e.x;
H.y = a + C / 8;
this._drawUnderline(G);
}
}
M && n && (p.shadowColor = "transparent");
for (var l = 0; l < A.length; ++l) {
s = e.x;
a = e.y + l * i;
O && O.width > 0 && p.strokeText(A[l], s, a);
p.fillText(A[l], s, a);
}
M && (p.shadowColor = "transparent");
g.handleLoadedTexture();
};
i._calDynamicAtlas = function(t) {
if (t.cacheMode === c.CacheMode.BITMAP) {
var e = t._frame;
f(t, e);
e._original || e.setRect(cc.rect(0, 0, v.width, v.height));
this.packToDynamicAtlas(t, e);
}
};
i._updateLabelDimensions = function() {
var t = y.split("\n");
if (w === h.RESIZE_HEIGHT) {
var e = (A.length + a.BASELINE_RATIO) * this._getLineHeight();
T.height = e + P.height;
z.height = e + F.height;
} else if (w === h.NONE) {
A = t;
for (var i = 0, n = 0, r = 0; r < t.length; ++r) {
var s = a.safeMeasureText(p, t[r], m);
i = i > s ? i : s;
}
n = (A.length + a.BASELINE_RATIO) * this._getLineHeight();
var o = parseFloat(i.toFixed(2)), c = parseFloat(n.toFixed(2));
T.width = o + P.width;
T.height = c + P.height;
z.width = o + F.width;
z.height = c + F.height;
}
T.width = Math.min(T.width, 2048);
T.height = Math.min(T.height, 2048);
v.width !== T.width && (v.width = T.width);
v.height !== T.height && (v.height = T.height);
};
i._calculateTextBaseline = function() {
var t;
t = S === o.TextAlignment.RIGHT ? "right" : S === o.TextAlignment.CENTER ? "center" : "left";
p.textAlign = t;
p.textBaseline = "alphabetic";
};
i._calculateSplitedStrings = function() {
var t = y.split("\n");
if (I) {
A = [];
for (var e = z.width, i = 0; i < t.length; ++i) {
var n = a.safeMeasureText(p, t[i], m), r = a.fragmentText(t[i], n, e, this._measureText(p, m));
A = A.concat(r);
}
} else A = t;
};
i._getFontDesc = function() {
var t = E.toString() + "px ";
t += L;
B && (t = "bold " + t);
U && (t = "italic " + t);
return t;
};
i._getLineHeight = function() {
var t = x;
return 0 | (t = 0 === t ? E : t * E / C);
};
i._calculateParagraphLength = function(t, e) {
for (var i = [], n = 0; n < t.length; ++n) {
var r = a.safeMeasureText(e, t[n], m);
i.push(r);
}
return i;
};
i._measureText = function(t, e) {
return function(i) {
return a.safeMeasureText(t, i, e);
};
};
i._calculateLabelFont = function() {
m = this._getFontDesc();
p.font = m;
if (w === h.SHRINK) {
var t = y.split("\n"), e = this._calculateParagraphLength(t, p), i = 0, n = 0, r = 0;
if (I) {
var s = z.width, o = z.height;
if (s < 0 || o < 0) {
m = this._getFontDesc();
p.font = m;
return;
}
n = o + 1;
r = s + 1;
for (var c = "", l = 0, u = 0 | E + 1, f = 0; l < u; ) {
if ((f = l + u + 1 >> 1) <= 0) {
cc.logID(4003);
break;
}
E = f;
m = this._getFontDesc();
p.font = m;
n = 0;
for (i = 0; i < t.length; ++i) {
var _ = 0, d = a.safeMeasureText(p, t[i], m);
c = a.fragmentText(t[i], d, s, this._measureText(p, m));
for (;_ < c.length; ) {
r = a.safeMeasureText(p, c[_], m);
n += this._getLineHeight();
++_;
}
}
n > o ? u = f - 1 : l = f;
}
if (0 === l) cc.logID(4003); else {
E = l;
m = this._getFontDesc();
p.font = m;
}
} else {
n = t.length * this._getLineHeight();
for (i = 0; i < t.length; ++i) r < e[i] && (r = e[i]);
var v = (T.width - P.width) / r, g = T.height / n;
E = C * Math.min(1, v, g) | 0;
m = this._getFontDesc();
p.font = m;
}
}
};
return e;
})(n.default);
i.default = W;
e.exports = i.default;
}), {
"../../../components/CCLabel": 46,
"../../../components/CCLabelOutline": void 0,
"../../../components/CCLabelShadow": void 0,
"../../../platform/CCMacro": 97,
"../../../utils/text-utils": 160,
"../../assembler-2d": 118,
"../utils": 129
} ],
129: [ (function(t, e, i) {
"use strict";
var n = t("./dynamic-atlas/manager"), r = cc.Color.WHITE, s = {
fontAtlas: null,
fontSize: 0,
lineHeight: 0,
hAlign: 0,
vAlign: 0,
hash: "",
fontFamily: "",
fontDesc: "Arial",
color: r,
isOutlined: !1,
out: r,
margin: 0
};
e.exports = {
deleteFromDynamicAtlas: function(t, e) {
if (e && e._original && n) {
n.deleteAtlasSpriteFrame(e);
e._resetDynamicAtlasFrame();
}
},
getFontFamily: function(t) {
if (t.useSystemFont) return t.fontFamily || "Arial";
if (t.font) {
if (t.font._nativeAsset) return t.font._nativeAsset;
cc.loader.load(t.font.nativeUrl, (function(e, i) {
t.font._nativeAsset = i;
t.setVertsDirty();
}));
return "Arial";
}
return "Arial";
},
shareLabelInfo: s
};
}), {
"./dynamic-atlas/manager": void 0
} ],
130: [ (function(t, e, i) {
"use strict";
cc.assemblers = {};
t("./sprite");
t("./mask-assembler");
t("./graphics");
t("./label");
t("./motion-streak");
}), {
"./graphics": void 0,
"./label": 134,
"./mask-assembler": void 0,
"./motion-streak": void 0,
"./sprite": 141
} ],
131: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var r = 0, s = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
};
i._reserveQuads = function(t, e) {
var i = 4 * e, n = 6 * e, s = this._renderData._flexBuffer;
s.reserve(i, n);
s.used(i, n);
for (var a = this._renderData.iDatas[0], o = 0, c = 0, l = n; o < l; o += 6, c += 4) {
a[o] = c;
a[o + 1] = c + 1;
a[o + 2] = c + 2;
a[o + 3] = c + 1;
a[o + 4] = c + 3;
a[o + 5] = c + 2;
}
r = 0;
};
i._quadsUpdated = function(t) {
r = 0;
this._renderData._flexBuffer.used(this.verticesCount, this.indicesCount);
};
i._getColor = function(t) {
return t.node._color._val;
};
i.appendQuad = function(t, e, i, n, s, a, o) {
var c = this._renderData, l = c.vDatas[0], u = c.uintVDatas[0];
this.verticesCount += 4;
this.indicesCount = this.verticesCount / 2 * 3;
var h, f, _, d, p = e.width, v = e.height, g = i.width, m = i.height, y = this._getColor(t), E = this.floatsPerVert, C = r + this.uvOffset;
if (n) {
h = i.x / p;
_ = (i.x + m) / p;
f = (i.y + g) / v;
d = i.y / v;
l[C] = h;
l[C + 1] = d;
l[C += E] = h;
l[C + 1] = f;
l[C += E] = _;
l[C + 1] = d;
l[C += E] = _;
l[C + 1] = f;
} else {
h = i.x / p;
_ = (i.x + g) / p;
f = (i.y + m) / v;
d = i.y / v;
l[C] = h;
l[C + 1] = f;
l[C += E] = _;
l[C + 1] = f;
l[C += E] = h;
l[C + 1] = d;
l[C += E] = _;
l[C + 1] = d;
}
h = s;
_ = s + g * o;
f = a - m * o;
d = a;
this.appendVerts(t, r, h, _, f, d);
for (var A = r + this.colorOffset, T = 0; T < 4; T++) {
u[A] = y;
A += E;
}
r += 4 * this.floatsPerVert;
};
i.appendVerts = function(t, e, i, n, r, s) {
var a = this._local, o = this.floatsPerVert;
a[e] = i;
a[e + 1] = r;
a[e += o] = n;
a[e + 1] = r;
a[e += o] = i;
a[e + 1] = s;
a[e += o] = n;
a[e + 1] = s;
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, l = this._renderData.vDatas[0], u = this.floatsPerVert, h = 0; h < c.length; h += u) {
var f = c[h], _ = c[h + 1];
l[h] = f * i + _ * r + a;
l[h + 1] = f * n + _ * s + o;
}
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../../../../utils/label/bmfont")).default);
i.default = s;
e.exports = i.default;
}), {
"../../../../utils/label/bmfont": 125
} ],
132: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
t("../../../../../platform/js"), t("./bmfont");
var r = t("../../../../utils/label/letter-font"), s = cc.color(255, 255, 255, 255), a = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.createData = function(t) {
return t.requestRenderData();
};
i._getColor = function(t) {
s._fastSetA(t.node._color.a);
return s._val;
};
i.updateColor = function(e) {
var i = this._getColor(e);
t.prototype.updateColor.call(this, e, i);
};
return e;
})(r);
i.default = a;
e.exports = i.default;
}), {
"../../../../../platform/js": 112,
"../../../../utils/label/letter-font": 127,
"./bmfont": 131
} ],
133: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../../utils/label/ttf"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = t("../../../../../components/CCLabelShadow"), a = cc.color(255, 255, 255, 255), o = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateUVs = function(t) {
for (var e = this._renderData.vDatas[0], i = t._frame.uv, n = this.uvOffset, r = this.floatsPerVert, s = 0; s < 4; s++) {
var a = 2 * s, o = r * s + n;
e[o] = i[a];
e[o + 1] = i[a + 1];
}
};
i.updateColor = function(e) {
a._fastSetA(e.node._color.a);
var i = a._val;
t.prototype.updateColor.call(this, e, i);
};
i.updateVerts = function(t) {
var e = t.node, i = t._ttfTexture.width, n = t._ttfTexture.height, r = e.anchorX * e.width, a = e.anchorY * e.height, o = s && t.getComponent(s);
if (o && o._enabled) {
var c = (i - e.width) / 2, l = (n - e.height) / 2, u = o.offset;
-u.x > c ? r += i - e.width : c > u.x && (r += c - u.x);
-u.y > l ? a += n - e.height : l > u.y && (a += l - u.y);
}
var h = this._local;
h[0] = -r;
h[1] = -a;
h[2] = i - r;
h[3] = n - a;
this.updateUVs(t);
this.updateWorldVerts(t);
};
return e;
})(n.default);
i.default = o;
e.exports = i.default;
}), {
"../../../../../components/CCLabelShadow": void 0,
"../../../../utils/label/ttf": 128
} ],
134: [ (function(t, e, i) {
"use strict";
var n = h(t("../../../assembler")), r = h(t("../../../../components/CCLabel")), s = h(t("./2d/ttf")), a = h(t("./2d/bmfont")), o = h(t("./2d/letter")), c = h(t("./3d/ttf")), l = h(t("./3d/bmfont")), u = h(t("./3d/letter"));
function h(t) {
return t && t.__esModule ? t : {
default: t
};
}
r.default._canvasPool = {
pool: [],
get: function() {
var t = this.pool.pop();
if (!t) {
var e = document.createElement("canvas");
t = {
canvas: e,
context: e.getContext("2d")
};
}
return t;
},
put: function(t) {
this.pool.length >= 32 || this.pool.push(t);
}
};
n.default.register(cc.Label, {
getConstructor: function(t) {
var e = t.node.is3DNode, i = e ? c.default : s.default;
t.font instanceof cc.BitmapFont ? i = e ? l.default : a.default : t.cacheMode === r.default.CacheMode.CHAR && (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB ? cc.warn("sorry, subdomain does not support CHAR mode currently!") : i = e ? u.default : o.default);
return i;
},
TTF: s.default,
Bmfont: a.default,
Letter: o.default,
TTF3D: c.default,
Bmfont3D: l.default,
Letter3D: u.default
});
}), {
"../../../../components/CCLabel": 46,
"../../../assembler": 120,
"./2d/bmfont": 131,
"./2d/letter": 132,
"./2d/ttf": 133,
"./3d/bmfont": void 0,
"./3d/letter": void 0,
"./3d/ttf": void 0
} ],
135: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../../assembler-2d"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = t("../../../../../components/CCSprite").FillType, a = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
if (t._vertsDirty) {
var i = t._fillStart, n = t._fillRange;
if (n < 0) {
i += n;
n = -n;
}
n = i + n;
i = (i = i > 1 ? 1 : i) < 0 ? 0 : i;
n = (n = n > 1 ? 1 : n) < 0 ? 0 : n;
var r = i + (n = (n -= i) < 0 ? 0 : n);
r = r > 1 ? 1 : r;
this.updateUVs(t, i, r);
this.updateVerts(t, i, r);
t._vertsDirty = !1;
}
};
i.updateUVs = function(t, e, i) {
var n, r, a, o, c, l, u, h, f, _, d, p, v = t._spriteFrame, g = v._texture.width, m = v._texture.height, y = v._rect;
if (v._rotated) {
n = y.x / g;
r = (y.y + y.width) / m;
a = (y.x + y.height) / g;
o = y.y / m;
c = u = n;
f = d = a;
h = p = r;
l = _ = o;
} else {
n = y.x / g;
r = (y.y + y.height) / m;
a = (y.x + y.width) / g;
o = y.y / m;
c = f = n;
u = d = a;
l = h = r;
_ = p = o;
}
var E = this._renderData.vDatas[0], C = this.uvOffset, A = this.floatsPerVert;
switch (t._fillType) {
case s.HORIZONTAL:
E[C] = c + (u - c) * e;
E[C + 1] = l + (h - l) * e;
E[C + A] = c + (u - c) * i;
E[C + A + 1] = l + (h - l) * i;
E[C + 2 * A] = f + (d - f) * e;
E[C + 2 * A + 1] = _ + (p - _) * e;
E[C + 3 * A] = f + (d - f) * i;
E[C + 3 * A + 1] = _ + (p - _) * i;
break;

case s.VERTICAL:
E[C] = c + (f - c) * e;
E[C + 1] = l + (_ - l) * e;
E[C + A] = u + (d - u) * e;
E[C + A + 1] = h + (p - h) * e;
E[C + 2 * A] = c + (f - c) * i;
E[C + 2 * A + 1] = l + (_ - l) * i;
E[C + 3 * A] = u + (d - u) * i;
E[C + 3 * A + 1] = h + (p - h) * i;
break;

default:
cc.errorID(2626);
}
};
i.updateVerts = function(t, e, i) {
var n, r = t.node, a = r.width, o = r.height, c = r.anchorX * a, l = r.anchorY * o, u = -c, h = -l, f = a - c, _ = o - l;
switch (t._fillType) {
case s.HORIZONTAL:
n = u + (f - u) * i;
u = u + (f - u) * e;
f = n;
break;

case s.VERTICAL:
n = h + (_ - h) * i;
h = h + (_ - h) * e;
_ = n;
break;

default:
cc.errorID(2626);
}
var d = this._local;
d[0] = u;
d[1] = h;
d[2] = f;
d[3] = _;
this.updateWorldVerts(t);
};
return e;
})(n.default);
i.default = a;
e.exports = i.default;
}), {
"../../../../../components/CCSprite": 49,
"../../../../assembler-2d": 118
} ],
136: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var r = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function(t) {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
};
i.updateRenderData = function(t) {
this.packToDynamicAtlas(t, t._spriteFrame);
var e = t.spriteFrame;
if (e) {
var i = e.vertices;
if (i) {
this.verticesCount = i.x.length;
this.indicesCount = i.triangles.length;
var n = this._renderData._flexBuffer;
if (n.reserve(this.verticesCount, this.indicesCount)) {
this.updateColor(t);
t._vertsDirty = !0;
}
n.used(this.verticesCount, this.indicesCount);
this.updateIndices(i.triangles);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
this.updateWorldVerts(t);
t._vertsDirty = !1;
}
}
}
};
i.updateIndices = function(t) {
this._renderData.iDatas[0].set(t);
};
i.updateUVs = function(t) {
for (var e = t.spriteFrame.vertices, i = e.nu, n = e.nv, r = this.uvOffset, s = this.floatsPerVert, a = this._renderData.vDatas[0], o = 0; o < i.length; o++) {
var c = s * o + r;
a[c] = i[o];
a[c + 1] = n[o];
}
};
i.updateVerts = function(t) {
var e = t.node, i = Math.abs(e.width), n = Math.abs(e.height), r = e.anchorX * i, s = e.anchorY * n, a = t.spriteFrame, o = a.vertices, c = o.x, l = o.y, u = a._originalSize.width, h = a._originalSize.height, f = a._rect.width, _ = a._rect.height, d = a._offset.x + (u - f) / 2, p = a._offset.y + (h - _) / 2, v = i / (t.trim ? f : u), g = n / (t.trim ? _ : h), m = this._local;
if (t.trim) for (var y = 0, E = c.length; y < E; y++) {
var C = 2 * y;
m[C] = (c[y] - d) * v - r;
m[C + 1] = (h - l[y] - p) * g - s;
} else for (var A = 0, T = c.length; A < T; A++) {
var x = 2 * A;
m[x] = c[A] * v - r;
m[x + 1] = (h - l[A]) * g - s;
}
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, l = this._renderData.vDatas[0], u = this.floatsPerVert, h = 0, f = this.verticesCount; h < f; h++) {
var _ = c[2 * h], d = c[2 * h + 1];
l[u * h] = _ * i + d * r + a;
l[u * h + 1] = _ * n + d * s + o;
}
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../../../../assembler-2d")).default);
i.default = r;
e.exports = i.default;
}), {
"../../../../assembler-2d": 118
} ],
137: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../../assembler-2d"));
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = 2 * Math.PI, a = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], o = [ 0, 0, 0, 0 ], c = [ 0, 0, 0, 0, 0, 0, 0, 0 ], l = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], u = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], h = cc.v2(0, 0), f = [];
function _(t, e, i, n, r, s, a) {
var o, c, l = Math.sin(s), u = Math.cos(s);
if (0 !== Math.cos(s)) {
o = l / u;
if ((t - r.x) * u > 0) {
var h = r.y + o * (t - r.x);
a[0].x = t;
a[0].y = h;
}
if ((e - r.x) * u > 0) {
var f = r.y + o * (e - r.x);
a[2].x = e;
a[2].y = f;
}
}
if (0 !== Math.sin(s)) {
c = u / l;
if ((n - r.y) * l > 0) {
var _ = r.x + c * (n - r.y);
a[3].x = _;
a[3].y = n;
}
if ((i - r.y) * l > 0) {
var d = r.x + c * (i - r.y);
a[1].x = d;
a[1].y = i;
}
}
}
function d(t) {
var e = t.node, i = e.width, n = e.height, r = e.anchorX * i, s = e.anchorY * n, c = -r, l = -s, u = i - r, _ = n - s, d = o;
d[0] = c;
d[1] = l;
d[2] = u;
d[3] = _;
var p = t._fillCenter, v = h.x = Math.min(Math.max(0, p.x), 1) * (u - c) + c, g = h.y = Math.min(Math.max(0, p.y), 1) * (_ - l) + l;
a[0].x = a[3].x = c;
a[1].x = a[2].x = u;
a[0].y = a[1].y = l;
a[2].y = a[3].y = _;
f.length = 0;
v !== d[0] && (f[0] = [ 3, 0 ]);
v !== d[2] && (f[2] = [ 1, 2 ]);
g !== d[1] && (f[1] = [ 0, 1 ]);
g !== d[3] && (f[3] = [ 2, 3 ]);
}
function p(t) {
var e, i, n, r, s = t._texture.width, a = t._texture.height, o = t._rect, l = c;
if (t._rotated) {
e = o.x / s;
i = (o.x + o.height) / s;
n = o.y / a;
r = (o.y + o.width) / a;
l[0] = l[2] = e;
l[4] = l[6] = i;
l[3] = l[7] = r;
l[1] = l[5] = n;
} else {
e = o.x / s;
i = (o.x + o.width) / s;
n = o.y / a;
r = (o.y + o.height) / a;
l[0] = l[4] = e;
l[2] = l[6] = i;
l[1] = l[3] = r;
l[5] = l[7] = n;
}
}
function v(t, e) {
var i, n;
i = e.x - t.x;
n = e.y - t.y;
if (0 !== i || 0 !== n) {
if (0 === i) return n > 0 ? .5 * Math.PI : 1.5 * Math.PI;
var r = Math.atan(n / i);
i < 0 && (r += Math.PI);
return r;
}
}
var g = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function(t) {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
this.updateIndices();
};
i.updateRenderData = function(e) {
t.prototype.updateRenderData.call(this, e);
var i = e.spriteFrame;
this.packToDynamicAtlas(e, i);
if (e._vertsDirty) {
var n = e._fillStart, r = e._fillRange;
if (r < 0) {
n += r;
r = -r;
}
for (;n >= 1; ) n -= 1;
for (;n < 0; ) n += 1;
n *= s;
r *= s;
d(e);
p(i);
_(o[0], o[2], o[1], o[3], h, n, l);
_(o[0], o[2], o[1], o[3], h, n + r, u);
this.updateVerts(e, n, r);
e._vertsDirty = !1;
}
};
i.updateVerts = function(t, e, i) {
var n = e + i, r = this._local;
r.length = 0;
for (var o = 0, c = 3 * this.floatsPerVert, _ = 0; _ < 4; ++_) {
var d = f[_];
if (d) if (i >= s) {
r.length = o + c;
this._generateTriangle(r, o, h, a[d[0]], a[d[1]]);
o += c;
} else {
var p = v(h, a[d[0]]), g = v(h, a[d[1]]);
g < p && (g += s);
p -= s;
g -= s;
for (var m = 0; m < 3; ++m) {
if (p >= n) ; else if (p >= e) {
r.length = o + c;
g >= n ? this._generateTriangle(r, o, h, a[d[0]], u[_]) : this._generateTriangle(r, o, h, a[d[0]], a[d[1]]);
o += c;
} else if (g <= e) ; else if (g <= n) {
r.length = o + c;
this._generateTriangle(r, o, h, l[_], a[d[1]]);
o += c;
} else {
r.length = o + c;
this._generateTriangle(r, o, h, l[_], u[_]);
o += c;
}
p += s;
g += s;
}
}
}
this.allocWorldVerts(t);
this.updateWorldVerts(t);
};
i.allocWorldVerts = function(t) {
var e = t.node._color._val, i = this._renderData, n = this.floatsPerVert, r = this._local, s = r.length / n;
this.verticesCount = this.indicesCount = s;
var a = i._flexBuffer;
a.reserve(s, s) && this.updateIndices();
a.used(this.verticesCount, this.indicesCount);
for (var o = i.vDatas[0], c = i.uintVDatas[0], l = this.uvOffset, u = 0; u < r.length; u += n) {
var h = u + l;
o[h] = r[h];
o[h + 1] = r[h + 1];
c[h + 2] = e;
}
};
i.updateIndices = function() {
for (var t = this._renderData.iDatas[0], e = 0; e < t.length; e++) t[e] = e;
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, l = this._renderData.vDatas[0], u = this.floatsPerVert, h = 0; h < c.length; h += u) {
var f = c[h], _ = c[h + 1];
l[h] = f * i + _ * r + a;
l[h + 1] = f * n + _ * s + o;
}
};
i._generateTriangle = function(t, e, i, n, r) {
var s = o, a = s[0], c = s[1], l = s[2], u = s[3], h = this.floatsPerVert;
t[e] = i.x;
t[e + 1] = i.y;
t[e + h] = n.x;
t[e + h + 1] = n.y;
t[e + 2 * h] = r.x;
t[e + 2 * h + 1] = r.y;
var f, _, d = this.uvOffset;
f = (i.x - a) / (l - a);
_ = (i.y - c) / (u - c);
this._generateUV(f, _, t, e + d);
f = (n.x - a) / (l - a);
_ = (n.y - c) / (u - c);
this._generateUV(f, _, t, e + h + d);
f = (r.x - a) / (l - a);
_ = (r.y - c) / (u - c);
this._generateUV(f, _, t, e + 2 * h + d);
};
i._generateUV = function(t, e, i, n) {
var r = c, s = r[0] + (r[2] - r[0]) * t, a = r[4] + (r[6] - r[4]) * t, o = r[1] + (r[3] - r[1]) * t, l = r[5] + (r[7] - r[5]) * t;
i[n] = s + (a - s) * e;
i[n + 1] = o + (l - o) * e;
};
return e;
})(n.default);
i.default = g;
e.exports = i.default;
}), {
"../../../../assembler-2d": 118
} ],
138: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var r = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
this.packToDynamicAtlas(t, t._spriteFrame);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateUVs = function(t) {
for (var e = t._spriteFrame.uv, i = this.uvOffset, n = this.floatsPerVert, r = this._renderData.vDatas[0], s = 0; s < 4; s++) {
var a = 2 * s, o = n * s + i;
r[o] = e[a];
r[o + 1] = e[a + 1];
}
};
i.updateVerts = function(t) {
var e, i, n, r, s = t.node, a = s.width, o = s.height, c = s.anchorX * a, l = s.anchorY * o;
if (t.trim) {
e = -c;
i = -l;
n = a - c;
r = o - l;
} else {
var u = t.spriteFrame, h = u._originalSize.width, f = u._originalSize.height, _ = u._rect.width, d = u._rect.height, p = u._offset, v = a / h, g = o / f, m = p.x + (h - _) / 2, y = p.x - (h - _) / 2, E = p.y + (f - d) / 2, C = p.y - (f - d) / 2;
e = m * v - c;
i = E * g - l;
n = a + y * v - c;
r = o + C * g - l;
}
var A = this._local;
A[0] = e;
A[1] = i;
A[2] = n;
A[3] = r;
this.updateWorldVerts(t);
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../../../../assembler-2d")).default);
i.default = r;
e.exports = i.default;
}), {
"../../../../assembler-2d": 118
} ],
139: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var r = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function(t) {
if (!(this._renderData.meshCount > 0)) {
this._renderData.createData(0, this.verticesFloats, this.indicesCount);
for (var e = this._renderData.iDatas[0], i = 0, n = 0; n < 3; ++n) for (var r = 0; r < 3; ++r) {
var s = 4 * n + r;
e[i++] = s;
e[i++] = s + 1;
e[i++] = s + 4;
e[i++] = s + 1;
e[i++] = s + 5;
e[i++] = s + 4;
}
}
};
i.initLocal = function() {
this._local = [];
this._local.length = 8;
};
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateVerts = function(t) {
var e = t.node, i = e.width, n = e.height, r = e.anchorX * i, s = e.anchorY * n, a = t.spriteFrame, o = a.insetLeft, c = a.insetRight, l = a.insetTop, u = a.insetBottom, h = i - o - c, f = n - l - u, _ = i / (o + c), d = n / (l + u);
_ = isNaN(_) || _ > 1 ? 1 : _;
d = isNaN(d) || d > 1 ? 1 : d;
h = h < 0 ? 0 : h;
f = f < 0 ? 0 : f;
var p = this._local;
p[0] = -r;
p[1] = -s;
p[2] = o * _ - r;
p[3] = u * d - s;
p[4] = p[2] + h;
p[5] = p[3] + f;
p[6] = i - r;
p[7] = n - s;
this.updateWorldVerts(t);
};
i.updateUVs = function(t) {
for (var e = this._renderData.vDatas[0], i = t.spriteFrame.uvSliced, n = this.uvOffset, r = this.floatsPerVert, s = 0; s < 4; ++s) for (var a = 0; a < 4; ++a) {
var o = 4 * s + a, c = i[o], l = o * r;
e[l + n] = c.u;
e[l + n + 1] = c.v;
}
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, l = this._renderData.vDatas[0], u = this.floatsPerVert, h = 0; h < 4; ++h) for (var f = c[2 * h + 1], _ = 0; _ < 4; ++_) {
var d = c[2 * _], p = (4 * h + _) * u;
l[p] = d * i + f * r + a;
l[p + 1] = d * n + f * s + o;
}
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../../../../assembler-2d")).default);
i.default = r;
Object.assign(r.prototype, {
verticesCount: 16,
indicesCount: 54
});
e.exports = i.default;
}), {
"../../../../assembler-2d": 118
} ],
140: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var r = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function(t) {
this.verticesCount = 0;
this.contentWidth = 0;
this.contentHeight = 0;
this.rectWidth = 0;
this.rectHeight = 0;
this.hRepeat = 0;
this.vRepeat = 0;
this.row = 0;
this.col = 0;
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
this._updateIndices();
};
i.initLocal = function() {
this._local = {
x: [],
y: []
};
};
i._updateIndices = function() {
for (var t = this._renderData.iDatas[0], e = 0, i = 0, n = t.length; e < n; e += 6, 
i += 4) {
t[e] = i;
t[e + 1] = i + 1;
t[e + 2] = i + 2;
t[e + 3] = i + 1;
t[e + 4] = i + 3;
t[e + 5] = i + 2;
}
};
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
var i = t.node, n = this.contentWidth = Math.abs(i.width), r = this.contentHeight = Math.abs(i.height), s = e._rect, a = e.insetLeft, o = e.insetRight, c = s.width - a - o, l = e.insetTop, u = e.insetBottom, h = s.height - l - u;
this.sizableWidth = n - a - o;
this.sizableHeight = r - l - u;
this.sizableWidth = this.sizableWidth > 0 ? this.sizableWidth : 0;
this.sizableHeight = this.sizableHeight > 0 ? this.sizableHeight : 0;
var f = this.hRepeat = 0 === c ? this.sizableWidth : this.sizableWidth / c, _ = this.vRepeat = 0 === h ? this.sizableHeight : this.sizableHeight / h, d = (this.row = Math.ceil(_ + 2)) * (this.col = Math.ceil(f + 2));
this.verticesCount = 4 * d;
this.indicesCount = 6 * d;
var p = this._renderData._flexBuffer;
if (p.reserve(this.verticesCount, this.indicesCount)) {
this._updateIndices();
this.updateColor(t);
}
p.used(this.verticesCount, this.indicesCount);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateVerts = function(t) {
var e = t._spriteFrame, i = e._rect, n = t.node, r = n.anchorX * n.width, s = n.anchorY * n.height, a = this.row, o = this.col, c = this.contentWidth, l = this.contentHeight, u = this._local, h = u.x, f = u.y;
h.length = f.length = 0;
var _ = e.insetLeft, d = e.insetRight, p = i.width - _ - d, v = e.insetTop, g = e.insetBottom, m = i.height - v - g, y = n.width / (_ + d) > 1 ? 1 : n.width / (_ + d), E = n.height / (v + g) > 1 ? 1 : n.height / (v + g), C = 0, A = 0;
C = p > 0 ? Math.floor(1e3 * this.sizableWidth) / 1e3 % p == 0 ? p : this.sizableWidth % p : this.sizableWidth;
A = m > 0 ? Math.floor(1e3 * this.sizableHeight) / 1e3 % m == 0 ? m : this.sizableHeight % m : this.sizableHeight;
for (var T = 0; T <= o; T++) 0 === T ? h[T] = -r : T > 0 && T < o ? h[T] = 1 === T ? _ * y + Math.min(p, this.sizableWidth) - r : p > 0 ? T === o - 1 ? _ + C + p * (T - 2) - r : _ + Math.min(p, this.sizableWidth) + p * (T - 2) - r : _ + this.sizableWidth - r : T === o && (h[T] = Math.min(_ + this.sizableWidth + d, c) - r);
for (var x = 0; x <= a; x++) 0 === x ? f[x] = -s : x > 0 && x < a ? f[x] = 1 === x ? g * E + Math.min(m, this.sizableHeight) - s : m > 0 ? x === a - 1 ? g + A + (x - 2) * m - s : g + Math.min(m, this.sizableHeight) + (x - 2) * m - s : g + this.sizableHeight - s : x === a && (f[x] = Math.min(g + this.sizableHeight + v, l) - s);
this.updateWorldVerts(t);
};
i.updateWorldVerts = function(t) {
for (var e, i, n, r, s = this._renderData, a = this._local, o = a.x, c = a.y, l = s.vDatas[0], u = this.row, h = this.col, f = t.node._worldMatrix.m, _ = f[0], d = f[1], p = f[4], v = f[5], g = f[12], m = f[13], y = this.floatsPerVert, E = 0, C = 0, A = u; C < A; ++C) {
n = c[C];
r = c[C + 1];
for (var T = 0, x = h; T < x; ++T) {
e = o[T];
i = o[T + 1];
l[E] = e * _ + n * p + g;
l[E + 1] = e * d + n * v + m;
l[E += y] = i * _ + n * p + g;
l[E + 1] = i * d + n * v + m;
l[E += y] = e * _ + r * p + g;
l[E + 1] = e * d + r * v + m;
l[E += y] = i * _ + r * p + g;
l[E + 1] = i * d + r * v + m;
E += y;
}
}
};
i.updateUVs = function(t) {
var e = this._renderData.vDatas[0];
if (e) for (var i = t._spriteFrame, n = i._rect, r = i.insetLeft, s = i.insetRight, a = n.width - r - s, o = i.insetTop, c = i.insetBottom, l = n.height - o - c, u = this.row, h = this.col, f = this.hRepeat, _ = this.vRepeat, d = 0, p = 0, v = t.spriteFrame.uv, g = t.spriteFrame.uvSliced, m = t.spriteFrame._rotated, y = this.floatsPerVert, E = this.uvOffset, C = 0, A = u; C < A; ++C) {
p = this.sizableHeight > l ? this.sizableHeight >= C * l ? 1 : _ % 1 : _;
for (var T = 0, x = h; T < x; ++T) {
d = this.sizableWidth > a ? this.sizableWidth >= T * a ? 1 : f % 1 : f;
if (m) {
e[E] = v[0];
e[E + 1] = v[1];
e[E += y] = v[0];
e[E + 1] = v[1] + (v[7] - v[1]) * d;
e[E += y] = v[0] + (v[6] - v[0]) * p;
e[E + 1] = v[1];
e[E += y] = e[E - y];
e[E + 1] = e[E + 1 - 2 * y];
E += y;
} else {
0 === T ? e[E] = v[0] : T > 0 && T < h - 1 ? e[E] = g[1].u : T === h - 1 && (e[E] = g[2].u);
0 === C ? e[E + 1] = g[0].v : C > 0 && C < u - 1 ? e[E + 1] = g[4].v : C === u - 1 && (e[E + 1] = g[8].v);
E += y;
0 === T ? e[E] = g[1].u + (g[2].u - g[1].u) * d : T > 0 && T < h - 1 ? e[E] = g[1].u + (g[2].u - g[1].u) * d : T === h - 1 && (e[E] = g[3].u);
0 === C ? e[E + 1] = g[0].v : C > 0 && C < u - 1 ? e[E + 1] = g[4].v : C === u - 1 && (e[E + 1] = g[8].v);
E += y;
0 === T ? e[E] = v[0] : T > 0 && T < h - 1 ? e[E] = g[1].u : T === h - 1 && (e[E] = g[2].u);
0 === C ? e[E + 1] = g[4].v + (g[8].v - g[4].v) * p : C > 0 && C < u - 1 ? e[E + 1] = g[4].v + (g[8].v - g[4].v) * p : C === u - 1 && (e[E + 1] = g[12].v);
e[E += y] = e[E - 2 * y];
e[E + 1] = e[E + 1 - y];
E += y;
}
}
}
};
return e;
})(function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../../../../assembler-2d")).default);
i.default = r;
e.exports = i.default;
}), {
"../../../../assembler-2d": 118
} ],
141: [ (function(t, e, i) {
"use strict";
var n = g(t("../../../assembler")), r = t("../../../../components/CCSprite"), s = g(t("./2d/simple")), a = g(t("./2d/sliced")), o = g(t("./2d/tiled")), c = g(t("./2d/radial-filled")), l = g(t("./2d/bar-filled")), u = g(t("./2d/mesh")), h = g(t("./3d/simple")), f = g(t("./3d/sliced")), _ = g(t("./3d/tiled")), d = g(t("./3d/radial-filled")), p = g(t("./3d/bar-filled")), v = g(t("./3d/mesh"));
function g(t) {
return t && t.__esModule ? t : {
default: t
};
}
var m = {
getConstructor: function(t) {
var e = t.node.is3DNode, i = e ? h.default : s.default;
switch (t.type) {
case r.Type.SLICED:
i = e ? f.default : a.default;
break;

case r.Type.TILED:
i = e ? _.default : o.default;
break;

case r.Type.FILLED:
i = t._fillType === r.FillType.RADIAL ? e ? d.default : c.default : e ? p.default : l.default;
break;

case r.Type.MESH:
i = e ? v.default : u.default;
}
return i;
},
Simple: s.default,
Sliced: a.default,
Tiled: o.default,
RadialFilled: c.default,
BarFilled: l.default,
Mesh: u.default,
Simple3D: h.default,
Sliced3D: f.default,
Tiled3D: _.default,
RadialFilled3D: d.default,
BarFilled3D: p.default,
Mesh3D: v.default
};
n.default.register(cc.Sprite, m);
}), {
"../../../../components/CCSprite": 49,
"../../../assembler": 120,
"./2d/bar-filled": 135,
"./2d/mesh": 136,
"./2d/radial-filled": 137,
"./2d/simple": 138,
"./2d/sliced": 139,
"./2d/tiled": 140,
"./3d/bar-filled": void 0,
"./3d/mesh": void 0,
"./3d/radial-filled": void 0,
"./3d/simple": void 0,
"./3d/sliced": void 0,
"./3d/tiled": void 0
} ],
142: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function() {
function t(t, e, i, n, r) {
this._handler = t;
this._index = e;
this._vfmt = r;
this._verticesBytes = r._bytes;
this._initVerticesCount = i;
this._initIndicesCount = n;
this.reset();
}
var e = t.prototype;
e._reallocVData = function(t, e) {
this.vData = new Float32Array(t);
this.uintVData = new Uint32Array(this.vData.buffer);
e && this.vData.set(e);
this._handler.updateMesh(this._index, this.vData, this.iData);
};
e._reallocIData = function(t, e) {
this.iData = new Uint16Array(t);
e && this.iData.set(e);
this._handler.updateMesh(this._index, this.vData, this.iData);
};
e.reserve = function(t, e) {
var i = t * this._verticesBytes >> 2, n = this.vData.length, r = !1;
if (i > n) {
for (;n < i; ) n *= 2;
this._reallocVData(n, this.vData);
r = !0;
}
var s = this.iData.length;
if (e > s) {
for (;s < e; ) s *= 2;
this._reallocIData(e, this.iData);
r = !0;
}
return r;
};
e.used = function(t, e) {
this.usedVertices = t;
this.usedIndices = e;
this.usedVerticesFloats = t * this._verticesBytes >> 2;
this._handler.updateMeshRange(t, e);
};
e.reset = function() {
var t = this._initVerticesCount * this._verticesBytes >> 2;
this._reallocVData(t);
this._reallocIData(this._initIndicesCount);
this.usedVertices = 0;
this.usedVerticesFloats = 0;
this.usedIndices = 0;
};
return t;
})();
i.default = n;
cc.FlexBuffer = n;
e.exports = i.default;
}), {} ],
143: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = s;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("./flex-buffer")), r = t("./vertex-format");
function s() {
this.vDatas = [];
this.uintVDatas = [];
this.iDatas = [];
this.meshCount = 0;
this._infos = null;
this._flexBuffer = null;
}
cc.js.mixin(s.prototype, {
init: function(t) {},
clear: function() {
this.vDatas.length = 0;
this.iDatas.length = 0;
this.uintVDatas.length = 0;
this.meshCount = 0;
this._infos = null;
this._flexBuffer && this._flexBuffer.reset();
},
updateMesh: function(t, e, i) {
this.vDatas[t] = e;
this.uintVDatas[t] = new Uint32Array(e.buffer, 0, e.length);
this.iDatas[t] = i;
this.meshCount = this.vDatas.length;
},
updateMeshRange: function(t, e) {},
createData: function(t, e, i) {
var n = new Float32Array(e), r = new Uint16Array(i);
this.updateMesh(t, n, r);
},
createQuadData: function(t, e, i) {
this.createData(t, e, i);
this.initQuadIndices(this.iDatas[t]);
},
createFlexData: function(t, e, i, s) {
s = s || r.vfmtPosUvColor;
this._flexBuffer = new n.default(this, t, e, i, s);
},
initQuadIndices: function(t) {
for (var e = t.length / 6, i = 0, n = 0; i < e; i++) {
var r = 4 * i;
t[n++] = r;
t[n++] = r + 1;
t[n++] = r + 2;
t[n++] = r + 1;
t[n++] = r + 3;
t[n++] = r + 2;
}
}
});
cc.RenderData = s;
e.exports = i.default;
}), {
"./flex-buffer": 142,
"./vertex-format": 144
} ],
144: [ (function(t, e, i) {
"use strict";
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../../../renderer/gfx"));
var r = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 3
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
r.name = "vfmt3D";
n.default.VertexFormat.XYZ_UV_Color = r;
var s = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
s.name = "vfmtPosUvColor";
n.default.VertexFormat.XY_UV_Color = s;
var a = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
}, {
name: n.default.ATTR_COLOR0,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
a.name = "vfmtPosUvTwoColor";
n.default.VertexFormat.XY_UV_Two_Color = a;
var o = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
} ]);
o.name = "vfmtPosUv";
n.default.VertexFormat.XY_UV = o;
var c = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
c.name = "vfmtPosColor";
n.default.VertexFormat.XY_Color = c;
var l = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
} ]);
l.name = "vfmtPos";
n.default.VertexFormat.XY = l;
e.exports = {
vfmt3D: r,
vfmtPosUvColor: s,
vfmtPosUvTwoColor: a,
vfmtPosUv: o,
vfmtPosColor: c,
vfmtPos: l
};
}), {
"../../../renderer/gfx": 188
} ],
145: [ (function(t, e, i) {
"use strict";
t("../platform/CCSys");
var n = /(\.[^\.\/\?\\]*)(\?.*)?$/, r = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/, s = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = n.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\)([^\/\\]+)$/g.exec(t.replace(/(\/|\\)$/, ""));
if (!n) return null;
var r = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? r.substring(0, r.length - e.length) : r;
},
dirname: function(t) {
var e = r.exec(t);
return e ? e[2] : "";
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), r = "", s = i ? this.extname(t) : "";
if (n > 0) {
r = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + s + r;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(s, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 101
} ],
146: [ (function(t, e, i) {
"use strict";
var n = function(t, e, i, n, r, s) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = r;
this.ty = s;
};
n.create = function(t, e, i, n, r, s) {
return {
a: t,
b: e,
c: i,
d: n,
tx: r,
ty: s
};
};
n.identity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
n.clone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
n.concat = function(t, e, i) {
var n = e.a, r = e.b, s = e.c, a = e.d, o = e.tx, c = e.ty;
t.a = n * i.a + r * i.c;
t.b = n * i.b + r * i.d;
t.c = s * i.a + a * i.c;
t.d = s * i.b + a * i.d;
t.tx = o * i.a + c * i.c + i.tx;
t.ty = o * i.b + c * i.d + i.ty;
return t;
};
n.invert = function(t, e) {
var i = e.a, n = e.b, r = e.c, s = e.d, a = 1 / (i * s - n * r), o = e.tx, c = e.ty;
t.a = a * s;
t.b = -a * n;
t.c = -a * r;
t.d = a * i;
t.tx = a * (r * c - s * o);
t.ty = a * (n * o - i * c);
return t;
};
n.fromMat4 = function(t, e) {
var i = e.m;
t.a = i[0];
t.b = i[1];
t.c = i[4];
t.d = i[5];
t.tx = i[12];
t.ty = i[13];
return t;
};
n.transformVec2 = function(t, e, i, n) {
var r, s;
if (void 0 === n) {
n = i;
r = e.x;
s = e.y;
} else {
r = e;
s = i;
}
t.x = n.a * r + n.c * s + n.tx;
t.y = n.b * r + n.d * s + n.ty;
return t;
};
n.transformSize = function(t, e, i) {
t.width = i.a * e.width + i.c * e.height;
t.height = i.b * e.width + i.d * e.height;
return t;
};
n.transformRect = function(t, e, i) {
var n = e.x, r = e.y, s = n + e.width, a = r + e.height, o = i.a * n + i.c * r + i.tx, c = i.b * n + i.d * r + i.ty, l = i.a * s + i.c * r + i.tx, u = i.b * s + i.d * r + i.ty, h = i.a * n + i.c * a + i.tx, f = i.b * n + i.d * a + i.ty, _ = i.a * s + i.c * a + i.tx, d = i.b * s + i.d * a + i.ty, p = Math.min(o, l, h, _), v = Math.max(o, l, h, _), g = Math.min(c, u, f, d), m = Math.max(c, u, f, d);
t.x = p;
t.y = g;
t.width = v - p;
t.height = m - g;
return t;
};
n.transformObb = function(t, e, i, n, r, s) {
var a = r.x, o = r.y, c = r.width, l = r.height, u = s.a * a + s.c * o + s.tx, h = s.b * a + s.d * o + s.ty, f = s.a * c, _ = s.b * c, d = s.c * l, p = s.d * l;
e.x = u;
e.y = h;
i.x = f + u;
i.y = _ + h;
t.x = d + u;
t.y = p + h;
n.x = f + d + u;
n.y = _ + p + h;
};
cc.AffineTransform = e.exports = n;
}), {} ],
147: [ (function(t, e, i) {
"use strict";
var n = t("../platform/CCObject").Flags, r = t("./misc"), s = t("../platform/js"), a = t("../platform/id-generater"), o = t("../event-manager"), c = t("../renderer/render-flow"), l = n.Destroying, u = n.DontDestroy, h = n.Deactivating, f = new a("Node");
function _(t) {
if (!t) {
cc.errorID(3804);
return null;
}
return "string" == typeof t ? s.getClassByName(t) : t;
}
function d(t, e) {
if (e._sealed) for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n.constructor === e) return n;
} else for (var r = 0; r < t._components.length; ++r) {
var s = t._components[r];
if (s instanceof e) return s;
}
return null;
}
function p(t, e, i) {
if (e._sealed) for (var n = 0; n < t._components.length; ++n) {
var r = t._components[n];
r.constructor === e && i.push(r);
} else for (var s = 0; s < t._components.length; ++s) {
var a = t._components[s];
a instanceof e && i.push(a);
}
}
function v(t, e) {
for (var i = 0; i < t.length; ++i) {
var n = t[i], r = d(n, e);
if (r) return r;
if (n._children.length > 0 && (r = v(n._children, e))) return r;
}
return null;
}
function g(t, e, i) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
p(r, e, i);
r._children.length > 0 && g(r._children, e, i);
}
}
var m = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
properties: {
_parent: null,
_children: [],
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & u) > 0;
},
set: function(t) {
t ? this._objFlags |= u : this._objFlags &= ~u;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
0;
this._name = t;
this._proxy.setName(this._name);
}
},
uuid: {
get: function() {
return this._id;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
if (e) {
e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(t) {
this._name = void 0 !== t ? t : "New Node";
this._activeInHierarchy = !1;
this._id = f.getNewId();
cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
this.__eventTargets = [];
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
0;
var e = this._parent;
0;
this._parent = t || null;
this._onSetParent(t);
if (t) {
0;
o._setDirtyForNode(this);
t._children.push(this);
t.emit && t.emit("child-added", this);
t._renderFlag |= c.FLAG_CHILDREN;
}
if (e) {
if (!(e._objFlags & l)) {
var i = e._children.indexOf(this);
0;
e._children.splice(i, 1);
e.emit && e.emit("child-removed", this);
this._onHierarchyChanged(e);
0 === e._children.length && (e._renderFlag &= ~c.FLAG_CHILDREN);
}
} else t && this._onHierarchyChanged(null);
}
},
attr: function(t) {
s.mixin(this, t);
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) if (this._parent._objFlags & h) cc.errorID(3821); else {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
walk: function(t, e) {
var i, n, r, s, a = cc._BaseNode, o = 1, c = a._stacks[a._stackId];
if (!c) {
c = [];
a._stacks.push(c);
}
a._stackId++;
c.length = 0;
c[0] = this;
var l = null;
s = !1;
for (;o; ) if (n = c[--o]) {
!s && t ? t(n) : s && e && e(n);
c[o] = null;
if (s) {
s = !1;
if (i) if (i[++r]) {
c[o] = i[r];
o++;
} else if (l) {
c[o] = l;
o++;
s = !0;
if (l._parent) {
r = (i = l._parent._children).indexOf(l);
l = l._parent;
} else {
l = null;
i = null;
}
if (r < 0) break;
}
} else if (n._children.length > 0) {
l = n;
i = n._children;
r = 0;
c[o] = i[r];
o++;
} else {
c[o] = n;
o++;
s = !0;
}
}
c.length = 0;
a._stackId--;
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = _(t);
return e ? d(this, e) : null;
},
getComponents: function(t) {
var e = _(t), i = [];
e && p(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = _(t);
return e ? v(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = _(t), i = [];
if (e) {
p(this, e, i);
g(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(t) {
0;
var e;
if ("string" == typeof t) {
if (!(e = s.getClassByName(t))) {
cc.errorID(3807, t);
cc._RFpeek() && cc.errorID(3808, t);
return null;
}
} else {
if (!t) {
cc.errorID(3804);
return null;
}
e = t;
}
if ("function" != typeof e) {
cc.errorID(3809);
return null;
}
if (!s.isChildClassOf(e, cc.Component)) {
cc.errorID(3810);
return null;
}
0;
var i = e._requireComponent;
if (i && !this.getComponent(i)) {
if (!this.addComponent(i)) return null;
}
var n = new e();
n.node = this;
this._components.push(n);
0;
this._activeInHierarchy && cc.director._nodeActivator.activateComp(n);
return n;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & l)) {
var e = this._components.indexOf(t);
if (-1 !== e) {
this._components.splice(e, 1);
0;
} else t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && (this.active = !1);
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function(t) {},
_onPostActivated: function() {},
_onBatchRestored: function() {},
_onBatchCreated: function() {},
_onHierarchyChanged: function(t) {
var e = this._parent;
if (this._persistNode && !(e instanceof cc.Scene)) {
cc.game.removePersistRootNode(this);
0;
}
var i = this._active && !(!e || !e._activeInHierarchy);
this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i);
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
var e = this._prefab;
e && this === e.root && e.sync;
t._parent = null;
t._onBatchRestored();
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= l;
var i = this._parent, n = i && i._objFlags & l;
0;
var r = this._children;
for (t = 0, e = r.length; t < e; ++t) r[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) {
this._components[t]._destroyImmediate();
}
var s = this.__eventTargets;
for (t = 0, e = s.length; t < e; ++t) {
var a = s[t];
a && a.targetOff(this);
}
s.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var o = i._children.indexOf(this);
i._children.splice(o, 1);
i.emit && i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
m.idGenerater = f;
m._stacks = [ [] ];
m._stackId = 0;
m.prototype._onPreDestroyBase = m.prototype._onPreDestroy;
0;
m.prototype._onHierarchyChangedBase = m.prototype._onHierarchyChanged;
0;
r.propertyDefine(m, [ "parent", "name", "children", "childrenCount" ], {});
0;
cc._BaseNode = e.exports = m;
}), {
"../event-manager": 62,
"../platform/CCObject": 98,
"../platform/id-generater": 108,
"../platform/js": 112,
"../renderer/render-flow": 124,
"./misc": 153
} ],
148: [ (function(t, e, i) {
"use strict";
var n = t("../components/CCRenderComponent"), r = t("../platform/CCMacro").BlendFactor, s = t("../../renderer/gfx"), a = cc.Class({
properties: {
_srcBlendFactor: r.SRC_ALPHA,
_dstBlendFactor: r.ONE_MINUS_SRC_ALPHA,
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
if (this._srcBlendFactor !== t) {
this._srcBlendFactor = t;
this._updateBlendFunc();
}
},
animatable: !1,
type: r,
tooltip: !1,
visible: !0
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
if (this._dstBlendFactor !== t) {
this._dstBlendFactor = t;
this._updateBlendFunc();
}
},
animatable: !1,
type: r,
tooltip: !1,
visible: !0
}
},
setMaterial: function(t, e) {
var i = n.prototype.setMaterial.call(this, t, e);
this._srcBlendFactor === r.SRC_ALPHA && this._dstBlendFactor === r.ONE_MINUS_SRC_ALPHA || this._updateMaterialBlendFunc(i);
return i;
},
_updateMaterial: function() {
this._updateBlendFunc();
},
_updateBlendFunc: function() {
if (this._srcBlendFactor !== r.SRC_ALPHA || this._dstBlendFactor !== r.ONE_MINUS_SRC_ALPHA) for (var t = this.getMaterials(), e = 0; e < t.length; e++) {
var i = t[e];
this._updateMaterialBlendFunc(i);
}
},
_updateMaterialBlendFunc: function(t) {
t.setBlend(!0, s.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor, s.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor);
}
});
e.exports = cc.BlendFunc = a;
}), {
"../../renderer/gfx": 188,
"../components/CCRenderComponent": 48,
"../platform/CCMacro": 97
} ],
149: [ (function(t, e, i) {
"use strict";
var n = t("./misc").BASE64_VALUES, r = "0123456789abcdef".split(""), s = [ "", "", "", "" ], a = s.concat(s, "-", s, "-", s, "-", s, "-", s, s, s), o = a.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
a[0] = t[0];
a[1] = t[1];
for (var e = 2, i = 2; e < 22; e += 2) {
var s = n[t.charCodeAt(e)], c = n[t.charCodeAt(e + 1)];
a[o[i++]] = r[s >> 2];
a[o[i++]] = r[(3 & s) << 2 | c >> 4];
a[o[i++]] = r[15 & c];
}
return a.join("");
};
0;
}), {
"./misc": 153
} ],
150: [ (function(t, e, i) {
"use strict";
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(3814);
return null;
}
if (e) 0; else {
var i = cc.director.getScene();
if (!i) {
0;
return null;
}
0;
e = i;
}
for (var n = e, r = "/" !== t[0] ? 0 : 1, s = t.split("/"), a = r; a < s.length; a++) {
var o = s[a], c = n._children;
n = null;
for (var l = 0, u = c.length; l < u; ++l) {
var h = c[l];
if (h.name === o) {
n = h;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
151: [ (function(t, e, i) {
"use strict";
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../assets/material/material-variant"));
var r = t("../assets/material/CCMaterial"), s = cc.Class({
properties: {
_normalMaterial: null,
normalMaterial: {
get: function() {
return this._normalMaterial;
},
set: function(t) {
this._normalMaterial = t;
this._updateDisabledState && this._updateDisabledState();
},
type: r,
tooltip: !1,
animatable: !1
},
_grayMaterial: null,
grayMaterial: {
get: function() {
return this._grayMaterial;
},
set: function(t) {
this._grayMaterial = t;
this._updateDisabledState && this._updateDisabledState();
},
type: r,
tooltip: !1,
animatable: !1
}
},
_switchGrayMaterial: function(t, e) {
var i;
if (t) {
(i = this._grayMaterial) || (i = r.getBuiltinMaterial("2d-gray-sprite"));
i = this._grayMaterial = n.default.create(i, e);
} else {
(i = this._normalMaterial) || (i = r.getBuiltinMaterial("2d-sprite", e));
i = this._normalMaterial = n.default.create(i, e);
}
e.setMaterial(0, i);
}
});
e.exports = s;
}), {
"../assets/material/CCMaterial": 28,
"../assets/material/material-variant": 35
} ],
152: [ (function(t, e, i) {
"use strict";
t("./CCPath");
t("./profiler/CCProfiler");
t("./find");
t("./mutable-forward-iterator");
}), {
"./CCPath": 145,
"./find": 150,
"./mutable-forward-iterator": 154,
"./profiler/CCProfiler": 157
} ],
153: [ (function(t, e, i) {
"use strict";
var n = t("../platform/js"), r = {
propertyDefine: function(t, e, i) {
function r(t, e, i, r) {
var s = Object.getOwnPropertyDescriptor(t, e);
if (s) {
s.get && (t[i] = s.get);
s.set && r && (t[r] = s.set);
} else {
var a = t[i];
n.getset(t, e, a, t[r]);
}
}
for (var s, a = t.prototype, o = 0; o < e.length; o++) {
var c = (s = e[o])[0].toUpperCase() + s.slice(1);
r(a, s, "get" + c, "set" + c);
}
for (s in i) {
var l = i[s];
r(a, s, l[0], l[1]);
}
},
NextPOT: function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return (t |= t >> 16) + 1;
}
};
0;
r.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
for (var s = new Array(123), a = 0; a < 123; ++a) s[a] = 64;
for (var o = 0; o < 64; ++o) s["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(o)] = o;
r.BASE64_VALUES = s;
r.pushToMap = function(t, e, i, n) {
var r = t[e];
if (r) if (Array.isArray(r)) if (n) {
r.push(r[0]);
r[0] = i;
} else r.push(i); else t[e] = n ? [ i, r ] : [ r, i ]; else t[e] = i;
};
r.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
r.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
r.lerp = function(t, e, i) {
return t + (e - t) * i;
};
r.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
r.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.misc = e.exports = r;
}), {
"../platform/js": 112
} ],
154: [ (function(t, e, i) {
"use strict";
function n(t) {
this.i = 0;
this.array = t;
}
var r = n.prototype;
r.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
r.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
r.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
r.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
r.push = function(t) {
this.array.push(t);
};
e.exports = n;
}), {} ],
155: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function() {
function t() {
this.enabled = !1;
this.count = 0;
this.maxSize = 1024;
}
var e = t.prototype;
e.get = function() {};
e.put = function() {};
e.clear = function() {};
return t;
})();
i.default = n;
cc.pool = {};
n.register = function(t, e) {
cc.pool[t] = e;
};
e.exports = i.default;
}), {} ],
156: [ (function(t, e, i) {
"use strict";
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1,
_synced: {
default: !1,
serializable: !1
}
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
e._synced = !0;
if (e.asset) {
var i = t._objFlags, n = t._parent, r = t._id, s = t._name, a = t._active, o = t._eulerAngles.x, c = t._eulerAngles.y, l = t._eulerAngles.z, u = t._localZOrder, h = t._globalZOrder, f = t._trs, _ = f[0], d = f[1], p = f[2];
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = r;
t._prefab = e;
t._name = s;
t._active = a;
t._localZOrder = u;
t._globalZOrder = h;
(f = t._trs)[0] = _;
f[1] = d;
f[2] = p;
t._eulerAngles.x = o;
t._eulerAngles.y = c;
t._eulerAngles.z = l;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
157: [ (function(t, e, i) {
"use strict";
var n = t("../../platform/CCMacro"), r = t("./perf-counter"), s = !1, a = 15, o = null, c = null, l = null;
function u() {
if (!o) {
o = {
frame: {
desc: "Frame time (ms)",
min: 0,
max: 50,
average: 500
},
fps: {
desc: "Framerate (FPS)",
below: 30,
average: 500
},
draws: {
desc: "Draw call"
},
logic: {
desc: "Game Logic (ms)",
min: 0,
max: 50,
average: 500,
color: "#080"
},
render: {
desc: "Renderer (ms)",
min: 0,
max: 50,
average: 500,
color: "#f90"
},
mode: {
desc: cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WebGL" : "Canvas",
min: 1
}
};
var t = performance.now();
for (var e in o) o[e]._counter = new r(e, o[e], t);
}
}
function h() {
if (!c || !c.isValid) {
(c = new cc.Node("PROFILER-NODE")).x = c.y = 10;
c.groupIndex = cc.Node.BuiltinGroupIndex.DEBUG;
cc.Camera._setupDebugCamera();
c.zIndex = n.MAX_ZINDEX;
cc.game.addPersistRootNode(c);
var t = new cc.Node("LEFT-PANEL");
t.anchorX = t.anchorY = 0;
var e = t.addComponent(cc.Label);
e.fontSize = a;
e.lineHeight = a;
t.parent = c;
var i = new cc.Node("RIGHT-PANEL");
i.anchorX = 1;
i.anchorY = 0;
i.x = 200;
var r = i.addComponent(cc.Label);
r.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
r.fontSize = a;
r.lineHeight = a;
i.parent = c;
if (cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU_GAME_SUB && cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
e.cacheMode = cc.Label.CacheMode.CHAR;
r.cacheMode = cc.Label.CacheMode.CHAR;
}
l = {
left: e,
right: r
};
}
}
function f() {
h();
var t = cc.director._lastUpdate;
o.frame._counter.start(t);
o.logic._counter.start(t);
}
function _() {
var t = performance.now();
cc.director.isPaused() ? o.frame._counter.start(t) : o.logic._counter.end(t);
o.render._counter.start(t);
}
function d() {
var t = performance.now();
o.render._counter.end(t);
o.draws._counter.value = cc.renderer.drawCalls;
o.frame._counter.end(t);
o.fps._counter.frame(t);
var e = "", i = "";
for (var n in o) {
var r = o[n];
r._counter.sample(t);
e += r.desc + "\n";
i += r._counter.human() + "\n";
}
if (l) {
l.left.string = e;
l.right.string = i;
}
}
cc.profiler = e.exports = {
isShowingStats: function() {
return s;
},
hideStats: function() {
if (s) {
c && (c.active = !1);
cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, f);
cc.director.off(cc.Director.EVENT_AFTER_UPDATE, _);
cc.director.off(cc.Director.EVENT_AFTER_DRAW, d);
s = !1;
}
},
showStats: function() {
if (!s) {
u();
c && (c.active = !0);
cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, f);
cc.director.on(cc.Director.EVENT_AFTER_UPDATE, _);
cc.director.on(cc.Director.EVENT_AFTER_DRAW, d);
s = !0;
}
}
};
}), {
"../../platform/CCMacro": 97,
"./perf-counter": 159
} ],
158: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.Counter",
ctor: function(t, e, i) {
this._id = t;
this._opts = e || {};
this._value = 0;
this._total = 0;
this._averageValue = 0;
this._accumValue = 0;
this._accumSamples = 0;
this._accumStart = i;
},
properties: {
value: {
get: function() {
return this._value;
},
set: function(t) {
this._value = t;
}
}
},
_average: function(t, e) {
if (this._opts.average) {
this._accumValue += t;
++this._accumSamples;
var i = e;
if (i - this._accumStart >= this._opts.average) {
this._averageValue = this._accumValue / this._accumSamples;
this._accumValue = 0;
this._accumStart = i;
this._accumSamples = 0;
}
}
},
sample: function(t) {
this._average(this._value, t);
},
human: function() {
var t = this._opts.average ? this._averageValue : this._value;
return Math.round(100 * t) / 100;
},
alarm: function() {
return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
}
});
e.exports = n;
}), {} ],
159: [ (function(t, e, i) {
"use strict";
var n = t("./counter"), r = cc.Class({
name: "cc.PerfCounter",
extends: n,
ctor: function(t, e, i) {
this._time = i;
},
start: function(t) {
this._time = t;
},
end: function(t) {
this._value = t - this._time;
this._average(this._value);
},
tick: function() {
this.end();
this.start();
},
frame: function(t) {
var e = t, i = e - this._time;
this._total++;
if (i > (this._opts.average || 1e3)) {
this._value = 1e3 * this._total / i;
this._total = 0;
this._time = e;
this._average(this._value);
}
}
});
e.exports = r;
}), {
"./counter": 158
} ],
160: [ (function(t, e, i) {
"use strict";
var n = 0;
0;
var r = new (function(t) {
return t && t.__esModule ? t : {
default: t
};
}(t("../platform/js")).default.Pool)(2);
r.get = function() {
return this._get() || {
key: null,
value: null,
prev: null,
next: null
};
};
function s(t) {
this.count = 0;
this.limit = t;
this.datas = {};
this.head = null;
this.tail = null;
}
s.prototype.moveToHead = function(t) {
t.next = this.head;
t.prev = null;
null !== this.head && (this.head.prev = t);
this.head = t;
null === this.tail && (this.tail = t);
this.count++;
this.datas[t.key] = t;
};
s.prototype.put = function(t, e) {
var i = r.get();
i.key = t;
i.value = e;
if (this.count >= this.limit) {
var n = this.tail;
delete this.datas[n.key];
this.count--;
this.tail = n.prev;
this.tail.next = null;
n.prev = null;
n.next = null;
r.put(n);
}
this.moveToHead(i);
};
s.prototype.remove = function(t) {
null !== t.prev ? t.prev.next = t.next : this.head = t.next;
null !== t.next ? t.next.prev = t.prev : this.tail = t.prev;
delete this.datas[t.key];
this.count--;
};
s.prototype.get = function(t) {
var e = this.datas[t];
if (e) {
this.remove(e);
this.moveToHead(e);
return e.value;
}
return null;
};
s.prototype.clear = function() {
this.count = 0;
this.datas = {};
this.head = null;
this.tail = null;
};
s.prototype.has = function(t) {
return !!this.datas[t];
};
s.prototype.delete = function(t) {
var e = this.datas[t];
this.remove(e);
};
var a = new s(100), o = {
BASELINE_RATIO: .26,
MIDDLE_RATIO: .37,
BASELINE_OFFSET: n,
label_wordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
label_symbolRex: /^[!,.:;'}\]%\?>、‘“》？。，！]/,
label_lastWordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/,
label_lastEnglish: /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/,
label_firstEnglish: /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/,
highSurrogateRex: /[\uD800-\uDBFF]/,
lowSurrogateRex: /[\uDC00-\uDFFF]/,
label_wrapinspection: !0,
__CHINESE_REG: /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/,
__JAPANESE_REG: /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g,
__KOREAN_REG: /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/,
isUnicodeCJK: function(t) {
return this.__CHINESE_REG.test(t) || this.__JAPANESE_REG.test(t) || this.__KOREAN_REG.test(t);
},
isUnicodeSpace: function(t) {
return (t = t.charCodeAt(0)) >= 9 && t <= 13 || 32 === t || 133 === t || 160 === t || 5760 === t || t >= 8192 && t <= 8202 || 8232 === t || 8233 === t || 8239 === t || 8287 === t || 12288 === t;
},
safeMeasureText: function(t, e, i) {
var n = (i || t.font) + "🎮" + e, r = a.get(n);
if (null !== r) return r;
var s = t.measureText(e), o = s && s.width || 0;
a.put(n, o);
return o;
},
_safeSubstring: function(t, e, i) {
var n = e, r = i, s = t[e];
this.lowSurrogateRex.test(s) && n--;
if (void 0 !== i) if (i - 1 !== e) {
var a = t[i - 1];
this.highSurrogateRex.test(a) && r--;
} else this.highSurrogateRex.test(s) && r++;
return t.substring(n, r);
},
fragmentText: function(t, e, i, n) {
var r = [];
if (0 === t.length || i < 0) {
r.push("");
return r;
}
for (var s = t; e > i && s.length > 1; ) {
for (var a = s.length * (i / e) | 0, o = this._safeSubstring(s, a), c = e - n(o), l = o, u = 0, h = 0; c > i && h++ < 10; ) {
a *= i / c;
a |= 0;
c = e - n(o = this._safeSubstring(s, a));
}
h = 0;
for (;c <= i && h++ < 10; ) {
if (o) {
var f = this.label_wordRex.exec(o);
u = f ? f[0].length : 1;
l = o;
}
a += u;
c = e - n(o = this._safeSubstring(s, a));
}
if (0 === (a -= u)) {
a = 1;
l = this._safeSubstring(s, 1);
} else if (1 === a && this.highSurrogateRex.test(s[0])) {
a = 2;
l = this._safeSubstring(s, 2);
}
var _, d = this._safeSubstring(s, 0, a);
if (this.label_wrapinspection && this.label_symbolRex.test(l || o)) {
0 === (a -= (_ = this.label_lastWordRex.exec(d)) ? _[0].length : 0) && (a = 1);
l = this._safeSubstring(s, a);
d = this._safeSubstring(s, 0, a);
}
if (this.label_firstEnglish.test(l) && (_ = this.label_lastEnglish.exec(d)) && d !== _[0]) {
a -= _[0].length;
l = this._safeSubstring(s, a);
d = this._safeSubstring(s, 0, a);
}
0 === r.length ? r.push(d) : (d = d.trimLeft()).length > 0 && r.push(d);
e = n(s = l || o);
}
0 === r.length ? r.push(s) : (s = s.trimLeft()).length > 0 && r.push(s);
return r;
}
};
cc.textUtils = e.exports = o;
}), {
"../platform/js": 112
} ],
161: [ (function(t, e, i) {
"use strict";
var n = t("../assets/CCTexture2D"), r = {
loadImage: function(t, e, i) {
cc.assertID(t, 3103);
var r = cc.loader.getRes(t);
if (r) {
if (r.loaded) {
e && e.call(i, null, r);
return r;
}
r.once("load", (function() {
e && e.call(i, null, r);
}), i);
return r;
}
(r = new n()).url = t;
cc.loader.load({
url: t,
texture: r
}, (function(t, n) {
if (t) return e && e.call(i, t || new Error("Unknown error"));
n.handleLoadedTexture();
e && e.call(i, null, n);
}));
return r;
},
cacheImage: function(t, e) {
if (t && e) {
var i = new n();
i.initWithElement(e);
var r = {
id: t,
url: t,
error: null,
content: i,
complete: !1
};
cc.loader.flowOut(r);
return i;
}
},
postLoadTexture: function(t, e) {
t.loaded ? e && e() : t.url ? cc.loader.load({
url: t.url,
skips: t._isCompressed() ? void 0 : [ "Loader" ]
}, (function(i, n) {
if (n) {
0;
t.loaded || (t._nativeAsset = n);
}
e && e(i);
})) : e && e();
}
};
cc.textureUtil = e.exports = r;
}), {
"../assets/CCTexture2D": 25
} ],
162: [ (function(t, e, i) {
"use strict";
var n = t("./node-unit"), r = t("./node-mem-pool");
e.exports = {
NodeMemPool: new r(n)
};
}), {
"./node-mem-pool": 164,
"./node-unit": 165
} ],
163: [ (function(t, e, i) {
"use strict";
var n = function(t) {
this._unitClass = t;
this._pool = [];
this._findOrder = [];
this._initNative();
}, r = n.prototype;
r._initNative = function() {
this._nativeMemPool = new renderer.MemPool();
};
r._buildUnit = function(t) {
var e = new this._unitClass(t, this);
this._nativeMemPool.updateCommonData(t, e._data, e._signData);
return e;
};
r._destroyUnit = function(t) {
this._pool[t] = null;
for (var e = 0, i = this._findOrder.length; e < i; e++) {
var n = this._findOrder[e];
if (n && n.unitID == t) {
this._findOrder.splice(e, 1);
break;
}
}
this._nativeMemPool.removeCommonData(t);
};
r._findUnitID = function() {
for (var t = 0, e = this._pool; e[t]; ) t++;
return t;
};
r.pop = function() {
for (var t = null, e = 0, i = this._findOrder, n = this._pool, r = i.length; e < r; e++) {
var s = i[e];
if (s && s.hasSpace()) {
t = s;
break;
}
}
if (!t) {
var a = this._findUnitID();
t = this._buildUnit(a);
n[a] = t;
i.push(t);
e = i.length - 1;
}
var o = i[0];
if (o !== t) {
i[0] = t;
i[e] = o;
}
return t.pop();
};
r.push = function(t) {
var e = this._pool[t.unitID];
e.push(t.index);
this._findOrder.length > 1 && e.isAllFree() && this._destroyUnit(t.unitID);
return e;
};
e.exports = n;
}), {} ],
164: [ (function(t, e, i) {
"use strict";
var n = t("./mem-pool"), r = function(t) {
n.call(this, t);
};
(function() {
var t = function() {};
t.prototype = n.prototype;
r.prototype = new t();
})();
var s = r.prototype;
s._initNative = function() {
this._nativeMemPool = new renderer.NodeMemPool();
};
s._destroyUnit = function(t) {
n.prototype._destroyUnit.call(this, t);
this._nativeMemPool.removeNodeData(t);
};
e.exports = r;
}), {
"./mem-pool": 163
} ],
165: [ (function(t, e, i) {
"use strict";
var n = t("../../value-types/utils"), r = Uint32Array, s = 10 * n.FLOAT_BYTES, a = 16 * n.FLOAT_BYTES, o = 16 * n.FLOAT_BYTES, c = Uint32Array, l = Uint32Array, u = Int32Array, h = Uint8Array, f = Uint8Array, _ = Uint32Array, d = 2 * n.FLOAT_BYTES, p = t("./unit-base"), v = function(t, e) {
p.call(this, t, e);
var i = this._contentNum;
this.trsList = new n.FLOAT_ARRAY_TYPE(10 * i);
this.localMatList = new n.FLOAT_ARRAY_TYPE(16 * i);
this.worldMatList = new n.FLOAT_ARRAY_TYPE(16 * i);
this.dirtyList = new r(1 * i);
this.parentList = new c(2 * i);
this.zOrderList = new l(1 * i);
this.cullingMaskList = new u(1 * i);
this.opacityList = new h(1 * i);
this.is3DList = new f(1 * i);
this.nodeList = new _(2 * i);
this.skewList = new n.FLOAT_ARRAY_TYPE(2 * i);
this._memPool._nativeMemPool.updateNodeData(t, this.dirtyList, this.trsList, this.localMatList, this.worldMatList, this.parentList, this.zOrderList, this.cullingMaskList, this.opacityList, this.is3DList, this.nodeList, this.skewList);
for (var v = 0; v < i; v++) {
var g = this._spacesData[v];
g.trs = new n.FLOAT_ARRAY_TYPE(this.trsList.buffer, v * s, 10);
g.localMat = new n.FLOAT_ARRAY_TYPE(this.localMatList.buffer, v * a, 16);
g.worldMat = new n.FLOAT_ARRAY_TYPE(this.worldMatList.buffer, v * o, 16);
g.dirty = new r(this.dirtyList.buffer, 4 * v, 1);
g.parent = new c(this.parentList.buffer, 8 * v, 2);
g.zOrder = new l(this.zOrderList.buffer, 4 * v, 1);
g.cullingMask = new u(this.cullingMaskList.buffer, 4 * v, 1);
g.opacity = new h(this.opacityList.buffer, 1 * v, 1);
g.is3D = new f(this.is3DList.buffer, 1 * v, 1);
g.skew = new n.FLOAT_ARRAY_TYPE(this.skewList.buffer, v * d, 2);
}
};
(function() {
var t = function() {};
t.prototype = p.prototype;
v.prototype = new t();
})();
e.exports = v;
}), {
"../../value-types/utils": 175,
"./unit-base": 166
} ],
166: [ (function(t, e, i) {
"use strict";
var n = function(t, e, i) {
i = i || 128;
this.unitID = t;
this._memPool = e;
this._data = new Uint16Array(2);
this._data[0] = 0;
this._data[1] = 0;
this._contentNum = i;
this._signData = new Uint16Array(2 * this._contentNum);
this._spacesData = [];
for (var n = 0; n < i; n++) {
var r = 2 * n;
this._signData[r + 0] = n + 1;
this._signData[r + 1] = 0;
this._spacesData[n] = {
index: n,
unitID: t
};
}
this._signData[2 * (i - 1)] = 65535;
}, r = n.prototype;
r.hasSpace = function() {
return 65535 !== this._data[0];
};
r.isAllFree = function() {
return 0 == this._data[1];
};
r.pop = function() {
var t = this._data[0];
if (65535 === t) return null;
var e = t, i = 2 * e, n = this._spacesData[e];
this._signData[i + 1] = 1;
this._data[0] = this._signData[i + 0];
this._data[1]++;
return n;
};
r.push = function(t) {
var e = 2 * t;
this._signData[e + 1] = 0;
this._signData[e + 0] = this._data[0];
this._data[0] = t;
this._data[1]--;
};
r.dump = function() {
for (var t = 0, e = this._data[0], i = ""; 65535 != e; ) {
t++;
i += e + "->";
e = this._signData[2 * e + 0];
}
for (var n = 0, r = "", s = this._contentNum, a = 0; a < s; a++) {
if (1 == this._signData[2 * a + 1]) {
n++;
r += a + "->";
}
}
var o = t + n;
console.log("unitID:", this.unitID, "spaceNum:", t, "calc using num:", n, "store using num:", this._data[1], "calc total num:", o, "actually total num:", this._contentNum);
console.log("free info:", i);
console.log("using info:", r);
n != this._data[1] && cc.error("using num error", "calc using num:", n, "store using num:", this._data[1]);
t + n != this._contentNum && cc.error("total num error", "calc total num:", o, "actually total num:", this._contentNum);
};
e.exports = n;
}), {} ],
167: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("./value-type")), r = a(t("../platform/CCClass")), s = a(t("../utils/misc"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var u = (function(t) {
l(e, t);
e.copy = function(t, e) {
t.r = e.r;
t.g = e.g;
t.b = e.b;
t.a = e.a;
return t;
};
e.clone = function(t) {
return new e(t.r, t.g, t.b, t.a);
};
e.set = function(t, e, i, n, r) {
void 0 === e && (e = 255);
void 0 === i && (i = 255);
void 0 === n && (n = 255);
void 0 === r && (r = 255);
t.r = e;
t.g = i;
t.b = n;
t.a = r;
return t;
};
e.fromHex = function(t, e) {
var i = (e >> 24) / 255, n = (e >> 16 & 255) / 255, r = (e >> 8 & 255) / 255, s = (255 & e) / 255;
t.r = i;
t.g = n;
t.b = r;
t.a = s;
return t;
};
e.add = function(t, e, i) {
t.r = e.r + i.r;
t.g = e.g + i.g;
t.b = e.b + i.b;
t.a = e.a + i.a;
return t;
};
e.subtract = function(t, e, i) {
t.r = e.r - i.r;
t.g = e.g - i.g;
t.b = e.b - i.b;
t.a = e.a - i.a;
return t;
};
e.multiply = function(t, e, i) {
t.r = e.r * i.r;
t.g = e.g * i.g;
t.b = e.b * i.b;
t.a = e.a * i.a;
return t;
};
e.divide = function(t, e, i) {
t.r = e.r / i.r;
t.g = e.g / i.g;
t.b = e.b / i.b;
t.a = e.a / i.a;
return t;
};
e.scale = function(t, e, i) {
t.r = e.r * i;
t.g = e.g * i;
t.b = e.b * i;
t.a = e.a * i;
return t;
};
e.lerp = function(t, e, i, n) {
var r = e.r, s = e.g, a = e.b, o = e.a;
t.r = r + n * (i.r - r);
t.g = s + n * (i.g - s);
t.b = a + n * (i.b - a);
t.a = o + n * (i.a - o);
return t;
};
e.toArray = function(t, i, n) {
void 0 === n && (n = 0);
var r = i instanceof e || i.a > 1 ? 1 / 255 : 1;
t[n + 0] = i.r * r;
t[n + 1] = i.g * r;
t[n + 2] = i.b * r;
t[n + 3] = i.a * r;
return t;
};
e.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
e.r = 255 * t[i + 0];
e.g = 255 * t[i + 1];
e.b = 255 * t[i + 2];
e.a = 255 * t[i + 3];
return e;
};
c(e, null, [ {
key: "WHITE",
get: function() {
return new e(255, 255, 255, 255);
}
}, {
key: "BLACK",
get: function() {
return new e(0, 0, 0, 255);
}
}, {
key: "TRANSPARENT",
get: function() {
return new e(0, 0, 0, 0);
}
}, {
key: "GRAY",
get: function() {
return new e(127.5, 127.5, 127.5);
}
}, {
key: "RED",
get: function() {
return new e(255, 0, 0);
}
}, {
key: "GREEN",
get: function() {
return new e(0, 255, 0);
}
}, {
key: "BLUE",
get: function() {
return new e(0, 0, 255);
}
}, {
key: "YELLOW",
get: function() {
return new e(255, 235, 4);
}
}, {
key: "ORANGE",
get: function() {
return new e(255, 127, 0);
}
}, {
key: "CYAN",
get: function() {
return new e(0, 255, 255);
}
}, {
key: "MAGENTA",
get: function() {
return new e(255, 0, 255);
}
} ]);
function e(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 255);
(s = t.call(this) || this)._val = 0;
if ("object" == typeof e) {
i = e.g;
n = e.b;
r = e.a;
e = e.r;
}
s._val = (r << 24 >>> 0) + (n << 16) + (i << 8) + e;
return s;
}
var i = e.prototype;
i.clone = function() {
var t = new e();
t._val = this._val;
return t;
};
i.equals = function(t) {
return t && this._val === t._val;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.r, s = this.g, a = this.b, o = this.a;
n.r = r + (t.r - r) * i;
n.g = s + (t.g - s) * i;
n.b = a + (t.b - a) * i;
n.a = o + (t.a - o) * i;
return n;
};
i.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
i.getR = function() {
return 255 & this._val;
};
i.setR = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4294967040 & this._val | t) >>> 0;
return this;
};
i.getG = function() {
return (65280 & this._val) >> 8;
};
i.setG = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4294902015 & this._val | t << 8) >>> 0;
return this;
};
i.getB = function() {
return (16711680 & this._val) >> 16;
};
i.setB = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4278255615 & this._val | t << 16) >>> 0;
return this;
};
i.getA = function() {
return (4278190080 & this._val) >>> 24;
};
i.setA = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (16777215 & this._val | t << 24) >>> 0;
return this;
};
i.toCSS = function(t) {
return t && "rgba" !== t ? "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t) : "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")";
};
i.fromHEX = function(t) {
t = 0 === t.indexOf("#") ? t.substring(1) : t;
var e = parseInt(t.substr(0, 2), 16) || 0, i = parseInt(t.substr(2, 2), 16) || 0, n = parseInt(t.substr(4, 2), 16) || 0, r = parseInt(t.substr(6, 2), 16) || 255;
this._val = (r << 24 >>> 0) + (n << 16) + (i << 8) + e;
return this;
};
i.toHEX = function(t) {
var e = [ (this.r < 16 ? "0" : "") + (0 | this.r).toString(16), (this.g < 16 ? "0" : "") + (0 | this.g).toString(16), (this.b < 16 ? "0" : "") + (0 | this.b).toString(16) ], i = -1;
if ("#rgb" === t) for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]); else if ("#rrggbb" === t) for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]); else "#rrggbbaa" === t && e.push((this.a < 16 ? "0" : "") + (0 | this.a).toString(16));
return e.join("");
};
i.toRGBValue = function() {
return 16777215 & this._val;
};
i.fromHSV = function(t, e, i) {
var n, r, s;
if (0 === e) n = r = s = i; else if (0 === i) n = r = s = 0; else {
1 === t && (t = 0);
t *= 6;
e = e;
i = i;
var a = Math.floor(t), o = t - a, c = i * (1 - e), l = i * (1 - e * o), u = i * (1 - e * (1 - o));
switch (a) {
case 0:
n = i;
r = u;
s = c;
break;

case 1:
n = l;
r = i;
s = c;
break;

case 2:
n = c;
r = i;
s = u;
break;

case 3:
n = c;
r = l;
s = i;
break;

case 4:
n = u;
r = c;
s = i;
break;

case 5:
n = i;
r = c;
s = l;
}
}
n *= 255;
r *= 255;
s *= 255;
this._val = (this.a << 24 >>> 0) + (s << 16) + (r << 8) + n;
return this;
};
i.toHSV = function() {
var t = this.r / 255, e = this.g / 255, i = this.b / 255, n = {
h: 0,
s: 0,
v: 0
}, r = Math.max(t, e, i), s = Math.min(t, e, i), a = 0;
n.v = r;
n.s = r ? (r - s) / r : 0;
if (n.s) {
a = r - s;
n.h = t === r ? (e - i) / a : e === r ? 2 + (i - t) / a : 4 + (t - e) / a;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
i.set = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
return this;
};
i._fastSetA = function(t) {
this._val = (16777215 & this._val | t << 24) >>> 0;
};
i.multiply = function(t) {
var e = (255 & this._val) * t.r >> 8, i = (65280 & this._val) * t.g >> 8, n = (16711680 & this._val) * t.b >> 8, r = ((4278190080 & this._val) >>> 8) * t.a;
this._val = 4278190080 & r | 16711680 & n | 65280 & i | 255 & e;
return this;
};
c(e, [ {
key: "r",
get: function() {
return this.getR();
},
set: function(t) {
this.setR(t);
}
}, {
key: "g",
get: function() {
return this.getG();
},
set: function(t) {
this.setG(t);
}
}, {
key: "b",
get: function() {
return this.getB();
},
set: function(t) {
this.setB(t);
}
}, {
key: "a",
get: function() {
return this.getA();
},
set: function(t) {
this.setA(t);
}
} ]);
return e;
})(n.default);
i.default = u;
u.div = u.divide;
u.sub = u.subtract;
u.mul = u.multiply;
u.WHITE_R = u.WHITE;
u.BLACK_R = u.BLACK;
u.TRANSPARENT_R = u.TRANSPARENT;
u.GRAY_R = u.GRAY;
u.RED_R = u.RED;
u.GREEN_R = u.GREEN;
u.BLUE_R = u.BLUE;
u.YELLOW_R = u.YELLOW;
u.ORANGE_R = u.ORANGE;
u.CYAN_R = u.CYAN;
u.MAGENTA_R = u.MAGENTA;
r.default.fastDefine("cc.Color", u, {
r: 0,
g: 0,
b: 0,
a: 255
});
cc.Color = u;
cc.color = function(t, e, i, n) {
if ("string" == typeof t) {
return new u().fromHEX(t);
}
return "object" == typeof t ? new u(t.r, t.g, t.b, t.a) : new u(t, e, i, n);
};
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"../utils/misc": 153,
"./value-type": 176
} ],
168: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
var n = {
Vec2: !0,
Vec3: !0,
Vec4: !0,
Mat4: !0,
Mat3: !0,
Rect: !0,
Size: !0,
Color: !0,
Quat: !0,
Trs: !0
};
i.Trs = i.Quat = i.Color = i.Size = i.Rect = i.Mat3 = i.Mat4 = i.Vec4 = i.Vec3 = i.Vec2 = void 0;
var r = p(t("./vec2"));
i.Vec2 = r.default;
var s = p(t("./vec3"));
i.Vec3 = s.default;
var a = p(t("./vec4"));
i.Vec4 = a.default;
var o = p(t("./mat4"));
i.Mat4 = o.default;
var c = p(t("./mat3"));
i.Mat3 = c.default;
var l = p(t("./rect"));
i.Rect = l.default;
var u = p(t("./size"));
i.Size = u.default;
var h = p(t("./color"));
i.Color = h.default;
var f = p(t("./quat"));
i.Quat = f.default;
var _ = p(t("./trs"));
i.Trs = _.default;
var d = t("./utils");
Object.keys(d).forEach((function(t) {
"default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(n, t) || (i[t] = d[t]));
}));
function p(t) {
return t && t.__esModule ? t : {
default: t
};
}
cc.math = e.exports;
}), {
"./color": 167,
"./mat3": 169,
"./mat4": 170,
"./quat": 171,
"./rect": 172,
"./size": 173,
"./trs": 174,
"./utils": 175,
"./vec2": 177,
"./vec3": 178,
"./vec4": 179
} ],
169: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("../value-types/utils"), r = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("./vec3"));
var s = (function() {
t.create = function(e, i, n, r, s, a, o, c, l) {
void 0 === e && (e = 1);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 1);
void 0 === a && (a = 0);
void 0 === o && (o = 0);
void 0 === c && (c = 0);
void 0 === l && (l = 1);
return new t(e, i, n, r, s, a, o, c, l);
};
t.clone = function(e) {
var i = e.m;
return new t(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
};
t.copy = function(t, e) {
t.m.set(e.m);
return t;
};
t.set = function(t, e, i, n, r, s, a, o, c, l) {
var u = t.m;
u[0] = e;
u[1] = i;
u[2] = n;
u[3] = r;
u[4] = s;
u[5] = a;
u[6] = o;
u[7] = c;
u[8] = l;
return t;
};
t.identity = function(t) {
var e = t.m;
e[0] = 1;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 1;
e[5] = 0;
e[6] = 0;
e[7] = 0;
e[8] = 1;
return t;
};
t.transpose = function(t, e) {
var i = e.m, n = t.m;
if (t === e) {
var r = i[1], s = i[2], a = i[5];
n[1] = i[3];
n[2] = i[6];
n[3] = r;
n[5] = i[7];
n[6] = s;
n[7] = a;
} else {
n[0] = i[0];
n[1] = i[3];
n[2] = i[6];
n[3] = i[1];
n[4] = i[4];
n[5] = i[7];
n[6] = i[2];
n[7] = i[5];
n[8] = i[8];
}
return t;
};
t.invert = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], l = i[5], u = i[6], h = i[7], f = i[8], _ = f * c - l * h, d = -f * o + l * u, p = h * o - c * u, v = r * _ + s * d + a * p;
if (!v) return t;
v = 1 / v;
n[0] = _ * v;
n[1] = (-f * s + a * h) * v;
n[2] = (l * s - a * c) * v;
n[3] = d * v;
n[4] = (f * r - a * u) * v;
n[5] = (-l * r + a * o) * v;
n[6] = p * v;
n[7] = (-h * r + s * u) * v;
n[8] = (c * r - s * o) * v;
return t;
};
t.adjoint = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], l = i[5], u = i[6], h = i[7], f = i[8];
n[0] = c * f - l * h;
n[1] = a * h - s * f;
n[2] = s * l - a * c;
n[3] = l * u - o * f;
n[4] = r * f - a * u;
n[5] = a * o - r * l;
n[6] = o * h - c * u;
n[7] = s * u - r * h;
n[8] = r * c - s * o;
return t;
};
t.determinant = function(t) {
var e = t.m, i = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], u = e[8];
return i * (u * a - o * l) + n * (-u * s + o * c) + r * (l * s - a * c);
};
t.multiply = function(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[2], l = n[3], u = n[4], h = n[5], f = n[6], _ = n[7], d = n[8], p = r[0], v = r[1], g = r[2], m = r[3], y = r[4], E = r[5], C = r[6], A = r[7], T = r[8];
s[0] = p * a + v * l + g * f;
s[1] = p * o + v * u + g * _;
s[2] = p * c + v * h + g * d;
s[3] = m * a + y * l + E * f;
s[4] = m * o + y * u + E * _;
s[5] = m * c + y * h + E * d;
s[6] = C * a + A * l + T * f;
s[7] = C * o + A * u + T * _;
s[8] = C * c + A * h + T * d;
return t;
};
t.multiplyMat4 = function(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[2], l = n[3], u = n[4], h = n[5], f = n[6], _ = n[7], d = n[8], p = r[0], v = r[1], g = r[2], m = r[4], y = r[5], E = r[6], C = r[8], A = r[9], T = r[10];
s[0] = p * a + v * l + g * f;
s[1] = p * o + v * u + g * _;
s[2] = p * c + v * h + g * d;
s[3] = m * a + y * l + E * f;
s[4] = m * o + y * u + E * _;
s[5] = m * c + y * h + E * d;
s[6] = C * a + A * l + T * f;
s[7] = C * o + A * u + T * _;
s[8] = C * c + A * h + T * d;
return t;
};
t.translate = function(t, e, i) {
var n = e.m, r = t.m, s = n[0], a = n[1], o = n[2], c = n[3], l = n[4], u = n[5], h = n[6], f = n[7], _ = n[8], d = i.x, p = i.y;
r[0] = s;
r[1] = a;
r[2] = o;
r[3] = c;
r[4] = l;
r[5] = u;
r[6] = d * s + p * c + h;
r[7] = d * a + p * l + f;
r[8] = d * o + p * u + _;
return t;
};
t.rotate = function(t, e, i) {
var n = e.m, r = t.m, s = n[0], a = n[1], o = n[2], c = n[3], l = n[4], u = n[5], h = n[6], f = n[7], _ = n[8], d = Math.sin(i), p = Math.cos(i);
r[0] = p * s + d * c;
r[1] = p * a + d * l;
r[2] = p * o + d * u;
r[3] = p * c - d * s;
r[4] = p * l - d * a;
r[5] = p * u - d * o;
r[6] = h;
r[7] = f;
r[8] = _;
return t;
};
t.scale = function(t, e, i) {
var n = i.x, r = i.y, s = e.m, a = t.m;
a[0] = n * s[0];
a[1] = n * s[1];
a[2] = n * s[2];
a[3] = r * s[3];
a[4] = r * s[4];
a[5] = r * s[5];
a[6] = s[6];
a[7] = s[7];
a[8] = s[8];
return t;
};
t.fromMat4 = function(t, e) {
var i = e.m, n = t.m;
n[0] = i[0];
n[1] = i[1];
n[2] = i[2];
n[3] = i[4];
n[4] = i[5];
n[5] = i[6];
n[6] = i[8];
n[7] = i[9];
n[8] = i[10];
return t;
};
t.fromTranslation = function(t, e) {
var i = t.m;
i[0] = 1;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 1;
i[5] = 0;
i[6] = e.x;
i[7] = e.y;
i[8] = 1;
return t;
};
t.fromRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = i;
r[2] = 0;
r[3] = -i;
r[4] = n;
r[5] = 0;
r[6] = 0;
r[7] = 0;
r[8] = 1;
return t;
};
t.fromScaling = function(t, e) {
var i = t.m;
i[0] = e.x;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = e.y;
i[5] = 0;
i[6] = 0;
i[7] = 0;
i[8] = 1;
return t;
};
t.fromQuat = function(t, e) {
var i = t.m, n = e.x, r = e.y, s = e.z, a = e.w, o = n + n, c = r + r, l = s + s, u = n * o, h = r * o, f = r * c, _ = s * o, d = s * c, p = s * l, v = a * o, g = a * c, m = a * l;
i[0] = 1 - f - p;
i[3] = h - m;
i[6] = _ + g;
i[1] = h + m;
i[4] = 1 - u - p;
i[7] = d - v;
i[2] = _ - g;
i[5] = d + v;
i[8] = 1 - u - f;
return t;
};
t.fromViewUp = function(e, i, s) {
return (function() {
var e = new r.default(0, 1, 0), i = new r.default(), s = new r.default();
return function(a, o, c) {
if (r.default.lengthSqr(o) < n.EPSILON * n.EPSILON) {
t.identity(a);
return a;
}
c = c || e;
r.default.normalize(i, r.default.cross(i, c, o));
if (r.default.lengthSqr(i) < n.EPSILON * n.EPSILON) {
t.identity(a);
return a;
}
r.default.cross(s, o, i);
t.set(a, i.x, i.y, i.z, s.x, s.y, s.z, o.x, o.y, o.z);
return a;
};
})()(e, i, s);
};
t.normalFromMat4 = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], l = i[5], u = i[6], h = i[7], f = i[8], _ = i[9], d = i[10], p = i[11], v = i[12], g = i[13], m = i[14], y = i[15], E = r * l - s * c, C = r * u - a * c, A = r * h - o * c, T = s * u - a * l, x = s * h - o * l, S = a * h - o * u, b = f * g - _ * v, R = f * m - d * v, L = f * y - p * v, w = _ * m - d * g, I = _ * y - p * g, O = d * y - p * m, D = E * O - C * I + A * w + T * L - x * R + S * b;
if (!D) return t;
D = 1 / D;
n[0] = (l * O - u * I + h * w) * D;
n[1] = (u * L - c * O - h * R) * D;
n[2] = (c * I - l * L + h * b) * D;
n[3] = (a * I - s * O - o * w) * D;
n[4] = (r * O - a * L + o * R) * D;
n[5] = (s * L - r * I - o * b) * D;
n[6] = (g * S - m * x + y * T) * D;
n[7] = (m * A - v * S - y * C) * D;
n[8] = (v * x - g * A + y * E) * D;
return t;
};
t.frob = function(t) {
var e = t.m;
return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2));
};
t.add = function(t, e, i) {
var n = e.m, r = i.m, s = t.m;
s[0] = n[0] + r[0];
s[1] = n[1] + r[1];
s[2] = n[2] + r[2];
s[3] = n[3] + r[3];
s[4] = n[4] + r[4];
s[5] = n[5] + r[5];
s[6] = n[6] + r[6];
s[7] = n[7] + r[7];
s[8] = n[8] + r[8];
return t;
};
t.subtract = function(t, e, i) {
var n = e.m, r = i.m, s = t.m;
s[0] = n[0] - r[0];
s[1] = n[1] - r[1];
s[2] = n[2] - r[2];
s[3] = n[3] - r[3];
s[4] = n[4] - r[4];
s[5] = n[5] - r[5];
s[6] = n[6] - r[6];
s[7] = n[7] - r[7];
s[8] = n[8] - r[8];
return t;
};
t.multiplyScalar = function(t, e, i) {
var n = e.m, r = t.m;
r[0] = n[0] * i;
r[1] = n[1] * i;
r[2] = n[2] * i;
r[3] = n[3] * i;
r[4] = n[4] * i;
r[5] = n[5] * i;
r[6] = n[6] * i;
r[7] = n[7] * i;
r[8] = n[8] * i;
return t;
};
t.multiplyScalarAndAdd = function(t, e, i, n) {
var r = e.m, s = i.m, a = t.m;
a[0] = r[0] + s[0] * n;
a[1] = r[1] + s[1] * n;
a[2] = r[2] + s[2] * n;
a[3] = r[3] + s[3] * n;
a[4] = r[4] + s[4] * n;
a[5] = r[5] + s[5] * n;
a[6] = r[6] + s[6] * n;
a[7] = r[7] + s[7] * n;
a[8] = r[8] + s[8] * n;
return t;
};
t.exactEquals = function(t, e) {
var i = t.m, n = e.m;
return i[0] === n[0] && i[1] === n[1] && i[2] === n[2] && i[3] === n[3] && i[4] === n[4] && i[5] === n[5] && i[6] === n[6] && i[7] === n[7] && i[8] === n[8];
};
t.equals = function(t, e) {
var i = t.m, r = e.m, s = i[0], a = i[1], o = i[2], c = i[3], l = i[4], u = i[5], h = i[6], f = i[7], _ = i[8], d = r[0], p = r[1], v = r[2], g = r[3], m = r[4], y = r[5], E = r[6], C = r[7], A = r[8];
return Math.abs(s - d) <= n.EPSILON * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(a - p) <= n.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(o - v) <= n.EPSILON * Math.max(1, Math.abs(o), Math.abs(v)) && Math.abs(c - g) <= n.EPSILON * Math.max(1, Math.abs(c), Math.abs(g)) && Math.abs(l - m) <= n.EPSILON * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(u - y) <= n.EPSILON * Math.max(1, Math.abs(u), Math.abs(y)) && Math.abs(h - E) <= n.EPSILON * Math.max(1, Math.abs(h), Math.abs(E)) && Math.abs(f - C) <= n.EPSILON * Math.max(1, Math.abs(f), Math.abs(C)) && Math.abs(_ - A) <= n.EPSILON * Math.max(1, Math.abs(_), Math.abs(A));
};
t.toArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = e.m, r = 0; r < 9; r++) t[i + r] = n[r];
return t;
};
t.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = t.m, r = 0; r < 9; r++) n[r] = e[i + r];
return t;
};
function t(t, e, i, r, s, a, o, c, l) {
void 0 === t && (t = 1);
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 1);
void 0 === a && (a = 0);
void 0 === o && (o = 0);
void 0 === c && (c = 0);
void 0 === l && (l = 1);
this.m = void 0;
if (t instanceof n.FLOAT_ARRAY_TYPE) this.m = t; else {
this.m = new n.FLOAT_ARRAY_TYPE(9);
var u = this.m;
u[0] = t;
u[1] = e;
u[2] = i;
u[3] = r;
u[4] = s;
u[5] = a;
u[6] = o;
u[7] = c;
u[8] = l;
}
}
t.prototype.toString = function() {
var t = this.m;
return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
};
return t;
})();
i.default = s;
s.sub = s.subtract;
s.mul = s.multiply;
s.IDENTITY = Object.freeze(new s());
cc.Mat3 = s;
e.exports = i.default;
}), {
"../value-types/utils": 175,
"./vec3": 178
} ],
170: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = l(t("./value-type")), r = l(t("../platform/CCClass")), s = l(t("./vec3")), a = l(t("./quat")), o = t("./utils"), c = l(t("./mat3"));
function l(t) {
return t && t.__esModule ? t : {
default: t
};
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = 0, f = 0, _ = 0, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, C = 0, A = 0, T = 0, x = 0, S = 0, b = 0, R = (function(t) {
u(i, t);
var e = i.prototype;
e.mul = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.mulScalar = function(t, e) {
i.multiplyScalar(e || new i(), this, t);
};
e.sub = function(t, e) {
i.subtract(e || new i(), this, t);
};
i.clone = function(t) {
var e = t.m;
return new i(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
};
i.copy = function(t, e) {
var i = t.m, n = e.m;
i[0] = n[0];
i[1] = n[1];
i[2] = n[2];
i[3] = n[3];
i[4] = n[4];
i[5] = n[5];
i[6] = n[6];
i[7] = n[7];
i[8] = n[8];
i[9] = n[9];
i[10] = n[10];
i[11] = n[11];
i[12] = n[12];
i[13] = n[13];
i[14] = n[14];
i[15] = n[15];
return t;
};
i.set = function(t, e, i, n, r, s, a, o, c, l, u, h, f, _, d, p, v) {
var g = t.m;
g[0] = e;
g[1] = i;
g[2] = n;
g[3] = r;
g[4] = s;
g[5] = a;
g[6] = o;
g[7] = c;
g[8] = l;
g[9] = u;
g[10] = h;
g[11] = f;
g[12] = _;
g[13] = d;
g[14] = p;
g[15] = v;
return t;
};
i.identity = function(t) {
var e = t.m;
e[0] = 1;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 0;
e[5] = 1;
e[6] = 0;
e[7] = 0;
e[8] = 0;
e[9] = 0;
e[10] = 1;
e[11] = 0;
e[12] = 0;
e[13] = 0;
e[14] = 0;
e[15] = 1;
return t;
};
i.transpose = function(t, e) {
var i = t.m, n = e.m;
if (t === e) {
var r = n[1], s = n[2], a = n[3], o = n[6], c = n[7], l = n[11];
i[1] = n[4];
i[2] = n[8];
i[3] = n[12];
i[4] = r;
i[6] = n[9];
i[7] = n[13];
i[8] = s;
i[9] = o;
i[11] = n[14];
i[12] = a;
i[13] = c;
i[14] = l;
} else {
i[0] = n[0];
i[1] = n[4];
i[2] = n[8];
i[3] = n[12];
i[4] = n[1];
i[5] = n[5];
i[6] = n[9];
i[7] = n[13];
i[8] = n[2];
i[9] = n[6];
i[10] = n[10];
i[11] = n[14];
i[12] = n[3];
i[13] = n[7];
i[14] = n[11];
i[15] = n[15];
}
return t;
};
i.invert = function(t, e) {
var i = e.m;
h = i[0];
f = i[1];
_ = i[2];
d = i[3];
p = i[4];
v = i[5];
g = i[6];
m = i[7];
y = i[8];
E = i[9];
C = i[10];
A = i[11];
T = i[12];
x = i[13];
S = i[14];
b = i[15];
var n = h * v - f * p, r = h * g - _ * p, s = h * m - d * p, a = f * g - _ * v, o = f * m - d * v, c = _ * m - d * g, l = y * x - E * T, u = y * S - C * T, R = y * b - A * T, L = E * S - C * x, w = E * b - A * x, I = C * b - A * S, O = n * I - r * w + s * L + a * R - o * u + c * l;
if (0 === O) return null;
O = 1 / O;
var D = t.m;
D[0] = (v * I - g * w + m * L) * O;
D[1] = (_ * w - f * I - d * L) * O;
D[2] = (x * c - S * o + b * a) * O;
D[3] = (C * o - E * c - A * a) * O;
D[4] = (g * R - p * I - m * u) * O;
D[5] = (h * I - _ * R + d * u) * O;
D[6] = (S * s - T * c - b * r) * O;
D[7] = (y * c - C * s + A * r) * O;
D[8] = (p * w - v * R + m * l) * O;
D[9] = (f * R - h * w - d * l) * O;
D[10] = (T * o - x * s + b * n) * O;
D[11] = (E * s - y * o - A * n) * O;
D[12] = (v * u - p * L - g * l) * O;
D[13] = (h * L - f * u + _ * l) * O;
D[14] = (x * r - T * a - S * n) * O;
D[15] = (y * a - E * r + C * n) * O;
return t;
};
i.determinant = function(t) {
var e = t.m;
h = e[0];
f = e[1];
_ = e[2];
d = e[3];
p = e[4];
v = e[5];
g = e[6];
m = e[7];
y = e[8];
E = e[9];
C = e[10];
A = e[11];
T = e[12];
x = e[13];
S = e[14];
b = e[15];
return (h * v - f * p) * (C * b - A * S) - (h * g - _ * p) * (E * b - A * x) + (h * m - d * p) * (E * S - C * x) + (f * g - _ * v) * (y * b - A * T) - (f * m - d * v) * (y * S - C * T) + (_ * m - d * g) * (y * x - E * T);
};
i.multiply = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
h = r[0];
f = r[1];
_ = r[2];
d = r[3];
p = r[4];
v = r[5];
g = r[6];
m = r[7];
y = r[8];
E = r[9];
C = r[10];
A = r[11];
T = r[12];
x = r[13];
S = r[14];
b = r[15];
var a = s[0], o = s[1], c = s[2], l = s[3];
n[0] = a * h + o * p + c * y + l * T;
n[1] = a * f + o * v + c * E + l * x;
n[2] = a * _ + o * g + c * C + l * S;
n[3] = a * d + o * m + c * A + l * b;
a = s[4];
o = s[5];
c = s[6];
l = s[7];
n[4] = a * h + o * p + c * y + l * T;
n[5] = a * f + o * v + c * E + l * x;
n[6] = a * _ + o * g + c * C + l * S;
n[7] = a * d + o * m + c * A + l * b;
a = s[8];
o = s[9];
c = s[10];
l = s[11];
n[8] = a * h + o * p + c * y + l * T;
n[9] = a * f + o * v + c * E + l * x;
n[10] = a * _ + o * g + c * C + l * S;
n[11] = a * d + o * m + c * A + l * b;
a = s[12];
o = s[13];
c = s[14];
l = s[15];
n[12] = a * h + o * p + c * y + l * T;
n[13] = a * f + o * v + c * E + l * x;
n[14] = a * _ + o * g + c * C + l * S;
n[15] = a * d + o * m + c * A + l * b;
return t;
};
i.transform = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = t.m, o = e.m;
if (e === t) {
a[12] = o[0] * n + o[4] * r + o[8] * s + o[12];
a[13] = o[1] * n + o[5] * r + o[9] * s + o[13];
a[14] = o[2] * n + o[6] * r + o[10] * s + o[14];
a[15] = o[3] * n + o[7] * r + o[11] * s + o[15];
} else {
h = o[0];
f = o[1];
_ = o[2];
d = o[3];
p = o[4];
v = o[5];
g = o[6];
m = o[7];
y = o[8];
E = o[9];
C = o[10];
A = o[11];
T = o[12];
x = o[13];
S = o[14];
b = o[15];
a[0] = h;
a[1] = f;
a[2] = _;
a[3] = d;
a[4] = p;
a[5] = v;
a[6] = g;
a[7] = m;
a[8] = y;
a[9] = E;
a[10] = C;
a[11] = A;
a[12] = h * n + p * r + y * s + o[12];
a[13] = f * n + v * r + E * s + o[13];
a[14] = _ * n + g * r + C * s + o[14];
a[15] = d * n + m * r + A * s + o[15];
}
return t;
};
i.translate = function(t, e, i) {
var n = t.m, r = e.m;
if (e === t) {
n[12] += i.x;
n[13] += i.y;
n[14] += i.z;
} else {
n[0] = r[0];
n[1] = r[1];
n[2] = r[2];
n[3] = r[3];
n[4] = r[4];
n[5] = r[5];
n[6] = r[6];
n[7] = r[7];
n[8] = r[8];
n[9] = r[9];
n[10] = r[10];
n[11] = r[11];
n[12] += i.x;
n[13] += i.y;
n[14] += i.z;
n[15] = r[15];
}
return t;
};
i.scale = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = t.m, o = e.m;
a[0] = o[0] * n;
a[1] = o[1] * n;
a[2] = o[2] * n;
a[3] = o[3] * n;
a[4] = o[4] * r;
a[5] = o[5] * r;
a[6] = o[6] * r;
a[7] = o[7] * r;
a[8] = o[8] * s;
a[9] = o[9] * s;
a[10] = o[10] * s;
a[11] = o[11] * s;
a[12] = o[12];
a[13] = o[13];
a[14] = o[14];
a[15] = o[15];
return t;
};
i.rotate = function(t, e, i, n) {
var r = n.x, s = n.y, a = n.z, c = Math.sqrt(r * r + s * s + a * a);
if (Math.abs(c) < o.EPSILON) return null;
r *= c = 1 / c;
s *= c;
a *= c;
var l = Math.sin(i), u = Math.cos(i), T = 1 - u, x = e.m;
h = x[0];
f = x[1];
_ = x[2];
d = x[3];
p = x[4];
v = x[5];
g = x[6];
m = x[7];
y = x[8];
E = x[9];
C = x[10];
A = x[11];
var S = r * r * T + u, b = s * r * T + a * l, R = a * r * T - s * l, L = r * s * T - a * l, w = s * s * T + u, I = a * s * T + r * l, O = r * a * T + s * l, D = s * a * T - r * l, M = a * a * T + u, N = t.m;
N[0] = h * S + p * b + y * R;
N[1] = f * S + v * b + E * R;
N[2] = _ * S + g * b + C * R;
N[3] = d * S + m * b + A * R;
N[4] = h * L + p * w + y * I;
N[5] = f * L + v * w + E * I;
N[6] = _ * L + g * w + C * I;
N[7] = d * L + m * w + A * I;
N[8] = h * O + p * D + y * M;
N[9] = f * O + v * D + E * M;
N[10] = _ * O + g * D + C * M;
N[11] = d * O + m * D + A * M;
if (e !== t) {
N[12] = x[12];
N[13] = x[13];
N[14] = x[14];
N[15] = x[15];
}
return t;
};
i.rotateX = function(t, e, i) {
var n = t.m, r = e.m, s = Math.sin(i), a = Math.cos(i), o = r[4], c = r[5], l = r[6], u = r[7], h = r[8], f = r[9], _ = r[10], d = r[11];
if (e !== t) {
n[0] = r[0];
n[1] = r[1];
n[2] = r[2];
n[3] = r[3];
n[12] = r[12];
n[13] = r[13];
n[14] = r[14];
n[15] = r[15];
}
n[4] = o * a + h * s;
n[5] = c * a + f * s;
n[6] = l * a + _ * s;
n[7] = u * a + d * s;
n[8] = h * a - o * s;
n[9] = f * a - c * s;
n[10] = _ * a - l * s;
n[11] = d * a - u * s;
return t;
};
i.rotateY = function(t, e, i) {
var n = t.m, r = e.m, s = Math.sin(i), a = Math.cos(i), o = r[0], c = r[1], l = r[2], u = r[3], h = r[8], f = r[9], _ = r[10], d = r[11];
if (e !== t) {
n[4] = r[4];
n[5] = r[5];
n[6] = r[6];
n[7] = r[7];
n[12] = r[12];
n[13] = r[13];
n[14] = r[14];
n[15] = r[15];
}
n[0] = o * a - h * s;
n[1] = c * a - f * s;
n[2] = l * a - _ * s;
n[3] = u * a - d * s;
n[8] = o * s + h * a;
n[9] = c * s + f * a;
n[10] = l * s + _ * a;
n[11] = u * s + d * a;
return t;
};
i.rotateZ = function(t, e, i) {
var n = e.m, r = t.m, s = Math.sin(i), a = Math.cos(i), o = e.m[0], c = e.m[1], l = e.m[2], u = e.m[3], h = e.m[4], f = e.m[5], _ = e.m[6], d = e.m[7];
if (e !== t) {
r[8] = n[8];
r[9] = n[9];
r[10] = n[10];
r[11] = n[11];
r[12] = n[12];
r[13] = n[13];
r[14] = n[14];
r[15] = n[15];
}
r[0] = o * a + h * s;
r[1] = c * a + f * s;
r[2] = l * a + _ * s;
r[3] = u * a + d * s;
r[4] = h * a - o * s;
r[5] = f * a - c * s;
r[6] = _ * a - l * s;
r[7] = d * a - u * s;
return t;
};
i.fromTranslation = function(t, e) {
var i = t.m;
i[0] = 1;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 0;
i[5] = 1;
i[6] = 0;
i[7] = 0;
i[8] = 0;
i[9] = 0;
i[10] = 1;
i[11] = 0;
i[12] = e.x;
i[13] = e.y;
i[14] = e.z;
i[15] = 1;
return t;
};
i.fromScaling = function(t, e) {
var i = t.m;
i[0] = e.x;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 0;
i[5] = e.y;
i[6] = 0;
i[7] = 0;
i[8] = 0;
i[9] = 0;
i[10] = e.z;
i[11] = 0;
i[12] = 0;
i[13] = 0;
i[14] = 0;
i[15] = 1;
return t;
};
i.fromRotation = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = Math.sqrt(n * n + r * r + s * s);
if (Math.abs(a) < o.EPSILON) return null;
n *= a = 1 / a;
r *= a;
s *= a;
var c = Math.sin(e), l = Math.cos(e), u = 1 - l, h = t.m;
h[0] = n * n * u + l;
h[1] = r * n * u + s * c;
h[2] = s * n * u - r * c;
h[3] = 0;
h[4] = n * r * u - s * c;
h[5] = r * r * u + l;
h[6] = s * r * u + n * c;
h[7] = 0;
h[8] = n * s * u + r * c;
h[9] = r * s * u - n * c;
h[10] = s * s * u + l;
h[11] = 0;
h[12] = 0;
h[13] = 0;
h[14] = 0;
h[15] = 1;
return t;
};
i.fromXRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = 1;
r[1] = 0;
r[2] = 0;
r[3] = 0;
r[4] = 0;
r[5] = n;
r[6] = i;
r[7] = 0;
r[8] = 0;
r[9] = -i;
r[10] = n;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromYRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = 0;
r[2] = -i;
r[3] = 0;
r[4] = 0;
r[5] = 1;
r[6] = 0;
r[7] = 0;
r[8] = i;
r[9] = 0;
r[10] = n;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromZRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = i;
r[2] = 0;
r[3] = 0;
r[4] = -i;
r[5] = n;
r[6] = 0;
r[7] = 0;
r[8] = 0;
r[9] = 0;
r[10] = 1;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromRT = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = e.w, o = n + n, c = r + r, l = s + s, u = n * o, h = n * c, f = n * l, _ = r * c, d = r * l, p = s * l, v = a * o, g = a * c, m = a * l, y = t.m;
y[0] = 1 - (_ + p);
y[1] = h + m;
y[2] = f - g;
y[3] = 0;
y[4] = h - m;
y[5] = 1 - (u + p);
y[6] = d + v;
y[7] = 0;
y[8] = f + g;
y[9] = d - v;
y[10] = 1 - (u + _);
y[11] = 0;
y[12] = i.x;
y[13] = i.y;
y[14] = i.z;
y[15] = 1;
return t;
};
i.getTranslation = function(t, e) {
var i = e.m;
t.x = i[12];
t.y = i[13];
t.z = i[14];
return t;
};
i.getScaling = function(t, e) {
var i = e.m, n = w.m, r = n[0] = i[0], s = n[1] = i[1], a = n[2] = i[2], o = n[3] = i[4], l = n[4] = i[5], u = n[5] = i[6], h = n[6] = i[8], f = n[7] = i[9], _ = n[8] = i[10];
t.x = Math.sqrt(r * r + s * s + a * a);
t.y = Math.sqrt(o * o + l * l + u * u);
t.z = Math.sqrt(h * h + f * f + _ * _);
c.default.determinant(w) < 0 && (t.x *= -1);
return t;
};
i.getRotation = function(t, e) {
var i = e.m, n = i[0] + i[5] + i[10], r = 0;
if (n > 0) {
r = 2 * Math.sqrt(n + 1);
t.w = .25 * r;
t.x = (i[6] - i[9]) / r;
t.y = (i[8] - i[2]) / r;
t.z = (i[1] - i[4]) / r;
} else if (i[0] > i[5] && i[0] > i[10]) {
r = 2 * Math.sqrt(1 + i[0] - i[5] - i[10]);
t.w = (i[6] - i[9]) / r;
t.x = .25 * r;
t.y = (i[1] + i[4]) / r;
t.z = (i[8] + i[2]) / r;
} else if (i[5] > i[10]) {
r = 2 * Math.sqrt(1 + i[5] - i[0] - i[10]);
t.w = (i[8] - i[2]) / r;
t.x = (i[1] + i[4]) / r;
t.y = .25 * r;
t.z = (i[6] + i[9]) / r;
} else {
r = 2 * Math.sqrt(1 + i[10] - i[0] - i[5]);
t.w = (i[1] - i[4]) / r;
t.x = (i[8] + i[2]) / r;
t.y = (i[6] + i[9]) / r;
t.z = .25 * r;
}
return t;
};
i.toRTS = function(t, e, i, n) {
var r = t.m, o = w.m;
n.x = s.default.set(L, r[0], r[1], r[2]).mag();
o[0] = r[0] / n.x;
o[1] = r[1] / n.x;
o[2] = r[2] / n.x;
n.y = s.default.set(L, r[4], r[5], r[6]).mag();
o[3] = r[4] / n.y;
o[4] = r[5] / n.y;
o[5] = r[6] / n.y;
n.z = s.default.set(L, r[8], r[9], r[10]).mag();
o[6] = r[8] / n.z;
o[7] = r[9] / n.z;
o[8] = r[10] / n.z;
if (c.default.determinant(w) < 0) {
n.x *= -1;
o[0] *= -1;
o[1] *= -1;
o[2] *= -1;
}
a.default.fromMat3(e, w);
s.default.set(i, r[12], r[13], r[14]);
};
i.fromRTS = function(t, e, i, n) {
var r = e.x, s = e.y, a = e.z, o = e.w, c = r + r, l = s + s, u = a + a, h = r * c, f = r * l, _ = r * u, d = s * l, p = s * u, v = a * u, g = o * c, m = o * l, y = o * u, E = n.x, C = n.y, A = n.z, T = t.m;
T[0] = (1 - (d + v)) * E;
T[1] = (f + y) * E;
T[2] = (_ - m) * E;
T[3] = 0;
T[4] = (f - y) * C;
T[5] = (1 - (h + v)) * C;
T[6] = (p + g) * C;
T[7] = 0;
T[8] = (_ + m) * A;
T[9] = (p - g) * A;
T[10] = (1 - (h + d)) * A;
T[11] = 0;
T[12] = i.x;
T[13] = i.y;
T[14] = i.z;
T[15] = 1;
return t;
};
i.fromRTSOrigin = function(t, e, i, n, r) {
var s = e.x, a = e.y, o = e.z, c = e.w, l = s + s, u = a + a, h = o + o, f = s * l, _ = s * u, d = s * h, p = a * u, v = a * h, g = o * h, m = c * l, y = c * u, E = c * h, C = n.x, A = n.y, T = n.z, x = r.x, S = r.y, b = r.z, R = t.m;
R[0] = (1 - (p + g)) * C;
R[1] = (_ + E) * C;
R[2] = (d - y) * C;
R[3] = 0;
R[4] = (_ - E) * A;
R[5] = (1 - (f + g)) * A;
R[6] = (v + m) * A;
R[7] = 0;
R[8] = (d + y) * T;
R[9] = (v - m) * T;
R[10] = (1 - (f + p)) * T;
R[11] = 0;
R[12] = i.x + x - (R[0] * x + R[4] * S + R[8] * b);
R[13] = i.y + S - (R[1] * x + R[5] * S + R[9] * b);
R[14] = i.z + b - (R[2] * x + R[6] * S + R[10] * b);
R[15] = 1;
return t;
};
i.fromQuat = function(t, e) {
var i = e.x, n = e.y, r = e.z, s = e.w, a = i + i, o = n + n, c = r + r, l = i * a, u = n * a, h = n * o, f = r * a, _ = r * o, d = r * c, p = s * a, v = s * o, g = s * c, m = t.m;
m[0] = 1 - h - d;
m[1] = u + g;
m[2] = f - v;
m[3] = 0;
m[4] = u - g;
m[5] = 1 - l - d;
m[6] = _ + p;
m[7] = 0;
m[8] = f + v;
m[9] = _ - p;
m[10] = 1 - l - h;
m[11] = 0;
m[12] = 0;
m[13] = 0;
m[14] = 0;
m[15] = 1;
return t;
};
i.frustum = function(t, e, i, n, r, s, a) {
var o = 1 / (i - e), c = 1 / (r - n), l = 1 / (s - a), u = t.m;
u[0] = 2 * s * o;
u[1] = 0;
u[2] = 0;
u[3] = 0;
u[4] = 0;
u[5] = 2 * s * c;
u[6] = 0;
u[7] = 0;
u[8] = (i + e) * o;
u[9] = (r + n) * c;
u[10] = (a + s) * l;
u[11] = -1;
u[12] = 0;
u[13] = 0;
u[14] = a * s * 2 * l;
u[15] = 0;
return t;
};
i.perspective = function(t, e, i, n, r) {
var s = 1 / Math.tan(e / 2), a = 1 / (n - r), o = t.m;
o[0] = s / i;
o[1] = 0;
o[2] = 0;
o[3] = 0;
o[4] = 0;
o[5] = s;
o[6] = 0;
o[7] = 0;
o[8] = 0;
o[9] = 0;
o[10] = (r + n) * a;
o[11] = -1;
o[12] = 0;
o[13] = 0;
o[14] = 2 * r * n * a;
o[15] = 0;
return t;
};
i.ortho = function(t, e, i, n, r, s, a) {
var o = 1 / (e - i), c = 1 / (n - r), l = 1 / (s - a), u = t.m;
u[0] = -2 * o;
u[1] = 0;
u[2] = 0;
u[3] = 0;
u[4] = 0;
u[5] = -2 * c;
u[6] = 0;
u[7] = 0;
u[8] = 0;
u[9] = 0;
u[10] = 2 * l;
u[11] = 0;
u[12] = (e + i) * o;
u[13] = (r + n) * c;
u[14] = (a + s) * l;
u[15] = 1;
return t;
};
i.lookAt = function(t, e, i, n) {
var r = e.x, s = e.y, a = e.z, o = n.x, c = n.y, l = n.z, u = r - i.x, h = s - i.y, f = a - i.z, _ = 1 / Math.sqrt(u * u + h * h + f * f), d = c * (f *= _) - l * (h *= _), p = l * (u *= _) - o * f, v = o * h - c * u, g = h * (v *= _ = 1 / Math.sqrt(d * d + p * p + v * v)) - f * (p *= _), m = f * (d *= _) - u * v, y = u * p - h * d, E = t.m;
E[0] = d;
E[1] = g;
E[2] = u;
E[3] = 0;
E[4] = p;
E[5] = m;
E[6] = h;
E[7] = 0;
E[8] = v;
E[9] = y;
E[10] = f;
E[11] = 0;
E[12] = -(d * r + p * s + v * a);
E[13] = -(g * r + m * s + y * a);
E[14] = -(u * r + h * s + f * a);
E[15] = 1;
return t;
};
i.inverseTranspose = function(t, e) {
var i = e.m;
h = i[0];
f = i[1];
_ = i[2];
d = i[3];
p = i[4];
v = i[5];
g = i[6];
m = i[7];
y = i[8];
E = i[9];
C = i[10];
A = i[11];
T = i[12];
x = i[13];
S = i[14];
b = i[15];
var n = h * v - f * p, r = h * g - _ * p, s = h * m - d * p, a = f * g - _ * v, o = f * m - d * v, c = _ * m - d * g, l = y * x - E * T, u = y * S - C * T, R = y * b - A * T, L = E * S - C * x, w = E * b - A * x, I = C * b - A * S, O = n * I - r * w + s * L + a * R - o * u + c * l;
if (!O) return null;
O = 1 / O;
(i = t.m)[0] = (v * I - g * w + m * L) * O;
i[1] = (g * R - p * I - m * u) * O;
i[2] = (p * w - v * R + m * l) * O;
i[3] = 0;
i[4] = (_ * w - f * I - d * L) * O;
i[5] = (h * I - _ * R + d * u) * O;
i[6] = (f * R - h * w - d * l) * O;
i[7] = 0;
i[8] = (x * c - S * o + b * a) * O;
i[9] = (S * s - T * c - b * r) * O;
i[10] = (T * o - x * s + b * n) * O;
i[11] = 0;
i[12] = 0;
i[13] = 0;
i[14] = 0;
i[15] = 1;
return t;
};
i.add = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
n[0] = r[0] + s[0];
n[1] = r[1] + s[1];
n[2] = r[2] + s[2];
n[3] = r[3] + s[3];
n[4] = r[4] + s[4];
n[5] = r[5] + s[5];
n[6] = r[6] + s[6];
n[7] = r[7] + s[7];
n[8] = r[8] + s[8];
n[9] = r[9] + s[9];
n[10] = r[10] + s[10];
n[11] = r[11] + s[11];
n[12] = r[12] + s[12];
n[13] = r[13] + s[13];
n[14] = r[14] + s[14];
n[15] = r[15] + s[15];
return t;
};
i.subtract = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
n[0] = r[0] - s[0];
n[1] = r[1] - s[1];
n[2] = r[2] - s[2];
n[3] = r[3] - s[3];
n[4] = r[4] - s[4];
n[5] = r[5] - s[5];
n[6] = r[6] - s[6];
n[7] = r[7] - s[7];
n[8] = r[8] - s[8];
n[9] = r[9] - s[9];
n[10] = r[10] - s[10];
n[11] = r[11] - s[11];
n[12] = r[12] - s[12];
n[13] = r[13] - s[13];
n[14] = r[14] - s[14];
n[15] = r[15] - s[15];
return t;
};
i.multiplyScalar = function(t, e, i) {
var n = t.m, r = e.m;
n[0] = r[0] * i;
n[1] = r[1] * i;
n[2] = r[2] * i;
n[3] = r[3] * i;
n[4] = r[4] * i;
n[5] = r[5] * i;
n[6] = r[6] * i;
n[7] = r[7] * i;
n[8] = r[8] * i;
n[9] = r[9] * i;
n[10] = r[10] * i;
n[11] = r[11] * i;
n[12] = r[12] * i;
n[13] = r[13] * i;
n[14] = r[14] * i;
n[15] = r[15] * i;
return t;
};
i.multiplyScalarAndAdd = function(t, e, i, n) {
var r = t.m, s = e.m, a = i.m;
r[0] = s[0] + a[0] * n;
r[1] = s[1] + a[1] * n;
r[2] = s[2] + a[2] * n;
r[3] = s[3] + a[3] * n;
r[4] = s[4] + a[4] * n;
r[5] = s[5] + a[5] * n;
r[6] = s[6] + a[6] * n;
r[7] = s[7] + a[7] * n;
r[8] = s[8] + a[8] * n;
r[9] = s[9] + a[9] * n;
r[10] = s[10] + a[10] * n;
r[11] = s[11] + a[11] * n;
r[12] = s[12] + a[12] * n;
r[13] = s[13] + a[13] * n;
r[14] = s[14] + a[14] * n;
r[15] = s[15] + a[15] * n;
return t;
};
i.strictEquals = function(t, e) {
var i = t.m, n = e.m;
return i[0] === n[0] && i[1] === n[1] && i[2] === n[2] && i[3] === n[3] && i[4] === n[4] && i[5] === n[5] && i[6] === n[6] && i[7] === n[7] && i[8] === n[8] && i[9] === n[9] && i[10] === n[10] && i[11] === n[11] && i[12] === n[12] && i[13] === n[13] && i[14] === n[14] && i[15] === n[15];
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
var n = t.m, r = e.m;
return Math.abs(n[0] - r[0]) <= i * Math.max(1, Math.abs(n[0]), Math.abs(r[0])) && Math.abs(n[1] - r[1]) <= i * Math.max(1, Math.abs(n[1]), Math.abs(r[1])) && Math.abs(n[2] - r[2]) <= i * Math.max(1, Math.abs(n[2]), Math.abs(r[2])) && Math.abs(n[3] - r[3]) <= i * Math.max(1, Math.abs(n[3]), Math.abs(r[3])) && Math.abs(n[4] - r[4]) <= i * Math.max(1, Math.abs(n[4]), Math.abs(r[4])) && Math.abs(n[5] - r[5]) <= i * Math.max(1, Math.abs(n[5]), Math.abs(r[5])) && Math.abs(n[6] - r[6]) <= i * Math.max(1, Math.abs(n[6]), Math.abs(r[6])) && Math.abs(n[7] - r[7]) <= i * Math.max(1, Math.abs(n[7]), Math.abs(r[7])) && Math.abs(n[8] - r[8]) <= i * Math.max(1, Math.abs(n[8]), Math.abs(r[8])) && Math.abs(n[9] - r[9]) <= i * Math.max(1, Math.abs(n[9]), Math.abs(r[9])) && Math.abs(n[10] - r[10]) <= i * Math.max(1, Math.abs(n[10]), Math.abs(r[10])) && Math.abs(n[11] - r[11]) <= i * Math.max(1, Math.abs(n[11]), Math.abs(r[11])) && Math.abs(n[12] - r[12]) <= i * Math.max(1, Math.abs(n[12]), Math.abs(r[12])) && Math.abs(n[13] - r[13]) <= i * Math.max(1, Math.abs(n[13]), Math.abs(r[13])) && Math.abs(n[14] - r[14]) <= i * Math.max(1, Math.abs(n[14]), Math.abs(r[14])) && Math.abs(n[15] - r[15]) <= i * Math.max(1, Math.abs(n[15]), Math.abs(r[15]));
};
i.adjoint = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], l = i[5], u = i[6], h = i[7], f = i[8], _ = i[9], d = i[10], p = i[11], v = i[12], g = i[13], m = i[14], y = i[15];
n[0] = l * (d * y - p * m) - _ * (u * y - h * m) + g * (u * p - h * d);
n[1] = -(s * (d * y - p * m) - _ * (a * y - o * m) + g * (a * p - o * d));
n[2] = s * (u * y - h * m) - l * (a * y - o * m) + g * (a * h - o * u);
n[3] = -(s * (u * p - h * d) - l * (a * p - o * d) + _ * (a * h - o * u));
n[4] = -(c * (d * y - p * m) - f * (u * y - h * m) + v * (u * p - h * d));
n[5] = r * (d * y - p * m) - f * (a * y - o * m) + v * (a * p - o * d);
n[6] = -(r * (u * y - h * m) - c * (a * y - o * m) + v * (a * h - o * u));
n[7] = r * (u * p - h * d) - c * (a * p - o * d) + f * (a * h - o * u);
n[8] = c * (_ * y - p * g) - f * (l * y - h * g) + v * (l * p - h * _);
n[9] = -(r * (_ * y - p * g) - f * (s * y - o * g) + v * (s * p - o * _));
n[10] = r * (l * y - h * g) - c * (s * y - o * g) + v * (s * h - o * l);
n[11] = -(r * (l * p - h * _) - c * (s * p - o * _) + f * (s * h - o * l));
n[12] = -(c * (_ * m - d * g) - f * (l * m - u * g) + v * (l * d - u * _));
n[13] = r * (_ * m - d * g) - f * (s * m - a * g) + v * (s * d - a * _);
n[14] = -(r * (l * m - u * g) - c * (s * m - a * g) + v * (s * u - a * l));
n[15] = r * (l * d - u * _) - c * (s * d - a * _) + f * (s * u - a * l);
return t;
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = e.m, r = 0; r < 16; r++) t[i + r] = n[r];
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = t.m, r = 0; r < 16; r++) n[r] = e[i + r];
return t;
};
function i(e, i, n, r, s, a, c, l, u, h, f, _, d, p, v, g) {
var m;
void 0 === e && (e = 1);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 0);
void 0 === a && (a = 1);
void 0 === c && (c = 0);
void 0 === l && (l = 0);
void 0 === u && (u = 0);
void 0 === h && (h = 0);
void 0 === f && (f = 1);
void 0 === _ && (_ = 0);
void 0 === d && (d = 0);
void 0 === p && (p = 0);
void 0 === v && (v = 0);
void 0 === g && (g = 1);
(m = t.call(this) || this).m = void 0;
if (e instanceof o.FLOAT_ARRAY_TYPE) m.m = e; else {
m.m = new o.FLOAT_ARRAY_TYPE(16);
var y = m.m;
y[0] = e;
y[1] = i;
y[2] = n;
y[3] = r;
y[4] = s;
y[5] = a;
y[6] = c;
y[7] = l;
y[8] = u;
y[9] = h;
y[10] = f;
y[11] = _;
y[12] = d;
y[13] = p;
y[14] = v;
y[15] = g;
}
return m;
}
e.clone = function() {
var t = this.m;
return new i(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
};
e.set = function(t) {
var e = this.m, i = t.m;
e[0] = i[0];
e[1] = i[1];
e[2] = i[2];
e[3] = i[3];
e[4] = i[4];
e[5] = i[5];
e[6] = i[6];
e[7] = i[7];
e[8] = i[8];
e[9] = i[9];
e[10] = i[10];
e[11] = i[11];
e[12] = i[12];
e[13] = i[13];
e[14] = i[14];
e[15] = i[15];
return this;
};
e.equals = function(t) {
return i.strictEquals(this, t);
};
e.fuzzyEquals = function(t) {
return i.equals(this, t);
};
e.toString = function() {
var t = this.m;
return t ? "[\n" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ",\n" + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ",\n" + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ",\n" + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + "\n]" : "[\n1, 0, 0, 0\n0, 1, 0, 0\n0, 0, 1, 0\n0, 0, 0, 1\n]";
};
e.identity = function() {
return i.identity(this);
};
e.transpose = function(t) {
t = t || new i();
return i.transpose(t, this);
};
e.invert = function(t) {
t = t || new i();
return i.invert(t, this);
};
e.adjoint = function(t) {
t = t || new i();
return i.adjoint(t, this);
};
e.determinant = function() {
return i.determinant(this);
};
e.add = function(t, e) {
e = e || new i();
return i.add(e, this, t);
};
e.subtract = function(t) {
return i.subtract(this, this, t);
};
e.multiply = function(t) {
return i.multiply(this, this, t);
};
e.multiplyScalar = function(t) {
return i.multiplyScalar(this, this, t);
};
e.translate = function(t, e) {
e = e || new i();
return i.translate(e, this, t);
};
e.scale = function(t, e) {
e = e || new i();
return i.scale(e, this, t);
};
e.rotate = function(t, e, n) {
n = n || new i();
return i.rotate(n, this, t, e);
};
e.getTranslation = function(t) {
t = t || new s.default();
return i.getTranslation(t, this);
};
e.getScale = function(t) {
t = t || new s.default();
return i.getScaling(t, this);
};
e.getRotation = function(t) {
t = t || new a.default();
return i.getRotation(t, this);
};
e.fromRTS = function(t, e, n) {
return i.fromRTS(this, t, e, n);
};
e.fromQuat = function(t) {
return i.fromQuat(this, t);
};
return i;
})(n.default);
i.default = R;
R.mul = R.multiply;
R.sub = R.subtract;
R.IDENTITY = Object.freeze(new R());
var L = new s.default(), w = new c.default();
r.default.fastDefine("cc.Mat4", R, {
m00: 1,
m01: 0,
m02: 0,
m03: 0,
m04: 0,
m05: 1,
m06: 0,
m07: 0,
m08: 0,
m09: 0,
m10: 1,
m11: 0,
m12: 0,
m13: 0,
m14: 0,
m15: 1
});
for (var I = function(t) {
Object.defineProperty(R.prototype, "m" + t, {
get: function() {
return this.m[t];
},
set: function(e) {
this.m[t] = e;
}
});
}, O = 0; O < 16; O++) I(O);
cc.mat4 = function(t, e, i, n, r, s, a, o, c, l, u, h, f, _, d, p) {
var v = new R(t, e, i, n, r, s, a, o, c, l, u, h, f, _, d, p);
void 0 === t && R.identity(v);
return v;
};
cc.Mat4 = R;
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"./mat3": 169,
"./quat": 171,
"./utils": 175,
"./value-type": 176,
"./vec3": 178
} ],
171: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = c(t("./value-type")), r = c(t("../platform/CCClass")), s = c(t("./vec3")), a = c(t("./mat3")), o = t("./utils");
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var u = 0, h = 0, f = 0, _ = 0, d = (function(t) {
l(i, t);
var e = i.prototype;
e.mul = function(t, e) {
return i.multiply(e || new i(), this, t);
};
i.clone = function(t) {
return new i(t.x, t.y, t.z, t.w);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = e.w;
return t;
};
i.set = function(t, e, i, n, r) {
t.x = e;
t.y = i;
t.z = n;
t.w = r;
return t;
};
i.identity = function(t) {
t.x = 0;
t.y = 0;
t.z = 0;
t.w = 1;
return t;
};
i.rotationTo = function(t, e, n) {
var r = s.default.dot(e, n);
if (r < -.999999) {
s.default.cross(g, s.default.RIGHT, e);
g.mag() < 1e-6 && s.default.cross(g, s.default.UP, e);
s.default.normalize(g, g);
i.fromAxisAngle(t, g, Math.PI);
return t;
}
if (r > .999999) {
t.x = 0;
t.y = 0;
t.z = 0;
t.w = 1;
return t;
}
s.default.cross(g, e, n);
t.x = g.x;
t.y = g.y;
t.z = g.z;
t.w = 1 + r;
return i.normalize(t, t);
};
i.getAxisAngle = function(t, e) {
var i = 2 * Math.acos(e.w), n = Math.sin(i / 2);
if (0 !== n) {
t.x = e.x / n;
t.y = e.y / n;
t.z = e.z / n;
} else {
t.x = 1;
t.y = 0;
t.z = 0;
}
return i;
};
i.multiply = function(t, e, i) {
u = e.x * i.w + e.w * i.x + e.y * i.z - e.z * i.y;
h = e.y * i.w + e.w * i.y + e.z * i.x - e.x * i.z;
f = e.z * i.w + e.w * i.z + e.x * i.y - e.y * i.x;
_ = e.w * i.w - e.x * i.x - e.y * i.y - e.z * i.z;
t.x = u;
t.y = h;
t.z = f;
t.w = _;
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
t.w = e.w + i.w * n;
return t;
};
i.rotateX = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
t.x = e.x * r + e.w * n;
t.y = e.y * r + e.z * n;
t.z = e.z * r - e.y * n;
t.w = e.w * r - e.x * n;
return t;
};
i.rotateY = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
t.x = e.x * r - e.z * n;
t.y = e.y * r + e.w * n;
t.z = e.z * r + e.x * n;
t.w = e.w * r - e.y * n;
return t;
};
i.rotateZ = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
t.x = e.x * r + e.y * n;
t.y = e.y * r - e.x * n;
t.z = e.z * r + e.w * n;
t.w = e.w * r - e.z * n;
return t;
};
i.rotateAround = function(t, e, n, r) {
i.invert(p, e);
s.default.transformQuat(g, n, p);
i.fromAxisAngle(p, g, r);
i.multiply(t, e, p);
return t;
};
i.rotateAroundLocal = function(t, e, n, r) {
i.fromAxisAngle(p, n, r);
i.multiply(t, e, p);
return t;
};
i.calculateW = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = Math.sqrt(Math.abs(1 - e.x * e.x - e.y * e.y - e.z * e.z));
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
t.w = e.w + n * (i.w - e.w);
return t;
};
i.slerp = function(t, e, i, n) {
var r = 0, s = 0, a = e.x * i.x + e.y * i.y + e.z * i.z + e.w * i.w;
if (a < 0) {
a = -a;
i.x = -i.x;
i.y = -i.y;
i.z = -i.z;
i.w = -i.w;
}
if (1 - a > 1e-6) {
var o = Math.acos(a), c = Math.sin(o);
r = Math.sin((1 - n) * o) / c;
s = Math.sin(n * o) / c;
} else {
r = 1 - n;
s = n;
}
t.x = r * e.x + s * i.x;
t.y = r * e.y + s * i.y;
t.z = r * e.z + s * i.z;
t.w = r * e.w + s * i.w;
return t;
};
i.sqlerp = function(t, e, n, r, s, a) {
i.slerp(p, e, s, a);
i.slerp(v, n, r, a);
i.slerp(t, p, v, 2 * a * (1 - a));
return t;
};
i.invert = function(t, e) {
var i = e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w, n = i ? 1 / i : 0;
t.x = -e.x * n;
t.y = -e.y * n;
t.z = -e.z * n;
t.w = e.w * n;
return t;
};
i.conjugate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
t.w = e.w;
return t;
};
i.len = function(t) {
return Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w);
};
i.lengthSqr = function(t) {
return t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
};
i.normalize = function(t, e) {
var i = e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
}
return t;
};
i.fromAxes = function(t, e, n, r) {
a.default.set(m, e.x, e.y, e.z, n.x, n.y, n.z, r.x, r.y, r.z);
return i.normalize(t, i.fromMat3(t, m));
};
i.fromViewUp = function(t, e, n) {
a.default.fromViewUp(m, e, n);
return i.normalize(t, i.fromMat3(t, m));
};
i.fromAxisAngle = function(t, e, i) {
i *= .5;
var n = Math.sin(i);
t.x = n * e.x;
t.y = n * e.y;
t.z = n * e.z;
t.w = Math.cos(i);
return t;
};
i.fromAngleZ = function(t, e) {
e *= y;
t.x = t.y = 0;
t.z = Math.sin(e);
t.w = Math.cos(e);
return t;
};
i.fromMat3 = function(t, e) {
var i = e.m, n = i[0], r = i[1], s = i[2], a = i[3], o = i[4], c = i[5], l = i[6], u = i[7], h = i[8], f = n + o + h;
if (f > 0) {
var _ = .5 / Math.sqrt(f + 1);
t.w = .25 / _;
t.x = (c - u) * _;
t.y = (l - s) * _;
t.z = (r - a) * _;
} else if (n > o && n > h) {
var d = 2 * Math.sqrt(1 + n - o - h);
t.w = (c - u) / d;
t.x = .25 * d;
t.y = (a + r) / d;
t.z = (l + s) / d;
} else if (o > h) {
var p = 2 * Math.sqrt(1 + o - n - h);
t.w = (l - s) / p;
t.x = (a + r) / p;
t.y = .25 * p;
t.z = (u + c) / p;
} else {
var v = 2 * Math.sqrt(1 + h - n - o);
t.w = (r - a) / v;
t.x = (l + s) / v;
t.y = (u + c) / v;
t.z = .25 * v;
}
return t;
};
i.fromEuler = function(t, e, i, n) {
e *= y;
i *= y;
n *= y;
var r = Math.sin(e), s = Math.cos(e), a = Math.sin(i), o = Math.cos(i), c = Math.sin(n), l = Math.cos(n);
t.x = r * o * l + s * a * c;
t.y = s * a * l + r * o * c;
t.z = s * o * c - r * a * l;
t.w = s * o * l - r * a * c;
return t;
};
i.toAxisX = function(t, e) {
var i = 2 * e.y, n = 2 * e.z;
t.x = 1 - i * e.y - n * e.z;
t.y = i * e.x + n * e.w;
t.z = n * e.x + i * e.w;
return t;
};
i.toAxisY = function(t, e) {
var i = 2 * e.x, n = 2 * e.y, r = 2 * e.z;
t.x = n * e.x - r * e.w;
t.y = 1 - i * e.x - r * e.z;
t.z = r * e.y + i * e.w;
return t;
};
i.toAxisZ = function(t, e) {
var i = 2 * e.x, n = 2 * e.y, r = 2 * e.z;
t.x = r * e.x - n * e.w;
t.y = r * e.y - i * e.w;
t.z = 1 - i * e.x - n * e.y;
return t;
};
i.toEuler = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = e.w, c = 0, l = 0, u = 0, h = n * r + s * a;
if (h > .499999) {
c = 0;
l = (0, o.toDegree)(2 * Math.atan2(n, a));
u = 90;
} else if (h < -.499999) {
c = 0;
l = -(0, o.toDegree)(2 * Math.atan2(n, a));
u = -90;
} else {
var f = n * n, _ = r * r, d = s * s;
c = (0, o.toDegree)(Math.atan2(2 * n * a - 2 * r * s, 1 - 2 * f - 2 * d));
l = (0, o.toDegree)(Math.atan2(2 * r * a - 2 * n * s, 1 - 2 * _ - 2 * d));
u = (0, o.toDegree)(Math.asin(2 * h));
if (i) {
c = -180 * Math.sign(c + 1e-6) + c;
l = -180 * Math.sign(l + 1e-6) + l;
u = 180 * Math.sign(u + 1e-6) - u;
}
}
t.x = c;
t.y = l;
t.z = u;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y)) && Math.abs(t.z - e.z) <= i * Math.max(1, Math.abs(t.z), Math.abs(e.z)) && Math.abs(t.w - e.w) <= i * Math.max(1, Math.abs(t.w), Math.abs(e.w));
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
t[i + 3] = e.w;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
t.w = e[i + 3];
return t;
};
function i(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 1);
(s = t.call(this) || this).x = void 0;
s.y = void 0;
s.z = void 0;
s.w = void 0;
if (e && "object" == typeof e) {
s.z = e.z;
s.y = e.y;
s.w = e.w;
s.x = e.x;
} else {
s.x = e;
s.y = i;
s.z = n;
s.w = r;
}
return s;
}
e.clone = function() {
return new i(this.x, this.y, this.z, this.w);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
this.w = t.w;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
};
e.toEuler = function(t) {
return i.toEuler(t, this);
};
e.fromEuler = function(t) {
return i.fromEuler(this, t.x, t.y, t.z);
};
e.lerp = function(t, e, n) {
n = n || new i();
i.slerp(n, this, t, e);
return n;
};
e.multiply = function(t) {
return i.multiply(this, this, t);
};
e.rotateAround = function(t, e, n, r) {
r = r || new i();
return i.rotateAround(r, t, e, n);
};
return i;
})(n.default);
i.default = d;
d.mul = d.multiply;
d.scale = d.multiplyScalar;
d.mag = d.len;
d.IDENTITY = Object.freeze(new d());
var p = new d(), v = new d(), g = new s.default(), m = new a.default(), y = .5 * Math.PI / 180;
r.default.fastDefine("cc.Quat", d, {
x: 0,
y: 0,
z: 0,
w: 1
});
cc.quat = function(t, e, i, n) {
return new d(t, e, i, n);
};
cc.Quat = d;
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"./mat3": 169,
"./utils": 175,
"./value-type": 176,
"./vec3": 178
} ],
172: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = o(t("./value-type")), r = o(t("../platform/CCClass")), s = o(t("./vec2")), a = o(t("./size"));
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function l(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (function(t) {
u(e, t);
e.fromMinMax = function(t, i) {
var n = Math.min(t.x, i.x), r = Math.min(t.y, i.y);
return new e(n, r, Math.max(t.x, i.x) - n, Math.max(t.y, i.y) - r);
};
function e(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
(s = t.call(this) || this).x = void 0;
s.y = void 0;
s.width = void 0;
s.height = void 0;
if (e && "object" == typeof e) {
i = e.y;
n = e.width;
r = e.height;
e = e.x;
}
s.x = e || 0;
s.y = i || 0;
s.width = n || 0;
s.height = r || 0;
return s;
}
var i = e.prototype;
i.clone = function() {
return new e(this.x, this.y, this.width, this.height);
};
i.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.x, s = this.y, a = this.width, o = this.height;
n.x = r + (t.x - r) * i;
n.y = s + (t.y - s) * i;
n.width = a + (t.width - a) * i;
n.height = o + (t.height - o) * i;
return n;
};
i.set = function(t) {
this.x = t.x;
this.y = t.y;
this.width = t.width;
this.height = t.height;
return this;
};
i.intersects = function(t) {
var e = this.x + this.width, i = this.y + this.height, n = t.x + t.width, r = t.y + t.height;
return !(e < t.x || n < this.x || i < t.y || r < this.y);
};
i.intersection = function(t, e) {
var i = this.x, n = this.y, r = this.x + this.width, s = this.y + this.height, a = e.x, o = e.y, c = e.x + e.width, l = e.y + e.height;
t.x = Math.max(i, a);
t.y = Math.max(n, o);
t.width = Math.min(r, c) - t.x;
t.height = Math.min(s, l) - t.y;
return t;
};
i.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
i.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
i.union = function(t, e) {
var i = this.x, n = this.y, r = this.width, s = this.height, a = e.x, o = e.y, c = e.width, l = e.height;
t.x = Math.min(i, a);
t.y = Math.min(n, o);
t.width = Math.max(i + r, a + c) - t.x;
t.height = Math.max(n + s, o + l) - t.y;
return t;
};
i.transformMat4 = function(t, e) {
var i = this.x, n = this.y, r = i + this.width, s = n + this.height, a = e.m, o = a[0] * i + a[4] * n + a[12], c = a[1] * i + a[5] * n + a[13], l = a[0] * r + a[4] * n + a[12], u = a[1] * r + a[5] * n + a[13], h = a[0] * i + a[4] * s + a[12], f = a[1] * i + a[5] * s + a[13], _ = a[0] * r + a[4] * s + a[12], d = a[1] * r + a[5] * s + a[13], p = Math.min(o, l, h, _), v = Math.max(o, l, h, _), g = Math.min(c, u, f, d), m = Math.max(c, u, f, d);
t.x = p;
t.y = g;
t.width = v - p;
t.height = m - g;
return t;
};
i.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
l(e, [ {
key: "xMin",
get: function() {
return this.x;
},
set: function(t) {
this.width += this.x - t;
this.x = t;
}
}, {
key: "yMin",
get: function() {
return this.y;
},
set: function(t) {
this.height += this.y - t;
this.y = t;
}
}, {
key: "xMax",
get: function() {
return this.x + this.width;
},
set: function(t) {
this.width = t - this.x;
}
}, {
key: "yMax",
get: function() {
return this.y + this.height;
},
set: function(t) {
this.height = t - this.y;
}
}, {
key: "center",
get: function() {
return new s.default(this.x + .5 * this.width, this.y + .5 * this.height);
},
set: function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}
}, {
key: "origin",
get: function() {
return new s.default(this.x, this.y);
},
set: function(t) {
this.x = t.x;
this.y = t.y;
}
}, {
key: "size",
get: function() {
return new a.default(this.width, this.height);
},
set: function(t) {
this.width = t.width;
this.height = t.height;
}
} ]);
return e;
})(n.default);
i.default = h;
r.default.fastDefine("cc.Rect", h, {
x: 0,
y: 0,
width: 0,
height: 0
});
cc.Rect = h;
cc.rect = function(t, e, i, n) {
return new h(t, e, i, n);
};
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"./size": 173,
"./value-type": 176,
"./vec2": 177
} ],
173: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = s(t("./value-type")), r = s(t("../platform/CCClass"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
function a(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function o(t, e, i) {
e && a(t.prototype, e);
i && a(t, i);
return t;
}
function c(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var l = (function(t) {
c(e, t);
o(e, null, [ {
key: "ZERO",
get: function() {
return new e();
}
} ]);
function e(e, i) {
var n;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
(n = t.call(this) || this).width = void 0;
n.height = void 0;
if (e && "object" == typeof e) {
n.height = e.height;
n.width = e.width;
} else {
n.width = e || 0;
n.height = i || 0;
}
return n;
}
var i = e.prototype;
i.clone = function() {
return new e(this.width, this.height);
};
i.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.width, s = this.height;
n.width = r + (t.width - r) * i;
n.height = s + (t.height - s) * i;
return n;
};
i.set = function(t) {
this.width = t.width;
this.height = t.height;
return this;
};
i.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
return e;
})(n.default);
i.default = l;
l.ZERO_R = l.ZERO;
r.default.fastDefine("cc.Size", l, {
width: 0,
height: 0
});
cc.size = function(t, e) {
return new l(t, e);
};
cc.Size = l;
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"./value-type": 176
} ],
174: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("./quat"));
var r = new n.default(), s = (function() {
function t() {}
t.toRotation = function(t, e) {
t.x = e[3];
t.y = e[4];
t.z = e[5];
t.w = e[6];
return t;
};
t.fromRotation = function(t, e) {
t[3] = e.x;
t[4] = e.y;
t[5] = e.z;
t[6] = e.w;
return t;
};
t.toEuler = function(e, i) {
t.toRotation(r, i);
n.default.toEuler(e, r);
return e;
};
t.fromEuler = function(e, i) {
n.default.fromEuler(r, i.x, i.y, i.z);
t.fromRotation(e, r);
return e;
};
t.fromEulerNumber = function(e, i, s, a) {
n.default.fromEuler(r, i, s, a);
t.fromRotation(e, r);
return e;
};
t.toScale = function(t, e) {
t.x = e[7];
t.y = e[8];
t.z = e[9];
return t;
};
t.fromScale = function(t, e) {
t[7] = e.x;
t[8] = e.y;
t[9] = e.z;
return t;
};
t.toPosition = function(t, e) {
t.x = e[0];
t.y = e[1];
t.z = e[2];
return t;
};
t.fromPosition = function(t, e) {
t[0] = e.x;
t[1] = e.y;
t[2] = e.z;
return t;
};
t.fromAngleZ = function(e, i) {
n.default.fromAngleZ(r, i);
t.fromRotation(e, r);
return e;
};
t.toMat4 = function(t, e) {
var i = e[3], n = e[4], r = e[5], s = e[6], a = i + i, o = n + n, c = r + r, l = i * a, u = i * o, h = i * c, f = n * o, _ = n * c, d = r * c, p = s * a, v = s * o, g = s * c, m = e[7], y = e[8], E = e[9], C = t.m;
C[0] = (1 - (f + d)) * m;
C[1] = (u + g) * m;
C[2] = (h - v) * m;
C[3] = 0;
C[4] = (u - g) * y;
C[5] = (1 - (l + d)) * y;
C[6] = (_ + p) * y;
C[7] = 0;
C[8] = (h + v) * E;
C[9] = (_ - p) * E;
C[10] = (1 - (l + f)) * E;
C[11] = 0;
C[12] = e[0];
C[13] = e[1];
C[14] = e[2];
C[15] = 1;
return t;
};
return t;
})();
i.default = s;
cc.Trs = s;
e.exports = i.default;
}), {
"./quat": 171
} ],
175: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.equals = function(t, e) {
return Math.abs(t - e) <= s * Math.max(1, Math.abs(t), Math.abs(e));
};
i.approx = function(t, e, i) {
i = i || s;
return Math.abs(t - e) <= i;
};
i.clamp = function(t, e, i) {
return t < e ? e : t > i ? i : t;
};
i.clamp01 = function(t) {
return t < 0 ? 0 : t > 1 ? 1 : t;
};
i.lerp = function(t, e, i) {
return t + (e - t) * i;
};
i.toRadian = function(t) {
return t * n;
};
i.toDegree = function(t) {
return t * r;
};
i.randomRange = c;
i.randomRangeInt = function(t, e) {
return Math.floor(c(t, e));
};
i.pseudoRandom = l;
i.pseudoRandomRange = u;
i.pseudoRandomRangeInt = function(t, e, i) {
return Math.floor(u(t, e, i));
};
i.nextPow2 = function(t) {
t = (t = (t = (t = (t = --t >> 1 | t) >> 2 | t) >> 4 | t) >> 8 | t) >> 16 | t;
return ++t;
};
i.repeat = h;
i.pingPong = function(t, e) {
t = h(t, 2 * e);
return t = e - Math.abs(t - e);
};
i.inverseLerp = function(t, e, i) {
return (i - t) / (e - t);
};
i.sign = function(t) {
return (t > 0) - (t < 0);
};
i.random = i.FLOAT_BYTES = i.FLOAT_ARRAY_TYPE = i.INT_MIN = i.INT_MAX = i.INT_BITS = i.EPSILON = void 0;
var n = Math.PI / 180, r = 180 / Math.PI, s = 1e-6;
i.EPSILON = s;
i.INT_BITS = 32;
i.INT_MAX = 2147483647;
i.INT_MIN = -1 << 31;
var a = Float32Array;
i.FLOAT_ARRAY_TYPE = a;
i.FLOAT_BYTES = 4;
var o = Math.random;
i.random = o;
function c(t, e) {
return Math.random() * (e - t) + t;
}
function l(t) {
return (t = (9301 * t + 49297) % 233280) / 233280;
}
function u(t, e, i) {
return l(t) * (i - e) + e;
}
function h(t, e) {
return t - Math.floor(t / e) * e;
}
}), {} ],
176: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../platform/js"));
var r = (function() {
function t() {}
var e = t.prototype;
e.clone = function() {
cc.errorID("0100", n.default.getClassName(this) + ".clone");
return null;
};
e.equals = function(t) {
cc.errorID("0100", n.default.getClassName(this) + ".equals");
return !1;
};
e.lerp = function(t, e) {
cc.errorID("0100", n.default.getClassName(this) + ".lerp");
return this.clone();
};
e.set = function(t) {
cc.errorID("0100", n.default.getClassName(this) + ".set");
};
e.toString = function() {
return "" + {};
};
return t;
})();
i.default = r;
n.default.setClassName("cc.ValueType", r);
cc.ValueType = r;
e.exports = i.default;
}), {
"../platform/js": 112
} ],
177: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = o(t("./value-type")), r = o(t("../platform/CCClass")), s = o(t("../utils/misc")), a = t("./utils");
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function l(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = 0, f = 0, _ = (function(t) {
u(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.clone = function(t) {
return new i(t.x, t.y);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
return t;
};
i.set = function(t, e, i) {
t.x = e;
t.y = i;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
return t;
};
i.distance = function(t, e) {
h = e.x - t.x;
f = e.y - t.y;
return Math.sqrt(h * h + f * f);
};
i.squaredDistance = function(t, e) {
h = e.x - t.x;
f = e.y - t.y;
return h * h + f * f;
};
i.len = function(t) {
h = t.x;
f = t.y;
return Math.sqrt(h * h + f * f);
};
i.lengthSqr = function(t) {
h = t.x;
f = t.y;
return h * h + f * f;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
return t;
};
i.inverseSafe = function(t, e) {
h = e.x;
f = e.y;
Math.abs(h) < a.EPSILON ? t.x = 0 : t.x = 1 / h;
Math.abs(f) < a.EPSILON ? t.y = 0 : t.y = 1 / f;
return t;
};
i.normalize = function(t, e) {
h = e.x;
f = e.y;
var i = h * h + f * f;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = h * i;
t.y = f * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
i.cross = function(t, e, i) {
t.x = t.y = 0;
t.z = e.x * i.y - e.y * i.x;
return t;
};
i.lerp = function(t, e, i, n) {
h = e.x;
f = e.y;
t.x = h + n * (i.x - h);
t.y = f + n * (i.y - f);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, a.random)() * Math.PI;
t.x = Math.cos(i) * e;
t.y = Math.sin(i) * e;
return t;
};
i.transformMat3 = function(t, e, i) {
h = e.x;
f = e.y;
var n = i.m;
t.x = n[0] * h + n[3] * f + n[6];
t.y = n[1] * h + n[4] * f + n[7];
return t;
};
i.transformMat4 = function(t, e, i) {
h = e.x;
f = e.y;
var n = i.m;
t.x = n[0] * h + n[4] * f + n[12];
t.y = n[1] * h + n[5] * f + n[13];
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y;
};
i.equals = function(t, e, i) {
void 0 === i && (i = a.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y));
};
i.angle = function(t, e) {
i.normalize(d, t);
i.normalize(p, e);
var n = i.dot(d, p);
return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
return t;
};
l(i, null, [ {
key: "ONE",
get: function() {
return new i(1, 1);
}
}, {
key: "ZERO",
get: function() {
return new i(0, 0);
}
}, {
key: "UP",
get: function() {
return new i(0, 1);
}
}, {
key: "RIGHT",
get: function() {
return new i(1, 0);
}
} ]);
function i(e, n) {
var r;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
(r = t.call(this) || this).mag = i.prototype.len;
r.magSqr = i.prototype.lengthSqr;
r.subSelf = i.prototype.subtract;
r.mulSelf = i.prototype.multiplyScalar;
r.divSelf = i.prototype.divide;
r.scaleSelf = i.prototype.multiply;
r.negSelf = i.prototype.negate;
r.x = void 0;
r.y = void 0;
r.z = 0;
if (e && "object" == typeof e) {
r.y = e.y || 0;
r.x = e.x || 0;
} else {
r.x = e || 0;
r.y = n || 0;
}
return r;
}
e.clone = function() {
return new i(this.x, this.y);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
e.fuzzyEquals = function(t, e) {
return this.x - e <= t.x && t.x <= this.x + e && this.y - e <= t.y && t.y <= this.y + e;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
e.lerp = function(t, e, n) {
n = n || new i();
var r = this.x, s = this.y;
n.x = r + (t.x - r) * e;
n.y = s + (t.y - s) * e;
return n;
};
e.clampf = function(t, e) {
this.x = s.default.clampf(this.x, t.x, e.x);
this.y = s.default.clampf(this.y, t.y, e.y);
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
e.subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
e.cross = function(t) {
return this.x * t.y - this.y * t.x;
};
e.len = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
e.lengthSqr = function() {
return this.x * this.x + this.y * this.y;
};
e.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) return this;
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
e.normalize = function(t) {
(t = t || new i()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
e.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = s.default.clampf(n, -1, 1);
return Math.acos(n);
};
e.signAngle = function(t) {
var e = this.angle(t);
return this.cross(t) < 0 ? -e : e;
};
e.rotate = function(t, e) {
(e = e || new i()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
e.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
e.project = function(t) {
return t.multiplyScalar(this.dot(t) / t.dot(t));
};
e.transformMat4 = function(t, e) {
e = e || new i();
i.transformMat4(e, this, t);
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y);
};
return i;
})(n.default);
i.default = _;
_.sub = _.subtract;
_.mul = _.multiply;
_.scale = _.multiplyScalar;
_.mag = _.len;
_.squaredMagnitude = _.lengthSqr;
_.div = _.divide;
_.ONE_R = _.ONE;
_.ZERO_R = _.ZERO;
_.UP_R = _.UP;
_.RIGHT_R = _.RIGHT;
var d = new _(), p = new _();
r.default.fastDefine("cc.Vec2", _, {
x: 0,
y: 0
});
cc.v2 = function(t, e) {
return new _(t, e);
};
cc.Vec2 = _;
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"../utils/misc": 153,
"./utils": 175,
"./value-type": 176
} ],
178: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = c(t("./value-type")), r = c(t("../platform/CCClass")), s = c(t("../utils/misc")), a = c(t("./vec2")), o = t("./utils");
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function l(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function u(t, e, i) {
e && l(t.prototype, e);
i && l(t, i);
return t;
}
function h(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var f = 0, _ = 0, d = 0, p = (function(t) {
h(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.zero = function(t) {
t.x = 0;
t.y = 0;
t.z = 0;
return t;
};
i.clone = function(t) {
return new i(t.x, t.y, t.z);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
return t;
};
i.set = function(t, e, i, n) {
t.x = e;
t.y = i;
t.z = n;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
t.z = e.z + i.z;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
t.z = e.z - i.z;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
t.z = e.z * i.z;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
t.z = e.z / i.z;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
t.z = Math.ceil(e.z);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
t.z = Math.floor(e.z);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
t.z = Math.min(e.z, i.z);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
t.z = Math.max(e.z, i.z);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
t.z = Math.round(e.z);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
return t;
};
i.distance = function(t, e) {
f = e.x - t.x;
_ = e.y - t.y;
d = e.z - t.z;
return Math.sqrt(f * f + _ * _ + d * d);
};
i.squaredDistance = function(t, e) {
f = e.x - t.x;
_ = e.y - t.y;
d = e.z - t.z;
return f * f + _ * _ + d * d;
};
i.len = function(t) {
f = t.x;
_ = t.y;
d = t.z;
return Math.sqrt(f * f + _ * _ + d * d);
};
i.lengthSqr = function(t) {
f = t.x;
_ = t.y;
d = t.z;
return f * f + _ * _ + d * d;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
t.z = 1 / e.z;
return t;
};
i.inverseSafe = function(t, e) {
f = e.x;
_ = e.y;
d = e.z;
Math.abs(f) < o.EPSILON ? t.x = 0 : t.x = 1 / f;
Math.abs(_) < o.EPSILON ? t.y = 0 : t.y = 1 / _;
Math.abs(d) < o.EPSILON ? t.z = 0 : t.z = 1 / d;
return t;
};
i.normalize = function(t, e) {
f = e.x;
_ = e.y;
d = e.z;
var i = f * f + _ * _ + d * d;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = f * i;
t.y = _ * i;
t.z = d * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z;
};
i.cross = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = i.x, o = i.y, c = i.z;
t.x = r * c - s * o;
t.y = s * a - n * c;
t.z = n * o - r * a;
return t;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, o.random)() * Math.PI, n = 2 * (0, o.random)() - 1, r = Math.sqrt(1 - n * n);
t.x = r * Math.cos(i) * e;
t.y = r * Math.sin(i) * e;
t.z = n * e;
return t;
};
i.transformMat4 = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m, r = n[3] * f + n[7] * _ + n[11] * d + n[15];
r = r ? 1 / r : 1;
t.x = (n[0] * f + n[4] * _ + n[8] * d + n[12]) * r;
t.y = (n[1] * f + n[5] * _ + n[9] * d + n[13]) * r;
t.z = (n[2] * f + n[6] * _ + n[10] * d + n[14]) * r;
return t;
};
i.transformMat4Normal = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m, r = n[3] * f + n[7] * _ + n[11] * d;
r = r ? 1 / r : 1;
t.x = (n[0] * f + n[4] * _ + n[8] * d) * r;
t.y = (n[1] * f + n[5] * _ + n[9] * d) * r;
t.z = (n[2] * f + n[6] * _ + n[10] * d) * r;
return t;
};
i.transformMat3 = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m;
t.x = f * n[0] + _ * n[3] + d * n[6];
t.y = f * n[1] + _ * n[4] + d * n[7];
t.z = f * n[2] + _ * n[5] + d * n[8];
return t;
};
i.transformAffine = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m;
t.x = n[0] * f + n[1] * _ + n[2] * d + n[3];
t.y = n[4] * f + n[5] * _ + n[6] * d + n[7];
t.x = n[8] * f + n[9] * _ + n[10] * d + n[11];
return t;
};
i.transformQuat = function(t, e, i) {
var n = i.w * e.x + i.y * e.z - i.z * e.y, r = i.w * e.y + i.z * e.x - i.x * e.z, s = i.w * e.z + i.x * e.y - i.y * e.x, a = -i.x * e.x - i.y * e.y - i.z * e.z;
t.x = n * i.w + a * -i.x + r * -i.z - s * -i.y;
t.y = r * i.w + a * -i.y + s * -i.x - n * -i.z;
t.z = s * i.w + a * -i.z + n * -i.y - r * -i.x;
return t;
};
i.transformRTS = function(t, e, i, n, r) {
var s = e.x * r.x, a = e.y * r.y, o = e.z * r.z, c = i.w * s + i.y * o - i.z * a, l = i.w * a + i.z * s - i.x * o, u = i.w * o + i.x * a - i.y * s, h = -i.x * s - i.y * a - i.z * o;
t.x = c * i.w + h * -i.x + l * -i.z - u * -i.y + n.x;
t.y = l * i.w + h * -i.y + u * -i.x - c * -i.z + n.y;
t.z = u * i.w + h * -i.z + c * -i.y - l * -i.x + n.z;
return t;
};
i.transformInverseRTS = function(t, e, i, n, r) {
var s = e.x - n.x, a = e.y - n.y, o = e.z - n.z, c = i.w * s - i.y * o + i.z * a, l = i.w * a - i.z * s + i.x * o, u = i.w * o - i.x * a + i.y * s, h = i.x * s + i.y * a + i.z * o;
t.x = (c * i.w + h * i.x + l * i.z - u * i.y) / r.x;
t.y = (l * i.w + h * i.y + u * i.x - c * i.z) / r.y;
t.z = (u * i.w + h * i.z + c * i.y - l * i.x) / r.z;
return t;
};
i.rotateX = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = f, o = _ * r - d * s, c = _ * s + d * r;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.rotateY = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = d * s + f * r, o = _, c = d * r - f * s;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.rotateZ = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = f * r - _ * s, o = f * s + _ * r, c = d;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z;
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
var n = t.x, r = t.y, s = t.z, a = e.x, c = e.y, l = e.z;
return Math.abs(n - a) <= i * Math.max(1, Math.abs(n), Math.abs(a)) && Math.abs(r - c) <= i * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(s - l) <= i * Math.max(1, Math.abs(s), Math.abs(l));
};
i.angle = function(t, e) {
i.normalize(v, t);
i.normalize(g, e);
var n = i.dot(v, g);
return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
};
i.projectOnPlane = function(t, e, n) {
return i.subtract(t, e, i.project(t, e, n));
};
i.project = function(t, e, n) {
var r = i.lengthSqr(n);
return r < 1e-6 ? i.set(t, 0, 0, 0) : i.multiplyScalar(t, n, i.dot(e, n) / r);
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
return t;
};
u(i, null, [ {
key: "ONE",
get: function() {
return new i(1, 1, 1);
}
}, {
key: "ZERO",
get: function() {
return new i();
}
}, {
key: "UP",
get: function() {
return new i(0, 1, 0);
}
}, {
key: "RIGHT",
get: function() {
return new i(1, 0, 0);
}
}, {
key: "FORWARD",
get: function() {
return new i(0, 0, 1);
}
} ]);
function i(e, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
(s = t.call(this) || this).mag = i.prototype.len;
s.magSqr = i.prototype.lengthSqr;
s.subSelf = i.prototype.subtract;
s.mulSelf = i.prototype.multiplyScalar;
s.divSelf = i.prototype.divide;
s.scaleSelf = i.prototype.multiply;
s.negSelf = i.prototype.negate;
s.x = void 0;
s.y = void 0;
s.z = void 0;
s.angle = a.default.prototype.angle;
s.project = a.default.prototype.project;
if (e && "object" == typeof e) {
s.z = e.z;
s.y = e.y;
s.x = e.x;
} else {
s.x = e;
s.y = n;
s.z = r;
}
return s;
}
e.clone = function() {
return new i(this.x, this.y, this.z);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.z === t.z;
};
e.fuzzyEquals = function(t, e) {
return this.x - e <= t.x && t.x <= this.x + e && this.y - e <= t.y && t.y <= this.y + e && this.z - e <= t.z && t.z <= this.z + e;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
};
e.lerp = function(t, e, n) {
n = n || new i();
i.lerp(n, this, t, e);
return n;
};
e.clampf = function(t, e) {
this.x = s.default.clampf(this.x, t.x, e.x);
this.y = s.default.clampf(this.y, t.y, e.y);
this.z = s.default.clampf(this.z, t.z, e.z);
return this;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
e.z = this.z + t.z;
return e;
};
e.subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
this.z -= t.z;
return this;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
this.z *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
this.z *= t.z;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
this.z /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
this.z = -this.z;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y + this.z * t.z;
};
e.cross = function(t, e) {
e = e || new i();
i.cross(e, this, t);
return e;
};
e.len = function() {
return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
e.lengthSqr = function() {
return this.x * this.x + this.y * this.y + this.z * this.z;
};
e.normalizeSelf = function() {
i.normalize(this, this);
return this;
};
e.normalize = function(t) {
t = t || new i();
i.normalize(t, this);
return t;
};
e.transformMat4 = function(t, e) {
e = e || new i();
i.transformMat4(e, this, t);
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y, this.z);
};
e.signAngle = function(t) {
cc.warnID(1408, "vec3.signAngle", "v2.1", "cc.v2(selfVector).signAngle(vector)");
var e = new a.default(this.x, this.y), i = new a.default(t.x, t.y);
return e.signAngle(i);
};
e.rotate = function(t, e) {
cc.warnID(1408, "vec3.rotate", "v2.1", "cc.v2(selfVector).rotate(radians, out)");
return a.default.prototype.rotate.call(this, t, e);
};
e.rotateSelf = function(t) {
cc.warnID(1408, "vec3.rotateSelf", "v2.1", "cc.v2(selfVector).rotateSelf(radians)");
return a.default.prototype.rotateSelf.call(this, t);
};
return i;
})(n.default);
i.default = p;
p.sub = p.subtract;
p.mul = p.multiply;
p.scale = p.multiplyScalar;
p.mag = p.len;
p.squaredMagnitude = p.lengthSqr;
p.div = p.divide;
p.ONE_R = p.ONE;
p.ZERO_R = p.ZERO;
p.UP_R = p.UP;
p.RIGHT_R = p.RIGHT;
p.FRONT_R = p.FORWARD;
var v = new p(), g = new p();
r.default.fastDefine("cc.Vec3", p, {
x: 0,
y: 0,
z: 0
});
cc.v3 = function(t, e, i) {
return new p(t, e, i);
};
cc.Vec3 = p;
e.exports = i.default;
}), {
"../platform/CCClass": 92,
"../utils/misc": 153,
"./utils": 175,
"./value-type": 176,
"./vec2": 177
} ],
179: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.v4 = p;
i.default = void 0;
var n = a(t("../platform/CCClass")), r = a(t("./value-type")), s = t("./utils");
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var u = 0, h = 0, f = 0, _ = 0, d = (function(t) {
l(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.clone = function(t) {
return new i(t.x, t.y, t.z, t.w);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = e.w;
return t;
};
i.set = function(t, e, i, n, r) {
t.x = e;
t.y = i;
t.z = n;
t.w = r;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
t.z = e.z + i.z;
t.w = e.w + i.w;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
t.z = e.z - i.z;
t.w = e.w - i.w;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
t.z = e.z * i.z;
t.w = e.w * i.w;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
t.z = e.z / i.z;
t.w = e.w / i.w;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
t.z = Math.ceil(e.z);
t.w = Math.ceil(e.w);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
t.z = Math.floor(e.z);
t.w = Math.floor(e.w);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
t.z = Math.min(e.z, i.z);
t.w = Math.min(e.w, i.w);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
t.z = Math.max(e.z, i.z);
t.w = Math.max(e.w, i.w);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
t.z = Math.round(e.z);
t.w = Math.round(e.w);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
t.w = e.w + i.w * n;
return t;
};
i.distance = function(t, e) {
var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z, s = e.w - t.w;
return Math.sqrt(i * i + n * n + r * r + s * s);
};
i.squaredDistance = function(t, e) {
var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z, s = e.w - t.w;
return i * i + n * n + r * r + s * s;
};
i.len = function(t) {
u = t.x;
h = t.y;
f = t.z;
_ = t.w;
return Math.sqrt(u * u + h * h + f * f + _ * _);
};
i.lengthSqr = function(t) {
u = t.x;
h = t.y;
f = t.z;
_ = t.w;
return u * u + h * h + f * f + _ * _;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
t.w = -e.w;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
t.z = 1 / e.z;
t.w = 1 / e.w;
return t;
};
i.inverseSafe = function(t, e) {
u = e.x;
h = e.y;
f = e.z;
_ = e.w;
Math.abs(u) < s.EPSILON ? t.x = 0 : t.x = 1 / u;
Math.abs(h) < s.EPSILON ? t.y = 0 : t.y = 1 / h;
Math.abs(f) < s.EPSILON ? t.z = 0 : t.z = 1 / f;
Math.abs(_) < s.EPSILON ? t.w = 0 : t.w = 1 / _;
return t;
};
i.normalize = function(t, e) {
u = e.x;
h = e.y;
f = e.z;
_ = e.w;
var i = u * u + h * h + f * f + _ * _;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = u * i;
t.y = h * i;
t.z = f * i;
t.w = _ * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
t.w = e.w + n * (i.w - e.w);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, s.random)() * Math.PI, n = 2 * (0, s.random)() - 1, r = Math.sqrt(1 - n * n);
t.x = r * Math.cos(i) * e;
t.y = r * Math.sin(i) * e;
t.z = n * e;
t.w = 0;
return t;
};
i.transformMat4 = function(t, e, i) {
u = e.x;
h = e.y;
f = e.z;
_ = e.w;
var n = i.m;
t.x = n[0] * u + n[4] * h + n[8] * f + n[12] * _;
t.y = n[1] * u + n[5] * h + n[9] * f + n[13] * _;
t.z = n[2] * u + n[6] * h + n[10] * f + n[14] * _;
t.w = n[3] * u + n[7] * h + n[11] * f + n[15] * _;
return t;
};
i.transformAffine = function(t, e, i) {
u = e.x;
h = e.y;
f = e.z;
_ = e.w;
var n = i.m;
t.x = n[0] * u + n[1] * h + n[2] * f + n[3] * _;
t.y = n[4] * u + n[5] * h + n[6] * f + n[7] * _;
t.x = n[8] * u + n[9] * h + n[10] * f + n[11] * _;
t.w = e.w;
return t;
};
i.transformQuat = function(t, e, i) {
var n = e.x, r = e.y, s = e.z;
u = i.x;
h = i.y;
f = i.z;
var a = (_ = i.w) * n + h * s - f * r, o = _ * r + f * n - u * s, c = _ * s + u * r - h * n, l = -u * n - h * r - f * s;
t.x = a * _ + l * -u + o * -f - c * -h;
t.y = o * _ + l * -h + c * -u - a * -f;
t.z = c * _ + l * -f + a * -h - o * -u;
t.w = e.w;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
};
i.equals = function(t, e, i) {
void 0 === i && (i = s.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y)) && Math.abs(t.z - e.z) <= i * Math.max(1, Math.abs(t.z), Math.abs(e.z)) && Math.abs(t.w - e.w) <= i * Math.max(1, Math.abs(t.w), Math.abs(e.w));
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
t[i + 3] = e.w;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
t.w = e[i + 3];
return t;
};
c(i, null, [ {
key: "ZERO",
get: function() {
return new i(0, 0, 0, 0);
}
}, {
key: "ONE",
get: function() {
return new i(1, 1, 1, 1);
}
}, {
key: "NEG_ONE",
get: function() {
return new i(-1, -1, -1, -1);
}
} ]);
function i(e, n, r, s) {
var a;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 0);
(a = t.call(this) || this).mag = i.prototype.len;
a.magSqr = i.prototype.lengthSqr;
a.subSelf = i.prototype.subtract;
a.mulSelf = i.prototype.multiplyScalar;
a.divSelf = i.prototype.divide;
a.scaleSelf = i.prototype.multiply;
a.negSelf = i.prototype.negate;
a.x = void 0;
a.y = void 0;
a.z = void 0;
a.w = void 0;
if (e && "object" == typeof e) {
a.w = e.w;
a.z = e.z;
a.y = e.y;
a.x = e.x;
} else {
a.x = e;
a.y = n;
a.z = r;
a.w = s;
}
return a;
}
e.clone = function() {
return new i(this.x, this.y, this.z, this.w);
};
e.set = function(t, e, i, n) {
if (t && "object" == typeof t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
this.w = t.w;
} else {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.w = n || 0;
}
return this;
};
e.equals = function(t, e) {
void 0 === e && (e = s.EPSILON);
return Math.abs(this.x - t.x) <= e * Math.max(1, Math.abs(this.x), Math.abs(t.x)) && Math.abs(this.y - t.y) <= e * Math.max(1, Math.abs(this.y), Math.abs(t.y)) && Math.abs(this.z - t.z) <= e * Math.max(1, Math.abs(this.z), Math.abs(t.z)) && Math.abs(this.w - t.w) <= e * Math.max(1, Math.abs(this.w), Math.abs(t.w));
};
e.equals4f = function(t, e, i, n, r) {
void 0 === r && (r = s.EPSILON);
return Math.abs(this.x - t) <= r * Math.max(1, Math.abs(this.x), Math.abs(t)) && Math.abs(this.y - e) <= r * Math.max(1, Math.abs(this.y), Math.abs(e)) && Math.abs(this.z - i) <= r * Math.max(1, Math.abs(this.z), Math.abs(i)) && Math.abs(this.w - n) <= r * Math.max(1, Math.abs(this.w), Math.abs(n));
};
e.strictEquals = function(t) {
return this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
};
e.strictEquals4f = function(t, e, i, n) {
return this.x === t && this.y === e && this.z === i && this.w === n;
};
e.lerp = function(t, e) {
u = this.x;
h = this.y;
f = this.z;
_ = this.w;
this.x = u + e * (t.x - u);
this.y = h + e * (t.y - h);
this.z = f + e * (t.z - f);
this.w = _ + e * (t.w - _);
return this;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ", " + this.w.toFixed(2) + ")";
};
e.clampf = function(t, e) {
this.x = (0, s.clamp)(this.x, t.x, e.x);
this.y = (0, s.clamp)(this.y, t.y, e.y);
this.z = (0, s.clamp)(this.z, t.z, e.z);
this.w = (0, s.clamp)(this.w, t.w, e.w);
return this;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
this.w += t.w;
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
e.z = this.z + t.z;
e.w = this.w + t.w;
return e;
};
e.subtract = function(t, e) {
(e = e || new i()).x = this.x - t.x;
e.y = this.y - t.y;
e.z = this.z - t.z;
e.w = this.w - t.w;
return e;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
this.z *= t;
this.w *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
this.z *= t.z;
this.w *= t.w;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
this.z /= t;
this.w /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
this.z = -this.z;
this.w = -this.w;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
};
e.cross = function(t, e) {
e = e || new i();
var n = this.x, r = this.y, s = this.z, a = t.x, o = t.y, c = t.z;
e.x = r * c - s * o;
e.y = s * a - n * c;
e.z = n * o - r * a;
return e;
};
e.len = function() {
var t = this.x, e = this.y, i = this.z, n = this.w;
return Math.sqrt(t * t + e * e + i * i + n * n);
};
e.lengthSqr = function() {
var t = this.x, e = this.y, i = this.z, n = this.w;
return t * t + e * e + i * i + n * n;
};
e.normalizeSelf = function() {
this.normalize(this);
return this;
};
e.normalize = function(t) {
t = t || new i();
u = this.x;
h = this.y;
f = this.z;
_ = this.w;
var e = u * u + h * h + f * f + _ * _;
if (e > 0) {
e = 1 / Math.sqrt(e);
t.x = u * e;
t.y = h * e;
t.z = f * e;
t.w = _ * e;
}
return t;
};
e.transformMat4 = function(t, e) {
e = e || new i();
u = this.x;
h = this.y;
f = this.z;
_ = this.w;
var n = t.m;
e.x = n[0] * u + n[4] * h + n[8] * f + n[12] * _;
e.y = n[1] * u + n[5] * h + n[9] * f + n[13] * _;
e.z = n[2] * u + n[6] * h + n[10] * f + n[14] * _;
e.w = n[3] * u + n[7] * h + n[11] * f + n[15] * _;
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y, this.z, this.w);
};
return i;
})(r.default);
i.default = d;
d.sub = d.subtract;
d.mul = d.multiply;
d.div = d.divide;
d.scale = d.multiplyScalar;
d.mag = d.len;
d.squaredMagnitude = d.lengthSqr;
d.ZERO_R = d.ZERO;
d.ONE_R = d.ONE;
d.NEG_ONE_R = d.NEG_ONE;
n.default.fastDefine("cc.Vec4", d, {
x: 0,
y: 0,
z: 0,
w: 0
});
function p(t, e, i, n) {
return new d(t, e, i, n);
}
cc.v4 = p;
cc.Vec4 = d;
}), {
"../platform/CCClass": 92,
"./utils": 175,
"./value-type": 176
} ],
180: [ (function(t, e, i) {
"use strict";
cc.js;
}), {} ],
181: [ (function(t, e, i) {
"use strict";
t("./core/CCGame");
t("./actions");
}), {
"./actions": void 0,
"./core/CCGame": 5
} ],
182: [ (function(t, e, i) {
"use strict";
var n = t("../core/assets/CCAsset"), r = t("../core/assets/CCSpriteFrame"), s = cc.Class({
name: "cc.ParticleAsset",
extends: n,
properties: {
spriteFrame: {
default: null,
type: r
}
}
});
cc.ParticleAsset = e.exports = s;
}), {
"../core/assets/CCAsset": 10,
"../core/assets/CCSpriteFrame": 22
} ],
183: [ (function(t, e, i) {
"use strict";
var n, r, s, a = 512, o = 513, c = 514, l = 515, u = 516, h = 517, f = 518, _ = 519, d = 32774, p = 32778, v = 32779, g = 0, m = 1, y = 768, E = 769, C = 774, A = 775, T = 770, x = 771, S = 772, b = 773, R = 32769, L = 32770, w = 32771, I = 32772, O = 776, D = 7680, M = 7681, N = 7682, P = 34055, F = 7683, z = 34056, B = 5386, U = 0, k = 1028, V = 1029;
(function(t) {
t[t.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
t[t.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
t[t.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
})(n || (n = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.BUFFER = 1] = "BUFFER";
t[t.TEXTURE = 2] = "TEXTURE";
t[t.TEXTURE_VIEW = 3] = "TEXTURE_VIEW";
t[t.RENDER_PASS = 4] = "RENDER_PASS";
t[t.FRAMEBUFFER = 5] = "FRAMEBUFFER";
t[t.SAMPLER = 6] = "SAMPLER";
t[t.SHADER = 7] = "SHADER";
t[t.PIPELINE_LAYOUT = 8] = "PIPELINE_LAYOUT";
t[t.PIPELINE_STATE = 9] = "PIPELINE_STATE";
t[t.BINDING_LAYOUT = 10] = "BINDING_LAYOUT";
t[t.INPUT_ASSEMBLER = 11] = "INPUT_ASSEMBLER";
t[t.COMMAND_ALLOCATOR = 12] = "COMMAND_ALLOCATOR";
t[t.COMMAND_BUFFER = 13] = "COMMAND_BUFFER";
t[t.QUEUE = 14] = "QUEUE";
t[t.WINDOW = 15] = "WINDOW";
})(r || (r = {}));
(function(t) {
t[t.UNREADY = 0] = "UNREADY";
t[t.FAILED = 1] = "FAILED";
t[t.SUCCESS = 2] = "SUCCESS";
})(s || (s = {}));
var H, G, W, j, Y, X, q, K, Z, Q, $, J, tt, et, it, nt, rt, st, at, ot, ct, lt, ut, ht, ft, _t, dt, pt, vt, gt, mt, yt, Et, Ct, At;
(function() {
function t(t) {
this._gfxType = r.UNKNOWN;
this._status = s.UNREADY;
this._gfxType = t;
}
Object.defineProperty(t.prototype, "gfxType", {
get: function() {
return this._gfxType;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "status", {
get: function() {
return this._status;
},
enumerable: !0,
configurable: !0
});
})();
(function(t) {
t.ATTR_POSITION = "a_position";
t.ATTR_NORMAL = "a_normal";
t.ATTR_TANGENT = "a_tangent";
t.ATTR_BITANGENT = "a_bitangent";
t.ATTR_WEIGHTS = "a_weights";
t.ATTR_JOINTS = "a_joints";
t.ATTR_COLOR = "a_color";
t.ATTR_COLOR1 = "a_color1";
t.ATTR_COLOR2 = "a_color2";
t.ATTR_TEX_COORD = "a_texCoord";
t.ATTR_TEX_COORD1 = "a_texCoord1";
t.ATTR_TEX_COORD2 = "a_texCoord2";
t.ATTR_TEX_COORD3 = "a_texCoord3";
t.ATTR_TEX_COORD4 = "a_texCoord4";
t.ATTR_TEX_COORD5 = "a_texCoord5";
t.ATTR_TEX_COORD6 = "a_texCoord6";
t.ATTR_TEX_COORD7 = "a_texCoord7";
t.ATTR_TEX_COORD8 = "a_texCoord8";
})(H || (H = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.BOOL = 1] = "BOOL";
t[t.BOOL2 = 2] = "BOOL2";
t[t.BOOL3 = 3] = "BOOL3";
t[t.BOOL4 = 4] = "BOOL4";
t[t.INT = 5] = "INT";
t[t.INT2 = 6] = "INT2";
t[t.INT3 = 7] = "INT3";
t[t.INT4 = 8] = "INT4";
t[t.UINT = 9] = "UINT";
t[t.UINT2 = 10] = "UINT2";
t[t.UINT3 = 11] = "UINT3";
t[t.UINT4 = 12] = "UINT4";
t[t.FLOAT = 13] = "FLOAT";
t[t.FLOAT2 = 14] = "FLOAT2";
t[t.FLOAT3 = 15] = "FLOAT3";
t[t.FLOAT4 = 16] = "FLOAT4";
t[t.COLOR4 = 17] = "COLOR4";
t[t.MAT2 = 18] = "MAT2";
t[t.MAT2X3 = 19] = "MAT2X3";
t[t.MAT2X4 = 20] = "MAT2X4";
t[t.MAT3X2 = 21] = "MAT3X2";
t[t.MAT3 = 22] = "MAT3";
t[t.MAT3X4 = 23] = "MAT3X4";
t[t.MAT4X2 = 24] = "MAT4X2";
t[t.MAT4X3 = 25] = "MAT4X3";
t[t.MAT4 = 26] = "MAT4";
t[t.SAMPLER1D = 27] = "SAMPLER1D";
t[t.SAMPLER1D_ARRAY = 28] = "SAMPLER1D_ARRAY";
t[t.SAMPLER2D = 29] = "SAMPLER2D";
t[t.SAMPLER2D_ARRAY = 30] = "SAMPLER2D_ARRAY";
t[t.SAMPLER3D = 31] = "SAMPLER3D";
t[t.SAMPLER_CUBE = 32] = "SAMPLER_CUBE";
t[t.COUNT = 33] = "COUNT";
})(G || (G = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.A8 = 1] = "A8";
t[t.L8 = 2] = "L8";
t[t.LA8 = 3] = "LA8";
t[t.R8 = 4] = "R8";
t[t.R8SN = 5] = "R8SN";
t[t.R8UI = 6] = "R8UI";
t[t.R8I = 7] = "R8I";
t[t.R16F = 8] = "R16F";
t[t.R16UI = 9] = "R16UI";
t[t.R16I = 10] = "R16I";
t[t.R32F = 11] = "R32F";
t[t.R32UI = 12] = "R32UI";
t[t.R32I = 13] = "R32I";
t[t.RG8 = 14] = "RG8";
t[t.RG8SN = 15] = "RG8SN";
t[t.RG8UI = 16] = "RG8UI";
t[t.RG8I = 17] = "RG8I";
t[t.RG16F = 18] = "RG16F";
t[t.RG16UI = 19] = "RG16UI";
t[t.RG16I = 20] = "RG16I";
t[t.RG32F = 21] = "RG32F";
t[t.RG32UI = 22] = "RG32UI";
t[t.RG32I = 23] = "RG32I";
t[t.RGB8 = 24] = "RGB8";
t[t.SRGB8 = 25] = "SRGB8";
t[t.RGB8SN = 26] = "RGB8SN";
t[t.RGB8UI = 27] = "RGB8UI";
t[t.RGB8I = 28] = "RGB8I";
t[t.RGB16F = 29] = "RGB16F";
t[t.RGB16UI = 30] = "RGB16UI";
t[t.RGB16I = 31] = "RGB16I";
t[t.RGB32F = 32] = "RGB32F";
t[t.RGB32UI = 33] = "RGB32UI";
t[t.RGB32I = 34] = "RGB32I";
t[t.RGBA8 = 35] = "RGBA8";
t[t.SRGB8_A8 = 36] = "SRGB8_A8";
t[t.RGBA8SN = 37] = "RGBA8SN";
t[t.RGBA8UI = 38] = "RGBA8UI";
t[t.RGBA8I = 39] = "RGBA8I";
t[t.RGBA16F = 40] = "RGBA16F";
t[t.RGBA16UI = 41] = "RGBA16UI";
t[t.RGBA16I = 42] = "RGBA16I";
t[t.RGBA32F = 43] = "RGBA32F";
t[t.RGBA32UI = 44] = "RGBA32UI";
t[t.RGBA32I = 45] = "RGBA32I";
t[t.R5G6B5 = 46] = "R5G6B5";
t[t.R11G11B10F = 47] = "R11G11B10F";
t[t.RGB5A1 = 48] = "RGB5A1";
t[t.RGBA4 = 49] = "RGBA4";
t[t.RGB10A2 = 50] = "RGB10A2";
t[t.RGB10A2UI = 51] = "RGB10A2UI";
t[t.RGB9E5 = 52] = "RGB9E5";
t[t.D16 = 53] = "D16";
t[t.D16S8 = 54] = "D16S8";
t[t.D24 = 55] = "D24";
t[t.D24S8 = 56] = "D24S8";
t[t.D32F = 57] = "D32F";
t[t.D32F_S8 = 58] = "D32F_S8";
t[t.BC1 = 59] = "BC1";
t[t.BC1_ALPHA = 60] = "BC1_ALPHA";
t[t.BC1_SRGB = 61] = "BC1_SRGB";
t[t.BC1_SRGB_ALPHA = 62] = "BC1_SRGB_ALPHA";
t[t.BC2 = 63] = "BC2";
t[t.BC2_SRGB = 64] = "BC2_SRGB";
t[t.BC3 = 65] = "BC3";
t[t.BC3_SRGB = 66] = "BC3_SRGB";
t[t.BC4 = 67] = "BC4";
t[t.BC4_SNORM = 68] = "BC4_SNORM";
t[t.BC5 = 69] = "BC5";
t[t.BC5_SNORM = 70] = "BC5_SNORM";
t[t.BC6H_UF16 = 71] = "BC6H_UF16";
t[t.BC6H_SF16 = 72] = "BC6H_SF16";
t[t.BC7 = 73] = "BC7";
t[t.BC7_SRGB = 74] = "BC7_SRGB";
t[t.ETC_RGB8 = 75] = "ETC_RGB8";
t[t.ETC2_RGB8 = 76] = "ETC2_RGB8";
t[t.ETC2_SRGB8 = 77] = "ETC2_SRGB8";
t[t.ETC2_RGB8_A1 = 78] = "ETC2_RGB8_A1";
t[t.ETC2_SRGB8_A1 = 79] = "ETC2_SRGB8_A1";
t[t.ETC2_RGBA8 = 80] = "ETC2_RGBA8";
t[t.ETC2_SRGB8_A8 = 81] = "ETC2_SRGB8_A8";
t[t.EAC_R11 = 82] = "EAC_R11";
t[t.EAC_R11SN = 83] = "EAC_R11SN";
t[t.EAC_RG11 = 84] = "EAC_RG11";
t[t.EAC_RG11SN = 85] = "EAC_RG11SN";
t[t.PVRTC_RGB2 = 86] = "PVRTC_RGB2";
t[t.PVRTC_RGBA2 = 87] = "PVRTC_RGBA2";
t[t.PVRTC_RGB4 = 88] = "PVRTC_RGB4";
t[t.PVRTC_RGBA4 = 89] = "PVRTC_RGBA4";
t[t.PVRTC2_2BPP = 90] = "PVRTC2_2BPP";
t[t.PVRTC2_4BPP = 91] = "PVRTC2_4BPP";
})(W || (W = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.TRANSFER_SRC = 1] = "TRANSFER_SRC";
t[t.TRANSFER_DST = 2] = "TRANSFER_DST";
t[t.INDEX = 4] = "INDEX";
t[t.VERTEX = 8] = "VERTEX";
t[t.UNIFORM = 16] = "UNIFORM";
t[t.STORAGE = 32] = "STORAGE";
t[t.INDIRECT = 64] = "INDIRECT";
})(j || (j = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.DEVICE = 1] = "DEVICE";
t[t.HOST = 2] = "HOST";
})(Y || (Y = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.READ = 1] = "READ";
t[t.WRITE = 2] = "WRITE";
})(X || (X = {}));
(function(t) {
t[t.POINT_LIST = 0] = "POINT_LIST";
t[t.LINE_LIST = 1] = "LINE_LIST";
t[t.LINE_STRIP = 2] = "LINE_STRIP";
t[t.LINE_LOOP = 3] = "LINE_LOOP";
t[t.LINE_LIST_ADJACENCY = 4] = "LINE_LIST_ADJACENCY";
t[t.LINE_STRIP_ADJACENCY = 5] = "LINE_STRIP_ADJACENCY";
t[t.ISO_LINE_LIST = 6] = "ISO_LINE_LIST";
t[t.TRIANGLE_LIST = 7] = "TRIANGLE_LIST";
t[t.TRIANGLE_STRIP = 8] = "TRIANGLE_STRIP";
t[t.TRIANGLE_FAN = 9] = "TRIANGLE_FAN";
t[t.TRIANGLE_LIST_ADJACENCY = 10] = "TRIANGLE_LIST_ADJACENCY";
t[t.TRIANGLE_STRIP_ADJACENCY = 11] = "TRIANGLE_STRIP_ADJACENCY";
t[t.TRIANGLE_PATCH_ADJACENCY = 12] = "TRIANGLE_PATCH_ADJACENCY";
t[t.QUAD_PATCH_LIST = 13] = "QUAD_PATCH_LIST";
})(q || (q = {}));
(function(t) {
t[t.FILL = 0] = "FILL";
t[t.POINT = 1] = "POINT";
t[t.LINE = 2] = "LINE";
})(K || (K = {}));
(function(t) {
t[t.GOURAND = 0] = "GOURAND";
t[t.FLAT = 1] = "FLAT";
})(Z || (Z = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.FRONT = 1] = "FRONT";
t[t.BACK = 2] = "BACK";
})(Q || (Q = {}));
(function(t) {
t[t.NEVER = 0] = "NEVER";
t[t.LESS = 1] = "LESS";
t[t.EQUAL = 2] = "EQUAL";
t[t.LESS_EQUAL = 3] = "LESS_EQUAL";
t[t.GREATER = 4] = "GREATER";
t[t.NOT_EQUAL = 5] = "NOT_EQUAL";
t[t.GREATER_EQUAL = 6] = "GREATER_EQUAL";
t[t.ALWAYS = 7] = "ALWAYS";
})($ || ($ = {}));
(function(t) {
t[t.ZERO = 0] = "ZERO";
t[t.KEEP = 1] = "KEEP";
t[t.REPLACE = 2] = "REPLACE";
t[t.INCR = 3] = "INCR";
t[t.DECR = 4] = "DECR";
t[t.INVERT = 5] = "INVERT";
t[t.INCR_WRAP = 6] = "INCR_WRAP";
t[t.DECR_WRAP = 7] = "DECR_WRAP";
})(J || (J = {}));
(function(t) {
t[t.ADD = 0] = "ADD";
t[t.SUB = 1] = "SUB";
t[t.REV_SUB = 2] = "REV_SUB";
t[t.MIN = 3] = "MIN";
t[t.MAX = 4] = "MAX";
})(tt || (tt = {}));
(function(t) {
t[t.ZERO = 0] = "ZERO";
t[t.ONE = 1] = "ONE";
t[t.SRC_ALPHA = 2] = "SRC_ALPHA";
t[t.DST_ALPHA = 3] = "DST_ALPHA";
t[t.ONE_MINUS_SRC_ALPHA = 4] = "ONE_MINUS_SRC_ALPHA";
t[t.ONE_MINUS_DST_ALPHA = 5] = "ONE_MINUS_DST_ALPHA";
t[t.SRC_COLOR = 6] = "SRC_COLOR";
t[t.DST_COLOR = 7] = "DST_COLOR";
t[t.ONE_MINUS_SRC_COLOR = 8] = "ONE_MINUS_SRC_COLOR";
t[t.ONE_MINUS_DST_COLOR = 9] = "ONE_MINUS_DST_COLOR";
t[t.SRC_ALPHA_SATURATE = 10] = "SRC_ALPHA_SATURATE";
t[t.CONSTANT_COLOR = 11] = "CONSTANT_COLOR";
t[t.ONE_MINUS_CONSTANT_COLOR = 12] = "ONE_MINUS_CONSTANT_COLOR";
t[t.CONSTANT_ALPHA = 13] = "CONSTANT_ALPHA";
t[t.ONE_MINUS_CONSTANT_ALPHA = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(et || (et = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.R = 1] = "R";
t[t.G = 2] = "G";
t[t.B = 4] = "B";
t[t.A = 8] = "A";
t[t.ALL = 15] = "ALL";
})(it || (it = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.POINT = 1] = "POINT";
t[t.LINEAR = 2] = "LINEAR";
t[t.ANISOTROPIC = 3] = "ANISOTROPIC";
})(nt || (nt = {}));
(function(t) {
t[t.WRAP = 0] = "WRAP";
t[t.MIRROR = 1] = "MIRROR";
t[t.CLAMP = 2] = "CLAMP";
t[t.BORDER = 3] = "BORDER";
})(rt || (rt = {}));
(function(t) {
t[t.TEX1D = 0] = "TEX1D";
t[t.TEX2D = 1] = "TEX2D";
t[t.TEX3D = 2] = "TEX3D";
})(st || (st = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.TRANSFER_SRC = 1] = "TRANSFER_SRC";
t[t.TRANSFER_DST = 2] = "TRANSFER_DST";
t[t.SAMPLED = 4] = "SAMPLED";
t[t.STORAGE = 8] = "STORAGE";
t[t.COLOR_ATTACHMENT = 16] = "COLOR_ATTACHMENT";
t[t.DEPTH_STENCIL_ATTACHMENT = 32] = "DEPTH_STENCIL_ATTACHMENT";
t[t.TRANSIENT_ATTACHMENT = 64] = "TRANSIENT_ATTACHMENT";
t[t.INPUT_ATTACHMENT = 128] = "INPUT_ATTACHMENT";
})(at || (at = {}));
(function(t) {
t[t.X1 = 0] = "X1";
t[t.X2 = 1] = "X2";
t[t.X4 = 2] = "X4";
t[t.X8 = 3] = "X8";
t[t.X16 = 4] = "X16";
t[t.X32 = 5] = "X32";
t[t.X64 = 6] = "X64";
})(ot || (ot = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.GEN_MIPMAP = 1] = "GEN_MIPMAP";
t[t.CUBEMAP = 2] = "CUBEMAP";
t[t.BAKUP_BUFFER = 4] = "BAKUP_BUFFER";
})(ct || (ct = {}));
(function(t) {
t[t.TV1D = 0] = "TV1D";
t[t.TV2D = 1] = "TV2D";
t[t.TV3D = 2] = "TV3D";
t[t.CUBE = 3] = "CUBE";
t[t.TV1D_ARRAY = 4] = "TV1D_ARRAY";
t[t.TV2D_ARRAY = 5] = "TV2D_ARRAY";
})(lt || (lt = {}));
(function(t) {
t[t.VERTEX = 0] = "VERTEX";
t[t.HULL = 1] = "HULL";
t[t.DOMAIN = 2] = "DOMAIN";
t[t.GEOMETRY = 3] = "GEOMETRY";
t[t.FRAGMENT = 4] = "FRAGMENT";
t[t.COMPUTE = 5] = "COMPUTE";
t[t.COUNT = 6] = "COUNT";
})(ut || (ut = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.UNIFORM_BUFFER = 1] = "UNIFORM_BUFFER";
t[t.SAMPLER = 2] = "SAMPLER";
t[t.STORAGE_BUFFER = 3] = "STORAGE_BUFFER";
})(ht || (ht = {}));
(function(t) {
t[t.PRIMARY = 0] = "PRIMARY";
t[t.SECONDARY = 1] = "SECONDARY";
})(ft || (ft = {}));
(function(t) {
t[t.LOAD = 0] = "LOAD";
t[t.CLEAR = 1] = "CLEAR";
t[t.DISCARD = 2] = "DISCARD";
})(_t || (_t = {}));
(function(t) {
t[t.STORE = 0] = "STORE";
t[t.DISCARD = 1] = "DISCARD";
})(dt || (dt = {}));
(function(t) {
t[t.UNDEFINED = 0] = "UNDEFINED";
t[t.GENERAL = 1] = "GENERAL";
t[t.COLOR_ATTACHMENT_OPTIMAL = 2] = "COLOR_ATTACHMENT_OPTIMAL";
t[t.DEPTH_STENCIL_ATTACHMENT_OPTIMAL = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
t[t.DEPTH_STENCIL_READONLY_OPTIMAL = 4] = "DEPTH_STENCIL_READONLY_OPTIMAL";
t[t.SHADER_READONLY_OPTIMAL = 5] = "SHADER_READONLY_OPTIMAL";
t[t.TRANSFER_SRC_OPTIMAL = 6] = "TRANSFER_SRC_OPTIMAL";
t[t.TRANSFER_DST_OPTIMAL = 7] = "TRANSFER_DST_OPTIMAL";
t[t.PREINITIALIZED = 8] = "PREINITIALIZED";
t[t.PRESENT_SRC = 9] = "PRESENT_SRC";
})(pt || (pt = {}));
(function(t) {
t[t.GRAPHICS = 0] = "GRAPHICS";
t[t.COMPUTE = 1] = "COMPUTE";
t[t.RAY_TRACING = 2] = "RAY_TRACING";
})(vt || (vt = {}));
(function(t) {
t[t.VIEWPORT = 0] = "VIEWPORT";
t[t.SCISSOR = 1] = "SCISSOR";
t[t.LINE_WIDTH = 2] = "LINE_WIDTH";
t[t.DEPTH_BIAS = 3] = "DEPTH_BIAS";
t[t.BLEND_CONSTANTS = 4] = "BLEND_CONSTANTS";
t[t.DEPTH_BOUNDS = 5] = "DEPTH_BOUNDS";
t[t.STENCIL_WRITE_MASK = 6] = "STENCIL_WRITE_MASK";
t[t.STENCIL_COMPARE_MASK = 7] = "STENCIL_COMPARE_MASK";
})(gt || (gt = {}));
(function(t) {
t[t.FRONT = 0] = "FRONT";
t[t.BACK = 1] = "BACK";
t[t.ALL = 2] = "ALL";
})(mt || (mt = {}));
(function(t) {
t[t.GRAPHICS = 0] = "GRAPHICS";
t[t.COMPUTE = 1] = "COMPUTE";
t[t.TRANSFER = 2] = "TRANSFER";
})(yt || (yt = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.COLOR = 1] = "COLOR";
t[t.DEPTH = 2] = "DEPTH";
t[t.STENCIL = 4] = "STENCIL";
t[t.DEPTH_STENCIL = 6] = "DEPTH_STENCIL";
t[t.ALL = 7] = "ALL";
})(Et || (Et = {}));
(function(t) {
t[t.DEFAULT = 100] = "DEFAULT";
})(Ct || (Ct = {}));
(function(t) {
t[t.MIN = 0] = "MIN";
t[t.MAX = 255] = "MAX";
t[t.DEFAULT = 128] = "DEFAULT";
})(At || (At = {}));
var Tt, xt, St, bt;
(function(t) {
t[t.UBO_GLOBAL = 23] = "UBO_GLOBAL";
t[t.UBO_SHADOW = 22] = "UBO_SHADOW";
t[t.UBO_LOCAL = 21] = "UBO_LOCAL";
t[t.UBO_FORWARD_LIGHTS = 20] = "UBO_FORWARD_LIGHTS";
t[t.UBO_SKINNING = 19] = "UBO_SKINNING";
t[t.UBO_SKINNING_TEXTURE = 18] = "UBO_SKINNING_TEXTURE";
t[t.UBO_UI = 17] = "UBO_UI";
t[t.SAMPLER_JOINTS = 25] = "SAMPLER_JOINTS";
t[t.SAMPLER_ENVIRONMENT = 26] = "SAMPLER_ENVIRONMENT";
t[t.CUSTUM_UBO_BINDING_END_POINT = 17] = "CUSTUM_UBO_BINDING_END_POINT";
t[t.CUSTOM_SAMPLER_BINDING_START_POINT = 30] = "CUSTOM_SAMPLER_BINDING_START_POINT";
})(Tt || (Tt = {}));
(function(t) {
t[t.minFilter = 0] = "minFilter";
t[t.magFilter = 1] = "magFilter";
t[t.mipFilter = 2] = "mipFilter";
t[t.addressU = 3] = "addressU";
t[t.addressV = 4] = "addressV";
t[t.addressW = 5] = "addressW";
t[t.maxAnisotropy = 6] = "maxAnisotropy";
t[t.cmpFunc = 7] = "cmpFunc";
t[t.minLOD = 8] = "minLOD";
t[t.maxLOD = 9] = "maxLOD";
t[t.mipLODBias = 10] = "mipLODBias";
t[t.borderColor = 11] = "borderColor";
t[t.total = 15] = "total";
})(bt || (bt = {}));
var Rt = {};
Rt[Rt.bool = G.BOOL] = "bool";
Rt[Rt.int = G.INT] = "int";
Rt[Rt.ivec2 = G.INT2] = "ivec2invTypeParams";
Rt[Rt.ivec3 = G.INT3] = "ivec3";
Rt[Rt.ivec4 = G.INT4] = "ivec4";
Rt[Rt.float = G.FLOAT] = "float";
Rt[Rt.vec2 = G.FLOAT2] = "vec2";
Rt[Rt.vec3 = G.FLOAT3] = "vec3";
Rt[Rt.vec4 = G.FLOAT4] = "vec4";
Rt[Rt.mat2 = G.MAT2] = "mat2";
Rt[Rt.mat3 = G.MAT3] = "mat3";
Rt[Rt.mat4 = G.MAT4] = "mat4";
Rt[Rt.sampler2D = G.SAMPLER2D] = "sampler2D";
Rt[Rt.samplerCube = G.SAMPLER_CUBE] = "samplerCube";
var Lt = ((xt = {})[G.BOOL] = 4, xt[G.INT] = 4, xt[G.INT2] = 8, xt[G.INT3] = 12, 
xt[G.INT4] = 16, xt[G.FLOAT] = 4, xt[G.FLOAT2] = 8, xt[G.FLOAT3] = 12, xt[G.FLOAT4] = 16, 
xt[G.MAT2] = 16, xt[G.MAT3] = 36, xt[G.MAT4] = 64, xt[G.SAMPLER2D] = 4, xt[G.SAMPLER_CUBE] = 4, 
xt), wt = ((St = {})[G.BOOL] = W.R32I, St[G.INT] = W.R32I, St[G.INT2] = W.RG32I, 
St[G.INT3] = W.RGB32I, St[G.INT4] = W.RGBA32I, St[G.FLOAT] = W.R32F, St[G.FLOAT2] = W.RG32F, 
St[G.FLOAT3] = W.RGB32F, St[G.FLOAT4] = W.RGBA32F, St), It = {
BACK: V,
FRONT: k,
NONE: U,
ADD: d,
SUB: p,
REV_SUB: v,
ZERO: g,
ONE: m,
SRC_COLOR: y,
ONE_MINUS_SRC_COLOR: E,
DST_COLOR: C,
ONE_MINUS_DST_COLOR: A,
SRC_ALPHA: T,
ONE_MINUS_SRC_ALPHA: x,
DST_ALPHA: S,
ONE_MINUS_DST_ALPHA: b,
CONSTANT_COLOR: R,
ONE_MINUS_CONSTANT_COLOR: L,
CONSTANT_ALPHA: w,
ONE_MINUS_CONSTANT_ALPHA: I,
SRC_ALPHA_SATURATE: O,
NEVER: a,
LESS: o,
EQUAL: c,
LEQUAL: l,
GREATER: u,
NOTEQUAL: h,
GEQUAL: f,
ALWAYS: _,
KEEP: D,
REPLACE: M,
INCR: N,
INCR_WRAP: P,
DECR: F,
DECR_WRAP: z,
INVERT: B
};
Object.assign(It, Ct);
var Ot = {
murmurhash2_32_gc: function(t, e) {
for (var i, n = t.length, r = e ^ n, s = 0; n >= 4; ) {
i = 1540483477 * (65535 & (i = 255 & t.charCodeAt(s) | (255 & t.charCodeAt(++s)) << 8 | (255 & t.charCodeAt(++s)) << 16 | (255 & t.charCodeAt(++s)) << 24)) + ((1540483477 * (i >>> 16) & 65535) << 16);
r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (i = 1540483477 * (65535 & (i ^= i >>> 24)) + ((1540483477 * (i >>> 16) & 65535) << 16));
n -= 4;
++s;
}
switch (n) {
case 3:
r ^= (255 & t.charCodeAt(s + 2)) << 16;

case 2:
r ^= (255 & t.charCodeAt(s + 1)) << 8;

case 1:
r = 1540483477 * (65535 & (r ^= 255 & t.charCodeAt(s))) + ((1540483477 * (r >>> 16) & 65535) << 16);
}
r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16);
return (r ^= r >>> 15) >>> 0;
},
SamplerInfoIndex: bt,
effectStructure: {
$techniques: [ {
$passes: [ {
depthStencilState: {},
rasterizerState: {},
blendState: {
targets: [ {} ]
},
properties: {
any: {
sampler: {},
inspector: {}
}
}
} ]
} ]
},
typeMap: Rt,
sizeMap: Lt,
formatMap: wt,
passParams: It,
RenderQueue: {
OPAQUE: 0,
TRANSPARENT: 1,
OVERLAY: 2
},
RenderPriority: At,
GFXGetTypeSize: function(t) {
switch (t) {
case G.BOOL:
case G.INT:
case G.UINT:
case G.FLOAT:
return 4;

case G.BOOL2:
case G.INT2:
case G.UINT2:
case G.FLOAT2:
return 8;

case G.BOOL3:
case G.INT3:
case G.UINT3:
case G.FLOAT3:
return 12;

case G.BOOL4:
case G.INT4:
case G.UINT4:
case G.FLOAT4:
case G.MAT2:
return 16;

case G.MAT2X3:
return 24;

case G.MAT2X4:
return 32;

case G.MAT3X2:
return 24;

case G.MAT3:
return 36;

case G.MAT3X4:
return 48;

case G.MAT4X2:
case G.MAT4X2:
return 32;

case G.MAT4:
return 64;

case G.SAMPLER1D:
case G.SAMPLER1D_ARRAY:
case G.SAMPLER2D:
case G.SAMPLER2D_ARRAY:
case G.SAMPLER3D:
case G.SAMPLER_CUBE:
return 4;

default:
return 0;
}
},
UniformBinding: Tt
};
e.exports = Ot;
}), {} ],
184: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function(t) {
return t && t.__esModule ? t : {
default: t
};
})(t("../gfx"));
function r(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function s(t, e, i) {
e && r(t.prototype, e);
i && r(t, i);
return t;
}
var a = (function() {
function t(t, e, i) {
void 0 === i && (i = n.default.PT_TRIANGLES);
this._vertexBuffer = t;
this._indexBuffer = e;
this._primitiveType = i;
this._start = 0;
this._count = -1;
}
s(t, [ {
key: "count",
get: function() {
return -1 !== this._count ? this._count : this._indexBuffer ? this._indexBuffer.count : this._vertexBuffer ? this._vertexBuffer.count : 0;
}
} ]);
return t;
})();
i.default = a;
e.exports = i.default;
}), {
"../gfx": 188
} ],
185: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../gfx")), r = a(t("../enums")), s = a(t("../../core/value-types/value-type"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
var o = (function() {
function t(t, e, i, r, s, a) {
void 0 === s && (s = {});
void 0 === a && (a = {});
this._name = t;
this._detailName = e;
this._programName = i;
this._stage = r;
this._properties = s;
this._defines = a;
this._cullMode = n.default.CULL_BACK;
this._blend = !1;
this._blendEq = n.default.BLEND_FUNC_ADD;
this._blendAlphaEq = n.default.BLEND_FUNC_ADD;
this._blendSrc = n.default.BLEND_SRC_ALPHA;
this._blendDst = n.default.BLEND_ONE_MINUS_SRC_ALPHA;
this._blendSrcAlpha = n.default.BLEND_SRC_ALPHA;
this._blendDstAlpha = n.default.BLEND_ONE_MINUS_SRC_ALPHA;
this._blendColor = 4294967295;
this._depthTest = !1;
this._depthWrite = !1;
this._depthFunc = n.default.DS_FUNC_LESS, this._stencilTest = n.default.STENCIL_INHERIT;
this._stencilFuncFront = n.default.DS_FUNC_ALWAYS;
this._stencilRefFront = 0;
this._stencilMaskFront = 255;
this._stencilFailOpFront = n.default.STENCIL_OP_KEEP;
this._stencilZFailOpFront = n.default.STENCIL_OP_KEEP;
this._stencilZPassOpFront = n.default.STENCIL_OP_KEEP;
this._stencilWriteMaskFront = 255;
this._stencilFuncBack = n.default.DS_FUNC_ALWAYS;
this._stencilRefBack = 0;
this._stencilMaskBack = 255;
this._stencilFailOpBack = n.default.STENCIL_OP_KEEP;
this._stencilZFailOpBack = n.default.STENCIL_OP_KEEP;
this._stencilZPassOpBack = n.default.STENCIL_OP_KEEP;
this._stencilWriteMaskBack = 255;
}
var e = t.prototype;
e.setCullMode = function(t) {
void 0 === t && (t = n.default.CULL_BACK);
this._cullMode = t;
};
e.setBlend = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = !1);
void 0 === e && (e = n.default.BLEND_FUNC_ADD);
void 0 === i && (i = n.default.BLEND_SRC_ALPHA);
void 0 === r && (r = n.default.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === s && (s = n.default.BLEND_FUNC_ADD);
void 0 === a && (a = n.default.BLEND_SRC_ALPHA);
void 0 === o && (o = n.default.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === c && (c = 4294967295);
this._blend = t;
this._blendEq = e;
this._blendSrc = i;
this._blendDst = r;
this._blendAlphaEq = s;
this._blendSrcAlpha = a;
this._blendDstAlpha = o;
this._blendColor = c;
};
e.setDepth = function(t, e, i) {
void 0 === t && (t = !1);
void 0 === e && (e = !1);
void 0 === i && (i = n.default.DS_FUNC_LESS);
this._depthTest = t;
this._depthWrite = e;
this._depthFunc = i;
};
e.setStencilFront = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
void 0 === e && (e = n.default.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === r && (r = 255);
void 0 === s && (s = n.default.STENCIL_OP_KEEP);
void 0 === a && (a = n.default.STENCIL_OP_KEEP);
void 0 === o && (o = n.default.STENCIL_OP_KEEP);
void 0 === c && (c = 255);
this._stencilTest = t;
this._stencilFuncFront = e;
this._stencilRefFront = i;
this._stencilMaskFront = r;
this._stencilFailOpFront = s;
this._stencilZFailOpFront = a;
this._stencilZPassOpFront = o;
this._stencilWriteMaskFront = c;
};
e.setStencilEnabled = function(t) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
this._stencilTest = t;
};
e.setStencilBack = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
void 0 === e && (e = n.default.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === r && (r = 255);
void 0 === s && (s = n.default.STENCIL_OP_KEEP);
void 0 === a && (a = n.default.STENCIL_OP_KEEP);
void 0 === o && (o = n.default.STENCIL_OP_KEEP);
void 0 === c && (c = 255);
this._stencilTest = t;
this._stencilFuncBack = e;
this._stencilRefBack = i;
this._stencilMaskBack = r;
this._stencilFailOpBack = s;
this._stencilZFailOpBack = a;
this._stencilZPassOpBack = o;
this._stencilWriteMaskBack = c;
};
e.setStage = function(t) {
this._stage = t;
};
e.setProperties = function(t) {
this._properties = t;
};
e.getProperty = function(t) {
if (this._properties[t]) return this._properties[t].value;
};
e.setProperty = function(t, e, i) {
var n = this._properties[t];
if (!n) return !1;
n.directly = i;
if (Array.isArray(e)) {
var a = n.value;
if (a.length !== e.length) {
cc.warnID(9105, this._name, t);
return;
}
for (var o = 0; o < e.length; o++) a[o] = e[o];
} else if (e && !ArrayBuffer.isView(e)) if (n.type === r.default.PARAM_TEXTURE_2D) n.value = e.getImpl(); else if (e instanceof s.default) e.constructor.toArray(n.value, e); else {
"object" == typeof e && cc.warnID(9106, this._name, t);
n.value = e;
} else n.value = e;
return !0;
};
e.getDefine = function(t) {
return this._defines[t];
};
e.define = function(t, e, i) {
if (!i) {
if (void 0 === this._defines[t]) return !1;
}
this._defines[t] = e;
return !0;
};
e.clone = function() {
var e = new t(this._programName);
Object.assign(e, this);
var i = {}, n = this._properties;
for (var r in n) {
var s = n[r], a = i[r] = {}, o = s.value;
Array.isArray(o) ? a.value = o.concat() : ArrayBuffer.isView(o) ? a.value = new o.__proto__.constructor(o) : a.value = o;
for (var c in s) "value" !== c && (a[c] = s[c]);
}
e._properties = i;
e._defines = Object.assign({}, this._defines);
return e;
};
return t;
})();
i.default = o;
e.exports = i.default;
}), {
"../../core/value-types/value-type": 176,
"../enums": 187,
"../gfx": 188
} ],
186: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function r(t, e, i) {
e && n(t.prototype, e);
i && n(t, i);
return t;
}
var s = (function() {
function t(t, e) {
this._name = t;
this._passes = e;
}
t.prototype.clone = function() {
for (var e = [], i = 0; i < this._passes.length; i++) e.push(this._passes[i].clone());
return new t(this._name, e);
};
r(t, [ {
key: "name",
get: function() {
return this._name;
}
}, {
key: "passes",
get: function() {
return this._passes;
}
} ]);
return t;
})();
i.default = s;
e.exports = i.default;
}), {} ],
187: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("./build/mappings"), r = {
PROJ_PERSPECTIVE: 0,
PROJ_ORTHO: 1,
LIGHT_DIRECTIONAL: 0,
LIGHT_POINT: 1,
LIGHT_SPOT: 2,
LIGHT_AMBIENT: 3,
SHADOW_NONE: 0,
SHADOW_HARD: 1,
SHADOW_SOFT: 2,
PARAM_INT: n.typeMap.int,
PARAM_INT2: n.typeMap.ivec2,
PARAM_INT3: n.typeMap.ivec3,
PARAM_INT4: n.typeMap.ivec4,
PARAM_FLOAT: n.typeMap.float,
PARAM_FLOAT2: n.typeMap.vec2,
PARAM_FLOAT3: n.typeMap.vec3,
PARAM_FLOAT4: n.typeMap.vec4,
PARAM_MAT2: n.typeMap.mat2,
PARAM_MAT3: n.typeMap.mat3,
PARAM_MAT4: n.typeMap.mat4,
PARAM_TEXTURE_2D: n.typeMap.sampler2D,
PARAM_TEXTURE_CUBE: n.typeMap.samplerCube,
CLEAR_COLOR: 1,
CLEAR_DEPTH: 2,
CLEAR_STENCIL: 4,
CLEAR_SKYBOX: 8,
BUFFER_VIEW_INT8: 0,
BUFFER_VIEW_UINT8: 1,
BUFFER_VIEW_INT16: 2,
BUFFER_VIEW_UINT16: 3,
BUFFER_VIEW_INT32: 4,
BUFFER_VIEW_UINT32: 5,
BUFFER_VIEW_FLOAT32: 6
};
i.default = r;
e.exports = i.default;
}), {
"./build/mappings": 183
} ],
188: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
t("./enums");
var n = null, r = n = window.gfx;
i.default = r;
cc.gfx = n;
e.exports = i.default;
}), {
"./device": void 0,
"./enums": void 0,
"./frame-buffer": void 0,
"./index-buffer": void 0,
"./program": void 0,
"./render-buffer": void 0,
"./texture": void 0,
"./texture-2d": void 0,
"./texture-cube": void 0,
"./vertex-buffer": void 0,
"./vertex-format": void 0
} ],
189: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = function(t, e) {
var i, n = t.length, r = e ^ n, s = 0;
for (;n >= 4; ) {
i = 1540483477 * (65535 & (i = 255 & t.charCodeAt(s) | (255 & t.charCodeAt(++s)) << 8 | (255 & t.charCodeAt(++s)) << 16 | (255 & t.charCodeAt(++s)) << 24)) + ((1540483477 * (i >>> 16) & 65535) << 16);
r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (i = 1540483477 * (65535 & (i ^= i >>> 24)) + ((1540483477 * (i >>> 16) & 65535) << 16));
n -= 4;
++s;
}
switch (n) {
case 3:
r ^= (255 & t.charCodeAt(s + 2)) << 16;

case 2:
r ^= (255 & t.charCodeAt(s + 1)) << 8;

case 1:
r = 1540483477 * (65535 & (r ^= 255 & t.charCodeAt(s))) + ((1540483477 * (r >>> 16) & 65535) << 16);
}
r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16);
return (r ^= r >>> 15) >>> 0;
};
e.exports = i.default;
}), {} ],
190: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.getInspectorProps = function(t) {
var e = {
type: t.type
};
Object.assign(e, t.editor || t.inspector);
e.defines = t.defines;
e.value = m(e.type)(t.value);
var i = y(e.type);
e.typeName = E[i] || i;
e.valueCtor = d[e.type];
if ("cc.Texture2D" == e.typeName) {
e.typeName = "cc.Asset";
e.assetType = "cc.Texture2D";
}
return e;
};
i.getClassName = i.getInstanceCtor = i.getInstanceType = i.enums2default = i.ctor2enums = void 0;
var n, r, s, a, o = u(t("./enums")), c = t("../core/value-types"), l = u(t("../core/assets/CCTexture2D"));
function u(t) {
return t && t.__esModule ? t : {
default: t
};
}
var h = null;
h = gfx.Texture2D;
var f = cc.Object, _ = ((n = {})[Boolean] = function(t) {
return t || !1;
}, n[Number] = function(t) {
return t ? ArrayBuffer.isView(t) ? t[0] : t : 0;
}, n[c.Vec2] = function(t) {
return t ? cc.v2(t[0], t[1]) : cc.v2();
}, n[c.Vec3] = function(t) {
return t ? cc.v3(t[0], t[1], t[2]) : cc.v3();
}, n[c.Vec4] = function(t) {
return t ? cc.v4(t[0], t[1], t[2], t[3]) : cc.v4();
}, n[c.Color] = function(t) {
return t ? cc.color(255 * t[0], 255 * t[1], 255 * t[2], 255 * (t[3] || 1)) : cc.color();
}, n[c.Mat4] = function(t) {
return t ? cc.mat4(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]) : cc.mat4();
}, n[l.default] = function() {
return null;
}, n[f] = function() {
return null;
}, n), d = ((r = {})[o.default.PARAM_INT] = Number, r[o.default.PARAM_INT2] = c.Vec2, 
r[o.default.PARAM_INT3] = c.Vec3, r[o.default.PARAM_INT4] = c.Vec4, r[o.default.PARAM_FLOAT] = Number, 
r[o.default.PARAM_FLOAT2] = c.Vec2, r[o.default.PARAM_FLOAT3] = c.Vec3, r[o.default.PARAM_FLOAT4] = c.Vec4, 
r[o.default.PARAM_MAT4] = c.Mat4, r[o.default.PARAM_TEXTURE_2D] = l.default, r.color = c.Color, 
r.number = Number, r.boolean = Boolean, r.default = f, r), p = ((s = {})[Number] = o.default.PARAM_FLOAT, 
s[c.Vec2] = o.default.PARAM_FLOAT2, s[c.Vec3] = o.default.PARAM_FLOAT3, s[c.Vec4] = o.default.PARAM_FLOAT4, 
s[c.Color] = o.default.PARAM_COLOR3, s[c.Color] = o.default.PARAM_COLOR4, s[c.Mat4] = o.default.PARAM_MAT4, 
s[l.default] = o.default.PARAM_TEXTURE_2D, s[h] = o.default.PARAM_TEXTURE_2D, s);
i.ctor2enums = p;
var v = ((a = {})[o.default.PARAM_INT] = new Uint32Array([ 0 ]), a[o.default.PARAM_INT2] = new Uint32Array([ 0, 0 ]), 
a[o.default.PARAM_INT3] = new Uint32Array([ 0, 0, 0 ]), a[o.default.PARAM_INT4] = new Uint32Array([ 0, 0, 0, 0 ]), 
a[o.default.PARAM_FLOAT] = new Float32Array([ 0 ]), a[o.default.PARAM_FLOAT2] = new Float32Array([ 0, 0 ]), 
a[o.default.PARAM_FLOAT3] = new Float32Array([ 0, 0, 0 ]), a[o.default.PARAM_FLOAT4] = new Float32Array([ 0, 0, 0, 0 ]), 
a[o.default.PARAM_MAT4] = cc.mat4().m, a[o.default.PARAM_TEXTURE_2D] = null, a.number = 0, 
a.boolean = !1, a);
i.enums2default = v;
var g = function(t) {
return d[t] || d.default;
};
i.getInstanceType = g;
var m = function(t) {
return _[g(t)];
};
i.getInstanceCtor = m;
var y = function(t) {
return cc.js.getClassName(g(t));
};
i.getClassName = y;
var E = {
Number: "number",
Boolean: "boolean"
};
}), {
"../core/assets/CCTexture2D": 25,
"../core/value-types": 168,
"./enums": 187,
"./gfx/texture-2d": void 0
} ],
191: [ (function(t, e, i) {
"use strict";
var n = cc.Class({
name: "cc.TiledMapAsset",
extends: cc.Asset,
properties: {
tmxXmlStr: "",
textures: {
default: [],
type: [ cc.Texture2D ]
},
textureNames: [ cc.String ],
textureSizes: {
default: [],
type: [ cc.Size ]
},
imageLayerTextures: {
default: [],
type: [ cc.Texture2D ]
},
imageLayerTextureNames: [ cc.String ],
tsxFiles: [ cc.TextAsset ],
tsxFileNames: [ cc.String ]
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
cc.TiledMapAsset = n;
e.exports = n;
}), {} ],
192: [ (function(t, e, i) {
"use strict";
var n = t("./webview-impl"), r = n.EventType;
function s() {}
var a = cc.Class({
name: "cc.WebView",
extends: cc.Component,
editor: !1,
properties: {
_useOriginalSize: !0,
_url: "",
url: {
type: cc.String,
tooltip: !1,
get: function() {
return this._url;
},
set: function(t) {
this._url = t;
var e = this._impl;
e && e.loadURL(t);
}
},
webviewEvents: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: r,
Impl: n
},
ctor: function() {
this._impl = new a.Impl();
},
onRestore: function() {
this._impl || (this._impl = new a.Impl());
},
onEnable: function() {
var t = this._impl;
t.createDomElementIfNeeded(this.node.width, this.node.height);
t.setEventListener(r.LOADED, this._onWebViewLoaded.bind(this));
t.setEventListener(r.LOADING, this._onWebViewLoading.bind(this));
t.setEventListener(r.ERROR, this._onWebViewLoadError.bind(this));
t.loadURL(this._url);
t.setVisible(!0);
},
onDisable: function() {
var t = this._impl;
t.setVisible(!1);
t.setEventListener(r.LOADED, s);
t.setEventListener(r.LOADING, s);
t.setEventListener(r.ERROR, s);
},
onDestroy: function() {
if (this._impl) {
this._impl.destroy();
this._impl = null;
}
},
update: function(t) {
this._impl && this._impl.updateMatrix(this.node);
},
_onWebViewLoaded: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, r.LOADED);
this.node.emit("loaded", this);
},
_onWebViewLoading: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, r.LOADING);
this.node.emit("loading", this);
return !0;
},
_onWebViewLoadError: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, r.ERROR);
this.node.emit("error", this);
},
setJavascriptInterfaceScheme: function(t) {
this._impl && this._impl.setJavascriptInterfaceScheme(t);
},
setOnJSCallback: function(t) {
this._impl && this._impl.setOnJSCallback(t);
},
evaluateJS: function(t) {
this._impl && this._impl.evaluateJS(t);
}
});
cc.WebView = e.exports = a;
}), {
"./webview-impl": 193
} ],
193: [ (function(t, e, i) {
"use strict";
var n = t("../core/platform/utils"), r = t("../core/platform/CCSys"), s = cc.mat4(), a = cc.Class({
name: "WebViewImpl",
ctor: function() {
this._EventList = {};
this._visible = !1;
this._parent = null;
this._div = null;
this._iframe = null;
this._listener = null;
this._forceUpdate = !1;
this._m00 = 0;
this._m01 = 0;
this._m04 = 0;
this._m05 = 0;
this._m12 = 0;
this._m13 = 0;
this._w = 0;
this._h = 0;
this.__eventListeners = {};
},
_updateVisibility: function() {
if (this._div) {
var t = this._div;
this._visible ? t.style.visibility = "visible" : t.style.visibility = "hidden";
}
},
_updateSize: function(t, e) {
var i = this._div;
if (i) {
i.style.width = t + "px";
i.style.height = e + "px";
}
},
_initEvent: function() {
var t = this._iframe;
if (t) {
var e = this.__eventListeners, i = this;
e.load = function() {
i._forceUpdate = !0;
i._dispatchEvent(a.EventType.LOADED);
};
e.error = function() {
i._dispatchEvent(a.EventType.ERROR);
};
t.addEventListener("load", e.load);
t.addEventListener("error", e.error);
}
},
_initStyle: function() {
if (this._div) {
var t = this._div;
t.style.position = "absolute";
t.style.bottom = "0px";
t.style.left = "0px";
}
},
_setOpacity: function(t) {
var e = this._iframe;
e && e.style && (e.style.opacity = t / 255);
},
_createDom: function(t, e) {
if (a._polyfill.enableDiv) {
this._div = document.createElement("div");
this._div.style["-webkit-overflow"] = "auto";
this._div.style["-webkit-overflow-scrolling"] = "touch";
this._iframe = document.createElement("iframe");
this._div.appendChild(this._iframe);
this._iframe.style.width = "100%";
this._iframe.style.height = "100%";
} else this._div = this._iframe = document.createElement("iframe");
a._polyfill.enableBG && (this._div.style.background = "#FFF");
this._div.style.background = "#FFF";
this._div.style.height = e + "px";
this._div.style.width = t + "px";
this._div.style.overflow = "scroll";
this._iframe.style.border = "none";
cc.game.container.appendChild(this._div);
this._updateVisibility();
},
_createNativeControl: function(t, e) {
this._createDom(t, e);
this._initStyle();
this._initEvent();
},
createDomElementIfNeeded: function(t, e) {
this._div ? this._updateSize(t, e) : this._createNativeControl(t, e);
},
removeDom: function() {
var t = this._div;
if (t) {
n.contains(cc.game.container, t) && cc.game.container.removeChild(t);
this._div = null;
}
var e = this._iframe;
if (e) {
var i = this.__eventListeners;
e.removeEventListener("load", i.load);
e.removeEventListener("error", i.error);
i.load = null;
i.error = null;
this._iframe = null;
}
},
setOnJSCallback: function(t) {},
setJavascriptInterfaceScheme: function(t) {},
loadData: function(t, e, i, n) {},
loadHTMLString: function(t, e) {},
loadURL: function(t) {
var e = this._iframe;
if (e) {
e.src = t;
var i = this;
e.addEventListener("load", (function t() {
i._loaded = !0;
i._updateVisibility();
e.removeEventListener("load", t);
}));
this._dispatchEvent(a.EventType.LOADING);
}
},
stopLoading: function() {
cc.logID(7800);
},
reload: function() {
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.location.reload();
}
},
canGoBack: function() {
cc.logID(7801);
return !0;
},
canGoForward: function() {
cc.logID(7802);
return !0;
},
goBack: function() {
try {
if (a._polyfill.closeHistory) return cc.logID(7803);
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.history.back.call(e);
}
} catch (t) {
cc.log(t);
}
},
goForward: function() {
try {
if (a._polyfill.closeHistory) return cc.logID(7804);
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.history.forward.call(e);
}
} catch (t) {
cc.log(t);
}
},
evaluateJS: function(t) {
var e = this._iframe;
if (e) {
var i = e.contentWindow;
try {
i.eval(t);
this._dispatchEvent(a.EventType.JS_EVALUATED);
} catch (t) {
console.error(t);
}
}
},
setScalesPageToFit: function() {
cc.logID(7805);
},
setEventListener: function(t, e) {
this._EventList[t] = e;
},
removeEventListener: function(t) {
this._EventList[t] = null;
},
_dispatchEvent: function(t) {
var e = this._EventList[t];
e && e.call(this, this, this._iframe.src);
},
_createRenderCmd: function() {
return new a.RenderCmd(this);
},
destroy: function() {
this.removeDom();
},
setVisible: function(t) {
if (this._visible !== t) {
this._visible = !!t;
this._updateVisibility();
}
},
updateMatrix: function(t) {
if (this._div && this._visible) {
t.getWorldMatrix(s);
var e = cc.Camera._findRendererCamera(t);
e && e.worldMatrixToScreen(s, s, cc.game.canvas.width, cc.game.canvas.height);
var i = s.m;
if (this._forceUpdate || this._m00 !== i[0] || this._m01 !== i[1] || this._m04 !== i[4] || this._m05 !== i[5] || this._m12 !== i[12] || this._m13 !== i[13] || this._w !== t._contentSize.width || this._h !== t._contentSize.height) {
this._m00 = i[0];
this._m01 = i[1];
this._m04 = i[4];
this._m05 = i[5];
this._m12 = i[12];
this._m13 = i[13];
this._w = t._contentSize.width;
this._h = t._contentSize.height;
var n = cc.view._devicePixelRatio, r = 1 / n, a = 1 / n, o = cc.game.container, c = i[0] * r, l = i[1], u = i[4], h = i[5] * a, f = o && o.style.paddingLeft ? parseInt(o.style.paddingLeft) : 0, _ = o && o.style.paddingBottom ? parseInt(o.style.paddingBottom) : 0;
this._updateSize(this._w, this._h);
var d = this._w * r, p = this._h * a, v = d * i[0] * t._anchorPoint.x, g = p * i[5] * t._anchorPoint.y, m = "matrix(" + c + "," + -l + "," + -u + "," + h + "," + (i[12] * r - v + f) + "," + -(i[13] * a - g + _) + ")";
this._div.style.transform = m;
this._div.style["-webkit-transform"] = m;
this._div.style["transform-origin"] = "0px 100% 0px";
this._div.style["-webkit-transform-origin"] = "0px 100% 0px";
this._setOpacity(t.opacity);
this._forceUpdate = !1;
}
}
}
});
a.EventType = {
LOADING: 0,
LOADED: 1,
ERROR: 2,
JS_EVALUATED: 3
};
var o = a._polyfill = {
devicePixelRatio: !1,
enableDiv: !1
};
r.os === r.OS_IOS && (o.enableDiv = !0);
r.isMobile ? r.browserType === r.BROWSER_TYPE_FIREFOX && (o.enableBG = !0) : r.browserType === r.BROWSER_TYPE_IE && (o.closeHistory = !0);
e.exports = a;
}), {
"../core/platform/CCSys": 101,
"../core/platform/utils": 116
} ],
194: [ (function(t, e, i) {
"use strict";
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle");
t("./cocos2d/tilemap");
t("./cocos2d/videoplayer/CCVideoPlayer");
t("./cocos2d/webview/CCWebView");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./cocos2d/actions");
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": void 0,
"./cocos2d/animation": void 0,
"./cocos2d/core": 69,
"./cocos2d/core/components/CCStudioComponent": void 0,
"./cocos2d/deprecated": 180,
"./cocos2d/particle": void 0,
"./cocos2d/particle/CCParticleAsset": 182,
"./cocos2d/tilemap": void 0,
"./cocos2d/tilemap/CCTiledMapAsset": 191,
"./cocos2d/videoplayer/CCVideoPlayer": void 0,
"./cocos2d/webview/CCWebView": 192,
"./extensions/ccpool/CCNodePool": void 0,
"./extensions/dragonbones": void 0,
"./extensions/spine": void 0
} ],
195: [ (function(t, e, i) {
"use strict";
var n = "undefined" == typeof window ? global : window;
n.cc = n.cc || {};
cc.internal = cc.internal || {};
t("./predefine");
t("./polyfill/string");
t("./polyfill/misc");
t("./polyfill/array");
t("./polyfill/object");
t("./polyfill/array-buffer");
t("./polyfill/number");
t("./polyfill/typescript");
t("./cocos2d/core/predefine");
t("./cocos2d");
t("./extends");
0;
e.exports = n.cc;
}), {
"./cocos2d": 181,
"./cocos2d/core/predefine": 117,
"./extends": 194,
"./package": void 0,
"./polyfill/array": 197,
"./polyfill/array-buffer": 196,
"./polyfill/misc": 198,
"./polyfill/number": 199,
"./polyfill/object": 200,
"./polyfill/string": 201,
"./polyfill/typescript": 202,
"./predefine": 203
} ],
196: [ (function(t, e, i) {
"use strict";
if (!ArrayBuffer.isView) {
var n = Object.getPrototypeOf(Int8Array);
ArrayBuffer.isView = "function" == typeof n ? function(t) {
return t instanceof n;
} : function(t) {
if ("object" != typeof t) return !1;
var e = t.constructor;
return e === Float32Array || e === Uint8Array || e === Uint32Array || e === Int8Array;
};
}
}), {} ],
197: [ (function(t, e, i) {
"use strict";
Array.isArray || (Array.isArray = function(t) {
return "[object Array]" === Object.prototype.toString.call(t);
});
Array.prototype.find || (Array.prototype.find = function(t) {
for (var e = this.length, i = 0; i < e; i++) {
var n = this[i];
if (t.call(this, n, i, this)) return n;
}
});
Array.prototype.includes || (Array.prototype.includes = function(t) {
return -1 !== this.indexOf(t);
});
}), {} ],
198: [ (function(t, e, i) {
"use strict";
Math.sign || (Math.sign = function(t) {
return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Math.log2 || (Math.log2 = function(t) {
return Math.log(t) * Math.LOG2E;
});
Number.isInteger || (Number.isInteger = function(t) {
return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
});
var n = window.performance || Date, r = Object.create(null);
console.time = function(t) {
r[t] = n.now();
};
console.timeEnd = function(t) {
var e = r[t], i = n.now() - e;
console.log(t + ": " + i + "ms");
};
}), {} ],
199: [ (function(t, e, i) {
"use strict";
Number.parseFloat = Number.parseFloat || parseFloat;
Number.parseInt = Number.parseInt || parseInt;
}), {} ],
200: [ (function(t, e, i) {
"use strict";
Object.assign || (Object.assign = function(t, e) {
return cc.js.mixin(t, e);
});
Object.getOwnPropertyDescriptors || (Object.getOwnPropertyDescriptors = function(t) {
var e = {}, i = Object.getOwnPropertyNames(t);
Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(t)));
for (var n = 0; n < i.length; ++n) {
var r = i[n];
e[r] = Object.getOwnPropertyDescriptor(t, r);
}
return e;
});
}), {} ],
201: [ (function(t, e, i) {
"use strict";
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
("undefined" == typeof e || e > this.length) && (e = this.length);
e -= t.length;
var i = this.indexOf(t, e);
return -1 !== i && i === e;
});
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
return this.replace(/^\s+/, "");
});
}), {} ],
202: [ (function(t, e, i) {
"use strict";
var n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(t, e) {
n(t, e);
function i() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
}
return t;
};
window.__rest = function(t, e) {
var i = {};
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
var r = 0;
for (n = Object.getOwnPropertySymbols(t); r < n.length; r++) e.indexOf(n[r]) < 0 && (i[n[r]] = t[n[r]]);
}
return i;
};
window.__decorate = function(t, e, i, n) {
var r, s = arguments.length, a = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n); else for (var o = t.length - 1; o >= 0; o--) (r = t[o]) && (a = (s < 3 ? r(a) : s > 3 ? r(e, i, a) : r(e, i)) || a);
return s > 3 && a && Object.defineProperty(e, i, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(r, s) {
function a(t) {
try {
c(n.next(t));
} catch (t) {
s(t);
}
}
function o(t) {
try {
c(n.throw(t));
} catch (t) {
s(t);
}
}
function c(t) {
t.done ? r(t.value) : new i(function(e) {
e(t.value);
}).then(a, o);
}
c((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(t, e) {
var i, n, r, s, a = {
label: 0,
sent: function() {
if (1 & r[0]) throw r[1];
return r[1];
},
trys: [],
ops: []
};
return s = {
next: o(0),
throw: o(1),
return: o(2)
}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
return this;
}), s;
function o(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(s) {
if (i) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (i = 1, n && (r = 2 & s[0] ? n.return : s[0] ? n.throw || ((r = n.return) && r.call(n), 
0) : n.next) && !(r = r.call(n, s[1])).done) return r;
(n = 0, r) && (s = [ 2 & s[0], r.value ]);
switch (s[0]) {
case 0:
case 1:
r = s;
break;

case 4:
a.label++;
return {
value: s[1],
done: !1
};

case 5:
a.label++;
n = s[1];
s = [ 0 ];
continue;

case 7:
s = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(r = a.trys, r = r.length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
a = 0;
continue;
}
if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
a.label = s[1];
break;
}
if (6 === s[0] && a.label < r[1]) {
a.label = r[1];
r = s;
break;
}
if (r && a.label < r[2]) {
a.label = r[2];
a.ops.push(s);
break;
}
r[2] && a.ops.pop();
a.trys.pop();
continue;
}
s = e.call(t, a);
} catch (t) {
s = [ 6, t ];
n = 0;
} finally {
i = r = 0;
}
if (5 & s[0]) throw s[1];
return {
value: s[0] ? s[1] : void 0,
done: !0
};
}
};
window.__exportStar = function(t, e) {
for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
};
window.__values = function(t) {
var e = "function" == typeof Symbol && t[Symbol.iterator], i = 0;
return e ? e.call(t) : {
next: function() {
t && i >= t.length && (t = void 0);
return {
value: t && t[i++],
done: !t
};
}
};
};
window.__read = function(t, e) {
var i = "function" == typeof Symbol && t[Symbol.iterator];
if (!i) return t;
var n, r, s = i.call(t), a = [];
try {
for (;(void 0 === e || e-- > 0) && !(n = s.next()).done; ) a.push(n.value);
} catch (t) {
r = {
error: t
};
} finally {
try {
n && !n.done && (i = s.return) && i.call(s);
} finally {
if (r) throw r.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n, r = i.apply(t, e || []), s = [];
return n = {}, a("next"), a("throw"), a("return"), n[Symbol.asyncIterator] = function() {
return this;
}, n;
function a(t) {
r[t] && (n[t] = function(e) {
return new Promise(function(i, n) {
s.push([ t, e, i, n ]) > 1 || o(t, e);
});
});
}
function o(t, e) {
try {
c(r[t](e));
} catch (t) {
h(s[0][3], t);
}
}
function c(t) {
t.value instanceof __await ? Promise.resolve(t.value.v).then(l, u) : h(s[0][2], t);
}
function l(t) {
o("next", t);
}
function u(t) {
o("throw", t);
}
function h(t, e) {
(t(e), s.shift(), s.length) && o(s[0][0], s[0][1]);
}
};
window.__asyncDelegator = function(t) {
var e, i;
return e = {}, n("next"), n("throw", (function(t) {
throw t;
})), n("return"), e[Symbol.iterator] = function() {
return this;
}, e;
function n(n, r) {
e[n] = t[n] ? function(e) {
return (i = !i) ? {
value: __await(t[n](e)),
done: "return" === n
} : r ? r(e) : e;
} : r;
}
};
window.__asyncValues = function(t) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var e, i = t[Symbol.asyncIterator];
return i ? i.call(t) : (t = "function" == typeof __values ? __values(t) : t[Symbol.iterator](), 
e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
return this;
}, e);
function n(i) {
e[i] = t[i] && function(e) {
return new Promise(function(n, s) {
r(n, s, (e = t[i](e)).done, e.value);
});
};
}
function r(t, e, i, n) {
Promise.resolve(n).then((function(e) {
t({
value: e,
done: i
});
}), e);
}
};
window.__makeTemplateObject = function(t, e) {
Object.defineProperty ? Object.defineProperty(t, "raw", {
value: e
}) : t.raw = e;
return t;
};
window.__importStar = function(t) {
if (t && t.__esModule) return t;
var e = {};
if (null != t) for (var i in t) Object.hasOwnProperty.call(t, i) && (e[i] = t[i]);
e.default = t;
return e;
};
window.__importDefault = function(t) {
return t && t.__esModule ? t : {
default: t
};
};
}), {} ],
203: [ (function(t, e, i) {
"use strict";
var n = "undefined" == typeof window ? global : window;
function r(t, e) {
"undefined" == typeof n[t] && (n[t] = e);
}
function s(t, e) {
"undefined" == typeof n[t] && Object.defineProperty(n, t, {
get: function() {
var i;
"CC_WECHATGAMESUB" === t ? i = "cc.sys.platform === cc.sys.WECHAT_GAME_SUB" : "CC_WECHATGAME" === t ? i = "cc.sys.platform === cc.sys.WECHAT_GAME" : "CC_QQPLAY" === t && (i = "cc.sys.platform === cc.sys.QQ_PLAY");
cc.warnID(1400, t, i);
return e;
}
});
}
function a(t) {
return "object" == typeof n[t];
}
r("CC_BUILD", !1);
n.CC_BUILD = !0;
n.CC_DEV = !1;
n.CC_DEBUG = !1;
n.CC_JSB = !0;
n.CC_NATIVERENDERER = !0;
n.CC_SUPPORT_JIT = !0;
n.CC_PHYSICS_BUILTIN = !1;
n.CC_PHYSICS_CANNON = !1;
n.CC_EDITOR = !1;
n.CC_PREVIEW = !1;
n.CC_TEST = !1;
n.CC_RUNTIME = !1;
n.CC_JSB = !0;
var o = !(!a("wx") || !wx.getSharedCanvas), c = !(!a("wx") || !wx.getSystemInfoSync && !wx.getSharedCanvas), l = a("bk");
s("CC_WECHATGAMESUB", o);
s("CC_WECHATGAME", c);
s("CC_QQPLAY", l);
0;
n.CocosEngine = cc.ENGINE_VERSION = "2.3.4";
}), {} ]
}, {}, [ 195 ]);