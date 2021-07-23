const en = {
  translation: {
    table: {
      column: {
        account: 'Account',
        nickName: 'Name',
        createTime: 'Create Time',
        roleName: 'Role',
        opt: 'Operation',
      },
      row: {
        assetAccess: 'Authorize Asset',
        more: 'More',
        removeAccount: 'Delete Account',
        modifyPwd: 'Change Password',
        modifyRole: 'Modify Role',
        modifyName: 'Change User Name',
      },
      hint: '',
      hintUnit: 'items selected',
      batchModifyRole: 'Modify multiple roles',
      batchRemoveAccount: 'Delete multiple accounts',
    },
    roleSelector: {
      label: 'Select Role',
      placeholder: 'Enter account to search',
      reset: 'reset',
      all: 'All roles',
    },
    addUser: {
      create: 'Add User',
      modal: {
        title: 'Add User',
      },
      form: {
        accountType: 'Account Type',
        email: {
          label: 'Email',
          placeholder: 'Please input email',
        },
        username: {
          label: 'Account',
          validate: {
            require: 'Please input account',
            emailPattern: 'Email address format is incorrect',
            phonePattern: 'Phone number format is incorrect',
          },
        },
        password: {
          label: 'Password',
          validate: {
            require: 'Please input password',
            pattern:
              'Password length is %s and contains at least two character types (supports numbers, uppercase letters, lowercase letters and underscores)',
          },
        },
        newPassword: {
          label: 'New Password',
        },
        phone: {
          label: 'Phone number',
          phonePattern: 'Phone number format is incorrect',
          placeholder: 'Please input phone number',
        },
        role: {
          label: 'Select Role',
        },
        manager: 'Admin',
        normal: 'User',
        nickName: 'Name',
      },
      'manager-1000': 'Admin',
      'normal-1000': 'User',
    },
    removeAccount: {
      title: 'Delete Account',
      content:
        'Are you sure to delete the current account? This action cannot be undone.',
      multiContent:
        'Are you sure to delete the selected accounts? This action cannot be undone.',
      multiTitle: 'Delete multiple accounts',
    },
    modifyRole: {
      title: 'Modify Role',
      multiTitle: 'Modify multiple roles',
      label: 'Select Role',
    },
    editUserName: {
      title: 'Change User Name',
    },
    modifyPwd: {
      title: ' Change Password',
    },
    assetTree: {
      title: 'Authorize Asset',
      searchPlaceholder: 'Enter the asset name',
      rootCtrl: 'Select All/Cancel',
    },
  },
};

export default en;
