require('./Schemas/User.js')
const mongoose = require('mongoose');

const connect = () => {

  return new Promise((reslove) => {
    mongoose.connect('mongodb://127.0.0.1:27017/library')
    mongoose.connection.on('open', () => {
      console.log('连接成功');
      reslove()



    })

  })


}
module.exports = {
  connect,
}