-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Transactions table
create table public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('receita', 'despesa')),
  category text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.transactions enable row level security;

create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Index for faster queries
create index transactions_user_id_date_idx on public.transactions(user_id, date desc);
