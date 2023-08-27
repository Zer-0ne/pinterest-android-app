import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navbar } from '../utils/constants'
import { colors } from '../utils/styles'
const Tab = createBottomTabNavigator()
const TabNavigation = () => {
    const isDark = useColorScheme() === 'dark'
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? colors.lightBlack : colors.lightWhite,
                    position: 'absolute',
                    bottom: 20,
                    borderRadius: 25,
                    marginStart: 40,
                    marginEnd: 40,
                    // overflow: 'hidden',
                    margin: 'auto',
                    height: 70,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'transparent',
                    zIndex:1000
                },
                headerShown: false
            }}
        >

            {
                navbar.map((item, index) => (
                    <Tab.Screen key={index} name={item.name} component={item.component} options={{
                        tabBarIcon: ({ focused, color }: { focused: boolean, color: string }) => (
                            <>
                                <View
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    {
                                        item.icon(focused, color, isDark)
                                    }
                                </View>
                            </>
                        ),
                    }} />
                ))
            }
        </Tab.Navigator>
    )
}

export default TabNavigation