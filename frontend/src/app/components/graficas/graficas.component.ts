import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReportesService } from '../../services/reportes/reportes.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


interface VideoData {
  video_info: {
    titulo: any;
    // Otras propiedades del objeto video_info
  };
  views: any;
  likes: any;
  // Otras propiedades del objeto video
}

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})



export class GraficasComponent implements OnInit {
  constructor(private reportesService: ReportesService) {}
  public chart: any;
  public likesChart: any;
  public menosVistosChart: any;

  videos : any  = {}
  videosLikes: any = {}
  menosVistos: any = {};
  videosMenosLikes: any = {};


  ngOnInit(): void {
   
    this.cargarVistasVideos();
    this.cargarLikesVideos();
    this.cargarMenosVistos();
    this.cargarMenosLikesVideos();
  }

  
//##############################WWWWWWWWWWWWWwWWWW Videos mas vistos##########################################

  cargarVistasVideos(): void {
    this.reportesService.obtenerMasVistos().subscribe((respuesta) => {
      this.videos = respuesta;
      console.log(this.videos);
      this.createChart();
    });
  }
  

  async imprimirReporteVistas(): Promise<void> {
    // Llamar a cargarVistasVideos y esperar a que se resuelva
    
    const videos = await this.videos.data;
  
    // Asegúrate de que videos es un arreglo válido antes de mapearlo
    if (Array.isArray(videos)) {
      // Crear el documento PDF utilizando los datos obtenidos
      const documentDefinition = {
        content: [
          { text: 'Reporte de los Videos Más Vistos', style: 'header' },
          { text: ' ', marginBottom: 20 }, // Espacio en blanco antes de la tabla
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto'],
              body: [
                [
                  { text: '#', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Título del Video', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Vistas', style: 'tableHeader', alignment: 'left', fillColor: '#dddddd' },
                ],
                ...(videos.map((video: any, index: any) => [
                  { text: (index + 1).toString(), style: 'cellDescription', alignment: 'center', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.video_info.titulo, style: 'cellDescription', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.views.toString(), style: 'cellDescription', alignment: 'left', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                ])),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
          },
          cellDescription: {
            fontSize: 10,
            lineHeight: 1.2,
          },
        },
      };
  
      // Crear el PDF y abrirlo
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.open();
    } else {
      console.error("La función cargarVistasVideos no devolvió un arreglo válido.");
    }
  }
  
  async imprimirReporteMenosLikes(): Promise<void> {
    // Llamar a cargarVistasVideos y esperar a que se resuelva
    
    const videos = await this.videosMenosLikes.data;
  
    // Asegúrate de que videos es un arreglo válido antes de mapearlo
    if (Array.isArray(videos)) {
      // Crear el documento PDF utilizando los datos obtenidos
      const documentDefinition = {
        content: [
          { text: 'Reporte de los Videos Más Vistos', style: 'header' },
          { text: ' ', marginBottom: 20 }, // Espacio en blanco antes de la tabla
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto'],
              body: [
                [
                  { text: '#', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Título del Video', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Vistas', style: 'tableHeader', alignment: 'left', fillColor: '#dddddd' },
                ],
                ...(videos.map((video: any, index: any) => [
                  { text: (index + 1).toString(), style: 'cellDescription', alignment: 'center', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.video_info.titulo, style: 'cellDescription', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.likes.toString(), style: 'cellDescription', alignment: 'left', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                ])),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
          },
          cellDescription: {
            fontSize: 10,
            lineHeight: 1.2,
          },
        },
      };
  
      // Crear el PDF y abrirlo
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.open();
    } else {
      console.error("La función cargarVistasVideos no devolvió un arreglo válido.");
    }
  }
  

  async imprimirReporteMenosVistas(): Promise<void> {
    // Llamar a cargarVistasVideos y esperar a que se resuelva
    
    const videos = await this.menosVistos.data;
  
    // Asegúrate de que videos es un arreglo válido antes de mapearlo
    if (Array.isArray(videos)) {
      // Crear el documento PDF utilizando los datos obtenidos
      const documentDefinition = {
        content: [
          { text: 'Reporte de los Videos Más Vistos', style: 'header' },
          { text: ' ', marginBottom: 20 }, // Espacio en blanco antes de la tabla
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto'],
              body: [
                [
                  { text: '#', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Título del Video', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Vistas', style: 'tableHeader', alignment: 'left', fillColor: '#dddddd' },
                ],
                ...(videos.map((video: any, index: any) => [
                  { text: (index + 1).toString(), style: 'cellDescription', alignment: 'center', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.video_info.titulo, style: 'cellDescription', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.views.toString(), style: 'cellDescription', alignment: 'left', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                ])),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
          },
          cellDescription: {
            fontSize: 10,
            lineHeight: 1.2,
          },
        },
      };
  
      // Crear el PDF y abrirlo
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.open();
    } else {
      console.error("La función cargarVistasVideos no devolvió un arreglo válido.");
    }
  }
  
  async imprimirReporteMasLikes(): Promise<void> {
    // Llamar a cargarVistasVideos y esperar a que se resuelva
    
    const videos = await this.videosLikes.data;
  
    // Asegúrate de que videos es un arreglo válido antes de mapearlo
    if (Array.isArray(videos)) {
      // Crear el documento PDF utilizando los datos obtenidos
      const documentDefinition = {
        content: [
          { text: 'Reporte de los Videos Más Vistos', style: 'header' },
          { text: ' ', marginBottom: 20 }, // Espacio en blanco antes de la tabla
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto'],
              body: [
                [
                  { text: '#', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Título del Video', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Vistas', style: 'tableHeader', alignment: 'left', fillColor: '#dddddd' },
                ],
                ...(videos.map((video: any, index: any) => [
                  { text: (index + 1).toString(), style: 'cellDescription', alignment: 'center', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.video_info.titulo, style: 'cellDescription', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                  { text: video.likes.toString(), style: 'cellDescription', alignment: 'left', fillColor: index % 2 === 0 ? '#f2f2f2' : null },
                ])),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
          },
          cellDescription: {
            fontSize: 10,
            lineHeight: 1.2,
          },
        },
      };
  
      // Crear el PDF y abrirlo
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.open();
    } else {
      console.error("La función cargarVistasVideos no devolvió un arreglo válido.");
    }
  }
  

  
  
  
  createChart(): void {
    try {
      // Verificar si this.videos.data está definido y no es nulo
      if (!this.videos || !this.videos.data) {
        throw new Error('No se han encontrado datos de video.');
      }
      
      // Obtener la información de los videos del arreglo de datos
      const videos = this.videos.data;
  
      // Verificar si hay al menos un video en los datos
      if (videos.length === 0) {
        throw new Error('No hay videos disponibles.');
      }
  
      // Crear un arreglo para almacenar las etiquetas de los videos (títulos)
      const labels: string[] = [];
      // Crear un arreglo para almacenar los datos de vistas de los videos
      const viewsData: number[] = [];
      // Crear un arreglo para almacenar los colores de las barras
      const barColors: string[] = [];
  
      // Recorrer los datos de los videos
      videos.forEach((video: VideoData, index: number) => { // Definir el tipo de video como VideoData
        // Verificar si hay información del video y número de vistas
        if (video && video.video_info && video.video_info.titulo && video.views !== undefined) {
          // Agregar el título del video como etiqueta
          labels.push(video.video_info.titulo);
          // Agregar el número de vistas como dato
          viewsData.push(video.views);
          // Asignar un color diferente a cada barra del gráfico
          const color = this.getRandomColor(); // Obtener un color aleatorio
          barColors.push(color);
        } else {
          console.error('Los datos del video son inválidos:', video);
        }
      });
  
      // Verificar si hay al menos una etiqueta y un dato de vista
      if (labels.length === 0 || viewsData.length === 0) {
        throw new Error('No se encontraron datos válidos de video para generar el gráfico.');
      }
  
      // Crear el gráfico utilizando los datos obtenidos
      this.chart = new Chart('MyChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: viewsData,
              backgroundColor: barColors // Asignar los colores de las barras
            }
          ]
        },
        options: {
          aspectRatio: 3,
          plugins: {
            legend: {
              position: 'right' // Coloca la leyenda a la derecha
            }
          }
        }
      });
      
      
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
      // Aquí puedes manejar el error de la manera que desees, como mostrar un mensaje al usuario o realizar otras acciones.
    }
  }

