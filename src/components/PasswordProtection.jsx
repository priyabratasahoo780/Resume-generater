import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

const PasswordProtection = ({ onAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real application, this should be handled by a backend
  // For this static site, we'll use a simple hardcoded check
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Slight delay to feel more "premium" and secure
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onAuthenticated();
      } else {
        setError(true);
        setPassword("");
        setIsSubmitting(false);
        // Reset error after 2 seconds
        setTimeout(() => setError(false), 2000);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20"
            >
              <ShieldCheck className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Access Restricted
            </h1>
            <p className="text-slate-400 text-center">
              Please enter the administrator password to access the Resume
              Generator
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full bg-slate-800/50 border ${error ? "border-red-500" : "border-slate-700/50"} focus:border-indigo-500/50 text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all placeholder:text-slate-600 font-medium`}
                autoFocus
              />

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-red-500 text-xs font-semibold"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect password, please try again</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-blue-500 transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Generator</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm">
              Secured Application Layer v1.0
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordProtection;
