# Express JWT

Silakan buka terminal atau CMD dan lakukan langkah berikut : 
```bash
git clone https://github.com/jemblonganvalley/b9ol_express_jwt.git 
cd b9ol_express_jwt
npm install
```

Buat sebuah file dengan nama **.env** dan isi dengan :
```
DATABASE_URL="file:./db.sqlite"
PORT=8000
SECRET_KEY="masukanSecretKeyKamuTerserahApaAja"
```

Kembali ke terminal dan silakan push database dengan : 
```
npx prisma db push
```



