SET SQL_MODE = `NO_AUTO_VALUE_ON_ZERO`;
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = `+00:00`;

--
-- Database: `sampledb`
--

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE
);

CREATE TABLE `consents` (
  `id` varchar(36) NOT NULL,
  `type` varchar(36) NOT NULL
);

CREATE TABLE `users_consents` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `consent_id` varchar(36) NOT NULL,
  `enabled` boolean NOT NULL
);

CREATE TABLE `users_consents_events` (
  `id` varchar(36) NOT NULL,
  `previous` varchar(36),
  `current` varchar(36) NOT NULL,
  `users_consents_id` boolean NOT NULL,
  `created` TIMESTAMP
);

CREATE TRIGGER `before_users_consents_events_insert` 
BEFORE INSERT ON `users_consents_events` 
FOR EACH ROW 
SET NEW.created = NOW();

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`) VALUES
( "00000001-caa1-45ff-b6e1-56e5cb4586c5", "Jupiter@planet.it"),
( "00000002-caa1-45ff-b6e1-56e5cb4586c5", "Venus@planet.it"),
( "00000003-caa1-45ff-b6e1-56e5cb4586c5", "Earth@planet.it");

--
-- Dumping data for table `consents`
--
INSERT INTO `consents` (`id`, `type`) VALUES
( "11111111-caa1-45ff-b6e1-56e5cb4586c5", "email_notifications"),
( "11111112-caa1-45ff-b6e1-56e5cb4586c5", "sms_notifications");

--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consents`
--
ALTER TABLE `consents` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_consents`
--
ALTER TABLE `users_consents` ADD PRIMARY KEY (`id`);
ALTER TABLE `users_consents` ADD FOREIGN KEY (`user_id`) REFERENCES users(`id`);
ALTER TABLE `users_consents` ADD FOREIGN KEY (`consent_id`) REFERENCES consents(`id`);

--
-- Dumping data for table `users_consents`
--
INSERT INTO `users_consents` (`id`, `user_id`, `consent_id`, `enabled`) VALUES
( "22222221-caa1-45ff-b6e1-56e5cb4586c5", "00000001-caa1-45ff-b6e1-56e5cb4586c5", "11111111-caa1-45ff-b6e1-56e5cb4586c5", 1),
( "22222221-caa1-45ff-b6e1-56e5cb4586c5", "00000001-caa1-45ff-b6e1-56e5cb4586c5", "11111112-caa1-45ff-b6e1-56e5cb4586c5", 1),
( "22222221-caa1-45ff-b6e1-56e5cb4586c5", "00000002-caa1-45ff-b6e1-56e5cb4586c5", "11111111-caa1-45ff-b6e1-56e5cb4586c5", 1),
( "22222221-caa1-45ff-b6e1-56e5cb4586c5", "00000003-caa1-45ff-b6e1-56e5cb4586c5", "11111112-caa1-45ff-b6e1-56e5cb4586c5", 1);


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;