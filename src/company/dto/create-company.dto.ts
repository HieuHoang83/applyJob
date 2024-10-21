import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
export class CreateCompanyDto {
    @IsNotEmpty()
    name            :string;
    @IsNotEmpty()
    businessLicense :string;
    @IsNotEmpty()
    industry        :string;
    @IsNotEmpty()
    size            :string;
    @IsNotEmpty()
    address         :string;
}
