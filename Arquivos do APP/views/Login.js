import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Image, Text, View, Button } from 'react-native';
import{css} from '../css/Css';
import config from '../config/config.json';

export default function Login ({navigation,route})
{
    const [display, setDisplay] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(false);

    //Assim que renderizar a tela ira chamar a funcão verifyLogin().
    useEffect(() =>{
        verifylogin();
    },[]);

    //se houver uma alteração no login e ele for igual a true ira chamar a função biometric().
    useEffect(() =>{
        if(login === true){
            biometric();
        }
    },[login])

    //Verificar se o usucario já possui algum login
    async function verifylogin()
    {
        let response = await AsyncStorage.getItem('userData');
        let json = await JSON.parse(response);
        console.log(json);
        if(json !== null)
        {
            setUser(json.name);
            setPassword(json.password);
            setLogin(true);
        }
    }

    //Biometria
    async function biometric()
    {
        // Verificar se o celular tem o sensor digital.
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if(compatible)
        {
            //Verificar se ela tem digitais cadastradas.
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            if(!biometricRecords)
            {
                alert('Biometria não cadastrada');
            }
            else
            {
                //Verificar se a digital que colocou é igual a que está gravado no sistema
                let result = await LocalAuthentication.authenticateAsync();
                if(result.success)
                {
                    sendForm();
                }
                else
                {
                    setUser(null);
                    setPassword(null);
                }
            }
        }
    }

    // Envio do formulário de login
    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}login`, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        });

        // Armazenando o usuario correto na varivel json.
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
        }
    }
    return(

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {[css.container, css.darkbg]}>

            <View style = {css.login__logomarca} >
                <Text> Aqui estara a imagem {route.params.id}</Text>
                <Image source = {require('../assets/icon.png')}></Image>
            </View>

                <View>
                    <Text style = {css.login__msg(display)} > Usuário ou senha invalidos! </Text>
                </View>

            <View style = {css.login__form} >
                <TextInput style = {css.login__input} placeholder = 'Usuário:' onChangeText={text=>setUser(text)} ></TextInput>
                <TextInput style = {css.login__input} placeholder = 'Senha' onChangeText={text=>setPassword(text)} secureTextEntry={true}></TextInput>
               <TouchableOpacity style = {css.login__button}onPress = {()=>sendForm()} >
                   <Text style = {css.login__buttonText} > Entrar </Text>
               </TouchableOpacity>
               <TouchableOpacity style = {css.cadastro__button} onPress= {() => navigation.navigate('Cadastro')}>
                   <Text style = {css.cadastro__buttonText} > Cadastrar </Text>
               </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}