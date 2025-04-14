
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle, FileText, Building } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';
import PropertyCard from '../components/PropertyCard';
import ChatbotWidget from '../components/ChatbotWidget';

const AuthorityDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for non-compliant properties
  const nonCompliantProperties = [
    {
      id: 'PROP67890',
      address: '42 Maple Avenue, Manchester, M4 1HQ',
      landlord: 'Sarah Johnson',
      lastUpdated: '2 April 2025',
      compliance: 'non-compliant' as const
    },
    {
      id: 'PROP13579',
      address: '8 Birch Close, Manchester, M20 3JL',
      landlord: 'Robert Wilson',
      lastUpdated: '10 March 2025',
      compliance: 'non-compliant' as const
    }
  ];
  
  // Mock data for recent reports
  const recentReports = [
    {
      id: 'REP4567',
      date: '12 April 2025',
      property: '42 Maple Avenue, Manchester, M4 1HQ',
      issue: 'Missing gas safety certificate',
      status: 'New'
    },
    {
      id: 'REP7890',
      date: '8 April 2025',
      property: '8 Birch Close, Manchester, M20 3JL',
      issue: 'Electrical safety concerns',
      status: 'In progress'
    },
    {
      id: 'REP1234',
      date: '5 April 2025',
      property: '15 Oak Street, London, E1 6AA',
      issue: 'Damp and mold',
      status: 'Resolved'
    }
  ];
  
  // Compliance statistics
  const stats = {
    total: 248,
    compliant: 198,
    nonCompliant: 32,
    pending: 18,
    percentageCompliant: 80
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
          
          <h1 className="text-2xl md:text-3xl font-bold text-govuk-white">Local Authority Dashboard</h1>
        </div>
      </div>
      
      <div className="govuk-width-container py-4">
        <GovUkBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Authority Dashboard', href: '/authority' }
          ]} 
        />
      </div>
      
      <main className="flex-grow govuk-width-container py-6">
        <div className="mb-8">
          <h2 className="govuk-heading-m">Search for properties</h2>
          
          <form className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="property-search" className="govuk-label">Property or landlord search</label>
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
          <h2 className="govuk-heading-m">Compliance overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-govuk-lightgrey p-4 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p>Total properties</p>
            </div>
            
            <div className="bg-govuk-green bg-opacity-10 p-4 text-center">
              <p className="text-3xl font-bold text-govuk-green">{stats.compliant}</p>
              <p>Compliant</p>
            </div>
            
            <div className="bg-govuk-red bg-opacity-10 p-4 text-center">
              <p className="text-3xl font-bold text-govuk-red">{stats.nonCompliant}</p>
              <p>Non-compliant</p>
            </div>
            
            <div className="bg-govuk-darkgrey bg-opacity-10 p-4 text-center">
              <p className="text-3xl font-bold text-govuk-darkgrey">{stats.pending}</p>
              <p>Pending review</p>
            </div>
          </div>
          
          <div className="bg-govuk-lightgrey p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold">Overall compliance rate</p>
              <p className="font-bold">{stats.percentageCompliant}%</p>
            </div>
            <div className="w-full bg-govuk-midgrey rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${stats.percentageCompliant >= 70 ? 'bg-govuk-green' : 'bg-govuk-red'}`}
                style={{ width: `${stats.percentageCompliant}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Properties requiring attention</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {nonCompliantProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                address={property.address}
                landlord={property.landlord}
                lastUpdated={property.lastUpdated}
                compliance={property.compliance}
                userType="authority"
              />
            ))}
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Recent reports</h2>
          
          <div className="border border-govuk-midgrey overflow-x-auto">
            <table className="w-full">
              <thead className="bg-govuk-lightgrey">
                <tr>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Property</th>
                  <th className="p-4 text-left">Issue</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-t border-govuk-midgrey">
                    <td className="p-4">{report.date}</td>
                    <td className="p-4">{report.property}</td>
                    <td className="p-4">{report.issue}</td>
                    <td className="p-4">
                      <span className={`govuk-tag ${
                        report.status === 'New' 
                          ? 'govuk-tag-red' 
                          : report.status === 'Resolved' 
                            ? 'govuk-tag-green' 
                            : 'bg-govuk-blue'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link to={`/authority/report/${report.id}`} className="govuk-link">
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="govuk-section">
          <h2 className="govuk-heading-m">Quick actions</h2>
          
          <div className="govuk-grid">
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Issue enforcement notice</h3>
              <p className="mb-4">Create and send an enforcement notice to a non-compliant landlord.</p>
              <Link to="/authority/enforcement/new" className="govuk-link">Create notice</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Schedule inspections</h3>
              <p className="mb-4">Plan and manage property inspections for your local area.</p>
              <Link to="/authority/inspections" className="govuk-link">View calendar</Link>
            </div>
            
            <div className="govuk-card">
              <h3 className="font-bold text-lg mb-2">Compliance reports</h3>
              <p className="mb-4">Generate detailed reports on property compliance in your area.</p>
              <Link to="/authority/reports" className="govuk-link">Generate reports</Link>
            </div>
          </div>
        </div>
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default AuthorityDashboard;
