import { Meteor } from 'meteor/meteor';
import { Websites } from '../imports/api/websites.js';
import { UserProfileLinks } from '../imports/api/userProfileLink.js';
import '../imports/api/profiles.js';
import '../imports/api/websites.js';
import '../imports/api/userProfileLink.js';

Meteor.startup(() => {
    Websites.remove({});
    Websites.insert({name: "Email", type: "name"});
    Websites.insert({name: "Facebook", type: "link"});
    Websites.insert({name: "Instagram", type: "link"});
    Websites.insert({name: "Periscope", type: "link"});
    Websites.insert({name: "Snapchat", type: "name"});
    Websites.insert({name: "Soundcloud", type: "link"});
    Websites.insert({name: "Tumblr", type: "link"});
    Websites.insert({name: "Twitter", type: "link"});
    Websites.insert({name: "Website", type: "link"});
    Websites.insert({name: "VSCO", type: "link"});
    Websites.insert({name: "Vimeo", type: "link"});
    Websites.insert({name: "Vine", type: "link"});
    Websites.insert({name: "YouTube", type: "link"});
    UserProfileLinks.remove({});
    UserProfileLinks.insert({media: 'Reddit', url: 'https://www.reddit.com/user/test/', handle:'test'});
    UserProfileLinks.insert({media: 'Instagram', url: 'ok'});
    UserProfileLinks.insert({media: 'Vine', url: 'damn'});
    UserProfileLinks.insert({media: 'Snapchat', url: 'https://www.snapchat.com/add/test', handle:'test'});




});
