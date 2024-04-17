import { USER_LOGIN, USER_UNLOGIN, UPDATE_USER_INFO } from './action';

// 定义初始状态
/*
isLogin 是否登录
userId 用户Id
userName 用户名
emailAddress 邮箱
phoneNo 电话号码
*/
const initialState = {
    isLogin: false,
    userId: 0,
    userName: "",
    emailAddress: "",
    phoneNo: "",
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
            userName: action.payload.userName,
            emailAdress: action.payload.emailAdress,
            phoneNo: action.payload.phoneNo
        }
    }
    case USER_UNLOGIN: {
        console.log("unlogin")
        return {
            ...state,
            isLogin: false,
            userId: 0,
            userName: "",
            emailAdress: "",
            phoneNo: ""
        }
    }
    case UPDATE_USER_INFO: {
        console.log("update user information")
        return {
            ...state,
            emailAdress: action.payload.emailAdress,
            phoneNo: action.payload.phoneNo
        }
    }
    default:
      return state;
  }
};

export default IotReducer;