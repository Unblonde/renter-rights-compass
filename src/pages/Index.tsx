
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Building, Shield, Award } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkButton from '../components/GovUkButton';
import ChatbotWidget from '../components/ChatbotWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GovUkHeader serviceName="Rental Rights Compass" />
      
      <div className="bg-govuk-blue text-govuk-white py-8">
        <div className="govuk-width-container">
          <div className="flex items-center gap-2 mb-4">
            <GovUkPhaseTag phase="beta" />
            <span className="text-sm">This is a new service – your <a href="#" className="text-govuk-white underline">feedback</a> will help us improve it.</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Rental Rights Compass</h1>
          <p className="text-xl mb-6">Supporting renters, landlords, and local authorities under the new rental protection policy</p>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="govuk-width-container py-8">
          <section className="govuk-section">
            <h2 className="govuk-heading-l">Who are you?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="govuk-card">
                <h3 className="govuk-heading-m">I'm a Renter</h3>
                <p className="mb-4">Check if your property meets legal requirements, view landlord compliance records, and understand your rights.</p>
                <GovUkButton href="/renter" startIcon>
                  Start now
                </GovUkButton>
              </div>
              
              <div className="govuk-card">
                <h3 className="govuk-heading-m">I'm a Landlord</h3>
                <p className="mb-4">Manage your rental properties, upload compliance documents, and ensure you meet your legal obligations.</p>
                <GovUkButton href="/landlord" startIcon>
                  Start now
                </GovUkButton>
              </div>
              
              <div className="govuk-card">
                <h3 className="govuk-heading-m">I'm from a Local Authority</h3>
                <p className="mb-4">Monitor property compliance, issue enforcement notices, and manage rental standards in your area.</p>
                <GovUkButton href="/authority" startIcon>
                  Start now
                </GovUkButton>
              </div>
              
              <div className="govuk-card">
                <h3 className="govuk-heading-m">I just want information</h3>
                <p className="mb-4">Learn about the rental protection policy, legal requirements, and how it affects renters and landlords.</p>
                <GovUkButton href="/information" startIcon>
                  Find out more
                </GovUkButton>
              </div>
            </div>
          </section>
          
          <section className="govuk-section">
            <h2 className="govuk-heading-l">Key features of the rental protection policy</h2>
            
            <div className="govuk-grid">
              <div className="flex flex-col items-center text-center p-6 govuk-card">
                <FileText className="h-12 w-12 text-govuk-blue mb-4" />
                <h3 className="font-bold text-xl mb-2">Clear compliance requirements</h3>
                <p>Straightforward guidance on legal obligations for landlords and rights for renters</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 govuk-card">
                <Building className="h-12 w-12 text-govuk-blue mb-4" />
                <h3 className="font-bold text-xl mb-2">Property lookup tool</h3>
                <p>Easily check compliance history and status of any registered rental property</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 govuk-card">
                <Shield className="h-12 w-12 text-govuk-blue mb-4" />
                <h3 className="font-bold text-xl mb-2">Enhanced protection</h3>
                <p>Better security for renters and clear guidelines for responsible landlords</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 govuk-card">
                <Award className="h-12 w-12 text-govuk-blue mb-4" />
                <h3 className="font-bold text-xl mb-2">Transparent standards</h3>
                <p>Open records of property compliance and enforcement actions</p>
              </div>
            </div>
          </section>
          
          <section className="govuk-section">
            <div className="bg-govuk-lightgrey p-6">
              <h2 className="govuk-heading-m">How the rental protection policy ensures safer housing</h2>
              
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <div className="bg-govuk-midgrey flex items-center justify-center">
                  <p className="text-govuk-white">[Video: Rental Protection Policy Explained]</p>
                </div>
              </div>
              
              <p className="govuk-body">This video explains how the new rental protection policy helps ensure safer, fairer housing for all. It outlines the responsibilities of landlords, the rights of renters, and how local authorities enforce the standards.</p>
              
              <p className="govuk-body">Find out more about how to meet your obligations as a landlord or understand your rights as a renter.</p>
              
              <GovUkButton href="/information">Watch the full video</GovUkButton>
            </div>
          </section>
          
          <section className="govuk-section">
            <h2 className="govuk-heading-l">What users say about this service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="govuk-inset-text">
                <p className="italic mb-2">"As a landlord, this service made it much clearer what I need to provide and by when. The document upload process is straightforward and I can track my compliance easily."</p>
                <footer className="text-govuk-darkgrey">— Sarah, landlord in Manchester</footer>
              </blockquote>
              
              <blockquote className="govuk-inset-text">
                <p className="italic mb-2">"Before moving into a new flat, I checked its compliance history. I was able to see all the safety certificates and that gave me confidence in my new landlord."</p>
                <footer className="text-govuk-darkgrey">— Raj, renter in Birmingham</footer>
              </blockquote>
              
              <blockquote className="govuk-inset-text">
                <p className="italic mb-2">"This portal has transformed how we monitor rental properties in our borough. We can now quickly identify non-compliant properties and take appropriate action."</p>
                <footer className="text-govuk-darkgrey">— Lisa, housing officer in London</footer>
              </blockquote>
            </div>
          </section>
        </div>
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
