import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {change_variable} from '../actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const RegisterScreenStudents = props => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [cid, setcId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [batch, setBatch] = useState('');

  const navigation = useNavigation();

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
            roll: id,
            batch,
            user_id: uid,
            displayName: 'student',
          };
          user.user.updateProfile({
            displayName: 'student',
          })
          props.change_variable('user', userDetail);
          props.change_variable('user_type', 'student');
          firestore().collection('users').doc(user.user.uid).set(userDetail);
        })
        .then(async () => {
          await AsyncStorage.setItem('authenicated', JSON.stringify(true));
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(auth().currentUser),
          );
          navigation.navigate('HomeStack');
        })
        .catch(err => Alert.alert(err));
    } catch (err) {
      console.log('err', err);
      //do whatever
    }
  };

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView style={styles.container}>
        <View>
          <CustomTextInput
            label={'Name'}
            onChangeText={name => setName(name)}
            value={name}
          />
          <CustomTextInput
            label={'Student Id'}
            onChangeText={id => setId(id)}
            value={id}
          />
          <CustomTextInput
            label={'Confirm Student Id'}
            onChangeText={id => setcId(id)}
            value={cid}
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
          <CustomTextInput
            label={'Batch'}
            onChangeText={txt => setBatch(txt)}
            value={batch}
          />
          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.8}
            onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        {/* login button */}
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('LoginStudent')}>
            <Text style={styles.loginButtonText}>Already a member ? Login</Text>
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
})(RegisterScreenStudents);
