namespace('BGO').IWebAPI = function (ILogger, _Root) {

    var name = 'IWebAPI';
    var contract = {
        url: "",
        save: Post,
        get: Get
    };

    async function Post(data) {
        //var apiurl = $('body').data('url') + 'api/' + contract.url;
        var apiurl = _Root.url + 'api/' + contract.url;

        return $$.post(apiurl, data);

        // return new Promise(function (resolve, reject) {
        //     ILogger.info('Api post to ' + apiurl + ': ' + JSON.stringify(data));

        //     $.ajax({
        //         url: apiurl,
        //         type: "POST",
        //         contentType: "application/json; charset=utf-8",
        //         data: JSON.stringify(data),
        //         dataType: "json"
        //     })
        //     .done(function (result) {
        //         resolve(result);
        //     })
        //     .fail(function (xhr) {
        //         $inject.get('ILogger').error(xhr.responseText);
        //         reject(xhr);
        //     });
        // });
    }

    async function Get(id) {
        //var apiurl = $('body').data('url') + 'api/' + contract.url;
        var apiurl = _Root.url + 'api/' + contract.url;

        return $$.get(apiurl);

        // return new Promise(function (resolve, reject) {
        //     ILogger.info('Api get to ' + apiurl + '/' + id);

        //     $.ajax({
        //         url: apiurl + '/' + id,
        //         type: "GET",
        //         contentType: "application/json; charset=utf-8",
        //         //data: data,
        //         dataType: "json"
        //     })
        //         .done(function (result) {
        //             resolve(result);
        //         })
        //         .fail(function (xhr) {
        //             $inject.get('ILogger').error(xhr.responseText);
        //             reject(xhr);
        //         });
        // });
    }

    return contract;
};
