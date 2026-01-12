// src/config/db.js
// NOTE: Backend DB connector has been moved to /backend/config/db.js
// This stub exists so frontend build pipeline doesn't try to bundle server-only
// MongoDB code. Do NOT call this in the browser.

const connectDB = async () => {
  console.warn(
    "connectDB is a server-side helper. Use backend/config/db.js on the server."
  );
};

export default connectDB;
