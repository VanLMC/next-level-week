import React, { useState } from 'react';
import { View, Text, Image, Linking, AsyncStorage } from 'react-native';
import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
//import { useNavigation } from '@react-navigation/native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';//import logoImg from '../../assets/images/logo.png';
import api from '../../services/api';


interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subsject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}





const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorite, setIsFavorite] = useState(favorited)

    function handleLinkToWhatsapp(){
        api.post('connections', {
            user_id: teacher.id,
        })
        Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`);
    }

     
async function handleToggleFavorite(){

    //setar favoritos na memoria local do celular

    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = [];


    if(favorites){
        favoritesArray = JSON.parse(favorites)
    //console.log('Professores favoritados dispositivo listagem: ' +  favorites)
    }

    if(isFavorite){

        const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
            return teacherItem.id === teacher.id;
        })

        favoritesArray.splice(favoritesArray, 1)

        console.log('Array de favoritos depois do filtro: ' + JSON.stringify(favoritesArray))
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))

        setIsFavorite(false)
    }
    else {

        
        favoritesArray.push(teacher)

        console.log('Array de favoritos: ' + JSON.stringify(favoritesArray))
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
        setIsFavorite(true)

    }


}


    return(        
        <View style={styles.container} >
            <View style={styles.profile}>
                <Image style={styles.avatar} 
                source={{ uri: teacher.avatar }}
                />
            

            <View style={styles.profileInfo}>
                <Text style={styles.name}>{teacher.name}</Text>
                <Text style={styles.subject}>{teacher.subsject}</Text>
            </View>

            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                </Text>
                <Text style={styles.priceValue}>R$ {teacher.cost}</Text>

                <View style={styles.buttonsContainer} >

                    <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorite ? styles.favorite : {}]}> 
                        {isFavorite ? <Image source={unFavoriteIcon} /> : <Image source={heartOutlineIcon} />}
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}> 
                        <Image source={whatsappIcon}></Image>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>

                </View>
            </View>


        </View>
    )
}

export default TeacherItem;