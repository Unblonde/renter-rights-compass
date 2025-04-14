
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileUp, AlertTriangle, Clock } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';
import PropertyCard from '../components/PropertyCard';
import ChatbotWidget from '../components/ChatbotWidget';

const LandlordDashboard = () => {
  // Mock data for example properties
  const properties = [
    {
      id: 'PROP12345',
      address: '15 Oak Street, London, E1 6AA',
      landlord: 'You',
      lastUpdated: '15 March 2025',
      compliance: 'compliant' as const
    },
    {
      id: 'PROP67890',
      address: '42 Maple Avenue, Manchester, M4 1HQ',
      landlord: 'You',
      lastUpdated: '2 April 2025',
      compliance: 'non-compliant' as const
    },
    {
      id: 'PROP24680',
      address: '7 Pine Road, Birmingham, B1 1AB',
      landlord: 'You',
      lastUpdated: '10 February 2025',
      compliance: 'pending' as const
    }
  ];

  // Documents that need attention
  const actionableDocuments = [
    {
      id: 'DOC123',
      property: '42 Maple Avenue, Manchester, M4 1HQ',
      type: 'Gas Safety Certificate',
      status: 'Expired',
      dueDate: '15 April 2025'
    },
    {
      id: 'DOC456',
      property: '7 Pine Road, Birmingham, B1 1AB',
      type: 'Electrical Safety Report',
      status: 'Due soon',
      dueDate: '30 April 2025'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <GovUkHeader serviceName="Rental Rights Compass" />
      
      <div className="bg-govuk-blue py-6">
        <div className="govuk-width-container">
          <div className="flex items-center gap-2 mb-2">
            <GovUkPhaseTag phase="beta" />
            <span className="text-sm text-govuk-white">This is a new service – your <a href="#" className="text-govuk-white underline">feedback</a> will help us improve it.</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-govuk-white">Landlord Dashboard</h1>
        </div>
      </div>
      
      <div className="govuk-width-container py-4">
        <GovUkBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Landlord Dashboard', href: '/landlord' }
          ]} 
        />
      </div>
      
      <main className="flex-grow govuk-width-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="govuk-heading-m mb-0">Your rental properties</h2>
          <GovUkButton href="/landlord/add-property" startIcon>
            <Plus className="h-5 w-5" />
            Add a property
          </GovUkButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              address={property.address}
              landlord={property.landlord}
              lastUpdated={property.lastUpdated}
              compliance={property.compliance}
              userType="landlord"
            />
          ))}
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Documents requiring action</h2>
          
          {actionableDocuments.length > 0 ? (
            <div className="border border-govuk-red bg-white p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-govuk-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Action required</h3>
                  <p>You have {actionableDocuments.length} documents that need your attention to maintain compliance.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {actionableDocuments.map((doc) => (
                  <div key={doc.id} className="border-l-4 border-govuk-red pl-4 py-2">
                    <div className="flex justify-between flex-wrap">
                      <h4 className="font-bold">{doc.type}</h4>
                      <span className="text-govuk-red font-bold">{doc.status}</span>
                    </div>
                    <p className="text-sm">Property: {doc.property}</p>
                    <p className="text-sm">Due by: {doc.dueDate}</p>
                    <div className="mt-2">
                      <GovUkButton href={`/landlord/document/${doc.id}`} variant="warning">
                        Upload document
                      </GovUkButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>You have no documents requiring action at this time.</p>
          )}
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Landlord compliance guide</h2>
          
          <div className="govuk-grid">
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Compliance checklist</h3>
              <p className="mb-4">Use our checklist to ensure you're meeting all legal requirements for your rental properties.</p>
              <Link to="/landlord/compliance-guide" className="govuk-link">View checklist</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Upload documents</h3>
              <p className="mb-4">Upload safety certificates and other required documentation for your properties.</p>
              <Link to="/landlord/documents" className="govuk-link">Manage documents</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Recent changes to legislation</h3>
              <p className="mb-4">Stay updated with the latest rental legislation and how it affects you as a landlord.</p>
              <Link to="/landlord/legislation-updates" className="govuk-link">View updates</Link>
            </div>
          </div>
        </div>
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default LandlordDashboard;
