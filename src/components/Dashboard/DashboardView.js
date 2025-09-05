import React from 'react';
import StatCard from './StatCard.tsx';
import HealthMetricCard from './HealthMetricCard.tsx';
import RecentAlertsCard from './RecentAlertsCard.tsx';

const DashboardView = ({ stats, alerts, onNavigate }) => {
  const handleStatCardClick = (tab) => {
    if (onNavigate) onNavigate(tab);
  };

  // Calculate dynamic metrics
  const getTotalCritical = () => {
    return (stats.critical_alerts_today || 0) + (stats.unresolved_alerts || 0);
  };

  const getSystemStatus = () => {
    const critical = getTotalCritical();
    if (critical > 10) return { status: 'Critical', color: '#ff416c', icon: 'fa-exclamation-triangle' };
    if (critical > 5) return { status: 'Warning', color: '#f7971e', icon: 'fa-exclamation' };
    return { status: 'Optimal', color: '#43e97b', icon: 'fa-check-circle' };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="dashboard-modern-view">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="header-content-dash">
          <div className="header-info-dash">
            <h1 className="page-title-dash">
              <i className="fas fa-tachometer-alt me-3"></i>
              MEDISYS Dashboard
            </h1>
            <p className="page-subtitle-dash">Advanced patient monitoring with real-time health analytics and AI-powered insights</p>
            <div className="status-indicators">
              <div className="system-status-indicator" style={{ background: `linear-gradient(135deg, ${systemStatus.color}, ${systemStatus.color}dd)` }}>
                <i className={`fas ${systemStatus.icon} me-2`}></i>
                System {systemStatus.status}
              </div>
              <div className="live-indicator">
                <div className="pulse-dot"></div>
                <span>Live Monitoring</span>
              </div>
              <div className="last-update">
                <i className="fas fa-sync-alt me-1"></i>
                Updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn patients-btn" onClick={() => handleStatCardClick('patients')}>
              <i className="fas fa-users me-2"></i>
              Manage Patients
            </button>
            <button className="quick-action-btn alerts-btn" onClick={() => handleStatCardClick('alerts')}>
              <i className="fas fa-bell me-2"></i>
              View Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="stats-section-modern">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-chart-line me-2"></i>
            Key Performance Metrics
          </h3>
          <p className="section-subtitle">Live statistics and comprehensive health monitoring indicators</p>
        </div>
        
        <div className="stats-grid-modern">
          <div className="stat-card-container">
            <StatCard
              title="Total Patients"
              value={stats.total_patients}
              icon="fas fa-users"
              color="primary"
              trend={5}
              subtitle="Registered"
              onClick={() => handleStatCardClick('patients')}
            />
          </div>
          <div className="stat-card-container">
            <StatCard
              title="Active Patients"
              value={stats.active_patients}
              icon="fas fa-heartbeat"
              color="success"
              trend={2}
              subtitle="Currently monitored"
              onClick={() => handleStatCardClick('patients')}
            />
          </div>
          <div className="stat-card-container">
            <StatCard
              title="Critical Alerts"
              value={stats.critical_alerts_today}
              icon="fas fa-exclamation-triangle"
              color="danger"
              trend={-1}
              subtitle="Today"
              onClick={() => handleStatCardClick('alerts')}
            />
          </div>
          <div className="stat-card-container">
            <StatCard
              title="Unresolved Alerts"
              value={stats.unresolved_alerts}
              icon="fas fa-bell"
              color="warning"
              trend={0}
              subtitle="Pending action"
              onClick={() => handleStatCardClick('alerts')}
            />
          </div>
        </div>
      </div>

      {/* Health Metrics Section */}
      <div className="health-metrics-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-activity me-2"></i>
            Advanced Vital Signs Analytics
          </h3>
          <p className="section-subtitle">Real-time vital signs analysis with predictive health monitoring across all patients</p>
        </div>
        
        <div className="health-metrics-grid">
          <div className="health-metric-container">
            <HealthMetricCard
              title="Average Heart Rate Today"
              value={stats.avg_heart_rate_today}
              unit="BPM"
              icon="fas fa-heartbeat"
              maxValue={120}
              normalRange="Normal: 60-120 BPM"
              color="danger"
            />
          </div>
          <div className="health-metric-container">
            <HealthMetricCard
              title="Average Oxygen Level Today"
              value={stats.avg_oxygen_level_today}
              unit="%"
              icon="fas fa-lungs"
              maxValue={100}
              normalRange="Normal: 95-100%"
              color="info"
            />
          </div>
          <div className="health-metric-container additional-metrics">
            <div className="metric-summary-card">
              <div className="metric-summary-header">
                <h4>
                  <i className="fas fa-chart-pie me-2"></i>
                  Patient Health Overview
                </h4>
              </div>
              <div className="metric-summary-content">
                <div className="summary-item">
                  <div className="summary-icon normal">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Normal Patients</span>
                    <span className="summary-value">{(stats.active_patients || 0) - getTotalCritical()}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon warning">
                    <i className="fas fa-exclamation"></i>
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Needs Attention</span>
                    <span className="summary-value">{getTotalCritical()}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon info">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Avg Response Time</span>
                    <span className="summary-value">2.3 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Critical Alerts Section */}
      <div className="alerts-section-modern">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Emergency Alert Center
          </h3>
          <p className="section-subtitle">Real-time monitoring and instant response to critical patient health emergencies</p>
        </div>
        
        <div className="alerts-container-modern">
          <RecentAlertsCard 
            alerts={alerts} 
            maxDisplay={5}
            onViewAll={() => handleStatCardClick('alerts')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;