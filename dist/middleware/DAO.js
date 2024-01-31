"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMany = exports.findAll = exports.deleteMany = exports.createMultipleIndex = exports.findOneAndUpdate = exports.count = exports.Delete = exports.createIndex = exports.aggregate = exports.findOne = exports.find = exports.update = exports.insertMany = exports.insert = void 0;
const mongodb_1 = require("../database/mongodb");
const db = (0, mongodb_1.getDatabase)();
const insert = (model, data) => db.collection(model).insertOne(data);
exports.insert = insert;
const insertMany = (model, data) => db.collection(model).insertMany(data);
exports.insertMany = insertMany;
const createIndex = (model, condition, name) => db.collection(model).createIndex(condition, { name });
exports.createIndex = createIndex;
const createMultipleIndex = (model, condition) => db.collection(model).createIndexes(condition);
exports.createMultipleIndex = createMultipleIndex;
const findOne = (model, condition, project = {}) => db.collection(model).findOne(condition, { projection: project });
exports.findOne = findOne;
const update = (model, condition, data) => db.collection(model).updateOne(condition, data);
exports.update = update;
const updateMany = (model, condition, data) => db.collection(model).updateMany(condition, data);
exports.updateMany = updateMany;
const aggregate = (model, condition) => db.collection(model).aggregate(condition).toArray();
exports.aggregate = aggregate;
const Delete = (model, condition) => db.collection(model).deleteOne(condition);
exports.Delete = Delete;
const deleteMany = (model, condition) => db.collection(model).deleteMany(condition);
exports.deleteMany = deleteMany;
const count = (model, condition) => db.collection(model).countDocuments(condition);
exports.count = count;
const findOneAndUpdate = (model, condition, data) => db.collection(model).findOneAndUpdate(condition, data);
exports.findOneAndUpdate = findOneAndUpdate;
const find = (model, condition, project = {}, page = {}, sort) => db.collection(model)
    .find(condition, { projection: project })
    .sort(sort || {})
    .skip(page.skip || 0)
    .limit(page.limit || 100)
    .toArray();
exports.find = find;
const findAll = (model, condition, project = {}, page = {}, sort) => db.collection(model)
    .find(condition, { projection: project })
    .sort(sort || {})
    .toArray();
exports.findAll = findAll;
