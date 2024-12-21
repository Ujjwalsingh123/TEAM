import dotenv from "dotenv";

// Load environment variables from a .env file into process.env with error handling
const result = dotenv.config();
if (result.error) {
  console.warn("Warning: .env file not found or could not be loaded.");
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import userRoute from "./route/userRoute.js";
import adminRoute from "./route/adminRoute.js";

const app = express();

// Middleware for Cross-Origin Resource Sharing and JSON request parsing
app.use(cors());
app.use(express.json());

const __dirname = path.resolve(); // Ensures compatibility with different environments for path resolution

const PORT = process.env.PORT || 4001; // Default port set to 4001 if process.env.PORT is undefined

// Serve static files from the Frontend build directory
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  
// Route all undefined routes to the index.html in the dist directory (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html")); // Ensuring correct path to index.html
});

const URI = process.env.MongoDBURI; // MongoDB connection URI from environment variable

// Connect to MongoDB with Mongoose
mongoose.connect(URI, {
  // useNewUrlParser and useUnifiedTopology are no longer necessary in Mongoose 6+
}).then(() => {
  console.log("MongoDB Connected");
}).catch((error) => {
  console.log("Error: ", error); // Log any connection errors
});

// Define routes for user and admin endpoints
app.use("/user", userRoute);
app.use("/admin", adminRoute);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
