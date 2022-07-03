import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core'
import { ActivatedRoute } from '@angular/router'


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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  @ViewChildren("inputTags", {  }) inputTags!: ElementRef
  @ViewChild("inputTitle", { static: true }) inputTitle!: ElementRef
  @ViewChild("inputPriority", { static: true }) inputPriority!: ElementRef
  @ViewChild("inputDescription", { static: true }) inputDescription!: ElementRef
  
  task: Task = {
    "id": 0,
    "tags": [],
    "title": '',
    "priority": '',
    "timestamp": 0,
    "completed": false,
    "description": ''
  }
  reqURL: string = 'http://localhost:4201/tasks'
	reqId: number = Number(this.route.snapshot.params['id'])

  prevTags: string[] = []
  prevTitle: string = ''
  prevPriority: string = ''
  prevDescription: string = ''

  async getData() {
    await fetch(`${this.reqURL}/${this.reqId}`)
      .then(res => res.json())
      .then(data => this.task = (true) ? data : {})
      .catch(err => console.error(err))
  }

  async submitData() {

    const newTags: string[] = []
    const newTitle: string = this.inputTitle.nativeElement.value
    const newPriority: string = ''
    const newDescription: string = this.inputDescription.nativeElement.value
    
    const method: string = isNaN(this.reqId) ? 'POST' : 'PATCH'
		const request: string = (method === "PATCH") ? `${this.reqURL}/${this.reqId}` : `${this.reqURL}`

    if (method === 'POST') {
      // await fetch(request, { 
      //   headers: { 'Content-type': 'application/json' },
      //   method: method,
      //   body: JSON.stringify({
      //     // "id": number,
      //     // "tags": string[],
      //     // "title": string,
      //     // "priority": string,
      //     "timestamp": Math.floor(new Date().getTime()/1000),
      //     // "completed": boolean,
      //     // "description": string,
      //   })
      // }).catch(err => console.error(err))
    }
    else if (method === 'PATCH') {

      await fetch(request, { 
      	headers: { 'Content-type': 'application/json' },
      	method: method,
      	body: JSON.stringify({
          // "tags": string[],
          "title": newTitle,
          // "priority": string,
          "description": newDescription,
      	})
      }).catch(err => console.error(err))
    }
    if (method === 'POST') alert('New task created successfully')
    if (method === 'PATCH') alert(`Task with id ${this.task.id} edited successfully`)
  }

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void { this.getData() }
}
