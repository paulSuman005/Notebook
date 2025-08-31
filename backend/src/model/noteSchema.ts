import { Schema, model } from 'mongoose';
import { INote } from '../utils/interface/modelInterfaces';

const noteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Note = model<INote>('Note', noteSchema);

export default Note;