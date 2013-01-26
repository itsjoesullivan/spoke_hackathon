/* spoke definition */
var spoke = function(message) {
    for(var id in spoke._apps) {
        var app = spoke._apps[id];
        if(app.verbs.indexOf(message.verb) > -1 /* && (app.nouns.indexOf('*') > -1 || app.nouns.indexOf(message.noun) > -1) */) { //too lazy to debug this one.
            //this is the one
            return app.obj[message.verb](message);
        }
    }
    throw 'couldn\'t find a fit!';
}
spoke._apps = {};
spoke.app = function(id) {
    return this._apps[id];
};
spoke.register = function(obj) {
    if(!(obj.id in this._apps)) {
        this._apps[obj.id] = {
            obj: window[obj.id],
            verbs: [],
            //yeah, this is dumb because it doesn't differentiate verb/noun combos. Oh well...
            nouns: []
        };
    }
    this._apps[obj.id].verbs.push(obj.verb);
    this._apps[obj.id].nouns.push(obj.noun);
};


