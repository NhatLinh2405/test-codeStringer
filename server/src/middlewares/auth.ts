import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../types/jwt";
import { verifyJWT } from "../utils";

export const currentUser = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			throw new Error();
		}
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error();
		}
		const decoded = (await verifyJWT(token)) as {
			_id: string;
			name: string;
			email: string;
			iat: number;
			exp: number;
		};
		if (!decoded) {
			throw new Error();
		}
		(req as IRequestWithUser).user = decoded;
		next();
	} catch (error) {
		res.status(401).json({
			message: "Please login to continue",
		});
	}
};
