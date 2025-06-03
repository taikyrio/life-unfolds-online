
import { Character } from '../types/game';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'work' | 'education' | 'social' | 'health' | 'entertainment' | 'family';
  priority: 'low' | 'medium' | 'high' | 'critical';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    endDate?: Date;
  };
  reminder?: number; // minutes before event
  location?: string;
  participants?: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'missed';
}

export interface TimeSlot {
  startHour: number;
  endHour: number;
  available: boolean;
  bookedEvent?: string;
}

export interface DailySchedule {
  date: string;
  timeSlots: TimeSlot[];
  events: CalendarEvent[];
  energyLevel: number;
  stressLevel: number;
  productivity: number;
}

export interface Season {
  name: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  months: number[];
  effects: {
    mood: number;
    health: number;
    activities: string[];
  };
}

export interface Holiday {
  id: string;
  name: string;
  date: { month: number; day: number };
  type: 'national' | 'religious' | 'cultural' | 'personal';
  effects: {
    happiness: number;
    timeOff: boolean;
    activities: string[];
  };
  description: string;
}

export class TimeManager {
  private static instance: TimeManager;
  private currentDate: Date;
  private schedule: Map<string, DailySchedule> = new Map();
  private events: CalendarEvent[] = [];

  static getInstance(): TimeManager {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }
    return TimeManager.instance;
  }

  constructor() {
    this.currentDate = new Date();
  }

  scheduleEvent(event: CalendarEvent): boolean {
    const dateKey = this.getDateKey(event.startTime);
    const dailySchedule = this.getOrCreateDailySchedule(dateKey);

    // Check for conflicts
    if (this.hasConflict(event, dailySchedule)) {
      return false;
    }

    // Add event to schedule
    dailySchedule.events.push(event);
    this.events.push(event);

    // Block time slots
    const startHour = event.startTime.getHours();
    const endHour = event.endTime.getHours();
    
    for (let hour = startHour; hour < endHour; hour++) {
      const slot = dailySchedule.timeSlots.find(s => s.startHour === hour);
      if (slot) {
        slot.available = false;
        slot.bookedEvent = event.id;
      }
    }

    return true;
  }

  private hasConflict(newEvent: CalendarEvent, schedule: DailySchedule): boolean {
    return schedule.events.some(existingEvent => {
      const newStart = newEvent.startTime.getTime();
      const newEnd = newEvent.endTime.getTime();
      const existingStart = existingEvent.startTime.getTime();
      const existingEnd = existingEvent.endTime.getTime();

      return (newStart < existingEnd && newEnd > existingStart);
    });
  }

  private getOrCreateDailySchedule(dateKey: string): DailySchedule {
    if (!this.schedule.has(dateKey)) {
      this.schedule.set(dateKey, this.createEmptyDailySchedule(dateKey));
    }
    return this.schedule.get(dateKey)!;
  }

  private createEmptyDailySchedule(dateKey: string): DailySchedule {
    const timeSlots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push({
        startHour: hour,
        endHour: hour + 1,
        available: hour >= 6 && hour <= 22, // Available hours 6 AM to 10 PM
        bookedEvent: undefined
      });
    }

    return {
      date: dateKey,
      timeSlots,
      events: [],
      energyLevel: 100,
      stressLevel: 0,
      productivity: 100
    };
  }

  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getCurrentSeason(): Season {
    const month = this.currentDate.getMonth() + 1;
    return seasons.find(season => season.months.includes(month)) || seasons[0];
  }

  getUpcomingHolidays(days: number = 30): Holiday[] {
    const currentMonth = this.currentDate.getMonth() + 1;
    const currentDay = this.currentDate.getDate();

    return holidays.filter(holiday => {
      if (holiday.date.month === currentMonth) {
        return holiday.date.day >= currentDay;
      }
      return holiday.date.month > currentMonth || 
             (holiday.date.month < currentMonth && holiday.date.month <= currentMonth + 1);
    });
  }

  getAvailableTimeSlots(date: Date, duration: number): TimeSlot[] {
    const dateKey = this.getDateKey(date);
    const schedule = this.getOrCreateDailySchedule(dateKey);
    const availableSlots: TimeSlot[] = [];

    for (let i = 0; i <= schedule.timeSlots.length - duration; i++) {
      const consecutiveSlots = schedule.timeSlots.slice(i, i + duration);
      if (consecutiveSlots.every(slot => slot.available)) {
        availableSlots.push({
          startHour: consecutiveSlots[0].startHour,
          endHour: consecutiveSlots[consecutiveSlots.length - 1].endHour,
          available: true
        });
      }
    }

    return availableSlots;
  }

  processTimeEffects(character: Character): void {
    const currentSeason = this.getCurrentSeason();
    const dateKey = this.getDateKey(this.currentDate);
    const dailySchedule = this.getOrCreateDailySchedule(dateKey);

    // Apply seasonal effects
    character.happiness = Math.max(0, Math.min(100, character.happiness + currentSeason.effects.mood));
    character.health = Math.max(0, Math.min(100, character.health + currentSeason.effects.health));

    // Process daily schedule effects
    const busyHours = dailySchedule.events.length;
    if (busyHours > 8) {
      dailySchedule.stressLevel += 10;
      character.happiness -= 5;
    }

    // Check for holiday effects
    const today = { month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() };
    const todayHoliday = holidays.find(h => h.date.month === today.month && h.date.day === today.day);
    
    if (todayHoliday) {
      character.happiness += todayHoliday.effects.happiness;
    }
  }

  advanceTime(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    
    // Process recurring events
    this.processRecurringEvents();
    
    // Clean up old schedules (keep last 30 days)
    this.cleanupOldSchedules();
  }

  private processRecurringEvents(): void {
    this.events.forEach(event => {
      if (event.recurring && event.status === 'completed') {
        const nextEventDate = this.calculateNextOccurrence(event);
        if (nextEventDate) {
          const newEvent: CalendarEvent = {
            ...event,
            id: `${event.id}_${nextEventDate.getTime()}`,
            startTime: nextEventDate,
            endTime: new Date(nextEventDate.getTime() + (event.endTime.getTime() - event.startTime.getTime())),
            status: 'scheduled'
          };
          this.scheduleEvent(newEvent);
        }
      }
    });
  }

  private calculateNextOccurrence(event: CalendarEvent): Date | null {
    if (!event.recurring) return null;

    const nextDate = new Date(event.startTime);
    
    switch (event.recurring.frequency) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    if (event.recurring.endDate && nextDate > event.recurring.endDate) {
      return null;
    }

    return nextDate;
  }

  private cleanupOldSchedules(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffKey = this.getDateKey(thirtyDaysAgo);

    for (const [dateKey] of this.schedule) {
      if (dateKey < cutoffKey) {
        this.schedule.delete(dateKey);
      }
    }
  }

  getCurrentDate(): Date {
    return new Date(this.currentDate);
  }

  getDailySchedule(date?: Date): DailySchedule {
    const targetDate = date || this.currentDate;
    const dateKey = this.getDateKey(targetDate);
    return this.getOrCreateDailySchedule(dateKey);
  }

  getWeeklySchedule(startDate?: Date): DailySchedule[] {
    const start = startDate || this.currentDate;
    const weekSchedule: DailySchedule[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      weekSchedule.push(this.getDailySchedule(date));
    }

    return weekSchedule;
  }
}

