import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
	throw new Error('Invalid/Missing environment variable: "MONGO_URL"');
}

const url = process.env.MONGO_URL;

const connectDB = async (): Promise<void> => {
	try {
		const { connection } = await mongoose.connect(url as string);
		console.log(`⚡️[server]: Connect db successfully",  ${connection.host} `);
	} catch (error) {
		console.error("⚡️[server]: Connect db failed", error);
		console.log("Shutting down the server due to Unhandled Promise Rejection...");
		process.exit(1);
	}
};

export default connectDB;
