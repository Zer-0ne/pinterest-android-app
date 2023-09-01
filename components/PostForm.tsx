import { View, Text, Image, Dimensions, useColorScheme, Touchable } from 'react-native'
import React from 'react'
import BodyContainer from './BodyContainer'
import { data, inputForm } from '../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, commonStyle } from '../utils/styles'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'


const PostForm = ({
    data,
    setPostForm,
    handleChange,
    handleCreatePost,
    btnDisabled
}: {
    data: data
    setPostForm: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (value: string, name: string) => void,
    handleCreatePost: () => Promise<React.JSX.Element | undefined | void>,
    btnDisabled: boolean
}) => {
    const isDark = useColorScheme() === 'dark'

    return (
        <ScrollView
            style={{
                width: '100%'
            }}
        >
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 50,
                        paddingBottom: 100,
                        width: '85%'
                    }}
                >

                    <View
                        style={{
                            padding: 10,
                            flexDirection: 'column',
                            backgroundColor: isDark ? colors.postCardContainerColor : colors.postCardContainerColorLight,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                        }}
                    >

                        <View
                            style={{
                                marginStart: 30,
                                marginEnd: 30,
                                gap: 10,
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            {
                                data &&
                                <Image
                                    source={{ uri: data && data.image }}
                                    style={{
                                        // flex: 1,
                                        alignSelf: 'stretch',
                                        width: 200,
                                        height: 300,
                                        borderRadius: 15,

                                    }}
                                />
                            }

                            {
                                inputForm.map((item, index) => (
                                    <View
                                        style={{
                                            gap: 4,
                                            marginTop: 6,
                                            marginBottom: 6,
                                            maxWidth: 200,

                                        }}
                                        key={index}
                                    >
                                        <TextInput
                                            style={{
                                                borderWidth: 1,
                                                borderColor: isDark ? colors.transparentWhite : colors.transparentBlack,
                                                paddingStart: 10,
                                                paddingEnd: 10,
                                                borderRadius: 10,
                                                maxWidth: 250,
                                                textAlign: 'justify',
                                                textAlignVertical: 'top'
                                            }}
                                            value={data[item.name] ? data[item.name] : ''}
                                            multiline={true}
                                            numberOfLines={(item.name === 'Description') ? 4 : 1}
                                            placeholder={item.placeholder}
                                            onChangeText={e => handleChange(e, item.name)}
                                        />
                                    </View>
                                ))
                            }
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <TouchableOpacity
                                    style={[commonStyle.saveBtn, {
                                        padding: 8,
                                        paddingStart: 13,
                                        paddingEnd: 13,
                                        backgroundColor: 'white'
                                    }]}
                                    onPress={() => setPostForm(false)}
                                    disabled={btnDisabled ? true : false}
                                >
                                    <Text
                                        style={[commonStyle.saveBtnText(isDark), {
                                            color: 'black'
                                        }]}
                                    >Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[commonStyle.saveBtn, {
                                        padding: 8,
                                        paddingStart: 13,
                                        paddingEnd: 13
                                    }]}
                                    onPress={handleCreatePost}
                                    disabled={btnDisabled ? true : false}
                                >
                                    <Text
                                        style={commonStyle.saveBtnText(isDark)}
                                    >Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

export default PostForm