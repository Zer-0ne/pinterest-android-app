import { View, Text } from 'react-native'
import React from 'react'
import LoadingSkeleton from './LoadingSkeleton'
import BodyContainer from './BodyContainer'
import { ScrollView } from 'react-native-gesture-handler'

const ProfileLoading = () => {
    return (
        <BodyContainer>
            <LoadingSkeleton>
                <View
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        gap:10,
                        padding:10
                    }}
                >

                    <View
                        style={{
                            width: 110,
                            height: 110,
                            borderRadius: 110 / 2
                        }}
                    />
                    <View
                        style={{
                            width: 80,
                            height: 15,
                            borderRadius: 10
                        }}
                    />
                    <View
                        style={{
                            width: 50,
                            height: 10,
                            borderRadius: 10
                        }}
                    />
                    <View
                        style={{
                            width: 150,
                            height: 10,
                            borderRadius: 10,
                            marginTop:10
                        }}
                    />
                    <ScrollView
                        style={{
                            width: 350,
                            height: 490,
                            borderRadius: 16,
                            marginTop:5
                        }}
                    />
                    
                </View>
            </LoadingSkeleton>
        </BodyContainer>
    )
}

export default ProfileLoading