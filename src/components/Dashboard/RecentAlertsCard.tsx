import React from 'react';
import { getTimeAgo } from '../../utils/dateUtils';
import { getSeverityBadgeClass } from '../../utils/helpers';

const RecentAlertsCard = ({ alerts, maxDisplay = 5, onViewAll }) => {
  const criticalAlerts = alerts
    .filter(alert => alert.severity_level === 'high')
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    .slice(0, maxDisplay);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-transparent border-0 pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              <i className="fas fa-exclamation-triangle text-danger me-2" aria-hidden="true"></i>
              Recent Critical Alerts
            </h5>
            <p className="mb-0 text-muted small">Monitor and manage patient health alerts</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-danger rounded-pill px-3 py-2">
              {criticalAlerts.length} Critical
            </span>
            {onViewAll && (
              <button className="btn btn-outline-primary btn-sm px-3" onClick={onViewAll}>
                <i className="fas fa-external-link-alt me-1"></i>
                View All
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="card-body pt-3">
        {criticalAlerts.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="border-0 text-muted fw-semibold small text-uppercase">Patient</th>
                    <th scope="col" className="border-0 text-muted fw-semibold small text-uppercase">Issue</th>
                    <th scope="col" className="border-0 text-muted fw-semibold small text-uppercase">Time</th>
                    <th scope="col" className="border-0 text-muted fw-semibold small text-uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {criticalAlerts.map(alert => (
                    <tr key={alert.alert_id} className="border-bottom">
                      <td className="py-3">
                        <div>
                          <div className="fw-semibold text-dark">{alert.patient_name}</div>
                          <small className="text-muted">ID: {alert.patient_id}</small>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-dark">{alert.issue_detected}</span>
                      </td>
                      <td className="py-3">
                        <small className="text-muted">{getTimeAgo(alert.datetime)}</small>
                      </td>
                      <td className="py-3">
                        <span className={`badge rounded-pill ${alert.resolved ? 'bg-success' : 'bg-danger'}`}>
                          <i className={`fas ${alert.resolved ? 'fa-check' : 'fa-exclamation'} me-1`} aria-hidden="true"></i>
                          {alert.resolved ? 'Resolved' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {alerts.filter(a => a.severity_level === 'high').length > maxDisplay && (
              <div className="text-center mt-3 pt-3 border-top">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Showing {maxDisplay} of {alerts.filter(a => a.severity_level === 'high').length} critical alerts
                </small>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-shield-check fa-4x text-success opacity-75" aria-hidden="true"></i>
            </div>
            <h5 className="text-success mb-2">All Systems Normal</h5>
            <p className="text-muted mb-0">No critical alerts at this time. All patients are stable and being monitored.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlertsCard;