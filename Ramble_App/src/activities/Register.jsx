import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { handleRegister } from "../../util/controler/ControlerReg";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import HeadImage from "../components/HeadImage";
import Input from "../components/Input";
import StyledText from "../components/StyledText";

const image = require('../../assets/images/backgroundimagethree.png');

const Register = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        handleRegister(name, lastName, email, password, confirmPassword, navigation);
    };

    return (
        <FormContainer image={image}>
            <HeadImage small ramb/>
            <StyledText type="title" font="Artifika" size="extrabig">Crear cuenta</StyledText>
            <View style={styles.inputContainer}>
                <Input value={name} onChangeText={setName}>Nombre</Input>
                <Input value={lastName} onChangeText={setLastName}>Apellido</Input>
                <Input value={email} onChangeText={setEmail}>Correo Electrónico</Input>
                <Input value={password} onChangeText={setPassword} security={true}>Contraseña</Input>
                <Input value={confirmPassword} onChangeText={setConfirmPassword} security={true}>Confirmar Contraseña</Input>
            </View>
            <View style={styles.buttonContainer}>
                <Button button1 onPress={handleSubmit}>Crear Cuenta</Button>
                <Button onPress={() => navigation.navigate("Login")}>Iniciar Sesión</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    }
});

export default Register;