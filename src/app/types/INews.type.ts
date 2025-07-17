export interface INewsItem {
  id: number;
  title: string;
  description: string;
  created_at: string;
}
export interface INewsModalProps {
  text: string;
  date: string;
  desc: string;
  isOpen: boolean;
  onClose: () => void;
}
