
import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, MapPin, User, Calendar, Shield, AlertTriangle } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';
import ComplianceItem from '../components/ComplianceItem';
import ChatbotWidget from '../components/ChatbotWidget';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock property data
  const property = {
    id: id || 'PROP12345',
    address: '15 Oak Street, London, E1 6AA',
    landlord: 'John Smith',
    landlordId: 'LL78901',
    registrationDate: '10 January 2024',
    lastInspection: '15 March 2025',
    compliance: 'compliant' as const,
    documents: [
      {
        title: 'Energy Performance Certificate (EPC)',
        status: 'compliant' as const,
        lastUpdated: '15 March 2025',
        dueDate: '15 March 2030',
        description: 'Current energy rating: C'
      },
      {
        title: 'Gas Safety Certificate',
        status: 'compliant' as const,
        lastUpdated: '15 March 2025',
        dueDate: '15 March 2026',
        description: 'Annual inspection completed'
      },
      {
        title: 'Electrical Installation Condition Report',
        status: 'compliant' as const,
        lastUpdated: '10 January 2024',
        dueDate: '10 January 2029',
        description: 'Five-year inspection completed'
      },
      {
        title: 'Legionella Risk Assessment',
        status: 'pending' as const,
        dueDate: '30 April 2025',
        description: 'Assessment due'
      }
    ],
    enforcementActions: [
      {
        date: '5 November 2024',
        type: 'Improvement Notice',
        reason: 'Damp and mold issues in bathroom',
        status: 'Resolved',
        resolution: 'Remedial work completed and verified'
      }
    ]
  };
  
  const getComplianceTag = () => {
    switch (property.compliance) {
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
    <div className="min-h-screen flex flex-col">
      <GovUkHeader serviceName="Rental Rights Compass" />
      
      <div className="bg-govuk-blue py-6">
        <div className="govuk-width-container">
          <div className="flex items-center gap-2 mb-2">
            <GovUkPhaseTag phase="beta" />
            <span className="text-sm text-govuk-white">This is a new service – your <a href="#" className="text-govuk-white underline">feedback</a> will help us improve it.</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-govuk-white">Property Details</h1>
        </div>
      </div>
      
      <div className="govuk-width-container py-4">
        <GovUkBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Renter Dashboard', href: '/renter' },
            { label: 'Property Details', href: `/property/${id}` }
          ]} 
        />
      </div>
      
      <main className="flex-grow govuk-width-container py-6">
        <div className="border-b border-govuk-midgrey pb-6 mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <h2 className="govuk-heading-l mb-0">{property.address}</h2>
            {getComplianceTag()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-govuk-darkgrey" />
                <span>Property ID: {property.id}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-govuk-darkgrey" />
                <span>Landlord: {property.landlord} (ID: {property.landlordId})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-govuk-darkgrey" />
                <span>Registered: {property.registrationDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-govuk-darkgrey" />
                <span>Last inspection: {property.lastInspection}</span>
              </div>
            </div>
            
            <div className="bg-govuk-lightgrey p-4">
              <h3 className="font-bold text-lg mb-3">Report an issue with this property</h3>
              <p className="mb-3">If you believe this property doesn't meet legal requirements or there are safety concerns, you can report it.</p>
              <GovUkButton href="/report-property">Report an issue</GovUkButton>
            </div>
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Compliance Documents</h2>
          
          <div className="space-y-4">
            {property.documents.map((doc, index) => (
              <ComplianceItem
                key={index}
                title={doc.title}
                status={doc.status}
                lastUpdated={doc.lastUpdated}
                dueDate={doc.dueDate}
                description={doc.description}
              />
            ))}
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Enforcement History</h2>
          
          {property.enforcementActions.length > 0 ? (
            <div className="border border-govuk-midgrey">
              <table className="govuk-summary-list w-full">
                <thead className="bg-govuk-lightgrey">
                  <tr>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Reason</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {property.enforcementActions.map((action, index) => (
                    <tr key={index} className="border-t border-govuk-midgrey">
                      <td className="p-4">{action.date}</td>
                      <td className="p-4">{action.type}</td>
                      <td className="p-4">{action.reason}</td>
                      <td className="p-4">
                        <span className="govuk-tag govuk-tag-green">{action.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No enforcement actions have been recorded for this property.</p>
          )}
        </div>
        
        <div className="govuk-section">
          <div className="govuk-warning-text">
            <AlertTriangle className="h-6 w-6 text-govuk-red" />
            <div>
              <h2 className="font-bold text-lg">Reporting unsafe conditions</h2>
              <p>If there are serious health and safety issues that pose an immediate risk, contact your local authority immediately. 
                 For emergency issues like gas leaks, call the National Gas Emergency Service on 0800 111 999.</p>
            </div>
          </div>
        </div>
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default PropertyDetails;
