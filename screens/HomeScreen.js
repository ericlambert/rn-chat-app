import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements'
import { auth } from '../firebase';

const HomeScreen = ( {navigation}) => {

    // useLayoutEffect sets the home screen's header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chats',
            headerStyle: {backgroundColor: 'white'},
            headerTitleStyle: { color: 'black', fontStyle: 'bold'},
            headerTintColor: { color: 'black' },

            // left header shows the current users avatar. if clicked log out
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{uri: auth?.currentUser?.photoURL}}
                            onPress={ signOut }
                        />
                    </TouchableOpacity>
                </View>
            ),

            // right header has a icon for adding a chat and a (non-function)
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 60,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign 
                            name='camerao'
                            size={24}
                            color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons 
                            onPress={() => navigation.navigate('AddChat')}
                            name='pencil' 
                            size={24}
                            color='black'/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    function signOut() {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    return (
        <View>
            <StatusBar style='dark'/>
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
