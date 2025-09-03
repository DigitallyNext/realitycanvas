'use client';

import { useState, ReactNode } from 'react';
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon as ArrowRightOutline } from '@heroicons/react/24/outline';

interface Step {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MultiStepProcessProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  children: ReactNode;
  isStepComplete?: (stepIndex: number) => boolean;
  isSubmitting?: boolean;
  publishingProgress?: number;
  publishingStatus?: string;
  elapsedTime?: number;
  finalButtonText?: string;
  showProgress?: boolean;
  className?: string;
}

export default function MultiStepProcess({
  steps,
  currentStep,
  onStepChange,
  onNext,
  onPrevious,
  onSubmit,
  children,
  isStepComplete = () => true,
  isSubmitting = false,
  publishingProgress = 0,
  publishingStatus = '',
  elapsedTime = 0,
  finalButtonText = 'Publish',
  showProgress = true,
  className = ''
}: MultiStepProcessProps) {
  const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {showProgress && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Step {currentStep + 1} of {steps.length}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {progressPercentage}% Complete
                </div>
              </div>
              <div className="text-2xl font-bold text-brand-primary">
                {steps[currentStep].name}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="hidden md:flex justify-between items-center relative">
              {/* Connection Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
              <div 
                className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-10 transition-all duration-700 ease-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep || isStepComplete(index);
                
                return (
                  <div key={step.id} className="flex flex-col items-center relative z-20">
                    <button
                      onClick={() => onStepChange(index)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 border-4 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white shadow-lg scale-110'
                          : isActive
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-110'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      {isCompleted && index !== currentStep ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </button>
                    <div className="text-center">
                      <span className={`text-sm font-medium block ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.name}
                      </span>
                      <span className={`text-xs text-gray-400 dark:text-gray-500 mt-1 block max-w-24 ${
                        isActive ? 'text-blue-500 dark:text-blue-400' : ''
                      }`}>
                        {step.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Step Indicator */}
            <div className="md:hidden">
              <div className="flex items-center justify-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-blue-500 scale-125'
                        : index < currentStep || isStepComplete(index)
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center mt-3">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {steps[currentStep].name}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Step Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center">
              {(() => {
                const Icon = steps[currentStep].icon;
                return <Icon className="w-10 h-10 mr-4" />;
              })()}
              <div>
                <h1 className="text-3xl font-bold">{steps[currentStep].name}</h1>
                <p className="text-blue-100 mt-2 text-lg">{steps[currentStep].description}</p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            {children}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={onPrevious}
              disabled={isFirstStep}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                isFirstStep
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-105'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Step {currentStep + 1} of {steps.length}
            </div>

            {isLastStep ? (
              <>
                {isSubmitting && (
                  <div className="mb-4 w-full max-w-md">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                         {publishingStatus || 'Publishing...'}
                       </span>
                       <div className="flex items-center gap-3">
                         <span className="text-xs text-gray-500 dark:text-gray-400">
                           {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                         </span>
                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                           {publishingProgress}%
                         </span>
                       </div>
                     </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${publishingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 dark:bg-gray-600 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {publishingStatus || 'Publishing...'}
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-5 h-5 mr-2" />
                    {finalButtonText}
                  </>
                )}
              </button>
              </>
            ) : (
              <button
                onClick={onNext}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Next
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
