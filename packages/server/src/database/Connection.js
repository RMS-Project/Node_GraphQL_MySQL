// Inclusão do pacote.
//import { createConnection } from 'mysql2/promise'

// Promise - Que faz uma promessa de retorno.
// Identificada por ser uma função assíncrona.
// O programa espera a sua execução para continuar.
// Muito comum em funções que realizam consulta em banco de dados.
async function getClients(skip, take) {

  //const sql = 'SELECT JSON_ARRAYAGG(JSON_OBJECT(id, name, email, disabled)) FROM APP_DEMANDS.client ORDER BY name ASC LIMIT 0, 20;'
  const sql = `SELECT id, name, email, disabled FROM APP_DEMANDS.client ORDER BY name ASC LIMIT ${skip}, ${take};`
  //const sql = `SELECT JSON_ARRAYAGG(JSON_OBJECT(id, name, email, disabled)) OVER w items FROM APP_DEMANDS.client WINDOW w AS (ORDER BY name ASC) LIMIT 0, 20;`

  // Inclusão do pacote apenas quando a função for chamada.
  const { createConnection } = require('mysql2/promise')

  // Configuração da conexão com o banco de dados.
  const connection = await createConnection({
    host:'localhost', 
    user: 'root', 
    password : 'root',
    database : 'APP_DEMANDS'
  });

  // Busca os dados no banco de forma assíncrona.
  // Parâmetros - Consulta e função que recebe como parâmetro:
  // err    - Falha na busca ou não estabelecer conexão;
  // rows   - Linhas de resposta do banco de dados;
  // fields - Mapeamento dos campos da tabela do banco de dados em consulta.

  // Retorna um array com objetos Javascript.
  const [rows] = await connection.execute(sql)

  return rows
}

async function getTotalClients() {
  const sql = `SELECT COUNT(*) AS "totalItems" FROM APP_DEMANDS.client;`

  const { createConnection } = require('mysql2/promise')

  const connection = await createConnection({
    host:'localhost', 
    user: 'root', 
    password : 'root',
    database : 'APP_DEMANDS'
  });

  const [rows] = await connection.execute(sql)

  return rows[0].totalItems
}

export { getClients, getTotalClients }