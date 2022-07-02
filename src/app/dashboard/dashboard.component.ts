import { timestampToTimeAgo } from '../globals'
import { Component, Input, OnInit } from '@angular/core';

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
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

	tasks: Task[] = []
	isLoading = false
	convertTimestamp = timestampToTimeAgo

	reqURL: string = 'http://localhost:4201/tasks'
	reqPage: number = 1
	reqTags: string[] = []
	reqOrder: string = 'desc'
	reqLimit: number = 15
	reqSortBy: string = "id"	
	reqPriority: string[] = []

	async loadData() {
		this.isLoading = true
		let stringTags = ''
		let stringPriority = ''
		this.reqTags.forEach(tag => stringTags += `&tags_like=${tag}`)
		this.reqPriority.forEach(priority => stringPriority += `&priority=${priority}`)
		const request = `
			${this.reqURL}?
			&_limit=${this.reqLimit}
			&_page=${this.reqPage++}
			&_sort=${this.reqSortBy}
			&_order=${this.reqOrder}
			${stringPriority}
			${stringTags}
		`
		await fetch(request)
			.then(res => res.json())
			.then(data => data.forEach((item: Task) => this.tasks.push(item)))
			.catch(err => console.error(err))
		setTimeout(() => this.isLoading = false, 500)
	}

	reloadData() {		
		this.reqPage = 1
		this.tasks = []
		this.loadData()
	}

	setPriorities(node:any) {
		node.checked ? this.reqPriority.push(node.value) : this.reqPriority = this.reqPriority.filter(param => param != node.value)
		this.reloadData()
	}

	setTags(node:any) {
		node.checked ? this.reqTags.push(node.value) : this.reqTags = this.reqTags.filter(param => param != node.value)
		this.reloadData()
	}

	setOrder(node:any) {
		this.reqOrder = node.value
		this.reloadData()
	}

	ngOnInit(): void {
		this.loadData()
	}
}
