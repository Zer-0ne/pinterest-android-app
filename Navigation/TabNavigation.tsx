import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SessionProps, navbar, userProps } from '../utils/constants'
import { colors } from '../utils/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import LoginSignUp from '../components/LoginSignUp'
import { signOut } from '../utils/fetchFromApi'
const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    const [session, setSession] = React.useState<SessionProps | null | undefined>()
    const isDark = useColorScheme() === 'dark'
    const handleSession = async () => {
        const sessionUser = await AsyncStorage.getItem('session') as string
        setSession(JSON.parse(sessionUser))
    }
    const isFocused = useIsFocused()
    // handleSession()
    React.useEffect(() => {
        handleSession()
    }, [isFocused]);
    return (
        <Tab.Navigator
            screenListeners={{
                state: (e) => {
                    // Do something with the state
                    handleSession()
                },
            }}
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
                    zIndex: 1000,
                    elevation: 0
                },
                headerShown: false
            }}
        >

            {
                navbar.map((item, index) => (
                    <Tab.Screen key={index} name={item.name} component={['profileStack', 'create'].includes(item.name) ? session ?  item.component :  LoginSignUp : item.component} options={{
                        tabBarIcon: ({ focused, color }: { focused: boolean, color: string }) => (
                            <>
                                <View
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    {
                                        item.icon(focused, color, isDark, session)
                                    }
                                </View>
                            </>
                        ),
                    }}

                        initialParams={(item.name === 'profileStack') && (session && session.user)}
                    />
                ))
            }
        </Tab.Navigator >
    )
}

export default TabNavigation