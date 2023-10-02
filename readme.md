![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

# DRINK-MASTER-Backend

Серверна складова проекту "DRINK-MASTER" відповідає за зберігання, обробку і надання інформації про напої та користувачів. / The server component of the DRINK-MASTER project is responsible for storing, processing and providing information about drinks and users.

## Встановлення та запуск / Get it up and running
* Переконайся, що на комп'ютері встановлена LTS-версія Node.js та MongoDB. / Make sure you have the LTS version of Node.js and MongoDB installed on your computer.
* Встановіть базові залежності проекту командою ```npm install``` / Install the basic project dependencies with the command ```npm install```
* Створіть базу даних MongoDB та налаштуйте налаштуйте її. / Create a MongoDB database and configure it.
* Створіть файл ```env.``` у кореневій папці проекту та налаштуйте його / Create the ```env.``` file in the project root folder and configure it: 
```    
Приклад налаштування / Example of setting up

DB_HOST=
SECRET_KEY=
SENDGRID_API_KEY=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```
* Запустіть локальний сервер за допомогою команди ``` npm run start:dev``` / Start the local server using the command ```npm run start:dev```
* Перевірити роботу запитів ви можете за допомогою `Postman`, для перевірки запитів / You can check the operation of requests using `Postman`, to check requests

## Документація

Ознайомитись із документацією ви можете перейшовши по [посиланню ](https://rest-api-drink-master.onrender.com/api-docs/) / You can get acquainted with the documentation by following [link](https://rest-api-drink-master.onrender.com/api-docs/)


