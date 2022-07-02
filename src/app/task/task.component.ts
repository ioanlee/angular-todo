import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { timestampToString } from '../globals'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  task: any = {}
  id = Number(this.route.snapshot.params['id'])
	convertTimestamp = timestampToString

  async getData() {
    await fetch(`http://localhost:4201/tasks?&id=${this.id}`)
      .then(res => res.json())
      .then(data => this.task = data[0])
      .catch(err => console.error(err))
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void { this.getData() }
}
