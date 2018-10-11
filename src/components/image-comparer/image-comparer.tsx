import { Component, Element, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'image-comparer',
  styleUrl: 'image-comparer.css'

})
export class ImageComparer {

  @Element() el!: HTMLElement;

  @Prop() imageOne!: string;

  @Prop() imageTwo!: string;

  private handlerPosition = 0;

  private width = 0;

  private draggingEnabled = false;

  private images: HTMLElement[] = [];

  private resizeHandler?: HTMLElement;

  @Listen('mousemove, touchmove')
  onDragging(event: MouseEvent | TouchEvent): void {
    if (this.draggingEnabled) {
      const positionX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const rectObject = this.el.getBoundingClientRect();
      const handlerPosition = (positionX - rectObject.left);
      this.handlerPosition = handlerPosition > 0 ? Math.min(handlerPosition, this.width) : 0;
      this.updateVisibleImages();
    }
  }

  @Listen('mouseup, touchend, touchcancel')
  onStopDragging(): void {
    this.draggingEnabled = false;
  }

  @Listen('mousedown, touchstart')
  onStartDragging(): void {
    this.draggingEnabled = true;
  }
  onChange = () => {
      const width = this.getImageWith();
      if (!width || this.width === width) {
        return;
      }
      this.handlerPosition = width / 2;
      this.width = width;
      this.updateVisibleImages();
  };

  componentDidLoad(): void {
    this.images = Array.from(this.el.querySelectorAll('img'));
    this.images.forEach((imageElement: HTMLElement) => {
      imageElement.ondragstart = () => false;

      imageElement.addEventListener('load', this.onChange);
    });

    this.resizeHandler = this.el.querySelector('.images-diff-highlighter-handler') as HTMLElement;
  }

  updateVisibleImages(): void {
    if (this.images[1]) {
      this.images[1].style.clip = `rect(0px, ${this.width}px, auto, ${this.handlerPosition}px)`;
    }
    if (this.resizeHandler) {
      this.resizeHandler.style.left = `${this.handlerPosition}px`;
    }
  }

  private getImageWith(): number {
    return (this.images[0] || this.el).getBoundingClientRect().width;
  }

  render() {
    return (
      <div class="images-diff-highlighter_container">
        <img src={this.imageOne} />
        <img src={this.imageTwo} />
        <div class="images-diff-highlighter-handler" style={{ left: `${this.handlerPosition}px` }}>
          <span class="images-diff-highlighter-handler-left-arrow"/>
          <span class="images-diff-highlighter-handler-right-arrow"/>
        </div>
      </div>
    );
  }
}
