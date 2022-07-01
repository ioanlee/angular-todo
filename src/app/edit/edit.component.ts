import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import database from '../db.json'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void { }

  db = database
  id = Number(this.route.snapshot.params['id']) || NaN
  task: any = this.db.find(t => t.id === this.id)
}
