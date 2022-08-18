import React, {Component} from 'react';
import {Easing, Animated, SafeAreaView, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Home,
  RegisterScreenInstructor,
  RegisterScreenStudents,
  Landing,
  Screen2,
  Screen3,
  AddEventsScreen,
  LoginScreenInstructor,
  LoginScreenStudent
} from './screens';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BaseStack() {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: true}}
      initialRouteName="Landing">
      <Stack.Screen
        name="HomeStack"
        component={HomeTabs}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: '',
        }}
      />
      <Stack.Screen
        name="LoginStudent"
        component={LoginScreenStudent}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: 'Login (Student)',
        }}
      />
      <Stack.Screen
        name="LoginInstructor"
        component={LoginScreenInstructor}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: 'Login (Instructor)',
        }}
      />
      <Stack.Screen
        name="RegisterStudent"
        component={RegisterScreenStudents}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: 'Register (Students)',
        }}
      />
      <Stack.Screen
        name="RegisterInstructor"
        component={RegisterScreenInstructor}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: 'Register (Instructor)',
        }}
      />
    </Stack.Navigator>
  );
}

const InstructorStack = createNativeStackNavigator();
function InstructorHomeTab() {
  return (
    <InstructorStack.Navigator
      screenOptions={{gestureEnabled: true}}
      initialRouteName="HomeScreen">
      <InstructorStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <InstructorStack.Screen
        name="AddEvent"
        component={AddEventsScreen}
        options={{
          headerShown: true,
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          title: 'Add events',
        }}
      />
    </InstructorStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#601a35',
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 55,
          marginHorizontal: 0,
          backgroundColor: 'white',
          borderTopColor: '#000',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          letterSpacing: 1,
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={focused ? '#fff' : '#000'}
              />
            );
          },
        }}
        name="Home"
        component={InstructorHomeTab}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            return (
              <MaterialCommunityIcons
                name="google-classroom"
                size={24}
                color={focused ? '#fff' : '#000'}
              />
            );
          },
        }}
        name="Groups"
        component={Screen2}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            return (
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                color={focused ? '#fff' : '#000'}
              />
            );
          },
        }}
        name="Info"
        component={Screen3}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BaseStack />
    </NavigationContainer>
  );
}
