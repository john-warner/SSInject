test('Test assertions are working', function (assert) {
    var result = [];
    var expected = [];
    assert.deepEqual(result, expected);
}); // use deepEqual for arrays see: https://api.qunitjs.com/deepEqual/

test('Test register arrow function', function (assert) {
    var result = [];
    $$Inject.register('TestRegisterArrow', () => { return 'success'; });
    result = $$Inject.get('TestRegisterArrow');
    var expected = 'success';
    assert.deepEqual(result, expected);
});

test('Test register function', function (assert) {
    var result = [];
    $$Inject.register('TestRegisterFunction', function ()  { return { success: 'success' }; });
    result = $$Inject.get('TestRegisterFunction').success;
    var expected = 'success';
    assert.deepEqual(result, expected);
});

test('Test register object', function (assert) {
    var result = [];
    $$Inject.register('TestRegisterObject', { success: 'success' });
    result = $$Inject.get('TestRegisterObject').success;
    var expected = 'success';
    assert.deepEqual(result, expected);
});

test('Test injection', function (assert) {
    $$Inject.register('InjectedResult', { success: 'success' });
    $$Inject.register('InjectedFunction', (_InjectedResult) =>  { return _InjectedResult; });
    var result = $$Inject.get('InjectedFunction');
    var expected = { success: 'success' };
    assert.deepEqual(result, expected);
});

// test('Test registerInterface', function (assert) {
//     var result = [];
//     $$Inject.registerInterface('TestRegisterArrow', () => { return 'success'; });
//     result = $$Inject.get('TestRegisterArrow');
//     var expected = 'success';
//     assert.deepEqual(result, expected);
// });

test('Test get multiple', function (assert) {
    $$Inject.register('InjectedAM', () =>  { return { a: 'A'}; });
    $$Inject.register('InjectedBM', () =>  { return { b: 'B'}; });
    var result = $$Inject.get(['InjectedAM', 'InjectedBM']);
    var expected = [{ a: 'A' }, { b: 'B' }];
    assert.deepEqual(result, expected);
});

test('Test get multiple combined', function (assert) {
    $$Inject.register('InjectedAC', () =>  { return { a: 'A'}; });
    $$Inject.register('InjectedBC', () =>  { return { b: 'B'}; });
    var result = $$Inject.get(['InjectedAC', 'InjectedBC'], null, true);
    var expected = { a: 'A', b: 'B' };
    assert.deepEqual(result, expected);
});

test('Test get parameter', function (assert) {
    $$Inject.register('InjectedParameter', (p) =>  { return p; });
    var result = $$Inject.get('InjectedParameter', 'Hello');
    var expected = 'Hello';
    assert.deepEqual(result, expected);
});

test('Test get multiple parameters', function (assert) {
    $$Inject.register('InjectedParameters', (a,b) =>  { return a+b; });
    var result = $$Inject.get('InjectedParameters', [1,2]);
    var expected = 3;
    assert.deepEqual(result, expected);
});

test('Test decorate', function (assert) {
    $$Inject.register('InjectedDecorated', () => { return { Handle: (a) => a }});
    $$Inject.decorate('InjectedDecorated', (decorated, p) =>  { return decorated.Handle(p); });
    var result = $$Inject.get('InjectedDecorated', 'Message');
    var expected = 'Message';
    assert.deepEqual(result, expected);
});

// test('Test resolveDecorated', function (assert) {
//     $$Inject.register('InjectedResolve', () => { return { Handle: (a) => a }});
//     $$Inject.decorate('InjectedResolve', (decorated) =>  { return decorated.Handle(); });
//     var result = $$Inject.resolveDecorated('InjectedResolve');
//     var expected = null;
//     assert.deepEqual(result, expected);
// });
