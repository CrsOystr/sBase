import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Websites = new Mongo.Collection('websites');

if (Meteor.isServer){
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('websites', function websitesPublication() {
      return Websites.find();
    });
}
