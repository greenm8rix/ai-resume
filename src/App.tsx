import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Code2, 
  Terminal, 
  Zap, 
  ExternalLink,
  ChevronDown,
  Play,
  Download,
  Award,
  Users,
  Coffee,
  Database,
  Server,
  GitBranch,
  Package,
  Activity,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';

const CodeTerminal = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const codeLines = [
    "// Full Stack Developer Portfolio",
    "const alexMorgan = {",
    "  role: 'Senior Full Stack Developer',",
    "  location: 'San Francisco, CA',",
    "  experience: '5+ years',",
    "  specialties: [",
    "    'React & Next.js',",
    "    'Node.js & Python',",
    "    'Cloud Architecture',",
    "    'System Design'",
    "  ],",
    "  passion: 'Building scalable solutions',",
    "  status: 'Available for hire' ✨",
    "};"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      
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
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Terminal className="w-4 h-4" />
            <span>portfolio.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-green-400" />
          </div>
        </div>
        <div className="p-6 font-mono text-sm">
          <pre className="text-green-400 whitespace-pre-wrap min-h-[300px]">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>▋</span>
          </pre>
        </div>
      </div>
    </div>
  );
};

const GitVisualization = () => {
  const [commits, setCommits] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  const commitMessages = [
    "feat: implement user authentication",
    "fix: resolve database connection issue",
    "refactor: optimize API endpoints",
    "docs: update README.md",
    "test: add unit tests for user service",
    "feat: add real-time notifications",
    "perf: improve query performance",
    "style: update UI components"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          let commitIndex = 0;
          
          const addCommit = () => {
            if (commitIndex < commitMessages.length) {
              const newCommit = {
                id: commitIndex,
                message: commitMessages[commitIndex],
                hash: Math.random().toString(36).substr(2, 7),
                timestamp: new Date().toLocaleTimeString()
              };
              
              setCommits(prev => [newCommit, ...prev]);
              commitIndex++;
              
              setTimeout(addCommit, 1500);
            }
          };
          
          addCommit();
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
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">git log --oneline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">main</span>
          </div>
        </div>
        <div className="p-6 font-mono text-sm max-h-[300px] overflow-hidden">
          {commits.map((commit, index) => (
            <div 
              key={commit.id}
              className={`flex items-center gap-3 mb-2 transform transition-all duration-500 ${
                index === 0 ? 'animate-slideInLeft' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-yellow-400 font-bold">{commit.hash}</span>
              <span className="text-gray-300">{commit.message}</span>
              <span className="text-gray-500 text-xs ml-auto">{commit.timestamp}</span>
            </div>
          ))}
          {commits.length === 0 && (
            <div className="text-gray-500 animate-pulse">Waiting for commits...</div>
          )}
        </div>
      </div>
    </div>
  );
};

const APIMonitor = () => {
  const [requests, setRequests] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  const apiEndpoints = [
    { endpoint: '/api/users', method: 'GET', status: 200, time: '45ms' },
    { endpoint: '/api/auth/login', method: 'POST', status: 200, time: '120ms' },
    { endpoint: '/api/projects', method: 'GET', status: 200, time: '78ms' },
    { endpoint: '/api/analytics', method: 'GET', status: 200, time: '234ms' },
    { endpoint: '/api/upload', method: 'POST', status: 201, time: '890ms' },
    { endpoint: '/api/notifications', method: 'GET', status: 200, time: '34ms' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          const makeRequest = () => {
            const randomEndpoint = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
            const newRequest = {
              id: Date.now(),
              ...randomEndpoint,
              timestamp: new Date().toLocaleTimeString()
            };
            
            setRequests(prev => [newRequest, ...prev.slice(0, 9)]);
            
            setTimeout(makeRequest, Math.random() * 2000 + 1000);
          };
          
          makeRequest();
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 300 && status < 400) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'text-blue-400';
      case 'POST': return 'text-green-400';
      case 'PUT': return 'text-yellow-400';
      case 'DELETE': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div ref={componentRef} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">API Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>
        <div className="p-6 font-mono text-sm max-h-[300px] overflow-hidden">
          {requests.map((request, index) => (
            <div 
              key={request.id}
              className={`flex items-center gap-3 mb-2 transform transition-all duration-500 ${
                index === 0 ? 'animate-slideInLeft' : ''
              }`}
            >
              <span className={`font-bold w-12 ${getMethodColor(request.method)}`}>
                {request.method}
              </span>
              <span className="text-gray-300 flex-1">{request.endpoint}</span>
              <span className={`font-bold w-8 ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
              <span className="text-gray-500 text-xs w-16">{request.time}</span>
              <span className="text-gray-600 text-xs">{request.timestamp}</span>
            </div>
          ))}
          {requests.length === 0 && (
            <div className="text-gray-500 animate-pulse">Monitoring API requests...</div>
          )}
        </div>
      </div>
    </div>
  );
};

const DatabaseQuery = () => {
  const [queryStep, setQueryStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  const querySteps = [
    { text: "SELECT * FROM users", status: "executing", time: "0ms" },
    { text: "WHERE role = 'developer'", status: "executing", time: "12ms" },
    { text: "ORDER BY created_at DESC", status: "executing", time: "28ms" },
    { text: "LIMIT 10;", status: "executing", time: "45ms" },
    { text: "Query executed successfully", status: "success", time: "67ms" },
    { text: "10 rows returned", status: "info", time: "67ms" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          const executeQuery = () => {
            setQueryStep(0);
            
            const timer = setInterval(() => {
              setQueryStep(prev => {
                if (prev >= querySteps.length - 1) {
                  clearInterval(timer);
                  setTimeout(() => executeQuery(), 3000);
                  return prev;
                }
                return prev + 1;
              });
            }, 800);
          };
          
          executeQuery();
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'executing': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div ref={componentRef} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">PostgreSQL Query</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-purple-400">Connected</span>
          </div>
        </div>
        <div className="p-6 font-mono text-sm min-h-[250px]">
          {querySteps.slice(0, queryStep + 1).map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 mb-2 transition-all duration-500 ${
                index === queryStep ? 'animate-slideInLeft' : ''
              }`}
            >
              <span className={`${getStatusColor(step.status)} font-bold`}>
                {step.status === 'executing' ? '→' : step.status === 'success' ? '✓' : 'ℹ'}
              </span>
              <span className="text-gray-300">{step.text}</span>
              <span className="text-gray-500 text-xs ml-auto">{step.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PackageInstaller = () => {
  const [packages, setPackages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  const packageList = [
    { name: 'react', version: '^18.2.0', size: '2.5MB' },
    { name: 'typescript', version: '^5.0.0', size: '8.1MB' },
    { name: 'tailwindcss', version: '^3.3.0', size: '1.2MB' },
    { name: 'next', version: '^13.4.0', size: '15.3MB' },
    { name: 'prisma', version: '^5.0.0', size: '4.7MB' },
    { name: 'lucide-react', version: '^0.344.0', size: '890KB' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          const installPackages = () => {
            setPackages([]);
            
            packageList.forEach((pkg, index) => {
              setTimeout(() => {
                setPackages(prev => [...prev, { ...pkg, status: 'installing' }]);
                
                setTimeout(() => {
                  setPackages(prev => 
                    prev.map(p => 
                      p.name === pkg.name ? { ...p, status: 'installed' } : p
                    )
                  );
                }, 1000 + Math.random() * 2000);
              }, index * 500);
            });
            
            setTimeout(() => installPackages(), 12000);
          };
          
          installPackages();
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
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">npm install</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-orange-400">Installing</span>
          </div>
        </div>
        <div className="p-6 font-mono text-sm min-h-[250px]">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.name}
              className={`flex items-center gap-3 mb-2 transition-all duration-500 ${
                index === packages.length - 1 ? 'animate-slideInLeft' : ''
              }`}
            >
              <span className={`w-4 ${
                pkg.status === 'installing' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {pkg.status === 'installing' ? '⟳' : '✓'}
              </span>
              <span className="text-gray-300">{pkg.name}@{pkg.version}</span>
              <span className="text-gray-500 text-xs ml-auto">{pkg.size}</span>
            </div>
          ))}
          {packages.length === 0 && (
            <div className="text-gray-500 animate-pulse">Preparing package installation...</div>
          )}
        </div>
      </div>
    </div>
  );
};

const SystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          
          const updateMetrics = () => {
            setMetrics({
              cpu: Math.floor(Math.random() * 40) + 20,
              memory: Math.floor(Math.random() * 30) + 50,
              disk: Math.floor(Math.random() * 20) + 30,
              network: Math.floor(Math.random() * 50) + 10
            });
          };
          
          updateMetrics();
          const interval = setInterval(updateMetrics, 2000);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  const MetricBar = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-5 h-5 ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-300">{label}</span>
          <span className={`font-bold ${color}`}>{value}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div ref={componentRef} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">System Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-indigo-400">Live</span>
          </div>
        </div>
        <div className="p-6">
          <MetricBar label="CPU Usage" value={metrics.cpu} icon={Cpu} color="text-blue-400" />
          <MetricBar label="Memory" value={metrics.memory} icon={Server} color="text-green-400" />
          <MetricBar label="Disk I/O" value={metrics.disk} icon={HardDrive} color="text-yellow-400" />
          <MetricBar label="Network" value={metrics.network} icon={Wifi} color="text-purple-400" />
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
      className={`group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hover:scale-[1.02] hover:bg-white/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{skill}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Proficiency</span>
            <span className="text-cyan-400 font-medium">{level}%</span>
          </div>
          <div className="relative h-2 bg-gray-800/80 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-1500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tech, link, image, delay = 0 }) => {
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
      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-700 overflow-hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } hover:scale-[1.02]`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Code2 className="w-16 h-16 text-gray-600 group-hover:text-cyan-400/50 transition-colors duration-300" />
        </div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 cursor-pointer" />
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-900/60 text-cyan-400 rounded-full text-xs border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ number, label, icon: Icon, delay = 0 }) => {
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
      className={`text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hover:scale-105 hover:bg-white/10 hover:border-cyan-400/30`}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl mb-4">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {count}
        {number >= 100 ? '+' : ''}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
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
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Alex Morgan
              </div>
              <div className="hidden md:flex items-center gap-8">
                {['About', 'Skills', 'Tech', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Available for hire</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Full Stack</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Crafting exceptional digital experiences with modern technologies. 
                  Specialized in building scalable applications that make a difference.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download CV
                </button>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#', label: 'Email' }
                ].map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="group p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                    title={label}
                  >
                    <Icon className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <CodeTerminal />
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 hover:text-cyan-400 transition-colors duration-300" />
          </button>
        </section>

        {/* About Stats Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Passionate about creating innovative solutions that bridge the gap between design and functionality. 
                With over 5 years of experience, I've helped startups and enterprises build remarkable digital products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard number={50} label="Projects Completed" icon={Code2} delay={0} />
              <StatCard number={5} label="Years Experience" icon={Award} delay={200} />
              <StatCard number={25} label="Happy Clients" icon={Users} delay={400} />
              <StatCard number={1000} label="Cups of Coffee" icon={Coffee} delay={600} />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Technical Expertise
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Constantly evolving skillset focused on modern technologies and best practices
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard 
                skill="React & Next.js" 
                level={95} 
                icon={Code2} 
                delay={0}
                description="Modern React patterns & SSR"
              />
              <SkillCard 
                skill="TypeScript" 
                level={92} 
                icon={Terminal} 
                delay={200}
                description="Type-safe development"
              />
              <SkillCard 
                skill="Node.js & APIs" 
                level={90} 
                icon={Zap} 
                delay={400}
                description="Backend & microservices"
              />
              <SkillCard 
                skill="Python & Django" 
                level={88} 
                icon={Code2} 
                delay={600}
                description="Data processing & ML"
              />
              <SkillCard 
                skill="Cloud & DevOps" 
                level={85} 
                icon={Terminal} 
                delay={800}
                description="AWS, Docker, Kubernetes"
              />
              <SkillCard 
                skill="Database Design" 
                level={87} 
                icon={Zap} 
                delay={1000}
                description="SQL, NoSQL, optimization"
              />
            </div>
          </div>
        </section>

        {/* Tech Animations Section */}
        <section id="tech" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Development Workflow
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real-time visualizations of modern development practices and tools
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <GitVisualization />
              <APIMonitor />
              <DatabaseQuery />
              <PackageInstaller />
              <SystemMetrics />
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl mb-4">
                    <CheckCircle className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Production Ready</h3>
                  <p className="text-gray-400">All systems optimized and monitoring in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A showcase of innovative solutions and technical excellence
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <ProjectCard
                title="E-Commerce Platform"
                description="Full-stack marketplace with real-time inventory, payment processing, analytics dashboard, and AI-powered recommendations."
                tech={['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Docker']}
                delay={0}
              />
              <ProjectCard
                title="AI Chat Application"
                description="Real-time messaging with AI translation, sentiment analysis, smart replies, and end-to-end encryption."
                tech={['React', 'Socket.io', 'OpenAI', 'MongoDB', 'WebRTC']}
                delay={300}
              />
              <ProjectCard
                title="Analytics Dashboard"
                description="Interactive data visualization platform with real-time metrics, custom reports, and machine learning insights."
                tech={['D3.js', 'Python', 'FastAPI', 'ClickHouse', 'Kubernetes']}
                delay={600}
              />
              <ProjectCard
                title="DevOps Pipeline"
                description="Automated CI/CD with containerization, security scanning, automated testing, and zero-downtime deployments."
                tech={['Jenkins', 'Docker', 'AWS', 'Terraform', 'Prometheus']}
                delay={900}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to turn your ideas into reality? Let's discuss your next project and create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <Mail className="w-6 h-6" />
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="flex gap-4">
                {[
                  { icon: Github, label: 'GitHub' },
                  { icon: Linkedin, label: 'LinkedIn' }
                ].map(({ icon: Icon, label }, index) => (
                  <button 
                    key={index}
                    className="group p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-cyan-400/50 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                    title={label}
                  >
                    <Icon className="w-7 h-7 group-hover:text-cyan-400 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 Alex Morgan. Crafted with precision and passion.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;