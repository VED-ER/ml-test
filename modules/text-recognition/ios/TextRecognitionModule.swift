import ExpoModulesCore
import UIKit
import MLKitTextRecognition
import MLKitVision

public class TextRecognitionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TextRecognition")

	let latinOptions = TextRecognizerOptions()
 	let latinTextRecognizer = TextRecognizer.textRecognizer(options:latinOptions)

 	AsyncFunction("recognizeText") { (imgString: String, promise: Promise) in
		if let image = self.convertStringToUIImage(imgString) {
			let visionImage = VisionImage(image: image)
            latinTextRecognizer.process(visionImage) { result, error in
  			guard error == nil, let result = result else {
			  // Error handling
			  promise.reject(FailedToLoadImage())
			  return
  			}
  			// Recognized text
			promise.resolve(result.text)
			}
			// return recognizedText
        } else {
			promise.reject(FailedToLoadImage())
        }
    }
  }

  private func convertStringToUIImage(_ fileURLString: String) -> UIImage? {
    // Ensure the string is a valid URL
    guard let fileURL = URL(string: fileURLString) else {
        print("Invalid URL string")
        return nil
    }

    // Ensure the URL points to a file
    guard fileURL.isFileURL else {
        print("URL is not a file URL")
        return nil
    }

    do {
        // Get the data from the file URL
        let imageData = try Data(contentsOf: fileURL)
        
        // Convert the data to UIImage
        let image = UIImage(data: imageData)
        return image
    } catch {
        print("Error loading image data: \(error)")
        return nil
    }
}
}
