/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : learn

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2017-06-19 10:50:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES ('1', 'lzq', '980a82ca2aad2d3569710b1515bb544a');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '大标题',
  `description` varchar(3000) NOT NULL,
  `href` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES ('5', '3D冒险射击手游', '超级人工智能统治世界，人类存亡危在旦夕!肩负所有幸存者期望的你，能否终结天网的统', 'http://www.pipaw.com/xin/334585.html');
INSERT INTO `banner_table` VALUES ('6', '开启逗萌冒险 《龙之岛战纪》今日安卓震撼首发', '由爱乐游发行、零境游戏研发的逗萌冒险动作手游《龙之岛战纪》将于今日上午10:00正式于安卓平台震撼首发。为了帮助龙族平息内乱、为了拯救将被黑暗势力倾覆的世界，富有正义感与勇气的人类勇者们齐聚龙之岛，一场逗萌大冒险即将拉开帷幕。', 'http://www.pipaw.com/xin/334596.html');

-- ----------------------------
-- Table structure for custom_evaluation_table
-- ----------------------------
DROP TABLE IF EXISTS `custom_evaluation_table`;
CREATE TABLE `custom_evaluation_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `description` varchar(200) NOT NULL,
  `src` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom_evaluation_table
-- ----------------------------
INSERT INTO `custom_evaluation_table` VALUES ('2', '这才是美女', '杨幂热巴合照真的很养眼！！', '4bcd32b00c0d11edf21f6b924dd41e95.jpg');