export const seasons: Season[] = [
  {
    name: 'Spring',
    months: [3, 4, 5],
    effects: {
      mood: 5,
      health: 2,
      activities: ['gardening', 'hiking', 'picnic']
    }
  },
  {
    name: 'Summer',
    months: [6, 7, 8],
    effects: {
      mood: 8,
      health: 3,
      activities: ['swimming', 'beach', 'camping', 'festivals']
    }
  },
  {
    name: 'Fall',
    months: [9, 10, 11],
    effects: {
      mood: 2,
      health: -1,
      activities: ['apple_picking', 'halloween', 'thanksgiving']
    }
  },
  {
    name: 'Winter',
    months: [12, 1, 2],
    effects: {
      mood: -3,
      health: -2,
      activities: ['skiing', 'ice_skating', 'holiday_shopping']
    }
  }
];

export const holidays: Holiday[] = [
  {
    id: 'new_year',
    name: "New Year's Day",
    date: { month: 1, day: 1 },
    type: 'national',
    effects: {
      happiness: 20,
      timeOff: true,
      activities: ['party', 'resolutions', 'family_time']
    },
    description: 'Start the new year with celebration and resolutions'
  },
  {
    id: 'valentines',
    name: "Valentine's Day",
    date: { month: 2, day: 14 },
    type: 'cultural',
    effects: {
      happiness: 15,
      timeOff: false,
      activities: ['romantic_dinner', 'gifts', 'date']
    },
    description: 'Day of love and romance'
  },
  {
    id: 'independence',
    name: 'Independence Day',
    date: { month: 7, day: 4 },
    type: 'national',
    effects: {
      happiness: 25,
      timeOff: true,
      activities: ['fireworks', 'bbq', 'parade']
    },
    description: 'National celebration with fireworks and gatherings'
  },
  {
    id: 'halloween',
    name: 'Halloween',
    date: { month: 10, day: 31 },
    type: 'cultural',
    effects: {
      happiness: 18,
      timeOff: false,
      activities: ['trick_or_treat', 'costume_party', 'horror_movies']
    },
    description: 'Spooky fun with costumes and candy'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    date: { month: 12, day: 25 },
    type: 'religious',
    effects: {
      happiness: 30,
      timeOff: true,
      activities: ['gift_exchange', 'family_dinner', 'church']
    },
    description: 'Holiday of giving and family togetherness'
  }
];

export const timeManager = TimeManager.getInstance();
