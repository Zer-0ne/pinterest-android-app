import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlexAlignType, ScrollView, Text, View, ViewStyle, useColorScheme } from 'react-native'
import { itemProps, userProps } from '../utils/constants';
import { singleUser, userPins } from '../utils/fetchFromApi';
import { Avatar } from '@react-native-material/core';
import { colors } from '../utils/styles';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCard from './ImageCard';
interface idProps {
    params: {
        id: string;
    }
}
const Profile = () => {
    const isDark = useColorScheme() === 'dark'
    const route = useRoute() as idProps
    const [user, setUser] = React.useState<userProps>()
    const [Data, setData] = React.useState([])
    const fetchUser = async () => {
        const data = await singleUser(route.params.id)
        setUser(data)
    }
    const fetchData = async () => {
        const response = await userPins(route.params.id)
        setData(response)
    }
    React.useEffect(() => {
        fetchUser()
        fetchData()
    }, [route])
    return (
        <>
            <View
                style={{
                    backgroundColor: isDark ? 'black' : 'white',
                    minWidth: '100%',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center' as FlexAlignType,
                    alignItems: 'center' as FlexAlignType,
                    paddingTop:40
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
                        user &&
                        <Avatar
                            image={{ uri: user.image }}
                            size={110}
                        />
                    }
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center' as FlexAlignType,
                            alignItems: 'center' as FlexAlignType,
                        } as ViewStyle}
                    >

                        <Text style={{
                            color: isDark ? 'white' : 'black',
                            fontSize: 20
                        }}>
                            {user && user.name}
                        </Text>
                        <Text
                            style={{
                                color: isDark ? colors.darkGray : colors.lightBlack
                            }}
                        >
                            @{user && user.username}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: isDark ? 'white' : 'black',
                            fontWeight: '600'
                        }}
                    >
                        {user && user.followers.length} {(user && user.followers.length > 1) ? 'Followers' : 'Follower'}
                    </Text>
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
        </>
    )
}

export default Profile