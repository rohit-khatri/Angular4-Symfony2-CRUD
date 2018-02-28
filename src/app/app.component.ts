import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [`
	th {
		color:white;
		background-color:gray;
		
	}
	`]
})
export class AppComponent {

	constructor(private httpClient: HttpClient) { }
	name: string = '';
	certificationName: string = '';
	found: boolean = false;
	uri: string;
	responseData: any[];
	certificationTypes: any[];
	ceuId: number;


	onNameKeyUp(event: any) {
		this.name = event.target.value;
		this.found = false;
	}

	getData() {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');
		console.log(this.name);
		this.httpClient.get(`https://trex.org/app_dev.php/api/v1/member/376336/candidate-ceus?action=${this.name}&expired=false`)
			.subscribe(
			(data: any[]) => {
				console.log(data);
				this.found = true;
				this.certificationTypes = data[0].candidateceu;
				console.log(this.certificationTypes);

			}
			)
	}

	postData() {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');
		this.httpClient.post(`https://trex.org/app_dev.php/api/v1/member/376336/candidate-ceu`,
			{
				"ceu_id": "",
				"activity_type_id": "1",
				"ceu_role": "1",
				"activity_name": "construction Project",
				"provider_name": "ACI",
				"activity_date": "2017-06-02",
				"activity_quantity": "2",
				"ceus_remained": "5",
				"created_by": "rohit.khatri@infobeans.com"
			})
			.subscribe(
			(val) => {
				console.log("POST call successful value returned in body",
					val);
				this.getData();
			},
			response => {
				console.log("POST call in error", response);
			},
			() => {
				console.log("The POST observable is now completed.");
			});
	}

	deleteCeus(val) {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');

		this.httpClient.delete(`https://trex.org/app_dev.php/api/v1/member/376336/candidate-ceu?ceu_id=${val}&deleted_by=vishal@infobeans.com`, { headers: headers })
			.subscribe(
			(val) => {

				console.log("DELETE call successful value returned in body",
					val);
				this.getData();
			},
			response => {
				console.log("DELETE call in error", response);
			},
			() => {
				console.log("The DELETE observable is now completed.");
			});

	}
}
