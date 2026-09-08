import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-space-xl">
          <div className="bg-surface-container max-w-lg w-full rounded-2xl p-space-lg shadow-lg border border-outline-variant text-center">
            <div className="w-16 h-16 bg-error-container text-error rounded-full flex items-center justify-center mx-auto mb-space-md">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-title-lg font-bold text-on-surface mb-space-xs">Something went wrong</h1>
            <p className="text-body-md text-on-surface-variant mb-space-md">
              An unexpected error occurred in the application.
            </p>
            {this.state.error && (
              <div className="bg-surface-container-highest p-space-sm rounded-xl text-left overflow-auto max-h-48 mb-space-md border border-outline-variant">
                <code className="text-body-sm tabular-nums text-error">
                  {this.state.error.toString()}
                </code>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-space-md py-2 bg-primary text-on-primary rounded-xl font-semibold shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              Reload application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
