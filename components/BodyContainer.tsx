import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { colors } from '../utils/styles'

const BodyContainer = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const isDark = useColorScheme() === 'dark'
    return (
        <View
            style={{
                backgroundColor: isDark ? 'black' : colors.whiteBackground,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {children}
        </View>
    )
}

export default BodyContainer