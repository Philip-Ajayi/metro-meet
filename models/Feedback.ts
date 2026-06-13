import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IFeedback extends Document {
  name?: string;
  email?: string;
  message: string;
  rating?: number;
  anonymous: boolean;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Feedback || model<IFeedback>('Feedback', FeedbackSchema);
