/**
 * Stretegy Pattern allows composition
 */

interface IStrategy {
  run(data: string[]): string[];
}

class Context {
  private strategy: IStrategy;
  private value: string[];

  constructor(strategy: IStrategy, value: string[]) {
    this.strategy = strategy;
    this.value = value;
  }

  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public executeStrategy(): void {
    console.log("Context: Executing the strategy:");
    const result = this.strategy.run(this.value);
    console.log(result.join(" "));
  }
}

class ConcreteStrategyA implements IStrategy {
  public run(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements IStrategy {
  public run(data: string[]): string[] {
    return data.reverse();
  }
}

const toSort = ["e", "a", "c", "f", "d", "b"];
const context = new Context(new ConcreteStrategyA(), toSort);
console.log(" ");
console.log("Client: Strategy is set to normal sorting");
context.executeStrategy();
console.log(" ");
context.setStrategy(new ConcreteStrategyB());
console.log("Client: Strategy is set to reversing");
context.executeStrategy();
