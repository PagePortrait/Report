#!/bin/bash
#
# Guide: https://google.github.io/styleguide/shell.xml
# Link: https://code.google.com/p/js-test-driver/

readonly TEST_URL="https://www.dtm.io"

readonly CWD=$(cd $(dirname $0); pwd)
readonly LIB="${CWD}/lib"

readonly WGET="$(which wget)"
readonly CURL="$(which curl)"
readonly UNZIP="$(which unzip)"
readonly TAR="$(which tar)"

readonly PHANTOMJS_VERSION="2.1.1"
readonly PHANTOMJS_KEY="phantomjs"
readonly PHANTOMJS_LIB="${LIB}/${PHANTOMJS_KEY}"
readonly PHANTOMJS_URL="https://bitbucket.org/ariya/phantomjs/downloads"
readonly PHANTOMJS_PREFIX="${PHANTOMJS_KEY}-${PHANTOMJS_VERSION}"
readonly PHANTOMJS_MACOS_URL="${PHANTOMJS_URL}/${PHANTOMJS_PREFIX}-macosx.zip"
readonly PHANTOMJS_LINUX_URL="${PHANTOMJS_URL}/${PHANTOMJS_PREFIX}-linux-i686.tar.bz2"
readonly PHANTOMJS_LINUX64_URL="${PHANTOMJS_URL}/${PHANTOMJS_PREFIX}-linux-x86_64.tar.bz2"

readonly RND1=$(($RANDOM % 40 + 10))
readonly RND2=$(($RANDOM % 99 + 10))
readonly USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.${RND1} (KHTML, like Gecko) Chrome/50.0.2661.${RND2} Safari/537.${RND1}"


#
# Configures tests runner.
#
function config() {
  echo "var page = require('webpage').create();
        var url = 'http://pageportrait.com/dev/portrait?url=${TEST_URL}&mode=test';
        var fs = require('fs');
        var CWD = fs.workingDirectory;
        var TIMEOUT = 30; // in seconds
        var path = CWD + (/build\/?$/.test(CWD) ? '/..' : '') + '/tests/';
        var list = fs.list(path);
        console.log('Initializing environment: ' + CWD);
        page.onError = function(msg, trace) {
          console.log('CONSOLE ERROR: ', msg);
        };
        page.onConsoleMessage = function(msg) {
          console.log('CONSOLE LOG: ' + msg);
        };
        page.onInitialized = function(status) {
          page.evaluate(function() {
            window.URL = function(url) {
              function init_() {
                var regexp = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
                var match = (url || '').match(regexp) || [];
                self_['protocol'] = match[2] ? match[2] + ':' : '';
                self_['host'] = match[4] || '';
                self_['hostname'] = self_['host'].split(':')[0];
                self_['port'] = +(self_['host'].split(':')[1]) || '';
                self_['pathname'] = match[5] || '';
                self_['search'] = match[7] ? ('?' + match[7]) : '';
                self_['hash'] = match[9] ? ('#' + match[9]) : '';
                self_['origin'] = self_['protocol'] + '//' + self_['host'];
              }
              var self_ = this;
              init_();
            };
          });
        };
        page.open(url, function() {
          console.log('Loading test URL: ' + url);
          function wait_() {
            var loaded = page.evaluate(function(loaded) {
              return window[loaded];
            }, 'loaded');
            if (loaded || !TIMEOUT) {
              phantom.exit(runTests_(list));
            } else {
              --TIMEOUT;
              // console.log('page loading... ' + TIMEOUT);
              setTimeout(wait_, 1E3);
            }
          }
          wait_();
        });
        function runTests_(list) {
          console.log('Running tests.');
          var result = {'passed': [], 'failed': []};
          var length = list.length;
          var i = 0;
          for(; i < length;) {
            var name = list[i++];
            var file = path + name;
            if (0 == name.indexOf('test') && fs.isFile(file)) {
              if (page.injectJs(file)) {
                var failed = page.evaluate(function(method) {
                  return window[method]();
                }, name.slice(0, -3));
                result[failed ? 'failed' : 'passed'].push(name);
              }
            }
          }
          console.log('\nPassed: ' + result.passed.length, 'Failed: ' + result.failed.length);
          if (result.failed.length) {
            console.log('\nFailed tests:');
            console.log(result.failed.join('\n'));
          } else {
            console.log('\nLooks good :)');
          }
          return result.failed.length;
        }
        " > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.js"
}

#
# Downloads phantomjs.
#
function download() {
  mkdir -p "${LIB}"

  if [[ ! -d "${LIB}/${PHANTOMJS_KEY}" ]]; then
    mkdir -p "${PHANTOMJS_LIB}"
    echo "Downloading ${PHANTOMJS_KEY}:"
    if [[ `uname` == "Darwin" ]]; then
      if [[ -n "$WGET" ]]; then
        $WGET -U "${USER_AGENT}" "${PHANTOMJS_MACOS_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      else
        $CURL -A "${USER_AGENT}" -L "${PHANTOMJS_MACOS_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      fi
      echo "Done"
      echo -n "Extracting ${PHANTOMJS_KEY}: "
      $UNZIP -q "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip" -d "${PHANTOMJS_LIB}"
    else
      if [[ `uname -m` == "x86_64" ]]; then
        if [[ -n "$WGET" ]]; then
          $WGET -U "${USER_AGENT}" "${PHANTOMJS_LINUX64_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -A "${USER_AGENT}" -L "${PHANTOMJS_LINUX64_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        fi
      else
        if [[ -n "$WGET" ]]; then
          $WGET -U "${USER_AGENT}" "${PHANTOMJS_LINUX_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -A "${USER_AGENT}" -L "${PHANTOMJS_LINUX_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        fi
      fi
      echo "Done"
      echo -n "Extracting ${PHANTOMJS_KEY}: "
      $TAR -xjpf "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2" -C "${PHANTOMJS_LIB}"
    fi
    mv ${PHANTOMJS_LIB}/phantomjs-*/* "${PHANTOMJS_LIB}"
    rm -rf ${PHANTOMJS_LIB}/phantomjs*
    echo "Done"
  fi
}

#
# Runs tests.
#
function run() {
  echo "============================="
  date
  echo ""
  "${PHANTOMJS_LIB}/bin/${PHANTOMJS_KEY}" "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.js"
  local status=$?
  echo "============================="
  exit $status
}

#
# The main function.
#
function main() {
  download
  config
  run
}

main "$@"