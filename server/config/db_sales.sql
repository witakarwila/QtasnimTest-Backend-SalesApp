CREATE DATABASE  IF NOT EXISTS `db_sales` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_sales`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: db_sales
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Barang`
--

DROP TABLE IF EXISTS `Barang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Barang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `id_jenis_barang` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Barang`
--

LOCK TABLES `Barang` WRITE;
/*!40000 ALTER TABLE `Barang` DISABLE KEYS */;
INSERT INTO `Barang` VALUES (2,'Kopi',75,1),(4,'Teh',81,1),(5,'Pasta Gigi',80,4),(6,'Sabun Mandi',70,4),(7,'Shampoo',75,4);
/*!40000 ALTER TABLE `Barang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JenisBarang`
--

DROP TABLE IF EXISTS `JenisBarang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JenisBarang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JenisBarang`
--

LOCK TABLES `JenisBarang` WRITE;
/*!40000 ALTER TABLE `JenisBarang` DISABLE KEYS */;
INSERT INTO `JenisBarang` VALUES (1,'Konsumsi'),(4,'Pembersih');
/*!40000 ALTER TABLE `JenisBarang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaksi`
--

DROP TABLE IF EXISTS `Transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_barang` int DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `jumlah` int DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaksi`
--

LOCK TABLES `Transaksi` WRITE;
/*!40000 ALTER TABLE `Transaksi` DISABLE KEYS */;
INSERT INTO `Transaksi` VALUES (1,2,100,10,'2024-06-27 04:59:48'),(2,4,100,19,'2024-06-27 05:01:35'),(3,2,90,15,'2024-06-27 05:01:35'),(4,5,100,20,'2024-06-27 05:01:35'),(5,6,100,30,'2024-06-27 05:01:35'),(6,7,100,25,'2024-06-27 05:01:35');
/*!40000 ALTER TABLE `Transaksi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-28  1:30:26
