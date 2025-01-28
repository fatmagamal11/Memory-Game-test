// var em = ["💐", "🌹", "🌻", "🏵️", "🌺", "🌴", "🌈", "🍓", "🍒", "🍎", "🍉", "🍊", "🥭", "🍍", "🍋", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🌶️", "🍄", "🧅", "🥦", "🥑", "🍔", "🍕", "🧁", "🎂", "🍬", "🍩", "🍫", "🎈"];
var em = [
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆",
  "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋",
  "🐌", "🐞", "🐜", "🦟", "🦗", "🐢", "🐍", "🦎", "🦂", "🦀",
  "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆"
];
// var em = [
//     "images/img-grd-gal-1.jpg",
//   "images/img-grd-gal-2.jpg",
//   "images/img-grd-gal-3.jpg",
//   "images/img-grd-gal-4.jpg",
//   "images/img-grd-gal-5.jpg",
//   "images/img-grd-gal-6.jpg",
//   "images/masonry-1.jpg",
//   "images/masonry-2.jpg",
//   "images/masonry-5.jpg",
//   "images/masonry-6.jpg",
//   "images/masonry-7.jpg",
//   "images/masonry-8.jpg",];


//Shuffling above array
var tmp, c, p = em.length;
if (p) while (--p) {
  c = Math.floor(Math.random() * (p + 1));
  tmp = em[c];
  em[c] = em[p];
  em[p] = tmp;
}

//Variables
var pre = "", pID, ppID = 0, turn = 0, t = "transform", flip = "rotateY(180deg)", flipBack = "rotateY(0deg)", time, mode;

//Resizing Screen
window.onresize = init;
function init() {
  W = innerWidth;
  H = innerHeight;
  $('body').height(H + "px");
  $('#ol').height(H + "px");
}

