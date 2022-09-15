window.onload = function () {
    const canvas3D = new Canvas3D.Scene(window.innerWidth, window.innerHeight);
    const cube = new Models.Cube(new Canvas3D.Point(0, 0, 20), 5);
    canvas3D.drawModel(cube);

    document.addEventListener("keypress", () => console.log("Working!"));
};
