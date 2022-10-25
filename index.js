class Player{
    constructor() {
        this.position = {
            x: 200, 
            y: 200
        }
        this.velocity = {
            x : 0
        }
        const img = document.querySelector("img"); 
        img.src = "./img/Spaceship.jpg";
    update() 
            Player()
            this.position.x += this.velocity.x
        }
    }


addEventListener('keydown', function ({ key }) {
        switch (key) {
            case 'a':
                console.log('left')
                Player.velocity = -5
                break;
                case 'd':
                console.log('right')
                break;
                case ' ':
                console.log('space')
                break;
        }
    })