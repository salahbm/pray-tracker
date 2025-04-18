'use client';

import { useState } from 'react';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { AnimatedContainer } from '../_components/animated-container';

export default function LoginForm() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <AnimatedContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Field */}
        {[
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            icon: <FiMail />,
            value: email,
            onChange: (v: string) => setEmail(v),
            placeholder: 'your@example.com',
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
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {icon}
              </div>
              <input
                id={id}
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
            className="flex items-center gap-2 text-red-600 text-sm"
          >
            <FiAlertCircle className="flex-shrink-0" />
            <span>{error}</span>
          </AnimatedContainer>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md h-11 shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AnimatedContainer>
  );
}
