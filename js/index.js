$(function() {
    $(window).on("load", function() {
        imgLocation();
        var dataImg = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }] };
        window.onscroll = function() { //滚动监听
            if (scrollside()) {
              
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($(".container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });
    //使用resize（）来监听浏览器窗口的变化---响应式
    $(window).on("resize", function() {
        imgLocation();
    })
});

function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2); //获取列总高度
    var documentHeight = $(window).height(); //获取屏幕高度
    var scrollHeight = $(window).scrollTop(); //滚动高度
    // console.log("lastboxHeight===>" + lastboxHeight);
    //  console.log("documentHeight===>" + documentHeight);
    //   console.log("scrollHeight===>" + scrollHeight);
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;

}




function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width(); //获取第一张图片的宽度（图片等宽）
    var num = Math.floor($(window).width() / boxWidth); //获取屏幕的宽度除以图片宽度得到一排放几个，并转化为整数。
    var boxArr = []; // 存放盒子高度
    box.each(function(index, value) {
        value.style.cssText = ''; //响应式
        var boxHeight = box.eq(index).height(); //获取每个盒子高度
        if (index < num) {
            boxArr[index] = boxHeight;

        } else {
            var minboxHeight = Math.min.apply(null, boxArr); //获取最小高度
            var minboxIndex = $.inArray(minboxHeight, boxArr); //获取最小位置
            $(value).css({ //设置图片放置位置
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).height(); //重新计算高度
        }
    });
}
