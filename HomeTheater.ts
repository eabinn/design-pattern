class HomeTheaterFacade {
  tuner: Tuner;
  dvdPlayer: DvdPlayer;
  cdPlayer: CdPlayer;
  projector: Projector;
  display: Display;
  theaterLights: TheaterLights;

  constructor(
    tuner: Tuner,
    dvdPlayer: DvdPlayer,
    cdPlayer: CdPlayer,
    projector: Projector,
    display: Display,
    theaterLights: TheaterLights
  ) {
    this.tuner = tuner;
    this.dvdPlayer = dvdPlayer;
    this.cdPlayer = cdPlayer;
    this.projector = projector;
    this.display = display;
    this.theaterLights = theaterLights;
  }

  watchMovie(movie: string) {
    console.log(`Get ready to watch a movie ...${movie}`);
    this.tuner.on();
    this.dvdPlayer.on();
    this.cdPlayer.on();
    this.projector.on();
    this.display.on();
    this.theaterLights.on();
  }
}

class Tuner {
  on() {
    console.log("Tuner on");
  }
  off() {
    console.log("Tuner off");
  }
}

class DvdPlayer {
  on() {
    console.log("DvdPlayer on");
  }
  off() {
    console.log("DvdPlayer off");
  }
}

class CdPlayer {
  on() {
    console.log("CdPlayer on");
  }
  off() {
    console.log("CdPlayer off");
  }
}

class Projector {
  on() {
    console.log("Projector on");
  }
  off() {
    console.log("Projector off");
  }
}

class Display {
  on() {
    console.log("Display on");
  }
  off() {
    console.log("Display off");
  }
}

class TheaterLights {
  on() {
    console.log("TheaterLights on");
  }
  off() {
    console.log("TheaterLights off");
  }
}
