# 接口

## 用户管理

### 登录

```
/api/login
输入：
data = {  
    userName: username,  
    password: password 
}

返回：
- 成功
{
    state: 1
    message: message
}
- 失败
{
    state: 0
    message: reason
}
```

### 注册

```
/api/register
输入：
data = {  
    userName: username,  
    password: password, 
    emailAddress: email,
    phoneNo: phone,
}

返回：
- 成功
{
    state: 1
    message: message
}
- 失败
{
    state: 0
    message: reason
}
```

### 修改密码

```
/api/updatePassword
输入：
data = {
    newPassword: newPassword,
    oldPassword: oldPassword,
    userName: username
}

返回：
- 成功
{
	state: 1
	message: message
}
- 失败
{
	state: 0
	message: reason
}
```

### 修改用户信息

```
/api/updateInfor
输入：
data = {
    emailAddress: email,
    phoneNo: phone,
    userName: username
}

返回：
- 成功
{
	state: 1
	message: message
}
- 失败
{
	state: 0
	message: reason
}
```



> 注意，`:`左侧为前端传入关键字

