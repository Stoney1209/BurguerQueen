import { inject, Pipe, PipeTransform } from '@angular/core';
import { IProductExtra } from '../models/product-extra.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'extrasSelected'
})
export class ExtrasSelectedPipe implements PipeTransform {

  private translateService: TranslateService = inject(TranslateService);

  transform(extras: IProductExtra[]): string[] {
    const optionsSelected: string[] = [];
    
    for (const extra of extras) {
        // Buscamos la opcion seleccionada
        const optionSelected = extra.options.find(option => option.selected);

        if(optionSelected){

          // Segun el numero de opciones, lo mostraremos de una u otra forma
          if(extra.options.length == 1){
            optionsSelected.push(this.translateService.instant(extra.name));
          }else{
            optionsSelected.push(this.translateService.instant(extra.name) + ': ' + this.translateService.instant(optionSelected.name!));
          }

        }

    }

    return optionsSelected;
  }

}
