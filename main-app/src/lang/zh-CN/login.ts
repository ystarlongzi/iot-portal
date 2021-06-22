const login = {
  title: '统一管理后台',
  tabs: {
    tele: '手机号登录',
    email: '邮箱登录',
  },
  form: {
    username: {
      label: '账号',
      validate: {
        require: '请输入账号',
        emailPattern: '请输入正确的邮箱',
        phonePattern: '请输入有效的电话号码',
      },
    },
    password: {
      label: '密码',
      validate: {
        require: '请输入密码',
        pattern:
          '密码长度%s位，至少包含两种字符类型(支持数字、大写字母、小写字母和下划线)',
      },
    },
    newPassword: {
      label: '新密码',
    },
    phone: {
      label: '电话号码',
      phonePattern: '请输入有效的电话号码',
    },
    code: {
      require: '请输入验证码',
      requireAccount: '请输入接收验证码地址',
      placeholder: '验证码',
      getCode: '获取验证码',
      len: '请输入6位数字验证码',
      countdown: '等待 ',
    },
  },
  signIn: '登录',
  forgot: '忘记密码？',
  back2login: '返回登录',
  resetPwd: '重置密码',
  resetPwdSuccess: '密码修改成功，请使用新密码登录',
};

export default login;
