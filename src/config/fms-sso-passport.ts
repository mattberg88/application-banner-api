export default {
  sessionShareUrl:
    process.env.API_BASE_URL + process.env.FMS_SSO_SESSION_SHARE_ENDPOINT,
  salesmgmtUrl:
    process.env.API_BASE_URL + process.env.FMS_SSO_SALES_MANAGEMENT_ENDPOINT,
  loginUrl: process.env.FMS_SSO_LOGIN_URL,
  fmsCookieName: process.env.FMS_SSO_COOKIE_NAME,
};
