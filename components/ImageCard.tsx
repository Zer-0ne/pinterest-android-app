import React, { useMemo } from 'react'
import { Dimensions, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import { itemProps } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

const ImageCard = ({ item }: {
    item: itemProps;
}) => {
    const navigation = useNavigation()
    // console.log(item.image)
    return (
        <>
            <TouchableOpacity
                style={{
                    margin: 7,
                    marginStart: 5,
                    marginEnd: 5,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:'red'
                }}
                onPress={() => {
                    navigation.navigate("Post" as string, {
                        item: item._id,
                        authorId: item.authorId
                    })
                }}
            >
                <AutoHeightImage style={{ borderRadius: 16, }} source={{ uri: item && item.image }} width={Dimensions.get('window').width / 2 - 10} />
            </TouchableOpacity >
        </>
    )
}

export default ImageCard