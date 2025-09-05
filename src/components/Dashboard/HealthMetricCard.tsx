import React from 'react';
import { calculatePercentage } from '../../utils/helpers';

const HealthMetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  maxValue,
  normalRange,
  color = 'primary',
  showProgress = true
}) => {
  const percentage = showProgress ? calculatePercentage(value, maxValue) : 0;
  const formattedValue = typeof value === 'number' ? value.toFixed(1) : 0;

  const getGradientStyle = (color) => {
    const gradients = {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      danger: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      warning: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      info: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)'
    };
    return gradients[color] || gradients.primary;
  };

  return (
    <div className="card shadow-lg border-0 h-100" style={{
      background: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{ background: getGradientStyle(color) }}
      ></div>
      <div className="card-body p-4 position-relative">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="me-3 p-3 rounded-3"
            style={{ 
              background: getGradientStyle(color),
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <i className={`${icon} fa-2x text-white`} aria-hidden="true"></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="card-title mb-1 text-muted fw-semibold small text-uppercase">{title}</h6>
            <div className="d-flex align-items-baseline">
              <h2 className={`text-${color} mb-0 me-2 fw-bold`}>
                {formattedValue}
              </h2>
              <span className="text-muted fw-semibold">{unit}</span>
            </div>
          </div>
        </div>
        
        {showProgress && (
          <div className="mb-3">
            <div className="progress" style={{height: '12px', borderRadius: '15px', backgroundColor: 'rgba(0,0,0,0.1)'}}>
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{
                  width: `${percentage}%`,
                  borderRadius: '15px',
                  background: getGradientStyle(color),
                  transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-muted">0</small>
              <small className={`text-${color} fw-semibold`}>{percentage.toFixed(0)}%</small>
              <small className="text-muted">{maxValue}</small>
            </div>
          </div>
        )}
        
        <div className={`p-2 rounded-2 bg-${color} bg-opacity-5`}>
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            {normalRange || (title.includes('Heart') ? 'Normal: 60-120 BPM' : 'Normal: 95-100%')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricCard;