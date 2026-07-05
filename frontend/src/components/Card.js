import React from 'react';
import './Card.css';

const Card = ({ title, subtitle, children, footer, onClick, className = '' }) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <div className="card-header">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
