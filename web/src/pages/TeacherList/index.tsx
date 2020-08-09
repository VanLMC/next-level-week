import React, {useState, FormEvent} from 'react'
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject ] = useState('');
    const [week_day, setWeekDay ] = useState('');
    const [time, setTime ] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        //console.log()
     const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)

    }

    return (
        <div id="page-teacher-list" className="container">

        <PageHeader title="Estes são os Proffys disponíveis">
            <form onSubmit={searchTeachers} id="search-teachers">
                
                <Select name="subject" label="Materia" 
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}} 
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'Geografia', label: 'Geografia'},
                    {value: 'Ingles', label: 'Ingles'}
                    ]}/>

                <Select name="week_day" label="Dia da semana" 
                    value={week_day}
                    onChange={(e) => {setWeekDay(e.target.value)}} 
                options={[
                    {value: '0', label: 'Domingo'},
                    {value: '1', label: 'Segunda'},
                    {value: '2', label: 'Terca'},
                    {value: '3', label: 'Quarta'},
                    {value: '4', label: 'Quinta'},
                    {value: '5', label: 'Sexta'},
                    {value: '6', label: 'Sabado'}
                    ]}/>

                <Input name="time" label="Hora" type="time" 
                    value={time}
                    onChange={(e) => {
                        setTime(e.target.value)
                    }}
                />

                <button type="submit">Buscar</button>
                
            </form>
        </PageHeader>

        <main>
            {teachers.map((teacher: Teacher) => {
                return <TeacherItem key={teacher.id} teacher={teacher} />
            })}
        </main>

        </div>
    )
}

export default TeacherList;