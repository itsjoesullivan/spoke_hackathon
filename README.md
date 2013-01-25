#Spoke
Inter-app communication shim


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
function(request,sender) {
    ...
}
```