-- CreateTable
CREATE TABLE `starships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `max_atmosphering_speed` VARCHAR(191) NOT NULL,
    `manufacturer` VARCHAR(191) NULL,
    `starship_class` VARCHAR(191) NULL,
    `crew` VARCHAR(191) NULL,
    `passengers` VARCHAR(191) NULL,
    `cost_in_credits` VARCHAR(191) NULL,
    `swapi_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
