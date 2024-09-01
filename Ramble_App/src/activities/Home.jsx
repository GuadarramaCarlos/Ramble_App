import React, { useState, useCallback ,useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { BACKEND_URL } from '@env';
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import values from "../styles/values";
import NotFound from "../components/NotFound";
import StyledText from "../components/StyledText";

const image = require("../../assets/images/Rectangle91.png");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(undefined);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [allEvents , setAllevents] = useState(null)
  const [Events, setEvents]=useState([]);

  const handeledText = (text) => {
    setSearchText(text);
  };

  const finishedText = (text) => {
    if(text===undefined){
      setIsSearchComplete(false);
    }
    else{
      setIsSearchComplete(true);
    }
  };

  useEffect(() => {
    if (isSearchComplete) {
      if (searchText === undefined || searchText === '') {
        setEvents(allEvents);
      } else {
        axios.get(`https://ramble-backend-production.up.railway.app/api/events/search/${searchText}`)
          .then(response => {
            setEvents(response.data);
          })
          .catch(error => {
            if (error.response.status === 404) {
              setEvents(null);
            } else {
              console.error("Erro al buscar eventos en Home", error);
              console.error("Detalles del error", error.response);
            }
          });
      }
      setIsSearchComplete(false);
    }
  }, [searchText, isSearchComplete]);

  const [page, setPage] = useState(1)
  const loadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useEffect(()=>{
      axios.get("https://ramble-backend-production.up.railway.app/api/events/list")
      .then((response)=>setEvents(response.data))
      .catch(error => {
        console.error("Error al obtener los eventos en Home:", error);
        console.error("Detalles del error", error.response);
      });
  },[])

  useEffect(()=>{
    axios.get("https://ramble-backend-production.up.railway.app/api/events/list")
    .then((response)=>setAllevents(response.data))
    .catch(error => {
      console.error("Error al obtener los eventos en Home:", error);
      console.error("Detalles del error", error.response);
    });
},[])

  const resderUserCard=({item , navigation})=>{
      return(
        <TouchableOpacity onPress={() => navigation.navigate("Info", item)} style={styles.itemContainer}>
          <View key={item.id}>
            <Image style={styles.image} source={{ uri: item.urlImagen }} />
            <View style={styles.information}>
              <StyledText size="small" font="Artifika">{item.titulo}</StyledText>
              <StyledText type="text" size="small">{item.fecha}</StyledText>
              <StyledText type="text" size="small">{item.precio}</StyledText>
              <StyledText type="text" size="small">{item.lugar.match(/[^,]*/)[0]}</StyledText>
            </View>
          </View>
        </TouchableOpacity>
      )
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
          <View style={{alignItems:'center' , flexDirection:'row', justifyContent:'space-between'}}>
              <StyledText type="text" size="extrabig" font="Artifika">Ramble</StyledText>
              <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Settings")}>
                <AntDesign name="user" size={32} color="white" />
              </TouchableOpacity>
          </View>
          <View>
          <View style={{ justifyContent: "center", alignItems: "center"}}>
            <SearchBar placeholder="Buscar eventos" containerStyle={styles.searchBar} inputStyle={{fontFamily:"Sen"}} inputContainerStyle={{borderRadius:10}} onChangeText={handeledText} value={searchText} onSubmitEditing={finishedText} onClear={()=>setEvents(allEvents)}/>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{paddingHorizontal:5}}>
        <View style={{top:10, marginBottom:305}}>
            {Events ? (<FlatList contentContainerStyle={{ alignItems: 'center' }} numColumns={2} showsVerticalScrollIndicator={false} data={Events.slice(0, page * 6)} keyExtractor={(item) => item.id} renderItem={({ item }) => resderUserCard({ item, navigation: navigation })} onEndReached={loadMore}/>) : (<NotFound text="No se han encontrado resultados"/>)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    height: 100,
    backgroundColor: '#1E5367',
    alignSelf: "center"
  },
  imageBackground: {
    padding: 20,
    height: 150
  },
  information:{
    paddingHorizontal:"7%",
    paddingBottom:"7%"
  },
  itemContainer: {
    backgroundColor: '#0B1023',
    flexDirection: "column",
    width: "46%",
    borderRadius: 15,
    flexWrap: 'wrap-content',
    marginHorizontal: "2.2%",
    marginBottom: 15,
    shadowRadius: 15,
    shadowColor: 'black',
    elevation: 10
  },
  mainContainer: {
    marginTop: Constants.statusBarHeight
  },
  profileButton: {
    height: 40,
    width: 40,
    backgroundColor: values.colors.rose_700,
    alignItems: "center",
    borderRadius: 15,
    justifyContent:'center'
  },
  searchBar: {
    width: "100%",
    height:20 ,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
});

export default HomeScreen;