import { Expose, Transform } from "class-transformer";
import { format } from "date-fns";

export class FileDto {

  @Expose()
  id!: number;


}