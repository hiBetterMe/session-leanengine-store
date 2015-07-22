/*!
 * session-leanengine-store
 * Copyright(c) 2015 iBetterMe.com
 * MIT Licensed
 */

/**
 * TODO: 缓存数据
 */

/**
 * Return the `RedisStore` extending `express`'s session Store.
 *
 * @param {object}  session express
 * @return {Function}
 * @api public
 */

module.exports = function (session, AV) {

  /*
   var session = {
   // session id
   sid: "sid",
   // session 的值
   data: ""
   };
   */

  var SessionObject = AV.Object.extend("ExpressSession", {
// 实例方法
  }, {
// 类方法
  });


  /**
   * Express's session Store.
   */

  var Store = session.Store;

  /**
   * Initialize LeanengineStore with the given `options`.
   *
   * @param {Object} options
   * @api public
   */

  function LeanengineStore(options) {
    var self = this;

  }

  /**
   * Inherit from `Store`.
   */

  LeanengineStore.prototype.__proto__ = Store.prototype;


  /**
   * This optional method is used to get all sessions in the store as an array.
   * @param callback (error, sessions)
   */

    // TODO: 查找了所有数据，确定有没有性能问题。
  LeanengineStore.prototype.all = function (callback) {
    callback = callback || function (error, sessions) {
      };

    var query = new AV.Query(SessionObject);
    query.exists('sid');
    query.find({
      success: function (results) {
        var objects = results.map(function (result) {
          return new SessionObject(result);
        });
        return callback(null, objects);
      },
      error: function (error) {
        return callback(error, null);
      }
    });
    callback(null, []);
  };
  /**
   * This optional method is used to delete all sessions from the store.
   * @param callback(error)
   */
  LeanengineStore.prototype.clear = function (callback) {
    callback = callback || function (error) {
      };
    var query = new AV.Query(SessionObject);
    query.exists('sid');
    query.destroyAll({
      success: function () {
        callback();
      }, error: function (error) {
        callback(error)
      }
    });
  };
  /**
   * Destroy the session associated with the given `sid`.
   *
   * @param sid
   * @param callback(error)
   */

  LeanengineStore.prototype.destroy = function (sid, callback) {
    callback = callback || function (error) {
      };
    var query = new AV.Query(SessionObject);
    query.equalTo('sid', sid);
    query.destroyAll({
      success: function () {
        callback();
      }, error: function (error) {
        callback(error)
      }
    });
  };
  /**
   * Attempt to fetch session by the given `sid`.
   *
   * @param {String} sid
   * @param {Function} callback(error, session)
   * @api public
   */

  LeanengineStore.prototype.get = function (sid, callback) {
    var query = new AV.Query(SessionObject);
    query.equalTo('sid', sid);
    query.first({
      success: function (sessionObject) {
        if (!sessionObject) {
          return callback(null, null);
        }
        var session = new SessionObject(sessionObject);
        var data = session.get('data') || '{}';
        try {
          data = JSON.parse(data);
        }
        catch (error) {
          return callback(error);
        }
        return callback(null, data);
      }, error: function (error) {
        callback(error)
      }
    });
  };

  /**
   * Commit the given `sess` object associated with the given `sid`.
   *
   * @param {String} sid
   * @param {Session} sess
   * @param {Function} callback (error)
   * @api public
   */

  LeanengineStore.prototype.set = function (sid, sess, callback) {
    var data;
    try {
      data = JSON.stringify(sess);
    }
    catch (e) {
      return callback(e);
    }

    var query = new AV.Query(SessionObject);
    query.equalTo('sid', sid);
    query.first({
      success: function (sessionObject) {
        if (sessionObject) {
        }
        else{
          sessionObject = new SessionObject();
          sessionObject.set('sid',sid);
        }
        sessionObject.set('data',data);
        sessionObject.save(null, {
          success: function () {
            callback(null);
          },
          error: function (s, error) {
            callback(error);
          }
        });
      },
      error: function () {
        callback(error);
      }
    });
  };


  /**
   * Refresh the time-to-live for the session with the given `sid`.
   * 不明白 touch是什么意思
   * @param {String} sid
   * @param {Session} sess
   * @param {Function} fn
   * @api public
   */
  //
  //LeanengineStore.prototype.touch = function (sid, sess, fn) {
  //
  //};

  return LeanengineStore;
};