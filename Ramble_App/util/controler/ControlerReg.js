import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from '@env';

const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const validateName = (name) => {
    const namePattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    return namePattern.test(name);
};

export const handleRegister = (name, lastName, email, password, confirmPassword, navigation) => {
    if (name.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        Alert.alert("Error", "Por favor complete todos los campos del formulario");
        return;
    } 
    if (!validateName(name) || !validateName(lastName)) {
        Alert.alert("Error", "Ingrese un nombre y apellido válidos");
        return;
    } 
    if (!validateEmail(email)) {
        Alert.alert("Error", "Ingrese un correo electrónico válido");
        return;
    } 
    if (password.trim().length < 8) {
        Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
        return;
    } 
    if (password !== confirmPassword) {
        Alert.alert("Error", "Las contraseñas no coinciden");
        return;
    }
    axios.post(`https://ramble-backend-production.up.railway.app/api/auth/register`,{
        correo:email,
        contrasena:password,
        nombre:name,
        apellido:lastName
    }).then(response => {
        navigation.navigate("Login", email);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    }).catch(error => {
        Alert.alert("Error al crear cuenta", error.response.data.message)
        console.error("Error al enviar los datos en Register:",error);
        console.error("Detalles del error", error.response);
    })
};