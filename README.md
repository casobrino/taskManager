![demo1](https://github.com/casobrino/taskManager/blob/master/frontend/public/imgs/captura%201.JPG?raw=true)

![demo1](https://github.com/casobrino/taskManager/blob/master/frontend/public/imgs/Captura%202.JPG?raw=true)

![demo1](https://github.com/casobrino/taskManager/blob/master/frontend/public/imgs/Captura%203.JPG?raw=true)

![demo1](https://github.com/casobrino/taskManager/blob/master/frontend/public/imgs/Captura%204.JPG?raw=true)

![demo1](https://github.com/casobrino/taskManager/blob/master/frontend/public/imgs/Captura%205.JPG?raw=true)

1. Clona este proyecto desde github

2. Entra a la carpeta backend con 
```
cd backend
```
3. Levanta la base de datos de Mongo con 
```
docker-compose up -d
```
o conectala a la base de datos de tu preferencia
4. Renombra el archivo llamado .env.template a .env y la configutacion de la base estara lista

5. Instala la paqueteria de Node necesaria
```
npm i 
```
o
```
yarn
```
6. Levanta el servidor con yarn dev

7. Encontraras diferentes endpoints 

para registrar:

>localhost:4000/api/users/

para confirmar by email

>localhost:4000/api/users/token

para logearte y tener un jwt

>localhost:4000/api/users/login

8. revisa tu email para verificar el token
