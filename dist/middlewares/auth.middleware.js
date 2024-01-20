"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_config_1 = __importDefault(require("../configs/logger.config"));
function authMiddleware(allowedRoles) {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
        if (!token) {
            logger_config_1.default.info("Access token is missing");
            return res.status(401).json({ message: "Access token is missing" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTSECRET);
            const userRole = decoded.role;
            if (!allowedRoles.includes(userRole)) {
                logger_config_1.default.info("Access denied");
                return res.status(403).json({ message: "Access denied" });
            }
            else {
                logger_config_1.default.info("Access granted");
                next();
            }
        }
        catch (error) {
            logger_config_1.default.error("Unknown error in authMiddleware", error);
            return res.status(401).json({ message: error });
        }
    };
}
exports.authMiddleware = authMiddleware;
