import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'

import { auth } from '../firebase';

const HomeScreen = ( {navigation}) => {
    function signOut() {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <Button onPress={signOut} title='Log out'/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
