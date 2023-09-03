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
                    marginStart:10,
                    marginEnd:10,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    navigation.navigate("Post", {
                        item: item._id,
                        authorId: item.authorId
                    })
                }}
            >
                <AutoHeightImage style={{ borderRadius: 16, }} source={{ uri: item && item.image }} width={175} />
            </TouchableOpacity >
        </>
    )
}

export default ImageCard