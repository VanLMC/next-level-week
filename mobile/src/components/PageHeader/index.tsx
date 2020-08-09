import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';


interface PageHeaderProps {
    title: string;
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {

    const navigation = useNavigation();

    function handleNavigateBack(){
        navigation.navigate('Landing');
    }

    return(        
        <View style={styles.container} >
            <View style={styles.topBar}>
            <BorderlessButton onPress={handleNavigateBack}>
               <Image 
               source={backIcon}
               resizeMode="contain"
               ></Image>
            </BorderlessButton>

            <Image 
               source={logoImg}
               resizeMode="contain"
               ></Image>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>

            {children}
        </View>
    )
}

export default PageHeader;