
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown, ArrowUpRight, Book } from 'lucide-react';
import GovUkHeader from '../components/GovUkHeader';
import GovUkFooter from '../components/GovUkFooter';
import GovUkBreadcrumbs from '../components/GovUkBreadcrumbs';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Sample data for the quick answers
const ANSWERS_DATA = [
  {
    id: 'tenant-rights',
    category: 'Renter Rights',
    question: 'What are my basic rights as a tenant?',
    shortAnswer: 'Tenants have the right to a safe, habitable home, privacy, protection from unfair eviction, and proper handling of deposits.',
    fullAnswer: 'As a tenant in the UK, you have several fundamental rights protected by law. These include the right to live in a property that's safe and in good repair, the right to have your deposit protected in a government-approved scheme, the right to challenge excessively high charges, protection from unfair eviction and rent increases, the right to live in the property undisturbed, and the right to see the property's Energy Performance Certificate. Your landlord must also provide a gas safety certificate, ensure electrical safety, and provide smoke and carbon monoxide alarms.',
    tags: ['rights', 'tenant', 'basics', 'protection']
  },
  {
    id: 'deposit-protection',
    category: 'Deposits and Fees',
    question: 'How does deposit protection work?',
    shortAnswer: 'Landlords must protect tenant deposits in a government-approved scheme within 30 days of receiving it.',
    fullAnswer: 'Landlords must protect deposits using a government-approved tenancy deposit scheme (TDP) within 30 days of receiving it. They must also provide tenants with information about how their deposit is protected, including which scheme was used, how to apply for the deposit's return, what to do in case of a dispute, and reasons why deductions might be made. At the end of the tenancy, the deposit must be returned within 10 days of agreeing with the tenant how much will be returned. If there's a dispute, the deposit will remain protected in the TDP scheme until the issue is resolved. If a landlord fails to protect a deposit, they may be ordered to repay it to the tenant plus a penalty of up to 3 times the deposit amount.',
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

// Hierarchical structure for browsing
const CATEGORIES = [
  {
    id: 'renter-rights',
    title: 'Renter Rights',
    subcategories: [
      { id: 'basic-rights', title: 'Basic Rights', answerIds: ['tenant-rights'] },
      { id: 'privacy', title: 'Privacy and Access', answerIds: [] },
      { id: 'discrimination', title: 'Discrimination and Equality', answerIds: [] }
    ]
  },
  {
    id: 'landlord-obligations',
    title: 'Landlord Obligations',
    subcategories: [
      { id: 'safety-standards', title: 'Safety Standards', answerIds: [] },
      { id: 'repairs', title: 'Repairs and Maintenance', answerIds: ['repair-responsibilities'] },
      { id: 'documentation', title: 'Required Documentation', answerIds: [] }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Matters',
    subcategories: [
      { id: 'deposits', title: 'Deposits and Protection', answerIds: ['deposit-protection'] },
      { id: 'fees', title: 'Permitted and Prohibited Fees', answerIds: [] },
      { id: 'rent', title: 'Rent and Increases', answerIds: ['rent-increases'] }
    ]
  },
  {
    id: 'tenancy',
    title: 'Tenancy Agreements',
    subcategories: [
      { id: 'types', title: 'Types of Tenancies', answerIds: [] },
      { id: 'terms', title: 'Contract Terms and Conditions', answerIds: [] },
      { id: 'ending', title: 'Ending a Tenancy', answerIds: ['eviction-process'] }
    ]
  }
];

const QuickAnswers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [openCommandMenu, setOpenCommandMenu] = useState(false);
  const [topAnswer, setTopAnswer] = useState<any | null>(ANSWERS_DATA[0]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = ANSWERS_DATA.filter(answer => 
      answer.question.toLowerCase().includes(query) || 
      answer.shortAnswer.toLowerCase().includes(query) ||
      answer.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setSearchResults(results);
    
    // Update top answer if we have results
    if (results.length > 0) {
      setTopAnswer(results[0]);
    }
  }, [searchQuery]);

  const getAnswersForCategory = (categoryId: string, subcategoryId: string) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    if (!subcategory) return [];
    
    return subcategory.answerIds.map(id => ANSWERS_DATA.find(answer => answer.id === id)).filter(Boolean);
  };

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
            ]} 
          />
          
          <h1 className="govuk-heading-xl mt-6">Quick Answers</h1>
          
          {/* Search box */}
          <div className="mb-8">
            <div className="relative">
              <Popover open={openCommandMenu && searchResults.length > 0} onOpenChange={setOpenCommandMenu}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-govuk-darkgrey" />
                    <Input
                      className="pl-10 bg-white pr-4 py-6 text-lg border-2 focus-visible:ring-govuk-yellow"
                      placeholder="Search for answers..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setOpenCommandMenu(e.target.value !== '');
                      }}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[calc(100vw-2rem)] sm:w-[550px]" align="start">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Results">
                        {searchResults.map((answer) => (
                          <CommandItem 
                            key={answer.id}
                            onSelect={() => {
                              setSearchQuery('');
                              setOpenCommandMenu(false);
                              // In a real app, navigate to answer
                            }}
                            className="cursor-pointer"
                          >
                            <Link 
                              to={`/information/quick-answers/${answer.id}`}
                              className="flex items-center w-full"
                            >
                              <Book className="mr-2 h-4 w-4 shrink-0" />
                              <span className="truncate">{answer.question}</span>
                            </Link>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Top Answer Card */}
          {topAnswer && (
            <Card className="mb-8 border-2 border-govuk-blue">
              <CardHeader>
                <CardTitle className="text-govuk-blue">Top Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-xl mb-2">{topAnswer.question}</h3>
                <p className="mb-4">{topAnswer.shortAnswer}</p>
                <Link 
                  to={`/information/quick-answers/${topAnswer.id}`}
                  className="inline-flex items-center text-govuk-blue hover:underline font-bold"
                >
                  Read more
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )}
          
          {/* Browsing Hierarchy */}
          <h2 className="govuk-heading-l mb-4">Browse Categories</h2>
          
          <Accordion type="multiple" className="mb-8">
            {CATEGORIES.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border-b border-govuk-midgrey">
                <AccordionTrigger className="font-bold py-4 hover:no-underline hover:bg-govuk-lightgrey">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 py-2">
                    {category.subcategories.map((subcategory) => {
                      const answers = getAnswersForCategory(category.id, subcategory.id);
                      return (
                        <div key={subcategory.id} className="mb-4">
                          <h4 className="font-semibold text-lg mb-2">{subcategory.title}</h4>
                          {answers.length > 0 ? (
                            <ul className="pl-4">
                              {answers.map((answer) => (
                                <li key={answer?.id} className="mb-2">
                                  <Link 
                                    to={`/information/quick-answers/${answer?.id}`}
                                    className="inline-flex items-center text-govuk-blue hover:underline"
                                  >
                                    <ChevronRight className="mr-1 h-4 w-4" />
                                    {answer?.question}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-govuk-darkgrey italic pl-4">No answers in this category yet.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {/* All Questions Section */}
          <h2 className="govuk-heading-l mb-4">All Questions</h2>
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {ANSWERS_DATA.map(answer => (
              <li key={answer.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <span className="text-sm text-govuk-darkgrey mb-1 block">{answer.category}</span>
                    <h3 className="font-bold text-lg mb-2">{answer.question}</h3>
                    <p className="mb-3 line-clamp-2">{answer.shortAnswer}</p>
                    <Link 
                      to={`/information/quick-answers/${answer.id}`}
                      className="inline-flex items-center text-govuk-blue hover:underline font-bold"
                    >
                      Read answer
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </main>
      
      <GovUkFooter />
    </div>
  );
};

export default QuickAnswers;
