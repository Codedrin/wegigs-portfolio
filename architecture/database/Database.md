# Database

**No application database is currently used.**

## How this was confirmed

- `package.json` dependencies contain no database client library — no `firebase`, `mongodb`, `mongoose`, `pg`/`postgres`, `@supabase/supabase-js`, `mysql`/`mysql2`, or ORM of any kind.
- A full grep of `src/` and `server/` for imports of any such package returns nothing.
- The AI assistant's knowledge base ([[AI Portfolio Context]]) mentions Firebase, MongoDB, MySQL, PostgreSQL, and Supabase — but only as technologies **Aldrin has professional experience with** on other projects. None of them are used by *this* portfolio application itself. Don't confuse the two.

## What actually holds state

- Conversation history in [[AIChat]]: in-memory React state only, lost on page reload.
- [[AI Portfolio Context]]: a hardcoded JavaScript string, not a database record.

If a database is added to this project in the future, this page should be the first thing updated.
