import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AlertsView = ({ alerts }) => {
  const { loading, refreshData } = useAppContext();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return (
      <div className="alerts-modern-view">
        <div className="loading-state">
          <div className="loading-spinner-modern">
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
          <h3>Loading Alerts...</h3>
          <p>Fetching the latest patient alerts</p>
        </div>
      </div>
    );
  }

  // Filter and sort logic
  const getFilteredAndSortedAlerts = () => {
    let filtered = alerts || [];
    
    // Filter by severity
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity_level === filterSeverity);
    }
    
    // Filter by status
    if (filterStatus === 'resolved') {
      filtered = filtered.filter(alert => alert.resolved);
    } else if (filterStatus === 'unresolved') {
      filtered = filtered.filter(alert => !alert.resolved);
    }
    
    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    } else if (sortBy === 'severity') {
      const severityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      filtered.sort((a, b) => severityOrder[b.severity_level] - severityOrder[a.severity_level]);
    }
    
    return filtered;
  };

  const criticalAlerts = alerts?.filter(alert => alert.severity_level === 'high') || [];
  const mediumAlerts = alerts?.filter(alert => alert.severity_level === 'medium') || [];
  const lowAlerts = alerts?.filter(alert => alert.severity_level === 'low') || [];
  const unresolvedAlerts = alerts?.filter(alert => !alert.resolved) || [];
  const resolvedAlerts = alerts?.filter(alert => alert.resolved) || [];

  const getSeverityConfig = (severity) => {
    switch(severity) {
      case 'high':
        return { 
          color: '#ff416c', 
          bg: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          icon: 'fa-exclamation-triangle',
          label: 'Critical'
        };
      case 'medium':
        return { 
          color: '#f7971e', 
          bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
          icon: 'fa-exclamation',
          label: 'Warning'
        };
      case 'low':
        return { 
          color: '#4facfe', 
          bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          icon: 'fa-info-circle',
          label: 'Info'
        };
      default:
        return { 
          color: '#6c757d', 
          bg: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
          icon: 'fa-question',
          label: 'Unknown'
        };
    }
  };

  const getTimeAgo = (datetime) => {
    const now = new Date();
    const alertTime = new Date(datetime);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredAlerts = getFilteredAndSortedAlerts();

  return (
    <div className="alerts-modern-view">
      {/* Header Section */}
      <div className="alerts-header-modern">
        <div className="header-content-alerts">
          <div className="header-info-alerts">
            <h1 className="page-title-alerts">
              <i className="fas fa-bell me-3"></i>
              MEDISYS Alert Management
            </h1>
            <p className="page-subtitle-alerts">Monitor and manage critical patient health alerts</p>
            <div className="stats-pills-alerts">
              <div className="stat-pill-alert critical">
                <i className="fas fa-exclamation-triangle me-1"></i>
                {criticalAlerts.length} Critical
              </div>
              <div className="stat-pill-alert warning">
                <i className="fas fa-exclamation me-1"></i>
                {mediumAlerts.length} Warning
              </div>
              <div className="stat-pill-alert info">
                <i className="fas fa-info-circle me-1"></i>
                {lowAlerts.length} Info
              </div>
              <div className="stat-pill-alert unresolved">
                <i className="fas fa-clock me-1"></i>
                {unresolvedAlerts.length} Unresolved
              </div>
            </div>
          </div>
          <div className="header-actions-alerts">
            <button onClick={refreshData} className="refresh-btn-modern">
              <i className="fas fa-sync-alt me-2"></i>
              Refresh Alerts
              <div className="btn-shimmer"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="alerts-filters-modern">
        <div className="filter-group">
          <label className="filter-label">
            <i className="fas fa-filter me-2"></i>
            Severity
          </label>
          <select 
            value={filterSeverity} 
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="high">Critical</option>
            <option value="medium">Warning</option>
            <option value="low">Info</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">
            <i className="fas fa-tasks me-2"></i>
            Status
          </label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">
            <i className="fas fa-sort me-2"></i>
            Sort By
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="severity">By Severity</option>
          </select>
        </div>
        
        <div className="results-count">
          <span>{filteredAlerts.length} alerts found</span>
        </div>
      </div>

      {/* Alerts Content */}
      <div className="alerts-content-modern">
        {!alerts || alerts.length === 0 ? (
          <div className="no-alerts-modern">
            <div className="empty-state-alerts">
              <div className="empty-icon-alerts">
                <i className="fas fa-shield-check"></i>
              </div>
              <h3>All Clear!</h3>
              <p>No patient alerts at this time. All systems are operating normally.</p>
            </div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="no-results-modern">
            <div className="no-results-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No Results Found</h3>
            <p>No alerts match your current filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="alerts-grid-modern">
            {filteredAlerts.map((alert, index) => {
              const severityConfig = getSeverityConfig(alert.severity_level);
              return (
                <div 
                  key={alert.alert_id} 
                  className="alert-card-modern"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Alert Header */}
                  <div className="alert-card-header">
                    <div className="severity-indicator" style={{ background: severityConfig.bg }}>
                      <i className={`fas ${severityConfig.icon}`}></i>
                    </div>
                    <div className="alert-meta">
                      <div className="patient-info">
                        <h4 className="patient-name">{alert.patient_name}</h4>
                        <span className="patient-id">ID: {alert.patient_id}</span>
                      </div>
                      <div className="alert-timing">
                        <span className="time-ago">{getTimeAgo(alert.datetime)}</span>
                        <span className="full-time">{new Date(alert.datetime).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="severity-badge" style={{ background: severityConfig.bg }}>
                      {severityConfig.label}
                    </div>
                  </div>

                  {/* Alert Content */}
                  <div className="alert-card-content">
                    <div className="issue-section">
                      <h5 className="issue-title">
                        <i className="fas fa-exclamation-circle me-2" style={{ color: severityConfig.color }}></i>
                        {alert.issue_detected}
                      </h5>
                      {alert.message && (
                        <p className="alert-description">{alert.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Alert Footer */}
                  <div className="alert-card-footer">
                    <div className="status-section">
                      {alert.resolved ? (
                        <div className="status-resolved">
                          <i className="fas fa-check-circle me-2"></i>
                          <span>Resolved</span>
                        </div>
                      ) : (
                        <div className="status-unresolved">
                          <i className="fas fa-clock me-2"></i>
                          <span>Needs Attention</span>
                        </div>
                      )}
                    </div>
                    <div className="alert-actions">
                      {!alert.resolved && (
                        <button className="resolve-btn" title="Mark as Resolved">
                          <i className="fas fa-check me-1"></i>
                          Resolve
                        </button>
                      )}
                      <button className="details-btn" title="View Details">
                        <i className="fas fa-eye me-1"></i>
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div 
                    className="alert-glow" 
                    style={{ 
                      background: severityConfig.bg,
                      opacity: alert.resolved ? 0.02 : 0.05
                    }}
                  ></div>

                  {/* Priority Indicator */}
                  {alert.severity_level === 'high' && !alert.resolved && (
                    <div className="priority-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsView;