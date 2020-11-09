import React from 'react';

export interface HeaderProps {
  title: React.ReactNode;
  showReset?: boolean;
  onReset?: () => void;
}

export interface FilterBoxProps extends HeaderProps {
  children: React.ReactNode;
}
