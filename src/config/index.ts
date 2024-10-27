import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const JWT_KEY = process.env.JWT_KEY;
export const MP_ACCESS_TOKEN= process.env.MP_ACCESS_TOKEN;
export const TUNEL_URL= process.env.TUNEL_URL;
export const API_VERSION = process.env.API_VERSION || "v1";
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const SMTP_SERVER = process.env.SMTP_SERVER;
export const SMTP_PORT = process.env.SMTP_PORT;
export const META_KEY = process.env.META_KEY;
export const META_URL = process.env.META_URL;