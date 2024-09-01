import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from '@env';

export const handleAccountData = async (email, password, navigation) => {
    if(email.trim() == "" && password.trim() == ""){
        Alert.alert("Error", "Llene los campos para poder editar sus datos")
        return;
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
        if(email.trim() !== ""){
            const patchEmail = await axios.patch(`https://ramble-backend-production.up.railway.app/api/user/email/${profileRes.data.sub}`, {
                correo: email
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        }
        if(password.trim() !== ""){
            const patchPassword = await axios.patch(`https://ramble-backend-production.up.railway.app/api/user/password/${profileRes.data.sub}`, {
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        }
        navigation.navigate("Settings")
        navigation.reset({
            index: 0,
            routes: [{ name: 'Settings' }],
        })
    }catch(error){
        Alert.alert("Error al modificar los datos", error.response.data.message)
        console.error("Error en AccountData:", error);
        console.error("Detalles del error:", error.response);
    }
};