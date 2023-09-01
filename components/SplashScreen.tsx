import { View, Text, Linking } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer'
import { Image } from 'react-native'
import logo from '../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useColorScheme } from 'react-native'
import { colors } from '../utils/styles'
const SplashScreen = () => {
    const [opacity, setOpacity] = React.useState(.5)
    const isDark = useColorScheme() === 'dark'
    setTimeout(() => {
        setOpacity(1)
    }, 1000);
    return (
        <BodyContainer>
            {/* <Text style={{ color: 'red' }}>SplashScreen</Text> */}
            <View
                style={{
                    elevation: 5,
                    shadowColor: isDark ? colors.transparentWhite : colors.transparentBlack
                }}
            >

                <Image
                    source={logo}
                    style={{
                        width: 500,
                        height: 500,
                        opacity: opacity,
                    }}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    gap: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Text
                    style={{
                        color: isDark ? colors.transparentWhite : colors.transparentBlack
                    }}
                >From</Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: isDark ? 'white' : 'black'
                    }}
                    onPress={() => Linking.openURL('https://zer0n3.vercel.app/')}
                >Zer-0ne</Text>
            </View>
        </BodyContainer>
    )
}

export default SplashScreen