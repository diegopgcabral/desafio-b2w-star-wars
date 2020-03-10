import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    climate: {
      type: String,
      required: true,
      trim: true,
    },
    terrain: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfMovies: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Planet', PlanetSchema);
