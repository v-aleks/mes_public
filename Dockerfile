# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем зависимости системы
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    pkg-config \
    default-libmysqlclient-dev\
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы requirements.txt и устанавливаем зависимости
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install pytz

# Копируем весь проект в контейнер
COPY . /app/

EXPOSE 8000

# Команда для запуска сервера Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "erp.wsgi:application"]
