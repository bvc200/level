export default function Level(state){
  if ( !(this instanceof Level) ) { return new Level(state); }

  var level = this;
  this.setupComplete = function(){
    if (state.setup === "COMPLETED") { return; }

    state = Object.assign({}, state, {setup: "COMPLETED"});

    level.view.render(state);
    level.logger.info("Setup Complete");
  };

  this.acknowledgeSplashScreen = function(){
    if (state.splashScreenAcknowledged === true) { return; }

    state = Object.assign({}, state, {splashScreenAcknowledged: true});

    level.view.render(state);
    level.logger.info("Close Splash Screen");
  };

  this.showMenu = function(){
    if (state.menuVisible === true) { return; }

    state = Object.assign({}, state, {menuVisible: true});

    level.view.render(state);
    level.logger.info("Show Menu");
  };

  this.hideMenu = function(){
    if (state.menuVisible === false) { return; }

    state = Object.assign({}, state, {menuVisible: false});

    level.view.render(state);
    level.logger.info("Hide Menu");
  };

  this.selectTheme = function(theme){
    if (state.theme === theme) { return; }

    state = Object.assign({}, state, {theme: theme});

    level.view.render(state);
    level.logger.info("Select Theme");
  };

  this.newReading = function(reading){
    state = Object.assign({}, state, {reading: reading});

    level.view.render(state);
    level.logger.info("New Reading");
  };

  this.applyPopState = function(poppedState){
    state = Object.assign({}, state, poppedState);

    level.view.render(state);
    level.logger.info("Return to State");
  };
}
