
let characters = [[1,450],[2, 800], [3, 1100], [4, 1500]];
let hero = [];
let nemesis = [];
let enemiesArr = [['R2-D2', 450], ['Trooper', 800], ['Vader', 1100], ['Chewbacca', 1500]];
let deadCount = 0;
let count = 0;
let enemyCount = 0;
let damage = 0;
let initialHealth = 0;
let enemyDamage = 0;
let enHealth = 0;
let myHealth = 0;
let test = 0;
let herotest = 0;
let e = 0;
let ticker = 0;
let resetCount = 0;

let myHealthBar = document.getElementsByClassName("progress-bar")[0];
let theirHealthBar = document.getElementsByClassName("progress-bar")[1];

let percentageHealth = function(lifeLeft, lifeStart) {
    healthPercentage = (lifeLeft/lifeStart) * 300;
    return healthPercentage; 
}




function iChooseYou(props) {
var chosenMonster = document.querySelector(`.a${props}`);
chosenMonster.classList.toggle("selected");
var hideMe = chosenMonster.querySelectorAll("h3");
hideMe.forEach(function(cur) {
    cur.classList.toggle("hide");
var chosenImage = chosenMonster.querySelector("img");
chosenImage.classList.add("resize");
});
};



function iChooseThee(props) {
    var chosenMonster = document.querySelector(`.active-${props}`);
    chosenMonster.classList.toggle("enemySelected");
    var hideMe = chosenMonster.querySelectorAll("h3");
    hideMe.forEach(function(cur) {
        cur.classList.toggle("hide");
    var chosenImage = chosenMonster.querySelector("img");
    chosenImage.classList.add("resize");
    });
    };



const chooseHero = (props) => {
    document.getElementById("chosen").innerHTML = "Enemies Available to Attack";
    if (count < 1) {
        characters.forEach(function(cur) {
            if (cur[0] != props) {
                var enemies = document.querySelectorAll(`.a${cur[0]}`);
                enemies.forEach(function(i) {
                    i.classList.toggle("disapear");
                    //add code that removes the background to the chosen monster, and changes the text to '', and realigns monster to bottom, and resizes.
            });
            } else {
                iChooseYou(props);
                myHealth = cur[1];
                heroHealth = cur[1];
                hero.push(props);
                herotest = document.querySelector(`.health${cur[0]}`);
                herotest.innerHTML = myHealth;                

            };
        }); 
        count++
    };
    return(props);
};



const chooseEnemy = (props) => {
    if (enemyCount < 1) {
    enemiesArr.forEach(function(cur) {
        if (cur[0] == props) {
            iChooseThee(props);
            enHealth = cur[1];
            initialHealth = cur[1];
            test = document.querySelector(`.enemyhealth-${cur[0]}`);
            test.innerHTML = enHealth;
            assignName();
            var enemies = document.querySelectorAll(`.active-${cur[0]}`);
            enemies.forEach(function(i) {
                i.classList.toggle("disapear");
            var bullpin = document.querySelectorAll(`.${cur[0]}`);
            bullpin.forEach(function(i) {
                i.classList.toggle("disapear");
            myHealthBar.style.width = `${percentageHealth(enHealth, initialHealth)}px`
            });
        });
        }  else {
            assignName();
        }
    });
    if (props != undefined) {
    nemesis.push(props);
    }
    enemyCount++
    ticker = 1;
};
};

const assignName = () => {
    var nemesisArr = document.querySelectorAll(`.nemesis`);
    nemesisArr.forEach(function(cur) { 
        cur.parentElement.classList.toggle(`disapear`);
        cur.innerHTML = `${nemesis[0]} `;

});
};


//Normal attack type, random number within a range.
const normAttack = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


//Trooper attack type, because they suck at hitting their target.
const trooperAttack = () => {
    let windAffect = Math.floor(Math.random()*10);
    let wateryEyes = Math.floor(Math.random()*10);
    let willingnessToKill = Math.floor(Math.random()*10);
    if (windAffect + wateryEyes + willingnessToKill >= 22) {
        return 100;
    } else {
        return 10;
    }
};

