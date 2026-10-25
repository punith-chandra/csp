import React from 'react';
import { 
  Users, Award, GraduationCap, Sparkles, ShieldCheck, 
  Code2, Database, Layout, Search, CheckSquare, Presentation, Compass 
} from 'lucide-react';

export default function MeetTheTeam() {
  const guideInfo = {
    name: "Mr. Syed Akheel Hassan Gori",
    role: "Project Guide & Faculty Mentor",
    dept: "Department of Computer Science and Engineering",
    institution: "Sri Vasavi Engineering College (Autonomous)",
    location: "Tanuku, West Godavari District, Andhra Pradesh",
    avatarBg: "from-emerald-700 via-brand-primary to-brand-dark"
  };

  const teamMembers = [
    {
      num: 1,
      name: "P. Punith Chandra",
      rollNo: "24A81A05G9",
      role: "Project Coordinator",
      roleDesc: "Overall project roadmap, survey execution, and team workflow management.",
      icon: <Compass className="w-5 h-5" />,
      color: "from-emerald-600 to-teal-800",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      num: 2,
      name: "M. Durga Prasad",
      rollNo: "24A81A05G2",
      role: "Research & Documentation",
      roleDesc: "FSSAI DART synthesis, literature review, and institutional report drafting.",
      icon: <Search className="w-5 h-5" />,
      color: "from-teal-600 to-emerald-800",
      accent: "text-teal-700 bg-teal-50 border-teal-200"
    },
    {
      num: 3,
      name: "D. Hemanth",
      rollNo: "24A81A05D8",
      role: "Backend & AI Integration",
      roleDesc: "FastAPI server, SQLite database, RAG pipeline, and Gemini LLM architecture.",
      icon: <Database className="w-5 h-5" />,
      color: "from-emerald-700 to-slate-800",
      accent: "text-emerald-800 bg-emerald-50 border-emerald-200"
    },
    {
      num: 4,
      name: "N. Arun Teja",
      rollNo: "24A81A05G6",
      role: "Frontend Development",
      roleDesc: "React interface, Tailwind UI architecture, and API client orchestration.",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-teal-700 to-emerald-900",
      accent: "text-teal-800 bg-teal-50 border-teal-200"
    },
    {
      num: 5,
      name: "K. Jay Vardhan",
      rollNo: "24A81A05F9",
      role: "Data & Survey Analysis",
      roleDesc: "Field survey metrics, Chart.js visualizations, and statistical modeling.",
      icon: <Layout className="w-5 h-5" />,
      color: "from-emerald-600 to-teal-700",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      num: 6,
      name: "R. Santhosh",
      rollNo: "24A81A05H4",
      role: "Testing & Validation",
      roleDesc: "Quality assurance, non-food boundary testing, and API verification.",
      icon: <CheckSquare className="w-5 h-5" />,
      color: "from-slate-700 to-emerald-800",
      accent: "text-slate-800 bg-slate-100 border-slate-200"
    },
    {
      num: 7,
      name: "M. Prasannakumar",
      rollNo: "24A81A05G1",
      role: "UI/UX & Presentation",
      roleDesc: "User journey design, presentation deck styling, and responsive layout.",
      icon: <Presentation className="w-5 h-5" />,
      color: "from-teal-600 to-emerald-900",
      accent: "text-teal-700 bg-teal-50 border-teal-200"
    }
  ];

  return (
    <section id="team" className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4 text-emerald-700" />
            CSE Project Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            MEET OUR TEAM
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Dedicated team members from the Department of Computer Science and Engineering, Sri Vasavi Engineering College (Autonomous), Tanuku.
          </p>
        </div>

        {/* Project Guide Spotlight Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-emerald-900 via-brand-dark to-brand-teal rounded-3xl p-6 sm:p-8 text-white shadow-premium relative overflow-hidden border border-emerald-800">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                👨‍🏫
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-300 text-xs font-bold mb-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>PROJECT GUIDE & MENTOR</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  {guideInfo.name}
                </h3>
                <p className="text-sm font-semibold text-emerald-100 mt-1">
                  {guideInfo.role} • {guideInfo.dept}
                </p>
                <p className="text-xs text-emerald-200/80 mt-1">
                  {guideInfo.institution}, {guideInfo.location}
                </p>
                <p className="mt-3 text-xs text-emerald-100/90 leading-relaxed max-w-xl">
                  Providing academic oversight, technical direction in AI/RAG integration, and community engagement guidance for the "AI-Powered Food Safety and Purity Analysis" initiative.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.rollNo}
              className="team-card-hover bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center border border-slate-200">
                    #{member.num}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-brand-dark border border-slate-200">
                    {member.rollNo}
                  </span>
                </div>

                {/* Profile Placeholder Avatar */}
                <div className="flex flex-col items-center text-center mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${member.color} p-1 text-white shadow-md group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 flex items-center justify-center`}>
                    <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
                      <span className="text-2xl font-black">
                        {member.name.charAt(0)}
                      </span>
                      <span className="text-[9px] font-mono tracking-tighter opacity-80">
                        CSE
                      </span>
                    </div>
                  </div>

                  <h4 className="mt-4 text-base font-extrabold text-brand-dark group-hover:text-brand-primary transition-colors">
                    {member.name}
                  </h4>

                  {/* Role with Highlight Effect */}
                  <div className={`mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${member.accent} group-hover:shadow-sm`}>
                    {member.icon}
                    <span>{member.role}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center leading-relaxed mt-2">
                  {member.roleDesc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <span className="text-[10px] font-semibold text-slate-400">
                  Sri Vasavi Engineering College (A)
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
