//importar a dependencia do sqlit
const sqlite3 = require("sqlite3").verbose()
//iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")



module.exports = db;

//utilizar o banco de dados para operações

db.serialize(() => {
    //criar uma tabela






    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        number TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `)

    //inserir dados na tabela - create-point








    //comando de insercao de dados
    const query = `
    INSERT INTO places (
        image,name,address,number,state,city,items
    ) Values (
        ?,?,?,?,?,?,?
    ) ;
    `







    //Array com o valor dos dados
    const values = [
        "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        "Papersider",
        "Guilherme Gemballa,Jardim America",
        "260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Electrônicos,Lâmpadas"
    ]
    function afterInsertData(error) {
        if (error) {
            return console.log(error)
        }
        console.log("cadastrado com sucesso")
        console.log(this)

    }
    //Comando para execurtar a insercao dos dados com os valores - AfterInsertData [e] uma funcao para retorno do banco de dados
    // caso o db run retorne um erro a funcao mostra no console o erro
    // caso nao retorne erro mostra no console o cadastro



    //db.run(query,values,afterInsertData)




   // consultar dados da tabela - search-point
    // db.all(`SELECT * FROM places`,function (error,rows) {
    //     if(error)
    //     {
    //         return console.log(error)
    //     }
    //     else
    //     {
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    //     }
    // })
    //deletar dados

    // db.run(`
    // DROP TABLE IF EXISTS places
    // `,[1],function(error) {
    //     if(error)
    //     {
    //         return console.log(error)
    //     }
    //     else
    //     {
    //     console.log("Registro deletado com sucesso: ")
    //     }
    // })

})

