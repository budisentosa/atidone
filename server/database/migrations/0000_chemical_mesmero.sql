CREATE TABLE IF NOT EXISTS `todos` (
	`id` integer PRIMARY KEY NOT NULL,
		`user_id` integer NOT NULL,
		`title` text NOT NULL,
		`completed` integer DEFAULT 0 NOT NULL,
		`created_at` integer NOT NULL,
		FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS `users` (
		`id` integer PRIMARY KEY NOT NULL,
		`username` text NOT NULL,
		`name` text NOT NULL,
		`email` text,
		`password` text,
		`github_id` text,
		`created_at` integer NOT NULL,
		`last_login_at` integer NOT NULL
	);
	--> statement-breakpoint
	CREATE UNIQUE INDEX IF NOT EXISTS `users_username_unique` ON `users` (`username`);