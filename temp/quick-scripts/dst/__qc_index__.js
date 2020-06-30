
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/resources/UIDatePicker/UIDatePicker');
require('./assets/resources/UIDatePicker/UIItemDay');
require('./assets/scripts/Appegg');
require('./assets/scripts/AudioManager');
require('./assets/scripts/GameData');
require('./assets/scripts/GameLoader');
require('./assets/scripts/GameManager');
require('./assets/scripts/PrivacySetup');
require('./assets/scripts/UICheckBtn');
require('./assets/scripts/UIEditBoxGroup');
require('./assets/scripts/UIGenderBtn');
require('./assets/scripts/UILoadScene');
require('./assets/scripts/UIShowNode');
require('./assets/scripts/WebViewObject');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();