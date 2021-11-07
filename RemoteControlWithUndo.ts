interface Command {
  execute(): void;
  undo(): void; // 커맨드에서 작업취소 기능을 지원하자.
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

  undo() {
    this.light.off(); // 이 커맨드 구체 객체는 Light On을 위한 것이니 undo 하면 Light의 off()가 실행돼야 한다.
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

  undo() {
    this.light.on();
  }
}

class Stereo {
  private volume: number = 0;

  on() {
    console.log("Stereo on");
  }
  off() {
    console.log("Stereo off");
  }
  setCD() {
    console.log("Stereo set CD");
  }
  setVolume(volume?: number) {
    if (volume) {
      this.volume = volume;
    }
    console.log(`Stereo volume is ${this.volume}`);
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

  undo() {
    this.stereo.off();
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

  undo(): void {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume();
  }
}

class NoCommand implements Command {
  execute() {}
  undo() {}
}

class RemoteControlWithUndo {
  onCommands: Array<Command> = [];
  offCommands: Array<Command> = [];
  commandNum: number = 7;
  undoCommand: NoCommand;
  constructor() {
    const noCommaned = new NoCommand();
    for (let i = 0; i < this.commandNum; i++) {
      this.onCommands.push(noCommaned);
      this.offCommands.push(noCommaned);
    }
    this.undoCommand = noCommaned;
  }

  public setCommand(slot: number, onCommand: Command, offCommand: Command): void {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  public onButtonWasPushed(slot: number): void {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot]; // 해당 슬롯의 커맨드 객체의 레퍼런스를 undoCommand 인스턴스 변수에 저장한다.
  }

  public offButtonWasPushed(slot: number): void {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot]; // 해당 슬롯의 커맨드 객체의 레퍼런스를 undoCommand 인스턴스 변수에 저장한다.
  }

  public undoButtonWasPushed() {
    this.undoCommand.undo();
  }
}

// run

const remoteControl = new RemoteControlWithUndo();

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
remoteControl.undoButtonWasPushed();

remoteControl.onButtonWasPushed(1);
remoteControl.offButtonWasPushed(1);
remoteControl.undoButtonWasPushed();
