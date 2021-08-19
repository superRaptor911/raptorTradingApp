-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cucekTrading
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coins`
--

DROP TABLE IF EXISTS `coins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coins` (
  `name` varchar(16) DEFAULT NULL,
  `id` varchar(16) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coins`
--

LOCK TABLES `coins` WRITE;
/*!40000 ALTER TABLE `coins` DISABLE KEYS */;
INSERT INTO `coins` VALUES ('Doge Coin','dogeinr','https://interanalyst.us/wp-content/uploads/2018/01/dogecoin-logo.png'),('Tron Coin','trxinr','https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/tron_trn_coin-512.png'),('Hot Coin','hotinr','https://instantcryptocoins.com/public/images/coins_icons/onx_.png'),('ADA Coin','adainr','https://cdn2.iconfinder.com/data/icons/cryptocurrency-20/512/crypto-cryptocurrency-coin-digital-trading-20-512.png'),('Ethereum','ethinr','https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-512.png'),('Polka Dot','dotinr','https://cdn.cryptotips.eu/wp-content/uploads/2020/09/buy-polkadot-200x200.png'),('Ether Classic','etcinr','https://cdn.iconscout.com/icon/free/png-256/ethereum-6-642796.png'),('Ripple','xrpinr','https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/ripple_xrp_coin-512.png'),('Shiba Coin','shibinr','https://assets.coingecko.com/coins/images/11939/large/SHIBLOGO.png'),('Matic','maticinr','https://crypto.com/price/coin-data/icon/MATIC/color_icon.png'),('BAT','batinr','https://crypto.com/price/coin-data/icon/BAT/color_icon.png');
/*!40000 ALTER TABLE `coins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donations` (
  `username` varchar(64) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  KEY `username` (`username`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES ('Neeraj N',5),('Rohit J',5),('Fawaz Ahmed',5),('Vyshnav KS',10),('Neeraj N',10),('Syam Suresh',10),('Neeraj N',12),('Shine Joseph',20),('Neeraj N',5),('HighRanger11',10);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundTransferHistory`
--

DROP TABLE IF EXISTS `fundTransferHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fundTransferHistory` (
  `username` varchar(64) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `transType` tinyint(1) DEFAULT NULL,
  `fee` float DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `externalTransfer` tinyint(1) DEFAULT NULL,
  `donation` float DEFAULT '0',
  KEY `username` (`username`),
  CONSTRAINT `fundTransferHistory_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundTransferHistory`
--

LOCK TABLES `fundTransferHistory` WRITE;
/*!40000 ALTER TABLE `fundTransferHistory` DISABLE KEYS */;
INSERT INTO `fundTransferHistory` VALUES ('Syam Suresh',100,1,8,'2021-04-22 05:53:31',1,0),('Neeraj N',150,1,11.9,'2021-04-22 05:56:41',1,0),('Nived P',100,1,12,'2021-04-22 06:17:47',1,0),('Aditya Aravind',92.5,1,0,'2021-04-22 09:35:30',1,0),('Shine Joseph',500,1,12,'2021-04-22 13:17:13',1,0),('Gokul AB',250,1,12,'2021-04-25 07:32:02',1,0),('Neeraj N',120,1,12,'2021-04-28 13:40:28',1,0),('Neeraj N',500,1,12,'2021-04-29 15:36:55',1,0),('Syam Suresh',250,1,12,'2021-04-29 15:47:32',1,0),('Aditya Aravind',410,1,12,'2021-05-02 11:09:58',1,0),('HighRanger11',110,1,4,'2021-05-03 09:16:57',1,0),('Aditya Aravind',96,1,0,'2021-05-03 09:22:10',1,0),('Aditya Aravind',500,1,4,'2021-05-03 10:24:58',1,0),('Nived P',364.68,1,0,'2021-05-04 05:54:46',1,0),('Nived P',729.36,0,0,'2021-05-04 05:55:55',1,0),('Gokul AB',274.33,0,5,'2021-05-04 06:01:33',1,0),('Shine Joseph',120,1,4,'2021-05-04 16:40:22',1,0),('Neeraj N',1650,1,4,'2021-05-04 16:41:44',1,0),('V Lakshmi',1000,1,0,'2021-05-04 16:45:45',1,0),('Yaseen',1000,1,5,'2021-05-05 10:27:54',1,0),('Rohit J',150,1,5,'2021-05-05 10:28:31',1,0),('Aswin Chandra',100,1,5,'2021-05-05 10:31:32',1,0),('Thejus',600,1,12,'2021-05-05 10:55:41',1,0),('Rohit J',300,1,12,'2021-05-05 12:35:38',1,0),('Vyshnav KS',225,1,6,'2021-05-05 15:21:38',1,0),('Mesmin PJ',100,1,6,'2021-05-05 15:22:00',1,0),('Neeraj N',690,1,6,'2021-05-06 06:07:33',1,0),('Rohit J',250,1,6,'2021-05-06 06:07:59',1,0),('Aaron Paul',200,1,12,'2021-05-06 10:23:47',1,0),('Vyshnav KS',180,1,7,'2021-05-06 18:35:24',1,0),('Rohit J',100,1,6,'2021-05-07 04:30:48',1,0),('Aswin Chandra',104,1,6,'2021-05-08 08:05:33',1,0),('Rohit J',50,1,6,'2021-05-08 08:05:48',1,0),('Aditya Aravind',505,1,12,'2021-05-08 13:04:23',1,0),('Neeraj N',350,1,6,'2021-05-08 17:31:16',1,5),('Sudev T',200,1,6,'2021-05-08 17:32:14',1,0),('Rohit J',150,1,12,'2021-05-09 13:32:20',1,5),('Balu',200,1,7,'2021-05-09 14:59:13',1,0),('Fawaz Ahmed',500,1,6,'2021-05-09 14:59:41',1,5),('Fawaz Ahmed',53,1,6,'2021-05-10 07:44:38',1,0),('Fawaz Ahmed',2,1,0,'2021-05-10 07:45:34',1,0),('Thejus',300,1,7,'2021-05-10 07:48:24',1,0),('Vyshnav KS',400,1,12,'2021-05-12 19:15:09',1,10),('HighRanger11',110,1,12,'2021-05-13 15:03:53',1,0),('Aravindan M',5000,1,12,'2021-05-15 03:46:49',1,0),('Neeraj N',150,1,6,'2021-05-15 10:46:53',1,10),('Syam Suresh',150,1,6,'2021-05-15 10:47:14',1,10),('Neeraj N',500,1,5,'2021-05-17 19:04:11',1,12),('Aditya Aravind',500,1,0,'2021-05-19 20:52:58',1,0),('Vyshnav KS',200,1,2.4,'2021-05-19 20:54:05',1,0),('Shine Joseph',320,1,2.4,'2021-05-19 20:54:49',1,20),('Neeraj N',500,1,2.4,'2021-05-19 20:55:24',1,5),('HighRanger11',230,1,2.4,'2021-05-19 20:56:21',1,10),('Binil biju',300,1,2.4,'2021-05-19 20:57:03',1,0),('Nakul menon',600,1,12,'2021-05-20 09:42:22',1,0),('Neeraj N',195,1,12,'2021-05-23 14:13:50',1,0),('Athira',100,1,1.7,'2021-05-26 18:12:56',1,0),('Aditya Aravind',124,1,0,'2021-06-05 10:44:31',1,0),('Neeraj N',215,1,0.5,'2021-06-08 15:14:21',1,0),('Aaron Paul',200,1,1,'2021-06-08 15:14:42',1,0),('Mahadevan Aravind',200,1,0.5,'2021-06-08 15:15:03',1,0),('Athira',111,1,1,'2021-06-09 10:39:35',1,0),('Neeraj N',800,1,2,'2021-06-18 14:08:54',1,0),('Aditya Aravind',500,1,1.5,'2021-06-18 14:09:40',1,0),('Sidharth R',100,1,1,'2021-06-21 13:53:46',1,0),('Aaron Paul',200,1,1,'2021-06-23 13:43:15',1,0),('Aditya Aravind',501,1,2,'2021-08-11 06:04:13',1,0),('Aaron Paul',200,1,2,'2021-08-11 06:31:44',1,0),('Syam Suresh',500,1,5,'2021-08-11 15:37:32',1,0),('Aditya Aravind',560,1,5,'2021-08-14 07:43:50',1,0),('Neeraj N',1000,1,2.5,'2021-08-16 04:29:19',1,0);
/*!40000 ALTER TABLE `fundTransferHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investments`
--

DROP TABLE IF EXISTS `investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investments` (
  `username` varchar(64) DEFAULT NULL,
  `investment` float DEFAULT '0',
  KEY `username` (`username`),
  CONSTRAINT `investments_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investments`
--

LOCK TABLES `investments` WRITE;
/*!40000 ALTER TABLE `investments` DISABLE KEYS */;
INSERT INTO `investments` VALUES ('Aditya Aravind',4449.28),('Syam Suresh',1324.1),('Neeraj N',7406.52),('Vyshnav KS',1641),('Gokul AB',210.67),('Nived P',228.82),('Mesmin PJ',195.4),('Binil biju',395.1),('Mahadevan Aravind',389.9),('Thejus',991.5),('Midhun Krishna',274.05),('Shine Joseph',940),('HighRanger11',450),('V Lakshmi',1000),('Yaseen',1000),('Rohit J',1000),('Aswin Chandra',204),('Aaron Paul',800),('Sudev T',200),('Balu',200),('Fawaz Ahmed',555),('Aravindan M',5000),('Nakul menon',600),('Athira',211),('Sidharth R',100);
/*!40000 ALTER TABLE `investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT NULL,
  `coin` varchar(16) DEFAULT NULL,
  `coinCount` float DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `transType` tinyint(1) DEFAULT '1',
  `fee` float DEFAULT '0',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `coin` (`coin`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`coin`) REFERENCES `coins` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'Aditya Aravind','Doge Coin',3,20.5,1,0,NULL),(2,'Aditya Aravind','Tron Coin',8,12.4,1,0,NULL),(3,'Syam Suresh','Doge Coin',7,21.3,1,0,NULL),(4,'Aditya Aravind','Doge Coin',17,24.352,1,0,NULL),(5,'Syam Suresh','Doge Coin',5,35,1,0,NULL),(6,'Neeraj N','Doge Coin',14,35.08,1,0,NULL),(7,'Vyshnav KS','Doge Coin',14,23.5,1,0,NULL),(8,'Gokul AB','Doge Coin',10,23.5,1,0,NULL),(9,'Nived P','Doge Coin',21,23.5,1,0,NULL),(10,'Neeraj N','Doge Coin',3,31.8,1,0,NULL),(11,'Mesmin PJ','Doge Coin',3,31.8,1,0,NULL),(12,'Binil biju','Doge Coin',3,31.7,1,0,NULL),(13,'Mahadevan Aravind','Doge Coin',6,31.65,1,0,NULL),(14,'Vyshnav KS','Doge Coin',10,30.7,1,0,NULL),(15,'Thejus','Doge Coin',3,30.5,1,0,NULL),(16,'Midhun Krishna','Doge Coin',9,30.45,1,0,NULL),(17,'Aditya Aravind','Doge Coin',3,28.7,1,0,NULL),(18,'Syam Suresh','Doge Coin',4,22.62,1,0.18096,'2021-04-22 05:55:11'),(19,'Neeraj N','Doge Coin',6,22.58,1,0.27096,'2021-04-22 05:57:54'),(20,'Nived P','Doge Coin',3,23.4935,1,0.14,'2021-04-22 06:18:59'),(21,'Aditya Aravind','Doge Coin',4,21.39,1,0.17112,'2021-04-22 09:37:19'),(22,'Shine Joseph','Doge Coin',21,22.89,1,0.96138,'2021-04-22 13:19:09'),(23,'Gokul AB','Hot Coin',180,1.319,1,0.47484,'2021-04-28 07:04:15'),(24,'Aditya Aravind','Doge Coin',10,26.0132,0,0.520264,'2021-04-28 09:59:10'),(25,'Neeraj N','Hot Coin',87,1.228,1,0.213672,'2021-04-28 13:41:59'),(26,'Aditya Aravind','ADA Coin',2.5,103.5,1,0.5175,'2021-04-28 16:02:37'),(27,'Neeraj N','ADA Coin',4.5,108.469,1,0.976222,'2021-04-29 15:41:40'),(28,'Syam Suresh','ADA Coin',2.2,108.25,1,0.4763,'2021-04-29 15:52:24'),(29,'Vyshnav KS','Doge Coin',24,28.2105,0,1.3541,'2021-05-01 08:22:07'),(30,'Gokul AB','Doge Coin',10,27.9786,0,0.559572,'2021-05-01 15:37:36'),(31,'Aditya Aravind','ADA Coin',3.8,103.706,1,0.788166,'2021-05-02 11:11:43'),(32,'HighRanger11','Doge Coin',3,30.1068,1,0.180641,'2021-05-03 09:18:28'),(33,'Aditya Aravind','Polka Dot',0.2,2949.98,1,1.17999,'2021-05-03 10:28:04'),(34,'Nived P','Doge Coin',10,34.8,0,0.696,'2021-05-04 05:13:20'),(35,'Binil biju','Doge Coin',3,35.02,0,0.21012,'2021-05-04 05:39:41'),(36,'Neeraj N','Doge Coin',15,38.8,0,1.164,'2021-05-04 09:10:15'),(37,'Thejus','Doge Coin',3,38.82,0,0.23292,'2021-05-04 09:14:05'),(38,'Shine Joseph','Doge Coin',10,38.1,0,0.762,'2021-05-04 09:26:03'),(39,'Aditya Aravind','Doge Coin',15,38.55,0,1.1565,'2021-05-04 09:41:06'),(40,'V Lakshmi','ADA Coin',9.7,102,1,1.9788,'2021-05-04 16:48:12'),(41,'Shine Joseph','ADA Coin',2.4,102,1,0.4896,'2021-05-04 16:50:28'),(42,'Shine Joseph','Polka Dot',0.09,2841.69,1,0.511504,'2021-05-04 16:52:55'),(43,'Vyshnav KS','ADA Coin',3.9,102,1,0.7956,'2021-05-04 17:04:27'),(44,'Neeraj N','Ethereum',0.0075,264673,1,3.9701,'2021-05-04 17:08:31'),(45,'Aditya Aravind','ADA Coin',5.6,104.7,1,1.17264,'2021-05-04 19:31:50'),(46,'HighRanger11','Doge Coin',3,50.7,0,0.3042,'2021-05-05 09:38:52'),(47,'Rohit J','Doge Coin',2,54.491,1,0.217964,'2021-05-05 10:57:27'),(48,'Aswin Chandra','Doge Coin',1,54.4,1,0.1088,'2021-05-05 10:59:15'),(49,'Yaseen','Doge Coin',4,54,1,0.432,'2021-05-05 11:00:49'),(50,'Thejus','Doge Coin',12,53.9,1,1.2936,'2021-05-05 11:02:06'),(51,'Yaseen','ADA Coin',3.7,105.729,1,0.782391,'2021-05-05 11:04:36'),(52,'Yaseen','Ethereum',0.0014,265600,1,0.74368,'2021-05-05 11:06:22'),(53,'Rohit J','ADA Coin',2.9,108.21,1,0.627618,'2021-05-05 12:37:45'),(54,'Binil biju','Doge Coin',2,50.0859,1,0.200344,'2021-05-05 14:20:35'),(55,'Vyshnav KS','Ethereum',0.0018,263100,1,0.94716,'2021-05-05 15:24:02'),(56,'Mesmin PJ','ADA Coin',0.8,108.544,1,0.17367,'2021-05-05 15:31:44'),(57,'Rohit J','ADA Coin',1,117.5,1,0.235,'2021-05-06 06:11:29'),(58,'Neeraj N','ADA Coin',1.7,116.99,1,0.397766,'2021-05-06 06:15:51'),(59,'Neeraj N','Ethereum',0.0014,268760,1,0.752528,'2021-05-06 06:27:07'),(60,'Neeraj N','Polka Dot',0.11,3040,1,0.6688,'2021-05-06 06:29:24'),(61,'Aaron Paul','ADA Coin',1.5,122,1,0.366,'2021-05-06 10:28:29'),(62,'Vyshnav KS','Ether Classic',0.01,13500,1,0.269998,'2021-05-06 18:39:35'),(63,'Rohit J','Ethereum',0.0008,265970,1,0.425552,'2021-05-07 04:35:06'),(64,'Rohit J','Tron Coin',5,11.51,1,0.1151,'2021-05-08 08:08:19'),(65,'Aswin Chandra','Tron Coin',8,11.6004,1,0.185606,'2021-05-08 08:12:30'),(66,'Binil biju','Doge Coin',2,55.1276,0,0.22051,'2021-05-08 10:31:59'),(67,'Aditya Aravind','ADA Coin',1.6,124.2,1,0.39744,'2021-05-08 13:11:20'),(68,'Aditya Aravind','Polka Dot',0.09,3080,1,0.5544,'2021-05-08 13:23:42'),(69,'Binil biju','Hot Coin',84,1.181,1,0.198408,'2021-05-08 13:56:21'),(70,'Neeraj N','Ethereum',0.001,297678,1,0.595356,'2021-05-08 17:34:05'),(71,'Sudev T','Ethereum',0.0006,297530,1,0.357036,'2021-05-08 17:35:12'),(72,'Binil biju','Hot Coin',84,1.134,0,0.190512,'2021-05-09 08:24:06'),(73,'Rohit J','Doge Coin',3,37.1,1,0.2226,'2021-05-09 13:33:47'),(74,'HighRanger11','Doge Coin',4,37.5058,1,0.31,'2021-05-09 13:58:56'),(75,'Binil biju','Doge Coin',2,37.5058,1,0.150023,'2021-05-09 14:22:46'),(76,'Fawaz Ahmed','Doge Coin',12,37.52,1,0.90048,'2021-05-09 15:03:09'),(77,'Balu','Ethereum',0.0006,299900,1,0.35988,'2021-05-09 15:09:21'),(78,'Fawaz Ahmed','Doge Coin',2,42.48,1,0.16992,'2021-05-10 07:47:18'),(79,'Thejus','Doge Coin',8,42.1,1,0.6736,'2021-05-10 07:52:54'),(80,'Vyshnav KS','ADA Coin',2,136.6,1,0.5464,'2021-05-12 19:31:04'),(81,'Vyshnav KS','Ripple',1,112.9,1,0.2258,'2021-05-12 19:32:03'),(82,'Binil biju','Doge Coin',2,34.5502,0,0.14,'2021-05-13 08:44:51'),(83,'Binil biju','Doge Coin',3,31.8,1,0.2,'2021-05-13 11:18:41'),(84,'HighRanger11','Tron Coin',11,9.93,1,0.21846,'2021-05-13 15:43:20'),(85,'Binil biju','Doge Coin',3,39.94,0,0.24,'2021-05-14 04:04:36'),(86,'Aravindan M','Ethereum',0.0062,322021,1,4,'2021-05-15 06:09:33'),(87,'Aravindan M','Polka Dot',0.38,3890,1,3,'2021-05-15 06:11:33'),(88,'Aravindan M','ADA Coin',8.6,173,1,3,'2021-05-15 06:13:27'),(89,'Syam Suresh','Shiba Coin',95305,0.001405,1,0.267807,'2021-05-15 10:53:01'),(90,'Neeraj N','Shiba Coin',71530,0.0014,1,0.2,'2021-05-15 11:01:56'),(91,'Binil biju','Shiba Coin',36221,0.001408,1,0.12,'2021-05-15 11:12:05'),(92,'Binil biju','Ethereum',0.0002,274000,1,0.1096,'2021-05-17 19:07:20'),(93,'Neeraj N','Ethereum',0.002,273526,1,1.0941,'2021-05-17 19:12:15'),(94,'Aditya Aravind','Shiba Coin',45864,0.00000001,1,0.1,'2021-05-17 19:27:30'),(95,'HighRanger11','Doge Coin',2,40.2659,0,0.161064,'2021-05-18 05:12:44'),(96,'HighRanger11','Shiba Coin',61818,0.001375,1,0.169999,'2021-05-18 05:15:15'),(97,'Aditya Aravind','Polka Dot',0.13,2256,1,0.58656,'2021-05-19 21:01:29'),(98,'Aditya Aravind','ADA Coin',1.7,128.505,1,0.436917,'2021-05-19 21:03:04'),(99,'Neeraj N','ADA Coin',4,125.511,1,1.00409,'2021-05-19 21:11:31'),(100,'Vyshnav KS','Ethereum',0.0011,211981,1,0.466357,'2021-05-19 21:14:21'),(101,'Shine Joseph','Ethereum',0.0014,210998,1,0.590796,'2021-05-19 21:16:46'),(102,'HighRanger11','ADA Coin',1,120,1,0.24,'2021-05-19 21:36:21'),(103,'HighRanger11','Ethereum',0.0004,215000,1,0.172,'2021-05-19 21:52:34'),(104,'Nakul menon','ADA Coin',2.1,138.423,1,0.581378,'2021-05-20 09:45:10'),(105,'Nakul menon','Ethereum',0.0013,221999,1,0.577197,'2021-05-20 09:46:36'),(106,'Binil biju','Doge Coin',2,34.8825,1,0.13953,'2021-05-20 12:50:26'),(107,'Binil biju','Tron Coin',48,5.1,1,0.4896,'2021-05-23 14:50:03'),(108,'Athira','ADA Coin',0.7,135,1,0.189,'2021-05-26 18:18:02'),(109,'Neeraj N','Matic',1,138,1,0.276,'2021-06-02 11:30:11'),(110,'Aditya Aravind','Matic',1,125.11,1,0.25022,'2021-06-05 10:45:33'),(111,'Neeraj N','Matic',2,100.676,1,0.402704,'2021-06-08 15:17:48'),(112,'Mahadevan Aravind','Doge Coin',8,23.01,1,0.36816,'2021-06-08 15:19:52'),(113,'Aaron Paul','Ethereum',0.001,182486,1,0.364972,'2021-06-08 15:36:50'),(114,'Athira','Matic',1,111.501,1,0.223002,'2021-06-09 10:40:57'),(115,'Neeraj N','Ethereum',0.0048,173866,1,1.66911,'2021-06-18 14:11:09'),(116,'Aditya Aravind','Matic',3,104.99,1,0.62994,'2021-06-18 14:13:19'),(117,'Aditya Aravind','ADA Coin',1.6,108.991,1,0.348771,'2021-06-18 14:14:39'),(118,'Sidharth R','Matic',1,97.6,1,0.1952,'2021-06-21 13:55:57'),(119,'Aaron Paul','Matic',2,93.5,1,0.374,'2021-06-23 13:44:15'),(120,'Aditya Aravind','Matic',5,92.805,1,0.92805,'2021-08-11 06:05:28'),(121,'Aaron Paul','Matic',1,94.385,1,0.18877,'2021-08-11 06:40:27'),(122,'Aaron Paul','ADA Coin',1,132,1,0.264,'2021-08-11 06:44:07'),(123,'Syam Suresh','Matic',4,101.079,1,0.808632,'2021-08-11 16:49:20'),(124,'Aditya Aravind','Matic',5,112.627,1,1.12627,'2021-08-14 07:45:27'),(125,'Neeraj N','Matic',7,111.34,1,1.55876,'2021-08-16 04:31:39'),(126,'Neeraj N','Polka Dot',0.13,1779.95,1,0.462787,'2021-08-16 04:34:04');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userCoins`
--

DROP TABLE IF EXISTS `userCoins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userCoins` (
  `username` varchar(64) DEFAULT NULL,
  `dogeinr` float DEFAULT NULL,
  `trxinr` float DEFAULT NULL,
  `hotinr` float DEFAULT NULL,
  `adainr` float DEFAULT '0',
  `ethinr` float DEFAULT '0',
  `dotinr` float DEFAULT '0',
  `etcinr` float DEFAULT '0',
  `xrpinr` float DEFAULT '0',
  `shibinr` float DEFAULT '0',
  `maticinr` float DEFAULT '0',
  `batinr` float DEFAULT '0',
  KEY `username` (`username`),
  CONSTRAINT `userCoins_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userCoins`
--

LOCK TABLES `userCoins` WRITE;
/*!40000 ALTER TABLE `userCoins` DISABLE KEYS */;
INSERT INTO `userCoins` VALUES ('Aditya Aravind',2,8,0,16.8,0,0.42,0,0,45864,14,0),('Syam Suresh',16,0,0,2.2,0,0,0,0,95305,4,0),('Neeraj N',8,0,87,10.2,0.0167,0.24,0,0,71530,10,0),('Vyshnav KS',0,0,0,5.9,0.0029,0,0.01,1,0,0,0),('Gokul AB',0,0,180,0,0,0,0,0,0,0,0),('Nived P',14,0,0,0,0,0,0,0,0,0,0),('Mesmin PJ',3,0,0,0.8,0,0,0,0,0,0,0),('Binil biju',2,48,0,0,0.0002,0,0,0,36221,0,0),('Mahadevan Aravind',14,0,0,0,0,0,0,0,0,0,0),('Thejus',20,0,0,0,0,0,0,0,0,0,0),('Midhun Krishna',9,0,0,0,0,0,0,0,0,0,0),('Shine Joseph',11,0,0,2.4,0.0014,0.09,0,0,0,0,0),('HighRanger11',2,11,NULL,1,0.0004,0,0,0,61818,0,0),('V Lakshmi',NULL,NULL,NULL,9.7,0,0,0,0,0,0,0),('Yaseen',4,NULL,NULL,3.7,0.0014,0,0,0,0,0,0),('Rohit J',5,5,NULL,3.9,0.0008,0,0,0,0,0,0),('Aswin Chandra',1,8,NULL,0,0,0,0,0,0,0,0),('Aaron Paul',NULL,NULL,NULL,2.5,0.001,0,0,0,0,3,0),('Sudev T',NULL,NULL,NULL,0,0.0006,0,0,0,0,0,0),('Balu',NULL,NULL,NULL,0,0.0006,0,0,0,0,0,0),('Fawaz Ahmed',14,NULL,NULL,0,0,0,0,0,0,0,0),('Aravindan M',NULL,NULL,NULL,8.6,0.0062,0.38,0,0,0,0,0),('Nakul menon',NULL,NULL,NULL,2.1,0.0013,0,0,0,0,0,0),('Athira',NULL,NULL,NULL,0.7,0,0,0,0,0,1,0),('Sidharth R',NULL,NULL,NULL,0,0,0,0,0,0,1,0);
/*!40000 ALTER TABLE `userCoins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `name` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Aditya Aravind','raptor.inc2018@gmail.com','https://i.ibb.co/zf3KmnM/raptor.jpg'),('Neeraj N','nrj4330@gmail.com','https://i.ibb.co/GFbyzDb/nrj.jpg'),('Syam Suresh','syamcrypto143@gmail.com','https://i.ibb.co/QF6WZN8/syam.jpg'),('Nived P','nivedpradeep7@gmail.com','https://i.ibb.co/y8HQcQ1/nibed.jpg'),('Gokul AB','ggwp','https://i.ibb.co/QF4Zz42/gokul.jpg'),('Vyshnav KS','ggwpd','https://i.ibb.co/xmChstT/vyshnav.jpg'),('Mesmin PJ','mesmin.p.johnson@gmail.com','https://i.ibb.co/MN3q8L0/mesmin.jpg'),('Binil biju','binilbijuchengankal@gmail.com','https://i.ibb.co/5GWT24p/binil.jpg'),('Mahadevan Aravind','mahadevanaravind71011@gmail.com','https://i.ibb.co/L8XQbtd/mota.jpg'),('Thejus','rithwikparli14@gmail.com','https://i.ibb.co/tZsrdh3/thejus.jpg'),('Midhun Krishna','hjgj','https://i.ibb.co/tHxwgYt/midhun.jpg'),('Shine Joseph','josephshine0016@gmail.com','https://i.ibb.co/4sVVcSG/shine.jpg'),('HighRanger11','jaemmu11@gmail.com','https://i.ibb.co/n6DFYP8/emannu.jpg'),('V Lakshmi','gg','https://i.ibb.co/7Cwfbfy/chitta.jpg'),('Yaseen','ym679339@gmail.com','https://i.ibb.co/yRX7Tr7/yaseen.jpg'),('Rohit J','rohithjayaraj55@gmail.com','https://i.ibb.co/TYL2Tyv/rohit.jpg'),('Aswin Chandra','aswinchandra28@gmail.com','https://i.ibb.co/N3PbMnn/unknown.jpg'),('Aaron Paul','aaronpaulm07@gmail.com','https://i.ibb.co/HY4YnDv/aaron.jpg'),('Sudev T','sudevtdevan@gmail.com','https://i.ibb.co/mtjfsxd/trikkan.jpg'),('Balu','balu4krishnan@gmail.com','https://i.ibb.co/YZZj5Rc/balu.jpg'),('Fawaz Ahmed','ahamedfavasedanatt@gmail.com','https://i.ibb.co/GtdsL67/fawaz.jpg'),('Aravindan M','ar','http://icons.iconarchive.com/icons/kxmylo/simple/512/accessories-dictionary-icon.png'),('Nakul menon','nakulmenon244@gmail.com','https://i.ibb.co/19td6wZ/nakul.jpg'),('Athira','Athip.8620@gmail.com','https://i.ibb.co/JzT52zt/athira.jpg'),('Sidharth R','Sidhuraveendren@gmail.com','https://i.ibb.co/fvkvhmt/186284266-280558350439893-3175114740875277364-n.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wallet` (
  `username` varchar(64) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  KEY `username` (`username`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES ('Aditya Aravind',35.5247),('Syam Suresh',90.4174),('Neeraj N',15.4047),('Vyshnav KS',14.388),('Gokul AB',0.002),('Nived P',0.004),('Mesmin PJ',6.99145),('Binil biju',4.3314),('Mahadevan Aravind',15.0518),('Thejus',11.6594),('Midhun Krishna',0),('Shine Joseph',2.6443),('HighRanger11',11.903),('V Lakshmi',8.6212),('Yaseen',14.0063),('Rohit J',24.2384),('Aswin Chandra',45.5022),('Aaron Paul',3.571),('Sudev T',15.1252),('Balu',12.7001),('Fawaz Ahmed',1.72958),('Aravindan M',15.47),('Nakul menon',7.55423),('Athira',1.887),('Sidharth R',1.2048);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cucekTrading'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19 18:32:26
