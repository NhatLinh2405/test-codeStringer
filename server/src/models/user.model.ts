import { model, models, Schema } from "mongoose";
import { createJWT } from "../utils/jsonwebtoken";
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
	},
	{
		timestamps: true,
	}
);

userSchema.methods.signToken = function () {
	const token = createJWT(this._id, this.email, this.name);
	return token;
};

const User = models.User || model("User", userSchema);
export default User;
