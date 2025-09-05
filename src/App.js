import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Common/Navigation';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ErrorAlert from './components/Common/ErrorAlert';
import DashboardView from './components/Dashboard/DashboardView.js';
import { useAppContext } from './context/AppContext';
import './App.css';

// Import other views (you'll need to create these similar to the dashboard)
const PatientsView = React.lazy(() => import('./components/Patients/PatientsView'));
const AlertsView = React.lazy(() => import('./components/Alerts/AlertsView'));
const TestCenter = React.lazy(() => import('./components/TestCenter/TestCenter'));

const MainContent = () => {
  const { 
    patients, 
    alerts, 
    stats, 
    loading, 
    error, 
    clearError 
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavigate = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Show loading spinner only when initially loading data
    if (loading && patients.length === 0 && alerts.length === 0 && Object.keys(stats).length === 0) {
      return (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        {activeTab === 'dashboard' && (
          <DashboardView 
            stats={stats} 
            alerts={alerts} 
            patients={patients}
            onNavigate={handleNavigate}
          />
        )}
        
        {activeTab === 'patients' && (
          <PatientsView patients={patients} />
        )}
        
        {activeTab === 'alerts' && (
          <AlertsView alerts={alerts} />
        )}
        
        {activeTab === 'test' && (
          <TestCenter patients={patients} />
        )}
      </React.Suspense>
    );
  };

  return (
    <div className="app min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow-1">
        {/* Error Display */}
        {error && (
          <div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 9999, marginTop: '100px' }}>
            <ErrorAlert 
              message={error} 
              onClose={clearError}
            />
          </div>
        )}
        
        {/* Main Content */}
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;