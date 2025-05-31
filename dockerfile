# 1. Gunakan image resmi Node.js versi 18
FROM node:18

# 2. Atur direktori kerja di dalam container
WORKDIR /app

# 3. Salin file package.json dan package-lock.json (kalau ada)
COPY package*.json ./

# 4. Install dependensi
RUN npm install

# 5. Salin semua file dan folder ke dalam container
COPY . .

RUN chmod +x wait-for-it.sh

# Gunakan wait-for-it untuk menunggu DB sebelum menjalankan app
CMD ["./wait-for-it.sh", "db:3306", "--", "node", "app.js"]