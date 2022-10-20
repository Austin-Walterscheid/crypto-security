const users = []
const bcrypt = require(`bcrypt`)
module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password,} = req.body
      let userData
      for(let i =0; i < users.length; i++) {
        if(database[i].username === username) {
          userData = database [i]
        }
      }
      if (userData === undefined) {
        res.status(200).send({success: false, message: `bad username or password`})
      }else{
        bcrypt.compare(password, userData.password, (error, success) =>{
          if(!error) {
            if (success){
              let userCard = userData
              delete userCard.hashPass
              res.status(200).send(userCard)
            }
          }
            })
          }
    },
    register: (req, res) => {
      const {email, password, firstName, lastName, username} = req.body
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, (error, hashPass) => {
        let newDatabaseEntry = {}
        newDatabaseEntry.password = hashPass
        newDatabaseEntry.firstName = firstName
        newDatabaseEntry.lastName = lastName
        newDatabaseEntry.confirmPassword = hashPass
        newDatabaseEntry.email = email
        newDatabaseEntry.username = username
        console.log('Registering User')
        console.log(newDatabaseEntry)
        users.push(newDatabaseEntry)
        res.status(200).send(req.body)

      })
    }
}


