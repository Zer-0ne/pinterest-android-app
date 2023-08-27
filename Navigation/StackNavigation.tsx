import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/Home'
import TabNavigation from './TabNavigation'
import PostCard from '../components/PostCard'
import Profile from '../components/Profile'

const Stack = createStackNavigator()
const MainStack = () => {
    return (

        <Stack.Navigator initialRouteName='Tabs' screenOptions={{ headerShown: false }} >
            <Stack.Screen
                name='Tabs'
                component={TabNavigation}
            />
        </Stack.Navigator>
    )
}
const PinStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            // initialRouteName='Home'
        >
            <Stack.Screen
                name='Home'
                component={Home}
            />
            <Stack.Screen
                name='Post'
                component={PostCard}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
            />
        </Stack.Navigator>
    )
}

export { MainStack, PinStack }