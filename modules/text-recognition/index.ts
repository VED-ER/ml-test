import TextRecognitionModule from "./src/TextRecognitionModule"

export async function recognizeTextFromImage(imgPath: string): Promise<string> {
    return await TextRecognitionModule.recognizeText(imgPath)
}
