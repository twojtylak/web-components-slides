import { Component } from "@stencil/core";

@Component({
  tag: "hello-world",
  shadow: true
})
export class HelloWorld {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}
