/* eslint-disable max-len */
export const STRIPE_API_URL = 'https://enigmatic-sierra-62634.herokuapp.com';
// export const STRIPE_API_URL = 'http://localhost:8080';
// export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51H2UVFGEWeA22HGiq4f5fZkFPUBPWgaUBvimSmeOWxNZPxZQsiEhGztkXsSTdu8xgMAAaswyZ8QloUjnYQYe9Lvm00our3jer1';
export const STRIPE_PUBLISHABLE_KEY = 'pk_live_51H2UVFGEWeA22HGi1rBXCkHoC95kud0bsto9vQQmSpczCIS7bcifkWqLXZlEPRqT9NRMVM6wqHDqP8juWZrzWY3r00xQWlVeOu';

const SIGN_UP_URL_MASTER = 'https://continuuma908d34b-a908d34b-master.auth.us-east-1.amazoncognito.com/signup?client_id=7cqjucfrab9ivhnu2k1nue92dl&redirect_uri=https%3A%2F%2Fcommunity.continuum.works%2Foauth2%2Fcallback&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile';
const SIGN_UP_URL_DEV = 'https://continuuma908d34b-a908d34b-dev.auth.us-east-1.amazoncognito.com/signup?client_id=6kikg73gh5p24e753l1kmr3o2b&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprojects%2F&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile';

export const SIGN_UP_URL = process.env.NODE_ENV === 'development'
  ? SIGN_UP_URL_DEV
  : SIGN_UP_URL_MASTER;

export const MOBILE_LAYOUT_BREAKPOINT = 768;
