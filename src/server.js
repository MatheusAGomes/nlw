//criacao do servidor
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public - isso quer dizer que tornara ela em questao de visibilidade para o servidor como inexistente
server.use(express.static("public"))
//habilitar o uso do req body na nossa aplicação
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da aplicação
//pagina inicial
//req é uma requisição, um pedido
//res é uma resposta,uma entrega
server.get("/", (req, res) => {
    res.render("index.html")
})
//criando caminhos para o servidor
server.get("/create-point", (req, res) => {
    //req.query : query Strings da url

    res.render("create-point.html")
})
server.post("/save-point", (req, res) => {
    //req.body : o corpo do nosso formulario
      console.log(req.body)
      // inserir dados no banco de dados
      const query = `
      INSERT INTO places (
          image,name,address,number,state,city,items
      ) Values (
          ?,?,?,?,?,?,?
      ) ;
      `    
     //Array com o valor dos dados
      const values = [
          req.body.image,
          req.body.name,
          req.body.address,
          req.body.Number,
          req.body.statehidden,
          req.body.city,
          req.body.itenshidden
      ]
      function afterInsertData(error) {
          if (error) {
              return console.log(error)
              return res.send("Erro no cadastro")
          }
          console.log("Cadastrado com sucesso")
          console.log(this)
          return res.render("create-point.html",{saved: true})
  
      }
        
      db.run(query,values,afterInsertData)
    
})

//criando caminhos para o servidor
server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == '') {
        //pesquisa vazia
       return res.render("search-results.html",{ total:0})
    }
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error, rows) {
        if (error) {
            return console.log(error)
        }
        else {
            console.log("Aqui estão seus registros: ")
            console.log(rows)
            const total = rows.length
            //mostrar a pagina html com os dados do banco de dados
            res.render("search-results.html",{places: rows, total:total})
        }
    })

})
//ligar o servidor
server.listen(8000)