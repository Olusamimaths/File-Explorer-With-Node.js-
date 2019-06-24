/*
This module renders the list of directories in the current path.
If the user selects a directory from the list, it changes the current path.
The list is then updated to match the content of the new location.
*/

class DirListView {
    constructor(boundingEl, dirService){
        this.el = boundingEl;
        this.dir = dirService;
        // subscribe to DirService updates
        dirService.on("update", () => this.update(dirService.getDirList()));
    }
    // if a dir is opened, set the current dir to that
    onOpenDir(url){
        //e.preventDefault();
        this.dir.setDir(url);
    }
    update( collection ) {
        this.el.innerHTML = '';
        collection.forEach((fInfo) => {
            this.el.insertAdjacentHTML("beforeend", 
            `<li class ="dir-list__li" data-file=${fInfo.fileName}>
            <i class="icon">folder</i> ${fInfo.fileName}</li>`
            );
        });
        // subcribe the openDir handler for click events on newly created items
        this.bindUi();
    }
    
    bindUi(){
        const liArr = Array.from(this.el.querySelectorAll("li[data-file]"))
        const files = liArr.map(el => el.dataset.file);
        // the problem is here
        liArr.forEach( (el, i) => {
            // eventListener is working
            el.addEventListener("click", () => this.onOpenDir(files[i]), false);
        })
    }
}

exports.DirListView = DirListView;