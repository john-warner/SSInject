

/*jshint esversion: 9 */


$$Inject = function () {

    var version = '0.5.3';
    var container = {};

    function GetContainerItem(type, value, parameters) {
        return { type: type, value: value, parameters: parameters, decorated: null };
    }

    function RegisterType(type, name, value, parameters) {
        if (CheckName(name)) {
            container[name] = GetContainerItem(type, value, parameters);
        }
    }

    function RegisterDependency(name, value, parameters) {

        if (value && typeof value === 'function') {
            RegisterType("Function", name, value, parameters);
        }
        else {
            RegisterType("Object", name, value);
        }
    }

    function RegisterDecorator(name, value, parameters) {
        if (container.hasOwnProperty(name)) {
            var decorated = container[name];
            RegisterDependency(name, value, parameters); // replaced decorated
            container[name].decorated = decorated;
        }
        else {
            throw 'Decorated dependency "' + name + '" does not exist.';
        }
    }

    function ResolveDecorated(decorated, parameters) {
        return GetTypeResult(decorated, parameters);
    }

    function Get(name, parameters, combine = false) {
        var result;

        if (Array.isArray(name)) { // return object with dependencies by name
            if (combine) {
                result = {};
                name.forEach(function (n, i) {
                    if (parameters)
                        Object.assign(result, GetDependency(n, parameters[i]));
                    else
                        Object.assign(result, GetDependency(n));
                });
            }
            else {
                result = [];
                name.forEach(function (n, i) {
                    if (parameters)
                        result.push(GetDependency(n, parameters[i])); // use with spread operator. eg. ...$inject.get(['a','b','c'])
                    else
                        result.push(GetDependency(n)); // use with spread operator. eg. ...$inject.get(['a','b','c'])
                });
            }
        }
        else { // return dependency
            result = GetDependency(name, parameters);
        }

        return result;
    }

    function ResolveFunction(f, ...parameters) {
        let item = GetContainerItem('Function', f);
        if (parameters.length > 0)
            return GetFunction(item, parameters);
        else
            return GetFunction(item);
    }

    function GetDependency(name, parameters) {
        if (container.hasOwnProperty(name)) {
            var result = GetTypeResult(container[name], parameters);

            return result;
        }
        else {
            throw 'Dependency for "' + name + '" not defined."';
        }
    }

    function GetTypeResult(dependency, parameters) {
        switch (dependency.type) {
            case 'Function': return GetFunction(dependency, parameters);
            case 'Object': return GetObject(dependency);
        }
    }

    // inject parameters that have name starting with underscore
    function GetFunction(dependency, parameters) {
        const PASSEDDECORATED = 'decorated';
        var injectAllParameters = true;
        var functionParameterNames;
        var decoratedInjection = dependency.decorated;

        if (parameters)
            injectAllParameters = false;

        parameters = parameters || dependency.parameters;
        functionParameterNames = getFunctionParameters(dependency.value);

        if (decoratedInjection)
            decoratedInjection = ResolveDecorated(decoratedInjection);

        if (!parameters) {
            parameters = functionParameterNames;
            if (parameters.length == 0)
                parameters = false;
        }

        if (parameters) {
            if (Array.isArray(parameters)) {
                var injected = [];

                if (dependency.decorated) {
                    var pos = parameters.indexOf(PASSEDDECORATED);
                    if (pos >= 0)
                        parameters[pos] = decoratedInjection;
                    else
                        injected.push(decoratedInjection); // decorated is the first parameter
                }

                insertParameters(functionParameterNames, parameters, injectAllParameters, injected);

                return (isConstructor(dependency.value)) ? new dependency.value(...injected) : dependency.value(...injected);
            }
            else {
                if (dependency.decorated)
                    return (isConstructor(dependency.value)) ? new dependency.value(decoratedInjection, parameters) : dependency.value(decoratedInjection, parameters);
                else
                    return (isConstructor(dependency.value)) ? new dependency.value(parameters) : dependency.value(parameters);
            }
        }

        if (dependency.decorated)
            return (isConstructor(dependency.value)) ? new dependency.value(decoratedInjection) : dependency.value(decoratedInjection);
        else
            return (isConstructor(dependency.value)) ? new dependency.value() : dependency.value();
    }

    function insertParameters(functionParameterNames, parameters, injectAllParameters, injected) {
        var parmIndex = 0;

        functionParameterNames.forEach(function (fp) {
            var inject = injectAllParameters;

            if (typeof fp === 'string' && fp[0] == '_') {
                fp = fp.substr(1);
                inject = true;
            }

            if (inject && typeof fp === 'string')
                injected.push(GetDependency(fp));
            else { // add passed parameter
                if (parmIndex < parameters.length) {
                    injected.push(parameters[parmIndex++]);
                }
            }

        });

        return injected;
    }

    function GetObject(dependency) {
        return dependency.value;
    }

    function CheckName(name) {
        if (typeof name !== 'string')
            throw 'Name of dependency is not a string';
        else
            return true;
    }


     // Get the keys of the parameters of a function.
     //
     // @param {function} method  Function to get parameter keys for
     // @return {array}
     //
    function getFunctionParameters(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /(?:^|,)\s*([^\s,=]+)/g;

        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var argsList = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
        var result = argsList.match(ARGUMENT_NAMES);

        if (result === null) {
            return [];
        }
        else {
            var stripped = [];
            for (var i = 0; i < result.length; i++) {
                stripped.push(result[i].replace(/[\s,]/g, ''));
            }
            return stripped;
        }
    }

    function isConstructor(value) {
        try {
          new new Proxy(value, {construct() { return {}; }});
          return true;
        } catch (err) {
          return false;
        }
    }

    function WaitUntilRegistered(name) {
        if (container.hasOwnProperty(name) && container[name] instanceof Promise) {
            return container[p];
        }

        let wait = new Promise(resolve => {
            if (container.hasOwnProperty(name)) {
                resolve();
            }
            else {
                Object.defineProperty(container, name, {
                    get: () => wait,
                    set: (v) => { Object.defineProperty(container,name, { value: v }); resolve(); },
                    configurable: true
                });
            }
        });

        return wait;

    }

    function RegisterObjectKeys(obj, filter) {
        if (typeof filter === 'function') {
            Object.keys(obj).forEach(key => {
                let name = filter(key);
                if (name)
                    RegisterDependency(name, obj[key]);
            });
        }
        else {
            Object.keys(obj).forEach(key => RegisterDependency(key, obj[key]));
        }
    }

    return {
        version: version,
        register: RegisterDependency,
        decorate: RegisterDecorator,
        get: Get,
        whenRegistered: WaitUntilRegistered,
        add: RegisterObjectKeys,
        resolve: ResolveFunction
    };
}();