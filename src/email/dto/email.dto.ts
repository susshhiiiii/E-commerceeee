import { IsArray, IsOptional, IsString } from "class-validator"

export class EmailDto{

    @IsArray()
    recipeints: string[]

    @IsString()
    subject: string

    @IsOptional()
    text?:string
}