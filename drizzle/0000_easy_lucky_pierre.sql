CREATE TABLE `kv` (
	`key` text PRIMARY KEY NOT NULL,
	`value` any NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
) STRICT, without ROWID;
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`created_by` text NOT NULL
) STRICT, without ROWID;
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
) STRICT, without ROWID;
