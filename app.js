function getRandomValue(min, max) {
    const attackValue = Math.floor(Math.random() * (max-min)) + min;
    return attackValue;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCounter: 0
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
        }
    }
})

app.mount('#game')