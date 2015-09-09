var Phauxy = require('../index');

// Used in a majority of the examples. You can also just create an instance of a generic model with Phauxy.Model
module.exports = Phauxy.Model.Extend(function TextModel(text) {
    this.text = text;

    Phauxy.Freezer.freeze(this);
});