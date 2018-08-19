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

        /*
         * Test: allFeeds object feed url validation.
         */

        // assert...
        it(' fees should have a URL defined and not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /*
         * Test: allFeeds object feed name validation.
         */

        // assert...
        it('fees should have name define and not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', () => {

        // arrange...
        const body = $('body');

        // act...
        const menuIcon = $('.menu-icon-link');

        /*
         * Test: menu element hidden by default validation.
         */

        // assert...
        it('should be hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /*
          * Test: menu visibility when there is a click.
          */

        it('should be visible when clicked and hidden when clicked again', () => {
            // act... trigger a click
            menuIcon.click();

            // assert...
            expect(body.hasClass('menu-hidden')).toBe(false);

            // act... trigger a click again
            menuIcon.click();

            // assert...
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', () => {

        // arrange...
        let entries;

        // act...
        beforeEach((done) =>{
            loadFeed(0, () => {
                entries =  $('.feed .entry').length;
                done();
            });
        });

        /*
         * Test: feed load at least one entry
         */

        // assert...
        it('should load at least one entry', () => {
            expect(entries).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', () => {

        // arrange...
        const feed = $('.feed');
        let firstFeed;

        // act...
        beforeEach((done) =>{
            loadFeed(0, () => {
                firstFeed = feed.html();
                loadFeed(1, () => {
                    done();
            });
        });
     });

        /*
         * Test: new feed load and entries change
         *
         */

        // assert...
        it('should load a new feed and content should change', () => {
            expect(feed.html()).not.toEqual(firstFeed);
        });
    });
}());
