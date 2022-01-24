import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public answerData: any;
  public questions = [];

  public options = [];

  constructor(
    private router: Router,
    private alert: AlertBox,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.name = this.apiService.userName;
    this.getAllQuestions();
  }

  public getAllQuestions(): void{
    const url = 'users/GetAllQuestions';
    const data = {
      userId: this.apiService.userId
    };
    this.apiService.doPostRequest(url, data).subscribe(
      (returndata: any) => {
        this.questions = returndata;
        //console.log(returndata);
      },
      (error) => {
        //console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }

  public openQuestion(i: number): void {
    //this.isLoading = true;
    this.questionIndex = i;
    this.options = [];
    const url = 'users/GetQuestionOptions/' + i;

    this.apiService.doGetRequest(url).subscribe(
      (returndata: any) => {
        //this.isLoading = false;
        this.options = returndata.options;
      },
      (error) => {
        //console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );

  }

  public onItemChange(oId, qId): any{
    this.answerData = {
      questionid: Number(qId),
      optionId: Number(oId),
      userId: this.apiService.userId
   };
    //console.log(this.answerData);

    }

    public submitAnswer(): void {
      //this.isLoading = true;
      this.options = [];
      const url = 'users/addAnswers';

      this.apiService.doPostRequest(url, this.answerData).subscribe(
        (returndata: any) => {
          if (returndata.status) {
          //this.isLoading = false;
          this.alert.success('Done!', 'Your answer is submitted');
          this.getAllQuestions();
        }
        },
        (error) => {
          //console.log(error);
          this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
        }
      );
  
    }

    public logout(): void{
      this.apiService.doLogout().subscribe(
        (returndata: any) => {
          if (returndata){
            this.router.navigate(['/login']);
            this.alert.success('Success!', 'You have successfully Logged Out, Come back again');
          }
          //console.log(returndata);
        },
        (error) => {
          //console.log(error);
          this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
        }
      );
    }

}
