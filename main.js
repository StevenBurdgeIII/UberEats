var bear;
var feed = []; // an empty array
var numFood = 10;

function setup() {
    createCanvas(640, 480);
    
    bear = new Bear();

    // initializing 10 pieces of food
    for (var i = 0; i < numFood; i++) {
        feed.push(new Food(random(width), random(height)));
    }
}


function draw() {
    background('#FFFAED');

    bear.display();
    
    // display all the food
    for(var i = 0; i < feed.length; i++) {
        feed[i].display();
    }
}

function Food(x, y) {
    // keyword this
    // makes variables public on the object

    // public instance variables
    this.x = x;
    this.y = y;
    this.color = color(255, 0, 0);
    this.foodSize = 50;

    this.display = function () {
        fill(this.color);
        ellipse(this.x, this.y, this.foodSize, this.foodSize);
    }
}

function Bear() {

    var x = mouseX;
    var y = mouseY;
    var diameter = 200;

    this.getDistance = function (other) {
        var dist = Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
        return dist;
    };

    this.eat = function () {
        for (var i = 0; i < feed.length; i++) {
            var food = feed[i];
            var d = this.getDistance(food);
            var r1 = food.foodSize / 2;
            var r2 = diameter / 2;
            if (r1 + r2 > d) {
                feed.splice(i, 1);
            }
        }
    };

    this.display = function () {
        x = mouseX;
        y = mouseY;

        // face
        noStroke();
        fill('#993300');
        ellipse(x, y, 200, 200);

        // nose 
        fill('#000000');
        ellipse(x, y + 30, 24, 24);

        // eyeLeft;
        fill('#FFFFFF');
        ellipse(x + 42, y - 26, 44, 44);

        // pupilLeft;
        fill('#000000');
        ellipse(x + 42, y - 26, 10, 10);

        // eyeRight;
        fill('#FFFFFF');
        ellipse(x - 42, y - 26, 44, 44);

        // pupilRight;
        fill('#000000');
        ellipse(x - 42, y - 26, 10, 10);

        //earLeft;
        fill('#993300');
        push();
        translate(x - 100, y - 80);
        rotate(Math.PI / 4);
        ellipse(0, 0, 55, 55);
        pop();

        // earRight;
        fill('#993300');
        push();
        translate(x + 100, y - 80);
        rotate(-Math.PI / 4);
        ellipse(0, 0, 55, 55);
        pop();

        //tongue
        fill('#ff66cc');
        arc(x - 20, y + 80, 20, 40, 0, PI + QUARTER_PI, CHORD);
    }
}
