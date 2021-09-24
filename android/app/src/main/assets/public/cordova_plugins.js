
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-network-information.Connection",
          "file": "plugins/cordova-plugin-network-information/www/Connection.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "Connection"
        ]
        },
      {
          "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
          "file": "plugins/cordova-plugin-request-location-accuracy/www/android/RequestLocationAccuracy.js",
          "pluginId": "cordova-plugin-request-location-accuracy",
        "clobbers": [
          "cordova.plugins.locationAccuracy"
        ]
        },
      {
          "id": "cordova-plugin-android-permissions.Permissions",
          "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
          "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
          "cordova.plugins.permissions"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "cordova-plugin-network-information.network",
          "file": "plugins/cordova-plugin-network-information/www/network.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "navigator.connection"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.geolocation",
          "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "navigator.geolocation"
        ]
        },
      {
          "id": "sentry-cordova.Sentry",
          "file": "plugins/sentry-cordova/dist/js/sentry-cordova.bundle.js",
          "pluginId": "sentry-cordova",
        "clobbers": [
          "Sentry"
        ]
        },
      {
          "id": "cordova-plugin-statusbar.statusbar",
          "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
          "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
          "window.StatusBar"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.PositionError",
          "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
          "pluginId": "cordova-plugin-geolocation",
        "runs": true
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-network-information": "3.0.0",
      "sentry-cordova": "1.0.0-rc.0",
      "cordova-plugin-android-permissions": "1.1.2",
      "cordova-plugin-device": "2.0.3",
      "cordova-plugin-geolocation": "4.1.0",
      "cordova-plugin-request-location-accuracy": "2.3.0",
      "cordova-plugin-statusbar": "2.4.3",
      "cordova-plugin-whitelist": "1.3.5"
    };
    // BOTTOM OF METADATA
    });
    