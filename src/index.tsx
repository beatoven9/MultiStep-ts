import React from 'react';
import { useEffect, useState } from 'react';

export interface Step {
  name: string;
  component: React.FC<StepProps>;
}

export interface StepProps {
  next: () => void;
  back: () => void;
  resetState: () => void;
  saveState: (arg0: any) => void;
  getCurrentStep: () => number;
  getTotalSteps: () => number;

  handlePageUpdate: (arg0: any) => void;
  setState: (arg0: any) => void;
  currentState: any;

  currentStep: number;
  totalSteps: number;
}

interface AnimatedMultistepProps {
  defaultState?: any;
  steps: Step[];
  animate?: boolean;
  comeInOnNext?: string;
  comeInOnBack?: string;
  OutOnNext?: string;
  OutOnBack?: string;

  handlePageUpdate: (arg0: any) => void;

  duration?: number;

  onNext: (nextStep: number) => void;
  onBack: (previousStep: number) => void;
  onFinish?: () => void;

  setState: (arg0: any) => void;
  currentState: any;
}

export const AnimatedMultistep: React.FC<AnimatedMultistepProps> = props => {
  const {
    steps,
    onNext,
    onBack,
    setState,
    currentState,
    handlePageUpdate,
  } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  var StepComponent: React.FC<StepProps> = steps[currentStep].component;

  useEffect(() => {
    setTotalSteps(steps.length - 1);
  }, []);

  useEffect(() => {
    StepComponent = steps[currentStep].component;
  }, [currentStep]);

  const next = () => {
    if (currentStep !== totalSteps) {
      onNext(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const back = () => {
    if (currentStep !== 0) {
      onBack(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const saveState = (newState: any) => {
    console.log('SaveState called. new state: ', newState);
  };

  const resetState = () => {
    console.log('ResetState called');
  };

  const getCurrentStep = () => {
    return currentStep;
  };

  const getTotalSteps = () => {
    return totalSteps;
  };

  return (
    <StepComponent
      next={next}
      back={back}
      resetState={resetState}
      saveState={saveState}
      setState={setState}
      getCurrentStep={getCurrentStep}
      getTotalSteps={getTotalSteps}
      handlePageUpdate={handlePageUpdate}
      currentState={currentState}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
};
