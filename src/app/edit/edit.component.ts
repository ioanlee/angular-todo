import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
// import database from '../../server/db.json'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  task: any = {}
  id = Number(this.route.snapshot.params['id']) || NaN

  async getData() {
    await fetch(`http://localhost:4201/tasks?&id=${this.id}`)
      .then(res => res.json())
      .then(data => this.task = (true) ? data[0] : {})
      .catch(err => console.error(err))
  }  

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void { this.getData() }
}
