import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Image, Text, View, Button } from 'react-native';
import config from '../config/config.json';
import {css} from '../css/Css';

export default function Cadastro ()
{
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('null');
    const[senha, setSenha] = useState('null');
    const[confSenha, setConfSenha] = useState('null');

    // Envio do formulario para cadastro
    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}cadastro`, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                senha: senha,
                confSenha:confSenha
            })
        });

        let json = await response.json();
        setMsg(json);

        /*// Armazenando o usuario correto na varivel json.
        let json = await response.json();
        if(json === 'error')
        {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            },5000);

            //Limpar asyncStorage se o usuario errar o login.
            await AsyncStorage.clear();
        }
        else
        {
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('AreaRestrita');
        }*/
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {[css.container, css.darkbg]}> 
            <View style = {css.login__logomarca}>
                <Image source = {require('../assets/icon.png')}></Image>
            </View>

            <View>
                <Text style = {css.msg__cadastro} > {msg} </Text>
            </View>

            <View style = {css.login__form} >
            <TextInput style = {css.login__input} placeholder = 'Digite seu nome: ' onChangeText={text=>setName(text)} />
            <TextInput style = {css.login__input} placeholder = 'Digite a sua senha: '  secureTextEntry = {true} onChangeText={text=>setSenha(text)} />
            <TextInput style = {css.login__input} placeholder = 'Confirme sua senha: ' secureTextEntry = {true} onChangeText={text=>setConfSenha(text)} />

            <TouchableOpacity style = {css.login__button} onPress = {() => sendForm()} >
                <Text style = {css.login__buttonText} >Cadastrar</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
}