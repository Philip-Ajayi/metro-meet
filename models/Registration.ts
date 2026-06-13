import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  church: string;
  address: string; // city
  whatsapp: string;
  email: string;
  attended: boolean;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  church: {
    type: String,
    required: [true, 'Church name is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'City/Address is required'],
    trim: true,
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  attended: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Registration || model<IRegistration>('Registration', RegistrationSchema);
