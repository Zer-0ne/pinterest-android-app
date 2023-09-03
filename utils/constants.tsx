import { Avatar } from '@react-native-material/core'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, commonStyle, styles } from './styles'
import Home from '../components/Home'
import Profile from '../components/Profile'
import { Dimensions, View } from 'react-native'
import { PinStack } from '../Navigation/StackNavigation'
import Create from '../components/Create'
import { BASE } from 'react-native-dotenv';

export const BASE_URL = BASE;

export const navbar = [
    {
        name: 'homeStack',
        icon: (focused: boolean, color: string, isDark: boolean, session: SessionProps | null | undefined) => (<AntDesign
            name='home'
            style={[styles.iconStyle, commonStyle.color(`${focused ? 'red' : isDark ? 'white' : 'black'}`), {
                justifyContent: 'center',
                backgroundColor: focused ? 'transparent' : 'transparent'
            }]}
        />),
        component: PinStack
    },
    {
        name: 'create',
        icon: (focused: boolean, color: string, isDark: boolean, session: SessionProps | null | undefined) => (<View
            style={[styles.addStyle, {
                borderColor: isDark ? focused ? colors.darkRedTransparent : colors.lightBlack : focused ? colors.darkRedTransparent : colors.lightWhite,
                borderWidth: 5,
                backgroundColor: focused ? 'black' : colors.darkRed,

            }]}
        ><MaterialIcons
                name='add'
                style={[styles.iconStyle, { ...commonStyle.color(`${focused ? 'red' : isDark ? 'white' : 'black'}`) }, {
                    fontSize: 30,
                    fontWeight: 'bold',
                }]}
            /></View>),
        component: Create
    },
    {
        name: 'profileStack',
        icon: (focused: boolean, color: string, isDark: boolean, session: SessionProps | null | undefined) => {
            return (
                <>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: focused ? 'red' : 'transparent',
                            padding: 2,
                            borderRadius: 100000
                        }}
                    >

                        {
                            session ?
                                <Avatar
                                    size={30}
                                    image={{ uri: session && session.user.image }}
                                    color={`${colors.darkGray}`}
                                /> : <Avatar
                                    size={30}
                                    color={`${colors.darkGray}`}
                                />
                        }
                    </View>
                </>
            )
        },
        component: Profile
    },
]
export interface itemProps {
    // item: {
    _id: string;
    image: string;
    title: string;
    Description: string;
    imageid: string;
    tag: string;
    authorId: string;
    comments: [];
    createdAt: string;
    updatedAt: string
    // }
}
export interface data {
    [key: string]: any;
}
export interface userProps {
    name: string;
    image: string;
    username: string;
    saved: [];
    posts: [],
    isAdmin: boolean;
    followers: [{
        userId: string;
        _id: string
    }];
    followings: [{
        userId: string;
        _id: string
    }];
    id: string
}
export interface commentProps {
    _id: string;
    comment: string;
    replies: [];
    userId: string
}
export const signUp = [
    {
        name: 'name',
        placeholder: 'Enter your name',
        type: 'default'
    },
    {
        name: 'username',
        placeholder: 'username',
        type: 'default'
    },
    {
        name: 'email',
        placeholder: 'Enter your email',
        type: 'email-address'
    },
    {
        name: 'password',
        placeholder: 'Create a password',
        type: 'default'
    },
    {
        name: 'adminPassword',
        placeholder: 'Confirm password',
        type: 'default'
    },
    {
        name: 'otp',
        placeholder: 'Enter otp',
        type: 'numeric'
    },

]
export const logIn = [
    {
        name: 'username',
        placeholder: 'Enter username or email or phone number',
        type: 'text'
    },
    {
        name: 'password',
        placeholder: 'Enter password',
        type: 'password'
    }
]
export interface SessionProps {
    user: {
        name: string;
        email: string;
        image: string;
        id: string
    }
    expires: string
}
export const inputForm = [
    {
        name: 'title',
        placeholder: 'Add a title',
        title: 'Title'
    },
    {
        name: 'Description',
        placeholder: 'Write the detailed description ',
        title: 'Description'
    },
    {
        name: 'tag',
        placeholder: 'Tagged topics',
        title: 'Tagged topics'
    },
]