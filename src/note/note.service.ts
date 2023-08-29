import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note> {
    return this.noteRepository.findOne({ where: { id } });
  }

  async create(createNoteInput: CreateNoteInput): Promise<Note> {
    const note = this.noteRepository.create(createNoteInput);
    return this.noteRepository.save(note);
  }

  async update(id: number, updateNoteInput: UpdateNoteInput) {
    const note = await this.findOne(id);
    this.noteRepository.merge(note, updateNoteInput);
    return this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
