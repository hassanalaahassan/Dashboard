import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgName'
})
export class ImgNamePipe implements PipeTransform {

  transform( users: any[], term: string ): any[] {
    return users.filter( user=> user.username.toLowerCase().includes(term.toLowerCase()) )
    }

}
