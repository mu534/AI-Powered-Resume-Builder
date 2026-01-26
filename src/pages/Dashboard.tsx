import CoverLetterGen from "../components/CoverLetterGen";
import Footer from "../components/Footer";
import AboutResumeAI from "../components/AboutResumeAI";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard: React.FC = () => {
  return (
    <>
      <DashboardHeader />

      <DashboardLayout>
        {/* HERO */}
        <section className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-600">
            AI Career Toolkit
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            Build job-winning resumes with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Create ATS-friendly resumes and professional cover letters in
            minutes using powerful AI guidance.
          </p>
        </section>

        {/* ABOUT */}
        <section>
          <AboutResumeAI />
        </section>

        {/* COVER LETTER TOOL */}
        <section className="rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              AI Cover Letter Generator
            </h2>
            <p className="text-gray-600 text-sm">
              Instantly generate a tailored, recruiter-ready cover letter.
            </p>
          </div>

          <CoverLetterGen />
        </section>

        <Footer />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
