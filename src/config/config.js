export const domainWeb = 'http://localhost:8085/public-api/';

export const api = {
  createAccount: {
    url: domainWeb + 'account/create',
  },
  genAccessToken: {
    url: domainWeb + '/cost/public-api/gen-access-token',
  },
  userInfo: {
    url: domainWeb + '/cost/public-api/employee/info',
  },
};
