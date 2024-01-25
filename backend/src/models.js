const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//allows mongoose to accept empty strings
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

/*User*/
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model('User', UserSchema);

/*Item*/
const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachments: {
        type: Array,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    boardId: {
        type: String,
        required: true
    }
});
const Item = mongoose.model('Item', ItemSchema);

/*Board*/
const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true
    },
    columns: {
        type: [Object],
        required: true
    }
});
const Board = mongoose.model('Board', BoardSchema);

module.exports = { User, Item, Board };