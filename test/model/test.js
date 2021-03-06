module.exports = (app) => {
  const mongoose = app.service('Mongoose');
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const { Schema } = mongoose;

  const votesSchema = new Schema({
    _id: false,
    user: { type: ObjectId, ref: 'user' },
    type: { type: String, enum: ['p', 'n'] },
  });

  const schema = new Schema({
    slug: { type: String },
    name: { type: String, required: true },
    description: { type: String, allowHtml: true, settings: { field: 'textarea' } },
    email: { type: String, pattern: 'email' },
    user: { type: ObjectId, ref: 'user' },
    isEnabled: { type: String, enum: ['y', 'n'], default: 'n' },
    createdAt: { type: Date },
    workerCount: { type: Number, default: 0, lte: 1000 },
    arr1: { type: [String], settings: { html: { allowedTags: ['a'] } } },
    arr2: { type: [String], allowHtml: true, match: /test/i, minLength: 2 },
    arr3: [{ type: String, allowHtml: true, arrOpts: { minLength: 2, maxLength: 8 } }],
    numsArr1: { type: [Number], gte: 1, lte: 100 },
    numsArr2: [Number],
    links: {
      web: { type: String, pattern: 'url' },
      apple: { type: String, pattern: 'url' },
      google: { type: String, pattern: 'url' },
    },
    workers: { type: [ObjectId], ref: 'user' },
    votes: { type: [votesSchema], arrOpts: { minLength: 2 } },
    testRef1: { type: ObjectId, ref: 'test' },
    testRef2: { type: ObjectId, ref: 'test' },
    num1: { type: Number },
    num2: { type: Number },
    num3: { type: Number },
    date1: { type: Date, settings: { field: 'datetime' } },
    date2: { type: Date },
    date3: { type: Date },
  });

  const model = mongoose.model('test', schema);
  return model;
};
