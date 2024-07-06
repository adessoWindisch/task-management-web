import { Component } from '@angular/core';
import { CORE_FEATURES } from './core-features';
import { FeatureComponent } from './feature/feature.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FeatureComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  coreFeatures = CORE_FEATURES;
  selectedFeatureId: string = "id1";

  onSelectFeature(id: string) {
    this.selectedFeatureId = id;
  }

  get selectedFeature() {
    return this.coreFeatures.find((feature) => feature.id === this.selectedFeatureId)!;
  }
}
