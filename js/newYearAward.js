var newYearAward = (function(){

    var click = false;
    var user = "抽奖人名";

    function init(){
        lottery.init('game-gift');
        $("#play-btn").click(function(){
            if (click) {
                return false;
            }else{
                if(lottery.array == undefined || lottery.array.length == 0){
                    tipShow("奖品已抽完，谢谢！");
                    return false;
                }
                lottery.speed=100;
                roll();
                click=true;
                return false;
            }
        });
    }

    function roll(){
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
            createList(lottery.prize);
            clearTimeout(lottery.timer);
            lottery.prize=-1;
            lottery.times=0;
            click=false;
        }else{
            if (lottery.times<lottery.cycle) {
                lottery.speed -= 10;
            }else if(lottery.times==lottery.cycle) {
                var count = Math.round(Math.random()*(lottery.array.length-1));
                var index = lottery.array[count];
                lottery.array.splice(count, 1);
                lottery.prize = index;
            }else{
                if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                    lottery.speed += 110;
                }else{
                    lottery.speed += 20;
                }
            }
            if (lottery.speed<40) {
                lottery.speed=40;
            };
            // console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
            lottery.timer = setTimeout(roll,lottery.speed);
        }
        return false;
    }

    function createList(index){
        var name = $("#game-gift").find(".gift_sort_"+index).data("name");
        $(".prize-list").prepend("<li><p>"+user+"</p><p>"+name+"</p></li>");
    }

    function tipShow(mess){
        alert("奖品已抽完，谢谢！");
    }

    return {
        init: init
    }
})();

$(function(){
    newYearAward.init();
});


var lottery={
    index:0,	//当前转动到哪个位置
    count:0,	//总共有多少个位置
    timer:0,	//setTimeout的ID，用clearTimeout清除
    speed:200,	//初始转动速度
    times:0,	//当前转动次数
    cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,	//中奖位置
    init:function(id){
        if ($("#"+id).find(".gift").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".gift");
            this.obj = $lottery;
            this.count = $units.length;
            var array = [];
            for(var i = 0; i < lottery.count; i++){
                array.push(i);
            }
            this.array = array;
            $units.eq(this.index).addClass("ac");
        };
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".gift_sort_"+index).removeClass("ac");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".gift_sort_"+index).addClass("ac");
        this.index=index;
        return false;
    },
    stop:function(index){
        this.prize=index;
        return false;
    }
};