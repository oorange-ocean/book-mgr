const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number

})

const UserModel = mongoose.model('User', UserSchema)

const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/library')
  mongoose.connection.on('open', () => {
    console.log('连接成功');

    const user = new UserModel({
      nickname: 'xiaoming',
      password: '123456',
      age: 18
    })
    user.age = 99;
    user.name = 'xiaohong'
    const user02 = new UserModel({
      nickname: 'xiaozhang',
      password: 'abcdefg',
      age: 22
    })


    user.save()
    user02.save()

  })
}
connect()