'use strict';
import BaseRepository from "./BaseRepository";

let self;
export default class UserRepository extends BaseRepository {

  constructor(mongoose, q, config, moment) {
    super(mongoose, q, moment, config.collection.user);
    self = this;
    self.mongoose = mongoose;
    self.q = q;
    self.config = config;
    self.userSchema = {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      createdAt: Date,
      updatedAt: Date
    };
    self.schema = new self.mongoose.Schema(self.userSchema);

  }


  addUser(firstName, lastName, email, password) {

    let userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    return self._insert(userObject, self.schema)
      .then(result => {
        return self.q.when(result);
      })
      .catch(error => {
        console.error(error);
        return self.q.when(null);
      })
  }

  getUserByEmail(email) {
    let userObject = {
      email: email
    };

    return self._findOne(userObject, self.schema)
      .then(result => {
        return self.q.when(result);
      })
      .catch(error => {
        console.error(error);
        return self.q.when(null);
      })
  }

  getUserById(id) {
    let userObject = {
      _id: id
    };
    return self._findOne(userObject, self.schema)
      .then(result => {
        return self.q.when(result);
      })
      .catch(error => {
        console.error(error);
        return self.q.when(null);
      })
  }


  _update() {

  }

  _remove() {

  }


}