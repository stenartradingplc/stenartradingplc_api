// Cloudinary module
import { v2 as cloudinary } from "cloudinary";

// Configs
import configs from "../configs";

// Set up cloudinary configuration
cloudinary.config({
  cloud_name: configs.cloudinary.cloud_name,
  api_key: configs.cloudinary.api_key,
  api_secret: configs.cloudinary.api_secret,
});

export default cloudinary;
