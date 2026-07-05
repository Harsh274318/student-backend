import mongoose from "mongoose";

const monthCalendarSchema = new mongoose.Schema({
  year: {
    type:     Number,
    required: [true, "year is missing"],
  },
  month: {
    type:     Number,
    required: [true, "month is missing"],
    min: 1,
    max: 12,
  },
  workingDays: {
    type:     Number,
    required: [true, "workingDays is missing"], 
  },

  days: [{
    dateOfDay: {
      type:     Number,   
      required: true,
    },
    weekday: {
      type:     String,
      enum:     ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    },
    type: {
      type: String,
      enum: [
        "working",
        "sunday",
        "holiday",
      ],
    },
    holidayName: {
      type:    String,
      default: null,   
    },
    isWorking: {
      type:    Boolean,
      default: true,
    },
  }],

  holidays: [{
    name: {
      type:     String,
      required: true,
    },
    date: {
      type:     Date,
      required: true,
    },
    endDate: {
      type:    Date,
      default: null,   
    },
    type: {
      type: String,
      enum: ["today", "range", "recurring"],
    },
    declaredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User",
    },
    declaredAt: {
      type:    Date,
      default: Date.now,
    },
  }],

  generatedAt: {
    type:    Date,
    default: Date.now,
  },

}, { timestamps: true })

monthCalendarSchema.index({ year: 1, month: 1 }, { unique: true })

const MonthCalendar = mongoose.model("MonthCalendar", monthCalendarSchema)
export default MonthCalendar