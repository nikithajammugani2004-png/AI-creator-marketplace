import React, { useState } from 'react';
import { supabase } from "/src/supabaseClient.js";
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // flow can be: 'login-password', 'magic-link', 'signup'
  const [authFlow, setAuthFlow] = useState('login-password');
  const [step, setStep] = useState('request'); // 'request' or 'verify'
  const [loading, setLoading] = useState(false);

  // --- Password Login Flow (Bypasses email limits!) ---
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Login successful! Welcome.');
    }
    setLoading(false);
  };

  // --- Passwordless Magic Link Flow ---
  const handleSendMagicLinkOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
    } else {
      setStep('verify');
      setMessage('A secure 6-digit OTP has been sent to your email!');
    }
    setLoading(false);
  };

  // --- Traditional Sign Up Flow ---
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // If email confirmation is required, Supabase returns user but session is null
      if (data?.user && !data?.session) {
        setStep('verify');
        setMessage('Registration successful! Please enter the 6-digit OTP sent to your email to verify your account.');
      } else {
        setMessage('Registration successful! You are now logged in.');
      }
    }
    setLoading(false);
  };

  // --- Verify OTP (handles both magic link and signup confirmation) ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const verifyType = authFlow === 'signup' ? 'signup' : 'email';

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: verifyType,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Verification successful! Welcome.');
    }
    setLoading(false);
  };

  // --- Google Sign In ---
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Helper to determine the submit handler based on selected flow
  const getSubmitHandler = () => {
    if (authFlow === 'login-password') return handlePasswordLogin;
    if (authFlow === 'magic-link') return handleSendMagicLinkOtp;
    if (authFlow === 'signup') return handleSignUp;
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 aura-vibe-card rounded-[1.5rem] shadow-2xl text-white relative">
      <button 
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 p-1 text-gray-400 hover:text-white transition-colors"
        title="Discard and go back"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-bold mb-2 text-center text-white mt-2">Enter The Platform</h2>
      <p className="text-center text-xs text-gray-400 mb-6">
        {authFlow === 'signup' ? 'Create a new account' : 'Sign in to continue'}
      </p>
      
      {message && <p className="p-3 mb-4 text-sm bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 rounded-xl">{message}</p>}
      {error && <p className="p-3 mb-4 text-sm bg-red-950/40 text-red-400 border border-red-800/50 rounded-xl">{error}</p>}

      {step === 'request' && (
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200 font-bold p-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      )}

      {step === 'request' && (
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-xs text-gray-400 uppercase font-semibold">Or use email</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>
      )}

      {step === 'request' ? (
        <div className="space-y-4">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mb-4">
            <button
              type="button"
              onClick={() => setAuthFlow('login-password')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition ${
                authFlow === 'login-password' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setAuthFlow('magic-link')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition ${
                authFlow === 'magic-link' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              OTP Log In
            </button>
            <button
              type="button"
              onClick={() => setAuthFlow('signup')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition ${
                authFlow === 'signup' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={getSubmitHandler()} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF7B00] transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {(authFlow === 'signup' || authFlow === 'login-password') && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {authFlow === 'signup' ? 'Create Password' : 'Password'}
                  </label>
                  {authFlow === 'login-password' && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setAuthFlow('magic-link');
                        setMessage('Forgot your password? No problem! Use the OTP Log In option to access your account securely without a password.');
                      }}
                      className="text-[11px] font-semibold text-[#FF7B00] hover:text-[#FFD166] transition"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full p-2.5 bg-[#0D0D0D] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF7B00] transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF7B00] to-[#E63946] hover:opacity-90 disabled:opacity-50 text-white font-bold p-3 rounded-xl transition duration-300 shadow-auraGlow hover:scale-[1.01]"
            >
              {loading 
                ? 'Processing...' 
                : authFlow === 'signup' 
                  ? 'Sign Up' 
                  : authFlow === 'login-password' 
                    ? 'Log In' 
                    : 'Send OTP'}
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Enter 6-Digit OTP</label>
            <input 
              type="text" 
              required
              maxLength="6"
              className="w-full p-3 text-center tracking-[0.5em] font-mono text-xl bg-[#0D0D0D] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF7B00] transition"
              placeholder="000000"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF7B00] to-[#E63946] hover:opacity-90 disabled:opacity-50 text-white font-bold p-3 rounded-xl transition duration-300 shadow-auraGlow hover:scale-[1.01]"
          >
            {loading ? 'Verifying...' : 'Verify & Enter Platform'}
          </button>
          <button 
            type="button" 
            onClick={() => {
              setStep('request');
              setToken('');
              setMessage('');
              setError('');
            }} 
            className="w-full text-center text-xs text-gray-400 hover:text-white transition pt-2"
          >
            Go back
          </button>
        </form>
      )}
    </div>
  );
}
