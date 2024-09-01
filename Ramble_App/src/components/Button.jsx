import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import values from "../styles/values";
import StyledText from "./StyledText";

const styles = StyleSheet.create({
    button:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 20,
    },
    button1: {
        backgroundColor: values.colors.green_blue_900
    },
    button2:{
        backgroundColor: values.colors.navy_700
    },
    button3:{
        backgroundColor:  values.colors.zinc_500
    },
    button4:{
        backgroundColor:  values.colors.red_600
    }
});

export default function Button({onPress, children , button1, button2, button3, button4}) {
    const buttonStyles = [
        styles.button,
        button1 && styles.button1,
        button2 && styles.button2,
        button3 && styles.button3,
        button4 && styles.button4
    ];

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <StyledText type="button">{children}</StyledText>
        </TouchableOpacity>
    );
}