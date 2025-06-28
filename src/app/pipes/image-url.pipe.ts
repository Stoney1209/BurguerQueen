import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(img?: string): string {
    if(img){
      return `${environment.urlServerImages}/${img}`;
    }
    return '';
  }

}
