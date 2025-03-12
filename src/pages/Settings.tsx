import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/api/language", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} - ${await response.text()}`
          );
        }

        const data = await response.json();
        setLanguage(data.language || "English");
      } catch (err) {
        setError("Failed to fetch language. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/language", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        throw new Error(
          `API error: ${response.status} - ${await response.text()}`
        );
      }

      console.log("Language saved successfully:", await response.json());
    } catch (err) {
      setError("Error saving language. Please try again.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 ml-20 mt-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold ml-30 text-indigo-900 mb-8">
        Settings
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            disabled={loading}
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
          </select>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
