import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {change_variable} from '../actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const RegisterScreenInstructor = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setcPassword] = useState('');

  const handleRegister = async () => {
    if (!email.endsWith('@thapar.edu')) {
      Alert.alert('Invalid Email', 'use thapar provided email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ,
      ]);
      return;
    }
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          const uid = user.user.uid;
          const userDetail = {
            name,
            email: email,
            user_id: uid,
            displayName: 'instructor',
          };
          user.user.updateProfile({
            displayName: 'instructor',
          });
          firestore()
            .collection('instructors')
            .doc(auth().currentUser.uid)
            .set(userDetail);
          props.change_variable('user', userDetail);
          props.change_variable('user_type', 'instructor');
        })
        .then(async () => {
          await AsyncStorage.setItem('authenicated', JSON.stringify(true));
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(auth().currentUser),
          );
          navigation.navigate('HomeStack');
        })
        .catch(err => console.log('Error in user registration', err));
    } catch (err) {
      console.log('Error in user registration', err);
      //do whatever
    }
  };

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView style={styles.container}>
        <CustomTextInput
          label={'Name'}
          onChangeText={name => setName(name)}
          value={name}
        />
        <CustomTextInput
          label={'Email'}
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <CustomTextInput
          label={'Password'}
          onChangeText={pass => setPassword(pass)}
          value={password}
          secure={true}
        />
        <CustomTextInput
          label={'Confirm Password'}
          onChangeText={pass => setcPassword(pass)}
          value={cpassword}
          secure={true}
        />
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.8}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* login button */}
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('LoginInstructor')}>
            <Text style={styles.loginButtonText}>Already a member ? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  registerButton: {
    backgroundColor: '#601a35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 14,
  },
});

const mapStateToProps = state => {
  const {
    user,
    user_type,
    authenticated,
    batchCode,
    subBatchCode,
    enrollNumber,
    loading,
  } = state.variables;

  return {
    user,
    user_type,
    authenticated,
    batchCode,
    subBatchCode,
    enrollNumber,
    loading,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(RegisterScreenInstructor);
