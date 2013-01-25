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
    handler: function
}
```

###What a handler gives/gets
Function can be whatever you want, I guess. Well, actually that would be problematic.

Let's assume that the cross-app-messaging API looks like:

```javascript
chrome.app(id).sendMessage(data, cb);
```

Where:
- __id__ is the app id
- __data__ is any type
- __cb__ is a function that receives "response" argument


```javascript
chrome.app.onMessage.addListener()
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
```
