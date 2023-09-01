import { View, Text } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer';
import { useColorScheme } from 'react-native';
import { colors } from '../utils/styles';
import LoadingSkeleton from './LoadingSkeleton';

const PostCardLoading = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <BodyContainer>
            <LoadingSkeleton>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                    <View style={{ width: 350, height: 300, borderRadius: 16 }} />
                    <View style={{ width: 350, height: 50, borderRadius: 10 }} />
                    <View style={{ width: 350, height: 30, borderRadius: 10 }} />
                    <View
                        style={{
                            width: 350, height: 50, borderRadius: 16,
                            flexDirection: 'row',
                            gap: 10
                        }}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                padding: 10
                            }}
                        />
                        <View
                            style={{
                                width: 200,
                                height: 48,
                                borderRadius: 16
                            }}
                        />

                    </View>
                    {/* </View> */}
                    <View style={{ width: 350, height: 200, borderRadius: 10 }} />
                </View>
            </LoadingSkeleton>
        </BodyContainer >
    )
}

export default PostCardLoading