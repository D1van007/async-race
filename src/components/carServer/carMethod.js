class CarMethod {
  // eslint-disable-next-line class-methods-use-this
  randomValueFromData({ data }) {
    return data[Math.floor(Math.random() * data.length)];
  }
  randomColor() {
    const strColorHEX = 'abcdef0123456789';
    const arrCurentColor = [];
    for (let i = 0; i < 6; i += 1) {
      arrCurentColor.push(this.randomValueFromData({ data: strColorHEX }));
    }
    return `#${arrCurentColor.join('')}`;
  }
  randomCarName() {
    const arrCarBrand = [
      'Audi',
      'BMW',
      'Ford',
      'Honda',
      'Hyundai',
      'Kia',
      'Lada',
      'Lexus',
      'Mazda',
      'Mersedes',
      'Nissan',
      'Porche',
      'Toyota',
      'Tesla',
      'Volvo',
      'Volkswagen',
    ];
    const arrCarModel = [
      'A4',
      'A5',
      'A6',
      'A8',
      '3',
      '5',
      '6',
      '7',
      'MX5',
      '5',
      'Sorento',
      'GS',
      'CT200',
      'Jetta',
      'Passat',
      'Arteon',
      'Panamera',
      'Macan',
      'Model X',
      'SLK',
      'CLS',
      'GL',
      'Accord',
      'CHR',
      'RAV4',
      'Selica',
      'Camry',
      'V60',
      'V90',
    ];
    return `${this.randomValueFromData({ data: arrCarBrand })} ${this.randomValueFromData({ data: arrCarModel })}`;
  }
  newRandomCar() {
    const car = {
      name: this.randomCarName(),
      color: this.randomColor(),
    };
    return car;
  }
}
export const carMethod = new CarMethod();
