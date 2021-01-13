import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '../../css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/menuAreaRestrita';
import config from "../../config/config.json";
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Profile ({navigation})
{
    const [endereco, setEndereco] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const[user, setUser] = useState(null);
    const [senhaAntiga, setSenhaAntiga] = useState(null);
    const [novaSenha, setNovaSenha] = useState(null);
    const [confNovaSenha, setConfNovaSenha] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        async function getIdUser()
        {
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setIdUser(json.id);
            setUser(json.name);
        }
        getIdUser();
        getLocation();
    })

    useEffect(()=>{
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
      });

         // Retorna a posição e endereço do usuario
         async function getLocation()
         {
           let location = await Location.getCurrentPositionAsync({});
           Geocoder.init(config.geocodingAPI);
           Geocoder.from(location.coords.latitude, location.coords.longitude)
               .then(json => {
                   //let number = json.results[0].address_components[0].short_name;
                   //let street = json.results[0].address_components[1].short_name;
                   let city = json.results[0].address_components[3].short_name;
                   setEndereco(`${city}`);
               })
               .catch(error => console.warn(error));
         }

    return(
            <View>
                <MenuAreaRestrita title = 'Perfil' navigation={navigation} />

            <View>
                <Text style = {css.msg_bemVindo} > Bem Vindo {user}</Text>
                <Text style = {css.msg_bemVindo} > Você está em: {endereco}</Text>

                <View style = {css.login__logomarca} >
                    <Image source = {require('../../assets/icon.png')}></Image>
                </View>

                    <TouchableOpacity style = {css.login__button} onPress = {() => navigation.navigate('trocarSenha')} >
                        <Text></Text>
                        <Text>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}