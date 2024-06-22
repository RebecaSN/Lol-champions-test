import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(items: any[], searchTxt: string, key: string): any[] {
  //   // console.log('LOG || SearchPipe || transform || items:', items);

  //   // console.log('LOG || SearchPipe || transform || searchTxt:', searchTxt);

  //   // console.log('LOG || SearchPipe || transform || key:', key);

  //   if (!items || !items.length) return items;
  //   if (!searchTxt || !searchTxt.length) return items;

  //   // console.log('LOG || SearchPipe || transform || return items.filter(item => { return item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;}):', items.filter(item => { return item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 }));

  //   return items.filter(item => {
  //     console.log('LOG || SearchPipe || transform || item:', item[key]);
  //     console.log(item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()))
  //     return item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
  //   });
  // }

  transform(items: any[], searchTxt: string, key: string[]): any[] {
    if (!items || !items.length) return items;
    if (!searchTxt || !searchTxt.length) return items;

    return items.filter(item => {
      return Object.values(key).find(f => {
        if (item[f].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
}
