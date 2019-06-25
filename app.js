const { DirListView } = require('./js/View/DirList');
const { DirService } = require('./js/Service/Dir');
const { FileListView } = require('./js/View/FileList');
const { TitleBarPathView } = require('./js/View/TitleBarPathView');

const dirService = new DirService;

new DirListView(document.querySelector("[data-bind=dirList"), dirService);
new FileListView( document.querySelector("[data-bind=fileList]"), dirService);
dirService.notify();

new TitleBarPathView( document.querySelector("[data-bind=path]"), dirService);
