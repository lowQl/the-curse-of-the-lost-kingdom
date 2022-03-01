const express = require('express');
const path = require('path');
const {dirname} = require('path');
const db = require(path.join(dirname(require.main.filename), 'connect'));

const router = express.Router();
const options = {
  root: path.join(__dirname, '../views/index'),
};

router.get('/', (req, res) => {
  if (req.session.user?.rank === 'manager') {
    res.sendFile('manage.html', options);
  } else {
    res.sendFile('login.html', options);
  }
});

/**
 * 登出
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

/**
 * 登入驗證
 */
router.post('/login', (req, res) => {
  const inputText = req.body.text;
  /**
   * 檢查是否為管理員
   */
  db.query('SELECT * FROM `manager` WHERE `id` = ?',
    [inputText.toUpperCase()], (err, results) => {
      if (!results.length) return;
      req.session.user = {
        rank: 'manager',
        id: results[0].id,
        role: results[0].role,
      };
      res.status(200).end('success');
    });

  /**
   * 檢查隊伍號碼輸入
   */
  db.query('SELECT * FROM `team` WHERE `id` = ?',
    [inputText], (err, results) => {
      if (!results.length) res.status(400).end('隊伍號碼輸入錯誤。');
      req.session.user = {
        rank: 'player',
        teamID: inputText,
      };
      res.status(200).end('continue');
    });
});

module.exports = router;
