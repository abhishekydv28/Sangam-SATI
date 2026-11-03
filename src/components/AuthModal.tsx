import React, { useState } from 'react';
import { useAuth, StudentProfile } from '../context/AuthContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signin'
}) => {
  const { signIn, signUp, signInDemoStudent } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form State
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [scholarNo, setScholarNo] = useState('');
  const [college, setCollege] = useState('Samrat Ashok Technological Institute (SATI), Vidisha');
  const [branch, setBranch] = useState('Computer Science & Engineering (CSE)');
  const [year, setYear] = useState('1st Year');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signInEmail.trim() || !signInPassword) {
      setErrorMessage('Please enter both your college email and password.');
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(signInEmail, signInPassword);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage('Welcome back! Authenticated successfully.');
      setTimeout(() => {
        onClose();
      }, 700);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim() || !signUpEmail.trim() || !signUpPassword) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (signUpPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail.trim())) {
      setErrorMessage('Please provide a valid college or student email address.');
      return;
    }

    const studentProfile: StudentProfile = {
      fullName: fullName.trim(),
      collegeEmail: signUpEmail.trim(),
      college: college.trim(),
      branch,
      year,
      scholarNo: scholarNo.trim()
    };

    setIsLoading(true);
    const { error, requiresConfirmation } = await signUp(signUpEmail, signUpPassword, studentProfile);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      if (requiresConfirmation) {
        setSuccessMessage('Student registration initiated in Supabase! If your account requires verification, please check your email inbox.');
      } else {
        setSuccessMessage('Account created successfully! Welcome to SATI Fest Hub.');
      }
      setTimeout(() => {
        onClose();
      }, 1400);
    }
  };

  const handleDemoLogin = () => {
    signInDemoStudent();
    setSuccessMessage('Logged in as Demo SATI Student (Abhishek Sharma · CSE).');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Supabase Student Portal</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {tab === 'signin' ? 'Student Sign In' : 'Create Student Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access your verified delegate passes, bookmarked itineraries, and symposium submissions.
          </p>
        </div>

        {/* Segmented Tab Switch */}
        <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => { setTab('signin'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              tab === 'signin' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              tab === 'signup' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Student
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                College / Student Email ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="student@satiengg.in or email"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying with Supabase...' : 'Sign In as Student'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abhishek Sharma"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                College Email ID <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="e.g. student@satiengg.in"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Scholar / Roll No.
                </label>
                <input
                  type="text"
                  value={scholarNo}
                  onChange={(e) => setScholarNo(e.target.value)}
                  placeholder="e.g. 0108CS261042"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="PG / MCA">PG / MCA / MBA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Branch / Discipline
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                <option value="Information Technology (IT) / MCA">Information Technology (IT) / MCA</option>
                <option value="Artificial Intelligence & Data Science (AIADS)">AI & Data Science (AIADS / AIML)</option>
                <option value="Cyber Security / Blockchain">Cyber Security / Blockchain</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics & Communication (EC/EI)">Electronics & Communication (EC/EI)</option>
                <option value="Mechanical & Electrical Engineering">Mechanical & Electrical (ME/EE)</option>
                <option value="MBA / Applied Sciences">MBA / Applied Sciences</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Confirm Password <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Supabase User...' : 'Complete Registration'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Quick Demo Student Option */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Instant Evaluator Testing:</span>
            <span className="text-cyan-400 text-[11px] font-mono">Project xaodsqoqfdkqpxkfdacj</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 px-3 text-xs font-medium text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sign In with Demo Student Profile (SATI CSE)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
