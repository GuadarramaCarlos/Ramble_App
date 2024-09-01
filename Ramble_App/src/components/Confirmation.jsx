import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from '@env';
import Button from "./Button";
import StyledText from "./StyledText";

const Confirmation = ({ visible, onClose, onConfirm, text }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleConfirm = async () => {
        if(password.trim() == ""){
            return setError("Ingresa tu contraseña actual")
        }
        try{
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                Alert.alert("Error", "No se ha encontrado el token de autenticación en AsyncStorage");
                return;
            }
            const profileRes = await axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });            
            const postPassword = await axios.post(`https://ramble-backend-production.up.railway.app/api/auth/password`, {
                id: profileRes.data.sub,
                contrasena: password
            });
            setPassword("")
            return onConfirm()
        }catch(error){
            console.error("Error:", error);
            if (error.response) {
                console.error("Detalles del error:", error.response);
                setError(error.response.data.message)
            }
            return false
        }
    };

    const handleClose = () =>{
        onClose()
        setError("")
        setPassword("")
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <StyledText type="text" size="big" font="SenBold"color="black">Confirmar Contraseña</StyledText>
                    <StyledText type="text" size="small" color="black">{text} Para confirmar escriba su contraseña actual</StyledText>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <View style={styles.buttonContainer}>
                        <Button button4 onPress={handleClose}>Cancelar</Button>
                        <Button button2 onPress={handleConfirm}>Confirmar</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    errorText: {
        color: "red",
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 10,
        fontFamily:"Sen"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default Confirmation;