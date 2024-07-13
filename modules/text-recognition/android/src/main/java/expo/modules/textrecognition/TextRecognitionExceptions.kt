package expo.modules.textrecognition

import expo.modules.kotlin.exception.CodedException

class TextRecognitionExceptions {
  class TextRecognitionFailed : CodedException(message = "Failed to recognize text form an image")

  class InputImageFailed: CodedException(message = "Failed to create InputImage")
}
