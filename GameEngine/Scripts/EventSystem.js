export class EventSystem
{
    keyPressed = {
        up: new Event("upPressed"),
        down: new Event("downPressed"),
        left: new Event("leftPressed"),
        right: new Event("rightPressed")
    };
    keyReleased = {
        up: new Event("upReleased"),
        down: new Event("downReleased"),
        left: new Event("leftReleased"),
        right: new Event("rightReleased")
    };
}