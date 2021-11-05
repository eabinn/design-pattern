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

class SimpleRemoteControl {
  slot?: Command;

  constructor() {}

  setCommand(command: Command) {
    this.slot = command;
  }

  buttonWasPressed() {
    this.slot?.execute();
  }
}

const simpleRemoteControl = new SimpleRemoteControl();
const light = new Light();
const lightOnCommand = new LightOnCommand(light);

simpleRemoteControl.setCommand(lightOnCommand);
simpleRemoteControl.buttonWasPressed();
