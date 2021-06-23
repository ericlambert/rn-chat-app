import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';
import {auth} from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    function register() {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl,
                });
            })
            .catch((error) => alert(error.message));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerBackTitle: "Back to Login",
        });
      }, [navigation]);

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>Create a Chat Account</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    onChangeText={setName}
                />
                <Input 
                    placeholder='Email'
                    type='email'
                    onChangeText={setEmail}
                />
                <Input 
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    onChangeText={setPassword}
                />
                <Input 
                    placeholder='Profile Pic URL'
                    type='image'
                    onChangeText={setImageUrl}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                title='Register'
                onPress={register}
                style={styles.button}
            />
            <View style={Platform.OS === "ios" ? { height: 150 } : { height: 0 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
