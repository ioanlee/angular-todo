import { Component, Input, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { db, convertTimestamp } from '../globals';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

	convertTimestamp = convertTimestamp
	sortbyNewest:boolean = true
	filterPriority:string[] = []
	filterTag:string[] = []
	tasks:any = []

	setTasks() {
		let filtered = db
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
