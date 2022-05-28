const toast = {
  auth: {
    loginSuccess: 'Đăng ký thành công.',
    activeSuccess: 'Tài khoản của bạn đã được kích hoạt.',
    activeAccount: 'Vui lòng kiểm tra email của bạn để kích hoạt tài khoản!',
  },
  createEditForm: {
    createError: 'Đăng bài thất bại.',
    updateError: 'Cập nhật bài viết thất bại.',
  },
  postCard: {
    saveSuccess: 'Đã lưu.',
    deleteSuccess: 'Xóa bài viết thành công.',
  },
  postDetail: {
    saveSuccess: 'Đã lưu.',
    deleteSuccess: 'Xóa bài viết thành công.',
  },
  postItem: {
    deleteSuccess: 'Xóa bài viết thành công.',
    unsaveSuccess: 'Bỏ lưu bài viết thành công.',
  },
  settingSaga: {
    updateProfileSuccess: 'Cập nhật thông tin thành công.',
  },
  changePasswordForm: {
    success: 'Đổi mật khẩu thành công.',
    info: 'Vui lòng kiểm tra email của bạn.',
  },

  errors: {
    // auth
    accessDenied: 'Bạn không được phép truy cập.',
    invalidToken: 'Token không hợp lệ.',
    invalidAuthen: 'Xác minh thất bại.',

    userNotFound: 'Không tìm thấy người dùng.',
    emailNotRegister: 'Email chưa được đăng ký.',
    emailExist: 'Email đã tồn tại.',
    activeAccount: 'Vui lòng kích hoạt tài khoản.',
    accountActive: 'Tài khoản đã được kích hoạt.',
    usernameExist: 'Username đã tồn tại.',
    passwordNotCorrect: 'Mật khẩu không đúng.',
    cannotChangeEmail: 'Không thể thay đổi email.',
    alreadyFollow: 'Bạn đã theo dõi người dùng này.',
    notFollow: 'Bạn chưa theo dõi người dùng này.',

    // post / comment
    postNotFound: 'Không tìm thấy bài viết.',
    postSaved: 'Bài viết đã được lưu.',
    postNotSaved: 'Bài viết chưa được lưu.',
    notAllowedEditPost: 'Bạn không được phép chỉnh sửa bài viết này.',
    notAllowedDeletePost: 'Bạn không được phép xóa bài viết này.',
    commentNotFound: 'Bình luận không tồn tài.',
    notAllowedDeleteComment: 'Bạn không được phép xóa bình luận này.',

    // others
    somethingWrong: 'Có lỗi xảy ra.',
  },

  copyLinkSuccess: 'Đã sao chép.',
  comingSoon: 'Đang cập nhật.',
};

export default toast;
