import { View, Text } from 'react-native'
import React from 'react'
import { commentProps, userProps } from '../utils/constants'
import { singleUser } from '../utils/fetchFromApi'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from '@react-native-material/core'
import { NavigationProp, useNavigation } from '@react-navigation/native'


const Comments = ({ item, isDark }: { item: commentProps, isDark: boolean }) => {
    const [commentData, setCommentData] = React.useState<userProps>()
    const fetchPost = async () => {
        const data = await singleUser(item.userId)
        setCommentData(data)
    }
    React.useEffect(() => {
        fetchPost()
    }, [])
    const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingTop: 10,
                paddingBottom: 10,
                gap: 6,
            }}
        >
            {
                commentData && <Avatar
                    image={{ uri: commentData.image }}
                    size={37}
                />
            }
            <View
                style={{
                    display: 'flex',
                    gap: 2,

                }}
            >
                <TouchableOpacity
                    style={{
                        marginEnd: 4,
                    }}
                    onPress={() => navigation.navigate('Profile', {
                        id: item.userId,
                    })}
                >

                    <Text
                        style={{
                            fontWeight: '500',
                            color: isDark ? 'white' : 'black',
                            fontSize: 11

                        }}
                    >
                        {commentData && commentData.name}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        color: isDark ? 'white' : 'black',
                        fontWeight: '300',
                        fontSize: 13,
                        paddingTop: 3,
                        flex: 1, flexWrap: 'wrap', flexShrink: 1,
                        maxWidth: "90%",
                        padding: 2,
                        // paddingStart:3,

                    }}
                >
                    {item.comment}
                </Text>
            </View>
        </View>
    )
}

export default Comments