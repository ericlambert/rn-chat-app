import React, { useEffect, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements'
import {auth} from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, []);

    function signIn() {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error))
    }
    return (
        <KeyboardAvoidingView 
            behavior="padding"
            style={styles.container}
        >
            <StatusBar style='light'/>

            <Image 
                source={{ uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png' }}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Email'
                    autoFocus
                    type='email'
                    onChangeText={setEmail}
                />
                <Input 
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    onChangeText={setPassword}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button
                title='Login'
                containerStyle={styles.button}
                onPress={signIn}
            />

            <Button 
                title='Register'
                type='outline'
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
            />
            
            <View style={Platform.OS === "ios" ? { height: 150 } : { height: 0 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: { 
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
