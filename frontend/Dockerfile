# Используем официальный образ Node.js
FROM node:22.5.1-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем path для node_modules/.bin чтобы можно было запускать next
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# Команда для запуска приложения Next.js
CMD ["npm", "start"]
