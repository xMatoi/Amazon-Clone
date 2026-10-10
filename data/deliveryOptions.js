
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { priceToCents } from "../scripts/utility/price.js";


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];



export function deliveryDatePicker(index) {
  
        let today = deliveryOptions[index].deliveryDays;
        let newDate = dayjs().add(today, 'day');

        const dayOfTheWeek = newDate.day();

        if(dayOfTheWeek === 0){

          newDate = newDate.add(1, 'day');

        }else if (dayOfTheWeek === 6){
          newDate = newDate.add(2, 'day');
        }

    
  return newDate.format('dddd, MMMM D');
}



export function deliveryOptionPrice(index) {
  const price = deliveryOptions[index].priceCents === 0 ? 'FREE': `$${priceToCents(deliveryOptions[index].priceCents)} -`;
  return price;
}

export function arrivingDate(e) {
  const newDate = dayjs(e).format('MMMM D');
  return newDate;
}
