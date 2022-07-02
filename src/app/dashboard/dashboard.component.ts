import { Component, Input, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { db, time2TimeAgo } from '../globals'

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
	isloading = false
	tasks: Task[] = []
	tasksToRender: Task[] = []
	filteredTasks: Task[] = []
	filterTag:string[] = []
	filterPriority:string[] = []
	sortbyNewest:boolean = true

	amountToRender = 5
	fromTask = 0
	toTask = this.amountToRender

	async getTasks() {
		this.isloading = true
		await fetch(this.request)
			.then(res => res.json())
			.then(data => this.tasks = data)
			.catch(err => console.error(err))
		this.isloading = false
		this.updateList()
	}

	async loadMore() {
		// this.tasksToRender.push(this.filteredTasks.shift)
		this.tasksToRender = []
		for (let i = 0; i > 2; i++) this.tasksToRender.push(this.filteredTasks[i])
		
		// this.tasksToRender.length += this.amountToRender
		// this.toTask += this.amountToRender
	}

	updateList() {
		// у данного api не было возможности запроса промежутка,
		// поэтому имплементирована визуальная симуляция подгрузки
		scrollTo(0,0)
		this.fromTask = 0
		this.toTask = this.amountToRender
		this.isloading = true
		this.filteredTasks = this.tasks
		this.filteredTasks = this.filteredTasks.filter(task => (!this.filterPriority.length) ? task : this.filterPriority.includes(task.priority))
		this.filteredTasks = this.filteredTasks.filter(task => (!this.filterTag.length) ? task : this.filterTag.some(tag => task.tags.includes(tag)))
		this.filteredTasks = this.filteredTasks.sort((a, b) => b.timestamp - a.timestamp)
		if (!this.sortbyNewest) this.filteredTasks.reverse()
		setTimeout(() => this.isloading = false ,800)
		
		this.tasksToRender = this.filteredTasks
	}

	setFilterPriority(node:any) {
		node.checked ? this.filterPriority.push(node.value) : this.filterPriority = this.filterPriority.filter(param => param != node.value)
		this.updateList()
	}

	setFilterTag(node:any) {
		node.checked ? this.filterTag.push(node.value) : this.filterTag = this.filterTag.filter(param => param != node.value)
		this.updateList()
	}

	setSort(byNewest:boolean) {
		this.sortbyNewest = byNewest
		this.updateList()
	}

	ngOnInit(): void {
		this.getTasks()
	}
}
