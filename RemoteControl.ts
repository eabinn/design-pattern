interface Command {
  execute(): void;
}

class Light {
  on() {
    console.log("Light on");
  }
  off() {
    console.log("Light off");
  }
}

class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.on();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.off();
  }
}

class Stereo {
  on() {
    console.log("Stereo on");
  }
  off() {
    console.log("Stereo off");
  }
  setCD() {
    console.log("Stereo set CD");
  }
  setVolume(volume: number) {
    console.log(`Stereo volume is ${volume}`);
  }
}

class StereoOnWithCDCommand implements Command {
  private stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute(): void {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }
}

class StereoOffWithCDCommand implements Command {
  private stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute(): void {
    this.stereo.off();
  }
}

class NoCommand implements Command {
  execute() {}
}

class RemoteControl {
  onCommands: Array<Command> = [];
  offCommands: Array<Command> = [];
  commandNum: number = 7;

  constructor() {
    const noCommaned = new NoCommand();
    for (let i = 0; i < this.commandNum; i++) {
      this.onCommands.push(noCommaned);
      this.offCommands.push(noCommaned);
    }
  }

  public setCommand(slot: number, onCommand: Command, offCommand: Command): void {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  public onButtonWasPushed(slot: number): void {
    this.onCommands[slot].execute();
  }

  public offButtonWasPushed(slot: number): void {
    this.offCommands[slot].execute();
  }
}

// run
const remoteControl = new RemoteControl();

const light = new Light();
const stereo = new Stereo();

const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const stereoOnCommand = new StereoOnWithCDCommand(stereo);
const stereoOffCommand = new StereoOffWithCDCommand(stereo);

remoteControl.setCommand(0, lightOnCommand, lightOffCommand);
remoteControl.setCommand(1, stereoOnCommand, stereoOffCommand);

remoteControl.onButtonWasPushed(0);
remoteControl.offButtonWasPushed(0);
remoteControl.onButtonWasPushed(1);
remoteControl.offButtonWasPushed(1);
