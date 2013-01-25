#Spoke
Inter-app communication shim


##API

###spoke

    spoke(obj)
    
Primary clearing house. Include payload and verb/object stuff and spoke ought to handle the rest.

###spoke.register

    spoke.register(handler);
    
How to register a handler