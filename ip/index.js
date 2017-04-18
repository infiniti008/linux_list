const spawn = require('child_process').spawn;
const wlan = spawn('ip' ,['addr','show', 'wlan0']);
const rndis = spawn('ip' ,['addr','show', 'rndis0']);


//Один промис
var get_ip = new Promise((resolve) => {
    var ip = {};
    wlan.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        var text = data.slice(0, data.length-4) + '.';
        var str = text.substring(text.indexOf('inet'), text.indexOf('global'));
        ip.wlan = str.substring(5, str.indexOf('/'));
    });
    wlan.stderr.on('data', (data) => {
        //console.log(`stderr: ${data}`);
        ip.wlan = 'no';
    });
    wlan.on('close', (code) => {
        //console.log(`child process exited with code ${code}`);
    });
    
    rndis.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        var text = data.slice(0, data.length-4) + '.';
        var str = text.substring(text.indexOf('inet'), text.indexOf('global'));
        ip.rndis = str.substring(5, str.indexOf('/'));
    });
    rndis.stderr.on('data', (data) => {
        //console.log(`stderr: ${data}`);
        ip.rndis = 'no';
    });
    rndis.on('close', (code) => {
        //console.log(`child process exited with code ${code}`);
        resolve(ip);
    });
});

get_ip.then((res) => {
    // console.log(res);
});

module.exports = {
    get_ip : get_ip
}

//Два промиса
// var wlan_ip = new Promise((resolve, reject) => {
//     wlan.stdout.on('data', (data) => {
//         // console.log(`stdout: ${data}`);
//         var adr = {};
//         var text = data.slice(0, data.length-4) + '.';
//         var str = text.substring(text.indexOf('inet'), text.indexOf('global'));
//         adr.inet = str.substring(5, str.indexOf('/'));
//         adr.brd = str.substring(str.indexOf('brd') + 4, str.indexOf('scope') - 1);
//         resolve(adr);
//     });
    
//     wlan.stderr.on('data', (data) => {
//         //console.log(`stderr: ${data}`);
//         var adr = {};
//         adr.inet = 'no';
//         adr.brd = 'no';
//         reject(adr);
//     });
    
//     wlan.on('close', (code) => {
//         //console.log(`child process exited with code ${code}`);
//     });
// });

// var rndis_ip = new Promise((resolve, reject) => {
//     rndis.stdout.on('data', (data) => {
//         // console.log(`stdout: ${data}`);
//         var adr = {};
//         var text = data.slice(0, data.length-4) + '.';
//         var str = text.substring(text.indexOf('inet'), text.indexOf('global'));
//         adr.inet = str.substring(5, str.indexOf('/'));
//         adr.brd = str.substring(str.indexOf('brd') + 4, str.indexOf('scope') - 1);
//         resolve(adr);
//     });
    
//     rndis.stderr.on('data', (data) => {
//         //console.log(`stderr: ${data}`);
//         var adr = {};
//         adr.inet = 'no';
//         adr.brd = 'no';
//         reject(adr);
//     });
    
//     rndis.on('close', (code) => {
//         //console.log(`child process exited with code ${code}`);
//     });
// });

// wlan_ip.then((res) => {
//     // console.log('wlan_ip');
//     // console.log(res);
// });

// rndis_ip.then((res) => {
//     // console.log('rndis_ip');
//     // console.log(res);
// });

// module.exports = {
//     wlan_ip : wlan_ip,
//     rndis_ip : rndis_ip
    
// }
