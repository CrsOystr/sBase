import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer){
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('profiles', function profilesPublication() {
      return Profiles.find();
    });
}



Meteor.methods({
    'profiles.insert'(text){
        check(text, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Profiles.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'profiles.remove'(profileId){
        check(profileId, String);

        const profile = Profiles.findOne(profileId);
        if (profile.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Profiles.remove(profileId);
    },
});
