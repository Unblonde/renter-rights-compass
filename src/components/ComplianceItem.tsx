
import React from 'react';
import { FileCheck, AlertTriangle, Clock } from 'lucide-react';

interface ComplianceItemProps {
  title: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  dueDate?: string;
  lastUpdated?: string;
  description: string;
}

const ComplianceItem: React.FC<ComplianceItemProps> = ({
  title,
  status,
  dueDate,
  lastUpdated,
  description
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'compliant':
        return <FileCheck className="h-6 w-6 text-govuk-green" />;
      case 'non-compliant':
        return <AlertTriangle className="h-6 w-6 text-govuk-red" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-govuk-darkgrey" />;
      default:
        return null;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'compliant':
        return 'border-govuk-green';
      case 'non-compliant':
        return 'border-govuk-red';
      case 'pending':
        return 'border-govuk-darkgrey';
      default:
        return '';
    }
  };

  return (
    <div className={`border-l-4 ${getStatusClass()} pl-4 py-3 mb-4`}>
      <div className="flex items-start gap-3">
        {getStatusIcon()}
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-govuk-darkgrey mb-2">{description}</p>
          
          {status === 'compliant' && lastUpdated && (
            <p className="text-sm text-govuk-darkgrey">Last updated: {lastUpdated}</p>
          )}
          
          {status === 'non-compliant' && dueDate && (
            <p className="text-sm text-govuk-red font-bold">Due by: {dueDate}</p>
          )}
          
          {status === 'pending' && dueDate && (
            <p className="text-sm text-govuk-darkgrey">Due by: {dueDate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceItem;
