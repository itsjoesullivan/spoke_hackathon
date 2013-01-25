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

Function can be 

