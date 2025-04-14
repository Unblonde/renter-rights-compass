
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface GovUkBreadcrumbsProps {
  items: Breadcrumb[];
}

const GovUkBreadcrumbs: React.FC<GovUkBreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="py-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-govuk-darkgrey" />}
            {index === items.length - 1 ? (
              <span className="text-govuk-darkgrey">{item.label}</span>
            ) : (
              <Link to={item.href} className="govuk-link">{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default GovUkBreadcrumbs;
