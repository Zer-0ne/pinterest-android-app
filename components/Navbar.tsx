import React from 'react'
import { Dimensions, Text, View } from 'react-native'

const Navbar = () => {
    return (
        <>
            <View>
                <Text
                    style={{
                        color: 'blue',
                        flex: 1,
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: 'black',
                        width: Dimensions.get('window').width - 3,
                        padding: 4,
                        margin: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >Navbar</Text>
            </View>
        </>
    )
}

export default Navbar