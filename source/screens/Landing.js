import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

const Landing = (props) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    const user = auth().currentUser;
    if (user) {
      if (user.displayName === 'student') {
        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(userData => {
            let userDetails = userData.data();
            props.change_variable('subBatch', userDetails.batch);
            props.change_variable('name', userDetails.name);
            props.change_variable('user_type', 'student');
          });
      } else if (user.displayName === 'instructor') {
        firestore()
          .collection('instructors')
          .doc(user.uid)
          .get()
          .then(userData => {
            let userDetails = userData.data();
            props.change_variable('user_type', 'instructor');
            props.change_variable('name', userDetails.name);
          });
      }
      navigation.navigate('HomeStack');
    }
  }, []);
  const handleNavigation = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to {'\n'}
        <Text
          style={{
            color: '#601a35',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          iFriends
        </Text>
      </Text>
      <Text style={styles.prompt}>Are you a </Text>
      <TouchableOpacity
        style={styles.promptButton}
        activeOpacity={0.8}
        onPress={() => handleNavigation('LoginInstructor')}>
        <Text style={styles.promptButtonText}>Instructor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.promptButton}
        activeOpacity={0.8}
        onPress={() => handleNavigation('LoginStudent')}>
        <Text style={styles.promptButtonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  prompt: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 40,
  },
  promptButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#601a35',
    opacity: 0.8,
    margin: 10,
  },
  promptButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  welcomeText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});


export default connect(null, {
  change_variable,
})(Landing);
