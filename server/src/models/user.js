const dbUtils = require('../utils/db');

class UserModal {

  /**
   * 根据用户名查找用户
   * @param  {object} username  用户名
   * @return {object|null}      返回用户信息或者null
  */
  static async getUserByUserName(username) {
    let _sql = 'SELECT * FROM ?? WHERE username = ? limit 1 '
    let result = await dbUtils.query(_sql, ['user', username])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
  * 根据部门查找用户
  * @param  {object} department    部门
  * @return {object|null}          返回用户信息或者null
  */
  static async getUserByDepartment(department) {
    let _sql = 'SELECT * FROM ?? WHERE department = ? limit 1 '
    let result = await dbUtils.query(_sql, ['user', department])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 查找用户列表
   * @return {Array}    返回用户信息
   * @param {Number} offset 从第offset页开始查询
   * @param {Number} pageSize 每次查询条数
   */
  static async getUserList(offset, pageSize) {
    let totalResult = await dbUtils.selectAll('user');
    let result = await dbUtils.findDataByPage('user', '*', offset, pageSize);
    if (Array.isArray(result) && result.length > 0) {
      return { list: result, total: totalResult.length};
    } else {
      result = [];
      return {result, total: 0};
    }
  }

  /**
   * 根据用户名、密码创建用户
   * @param  {object} options 用户名、密码
   * @return {object|null}    用户信息或null
   */
  static async createUser(options) {
    let result;
    let insertResult = await dbUtils.insertData('user', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('user', insertResult.insertId)
      if (res && res.length > 0) {
       result = res[0];
      }
    }
    return result;
  }

  /**
   * 更新用户
   * @param {object} options  
   */
  static async updateUser(options) {
    let updateResult = await dbUtils.updateData('user', options, options.id);
    return updateResult;
  }

  /**
   * 删除用户
   * @param {*} id 
   */
  static async deleteUser (id) {
    return await dbUtils.deleteDataById('user', id);
  }

}

module.exports = UserModal;
