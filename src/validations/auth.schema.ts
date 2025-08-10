import z from 'zod'

export const schemas = {
  login: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(8, 'Password is required'),
  }),
  signUp: z
    .object({
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
      password: z
        .string()
        .min(1, 'Password is required')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
        ),
      repeatPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine(data => data.password === data.repeatPassword, {
      message: "Passwords don't match",
      path: ['repeatPassword'],
    }),
}
