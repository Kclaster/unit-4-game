
let characters = [[1,45],[2, 80], [3, 1100], [4, 150]];
let hero = [];
let nemesis = [];
let enemiesArr = [['R2-D2', 45], ['Trooper', 80], ['Vader', 110], ['Chewbacca', 150]];
let deadCount = 0;
let count = 0;
let enemyCount = 0;
let damage = 0;
let enemyDamage = 0;
let enHealth = 0;
let myHealth = 0;
let test = 0;
let herotest = 0;
var e = 0;


const chooseHero = (props) => {
    if (count < 1) {
        characters.forEach(function(cur) {
            if (cur[0] != props) {
                var enemies = document.querySelectorAll(`.a${cur[0]}`);
                enemies.forEach(function(i) {
                    i.classList.toggle("disapear");
            });
            } else {

                myHealth = cur[1]
                hero.push(props);
                herotest = document.querySelector(`.health${cur[0]}`);
                herotest.innerHTML = myHealth;                
                console.log(hero[0]);

            };
        }); 
        count++
    };
    return(props);
};



const chooseEnemy = (props) => {
    enemyCount = 0;
    if (enemyCount < 1) {
    enemiesArr.forEach(function(cur) {
        if (cur[0] == props) {
            enHealth = cur[1];
            test = document.querySelector(`.enemyhealth-${cur[0]}`);
            test.innerHTML = enHealth;
            assignName();
            var enemies = document.querySelectorAll(`.${cur[0]}`);
            enemies.forEach(function(i) {
                i.classList.toggle("disapear");
            });
        }  else {
            assignName();
        }
    });
    if (props != undefined) {
    nemesis.push(props);
    }
    enemyCount++
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
    if (hero[0] === "1") {
        let strike = normAttack(50,75);
        damage += strike;
        enHealth -= strike;
        test.innerHTML = enHealth;
        console.log(enHealth);
        nextEnemy();
        return strike;
    } else if (hero[0] === "2") {
        let strike = trooperAttack();
        damage += strike;
        enHealth -= strike;
        test.innerHTML = enHealth;
        console.log(enHealth);
        nextEnemy();
        return strike;
    } else if (hero[0] === "3") {
        let strike = normAttack(35, 120);
        damage += strike;
        enHealth -= strike;
        test.innerHTML = enHealth;
        console.log(enHealth);
        nextEnemy();
        return strike;
    } else {
        let strike = normAttack(1,150);
        damage += strike;
        enHealth -= strike;
        test.innerHTML = enHealth;
        console.log(enHealth);
        nextEnemy();
        return strike;
    }
   });

function nextEnemy() {
    if (enHealth <= 0) {
        let deadGuy = document.getElementById(`active-${nemesis[e]}`);
        e++;
        deadGuy.classList.add("disapear");
        enHealth = 0;
        damage = 0;
        console.log(nemesis);
        victory();
        chooseEnemy();

    }
}


// Enemy Attacks
   document.querySelector(".hit").addEventListener("mousedown",function(){
    if (nemesis[0] === "1") {
        let strike = normAttack(50,75);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
    } else if (nemesis[0] === "2") {
        let strike = trooperAttack();
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
    } else if (nemesis[0] === "3") {
        let strike = normAttack(35,120);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
    } else {
        let strike = normAttack(1,150);
        enemyDamage += strike;
        myHealth -= strike;
        herotest.innerHTML = myHealth;
        gameOver();
    }
   });

function gameOver() {
    if (myHealth <= 0) {
        document.getElementById(hero[0]).classList.toggle('disapear');
        var h1 = document.createElement("h1");
        h1.innerHTML = 'Game Over';
        h1.classList.add('red');
        document.querySelector('.lineup').appendChild(h1);

        var reset = document.createElement("button");
        reset.innerHTML="reset";
        document.querySelector('.reset').appendChild(reset);
        reset.classList.add('refresh');
        document.querySelector('.refresh').addEventListener("mousedown", function (){
            window.location.reload();
        });
        

    }
};



const victory = () => {
    deadCount++;
    if (deadCount === 3) {
        document.getElementById(hero[0]).classList.toggle('disapear');
        var h1 = document.createElement("h1");
        h1.innerHTML = 'Victory';
        h1.classList.add('green');
        document.querySelector('.lineup').appendChild(h1);

        var reset = document.createElement("button");
        reset.innerHTML="reset";
        document.querySelector('.reset').appendChild(reset);
        reset.classList.add('refresh');
        document.querySelector('.refresh').addEventListener("mousedown", function (){
            window.location.reload();
        });
    }
};








// if you click on two characters it breaks
// something is broken with trooper attack when trooper is enemy

