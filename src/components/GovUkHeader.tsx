
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

interface GovUkHeaderProps {
  serviceName: string;
}

const GovUkHeader: React.FC<GovUkHeaderProps> = ({ serviceName }) => {
  return (
    <header className="govuk-header">
      <div className="govuk-width-container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6" />
          <Link to="/" className="text-govuk-white font-bold no-underline">GOV.UK</Link>
        </div>
        <div className="hidden md:block font-bold">{serviceName}</div>
      </div>
    </header>
  );
};

export default GovUkHeader;
