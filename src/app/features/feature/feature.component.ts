import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Feature } from './feature.model';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  @Input({ required: true }) feature!: Feature;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter();

  get imagePath() {
    return 'assets/features/' + this.feature.image;
  }

  onSelectFeature() {
    this.select.emit(this.feature.id);
  }
}
