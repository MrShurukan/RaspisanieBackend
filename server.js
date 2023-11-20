const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

app.get("/", (request, response) => {
    console.log("Кто-то зашёл на /");
    response.send("Hi!");
});

app.get("/test", async (request, response) => {
    if (!request.query.roomNumber) {
        response.send("Нужен roomNumber!");
        return;
    }

    console.log("Кто-то зашёл на /test");
    const client = new MongoClient("mongodb://localhost:27017");

    await client.connect();
    const database = client.db('test');
    const collection = database.collection('test');
    
    const query = { roomNumber: ~~request.query.roomNumber };
    console.log(query);
    const teacher = await collection.findOne(query);

    if (teacher)
        response.send(teacher);
    else
        response.send("Не найдено!");
});

app.listen(3000, () => {
    console.log("Ready!");
});