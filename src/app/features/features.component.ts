import { Component } from '@angular/core';
import { CORE_FEATURES } from './features.data';
import { FeatureComponent } from './feature/feature.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FeatureComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  coreFeatures = CORE_FEATURES;
  selectedFeatureId: string = "id1";

  onSelectFeature(id: string) {
    this.selectedFeatureId = id;
  }

  get selectedFeature() {
    return this.coreFeatures.find((feature) => feature.id === this.selectedFeatureId)!;
  }
}
