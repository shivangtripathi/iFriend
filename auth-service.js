import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

export function login(email,password){
    auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log('User account created & signed in!');
    }).catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

export function signUp(email,password,details) {
    auth().createUserWithEmailAndPassword(email, password).then((data) => {
        console.log('data', data);
    })
}