(function ($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('jQuery Tests', {
        // This will run before each test in this module.
        setup: function () {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', function () {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.daraudio(), this.elems,
            'should be chainable'
        );
    });

    module('DOM Data Tests', {
        // This will run before each test in this module.
        setup: function () {
            this.elem1 = $($('#qunit-fixture').children()[0]);
        }
    });

    test('DOM data test', function () {
        expect(5);
        this.elem1.daraudio();

        strictEqual(typeof this.elem1.data('daraudio'), 'object',
            "Data is bound to object"
        );
        strictEqual(this.elem1.data('daraudio').playList, 0,
            "Can access object props"
        );
        strictEqual(this.elem1.data('daraudio').loadHtml(), this.elem1.data('daraudio'),
            "loadHtml chains"
        );
        strictEqual(this.elem1.data('daraudio').loadPlayLists(), this.elem1.data('daraudio'),
            "loadPlayLists chains"
        );
        strictEqual(this.elem1.data('daraudio').init(), this.elem1.data('daraudio'),
            "init chains"
        );


    });


}(jQuery));
