
import React from 'react';
import { Link } from 'react-router-dom';

const GovUkFooter: React.FC = () => {
  return (
    <footer className="bg-govuk-lightgrey pt-10 pb-8 border-t-2 border-govuk-blue">
      <div className="govuk-width-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="govuk-link">Help</Link></li>
              <li><Link to="#" className="govuk-link">Cookies</Link></li>
              <li><Link to="#" className="govuk-link">Contact</Link></li>
              <li><Link to="#" className="govuk-link">Accessibility statement</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Related services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="govuk-link">Renting a home</a></li>
              <li><a href="#" className="govuk-link">Housing benefits</a></li>
              <li><a href="#" className="govuk-link">Landlord responsibilities</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal information</h3>
            <ul className="space-y-3">
              <li><a href="#" className="govuk-link">Privacy</a></li>
              <li><a href="#" className="govuk-link">Terms and conditions</a></li>
              <li><a href="#" className="govuk-link">Licensing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-sm text-govuk-darkgrey mt-10">
          <p>© Crown copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default GovUkFooter;
