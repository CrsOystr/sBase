import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer){
    Meteor.publish('userNames', function () {
        return Meteor.users.find({}, {username : 1});
    });
}