// You Attack
document.querySelector(".hit").addEventListener("mousedown",function rainbow(){
    if (resetCount === 0) {
        if (hero[0] === "1") {
            let strike = normAttack(50,75);
            damage += strike;
            enHealth -= strike;
            test.innerHTML = enHealth;
            nextEnemy();
            myHealthBar.style.width = `${percentageHealth(enHealth, initialHealth)}px`
            return strike;
        } else if (hero[0] === "2") {
            let strike = trooperAttack();
            damage += strike;
            enHealth -= strike;
            test.innerHTML = enHealth;
            nextEnemy();
            myHealthBar.style.width = `${percentageHealth(enHealth, initialHealth)}px`
            return strike;
        } else if (hero[0] === "3") {
            let strike = normAttack(35, 120);
            damage += strike;
            enHealth -= strike;
            test.innerHTML = enHealth;
            nextEnemy();
            myHealthBar.style.width = `${percentageHealth(enHealth, initialHealth)}px`
            return strike;
        } else {
            let strike = normAttack(1,150);
            damage += strike;
            enHealth -= strike;
            test.innerHTML = enHealth;
            nextEnemy();
            myHealthBar.style.width = `${percentageHealth(enHealth, initialHealth)}px`
            return strike;
    }
}
   });

function nextEnemy() {
    if (ticker === 1) {
    if (enHealth <= 0) {
        let deadGuy = document.getElementById(`active-${nemesis[e]}`);
        e++;
        deadGuy.classList.add("disapear");
        enHealth = 0;
        damage = 0;
        victory();
        enemyCount = 0;
        ticker++
    }
    }
}


// Enemy Attacks
   document.querySelector(".hit").addEventListener("mousedown",function(){
       if (ticker === 1) {
    if (nemesis[0] === "R2-D2") {
        let strike = normAttack(50,75);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
        theirHealthBar.style.width = `${percentageHealth(myHealth, heroHealth)}px`
    } else if (nemesis[0] === "Trooper") {
        let strike = trooperAttack();
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
        theirHealthBar.style.width = `${percentageHealth(myHealth, heroHealth)}px`
    } else if (nemesis[0] === "Vader") {
        let strike = normAttack(35,120);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
        theirHealthBar.style.width = `${percentageHealth(myHealth, heroHealth)}px`

    } else {
        let strike = normAttack(1,150);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
        theirHealthBar.style.width = `${percentageHealth(myHealth, heroHealth)}px`

    }

};

   });

function gameOver() {
console.log(myHealth);
console.log(resetCount);
    if (myHealth <= 0) {
        if (resetCount === 0) {
        console.log(resetCount);
        heroHealth = 300;
        myHealth = 0;
        theirHealthBar.style.width = `${percentageHealth(myHealth, heroHealth)}px`
        document.getElementById(hero[0]).classList.toggle('disapear');
        var h1 = document.querySelector("h1");
        h1.innerHTML = 'Game Over';
        h1.classList.add('red');
        document.querySelector('.lineup').appendChild(h1);
        resetCount++;
        var reset = document.createElement("button");
        reset.innerHTML="Try Again";
        reset.classList.add("hit");
        document.querySelector('.reset').appendChild(reset);
        reset.classList.add('refresh');
        document.querySelector('.refresh').addEventListener("mousedown", function (){
            window.location.reload();
        });
    };
        };
        

    };



const victory = () => {
    deadCount++;
    if (deadCount === 3) {
        document.getElementById(hero[0]).classList.toggle('disapear');
        var h1 = document.querySelector("h1");
        h1.innerHTML = 'Victory';
        h1.classList.add('green');
        document.querySelector('.lineup').appendChild(h1);

        var reset = document.createElement("button");
        reset.innerHTML="reset";
        document.querySelector('.reset').appendChild(reset);
        reset.classList.add('refresh', 'hit');
        document.querySelector('.refresh').addEventListener("mousedown", function (){
            window.location.reload();
        });
    }
};


//Add sound