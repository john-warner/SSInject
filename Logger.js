namespace('BGO').ILogger = function () {

    var name = 'ILogger';
    var SEVERITY_LEVELS = { None: 0, Info: 1, Warning: 2, Error: 3, Critical: 4 };
    var contract = {
        severity: SEVERITY_LEVELS,
        loglevel: (severity) => { },
        log: (message) => { },
        error: (message) => { },
        info: (message) => { },
        warning: (message) => { }
    };
    var interface = $I.Create(name, contract);

    return interface;
};

namespace('BGO').ConsoleLogger = function () {

    var logger = BGO.ILogger();
    var loglevel = 3;

    function Log(message) {
        console.log(message);
    }

    function LogError(message) {
        if (loglevel <= logger.severity.Error)
            Log(message);
    }

    function LogInfo(message) {
        if (loglevel <= logger.severity.Info)
            Log(message);
    }

    function LogWarning(message) {
        if (loglevel <= logger.severity.Warning)
            Log(message);
    }

    function SetLogLevel(severity) {
        loglevel = severity;
    }

    return $$.extend(
        logger,
        {
        loglevel: SetLogLevel,
        log: Log,
        error: LogError,
        info: LogInfo,
        warning: LogWarning
    });
};
