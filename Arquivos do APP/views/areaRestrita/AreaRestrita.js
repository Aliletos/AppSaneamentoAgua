import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, Button, BackHandler, Alert} from 'react-native';
import {css} from '../../css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { set } from 'react-native-reanimated';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import {Profile, Noticias, Formu} from '../Index';

export default function AreaRestrita ({navigation})
{

    const Tab = createMaterialBottomTabNavigator();
    const [user, setUser] = useState(null);

    //Acessando o nome do usuario que está no banco de dados
    useEffect(() => {
        async function getUser()
        {
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUser(json.name); // passando para dentro do user o nome dele.
        }
        getUser();
    },[]);

    // Função de voltar do celular. Dando uma alerta para o usuario.(BackHandler)
        useEffect(() => {
          const backAction = () => {
            Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
              {
                text: "Não",
                onPress: () => null,
                style: "cancel"
              },
              
              { text: "Sim", onPress: () =>  {
                  navigation.navigate('Home');
                  BackHandler.exitApp();
                }
            }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
        }, []);//voltar


    return(
        <Tab.Navigator
            activeColor = '#999'
            inactiveColor = '#fff'
            barStyle = {css.area__tab} // setar um css para o tab
        >
             <Tab.Screen
                name="Perfil"
                component={Profile} 
                // Colocar icone no TabNavigator
                 options={{
                   tabBarIcon:() =>(
                       <Icon name ="users" size={20} color="#999"/>
                   )
               }}
             />

             <Tab.Screen
                name="Noticias"
                component={Noticias}
                options={{
                    tabBarIcon:() =>(
                        <Icon name ="archive" size={20} color="#999"/>
                    )
                }}
             />

             <Tab.Screen
                 name="Formulário"
                component={Formu}
                options={{
                    tabBarIcon:() =>(
                        <Icon name ="edit" size={20} color="#999"/>
                    )
                }}
             />
        </Tab.Navigator>

        /*<TouchableOpacity style = {css.button__login} onPress={()=>props.navigation.navigate('Login')}>
        <Image source={require('../assets/icon.png')}/>
        </TouchableOpacity>*/
    );
}