  downloadPDF(): void {
    // Obtener el elemento canvas
    const canvas = document.getElementById('MyChart') as HTMLCanvasElement;

    // Crear un objeto jspdf
    const pdf = new jspdf.jsPDF();

    // Obtener la imagen del canvas como datos URI
    const imgData = canvas.toDataURL('image/png');

    // Configurar las dimensiones del PDF
    const imgWidth = 100;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Agregar la imagen al PDF
    pdf.addImage(imgData, 'PNG', 50, 50, imgWidth, imgHeight);

    // Guardar el PDF
    pdf.save('grafica.pdf');
  }



  //##############################33############# Videos menos vistos #######################################
  createMenosVistoChart(): void {
    try {
      // Verificar si this.videos.data está definido y no es nulo
      if (!this.menosVistos || !this.menosVistos.data) {
        throw new Error('No se han encontrado datos de video.');
      }
      
      // Obtener la información de los menosVistos del arreglo de datos
      const menosVistos = this.menosVistos.data;
  
      // Verificar si hay al menos un video en los datos
      if (menosVistos.length === 0) {
        throw new Error('No hay videos disponibles.');
      }
  
      // Crear un arreglo para almacenar las etiquetas de los videos (títulos)
      const labels: string[] = [];
      // Crear un arreglo para almacenar los datos de vistas de los videos
      const viewsData: number[] = [];
      // Crear un arreglo para almacenar los colores de las barras
      const barColors: string[] = [];
  
      // Recorrer los datos de los videos
      menosVistos.forEach((video: VideoData, index: number) => { // Definir el tipo de video como VideoData
        // Verificar si hay información del video y número de vistas
        if (video && video.video_info && video.video_info.titulo && video.views !== undefined) {
          // Agregar el título del video como etiqueta
          labels.push(video.video_info.titulo);
          // Agregar el número de vistas como dato
          viewsData.push(video.views);
          // Asignar un color diferente a cada barra del gráfico
          const color = this.getRandomColor(); // Obtener un color aleatorio
          barColors.push(color);
        } else {
          console.error('Los datos del video son inválidos:', video);
        }
      });
  
      // Verificar si hay al menos una etiqueta y un dato de vista
      if (labels.length === 0 || viewsData.length === 0) {
        throw new Error('No se encontraron datos válidos de video para generar el gráfico.');
      }
  
      // Crear el gráfico utilizando los datos obtenidos
      this.menosVistosChart = new Chart('menosVistosChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: viewsData,
              backgroundColor: barColors // Asignar los colores de las barras
            }
          ]
        },
        options: {
          aspectRatio: 3,
          plugins: {
            legend: {
              position: 'right' // Coloca la leyenda a la derecha
            }
          }
        }
      });
      
      
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
      // Aquí puedes manejar el error de la manera que desees, como mostrar un mensaje al usuario o realizar otras acciones.
    }
  }

  downloadMenosVistosPDF(): void {
    // Obtener el elemento canvas
    const canvas = document.getElementById('MenosVistosChart') as HTMLCanvasElement;

    // Crear un objeto jspdf
    const pdf = new jspdf.jsPDF();

    // Obtener la imagen del canvas como datos URI
    const imgData = canvas.toDataURL('image/png');

    // Configurar las dimensiones del PDF
    const imgWidth = 208;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Agregar la imagen al PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Guardar el PDF
    pdf.save('grafica.pdf');
  }

  cargarMenosVistos(): void {
    this.reportesService.obtenerMenosVistos().subscribe((respuesta) => {
      this.menosVistos = respuesta;
      console.log(this.videosLikes)
      this.createMenosVistoChart();
    });
  }

