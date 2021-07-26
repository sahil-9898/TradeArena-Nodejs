const app = require("express")();






app.listen(process.env.PORT||3000, ()=>{
    console.log("Started on localhost 3000");
})