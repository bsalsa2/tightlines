import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            background: '#fecaca',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '2rem auto',
          }}
        >
          <h2 style={{ color: '#991b1b' }}>Something went wrong</h2>
          <p style={{ color: '#7f1d1d' }}>{this.state.error?.message}</p>
          <button
            onClick={this.reset}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#991b1b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