//Showing instructions
window.onload = function () {
  $("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div>
      <button onclick="start(2, 2)">2 x 2</button> 
      <button onclick="start(2, 3)" style="w">2 x 3</button>
      <button onclick="start(2, 4)">2 x 4</button>
      <button onclick="start(2, 5)">2 x 5</button>
      </center>`);
}

//Starting the game
function start(r, l) {
  //Timer and moves
  min = 0, sec = 0, moves = 0;
  $("#time").html("Time: 00:00");
  $("#moves").html("Moves: 0");
  time = setInterval(function () {
    sec++;
    if (sec == 60) {
      min++; sec = 0;
    }
    if (sec < 10)
      $("#time").html("Time: 0" + min + ":0" + sec);
    else
      $("#time").html("Time: 0" + min + ":" + sec);
  }, 1000);
  rem = r * l / 2, noItems = rem;
  mode = r + "x" + l;
  //Generating item array and shuffling it
  var items = [];
  for (var i = 0; i < noItems; i++)
    items.push(em[i]);
  for (var i = 0; i < noItems; i++)
    items.push(em[i]);
  var tmp, c, p = items.length;
  if (p) while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = items[c];
    items[c] = items[p];
    items[p] = tmp;
  }

  //Creating table
  $("table").html("");
  var n = 1;
  for (var i = 1; i <= r; i++) {
    $("table").append("<tr>");
    for (var j = 1; j <= l; j++) {
      $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n - 1]}</p></div></div></td>`);
      n++;
    }
    $("table").append("</tr>");
  }

  // Add initial flip animation
  setTimeout(() => {
    $(".inner").addClass("flipped"); // Flip all cards to show content

    // Flip cards back to hide content after 2 seconds
    setTimeout(() => {
      $(".inner").removeClass("flipped");
    }, 3000);
  }, 100);


  //Hiding instructions screen
  $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#" + x + " .inner";
  let f = "#" + x + " .inner .front";
  let b = "#" + x + " .inner .back";

  //Dont flip for these conditions
  if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) { }

  //Flip
  else {
    $(i).css(t, flip);
    if (turn == 1) {
      //This value will prevent spam clicking
      turn = 2;

      //If both flipped blocks are not same
      if (pre != $(b).text()) {
        setTimeout(function () {
          $(pID).css(t, flipBack);
          $(i).css(t, flipBack);
          ppID = 0;
        }, 1000);
      }

      //If blocks flipped are same
      else {
        rem--;
        $(i).attr("flip", "block");
        $(pID).attr("flip", "block");
      }

      setTimeout(function () {
        turn = 0;
        //Increase moves
        moves++;
        $("#moves").html("Moves: " + moves);
      }, 1150);

    }
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#" + x + " .inner";
      turn = 1;
    }

    //If all pairs are matched
    if (rem == 0) {
      clearInterval(time);
      if (min == 0) {
        time = `${sec} seconds`;
      }
      else {
        time = `${min} minute(s) and ${sec} second(s)`;
      }
      setTimeout(function () {
        $("#ol").html(`<center>

    <div class="confetti-container">
      <div class="confetti">
        <i style="--speed: 10; --bg: yellow" class="square"></i>
        <i style="--speed: 18; --bg: white" class="pentagram"></i>
        <i style="--speed: 29; --bg: green" class="rectangle"></i>
        <i style="--speed: 17; --bg: blue" class="hexagram"></i>
        <i style="--speed: 33; --bg: red" class="pentagram"></i>
        <i style="--speed: 26; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 24; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 5; --bg: blue" class="wavy-line"></i>
        <i style="--speed: 40; --bg: white" class="square"></i>
        <i style="--speed: 17; --bg: green" class="rectangle"></i>
        <i style="--speed: 25; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 15; --bg: yellow" class="wavy-line"> </i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 25; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 23; --bg: pink" class="wavy-line"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 37; --bg: pink" class="wavy-line"></i>
        <i style="--speed: 36; --bg: white" class="hexagram"></i>
        <i style="--speed: 32; --bg: green" class="wavy-line"></i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 29; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 23; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 30; --bg: pink" class="rectangle"></i>
        <i style="--speed: 30; --bg: red" class="square"></i>
        <i style="--speed: 18; --bg: red" class="pentagram"></i>
        <i style="--speed: 19; --bg: green" class="rectangle"></i>
        <i style="--speed: 16; --bg: blue" class="hexagram"></i>
        <i style="--speed: 23; --bg: red" class="pentagram"></i>
        <i style="--speed: 34; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 39; --bg: pink" class="wavy-line"></i>
        <i style="--speed: 40; --bg: purple" class="square"></i>
        <i style="--speed: 21; --bg: green" class="rectangle"></i>
        <i style="--speed: 14; --bg: white" class="square"></i>
        <i style="--speed: 38; --bg: green" class="rectangle"></i>
        <i style="--speed: 19; --bg: red" class="dodecagram"></i>
        <i style="--speed: 29; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 21; --bg: white" class="hexagram"></i>
        <i style="--speed: 17; --bg: purple" class="wavy-line"></i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 23; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 48; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 38; --bg: pink" class="rectangle"></i>
        <i style="--speed: 13; --bg: red" class="pentagram"></i>
        <i style="--speed: 49; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 19; --bg: cyan" class="wavy-line"></i>
        <i style="--speed: 15; --bg: steelblue" class="square"></i>
        <i style="--speed: 10; --bg: yellow" class="square"></i>
        <i style="--speed: 18; --bg: white" class="pentagram"></i>
        <i style="--speed: 29; --bg: green" class="rectangle"></i>
        <i style="--speed: 17; --bg: blue" class="hexagram"></i>
        <i style="--speed: 33; --bg: red" class="pentagram"></i>
        <i style="--speed: 26; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 24; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 5; --bg: white" class="wavy-line"></i>
        <i style="--speed: 40; --bg: purple" class="square"></i>
        <i style="--speed: 17; --bg: green" class="rectangle"></i>
        <i style="--speed: 25; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 15; --bg: cyan" class="wavy-line"> </i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 45; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 23; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 37; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 26; --bg: white" class="hexagram"></i>
        <i style="--speed: 32; --bg: cyan" class="wavy-line"></i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 45; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 23; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 50; --bg: pink" class="rectangle"></i>
        <i style="--speed: 30; --bg: red" class="square"></i>
        <i style="--speed: 18; --bg: red" class="pentagram"></i>
        <i style="--speed: 19; --bg: green" class="rectangle"></i>
        <i style="--speed: 16; --bg: blue" class="hexagram"></i>
        <i style="--speed: 23; --bg: red" class="pentagram"></i>
        <i style="--speed: 33; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 39; --bg: white" class="wavy-line"></i>
        <i style="--speed: 40; --bg: orange" class="square"></i>
        <i style="--speed: 21; --bg: green" class="rectangle"></i>
        <i style="--speed: 14; --bg: white" class="square"></i>
        <i style="--speed: 38; --bg: green" class="rectangle"></i>
        <i style="--speed: 19; --bg: red" class="dodecagram"></i>
        <i style="--speed: 29; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 34; --bg: white" class="hexagram"></i>
        <i style="--speed: 17; --bg: indigo" class="wavy-line"></i>
        <i style="--speed: 32; --bg: yellow" class="pentagram"></i>
        <i style="--speed: 23; --bg: white" class="square"></i>
        <i style="--speed: 18; --bg: green" class="rectangle"></i>
        <i style="--speed: 37; --bg: red" class="dodecagram"></i>
        <i style="--speed: 48; --bg: pink" class="wavy-line"> </i>
        <i style="--speed: 38; --bg: pink" class="rectangle"></i>
        <i style="--speed: 13; --bg: red" class="pentagram"></i>
        <i style="--speed: 49; --bg: yellow" class="dodecagram"></i>
        <i style="--speed: 19; --bg: purple" class="wavy-line"></i>
        <i style="--speed: 15; --bg: cyan" class="square"></i>
      </div>
    </div>
  
                <div id="iol" class="win-animation>
                <h2>Congrats!</h2>
                <p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p>
                <p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p>
                  <button  onclick="start(2 , 2)">2 x 2</button> 
                <button onclick="start(2, 3)" style="w">2 x 3</button>
                <button onclick="start(2, 4)">2 x 4</button>
                <button onclick="start(2, 5)">2 x 5</button>
                </div>
                </center>`);
        $("#ol").fadeIn(750);
      }, 1500);
    }
  }
}