/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-header-layout/app-header-layout.html","fb94f4326d321cc284ab65273f3563c7"],["bower_components/app-layout/app-header/app-header.html","305ada3409999055fe3e37aa366efacb"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","09bc22bdba053c05f0e478f37a7fcba6"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","1ee969ea308114897fbd8ec30875f38e"],["bower_components/app-layout/app-toolbar/app-toolbar.html","cac42c92a39fd9611d080d1362905030"],["bower_components/app-layout/helpers/helpers.html","237274971e65a747a047e2687ff004a7"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","3891d462c464862c5706e114e1abe93b"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","de57201642e8aa7eadebad45ca7b35e7"],["bower_components/iron-behaviors/iron-button-state.html","2034e45c1e5117b83033713cda6a0b4f"],["bower_components/iron-behaviors/iron-control-state.html","d57c6bfd619425b963c65c312a054ab2"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","d017c37e8e343ede515255059b4d78db"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["bower_components/iron-flex-layout/iron-flex-layout.html","40fbf9b980a269b5507022f32f9b413c"],["bower_components/iron-icon/iron-icon.html","86e2b60880947c0b39494a73411fbc11"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","84a7393de41f8ea5da7a599f480b57f0"],["bower_components/iron-image/iron-image.html","0367b237486a99f74bf5ee140e95b3c8"],["bower_components/iron-list/iron-list.html","bbc3d4c68950a1d1dd9dc495d24c5e31"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","bb8aada82d13df5b839923fc817484b2"],["bower_components/iron-menu-behavior/iron-menubar-behavior.html","e86b1a7fd638275ca05880ca0f6aa3eb"],["bower_components/iron-meta/iron-meta.html","d3401c6909ebd2a7da37f6bf5fae988b"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","340b583bc8f50cf5817490e60ca60939"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","05cc5c4d1abbf2d55d73d9b102013191"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2c99ff1debbe68090624b1a52f3f4a50"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","5902d04f185d2dc6291e0705a7b24725"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","b824f23f960fad504b5b9562dbd68570"],["bower_components/iron-pages/iron-pages.html","461dc38467532f0a57bf564301bcca78"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e8decd555dc3ad8de7532632b13b0ce2"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","8601c5c220d208435e3685dfdc063e2e"],["bower_components/iron-selector/iron-multi-selectable.html","802945ddfc16eb03e8b605fff57cebb9"],["bower_components/iron-selector/iron-selectable.html","b9248a704cc4895f7ecbccff8efd0edf"],["bower_components/iron-selector/iron-selection.html","30b5a0f391d92c70156b1830fb3bd0c6"],["bower_components/paper-behaviors/paper-button-behavior.html","ba4f655d100442d73343d6e4f60aa358"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","3b088afa4531829d1a5b79d3bf5978f1"],["bower_components/paper-behaviors/paper-ripple-behavior.html","574608962bf3eb67383391cf8513d56b"],["bower_components/paper-button/paper-button.html","b0c95dacbbf7e1ce20ea182911dcbd34"],["bower_components/paper-icon-button/paper-icon-button.html","a557e2789045f5c41da9befed2f6350c"],["bower_components/paper-ripple/paper-ripple.html","b4cc3ee650f23101e9a4a0be44968a1a"],["bower_components/paper-spinner/paper-spinner-behavior.html","8685ad432fbded77b263aad4a91034e5"],["bower_components/paper-spinner/paper-spinner-lite.html","c627cbd2ad2dc9b5e853f7cd47b104b5"],["bower_components/paper-spinner/paper-spinner-styles.html","f6b2d42a9d2262fafb034ea0f802fc80"],["bower_components/paper-spinner/paper-spinner.html","acff8d1e71eaac17569976125462ff67"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-tabs/paper-tab.html","a2cf8ad1d440c0907bee5fb668fd9c5a"],["bower_components/paper-tabs/paper-tabs-icons.html","f8e9e4ba00752fc54f1046143ba1be28"],["bower_components/paper-tabs/paper-tabs.html","c9e19299c83b2089cd56b08cbe3c0998"],["bower_components/paper-toast/paper-toast.html","54732521fcae296c01d3c02abd42bae5"],["bower_components/polymer/lib/elements/array-selector.html","841dc72edc195009030cac467dcaccad"],["bower_components/polymer/lib/elements/custom-style.html","08afb86580116b7e4d39d43a39cd1d08"],["bower_components/polymer/lib/elements/dom-bind.html","41004de9dca438cb73383a94fe646d1f"],["bower_components/polymer/lib/elements/dom-if.html","c1fc3b3b3ddd0989b627cb0bfc520cb6"],["bower_components/polymer/lib/elements/dom-module.html","51f4c371c9410959c3feca850c742712"],["bower_components/polymer/lib/elements/dom-repeat.html","62dbeda4637dcd15dcdafa0d62315a8d"],["bower_components/polymer/lib/legacy/class.html","72a154ebb7232938bdc65e94b13d7508"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","7b796531a0b47ac74059df0ada681333"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","727424c73ce82a221dd5d55dae8bfb7e"],["bower_components/polymer/lib/legacy/polymer-fn.html","80b9a95b6f9627267b498fae324c8aec"],["bower_components/polymer/lib/legacy/polymer.dom.html","44aedb235eec8a562cb3ad63bb1033ee"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","e259e4210ec65f4c25459720ce7b71b0"],["bower_components/polymer/lib/mixins/dir-mixin.html","db536a9ada8cdc0fb2fc010e59fbc5e5"],["bower_components/polymer/lib/mixins/element-mixin.html","a2607ad7b0e6e857edf8bb438dbd8030"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","11c9f3ad714623f52dea07e6afaa2b30"],["bower_components/polymer/lib/mixins/mutable-data.html","0c86e6cf2ad4f58a247cbb4e3b8fe365"],["bower_components/polymer/lib/mixins/properties-changed.html","941485133606f5066c9d713748ca896f"],["bower_components/polymer/lib/mixins/properties-mixin.html","b89faebafe8686dffaeb79a3abc83162"],["bower_components/polymer/lib/mixins/property-accessors.html","7287eb3f0383d7e8da9a3b18e569ed7e"],["bower_components/polymer/lib/mixins/property-effects.html","3f82d74daf72dbfaa8a652e42751c8af"],["bower_components/polymer/lib/mixins/template-stamp.html","30a841e5dc48ec28ae2ec04c071c6205"],["bower_components/polymer/lib/utils/array-splice.html","02e37f7a718cb6724e4c1101fd9fe693"],["bower_components/polymer/lib/utils/async.html","2f5b326d88e8030cd26781095235fd6c"],["bower_components/polymer/lib/utils/boot.html","b60843623cc8cb524686f5c9c77b77e0"],["bower_components/polymer/lib/utils/case-map.html","3348b08018d83d39a4447a6bbaa896af"],["bower_components/polymer/lib/utils/debounce.html","bdb9a2e69ead51e6b8bf27583d040e27"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","0e34b65431c3aca1e492f459f0f64623"],["bower_components/polymer/lib/utils/flush.html","02cf15aa4ad4cc7edc87d6c5724d2c0f"],["bower_components/polymer/lib/utils/gestures.html","23630718c66b674e8cd0cfd942b2b653"],["bower_components/polymer/lib/utils/html-tag.html","95f4ef70c3d2d142f390a98470c194b4"],["bower_components/polymer/lib/utils/import-href.html","d6093e9c471580c1cb35f7686c772fde"],["bower_components/polymer/lib/utils/mixin.html","5ec7b79aa4871070458783ac7c2980a9"],["bower_components/polymer/lib/utils/path.html","279780f8fac6e7f4048f3895f7a05fda"],["bower_components/polymer/lib/utils/render-status.html","c14138dff3da4d203b9bdca9bd93b929"],["bower_components/polymer/lib/utils/resolve-url.html","5bc2e90748b9845386f19a1eee5d1191"],["bower_components/polymer/lib/utils/settings.html","4f688f5909f8493a10a5012176c911cc"],["bower_components/polymer/lib/utils/style-gather.html","1e10e8f6f06cf5d4f976e3fd905f1252"],["bower_components/polymer/lib/utils/templatize.html","8c31c01b8471caf635004e0ca99a27b1"],["bower_components/polymer/lib/utils/unresolved.html","50b8ec3ab60b6b40f4cf4fc931027b80"],["bower_components/polymer/polymer-element.html","26c3b3b8ee7b81243474c7d95636d157"],["bower_components/polymer/polymer.html","72d557b84da0412316b422d8325ad25c"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","f0c8756ae87a4490bf061bb3f71113ad"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","b67f18ab62605402ea45dc1b5ac4e67e"],["index.html","452accff913ddd6e122a07a53ad2c114"],["src/wishkaro20-app/my-firebaseinit.html","b89cd679bf4793f3f0c4a31c40b96977"],["src/wishkaro20-app/my-firestoreinit.html","1772ea0301cca1a54189210dc006c47c"],["src/wishkaro20-app/my-firestorequery.html","1f40d46a0f6519d93e5c32b809e62be8"],["src/wishkaro20-app/my-view.html","3ffe03ea2f767708c3a2fc3f5d355970"],["src/wishkaro20-app/my-view1.html","b5e9948e24a96e1a16eb33399339dfde"],["src/wishkaro20-app/my-view2.html","7c134b01bc9d67f3f4530a6471e7a53d"],["src/wishkaro20-app/sharedstyles.html","4e988e6b88e37a4882043d36d14df2b9"],["src/wishkaro20-app/wishkaro20-app.html","3355cc37315fafa12ea84180aa8fcc5d"],["src/wishkaro20-app/wishkaro20global.js","529129a108003d897dc0e3c4109d30ac"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







