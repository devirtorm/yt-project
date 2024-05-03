
import { initFlowbite } from 'flowbite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-app';
  isAdmin: boolean;

  constructor() {
    this.isAdmin = false; // Asigna un valor predeterminado
  }

  ngOnInit(): void {
    this.isAdmin = this.checkIsAdmin();
    initFlowbite();
  }

  checkIsAdmin(): boolean {
    const userRole = localStorage.getItem('rol');
    return userRole === '3';
  }
}

