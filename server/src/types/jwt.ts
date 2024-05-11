import { Request } from "express";

export interface JwtPayload {
	_id: string;
	email: string;
	name: string;
}

export interface IRequestWithUser extends Request {
	user: {
		_id: string;
		name: string;
		email: string;
		iat: number;
		exp: number;
	};
}
