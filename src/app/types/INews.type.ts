export interface INewsItem {
  id: string;
  title: string;
  description: string;
  newsDate: string;
}

export interface INewsModalProps {
  text: string;
  date: string;
  desc: string;
  isOpen: boolean;
  onClose: () => void;
}
