import { View, Text } from 'react-native'
import React, { createContext } from 'react'
import { signUpApi,LoginApi } from '../utils/fetchFromApi'

export const AuthContext = createContext('')
const AuthProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <AuthContext.Provider
            value={{ signUpApi, LoginApi }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider