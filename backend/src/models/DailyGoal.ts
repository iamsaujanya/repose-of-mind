import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DailyGoalSchema = new Schema<IDailyGoal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
DailyGoalSchema.index({ userId: 1, date: -1 });

export default mongoose.model<IDailyGoal>('DailyGoal', DailyGoalSchema); 