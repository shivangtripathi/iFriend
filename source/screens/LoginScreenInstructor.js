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

const LoginScreenInstructor = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.endsWith('@thapar.edu')) {
      Alert.alert('Invalid Email', 'use thapar provided email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ,
      ]);
      return;
    }
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          firestore()
            .collection('instructors')
            .doc(user.user.uid)
            .get()
            .then(userData => {
             let userDetails = userData.data();
              props.change_variable('user_type', "instructor");
              props.change_variable('name', userDetails.name);
              navigation.navigate('HomeStack');
            });
        })
        .catch(err => console.log('error login instructor', err));
    } catch (err) {
      console.log('error login instructor', err);
    }
  };
  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView style={styles.container}>
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
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.8}
          onPress={handleLogin}>
          <Text style={styles.registerButtonText}>Login</Text>
        </TouchableOpacity>

        {/* login button */}
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RegisterInstructor')}>
            <Text style={styles.loginButtonText}>Not a member ? Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 40,
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
})(LoginScreenInstructor);
