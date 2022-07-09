import React, { Component } from 'react';
import { Easing, Animated, SafeAreaView,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    
    Home,
    RegisterScreenInstructor,
    RegisterScreenStudents,
    Landing,

} from './screens';

const Stack = createNativeStackNavigator();


function BaseStack() {
    return (
        <Stack.Navigator screenOptions={{ gestureEnabled: true }} initialRouteName="Landing">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: true, animationEnabled: false ,animationTypeForReplace:'pop',title:''}}
            />
            <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ headerShown: true, animationEnabled: false ,animationTypeForReplace:'pop',title:''}}
            />
            <Stack.Screen
                name="RegisterStudent"
                component={RegisterScreenStudents}
                options={{ headerShown: true, animationEnabled: false ,animationTypeForReplace:'pop',title:'Register (Students)'}}
            />
            <Stack.Screen
                name="RegisterInstructor"
                component={RegisterScreenInstructor}
                options={{ headerShown: true, animationEnabled: false ,animationTypeForReplace:'pop',title:'Register (Instructor)'}}
            />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <BaseStack />
        </NavigationContainer>
    );
}
