import React, { useMemo } from 'react'
import { Text, TouchableOpacity } from 'react-native'
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
                    borderRadius: 16,
                    overflow: 'hidden'
                }}
                onPress={() => {
                    navigation.navigate("Post", {
                        item: item._id,
                        authorId: item.authorId
                    })
                }}
            >
                <AutoHeightImage source={{ uri: item && item.image }} width={191} />
            </TouchableOpacity >
        </>
    )
}

export default ImageCard