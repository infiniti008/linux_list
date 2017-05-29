var express = require('express');
var fs = require('fs');
var path = require('path');
var tel = require('./tel/index.js');
var ipi = require('./ip/index.js');
var config = require('./config.json');

var path_plc = config.plc_path + '/';
var path_to_media = config.load_path;
var ip_default = '192.168.1.28';
var ip = {};
var vlog = 10;
var s = ['avi', 'mkv', 'flv', 'm4v', 'mkv', 'mov', 'mp4', 'mpg', 'peg', '.ts', 'wmv', 'ebm'];

tel.start_bot('das');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use('/source', express.static('/home/android/linux_list/so'));
app.use('/load', express.static('/home/android/sd/img_load/load'));
app.use('/plc', express.static('/home/android/sd/img_load/plc'));
app.listen(config.port, function () {
  console.log('Server run on port ' + config.port);
});
app.get('/',function (req, res) {
    var from_ip = req.connection.remoteAddress.substring(req.connection.remoteAddress.indexOf('1'), req.connection.remoteAddress.lastIndexOf('.'));
    // console.log(from_ip);
    // var new_ip = {}; 
    ipi.get_ip.then((result) => {
        if(result.wlan.indexOf(from_ip) == 0){
            console.log('wlan');
            ip[from_ip] = result.wlan;
            return;
        }
        else if(result.rndis.indexOf(from_ip) == 0){
            console.log('rndis');
            ip[from_ip] = result.rndis;
            return;
        }
        else{
            console.log('default ip');
            ip[from_ip] = ip_default;
            return;
        }
    }).then(() => {
        var file = fs.readFileSync(__dirname + '/home.html').toString();
        file = file.replace(/{{ip}}/ig, ip[from_ip] || ip_default);
        res.end(file);
    });
    
});


app.get('/video',function (req, res) {
    var from_ip = req.connection.remoteAddress.substring(req.connection.remoteAddress.indexOf('1'), req.connection.remoteAddress.lastIndexOf('.'));
    var file = fs.readFileSync(__dirname + '/vid.html').toString();
    var list = getFiles(path_to_media);
    console.log(list);
    var table = '';
    for(var q in list){
        var href = create_pl(from_ip, list[q]);
        table += '<a href = "' + href + '">' + list[q].substring(22, list[q].length) + '</a><br><br>';
    }
    file = file.replace('{{table}}',table);
    res.end(file);
});

function create_pl(from_ip, nam){
    var text = '#EXTM3U\n#EXTINF:0,' + nam.substring(22, nam.length) + '\nhttp://' + (ip[from_ip] || ip_default) + ':3000' + nam.substring((nam.indexOf('load') + 4), nam.length);
    var path = path_plc + nam.substring((nam.lastIndexOf('/') + 1), (nam.length - 4)) + '.m3u';
    fs.writeFileSync(path, text);
    var plc_path = 'http://' + (ip[from_ip] || ip_default) + ':3000/plc/' + nam.substring((nam.lastIndexOf('/') + 1), (nam.length - 4)) + '.m3u';
    return(plc_path);
}

//Функция нахождения видео файлов со влеженностью в одну папку - параметр vlog = 7
var getFiles = function (dir, files_){
  files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        // console.log(name.match(/\//ig).length);
        if(name.match(/\//ig).length < vlog){
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                var ras = name.substring((name.length-3), name.length);
                // console.log(ras);
                if(mat(ras) === true){
                    files_.push(name);
                }
            }
        }
    }
    return files_;
};
//Функция сравнения расширения файлов
function mat(r){
    for(var i in s){
        if(r == s[i]){
            // console.log('We founf video file');
            return(true);
        }
    }
}
