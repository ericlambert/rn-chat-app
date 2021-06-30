import React, { useEffect, useLayoutEffect, useState } from 'react'
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Alert, 
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements'

import { auth, db } from '../firebase';

import CustomListItem from '../components/CustomListItem';

const HomeScreen = ( {navigation}) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .onSnapshot((snapshot) => {
                setChats(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            });
        return unsubscribe;
    }, [])

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
                            onPress={ askSignOut }
                            rounded
                            source={{uri: auth?.currentUser?.photoURL}}
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

    function askSignOut() {
        Alert.alert("Sign Out", "Are you really sure?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => signOut() },
        ]);
    }

    function signOut() {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    function enterChat(id, chatName) {
        navigation.navigate('Chat', {id, chatName})
    }

    function createItem(chat) {
        const {id, data: { chatName }} = chat;
        return (
            <CustomListItem 
                id={id}
                chatName={chatName}
                enterChat={enterChat}
            />
        )
    }

    return (
        <SafeAreaView>
            <StatusBar style='dark'/>
            <ScrollView>
                { chats.map(createItem) }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
