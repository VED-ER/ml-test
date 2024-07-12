import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { TextRecognitionViewProps } from './TextRecognition.types';

const NativeView: React.ComponentType<TextRecognitionViewProps> =
  requireNativeViewManager('TextRecognition');

export default function TextRecognitionView(props: TextRecognitionViewProps) {
  return <NativeView {...props} />;
}
