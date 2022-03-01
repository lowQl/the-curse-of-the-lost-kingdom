const express = require('express');
const dateFormat = require('../module/dateFormat');
const path = require('path');
const {dirname} = require('path');
const db = require(path.join(dirname(require.main.filename), 'connect'));

const router = express.Router();
const options = {
  root: path.join(__dirname, '../views/manage'),
};

/**
 * 登入檢查
 */
router.all('*', (req, res, next) => {
  if (req.session.user?.rank !== 'manager') {
    if (req.method === 'GET') {
      return res.redirect(307, '/');
    } else {
      return res.status(404).json({redirect: '/'});
    }
  }
  next();
});

// ------------------人員------------------

/**
 * 取得管理人員頁面
 */
router.get('/user', (req, res) => {
  res.sendFile('user.html', options);
});

/**
 * 取得所有管理人員
 */
router.get('/users', (req, res) => {
  db.query('SELECT * FROM manager', (err, results) => {
    res.status(200).json(results);
  });
});

/**
 * 新增管理人員
 */
router.post('/user', (req, res) => {
  const {id, role} = req.body;
  return db.query('INSERT INTO manager (id,role) VALUES (?, ?)',
    [id.toUpperCase(), role], (err, results) => {
      if (err) {
        const errMsg = {
          '1062': '學號重複',
        };
        return res.status(400).end(errMsg[err.errno] || '新增失敗');
      }
      return res.status(200).end('success');
    });
});

/**
 * 刪除管理人員
 */
router.delete('/user/:id', (req, res) => {
  const {id} = req.params;
  db.query('DELETE FROM manager WHERE id = ?',
    [id], (err, results) => {
      if (err) {
        return res.status(400).end('刪除失敗');
      }
      if (id === req.session.user.id) { // 刪除自己
        req.session.destroy();
        res.status(404).json({redirect: '/'});
      }
      return res.status(200).end('success');
    });
});

// ------------------隊伍------------------

/**
 * 取得隊伍頁面
 */
router.get('/team', (req, res) => {
  res.sendFile('team.html', options);
});

/**
 * 取得所有隊伍
 */
router.get('/teams', (req, res) => {
  return db.query('SELECT * FROM team ORDER BY upload_date ASC',
    (err, results) => {
      return res.status(200).json(results);
    });
});


/**
 * 新增隊伍
 */
router.post('/team', (req, res) => {
  const {id} = req.body;
  return db.query('INSERT INTO team (id, upload_date) VALUES (?, ?)',
    [id, dateFormat(new Date())], (err, results) => {
      if (err) {
        const errMsg = {
          '1062': '隊伍編號重複',
        };
        return res.status(400).end(errMsg[err.errno] || '新增失敗');
      }
      return res.status(200).end('success');
    });
});

/**
 * 刪除隊伍
 */
router.delete('/team/:id', (req, res) => {
  const {id} = req.params;
  db.query('DELETE FROM team WHERE id = ?',
    [id], (err, results) => {
      if (err) {
        return res.status(400).end('刪除失敗');
      }
      return res.status(200).end('success');
    });
});

module.exports = router;
