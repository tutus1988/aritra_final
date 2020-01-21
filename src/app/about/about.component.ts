import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  id: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getId();
  }
  getId(){
    this.id = localStorage.getItem("ID");
  }

  logout(){
    localStorage.removeItem("ID");
    this.router.navigate(['login']);
  }
}
