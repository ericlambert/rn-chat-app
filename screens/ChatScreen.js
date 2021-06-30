import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar, } from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'

const ChatScreen = ( {navigation, route} ) => {
    const { chatName }  = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Avatar
                        rounded
                        source={{uri: 'https://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png'}} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700'}}>{chatName}</Text>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                    <AntDesign name='arrowleft' size={24} color='white'/>
                </TouchableOpacity>
            ),

            headerRight: () => (
                <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between', marginRight: 10}}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return (
        <View>
            <Text>Chat Messages</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
