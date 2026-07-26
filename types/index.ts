export type Step =
  | 'passcode'
  | 'prompt'
  | 'menu'
  | 'cake'
  | 'envelope'
  | 'letter'
  | 'music'
  | 'photos';

export interface ScreenProps {
  onNext: (step: Step) => void;
  triggerConfetti?: () => void;
}