var wget = require('wget-improved');
var config = require('../config.json');

var pocaz = 0;
var options = {
    // see options below
};
// console.log(file_name + rash);

function start_load(func, link, chatId){
    var file_name = link.substring((link.lastIndexOf('/') + 1), (link.lastIndexOf('.') - 1));
    var rash = link.substring(link.lastIndexOf('.'), link.length);
    var output = config.load_path + '/' + file_name + rash;
    var download = wget.download(link, output, options);
    download.on('error', function(err) {
        func.ero(`Нам не удалось загрузить файл\nВот сообщение об ошибке: ${err}`);
        // console.log(err);
    });
    download.on('start', function(fileSize) {
        // console.log(fileSize);
        func.start(`Мы начали загружать твой файл с именем: ${file_name + rash}\nРазмер файла: ${(fileSize/1024)/1024} Mb`);
    });
    download.on('end', function(output) {
        // console.log(output);
        func.stop('100 %!\nПроцесс загрузки завершен! Теперь вы можете начать новую загрузку!');
    });
    download.on('progress', function(progress) {
        // code to show progress bar
        if(in_progress(progress) == true){
            var pr = progress.toString().substring(2, 4) + '%';
            // console.log(pr);
            func.progress(pr);
        }
    });
}

function start_load_as(func, link, chatId, name){
    var file_name = link.substring((link.lastIndexOf('/') + 1), (link.lastIndexOf('.') - 1));
    var rash = link.substring(link.lastIndexOf('.'), link.length);
    var output = config.load_path + '/' + name;
    var download = wget.download(link, output, options);
    download.on('error', function(err) {
        func.ero(`Нам не удалось загрузить файл\nВот сообщение об ошибке: ${err}`);
        // console.log(err);
    });
    download.on('start', function(fileSize) {
        // console.log(fileSize);
        func.start(`Мы начали загружать твой файл с именем: ${file_name + rash}\nРазмер файла: ${(fileSize/1024)/1024} Mb`);
    });
    download.on('end', function(output) {
        // console.log(output);
        func.stop('100 %!\nПроцесс загрузки завершен! Теперь вы можете начать новую загрузку!');
    });
    download.on('progress', function(progress) {
        // code to show progress bar
        if(in_progress(progress) == true){
            var pr = progress.toString().substring(2, 4) + '%';
            // console.log(pr);
            func.progress(pr);
        }
    });
}



function in_progress(procent){
    if(procent >= 0.005 && procent <= 0.05 && pocaz == 0){
        pocaz = 1;
        return(true);
    }
    else if(procent >= 0.01 && pocaz == 1){
        pocaz = 2;
        return(true);
    }
    else if(procent >= 0.03 && pocaz == 2){
        pocaz = 3;
        return(true);
    }
    else if(procent >= 0.05 && pocaz == 3){
        pocaz = 4;
        return(true);
    }
    else if(procent >= 0.1 && pocaz == 4){
        pocaz = 5;
        return(true);
    }
    else if(procent >= 0.15 && pocaz == 5){
        pocaz = 6;
        return(true);
    }
    else if(procent >= 0.2 && pocaz == 6){
        pocaz = 7;
        return(true);
    }
    else if(procent >= 0.25 && pocaz == 7){
        pocaz = 8;
        return(true);
    }
    else if(procent >= 0.3 && pocaz == 8){
        pocaz = 9;
        return(true);
    }
    else if(procent >= 0.4 && pocaz == 9){
        pocaz = 10;
        return(true);
    }
    else if(procent >= 0.5 && pocaz == 10){
        pocaz = 11;
        return(true);
    }
    else if(procent >= 0.6 && pocaz == 11){
        pocaz = 12;
        return(true);
    }
    else if(procent >= 0.75 && pocaz == 12){
        pocaz = 13;
        return(true);
    }
    else if(procent >= 0.95 && pocaz == 13){
        pocaz = 0;
        return(true);
    }
    
}
module.exports = {
    start_load : start_load,
    start_load_as : start_load_as
}

