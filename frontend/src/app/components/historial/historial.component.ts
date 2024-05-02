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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? 'hace 1 año' : `hace ${years} años`;
    } else if (months > 0) {
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    } else if (days > 0) {
      return days === 1 ? 'hace 1 día' : `hace ${days} días`;
    } else if (hours > 0) {
      return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
    } else {
      return seconds === 1 ? 'hace 1 segundo' : `hace ${seconds} segundos`;
    }
  }

}
