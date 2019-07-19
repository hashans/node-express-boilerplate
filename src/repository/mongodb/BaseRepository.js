let self;

export default class BaseRepository {

  constructor(mongoose, q, moment, collection) {
    self = this;
    self.mongoose = mongoose;
    self.q = q;
    self.collection = collection;
    self.moment = moment;

  }


  _insert (object, schema) {
    let model = self.mongoose.model(self.collection, schema);
    object.createdAt = self.moment.utc().format();

    let objectModel = new model(object);

    return objectModel.save()
      .then(result=> {
        return self.q.when(result);
      })
  }


  _find (query, schema) {
    let model = self.mongoose.model(self.collection, schema);

    return model.find(query)
      .then(result=> {
        return self.q.when(result);
      })
  }

  _findOne (query, schema) {
    let model = self.mongoose.model(self.collection, schema);

    return model.findOne(query)
      .then(result=> {
        return self.q.when(result);
      })
  }

  _update() {

  }

  _remove () {

  }


}