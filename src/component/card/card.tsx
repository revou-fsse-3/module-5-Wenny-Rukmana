import { ReactNode } from 'react';

interface Props {
  children: ReactNode; // Harus berada di paling atas biar bisa dbaca children yang di wrapping
  className?: string;
}
export const Card = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};
