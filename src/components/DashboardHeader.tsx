import { Link } from "react-router-dom";

const DashboardHeader: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ResumeAI</h1>
            <p className="text-xs text-gray-500">Smart resumes, faster</p>
          </div>
        </div>

        <nav aria-label="Primary">
          <Link to="/ResumeRoot">
            <button className="px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Open Resume Editor
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
