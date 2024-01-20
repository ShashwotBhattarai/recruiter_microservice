import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../configs/logger.config";

export function authMiddleware(allowedRoles: Array<string>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.slice(7);

		if (!token) {
			logger.info("Access token is missing");
			return res.status(401).json({ message: "Access token is missing" });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWTSECRET as string) as {
				role: string;
			};

			const userRole = decoded.role;

			if (!allowedRoles.includes(userRole)) {
				logger.info("Access denied");
				return res.status(403).json({ message: "Access denied" });
			} else {
				logger.info("Access granted");
				next();
			}
		} catch (error) {
			logger.error("Unknown error in authMiddleware", error);
			return res.status(401).json({ message: error });
		}
	};
}
