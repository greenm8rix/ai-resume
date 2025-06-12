import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  ArrowRight, 
  Users, 
  ExternalLink,
  ChevronDown,
  Download,
  Award,
  Calendar,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Heart,
  Shield,
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  UserCheck,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Globe,
  Coffee,
  Mountain,
  Palette,
  Book
} from 'lucide-react';

const HRMetrics = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const achievements = [
    "// HR Professional Profile",
    "const jannaGardner = {",
    "  role: 'Human Resources Generalist',",
    "  experience: '6+ years',",
    "  location: 'Chicago, Illinois',",
    "  achievements: [",
    "    'Improved employee retention by 10%',",
    "    'Achieved 90%+ retention rate',",
    "    'Reduced recruitment costs by 14%',",
    "    'Enhanced diversity hiring',",
    "    'Streamlined HR processes'",
    "  ],",
    "  specialties: [",
    "    'Recruitment & Staffing',",
    "    'Employee Relations',",
    "    'Policy Development',",
    "    'Compliance Management'",
    "  ],",
    "  status: 'Open to opportunities' ✨",
    "};"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentLineIndex < achievements.length) {
      const currentLine = achievements[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + '\n');
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, currentLineIndex]);

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Users className="w-4 h-4" />
            <span>hr-profile.js</span>
          </div>
        </div>
        <div className="p-6 font-mono text-sm">
          <pre className="text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap min-h-[300px]">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>▋</span>
          </pre>
        </div>
      </div>
    </div>
  );
};

const RecruitmentFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  const recruitmentSteps = [
    { title: "Job Posting", description: "Create compelling job descriptions", icon: BookOpen },
    { title: "Candidate Sourcing", description: "Identify top talent", icon: Target },
    { title: "Screening", description: "Initial candidate evaluation", icon: UserCheck },
    { title: "Interviews", description: "Comprehensive assessment", icon: Users },
    { title: "Selection", description: "Best fit candidate", icon: CheckCircle },
    { title: "Onboarding", description: "Welcome new team member", icon: Heart }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          const stepInterval = setInterval(() => {
            setActiveStep(prev => {
              if (prev >= recruitmentSteps.length - 1) {
                setTimeout(() => {
                  setActiveStep(0);
                }, 2000);
                return prev;
              }
              return prev + 1;
            });
          }, 1200);
          
          return () => clearInterval(stepInterval);
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div ref={componentRef} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Recruitment Process</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-500">Active</span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recruitmentSteps.map((step, index) => {
              const Icon = step.icon;
              const isCurrentStep = index === activeStep;
              const isCompleted = index < activeStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                    isCurrentStep ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : 
                    isCompleted ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCurrentStep ? 'bg-blue-500 text-white animate-pulse' :
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      isCurrentStep ? 'text-blue-700 dark:text-blue-300' :
                      isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeMetrics = () => {
  const [metrics, setMetrics] = useState({
    retention: 0,
    satisfaction: 0,
    diversity: 0,
    efficiency: 0
  });
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          // Animate to target values
          setTimeout(() => {
            setMetrics({
              retention: 92,
              satisfaction: 88,
              diversity: 35,
              efficiency: 78
            });
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  const MetricBar = ({ label, value, icon: Icon, color, target }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className={`font-bold ${color}`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-3 rounded-full transition-all duration-2000 ease-out ${color.replace('text-', 'bg-')}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Target: {target}%
      </div>
    </div>
  );

  return (
    <div ref={componentRef} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">HR Metrics Dashboard</span>
          </div>
          <div className="text-xs text-green-500 font-medium">Last Updated: Today</div>
        </div>
        <div className="p-6">
          <MetricBar 
            label="Employee Retention" 
            value={metrics.retention} 
            icon={Heart} 
            color="text-green-500" 
            target="90"
          />
          <MetricBar 
            label="Employee Satisfaction" 
            value={metrics.satisfaction} 
            icon={Star} 
            color="text-blue-500" 
            target="85"
          />
          <MetricBar 
            label="Diversity Hiring" 
            value={metrics.diversity} 
            icon={Users} 
            color="text-purple-500" 
            target="30"
          />
          <MetricBar 
            label="Process Efficiency" 
            value={metrics.efficiency} 
            icon={Zap} 
            color="text-orange-500" 
            target="75"
          />
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, level, icon: Icon, delay = 0, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setProgress(level), 300);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay, level]);

  return (
    <div 
      ref={cardRef}
      className={`group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400/50 dark:hover:border-emerald-400/50 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl group-hover:from-emerald-500/30 group-hover:to-teal-600/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{skill}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">Expertise Level</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{level}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ title, company, period, location, description, achievements, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400/50 dark:hover:border-emerald-400/50 transition-all duration-700 overflow-hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } hover:scale-[1.01] hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              <Briefcase className="w-4 h-4" />
              {company}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{description}</p>
        
        {achievements && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Key Achievements:</h4>
            <ul className="space-y-1">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ number, label, icon: Icon, delay = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            let start = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
              start += increment;
              if (start >= number) {
                setCount(number);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 30);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay, number]);

  return (
    <div 
      ref={cardRef}
      className={`text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hover:scale-105 hover:shadow-xl hover:border-emerald-400/50 dark:hover:border-emerald-400/50`}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl mb-4">
        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
    </div>
  );
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Janna Gardner
              </div>
              <div className="hidden md:flex items-center gap-8">
                {['About', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 text-sm font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">Open to new opportunities</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 dark:text-white">Janna</span>
                  <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    Gardner
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  Human Resources Generalist with 6+ years of experience building positive work environments, 
                  improving retention rates, and streamlining recruitment processes.
                </p>
                
                <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Chicago, Illinois</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>(716) 555-0100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get In Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group px-8 py-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <a
                  href="mailto:janna@example.com"
                  className="group p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 transform hover:scale-110"
                  title="Email"
                >
                  <Mail className="w-6 h-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <HRMetrics />
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300" />
          </button>
        </section>

        {/* About Stats Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Professional Overview
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Dedicated HR professional with a proven track record of enhancing organizational effectiveness 
                through strategic people management, policy development, and fostering inclusive workplace cultures.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard number={6} label="Years Experience" icon={Award} delay={0} suffix="+" />
              <StatCard number={90} label="Employee Retention" icon={Heart} delay={200} suffix="%" />
              <StatCard number={14} label="Cost Reduction" icon={TrendingUp} delay={400} suffix="%" />
              <StatCard number={96} label="Typing Speed (WPM)" icon={Zap} delay={600} />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Professional Experience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Building successful HR strategies and fostering positive workplace environments
              </p>
            </div>
            
            <div className="space-y-8">
              <ExperienceCard
                title="Human Resources Generalist"
                company="Lamna Healthcare Company"
                period="20XX – Present"
                location="Chicago, Illinois"
                description="Lead comprehensive HR initiatives focused on compliance, employee retention, and recruitment optimization. Collaborate with leadership to develop and implement policies that enhance workplace culture and operational efficiency."
                achievements={[
                  "Increased employee retention rates by over 10% to achieve 90%+ retention over 2 years",
                  "Reduced year-over-year recruitment costs by 14% through strategic website development",
                  "Enhanced minority recruitment programs to meet affirmative action requirements",
                  "Ensured full compliance with OSHA and federal/state labor regulations",
                  "Developed and maintained positive work environment initiatives"
                ]}
                delay={0}
              />
              
              <ExperienceCard
                title="Human Resources Intern"
                company="Wholeness Healthcare"
                period="June 20XX – August 20XX"
                location="Boomtown, Ohio"
                description="Supported recruitment outreach and employee education initiatives. Organized training seminars and coordinated professional development opportunities for hospital staff."
                achievements={[
                  "Assisted in recruitment outreach to prospective employees",
                  "Organized employee benefit education seminars",
                  "Coordinated hospital-wide professional development symposia",
                  "Supported management education on employment laws and workplace morale"
                ]}
                delay={300}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Core Competencies
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive skill set developed through years of hands-on HR experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard 
                skill="Recruitment & Staffing" 
                level={95} 
                icon={Users} 
                delay={0}
                description="End-to-end talent acquisition"
              />
              <SkillCard 
                skill="Employee Relations" 
                level={92} 
                icon={Heart} 
                delay={200}
                description="Conflict resolution & engagement"
              />
              <SkillCard 
                skill="Policy Development" 
                level={90} 
                icon={Shield} 
                delay={400}
                description="Compliance & procedure creation"
              />
              <SkillCard 
                skill="Data Analytics" 
                level={85} 
                icon={BarChart3} 
                delay={600}
                description="HR metrics & reporting"
              />
              <SkillCard 
                skill="Project Management" 
                level={88} 
                icon={Target} 
                delay={800}
                description="Initiative leadership & execution"
              />
              <SkillCard 
                skill="Public Speaking" 
                level={90} 
                icon={Users} 
                delay={1000}
                description="Training & presentation delivery"
              />
            </div>
          </div>
        </section>

        {/* HR Process Visualizations */}
        <section className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                HR Excellence in Action
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Visual representation of strategic HR processes and measurable outcomes
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <RecruitmentFlow />
              <EmployeeMetrics />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Education & Interests
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                    <p className="text-gray-600 dark:text-gray-400">Academic Foundation</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Bachelor of Arts, Human Resources Management
                    </h4>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      <GraduationCap className="w-4 h-4" />
                      Jasper University
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>Ft. Lauderdale, FL</span>
                      <span>•</span>
                      <span>May 20XX</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">3.8 GPA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-700 dark:text-gray-300">Honor Society Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl">
                    <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Interests</h3>
                    <p className="text-gray-600 dark:text-gray-400">Life Beyond Work</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Literature", icon: Book },
                    { name: "Environmental Conservation", icon: Globe },
                    { name: "Art", icon: Palette },
                    { name: "Yoga", icon: Heart },
                    { name: "Skiing", icon: Mountain },
                    { name: "Travel", icon: MapPin }
                  ].map((interest, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <interest.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to discuss how I can contribute to your organization's HR success? 
              I'd love to explore opportunities to make a positive impact together.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">(716) 555-0100</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">janna@example.com</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Chicago, Illinois 98052</p>
              </div>
            </div>
            
            <button className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
              <Mail className="w-6 h-6" />
              Start a Conversation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 Janna Gardner. Professional HR expertise with a personal touch.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;