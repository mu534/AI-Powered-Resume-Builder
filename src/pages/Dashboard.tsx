import { Link } from "react-router-dom";
import CoverLetterGen from "../components/CoverLetterGen";
import Footer from "../components/Footer";
import AboutResumeAI from "../components/AboutResumeAI";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <a className="sr-only" href="#main-content">
        Skip to main content
      </a>

      <header
        className="fixed w-full z-20"
        role="banner"
        style={{ background: "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold text-gray-900">ResumeAI</div>
            <p className="text-sm text-muted-foreground">
              Build professional resumes faster
            </p>
          </div>

          <nav aria-label="Primary">
            <Link to="/ResumeRoot" aria-label="Open resume editor">
              <button
                className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg,var(--color-primary), var(--color-primary-600))",
                  boxShadow: "0 6px 18px rgba(15,118,110,0.15)",
                }}
              >
                Resume Editor
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Welcome to{" "}
              <span style={{ color: "var(--color-primary)" }}>ResumeAI</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Craft ATS-friendly resumes and cover letters with AI guidance.
            </p>
          </section>

          <section aria-labelledby="about-heading">
            <AboutResumeAI />
          </section>

          <section aria-labelledby="cover-heading" className="surface p-6">
            <h2
              id="cover-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              AI Cover Letter Generator
            </h2>
            <CoverLetterGen />
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
