// This plugin reads an rss feed that is pulled from the @WarframeAlerts twitter feed every 5 minutes, to keep them better in sync the rss feed is parsed every 1 minute, and duplicates are ignored.
module.exports = {
    loading: function () {
        console.debug('Warframe Alerts for Firebot is loading!')
    },

    message: function (message) {

    },

    ready: function () {
        startAlerts()

        function startAlerts() {
            console.log('Warframe Alerts has started tracking');
            var rssParser = require('rss-parser');
            var warframeAlertsRss = 'http://fetchrss.com/rss/59b14a2b8a93f8462e8b4567470697209.xml';
            client.lastAlerts = ["", "", "", ""];
            setInterval(function checkAlerts() {
                rssParser.parseURL(warframeAlertsRss, function (err, parsed) {
                    var newAlertsNum = 0
                    if (client.config.BotSettings.Debug == true) { console.log(parsed) }
                    var currentAlerts = [parsed.feed.entries[0].title, parsed.feed.entries[1].title, parsed.feed.entries[2].title, parsed.feed.entries[3].title];
                    console.log(currentAlerts)
                    if (client.config.BotSettings.Debug == true) { console.log(currentAlerts) }
                    function newAlerts(value, array) {
                        return array.indexOf(value) > -1
                    };
                    console.log(newAlerts(currentAlerts[0], client.lastAlerts))// Just to see the true/false for debugging, you can ignore this...
                    if (newAlerts(currentAlerts[0], client.lastAlerts) == false) {
                        newAlertsNum = 1                        
                    };
                    console.log(newAlerts(currentAlerts[1], client.lastAlerts))
                    if (newAlerts(currentAlerts[1], client.lastAlerts) == false) {
                        newAlertsNum = 2                        
                    };
                    console.log(newAlerts(currentAlerts[2], client.lastAlerts))
                    if (newAlerts(currentAlerts[2], client.lastAlerts) == false) {
                        newAlertsNum = 3
                    };
                    console.log(newAlerts(currentAlerts[3], client.lastAlerts))
                    if (newAlerts(currentAlerts[3], client.lastAlerts) == false) {
                        newAlertsNum = 4
                    };
                    console.log(newAlertsNum)
                    if (newAlertsNum == 4) {
                        client.channels.find("name", "warframe_alerts").send({
                            "embed": {
                                "color": 2187907,
                                "timestamp": "2017-09-15T06:25:08.764Z",
                                "thumbnail": {
                                    "url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "author": {
                                    "name": "Warframe Alerts for Firebot",
                                    "icon_url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "fields": [
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[0]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[1]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[2]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[3]
                                    }
                                ]
                            }
                        })
                    };
                    if (newAlertsNum == 3) {
                        client.channels.find("name", "warframe_alerts").send({
                            "embed": {
                                "color": 2187907,
                                "timestamp": "2017-09-15T06:25:08.764Z",
                                "thumbnail": {
                                    "url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "author": {
                                    "name": "Warframe Alerts for Firebot",
                                    "icon_url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "fields": [
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[0]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[1]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[2]
                                    }
                                ]
                            }
                        })
                    };
                    if (newAlertsNum == 2) {
                        client.channels.find("name", "warframe_alerts").send({
                            "embed": {
                                "color": 2187907,
                                "timestamp": "2017-09-15T06:25:08.764Z",
                                "thumbnail": {
                                    "url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "author": {
                                    "name": "Warframe Alerts for Firebot",
                                    "icon_url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "fields": [
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[0]
                                    },
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[1]
                                    }
                                ]
                            }
                        })
                    };
                    if (newAlertsNum == 1) {
                        client.channels.find("name", "warframe_alerts").send({
                            "embed": {
                                "color": 2187907,
                                "timestamp": "2017-09-15T06:25:08.764Z",
                                "thumbnail": {
                                    "url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "author": {
                                    "name": "Warframe Alerts for Firebot",
                                    "icon_url": "https://i.imgur.com/2Koeo7M.png"
                                },
                                "fields": [
                                    {
                                        "name": "New Alert!",
                                        "value": currentAlerts[0]
                                    }
                                ]
                            }
                        })
                    };
                    if(newAlertsNum == 0){
                        if (client.config.BotSettings.Debug == true) { console.log("No New Alerts!") }
                    };
                    client.lastAlerts = currentAlerts;
                })
            }, 60 * 1000);
        }
    }
};