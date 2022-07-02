import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  id = Number(this.route.snapshot.params['id']) || NaN
  task: any = {}
  reqURL: string = 'http://localhost:4201/tasks'
	reqId: number = Number(this.route.snapshot.params['id'])

  async getData() {
    await fetch(`${this.reqURL}?&id=${this.id}`)
      .then(res => res.json())
      .then(data => this.task = (true) ? data[0] : {})
      .catch(err => console.error(err))
  }

	async editTask() {
		const request = `${this.reqURL}${this.reqId}`
		await fetch(request, { 
			headers: { 'Content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				completed: true
			})
		}).catch(err => console.error(err))
	}

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void { this.getData() }
}
