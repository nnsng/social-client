const toast = {
  auth: {
    loginSuccess: 'Register successfully.',
    activeSuccess: 'Your account has been activated.',
  },
  createEditForm: {
    createError: 'Create post error.',
    updateError: 'Update post error.',
  },
  postCard: {
    saveSuccess: 'Saved.',
    deleteSuccess: 'Deleted.',
  },
  postDetail: {
    deleteSuccess: 'Deleted.',
  },
  postTable: {
    deleteSuccess: 'Deleted.',
    unsaveSuccess: 'Unsaved.',
    unsaveError: 'Unsave error.',
  },
  settingSaga: {
    updateProfileSuccess: 'Update profile successfully.',
  },
  changePasswordPage: {
    forgotPassword: 'Coming soon.',
  },
  changePasswordForm: {
    success: 'Change password successfully.',
  },

  errors: {
    // authCtrl
    emailNotRegister: 'Email have not registered yet.',
    emailExist: 'Email already exist.',
    userNotFound: 'User not found.',
    accountAlreadyActive: 'Account is already active.',
    usernameExist: 'Username already exist.',
    passwordNotCorrect: 'Password is not correct.',
    activeAccount: 'Please active your account.',

    // postCtrl
    postNotFound: 'Post not found.',
    notAllowedEditPost: 'You are not allowed to edit this post.',
    notAllowedDeletePost: 'You are not allowed to delete this post.',
    postSaved: 'Post is saved.',
    postNotSaved: 'Post have not saved yet.',

    // commentCtrl
    commentNotFound: 'Comment not found.',
    notAllowedDeleteComment: 'You are not allowed to delete this comment.',

    // others
    somethingWrong: 'Something went wrong.',
  },
};

export default toast;
