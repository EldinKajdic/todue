import React from "react";
import Home from "./components/Home";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Invoice from "./components/Invoice";
import Create from "./components/Create";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Hem",
            headerStyle: {
              backgroundColor: "#3270c7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="Invoice"
          component={Invoice}
          options={{
            title: "Fakturadetaljer",
            headerStyle: {
              backgroundColor: "#3270c7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            title: "Ny faktura",
            headerStyle: {
              backgroundColor: "#3270c7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
