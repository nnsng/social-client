const validate = {
  // user
  email: {
    email: 'Invalid email address',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    min: (n: number) => `Password must be at least ${n} characters`,
    max: (n: number) => `Password must be at most ${n} characters`,
  },
  name: {
    required: 'Full name is required',
    max: (n: number) => `Full name must be at most ${n} characters`,
  },
  username: {
    required: 'Username is required',
    min: (n: number) => `Username must be at least ${n} characters`,
    max: (n: number) => `Username must be at most ${n} characters`,
    valid: 'Only A-Z, a-z, 0-9, -, . are allowed',
  },
  bio: {
    max: (n: number) => `Bio must be at most ${n} characters`,
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

  // post
  title: {
    required: 'Please enter a title',
  },
  content: {
    required: 'Please enter content',
    min: (n: number) => `Content must be at least ${n} characters`,
  },
  hashtags: {
    min: (n: number) => `Hashtags must be at least ${n} characters`,
    max: (n: number) => `Hashtags must be at most ${n} characters`,
    valid: 'Hashtags: Only A-Z, a-z, 0-9, - are allowed',
  },
};

export default validate;
