const 
    { DirListView } = require('./js/View/DirList'),
    { DirService } = require('./js/Service/Dir'),
    { FileListView } = require('./js/View/FileList'),
    { TitleBarPathView } = require('./js/View/TitleBarPathView'),
    { FileService } = require('./js/Service/File'),
    { ContextMenuView } = require('./js/View/ContextMenu');

const dirService = new DirService;
const fileService = new FileService(dirService);


new DirListView(document.querySelector("[data-bind=dirList"), dirService);
new FileListView( document.querySelector("[data-bind=fileList]"), dirService);
new ContextMenuView(fileService);
dirService.notify();

new TitleBarPathView( document.querySelector("[data-bind=path]"), dirService);
