import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { View, ViewStyle, FlexAlignType } from 'react-native';
import { IconProps } from "react-native-vector-icons/Icon";
export const colors = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    black: '#0F0F0F',
    darkGray: '#707070',
    lightGray: '#F8FAFC',
    btnBackground: '#1492E6',
    gray: '#00000029',
    lightBlack: '#2125298c',
    lightBlue: '#00DAFF',
    blue: '#5A59FF',
    yellow: '#FED800',
    green: '#0AAD6A',
    cream: '#FAFAFA',
    lightPink: '#F7C8C9',
    darkYellow: '#F6DE63',
    darkwhite: '#767E83',
    darkCream: '#CACCE6',
    transparentWhite: '#ffffff47',
    transparentBlack: '#00000047',
    lightWhite: '#dee2e6',
    darkRed: '#d90429',
    postCardContainerColor: '#111111',
    postCardContainerColorLight: '#e2eafc',
    whiteBackground: '#edf2fb',
    saveRedBtn: 'rgb(173, 8, 27)',
    verifiedBtnColor:'rgb(0, 149, 246)',
    darkRedTransparent:'#d9042938'
}
export const commonStyle = {
    // common styles
    displayFlex: {
        display: 'flex'
    },
    justifyCentered: {
        justifyContent: "center"
    },
    alignCentered: {
        alignItems: "center",
    },
    column: {
        flexDirection: "column"
    },
    row: {
        flexDirection: "row"
    },
    spaceBetween: {
        justifyContent: "space-between"
    },
    centerContent: {
        textAlign: "center"
    },
    flex: {
        flex: 1
    },
    borderRadius: (radius: string | number) => ({
        borderRadius: radius
    }),
    MarginTop: (margin: string | number) => ({
        marginTop: margin
    }),
    MarginBottom: (margin: string | number) => ({
        marginBottom: margin
    }),
    width: (width: string | number | object) => ({
        width: width
    }),
    background: (background: string) => ({
        background: background
    }),
    backgroundSize: (backgroundSize: string) => ({
        backgroundSize: backgroundSize
    }),
    position: (position: string) => ({
        position: position
    }),
    textTransform: (textTransform: string) => ({
        textTransform: textTransform
    }),
    color: (color: string) => ({
        color: color
    }),
    fontFamily: (fontFamily: string) => ({
        fontFamily: fontFamily
    }),
    fontWieght: (fontWeight: string) => ({
        fontWeight: fontWeight
    }),
    fontStyle: (style: string) => ({
        fontStyle: style
    }),
    fontSize: (size: string | number | object) => ({
        fontSize: size
    }),
    fontHeight: (height: string | number | object) => ({
        lineHeight: height
    }),
    letterSpacing: (space: string | number | object) => ({
        letterSpacing: space
    }),
    textShadow: (shadow: string) => ({
        textShadow: shadow
    }),
    gap: (gap: string | number) => ({
        gap: gap
    }),
    zIndex: (index: string | number) => ({
        zIndex: index
    }),
    boxShadow: (shadow: string) => ({
        boxShadow: shadow
    }),
    display: (display: string) => ({
        display: display
    }),
    cardStyle: (isDark: boolean) => ({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: isDark ? colors.postCardContainerColor : colors.postCardContainerColorLight,
        width: '80%',
        padding: 10,
        alignItems: 'center' as FlexAlignType,
        borderRadius: 16,
    }) as ViewStyle,
    postCardBtn: (isDark: boolean) => ({
        // alignSelf: 'center',
        fontSize: 20,
        color: isDark ? colors.transparentWhite : colors.transparentBlack
    }),
    saveBtn: {
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        backgroundColor: colors.saveRedBtn,
        borderRadius: 12
    },
    saveBtnText: (isDark: boolean) => ({
        fontSize: 15,
        color: isDark ? colors.lightWhite : colors.lightBlack
    }),
    verifiedBtn: {
        color: colors.verifiedBtnColor,
        fontSize:16
    },
    
}
export const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    addStyle: {
        backgroundColor: colors.darkRed,
        padding: 15,
        width: 80,
        height: 80,
        borderRadius: Dimensions.get('window').width / 2,
        // position:'absolute',
        top: -30,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    },

});