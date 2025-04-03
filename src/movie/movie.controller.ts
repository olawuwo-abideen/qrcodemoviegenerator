import {
Controller,
Get,
Post,
Body,
Patch,
Param,
Delete,
HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
constructor(private readonly movieService: MovieService) {}

@Post()
@ApiOperation({ summary: 'Create Movie' })
@ApiResponse({
status: HttpStatus.CREATED,
description:
'Movie created successfully',
})
create(@Body() createMovieDto: CreateMovieDto) {
return this.movieService.create(createMovieDto);
}

@Get()
@ApiOperation({ summary: 'Get all movies' })
@ApiResponse({
status: HttpStatus.OK,
description:
'Movies retrieved successfully.',
})
findAll() {
return this.movieService.findAll();
}


}

