import React from "react";
import { StyleSheet, View, ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import values from "../styles/values";
import Accordion from "../components/Accordion";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import HeadImage from "../components/HeadImage";
import StyledText from "../components/StyledText";

const Faq = () => {
    const navigation = useNavigation();

    return (
        <FormContainer>
            <HeadImage big ramb/>
            <StyledText type='title' size='extrabig' font="SenBold">Soporte y Ayuda</StyledText>
            <StyledText>Preguntas frecuentes</StyledText>
            <View style={styles.acordionContainer}>
                <ScrollView>
                    <Accordion ask="Cómo puedo encontrar eventos que me interesen" 
                    answer="El sistema ofrece varias opciones para encontrar eventos que te interesen:
                            Búsqueda por nombre: Busca tus eventos por nombre completo o iniciales.
                            Ubicación actual: Descubre eventos que se celebren cerca de tu ubicación actual (solo en la aplicación móvil).
                            Eventos favoritos: Guarda eventos en tu lista de favoritos para acceder a ellos fácilmente y previsualizar su costo total."
                    />
                    <Accordion ask="Cómo puedo obtener más información sobre un evento específico" 
                    answer="Desde la lista de resultados de búsqueda: Haz clic en el título del evento que te interesa en la lista de resultados de búsqueda.
                    Desde la sección de eventos favoritos: Selecciona el evento que deseas ver en tu lista de eventos favoritos."
                    />
                    <Accordion ask="Cómo encuentro eventos cerca de mi ubicación" 
                    answer="Localización del icono de mapa: El icono de mapa suele estar ubicado en la pantalla principal de la aplicación o en un menú de opciones accesible desde la pantalla principal.
                    Activación del icono de mapa: Al tocar el icono de mapa, se abrirá una vista de mapa que muestra tu ubicación actual.
                    Una vez estando en la vista del mapa, la aplicación móvil mostrará los eventos que se celebren cerca de tu ubicación actual. Estos eventos se representarán en el mapa mediante íconos o marcadores específicos."
                    />
                    <Accordion ask="Cómo agrego un evento a mis favoritos desde la aplicación móvil" 
                    answer="Desde la lista de resultados de búsqueda: Haz clic en el título del evento que te interesa en la lista de resultados de búsqueda.
                    Desde la sección de eventos recientes: Selecciona el evento que desees agregar a favoritos en la sección de eventos recientes.
                    En la página de información del evento, busca el icono de favoritos. Este icono suele estar ubicado en la parte superior o lateral de la página y está representado como un corazón.
                    Al hacer clic en el icono de favoritos, se activará la función de agregar el evento a tu lista de favoritos. "
                    />
                    <Accordion ask="Qué información se muestra en la pre-cotización de eventos" 
                    answer="La pre-cotización muestra el costo total de asistir a todos los eventos agregados a la sección pre-cotizador, con la opción de  ver el costo en diferentes divisas."
                    />
                    <Accordion ask="Cómo puedo contactar al soporte si tengo alguna pregunta o problema" 
                    answer="Si tienes alguna pregunta o problema con el sistema, puedes contactar al soporte a través de la sección de ayuda/soporte dentro de la aplicación o el sitio web."
                    />
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <StyledText>¿Sigues con dudas? Contáctanos</StyledText>
                <Button button2 onPress={() => navigation.navigate("Support")}>Ramble Soporte</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    acordionContainer:{
        marginTop: 20,
        backgroundColor: values.colors.zinc_300,
        width: '90%',
        borderRadius:20,
        height:300
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        marginTop: 20
    }
});

export default Faq;