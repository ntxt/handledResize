$(document).ready(init);

function init(){
    var logLine = 0;
    var resizeCallbacks = [
        function resizeDiv(){
            var me = $("div.handle-resize");
            me.html("szer: " + me.css("width"));
        },
        function resizeCanvas(){
            var me = $("canvas.handle-resize");
            var canvas = me[0];

            if(adjustCanvas(canvas)){
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "30px Arial";
                ctx.fillText(canvas.clientWidth,10,30);
            }
        }
    ];


    $( window ).resize(throttle(runCallbacks, 200));

    function runCallbacks() {
        resizeCallbacks.forEach(function(cb){
            cb.call();
        });
    }

    function throttle(callback, delay) {
        var timer;
        return function throttlingWrapper(e){
            var that = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(
                function(){ callback.call(that, e); },
                delay
            );
        }
    }

    function adjustCanvas(canvas){
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }
    
    function log(msg){
        logLine++;
        $("#log").prepend(logLine + ": " + msg + "\n");
    }
}


