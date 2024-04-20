import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-videos',
  templateUrl: './mis-videos.component.html',
  styleUrl: './mis-videos.component.css'
})
export class MisVideosComponent {
  formVideo: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private videoService: VideosService,
    private router: Router
  ) {
    // Agregar los roles al formulario
    const formValues = {
      titulo: [''],
      descripcion: [''],
      url: [''],
      miniatura:[]
    };
    this.formVideo = this.formulario.group(formValues);
  }  


  saveVideo(): any {
    const id = localStorage.getItem('id');

    this.formVideo.patchValue({
      estado: 1,
      fk_user: id // Aquí asignamos el valor 1 al campo roles
    }); 
    console.log(this.formVideo.value);
    this.videoService.storeVideo(this.formVideo.value).subscribe();
    this.router.navigateByUrl('/sign-up');
  }

  ngOnInit(): void {
  }   
}