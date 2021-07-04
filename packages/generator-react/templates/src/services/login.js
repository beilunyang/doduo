import http from './http';
import { LOGIN_URL } from '@/constants/login';

const login = async authorizationCode => {
  const data = await http.get({
    url: LOGIN_URL,
    params: {
      authorizationCode
    }
  });
  return data.identityId;
};

export default {
  login
};
