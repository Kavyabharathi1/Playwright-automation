// utils/helpers.ts

import loginData from '../test-data/loginData.json';

export function prepareRegister(data: any) {
  const suffix = Date.now().toString().slice(-4); // unique 4-digit suffix
  const username = (data.username + suffix).slice(0, 15);
  const email = data.email.replace('%SUFFIX%', suffix);
  return { ...data, username, email, suffix };
}

export function prepareLogin(loginTpl: typeof loginData.valid, suffix: string) {
  const username = loginTpl.username.replace('%SUFFIX%', suffix);
  return { username, password: loginTpl.password, remember: loginTpl.remember };
}
