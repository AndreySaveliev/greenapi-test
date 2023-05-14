# GREEN API TEST
Инструкция:

Клонируем репозиторий к себе на на компьютер.
Для начала надо сконфигурировать .env файл
```code 
DATABASE_URL=mongodb+srv://andrey:andrey@cluster0.cjvgj1p.mongodb.net/greenapi
NEXTAUTH_JWT_SECRET=NEXT-JWT-SECRET
NEXTAUTH_SECRET=NEXT-SECRET
```

Устанавливаем зависимости
```code
npm install
```

Запускаем дев сервер
```code
npm run dev
```