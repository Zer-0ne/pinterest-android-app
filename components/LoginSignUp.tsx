import { View, Text, useColorScheme, Modal, FlexAlignType, ViewStyle, TextInput, KeyboardTypeOptions, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { colors, commonStyle } from '../utils/styles'
import CustomModal from './CustomModal'
import { SessionProps, data, logIn, signUp } from '../utils/constants'
import { TextInputProps } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from '@react-native-material/core'
import RNFetchBlob from 'rn-fetch-blob'
import { AuthContext } from '../Auth/AuthContext'
import { handleOtp } from '../utils/fetchFromApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BodyContainer from './BodyContainer'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'

const LoginSignUp = () => {
    const [session, setSession] = React.useState<SessionProps>()
    const isDark = useColorScheme() === 'dark'
    const [login, setLogin] = React.useState(true)
    const [image, setimage] = React.useState('')
    const [data, setData] = React.useState<data>()
    const [otp, setOtp] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const toast = useToast();
    const navigation = useNavigation()

    // get path name
    const route = useRoute();

    // authentication 
    const sessions = async () => {
        const sessionUser = await AsyncStorage.getItem('session') as string
        setSession(JSON.parse(sessionUser))
    }
    React.useEffect(() => {
        sessions()
    }, [AsyncStorage])
    const { signUpApi, LoginApi } = useContext(AuthContext)

    // ImagePicker function to pic image from device 
    const ImagePicker = async () => {
        try {
            const result = await DocumentPicker.pick();
            const base64 = await RNFetchBlob.fs.readFile(result[0].uri, 'base64')
            setimage(`data:${result[0].type};base64,${base64}`)
            setData((prevData) => ({
                ...prevData,
                image: `data:${result[0].type};base64,${base64}`
            }));
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log(error)
            }
        }

    }
    const handleChange = (value: string, name: string) => {
        if (name === 'email') {
            (!value) ? setOtp(false) : setOtp(true)
        }
        setData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleLogin = async () => {
        let id = toast.show("please wait...");
        await LoginApi(data, setIsDisabled, toast, id);
        const sessionUser = await AsyncStorage.getItem('session') as string
        const user = await JSON.parse(sessionUser)
        navigation.navigate(route.name, (route.name === 'profileStack') && { id: user?.user.id });
    }
    return (
        <BodyContainer>
            {/* Modal */}
            <CustomModal
                isDark={isDark}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: isDark ? 'gray' : 'black',
                        marginStart:10
                    }}
                >
                    {login ? 'Login' : 'Signup'}
                </Text>
                <ScrollView
                    style={{
                        margin: 10
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                position: 'relative'
                            }}
                            // image picker 
                            onPress={() => ImagePicker()}
                        >
                            {
                                login ? <></> :
                                    image ? <Avatar
                                        size={90}
                                        image={{ uri: image }}
                                    /> :

                                        <Avatar
                                            size={90}
                                            style={{
                                                elevation: 5,
                                                backgroundColor: 'gray'
                                            }}
                                        />
                            }
                            <View
                                style={{

                                    position: 'absolute',
                                    right: 0,
                                    backgroundColor: 'green',
                                    padding: 5,
                                    bottom: 0,
                                    borderRadius: 100,
                                    paddingEnd: 12,
                                    paddingStart: 14
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 20,
                                    }}
                                >+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 15
                        }}
                    >
                        {
                            (login ? logIn : signUp).map((item, index) => (
                                <View
                                    style={{
                                        gap: 4,
                                        marginTop: 6,
                                        marginBottom: 6
                                    }}
                                    key={index}
                                >
                                    <TextInput
                                        style={{
                                            borderWidth: 1,
                                            borderColor: isDark ? colors.transparentWhite : colors.transparentBlack,
                                            paddingStart: ['otp'].includes(item.name) ? 20 : 10,
                                            paddingEnd: ['otp'].includes(item.name) ? 20 : 10,
                                            borderRadius: 10,
                                            display: ['otp'].includes(item.name) ?
                                                otp ?
                                                    'flex' :
                                                    'none' :
                                                'flex',
                                            width: ['otp'].includes(item.name) ? 100 : '100%',
                                        }}
                                        placeholder={item.placeholder}
                                        secureTextEntry={['password', 'adminPassword'].includes(item.name) ? true : false}
                                        keyboardType={item.type as KeyboardTypeOptions}
                                        onChangeText={e => handleChange(e, item.name)}

                                    />
                                </View>
                            ))
                        }
                        <TouchableOpacity
                            style={{
                                marginStart: 5,
                                marginTop: 5
                            }}
                            onPress={() => setLogin((prev: boolean) => !prev)}
                        >
                            <Text>
                                {
                                    login ? "Don't have an Account?" : 'Already have an Account?'
                                }
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 5
                            }}
                        >

                            {
                                !login &&
                                <TouchableOpacity
                                    style={{
                                        ...commonStyle.saveBtn,
                                        width: 80,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginStart: 5,
                                        marginTop: 20,
                                        marginBottom: 15,
                                        display: otp ? 'flex' : 'none'
                                    }}
                                    onPress={() => data && handleOtp(data.email)}
                                >
                                    <Text
                                        style={{
                                            ...commonStyle.saveBtnText(isDark),
                                            padding: 0
                                        }}
                                    >
                                        Send Otp
                                    </Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity
                                style={{
                                    ...commonStyle.saveBtn,
                                    width: 80,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginStart: 5,
                                    marginTop: 20,
                                    marginBottom: 15
                                }}
                                disabled={isDisabled}
                                onPress={login ? handleLogin : () => {
                                    let id = toast.show("please wait...");
                                    signUpApi(data, setIsDisabled, toast, id)
                                }}
                            >
                                <Text
                                    style={{
                                        ...commonStyle.saveBtnText(isDark),
                                        padding: 0
                                    }}
                                >
                                    {login ? 'Login' : 'Signup'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </CustomModal >
        </BodyContainer>

    )
}

export default LoginSignUp