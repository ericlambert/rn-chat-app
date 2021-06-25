import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({ id, chatName }) => {
    return (
        <ListItem key = { id }>
            <Avatar
                source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png', }}
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
