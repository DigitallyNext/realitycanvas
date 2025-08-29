'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  timeline: string;
}

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const hasShownModal = localStorage.getItem('leadCaptureModalShown');
    
    if (!hasShownModal) {
      // Show modal after 20 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('leadCaptureModalShown', 'true');
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you can add your API call to submit the form data
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close modal after successful submission
      setIsOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        timeline: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Find Your Dream Property
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Get personalized property recommendations from Realty Canvas
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID *</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">By when are you planning to buy the property? *</label>
            <select
              id="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select your timeline</option>
              <option value="1-month">1 Month</option>
              <option value="3-months">3 Months</option>
              <option value="6-months">6 Months</option>
              <option value="more-than-6-months">More than 6 Months</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-brand-primary hover:bg-brand-primary/90"
            >
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. Your information will be used only to provide you with property recommendations.
        </p>
      </div>
    </div>
  );
}