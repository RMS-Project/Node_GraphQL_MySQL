// Simula um controlador do banco de dados
// para trazer os dados do JSON.

// fs - Biblioteca para sistema de arquivos.
// readFile - Le arquivos de forma assíncrona.
import { readFile } from 'fs'

// path - Lida com caminhos de arquivos
// revolve - Obtém o caminho relativo.
import { resolve } from 'path'

function createRepository(name) {
  const path = resolve(__dirname, `../../data/${name}.json`);

  return {
    read: () =>
      // A Promise recebe um callback que resolve esta promise.
      new Promise((resolve, reject) => {
        readFile(path, (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(JSON.parse(data));
        });
      }),

    write: (data) =>
      new Promise((resolve, reject) => {
        writeFile(path, JSON.stringify(data), (error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      }),
  };
}

export default createRepository;