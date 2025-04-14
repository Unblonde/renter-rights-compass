
import React from 'react';

interface GovUkPhaseTagProps {
  phase: 'alpha' | 'beta' | 'live';
}

const GovUkPhaseTag: React.FC<GovUkPhaseTagProps> = ({ phase }) => {
  const getBackgroundColor = () => {
    switch (phase) {
      case 'alpha':
        return 'bg-govuk-darkgrey';
      case 'beta':
        return 'bg-govuk-blue';
      case 'live':
        return 'bg-govuk-green';
      default:
        return 'bg-govuk-blue';
    }
  };

  return (
    <div className={`inline-block ${getBackgroundColor()} text-govuk-white px-2 py-0.5 text-sm uppercase font-bold`}>
      {phase}
    </div>
  );
};

export default GovUkPhaseTag;
