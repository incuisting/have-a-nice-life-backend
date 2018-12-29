'use strict';
const Service = require('egg').Service;
const url = require('url');
const qs = require('querystring');
const moment = require('moment');
class UsersService extends Service {
  async query() {
    const list = await this.app.mysql.select('user');
    list.forEach(i => {
      i.queue_date = moment(list.queue_date).format('YYYY-MM-DD');
    });
    return list;
  }
  async create(params) {
    /**
     * TODO
     * 获取昵称 存入数据库
     */
    const { mysql } = this.app;
    const insertData = this.getInsertData(params);
    try {
      await mysql.insert('user', insertData);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return { msg: 'same day had a apply', status: false };
      }
      console.error(e);
    }
    return { msg: 'insert success', status: true };
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
    console.log('query', query);
    return result;
  }
}

module.exports = UsersService;
