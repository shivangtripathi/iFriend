import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {change_variable} from '../actions';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';

const Screen3 = props => {
  const Navigation = useNavigation();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [id, setId] = useState(null);

  async function SignOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('Error==>', error));
    Navigation.navigate('Landing');
  }
  useEffect(() => {
    let user = auth().currentUser;
    setName(props.user.displayName);
    setEmail(props.user.email);
    console.log(props.user);
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.infostyle}>
        <View style={styles.textstyle}>
          <Text style={styles.textt}>{Email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={SignOut} style={styles.logoutbutton}>
        <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infostyle: {
    marginTop: 40,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#601a35',
  },
  textt: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  textstyle: {
    alignSelf: 'center',
  },
  logoutbutton: {
    marginTop: 40,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '80%',
    backgroundColor: '#601a35',
    borderRadius: 20,
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
})(Screen3);
