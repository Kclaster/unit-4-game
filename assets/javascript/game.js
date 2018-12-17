
let characters = [1, 2, 3, 4];
let hero = [];
let enemiesArr = ['R2', 'Vader', 'Trooper', 'Chewbacca']
let count = 0;
let enemyCount = 0;
let damage = 0;
let enemydamage = 0;


const chooseHero = (props) => {
    if (count < 1) {
        characters.forEach(function(cur) {
            if (cur != props) {
                var enemies = document.querySelectorAll(`.a${cur}`);
                enemies.forEach(function(i) {
                    i.classList.toggle("disapear");
            });
            } else {
                hero.push(props);
            };
        }); 
        count++
    };
    return(props);
};


const chooseEnemy = (props) => {
    if (enemyCount < 1) {
    enemiesArr.forEach(function(cur) {
        if (cur == props) {
            var enemies = document.querySelectorAll(`.a${cur}`);
            enemies.forEach(function(i) {
                i.classList.toggle("disapear");
            });
        } 
    });
    enemyCount++
};
};

const r2Attack = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const vaderAttack = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const chewyAttack = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


document.querySelector(".hit").addEventListener("mousedown",function(){
    if (hero[0] === "1") {
        console.log(r2Attack(50,75));
    } else if (hero[0] === "2") {
        console.log(trooperAttack())
    } else if (hero[0] === "3") {
        console.log(vaderAttack(35,120))
    } else {
        console.log(chewyAttack(1, 100))
    }
   });

const Attack = () => {

};





