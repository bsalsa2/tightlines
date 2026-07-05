import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Card from './components/Card';
import Button from './components/Button';

function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('/health');
        if (response.ok) {
          setApiStatus('connected');
        }
      } catch (err) {
        setApiStatus('disconnected');
      } finally {
        setIsChecking(false);
      }
    };

    checkApi();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>🎣 Fishing App</h1>
          <p>Track your catches and explore fishing locations</p>
          {!isChecking && (
            <div className={`api-status ${apiStatus}`}>
              API: {apiStatus === 'connected' ? '✓ Connected' : '⚠ Disconnected'}
            </div>
          )}
        </header>

        <main className="App-main">
          <section className="hero">
            <h2>Welcome to Fishing App</h2>
            <p>
              Your all-in-one platform for logging catches, discovering fishing spots, and connecting with
              fellow anglers.
            </p>

            <div className="features-grid">
              <Card
                title="📊 Log Catches"
                subtitle="Track your fishing success"
                footer={<Button variant="secondary" size="sm">Learn More</Button>}
              >
                <p>Record fish species, weight, location, bait type, and more. Build your fishing history.</p>
              </Card>

              <Card
                title="🗺️ Explore Spots"
                subtitle="Discover fishing locations"
                footer={<Button variant="secondary" size="sm">Learn More</Button>}
              >
                <p>Find and share fishing locations with the community. Add reviews and catch reports.</p>
              </Card>

              <Card
                title="🏆 Tournaments"
                subtitle="Compete and score"
                footer={<Button variant="secondary" size="sm">Learn More</Button>}
              >
                <p>Participate in fishing tournaments, track scores, and see leaderboards.</p>
              </Card>

              <Card
                title="🤝 Community"
                subtitle="Connect with others"
                footer={<Button variant="secondary" size="sm">Learn More</Button>}
              >
                <p>Share your best catches, tips, and stories with fellow fishing enthusiasts.</p>
              </Card>
            </div>

            <div className="cta-section">
              <h3>Get Started</h3>
              <div className="cta-buttons">
                <Button variant="primary" size="lg">
                  Sign Up
                </Button>
                <Button variant="secondary" size="lg">
                  View Public Catches
                </Button>
              </div>
            </div>

            <Card title="💡 Tech Stack" className="tech-stack">
              <div className="tech-list">
                <div>
                  <strong>Backend:</strong> Node.js, Express.js, PostgreSQL
                </div>
                <div>
                  <strong>Frontend:</strong> React 18, Mapbox GL
                </div>
                <div>
                  <strong>DevOps:</strong> GitHub Actions, Railway, Vercel
                </div>
                <div>
                  <strong>API:</strong> RESTful with JWT authentication
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
