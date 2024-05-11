import { sign, verify } from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

const signToken = (payload: JwtPayload, expiresIn: string): string => {
	return sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const createJWT = (_id: string, email: string, name: string) => {
	const payload = { _id, email, name };
	return {
		accessToken: signToken(payload, String(process.env.ACCESS_TOKEN_EXP)),
		refreshToken: signToken(payload, String(process.env.REFRESH_TOKEN_EXP)),
	};
};

export const verifyJWT = (token: string) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = verify(token, process.env.JWT_SECRET as string);
			resolve(decoded);
		} catch (error) {
			reject(error);
		}
	});
};
