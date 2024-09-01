import React, { useState, useEffect } from "react";
import { TouchableOpacity, ToastAndroid } from "react-native";

const ToggleButton = ({ IconDefault, IconPressed, messageDefault, messagePressed, onPressDefault, onPressPressed, isInitiallyPressed }) => {
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        setIsPressed(isInitiallyPressed);
    }, [isInitiallyPressed]);

    const toggleIcon = () => {
        setIsPressed(!isPressed);
        ToastAndroid.show(
            isPressed ? messageDefault : messagePressed,
            ToastAndroid.SHORT
        );
        if (isPressed) {
            onPressDefault();
        } else {
            onPressPressed();
        }
    };

    return (
        <TouchableOpacity onPress={toggleIcon}>
            {isPressed ? IconPressed : IconDefault}
        </TouchableOpacity>
    );
};

export default ToggleButton;