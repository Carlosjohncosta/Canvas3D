window.onload = function () {
    const canvas3D = new Canvas3D.Scene(window.innerWidth, window.innerHeight);
    const cube = new Models.Cube([0, 0, 10], 5);
    canvas3D.models.push(cube);
    const keysPressed: string[] = [];

    setInterval(() => {
        canvas3D.clear();
        canvas3D.renderAll();
        keyHandler();
    }, 0);
    document.addEventListener("keydown", (e) => {
        if (keysPressed.indexOf(e.key) === -1) keysPressed.push(e.key);
    });
    document.addEventListener("keyup", (e) => {
        if (keysPressed.indexOf(e.key) !== -1) keysPressed.splice(keysPressed.indexOf(e.key), 1);
    });

    function keyHandler(): void {
        const ammount = 0.5;
        keysPressed.forEach((key) => {
            canvas3D.models.forEach((model) => {
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
