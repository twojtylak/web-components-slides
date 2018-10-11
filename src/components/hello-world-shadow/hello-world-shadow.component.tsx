import { Component } from "@stencil/core";

@Component({
  tag: 'hello-world-shadow',
  styleUrl: 'hello-world-shadow.css',
  shadow: true
})
export class HelloWorldShadow {
  render() {
    return (
      <div>Hello World Shadow</div>
    );
  }
}
