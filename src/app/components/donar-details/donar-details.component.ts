import { Component, OnInit } from '@angular/core';
import { Donar } from 'src/app/models/donar.model';
import { Donation } from 'src/app/models/donation.model';
import { HttpService } from 'src/app/services/http-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-donar-details',
  templateUrl: './donar-details.component.html',
  styleUrls: ['./donar-details.component.css']
})
export class DonarDetailsComponent implements OnInit {

  private apiUrl = environment.apiUrl;

  donarsList: Donar[] = [];
  donations: Donation[] = [];

  selectedDonor: Donar;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    // Donors Load
    this.httpService.get<Donar[]>(this.apiUrl + 'donors/all').subscribe(result => {
      this.donarsList = result;
    });
  }

  onDonorChange(donorId, index) {   
    this.donarsList.filter(donor => donor.id == donorId).forEach(donor => {
      this.selectedDonor = donor;
    });
  }

  fetchDonations() {
    if (!this.selectedDonor) {
      return;
    }
    // Donations Load
    this.httpService.get<Donation[]>(this.apiUrl + 'donations/by-id/' + this.selectedDonor.id).subscribe(result => {
      this.donations = result;
    });
  }

}
