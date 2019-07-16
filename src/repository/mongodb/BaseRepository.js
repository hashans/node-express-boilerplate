import moment from "../../config/configIoc";

export default class BaseRepository {

  constructor(mongoose, q, moment, collection) {
    this.mongoose = mongoose;
    this.q = q;
    this.collection = collection;
    this.moment = moment;

  }


  _insert (object, schema) {
    let model = this.mongoose.model(this.collection, schema);
    object.createdAt = this.moment.utc().format();

    let objectModel = new model(object);

    return objectModel.save()
      .then(result=> {
        return this.q.when(result);
      })
  }


  _find (query, schema) {
    let model = this.mongoose.model(this.collection, schema);

    return model.find(query)
      .then(result=> {
        return this.q.when(result);
      })
  }

  _findOne (query, schema) {
    let model = this.mongoose.model(this.collection, schema);

    return model.findOne(query)
      .then(result=> {
        return this.q.when(result);
      })
  }

  _update() {

  }

  _remove () {

  }


}