// Query interface
namespace('BGO').IQuery = function () {

    var name = 'IQuery';
    var contract = {};
    $$.extend(contract, {
        Handle: (query) => { }
    });

    var interface = $I.Create(name, contract);

    return interface;
};
