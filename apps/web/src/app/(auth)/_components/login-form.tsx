'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { FiAlertCircle, FiLock, FiMail } from 'react-icons/fi';

import { signIn } from './actions';
import { AnimatedContainer } from './animated-container';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center px-4 border border-transparent mt-6 rounded-md h-11 shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(formData: FormData) {
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <AnimatedContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form action={handleSubmit}>
        {/* Input Field */}
        {[
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            icon: <FiMail />,
            value: email,
            onChange: (v: string) => setEmail(v),
            placeholder: 'your-email@example.com',
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            icon: <FiLock />,
            value: password,
            onChange: (v: string) => setPassword(v),
            placeholder: '••••••••',
          },
        ].map(({ id, label, type, icon, value, onChange, placeholder }) => (
          <div key={id} className="mt-6">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {icon}
              </div>
              <input
                id={id}
                name={id}
                type={type}
                required
                value={value}
                onChange={e => onChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md h-11 focus:ring-primary focus:border-primary text-gray-900 text-sm"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}

        {/* Error Message */}
        {error && (
          <AnimatedContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-600 text-sm mt-1 ml-3"
          >
            <FiAlertCircle className="flex-shrink-0" />
            <span>{error}</span>
          </AnimatedContainer>
        )}

        {/* Submit */}
        <SubmitButton />
      </form>
    </AnimatedContainer>
  );
}
