import React, { useState } from "react";
import { StyleSheet, View, Pressable, LayoutAnimation } from "react-native";
import StyledText from "./StyledText";

const Accordion = ({ ask, answer }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleAccordion} style={styles.titleContainer}>
                <StyledText type="text" color="black" font="SenBold" size="small">¿{ask}?</StyledText>
            </Pressable>
            {expanded && (
                <View style={styles.content}>
                    <StyledText type="text" color="black" size="small">{answer}</StyledText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth:0.5,
        overflow: "hidden",
    },
    content: {
        padding: 10,
    },
    titleContainer: {
        borderBottomWidth:0.5,
        padding: 10,
    }
});

export default Accordion;