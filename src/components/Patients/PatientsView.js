import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import PatientForm from './PatientForm';
import { createPatient, updatePatient, deletePatient } from '../../services/api';

const PatientsView = ({ patients }) => {
  const { loading, refreshData } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDeletePatient = (patient) => {
    setDeleteConfirm(patient);
  };

  const confirmDelete = async () => {
    try {
      await deletePatient(deleteConfirm.patient_id);
      setDeleteConfirm(null);
      refreshData();
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Error deleting patient: ${error.message}`);
    }
  };

  const handleSavePatient = async (patientData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.patient_id, patientData);
      } else {
        await createPatient(patientData);
      }
      setShowForm(false);
      setEditingPatient(null);
      refreshData();
    } catch (error) {
      throw error;
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  if (loading) {
    return (
      <div className="patients-view">
        <h2>Patients</h2>
        <div className="patients-content">
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'online': return { bg: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', color: '#ffffff', icon: 'fa-wifi' };
      case 'offline': return { bg: 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)', color: '#ffffff', icon: 'fa-wifi-slash' };
      default: return { bg: 'linear-gradient(135deg, #ffd200 0%, #f7971e 100%)', color: '#ffffff', icon: 'fa-clock' };
    }
  };

  const getVitalStatus = (value, type) => {
    if (!value || value === '--') return { status: 'unknown', color: '#6c757d' };
    
    if (type === 'heart_rate') {
      if (value > 120 || value < 50) return { status: 'critical', color: '#ff416c' };
      if (value > 100 || value < 60) return { status: 'warning', color: '#f7971e' };
      return { status: 'normal', color: '#43e97b' };
    } else if (type === 'oxygen') {
      if (value < 90) return { status: 'critical', color: '#ff416c' };
      if (value < 95) return { status: 'warning', color: '#f7971e' };
      return { status: 'normal', color: '#43e97b' };
    }
    return { status: 'normal', color: '#43e97b' };
  };

  return (
    <div className="patients-modern-view">
      {/* Header Section */}
      <div className="patients-header-modern">
        <div className="header-content">
          <div className="header-info">
            <h1 className="page-title">
              <i className="fas fa-users me-3"></i>
              MEDISYS Patient Management
            </h1>
            <p className="page-subtitle">Monitor and manage all registered patients</p>
            <div className="stats-pills">
              <span className="stat-pill total">
                <i className="fas fa-users me-1"></i>
                {patients?.length || 0} Total
              </span>
              <span className="stat-pill online">
                <i className="fas fa-wifi me-1"></i>
                {patients?.filter(p => p.connection_status === 'Online').length || 0} Online
              </span>
              <span className="stat-pill critical">
                <i className="fas fa-heartbeat me-1"></i>
                {patients?.filter(p => p.heart_rate > 120 || p.heart_rate < 50 || p.oxygen_level < 90).length || 0} Critical
              </span>
            </div>
          </div>
          <button onClick={handleAddPatient} className="add-patient-btn-modern">
            <i className="fas fa-plus me-2"></i>
            Add New Patient
            <div className="btn-shimmer"></div>
          </button>
        </div>
      </div>
      
      <div className="patients-content-modern">
        {!patients || patients.length === 0 ? (
          <div className="no-patients-modern">
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3>No Patients Yet</h3>
              <p>Start by adding your first patient to begin monitoring their health metrics</p>
              <button onClick={handleAddPatient} className="add-first-patient-btn-modern">
                <i className="fas fa-plus me-2"></i>
                Add Your First Patient
              </button>
            </div>
          </div>
        ) : (
          <div className="patients-grid">
            {patients.map(patient => {
              const statusConfig = getStatusColor(patient.connection_status);
              const heartRateStatus = getVitalStatus(patient.heart_rate, 'heart_rate');
              const oxygenStatus = getVitalStatus(patient.oxygen_level, 'oxygen');
              
              return (
                <div key={patient.patient_id} className="patient-card-modern">
                  {/* Card Header */}
                  <div className="patient-card-header">
                    <div className="patient-avatar" style={{ background: statusConfig.bg }}>
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="patient-basic-info">
                      <h3 className="patient-name">{patient.name}</h3>
                      <p className="patient-id">ID: {patient.patient_id}</p>
                      <div className="patient-demographics">
                        <span className="demo-item">
                          <i className="fas fa-birthday-cake me-1"></i>
                          {patient.age} years
                        </span>
                        <span className="demo-item">
                          <i className={`fas ${patient.gender?.toLowerCase() === 'male' ? 'fa-mars' : 'fa-venus'} me-1`}></i>
                          {patient.gender}
                        </span>
                      </div>
                    </div>
                    <div className="connection-status" style={{ background: statusConfig.bg }}>
                      <i className={`fas ${statusConfig.icon}`}></i>
                      <span>{patient.connection_status}</span>
                    </div>
                  </div>

                  {/* Vitals Section */}
                  <div className="vitals-section">
                    <div className="vital-card heart-rate">
                      <div className="vital-icon" style={{ color: heartRateStatus.color }}>
                        <i className="fas fa-heartbeat"></i>
                      </div>
                      <div className="vital-info">
                        <span className="vital-label">Heart Rate</span>
                        <span className="vital-value" style={{ color: heartRateStatus.color }}>
                          {patient.heart_rate || '--'} {patient.heart_rate ? 'bpm' : ''}
                        </span>
                      </div>
                      <div className="vital-indicator" style={{ background: heartRateStatus.color }}></div>
                    </div>

                    <div className="vital-card oxygen-level">
                      <div className="vital-icon" style={{ color: oxygenStatus.color }}>
                        <i className="fas fa-lungs"></i>
                      </div>
                      <div className="vital-info">
                        <span className="vital-label">Oxygen Level</span>
                        <span className="vital-value" style={{ color: oxygenStatus.color }}>
                          {patient.oxygen_level || '--'}{patient.oxygen_level ? '%' : ''}
                        </span>
                      </div>
                      <div className="vital-indicator" style={{ background: oxygenStatus.color }}></div>
                    </div>
                  </div>

                  {/* Medical Info */}
                  <div className="medical-info">
                    <div className="info-item">
                      <i className="fas fa-notes-medical me-2 text-info"></i>
                      <span className="info-label">Conditions:</span>
                      <span className="info-value">{patient.medical_conditions || 'None recorded'}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-clock me-2 text-muted"></i>
                      <span className="info-label">Last Reading:</span>
                      <span className="info-value">
                        {patient.last_reading 
                          ? new Date(patient.last_reading).toLocaleString() 
                          : 'No data available'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions">
                    <button 
                      onClick={() => handleEditPatient(patient)}
                      className="action-btn edit-btn-modern"
                      title="Edit Patient"
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePatient(patient)}
                      className="action-btn delete-btn-modern"
                      title="Delete Patient"
                    >
                      <i className="fas fa-trash me-2"></i>
                      Delete
                    </button>
                  </div>

                  {/* Card Glow Effect */}
                  <div className="card-glow" style={{ 
                    background: statusConfig.bg,
                    opacity: patient.connection_status === 'Online' ? 0.1 : 0.05
                  }}></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Patient Form Modal */}
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onCancel={handleCancelForm}
          isEditing={!!editingPatient}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete patient <strong>{deleteConfirm.name}</strong> ({deleteConfirm.patient_id})?
            </p>
            <p className="warning-text">
              This will also delete all associated telemetry data and alerts.
            </p>
            <div className="confirm-actions">
              <button onClick={() => setDeleteConfirm(null)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={confirmDelete} className="confirm-delete-btn">
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsView;