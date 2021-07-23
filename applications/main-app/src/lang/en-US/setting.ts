const setting = {
  username: 'Username',
  password: 'Password',
  modify: 'Change Password',
  form: {
    oldPassword: {
      label: 'Old password',
      validate: {
        require: 'Please enter the old password',
        pattern:
          'Password length is %s digits, including uppercase letters, lowercase letters and numbers',
      },
    },
    newPassword: {
      label: 'New password',
      validate: {
        require: 'Please enter a new password',
        pattern:
          'Password length is %s digits, including uppercase letters, lowercase letters and numbers',
      },
    },
    confirm: {
      label: 'Confirm new password',
      validate: {
        require: 'Please enter the new password again',
        pattern:
          'Password length is %s and contains at least two character types (supports numbers, uppercase letters, lowercase letters and underscores)',
        unanimous: 'The two password entries are inconsistent',
      },
    },
  },
  modifySuccess: 'Password successfully changed',
};

export default setting;
