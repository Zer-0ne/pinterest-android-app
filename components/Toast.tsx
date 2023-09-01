import { View, Text } from 'react-native'
import React from 'react'
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'

const Toast = ({ options }: ToastProps) => {
    console.log(options)
    return (
        <View>
            <Text>Toast</Text>
        </View>
    )
}

export default Toast