# `Домашнє завдання 5`

- [x] Створи гілку hw05-avatars з гілки master.

Продовж створення REST API для роботи з колекцією контактів. Додай можливість
завантаження аватарки користувача через
[Multer](https://github.com/expressjs/multer).

## `Крок 1`

- [x] Створи папку public для роздачі статики.
- [x] У цій папці зроби папку avatars.
- [x] Налаштуй Express на роздачу статичних файлів з папки `public`.

- [x] Поклади будь-яке зображення в папку `public/avatars` і перевір, що роздача
      статики працює.

- [x] При переході по такому URL браузер відобразить зображення.

```bash
http://localhost:3000/avatars/gun.svg
```

`2022-07-31 22:27`

```bash
npm i multer gravatar
npm i -D @types/node
```

## `Крок 2`

- [x] У схему користувача додай нову властивість avatarURL для зберігання
      зображення.

```js
{
  avatarURL: String,
}
```

- [x] Використовуй пакет [gravatar](https://www.npmjs.com/package/gravatar) для
      того, щоб при реєстрації нового користувача відразу згенерувати йому
      аватар по його email.

## `Крок 4`

- [x] Додай можливість поновлення аватарки, створивши ендпоінт `/users/avatars`
      і використовуючи метод `PATCH`.

```bash
# Запит
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: завантажений файл

# Успішна відповідь
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "public/avatars/image.jpg"
}

# Неуспішна відповідь
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- [x] Створи папку `tmp` в корені проекту і зберігай в неї завантажену аватарку.
- [x] Оброби аватарку пакетом [jimp](https://www.npmjs.com/package/jimp) і
      постав для неї розміри 250 на 250
- [x] Перенеси аватарку користувача з папки `tmp` в папку `public/avatars`

      - [x] і дай їй унікальне ім'я для конкретного користувача.

- [x] Отримай URL `/avatars/image.jpg` та збережи в поле `avatarURL` користувача

`2022-08-01 13:06`

```bash
npm i jimp
```

## `Додаткове завдання - необов'язкове`

1. Написати unit-тести для контролера входу (login/signin)

   за допомогою [Jest](https://jestjs.io/ru/docs/getting-started)

- [ ] відповідь повина мати статус-код 200
- [ ] у відповіді повинен повертатися токен
- [ ] у відповіді повинен повертатися об'єкт `user` з 2 полями `email` та
      `subscription` з типом даних `String`

`2022-08-01 17:52`

```bash
npm i -D jest @types/jest
```

`2022-08-04 01:10`

```bash
npm i -D supertest @types/supertest
```
