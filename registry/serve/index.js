
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
        console.log("the data is: ",readInfo.data);
            if(data.indexOf("GET ") == 0) {
                // we can only deal with GET requests
                var uriEnd =  data.indexOf(" ", 4);
                if(uriEnd < 0) { /* throw a wobbler */ return; }
                var uri = data.substring(4, uriEnd);
                console.log('uri is: ' + uri);
                var file = {
                    type: 'text/plain',
                    data: "hello, world :)"
                };
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


/*var writeErrorResponse = function(socketId, errorCode) {
    var file = { size: 0 };
    console.info("writeErrorResponse:: begin... ");
    console.info("writeErrorResponse:: file = " + file);
    var contentType = "text/plain";  //(file.type === "") ? "text/plain" : file.type;
    var contentLength = file.size;
    var header = stringToUint8Array("HTTP/1.0 " +errorCode+ " Not Found\nContent-length: " + file.size + "\nContent-type:" + contentType + "\n\n");
    console.info("writeErrorResponse:: Done setting header...");
    var outputBuffer = new ArrayBuffer(header.byteLength + file.size);
    var view = new Uint8Array(outputBuffer)
    view.set(header, 0);
    console.info("writeErrorResponse:: Done setting view...");
    socket.write(socketId, outputBuffer, function(writeInfo) {
      console.log("WRITE", writeInfo);
      socket.destroy(socketId);
      socket.accept(socketInfo.socketId, onAccept);
    });
    console.info("writeErrorResponse::filereader:: end onload...");

    console.info("writeErrorResponse:: end...");
  };*/
    

var space = {
    'text.txt': "hello from space"
};



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
    
    /*socket.getNetworkList(function(interfaces) {
    for(var i in interfaces) {
        console.log(interfaces[i]);
      //var interface = interfaces[i];
      //var opt = document.createElement("option");
      //opt.value = interface.address;
      //opt.innerText = interface.name + " - " + interface.address;
      //hosts.appendChild(opt);
    }
  });*/
}





onload = function() {

//initialize!
  initSocket();

  

  

  






  /*var write200Response = function(socketId, file) {
      
    var contentType = (file.type === "") ? "text/plain" : file.type;
    var contentLength = file.size;
    var header = stringToUint8Array("HTTP/1.0 200 OK\nContent-length: " + file.size + "\nContent-type:" + contentType + "\n\n");
    var outputBuffer = new ArrayBuffer(header.byteLength + file.size);
    var view = new Uint8Array(outputBuffer)
    view.set(header, 0);
    view.set(new Uint8Array(str2buffer(file)))
    socket.write(socketId,outputBUffer, function(writeInfO) {
        console.log("WRITE", writeInfo);
        socket.destroy(socketId); 
        socket.accept(socketInfo.socketId, onAccept);
    });*/
    
    /*var fileReader = new FileReader();
    fileReader.onload = function(e) {
	    var buffer2 = str2buf('asdf');

	    var buffer = e.target.result;
	    window.buff = e.target.result;
       view.set(new Uint8Array(buffer), header.byteLength); 
       console.log(outputBuffer);
       socket.write(socketId, outputBuffer, function(writeInfo) {
         
      });
    };

    fileReader.readAsArrayBuffer(file);*/
  //};

  

  /*directory.onchange = function(e) {
    if(socketInfo) socket.destroy(socketInfo.socketId);

    var files = e.target.files;

    for(var i = 0; i < files.length; i++) {
      //remove the first first directory
      var path = files[i].webkitRelativePath;
      filesMap[path.substr(path.indexOf("/"))] = files[i];
    }

    start.disabled = false;
    stop.disabled = true;
    directory.disabled = true;
  };*/
  
  



  
};
