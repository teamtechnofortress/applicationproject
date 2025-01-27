import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
