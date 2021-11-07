/*

import Client from '../models/client.model';
import {ClientInterface} from '../models/types/interfaces'

export default class ClientController{
    async findAll() {
        return Client.findAll();
    }

    async findById(id: number) {
        return Client.findByPk(id);
    }

    async deleteById(id: number) {
        return Client.destroy({ where: { id: id } });
    }

    async create(client:ClientInterface) {
        const newClient = new Client(client);
        return newClient.save();
    }

    async update(client:ClientInterface, id: number) {
        const updateClient = {
            title: client.fullname,
            email:client.email
        };
        return Client.update(updateClient, { where: { id: id } });
    }
}
*/
