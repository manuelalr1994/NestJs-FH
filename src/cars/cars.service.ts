import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    //////////////// METODO GET (LISTAR) /////////////////

    findAll() {
        return this.cars; 
    }

    //////////////// METODO GET-ID (LISTAR ID) /////////////////

    findOneById( id: string ) {

        const car = this.cars.find( car => car.id === id );
        if (!car) throw new NotFoundException(`El carro con id '${id}' no se encuentra`);

        return car;
    }

    //////////////// METODO POST (CREAR) ////////////////////

    create( createCarDto: CreateCarDto ) {

        const car:Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( car );

        return car;

    }

    //////////// METODO PATCH (ACTUALIZAR) /////////////////

    update( id: string, updateCarDto: UpdateCarDto ) {

        let carDB = this.findOneById( id );

        if( updateCarDto.id && updateCarDto.id !== id )
        throw new BadRequestException(`El id del carro no es del cuerpo`)

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                carDB = { ...carDB, ...updateCarDto, id, }
                return carDB;
            }

            return car;
        })


        return carDB; // carro actualizado
    }

    /////////////// METODO DELETE (ELIMINAR) ///////////////////

    delete( id: string ) {
        const car = this.findOneById( id );
        this.cars = this.cars.filter( car => car.id !== id );
    }

}
