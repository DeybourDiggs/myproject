const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`Database connected : ${conn.connection.host}`);
//   } catch(error) {
//     console.log(error);
//   }
// }

const connectDB =  async ()=>{

  try{
      const conn = await mongoose.connect(process.env.MONGO_URI,{
          //must add in order to not get any error masseges:
          useUnifiedTopology:true,
          useNewUrlParser: true,
          // useCreateIndex: true
      })
      console.log(`mongo database is connected!!! ${conn.connection.host} `)
  }catch(error){
      console.error(`Error: ${error} `)
      process.exit(1) //passing 1 - will exit the proccess with error
  }

}

module.exports = connectDB