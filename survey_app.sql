-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 18, 2026 at 04:04 AM
-- Server version: 9.1.0
-- PHP Version: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `survey_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prodi_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kategori_prodi_id_foreign` (`prodi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `ktg_nama`, `prodi_id`, `created_at`, `updated_at`) VALUES
(1, 'penilaian dosen', 1, '2026-05-16 06:56:44', '2026-05-16 06:56:44');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '0001_01_00_000000_create_prodis_table', 1),
(14, '0001_01_01_000000_create_users_table', 1),
(15, '0001_01_01_000001_create_cache_table', 1),
(16, '0001_01_01_000002_create_jobs_table', 1),
(17, '2025_11_01_025028_create_kategoris_table', 1),
(18, '2025_11_01_025106_create_periodes_table', 1),
(19, '2025_11_01_025146_create_pertanyaans_table', 1),
(20, '2025_11_01_034009_create_personal_access_tokens_table', 1),
(21, '2025_11_01_050847_create_respondens_table', 1),
(22, '2025_11_01_050848_create_penilaians_table', 1),
(23, '2025_11_01_050944_create_penilaian_details_table', 1),
(24, '2025_11_06_063237_create_surveys_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

DROP TABLE IF EXISTS `penilaian`;
CREATE TABLE IF NOT EXISTS `penilaian` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `responden_id` bigint UNSIGNED NOT NULL,
  `prd_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penilaian_responden_id_foreign` (`responden_id`),
  KEY `penilaian_prd_id_foreign` (`prd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penilaian_detail`
--

DROP TABLE IF EXISTS `penilaian_detail`;
CREATE TABLE IF NOT EXISTS `penilaian_detail` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `penilaian_id` bigint UNSIGNED NOT NULL,
  `prtn_id` bigint UNSIGNED NOT NULL,
  `jawaban` tinyint UNSIGNED NOT NULL COMMENT 'Jawaban dalam skala 1-5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penilaian_detail_penilaian_id_foreign` (`penilaian_id`),
  KEY `penilaian_detail_prtn_id_foreign` (`prtn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periode`
--

DROP TABLE IF EXISTS `periode`;
CREATE TABLE IF NOT EXISTS `periode` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_id` bigint UNSIGNED NOT NULL,
  `prodi_id` bigint UNSIGNED NOT NULL,
  `prd_tgl_mulai` date NOT NULL,
  `prd_tgl_selesai` date NOT NULL,
  `prd_status` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `periode_ktg_id_foreign` (`ktg_id`),
  KEY `periode_prodi_id_foreign` (`prodi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `periode`
--

INSERT INTO `periode` (`id`, `ktg_id`, `prodi_id`, `prd_tgl_mulai`, `prd_tgl_selesai`, `prd_status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-05-16', '2026-05-17', 1, '2026-05-16 06:58:09', '2026-05-16 06:58:09');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'AuthToken', 'd302fa7fb69f54953d7035af70c006dbf04db3f0df77b727f282addaf448895e', '[\"*\"]', NULL, NULL, '2026-05-15 07:23:01', '2026-05-15 07:23:01'),
(2, 'App\\Models\\User', 1, 'AuthToken', 'd027997c54c7e22aa366b509c10597013ecf7cad60577b9a0e46eed5cacae764', '[\"*\"]', '2026-05-16 06:54:37', NULL, '2026-05-15 07:33:19', '2026-05-16 06:54:37'),
(5, 'App\\Models\\User', 1, 'AuthToken', '69e47ab586341d0be9d57fac0d9fa518eac46897e8b5bf7a7dc0e1ea3c19a32c', '[\"*\"]', '2026-05-15 10:16:02', NULL, '2026-05-15 10:16:02', '2026-05-15 10:16:02'),
(6, 'App\\Models\\User', 1, 'AuthToken', '8718a8b18292c3ae4ec0114be6b2a5a0ff92730c4f224652974d3f86eba33cfe', '[\"*\"]', '2026-05-16 04:33:34', NULL, '2026-05-16 03:42:04', '2026-05-16 04:33:34'),
(7, 'App\\Models\\User', 1, 'AuthToken', '9f89b3ab67a4c27920b4a19b48f4db6c64ff79a7c3cbc5888dee47043cdfe8fd', '[\"*\"]', '2026-05-16 05:37:39', NULL, '2026-05-16 04:37:31', '2026-05-16 05:37:39'),
(8, 'App\\Models\\User', 1, 'AuthToken', 'a10d419fa6d54af0920c7d73bb95b548e510ccb75cc365cfa77b86effa6721e6', '[\"*\"]', '2026-05-16 06:18:18', NULL, '2026-05-16 06:00:10', '2026-05-16 06:18:18'),
(9, 'App\\Models\\User', 2, 'AuthToken', '53e64d935f6cb9ee2c366ff369e9bfdd5ffc6102588adcfd3e9043546cffcae8', '[\"*\"]', NULL, NULL, '2026-05-16 06:17:49', '2026-05-16 06:17:49'),
(10, 'App\\Models\\User', 2, 'AuthToken', '1e38defa54d507fe95dfe259a5a717feed9c39948c4caaf2ab85971331f4762a', '[\"*\"]', NULL, NULL, '2026-05-16 06:19:33', '2026-05-16 06:19:33'),
(11, 'App\\Models\\User', 2, 'AuthToken', '760f9581ec7023bfaa04066cbd2aabc59d79e63223c5c996bcd25e099d48fcb1', '[\"*\"]', '2026-05-16 07:11:26', NULL, '2026-05-16 06:20:15', '2026-05-16 07:11:26'),
(12, 'App\\Models\\User', 2, 'AuthToken', '3e1390f756a9880081831be3e776a6ca50de98c0d9a87fe0fd2798c6b0a587e3', '[\"*\"]', '2026-05-16 06:56:44', NULL, '2026-05-16 06:52:50', '2026-05-16 06:56:44');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan`
--

DROP TABLE IF EXISTS `pertanyaan`;
CREATE TABLE IF NOT EXISTS `pertanyaan` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_id` bigint UNSIGNED NOT NULL,
  `prtn_isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pertanyaan_ktg_id_foreign` (`ktg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pertanyaan`
--

INSERT INTO `pertanyaan` (`id`, `ktg_id`, `prtn_isi`, `created_at`, `updated_at`) VALUES
(1, 1, 'bagaimana dosen ini mengajar?', '2026-05-16 07:00:15', '2026-05-16 07:00:15');

-- --------------------------------------------------------

--
-- Table structure for table `prodi`
--

DROP TABLE IF EXISTS `prodi`;
CREATE TABLE IF NOT EXISTS `prodi` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama_prodi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prodi`
--

INSERT INTO `prodi` (`id`, `nama_prodi`, `created_at`, `updated_at`) VALUES
(1, 'PGSD', '2026-05-15 08:00:18', '2026-05-15 08:00:18');

-- --------------------------------------------------------

--
-- Table structure for table `responden`
--

DROP TABLE IF EXISTS `responden`;
CREATE TABLE IF NOT EXISTS `responden` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `periode_id` bigint UNSIGNED NOT NULL,
  `prodi_id` bigint UNSIGNED NOT NULL,
  `svy_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `svy_jabatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `svy_nomor_whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `responden_periode_id_foreign` (`periode_id`),
  KEY `responden_prodi_id_foreign` (`prodi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `period_id` bigint UNSIGNED NOT NULL,
  `prodi_id` bigint UNSIGNED NOT NULL,
  `ktg_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `surveys_slug_unique` (`slug`),
  KEY `surveys_user_id_foreign` (`user_id`),
  KEY `surveys_period_id_foreign` (`period_id`),
  KEY `surveys_prodi_id_foreign` (`prodi_id`),
  KEY `surveys_ktg_id_foreign` (`ktg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`id`, `title`, `description`, `user_id`, `period_id`, `prodi_id`, `ktg_id`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Penialaian dosen', 'aaaaaaa', 2, 1, 1, 1, 'penialaian-dosen-xn0l1x', 1, '2026-05-16 07:04:58', '2026-05-16 07:04:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('super_admin','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `prodi_id` bigint UNSIGNED DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_prodi_id_foreign` (`prodi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `prodi_id`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin super', 'super_admin', NULL, 'admin_super@gmail.com', '$2y$12$UQJV9TK.xtIXyRlAm5TIBOiXaHBjkZ7v/OL5zUI4Roi.FvLNqLgPm', NULL, '2026-05-15 07:23:01', '2026-05-15 07:23:01'),
(2, 'pgsd', 'admin', 1, 'pgsd@gmail.com', '$2y$12$gMhGq2dk.U6ly6HZAs2Ip.pusCtaAM5QSMwJwRm2ARdzTNgg0ngR2', NULL, '2026-05-16 06:17:49', '2026-05-16 06:17:49');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kategori`
--
ALTER TABLE `kategori`
  ADD CONSTRAINT `kategori_prodi_id_foreign` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_prd_id_foreign` FOREIGN KEY (`prd_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_responden_id_foreign` FOREIGN KEY (`responden_id`) REFERENCES `responden` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  ADD CONSTRAINT `penilaian_detail_penilaian_id_foreign` FOREIGN KEY (`penilaian_id`) REFERENCES `penilaian` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_detail_prtn_id_foreign` FOREIGN KEY (`prtn_id`) REFERENCES `pertanyaan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `periode`
--
ALTER TABLE `periode`
  ADD CONSTRAINT `periode_ktg_id_foreign` FOREIGN KEY (`ktg_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `periode_prodi_id_foreign` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `pertanyaan_ktg_id_foreign` FOREIGN KEY (`ktg_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `responden`
--
ALTER TABLE `responden`
  ADD CONSTRAINT `responden_periode_id_foreign` FOREIGN KEY (`periode_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `responden_prodi_id_foreign` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ktg_id_foreign` FOREIGN KEY (`ktg_id`) REFERENCES `kategori` (`id`),
  ADD CONSTRAINT `surveys_period_id_foreign` FOREIGN KEY (`period_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `surveys_prodi_id_foreign` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `surveys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_prodi_id_foreign` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
