'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.url);
    ctx.body = 'ok';
  }
}

module.exports = HomeController;
