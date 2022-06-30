import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { db, convertTimestamp } from '../globals';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

	convertTimestamp = convertTimestamp
  id = Number(this.route.snapshot.params['id'])
  task:any = db.find(task => task.id == this.id)

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
