// Inclusão dos pacotes.
//import { createConnection } from 'mysql2/promise'

// Configuração da conexão com o banco de dados.
/*var connection = createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'APP_DEMANDS'
})*/

// Abrir conexão com o banco de dados.
//connection.connect()

export default async function getClients() {

  //let sql = 'SELECT JSON_ARRAYAGG(JSON_OBJECT(id, name, email, disabled)) FROM APP_DEMANDS.client ORDER BY name ASC LIMIT 0, 20;'
  let sql = `SELECT id, name, email, disabled FROM APP_DEMANDS.client ORDER BY name ASC LIMIT 0, 2;`
  //let sql = `SELECT JSON_ARRAYAGG(JSON_OBJECT(id, name, email, disabled)) OVER w items FROM APP_DEMANDS.client WINDOW w AS (ORDER BY name ASC) LIMIT 0, 20;`

  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password : 'root', database : 'APP_DEMANDS'});
  // query database

  // Busca os dados de forma assíncrona.
  // Parâmetros - Consulta e função que recebe como parâmetro:
  // err    - Falha na busca ou não estabelecer conexão;
  // rows   - Linhas de resposta do banco de dados;
  // fields - Mapeamento dos campos da tabela do banco de dados em consulta.
  const [rows] = await connection.execute(sql);

  return rows
}


// Realizar a busca no banco de dados.
/*async function getClients() {
  let sql = `SELECT id, name, email, disabled FROM APP_DEMANDS.client ORDER BY name ASC LIMIT 0, 2;`

  // Busca os dados de forma assíncrona.
  // Parâmetros - Consulta e função que recebe como parâmetro:
  // err    - Falha na busca ou não estabelecer conexão;
  // rows   - Linhas de resposta do banco de dados;
  // fields - Mapeamento dos campos da tabela do banco de dados em consulta.
  connection.query(sql, (err, rows) => {    

    // Caso não apresente erro, envia as linhas da tabela
    if (err) throw err
      console.log(rows)
      // response.json({rows}) // Retorna um json com um array "rows".
      // response.send(rows) // Retorna um Array.
  })

  // Fecha conexão com o banco de dados.
  // connection.end()
}

export default getClients*/