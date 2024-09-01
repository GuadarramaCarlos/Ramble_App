import { Alert } from "react-native";
import axios from "axios";
import { SUPPORT_BACKEND_URL } from '@env';

export const handleSupport = (email, selected, description,navigation) => {
    if(!selected){
        return console.log("jijija")
    }
    axios.post(`https://ramble-backend-soporte-production.up.railway.app/api/support/tickets/add`, {
        emisor: email,
        tipoTicket: selected,
        descripcionTicket: description
    }).then(async response => {
        console.log("Respuesta del servidor:", response.data);
        Alert.alert(
            "Formulario enviado",
            "Se ha enviado",
            [
                { text: "Sí", onPress: async () => {
                    navigation.navigate("Faq")
                }}
            ]
        );
    }).catch(error => {
        Alert.alert("Error al enviar el formulario", error.response.data.message)
        console.error("Error al enviar el ticket en Support:", error);
        console.error("Detalles del error:", error.response);
    });
};