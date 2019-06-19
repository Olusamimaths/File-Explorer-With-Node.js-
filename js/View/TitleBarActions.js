class TitleBarActionsView {
    constructor( boundingEl ){ // constructor takes a HTML element as arg ( a view bounding box)
        this.closeE1 = boundingEl.querySelector("[data-bind=close]"); // find the first element with data-bind=close property
        this.bindUi(); //
    }

    bindUi(){
        this.closeE1.addEventListener("click", this.onClose.bind(this), false);
    }

    onClose( e ) {
        e.preventDefault();
        // get the current window and close it
        nw.Window.get().close();
    }

}

exports.TitleBarActionsView = TitleBarActionsView;