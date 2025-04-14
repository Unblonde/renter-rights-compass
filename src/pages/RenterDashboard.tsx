
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, AlertTriangle, Info } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';
import PropertyCard from '../components/PropertyCard';
import ChatbotWidget from '../components/ChatbotWidget';

const RenterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for example properties
  const exampleProperties = [
    {
      id: 'PROP12345',
      address: '15 Oak Street, London, E1 6AA',
      landlord: 'John Smith',
      lastUpdated: '15 March 2025',
      compliance: 'compliant' as const
    },
    {
      id: 'PROP67890',
      address: '42 Maple Avenue, Manchester, M4 1HQ',
      landlord: 'Sarah Johnson',
      lastUpdated: '2 April 2025',
      compliance: 'non-compliant' as const
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
          
          <h1 className="text-2xl md:text-3xl font-bold text-govuk-white">Renter Dashboard</h1>
        </div>
      </div>
      
      <div className="govuk-width-container py-4">
        <GovUkBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Renter Dashboard', href: '/renter' }
          ]} 
        />
      </div>
      
      <main className="flex-grow govuk-width-container py-6">
        <div className="mb-8">
          <h2 className="govuk-heading-m">Find a rental property</h2>
          <p className="govuk-body">Search for a property by postcode, address or landlord name to view its compliance status.</p>
          
          <form className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="property-search" className="govuk-label">Property search</label>
              <div className="flex">
                <input
                  id="property-search"
                  type="text"
                  className="govuk-input flex-grow"
                  placeholder="Enter postcode, address or landlord name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-govuk-blue text-govuk-white p-2 border-2 border-govuk-black border-l-0" type="submit">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
            
            <div className="md:self-end">
              <GovUkButton type="submit">Search</GovUkButton>
            </div>
          </form>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Your saved properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {exampleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                address={property.address}
                landlord={property.landlord}
                lastUpdated={property.lastUpdated}
                compliance={property.compliance}
                userType="renter"
              />
            ))}
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Know your rights</h2>
          
          <div className="govuk-grid">
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Essential safety requirements</h3>
              <p className="mb-4">Learn about the safety certificates and standards your landlord must provide by law.</p>
              <Link to="/renter/safety-guide" className="govuk-link">Read the safety guide</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Report a non-compliant property</h3>
              <p className="mb-4">If your property doesn't meet legal requirements, you can report it to your local authority.</p>
              <Link to="/renter/report" className="govuk-link">How to report issues</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Rental deposit protection</h3>
              <p className="mb-4">Your deposit must be protected in a government-approved scheme. Check if yours is protected.</p>
              <Link to="/renter/deposit-guide" className="govuk-link">Deposit protection guide</Link>
            </div>
          </div>
        </div>
        
        <div className="govuk-section">
          <div className="govuk-warning-text">
            <AlertTriangle className="h-6 w-6 text-govuk-red" />
            <div>
              <h2 className="font-bold text-lg">If your property is unsafe</h2>
              <p>If there are serious health and safety issues that pose an immediate risk, contact your local authority immediately.</p>
            </div>
          </div>
        </div>
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default RenterDashboard;
