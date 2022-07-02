import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { timestampToString } from '../globals'


interface Task {
	"id": number,
	"tags": string[],
	"title": string,
	"priority": string,
	"timestamp": number,
	"completed": boolean,
	"description": string,
 }

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
	
	constructor(private route: ActivatedRoute) {}
	convertTimestamp = timestampToString

	task: any = {}
	reqURL: string = 'http://localhost:4201/tasks'
	reqId: number = Number(this.route.snapshot.params['id'])


  	async getData() {
		const request = `
			${this.reqURL}?
			&id=${this.reqId}
		`
		await fetch(request)
			.then(res => res.json())
			.then(data => this.task = data[0])
			.catch(err => console.error(err))
  	}

	async deleteTask() {
		const request = `
			${this.reqURL}/
			${this.reqId}
		`
		await fetch(request, {
			method: 'DELETE',
		}).catch(err => console.error(err))
	}

	async createTask() {
		const request = `${this.reqURL}${this.reqId}`
		await fetch(request, { 
			headers: { 'Content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({
				completed: true
			})
		}).catch(err => console.error(err))
	}
	
	ngOnInit(): void { 
		this.getData()
	}
}
