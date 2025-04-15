
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Sample data - in a real app, this would come from an API or database
const ANSWERS_DATA = [
  {
    id: 'tenant-rights',
    category: 'Renter Rights',
    question: 'What are my basic rights as a tenant?',
    shortAnswer: 'Tenants have the right to a safe, habitable home, privacy, protection from unfair eviction, and proper handling of deposits.',
    fullAnswer: 'As a tenant in the UK, you have several fundamental rights protected by law. These include the right to live in a property that\'s safe and in good repair, the right to have your deposit protected in a government-approved scheme, the right to challenge excessively high charges, protection from unfair eviction and rent increases, the right to live in the property undisturbed, and the right to see the property\'s Energy Performance Certificate. Your landlord must also provide a gas safety certificate, ensure electrical safety, and provide smoke and carbon monoxide alarms.',
    tags: ['rights', 'tenant', 'basics', 'protection']
  },
  {
    id: 'deposit-protection',
    category: 'Deposits and Fees',
    question: 'How does deposit protection work?',
    shortAnswer: 'Landlords must protect tenant deposits in a government-approved scheme within 30 days of receiving it.',
    fullAnswer: 'Landlords must protect deposits using a government-approved tenancy deposit scheme (TDP) within 30 days of receiving it. They must also provide tenants with information about how their deposit is protected, including which scheme was used, how to apply for the deposit\'s return, what to do in case of a dispute, and reasons why deductions might be made. At the end of the tenancy, the deposit must be returned within 10 days of agreeing with the tenant how much will be returned. If there\'s a dispute, the deposit will remain protected in the TDP scheme until the issue is resolved. If a landlord fails to protect a deposit, they may be ordered to repay it to the tenant plus a penalty of up to 3 times the deposit amount.',
    tags: ['deposit', 'protection', 'fees', 'money']
  },
  {
    id: 'repair-responsibilities',
    category: 'Repairs and Maintenance',
    question: 'Who is responsible for repairs in a rental property?',
    shortAnswer: 'Landlords are responsible for structural repairs, utility systems, and appliances they provide, while tenants handle minor maintenance.',
    fullAnswer: 'Landlords are legally responsible for maintaining the structure and exterior of the property, including walls, roof, foundations, drains, guttering and external pipes. They must also ensure that equipment for supplying water, gas, electricity, sanitation, space heating and water heating is kept in working order. This includes repairs to boilers, heaters, pipes, and electrical wiring. Tenants are typically responsible for minor maintenance like changing light bulbs, keeping the property clean, replacing batteries in smoke detectors, and maintaining the garden if specified in the tenancy agreement. Tenants must also repair or pay for any damage they cause beyond normal wear and tear. If a landlord fails to carry out necessary repairs after being notified, tenants can contact their local council\'s environmental health department or, in certain circumstances, arrange for essential repairs to be done and deduct the cost from rent.',
    tags: ['repairs', 'maintenance', 'responsibility', 'landlord']
  },
  {
    id: 'eviction-process',
    category: 'Eviction and Moving Out',
    question: 'What is the legal process for eviction?',
    shortAnswer: 'Landlords must follow specific legal procedures with proper notice periods to evict tenants, or the eviction may be illegal.',
    fullAnswer: 'For a legal eviction, landlords must follow the correct procedure, which typically involves serving a valid notice (Section 21 or Section 8 notice under the Housing Act 1988 for assured shorthold tenancies), applying to the court for a possession order if the tenant doesn\'t leave, and finally obtaining a warrant for possession if needed. The required notice period varies based on the grounds for eviction and current regulations. Section 21 notices require at least 2 months\' notice, while Section 8 notices vary from 2 weeks to 2 months depending on the grounds cited. A landlord cannot legally evict a tenant without a court order. Harassment, changing locks, or forcing a tenant to leave without following the legal process is illegal and may constitute a criminal offense. If you receive an eviction notice, seek advice from Citizens Advice, Shelter, or a housing solicitor to understand your rights and options.',
    tags: ['eviction', 'notice', 'legal', 'court', 'moving']
  },
  {
    id: 'rent-increases',
    category: 'Rent and Payments',
    question: 'How and when can my landlord increase the rent?',
    shortAnswer: 'Rent increases must follow the terms of your tenancy agreement and usually require appropriate notice in writing.',
    fullAnswer: 'For fixed-term tenancies, rent can only be increased during the fixed term if there\'s a rent review clause in the agreement or if the tenant agrees to the increase. For periodic (month-to-month) tenancies, landlords can increase rent once a year without formal agreement. They must provide a minimum of one month\'s notice for tenancies with monthly rent payments (or longer if rent is paid less frequently). The notice must be in writing and specify the new rent amount and when it takes effect. Rent increases should be fair and in line with average local rents. If you believe a rent increase is excessive, you can challenge it through the First-tier Tribunal (Property Chamber) in England or the Rent Assessment Committee in Wales. It\'s illegal for a landlord to increase rent discriminatorily or as retaliation for requesting repairs or making a complaint.',
    tags: ['rent', 'increase', 'payment', 'money']
  }
];

