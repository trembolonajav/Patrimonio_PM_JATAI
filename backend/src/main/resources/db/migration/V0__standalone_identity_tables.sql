create table if not exists public.departments (
    id uuid primary key,
    name varchar(120) not null unique,
    active boolean not null default true
);

create table if not exists public.employees (
    id uuid primary key,
    full_name varchar(160) not null,
    cpf varchar(14) unique,
    email varchar(180) unique,
    job_title varchar(160),
    status varchar(20) not null check (status in ('ACTIVE', 'INACTIVE')),
    department_id uuid references public.departments(id) on delete set null
);

create table if not exists public.user_account (
    id uuid primary key,
    username varchar(120) not null unique,
    nome_completo varchar(160) not null,
    email varchar(180) not null unique,
    password varchar(255) not null,
    employee_id uuid unique references public.employees(id) on delete set null
);

create table if not exists public.user_roles (
    user_id uuid not null references public.user_account(id) on delete cascade,
    role varchar(40) not null,
    primary key (user_id, role)
);

