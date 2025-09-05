import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  subtitle,
  trend,
  onClick,
  className = ''
}) => {
  const cardClasses = `card bg-${color} text-white h-100 ${onClick ? 'cursor-pointer' : ''} ${className}`;

  const handleClick = () => {
    if (onClick) onClick();
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val || 0;
  };

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
    <div 
      className={`card shadow-lg border-0 h-100 ${onClick ? 'cursor-pointer hover-lift' : ''} ${className}`}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        background: getGradientStyle(color),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg) translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        }
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center">
          <div className="me-3 p-3 rounded-circle bg-white bg-opacity-20 backdrop-blur">
            <i className={`${icon} fa-2x text-white`} aria-hidden="true"></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="card-title mb-1 text-white-50 fw-semibold small text-uppercase">{title}</h6>
            <h2 className="mb-1 fw-bold text-white">{formatValue(value)}</h2>
            {subtitle && (
              <small className="text-white-50 d-block">{subtitle}</small>
            )}
            {trend && (
              <small className={`d-block mt-1 text-white`}>
                <i className={`fas ${trend > 0 ? 'fa-arrow-up' : 'fa-arrow-down'} me-1`}></i>
                {Math.abs(trend)}% from yesterday
              </small>
            )}
          </div>
        </div>
      </div>
      {onClick && (
        <div className="card-footer bg-white bg-opacity-10 border-0 py-3">
          <small className="text-white fw-semibold">
            <i className="fas fa-arrow-right me-1"></i>
            View Details
          </small>
        </div>
      )}
    </div>
  );
};

export default StatCard;