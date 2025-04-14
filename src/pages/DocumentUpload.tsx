
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, Check, AlertTriangle, FileText } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkPhaseTag from '../components/GovUkPhaseTag';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import GovUkButton from '../components/GovUkButton';
import ChatbotWidget from '../components/ChatbotWidget';

const DocumentUpload = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Mock document data
  const document = {
    id: id || 'DOC123',
    type: 'Gas Safety Certificate',
    property: '42 Maple Avenue, Manchester, M4 1HQ',
    propertyId: 'PROP67890',
    status: 'Expired',
    dueDate: '15 April 2025',
    requirements: [
      'Must be completed by a Gas Safe registered engineer',
      'Must have been issued within the last 12 months',
      'Must include the engineer's Gas Safe registration number',
      'Must list all gas appliances in the property'
    ]
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1500);
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
          
          <h1 className="text-2xl md:text-3xl font-bold text-govuk-white">Upload Document</h1>
        </div>
      </div>
      
      <div className="govuk-width-container py-4">
        <GovUkBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Landlord Dashboard', href: '/landlord' },
            { label: 'Upload Document', href: `/landlord/document/${id}` }
          ]} 
        />
      </div>
      
      <main className="flex-grow govuk-width-container py-6">
        {uploadSuccess ? (
          <div className="border-4 border-govuk-green p-6 mb-8">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-govuk-green flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-xl mb-2">Document uploaded successfully</h2>
                <p className="mb-4">Your {document.type} for {document.property} has been uploaded and is being reviewed.</p>
                <GovUkButton href="/landlord">Return to dashboard</GovUkButton>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="govuk-heading-m">Upload {document.type}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="govuk-body">Property: {document.property}</p>
                  <p className="govuk-body">Status: <span className="text-govuk-red font-bold">{document.status}</span></p>
                  <p className="govuk-body">Due by: {document.dueDate}</p>
                </div>
                
                <div className="bg-govuk-lightgrey p-4">
                  <h3 className="font-bold mb-2">What is a {document.type}?</h3>
                  <p>A Gas Safety Certificate confirms that all gas appliances, fittings, and flues in a rental property are safe. It must be renewed annually.</p>
                </div>
              </div>
            </div>
            
            <div className="govuk-section">
              <h2 className="govuk-heading-m">Document requirements</h2>
              
              <div className="govuk-warning-text mb-6">
                <AlertTriangle className="h-6 w-6 text-govuk-red" />
                <div>
                  <p>The document must meet all of the following requirements:</p>
                </div>
              </div>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {document.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="govuk-section">
              <h2 className="govuk-heading-m">Upload your document</h2>
              
              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="govuk-form-group">
                  <label htmlFor="document-upload" className="govuk-label">Upload file</label>
                  <div className="govuk-hint">Files must be JPG, PNG or PDF, and no larger than 5MB</div>
                  
                  <div className="border-2 border-dashed border-govuk-midgrey p-6 text-center">
                    <Upload className="h-8 w-8 text-govuk-darkgrey mx-auto mb-2" />
                    <p className="mb-4">Drag and drop a file here or</p>
                    <div>
                      <label className="bg-govuk-blue text-govuk-white py-2 px-4 rounded cursor-pointer hover:bg-govuk-darkblue">
                        Choose file
                        <input 
                          id="document-upload" 
                          type="file" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {selectedFile && (
                      <div className="mt-4 flex items-center gap-2 justify-center">
                        <FileText className="h-5 w-5 text-govuk-blue" />
                        <span>{selectedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="govuk-form-group">
                  <label htmlFor="issue-date" className="govuk-label">Date issued</label>
                  <div className="govuk-hint">For example, 15 3 2025</div>
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="day" className="govuk-label text-sm">Day</label>
                      <input id="day" name="day" type="text" className="govuk-input w-16" />
                    </div>
                    <div>
                      <label htmlFor="month" className="govuk-label text-sm">Month</label>
                      <input id="month" name="month" type="text" className="govuk-input w-16" />
                    </div>
                    <div>
                      <label htmlFor="year" className="govuk-label text-sm">Year</label>
                      <input id="year" name="year" type="text" className="govuk-input w-24" />
                    </div>
                  </div>
                </div>
                
                <div className="govuk-form-group">
                  <label htmlFor="expiry-date" className="govuk-label">Expiry date</label>
                  <div className="govuk-hint">For example, 15 3 2026</div>
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="expiry-day" className="govuk-label text-sm">Day</label>
                      <input id="expiry-day" name="expiry-day" type="text" className="govuk-input w-16" />
                    </div>
                    <div>
                      <label htmlFor="expiry-month" className="govuk-label text-sm">Month</label>
                      <input id="expiry-month" name="expiry-month" type="text" className="govuk-input w-16" />
                    </div>
                    <div>
                      <label htmlFor="expiry-year" className="govuk-label text-sm">Year</label>
                      <input id="expiry-year" name="expiry-year" type="text" className="govuk-input w-24" />
                    </div>
                  </div>
                </div>
                
                <div className="govuk-form-group">
                  <label htmlFor="reference" className="govuk-label">Reference number</label>
                  <div className="govuk-hint">For example, the engineer's Gas Safe registration number</div>
                  <input id="reference" name="reference" type="text" className="govuk-input" />
                </div>
                
                <div className="mt-6">
                  <GovUkButton type="submit" disabled={!selectedFile || isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload document'}
                  </GovUkButton>
                </div>
              </form>
            </div>
          </>
        )}
      </main>
      
      <GovUkFooter />
      <ChatbotWidget />
    </div>
  );
};

export default DocumentUpload;
