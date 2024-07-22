import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { sql, relations } from 'drizzle-orm';
import { text, sqliteTable, customType } from 'drizzle-orm/sqlite-core';
import { ulid } from 'ulid';

const any = customType<{ data: any; notNull: true; default: true }>({
  dataType() {
    return 'any';
  },
});

const boolean = customType<{ data: boolean; notNull: true; default: true }>({
  dataType() {
    return 'bool';
  },
});

export const kvStore = sqliteTable('kv', {
  key: text('key').primaryKey(),
  value: any('value').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const featureFlags = sqliteTable('feature_flags', {
  name: text('name').primaryKey(),
  description: text('description'),
  enabled: boolean('enabled').default(false),
});

export const user = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => `usr_${ulid()}`),
  name: text('name').notNull(),
});

export const message = sqliteTable('messages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => `mes_${ulid()}`),
  content: text('content').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  createdBy: text('created_by').notNull(),
});

export const usersMessages = relations(user, ({ many }) => ({
  messages: many(message),
}));

export const messageAuthor = relations(message, ({ one }) => ({
  author: one(user, {
    fields: [message.createdBy],
    references: [user.id],
  }),
}));

const sqlite = new Database('sqlite.db');
// performance tuning
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('synchronous = NORMAL');
sqlite.pragma('journal_size_limit = 67108864');
sqlite.pragma('mmap_size = 134217728');
sqlite.pragma('cache_size = 2000');
sqlite.pragma('temp_store = memory');
sqlite.pragma('busy_timeout = 5000');

export const db = drizzle(sqlite, {
  schema: {
    user,
    message,
    usersMessages,
    messageAuthor,
    kvStore,
    featureFlags,
  },
});
