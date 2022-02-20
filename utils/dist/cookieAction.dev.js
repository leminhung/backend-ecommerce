"use strict";

exports.findItem = function (items, id) {
  return items.find(function (item) {
    return item.id.toString() === id.toString();
  });
};