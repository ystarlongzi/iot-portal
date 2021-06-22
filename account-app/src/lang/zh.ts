const zh = {
  translation: {
    table: {
      column: {
        account: '账号',
        nickName: '名称',
        createTime: '创建时间',
        roleName: '角色',
        opt: '操作',
      },
      row: {
        assetAccess: '资产授权',
        more: '更多',
        removeAccount: '删除账号',
        modifyPwd: '修改密码',
        modifyRole: '修改角色',
        modifyName: '修改名称',
      },
      hint: '已选择',
      hintUnit: '项',
      batchModifyRole: '批量修改角色',
      batchRemoveAccount: '批量删除账号',
    },
    roleSelector: {
      label: '选择角色',
      placeholder: '请输入用户账号',
      reset: '重置条件',
      all: '全部角色',
    },
    addUser: {
      create: '新建用户',
      modal: {
        title: '新增用户',
      },
      form: {
        accountType: '账号类型',
        email: {
          label: '邮箱',
          placeholder: '请输入邮箱',
        },
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
          placeholder: '请输入电话号',
          phonePattern: '请输入有效的电话号码',
        },
        role: {
          label: '选择角色',
        },
        manager: '管理员',
        normal: '普通用户',
        nickName: '名称',
      },
      'manager-1000': '管理员',
      'normal-1000': '普通用户',
    },
    removeAccount: {
      title: '删除账号',
      content: '确认删除当前账户吗，删除后不可恢复，请谨慎操作',
      multiContent: '确认删除选中账户吗，删除后不可恢复，请谨慎操作',
      multiTitle: '批量删除账号',
    },
    modifyRole: {
      title: '修改账号角色',
      multiTitle: '批量修改账号角色',
      label: '选择角色',
    },
    editUserName: {
      title: '修改账号名称',
    },
    modifyPwd: {
      title: ' 修改密码',
    },
    assetTree: {
      title: '资产授权',
      searchPlaceholder: '请输入资产名称',
      rootCtrl: '全部选中/取消',
    },
  },
};

export default zh;
