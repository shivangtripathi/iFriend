import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Home,Screen2,Screen3 } from "../screens";

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarShowLabel: false,
        backgroundColor: "white",
        tabBarStyle: {
          marginHorizontal: 0,
           
          marginBottom: 10,
          marginLeft:10,
          marginRight:10,
          borderRadius: 20,
          height: 55,
          borderTopColor: "black",
          borderTopWidth: 0,
          backgroundColor: "skyblue",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View style={{ alignItems: "center" ,flex:1,justifyContent:'center'}}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: "darkblue",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  HOME
                </Text>
              </View>
            );
          },
        }}
        name="HomePage"
        component={Home}
      />
     
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: "darkblue",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  SCREEN2
                </Text>
              </View>
            );
          },
        }}
        name="Screen2"
        component={Screen2}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: "darkblue",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  SCREEN3
                </Text>
              </View>
            );
          },
        }}
        name="Screen3"
        component={Screen3}
      />

    </Tab.Navigator>
  );
}