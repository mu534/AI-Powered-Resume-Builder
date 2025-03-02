import React, { useState } from "react";

const Settings: React.FC = () => {
  const [language, setLanguage] = useState("English");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">Settings</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <label className="block mb-2 font-medium">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
        <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
