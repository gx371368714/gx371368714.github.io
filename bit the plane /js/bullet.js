    function createBullet(doubleWidth,doubleHeight,bURL,hero){
        var x = hero.x +hero.w/2-doubleWidth/2;
        var y = hero.y - doubleHeight;
        var bullet = new Bullet(x,y,doubleWidth,doubleHeight,bURL);
        //子弹的声音
         var bSound = new Audio('audio/bullet.mp3');
         bSound.play();

        return bullet;
    }
    function Bullet(x,y,w,h,imageURL){
        this.x=x;
        this.y=y;
        this.w =w;
        this.h = h;
        this.image = new Image();
        this.image.src = imageURL;
    }
    Bullet.prototype.draw = function(canvas){
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
    }
    Bullet.prototype.move = function(){
        this.y -=5;
    }
    Bullet.prototype.isOutOfScreen = function(){
        if(this.y<=-this.h){
            return true;
        }else{
            return false;
        }
    }
