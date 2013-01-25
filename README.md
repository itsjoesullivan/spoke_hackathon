#Spoke
Inter-app communication shim for Chrome apps.


##API

###spoke

    spoke(message)
    
Primary clearing house. Include payload and verb/object stuff and spoke ought to handle the rest.

Where __message__ is like:

```javascript
{
    verb: string,
    noun: string
    data: (any)
}
```

###spoke.register

    spoke.register(handler);
    
Where __handler__ is like:

```javascript
{
    verb: string,
    noun: string,
    id: string
}
```

##What a handler gives/gets
Function can be whatever you want, I guess. Well, actually that would be problematic.

Let's assume that the cross-app-messaging API looks like:

###Sending a message
```javascript
chrome.app(id).sendMessage(data, cb);
```

Where:
- __id__ is the app id
- __data__ is any type
- __cb__ is a function that receives "response" argument


###Listening for messages
```javascript
chrome.app.onMessage.addListener(listener)
```

Where __listener__ looks like:

```javascript
function(data,cb) {
    ...
}
```

Note that the listener doesn't receive the id of the sender. Does that make sense? Don't really know.

##Case study: IDE

Imagine three apps: 
- text editor (vim)
- source control (source)
- development server (serve)

Register __vim__ to handle "edit" requests
```javascript
chrome.app(spokeId).sendMessage({
    verb: 'edit',
    noun: 'text',
    id: vimId
},function(data,cb) {
    vim.open(data);
    vim.save = function(data) {
        cb(data);
    }
});
```

Register __source__ to handle "open" requests
```javascript
chrome.app(spokeId).sendMessage({
    verb: 'open',
    noun: '*',
    id: sourceId
}, function(data,cb) {
    var file = source.open(data);
    cb(file);
});
```

Register __source__ to handle "save" requests
```javascript
chrome.app(spokeId).sendMessage({
    verb: 'save',
    noun: '*',
    id: sourceId
}, function(data,cb) {
    source.save(data, cb);
});
```

Register __serve__ to handle "serve" requests
```javascript
chrome.app(spokeId).sendMessage({
    verb: 'serve',
    noun: '*',
    id: serveId
}, function(data,cb) {
    serve(data);
});

