import React, { useEffect } from 'react'
import { FlexAlignType, ScrollView, Text, Touchable, View, ViewStyle, useColorScheme } from 'react-native'
import { SessionProps, commentProps, data, itemProps, userProps } from '../utils/constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { deletePin, editPin, follow, pins, singlePin, singleUser } from '../utils/fetchFromApi'
import { colors, commonStyle } from '../utils/styles'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from '@react-native-material/core'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Comments from './Comments'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginSignUp from './LoginSignUp'
import CustomModal from './CustomModal'
import PostForm from './PostForm'
import PostCardLoading from './PostCardLoading'
import { useToast } from 'react-native-toast-notifications'
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
    const [postDetail, setPostDetail] = React.useState<data>()
    const [postUser, setPostUser] = React.useState<userProps>()
    const [isEdit, setIsEdit] = React.useState(false)
    const [dataToBeEdit, setDataToBeEdit] = React.useState<data>({})
    const [Data, setdata] = React.useState([])
    const [userSession, setUserSession] = React.useState<userProps>()
    const [isLoading, setIsLoading] = React.useState(true)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const toast = useToast();
    const navigation = useNavigation()


    const session = async () => {
        const sessionUser = await AsyncStorage.getItem('session') as string
        const json = JSON.parse(sessionUser)
        const sessionUserDetail = await singleUser(json.user.id)
        setUserSession(sessionUserDetail)
        return sessionUser
    }


    const fetchPost = async () => {
        const data = await singlePin(id)
        setPostDetail(data)
        setDataToBeEdit(data)
        const postUser1 = await singleUser(route?.params?.authorId)
        setPostUser(postUser1)
        setIsLoading(false)
    }

    const fetch = async () => {
        const Pins = await pins()
        setdata(Pins?.Pin)
    }
    const filterPost = (postDetail: string) => {
        const searchTerm = postDetail
        return Data.filter((pin: data) => {
            const tagMatch = pin.tag.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = pin.Description.toLowerCase().includes(searchTerm.toLowerCase());
            const titleMatch = pin.title.toLowerCase().includes(searchTerm.toLowerCase());

            return tagMatch || descriptionMatch || titleMatch;
        });
    }
    // console.log(filterPost('islam'))
    useEffect(() => {

        fetchPost()
        fetch()
        session()
    }, [id])

    // loading 
    if (isLoading) {
        return (
            <PostCardLoading />
        )
    }

    // handle post delete 
    const handleDeletePost = async () => {
        if (!session) {
            return (
                <LoginSignUp />
            )
        }
        const sessionUser = await session()
        if (sessionUser) {
            let id = toast.show("please wait...");
            const sessionUserData = await JSON.parse(sessionUser)
            const loginUser = await singleUser(sessionUserData.user.id)
            if (postDetail && sessionUserData.id === postDetail.authorId || loginUser.isAdmin) {
                postDetail && await deletePin(postDetail._id, toast, id)
                return
            }
        }
        console.log('you are not authorized to delete this pin')
        return

    }

    // handle change 
    const handleChange = (value: string, name: string) => {
        setDataToBeEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    // edit the post 
    const handleEditPost = async () => {
        if (!session) {
            return (
                <LoginSignUp />
            )
        }
        const sessionUser = await session()
        if (sessionUser) {
            let id = toast.show("please wait...");
            setIsDisabled(true)
            const sessionUserData = await JSON.parse(sessionUser)
            const loginUser = await singleUser(sessionUserData.user.id)
            if (postDetail) {
                const changedValues = Object.entries(dataToBeEdit)
                    .filter(([key, value]) => value !== postDetail[key] as string)
                    .reduce((obj, [key, value]) => {
                        obj[key] = value;
                        return obj;
                    }, {} as data);
                if (postDetail && sessionUserData.id === postDetail.authorId || loginUser.isAdmin) {
                    postDetail && await editPin(postDetail._id, changedValues, toast, id)
                    setIsEdit(false)
                    fetchPost()
                    setIsDisabled(false)
                    return
                }
            }
        }
        console.log('you are not authorized to delete this pin')
        setIsDisabled(false)
        return
    }
    // console.log(dataToBeEdit)

    const handleFollow = async () => {
        try {
            console.log(postUser?.id);
            await follow(postUser?.id as string);
            await fetchPost()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <View
                style={{
                    backgroundColor: isDark ? 'black' : colors.whiteBackground,
                    flex: 1
                }}
            >
                {
                    isEdit ? <>
                        {/* <CustomModal isDark={isDark}> */}
                        <PostForm
                            data={dataToBeEdit as data}
                            setPostForm={setIsEdit}
                            handleChange={handleChange}
                            handleCreatePost={handleEditPost}
                            btnDisabled={isDisabled}
                        />
                        {/* </CustomModal> */}
                    </> :
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

                                                {
                                                    (userSession?.id === postUser?.id || userSession?.isAdmin) &&
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={handleDeletePost}
                                                        >
                                                            <MaterialCommunityIcons
                                                                name='delete'
                                                                style={commonStyle.postCardBtn(isDark)}
                                                            />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => setIsEdit(true)}
                                                        >
                                                            <Feather
                                                                name='edit'
                                                                style={commonStyle.postCardBtn(isDark)}
                                                            />
                                                        </TouchableOpacity>
                                                    </>
                                                }
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
                                                                borderRadius: 10,
                                                                display: (userSession?.id === route?.params?.authorId)?'none':'flex'
                                                            }}
                                                            onPress={handleFollow}
                                                        >
                                                            <Text>
                                                                {
                                                                    (postUser?.followers?.some(async (follow: any) => {
                                                                        const sessionuser = await session() as string;
                                                                        const userDetail = JSON.parse(sessionuser)
                                                                        follow.userId === userDetail?.user?.id
                                                                    })) ? 'UNFOLLOW' : 'FOLLOW'
                                                                }
                                                            </Text>
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
                }
            </View >

        </>
    )
}

export default PostCard;