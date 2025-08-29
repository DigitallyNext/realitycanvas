"use client";

import dynamic from 'next/dynamic';

// Individual dynamic component wrappers
export const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
  loading: () => null
});

export const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => null
});

export const LeadCaptureModal = dynamic(() => import('@/components/LeadCaptureModal'), {
  ssr: false,
  loading: () => null
});

// Default export for compatibility
export default { ScrollToTop, Chatbot, LeadCaptureModal };