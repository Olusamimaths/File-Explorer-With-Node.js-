class ContextMenuView {
    constructor(fileService){
        this.file = fileService;
        this.attach();
    }

    getItems(fileName) {
        const file = this.file,
              isCopied = Boolean(file.copiedFile);
        return [
            {
                label: "Show Item in the folder",
                enabled: Boolean(fileName),
                click: () => file.showInFolder(fileName)
            },
            {
                type: "separator"
            },
            {
                label: "Copy",
                enabled: Boolean(fileName),
                click: () => file.copy(fileName)
            },
            {
                type: "separator"
            },
            {
                label: "Paste",
                enabled: Boolean(fileName),
                click: () => file.paste()
            },
            {
                type: "separator"
            },
            {
                label: "Delete",
                enabled: Boolean(fileName),
                click: () => file.remove(fileName)
            }
        ];
    }

    render(fileName){
        const menu = new nw.Menu();
        this.getItems(fileName).forEach((item) => menu.append(new nw.MenuItem(item)));
        return menu;
    }

    attach(){
        document.addEventListener("contextmenu", (e) => {
            const el = e.target;
            if(!(el instanceof HTMLElement)){
                return;
            }
            if(el.classList.contains("file-list")){
                e.preventDefault();
                this.render()
                .popup(e.x, e.y);
            }
            if(el.parentNode.dataset.file){
                e.preventDefault();
                this.render(el.parentNode.dataset.file)
                    .popup(e.x, e.y);
            }
        })
    }
}

exports.ContextMenuView = ContextMenuView;