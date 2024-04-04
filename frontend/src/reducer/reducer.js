import { USER_LOGIN, USER_UNLOGIN } from './action';

// 定义初始状态
/*
isLogin 是否登录
userId 用户Id
userName 用户名
*/
const initialState = {
    isLogin: false,
    userId: 0,
    userName: "",
};

// 定义reducer函数
const IotReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
        console.log(action.payload.userName + " login")
        return {
            ...state,
            isLogin: true,
            userId: action.payload.userId,
            userName: action.payload.userName
        }
    }
    case USER_UNLOGIN: {
        console.log("unlogin")
        return {
            ...state,
            isLogin: false,
            userId: 0,
            userName: ""
        }
    }
    default:
      return state;
  }
};

export default IotReducer;