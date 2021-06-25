import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [chatName, setChatName] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a New Chat',
            headerBackTitle: 'Chats',
        })
    }, [navigation]);

    // https://www.youtube.com/watch?v=V_Kr9OSfDeU
    async function createChat() {
        try {
            await db.collection('chats').add({chatName});
            navigation.goBack();
        } catch (error) {
            alert(error);
        }
    }

    return (
        
        <View style={styles.container}>
            <StatusBar style='light'/>
            <Input 
                placeholder='Enter a chat name'
                // leftIcon={
                //     <Icon 
                //         name='wechat'
                //         style='antdesign'
                //         size={24}
                //         color='black'
                //     />
                // }
                onChangeText={setChatName}
                onSubmitEditing={createChat}
            />
            <Button 
                style={styles.button}
                title='Create a New Chat'
                onPress={createChat}
                disabled={!chatName}
            />
        </View>
    );
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    },
});
