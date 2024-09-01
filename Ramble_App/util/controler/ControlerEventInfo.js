import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ToastAndroid } from "react-native";
import { BACKEND_URL } from '@env';

export const handleAddFavorite = async (idEvent) =>{
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
        const addEvent = await axios.post(`https://ramble-backend-production.up.railway.app/api/favoritos/${profileRes.data.sub}`,{
            idEvento: idEvent
        })
    } catch (error) {
        console.error("Error al agregar evento a Favoritos en EventInfo:", error);
        if (error.response) {
            console.error("Detalles del error:", error.response);
        }
    }
}

export const handleDeleteFavorite = async(idEvent) =>{
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
        const deletEvent = await axios.delete(`https://ramble-backend-production.up.railway.app/api/favoritos/${profileRes.data.sub}/evento/${idEvent}`);
    } catch (error) {
        console.error("Error al eliminar evento de Favoritos en EventInfo:", error);
        if (error.response) {
            console.error("Detalles del error:", error.response);
        }
    }
}

export const handleAddItinerary = async (idEvent, db) => {
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
        const event = await axios.get(`https://ramble-backend-production.up.railway.app/api/events/${idEvent}`);
        const userId = profileRes.data.sub;
        const sqlAddToItinerary = `INSERT INTO Precotizador (id_usuario, id_evento) VALUES (?, ?);`;
        const sqlAddEventDetails = `INSERT INTO Evento (id, titulo, fecha, precio, lugar, descripcion, urlImagen, precioProm) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        try {
            await db.runAsync(sqlAddToItinerary, [userId, idEvent]);
            await db.runAsync(sqlAddEventDetails, [event.data.id, event.data.titulo, event.data.fecha, event.data.precio, event.data.lugar, event.data.descripcion, event.data.urlImagen, event.data.precioProm]);
        } catch (error) {
            Alert.alert("Error", "Error al agregar el evento al precotizador");
            console.error("Error al agregar el evento al precotizador en EventInfo:", error);
            console.error("Detalles del error", error.response);
        }
    } catch (error) {
        console.error("Error al obtener datos de perfil en EventInfo:", error);
        console.error("Detalles del error", error.response);
    }
}

export const handleDeleteItinerary = async (idEvent, db) => {
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
        const sqlDeleteFromItinerary = `DELETE FROM Precotizador WHERE id_usuario = ? AND id_evento = ?;`;
        const sqlDeleteEventDetails = `DELETE FROM Evento WHERE id = ?;`;
        try {
            await db.runAsync(sqlDeleteFromItinerary, [userId, idEvent]);
            await db.runAsync(sqlDeleteEventDetails, [idEvent]);
        } catch (error) {
            Alert.alert("Error", "Error al eliminar evento del precotizador");
            console.error("Error al eliminar la relación del precotizador en EventInfo:", error);
            console.error("Detalles del error", error.response);
        }
    } catch (error) {
        console.error("Error al obtener datos de perfil en EventInfo:", error);
        console.error("Detalles del error", error.response);
    }
}