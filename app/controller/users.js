'use strict';
const Controller = require('egg').Controller;

const createRule = {
  url: 'string',
  date: 'string',
  people_num: 'number',
  store_id: 'string',
  store_name: 'string',
};
const updateRule = {
  open_id: 'string',
};
class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const users = await ctx.service.users.query();
    ctx.body = {
      data: users,
    };
    ctx.status = 200;
  }
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const result = await ctx.service.users.create(ctx.request.body);
    ctx.body = {
      data: result,
    };
    ctx.status = 201;
  }
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.users.update(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = {
      data: result,
    };
    ctx.status = 200;
  }
  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.users.delete(ctx.params.id);
    ctx.body = {
      data: result,
    };
    ctx.status = 200;
  }
}
module.exports = UsersController;
