import knex from 'knex'; //query builder utilizado com o sqlite
import path from 'path';


const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
})

export default db;