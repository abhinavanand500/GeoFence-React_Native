import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    PermissionsAndroid,Platform,
    KeyboardAvoidingView
} from 'react-native'
import mobiledet from './mobiledet'
import Geolocation from '@react-native-community/geolocation'
import DeviceInfo from 'react-native-device-info'; 
export default class Login extends Component {

    constructor()
    {
        super();
        this.state={
            email:'',
            password:''
        }
    }
    updateValue(text,field)
    {
        if(field=='email')
        {
            this.setState({
                email:text,
            })
        }
        else if(field=='password')
        {
            this.setState({
                password:text,
            })
        }
    }

    
    submit()
    {   
        var collection={}
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                collection.mac = DeviceInfo.getMacAddress().then(),
                collection.uq = DeviceInfo.getUniqueId();
                collection.usn=this.state.email,
                collection.password=this.state.password,
                collection.lat=position.coords.latitude;
                collection.long=position.coords.longitude;
                fetch(`http://abhinavanand500.pythonanywhere.com/writedata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection),
                })
                .then((response) => response.json())
                .then((data) => {
                alert(data['message']);
                })
                .catch((error) => {
                    alert(error);
                console.error('Error:', error);
                });

            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView keyboardVerticalOffset={-100} style = { styles.container }>
                    <TouchableWithoutFeedback style={styles.container} 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/aaa.jpg')}>
                                </Image>
                            </View>
                            <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                    placeholder="USN"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    onChangeText={(text)=>this.updateValue(text,'email')}
                                    autoCorrect={false}
                                />
                                <TextInput style={styles.input} 
                                    placeholder="Password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    secureTextEntry
                                    autoCorrect={false}
                                    onChangeText={(text)=>this.updateValue(text,'password')}
                                />
                                <TouchableOpacity onPress ={() => this.submit()}
                                    style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>MARK YOUR ATTENDANCE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {
        bottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        marginBottom:100,
        width: 400,
        height: 140,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom:200,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        // backgroundColor: '#f7c744',
        // backgroundColor:'gr',
        paddingVertical: 15,
        marginBottom:20
    },
    buttonText: {
        textAlign: 'center',
        // color :'rgb(32, 53, 70)',
        color:'red',
        fontWeight: 'bold',
        fontSize: 18
    }
})