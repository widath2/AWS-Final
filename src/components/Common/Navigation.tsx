import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: 'fa-tachometer-alt',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
      shadowColor: 'rgba(102, 126, 234, 0.4)'
    },
    { 
      id: 'patients', 
      label: 'Patients', 
      icon: 'fa-users',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb',
      shadowColor: 'rgba(240, 147, 251, 0.4)'
    },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: 'fa-bell',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe',
      shadowColor: 'rgba(79, 172, 254, 0.4)'
    },
    { 
      id: 'test', 
      label: 'MEDISYS Lab', 
      icon: 'fa-flask',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#43e97b',
      shadowColor: 'rgba(67, 233, 123, 0.4)'
    }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-0 position-relative" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 15%, #f093fb 30%, #f5576c 45%, #4facfe 60%, #00f2fe 75%, #43e97b 90%, #38f9d7 100%)',
      backgroundSize: '500% 500%',
      animation: 'gradientFlow 15s ease infinite',
      minHeight: '90px',
      boxShadow: '0 12px 40px rgba(31, 38, 135, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Animated particles background */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }}
      ></div>
      
      {/* Glass morphism overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
        }}
      ></div>
      
      <div className="container-fluid position-relative" style={{ zIndex: 10 }}>
        {/* Brand Section */}
        <a className="navbar-brand d-flex align-items-center py-3" href="#" onClick={(e) => e.preventDefault()}>
          <div 
            className="me-3 d-flex align-items-center justify-content-center position-relative"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
            }}
          >
            <div className="position-relative">
              <i className="fas fa-user-md text-white" style={{
                fontSize: '1.8rem',
                animation: 'floatIcon 3s ease-in-out infinite',
                filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.4))',
                zIndex: 2,
                position: 'relative'
              }}></i>
              <div className="position-absolute top-50 start-50 translate-middle" style={{
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle, rgba(67, 233, 123, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                zIndex: 1
              }}></div>
            </div>
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                animation: 'shine 3s ease infinite'
              }}
            ></div>
          </div>
          <div>
            <span className="fw-bold d-block text-white position-relative" style={{
              fontSize: '2.1rem',
              textShadow: '3px 3px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.1)',
              letterSpacing: '3px',
              fontFamily: "'Poppins', sans-serif",
              background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 50%, #ffffff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
            }}>
              MEDISYS
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'textShine 4s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}></div>
            </span>
            <small className="text-white-75 d-block position-relative" style={{
              fontSize: '0.9rem',
              letterSpacing: '2px',
              marginTop: '-3px',
              fontWeight: '600',
              textTransform: 'uppercase',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)'
            }}>
              <i className="fas fa-shield-virus me-2" style={{
                animation: 'pulse 2s infinite',
                color: '#43e97b'
              }}></i>
              Medical Information System
            </small>
          </div>
        </a>
        
        <button 
          className="navbar-toggler border-0 p-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            {navItems.map((item, index) => (
              <li key={item.id} className="nav-item mx-2">
                <button 
                  className="nav-link btn text-decoration-none border-0 px-4 py-2 fw-bold position-relative"
                  onClick={() => setActiveTab(item.id)}
                  type="button"
                  style={{ 
                    background: activeTab === item.id 
                      ? item.gradient
                      : 'rgba(255,255,255,0.1)',
                    borderRadius: '50px',
                    color: '#ffffff',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    border: activeTab === item.id 
                      ? '2px solid rgba(255,255,255,0.3)' 
                      : '2px solid transparent',
                    boxShadow: activeTab === item.id 
                      ? `0 8px 25px ${item.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.3)` 
                      : '0 4px 15px rgba(0,0,0,0.1)',
                    transform: activeTab === item.id 
                      ? 'translateY(-3px) scale(1.05)' 
                      : 'translateY(0) scale(1)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    minWidth: '120px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'translateY(-2px) scale(1.02)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {/* Active indicator */}
                  {activeTab === item.id && (
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        animation: 'slideShine 2s ease infinite'
                      }}
                    ></div>
                  )}
                  
                  <div className="d-flex align-items-center position-relative" style={{ zIndex: 2 }}>
                    <div 
                      className="me-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '8px',
                        background: activeTab === item.id 
                          ? 'rgba(255,255,255,0.3)' 
                          : 'rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className={`fas ${item.icon} text-white`} style={{
                        fontSize: '12px',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                      }}></i>
                    </div>
                    {item.label}
                  </div>
                  
                  {/* Ripple effect for active */}
                  {activeTab === item.id && (
                    <div 
                      className="position-absolute top-50 start-50 translate-middle rounded-circle"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        animation: 'ripple 2s ease infinite'
                      }}
                    ></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {/* User Profile Section */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle d-flex align-items-center fw-semibold px-4 py-2" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
                onClick={(e) => e.preventDefault()}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                  borderRadius: '50px',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                  fontSize: '1rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div 
                  className="me-3 d-flex align-items-center justify-content-center position-relative"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    animation: 'pulse 3s infinite'
                  }}
                >
                  <i className="fas fa-user-shield text-white" style={{ 
                    fontSize: '16px',
                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))'
                  }}></i>
                  <div className="position-absolute top-0 end-0" style={{
                    width: '12px',
                    height: '12px',
                    background: '#43e97b',
                    borderRadius: '50%',
                    border: '2px solid white',
                    animation: 'pulse 2s infinite'
                  }}></div>
                </div>
                <div className="d-flex flex-column">
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>Dr. Admin</span>
                  <small style={{
                    fontSize: '0.7rem',
                    opacity: '0.8',
                    marginTop: '-2px'
                  }}>Medical Director</small>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '10px',
                marginTop: '10px',
                minWidth: '200px'
              }}>
                <li>
                  <a className="dropdown-item py-3 px-4 rounded-3 mb-1" href="#" onClick={(e) => e.preventDefault()}
                     style={{ transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => e.target.style.background = 'rgba(102, 126, 234, 0.1)'}
                     onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="fas fa-user me-3 text-primary"></i>Profile Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-3 px-4 rounded-3 mb-1" href="#" onClick={(e) => e.preventDefault()}
                     style={{ transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => e.target.style.background = 'rgba(67, 233, 123, 0.1)'}
                     onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="fas fa-cog me-3 text-success"></i>Preferences
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-3 px-4 rounded-3 mb-1" href="#" onClick={(e) => e.preventDefault()}
                     style={{ transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => e.target.style.background = 'rgba(79, 172, 254, 0.1)'}
                     onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="fas fa-bell me-3 text-info"></i>Notifications
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item py-3 px-4 rounded-3 text-danger" href="#" onClick={(e) => e.preventDefault()}
                     style={{ transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => e.target.style.background = 'rgba(245, 87, 108, 0.1)'}
                     onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="fas fa-sign-out-alt me-3"></i>Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;