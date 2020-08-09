import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import LandingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';


function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    const navigation = useNavigation();


    useEffect(() =>{
        
        api.get('connections').then(response =>{
            const {total} = response.data;
            setTotalConnections(total);
        })
        }, [])
    

    function handleNavigateToGiveClasses(){
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudy(){
        navigation.navigate('Study');
    }

    return(
        <View style={styles.container}>
            <Image style={styles.banner} source={LandingImg} />

            <Text style={styles.title} >
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
       
             <RectButton onPress={handleNavigateToStudy} style={[styles.button, styles.buttonPrimary]}>
                <Image source={studyIcon} />
                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>
            
            <RectButton onPress={handleNavigateToGiveClasses} style={[styles.button, styles.buttonSecondary]}>
                <Image source={giveClasses} />
                <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>

            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
            </Text>
            <Image source={heartIcon}></Image>
        </View>
    )
}

export default Landing;