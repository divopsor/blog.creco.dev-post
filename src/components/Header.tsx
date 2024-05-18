import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div style={{
      paddingTop: '24px',
      paddingBottom: '24px'
    }}>
      {children}
    </div>
  )
}
