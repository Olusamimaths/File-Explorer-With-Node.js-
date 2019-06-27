const fs = require('fs'),
     path = require('path');

const cp = (source, destination, done ) => {
    const basename = path.basename(source);
    const to = path.join(destination, basename);
    const write = fs.createWriteStream( to );
    fs.createReadStream(source)
        .pipe(write);
        write.on("finish", done);
};

class FileService {
    constructor(dirService){
        this.dir = dirService;
        this.copiedFile = null;
    }
    remove(file){
        // unlinkSync deletes a name and probably the file it refers to
        fs.unlinkSync(this.dir.getFilePath(file));
        this.dir.notify();
    }
    paste(){
        const file = this.copiedFile;
        //lsstatSync get the file status
        if(fs.lstatSync(file).isFile()) {
            cp(file, this.dir.getDirPath(), () => this.dir.notify());
        }
    }

    copy(file){
        this.copiedFile = this.dir.getFilePath(file);
    }

    open(file){
        nw.Shell.openItem(this.dir.getFilePath(file));
    }

    showInFolder(file) {
        nw.Shell.showItemInFolder(this.dir.getFilePath(file));
    }
};

exports.FileService = FileService