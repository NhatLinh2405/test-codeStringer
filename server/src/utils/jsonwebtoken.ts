import { sign, verify } from "jsonwebtoken";

export const createJWT = (_id: string, role: string, name: string) => {
	return sign({ _id, role, name }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
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
