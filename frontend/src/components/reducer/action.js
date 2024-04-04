// 定义action类型
export const USER_LOGIN = 'USER_LOGIN';
export const USER_UNLOGIN = 'USER_UNLOGIN';


// 定义action creators
export const userLogin = (userName, userId) => ({
  type: USER_LOGIN,
  payload: {
    userName,
    userId
  },
});

export const userUnLogin = () => ({
  type: USER_UNLOGIN
});