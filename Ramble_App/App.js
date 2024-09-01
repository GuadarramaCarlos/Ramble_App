import React,{Suspense, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system'
import { SQLiteProvider } from 'expo-sqlite';
import { Asset } from 'expo-asset';
import AboutUs from './src/activities/AboutUs.jsx';
import AccountData from './src/activities/AccountData.jsx';
import EventInfo from './src/activities/EventInfo.jsx';
import Faq from './src/activities/FAQ.jsx';
import Loading from './src/components/Loading.jsx';
import Login from './src/activities/Login.jsx';
import Main from './src/activities/Main.jsx';
import NavHome from './src/activities/NavHome.jsx';
import PersonalData from './src/activities/PersonalData.jsx';
import Register from './src/activities/Register.jsx';
import Settings from './src/activities/Settings.jsx';
import Support from './src/activities/Support.jsx';
import TermsAndConditions from './src/activities/TermsAndConditions.jsx';

const loadDatabase = async () =>{
  const dbName  = "SQLRamble.db";
  const dbAsset = require("./assets/SQLRamble.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if(!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`),
    {intermediates : true}
  }
  await FileSystem.downloadAsync(dbUri,dbFilePath);
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
    .then(() => setDbLoaded(true))
    .catch((e) => console.error(e))
  }, [])

  if(!dbLoaded) return (<Loading/>)

  return (
    <NavigationContainer>
      <Suspense fallback={Loading}>
        <SQLiteProvider databaseName="SQLRamble.db" useSuspense={true}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="Register" component={Register} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="NavHome" component={NavHome} options={{headerShown: false}}/>
                <Stack.Screen name="Info" component={EventInfo} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: '', headerShown: false}}/>
                <Stack.Screen name="Settings" component={Settings} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="PersonalData" component={PersonalData} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="AccountData" component={AccountData} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="Faq" component={Faq} options={{headerTransparent: true ,headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="Support" component={Support} options={{headerTransparent: true, headerTintColor: '#FFFFFF', headerTitle: ''}}/>
                <Stack.Screen name="Terms" component={TermsAndConditions} options={{headerTintColor: '#000', headerTitle: 'Términos y Condiciones'}}/>
                <Stack.Screen name="About" component={AboutUs} options={{headerTintColor: '#000', headerTitle: 'Acerca de nosotros'}}/>
            </Stack.Navigator>   
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}