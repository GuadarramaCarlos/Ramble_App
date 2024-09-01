import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from '@env';

export const handleLogin = (email, password, navigation, db) => {
    if (email.trim() === "" || password.trim() === "") {
        Alert.alert("Error", "Por favor ingrese su correo y contraseña");
        return;
    }
    if (password.trim().length < 8) {
        Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
        return;
    }
    axios.post(`https://ramble-backend-production.up.railway.app/api/auth/login/`, {
        correo: email,
        contrasena: password
    }).then(async response => {
        axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.token}`,
            },
        }).then(async responses=>{
            const userId = responses.data.sub;
            const sql = `INSERT INTO Usuario (id) VALUES (?)`;
            try {
                await db.runAsync(sql, [userId]);
            } catch (error) {
                console.error(`Error saving User ID ${userId}:`, error);
            }
        });
        await AsyncStorage.setItem("authToken",response.data.token)
        navigation.navigate("NavHome");
        navigation.reset({
            index: 0,
            routes: [{ name: 'NavHome' }],
        })
    }).catch(error => {
        Alert.alert("Error al iniciar sesión", error.response.data.message)
        console.error("Error al enviar los datos en Login:", error);
        console.error("Detalles del error:", error.response);
    });
};