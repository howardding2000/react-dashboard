import ajax from './ajax';

/**
 * service address http://localhost:5000
 * ! use service address directly will cause 'Cross-domain problem'
 * * use proxy is the right way, confige in package.json
 * */
// const BASE = 'http://localhost:5000';

const BASE = '';
// login
export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'POST');

// add user
export const reqAddUser = (user) =>
  ajax(BASE + '/manage/user/add', user, 'POST');
