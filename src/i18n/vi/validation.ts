const validation = {
  email: {
    email: 'Email không hợp lệ',
    required: 'Vui lòng nhập email',
  },
  password: {
    required: 'Vui lòng nhập mật khẩu',
    min: (n: number) => `Mật khẩu tối thiểu ${n} ký tự`,
  },
  firstName: {
    required: 'Vui lòng nhập tên',
  },
  lastName: {
    required: 'Vui lòng nhập họ',
  },

  fullName: {
    required: 'Vui lòng nhập họ tên',
    max: (n: number) => `Họ tên tối đa ${n} ký tự`,
  },
  username: {
    min: (n: number) => `Tên người dùng tối thiểu ${n} ký tự`,
    max: (n: number) => `Tên người dùng tối đa ${n} ký tự`,
    valid: 'Tên người dùng không hợp lệ',
  },
  phone: {
    valid: 'Số điện thoại không hợp lệ',
  },

  currentPassword: {
    required: 'Vui lòng nhập mật khẩu hiện tại',
  },
  newPassword: {
    required: 'Vui lòng nhập mật khẩu mới',
  },
  confirmPassword: {
    required: 'Vui lòng nhập lại mật khẩu mới',
    match: 'Mật khẩu nhập lại không khớp',
  },

  title: {
    required: 'Vui lòng nhập tiêu đề',
  },
  content: {
    required: 'Vui lòng nhập nội dung',
    min: (n: number) => `Nội dung tối thiểu ${n} ký tự`,
  },
};

export default validation;
