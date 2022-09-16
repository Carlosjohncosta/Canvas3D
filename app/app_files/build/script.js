import * as Canvas3D from "./Canvas3D.js";
import * as Models from "./Models.js";
window.onload = function () {
    var canvas3D = new Canvas3D.Scene(window.innerWidth, window.innerHeight);
    var cube = new Models.Cube([0, 0, 10], 5);
    canvas3D.models.push(cube);
    var keysPressed = [];
    setInterval(function () {
        canvas3D.clear();
        canvas3D.renderAll();
        keyHandler();
    }, 0);
    document.addEventListener("keydown", function (e) {
        if (keysPressed.indexOf(e.key) === -1)
            keysPressed.push(e.key);
    });
    document.addEventListener("keyup", function (e) {
        if (keysPressed.indexOf(e.key) !== -1)
            keysPressed.splice(keysPressed.indexOf(e.key), 1);
    });
    function keyHandler() {
        var ammount = 0.5;
        keysPressed.forEach(function (key) {
            canvas3D.models.forEach(function (model) {
                switch (key) {
                    case "ArrowUp":
                        model.moveCenter([0, ammount, 0]);
                        break;
                    case "ArrowDown":
                        model.moveCenter([0, -ammount, 0]);
                        break;
                    case "ArrowLeft":
                        model.moveCenter([-ammount, 0, 0]);
                        break;
                    case "ArrowRight":
                        model.moveCenter([ammount, 0, 0]);
                        break;
                    case "w":
                        model.moveCenter([0, 0, ammount]);
                        break;
                    case "s":
                        model.moveCenter([0, 0, -ammount]);
                        break;
                }
            });
        });
    }
};
