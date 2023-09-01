import React from 'react'
import { Text, View, useColorScheme } from 'react-native'
import { pins } from '../utils/fetchFromApi'
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCard from './ImageCard';
import { itemProps } from '../utils/constants';
import { colors } from '../utils/styles';
import Loading from './Loading';


const Home = () => {
    const isDark = useColorScheme() === 'dark'
    const [isLoading, setIsLoading] = React.useState(true)
    const [Data, setdata] = React.useState([])
    const fetch = async () => {
        const Pins = await pins()
        setdata(Pins)
    }
    React.useEffect(() => {
        fetch()
        setIsLoading(false)
    }, [])
    return (
        <>
            {
                // isLoading ?
                //     <Loading /> :
                    <View
                        style={{
                            backgroundColor: isDark ? 'black' : colors.whiteBackground,
                            minHeight: '100%'
                        }}
                    >
                        {
                            Data &&
                            <MasonryList
                                onRefresh={fetch}
                                data={Data}
                                keyExtractor={(item): string => item.id}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, i }: { item: itemProps; i: number }) => <ImageCard key={i} item={item} />}
                            />
                        }
                    </View>
            }
        </>
    )
}

export default Home