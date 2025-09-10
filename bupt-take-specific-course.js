// https://github.com/Durden-T/BUPTtakeCourse

var courses = ['中国艺术史'，'外国文学鉴赏'，'漫谈光通信']
//抢课时间间隔，单位为ms，抢课50ms, 捡漏300ms
var interval = 50;
//禁止改动
var targets = [];

var running;

function getCourses() {
    let params = {
        sEcho: 1,
        iColumns: 11,
        iDisplayStart: 0,
        iDisplayLength: 99999,
    };
    let paths = ['/jsxsd/xsxkkc/xsxkGgxxkxk']
    for (let path of paths)
        $.post(path, params, processData);
}

function processData(resp) {
    let data = $.parseJSON(resp).aaData;
    for (let course of data)
        if (courses.indexOf(course.kcmc) != -1)
            targets.push([course.kch, course.jx0404id]);
}

function takeCourses(targets) {
    if (!targets.length)
        getCourses();
    for (let target of targets)
        $.ajax({
            url: "/jsxsd/xsxkkc/xxxkOper",
            data: {
                kcid: target[0],
                jx0404id: target[1]
            }
        });

    console.log('running......');
}

function start() {
    running = window.setInterval(takeCourses, interval, targets);
    console.log('start');
}

function stop() {
    window.clearInterval(running);
    console.log('stop');
}

start();
