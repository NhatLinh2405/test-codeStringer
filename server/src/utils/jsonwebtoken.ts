import { sign, verify } from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

const signToken = async (payload: JwtPayload, expiresIn: string): Promise<string> => {
	return await sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const createJWT = async (_id: string, email: string, name: string) => {
	const payload = { _id, email, name };
	const [accessToken, refreshToken] = await Promise.all([
		signToken(payload, String(process.env.ACCESS_TOKEN_EXP)),
		signToken(payload, String(process.env.REFRESH_TOKEN_EXP)),
	]);
	return {
		accessToken,
		refreshToken,
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
