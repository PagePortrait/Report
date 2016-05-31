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


#
# Configures tests runner.
#
function config() {
  echo "var page = require('webpage').create();
        var url = 'http://pageportrait.com/portrait?url=${TEST_URL}&testing=';
        var fs = require('fs');
        var path = fs.workingDirectory + '/../tests/';
        var list = fs.list(path);
        var TIMEOUT = 15; // in seconds

        page.onError = function(msg, trace) {
          console.log('CONSOLE ERROR: ', msg);
        };

        page.onConsoleMessage = function(msg) {
          console.log('CONSOLE LOG: ' + msg);
        };

        page.open(url, function() {
          function wait_() {
            var loaded = page.evaluate(function(loaded) {
              return window[loaded];
            }, 'loaded');

            if (loaded || !TIMEOUT) {
              console.log('\nSTART TESTING');
              runTests_(list);
              phantom.exit();
            } else {
              console.log('waiting... ' + TIMEOUT--);
              setTimeout(wait_, 1E3);
            }
          }
          wait_();
        });

        function runTests_(list) {
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
        $WGET "${PHANTOMJS_MACOS_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      else
        $CURL -L "${PHANTOMJS_MACOS_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      fi
      echo "Done"
      echo -n "Extracting ${PHANTOMJS_KEY}: "
      $UNZIP -q "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip" -d "${PHANTOMJS_LIB}"
    else
      if [[ `uname -m` == "x86_64" ]]; then
        if [[ -n "$WGET" ]]; then
          $WGET "${PHANTOMJS_LINUX64_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -L "${PHANTOMJS_LINUX64_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        fi
      else
        if [[ -n "$WGET" ]]; then
          $WGET "${PHANTOMJS_LINUX_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -L "${PHANTOMJS_LINUX_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
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
  "${PHANTOMJS_LIB}/bin/${PHANTOMJS_KEY}" "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.js"
}

#
# The main function.
#
function main() {
  download
  config
  run
}

echo "============================="
date # Tue Apr 26 14:48:25 EEST 2016
echo ""

main "$@"

echo "============================="
