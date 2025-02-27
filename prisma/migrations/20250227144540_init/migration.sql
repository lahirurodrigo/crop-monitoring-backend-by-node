-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'STAFF', 'USER') NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `staffId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `joinDate` DATETIME(3) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `address01` VARCHAR(191) NOT NULL,
    `address02` VARCHAR(191) NOT NULL,
    `address03` VARCHAR(191) NULL,
    `address04` VARCHAR(191) NULL,
    `address05` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'STAFF', 'USER') NOT NULL,

    PRIMARY KEY (`staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `fieldCode` VARCHAR(191) NOT NULL,
    `fieldName` VARCHAR(191) NOT NULL,
    `fieldLocation` VARCHAR(191) NOT NULL,
    `fieldSize` DOUBLE NOT NULL,
    `fieldImage01` VARCHAR(191) NOT NULL,
    `fieldImage02` VARCHAR(191) NOT NULL,
    `cropCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`fieldCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Crop` (
    `cropCode` VARCHAR(191) NOT NULL,
    `cropCommonName` VARCHAR(191) NOT NULL,
    `cropScientificName` VARCHAR(191) NOT NULL,
    `cropImage` VARCHAR(191) NOT NULL,
    `cropCategory` VARCHAR(191) NOT NULL,
    `cropSeason` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cropCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonitoringLog` (
    `logCode` VARCHAR(191) NOT NULL,
    `logDate` DATETIME(3) NOT NULL,
    `logDetails` VARCHAR(191) NOT NULL,
    `observedImage` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,
    `fieldCode` VARCHAR(191) NOT NULL,
    `cropCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`logCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fieldCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FieldStaff` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FieldStaff_AB_unique`(`A`, `B`),
    INDEX `_FieldStaff_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_cropCode_fkey` FOREIGN KEY (`cropCode`) REFERENCES `Crop`(`cropCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonitoringLog` ADD CONSTRAINT `MonitoringLog_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonitoringLog` ADD CONSTRAINT `MonitoringLog_fieldCode_fkey` FOREIGN KEY (`fieldCode`) REFERENCES `Field`(`fieldCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonitoringLog` ADD CONSTRAINT `MonitoringLog_cropCode_fkey` FOREIGN KEY (`cropCode`) REFERENCES `Crop`(`cropCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_fieldCode_fkey` FOREIGN KEY (`fieldCode`) REFERENCES `Field`(`fieldCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FieldStaff` ADD CONSTRAINT `_FieldStaff_A_fkey` FOREIGN KEY (`A`) REFERENCES `Field`(`fieldCode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FieldStaff` ADD CONSTRAINT `_FieldStaff_B_fkey` FOREIGN KEY (`B`) REFERENCES `Staff`(`staffId`) ON DELETE CASCADE ON UPDATE CASCADE;
