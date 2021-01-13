import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, Button, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MenuAreaRestrita from '../../assets/components/menuAreaRestrita';
import {css} from '../../css/Css';
import { TextInput } from 'react-native-paper';
import config from '../../config/config.json';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Formu ({navigation})
{
    const [endereco, setEndereco] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const[user, setUser] = useState(null);
    const [titulo, setTitulo]=useState(null);
    const [descricao, setDescricao]=useState(null);
    const [response, setResponse]=useState(null);

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
    });

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

    //Envio do formulário
    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}notices`,
        {
            method: 'POST',
            body: JSON.stringify({
                id: idUser,
                name: user,
                titulo: titulo,
                descricao: descricao,
                local:endereco
            }),
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    // FORMULÁRIO
    return(
       <ScrollView style = {css.scroll_view} >
           <View style = {css.card}>
               <View style = {css.card_header}>
                   <Text style = {css.text_headerTitle}> Publique alguma nóticia sobre o saneamento </Text>
                   <Text style = {css.text_headerSubtitle}> obs: Ao públicar você ajuda a espalhar a informação para que possa ser resolvida o mais rápido possivel </Text>
               </View>
               <View style = {css.card_body} >
                    <View style = {css.View_title}>
                        <Text style={css.title_label}> Tiitulo </Text>
                        <TextInput style = {css.title_text_input} 
                            autoCorrect = {false}
                            placeholder='titulo'
                            onChangeText={text=>setTitulo(text)}
                        ></TextInput>
                    </View> 

                    <View style = {css.View_description}>
                        <Text style={css.description_label}> Descrição </Text>
                        <TextInput style = {css.description_text_input}
                            autoCorrect = {false}
                            numberOfLines = {10}
                            multiline = {true}
                            placeholder='descricao'
                            onChangeText={text=>setDescricao(text)}
                        ></TextInput>
                    </View> 

               </View>
               <View style = {css.card_footer_button} >
                   <TouchableOpacity style = {css.button} onPress={(sendForm)} >
                    <Text style={css.button_text}>ENVIAR</Text>
                   </TouchableOpacity>
               </View>
           </View>
       </ScrollView>
    );
}