namespace('BGO').Interface = function () {

    function AddInterface(name, interface, existing, explicit) {
        if (explicit) {
            var protocol = {};
            protocol[name] = interface;
            interface = protocol;
        }
        return (existing) ? $$.extend(existing, interface) : interface;
    }

    function CreateInterface(name, contract) {

        for (var key in contract) {
            if ($$.isFunction(contract[key]))
                contract[key] = () => { debugger; throw 'Interface method ' + key + ' has not been implemented.'; };
        }

        return contract;
    }
    // ApplyInterface
    // obj: object to apply overrides and/or interface descriptors
    // override: array with key writeable key names, null for none or empty array for all
    // interface: array of interfaces. apply settings to interface object keys
    function ApplyScope(obj, overrides, interfaces) {

        for (var key in obj) {
            Object.defineProperty(obj, key, {
                writable: IsWriteable(key, overrides, interfaces)
            });
        }

        return obj;
    }

    function IsWriteable(key, overrides, interfaces) {
        if (overrides && (overrides.length == 0 || overrides.indexOf(key) > -1)) {
            return true;
        }
        else if (interfaces && interfaces.length > 0) {
            for (var i = 0; i < interfaces.length; i++) {
                var interface = interfaces[i];
                if (interface.hasOwnProperty(key)) {
                    var descriptor = Object.getOwnPropertyDescriptor(interface, key);
                    return descriptor.writable;
                }
            }
        }

        return false;
    }

    function Implement(interface, implementation) {
        if (typeof interface == 'string')
            return $$.extend($inject.get(interface), implementation);
        else if ($$.isPlainObject(interface))
            return $$.extend(interface, implementation);
    }

    return {
        Add: AddInterface,
        Create: CreateInterface,
        Scope: ApplyScope,
        Employ: Implement
    };
}();

$I = BGO.Interface; // define short name