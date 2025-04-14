
import React from 'react';
import { Building, User, Calendar, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  address: string;
  landlord: string;
  lastUpdated: string;
  compliance: 'compliant' | 'non-compliant' | 'pending';
  userType: 'renter' | 'landlord' | 'authority';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  address,
  landlord,
  lastUpdated,
  compliance,
  userType
}) => {
  const getComplianceTag = () => {
    switch (compliance) {
      case 'compliant':
        return <span className="govuk-tag govuk-tag-green">Compliant</span>;
      case 'non-compliant':
        return <span className="govuk-tag govuk-tag-red">Non-compliant</span>;
      case 'pending':
        return <span className="govuk-tag bg-govuk-darkgrey">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="govuk-card">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-lg truncate">{address}</h3>
        {getComplianceTag()}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-govuk-darkgrey" />
          <span>Property ID: {id}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-govuk-darkgrey" />
          <span>Landlord: {landlord}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-govuk-darkgrey" />
          <span>Last updated: {lastUpdated}</span>
        </div>
        
        {userType === 'landlord' && compliance !== 'compliant' && (
          <div className="flex items-center gap-2 text-govuk-red">
            <FileCheck className="h-4 w-4" />
            <span>Action required</span>
          </div>
        )}
      </div>
      
      <Link to={`/property/${id}`} className="govuk-button inline-block text-center w-full">
        {userType === 'renter' ? 'View property details' : 
         userType === 'landlord' ? 'Manage property' : 'Review property'}
      </Link>
    </div>
  );
};

export default PropertyCard;
