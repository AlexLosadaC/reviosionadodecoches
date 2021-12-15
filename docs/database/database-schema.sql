-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema reviews_cars
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reviews_cars
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reviews_cars` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `reviews_cars` ;

-- -----------------------------------------------------
-- Table `reviews_cars`.`cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`cars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `engine` ENUM('Diésel', 'Gasolina', 'Híbrido', 'Eléctrico') NULL DEFAULT 'Gasolina',
  `cv` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reviews_cars`.`carImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`carImages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `principal` TINYINT NULL DEFAULT '0',
  `idCar` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCar`)
    REFERENCES `reviews_cars`.`cars` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reviews_cars`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `role` ENUM('admin', 'reader') NULL DEFAULT 'reader',
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `verificationCode` VARCHAR(64) NULL DEFAULT NULL,
  `verifiedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reviews_cars`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idCar` INT NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUser` (`idUser` ASC) VISIBLE,
  INDEX `idCar` (`idCar` ASC) VISIBLE,
  FOREIGN KEY (`idUser`)
    REFERENCES `reviews_cars`.`users` (`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`idCar`)
    REFERENCES `reviews_cars`.`cars` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
