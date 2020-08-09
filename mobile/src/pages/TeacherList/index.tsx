import React, {useState, useEffect} from 'react'
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton  } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import asyncStorage from '@react-native-community/async-storage';

function TeacherList() {

    const [isFilterVisible, setIsFiltersVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    
    useEffect(() => {
        AsyncStorage.getItem('favorites').then(
            response => {
                if(response){

                    
                    const favoritedTeachers = JSON.parse(response);
                    console.log('Favoritos no dispositivo ' + JSON.stringify(favoritedTeachers))
                    const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {return teacher.id});
                    setFavorites(favoritedTeachersIds)
                }
            }
        )
       }, [])

    function handleToggleFilter(){
        setIsFiltersVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit(){
        const response = 
        await api.get('classes',{
            params: {
                subject,
                week_day,
                time
            }
        }
        )
        setTeachers(response.data)   
        setIsFiltersVisible(false)
    }

    interface Teacher {
        id: number;
        avatar: string;
        bio: string;
        cost: number;
        name: string;
        subsject: string;
        whatsapp: string;
    }

    return <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton >
                    <Feather onPress={handleToggleFilter} name="filter" size={20} color="#fff"></Feather>
                </BorderlessButton>
            )}>
               
            {isFilterVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput value={subject} onChangeText={ text => setSubject(text) } placeholderTextColor="#c1bccc"   style={styles.input} placeholder="Qual a matéria?"/>
                    <View style={styles.inputGroup}>

                        <View style={styles.inputBlock}>    
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput value={week_day} onChangeText={ text => setWeekDay(text) } placeholderTextColor="#c1bccc"  style={styles.input} placeholder="Qual o dia?"/>
                        </View>

                        <View style={styles.inputBlock}>    
                            <Text style={styles.label}>Horário</Text>
                            <TextInput value={time} onChangeText={ text => setTime(text) } placeholderTextColor="#c1bccc"  style={styles.input} placeholder="Qual o horário?"/>
                        </View>

                    </View>

                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>

                </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map( (teacher: Teacher) => {
                        return <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)}
                        />
                    }
                )}


            </ScrollView>
        </View>
}


export default TeacherList;