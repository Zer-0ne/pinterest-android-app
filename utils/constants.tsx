import { Avatar } from '@react-native-material/core'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, commonStyle, styles } from './styles'
import Home from '../components/Home'
import Profile from '../components/Profile'
import { Dimensions, View } from 'react-native'
import { PinStack } from '../Navigation/StackNavigation'
import LoginSignUp from '../components/LoginSignUp'

export const BASE_URL = 'https://pinterest-phi.vercel.app/api'
export const navbar = [
    {
        name: 'homeStack',
        icon: (focused: boolean, color: string, isDark: boolean) => (<AntDesign
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
        icon: (focused: boolean, color: string, isDark: boolean) => (<View
            style={[styles.addStyle, {
                borderColor: isDark ? colors.lightBlack : colors.lightWhite,
                borderWidth: 5,
            }]}
        ><MaterialIcons
                name='add'
                style={[styles.iconStyle, { ...commonStyle.color(`${focused ? 'red' : isDark ? 'white' : 'black'}`) }, {
                    fontSize: 30,
                    fontWeight: 'bold'
                }]}
            /></View>),
        component: PinStack
    },
    {
        name: 'profileStack',
        icon: (focused: boolean, color: string, isDark: boolean) => (<Avatar
            size={30}
            label={`hi`}
            color={`${colors.darkGray}`}
        />),
        component: LoginSignUp
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
    _id: string
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