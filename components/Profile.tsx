import { useFocusEffect, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native'
import React from 'react'
import { BackHandler, FlexAlignType, ScrollView, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native'
import { SessionProps, itemProps, userProps } from '../utils/constants';
import { follow, signOut, singleUser, userPins } from '../utils/fetchFromApi';
import { Avatar, Button } from '@react-native-material/core';
import { colors, commonStyle } from '../utils/styles';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCard from './ImageCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import ProfileLoading from './ProfileLoading';
import CustomModal from './CustomModal';
import { Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'react-native-toast-notifications';

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
    const toast = useToast();
    const [sessionUser, setSessionUser] = React.useState<SessionProps>()
    const isFocused = useIsFocused()
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isFollowers, setIsFollowers] = React.useState(false)
    const [forFollowing, setForFollowing] = React.useState<string>()
    const [isDisabled, setIsDisabled] = React.useState(false)

    // console.log(route)
    const fetchUser = async () => {
        const data = await singleUser(route.params.id)
        setUser(data)
        setIsLoading(false)
    }
    const session = async () => {
        const sessionUserData = await AsyncStorage.getItem('session')
        const json = JSON.parse(sessionUserData as string)
        sessionUserData && setSessionUser(json)

        return sessionUser
    }
    const fetchData = async () => {
        const response = await userPins(route.params.id)
        setData(response)
    }

    const handleFollow = async (_id:string) => {
        try {
            setIsDisabled(true)
            if (sessionUser?.user.id === forFollowing) {
                toast.show('You can\'t follow yourself' as string,
                    {
                        type: 'danger'
                    })
                setIsDisabled(false)
                return
            }
            await follow(_id, toast);
            await fetchUser()
            await fetchData()
            setIsDisabled(false)
            // console.log()
        } catch (error) {
            console.log(error)
            setIsDisabled(false)
        }
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
                        {
                            user &&
                            isOpen &&
                            <FollowerFollowing
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                isDark={isDark}
                                title={isFollowers ? `Followers` : 'Following'}
                                followFollowing={isFollowers ? user.followers : user.followings as userProps['followers']}
                                sessionUser={sessionUser as SessionProps}
                                handleFollow={handleFollow}
                                route={route}
                                isDisabled={isDisabled}
                            />
                        }

                        <View
                            style={{
                                width: '100%',
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
                                                style={commonStyle.verifiedBtn(16)}
                                            />
                                            <MaterialIcons
                                                name='verified'
                                                style={commonStyle.verifiedBtn(16)}
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
                                <TouchableOpacity
                                    onPress={() => { setIsOpen(true); setIsFollowers(true) }}
                                >
                                    <Text
                                        style={{
                                            color: isDark ? 'white' : 'black',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {user && user.followers.length} {(user && user.followers.length > 1) ? ' Followers' : ' Follower'}
                                    </Text>
                                </TouchableOpacity>
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
                                <TouchableOpacity
                                    onPress={() => { setIsOpen(true); setIsFollowers(false) }}
                                >
                                    <Text
                                        style={{
                                            color: isDark ? 'white' : 'black',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {user && user.followings.length} {(user && user.followings.length > 1) ? ' Followings' : ' Following'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: isDark ? colors.postCardContainerColor : colors.postCardContainerColorLight,
                                    padding: 6,
                                    paddingStart: 20,
                                    paddingEnd: 20,
                                    borderRadius: 12,
                                    shadowColor: 'red',
                                    display: (user?.id === sessionUser?.user.id) ? 'none' : 'flex',
                                    width: 110,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                disabled={isDisabled}
                                onPress={() => {
                                    if (user) {
                                        handleFollow(user.id)
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        color: isDark ? colors.lightWhite : colors.black
                                    }}
                                >
                                    {
                                        (user?.followers?.some((follow: any) => follow.userId === sessionUser?.user.id)) ? 'Following' : 'Follow'
                                    }
                                </Text>
                            </TouchableOpacity>
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

const FollowerFollowing = ({
    isOpen,
    setIsOpen,
    isDark,
    title,
    followFollowing,
    sessionUser,
    handleFollow,
    route,
    isDisabled
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isDark: boolean;
    isDisabled: boolean;
    title: string;
    followFollowing: userProps["followers"];
    sessionUser: SessionProps;
    handleFollow: (_id: string) => Promise<void>,
    route: idProps
}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // Do Whatever you want to do on back button click
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                setIsOpen(false)
                return true;
            };

            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [])
    );

    React.useEffect(() => {
        if (isOpen) {
            // Fade in when the modal becomes visible
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300, // Adjust the duration as needed
                useNativeDriver: true,
            }).start();
        } else {
            // Fade out when the modal becomes invisible
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300, // Adjust the duration as needed
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, isOpen]);


    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    position: 'absolute',
                    zIndex: 100,
                    left: 10,
                    right: 10,
                    top: 50,
                    bottom: 50,
                }}
                onPress={() => setIsOpen(false)}

            >
                <Animated.View
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >

                    <CustomModal
                        isDark={isDark}
                    >
                        <ScrollView>
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: '800',
                                            fontSize: 20,
                                            marginStart: 10,
                                            marginTop: 6,
                                            color: isDark ? colors.lightWhite : 'black',
                                        }}
                                    >
                                        {title}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        margin: 20,
                                        // backgroundColor: 'red',
                                        width: '100%',
                                        gap: 5,
                                    }}
                                >
                                    <ScrollView>
                                        {
                                            (followFollowing.length) ?
                                                followFollowing.map((item, index) => (
                                                    <Users
                                                        key={index}
                                                        item={item as {
                                                            _id: string;
                                                            userId: string
                                                        }}
                                                        isDark={isDark}
                                                        sessionUser={sessionUser}
                                                        handleFollow={handleFollow}
                                                        route={route}
                                                        isDisabled={isDisabled}
                                                    />
                                                )) : <>
                                                    <Text
                                                        style={{
                                                            color: isDark ? colors.lightWhite : colors.lightBlack,
                                                            marginStart: 15
                                                        }}
                                                    >No User Found!</Text>
                                                </>
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
                    </CustomModal>
                </Animated.View>
            </TouchableOpacity>
        </>
    )
}

const Users = ({
    item,
    isDark,
    sessionUser,
    handleFollow,
    route,
    isDisabled
}: {
    item: {
        _id: string;
        userId: string
    },
    isDark: boolean;
    isDisabled: boolean;
    sessionUser: SessionProps;
    handleFollow: (_id: string) => Promise<void>;
    route: idProps
}) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [userDatails, setUserDatails] = React.useState<userProps>();
    const fetchUser = async () => {
        const data = await singleUser(item.userId)
        setUserDatails(data)
    }
    React.useEffect(() => {
        fetchUser()
    }, [item])

    return (
        <>
            <>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 12,
                        borderBottomWidth: .5,
                        borderBottomColor: isDark ? colors.transparentWhite : colors.transparentBlack,
                        padding: 10,
                        paddingBottom: 15,
                        justifyContent: 'space-between',
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10
                        }}
                    >
                        {
                            userDatails &&
                            <Avatar
                                image={{ uri: userDatails?.image }}
                                size={40}
                            />
                        }
                        <View
                            style={{
                                gap: 2
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 4,
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => (route.name === 'profileStack') ? navigation.navigate('Profile', {
                                        id: userDatails?.id,
                                    }) : navigation.push('Profile', {
                                        id: userDatails?.id,
                                    })}
                                >

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: isDark ? 'white' : 'black'
                                        }}
                                    >
                                        {userDatails?.name}
                                    </Text>
                                </TouchableOpacity>
                                {
                                    (userDatails?.isAdmin) ? <>
                                        <MaterialIcons
                                            name='verified-user'
                                            style={commonStyle.verifiedBtn(13)}
                                        />
                                        <MaterialIcons
                                            name='verified'
                                            style={commonStyle.verifiedBtn(13)}
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
                                {userDatails?.username}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'transparent',
                            display: (sessionUser.user?.id === userDatails?.id) ? 'none' : 'flex',
                        }}
                        disabled={isDisabled}
                        onPress={async () => { await handleFollow(item.userId as string); }}
                    >
                        {
                            (userDatails?.followers?.some((follow: any) => follow.userId === sessionUser.user.id)) ? <SimpleLineIcons
                                style={{
                                    fontSize: 15,
                                    opacity: 1,
                                    fontWeight: '900'
                                    // backgroundColor: isDark ? colors.transparentWhite : colors.transparentBlack
                                }}
                                name="user-following"
                            /> : <SimpleLineIcons
                                style={{
                                    fontSize: 15,
                                    opacity: .5,
                                    fontWeight: '900'
                                    // backgroundColor: isDark ? colors.transparentWhite : colors.transparentBlack
                                }}
                                name='user-follow'
                            />
                        }
                    </TouchableOpacity>
                </View>
            </>
        </>
    );
}
export default Profile
