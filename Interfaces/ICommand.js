// Command interface
namespace('BGO').ICommand = function () {

    var name = 'ICommand';
    var contract = {};
    $$.extend(contract, {
        Handle: async (command) => { }
    });

    var interface = $I.Create(name, contract);
 
    return interface;
};