//##############################WWWWWWWWWWWWWwWWWW Videos mas likesv##########################################

cargarLikesVideos(): void {
  this.reportesService.obtenerMasLikes().subscribe((respuesta) => {
    this.videosLikes = respuesta;
    console.log(this.videosLikes)
    this.chartLikes();
  });
}


  chartLikes(): void {
    try {
      // Verificar si this.videos.data está definido y no es nulo
      if (!this.videosLikes || !this.videosLikes.data) {
        throw new Error('No se han encontrado datos de video.');
      }
      
      // Obtener la información de los videos del arreglo de datos
      const videos = this.videosLikes.data;
  
      // Verificar si hay al menos un video en los datos
      if (videos.length === 0) {
        throw new Error('No hay videos disponibles.');
      }
  
      // Crear un arreglo para almacenar las etiquetas de los videos (títulos)
      const labels: string[] = [];
      // Crear un arreglo para almacenar los datos de vistas de los videos
      const likesData: number[] = [];
      // Crear un arreglo para almacenar los colores de las barras
      const barColors: string[] = [];
  
      // Recorrer los datos de los videos
      videos.forEach((video: VideoData, index: number) => { // Definir el tipo de video como VideoData
        // Verificar si hay información del video y número de vistas
        if (video && video.video_info && video.video_info.titulo && video.likes !== undefined) {
          // Agregar el título del video como etiqueta
          labels.push(video.video_info.titulo);
          // Agregar el número de vistas como dato
          likesData.push(video.likes);
          // Asignar un color diferente a cada barra del gráfico
          const color = this.getRandomColor(); // Obtener un color aleatorio
          barColors.push(color);
        } else {
          console.error('Los datos del video son inválidos:', video);
        }
      });
  
      // Verificar si hay al menos una etiqueta y un dato de vista
      if (labels.length === 0 || likesData.length === 0) {
        throw new Error('No se encontraron datos válidos de video para generar el gráfico.');
      }
  
      // Crear el gráfico utilizando los datos obtenidos
      this.likesChart = new Chart('likesChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: likesData,
              backgroundColor: barColors // Asignar los colores de las barras
            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
      // Aquí puedes manejar el error de la manera que desees, como mostrar un mensaje al usuario o realizar otras acciones.
    }
  }

  downloadLikesPDF(): void {
    // Obtener el elemento div que contiene la tabla y el gráfico
    const div = document.getElementById('likesReporte');

    // Verificar si el elemento existe antes de continuar
    if (div !== null) {
        // Obtener las dimensiones del div
        const width = div.offsetWidth;
        const height = div.offsetHeight;

        // Crear un objeto jspdf
        const pdf = new jspdf.jsPDF('p', 'pt', [width, height]);

        // Convertir el div a una imagen
        html2canvas(div).then((canvas) => {
            // Obtener la imagen del canvas como datos URI
            const imgData = canvas.toDataURL('image/png');

            // Agregar la imagen al PDF
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);

            // Guardar el PDF
            pdf.save('likesReporte.pdf');
        });
    } else {
        console.error('El elemento div no fue encontrado en el DOM.');
    }
}


