const toast = {
  auth: {
    loginSuccess: 'Register successfully.',
    activeSuccess: 'Your account has been activated.',
    activeAccount: 'Please check your email to active your account!',
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
    saveSuccess: 'Saved.',
    deleteSuccess: 'Deleted.',
  },
  postItem: {
    deleteSuccess: 'Deleted.',
    unsaveSuccess: 'Unsaved.',
  },
  settingSaga: {
    updateProfileSuccess: 'Update profile successfully.',
  },
  changePasswordForm: {
    success: 'Change password successfully.',
    info: 'Please check your email.',
  },

  errors: {
    // auth
    accessDenied: 'Access denied.',
    invalidToken: 'Invalid token.',
    invalidAuthen: 'Invalid authentication.',

    userNotFound: 'User not found.',
    emailNotRegister: 'Email have not registered yet.',
    emailExist: 'Email already exist.',
    activeAccount: 'Please active your account.',
    accountActive: 'Account already active.',
    usernameExist: 'Username already exist.',
    passwordNotCorrect: 'Password not correct.',

    // post / comment
    postNotFound: 'Post not found.',
    postSaved: 'Post already saved.',
    postNotSaved: 'Post have not saved yet.',
    notAllowedEditPost: 'You are not allowed to edit this post.',
    notAllowedDeletePost: 'You are not allowed to delete this post.',
    commentNotFound: 'Comment not found.',
    notAllowedDeleteComment: 'You are not allowed to delete this comment.',

    // others
    somethingWrong: 'Something went wrong.',
  },

  copyLinkSuccess: 'Copied.',
  comingSoon: 'Coming soon.',
};

export default toast;
