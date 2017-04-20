import { Component, OnInit } from '@angular/core';
import { Fee } from './fee';
// We haven't defined these services yet
import { FeeService } from './fee.service';

@Component({
  selector: 'public-fees',
  // We'll use an external file for both the CSS styles and HTML view
  templateUrl: 'public-fees.component.html',
  styleUrls: ['public-fees.component.css']
})
export class PublicFeesComponent implements OnInit {
  publicFees: Fee[];
  // Note: We haven't implemented the Deal or Auth Services yet.
  constructor(private feeService: FeeService) {}
  
  // When this component is loaded, we'll call the FeeService and get our public Fees.
  ngOnInit(): void {
    this.feeService.getFees()
      .then(fees => this.publicFees = fees);
  }
  purchase(item){
    alert("You bought the: " + item.name);
  }
}