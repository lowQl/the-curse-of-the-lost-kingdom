-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        10.6.5-MariaDB - mariadb.org binary distribution
-- 伺服器作業系統:                      Win64
-- HeidiSQL 版本:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 傾印 tcotlk 的資料庫結構
CREATE DATABASE IF NOT EXISTS `tcotlk` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `tcotlk`;

-- 傾印  資料表 tcotlk.manager 結構
CREATE TABLE IF NOT EXISTS `manager` (
  `id` varchar(9) NOT NULL COMMENT '學號',
  `role` varchar(50) NOT NULL COMMENT '角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理者\r\n';

-- 正在傾印表格  tcotlk.manager 的資料：~5 rows (近似值)
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
REPLACE INTO `manager` (`id`, `role`) VALUES
	('B109', '123'),
	('B110', '測試人員'),
	('B11017000', 'none'),
	('B11017002', 'Coder'),
	('B11017007', '呱');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;

-- 傾印  資料表 tcotlk.sessions 結構
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在傾印表格  tcotlk.sessions 的資料：~0 rows (近似值)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- 傾印  資料表 tcotlk.team 結構
CREATE TABLE IF NOT EXISTS `team` (
  `id` varchar(50) NOT NULL COMMENT '隊伍編號',
  `name` varchar(255) DEFAULT NULL COMMENT '隊伍名稱',
  `money` int(11) NOT NULL DEFAULT 0 COMMENT '金錢',
  `upload_date` datetime NOT NULL COMMENT '新增日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='隊伍';

-- 正在傾印表格  tcotlk.team 的資料：~3 rows (近似值)
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
REPLACE INTO `team` (`id`, `name`, `money`, `upload_date`) VALUES
	('team01', NULL, 0, '2022-02-27 09:15:46'),
	('team02', NULL, 0, '2022-02-27 09:15:50'),
	('team034', NULL, 0, '2022-02-27 09:15:52');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
