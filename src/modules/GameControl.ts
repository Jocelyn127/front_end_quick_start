import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    direction: string = '';
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    keydownHandler(event: KeyboardEvent) {

        this.direction = event.key;
    }

    run() {
        // 获取snake现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        this.checkEat(X, Y);


        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message);
            this.isLive = false;
        }


        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 检查蛇是否吃到食物
    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }


    }
}

export default GameControl;