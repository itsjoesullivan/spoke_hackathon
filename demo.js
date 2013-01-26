//init project w data
window.project = source({
    files: { 
        src: { 
            'hello.txt': 'hello, world!' 
        } 
    } 
});

/* register source as the filesystem */

spoke.register({
    verb: 'save',
    noun: '*',
    id: 'project'
});

spoke.register({
    verb: 'open',
    noun: '*',
    id: 'project'
});



//test of source throughput
/*var text = spoke({
    verb:'open',
    noun:'src/hello.txt'
});*/

//not implemented.. yet
/*spoke.register({
    verb: "edit",
    noun: "*",
    id: "vim"
});*/