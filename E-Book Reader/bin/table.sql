
use test1;
create table user_account (
user_name varchar(100),
password varchar(100),
name varchar(100),
primary key (user_name)
);

create table book (
book_name varchar(100),
author varchar(100), 
chapter varchar(100),
content varchar(100),
primary key (book_name, chapter),
FOREIGN KEY (author) REFERENCES user_account(user_name));

create table bookmark (
book_name varchar(100),
user_name varchar(100),
FOREIGN KEY (user_name) REFERENCES user_account(user_name) ON DELETE CASCADE,
FOREIGN KEY (book_name) REFERENCES book(book_name)  ON DELETE CASCADE
);
