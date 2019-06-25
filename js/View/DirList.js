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
    // if a new collection is available, update the UI
    update( collection ) {
        this.el.innerHTML = '';
        collection.forEach((fInfo) => {
            this.el.insertAdjacentHTML("beforeend", 
            `<li class ="dir-list__li" data-file="${fInfo.fileName}" >
            <i class="icon">folder</i> ${fInfo.fileName}</li>`
            );
        });
        // subcribe the openDir handler for click events on newly created items
        this.bindUi();
    }
    
    bindUi(){
        const liArr = Array.from(this.el.querySelectorAll("li[data-file]"));
        // for Each element, add a click event that sets a new directory path
        liArr.forEach( (el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                this.dir.setDir(el.dataset.file)
            }, false);
        })
    }
}

exports.DirListView = DirListView;