import React, {useState, FormEvent} from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css';
import warningIcon from '../../assets/icons/warning.svg';

import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

function TeacherForm() {

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const history = useHistory();

    const [scheduleItem , setScheduleItem ] = useState([
        {week_day: 0, from: "", to: ""}
    ]);


    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItem
        }).then(() => {
            history.push('/') //redirecionar o usuario
        })
        .catch((err) => {
            alert('erro no cadastro! ' + err);
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItem
        })
    }

    function setScheduleItemvalue(position: number, field: string, value: string){
        
        const newArray = scheduleItem.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value} //se for o index selecionado copia o que ja existia e seta só o week_day como o valor passado
            }

            return scheduleItem //caso nao seja o index selecionado 
        })

        setScheduleItem(newArray) //seta o novo array no estado

    }

 

    function addNewScheduleItem(){
        setScheduleItem([
            ...scheduleItem,
            {
            week_day: 0,
            from: '',
            to: ''
            }
        ])
    }


    return (

        <div id="page-teacher-form" className="container">
        <PageHeader title="Que incrível que você quer dar aulas!"
            description = "O primeiro passo é preencher esse formulario de inscricao"
        />
        <main>
            <form action="" onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus Dados</legend>
                <Input name="name" label="Nome Completo" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
                <Textarea name="bio" label="bio" value={bio} onChange={(e) => {setBio(e.target.value)}} />

                <legend>Sobre a Aula</legend>
                <Select name="subject" value={subject} 
                onChange={(e) => { setSubject(e.target.value)}}
                label="Materia" 
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'Geografia', label: 'Geografia'},
                    {value: 'Ingles', label: 'Ingles'}
                    ]}/>
                <Input name="cost" label="Custo da sua hora/aula" value={cost} onChange={(e) => {setCost(e.target.value)}} />
            
            </fieldset>

            <fieldset>
                <legend>Horários disponíveis

                <button onClick={addNewScheduleItem} type="button">+ novo horario</button>
                </legend>

                {scheduleItem.map((si, index) =>{
                   return (
<div className="schedule-item" key={si.week_day}>
                <Select  name="week_day" label="Dia da semana" 
                    onChange={e =>  setScheduleItemvalue(index, 'week_day', e.target.value)}
                    value={si.week_day}
                options={[
                    {value: '0', label: 'Domingo'},
                    {value: '1', label: 'Segunda'},
                    {value: '2', label: 'Terca'},
                    {value: '3', label: 'Quarta'},
                    {value: '4', label: 'Quinta'},
                    {value: '5', label: 'Sexta'},
                    {value: '6', label: 'Sabado'}
                    ]}/>
                    
                    <Input name="from" label="Das" type="time" value={si.from} onChange={(e) => setScheduleItemvalue(index, 'from', e.target.value)}/>
                    <Input name="to" label="Ate" type="time" value={si.to} onChange={(e) => setScheduleItemvalue(index, 'to', e.target.value)} />
                </div>
                   ); 
                    } )}
                
            </fieldset>
            
          
        <footer>
            <p>
                <img src={warningIcon} alt="Aviso importante"/>
                Importante! <br/>
                Preenca todos os dados
            </p>
                <button type="submit">Salvar Cadastro</button>
        </footer>
        </form>

        </main>

        </div>


    )
}

export default TeacherForm;