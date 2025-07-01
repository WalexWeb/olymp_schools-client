export interface INewsItems {
  text: string;
  date: string;
  desc: string;
}

export interface INewsModalProps {
  text: string;
  date: string;
  desc: string;
  isOpen: boolean;
  onClose: () => void;
}
