import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";

const styles = StyleSheet.create({
    icon:{
        width:50,
        height:50,
        marginRight: 15
    },
    row:{
        padding: 5,
        paddingVertical:15,
        paddingLeft: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    start:{
        borderBottomColor: '#000',
        borderBottomWidth:0.5
    }
});

export default function SettingButton({ onPress, text, start, children }) {
    const buttonStyles = [
        styles.row,
        start && styles.start
    ];
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={buttonStyles}>
                {children}
                <StyledText size="small" color="black" type="text">  {text}</StyledText>
            </View>
        </TouchableOpacity>
    );
}
