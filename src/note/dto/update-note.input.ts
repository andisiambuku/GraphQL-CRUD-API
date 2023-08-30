import { CreateNoteInput } from './create-note.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;
}
