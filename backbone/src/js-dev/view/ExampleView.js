var ExampleView = Backbone.View.extend({
    className: 'example',
    template: tpl.question,

    events: {},

    initialize: function () {
        _.bindAll(this);
        this.model.on('sync reset', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});