import React, { useState } from "react";
import { Link } from "react-router";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("ResumeAI");
  const email = "Example@example.com";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target?.result as string;
        setProfileImage(image);
        saveProfileData(name, image);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    saveProfileData(name, profileImage);
    alert("Profile saved successfully!");
  };

  const saveProfileData = (name: string, profileImage: string | null) => {
    const profileData = { name, profileImage };
    localStorage.setItem("profile", JSON.stringify(profileData));
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <nav className="bg-white shadow-md fixed  z-10 top-0 items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Settings
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="flex flex-col items-center">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
              />
            </label>
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded mt-1"
              value={email}
              readOnly
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
          >
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
