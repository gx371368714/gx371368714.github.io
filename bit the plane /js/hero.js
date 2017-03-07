function createHero(w,h,canvas,imgurl,completecallback){
    var ctx = canvas.getContext('2d');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var x = canvasWidth/2-w/2;//水平居中
        var y = canvasHeight-h-20;//垂直底部向上20px
    var hero = new Hero(x,y,w,h,imgurl,completecallback);
    document.onkeydown = function(event){
        var event = event|| window.event

        switch (event.keyCode){
            case 37:{hero.left = true;break;}
            case 38:{hero.up = true;break;}
            case 39:{hero.right = true;break;}
            case 40:{hero.down = true;break;}
        }
    }

    document.onkeyup = function(event){
        var event = event|| window.event

        switch (event.keyCode){
            case 37:{hero.left = false;break;}
            case 38:{hero.up = false;break;}
            case 39:{hero.right = false;break;}
            case 40:{hero.down = false;break;}
        }
    };

    timer = setInterval(function () {
        if (hero.left == true) hero.x -= 2
        if (hero.up == true) hero.y -= 2
        if (hero.right == true) hero.x += 2
        if (hero.down == true) hero.y += 2
        if(hero.x <=0){
            hero.x =0;
        }
        if(hero.x>= canvas.width-hero.w){
            hero.x =  canvas.width-hero.w;
        }
        if(hero.y<=0){
            hero.y = 0;
        }
        if(hero.y>=canvas.height-hero.h){
            hero.y = canvas.height-hero.h;
        }
    },10);

    return hero;
}
function Hero(x,y,w,h,imgurl,completecallback){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.onload = function(){
        if(completecallback){
            completecallback(this)
        }
    }
    this.image.src = imgurl;
    this.bol = true;
    this.direction = 0;
}
Hero.prototype.draw = function(canvas){
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var x = this.w * this.bol;
    var y =this.h;
    var w = this.w;
    var h =this.h;
    ctx.drawImage(this.image,x,0,w,h,this.x,this.y,w,h);
    this.bol = !this.bol;

}
// Hero.prototype.move = function(canvas){
//     switch(this.direction){
//         case 1:{
//             this.x -=15;
//             break;
//         }
//         case 2:{
//             this.y -=15;
//             break;
//         }
//         case 3:{
//             this.x +=15;
//             break;
//         }
//         case 4:{
//             this.y +=15;
//             break;
//         }
//     }
//     if(this.x <=0){
//         this.x =0;
//     }
//     if(this.x>= canvas.width-this.w){
//         this.x =  canvas.width-this.w;
//     }
//     if(this.y<=0){
//         this.y = 0;
//     }
//     if(this.y>=canvas.height-this.h){
//         this.y = canvas.height-this.h;
//     }
//     var ctx = canvas.getContext('2d');
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     var x = this.w * this.bol;
//     var y =this.h;
//     var w = this.w;
//     var h =this.h;
//     ctx.drawImage(this.image,x,0,w,h,this.x,this.y,w,h);
//     this.bol = !this.bol;
// }

