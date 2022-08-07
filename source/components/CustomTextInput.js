import { StyleSheet, Text, View,TextInput,Dimensions } from 'react-native'
import React from 'react'

const WIDTH = Dimensions.get('window').width;

const CustomTextInput = ({placeholder,onChangeText,styles,label,value,secure}) => {
    return (
        <View style={styles?styles.inputContainer:localStyles.inputContainer}>
            <Text style={styles?styles.label:localStyles.label}>{label}</Text>
            <TextInput style={styles ? styles.textInput : localStyles.textInput} onChangeText={onChangeText} placeholder={placeholder ? placeholder : ""} value={value} secureTextEntry={ secure} />
        </View>
  )
}

export default CustomTextInput

const localStyles = StyleSheet.create({
    label: {
        color: "#000",
        fontSize:14
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 20,
        margin: 10,
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth+1,
    },
    textInput: {
        minWidth: WIDTH / 2,
        fontSize: 16,
        color:"#000"
    }
})