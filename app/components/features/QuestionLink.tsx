import React from 'react';

interface QuestionLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const QuestionLink: React.FC<QuestionLinkProps> = ({ children, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('question');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="/#question"
      onClick={handleClick}
      className={`transition-opacity duration-200 hover:opacity-80 ${className}`}
    >
      {children}
    </a>
  );
}; 