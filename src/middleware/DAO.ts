import { getDatabase } from '../database/mongodb';

interface Condition {
  [key: string]: any;
}

interface Project {
  [key: string]: 0 | 1;
}

interface Page {
  skip?: number;
  limit?: number;
}

interface Sort {
  [key: string]: 1 | -1;
}

const db: any = getDatabase();

const insert = (model: string, data: any): Promise<any> => db.collection(model).insertOne(data);

const insertMany = (model: string, data: any[]): Promise<any> => db.collection(model).insertMany(data);

const createIndex = (model: string, condition: Condition, name: string): Promise<any> =>
  db.collection(model).createIndex(condition, { name });

const createMultipleIndex = (model: string, condition: Condition): Promise<any> =>
  db.collection(model).createIndexes(condition);

const findOne = (model: string, condition: Condition, project: Project = {}): Promise<any> =>
  db.collection(model).findOne(condition, { projection: project });

const update = (model: string, condition: Condition, data: any): Promise<any> =>
  db.collection(model).updateOne(condition, data);

const updateMany = (model: string, condition: Condition, data: any): Promise<any> =>
  db.collection(model).updateMany(condition, data);

const aggregate = (model: string, condition: any[]): Promise<any> =>
  db.collection(model).aggregate(condition).toArray();

const Delete = (model: string, condition: Condition): Promise<any> => db.collection(model).deleteOne(condition);

const deleteMany = (model: string, condition: Condition): Promise<any> => db.collection(model).deleteMany(condition);

const count = (model: string, condition: Condition): Promise<any> => db.collection(model).countDocuments(condition);

const findOneAndUpdate = (model: string, condition: Condition, data: any): Promise<any> =>
  db.collection(model).findOneAndUpdate(condition, data);

const find = (model: string, condition: Condition, project: Project = {}, page: Page = {}, sort: Sort): Promise<any[]> =>
  db.collection(model)
    .find(condition, { projection: project })
    .sort(sort || {})
    .skip(page.skip || 0)
    .limit(page.limit || 100)
    .toArray();

const findAll = (model: string, condition: Condition, project: Project = {}, page: Page = {}, sort: Sort): Promise<any[]> =>
  db.collection(model)
    .find(condition, { projection: project })
    .sort(sort || {})
    .toArray();

export {
  insert,
  insertMany,
  update,
  find,
  findOne,
  aggregate,
  createIndex,
  Delete,
  count,
  findOneAndUpdate,
  createMultipleIndex,
  deleteMany,
  findAll,
  updateMany,
};
