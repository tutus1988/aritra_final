import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  totaldata: string;
  
 
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
   this.getData();
  }
  getData(){
    this.userService.currentMessage.subscribe(data => {
      console.log('Data Coming.....',data);
      this.totaldata = JSON.parse(data)
    })
  }
}
