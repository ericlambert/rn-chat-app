import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem 
            key = { id }
            onPress = { () => enterChat(id, chatName) }>
            <Avatar
                source={{uri: 'https://www.bigleaf.net/wp-content/uploads/2017/10/avatar-placeholder.png', }}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
                <ListItem.Subtitle 
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >The last message</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
    },
})
