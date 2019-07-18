window.onload = function(){
    init();
}

function init(){
    keySearch();
}

var keySearch = (function(){
    var searchKw = document.getElementById('J_search_kw'),
        autoKw = document.getElementById('J_autoKw'),
        recomKw = JSON.parse(document.getElementById('J_recomKw').innerHTML),
        kwOrder = 0,
        timer = null;
    
    addEvent(searchKw,'focus',function(){
        clearInterval(timer);
        autoKw.style.color = "#ccc";
    })

    addEvent(searchKw,'blur',function(){
        autoKwShow(this.value,true);
        timer = setInterval(autoKwChange,2000)
    });

    addEvent(searchKw,'input',function(){
        autoKwShow(this.value,false);
    });
    addEvent(searchKw,'propertychange',function(){
        autoKwShow(this.value,false);
    });

    function setAutoKws(){
        autoKwChange();
        timer = setInterval(autoKwChange,2000)
    }

    function autoKwChange(){
        var len = recomKw.length;
        autoKw.innerHTML = recomKw[kwOrder];

        kwOrder = kwOrder >= len - 1 ? 0 : kwOrder + 1 ;
    }

    function autoKwShow(val,isBlur){
        if(val.length <= 0){
            autoKw.className = "auto-kw show";
            autoKw.style.color = isBlur ? '#989898' : '#ccc';
        }else{
            autoKw.className = "auto-kw hide";
        }
    }

    return function(){setAutoKws()}
})()