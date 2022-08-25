import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform{

    transform(value: any, arg: any): any {
        if(arg === '' || arg.length < 1 || arg === undefined) return value;
        const resultPost = [];
        for(const user of value){
            if(user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
                   resultPost.push(user);
            }
        }
        return resultPost;
    }
}
