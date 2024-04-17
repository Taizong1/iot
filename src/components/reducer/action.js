// 定义action类型
export const USER_LOGIN = 'USER_LOGIN';
export const USER_UNLOGIN = 'USER_UNLOGIN';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';


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

export const updateUserInfo = (emailAddress, phoneNo) => ({
  type: UPDATE_USER_INFO,
  payload: {
    emailAddress,
    phoneNo
  }
});