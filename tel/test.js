// const execFile = require('child_process').exec;
// // const child = execFile('sudo su', (error, stdout, stderr) => {
// //   if (error) {
// //     throw error;
// //   }
// //   console.log(stdout);
// // });
//
// const chi = execFile('chmod -R 777 *', (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });


'use strict';

// Создаётся объект promise
var promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve("resulteweew");
  }, 1000);
});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
    result => {
      console.log("Fulfilled: " + result); // result - аргумент resolve
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve('sadasdasasdasd');
        }, 2000);
      }
    )}
  )
  .then(
    trouble => {
      console.log('11111111111 _ ' + trouble);
    }
  );
