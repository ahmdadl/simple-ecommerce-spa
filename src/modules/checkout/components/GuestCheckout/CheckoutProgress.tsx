import { Trans } from '@lingui/react/macro';
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { guestCheckoutSteps } from '../../utils/flags';
import { GuestCheckoutStep } from '../../utils/types';
import GuestCheckoutAddress from './GuestCheckoutAddress';
import GuestCheckoutPayments from './GuestCheckoutPayments';
import GuestCheckoutReview from './GuestCheckoutReview';

export default function GuestCheckoutProgress() {
    const [currentStep, setCurrentStep] = useState<GuestCheckoutStep>(
        GuestCheckoutStep.SHIPPING
    );

    const currentStepIndex = guestCheckoutSteps.indexOf(currentStep);
    const nextStep = guestCheckoutSteps[currentStepIndex + 1];
    const prevStep = guestCheckoutSteps[currentStepIndex - 1];
    const labels = {
        [GuestCheckoutStep.SHIPPING]: <Trans>Shipping</Trans>,
        [GuestCheckoutStep.PAYMENT]: <Trans>Payment</Trans>,
        [GuestCheckoutStep.REVIEW]: <Trans>Review</Trans>,
    };

    function goToNextStep() {
        if (!nextStep) {
            return;
        }
        setCurrentStep(nextStep);
    }

    function goToPrevStep() {
        if (!prevStep) {
            return;
        }
        setCurrentStep(prevStep);
    }

    return (
        <div className='flex flex-col gap-6 w-full'>
            <div className='flex items-center justify-center w-full'>
                {guestCheckoutSteps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isLast = index === guestCheckoutSteps.length - 1;

                    return (
                        <React.Fragment key={step}>
                            <div className='relative flex flex-col items-center'>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                        isCompleted
                                            ? 'bg-primary border-primary'
                                            : isCurrent
                                              ? 'border-primary text-primary'
                                              : 'border-gray-300 text-gray-300'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className='w-6 h-6 text-white' />
                                    ) : (
                                        <span
                                            className={`text-sm font-medium ${isCurrent ? 'text-primary' : 'text-gray-400'}`}
                                        >
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={`absolute -bottom-6 text-xs font-medium ${
                                        isCompleted || isCurrent
                                            ? 'text-primary'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {labels[step]}
                                </span>
                            </div>

                            {!isLast && (
                                <div
                                    className={`w-24 h-1 mx-1 transition-colors ${
                                        index < currentStepIndex
                                            ? 'bg-primary'
                                            : 'bg-gray-300'
                                    }`}
                                ></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div>
                {currentStep === GuestCheckoutStep.SHIPPING && (
                    <div className='motion-preset-slide-right'>
                        <GuestCheckoutAddress goToNextStep={goToNextStep} />
                    </div>
                )}

                {currentStep === GuestCheckoutStep.PAYMENT && (
                    <div className='motion-preset-slide-right'>
                        <GuestCheckoutPayments
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                        />
                    </div>
                )}

                {currentStep === GuestCheckoutStep.REVIEW && (
                    <div className='motion-preset-slide-right'>
                        <GuestCheckoutReview setCurrentStep={setCurrentStep} />
                    </div>
                )}
            </div>
        </div>
    );
}
