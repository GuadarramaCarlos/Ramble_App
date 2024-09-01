import React from "react";
import { ScrollView } from "react-native";
import StyledText from "../components/StyledText";

const AboutUs = () => {
    return(
        <ScrollView style={{padding:10}}>
            <StyledText color="black" size="big" type="title" font="Artifika">ACERCA DE NOSOTROS</StyledText>
            <StyledText color="black" size="big" font="SenBold">¿Que es Ramble?</StyledText>
            <StyledText color="black" font="SenBold">Ramble es tu puerta de entrada a un mundo de experiencias inolvidables:</StyledText>
            <StyledText color="black"> Bienvenido a la aplicación que te permite descubrir y disfrutar de los mejores eventos culturales y de entretenimiento en la Ciudad de México.</StyledText>
            <StyledText color="black" size="big" type="title" font="SenBold">¿Qué ofrecemos?</StyledText>
            <StyledText color="black" type="text">1.Accede a una amplia base de datos con información sobre eventos culturales, deportivos, artísticos y más, ocurriendo en la Ciudad de México.</StyledText>
            <StyledText color="black" type="text">2.Calcula fácilmente el costo aproximado de asistir a tus eventos favoritos con nuestro precotizador. ¡Planifica tu diversión con anticipación!</StyledText>
            <StyledText color="black" type="text">3.Marca tus eventos favoritos y mantén un registro de tus intereses para una experiencia personalizada.</StyledText>
            <StyledText color="black" type="text">4.Personaliza tu experiencia cambiando la moneda del precotizador a tu moneda preferida. Soportamos una amplia gama de divisas, incluyendo USD, EUR, JPY, CHF, CNY, SEK, BRL, MXN, ARS, COP, PEN, CLP, y más.</StyledText>
            <StyledText color="black" type="text" font="SenBold">¡No te pierdas los eventos más emocionantes de la Ciudad de México!</StyledText>
            <StyledText color="black" size="big" type="title" font="SenBold">Ubica</StyledText>
            <StyledText color="black" type="text">1.Navega a través de nuestra lista de eventos y descubre nuevas experiencias.</StyledText>
            <StyledText color="black" type="text">2.Agrega eventos a tu lista de favoritos y utiliza nuestro precotizador para estimar su costo total.</StyledText>
            <StyledText color="black" type="text" font="SenBold">Únete a nuestra comunidad y vive la ciudad al máximo</StyledText>
            <StyledText></StyledText>
        </ScrollView>
    )
}

export default AboutUs;