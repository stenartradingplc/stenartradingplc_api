import { config } from "dotenv";
config({ path: 'src/config.env' });

export default {
  env: <string>process.env.NODE_ENV,
  mongoDB: <string>process.env.MONGO_DB_REMOTE,
  jwt: {
    secret: <string>process.env.JWT_SECRET,
    expires_in: <string>process.env.JWT_EXPIRES_IN,
  },
  delete_key: <string>process.env.DELETE_KEY,
  cloudinary: {
    cloud_name: <string>process.env.CLOUDINARY_CLOUD_NAME,
    api_key: <string>process.env.CLOUDINARY_API_KEY,
    api_secret: <string>process.env.CLOUDINARY_API_SECRET,
  },
};

