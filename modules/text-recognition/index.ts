import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to TextRecognition.web.ts
// and on native platforms to TextRecognition.ts
import TextRecognitionModule from './src/TextRecognitionModule';
import TextRecognitionView from './src/TextRecognitionView';
import { ChangeEventPayload, TextRecognitionViewProps } from './src/TextRecognition.types';

// Get the native constant value.
export const PI = TextRecognitionModule.PI;

export function hello(): string {
  return TextRecognitionModule.hello();
}

export async function setValueAsync(value: string) {
  return await TextRecognitionModule.setValueAsync(value);
}

const emitter = new EventEmitter(TextRecognitionModule ?? NativeModulesProxy.TextRecognition);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { TextRecognitionView, TextRecognitionViewProps, ChangeEventPayload };
