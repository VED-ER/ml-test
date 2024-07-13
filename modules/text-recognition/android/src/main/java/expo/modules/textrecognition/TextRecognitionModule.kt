package expo.modules.textrecognition

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.common.InputImage
import expo.modules.kotlin.Promise
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.io.IOException
import android.net.Uri
import android.content.Context

class TextRecognitionModule : Module() {
  
  override fun definition() = ModuleDefinition {
    Name("TextRecognition")

    AsyncFunction("recognizeText") { uri: String, promise: Promise ->
	val filePathUri = Uri.parse(uri)
	val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

	val image: InputImage
	try {
      image = InputImage.fromFilePath(context, filePathUri)
	  recognizer.process(image)
      .addOnSuccessListener { visionText ->
            promise.resolve(visionText.text)
      }
      .addOnFailureListener { _ ->
            promise.reject(TextRecognitionExceptions.TextRecognitionFailed())
      }
    } catch (e: IOException) {
		promise.reject(TextRecognitionExceptions.InputImageFailed())
	}
	
	
	}
	
  }
  private val context
  get() = requireNotNull(appContext.reactContext)

}
