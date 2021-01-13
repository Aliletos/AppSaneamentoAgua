import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import{css} from './css/Css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Cadastro, Home,Login, trocarSenha} from './views/Index';
import AreaRestrita from './views/areaRestrita/AreaRestrita';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  
  const Stack = createStackNavigator();

  /*async function teste()
  {
    let resData = await AsyncStorage.getItem('userData');
    console.log(JSON.parse(resData));
  }
  teste();*/

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ 
              title: "Bem vindo",
              headerTintColor:'#333',
              headerTitleStyle: {fontWeight:'bold', alignSelf: 'center'},
              headerStyle:{backgroundColor:"red"},
            }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Tela de login', headerShown:false }}
        />

        <Stack.Screen
          name="AreaRestrita"
          component={AreaRestrita}
          options={{ title: "Area Restrita", headerShown:false}}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "Tela de Cadastro"}}
        />
        <Stack.Screen
          name="trocarSenha"
          component={trocarSenha}
          options={{ title: "Trocar senha"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

