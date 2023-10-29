import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"
const PORT=process.env.PORT || 5000



//connectToDatabase

connectToDatabase()
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
  })
})
.catch((err)=>console.log(err))