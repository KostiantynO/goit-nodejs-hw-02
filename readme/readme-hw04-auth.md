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

### Реєстрація

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
