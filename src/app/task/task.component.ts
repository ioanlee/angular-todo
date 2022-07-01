import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { convertTimestamp } from '../globals'
import database from '../db.json'

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

	convertTimestamp = convertTimestamp
  db: Task[] = database
  id = Number(this.route.snapshot.params['id'])
  task: any = this.db.find(t => t.id === this.id)

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {}

}
