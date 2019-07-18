// 事件监听的兼容性封装函数
function addEvent(elem,type,fn){
    if(elem.addEventListener){
        elem.addEventListener(type,fn,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on' + type,function(){
            fn.call(elem);
        });
    }else{
        elem['on' + type] = fn;
    }
}
function removeEvent(elem,type,fn){
    if(elem.removeEventListener){
        elem.removeEventListener(type,fn,false);
    }else if(elem.attachEvent){
        elem.detachEvent(type,fn);
    }else{
        elem['on' + type] = null;
    }
}

// 冒泡事件的兼容性封装函数
function cancelBubble(e){
    var e = e || window.event;

    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

// 阻止默认行为的兼容性封装函数
function preventDefaultEvent(e){
    var e = e || window.event;

    if(e.preventDefault){
        e.preventDefault()
    }else{
        e.returnValue = false;
    }
}

// 鼠标相对于当前文档距离的函数封装（包含滚动条）
function pagePos(e){
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
    
    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}
// 滚动距离的兼容性函数的封装
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else{
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 获取一个元素的属性准确的属性值兼容性的封装函数getComputedStyle
function getStyle(elem,prop){
    if(window.getComputedStyle){
        if(prop){
            return parseInt(window.getComputedStyle(elem,null)[prop]);
        }else{
            return parseInt(window.getComputedStyle(elem,null));
        }
    }else{
        if(prop){
            return parseInt(elem.currentStyle[prop]);
        }else{
            return parseInt(elem.currentStyle);
        }
    }
}

// 拖拽函数的封装
function elemDrag(elem){
    var x,
        y;
    addEvent(elem,'mousedown',function(e){
        var e = e || window.event;
        x = pagePos(e).X - getStyle(elem,'left');
        y = pagePos(e).Y -getStyle(elem,'top');

        addEvent(document,'mousemove',mouseMove);
        addEvent(document,'mouseup',mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
    })

    function mouseMove(e){
        var e = e || window.event;
        elem.style.left = pagePos(e).X - x + 'px';
        elem.style.top = pagePos(e).Y - y + 'px';
    }

    function mouseUp(e){
        var e = e || window.event;
        removeEvent(document,'mousemove',mouseMove);
        removeEvent(document,'mouseup',mouseUp);
    }
}