const AppError = require("../utils/AppError");
const knex = require('../database');

class RecordsController {

    async create(request, response) {
        const group_id = request.params.id;
        const {qtd_bags, show_feed} = request.body;

        const id = request.user;

        const group = await knex("groups").where({id: group_id}).first();

        if (!group) {
            throw new AppError("Grupo não encontrado");
        }

        const membership = await knex("group_members")
            .where({ user_id: id, group_id })
            .first();

        if (!membership) {
            throw new AppError("Ação permitida apenas para membros do grupo", 403);
        }

        if (![true, false].includes(show_feed)) {
            throw new AppError("Parâmetro show_feed inválido");
        }

        await knex('records').insert({
            qtd_bags,
            user_id: id,
            group_id,
            show_feed
        });

        return response.status(201).json();
    }

    async getFeedRecords(request, response) {
        const group_id = request.params.id;
        let { limit, offset } = request.query;

        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;

        const group = await knex("groups").where({id: group_id}).first();
        if (!group) {
            throw new AppError("Grupo não encontrado");
        }

        const membership = await knex("group_members")
            .where({ user_id: request.user, group_id })
            .first();
        
        if (!membership) {
            throw new AppError("Ação permitida apenas para membros do grupo", 403);
        }

        const records = await knex("records")
            .where({ group_id })
            .andWhere('show_feed', true)
            .limit(limit).offset(offset)
            .select("*");
        
        return response.json(records);
    }

    async getUserRecords(request, response) {
        
        const group_id = request.params.id;
        const user_id = request.user;
        let { limit, offset } = request.query;

        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;

        const group = await knex("groups").where({id: group_id}).first();
        if (!group) {
            throw new AppError("Grupo não encontrado");
        }

        const records = await knex("records")
            .where({ user_id })
            .andWhere({ group_id })
            .limit(limit).offset(offset)
            .select("*");

        return response.json(records);
    }

    async update(request, response) {
        const record_id = request.params.id;
        const {qtd_bags} = request.body;
        const user_id = request.user;
        const record = await knex("records").where({id: record_id}).first();
        if (!record) {
            throw new AppError("Registro não encontrado");
        }

        if (record.user_id !== user_id) {
            throw new AppError("Ação permitida apenas para o criador do registro", 403);
        }

        await knex("records").where({id: record_id}).update({qtd_bags});

        return response.status(200).json();
    }

    async delete(request, response) {
        const record_id = request.params.id;
        const user_id = request.user;
        const record = await knex("records").where({id: record_id}).first();
        if (!record) {
            throw new AppError("Registro não encontrado");
        }   
        if (record.user_id !== user_id) {
            throw new AppError("Ação permitida apenas para o criador do registro", 403);
        }
        await knex("records").where({id: record_id}).delete();

        return response.status(200).json();
    }
}

module.exports = RecordsController;