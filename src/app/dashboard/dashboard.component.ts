import { Component, Input, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { db, time2TimeAgo } from '../globals';

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

	request = 'https://62be4f77be8ba3a10d511837.mockapi.io/tasks'
	time2TimeAgo = time2TimeAgo
	sortbyNewest:boolean = true
	filterPriority:string[] = []
	filterTag:string[] = []
	tasks:any = []
	isloading = false

	async setTasks() {
		this.isloading = true
		let filtered: Task[] = []
		await fetch(this.request)
			.then(res => res.json())
			.then(data => filtered = data)
			.then(data => console.log({filtered, db}))
			.catch(err => console.error(err))
		this.isloading = false
		// filtered = db
		filtered = filtered.filter(task => (!this.filterPriority.length) ? task : this.filterPriority.includes(task.priority))
		filtered = filtered.filter(task => (!this.filterTag.length) ? task : this.filterTag.some(tag => task.tags.includes(tag)))
		filtered = filtered.sort((a, b) => b.timestamp - a.timestamp)
		if (!this.sortbyNewest) filtered.reverse()
		this.tasks = filtered
	}

	setFilterPriority(node:any) {
		node.checked ? this.filterPriority.push(node.value) : this.filterPriority = this.filterPriority.filter(param => param != node.value)
		this.setTasks()
	}

	setFilterTag(node:any) {
		node.checked ? this.filterTag.push(node.value) : this.filterTag = this.filterTag.filter(param => param != node.value)
		this.setTasks()
	}

	setSort(byNewest:boolean) {
		this.sortbyNewest = byNewest
		this.setTasks()
	}

	ngOnInit(): void {
		this.setTasks()
	}
}
