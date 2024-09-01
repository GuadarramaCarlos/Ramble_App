import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import values from '../styles/values';

const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        textAlign: 'center',
    },
    input: {
        marginVertical: 10
    },
    def:{
        marginVertical: 5
    },
    text:{
        marginVertical: 5,
        textAlign: 'justify'
    }
});

const StyledText = ({ children, font = "Sen", size = "medium", color = "white", type = "label" }) => {
    const [fontsLoaded] = useFonts({
        Artifika: require('../../assets/fonts/artifikaregular.ttf'),
        Sen: require('../../assets/fonts/senregular.ttf'),
        SenBold: require('../../assets/fonts/senbold.ttf')
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if(!fontsLoaded) return null

    const baseStyles = {
        fontFamily: font === "SenBold" ? "SenBold" : font === "Artifika" ? "Artifika" : "Sen",
        color: color === "black" ? "black" : color === "stone" ? "#57534E" : "white",
        fontSize: size === "small" ? values.fontsSizes.small : 
                    size === "medium" ? values.fontsSizes.medium : 
                    size === "big" ? values.fontsSizes.big : 
                    values.fontsSizes.extrabig
    };

    const additionalStyles = {};
    if (type === "button") {
        additionalStyles.textAlign = "center";
    } else if (type === "title") {
        additionalStyles.marginTop = 15;
        additionalStyles.marginBottom = 10;
        additionalStyles.textAlign = "center";
    } else if (type === "text") {
        additionalStyles.textAlign = "justify";
        additionalStyles.marginBottom = 5;
    } else if (type === "label") {
        additionalStyles.marginVertical = 10;
        additionalStyles.textAlign = "center";
    }

    const textStyles = [
        styles[type],
        { ...baseStyles },
        { ...additionalStyles }
    ];

    return (
        <Text style={textStyles} onLayout={onLayout}>{children}</Text>
    );
}

export default StyledText;