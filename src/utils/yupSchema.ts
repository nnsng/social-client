import * as yup from 'yup';

// POST
export const tagSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string().required(),
});

export const postSchema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề'),
  content: yup.string().min(5, 'Nội dung tối thiểu 500 ký tự').required('Vui lòng nhập nội dung'),
  description: yup.string(),
  thumbnail: yup.string(),
  tags: yup.array().of(tagSchema),
});

// AUTH
export const authSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
  password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự.').required('Vui lòng nhập password.'),
  mode: yup.string().required(),
  firstName: yup.string().when('mode', {
    is: 'register',
    then: yup.string().required('Vui lòng nhập tên.'),
  }),
  lastName: yup.string().when('mode', {
    is: 'register',
    then: yup.string().required('Vui lòng nhập họ.'),
  }),
});

// SETTING
export const profileSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập họ tên'),
  avatar: yup.string().notRequired(),
  username: yup
    .string()
    .min(6, 'Tối thiểu 6 ký tự')
    .max(50, 'Tối đa 50 ký tự')
    .matches(/^[a-zA-Z0-9]*$/, 'Tên người dùng không hợp lệ'),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .max(10)
    .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ'),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu nhập lại không khớp'),
});
