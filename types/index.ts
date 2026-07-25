export type Step =
  | 'passcode'
  | 'prompt'
  | 'menu'
  | 'cake'
  | 'envelope'
  | 'letter';

export interface ScreenProps {
  onNext: (step: Step) => void;
  triggerConfetti?: () => void;
}