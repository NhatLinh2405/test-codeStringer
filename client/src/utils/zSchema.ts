import { z } from 'zod'

const signUpSchemaZ = z
  .object({
    name: z.string({ required_error: 'Please enter your name' }).min(6, {
      message: 'Name must be at least 6 characters'
    }),
    email: z.string({ required_error: 'Please enter your email' }).email({
      message: 'Please enter a valid email'
    }),
    password: z
      .string({ required_error: 'Please enter your password' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string({ required_error: 'Please enter your confirm password' })
      .min(8, { message: 'Password must be at least 8 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword']
  })

const signInSchemaZ = z.object({
  email: z.string({ message: 'Please enter your email' }).email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export { signInSchemaZ, signUpSchemaZ }
