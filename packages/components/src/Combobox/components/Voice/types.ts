import * as React from 'react';

export interface VoiceProps {
  children?: React.Component | ((props: { onClick: () => void; active: boolean }) => React.ReactElement);
  onVoiceInput?: (result: string) => void;
}
