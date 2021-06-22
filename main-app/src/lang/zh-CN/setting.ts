const setting = {
  username: '用户名',
  password: '密码',
  modify: '修改密码',
  form: {
    oldPassword: {
      label: '旧密码',
      validate: {
        require: '请输入旧密码',
        pattern: '密码长度%s位，包含大写字母，小写字母和数字',
      },
    },
    newPassword: {
      label: '新密码',
      validate: {
        require: '请输入新密码',
        pattern: '密码长度%s位，包含大写字母，小写字母和数字',
      },
    },
    confirm: {
      label: '确认新密码',
      validate: {
        require: '请再次输入新密码',
        pattern:
          '密码长度%s位，至少包含两种字符类型(支持数字、大写字母、小写字母和下划线)',
        unanimous: '两次密码输入不一致',
      },
    },
  },
  modifySuccess: '修改成功',
};

export default setting;
