import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '../../css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/menuAreaRestrita';
import config from "../../config/config.json";

export default function trocarSenha ({navigation})
{
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
    })

    // Trocar a senha
    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}verifyPass`,
        {
            method: 'POST',
            body: JSON.stringify({
                id: idUser,
                senhaAntiga: senhaAntiga,
                novaSenha: novaSenha,
                confNovaSenha: confNovaSenha
            }),
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let json = await response.json();
        setMsg(json);
    }

        return(
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {[css.container, css.darkbg]}> 
                <View style = {css.login__logomarca}>
                    <Image source = {require('../../assets/icon.png')}></Image>
                </View>
    
                <View>
                    <Text style = {css.msg__cadastro} > {msg} </Text>
                </View>
    
                <View style = {css.login__form} >
                <TextInput style = {css.login__input} placeholder = 'Digite a senha antiga: ' secureTextEntry = {true} onChangeText={text=>setSenhaAntiga(text)} />
                <TextInput style = {css.login__input} placeholder = 'Digite a nova senha: '  secureTextEntry = {true} onChangeText={text=>setNovaSenha(text)} />
                <TextInput style = {css.login__input} placeholder = 'Confirme a nova senha: ' secureTextEntry = {true} onChangeText={text=>setConfNovaSenha(text)} />
    
                <TouchableOpacity style = {css.login__button} onPress = {() => sendForm()} >
                    <Text style = {css.login__buttonText} > Trocar senha </Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        );
}