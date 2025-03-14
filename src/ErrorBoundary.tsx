import React from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-red-500 text-xl">Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
