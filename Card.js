class Card {
    constructor(x, y, w, h, img) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        if(img != undefined) {
            this.img=loadImage(img);
        }
        var ID = '';
        var name = '';
        var type = '';
        var clan = '';
        var race = '';
        var nation = '';
        var grade = '';
        var power = '';
        var critical = '';
        var shield = '';
        var skill = '';
        var effect = '';
        var flavor = '';
        var rarity = '';
    }

    drawObject() {
        if(this.img == undefined) {
            rect(this.x,this.y,this.w,this.h);
        }
        else {
            image(this.img,this.x,this.y,this.w,this.h);
        }

    }

    isInside(inputX,inputY) {
        if(inputX > this.x && inputX < this.x+this.w && inputY > this.y && inputY < this.y+this.h) {
            return true;
        }
    }

    setXYWH(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    setXY(x,y) {
        this.x=x;
        this.y=y;
    }
}