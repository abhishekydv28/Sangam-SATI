import React, { useState, useEffect } from 'react';
import { FestEvent } from '../data/festivalsData';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  RotateCcw, 
  Search, 
  Sparkles,
  Ticket,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  ShieldCheck,
  LogIn
} from 'lucide-react';

export interface RegistrationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  festival: string;
  eventInterest: string;
  participationMode: 'Individual' | 'Team';
  teamName?: string;
  notes?: string;
  timestamp: string;
  studentId?: string;
}

interface RegistrationFormProps {
  preselectedEvent?: FestEvent | null;
  onClearPreselectedEvent?: () => void;
  onOpenAuth?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  preselectedEvent,
  onClearPreselectedEvent,
  onOpenAuth
}) => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'register' | 'lookup'>('register');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('Samrat Ashok Technological Institute (SATI), Vidisha');
  const [department, setDepartment] = useState('Computer Science & Engineering (CSE)');
  const [year, setYear] = useState('1st Year');
  const [festival, setFestival] = useState<'technovision' | 'samrat-utsav' | 'sports' | 'general'>('samrat-utsav');
  const [eventInterest, setEventInterest] = useState('');
  const [participationMode, setParticipationMode] = useState<'Individual' | 'Team'>('Individual');
  const [teamName, setTeamName] = useState('');
  const [notes, setNotes] = useState('');

  // Auto-fill from Supabase authenticated profile
  useEffect(() => {
    if (profile) {
      if (profile.fullName) setFullName(profile.fullName);
      if (profile.collegeEmail) setEmail(profile.collegeEmail);
      if (profile.college) setCollege(profile.college);
      if (profile.branch) setDepartment(profile.branch);
      if (profile.year) setYear(profile.year);
    }
  }, [profile]);

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);

  // Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<RegistrationRecord | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Handle preselected event
  useEffect(() => {
    if (preselectedEvent) {
      setActiveTab('register');
      setFestival(preselectedEvent.festival);
      setEventInterest(preselectedEvent.title);
      if (preselectedEvent.teamFormat?.includes('Team')) {
        setParticipationMode('Team');
      } else {
        setParticipationMode('Individual');
      }
    }
  }, [preselectedEvent]);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal name (minimum 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/[\s\-\+]/g, '').slice(-10);
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9826012345)';
    }

    if (!college.trim()) {
      errs.college = 'College/Institute name is required';
    }

    if (!eventInterest.trim()) {
      errs.eventInterest = 'Please select or specify the event / competition you are interested in';
    }

    if (participationMode === 'Team' && !teamName.trim()) {
      errs.teamName = 'Please specify your team name';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRecord: RegistrationRecord = {
      id: `SANGAM-2027-${randomSuffix}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      department,
      year,
      festival: festival === 'technovision' ? 'Technovision 2026' : festival === 'samrat-utsav' ? 'Samrat Utsav 2027' : 'Sports 2027',
      eventInterest: eventInterest.trim(),
      participationMode,
      teamName: participationMode === 'Team' ? teamName.trim() : undefined,
      notes: notes.trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('sati_fest_registrations') || '[]');
      existing.unshift(newRecord);
      localStorage.setItem('sati_fest_registrations', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setSubmittedRecord(newRecord);
    setErrors({});
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);

    const q = lookupQuery.trim().toLowerCase();
    if (!q) {
      setLookupError('Enter your Registration ID or 10-digit mobile number');
      return;
    }

    try {
      const saved: RegistrationRecord[] = JSON.parse(localStorage.getItem('sati_fest_registrations') || '[]');
      const found = saved.find(
        r => r.id.toLowerCase() === q || r.phone.replace(/\D/g, '').endsWith(q) || r.email.toLowerCase() === q
      );

      if (found) {
        setLookupResult(found);
      } else {
        setLookupError('No matching registration record found. Please verify your reference number or submit a fresh entry.');
      }
    } catch {
      setLookupError('Unable to access registration records.');
    }
  };

  const resetForm = () => {
    setSubmittedRecord(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setEventInterest('');
    setTeamName('');
    setNotes('');
    setErrors({});
    if (onClearPreselectedEvent) onClearPreselectedEvent();
  };

  return (
    <div id="register" className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-10 shadow-lg backdrop-blur-md">
      {/* Form Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Participation & Inquiries Portal
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Sangam Delegate Registration & Waitlist
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Register your official interest for Samrat Utsav 2027, Technovision proceedings, or SATI sports meets.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => { setActiveTab('register'); setLookupResult(null); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'register' ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            New Registration
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'lookup' ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verify Existing Pass
          </button>
        </div>
      </div>

      {/* Confirmation State - Printable Delegate Pass */}
      {submittedRecord ? (
        <div className="py-8 animate-in fade-in duration-200">
          <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  Confirmed Delegate Pass
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">Sangam 2026–27 · SATI Vidisha</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Reference ID</span>
                <span className="font-mono text-sm font-bold text-cyan-400 tracking-wide">
                  {submittedRecord.id}
                </span>
              </div>
            </div>

            {/* Ticket Details Body */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div>
                <span className="text-slate-400 block mb-0.5">Participant Name</span>
                <span className="font-semibold text-white text-sm">{submittedRecord.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Festival Track</span>
                <span className="font-semibold text-amber-300">{submittedRecord.festival}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">College / Institute</span>
                <span className="text-slate-200 truncate block">{submittedRecord.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Branch & Year</span>
                <span className="text-slate-200">{submittedRecord.department} ({submittedRecord.year})</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-0.5">Selected Event / Interest</span>
                <span className="font-semibold text-white">{submittedRecord.eventInterest}</span>
                {submittedRecord.teamName && (
                  <span className="text-amber-400 block mt-0.5">Team: {submittedRecord.teamName}</span>
                )}
              </div>
            </div>

            {/* Digital Timestamp and Verification Note */}
            <div className="p-3 bg-slate-800/80 rounded-xl text-[11px] text-slate-300 border border-slate-700/60 mb-6 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span>Record stored in browser registry on <strong>{submittedRecord.timestamp}</strong>. Present this digital pass or reference ID at the registration porch during event desk hours.</span>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Delegate Pass</span>
              </button>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Register Another Delegate</span>
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === 'lookup' ? (
        /* Lookup Mode */
        <div className="py-8 max-w-xl mx-auto space-y-6">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Enter Registration ID or Mobile Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="e.g. SATI-2027-8492 or 9826012345"
                  className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                >
                  Verify Pass
                </button>
              </div>
            </div>
            {lookupError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}
          </form>

          {lookupResult && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 text-sm">{lookupResult.fullName}</span>
                <span className="font-mono font-semibold text-amber-700">{lookupResult.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Institute:</span>
                  <span className="font-medium text-slate-800">{lookupResult.college}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Department:</span>
                  <span className="font-medium text-slate-800">{lookupResult.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Festival & Track:</span>
                  <span className="font-medium text-slate-800">{lookupResult.festival}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Event Interest:</span>
                  <span className="font-medium text-slate-800">{lookupResult.eventInterest}</span>
                </div>
              </div>
              <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-200 flex items-center justify-between">
                <span>Submitted: {lookupResult.timestamp}</span>
                <span className="text-emerald-700 font-medium">Valid Delegate Record</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* New Registration Form */
        <form onSubmit={handleSubmit} className="pt-6 space-y-6">
          {/* Supabase Student Auth Banner */}
          {user ? (
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-xs text-cyan-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong className="text-white">Authenticated as {profile?.fullName}:</strong> Student profile details auto-populated from Supabase.
                </span>
              </div>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded-md border border-cyan-500/30">
                {profile?.scholarNo || 'Verified Student'}
              </span>
            </div>
          ) : onOpenAuth ? (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
              <span>Are you a registered SATI student? Sign in with your college credentials to auto-fill your details.</span>
              <button
                type="button"
                onClick={onOpenAuth}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline shrink-0 ml-3 flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            </div>
          ) : null}

          {preselectedEvent && (
            <div className="p-3 bg-cyan-950/60 border border-cyan-800/80 rounded-xl text-xs text-cyan-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-cyan-400">Event Pre-selected:</span> {preselectedEvent.title} ({preselectedEvent.festival === 'technovision' ? 'Technovision 2026' : 'Samrat Utsav 2027'})
              </div>
              {onClearPreselectedEvent && (
                <button
                  type="button"
                  onClick={onClearPreselectedEvent}
                  className="text-xs text-cyan-300 underline font-medium"
                >
                  Change
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Legal Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abhishek Sharma"
                  className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                    errors.fullName ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Official / Student Email <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@satiengg.in or personal email"
                  className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                    errors.email ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                WhatsApp / Mobile Number <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                    errors.phone ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* College / Institution */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                College / Institute Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Samrat Ashok Technological Institute (SATI) or other college"
                  className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                    errors.college ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
              </div>
              {errors.college && <p className="text-[11px] text-red-400 mt-1">{errors.college}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Branch / Discipline
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white"
              >
                <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                <option value="CSE (Blockchain) / Cyber Security">CSE (Blockchain) / Cyber Security</option>
                <option value="Information Technology (IT) / MCA">Information Technology (IT) / MCA</option>
                <option value="Artificial Intelligence & Data Science (AIADS / AIML)">AI & Data Science (AIADS / AIML)</option>
                <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics & Communication (EC) / EI">Electronics & Communication (EC / EI)</option>
                <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                <option value="Management Studies (MBA) / M.Sc.">Management Studies (MBA) / M.Sc.</option>
                <option value="Other Engineering / Polytechnic">Other Engineering / Polytechnic</option>
              </select>
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Academic Year of Study
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white"
                >
                  <option value="1st Year">1st Year (CODE CRACK Freshman cohort)</option>
                  <option value="2nd Year">2nd Year B.Tech</option>
                  <option value="3rd Year">3rd Year B.Tech</option>
                  <option value="4th Year">4th Year B.Tech</option>
                  <option value="Postgraduate (MCA/MBA/M.Tech)">Postgraduate (MCA / MBA / M.Tech / M.Sc.)</option>
                  <option value="Faculty / External Guest">Faculty / External Researcher</option>
                </select>
              </div>
            </div>

            {/* Festival Stream */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Festival Track
              </label>
              <select
                value={festival}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setFestival(val);
                  if (val === 'technovision') setEventInterest('Paper Presentation / Coding Challenge');
                  else if (val === 'samrat-utsav') setEventInterest('Cultural Early Waitlist (Dance, Music, Drama)');
                  else if (val === 'sports') setEventInterest('SATI Sports Activity (Volleyball / Athletics / Kho-Kho)');
                }}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white font-medium"
              >
                <option value="samrat-utsav">SAMRAT UTSAV 2027 (Cultural Waitlist · Feb 2027)</option>
                <option value="technovision">TECHNOVISION 2026 (Symposium Inquiries / Proceedings)</option>
                <option value="sports">Sports Activity Calendar 2027 (Tournaments & Meets)</option>
                <option value="general">General Delegate / Campus Visit Query</option>
              </select>
            </div>

            {/* Event Interest / Target Competition */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Event / Competition Interest <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={eventInterest}
                onChange={(e) => setEventInterest(e.target.value)}
                placeholder="e.g. Folk Dance, Coding Challenge, Robo Rumble, Volleyball"
                className={`w-full px-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                  errors.eventInterest ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                }`}
              />
              {errors.eventInterest && <p className="text-[11px] text-red-400 mt-1">{errors.eventInterest}</p>}
            </div>

            {/* Participation Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Participation Mode
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={participationMode === 'Individual'}
                    onChange={() => setParticipationMode('Individual')}
                    className="text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Individual Participant</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={participationMode === 'Team'}
                    onChange={() => setParticipationMode('Team')}
                    className="text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Team Entry (2–4 Members)</span>
                </label>
              </div>
            </div>

            {/* Team Name (if team) */}
            {participationMode === 'Team' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Team Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. SATI Robo Warriors"
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-950 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 text-white placeholder:text-slate-600 ${
                    errors.teamName ? 'border-red-400 bg-red-950/20' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.teamName && <p className="text-[11px] text-red-400 mt-1">{errors.teamName}</p>}
              </div>
            )}
          </div>

          {/* Notes / Inquiries */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Query, Paper Abstract Title, or Accommodations Request (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any questions for the organizing committee or faculty coordinators..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-white placeholder:text-slate-600"
            />
          </div>

          {/* Submission Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              * Official confirmation receipt generated instantly in browser. No fees required.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
            >
              Submit Registration & Generate Pass
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
