# `Домашнє завдання 6`

- [x] Створи гілку hw06-email з гілки master.

Продовжуємо створення REST API для роботи з колекцією контактів.

Додайте верифікацію email користувача після реєстрації за допомогою сервісу
[SendGrid](https://sendgrid.com/).

Як процес верифікації повинен працювати:

1. Після реєстрації, користувач повинен отримати лист на вказану при реєстрації
   пошту з посиланням для верифікації свого email

2. Пройшовши по посиланню в отриманому листі, в перший раз, користувач повинен
   отримати
   [Відповідь зі статусом 200](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/README.ua.md#verification-success-response),
   що буде мати на увазі успішну верифікацію email

3. Пройшовши по посиланню повторно користувач повинен отримати
   [Помилку зі статусом 404](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/README.ua.md#verification-user-not-found)

## `Крок 1`

### Підготовка інтеграції з SendGrid API

- [x] Зареєструйся на [SendGrid](https://sendgrid.com/).

  - [x] Створи email-відправника. Для цього в адміністративній панелі SendGrid
        зайдіть в меню Marketing в підменю senders і в правому верхньому куті
        натисніть кнопку "Create New Sender". Заповніть поля в запропонованій
        формі. Збережіть. Повинен вийти наступний, як на картинці, результат,
        тільки з вашим email:
        [image1](https://github.com/goitacademy/nodejs-homework/raw/master/homework-06/sender-not-verify.png)

  - [x] На вказаний email має прийти лист верифікації (перевірте спам якщо не
        бачите листи). Натисніть на посилання в ньому і завершіть процес.
        Результат повинен зміниться на:
        [image2](https://github.com/goitacademy/nodejs-homework/raw/master/homework-06/sender-verify.png)

  - [x] Тепер необхідно створити API токен доступу. Вибираємо меню "Email API",
        і підменю "Integration Guide". Тут вибираємо "Web API"
        [image3](https://github.com/goitacademy/nodejs-homework/raw/master/homework-06/web-api.png)
  - [x] Далі необхідно вибрати технологію Node.js
        [image4](https://github.com/goitacademy/nodejs-homework/raw/master/homework-06/node.png)
  - [x] На третьому кроці даємо ім'я нашого токену. Наприклад, systemcats,
        натискаємо кнопку згенерувати і отримуємо результат як на скріншоті
        нижче. Необхідно скопіювати цей токен (це важливо, тому що більше ви не
        зможете його подивитися). Після цього завершити процес створення токена
        [image 5](https://github.com/goitacademy/nodejs-homework/raw/master/homework-06/api-key.png)

  - [x] Отриманий API-токен треба додати в .env файл в нашому проекті

```bash
npm i @sendgrid/mail
```

## `Крок 2`

Створення ендпоінта для верифікації email

- [x] додати в модель `User` два поля `verificationToken` і `verify`. Значення
      поля `verify` рівне `false` означатиме, що його email ще не пройшов
      верифікацію

```js
{
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}
```

- [x] створити ендпоінт GET [/users/verify/:verificationToken](#
      verification-request), де по параметру `verificationToken` ми будемо
      шукати користувача в моделі `User`
- [x] якщо користувач з таким токеном не знайдений, необхідно повернути
      [Помилку 'Not Found'](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/README.ua.md#verification-user-not-found)
- [x] якщо користувач знайдений - встановлюємо `verificationToken` в `null`, а
      поле `verify` ставимо рівним `true` в документі користувача і повертаємо
      [Успішну відповідь](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/README.ua.md#verification-success-response)

### [x] `Verification request`

```
  GET /auth/verify/:verificationToken
```

### [x] `Verification user Not Found`

```
  Status: 404 Not Found
  ResponseBody: {
    message: 'User not found'
  }
```

### [x] `Verification success response`

```
  Status: 200 OK
  ResponseBody: {
    message: 'Verification successful',
  }
```

## `Крок 3`

### Додавання відправлення `email` користувачу з посиланням для верифікації

При створенні користувача при реєстрації:

- [x] створити `verificationToken` для користувача і записати його у БД (для
      генерації токена використовуйте пакет
      [uuid](https://www.npmjs.com/package/uuid) або
      [nanoid](https://www.npmjs.com/package/nanoid))

- [x] відправити email на пошту користувача і вказати посилання для верифікації
      email'а (`/users/verify/:verificationToken`) в повідомленні

- [x] Якщо email не верифікований, заборонити авторизацію користувача.

## `Крок 4`

### Додавання повторного відправлення `email` користувачу з посиланням для верифікації

#### Необхідно передбачити, варіант, що користувач може випадково видалити лист. Воно може не дійти з якоїсь причини до адресата. Наш сервіс відправлення листів під час реєстрації видав помилку і т.д.

@ POST /users/verify

- [x] Отримує body у форматі {email}
- [x] Якщо в body немає обов'язкового поля email, повертає json з ключем
      {"message":"missing required field email"} і статусом 400
- [x] Якщо з body все добре, робимо повторне відправлення листа з
      `verificationToken` на вказаний email, але тільки якщо користувач не
      верифікований
- [x] Якщо користувач вже пройшов верифікацію відправити json з ключем
      {"message":"Verification has already been passed"} зі статусом 400 Bad
      Request

Resending the email request

````json
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
`` `

#### Resending a email validation error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
````

Resending a email success response

```json
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

Resend email for verified user

```json
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  "message": "Verification has already been passed"
}
```

Примітка: Як альтернативу SendGrid можна використовувати пакет
[nodemailer](https://www.npmjs.com/package/nodemailer)

## Додаткове завдання - необов'язкове:

1. [ ] Напишіть `dockerfile` для вашої програми
