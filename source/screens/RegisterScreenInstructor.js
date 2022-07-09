import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React,{ useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'

const RegisterScreenInstructor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpassword, setcPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
                <CustomTextInput label={"Name"} onChangeText={(name) => setName(name)} value={ name } />
                <CustomTextInput label={"Email"} onChangeText={(email) => setEmail(email)} value={ email }/>
                <CustomTextInput label={"Password"} onChangeText={(pass) => setPassword(pass)} value={password} secure={ true} />
                <CustomTextInput label={"Confirm Password"} onChangeText={(pass) => setcPassword(pass)} value={cpassword} secure={ true} />
                <TouchableOpacity style={styles.registerButton} activeOpacity={0.8}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

            {/* login button */}
            <View>
                <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
                <Text style={styles.loginButtonText}>Already a member ? Login</Text>
            </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )  
 

}

export default RegisterScreenInstructor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    registerButton: {
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: "center",
        marginHorizontal: 20,
        marginVertical:20
        
    },  
    registerButtonText: {
        fontSize: 16,
        color:"#fff"
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: "center",
    },
    loginButtonText: {
        color: "#000",
        fontSize:14,
    },
})