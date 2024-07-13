import ExpoModulesCore

internal class FailedToLoadImage: Exception {
  override var reason: String {
    "Could not load the image"
  }
}