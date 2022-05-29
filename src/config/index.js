"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var yaml_1 = require("yaml");
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var __dirname = path_1["default"].dirname((0, url_1.fileURLToPath)(import.meta.url));
var filePath = path_1["default"].resolve(__dirname, '../../config.yaml');
var configFile = (0, fs_1.readFileSync)(filePath, 'utf8');
var config = yaml_1["default"].parse(configFile);
exports["default"] = __assign({}, config);
