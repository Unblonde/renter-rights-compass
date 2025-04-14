
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Search, HelpCircle } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';

const Information = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GovUkHeader serviceName="Rental Rights Compass" />
      
      <main className="flex-grow">
        <div className="govuk-width-container py-8">
          <GovUkBreadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Information', href: '/information' },
            ]} 
          />
          
          <h1 className="govuk-heading-xl mt-6">Information and Resources</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="govuk-card">
              <h2 className="govuk-heading-m">Quick Answers</h2>
              <p className="mb-4">Find quick answers to common questions about rental rights, landlord responsibilities, and housing standards.</p>
              <div className="flex">
                <GovUkButton as={Link} to="/information/quick-answers">
                  <Search className="mr-2 h-4 w-4" />
                  Browse answers
                </GovUkButton>
              </div>
            </div>
            
            <div className="govuk-card">
              <h2 className="govuk-heading-m">Policy Documents</h2>
              <p className="mb-4">Access the full policy documents, regulations, and official guidance on the rental protection policy.</p>
              <div className="flex">
                <GovUkButton variant="secondary">
                  <Info className="mr-2 h-4 w-4" />
                  View documents
                </GovUkButton>
              </div>
            </div>
            
            <div className="govuk-card">
              <h2 className="govuk-heading-m">Video Guides</h2>
              <p className="mb-4">Watch video guides explaining different aspects of the rental protection policy and how it affects you.</p>
              <div className="flex">
                <GovUkButton variant="secondary">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Watch videos
                </GovUkButton>
              </div>
            </div>
            
            <div className="govuk-card">
              <h2 className="govuk-heading-m">Get Help</h2>
              <p className="mb-4">Contact advisors or find local support services to help with your specific rental situation.</p>
              <div className="flex">
                <GovUkButton variant="secondary">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get support
                </GovUkButton>
              </div>
            </div>
          </div>
          
          <section className="bg-govuk-lightgrey p-6 mb-8">
            <h2 className="govuk-heading-m">About the Rental Protection Policy</h2>
            <p className="govuk-body">
              The Rental Protection Policy aims to improve housing standards and protect both renters and responsible landlords. 
              It establishes clear requirements for rental properties, ensures transparent communication, and provides mechanisms 
              for enforcement when standards are not met.
            </p>
            <p className="govuk-body">
              This information section provides resources to help you understand your rights and responsibilities 
              under the policy, whether you're a renter, landlord, or from a local authority.
            </p>
          </section>
        </div>
      </main>
      
      <GovUkFooter />
    </div>
  );
};

export default Information;
