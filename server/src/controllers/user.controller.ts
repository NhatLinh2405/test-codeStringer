import axios from "axios";
import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { IRequestWithUser } from "../types/jwt";
import { createJWT, handleError, handleResponse } from "../utils";

// create user
export async function createUser(req: Request, res: Response, next: NextFunction) {
	const { name, password, email } = req.body;

	try {
		const existingUser = await User.findOne({ $or: [{ email }, { name }] });
		if (existingUser) {
			const existingField = existingUser.email === email ? "email" : "name";
			return res.status(400).json(handleError({ message: `${existingField} already exists` }, 400));
		}

		const newUser = new User({
			name,
			email,
			password: bcryptjs.hashSync(password, 10),
		});

		const { accessToken, refreshToken } = createJWT(newUser._id, newUser.email, newUser.name);

		newUser.accessToken = accessToken;
		newUser.refreshToken = refreshToken;
		await newUser.save();

		const response = {
			accessToken,
			refreshToken,
		};

		return res.status(201).json(handleResponse(response, 200, "User created successfully"));
	} catch (error) {
		next(error);
	}
}

export async function saveUser(userId: string, accessToken: string, refreshToken: string) {
	return await User.updateOne(
		{ _id: userId },
		{
			accessToken,
			refreshToken,
		}
	);
}

// sign in
export async function signIn(req: Request, res: Response, next: NextFunction) {
	const { password, email } = req.body;

	try {
		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(404).json(handleError({ message: "User not found" }, 404));
		}

		if (user && bcryptjs.compareSync(password, user.password)) {
			const { accessToken, refreshToken } = createJWT(user._id, user.email, user.name);

			await saveUser(user._id, accessToken, refreshToken);
			const response = {
				accessToken,
				refreshToken,
			};
			return res.status(200).json(handleResponse(response, 200, "User signed in successfully"));
		}

		return res.status(401).json(handleError({ message: "Wrong password" }, 401));
	} catch (error) {
		next(error);
	}
}

// login with google
export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, name, picture, sub } = await axios
			.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: {
					Authorization: `Bearer ${req.body.tokenId}`,
				},
			})
			.then((response) => response.data);

		const user = await User.findOne({ email });
		if (!user) {
			const newUser = new User({
				name,
				email,
				image: picture,
				password: bcryptjs.hashSync(sub, 10),
			});

			const { accessToken, refreshToken } = createJWT(newUser._id, newUser.email, newUser.name);
			newUser.accessToken = accessToken;
			newUser.refreshToken = refreshToken;
			await newUser.save();

			return res
				.status(201)
				.json(handleResponse({ accessToken, refreshToken }, 201, "User created successfully"));
		}
		const { accessToken, refreshToken } = createJWT(user._id, user.email, user.name);

		await saveUser(user._id, accessToken, refreshToken);
		return res
			.status(200)
			.json(handleResponse({ accessToken, refreshToken }, 200, "User signed in successfully"));
	} catch (error) {
		next(error);
	}
};

// refresh token
export async function refreshToken(req: Request, res: Response, next: NextFunction) {
	const { refreshToken } = req.body;

	try {
		const user = await User.findOne({
			refreshToken,
		});

		if (!user) {
			res.status(404).json(handleError({ message: "User not found" }, 404));
		}

		const { accessToken, refreshToken: newRefreshToken } = createJWT(user._id, user.email, user.name);

		await saveUser(user._id, accessToken, newRefreshToken);

		res.status(200).json({
			message: "Token refreshed successfully",
			data: {
				accessToken,
				refreshToken: newRefreshToken,
			},
		});
	} catch (error) {
		next(error);
	}
}
// get profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { user } = req as IRequestWithUser;
		const userData = await User.findById(user._id);
		if (!userData) throw handleError(new Error("User not found"), 404);
		res.status(200).json(handleResponse(userData, 200, "User profile fetched successfully"));
	} catch (error) {
		next(error);
	}
};
