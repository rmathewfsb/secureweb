import { Component, OnInit } from '@angular/core';
import { Fee } from './fee';
// We haven't defined these services yet
import { FeeService } from './fee.service';

@Component({
  selector: 'private-fees',
  // We'll use an external file for both the CSS styles and HTML view
  templateUrl: 'private-fees.component.html',
  styleUrls: ['private-fees.component.css']
})
export class PrivateFeesComponent implements OnInit {
  privateFees: Fee[];
  // Note: We haven't implemented the Deal or Auth Services yet.
  constructor(private feeService: FeeService) {}
  
  // When this component is loaded, we'll call the FeeService and get our private Fees.
  ngOnInit(): void {
    this.feeService.getSecureFees()
      .then(fees => this.privateFees = fees);
  }
  purchase(item){
    alert("You bought the: " + item.name);
  }
}