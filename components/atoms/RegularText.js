import React from 'react'
import {Text, StyleSheet} from 'react-native'

const RegularText = (props) => {
    return (
        <Text numberOfLines={props.numberOfLines} style={{...styles.text, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
})

export default RegularText
