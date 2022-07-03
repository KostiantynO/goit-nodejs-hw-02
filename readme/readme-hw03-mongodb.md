# Домашнє завдання 3

- [x] Створи гілку 03-mongodb з гілки master.

- [ ] Продовж створення REST API для роботи з колекцією контактів.

### `2022-07-01 14:15`:

```bash
geb 03-mongodb # git checkout -b 03-mongodb
gb -m hw03-mongodb # git branch -m hw03-mongodb
```

### `2022-07-02 20:15`:

```bash
npm init @eslint/config # adds eslint-config-airbnb-base
```

## `Крок 1`

- [x] Створи аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- [x] Після чого в акаунті створи новий проект і налаштуй безкоштовний кластер.
- [x] Під час налаштування кластера вибери провайдера і регіон як на скріншоті
      нижче.
- [x] Якщо вибрати занадто віддалений регіон, швидкість відповіді сервера буде
      довше. Frankfurt is ok.

## `Крок 2`

- [x] Установи графічний редактор
      [MongoDB Compass](https://www.mongodb.com/download-center/compass) для
      зручної роботи з базою даних для MongoDB.
- [x] Налаштуй підключення своєї хмарної бази даних до Compass. У MongoDB Atlas
      не забудь створити користувача з правами адміністратора.

## `Крок 3`

- [x] Через Compass створи базу даних `db-contacts` і в ній колекцію `contacts`.
- [x] Візьми
      [json](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/contacts.json)
      і у Compass наповни колекцію `contacts` (імпортуй цей json).
- [x] Якщо ви все зробили правильно, дані повинні з'явитися у вашій базі в
      колекції contacts

## `Крок 4`

Використовуючи вихідний код домашньої роботи #2, заміни зберігання контактів з
json-файлу на створену тобою базу даних:

- [x] Напиши код для створення підключення до MongoDB за допомогою Mongoose.
- [x] При успішному підключенні виведи в консоль повідомлення "Database
      connection successful".
- [x] Обов'язково оброби помилку підключення. Виведи в консоль повідомлення
      помилки і заверши процес використовуючи `process.exit(1)`.
- [x] У функціях обробки запитів заміни код CRUD-операцій над контактами з
      файлу, на Mongoose-методи для роботи з колекцією контактів в базі даних.
- [x] Схема моделі для колекції `contacts`:

```js
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
```
