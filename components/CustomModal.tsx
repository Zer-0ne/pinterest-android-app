import { View, Text, FlexAlignType, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../utils/styles'
import { ScrollView } from 'react-native';

const CustomModal = ({ isDark, children }: { isDark: boolean; children: React.ReactNode }) => {
    return (
        <View
            style={{
                // backgroundColor:'red',
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center' as FlexAlignType
            } as ViewStyle}
        >
            <ScrollView
                style={{
                    width: '80%',
                    minHeight: 300,
                    maxHeight: 450,
                    backgroundColor: isDark ? colors.postCardContainerColor : colors.postCardContainerColorLight,
                    shadowColor: 'black',
                    elevation: 5,
                    borderRadius: 15,
                    padding:10
                }}
            >
                {children}
            </ScrollView>
        </View>
    )
}

export default CustomModal