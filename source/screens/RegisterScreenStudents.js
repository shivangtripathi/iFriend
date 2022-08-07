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

const RegisterScreenStudents = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [cid, setcId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [batch, setBatch] = useState('');

  const handleRegister = async () => {
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
          };
          firestore().collection('users').doc(user.uid).set(userDetail);
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
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Already a member ? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreenStudents;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  registerButton: {
    backgroundColor: '#000',
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
