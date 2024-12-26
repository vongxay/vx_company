import { cn } from "../../lib/utils";
import PropTypes from 'prop-types';


const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

Pagination.propTypes = {
  className: PropTypes.string
};

const PaginationContent = ({ className, ...props }) => (
  <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
);

PaginationContent.propTypes = {
  className: PropTypes.string
};

const PaginationItem = ({ className, ...props }) => (
  <li className={cn("", className)} {...props} />
);

PaginationItem.propTypes = {
  className: PropTypes.string
};

const PaginationLink = ({
  className,
  isActive,
  ...props
}) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      isActive && "bg-accent text-accent-foreground pointer-events-none",
      className
    )}
    {...props}
  />
);

PaginationLink.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool
};

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={className}
    style={{
      minHeight: '48px',
      minWidth: '120px',
      padding: '12px 24px',
      fontSize: '18px',
      fontWeight: '600',
      backgroundColor: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    }}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: '24px',
        height: '24px'
      }}
    >
      <path d="m15 18-6-6 6-6"/>
    </svg>
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.propTypes = {
  className: PropTypes.string
};

const PaginationNext = ({
  className,
  ...props
}) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#f9fafb';
    e.currentTarget.style.borderColor = '#d1d5db';
    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.style.borderColor = '#e5e7eb';
    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
  };

  return (
    <PaginationLink
      aria-label="Go to next page"
      className={className}
      style={{
        minHeight: '48px',
        minWidth: '120px',
        padding: '12px 24px',
        fontSize: '18px',
        fontWeight: '600',
        backgroundColor: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span>Next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: '24px',
          height: '24px'
        }}
      >
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </PaginationLink>
  );
};

PaginationNext.propTypes = {
  className: PropTypes.string
};

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}; 