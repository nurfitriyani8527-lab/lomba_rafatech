import React from 'react';

export default function SkeletonLoader({ type }) {
  return (
    <div className="animate-pulse space-y-4 p-8 w-full">
      <div className="h-10 bg-slate-800 rounded w-1/4"></div>
      <div className="h-32 bg-slate-800 rounded-3xl w-full"></div>
      <div className="h-32 bg-slate-800 rounded-3xl w-full"></div>
    </div>
  );
}
