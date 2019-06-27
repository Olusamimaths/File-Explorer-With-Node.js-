class TitleBarPathView {
    constructor( boundingEl, dirService){
        this.el = boundingEl;
        dirService.on("update", () => this.render(dirService.getDirPath()));
    }

    render( dir ) {
        this.el.innerHTML = dir;
    }
}

exports.TitleBarPathView = TitleBarPathView;