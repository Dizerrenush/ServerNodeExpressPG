
import Client from '../models/client.model';
import {ClientInterface} from '../models/types/interfaces'
const ClientDAO = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateGig: update
}

function findAll() {
    return Client.findAll();
}

function findById(id: number) {
    return Client.findByPk(id);
}

function deleteById(id: number) {
    return Client.destroy({ where: { id: id } });
}

function create(client:ClientInterface) {
    const newClient = new Client(client);
    return newClient.save();
}

function update(client:ClientInterface, id: number) {
    const updateClient = {
        title: client.fullname,
        email:client.email
    };
    return Client.update(updateClient, { where: { id: id } });
}
module.exports = ClientDAO;