import { Link } from "react-router-dom";

const DashboardHeader: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10  ml-10 rounded-xl bg-gradient-to-br  flex items-center justify-center text-white font-bold flex-shrink-0"></div>

            {/* Title and optional subtitle */}
            <div className="flex flex-col sm:flex-col md:flex-row items-start ml-5 md:items-center gap-1 min-w-0 overflow-hidden">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                ResumeAI
              </h1>
            </div>
          </div>

          {/* CTA */}
          <nav aria-label="Primary" className="flex items-center">
            <Link to="/ResumeRoot">
              <button
                className="
                  px-3 py-2 sm:px-5 sm:py-2.5
                  rounded-xl font-semibold text-white
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  shadow-md sm:shadow-lg
                  hover:shadow-xl hover:-translate-y-0.5
                  transition-all
                  text-sm sm:text-base
                  whitespace-nowrap
                "
              >
                <span className="hidden sm:inline">Open Resume Editor</span>
                <span className="sm:hidden">Open Editor</span>
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
