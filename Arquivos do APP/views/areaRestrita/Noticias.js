import React, {useState, useEffect, Component} from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MenuAreaRestrita from '../../assets/components/menuAreaRestrita';
import config from '../../config/config.json';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Dicas ({navigation})
{
    const [endereco, setEndereco] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const[user, setUser] = useState(null);
    const [titulo, setTitulo]=useState(null);
    const [descricao, setDescricao]=useState(null);
    const [notices, setNotices] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getLocation();
        fetch('https://reactnative.dev/movies.json')
          .then((response) => response.json())
          .then((json) => setData(json.movies))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

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

    /*async function readNotices()
    {
        let read = await fetch(`${config.urlRoot}read`, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let res = await read.json();
        setData(res);
        console.log(Data);
    }*/

    return (
        <View>
            <MenuAreaRestrita title = 'Noticias' navigation={navigation} />
            <Text> {endereco} </Text>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.title}</Text>
              )}
            />
          )}
        </View>
      );
    };
