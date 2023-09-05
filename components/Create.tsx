import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer'
import CustomModal from './CustomModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNFetchBlob from 'rn-fetch-blob'
import { isCancel, pick } from 'react-native-document-picker'
import PostForm from './PostForm'
import { BASE_URL, data } from '../utils/constants'
import { useToast } from 'react-native-toast-notifications'

const Create = () => {
    const isDark = useColorScheme() === 'dark';
    const [postForm, setPostForm] = React.useState(false)
    const [data, setData] = React.useState<data>()
    const toast = useToast();
    const [btnDisabled, setBtnDisabled] = React.useState(false)

    // ImagePicker function to pic image from device 
    const ImagePicker = async () => {
        try {
            const result = await pick();
            const base64 = await RNFetchBlob.fs.readFile(result[0].uri, 'base64')
            setData((prevData) => ({
                ...prevData,
                image: `data:${result[0].type};base64,${base64}`
            }));
            setPostForm(true)
        } catch (error) {
            if (isCancel(error)) {
                console.log(error)
            }
        }

    }
    React.useEffect(() => {
        setPostForm(false)
    }, [])

    // handle Change
    const handleChange = (value: string, name: string) => {
        setData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    // create post 
    const handleCreatePost = async () => {
        let id = toast.show("please wait...");
        try {
            setBtnDisabled(true)
            const response = await fetch(`${BASE_URL}/pins`, {
                method: "POST",
                body: JSON.stringify({ ...data }),
            })
            if (response.ok) {
                const responseData = await response.json()
                toast.update(id, responseData.message, { type: "success" });
                console.log(responseData)
                setPostForm(false)
                setBtnDisabled(false)
                return
            }
            setBtnDisabled(false)
            toast.update(id, 'Something went wrong ', { type: "danger" });
            return
        } catch (error) {
            console.log({ message: error })
            toast.update(id, 'Something went wrong!', { type: "danger" });
            setBtnDisabled(false)
        }
    }

    return (
        <>
            <BodyContainer>

                {
                    postForm ?
                        <PostForm
                            data={data as data}
                            setPostForm={setPostForm}
                            handleChange={handleChange}
                            handleCreatePost={handleCreatePost}
                            btnDisabled={btnDisabled}
                        /> : <CustomModal isDark={isDark}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    padding: 10

                                }}
                            >
                                <Text
                                    style={{
                                        color: isDark ? 'white' : 'black',
                                        fontSize: 16
                                    }}
                                >
                                    Upload assets to create Pins
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={ImagePicker}
                                >
                                    <View
                                        style={{
                                            width: "90%",
                                            height: 330,
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            borderStyle: 'dotted',
                                            borderColor: isDark ? 'white' : 'black',
                                            marginTop: 40,
                                            padding: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Ionicons
                                            name='arrow-up-circle'
                                            size={30}
                                            style={{
                                                color: isDark ? 'white' : 'black',
                                                margin: 5
                                            }}
                                        />
                                        <Text
                                            style={{
                                                color: isDark ? 'white' : 'black'
                                            }}
                                        >Click to add images and videos</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </CustomModal>
                }
            </BodyContainer>
        </>
    )
}

export default Create