var canvasWidth;
var canvasHeight;
var card_width;
var card_height;

var card1;
var card2;
var cards = [];
var grid = [];
var card_selected;
var card_selected_index;
var inputFocus = false;
var gameElement = document.getElementById("sketch-holder");
var authCode;

// $.post(
//     "https://cors-anywhere.herokuapp.com/https://api.tcgplayer.com/token",
//     'grant_type=client_credentials&client_id=4a08e9c6-5126-441b-a614-40ba1e428fe7&client_secret=40a29c70-9235-4a6f-bd17-07c682236f17',
//     function(data,status){
//         console.log(data);
//         authCode=data.access_token;
//     }
// );

function list_categories() {
    console.log(authCode);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'bearer ' + authCode
        },
        url: "http://api.tcgplayer.com/v1.32.0/catalog/categories",
        success: function(data) {
            console.log(data);
        }
    })
}

function setup() {
    $.ajax({
        type: "POST",
        url: "https://cors-anywhere.herokuapp.com/https://api.tcgplayer.com/token",
        data: 'grant_type=client_credentials&client_id=4a08e9c6-5126-441b-a614-40ba1e428fe7&client_secret=40a29c70-9235-4a6f-bd17-07c682236f17',
        success: function(data) {
            console.log(data);
            authCode=data.access_token;
        }
    })
    list_categories();
    //set width and height of canvas
    canvasWidth = document.getElementById("sketch-holder").offsetWidth;
    canvasHeight = canvasWidth*(9/16);
    while(canvasHeight>windowHeight || canvasWidth>windowWidth) {
        canvasWidth = canvasWidth - 1;
        canvasHeight = canvasWidth*(9/16);
    }

    //create canvas and attach to sketch-holder
    var canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('sketch-holder');
    frameRate(60);

    //initialize grid
    var posX = 0;
    var posY = 0;
    card_width = canvasWidth/10;
    card_height = canvasHeight/4;
    for(var i=0; i<40; i++) {
        if(i%10 == 0) {
            posX = 0;
            if(i>0) {
                posY = posY+card_height;
            }
        }
        grid[i] = new Card(posX,posY,card_width,card_height,);
        posX = posX+card_width;
    }

    //pull json
    $.getJSON('cards.json', function(input) {
        var cors_modify = 'https://cors-anywhere.herokuapp.com/';
        posX = 0;
        posY = 0;
        for(var i=0; i<40; i++) {
            if(i%10 == 0) {
                posX = 0;
                if(i>0) {
                    posY = posY+card_height;
                }
            }
            cards[i] = new Card(posX,posY,card_width,card_height,cors_modify+input[i].Image);
            posX=posX+card_width;
        }
    });

    card_selected = 0;
    card_selected_index = -1;
}

function draw() {
    var posX = 0;
    var posY = 0;
    for(var i=0; i<grid.length; i++) {
        grid[i].drawObject();
    }
    for(var i=0; i<cards.length; i++) {
        if(i%10 == 0) {
            posX = 0;
            if(i>0) {
                posY = posY+card_height;
            }
        }
        cards[i].setXY(posX,posY);
        posX=posX+card_width;

        cards[i].drawObject();
    }
    if(card_selected != 0) {
        //if(card_selected.x >  )
        card_selected.drawObject();
    }
}

function mousePressed() {
    //if card is not selected, select card if cursor is over card
    var remain;
    if(card_selected == 0) {
        for(var i=0; i<cards.length; i++) {
            if(cards[i].isInside(mouseX,mouseY)) {
                //select card that mouse is over
                card_selected = cards[i];
                card_selected_index = i;
                card_selected.setXY(mouseX,mouseY);
                console.log("card" + (i+1) + " is selected");

                //split cards list, take out selected and merge lists
                //take i to end as own list
                remain = cards.splice(i,cards.length-i);
                //shift front of new list
                remain.shift();
                //merge lists
                cards = cards.concat(remain);

                window.addEventListener('selectstart',disableSelect);

                break;
            }
        }
    }
}

function mouseReleased() {
    //if a card is selected, release it
    var remain;
    if(card_selected != 0) {
        //release card and shift all cards below and right to the right
        for(var i=0; i<cards.length; i++) {
            if(cards[i].isInside(mouseX,mouseY)) {
                //take remaining cards inclusive
                remain = cards.splice(i,cards.length-i);
                //add selected card to front of remain list
                remain.unshift(card_selected);
                //merge lists
                cards = cards.concat(remain);

                //reinitialize card_selected variables
                card_selected = 0;
                card_selected_index = -1;
                break;
            }
        }
        if(card_selected != 0) {
            cards.push(card_selected);
            //reinitialize card_selected variables
            card_selected = 0;
            card_selected_index = -1;
        }
        window.removeEventListener('selectstart',disableSelect);
    }
}

function mouseDragged() {
    console.log("card selected is " + card_selected_index);
    //if card is selected and mouse is currently pressed
    if(card_selected != 0 && mouseIsPressed) {
        card_selected.setXY(mouseX,mouseY);
    }
}

function search() {
    var input_text;
    $.getJSON('cards.json', function(card_db) {

    });
}

function inputFocused() {
    inputFocus = true;
}

function inputUnfocused() {
    inputFocus = false;
}

function disableSelect(event) {
    event.preventDefault();
}