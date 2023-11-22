const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

function createDbClient() {
    return new MongoClient("mongodb://localhost:27017");
}


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
    const client = createDbClient();

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

app.get("/scheduleByDay", async (request, response) => {
    if (!request.query.day) {
        response.status(400).send("Нужен day!");
        return;
    }

    let day = parseInt(request.query.day, 10);
    if (isNaN(day)) {
        response.status(400).send("Day не был правильным числом!");
        return;
    }

    console.log(day);
    if (day <= 0 || day > 7) {
        response.status(400).send("Day должен быть в диапазоне 1 и 7!");
        return;
    }

    const client = createDbClient();

    await client.connect();
    const database = client.db('main');
    const collection = database.collection('schedule');

    const query = { day: day };

    response.send(await collection.find(query).toArray());
})

app.listen(3000, () => {
    console.log("Ready!");
});

// function get(path, action) {
//     // Магия по регистрации path
//
//     let request = { query: [] };
//     let response = { send: function() { } };
//
//     if (currentPath == path && type == "GET") {
//         action(request, response);
//     }
// }