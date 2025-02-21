import React from 'react';

export const FormLayout = ({ title, subtitle, children }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <img src="/logo.png" alt="Craxinno Technologies" className="h-8 mb-8" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};