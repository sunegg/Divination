window.__require = function t(e, o, n) {
function r(i, a) {
if (!o[i]) {
if (!e[i]) {
var s = i.split("/");
s = s[s.length - 1];
if (!e[s]) {
var p = "function" == typeof __require && __require;
if (!a && p) return p(s, !0);
if (c) return c(s, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = s;
}
var u = o[i] = {
exports: {}
};
e[i][0].call(u.exports, function(t) {
return r(e[i][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[i].exports;
}
for (var c = "function" == typeof __require && __require, i = 0; i < n.length; i++) r(n[i]);
return r;
}({
Appegg: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "365baP1NINAf5jCA89qNUy/", "Appegg");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.configUrl = "https://api2.bmob.cn/1/classes/List/u8QxFFFS";
e.apiKey = "89f2d6cc27985334699879bfa8aa9dfd";
e.restApiKey = "9278a7e3613aefe7ec07e390c2276bf2";
return e;
}
e.prototype.onLoad = function() {
this.privacyButton.node.on("click", this.onPrivacyClick, this);
this.startButton.node.on("click", this.onStartClick, this);
this.retryButton.node.on("click", this.onRetryClick, this);
};
e.prototype.start = function() {
this.connect();
};
e.prototype.connect = function() {
this.httpGetAsync(this.configUrl, function(t) {
console.log(t);
var e = JSON.parse(t);
console.log(e.url);
c.default.url = e.url;
c.default.privacyUrl = e.privacyUrl;
console.log("当前appType为" + e.appType);
switch (e.appType) {
case 1:
cc.director.loadScene("entry");
break;

case 2:
cc.director.loadScene("web");
}
}, function() {});
};
e.prototype.httpGetAsync = function(t, e, o) {
void 0 === o && (o = null);
var n = new XMLHttpRequest();
n.onerror;
n.ontimeout;
n.onreadystatechange = function() {
4 == n.readyState && 200 == n.status ? e(n.responseText) : o();
};
n.open("GET", t, !1);
n.setRequestHeader("X-Bmob-Application-Id", this.apiKey);
n.setRequestHeader("X-Bmob-REST-API-Key", this.restApiKey);
n.send(null);
};
e.prototype.onRetryClick = function(t) {
this.errorView.active = !1;
this.connect();
};
e.prototype.onPrivacyClick = function(t) {
this.webView.active = !0;
};
e.prototype.onStartClick = function(t) {
cc.director.loadScene("entry");
};
r([ s(cc.Node) ], e.prototype, "changelogView", void 0);
r([ s(cc.Label) ], e.prototype, "changelogTitleLabel", void 0);
r([ s(cc.Label) ], e.prototype, "changelogContentLabel", void 0);
r([ s(cc.Button) ], e.prototype, "privacyButton", void 0);
r([ s(cc.Button) ], e.prototype, "startButton", void 0);
r([ s(cc.Button) ], e.prototype, "retryButton", void 0);
r([ s(cc.Node) ], e.prototype, "errorView", void 0);
r([ s(cc.Node) ], e.prototype, "webView", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
AudioManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "46249tsAlFNuLMLBbjCIuQi", "AudioManager");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = (c.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.audioSource = this.getComponent(cc.AudioSource);
cc.game.addPersistRootNode(this.node);
};
e.prototype.start = function() {
cc.audioEngine.playMusic(this.audioSource.clip, !0);
};
e.prototype.play = function() {
this.audioSource.play();
};
e.prototype.pause = function() {
this.audioSource.pause();
};
return e = r([ i ], e);
}(cc.Component));
o.default = a;
cc._RF.pop();
}, {} ],
GameData: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c7a17o8ms9MnqFnpz4c/Dkx", "GameData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function t() {}
t.year = 0;
t.month = 0;
t.day = 0;
t.century = 0;
t.gender = 1;
t.currentCode = 0;
return t;
}();
o.default = n;
cc._RF.pop();
}, {} ],
GameLoader: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5645cw+5rBNX7jjiZWEfHYF", "GameLoader");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = (i.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.start = function() {
cc.loader.loadResDir("race", cc.SpriteFrame, function(t, e) {
t ? cc.error(t) : c.default.race = e;
});
cc.loader.loadResDir("job", cc.SpriteFrame, function(t, e) {
t ? cc.error(t) : c.default.job = e;
});
};
return e = r([ a ], e);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
GameManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f2b565G9QxKzZIjoXeWi2m+", "GameManager");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.race = null;
e.job = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.caculateLife = function(t) {
cc.log("id" + t);
this.selectId = t;
c.default.currentCode = this.toUnicode(c.default.nickname, t);
cc.log("code" + c.default.currentCode);
c.default.currentRace = this.toImagecode(c.default.currentCode, c.default.race.length - 1);
c.default.currentJob = this.toImagecode(c.default.currentCode, c.default.job.length - 1);
cc.log("race" + c.default.currentRace);
cc.log("job" + c.default.currentJob);
this.race.spriteFrame = c.default.race[c.default.currentRace];
this.job.spriteFrame = c.default.job[c.default.currentJob];
this.raceLabel.string = this.race.spriteFrame.name;
this.jobLabel.string = this.job.spriteFrame.name;
};
e.prototype.toUnicode = function(t, e) {
for (var o = 0, n = "", r = 0, i = t.length; r < i; r++) {
n = t.charCodeAt(r).toString(16);
o += parseInt(n.replace(/\D/g, ""), 0);
}
cc.log("day", c.default.day);
cc.log("month", c.default.month);
cc.log("gender", c.default.gender);
return o + c.default.year + c.default.month + c.default.day * c.default.gender * e;
};
e.prototype.toImagecode = function(t, e) {
for (;t > e; ) t -= e;
return Math.round(t);
};
r([ s(cc.Sprite) ], e.prototype, "race", void 0);
r([ s(cc.Sprite) ], e.prototype, "job", void 0);
r([ s(cc.Label) ], e.prototype, "raceLabel", void 0);
r([ s(cc.Label) ], e.prototype, "jobLabel", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
PrivacySetup: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "80a3eHlGQFCMbIs8tiJCwBG", "PrivacySetup");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
cc.log("privacyUrl" + this.encode_utf8(c.default.privacyUrl));
this.webView.url = this.encode_utf8(c.default.privacyUrl);
};
e.prototype.encode_utf8 = function(t) {
return unescape(encodeURIComponent(t));
};
r([ s(cc.WebView) ], e.prototype, "webView", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
UICheckBtn: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "7a476Qein1Njolowrn3SH8g", "UICheckBtn");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameManager"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.id = 0;
return e;
}
e.prototype.showAnswer = function() {
this.hideScene.active = !1;
this.showScene.active = !0;
this.GameManager.caculateLife(this.id);
};
e.prototype.onLoad = function() {
this.btn = this.node.getComponent(cc.Button);
};
e.prototype.start = function() {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "UICheckBtn";
t.handler = "showAnswer";
t.customEventData = null;
this.btn.clickEvents.push(t);
};
r([ s(cc.Node) ], e.prototype, "hideScene", void 0);
r([ s(cc.Node) ], e.prototype, "showScene", void 0);
r([ s(c.default) ], e.prototype, "GameManager", void 0);
r([ s ], e.prototype, "id", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameManager": "GameManager"
} ],
UIDatePicker: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6d106l+tDRL5rbAU45iCnts", "UIDatePicker");
cc.Class({
extends: cc.Component,
properties: {
lbYearMonth: cc.Label,
ndDays: cc.Node,
pfbDay: cc.Prefab,
yearText: cc.Label,
monthText: cc.Label,
dayText: cc.Label
},
onLoad: function() {
this.initData();
this.updateDate();
this.setDate(1994, 4, 29);
},
initData: function() {
this.date = this.date ? this.date : new Date();
this.year = this.date.getFullYear();
this.month = this.date.getMonth();
this.day = this.date.getDate();
this.pfgListDay = [];
for (var t = 0; t < 31; ++t) {
var e = cc.instantiate(this.pfbDay);
e.parent = this.ndDays;
this.pfgListDay.push(e);
}
},
setDate: function(t, e, o) {
this.date = new Date(t, e, o);
this.year = this.date.getFullYear();
this.month = this.date.getMonth();
this.day = this.date.getDate();
this.updateDate();
},
updateDate: function() {
var t = this;
this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month + 1);
for (var e = new Date(this.year, this.month, 0), o = e.getDate(), n = e.getDay(), r = 0; r < this.pfgListDay.length; ++r) {
var c = this.pfgListDay[r];
if (r < o) {
c.active = !0;
var i = n + r, a = Math.floor(i / 7), s = i % 7, p = .5 * -(this.ndDays.width - c.width) + s * c.width, u = .5 * (this.ndDays.height - c.height) - a * c.height;
c.setPosition(p, u);
c.getComponent("UIItemDay").setDay(r, r + 1, this.day === r + 1, function(e, o) {
t.day = o;
t.updateDate();
});
} else c.active = !1;
}
this.yearText.string = this.year;
this.monthText.string = this.month + 1;
this.dayText.string = this.day;
},
onClickLeft: function() {
if (this.month > 0) this.month -= 1; else {
this.month = 11;
this.year -= 1;
}
this.date.setFullYear(this.year);
this.date.setMonth(this.month);
this.updateDate();
},
onClickRight: function() {
if (this.month < 11) this.month += 1; else {
this.month = 0;
this.year += 1;
}
this.date.setFullYear(this.year);
this.date.setMonth(this.month);
this.updateDate();
},
setPickDateCallback: function(t) {
this.cb = t;
},
onClickClose: function() {
this.cb && this.cb(this.year, this.month, this.day);
this.node.parent = null;
}
});
cc._RF.pop();
}, {} ],
UIEditBoxGroup: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "83e8b7s8c5Ci4Hl8Ah3HN2q", "UIEditBoxGroup");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {};
e.prototype.onSubmit = function() {
if (0 != this.nameBox.string.trim().length) {
c.default.nickname = this.nameBox.string;
c.default.year = parseInt(this.yearLabel.string);
c.default.month = parseInt(this.monthLabel.string);
c.default.day = parseInt(this.dayLabel.string);
cc.log(c.default.year + "." + c.default.month + "." + c.default.day);
this.errorLabel.string = "";
cc.director.loadScene("game");
} else this.errorLabel.string = "请输入名字";
};
r([ s(cc.EditBox) ], e.prototype, "nameBox", void 0);
r([ s(cc.EditBox) ], e.prototype, "yearBox", void 0);
r([ s(cc.EditBox) ], e.prototype, "monthBox", void 0);
r([ s(cc.EditBox) ], e.prototype, "dateBox", void 0);
r([ s(cc.Label) ], e.prototype, "yearLabel", void 0);
r([ s(cc.Label) ], e.prototype, "monthLabel", void 0);
r([ s(cc.Label) ], e.prototype, "dayLabel", void 0);
r([ s(cc.Label) ], e.prototype, "errorLabel", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
UIGenderBtn: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1e4de7fS5ZHaKUT/EPmZvTx", "UIGenderBtn");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = i.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.btn = null;
e.gender = 1;
return e;
}
e.prototype.onLoad = function() {
this.btn = this.node.getComponent(cc.Button);
};
e.prototype.start = function() {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "UIGenderBtn";
t.handler = "selectGender";
t.customEventData = null;
this.btn.clickEvents.push(t);
};
e.prototype.selectGender = function() {
c.default.gender = this.gender;
this.hideView.active = !1;
this.view.active = !0;
};
r([ s ], e.prototype, "gender", void 0);
r([ s(cc.Node) ], e.prototype, "hideView", void 0);
r([ s(cc.Node) ], e.prototype, "view", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
UIItemDay: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "252a5nAq6pLOITqXWwWN/H/", "UIItemDay");
cc.Class({
extends: cc.Component,
properties: {
lbDay: cc.Label,
spSel: cc.Sprite
},
setDay: function(t, e, o, n) {
this.index = t;
this.day = e;
this.cb = n;
this.lbDay.string = e;
this.spSel.enabled = o;
},
onClickItem: function() {
this.cb && this.cb(this.index, this.day);
}
});
cc._RF.pop();
}, {} ],
UILoadScene: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "92a4fiLq49HoZM25wCQV52m", "UILoadScene");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = c.property, s = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.scene = "main";
return e;
}
e.prototype.loadScene = function() {
cc.director.loadScene(this.scene);
};
e.prototype.onLoad = function() {
this.btn = this.node.getComponent(cc.Button);
};
e.prototype.start = function() {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "UILoadScene";
t.handler = "loadScene";
t.customEventData = null;
this.btn.clickEvents.push(t);
};
r([ a ], e.prototype, "scene", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
UIShowNode: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c7e52EeQyRGf6mHfDgZBH2u", "UIShowNode");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = c.property, s = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.show = function() {
this.hideScene.active = !1;
this.showScene.active = !0;
};
e.prototype.onLoad = function() {
this.btn = this.node.getComponent(cc.Button);
};
e.prototype.start = function() {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "UIShowNode";
t.handler = "show";
t.customEventData = null;
this.btn.clickEvents.push(t);
};
r([ a(cc.Node) ], e.prototype, "hideScene", void 0);
r([ a(cc.Node) ], e.prototype, "showScene", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
WebViewObject: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "95bacYoyGRP8IFn7Mwr1xDx", "WebViewObject");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./GameData"), i = cc._decorator, a = i.ccclass, s = (i.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.start = function() {
this.node.setContentSize(cc.winSize);
var t = this.getComponent(cc.WebView), e = jsb.reflection.callStaticMethod("DeviceUtils", "getIDFAString"), o = jsb.reflection.callStaticMethod("DeviceUtils", "getIDFVString");
console.log("idfa" + e);
console.log("idfv" + o);
console.log("加载" + this.encode_utf8(this.FormatString(c.default.url, e, o)));
t.url = this.encode_utf8(this.FormatString(c.default.url, e, o));
};
e.prototype.FormatString = function(t) {
for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
for (var n = 0; n < e.length; n++) t = t.replace("{" + n + "}", e[n]);
return t;
};
e.prototype.encode_utf8 = function(t) {
return unescape(encodeURIComponent(t));
};
return e = r([ a ], e);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ]
}, {}, [ "UIDatePicker", "UIItemDay", "Appegg", "AudioManager", "GameData", "GameLoader", "GameManager", "PrivacySetup", "UICheckBtn", "UIEditBoxGroup", "UIGenderBtn", "UILoadScene", "UIShowNode", "WebViewObject" ]);