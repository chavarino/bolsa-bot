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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var degiro_api_1 = require("degiro-api");
var DeGiroActions = degiro_api_1.DeGiroEnums.DeGiroActions, DeGiroMarketOrderTypes = degiro_api_1.DeGiroEnums.DeGiroMarketOrderTypes, DeGiroTimeTypes = degiro_api_1.DeGiroEnums.DeGiroTimeTypes, PORTFOLIO_POSITIONS_TYPE_ENUM = degiro_api_1.DeGiroEnums.PORTFOLIO_POSITIONS_TYPE_ENUM;
process.env['DEGIRO_DEBUG'] = "1";
var degiro;
var promiseExecuter = function (promise) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, promise];
            case 1:
                _a.sent();
                return [2 /*return*/, 1];
            case 2:
                error_1 = _a.sent();
                console.log("error:", error_1);
                return [2 /*return*/, -1];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getPromiseExecuter = function (promise) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, promise];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_2 = _a.sent();
                console.log("error:", JSON.stringify(error_2));
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
electron_1.ipcMain.handle('login', function (event, username, pwd) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ... hacer acciones en el nombre del Renderer
                degiro = new degiro_api_1.default({ username: username, pwd: pwd }); // <-- Using ENV variables
                return [4 /*yield*/, promiseExecuter(degiro.login())];
            case 1: // <-- Using ENV variables
            return [2 /*return*/, _a.sent()];
        }
    });
}); });
electron_1.ipcMain.handle('reLogin', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!degiro) {
                    return [2 /*return*/, -1];
                }
                return [4 /*yield*/, promiseExecuter(degiro.login())];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
electron_1.ipcMain.handle('logout', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!degiro) {
                    return [2 /*return*/, -1];
                }
                return [4 /*yield*/, promiseExecuter(degiro.logout())];
            case 1:
                res = _a.sent();
                degiro = undefined;
                return [2 /*return*/, res];
        }
    });
}); });
electron_1.ipcMain.handle('isLogin', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ... hacer acciones en el nombre del Renderer
                if (!degiro) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, degiro.isLogin({ secure: true })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
electron_1.ipcMain.handle('getPosicionAbierta', function (event, idIndexDeGiro) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ... hacer acciones en el nombre del Renderer
                if (!degiro) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, getPromiseExecuter(degiro.getPortfolio({
                        type: PORTFOLIO_POSITIONS_TYPE_ENUM.OPEN,
                        getProductDetails: true,
                    }))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res ? res.filter(function (v) { return v.productData.id === idIndexDeGiro; }) : undefined];
        }
    });
}); });
electron_1.ipcMain.handle('getActiveOrders', function (event, idIndexDeGiro) { return __awaiter(void 0, void 0, void 0, function () {
    var options, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ... hacer acciones en el nombre del Renderer
                if (!degiro) {
                    return [2 /*return*/, false];
                }
                options = {
                    active: true,
                    lastTransactions: false
                };
                return [4 /*yield*/, getPromiseExecuter(degiro.getOrders(options))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); });
electron_1.ipcMain.handle('ventaPrecioMercado', function (event, idIndexDeGiro, size) { return __awaiter(void 0, void 0, void 0, function () {
    var order, resultado, orderId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ... hacer acciones en el nombre del Renderer
                if (!degiro) {
                    return [2 /*return*/, -1];
                }
                order = {
                    buySell: DeGiroActions.SELL,
                    orderType: DeGiroMarketOrderTypes.MARKET,
                    productId: idIndexDeGiro,
                    size: size,
                    timeType: DeGiroTimeTypes.DAY
                    // price: 270, limit price
                    // stopPrice: 2,
                };
                console.log("vender a", order);
                return [4 /*yield*/, getPromiseExecuter(degiro.createOrder(order))];
            case 1:
                resultado = _a.sent();
                if (!resultado) {
                    console.log("ERROR AL INTENTAR EJECUTAR ORDEN");
                    return [2 /*return*/, -1];
                }
                return [4 /*yield*/, tiempoEspera()];
            case 2:
                _a.sent();
                return [4 /*yield*/, getPromiseExecuter(degiro.executeOrder(order, resultado.confirmationId))];
            case 3:
                orderId = _a.sent();
                if (!orderId) {
                    console.log("ERROR AL INTENTAR confirmar ORDEN");
                    return [2 /*return*/, -1];
                }
                return [2 /*return*/, orderId];
        }
    });
}); });
var timeOutGeneric = function (baseTime, maxRandomOffsetTime, fn) {
    var time = baseTime + Math.random() * maxRandomOffsetTime; //humanizar bot
    return setTimeout(fn, time);
};
var tiempoEspera = function (tiempo) {
    return new Promise(function (resolve, reject) {
        timeOutGeneric(tiempo || 1000, 0, function () { return resolve(); });
    });
};
//# sourceMappingURL=electronDegiro.js.map