import * as React from 'react';

import { TextRecognitionViewProps } from './TextRecognition.types';

export default function TextRecognitionView(props: TextRecognitionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