//##############################WWWWWWWWWWWWWwWWWW Videos mas likesv##########################################

cargarMenosLikesVideos(): void {
  this.reportesService.obtenerMenosLikes().subscribe((respuesta) => {
    this.videosMenosLikes = respuesta;
    this.chartMenosLikes();
  });
}


  chartMenosLikes(): void {
    try {
      // Verificar si this.videos.data está definido y no es nulo
      if (!this.videosMenosLikes || !this.videosMenosLikes.data) {
        throw new Error('No se han encontrado datos de video.');
      }
      
      // Obtener la información de los videos del arreglo de datos
      const videos = this.videosMenosLikes.data;
  
      // Verificar si hay al menos un video en los datos
      if (videos.length === 0) {
        throw new Error('No hay videos disponibles.');
      }
  
      // Crear un arreglo para almacenar las etiquetas de los videos (títulos)
      const labels: string[] = [];
      // Crear un arreglo para almacenar los datos de vistas de los videos
      const likesData: number[] = [];
      // Crear un arreglo para almacenar los colores de las barras
      const barColors: string[] = [];
  
      // Recorrer los datos de los videos
      videos.forEach((video: VideoData, index: number) => { // Definir el tipo de video como VideoData
        // Verificar si hay información del video y número de vistas
        if (video && video.video_info && video.video_info.titulo && video.likes !== undefined) {
          // Agregar el título del video como etiqueta
          labels.push(video.video_info.titulo);
          // Agregar el número de vistas como dato
          likesData.push(video.likes);
          // Asignar un color diferente a cada barra del gráfico
          const color = this.getRandomColor(); // Obtener un color aleatorio
          barColors.push(color);
        } else {
          console.error('Los datos del video son inválidos:', video);
        }
      });
  
      // Verificar si hay al menos una etiqueta y un dato de vista
      if (labels.length === 0 || likesData.length === 0) {
        throw new Error('No se encontraron datos válidos de video para generar el gráfico.');
      }
  
      // Crear el gráfico utilizando los datos obtenidos
      this.likesChart = new Chart('MenoslikesGrafica', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: likesData,
              backgroundColor: barColors // Asignar los colores de las barras
            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
      // Aquí puedes manejar el error de la manera que desees, como mostrar un mensaje al usuario o realizar otras acciones.
    }
  }

  downloadMenosLikesPDF(): void {
    // Obtener el elemento div que contiene la tabla y el gráfico
    const div = document.getElementById('likesReporte');

    // Verificar si el elemento existe antes de continuar
    if (div !== null) {
        // Obtener las dimensiones del div
        const width = div.offsetWidth;
        const height = div.offsetHeight;

        // Crear un objeto jspdf
        const pdf = new jspdf.jsPDF('p', 'pt', [width, height]);

        // Convertir el div a una imagen
        html2canvas(div).then((canvas) => {
            // Obtener la imagen del canvas como datos URI
            const imgData = canvas.toDataURL('image/png');

            // Agregar la imagen al PDF
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);

            // Guardar el PDF
            pdf.save('likesReporte.pdf');
        });
    } else {
        console.error('El elemento div no fue encontrado en el DOM.');
    }
}



  // Función para obtener un color aleatorio
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  
  
  
  
}
