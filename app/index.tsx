import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { recognizeTextFromImage } from "@/modules/text-recognition"

export default function Index() { 
    const [image, setImage] = useState("")
    const [recognizedText, setRecognizedText] = useState("")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)

            try {
                const imgText = await recognizeTextFromImage(
                    result.assets[0].uri
                )
                setRecognizedText(imgText)
            } catch (error) {
                console.log("err")
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {recognizedText && (
                <Text style={{ width: 200 }}>{recognizedText}</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
        objectFit: "contain",
        borderWidth: 1,
    },
})
