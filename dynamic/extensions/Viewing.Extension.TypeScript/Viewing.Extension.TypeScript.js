(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")exports["Viewing.Extension.TypeScript"]=factory();else root["Viewing.Extension.TypeScript"]=factory()})(this,function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)}({0:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _ViewingExtensionTypeScriptExtension = __webpack_require__(226);\n\nvar _ViewingExtensionTypeScriptExtension2 = _interopRequireDefault(_ViewingExtensionTypeScriptExtension);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nAutodesk.Viewing.theExtensionManager.registerExtension('Viewing.Extension.TypeScript', _ViewingExtensionTypeScriptExtension2.default);//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVmlld2luZy5FeHRlbnNpb24uVHlwZVNjcmlwdC9WaWV3aW5nLkV4dGVuc2lvbi5UeXBlU2NyaXB0LmpzPzRmNzMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxPQUFULENBQWlCLG1CQUFqQixDQUFxQyxpQkFBckMsQ0FDRSw4QkFERiIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgVHlwZVNjcmlwdEV4dGVuc2lvbiBmcm9tICcuL1ZpZXdpbmcuRXh0ZW5zaW9uLlR5cGVTY3JpcHRFeHRlbnNpb24udHMnXG5cbkF1dG9kZXNrLlZpZXdpbmcudGhlRXh0ZW5zaW9uTWFuYWdlci5yZWdpc3RlckV4dGVuc2lvbihcbiAgJ1ZpZXdpbmcuRXh0ZW5zaW9uLlR5cGVTY3JpcHQnLFxuICBUeXBlU2NyaXB0RXh0ZW5zaW9uKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9WaWV3aW5nLkV4dGVuc2lvbi5UeXBlU2NyaXB0L1ZpZXdpbmcuRXh0ZW5zaW9uLlR5cGVTY3JpcHQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9")},226:function(module,exports){eval("\"use strict\";\nmodule.exports = (function () {\n    function TypeScriptExtension(viewer, options) {\n    }\n    TypeScriptExtension.prototype.load = function () {\n        console.log('Viewing.Extension.TypeScript loaded');\n        return true;\n    };\n    TypeScriptExtension.prototype.unload = function () {\n        console.log('Viewing.Extension.TypeScript unloaded');\n        return true;\n    };\n    return TypeScriptExtension;\n}());\n//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVmlld2luZy5FeHRlbnNpb24uVHlwZVNjcmlwdC9WaWV3aW5nLkV4dGVuc2lvbi5UeXBlU2NyaXB0RXh0ZW5zaW9uLnRzPzVjODYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6IjIyNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR5cGVTY3JpcHRFeHRlbnNpb24odmlld2VyLCBvcHRpb25zKSB7XG4gICAgfVxuICAgIFR5cGVTY3JpcHRFeHRlbnNpb24ucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdWaWV3aW5nLkV4dGVuc2lvbi5UeXBlU2NyaXB0IGxvYWRlZCcpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFR5cGVTY3JpcHRFeHRlbnNpb24ucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1ZpZXdpbmcuRXh0ZW5zaW9uLlR5cGVTY3JpcHQgdW5sb2FkZWQnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gVHlwZVNjcmlwdEV4dGVuc2lvbjtcbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL1ZpZXdpbmcuRXh0ZW5zaW9uLlR5cGVTY3JpcHQvVmlld2luZy5FeHRlbnNpb24uVHlwZVNjcmlwdEV4dGVuc2lvbi50c1xuICoqIG1vZHVsZSBpZCA9IDIyNlxuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==")}})});