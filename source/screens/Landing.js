import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Landing = () => {
    const navigation = useNavigation();
    const handleNavigation = (screen) => {
        navigation.replace(screen);
    }
  return (
    <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to {`\n`}<Text style={{ color: "red", fontSize: 24, fontWeight: "bold", marginTop: 10 }}>iFriends</Text></Text>
          <Text style={styles.prompt}>Are you a </Text>
          <TouchableOpacity style={styles.promptButton} activeOpacity={0.8} onPress={()=>handleNavigation('RegisterInstructor')}>
              <Text style={styles.promptButtonText}>Instructor</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.promptButton} activeOpacity={0.8} onPress={()=>handleNavigation('RegisterStudent')}>
              <Text style={styles.promptButtonText}>Student</Text>
          </TouchableOpacity>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems:'center'
    },
    prompt: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
        marginTop:40
    },
    promptButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "center", 
        backgroundColor: "#000",
        opacity: 0.8,
        margin:10
    },
    promptButtonText: {
        fontSize: 18,
        color:"#fff"
    },
    welcomeText: {
        color: "#000",
        fontSize: 20,
        textAlign:"center",
    }
})