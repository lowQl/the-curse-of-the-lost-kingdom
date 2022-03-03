const express = require('express');
const path = require('path');
const { dirname } = require('path');
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

  db.query('SELECT * FROM `manager` WHERE `id` = ?',
    [inputText.toUpperCase()]).then(([rows, fields]) => {
    if (!rows.length) return;
    const row = rows[0];
    const user = {
      rank: 'manager',
      ...row,
    };
    req.session.user = user;
    res.status(200).end('success');
  });

  /**
   * 檢查隊伍號碼輸入
   */
  db.query('SELECT * FROM `team` WHERE `id` = ?',
    [inputText]).then(([rows, fields]) => {
    if (!rows.length) {
      return res.status(400).end('隊伍號碼輸入錯誤。');
    }
    req.session.user = {
      rank: 'player',
      teamID: inputText,
    };
    res.status(200).end('continue');
  });
});

module.exports = router;
