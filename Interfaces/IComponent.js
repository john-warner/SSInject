// Component interface
namespace('BGO').IComponent = function () {

    var name = 'IComponent';
    var contract = {
        GetControl: () => { return null; },
        InitComponent: () => { }
    };
    var interface = $I.Create(name, contract);

    return interface;
};
