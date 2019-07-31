"use strict";

function _defineProperty(obj, key, value) {
    if (key in obj)
    {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    }
    else
    {
        obj[key] = value;
    }
    return obj;
}

setTimeout(function () {
    function getAllModules() {
        return new Promise(function (resolve) {
            var id = _.uniqueId("fakeModule_");
            window["webpackJsonp"]([], _defineProperty({}, id, function (module, exports, __webpack_require__) {
                resolve(__webpack_require__.c);
            }), [id]);
        });
    }

    var modules = getAllModules()._value;

    //  Automatically locate modules
   
    for (var key in modules) {
        if (modules[key].exports) {
            if (modules[key].exports.default) {
                if (modules[key].exports.default.Wap) {
                    store_id = modules[key].i.replace(/"/g, '"');                    
                }
            }
        }
    }
}, 5000);

function _requireById(id) {
    return webpackJsonp([], null, [id]);
}

// Module IDs
var store_id = 0;
var Store = {};

function init() {
    Store = _requireById(store_id).default;
    console.log(Store);
    loop();
}

setTimeout(function () {
    init();
}, 7000);
