import React from 'react';
import {Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {css} from '../css/Css';

export default function Home ({navigation})

{
    return(
        <View style={css.container}>

            <Text> Esse é o componente home </Text>
            <Button
             title = 'Ir para login'
             onPress={() => navigation.navigate('Login', {id:'do icone'})}
             ></Button>

        </View>

        /*<TouchableOpacity style = {css.button__login} onPress={()=>props.navigation.navigate('Login')}>
        <Image source={require('../assets/icon.png')}/>
        </TouchableOpacity>*/
    );

}