import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  videos : any  = {}
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos(): void {

    const userId = localStorage.getItem('userId'); 
    if(userId){
      this.userService.getHistoryByUserId(userId).subscribe((respuesta) => {
        console.log(respuesta); 
        this.videos = respuesta;
      });
    }

  }

}
