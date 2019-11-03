// Component interface
namespace('BGO').IDialog = function () {

    var name = 'IDialog';
    var contract = {};

    $$.extend(contract,
        $inject.get("IComponent"),
        {
            Submit: () => { }
        });
    var interface = $I.Create(name, contract);

    return interface;
};
