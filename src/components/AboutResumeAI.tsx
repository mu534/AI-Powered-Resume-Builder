import { Link } from "react-router-dom";

const AboutResumeAI = () => {
  return (
    <div className="p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-indigo-50 hover:shadow-3xl transition-all duration-500 max-w-4xl mx-auto transform hover:-translate-y-2">
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* Header with Animated Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent animate-pulse-once">
          About ResumeAI
        </h2>

        {/* Descriptive Paragraph with Subtle Animation */}
        <p className="text-gray-700 text-xl leading-relaxed max-w-2xl opacity-90 hover:opacity-100 transition-opacity duration-300">
          ResumeAI is an advanced AI-powered platform designed to revolutionize
          how you create resumes and cover letters. Leveraging cutting-edge
          technology, this website will generate personalized content
          suggestions, professional formatting, and seamless editing tools to
          help you shine in the job market.
        </p>

        {/* Features and Benefits Grid with Modern Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-full">
          <div className="p-6 bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Features
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> AI-driven
                content optimization
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Real-time
                feedback and suggestions
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> This website
                will generate integrated cover letters
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Export options
                in multiple formats
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> User-friendly
                interface
              </li>
            </ul>
          </div>
          <div className="p-6 bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Us?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Boost your
                employability with AI precision
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Save time as
                this website will generate your documents
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Access
                professional designs without hassle
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Support for all
                career levels
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✔</span> Continuous
                updates and improvements
              </li>
            </ul>
          </div>
        </div>

        {/* Closing Paragraph with Animation */}
        <p className="text-gray-700 text-xl leading-relaxed max-w-2xl opacity-90 hover:opacity-100 transition-opacity duration-300">
          Whether you're starting your career or seeking a promotion, ResumeAI
          is your partner in building a compelling professional story. This
          website will generate your next step toward your dream job today!
        </p>

        {/* Call to Action */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Enhance Your Career?
          </h2>
          <p className="text-xl text-gray-600">
            Start building your future today with ResumeAI’s powerful tools!
          </p>
          <Link to="/ResumeRoot">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutResumeAI;
