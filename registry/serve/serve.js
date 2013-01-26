
var socketInfo;
//env
var env = {
    port: 8080,
    address: "127.0.0.1"
};

var onAccept = function(acceptInfo) {
    console.log("ACCEPT", acceptInfo)
    //  Read in the data
    socket.read(acceptInfo.socketId, function(readInfo) {
        console.log("READ", readInfo);
        // Parse the request.
        var data = arrayBufferToString(readInfo.data);
        //console.log("the data is: ",readInfo.data);
            if(data.indexOf("GET ") == 0) {
                // we can only deal with GET requests
                var uriEnd =  data.indexOf(" ", 4);
                if(uriEnd < 0) { /* throw a wobbler */ return; }
                var uri = data.substring(4, uriEnd);
                
                /*
                    This is where the actual file
                    retrieval occurs.
                */
                var fileResponse = spoke({
                    verb:'open',
                    noun:uri.substring(1)
                });
                if(!fileResponse) {
                    //throw "spoke didn't return a file";
                    serve.write(acceptInfo.socketId,{
                        data: "Ok, this is an error page",
                        type: ".txt"
                    });
                }
                var file = {
                    data: fileResponse,
                    type: uri.substring(uri.lastIndexOf('.'))  //should probably be passed as the file name, but whatever.
                }
                serve.write(acceptInfo.socketId,file);
        }
        else {
            // Throw an error
            throw "wtf";
            socket.destroy(acceptInfo.socketId); 
        }
    }); 
};

//serve obj
var serve = function() {};
serve.stop = function() {
    socket.destroy(socketInfo.socketId);
}

serve.write = function(socketId,file) {
    var fileBuffer = str2buf(file.data);
    var typeMap = {
        '.js': 'application/javascript',
        '.txt.': 'text/plain'
    };
    var fileType = "text/plain"
    if(!file.type in typeMap) {
        throw "We can't serve this type (...yet)";
    }
    var header = stringToUint8Array("HTTP:/1.0 200 OK\nContent-length: " + file.data.length + "\nContent-type:" + typeMap[file.type] + '\n\n');
    var outputBuffer = new ArrayBuffer(header.byteLength + fileBuffer.byteLength);
    var view = new Uint8Array(outputBuffer);
    view.set(header,0);
    view.set(new Uint8Array(fileBuffer), header.byteLength);
    socket.write(socketId, outputBuffer, function(writeInfo) {
        console.log("WRITE", writeInfo);
    	socket.destroy(socketId); 
		socket.accept(socketInfo.socketId, onAccept);
    });
};
serve.err = function(errCode,message) {
    throw 'err';
}

var stringToUint8Array = function(string) {
    var buffer = new ArrayBuffer(string.length);
    var view = new Uint8Array(buffer);
    for(var i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }
    return view;
  };

var arrayBufferToString = function(buffer) {
    var str = '';
    var uArrayVal = new Uint8Array(buffer);
    for(var s = 0; s < uArrayVal.length; s++) {
      str += String.fromCharCode(uArrayVal[s]);
    }
    return str;
  };

var str2buf = function (str) {
    var buf = new ArrayBuffer(str.length+1); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

var logToScreen = function(log) {
    logger.textContent += log + "\n";
  }
  
  
  

var initSocket = function() {
    window.socket = {
        write: function() {
        
        },
        read: function() {
        
        }
    }
    if(!(window.chrome && chrome.experimental)) {
        return
        
    }
    
    socket = chrome.experimental.socket || chrome.socket;
    socket.create("tcp", {}, function(_socketInfo) {
      socketInfo = _socketInfo;
      socket.listen(socketInfo.socketId, env.address, env.port, 20, function(result) {
        console.log("LISTENING:", result);
        socket.accept(socketInfo.socketId, onAccept);
      });
    });

}





onload = function() {

//initialize!
  initSocket();

  

  

  






  



  
};
