import { Component, inject } from '@angular/core';
import { Family } from '../../types/IFamily';
import { FamilyService } from '../../services/family.service';

@Component({
  selector: 'app-family-members',
  standalone: true,
  imports: [],
  templateUrl: './family-members.component.html',
  styleUrl: './family-members.component.css'
})
export class FamilyMembersComponent {
  familyService = inject(FamilyService);
  family?: Family;

  ngOnInit(): void {
    this.familyService.getFamily().subscribe((fam: Family) => {
      if(fam){
        this.family = fam;
      }
    })
  }
}
