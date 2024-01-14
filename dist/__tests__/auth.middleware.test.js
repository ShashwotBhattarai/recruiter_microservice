"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../middlewares/auth.middleware"); // Adjust the import path
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
}));
describe("authMiddleware", () => {
    const mockRequest = (token) => ({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();
        return res;
    };
    const mockNext = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should allow access for valid token and authorized role", () => {
        const req = mockRequest("validToken");
        const res = mockResponse();
        const allowedRoles = ["admin"];
        jsonwebtoken_1.default.verify.mockReturnValue({ role: "admin" });
        (0, auth_middleware_1.authMiddleware)(allowedRoles)(req, res, mockNext);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it("should deny access for valid token and unauthorized role", () => {
        const req = mockRequest("validToken");
        const res = mockResponse();
        const allowedRoles = ["admin"];
        jsonwebtoken_1.default.verify.mockReturnValue({ role: "user" });
        (0, auth_middleware_1.authMiddleware)(allowedRoles)(req, res, mockNext);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("should deny access for invalid token", () => {
        const req = mockRequest("invalidToken");
        const res = mockResponse();
        const allowedRoles = ["admin"];
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });
        (0, auth_middleware_1.authMiddleware)(allowedRoles)(req, res, mockNext);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("should deny access if token is missing", () => {
        const req = mockRequest(undefined);
        const res = mockResponse();
        const allowedRoles = ["admin"];
        (0, auth_middleware_1.authMiddleware)(allowedRoles)(req, res, mockNext);
        expect(jsonwebtoken_1.default.verify).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(mockNext).not.toHaveBeenCalled();
    });
    // Add more test cases as needed
});
