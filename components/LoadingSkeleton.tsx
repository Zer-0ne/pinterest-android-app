import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useColorScheme } from 'react-native';
import { colors } from '../utils/styles';

const LoadingSkeleton = ({ children }: { children: React.ReactNode }) => {
    const isDark = useColorScheme() === 'dark';

    return (
        <SkeletonPlaceholder

            backgroundColor={isDark ? colors.transparentWhite : colors.transparentBlack}
        >
            {children}
        </SkeletonPlaceholder>
    )
}

export default LoadingSkeleton