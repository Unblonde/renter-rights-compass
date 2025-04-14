
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GovUkButtonProps {
  children: React.ReactNode;
  startIcon?: boolean;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'warning';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const GovUkButton: React.FC<GovUkButtonProps> = ({
  children,
  startIcon = false,
  onClick,
  href,
  variant = 'primary',
  disabled = false,
  type = 'button'
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-govuk-yellow';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-govuk-green text-govuk-white hover:bg-govuk-darkblue`;
      case 'secondary':
        return `${baseClasses} bg-govuk-lightgrey text-govuk-black border-2 border-govuk-black hover:bg-govuk-midgrey`;
      case 'warning':
        return `${baseClasses} bg-govuk-red text-govuk-white hover:bg-govuk-darkgrey`;
      default:
        return `${baseClasses} bg-govuk-green text-govuk-white hover:bg-govuk-darkblue`;
    }
  };

  const buttonClasses = `${getButtonClasses()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  if (href) {
    return (
      <Link 
        to={href} 
        className={`${buttonClasses} inline-block no-underline ${startIcon ? 'flex items-center gap-2' : ''}`}
        onClick={onClick}
      >
        {children}
        {startIcon && <ArrowRight className="h-5 w-5" />}
      </Link>
    );
  }
  
  return (
    <button 
      className={`${buttonClasses} ${startIcon ? 'flex items-center gap-2' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {startIcon && <ArrowRight className="h-5 w-5" />}
    </button>
  );
};

export default GovUkButton;
