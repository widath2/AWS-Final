import React, { useState } from 'react';
import TelemetryForm from './TelemetryForm';

const TestCenter = ({ patients }) => {
  const [selectedView, setSelectedView] = useState('simulator');

  const getVitalStatus = (value, type) => {
    if (!value || value === '--') return { status: 'unknown', color: '#6c757d', icon: 'fa-question' };
    
    if (type === 'heart_rate') {
      if (value > 120 || value < 50) return { status: 'critical', color: '#ff416c', icon: 'fa-exclamation-triangle' };
      if (value > 100 || value < 60) return { status: 'warning', color: '#f7971e', icon: 'fa-exclamation' };
      return { status: 'normal', color: '#43e97b', icon: 'fa-check-circle' };
    } else if (type === 'oxygen') {
      if (value < 90) return { status: 'critical', color: '#ff416c', icon: 'fa-exclamation-triangle' };
      if (value < 95) return { status: 'warning', color: '#f7971e', icon: 'fa-exclamation' };
      return { status: 'normal', color: '#43e97b', icon: 'fa-check-circle' };
    }
    return { status: 'normal', color: '#43e97b', icon: 'fa-check-circle' };
  };

  const getConnectionStatus = (status) => {
    switch(status?.toLowerCase()) {
      case 'online': return { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: '#ffffff', icon: 'fa-wifi', pulse: true };
      case 'offline': return { bg: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', color: '#ffffff', icon: 'fa-wifi-slash', pulse: false };
      default: return { bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', color: '#ffffff', icon: 'fa-clock', pulse: false };
    }
  };

  const onlinePatients = patients?.filter(p => p.connection_status === 'Online') || [];
  const offlinePatients = patients?.filter(p => p.connection_status === 'Offline') || [];
  const criticalPatients = patients?.filter(p => 
    p.heart_rate > 120 || p.heart_rate < 50 || p.oxygen_level < 90
  ) || [];

  return (
    <div className="health-lab-modern">
      {/* Header Section */}
      <div className="health-lab-header">
        <div className="header-content-lab">
          <div className="header-info-lab">
            <h1 className="page-title-lab">
              <i className="fas fa-flask me-3"></i>
              MEDISYS Laboratory
            </h1>
            <p className="page-subtitle-lab">Advanced telemetry simulation and patient monitoring tools</p>
            <div className="lab-stats-pills">
              <div className="lab-stat-pill online">
                <div className="pill-icon">
                  <i className="fas fa-wifi"></i>
                </div>
                <div className="pill-content">
                  <span className="pill-value">{onlinePatients.length}</span>
                  <span className="pill-label">Online</span>
                </div>
              </div>
              <div className="lab-stat-pill offline">
                <div className="pill-icon">
                  <i className="fas fa-wifi-slash"></i>
                </div>
                <div className="pill-content">
                  <span className="pill-value">{offlinePatients.length}</span>
                  <span className="pill-label">Offline</span>
                </div>
              </div>
              <div className="lab-stat-pill critical">
                <div className="pill-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="pill-content">
                  <span className="pill-value">{criticalPatients.length}</span>
                  <span className="pill-label">Critical</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lab-view-switcher">
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${selectedView === 'simulator' ? 'active' : ''}`}
                onClick={() => setSelectedView('simulator')}
              >
                <i className="fas fa-cogs me-2"></i>
                Simulator
              </button>
              <button 
                className={`toggle-btn ${selectedView === 'monitoring' ? 'active' : ''}`}
                onClick={() => setSelectedView('monitoring')}
              >
                <i className="fas fa-monitor-waveform me-2"></i>
                Live Monitor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="health-lab-content">
        {selectedView === 'simulator' ? (
          <div className="simulator-section">
            {/* Info Panel */}
            <div className="info-panel-modern">
              <div className="info-header">
                <h3>
                  <i className="fas fa-info-circle me-2"></i>
                  Telemetry Simulator
                </h3>
                <div className="info-badge">
                  <i className="fas fa-shield-check me-1"></i>
                  AWS Integrated
                </div>
              </div>
              <div className="info-content">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-satellite-dish"></i>
                  </div>
                  <div className="info-text">
                    <h4>Real-time Simulation</h4>
                    <p>Generate realistic patient telemetry data from wearable health devices</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="info-text">
                    <h4>Automated Alerts</h4>
                    <p>Critical values automatically trigger email alerts through AWS SNS</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-database"></i>
                  </div>
                  <div className="info-text">
                    <h4>Cloud Storage</h4>
                    <p>All telemetry data is securely stored in AWS RDS for analysis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Form */}
            <div className="telemetry-form-section">
              <TelemetryForm />
            </div>
          </div>
        ) : (
          <div className="monitoring-section">
            <div className="monitoring-header">
              <h3>
                <i className="fas fa-monitor-waveform me-2"></i>
                Live Patient Monitoring
              </h3>
              <p>Real-time vital signs from connected patients</p>
            </div>
            
            {patients && patients.length > 0 ? (
              <div className="patients-monitor-grid">
                {patients.map(patient => {
                  const connectionConfig = getConnectionStatus(patient.connection_status);
                  const heartRateStatus = getVitalStatus(patient.heart_rate, 'heart_rate');
                  const oxygenStatus = getVitalStatus(patient.oxygen_level, 'oxygen');
                  
                  return (
                    <div key={patient.patient_id} className="patient-monitor-card">
                      {/* Monitor Header */}
                      <div className="monitor-header">
                        <div className="patient-info-monitor">
                          <div className="patient-avatar-monitor" style={{ background: connectionConfig.bg }}>
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="patient-details">
                            <h4 className="patient-name-monitor">{patient.name}</h4>
                            <span className="patient-id-monitor">ID: {patient.patient_id}</span>
                          </div>
                        </div>
                        <div className="connection-indicator" style={{ background: connectionConfig.bg }}>
                          <i className={`fas ${connectionConfig.icon} ${connectionConfig.pulse ? 'pulse-icon' : ''}`}></i>
                          <span>{patient.connection_status}</span>
                        </div>
                      </div>

                      {/* Vital Signs Display */}
                      <div className="vitals-display">
                        <div className="vital-monitor heart-rate">
                          <div className="vital-header">
                            <div className="vital-icon-monitor" style={{ color: heartRateStatus.color }}>
                              <i className="fas fa-heartbeat"></i>
                            </div>
                            <div className="vital-info-monitor">
                              <span className="vital-label-monitor">Heart Rate</span>
                              <div className="vital-reading">
                                <span className="vital-value-monitor" style={{ color: heartRateStatus.color }}>
                                  {patient.heart_rate || '--'}
                                </span>
                                <span className="vital-unit">bpm</span>
                              </div>
                            </div>
                            <div className="status-indicator-monitor" style={{ color: heartRateStatus.color }}>
                              <i className={`fas ${heartRateStatus.icon}`}></i>
                            </div>
                          </div>
                          <div className="vital-waveform">
                            <div className="waveform-line" style={{ borderColor: heartRateStatus.color }}></div>
                          </div>
                        </div>

                        <div className="vital-monitor oxygen-level">
                          <div className="vital-header">
                            <div className="vital-icon-monitor" style={{ color: oxygenStatus.color }}>
                              <i className="fas fa-lungs"></i>
                            </div>
                            <div className="vital-info-monitor">
                              <span className="vital-label-monitor">Oxygen Level</span>
                              <div className="vital-reading">
                                <span className="vital-value-monitor" style={{ color: oxygenStatus.color }}>
                                  {patient.oxygen_level || '--'}
                                </span>
                                <span className="vital-unit">%</span>
                              </div>
                            </div>
                            <div className="status-indicator-monitor" style={{ color: oxygenStatus.color }}>
                              <i className={`fas ${oxygenStatus.icon}`}></i>
                            </div>
                          </div>
                          <div className="vital-waveform">
                            <div className="waveform-line" style={{ borderColor: oxygenStatus.color }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Last Reading */}
                      <div className="monitor-footer">
                        <div className="last-reading">
                          <i className="fas fa-clock me-2 text-muted"></i>
                          <span>Last reading: {patient.last_reading 
                            ? new Date(patient.last_reading).toLocaleString() 
                            : 'No data'
                          }</span>
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="monitor-glow" style={{ 
                        background: connectionConfig.bg,
                        opacity: patient.connection_status === 'Online' ? 0.1 : 0.05
                      }}></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-patients-monitor">
                <div className="no-patients-icon">
                  <i className="fas fa-user-slash"></i>
                </div>
                <h3>No Patients Connected</h3>
                <p>Add patients to the system to begin live monitoring</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCenter;