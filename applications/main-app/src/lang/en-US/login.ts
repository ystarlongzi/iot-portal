const login = {
  title: 'General Management Portal',
  tabs: {
    tele: 'Phone Number',
    email: 'Email',
  },
  form: {
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
    },
    code: {
      require: 'Confirmation code',
      requireAccount: 'Please enter the address to receive the verification code',
      placeholder: 'confirmation code',
      getCode: 'verification code',
      len: 'Please enter the 6-digit verification code',
      countdown: 'after ',
    },
  },
  signIn: 'Sign In',
  forgot: 'Forgot password?',
  back2login: 'Back to login',
  resetPwd: 'Reset Password',
  resetPwdSuccess: 'Password changed successfully, please use the new password to log in',
};

export default login;
