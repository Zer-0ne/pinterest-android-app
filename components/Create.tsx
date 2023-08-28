import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer'
import CustomModal from './CustomModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostForm from './PostForm'

const Create = () => {
    const isDark = useColorScheme() === 'dark';
    const [postForm, setPostForm] = React.useState(true)
    if (postForm) {
        return (
            <PostForm />
        );
    }
    return (
        <>
            <BodyContainer>
                <CustomModal isDark={isDark}>
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
            </BodyContainer>
        </>
    )
}

export default Create