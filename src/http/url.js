import { API_URL } from "./config";

const version = process.env.VERSION;
const baseUrl = `${API_URL}/api/${version}`;

export default baseUrl;
