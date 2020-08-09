import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

//corpo (request body): dados para criacao ou atualizacao de um registro
//route params: identificar qual recurso atualizar ou deletar
//query params: paginacao e filtros
app.use(cors())
app.use(express.json())

app.use(routes)


/*
app.get('/users/:id', (request, response) => {
    //const users = [{name: 'Vanderlei', age: 22}] ;
    //console.log(request.body)
    //console.log(request.params)

    
})
*/



console.log('server ok')

app.listen(8000)



