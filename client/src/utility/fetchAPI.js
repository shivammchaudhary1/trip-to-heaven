import { config } from "../utility/fetchAPI.js";
import { store } from "##/src/app/store.js";
import { setIsAuthenticated } from "##/src/app/authSlice.js";

export const client = {
  get: (url, options = {}) => {
    const fullUrl = new URL(url, config.api).toString();
    return fetchApi(fullUrl, { ...options, method: "GET" });
  },
  post: (url, options = {}) => {
    const fullUrl = new URL(url, config.api).toString();
    return fetchApi(fullUrl, { ...options, method: "POST" });
  },
  put: (url, options = {}) => {
    const fullUrl = new URL(url, config.api).toString();
    return fetchApi(fullUrl, { ...options, method: "PUT" });
  },
  patch: (url, data = {}, options = {}) => {
    const fullUrl = new URL(url, config.api).toString();
    return fetchApi(fullUrl, {
      ...options,
      method: "PATCH",
      body: data,
    });
  },
  delete: (url, options = {}) => {
    const fullUrl = new URL(url, config.api).toString();
    return fetchApi(fullUrl, { ...options, method: "DELETE" });
  },
};

// API handler for trackify bakend
function fetchApi(url, options = {}) {
  if (new URL(url, config.api).origin !== config.api) {
    // Please use regular fetch for outside trackify api.
    throw new Error(`Use regular fetch to make request to '${url}'`);
  }
  if (options.body) {
    options.body =
      typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
  }
  options.credentials = options.credentials || "include";
  options.headers = options.headers || {};
  options.headers.Accept = options.headers.Accept || "application/json";
  options.headers["Content-Type"] =
    options.headers["Content-Type"] || "application/json";
  return fetch(url, options).then(checkStatus).then(parseJSON).catch(logError);
}
function checkStatus(response) {
  if (response.ok) {
    return response;
  } else if (response.status === 403) {
    store.dispatch(setIsAuthenticated({ isAuthenticated: false }));
    // window.location = "/signin";
  } else {
    // Other statuses are thrown intentionally, parse the response and use the message from it
    return response.json().then((parsedResponse) => {
      // If there is a message, use that to make a new AppError, otherwise just use a default message
      const error = new Error({});
      // This is to match the SerializedError interface from @reduxjs/toolkit
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      error.code = response.status.toString();
      error.message =
        typeof parsedResponse === "string"
          ? parsedResponse
          : parsedResponse.message
            ? parsedResponse.message
            : response.statusText;
      throw error;
    });
  }
}

function parseJSON(response) {
  if (response && response.headers.get("content-type")?.includes("json")) {
    return response.json();
  }
  return response;
}
function logError(error) {
  // eslint-disable-next-line no-console
  throw error;
}
const FetchApi = { fetch: fetchApi };
export default FetchApi;
