import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean;
  onBack: () => void;
}

// Admin credentials - in production, this should be backend-validated
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'AccelUAV@2026'
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store auth token in localStorage (simple implementation)
        localStorage.setItem('adminAuthToken', 'authenticated-' + Date.now());
        onLogin(username, password);
      } else {
        setError('Invalid username or password');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-accluav-orange/20 p-4 rounded-full border border-accluav-orange/50">
                <Lock className="w-8 h-8 text-accluav-orange" />
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Username Input */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 mb-2 tracking-widest">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accluav-orange/50 focus:bg-white/10 transition disabled:opacity-50"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 mb-2 tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accluav-orange/50 focus:bg-white/10 transition disabled:opacity-50"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-400">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-accluav-orange hover:bg-accluav-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded uppercase tracking-widest text-sm transition"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={onBack}
            disabled={isLoading}
            className="w-full text-gray-400 hover:text-white text-sm py-2 transition disabled:opacity-50"
          >
            Back to Home
          </button>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials:</p>
            <div className="bg-black/50 rounded p-3 space-y-1 text-center">
              <p className="text-xs text-gray-400">
                Username: <span className="text-white font-mono">admin</span>
              </p>
              <p className="text-xs text-gray-400">
                Password: <span className="text-white font-mono">AccelUAV@2026</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
