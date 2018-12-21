'use strict';
const Controller = require('egg').Controller;

const createRule = {
  url: 'string',
  date: 'string',
  people_num: 'number',
  store_id: 'string',
  store_name: 'string',
};
class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const users = await ctx.service.users.query();
    ctx.body = {
      users,
    };
    ctx.status = 200;
  }
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const id = await ctx.service.users.create(ctx.request.body);
    ctx.body = {
      id,
    };
    ctx.status = 201;
  }
}
module.exports = UsersController;
