var SSInjectExample = function() {

    document.addEventListener("DOMContentLoaded", Init)
    function Init() {
        console.log('Starting $$Inject example');
        RegisterExamples();
        ValidateRegistrations();
    }

    function RegisterExamples() {
        $$Inject.register('MessageOfTheDayStore', { message: 'Hello. Have a good day.' });
        $$Inject.register('MessageOfTheDay', (MessageOfTheDayStore) => MessageOfTheDayStore.message );
        $$Inject.register('domLookup', () => (q) => document.querySelector(q));
        $$Inject.register('log', (message) => console.log(message));
    }

    function ValidateRegistrations() {
        var lookup = $$Inject.get("domLookup");
        var message = $$Inject.get("MessageOfTheDay");
        var divMessageOfTheDay = lookup("#MOD");
        divMessageOfTheDay.textContent = message;

        $$Inject.get("log", message);
    }

}();