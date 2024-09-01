import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, FontAwesome6, FontAwesome5, AntDesign } from '@expo/vector-icons';
import FavScreen from "./Favorites";
import HomeScreen from './Home';
import MapScreen from "./Map";
import PrecouterScreen from "./Itinerary";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "#472312", tabBarInactiveTintColor: "#57534e", tabBarStyle: { backgroundColor: "#d1d5db" }, tabBarShowLabel: false}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({ color }) => (<Foundation name="home" size={30} color={color} />), headerShown: false, unmountOnBlur: true}}/>
      <Tab.Screen name="Favorites" component={FavScreen} options={{tabBarIcon: ({ color }) => (<AntDesign name="heart" size={30} color={color} />), headerShown: false, unmountOnBlur: true}}/>
      <Tab.Screen name="Prequoter" component={PrecouterScreen} options={{tabBarIcon: ({ color }) => (<FontAwesome5 name="clipboard-list" size={30} color={color} />), headerShown: false, unmountOnBlur: true}}/>
      <Tab.Screen name="Map" component={MapScreen} options={{tabBarIcon: ({ color }) => (<FontAwesome6 name="location-dot" size={30} color={color} />), headerShown: false,  unmountOnBlur: true}}/>
    </Tab.Navigator>
  );
}