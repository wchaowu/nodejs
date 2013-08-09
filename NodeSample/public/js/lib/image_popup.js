function imageShow(which_click) {
    var image_path = which_click.src;
    //alert(image_path);
    var tag_top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    //创建底层灰色DIV
    var index_tag = document.createElement("div");
    index_tag.style.cssText = "width:100%;height:"+Math.max(document.body.clientHeight,document.body.offsetHeight,document.documentElement.clientHeight)+"px;position:absolute;background:black;top:0;filter: Alpha(Opacity=80);Opacity:0.8;";
    document.body.appendChild(index_tag);
    index_tag.ondblclick = closeIndexTag;

    //创建图片DIV
    var img_tag = document.createElement("div");
    img_tag.style.cssText = "font:12px;overflow:auto;text-align:center;position:absolute;width:200px;border:5px solid white;background:white;color:white;left:"+(parseInt(document.body.offsetWidth)/2-100)+"px;top:"+(document.documentElement.clientHeight/3+tag_top)+"px;";
    img_tag.innerHTML = "<div style='padding:10px;background:#cccccc;border:1px solid white'><img src='/images/loading.gif' /><br /><br /><b style='color:#999999;font-weight:normal'>Image loading...</b><br /></div>";
    img_tag.oncontextmenu = function() {
        var clsOK=confirm("是否确定关闭图片显示");
        if(clsOK)
            closeIndexTag();
        return false;
    }
    img_tag.onmousemove = barDidplay;
    document.body.appendChild(img_tag);

    //构建图片关闭按钮
    var close_tag = document.createElement("div");
    close_tag.style.cssText = "display:none;position:absolute;right:10px;top:10px;color:black;";
    close_tag.innerHTML = "<b style='background:white;border:1px solid white;filter:Alpha(Opacity=50);Opacity:0.5;cursor:pointer;'>&nbsp;关闭&nbsp;</b>";
    close_tag.onclick = closeIndexTag;

    var img = new Image();
    img.src = image_path;
    img.style.cssText = "border:1px solid #cccccc;filter: Alpha(Opacity=0);Opacity:0;cursor:pointer";

    var img_x = 0;
    var img_y = 0;
    imgReady(image_path,function (){
       img_x=this.width;
        img_y= this.height;
    },function(){
        imgOK();
    });

    function imgOK() {
        var temp = 0;
        var stop_x = false;
        var stop_y = false;
        var img_tag_x = img_tag.offsetWidth;
        var img_tag_y = img_tag.offsetHeight;
        var scroll_x=document.documentElement.clientWidth;
        var scroll_y=window.innerHeight||document.documentElement.clientHeight;
        var yy = 0;
        var xx = 0;
        if(img_y > scroll_y || img_x > scroll_x){
            yy = scroll_y - 100;
            xx = (img_x / img_y) * yy;
        }else{
            xx = img_x + 4;
            yy = img_y + 3;
        }
        img.style.width=xx-4+'px';
        img.style.height=yy-3+'px';

        var maxTime = setInterval(function() {
            temp += 30;
            if((img_tag_x + temp) < xx) {
                img_tag.style.width = (img_tag_x + temp) + "px";
                img_tag.style.left = (scroll_x - img_tag_x - temp)/2 + "px";
            } else {
                stop_x = true;
                img_tag.style.width = xx + "px";
                img_tag.style.left = (scroll_x - xx)/2 + "px";
            }
            if((img_tag_y + temp) < yy) {

                img_tag.style.height = (img_tag_y + temp) + "px";
                img_tag.style.top = (tag_top + (scroll_y - img_tag_y - temp)/2) + "px";
            } else {

                stop_y = true;
                img_tag.style.height = yy + "px";
                img_tag.style.top = (tag_top + (scroll_y - yy)/2) + "px";
            }
            if(stop_x && stop_y) {

                clearInterval(maxTime);
                img_tag.appendChild(img);
                temp = 0;
                imgOpacity(temp);
            }
      }, 1);
        img_tag.innerHTML="";
        img_tag.appendChild(close_tag);
    }

    function closeIndexTag() {
        document.body.removeChild(index_tag);
        document.body.removeChild(img_tag);
    }

    function imgOpacity(temp_imgOpacity) {
        var temp = temp_imgOpacity;
        temp += 10;
        img.style.filter = "alpha(opacity=" + temp + ")";
        img.style.opacity = temp/100;
        var imgTime = setTimeout(function() {imgOpacity(temp);}, 10);
        if(temp > 100)
            clearTimeout(imgTime);
    }

    var bar_show;
    function barDidplay(){
        clearTimeout(bar_show);
        close_tag.style.display = "block";
        bar_show = setTimeout(function() {close_tag.style.display = "none"}, 1000);
    }
}



// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version	2011.05.27
 * @author	TangBin
 * @see		http://www.planeart.cn/?p=1121
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

    // 停止所有定时器队列
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
                ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();