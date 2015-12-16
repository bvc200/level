/* jshint esnext: true */
'use strict';

import Map from "../node_modules/carbide/map";
import View from "./view";

import * as QString from "query-string";
function Client(){
  var $view = new View(document);
  window.$view = $view;
  var queryString = location.search;
  var query = QString.parse(queryString);

  var state = Map({
    menu: Map({
      open: location.pathname == "/menu",
    }),
    accelerometer: Map({
      reading: Map({
        x: 0,
        y: 0,
        z: 0
      }),
    }),
    theme: query.theme || "APPLE"
  });
  Object.defineProperty(this, "url", {
    get: function(){
      var url = "/";
      if (state.menu.open) { url = url + "menu"; }
      var query = {theme: state.theme.toLowerCase()};
      queryString = QString.stringify(query);
      return url + "?" + queryString;
    }
  });
  this.location = new Location(this);

  this.openMenu = function(){
    if (state.menu.open) { return; }
    // DEBT replaces menu map will fail with new keys
    state = state.set("menu", Map({open: true}));
    this.location.update();
  };
  this.closeMenu = function(){
    if (!state.menu.open) { return; }
    // DEBT replaces menu map will fail with new keys
    state = state.set("menu", Map({open: false}));
    this.location.update();
  };
}

function Location(projection){
  history.replaceState({}, "", projection.url);
  function update(){
    history.pushState({}, "", projection.url);
  }
  this.update = update;
}

export default new Client();
