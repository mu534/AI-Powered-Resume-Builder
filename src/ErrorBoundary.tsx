import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error; eventId?: string };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    try {
      const eventId = `err_${Date.now()}`;
      this.setState({ eventId });
      // Best-effort send to server logging endpoint; ignore failures
      await fetch("/api/logs/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          message: error.message,
          stack: error.stack,
          info: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          url: window.location.href,
          ts: new Date().toISOString(),
        }),
      }).catch(() => {
        /* swallow */
      });
    } catch (e) {
      // final fallback
      console.error("ErrorBoundary logging failed", e);
    }
    console.error("ErrorBoundary caught an error:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, eventId: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="surface max-w-xl w-full p-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              An unexpected error occurred. You can try reloading the page or
              contact support if the issue persists.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium"
              >
                Try again
              </button>

              <a
                href={`mailto:support@example.com?subject=App%20Error%20Report&body=EventId:%20${this.state.eventId}%0AError:%20${encodeURIComponent(
                  String(this.state.error?.message || ""),
                )}`}
                className="px-4 py-2 rounded-md border border-gray-200 text-gray-700"
              >
                Contact support
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {this.state.eventId ? (
                <span>Reference: {this.state.eventId}</span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
