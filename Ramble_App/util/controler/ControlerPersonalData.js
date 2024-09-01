import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from '@env';

const validateName = (name) => {
    const namePattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    return namePattern.test(name);
};

export const handlePersonalData = async (name, lastName, navigation) => {
    if (!validateName(name) || !validateName(lastName)) {
        Alert.alert("Error", "El nombre y apellido deben contener solo letras y espacios");
        return;
    }
    try {
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
        const patchResponse = await axios.patch(`https://ramble-backend-production.up.railway.app/api/user/persona/${profileRes.data.sub}`, {
            nombre: name,
            apellido: lastName
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        navigation.navigate("Settings")
        navigation.reset({
            index: 0,
            routes: [{ name: 'Settings' }],
        })
        console.log(patchResponse.data);
    } catch (error) {
        Alert.alert("Error al modificar los datos", error.response.data.message)
        console.error("Error en Personal Data:", error);
        console.error("Detalles del error:", error.response);
    }
};