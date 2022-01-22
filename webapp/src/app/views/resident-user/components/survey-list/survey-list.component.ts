import { Component, OnInit } from '@angular/core';
// services
import { ApiService } from '../../../../services/api.service';
// Alerts
import { AlertBox } from '../../../../utils/alert-box';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  public name: string;
  public isLoading = false;
  public questionIndex: number;
  public questions = [
    { id: '1', text: 'Do you have a petrol/diesel car?' },
    { id: '2', text: 'Shall SLEZ apply to PHEVs (Plug-in hybrid electric vehicles)?'},
    { id: '3', text: 'What should be the proposed boundaries of SLEZ?' },
  ];

  public options = [];

  constructor(
    private alert: AlertBox,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.name = this.apiService.userName;
    this.getAllQuestions();
  }

  public getAllQuestions(): void{
    const url = 'admin/viewQuestions';
    this.apiService.doGetRequest(url).subscribe(
      (returndata: any) => {
        this.questions = returndata;
        console.log(returndata);
      },
      (error) => {
        console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }
  
  public openQuestion(i: number): void {
    this.questionIndex = i;
    this.isLoading = true;
    this.options = [
      { id: '1', text: 'Inside the inner ring road.' },
      { id: '2', text: 'Outskrit of the town inside outer ring road.' },
      { id: '3', text: 'Town centre postcodes starting with SL only.' },
    ];

    this.isLoading = false;
  }
}
