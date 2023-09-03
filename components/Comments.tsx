import { View, Text } from 'react-native'
import React from 'react'
import { commentProps, userProps } from '../utils/constants'
import { deleteComment, singleUser } from '../utils/fetchFromApi'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from '@react-native-material/core'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { commonStyle } from '../utils/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Comments = ({
    item,
    isDark,
    userSession,
    fetchpost,
    authorId
}: {
    item: commentProps,
    isDark: boolean,
    userSession: userProps;
    fetchpost: () => Promise<void>
    authorId: string
}) => {
    const [commentData, setCommentData] = React.useState<userProps>()
    const fetchPost = async () => {
        const data = await singleUser(item.userId)
        setCommentData(data)
    }
    React.useEffect(() => {
        fetchPost()
    }, [])
    const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()

    const handleDelete = async () => {
        try {
            if (userSession) {
                await deleteComment(item._id, authorId, item.userId, userSession);
                await fetchpost()
                return
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'center',
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
                    style={{
                    }}
                />
            }
            <View
                style={{
                    display: 'flex',
                    gap: 2,
                    flex: 4
                }}
            >
                <TouchableOpacity
                    style={{
                        marginEnd: 4,
                        flexDirection:'row',
                        gap:5,
                        alignItems:'center'
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
                    {
                        (commentData?.isAdmin) ? <>
                            <MaterialIcons
                                name='verified-user'
                                style={commonStyle.verifiedBtn(11)}
                            />
                            <MaterialIcons
                                name='verified'
                                style={commonStyle.verifiedBtn(11)}
                            />
                        </> : <></>
                    }
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
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    display: (authorId === userSession?.id || item._id === userSession?.id || userSession?.isAdmin) ? 'flex' : 'none'
                }}
                onPress={handleDelete}
            >
                <MaterialCommunityIcons
                    name='delete'
                    style={commonStyle.postCardBtn(isDark)}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Comments