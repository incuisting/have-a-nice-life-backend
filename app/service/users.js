'use strict';
const Service = require('egg').Service;
const url = require('url');
const qs = require('querystring');
class UsersService extends Service {
  async index() {
    const ctx = this.ctx;
    ctx.body = 'success';
  }
  async create(params) {
    /**
     * TODO
     * 获取昵称 存入数据库
     */
    const insertData = this.getInsertData(params);
    const result = await this.app.mysql.insert('user', insertData);
    console.log('insertData', result);
    return 'success';
  }
  getInsertData(params) {
    const result = {};
    const query = qs.parse(url.parse(params.url).query);
    result.open_id = query.weixin_user_id;
    result.people_num = params.people_num;
    result.url = params.url;
    result.store_id = params.store_id;
    result.store_name = params.store_name;
    result.queue_date = params.date;
    return result;
  }
}

module.exports = UsersService;
