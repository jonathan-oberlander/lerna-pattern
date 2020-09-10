interface Component {
  operation(): string;
}

class CoreComponent implements Component {
  public operation(): string {
    return "CoreComponent";
  }
}

/**
 * Decorator IS a component
 * Decorator HAS a component
 */
class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public operation(): string {
    return this.component.operation();
  }
}

class DecoratorA extends Decorator {
  public operation(): string {
    return `DecoratorA(${super.operation()})`;
  }
}

class DecoratorB extends Decorator {
  public operation(): string {
    return `DecoratorB(${super.operation()})`;
  }
}

function clientCode(component: Component) {
  console.log(`Result: ${component.operation()}`);
}

const core = new CoreComponent();
console.log("\nClient: I have a core Component:");
clientCode(core);

const decorator1 = new DecoratorA(core);
const decorator2 = new DecoratorB(decorator1);
console.log("\nClient: Now I've got a decorated component:");
clientCode(decorator2);
