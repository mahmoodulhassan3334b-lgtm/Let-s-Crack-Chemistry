import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (token: string, username: string) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onAuthSuccess(data.token, data.user.username);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            id="auth-modal-content"
            className="relative w-full max-w-md overflow-hidden border-4 border-black bg-white p-8 shadow-neo-lg text-black"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              id="auth-close-btn"
              className="absolute top-5 right-5 border-2 border-black bg-white p-2 text-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border-2 border-black bg-yellow-300 text-black shadow-neo-sm">
                <ShieldCheck size={28} />
              </div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-black">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs font-bold text-gray-700 mt-1.5">
                {isLogin ? 'Enter details to access your favorites and orders' : 'Register for personalized account and saved favorites'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="auth-error-msg"
                className="mb-4 flex items-center gap-2 border-2 border-black bg-rose-100 p-3 text-sm font-bold text-black shadow-neo-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-black">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    id="auth-username-input"
                    className="w-full border-3 border-black bg-white py-3 pl-11 pr-4 text-sm text-black font-bold focus:outline-none placeholder:text-gray-400 shadow-neo-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black mb-1.5">
                  Password (Protected)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-black">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    id="auth-password-input"
                    className="w-full border-3 border-black bg-white py-3 pl-11 pr-4 text-sm text-black font-bold focus:outline-none placeholder:text-gray-400 shadow-neo-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                id="auth-submit-btn"
                className="w-full bg-black text-white hover:bg-[#FF9933] hover:text-black border-3 border-black py-3.5 font-black uppercase tracking-wider text-xs shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </div>
                ) : isLogin ? (
                  'Login securely'
                ) : (
                  'Register Account'
                )}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center text-xs font-bold text-gray-700">
              {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                id="auth-toggle-mode-btn"
                className="ml-1.5 font-black text-[#FF9933] hover:text-black underline"
              >
                {isLogin ? 'Create one' : 'Login here'}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 border-t-2 border-black pt-4 text-center">
              <p className="text-[10px] font-black uppercase text-black flex items-center justify-center gap-1.5">
                <Lock size={12} /> Cryptographically-secured session protection active.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
