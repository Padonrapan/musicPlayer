(function($,root){
    var $scope = $(document.body);
    function renderInfo(info){
        var str = '<div class="song-name">' + info.song + '</div>' +
        '<div class="singer-name">' + info.singer + '</div>' +
        '<div class="album-name">' + info.album + '</div>'
        $scope.find('.song-info').html(str);
    }
    function renderImage(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find('.img-wrapper img').attr('src',src);
        }
    }
    function isLike(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liking');
        }else{
            $scope.find('.like-btn').removeClass('liking');
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImage(data.image);
        isLike(data.isLike);
    }
})(window.Zepto,window.player || (window.player = {}))