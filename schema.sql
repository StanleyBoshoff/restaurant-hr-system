-- BistroConnect HR System Database Schema
-- Target Engine: MariaDB / MySQL (cPanel Compatible)

CREATE TABLE IF NOT EXISTS `employees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `department` VARCHAR(50) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data for initial testing
INSERT INTO `employees` (`name`, `role`, `department`, `status`) VALUES
('Marcus Miller', 'Head Chef', 'Kitchen', 'Active'),
('Sophia Martinez', 'Server Lead', 'Front of House', 'Active'),
('David Chen', 'Line Cook', 'Kitchen', 'On Leave');
