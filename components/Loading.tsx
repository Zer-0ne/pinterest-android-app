import { View, Text } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer'
import { useColorScheme } from 'react-native'
import { colors, commonStyle } from '../utils/styles'
import { Animated } from 'react-native'
import { Easing } from 'react-native'

const Loading = () => {
    const isDark = useColorScheme() === 'dark';
    const [spinAnim, setSpinAnim] = React.useState(new Animated.Value(0));
    const spin = spinAnim.interpolate({
        inputRange: [0, .5, .7, 1],
        outputRange: ['0deg', '360deg'],
    });

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    });
    return (
        <BodyContainer>
            <Animated.View
                style={commonStyle.loaderContainer(isDark, spin)}
            >
                <View
                    style={{
                        ...commonStyle.loaderBall(isDark),
                        bottom: 10,
                        right: 10
                    }}
                ></View>
                <View
                    style={{
                        ...commonStyle.loaderBall(isDark),
                        top: 10,
                        right: 10
                    }}
                ></View>
                <View
                    style={{
                        ...commonStyle.loaderBall(isDark),
                        top: 10,
                        left: 10
                    }}
                ></View>
                <View
                    style={{
                        ...commonStyle.loaderBall(isDark),
                        bottom: 10,
                        left: 10
                    }}
                ></View>
            </Animated.View>
        </BodyContainer >
    )
}

export default Loading