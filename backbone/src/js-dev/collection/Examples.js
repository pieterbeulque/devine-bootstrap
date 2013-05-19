/* globals Example */

var Examples = Backbone.Collection.extend({
    model: Example,
    url: Settings.api + 'examples/'
});