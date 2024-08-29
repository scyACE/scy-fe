"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_exists_1 = require("command-exists");
var promise = new Promise(function (resolve) {
    if (!(0, command_exists_1.sync)('pnpm'))
        return resolve('npm');
    resolve('pnpm');
});
exports.default = promise;
