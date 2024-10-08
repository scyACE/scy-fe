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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var inquirer_1 = __importDefault(require("inquirer"));
var log_1 = __importDefault(require("./log"));
var constants_1 = require("./constants");
var packageNamesToRemove = [
    '@babel/eslint-parser',
    '@commitlint/cli',
    '@iceworks/spec',
    'babel-eslint',
    'eslint',
    'husky',
    'markdownlint',
    'prettier',
    'stylelint',
    'tslint',
];
var packagePrefixesToRemove = [
    '@commitlint/',
    '@typescript-eslint/',
    'eslint-',
    'stylelint-',
    'markdownlint-',
    'commitlint-',
];
var checkUselessConfig = function (cwd) {
    return []
        .concat(glob_1.default.sync('.eslintrc?(.@(yaml|yml|json))', { cwd: cwd }))
        .concat(glob_1.default.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd: cwd }))
        .concat(glob_1.default.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd: cwd }))
        .concat(glob_1.default.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd: cwd }))
        .concat(glob_1.default.sync('tslint.@(yaml|yml|json)', { cwd: cwd }))
        .concat(glob_1.default.sync('.kylerc?(.@(yaml|yml|json))', { cwd: cwd }));
};
var checkReWriteConfig = function (cwd) {
    return glob_1.default
        .sync('**/*.ejs', { cwd: path_1.default.resolve(__dirname, '../config') })
        .map(function (name) { return name.replace(/^_/, '.').replace(/\.ejs$/, ''); })
        .filter(function (filename) { return fs_extra_1.default.existsSync(path_1.default.resolve(cwd, filename)); });
};
exports.default = (function (cwd, rewriteConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var pkgPath, pkg, dependencies, willRemovePackage, uselessConfig, reWriteConfig, willChangeCount, isOverWrite, uselessConfig_1, uselessConfig_1_1, name_1, willRemovePackage_1, willRemovePackage_1_1, name_2;
    var e_1, _a, e_2, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                pkgPath = path_1.default.resolve(cwd, 'package.json');
                pkg = fs_extra_1.default.readJSONSync(pkgPath);
                dependencies = [].concat(Object.keys(pkg.dependencies || {}), Object.keys(pkg.devDependencies || []));
                willRemovePackage = dependencies.filter(function (name) {
                    return packageNamesToRemove.includes(name) ||
                        packagePrefixesToRemove.some(function (prefix) { return name.startsWith(prefix); });
                });
                uselessConfig = checkUselessConfig(cwd);
                reWriteConfig = checkReWriteConfig(cwd);
                willChangeCount = willRemovePackage.length + uselessConfig.length + reWriteConfig.length;
                if (!(willChangeCount > 0)) return [3, 3];
                log_1.default.warn("\u68C0\u6D4B\u5230\u9879\u76EE\u4E2D\u5B58\u5728\u53EF\u80FD\u4E0E ".concat(constants_1.PKG_NAME, " \u51B2\u7A81\u7684\u4F9D\u8D56\u548C\u914D\u7F6E\uFF0C\u4E3A\u4FDD\u8BC1\u6B63\u5E38\u8FD0\u884C\u5C06"));
                if (willRemovePackage.length > 0) {
                    log_1.default.warn('删除以下依赖：');
                    log_1.default.warn(JSON.stringify(willRemovePackage, null, 2));
                }
                if (uselessConfig.length > 0) {
                    log_1.default.warn('删除以下配置文件：');
                    log_1.default.warn(JSON.stringify(uselessConfig, null, 2));
                }
                if (reWriteConfig.length > 0) {
                    log_1.default.warn('覆盖以下配置文件：');
                    log_1.default.warn(JSON.stringify(reWriteConfig, null, 2));
                }
                if (!(typeof rewriteConfig === 'undefined')) return [3, 2];
                return [4, inquirer_1.default.prompt({
                        type: 'confirm',
                        name: 'isOverWrite',
                        message: '请确认是否继续：',
                    })];
            case 1:
                isOverWrite = (_c.sent()).isOverWrite;
                if (!isOverWrite)
                    process.exit(0);
                return [3, 3];
            case 2:
                if (!reWriteConfig) {
                    process.exit(0);
                }
                _c.label = 3;
            case 3:
                try {
                    for (uselessConfig_1 = __values(uselessConfig), uselessConfig_1_1 = uselessConfig_1.next(); !uselessConfig_1_1.done; uselessConfig_1_1 = uselessConfig_1.next()) {
                        name_1 = uselessConfig_1_1.value;
                        fs_extra_1.default.removeSync(path_1.default.resolve(cwd, name_1));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (uselessConfig_1_1 && !uselessConfig_1_1.done && (_a = uselessConfig_1.return)) _a.call(uselessConfig_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                delete pkg.eslintConfig;
                delete pkg.eslintIgnore;
                delete pkg.stylelint;
                try {
                    for (willRemovePackage_1 = __values(willRemovePackage), willRemovePackage_1_1 = willRemovePackage_1.next(); !willRemovePackage_1_1.done; willRemovePackage_1_1 = willRemovePackage_1.next()) {
                        name_2 = willRemovePackage_1_1.value;
                        delete (pkg.dependencies || {})[name_2];
                        delete (pkg.devDependencies || {})[name_2];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (willRemovePackage_1_1 && !willRemovePackage_1_1.done && (_b = willRemovePackage_1.return)) _b.call(willRemovePackage_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                fs_extra_1.default.writeFileSync(path_1.default.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');
                return [2, pkg];
        }
    });
}); });
