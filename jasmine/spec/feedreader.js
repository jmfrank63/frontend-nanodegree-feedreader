/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check for each entry in allFeeds
         * if there is a url defined and
         * the content of the url is not empty
         */
        it('url defined', function() {
            $(allFeeds).each( function() {
                expect(this.url).toBeDefined();
                expect(this.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name defined and not empty', function() {
            $(allFeeds).each( function() {
                expect(this.name).toBeDefined();
                expect(this.name.length).not.toBe(0);
            });
        });

    });


    /* This test suite tests the functionality and
     * behavior of the menu.
     */
    describe('The menu', function(){

        /* Test if the menu is hidden by default.
         * Since the hiding is done with the menu-hidden
         * class active we simply test for this class
         */
        it('Hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again?
          */
        var menuIcon = $('.menu-icon-link');
        var spyMenuIconClick = spyOnEvent(menuIcon, 'click');

        it('Menu shows on click', function() {
            // click is sychrounous
            menuIcon.click();
            // now the event should have happend on the right entity
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyMenuIconClick).toHaveBeenTriggered();
            // the menu-hidden class should now be gone
            // from the body element
            expect($('body')).not.toHaveClass('menu-hidden');
        });

        it('menu hides on click', function() {
            // Make sure menu is active
            $('body').removeClass('menu-hidden');
            // click :-)
            menuIcon.click();
            // check if event happend and if it was on the right entity
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyMenuIconClick).toHaveBeenTriggered();
            // now the menu-hidden class should be there again
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    // Suite to check the loading and changing of an entry
    describe('Initial Entries', function() {
        //
         beforeEach(function(done) {
            loadFeed(0, done);
         });

        // Check if the feed class has actually an article
         it('Check for entry to exist in feed container', function(done) {
             expect($('.feed').find('article')).toHaveClass('entry');
             done();
         });

    });
    /* Test the feeds for loading and changing of content
     * Test of asyncrounous function calls
     */
    describe('New Feed Selection', function() {
        /* The beforeEach function is called before each it
         * function call
         * It takes a function named done as a parameter which
         * when called signals that the async function did return
         * The test can then rely on the values returned by
         * the async function
         */
        var oldContent;

        beforeAll(function(done) {
            /* we setup our initial state
             */
            loadFeed(0, done);
        });

        beforeEach(function(done) {
            /* Save the old content
             * and load a new feed
             */
            // only here we are sure to save
            oldContent = $('.feed').html();
            loadFeed(1, done);
        });

        it('Content does change', function(done) {
            /* content should change if we load another feed
             */
            // We can now rely on the first feed is loaded
            newContent = $('.feed').html();
            // Check if something else is in the DOM
            expect(newContent).not.toEqual(oldContent);
            done();
        });

        it('Content does not change again', function(done) {
            /* Content should not change if we load the same
             * feed again (chances are rare we hit a change in
             * in the feed between two successive calls)
             * We thus make sure we are not failing for some
             * other reason when checking on not equal
             */
            newContent = $('.feed').html();
            expect(newContent).toEqual(oldContent);
            done();
        });
    });
}());
