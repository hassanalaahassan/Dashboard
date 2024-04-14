import { Pipe, PipeTransform } from '@angular/core';
import { Tasks } from '../interface/tasks';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform( tasks: Tasks[], term: string ): Tasks[] {
  return tasks.filter( task=> task.title.toLowerCase().includes(term.toLowerCase()) )
  }

}
