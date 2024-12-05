import { from, interval } from 'rxjs';
import { map, filter, switchMap, mergeMap, concatMap, take } from 'rxjs/operators';
import axios from 'axios';

//Exercise 1
interface Car {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

interface Scrap{
    brand:string;
    yearOfRelease:number;
}

const cars: Car[] = [
  { name: "Sedan", model: "Model S", yearOfRelease: 1995, brand: "Tesla", color: "Black" },
  { name: "Coupe", model: "Model X", yearOfRelease: 1990, brand: "BMW", color: "Black" },
  { name: "Convertible", model: "Model Z", yearOfRelease: 1998, brand: "Toyota", color: "Black" },
  { name: "SUV", model: "Model Y", yearOfRelease: 1997, brand: "Audi", color: "Black" },
  { name: "Hatchback", model: "Model 3", yearOfRelease: 1995, brand: "Ford", color: "Black" },
  { name: "Sedan", model: "Model S", yearOfRelease: 2000, brand: "Tesla", color: "Red" },
  { name: "Coupe", model: "Model X", yearOfRelease: 2010, brand: "BMW", color: "White" },
  { name: "Convertible", model: "Model Z", yearOfRelease: 2015, brand: "Toyota", color: "Silver" },
  { name: "SUV", model: "Model Y", yearOfRelease: 2020, brand: "Audi", color: "Blue" },
  { name: "Hatchback", model: "Model 3", yearOfRelease: 2005, brand: "Ford", color: "Red" }
];


function getRandomCar(): Car {
  const randomIndex = Math.floor(Math.random() * cars.length);
  return cars[randomIndex];
}

//Exercise 2
const observable1 = interval(1000).pipe(map(() => getRandomCar()));
observable1.subscribe(car => console.log('Car emitted:', car));


//Exercise 3
const observable2 = observable1.pipe(
  filter(car => car.color === "Black" && car.yearOfRelease < 2000)
);
observable2.subscribe(car => console.log("Filtered car:", car));

//Exercise 4
const observable3=observable2.pipe(map(car=>{
    return {brand:car.brand,
        yearOfRelease:car.yearOfRelease,
    } as Scrap
}));
observable3.subscribe(scrap=>console.log(scrap));


//Exercise 5

const BASE_URL = "https://random-data-api.com/api/v2/banks";

function getData() {
    return from(axios.get(BASE_URL)
        .then(response => response.data))
}

const observable4=interval(1000).pipe(
    switchMap(()=>{
        return getData();
    })
);
observable4.subscribe({
    next:(data)=>console.log('API Response',data),
    error:(err)=>console.log(err),
});

//Exercise 6


const observable5 = interval(100).pipe(
    concatMap(() => getData()
    )
);
observable5.subscribe({
    next:(data)=>console.log('API Response',data),
        error:(err)=>console.log(err),
})


//Exercise 7

const observable6=interval(50).pipe(
    mergeMap(()=>getData()),
    take(5)
);
observable6.subscribe({
    next:((data)=>console.log(data)),
    error:(err)=>console.log(err),
})

