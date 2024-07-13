import {
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { recognizeTextFromImage } from "@/modules/text-recognition"

export default function Index() {
    const [image, setImage] = useState("")
    const [recognizedText, setRecognizedText] = useState("")

    const [status, requestPermission] = ImagePicker.useCameraPermissions()
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            const recText = await recognizeText(result.assets[0].uri)
            setRecognizedText(recText || "")
        }
    }

    async function recognizeText(uri: string) {
        try {
            const imgText = await recognizeTextFromImage(uri)
            return imgText
        } catch (error) {
            console.log("err")
        }
    }

    async function onOpenCameraPress() {
        let permissionResult
        if (!status) {
            permissionResult = await requestPermission()
            if (!permissionResult.granted) {
                Alert.alert("Access needed", "Allow access in settings")
                return
            }
        }

        if (status?.granted) {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                setImage(result.assets[0].uri)
                const recText = await recognizeText(result.assets[0].uri)
                setRecognizedText(recText || "")
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Open Camera" onPress={onOpenCameraPress} />
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
