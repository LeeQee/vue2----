const env = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);
const IP = {
  development: "http://www.devcqumanager.cn",
  test: "http://www.devcqumanager.cn",
  production: "https://cqu.cxstar.cn",
};
const baseURL = IP[env];
const commonUploadDownloadApi = baseURL + "/api/v1/common/download?sid=";
export default {
  baseURL,
  commonUploadDownloadApi,
};
