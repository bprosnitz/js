// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
 * @fileoverview Helpers for manipulating vanadium names.
 * See vanadium/release/go/src/v.io/v23/naming/parse.go for the
 * corresponding operations in golang.
 * @private
 */

/**
 * Utility helpers for manipulating vanadium names.
 * @namespace util
 * @memberof module:vanadium.naming
 */

module.exports = {
  clean: clean,
  join: join,
  isRooted: isRooted,
  basename: basename,
  stripBasename: stripBasename,
  splitAddressName: splitAddressName,
  blessingNamesFromAddress: blessingNamesFromAddress,
};

/**
 * Normalizes a name by collapsing multiple slashes and removing any
 * trailing slashes.
 * @param {string} name The vanadium name.
 * @memberof module:vanadium.naming.util
 */
function clean(name) {
  return _removeTailSlash(_squashMultipleSlashes(name));
}

/**
 * Joins parts of a name into a whole. The joined name will be cleaned; it only
 * preserved the rootedness of the name components.
 * Examples:
 * join(['a, b']) -> 'a/b'
 * join('/a/b/', '//d') -> '/a/b/d'
 * join('//a/b', 'c/') -> '/a/b/c'
 * @param {...string} parts Either a single array that contains the strings
 * to join or a variable number of string arguments that will be joined.
 * @return {string} A joined string
 * @memberof module:vanadium.naming.util
 */
function join(parts) {
  if (Array.isArray(parts)) {
    while (parts.length > 0 && parts[0] === '') {
      parts.splice(0, 1); // Remove empty strings; they add nothing to the join.
    }
    var joined = parts.join('/');
    return clean(joined);
  }
  return join(Array.prototype.slice.call(arguments));
}

/**
 * Determines if a name is rooted, that is beginning with a single '/'.
 * @param {string} name The vanadium name.
 * @return {boolean} True if the name is rooted, false otherwise.
 * @memberof module:vanadium.naming.util
 */
function isRooted(name) {
  return name[0] === '/';
}

/**
 * blessingNamesFromAddress extracts the blessing names of the server with the
 * provided address (endpoint).
 *
 * TODO(nlacasse): Should we have a full fledged object parallel to
 * naming.Endpoint in Go? Because this parsing is really really shabby!
 *
 * @param {string} address String representation of the server address (aka
 * endpoint).
 * @return {...string} Blessing names extracted from address, or an empty list
 * if none could be extracted.
 * @memberof module:vanadium.naming.util
 */
function blessingNamesFromAddress(addr) {
  var epversion = endpointVersion(addr);
  if (isNaN(epversion)) {
    // Not a well formed endpoint string.
    // Might be in "host:port" format, if so extract blessing names from that.
    // Format: [(<blessing name>)]@host:port
    var open = addr.indexOf('(');
    var close = addr.indexOf(')');
    if (open === 0 && close > 0 && addr.indexOf('@') === (close+1)) {
      return addr.substr(1, close-1).split(',');
    }
    return [];
  }
  if (epversion < 4) {
    // Versions less than 4 do not support blessing names in the endpoint.
    return [];
  }
  if (epversion > 4) {
    // This code needs to be updated.
    throw new Error('endpoint version '+epversion+' not supported');
  }
  var start = 0;
  // blessing names are the 7th field!
  for (var i = 0; i < 7; i++) {
    start = addr.indexOf('@', start+1);
  }
  return addr.substr(start+1, addr.length-start-3).split(',');
}

function endpointVersion(addr) {
  // Poor approximation of a well-formed endpoint string.
  // Format described in
  // the Go library documentation for v.io/v23/naming.Endpoint.  Must be at
  // least 7 characters (shortest valid endpoint is: @1@@@@@)
  if (addr.length < 7) {
    return NaN;
  }
  // Must start with an '@' and end with an '@@'
  if (addr.indexOf('@') !== 0) {
    return NaN;
  }
  if (addr.lastIndexOf('@@') !== (addr.length - 2)) {
    return NaN;
  }
  return parseWholeNumber(addr.split('@')[1]);
}

function parseWholeNumber(value) {
  if (/^\d+$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

/**
 * SplitAddressName takes an object name and returns the server address and
 * the name relative to the server.
 * The name parameter may be a rooted name or a relative name; an empty string
 * address is returned for the latter case.
 * The returned address may be in endpoint format or host:port format.
 * Returned object will be in the format of:
 *      {address: string, suffix: string}
 * @param {string} name The vanadium name.
 * @return {Object.<string, string>}
 * @memberof module:vanadium.naming.util
 */
function splitAddressName(name) {
  name = clean(name);

  if (!isRooted(name)) {
    return {
      address: '',
      suffix: name
    };
  }
  name = name.substr(1); // trim the beginning "/"
  if (name.length === 0) {
    return {
      address: '',
      suffix: ''
    };
  }

  if (name[0] === '@') { // <endpoint>/<suffix>
    var split = _splitIntoTwo(name, '@@/');
    if (split.suffix.length > 0) { // The trailing "@@" was stripped, restore
      split.address = split.address + '@@';
    }
    return split;
  }
  if (name[0] === '(') { // (blessing)@host:[port]/suffix
    var tmp = _splitIntoTwo(name, ')@').suffix;
    var suffix = _splitIntoTwo(tmp, '/').suffix;
    return {
      address: _trimEnd(name, '/' + suffix),
      suffix: suffix
    };
  }
  // host:[port]/suffix
  return _splitIntoTwo(name, '/');

  function _splitIntoTwo(str, separator) {
    var elems = str.split(separator);
    return {
      address: elems[0],
      suffix: elems.splice(1).join(separator)
    };
  }
}

/**
 * Gets the basename of the given vanadium name.
 * @param {string} name The vanadium name.
 * @return {string} The basename of the given name
 * @memberof module:vanadium.naming.util
 */
function basename(name) {
  name = clean(name);
  var split = splitAddressName(name);
  if (split.suffix !== '') {
    return split.suffix.substring(split.suffix.lastIndexOf('/') + 1);
  } else {
    return split.address;
  }
}

/**
 * Retrieves the parent of the given name.
 * @param {string} name The vanadium name.
 * @return {string | null} The parent's name or null, if there isn't one.
 * @memberof module:vanadium.naming.util
 */
function stripBasename(name) {
  name = clean(name);
  var split = splitAddressName(name);
  if (split.suffix !== '') {
    return name.substring(0, name.lastIndexOf('/'));
  } else {
    return '';
  }
}

// Replace every group of slashes in the string with a single slash.
function _squashMultipleSlashes(s) {
  return s.replace(/\/{2,}/g, '/');
}

// Remove the last slash in the string, if any.
function _removeTailSlash(s) {
  return s.replace(/\/$/g, '');
}

// Helper util that removes the given suf from the end of str
function _trimEnd(str, suf) {
  var index = str.lastIndexOf(suf);
  if (index + suf.length === str.length) {
    return str.substring(0, index);
  } else {
    return str;
  }
}
