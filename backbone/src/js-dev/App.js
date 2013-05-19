var App = Backbone.View.extend({
    id: 'app',
    template: tpl.app,

    initialize: function(){
        _.bindAll(this);
    },

    render: function(){
        this.$el.append(this.template());
        return this;
    }
});