
import {Model} from "sequelize"
import {BaseInterface} from '../models/types/interfaces'
const BaseModel = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateById: updateById
}

function findAll() {
    return Model.findAll();
}

function findById(id: number) {
    return Model.findByPk(id);
}

function deleteById(id: number) {
    return Model.destroy({ where: { id: id } });
}

function create(client:ClientInterface) {
    const newClient = new Client(client);
    return newClient.save();
}

function updateById(client:ClientInterface, id: number) {
    const updateClient = {
        title: client.fullname,
        email: client.email
    };
    return Model.update(updateClient, { where: { id: id } });
}
module.exports = ClientDAO;