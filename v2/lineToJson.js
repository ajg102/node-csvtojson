"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var set_1 = __importDefault(require("lodash/set"));
var CSVError_1 = __importDefault(require("./CSVError"));
var numReg = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
function default_1(csvRows, conv) {
    return __awaiter(this, void 0, void 0, function () {
        var res, i, len, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = [];
                    i = 0, len = csvRows.length;
                    _a.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    return [4 /*yield*/, processRow(csvRows[i], conv, i)];
                case 2:
                    r = _a.sent();
                    if (r) {
                        res.push(r);
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, res];
            }
        });
    });
}
exports.default = default_1;
function processRow(row, conv, index) {
    return __awaiter(this, void 0, void 0, function () {
        var headRow, resultRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (conv.parseParam.checkColumn &&
                        conv.parseRuntime.headers &&
                        row.length !== conv.parseRuntime.headers.length) {
                        throw CSVError_1.default.column_mismatched(conv.parseRuntime.parsedLineNumber + index);
                    }
                    headRow = conv.parseRuntime.headers || [];
                    return [4 /*yield*/, convertRowToJson(row, headRow, conv)];
                case 1:
                    resultRow = _a.sent();
                    if (resultRow) {
                        return [2 /*return*/, resultRow];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function convertRowToJson(row, headRow, conv) {
    return __awaiter(this, void 0, void 0, function () {
        var hasValue, resultRow, i, len, item, head, convFunc, convRes, convertFunc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hasValue = false;
                    resultRow = {};
                    i = 0, len = row.length;
                    _a.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 5];
                    item = row[i];
                    if (conv.parseParam.ignoreEmpty && item === "") {
                        return [3 /*break*/, 4];
                    }
                    hasValue = true;
                    head = headRow[i];
                    if (!head || head === "") {
                        head = headRow[i] = "field" + (i + 1);
                    }
                    convFunc = getConvFunc(head, i, conv);
                    if (!convFunc) return [3 /*break*/, 3];
                    return [4 /*yield*/, convFunc(item, head, resultRow, row, i)];
                case 2:
                    convRes = _a.sent();
                    if (convRes !== undefined) {
                        setPath(resultRow, head, convRes, conv, i);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    if (conv.parseParam.checkType) {
                        convertFunc = checkType(item, head, i, conv);
                        item = convertFunc(item);
                    }
                    if (item !== undefined) {
                        setPath(resultRow, head, item, conv, i);
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    if (hasValue) {
                        return [2 /*return*/, resultRow];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var builtInConv = {
    string: stringType,
    number: numberType,
    omit: function () { },
};
function getConvFunc(head, i, conv) {
    if (conv.parseRuntime.columnConv[i] !== undefined) {
        return conv.parseRuntime.columnConv[i];
    }
    else {
        var flag = conv.parseParam.colParser[head];
        if (flag === undefined) {
            return (conv.parseRuntime.columnConv[i] = null);
        }
        if (typeof flag === "object") {
            flag = flag.cellParser || "string";
        }
        if (typeof flag === "string") {
            flag = flag.trim().toLowerCase();
            var builtInFunc = builtInConv[flag];
            if (builtInFunc) {
                return (conv.parseRuntime.columnConv[i] = builtInFunc);
            }
            else {
                return (conv.parseRuntime.columnConv[i] = null);
            }
        }
        else if (typeof flag === "function") {
            return (conv.parseRuntime.columnConv[i] = flag);
        }
        else {
            return (conv.parseRuntime.columnConv[i] = null);
        }
    }
}
function setPath(resultJson, head, value, conv, headIdx) {
    if (!conv.parseRuntime.columnValueSetter[headIdx]) {
        if (conv.parseParam.flatKeys) {
            conv.parseRuntime.columnValueSetter[headIdx] = flatSetter;
        }
        else {
            if (head.indexOf(".") > -1) {
                var headArr = head.split(".");
                var jsonHead = true;
                while (headArr.length > 0) {
                    var headCom = headArr.shift();
                    if (headCom.length === 0) {
                        jsonHead = false;
                        break;
                    }
                }
                if (!jsonHead ||
                    (conv.parseParam.colParser[head] &&
                        conv.parseParam.colParser[head].flat)) {
                    conv.parseRuntime.columnValueSetter[headIdx] = flatSetter;
                }
                else {
                    conv.parseRuntime.columnValueSetter[headIdx] = jsonSetter;
                }
            }
            else {
                conv.parseRuntime.columnValueSetter[headIdx] = flatSetter;
            }
        }
    }
    if (conv.parseParam.nullObject === true && value === "null") {
        value = null;
    }
    conv.parseRuntime.columnValueSetter[headIdx](resultJson, head, value);
    // flatSetter(resultJson, head, value);
}
function flatSetter(resultJson, head, value) {
    resultJson[head] = value;
}
function jsonSetter(resultJson, head, value) {
    set_1.default(resultJson, head, value);
}
function checkType(item, head, headIdx, conv) {
    if (conv.parseRuntime.headerType[headIdx]) {
        return conv.parseRuntime.headerType[headIdx];
    }
    else if (head.indexOf("number#!") > -1) {
        return (conv.parseRuntime.headerType[headIdx] = numberType);
    }
    else if (head.indexOf("string#!") > -1) {
        return (conv.parseRuntime.headerType[headIdx] = stringType);
    }
    else if (conv.parseParam.checkType) {
        return (conv.parseRuntime.headerType[headIdx] = dynamicType);
    }
    else {
        return (conv.parseRuntime.headerType[headIdx] = stringType);
    }
}
function numberType(item) {
    var rtn = parseFloat(item);
    if (isNaN(rtn)) {
        return item;
    }
    return rtn;
}
function stringType(item) {
    return item.toString();
}
function dynamicType(item) {
    var trimed = item.trim();
    if (trimed === "") {
        return stringType(item);
    }
    if (numReg.test(trimed)) {
        return numberType(item);
    }
    else if ((trimed.length === 5 && trimed.toLowerCase() === "false") ||
        (trimed.length === 4 && trimed.toLowerCase() === "true")) {
        return booleanType(item);
    }
    else if ((trimed[0] === "{" && trimed[trimed.length - 1] === "}") ||
        (trimed[0] === "[" && trimed[trimed.length - 1] === "]")) {
        return jsonType(item);
    }
    else {
        return stringType(item);
    }
}
function booleanType(item) {
    var trimmed = item.trim();
    return !(trimmed.length === 5 && trimmed.toLowerCase() === "false");
}
function jsonType(item) {
    try {
        return JSON.parse(item);
    }
    catch (e) {
        return item;
    }
}
//# sourceMappingURL=lineToJson.js.map