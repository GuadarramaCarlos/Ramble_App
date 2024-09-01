import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import values from "../styles/values";
import StyledText from "./StyledText";

const styles = StyleSheet.create({
    input: {
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: values.colors.black,
        backgroundColor: values.colors.white,
        width: '100%',
        fontFamily:"Sen"
    },
});

const Input = ({ children, security, value, onChangeText }) => {
    return (
        <View>
            <StyledText type="input" size="small">{children}</StyledText>
            <TextInput style={styles.input} secureTextEntry={security} value={value} onChangeText={onChangeText}/>
        </View>
    );
}

export default Input;