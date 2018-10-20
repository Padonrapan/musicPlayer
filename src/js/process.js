//渲染进度条
(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime = new Date().getTime(),stopTime;
    var lastPer = 0;
    
    //处理时间格式
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time/60);
        var second = time - minute*60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    //渲染总时间
    function renderAllTime(duration){
        lastPer = 0;//每次切换歌的时候从0开始
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }

    //时间和进度条改变
    function start(per){
        //lastPer = 0;
        lastPer = (per == undefined) ? lastPer : per;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime)/(curDuration*1000);
           frameId = (frame);
            update(percent);
        }  
        frame();
    }

    //更新时间
    functirequestAnimationFrameon update(percent){
        var curTime = curDuration * percent;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        //渲染进度条
        var percentPage = (-1 + percent)*100 + '%';
        $scope.find('.pro-top').css({
            'transform':'translateX(' + percentPage + ')'
        })
    }

    //停止播放
    function stop(){
        stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId);
    }

    
    //暴露函数
    root.process = {
        renderAllTime: renderAllTime,
        start:start,
        update:update,
        stop:stop
    }
})(window.Zepto,window.player||(window.player = {}))