// app/login/page.tsx (or pages/login.tsx if using pages directory)
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
// Update the path below to the actual location of your Zustand store file
// Update the path below to the actual location of your Zustand store file
// Update the path below to the actual location of your Zustand store file
// Example: import { useAuthStore } from '@/components/useAuthStore';
// Make sure the file exists at the specified path
// Update the path below to the actual location of your Zustand store file
// Example: import { useAuthStore } from '../../components/useAuthStore';
import { useAuthStore } from './useAuthStore';

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const success = useAuthStore.getState().login(data.email, data.password);

    if (success) {
      alert('Login successful!');
      router.push('/dashboard'); // Redirect to the dashboard or home page
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              autoComplete="email"
              className={`mt-2 block w-full rounded-md border px-3 py-2 sm:text-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500'
              } text-gray-900 placeholder-gray-400`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              {...register('password')}
              autoComplete="current-password"
              className={`mt-2 block w-full rounded-md border px-3 py-2 sm:text-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500'
              } text-gray-900 placeholder-gray-400`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-2xl hover:bg-blue-900 transition"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Not a member?{' '}
          <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            <span className="underline">Sign up</span>
          </Link>
        </p>
      </div>

    </div>
  );
}
