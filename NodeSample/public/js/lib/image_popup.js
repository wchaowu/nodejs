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
    close_tag.style.cssText = "display:none;position:absolute;left:10px;top:50px;color:black;";
    close_tag.innerHTML = "<b style='background:white;border:1px solid white;filter:Alpha(Opacity=50);Opacity:0.5;cursor:pointer;'>&nbsp;关闭&nbsp;</b>";
    close_tag.onclick = closeIndexTag;

    var img = new Image();
    img.src = image_path;

    img.style.cssText = "border:1px solid #cccccc;filter: Alpha(Opacity=0);Opacity:0;cursor:pointer";
    img.onload = imgOK();

    function imgOK() {
        var temp = 0;
        var stop_x = false;
        var stop_y = false;
        var img_tag_x = img_tag.offsetWidth;
        var img_tag_y = img_tag.offsetHeight;
        var img_x = img.width;
        var img_y = img.height;
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