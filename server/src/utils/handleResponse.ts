import { IError, IResponse } from "../types/response";

export const handleError = (error: { message: string }, statusCode: number): IError => {
	const status = statusCode || 500;
	const message = error.message || "Something went wrong";
	throw {
		status,
		message,
	};
};

export const handleResponse = <T>(data: T, statusCode: number, message: string): IResponse<T> => {
	return {
		statusCode,
		message,
		data,
	};
};
