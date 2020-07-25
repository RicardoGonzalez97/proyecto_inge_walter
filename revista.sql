/*
SQLyog Trial v12.2.4 (64 bit)
MySQL - 5.6.23-log : Database - npgsr79a0lekng19
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`npgsr79a0lekng19` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `npgsr79a0lekng19`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `keywords` varchar(256) CHARACTER SET utf8 NOT NULL,
  `summary` text CHARACTER SET utf8 NOT NULL,
  `abstract` text CHARACTER SET utf8 NOT NULL,
  `content` varchar(256) CHARACTER SET utf8 NOT NULL,
  `files` text COLLATE utf8_unicode_ci,
  `author` text CHARACTER SET utf8 NOT NULL,
  `isssn` text CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `convenedJournal_id` int(10) unsigned NOT NULL,
  `linesofInvestigation_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_convenedJournal1_idx` (`convenedJournal_id`),
  KEY `fk_article_linesofInvestigation1_idx` (`linesofInvestigation_id`),
  KEY `fk_article_user1_idx` (`user_id`),
  CONSTRAINT `fk_article_convenedJournal1` FOREIGN KEY (`convenedJournal_id`) REFERENCES `convenedJournal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_linesofInvestigation1` FOREIGN KEY (`linesofInvestigation_id`) REFERENCES `linesofInvestigation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 NOT NULL,
  `state_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_state_idx` (`state_id`),
  CONSTRAINT `fk_city_state` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `commentArticle` */

DROP TABLE IF EXISTS `commentArticle`;

CREATE TABLE `commentArticle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reaction` tinyint(1) NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `article_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_commentArticle_user1_idx` (`user_id`),
  KEY `fk_commentArticle_article1_idx` (`article_id`),
  CONSTRAINT `fk_commentArticle_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_commentArticle_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `commentCourse` */

DROP TABLE IF EXISTS `commentCourse`;

CREATE TABLE `commentCourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `students_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `reaction` tinyint(4) DEFAULT NULL,
  `comment` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_students_has_course_course1_idx` (`course_id`),
  KEY `fk_students_has_course_students1_idx` (`students_id`),
  CONSTRAINT `fk_students_has_course_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_has_course_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `editionJournal` */

DROP TABLE IF EXISTS `editionJournal`;

CREATE TABLE `editionJournal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `file` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `convenedJournal_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_editionJournal_user1_idx` (`user_id`),
  KEY `fk_editionJournal_convenedJournal1_idx` (`convenedJournal_id`),
  CONSTRAINT `fk_editionJournal_convenedJournal1` FOREIGN KEY (`convenedJournal_id`) REFERENCES `convenedJournal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_editionJournal_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `evaluators` */

DROP TABLE IF EXISTS `evaluators`;

CREATE TABLE `evaluators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `calification` decimal(10,2) NOT NULL,
  `observations` varchar(255) CHARACTER SET utf8 NOT NULL,
  `files` text COLLATE utf8_unicode_ci,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `linesofInvestigation` */

DROP TABLE IF EXISTS `linesofInvestigation`;

CREATE TABLE `linesofInvestigation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `description` varchar(1024) CHARACTER SET utf8 NOT NULL,
  `cover` text COLLATE utf8_unicode_ci,
  `files` text COLLATE utf8_unicode_ci,
  `status` tinyint(1) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_linesofInvestigation_user1_idx` (`user_id`),
  CONSTRAINT `fk_linesofInvestigation_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `logsApi` */

DROP TABLE IF EXISTS `logsApi`;

CREATE TABLE `logsApi` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(256) CHARACTER SET utf8 NOT NULL,
  `payload` text CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) CHARACTER SET utf8 NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `paymentCourse` */

DROP TABLE IF EXISTS `paymentCourse`;
CREATE TABLE `paymentCourse` (
  `id` int(11) NOT NULL,
  `description` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `students_id` int(10) unsigned NOT NULL,
  `card_name` text COLLATE utf8_unicode_ci,
  `card_ number` text COLLATE utf8_unicode_ci,
  `card_ cvc` text COLLATE utf8_unicode_ci,
  `card_ exp_month` text COLLATE utf8_unicode_ci,
  `card_ address` varchar(126) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_ zip` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `request_id` text COLLATE utf8_unicode_ci,
  `url` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_course_city1_idx` (`city_id`),
  KEY `fk_payment_course_students1_idx` (`students_id`),
  CONSTRAINT `fk_payment_course_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_course_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `qualifyCourse` */

