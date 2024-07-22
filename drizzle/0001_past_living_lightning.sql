CREATE TABLE `feature_flags` (
	`name` text PRIMARY KEY NOT NULL,
	`description` text,
	`enabled` bool DEFAULT false
);
