// 判断数组是否包含
Array.prototype.contains = function(val) {
    if(typeof(val)=='undefined'){
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val.toString()) {
            return true;
        }
    }
    return false;
}
// 找到数组中值的位置
Array.prototype.indexOf = function(val) {
    if(typeof(val)=='undefined'){
        return -1;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val.toString())
            return i;
    }
    return -1;
}
Array.prototype.unlike = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (val.indexOf(this[i])>-1)
            return i;
    }
    return -1;
}
// 从数组中删除指定值
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
