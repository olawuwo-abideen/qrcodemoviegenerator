import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateMovieDto {

@ApiProperty({
required: true,
description: 'The movie title',
example: 'Avatar',
})
@IsString()
@IsNotEmpty()
title: string;

@ApiProperty({
required: true,
description: 'The image url',
example: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg',
})
@IsString()
@IsNotEmpty()
@IsUrl()
image: string;
}



export class UpdateMovieDto {
@ApiProperty({
required: true,
description: 'The movie title',
example: 'The Avengers',
})
@IsString()
@IsOptional()
title?: string;

@ApiProperty({
required: true,
description: 'The image url',
example: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
})
@IsString()
@IsOptional()
@IsUrl()
image?: string;
}
