'use client';

import React, { useState } from 'react';

interface TabProps {
  children: React.ReactNode;
  label: string;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              activeTab === index 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

// Add missing exports
export const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-b">{children}</div>
);

export const TabsTrigger = ({ 
  children, 
  value, 
  className = '',
  ...props 
}: { 
  children: React.ReactNode, 
  value: string, 
  className?: string 
}) => (
  <button 
    className={`px-4 py-2 ${className}`} 
    {...props}
  >
    {children}
  </button>
);

export const TabsContent = ({ 
  children, 
  value, 
  className = '',
  ...props 
}: { 
  children: React.ReactNode, 
  value: string, 
  className?: string 
}) => (
  <div 
    className={`p-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);
