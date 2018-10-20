var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
var controlManager;
var audioControl = new root.audioControl();

function bindEvent(){
    $scope.on('change',function(event,index){
        audioControl.getAudio(songList[index].audio);
        if(audioControl.status == 'play'){
            audioControl.play();
            root.process.start(0);
        }
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.update(0);
        //root.process.start(0);
    });
    
    $scope.on('click','.play-btn',function(){
        if(audioControl.status == 'play'){
            //console.log('play');
            audioControl.pause();
            root.process.stop();
            
        }else{
            //console.log('pause');
            root.process.update(0);
            audioControl.play();
            root.process.start();
        }
        $(this).toggleClass('pause');
    })
    $scope.on('click','.prev-btn',function(){
        /*if(index === 0){
            index = songList.length -1 ;
        }else{
            index--;
        }*/
        var index = controlManager.prev();
        //root.render(songList[index]);
        $scope.trigger('change',[index]);
    });
    $scope.on('click','.next-btn',function(){
        /*if(index == songList.length -1){
            index = 0;
        }else{
            index++;
        }*/
        var index = controlManager.next();
        //root.render(songList[index]);
        $scope.trigger('change',[index]);
    });
    

}

function bindTouch(){
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart',function(){
        root.process.stop();
    }).on('touchmove',function(e){
        //获取到拖动位置的百分比,然后update
        var x = e.changedTouches[0].clientX;
        var per = (x -left)/width;
        if(per < 0 || per > 1){
            per = 0;
        }
        root.process.update(per);
     }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x -left)/width;
        if(per < 0 || per > 1){
            per = 0;
        }
        //获取到结束位置的播放时间,播放该时刻的音乐
        //console.log(controlManager.index);
        var curDuration = songList[controlManager.index].duration;
        var curTime = per*curDuration;
        //console.log(curTime);
        audioControl.playTo(curTime);
        root.process.start(per);
        $scope.find('.play-btn').removeClass('pause');
     })
}
function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            console.log(data);
            root.render(data[0]);
            songList = data;
            controlManager = new root.controlManager(data.length);
            bindEvent(); 
            $scope.trigger('change',[0]);         
            bindTouch();  
        },
        error:function(){
            console.log('error');
        }
    });    
}
getData('../mock/data.json');
