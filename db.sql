-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for atoiga
CREATE DATABASE IF NOT EXISTS `atoiga` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `atoiga`;

-- Dumping structure for table atoiga.tb_adm
CREATE TABLE IF NOT EXISTS `tb_adm` (
  `id_adm` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_adm`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_adm: ~2 rows (approximately)
INSERT INTO `tb_adm` (`id_adm`, `login`, `senha`) VALUES
	(1, 'admin', 'admin'),
	(2, 'luric', 'luric');

-- Dumping structure for table atoiga.tb_bl
CREATE TABLE IF NOT EXISTS `tb_bl` (
  `id_bl` int(11) NOT NULL AUTO_INCREMENT,
  `id_cli` int(11) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `dt_criacao` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id_bl`),
  KEY `FK_tb_bl_tb_cli` (`id_cli`),
  CONSTRAINT `FK_tb_bl_tb_cli` FOREIGN KEY (`id_cli`) REFERENCES `tb_cli` (`id_cli`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_bl: ~2 rows (approximately)
INSERT INTO `tb_bl` (`id_bl`, `id_cli`, `nome`, `dt_criacao`) VALUES
	(16, 96, 'lucas', '2023-03-24'),
	(17, 87, 'guilerme', '2023-03-24');

-- Dumping structure for table atoiga.tb_cli
CREATE TABLE IF NOT EXISTS `tb_cli` (
  `id_cli` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `data_nasc` varchar(50) DEFAULT NULL,
  `rg` varchar(50) DEFAULT NULL,
  `cpf` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `cel` varchar(50) DEFAULT NULL,
  `cep_cli` varchar(50) DEFAULT NULL,
  `num_cli` varchar(50) DEFAULT NULL,
  `rua_cli` varchar(50) DEFAULT NULL,
  `bairro_cli` varchar(50) DEFAULT NULL,
  `cidade_cli` varchar(50) DEFAULT NULL,
  `empresa` varchar(50) DEFAULT NULL,
  `cep_empr` varchar(50) DEFAULT NULL,
  `num_empr` varchar(50) DEFAULT NULL,
  `rua_empr` varchar(50) DEFAULT NULL,
  `bairro_empr` varchar(50) DEFAULT NULL,
  `cidade_empr` varchar(50) DEFAULT NULL,
  `dt_criacao` datetime DEFAULT current_timestamp(),
  `dt_att` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `valor` decimal(20,6) DEFAULT 0.000000,
  PRIMARY KEY (`id_cli`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_cli: ~11 rows (approximately)
INSERT INTO `tb_cli` (`id_cli`, `nome`, `data_nasc`, `rg`, `cpf`, `tel`, `cel`, `cep_cli`, `num_cli`, `rua_cli`, `bairro_cli`, `cidade_cli`, `empresa`, `cep_empr`, `num_empr`, `rua_empr`, `bairro_empr`, `cidade_empr`, `dt_criacao`, `dt_att`, `valor`) VALUES
	(85, 'luric', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:03:59', NULL, 0.000000),
	(86, 'joao', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:04:17', NULL, 0.000000),
	(87, 'guilerme', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:04:52', NULL, 0.000000),
	(88, 'laercio', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:05:07', NULL, 0.000000),
	(89, 'wanderson', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:05:23', NULL, 0.000000),
	(90, 'diego', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:05:33', NULL, 0.000000),
	(91, 'amanda', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:05:59', NULL, 0.000000),
	(92, 'julio', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:06:11', NULL, 0.000000),
	(93, 'maria', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:06:22', NULL, 0.000000),
	(94, 'jaqueline', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:06:35', NULL, 0.000000),
	(95, 'matheus', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:06:58', NULL, 0.000000),
	(96, 'lucas', '12/3', '123', '123', '(12) 3', '(12) 3', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', 'teste', '12225-170', '123', 'Rua Doutor João Gomes Batista Neto', 'Jardim Paraíso do Sol', 'São José dos Campos', '2023-03-24 16:07:15', NULL, 0.000000);

-- Dumping structure for table atoiga.tb_hist_pag
CREATE TABLE IF NOT EXISTS `tb_hist_pag` (
  `id_hist_pag` int(11) NOT NULL AUTO_INCREMENT,
  `id_valores` int(11) NOT NULL,
  `valor_pago` decimal(20,6) NOT NULL DEFAULT 0.000000,
  `dt_criacao` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_hist_pag`),
  KEY `FK_tb_hist_pag_tb_valores` (`id_valores`),
  CONSTRAINT `FK_tb_hist_pag_tb_valores` FOREIGN KEY (`id_valores`) REFERENCES `tb_valores` (`id_valores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_hist_pag: ~0 rows (approximately)

-- Dumping structure for table atoiga.tb_juros
CREATE TABLE IF NOT EXISTS `tb_juros` (
  `juros` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_juros: ~0 rows (approximately)
INSERT INTO `tb_juros` (`juros`) VALUES
	(30);

-- Dumping structure for table atoiga.tb_valores
CREATE TABLE IF NOT EXISTS `tb_valores` (
  `id_valores` int(11) NOT NULL AUTO_INCREMENT,
  `id_cli` int(11) DEFAULT NULL,
  `valor_pego` decimal(20,6) DEFAULT NULL,
  `valor_devido` decimal(20,6) DEFAULT NULL,
  `dt_criacao` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id_valores`) USING BTREE,
  KEY `FK_tb_valores_tb_cli` (`id_cli`),
  CONSTRAINT `FK_tb_valores_tb_cli` FOREIGN KEY (`id_cli`) REFERENCES `tb_cli` (`id_cli`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table atoiga.tb_valores: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
