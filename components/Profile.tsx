import { useIsFocused, useNavigation, useRoute, } from '@react-navigation/native'
import React from 'react'
import { FlexAlignType, ScrollView, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native'
import { itemProps, userProps } from '../utils/constants';
import { signOut, singleUser, userPins } from '../utils/fetchFromApi';
import { Avatar } from '@react-native-material/core';
import { colors, commonStyle } from '../utils/styles';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCard from './ImageCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSignUp from './LoginSignUp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileLoading from './ProfileLoading';

interface idProps {
    params: {
        id: string;
    },
    name: string
}
const Profile = () => {
    const isDark = useColorScheme() === 'dark'
    const [isLoading, setIsLoading] = React.useState(true)
    const route = useRoute() as idProps
    const [user, setUser] = React.useState<userProps>()
    const [Data, setData] = React.useState([])
    const [sessionUser, setSessionUser] = React.useState('')
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    // console.log(route)
    const fetchUser = async () => {
        const data = await singleUser(route.params.id)
        setUser(data)
        setIsLoading(false)
    }
    const session = async () => {
        const sessionUserData = await AsyncStorage.getItem('session')
        sessionUserData && setSessionUser(sessionUserData)

        return sessionUser
    }
    const fetchData = async () => {
        const response = await userPins(route.params.id)
        setData(response)
    }

    React.useEffect(() => {
        session()
        fetchUser()
        fetchData()
    }, [isFocused])

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate('profileStack');
        await session();
    }
    return (
        <>
            {
                isLoading ?
                    <ProfileLoading /> :
                    <View
                        style={{
                            backgroundColor: isDark ? 'black' : 'white',
                            minWidth: '100%',
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center' as FlexAlignType,
                            alignItems: 'center' as FlexAlignType,
                            paddingTop: 40
                        } as ViewStyle}
                    >

                        <View
                            style={{
                                width: '90%',
                                flex: 1,
                                // backgroundColor: 'white',
                                display: 'flex',
                                justifyContent: 'center' as FlexAlignType,
                                alignItems: 'center' as FlexAlignType,
                                gap: 15,
                                marginTop: 40
                            } as ViewStyle}
                        >
                            {
                                (sessionUser && route?.name === 'profileStack') &&
                                <TouchableOpacity
                                    onPress={handleSignOut}
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 20
                                    }}
                                >
                                    <MaterialIcons
                                        name='logout'
                                    />
                                </TouchableOpacity>
                            }
                            {
                                user &&
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'red',
                                        padding: 2,
                                        borderRadius: 100000
                                    }}
                                >

                                    <Avatar
                                        image={{ uri: user.image }}
                                        size={110}
                                    />
                                </View>
                            }
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center' as FlexAlignType,
                                    alignItems: 'center' as FlexAlignType,

                                } as ViewStyle}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 4,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{
                                        color: isDark ? 'white' : 'black',
                                        fontSize: 20
                                    }}>
                                        {user && user.name}
                                    </Text>
                                    {
                                        (user && user.isAdmin) ? <>
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
                                        color: isDark ? colors.darkGray : colors.lightBlack
                                    }}
                                >
                                    @{user && user.username}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: isDark ? 'white' : 'black',
                                        fontWeight: '600'
                                    }}
                                >
                                    {user && user.followers.length} {(user && user.followers.length > 1) ? ' Followers' : ' Follower'}
                                </Text>
                                <Text
                                    style={{
                                        color: isDark ? 'white' : 'black',
                                        fontWeight: '600',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 4,
                                        width: 4,
                                        backgroundColor: isDark ? colors.darkGray : colors.lightBlack,
                                        borderRadius: 10 / 2
                                    }}
                                >
                                </Text>
                                <Text
                                    style={{
                                        color: isDark ? 'white' : 'black',
                                        fontWeight: '600'
                                    }}
                                >
                                    {user && user.followings.length} {(user && user.followings.length > 1) ? ' Followings' : ' Following'}
                                </Text>
                            </View>
                            {
                                Data &&
                                <MasonryList
                                    data={Data}
                                    keyExtractor={(item): string => item.id}
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, i }: { item: itemProps; i: number }) => <ImageCard key={i} item={item} />}
                                />
                            }
                        </View>
                    </View >
            }
        </>
    )
}

export default Profile