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
        }
    },

    computed: {
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        },

        monsterBarStyles() {
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
                this.playerHealth = 0;
                this.monsterWin = true;
            }
        },

        monsterHealth(value) {
            if(value < 1) {
                this.monsterHealth = 0;
                this.playerWin = true;
            }
            
        }
    },

    methods: {
        attackMonster() {
            this.specialAttackCounter++
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },

        specialAttack() {
            this.specialAttackCounter = 0;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
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
            this.attackPlayer();
            
        }
    }
})

app.mount('#game')