import React from 'react';

export interface ButtonInterface {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  width?: number;
}
