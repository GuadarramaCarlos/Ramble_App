import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from '@env';

export const handleLogout = (navigation) => {
    Alert.alert(
        "Cerrar Sesión",
        "¿Estás seguro de que deseas cerrar sesión?",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            { text: "Sí", onPress: async () => {
                try {
                    await AsyncStorage.removeItem("authToken");
                    navigation.navigate("Main")
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    })
                } catch (error) {
                    console.error("Error al borrar el token de AsyncStorage en Settings:", error);
                }
            }}
        ]
    );
};

export const handleDelete = async (navigation, db) => {
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
        const userId = profileRes.data.sub;
        const sqlDeleteFromPrecotizador = `DELETE FROM Precotizador WHERE id_usuario = ?;`;
        await db.runAsync(sqlDeleteFromPrecotizador, [userId]);
        const sqlDeleteFromUsuario = `DELETE FROM Usuario WHERE id = ?;`;
        await db.runAsync(sqlDeleteFromUsuario, [userId]);
        const deleteUser = await axios.delete(`https://ramble-backend-production.up.railway.app/api/user/${userId}`);
        await AsyncStorage.removeItem("authToken");
        navigation.navigate("Main");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    } catch (error) {
        console.error("Error al realizar el proceso de eliminación en Setting:", error);
        console.error("Detalles del error: ", error.response);
    }
};