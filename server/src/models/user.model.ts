import { model, models, Schema } from "mongoose";
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
			default: "https://res.cloudinary.com/azurestore/image/upload/v1695735133/avatar_sialno.png",
		},
		accessToken: {
			type: String,
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = models.User || model("User", userSchema);
export default User;
