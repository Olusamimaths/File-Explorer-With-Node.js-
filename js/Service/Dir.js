const fs = require('fs'), {join, parse} = require('path');
const EventEmitter = require("events");

class DirService extends EventEmitter {
    constructor( dir = null){
        super();
        this.dir = dir || process.cwd(); // dir is passed in, null or the current working directory
    }

    setDir( dir = ""){
        let newDir = join(this.dir, dir);
        // Early exit
        if(DirService.getStats(newDir) === false) return;
        this.dir = newDir;
        this.notify();
    }

    getDirPath(){
        return this.dir;
    }

    getFilePath(fileName){
        let filePath = join(this.dir, fileName);
        return filePath;
    }


    notify(){
        this.emit("update")
    }

    static readDir( dir ){
        const fInfoArr = fs.readdirSync(dir, "utf-8").map((fileName) => {
            const filePath = join(dir, fileName), 
                stats = DirService.getStats( filePath );
            if (stats === false) return false; // if the stats cannot be obtained, the array entry is set to false
            return {
                fileName: fileName, 
                stats
            };
        });
        return fInfoArr.filter( item => item !== false); // remove all entry that are 'false' in the array;
        // in the end we have an array of objects containing filenames and file stats
    }

    getDirList(){
        // stats.isDirectory() - Returns true if the fs.Stats object describes a file system directory.
        const collection = DirService.readDir(this.dir).filter((fInfo) => fInfo.stats.isDirectory());
        if (!this.isRoot()){
            // if we are not in the system root, preprend the collection with ..
            collection.unshift({fileName: ".."});
        }
        return collection;
    }

    getFileList(){
        // stats.isFile() - Returns true if the fs.Stats object describes a regular file.
        return DirService.readDir(this.dir).filter((fInfo) => fInfo.stats.isFile());
    }

    isRoot(){
        const { root } = parse(this.dir);
        return (root === this.dir);
    }

    static getStats(filePath){
        // fs.statSync(path[, options]) - Returns: <fs.Stats> - info about the file
        try {
            return fs.statSync(filePath); // get info about the file
        } catch(e){
            return false;
        }
    }
};

exports.DirService = DirService;