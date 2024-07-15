# Performant SQLite

Tuning SQLite to get the best performance. Also based on [this blog](https://fractaledmind.github.io/2023/09/07/enhancing-rails-sqlite-fine-tuning/). The current setup uses Node and Drizzle as the ORM for queries and migrations.

This adds some pragmas that optimise querying and also add specific options to tables like `strict` and `without rowid` to ensure type safety and increase performance.

## Prerequisites

- Node LTS v18 or above
- PNPM

## Setup

- Clone this repo
- Install dependencies - `pnpm i`
- Run the app as usual
