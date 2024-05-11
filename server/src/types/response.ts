export interface IError extends ErrorConstructor {
	message: string;
	status: number;
}

export interface IResponse<T> {
	message: string;
	data: T;
	statusCode: number;
}
