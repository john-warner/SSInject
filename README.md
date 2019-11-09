# SSInject
Javascript dependency injector.

To use the SSInject library, include SSInject.js or SSInject.min.js file:

 ```javascript
   <script src="SSInject.min.js"></script>
```
This will create the $$Inject object that exposes the following API :

The following methods are available:

* register - register a value for injection
* decorate - register a decorator for a dependency
* get - get dependency


### $$Inject.register

Register a value. The value can be anything. if it is not a function, then it is treated as a singleton.

#### API call

 ```javascript
$$Inject.register(name:string, value:any, parameters:any);
```

**Returns**
Nothing

#### Registering a function

Registered functions have their dependencies resolved when retrieved using the $$Inject.get method. SSInject determines the dependencies based on the name of the parameter. If the registered function requires parameters that are not injected, then the injected parameters should start with an underscore, "_".


### $$Inject.decorate

Register a function that will execute the registered dependency. The decorator is passed the decorated result along with the parameters.

#### API call

 ```javascript
$$Inject.decorate(name:string, value:function (decorated, parameters), parameters:any);
```

**Returns**
Nothing


### $$Inject.get

Register a value. The value can be anything. if it is not a function, then it is treated as a singleton.

#### API call

 ```javascript
var result = $$Inject.get(name:string or string array, optional parameters:any, optional combine:boolean=false);
```

**Returns**
result of injected value. Functions are called with resolved dependencies and parameters. If you need to pass more than one parameter to a function, then put them in array.

Multiple names can be passed in an array to get multiple results. The results will be placed in an array or put into an object if combine is set to true




