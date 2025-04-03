import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
constructor(private readonly databaseService: DatabaseService) {}

async create(createMovieDto: CreateMovieDto) {
const movie = await this.databaseService.movie.create({ data: createMovieDto });

return {
success: true,
message: 'Movie created successfully.',
data: movie
};
}

async findAll() {
const movies = await this.databaseService.movie.findMany({});

return {
success: true,
message: 'Movies retrieved successfully.',
data: movies
};
}


}
