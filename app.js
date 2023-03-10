function getRandomValue(min, max) {
    const attackValue = Math.floor(Math.random() * (max-min)) + min;
    return attackValue;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCounter: 0,
            playerWin: false,
            monsterWin: false,
            logMessages: [],
        }
    },

    computed: {
        playerBarStyles() {
            if(this.playerHealth < 1) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'};
        },

        monsterBarStyles() {
            if(this.monsterHealth < 1) {
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'};
        },

        mayUseSpecialAttack() {
            return this.specialAttackCounter < 3;
        },

        finishGame() {
            if(this.playerWin) {
                return 'You Win!'
            } else if(this.monsterWin) {
                return 'You Lose!'
            }
        },

        disableButtonsAfterFinish() {
            if(this.playerWin || this.monsterWin) {
                return true
            } 
        },
        
    },

    watch: {
        playerHealth(value) {
            if(value < 1){
                this.monsterWin = true;
            }
        },

        monsterHealth(value) {
            if(value < 1) {
                this.playerWin = true;
            }
            
        }
    },

    methods: {
        attackMonster() {
            this.specialAttackCounter++
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'attack', attackValue)
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue)
        },

        specialAttack() {
            this.specialAttackCounter = 0;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'special-attack', attackValue)
            this.attackPlayer();
        },

        healPlayer() {
            this.specialAttackCounter++;
            const healValue = getRandomValue(8, 25);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player', 'heal himself', healValue)
            this.attackPlayer();
            
        },

        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackCounter = 0;
            this.playerWin = false;
            this.monsterWin = false;
            this.logMessages = [];
        },

        surrend() {
            this.monsterWin = true;
        },

        addLogMessages(who, action, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: action,
                actionValue: value,
            })
        }

    }
})

app.mount('#game')