import { Link } from "react-router-dom";

const AboutResumeAI = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-6">
      {/* Decorative background blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — Text / Content */}
        <div className="space-y-8">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
            AI-Powered Resume Builder
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Build smarter resumes with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            ResumeAI helps you create professional resumes and cover letters
            using advanced AI — faster, smarter, and tailored to today’s job
            market.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ResumeRoot">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5">
                Get Started Free
              </button>
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* RIGHT — Feature Cards */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "AI-Generated Content",
              desc: "Smart summaries and experience descriptions tailored to your role.",
            },
            {
              title: "Real-Time Suggestions",
              desc: "Instant feedback to improve clarity, impact, and ATS scores.",
            },
            {
              title: "Modern Templates",
              desc: "Clean, professional layouts recruiters actually like.",
            },
            {
              title: "Export Anywhere",
              desc: "Download resumes in multiple formats, ready to apply.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom statement */}
      <div className="relative max-w-3xl mx-auto mt-20 text-center">
        <p className="text-xl text-gray-700">
          Whether you’re a student, graduate, or professional, ResumeAI helps
          you tell your story with confidence — powered by AI.
        </p>
      </div>
    </section>
  );
};

export default AboutResumeAI;
