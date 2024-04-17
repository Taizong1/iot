# 接口

## 用户管理

### 登录

```
/api/login
输入：
postData = {  
    user_name: username,  
    md5: password  
};  
接收：
{
    'message':,
    'signal': "success"
}
{
    'message':,
    'signal': "fail"
}
```

### 注册

```
/api/register
输入：
postData = {  
    user_name: username,  
    password: password, 
    email: email,
    phone: "00000000000",
    md5: require('md5')(password)
};  
接收：同登录
```

### 修改密码

```
/api/updatePassword
输入：
data = {
    newPassword: newPassword,
    oldPassword: oldPassword,
    userName: userName
}
返回：
更新失败：
{
	state: 0 
}
更新成功：
{
	state: 1
}
```

### 修改用户信息

```
/api/updateInfor
输入：
data = {
    emailAddress: emailAddress,
    phoneNo: phoneNo,
    userName: userName,
    newName: newName
}
返回同上
```

