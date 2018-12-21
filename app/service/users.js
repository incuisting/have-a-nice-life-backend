'use strict';
const Service = require('egg').Service;
const url = require('url');
const qs = require('querystring');
const moment = require('moment');
class UsersService extends Service {
  async query() {
    const date = moment().format('YYYY-MM-DD');
    const list = await this.app.mysql.get('user', { queue_date: date });
    return list;
  }
  async create(params) {
    /**
     * TODO
     * 获取昵称 存入数据库
     */
    const insertData = this.getInsertData(params);
    await this.app.mysql.insert('user', insertData);
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
