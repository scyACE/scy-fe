"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var ora_1 = __importDefault(require("ora"));
var log_1 = __importDefault(require("../utils/log"));
var npm_type_1 = __importDefault(require("../utils/npm-type"));
var constants_1 = require("../utils/constants");
var checkLatestVersion = function () { return __awaiter(void 0, void 0, void 0, function () {
    var npm, latestVersion, compareArr, beComparedArr, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, npm_type_1.default];
            case 1:
                npm = _a.sent();
                latestVersion = (0, child_process_1.execSync)("".concat(npm, " view ").concat(constants_1.PKG_NAME, " version")).toString('utf-8').trim();
                if (constants_1.PKG_VERSION === latestVersion)
                    return [2, null];
                compareArr = constants_1.PKG_VERSION.split('.').map(Number);
                beComparedArr = latestVersion.split('.').map(Number);
                for (i = 0; i < compareArr.length; i++) {
                    if (compareArr[i] > beComparedArr[i]) {
                        return [2, null];
                    }
                    else if (compareArr[i] < beComparedArr[i]) {
                        return [2, latestVersion];
                    }
                }
                return [2];
        }
    });
}); };
exports.default = (function (install) {
    if (install === void 0) { install = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var checking, npm, latestVersion, update, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checking = (0, ora_1.default)("[".concat(constants_1.PKG_NAME, "] \u6B63\u5728\u68C0\u67E5\u6700\u65B0\u7248\u672C..."));
                    checking.start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, npm_type_1.default];
                case 2:
                    npm = _a.sent();
                    return [4, checkLatestVersion()];
                case 3:
                    latestVersion = _a.sent();
                    checking.stop();
                    if (latestVersion && install) {
                        update = (0, ora_1.default)("[".concat(constants_1.PKG_NAME, "] \u5B58\u5728\u65B0\u7248\u672C\uFF0C\u5C06\u5347\u7EA7\u81F3 ").concat(latestVersion));
                        update.start();
                        (0, child_process_1.execSync)("".concat(npm, " i -g ").concat(constants_1.PKG_NAME));
                        update.stop();
                    }
                    else if (latestVersion) {
                        log_1.default.warn("\u6700\u65B0\u7248\u672C\u4E3A ".concat(latestVersion, "\uFF0C\u672C\u5730\u7248\u672C\u4E3A ").concat(constants_1.PKG_VERSION, "\uFF0C\u8BF7\u5C3D\u5FEB\u5347\u7EA7\u5230\u6700\u65B0\u7248\u672C\u3002\n\u4F60\u53EF\u4EE5\u6267\u884C ").concat(npm, " install -g ").concat(constants_1.PKG_NAME, "@latest \u6765\u5B89\u88C5\u6B64\u7248\u672C\n"));
                    }
                    else if (install) {
                        log_1.default.info("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684\u66F4\u65B0");
                    }
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    checking.stop();
                    log_1.default.error(e_1);
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
});
