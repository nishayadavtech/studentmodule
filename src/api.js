const trimTrailingSlash = (value = "") => value.replace(/\/$/, "");

const configuredApiUrl = trimTrailingSlash(process.env.REACT_APP_API_URL || "");
const fallbackLocalApiUrl = "http://localhost:5500";
const shouldUseDevProxy =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_USE_DEV_PROXY !== "false";

const API = shouldUseDevProxy
  ? "/api"
  : configuredApiUrl || fallbackLocalApiUrl;

export default API;

export const apiUrl = (path = "") => {
  if (!path) return API;
  return `${API}${path.startsWith("/") ? path : `/${path}`}`;
};

export const resolveAssetUrl = (path, fallback = "") => {
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path)) return path;
  return apiUrl(path);
};
