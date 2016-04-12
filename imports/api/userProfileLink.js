import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export let UserProfileLinks = new Mongo.Collection('userprofiles');

UserProfileLinkSchema = new SimpleSchema({
    media: {
        type: String,
        optional: false,
        label: "Media",
        max: 25
    },
    url: {
        type: String,
        label: "URL",
        max: 100
    },
    handle: {
        type: String,
        label: "Handle",
        max: 40
    },
    username: {
        type: String,
        label: "UseName"
    }
});


if (Meteor.isServer){
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('userprofiles', function userProfilesPublication() {
      return UserProfileLinks.find();
    });
}

Meteor.methods({
    'userprofiles.insert'(media_in, url_in, handle_in){
        check(media_in, String);
        check(url_in, String);
        check(handle_in, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        console.log("working userprofile insert");
        UserProfileLinks.insert({
            media: media_in,
            url: url_in,
            handle: handle_in,
            username: Meteor.user().username,
          });
    },
    'userprofiles.remove'(profileId){
        check(profileId, String);

        const profile = UserProfileLinks.findOne(profileId);
        if (profile.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        UserProfileLinks.remove(profileId);
    },
});
