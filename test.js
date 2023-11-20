function longProcedure(callback) {
    // Длительная процедура
    
    // Закончили!
    const result = 100;
    callback(result);
}

longProcedure(getResult);
function getResult(result) {
    console.log("Получил результат", result);
}