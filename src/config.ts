export const ALL_COLORS:string[] = ['blue', 'green', 'baige','white', 'black'];

export function getColorContrastModifer(colorName:string):string{
    switch(colorName){
        case ('white'): return 'green';
        case ('baige'): return 'green';
        default: return 'white';
    }
}

export function formatType(type:string, quantity:number):string{
    switch(type){
        case ('carbon'): return `${quantity}kgs of carbon`;
        case ('trees'): return `${quantity} trees`;
        case ('plastic bottles'): return `${quantity} plastic bottles`;
        default: return `${quantity}`;
    }
}

export function formatAction(action:string):string{
    switch(action){
        case ('collects'): return 'This product collects';
        case ('plants'): return 'This product plants';
        case ('offsets'): return 'This product offsets';
        default: return `This product does stuff`;
    }
}