DROP TABLE IF EXISTS `qualifyCourse`;

CREATE TABLE `qualifyCourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `students_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `rate` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_qualify_course_students1_idx` (`students_id`),
  KEY `fk_qualify_course_course1_idx` (`course_id`),
  CONSTRAINT `fk_qualify_course_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_qualify_course_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `refereeJournal` */

DROP TABLE IF EXISTS `refereeJournal`;

CREATE TABLE `refereeJournal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `convenedJournal_id` int(10) unsigned NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `autorized` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_refereeJournal_user1_idx` (`user_id`),
  KEY `fk_refereeJournal_convenedJournal1_idx` (`convenedJournal_id`),
  KEY `fk_refereeJournal_user2_idx` (`autorized`),
  CONSTRAINT `fk_refereeJournal_convenedJournal1` FOREIGN KEY (`convenedJournal_id`) REFERENCES `convenedJournal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_refereeJournal_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_refereeJournal_user2` FOREIGN KEY (`autorized`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text CHARACTER SET utf8 NOT NULL,
  `last_activity` int(11) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`),
  KEY `fk_sessions_user1_idx` (`user_id`),
  CONSTRAINT `fk_sessions_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `state` */

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `students` */

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `certificate` varchar(256) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_students_course1_idx` (`course_id`),
  KEY `fk_students_user1_idx` (`user_id`),
  CONSTRAINT `fk_students_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 NOT NULL,
  `ap_pat` varchar(45) CHARACTER SET utf8 NOT NULL,
  `ap_mat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(45) CHARACTER SET utf8 NOT NULL,
  `email` varchar(45) CHARACTER SET utf8 NOT NULL,
  `password` varchar(256) CHARACTER SET utf8 NOT NULL,
  `remember_token` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthdate` date NOT NULL,
  `facebook` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `api_key` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_type` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email_index` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `gicdt`.`categoryCourse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categoryCourse`;
CREATE TABLE `categoryCourse` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) CHARACTER SET 'utf8' NOT NULL,
  `description` TEXT CHARACTER SET 'utf8' NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categorycourse_name_index` (`name` ASC),
  KEY `fk_categoryCourse_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_categoryCourse_user1`FOREIGN KEY (`user_id`)REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  )ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
-- -----------------------------------------------------
-- Table `gicdt`.`typeCourse`
-- ----------------------------------------------------

DROP TABLE IF EXISTS `typeCourse`;
CREATE TABLE `typeCourse` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) CHARACTER SET 'utf8' NOT NULL,
  `description` text CHARACTER SET 'utf8' NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typecourse_name_index` (`name` ASC),
  KEY `fk_typeCourse_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_typeCourse_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  )ENGINE = InnoD DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `gicdt`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) CHARACTER SET 'utf8' NOT NULL,
  `description` TEXT CHARACTER SET 'utf8' NOT NULL,
  `image` VARCHAR(256)  NULL DEFAULT NULL,
  `files` TEXT  NULL DEFAULT NULL,
  `address` TEXT CHARACTER SET 'utf8' NOT NULL,
  `lat` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `lng` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `city_id` INT(10) UNSIGNED NOT NULL,
  `keywords` TEXT CHARACTER SET 'utf8' NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quota_max` INT(11) NOT NULL,
  `quota_min` INT(11) NOT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `cellphone` DECIMAL(12),
  `hangouts` TEXT CHARACTER SET 'utf8' NOT NULL,
  `certificate_title` TEXT CHARACTER SET 'utf8' NOT NULL,
  `categoryCourse_id` INT(10) UNSIGNED NOT NULL,
  `typeCourse_id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(11) NOT NULL,
  `authorize` INT(11) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `paid` TEXT CHARACTER SET 'utf8',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_name_index` (`name` ASC),
  KEY `fk_course_categoryCourse1_idx` (`categoryCourse_id` ASC),
  KEY `fk_course_typeCourse1_idx` (`typeCourse_id` ASC),
  KEY `fk_I_city1_idx` (`city_id` ASC),
  CONSTRAINT `fk_course_categoryCourse1` FOREIGN KEY (`categoryCourse_id`) REFERENCES `categoryCourse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_typeCourse1` FOREIGN KEY (`typeCourse_id`) REFERENCES `typeCourse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_I_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

