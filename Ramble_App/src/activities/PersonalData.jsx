import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { handlePersonalData } from "../../util/controler/ControlerPersonalData";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import HeadImage from "../components/HeadImage";
import Input from "../components/Input";
import StyledText from "../components/StyledText";

const PersonalData = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleFormSubmit = () => {
        handlePersonalData(name, lastName, navigation)
    };

    return (
        <FormContainer>
            <HeadImage big prof/>
            <StyledText type='title' size='extrabig'>Datos Personales</StyledText>
            <View style={styles.inputContainer}>
                <Input value={name} onChangeText={setName} security={false}>Nombre</Input>
                <Input value={lastName} onChangeText={setLastName} security={false}>Apellido</Input>
            </View>
            <View style={styles.buttonContainer}>
                <Button button1 onPress={handleFormSubmit}>Editar</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width:'100%'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        marginTop: 20
    }
});

export default PersonalData;