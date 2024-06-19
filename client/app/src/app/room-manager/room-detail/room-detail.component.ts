import { Component, Input } from '@angular/core';
import { Room } from '../../types/IRoom';
import * as d3 from 'd3';

interface ElementData {
  x: number;
  y: number;
  type: string;
  state: string; // 'on' or 'off'
}

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {
  @Input() room!: Room | null;
  devices = [/* */];
  selectedDevice = null;

  private svg: any;
  private roomWidth = 800;
  private roomHeight = 600;
  private selectedElement: string | null = null;
  private elementsData: ElementData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.loadElements();
    console.log(this.room);

  }

  private createSvg(): void {
    this.svg = d3.select("figure#room")
      .append("svg")
      .attr("width", this.roomWidth)
      .attr("height", this.roomHeight)
      .style("background-image", "url('assets/room.jpg')")
      .style("background-repeat", "no-repeat")
      // .style("background-size", "cover")

      .style("border", "1px solid black");

    this.svg.on('click', (event: MouseEvent) => this.addElement(event));
  }

  selectElement(element: string): void {
    this.selectedElement = element;
  }

  private addElement(event: MouseEvent): void {
    if (!this.selectedElement) return;

    const [x, y] = d3.pointer(event);

    const group = this.svg.append('g')
      .attr('transform', `translate(${x},${y})`)
      .call(d3.drag()
        .on('drag', (event: any) => {
          d3.select(event.sourceEvent.target.parentNode)
            .attr('transform', `translate(${event.x},${event.y})`);
        })
      );

    const circle = group.append('circle')
      .attr('r', 20)
      .attr('fill', this.selectedElement === 'lamp' ? 'yellow' : 'blue')
      .on('click', (event: MouseEvent) => {
        event.stopPropagation();
        this.switchOn(event.target);
        this.saveElements();
      })
      .on('dblclick', (event: MouseEvent) => {
        event.stopPropagation();
        group.remove();
        this.saveElements();
      });

    group.append('image')
      .attr('xlink:href', this.selectedElement === 'lamp' ? 'assets/lamp.png' : 'assets/tv.png')
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', -15)
      .attr('y', -15);

    this.elementsData.push({
      x: x,
      y: y,
      type: this.selectedElement,
      state: this.selectedElement === 'lamp' ? 'off' : 'on'
    });

    this.saveElements();

    this.selectedElement = null;  
  }

  private switchOn(element: any): void {
    const circle = d3.select(element);
    const currentColor = circle.attr('fill');
    const newColor = currentColor === 'yellow' ? 'green' : 'yellow';
    circle.attr('fill', newColor);

    const parentTransform = d3.select(element.parentNode).attr('transform');
    const [x, y] = parentTransform.replace('translate(', '').replace(')', '').split(',').map(Number);

    const elementData = this.elementsData.find(el => el.x === x && el.y === y);
    if (elementData) {
      elementData.state = newColor === 'yellow' ? 'off' : 'on';
      this.saveElements();
    }
  }

  private saveElements(): void {
    localStorage.setItem('elementsData', JSON.stringify(this.elementsData));
  }

  private loadElements(): void {
    const savedData = localStorage.getItem('elementsData');
    if (savedData) {
      this.elementsData = JSON.parse(savedData);
      this.elementsData.forEach(data => {
        const group = this.svg.append('g')
          .attr('transform', `translate(${data.x},${data.y})`)
          .call(d3.drag()
            .on('drag', (event: any) => {
              d3.select(event.sourceEvent.target.parentNode)
                .attr('transform', `translate(${event.x},${event.y})`);
              data.x = event.x;
              data.y = event.y;
              this.saveElements();
            })
          );

        const circle = group.append('circle')
          .attr('r', 20)
          .attr('fill', data.state === 'on' ? 'green' : 'yellow')
          .on('click', (event: MouseEvent) => {
            event.stopPropagation();
            this.switchOn(event.target);
          })
          .on('dblclick', (event: MouseEvent) => {
            event.stopPropagation();
            group.remove();
            this.elementsData = this.elementsData.filter(el => el !== data);
            this.saveElements();
          });

        group.append('image')
          .attr('xlink:href', data.type === 'lamp' ? 'assets/lamp.png' : 'assets/tv.png')
          .attr('width', 30)
          .attr('height', 30)
          .attr('x', -15)
          .attr('y', -15);
      });
    }
  }

}
