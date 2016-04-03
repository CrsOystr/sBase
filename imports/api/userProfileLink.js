import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const UserProfileLinks = new Mongo.Collection('userprofiles');

if (Meteor.isServer){
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('userprofiles', function userProfilesPublication() {
      return UserProfileLinks.find();
    });
}

Meteor.methods({
    'userprofiles.insert'(text){
        check(text, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        UserProfileLinks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'userprofiles.remove'(profileId){
        check(profileId, String);

        const profile = Profiles.findOne(profileId);
        if (profile.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        UserProfileLinks.remove(profileId);
    },
});
