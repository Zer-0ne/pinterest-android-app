import React, { useEffect } from 'react'
import { FlexAlignType, ScrollView, Text, Touchable, View, ViewStyle, useColorScheme } from 'react-native'
import { commentProps, itemProps, userProps } from '../utils/constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { singlePin, singleUser } from '../utils/fetchFromApi'
import { colors, commonStyle } from '../utils/styles'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from '@react-native-material/core'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Comments from './Comments'
interface idProps {
    params: {
        item: string;
        authorId: string;
    }
}
const PostCard = () => {
    const route = useRoute() as idProps
    const isDark = useColorScheme() === 'dark'
    const id = route?.params?.item as string
    const [postDetail, setPostDetail] = React.useState<itemProps>()
    const [postUser, setPostUser] = React.useState<userProps>()
    const navigation = useNavigation()
    const fetchPost = async () => {
        const data = await singlePin(id)
        setPostDetail(data)
        const postUser = await singleUser(route?.params?.authorId)
        setPostUser(postUser)
    }
    useEffect(() => {
        fetchPost()
    }, [id])
    // console.log(postDetail)
    return (
        <>
            <View
                style={{
                    backgroundColor: isDark ? 'black' : colors.whiteBackground,
                    flex: 1
                }}
            >

                <ScrollView
                    style={{
                        minHeight: '100%',
                        flex: 1
                    }}
                    nestedScrollEnabled={true}
                >
                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            paddingBottom: 140
                        }}
                    >
                        <View
                            style={[
                                commonStyle.cardStyle(isDark),
                                {
                                    marginTop: 35,
                                }
                            ]}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '98%',
                                    borderRadius: 15,
                                    overflow: 'hidden',
                                    marginTop: 2,
                                    marginBottom: 2
                                }}
                            >
                                {
                                    postDetail &&
                                    <AutoHeightImage
                                        source={{
                                            uri: postDetail.image
                                        }}
                                        width={303}
                                    />
                                }
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    width: '98%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        width: '90%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: 8
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            // flex:1
                                            gap: 10,
                                            alignItem: 'center' as FlexAlignType,
                                            alignText: 'center'

                                        } as ViewStyle}
                                    >
                                        <Ionicons
                                            name='link'
                                            style={commonStyle.postCardBtn(isDark)}
                                        />
                                        <MaterialCommunityIcons
                                            name='delete'
                                            style={commonStyle.postCardBtn(isDark)}
                                        />
                                        <Feather
                                            name='edit'
                                            style={commonStyle.postCardBtn(isDark)}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={commonStyle.saveBtn}
                                    >
                                        <Text
                                            style={commonStyle.saveBtnText(isDark)}
                                        >Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* title and desc container */}
                        <View
                            style={{
                                ...commonStyle.cardStyle(isDark),
                                marginTop: 15,
                            } as ViewStyle}
                        >
                            <View
                                style={{
                                    width: '90%',
                                    alignItems: 'start' as FlexAlignType,
                                    gap: 5
                                }}
                            >
                                <Text
                                    style={{ fontSize: 25, fontWeight: 'bold', color: isDark ? 'white' : 'black' }}
                                >
                                    {postDetail && postDetail.title}
                                </Text>
                                <Text
                                    style={{ fontSize: 15, color: isDark ? colors.darkGray : 'black' }}
                                >
                                    {postDetail && postDetail.Description}
                                </Text>
                                <View
                                    style={{
                                        marginTop: 17,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: 14,
                                            width: '100%',
                                            alignItems: 'center'
                                        }}
                                    >

                                        {
                                            postUser &&
                                            <>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 12
                                                    }}
                                                >

                                                    <Avatar
                                                        image={{ uri: postUser.image }}
                                                        size={40}
                                                    />
                                                    <View>
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                gap: 4,
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => navigation.navigate('Profile', {
                                                                    id: route?.params?.authorId,
                                                                })}
                                                            >

                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                        color: isDark ? 'white' : 'black'
                                                                    }}
                                                                >
                                                                    {postUser.name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            {
                                                                (postUser.isAdmin) ? <>
                                                                    <MaterialIcons
                                                                        name='verified-user'
                                                                        style={commonStyle.verifiedBtn}
                                                                    />
                                                                    <MaterialIcons
                                                                        name='verified'
                                                                        style={commonStyle.verifiedBtn}
                                                                    />
                                                                </> : <></>
                                                            }
                                                        </View>
                                                        <Text
                                                            style={{
                                                                fontSize: 11,
                                                                color: isDark ? colors.darkGray : 'black'
                                                            }}
                                                        >
                                                            {postUser.username}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    style={{
                                                        padding: 5,
                                                        paddingStart: 10,
                                                        paddingEnd: 10,
                                                        backgroundColor: colors.darkGray,
                                                        borderRadius: 10
                                                    }}
                                                >
                                                    <Text>Follow</Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* comment container */}
                        <View
                            style={{
                                ...commonStyle.cardStyle(isDark),
                                marginTop: 15,
                            } as ViewStyle}
                        >
                            <View
                                style={{
                                    width: '90%',
                                    alignItems: 'start' as FlexAlignType,
                                    gap: 5,
                                    minHeight: 200,
                                    maxHeight: 250,
                                    overflow: 'hidden'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: isDark ? colors.darkGray : 'black',
                                    }}
                                >
                                    Comments
                                </Text>
                                <View style={{ flex: 1 }}>
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        style={{
                                            padding: 3,
                                            paddingTop: 5,
                                            paddingBottom: 5,

                                        }}
                                    >
                                        {
                                            postDetail && postDetail.comments.map((item: commentProps, index: number) => (
                                                <Comments
                                                    item={item}
                                                    key={index}
                                                    isDark={isDark}
                                                />
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        </>
    )
}

export default PostCard;