// Related questions for each answer ID
const RELATED_QUESTIONS = {
  'tenant-rights': ['deposit-protection', 'repair-responsibilities'],
  'deposit-protection': ['tenant-rights', 'rent-increases'],
  'repair-responsibilities': ['tenant-rights', 'eviction-process'],
  'eviction-process': ['tenant-rights', 'rent-increases'],
  'rent-increases': ['tenant-rights', 'eviction-process']
};

const AnswerDetail = () => {
  const { id } = useParams<{id: string}>();
  const [answer, setAnswer] = useState<any | null>(null);
  const [relatedAnswers, setRelatedAnswers] = useState<any[]>([]);
  const [hasRated, setHasRated] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the answer data based on the ID
    const foundAnswer = ANSWERS_DATA.find(a => a.id === id);
    setAnswer(foundAnswer || null);
    
    // Get related answers
    if (foundAnswer && RELATED_QUESTIONS[foundAnswer.id as keyof typeof RELATED_QUESTIONS]) {
      const relatedIds = RELATED_QUESTIONS[foundAnswer.id as keyof typeof RELATED_QUESTIONS];
      const related = relatedIds.map(relId => ANSWERS_DATA.find(a => a.id === relId)).filter(Boolean);
      setRelatedAnswers(related);
    } else {
      setRelatedAnswers([]);
    }
    
    // Reset rating state when changing answers
    setHasRated(false);
    setFeedbackOpen(false);
    setFeedbackText('');
  }, [id]);
  
  const handleRating = (helpful: boolean) => {
    setHasRated(true);
    
    toast({
      title: "Thank you for your feedback",
      description: helpful 
        ? "We're glad this answer was helpful!" 
        : "We'll work on improving this answer.",
    });
    
    if (!helpful) {
      setFeedbackOpen(true);
    }
  };
  
  const submitFeedback = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback submitted",
        description: "Thank you for helping us improve our answers.",
      });
      setFeedbackText('');
      setFeedbackOpen(false);
    }
  };
  
  if (!answer) {
    return (
      <div className="min-h-screen flex flex-col">
        <GovUkHeader serviceName="Rental Rights Compass" />
        <main className="flex-grow">
          <div className="govuk-width-container py-8">
            <p>Answer not found.</p>
            <Link to="/information/quick-answers" className="govuk-link">
              Return to Quick Answers
            </Link>
          </div>
        </main>
        <GovUkFooter />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <GovUkHeader serviceName="Rental Rights Compass" />
      
      <main className="flex-grow">
        <div className="govuk-width-container py-8">
          <GovUkBreadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Information', href: '/information' },
              { label: 'Quick Answers', href: '/information/quick-answers' },
              { label: answer.question, href: `/information/quick-answers/${answer.id}` },
            ]} 
          />
          
          <div className="flex items-center gap-2 mt-6 mb-4">
            <Link to="/information/quick-answers" className="inline-flex items-center text-govuk-blue hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to all answers
            </Link>
            <span className="govuk-tag">{answer.category}</span>
          </div>
          
          <h1 className="govuk-heading-xl">{answer.question}</h1>
          
          <div className="govuk-card p-6 mb-8">
            <div className="prose max-w-none">
              <p className="font-bold text-lg">{answer.shortAnswer}</p>
              <p className="mt-4">{answer.fullAnswer}</p>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {answer.tags.map((tag: string) => (
                <span key={tag} className="bg-govuk-lightgrey text-govuk-darkgrey px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Rating system */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-bold text-lg mb-4">Was this answer helpful?</h2>
              
              {!hasRated ? (
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:bg-green-50"
                    onClick={() => handleRating(true)}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    Yes, it was helpful
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:bg-red-50"
                    onClick={() => handleRating(false)}
                  >
                    <ThumbsDown className="h-5 w-5" />
                    No, I need more information
                  </Button>
                </div>
              ) : (
                <p className="text-govuk-darkgrey">Thank you for your feedback!</p>
              )}
              
              {/* Additional feedback form */}
              <Collapsible open={feedbackOpen} onOpenChange={setFeedbackOpen}>
                <CollapsibleContent className="mt-4">
                  <h3 className="font-bold mb-2">How could we improve this answer?</h3>
                  <textarea 
                    className="w-full border-2 border-govuk-midgrey p-2 rounded mb-2 min-h-[100px]"
                    placeholder="Please tell us what information you were looking for..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />
                  <Button onClick={submitFeedback}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit feedback
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          
          {/* Related questions */}
          {relatedAnswers.length > 0 && (
            <div className="mb-8">
              <h2 className="govuk-heading-m mb-4">Related Questions</h2>
              <ul className="space-y-2">
                {relatedAnswers.map(related => (
                  <li key={related.id}>
                    <Link 
                      to={`/information/quick-answers/${related.id}`}
                      className="inline-flex items-baseline text-govuk-blue hover:underline"
                    >
                      <span className="inline-block w-4 h-4 mr-2 rounded-full bg-govuk-blue" />
                      {related.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      
      <GovUkFooter />
    </div>
  );
};

export default AnswerDetail;
