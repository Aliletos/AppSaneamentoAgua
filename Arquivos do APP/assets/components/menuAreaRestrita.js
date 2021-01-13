import React from 'react';
import {Text, View, Image, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '../../css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function MenuAreaRestrita(props)
{

    async function logout ()
    {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return(
        <View style = {css.area__menu}>
            <TouchableOpacity style = {css.btn__home} onPress = {() => props.navigation.navigate('Home')}>
                <Icon name = "home" size={20} color = "#999" ></Icon>
            </TouchableOpacity>

             <Text style = {css.area__title} > {props.title} </Text>

             <TouchableOpacity style = {css.btn__logout} onPress = {() => logout()}>
                <Icon name = "sign-out" size={20} color = "#999" ></Icon>
            </TouchableOpacity>
        </View>
    );
}