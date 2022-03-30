const validate = {
  email: {
    email: 'Invalid email address',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    min: (n: number) => `Password must be at least ${n} characters`,
  },
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },

  fullName: {
    required: 'Full name is required',
    max: (n: number) => `Full name must be at most ${n} characters`,
  },
  username: {
    min: (n: number) => `Username must be at least ${n} characters`,
    max: (n: number) => `Username must be at most ${n} characters`,
    valid: 'Username is invalid',
  },
  phone: {
    valid: 'Phone number is invalid',
  },

  currentPassword: {
    required: 'Current password is required',
  },
  newPassword: {
    required: 'New password is required',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    match: 'Confirm password does not match',
  },

  title: {
    required: 'Please enter a title',
  },
  content: {
    required: 'Please enter content',
    min: (n: number) => `Content must be at least ${n} characters`,
  },
};

export default validate;
