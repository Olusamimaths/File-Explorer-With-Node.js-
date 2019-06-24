const { DirListView } = require('./js/View/DirList');
const { DirService } = require('./js/Service/Dir');

const dirService = new DirService;

new DirListView(document.querySelector("[data-bind=dirList"), dirService);

dirService.notify();
