import React, {useEffect, useState} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import BoldText from './BoldText'
import RegularText from './RegularText'

const Input = (props) => {
    const [isValid, setIsValid] = useState(true)
    const [value, setValue] = useState("")

    useEffect(()=> {
        setIsValid(props.isValid)
    }, [props.isValid])

    return (
        <View style={styles.formControl}>
            <BoldText style={styles.label}>
                {props.label}
            </BoldText>
            <TextInput
                style={styles.input}
                {...props}
            />
            {(props.errorMessage && !isValid) &&
            <RegularText style={styles.error}>
                {props.errorMessage}
            </RegularText>}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    error:{
        color: 'red'
    }
})

export default Input
