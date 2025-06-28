import { Component, inject } from '@angular/core';
import { 
  IonContent, 
  LoadingController,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg
} from '@ionic/angular/standalone';
import { CategoriesService } from 'src/app/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    TranslatePipe,
    ImageUrlPipe
  ]
})
export class CategoriesPage {

  private categoriesService: CategoriesService = inject(CategoriesService);
  private loadingCtrl: LoadingController = inject(LoadingController);
  private translateService: TranslateService = inject(TranslateService);
  private router: Router = inject(Router);

  public categories: ICategory[] = [];

  async ionViewWillEnter() {
    this.loadData();
  }

  async loadData(){

    // Mostramos el mensaje de carga
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading')
    });

    loading.present();

    // Obtenemos las categorias
    this.categoriesService.getCategories().then( (categories: ICategory[]) => {
      this.categories = categories;
    }).finally(() => {
      loading.dismiss();
    })

    console.log(this.categories);

  }

  /**
   * Refrescamos las categorias
   * @param event 
   */
  refreshCategories(event: CustomEvent){
    this.loadData();
    (event.target as HTMLIonRefresherElement).complete();
  }

  /**
   * Vamos a la pagina de productos de una categoria
   * @param category 
   */
  goToProducts(category: ICategory){
    this.router.navigate(['products', category._id]);
  }

}
