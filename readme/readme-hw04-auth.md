# `Домашнє завдання 4`

- [x] Створи гілку 04-auth з гілки master.

Продовж створення REST API для роботи з колекцією контактів. Додай логіку
аутентифікації/авторизації користувача через [JWT](https://jwt.io/).

## `Крок 1`

- [x] У коді створи схему і модель користувача для колекції `users`.

```js
{
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}
```

- [x] Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти.
      Для цього в схемі контактів додайте властивість

```js

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```

Примітка: 'user' - назва колекції, у якій зберігаються користувачі

## `Крок 2`

### `Реєстрація`

- [x] Створити ендпоінт
      [/users/register](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#registration-request)

  `Registration request`

  ```json
  POST /users/register
  Content-Type: application/json
  RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
  }
  ```

- [x] Зробити валідацію всіх обов'язкових полів (email і password). При помилці
      валідації повернути
      [Помилку валідації](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#registration-validation-error).

  `Registration validation error`

  ```json
  Status: 400 Bad Request
  Content-Type: application/json
  ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
  ```

- [x] У разі успішної валідації в моделі `User` створити користувача за даними,
      які пройшли валідацію. Для засолювання паролів використовуй
      [bcrypt](https://www.npmjs.com/package/bcrypt) або
      [bcryptjs](https://www.npmjs.com/package/bcryptjs)

  - [x] Якщо пошта вже використовується кимось іншим, повернути
        [Помилку Conflict](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#registration-conflict-error).

    `Registration conflict error`

    ```json
    Status: 409 Conflict
    Content-Type: application/json
    ResponseBody: {
      "message": "Email in use"
    }
    ```

- [x] В іншому випадку повернути
      [Успішна відповідь](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#registration-success-response).
      Registration request

  `Registration success response`

  ```json
  Status: 201 Created
  Content-Type: application/json
  ResponseBody: {
    "user": {
      "email": "example@example.com",
      "subscription": "starter"
    }
  }
  ```

### `2022-07-04 19:40`:

```bash
npm i bcryptjs
```

## `Логін`

- [x] Створити ендпоінт
      [/users/login](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#login-request)

  `Login request`

  ```json
  GET /users/login
  Content-Type: application/json
  RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
  }
  ```

- [x] В моделі `User` знайти користувача за `email`.

- [x] Зробити валідацію всіх обов'язкових полів (email і password). При помилці
      валідації повернути Помилку валідації.

  `Login validation error`

  ```json
  Status: 400 Bad Request
  Content-Type: application/json
  ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
  ```

  - [x] В іншому випадку, порівняти пароль для знайденого користувача, якщо
        паролі збігаються створити токен, зберегти токен в об'єкт юзера в БД, і
        повернути
        [Успішна відповідь](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#login-success-response).

  `Login success response`

  ```json
  Status: 200 OK
  Content-Type: application/json
  ResponseBody: {
    "token": "exampletoken",
    "user": {
      "email": "example@example.com",
      "subscription": "starter"
    }
  }
  ```

- [x] Якщо пароль або імейл невірний, повернути
      [Помилку Unauthorized](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#login-auth-error).

  ```json
  Login auth error
  Status: 401 Unauthorized
  ResponseBody: {
    "message": "Email or password is wrong"
  }
  ```

### `2022-07-05 00:03`:

```bash
npm i jsonwebtoken
```

## `Крок 3`

### `Перевірка токена`

- [x] Створи мідлвар для перевірки токена і додай його до всіх раутів, які
      повинні бути захищені.
- [x] Мідлвар бере токен з заголовків `Authorization`, перевіряє токен на
      валідність.
- [x] У випадку помилки повернути
      [Помилку Unauthorized](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#middleware-unauthorized-error).
- [x] Якщо валідація пройшла успішно, отримати з токена `id` користувача. Знайти
      користувача в базі даних з цим `id`.
- [x] Якщо користувач існує і токен збігається з тим, що знаходиться в базі,
      записати його дані в `req.user` і викликати `next()`.
- [x] Якщо користувача з таким `id` НЕ існує або токени не збігаються, повернути
      [Помилку Unauthorized](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#middleware-unauthorized-error)

`Middleware unauthorized error`

```json
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## `Крок 4`

### `Логаут`

- [x] Створити ендпоінт
      [/users/logout](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#logout-request)

  `Current user request`

  ```json
  GET /users/current
  Authorization: "Bearer {{token}}"
  ```

- [x] Додай в маршрут мідлвар перевірки токена.

  - [x] У моделі `User` знайти користувача за `_id`.
  - [x] Якщо користувача не існує повернути
        [Помилку Unauthorized](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#logout-unauthorized-error).

  `Logout unauthorized error`

  ```json
  Status: 401 Unauthorized
  Content-Type: application/json
  ResponseBody: {
  "message": "Not authorized"
  }
  ```

- [x] В іншому випадку, видалити токен у поточного юзера і повернути
      [Успішна відповідь](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#logout-success-response).

`Logout success response`

```json
Status: 204 No Content
```

## `Крок 5`

### `Поточний користувач - отримати дані юзера по токену`

- [x] Створити ендпоінт
      [/users/current](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#current-user-request)

  `Current user request`

  ```json
  GET /users/current
  Authorization: "Bearer {{token}}"
  ```

- [x] Додай в раут мідлвар перевірки токена.

  - [x] Якщо користувача не існує повернути
        [Помилку Unauthorized](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#current-user-unauthorized-error)

    `Current user unauthorized error`

    ```json
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
      "message": "Not authorized"
    }
    ```

- [x] В іншому випадку повернути
      [Успішну відповідь](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.ua.md#current-user-success-response)

  `Current user success response`

  ```json
  Status: 200 OK
  Content-Type: application/json
  ResponseBody: {
    "email": "example@example.com",
    "subscription": "starter"
  }
  ```

## `Додаткове завдання - необов'язкове`

- [ ] Зробити пагінацію для колекції контактів
      (`GET /contacts?page=1&limit=20`).
- [ ] Зробити фільтрацію контактів по полю обраного
      (`GET /contacts?favorite=true`)
- [ ] Оновлення підписки (`subscription`) користувача через ендпоінт
      `PATCH /users`. Підписка повинна мати одне з наступних значень
      `['starter', 'pro', 'business']`
