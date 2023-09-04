import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './schemas/bookings.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../auth/schemas/client.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Query } from 'express-serve-static-core';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingDetails } from './schemas/bookingDetails.schema';
import { Types } from 'mongoose';

/*
const newBookingData = {
  client: someClient,
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  company: 'Some Company',
  TypeOfSpaceNeeded: TypeOfSpaceNeeded.ROOMRENTAL,
  bookingsDetails: {
    bookingStartDate: new Date(),
    bookingStartTime: '10:00 AM',
    bookingEndDate: new Date(),
    bookingEndTime: '02:00 PM',
    attendees: 'john@example.com',
    reminder: true,
    bookingStatus: BookingStatus.CONFIRMED
  }
};
*/


interface UnavailableDateRange {
  startDate: Date;
  endDate: Date;
}


@Injectable()
export class BookingsService {
   /* creating constructor to inject our model for getting/using data from db */
   constructor(
    @InjectModel(Booking.name)
    private bookingModel: mongoose.Model<Booking>,
    @InjectModel(Client.name)
    private clientModel: mongoose.Model<Client>,
  ) {}

  
  async findAll(): Promise<Booking[]> {
    /* todo: add pagination funcationality(finding bookings by emails) breaking up content blocks into navigable pgs */
    try {
      const bookings = await this.bookingModel.find();
      console.log('Getting all bookings:', JSON.stringify(bookings, null, 2));
      return bookings;
    } catch (error) {
      // console.error("Detailed Error:", error);
      console.error('Error fetching all bookings: ', error.message);
      throw new Error('Failed to fetch bookings');
    }
  }


  async getUnavailableDates(): Promise<UnavailableDateRange[]> {
    const bookings = await this.bookingModel.find();
    /* extracting start and end dates of each booking */
    const unavailableDates: UnavailableDateRange[] = bookings.map(booking => {
      return {
        startDate: new Date(booking.bookingStartDate) ,
        endDate: new Date(booking.bookingEndDate),
      }
    });
    console.log(unavailableDates)
    return unavailableDates;
  }


  async create(booking: CreateBookingDto, client: Client): Promise<Booking> {

    console.log('Incoming booking object:', booking);
 
    try{
      // Convert client.id to ObjectId if it's a string (only if needed)
      const clientId = typeof client.id === 'string' ? new Types.ObjectId(client.id) : client.id;

      const newBooking = new this.bookingModel();
      newBooking.client = clientId;
      newBooking.clientName = client.name;
      newBooking.company = booking.company;
      newBooking.typeOfSpaceNeeded = booking.typeOfSpaceNeeded;
      newBooking.bookingStartDate = booking.bookingStartDate;
      newBooking.bookingEndDate = booking.bookingEndDate;
      newBooking.bookingStartTime = booking.bookingStartTime;
      newBooking.bookingEndTime = booking.bookingEndTime;
      newBooking.reminder = booking.reminder;
      // newBooking.attendees = booking.bookings[0].attendees; // implement later after frontend can send email reminders

      // console.log('Before Save:', JSON.stringify(newBooking, null, 2));
      await newBooking.save();
      console.log('New booking saved successfully:', newBooking);
      
      return newBooking;

    } catch (error) { 
      console.error('Error creating booking: ', error);
      throw new Error('Failed to create booking');
    }
  }


  async findBookingById(bookId: string): Promise<Booking> {
    try {
      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      } 
      /* checking for booking */
      const booking = await this.bookingModel.findById(bookId);
      if (!booking) {
        throw new NotFoundException("Booking not found")
      }
      console.log(booking);
      return booking;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error fetching booking by ID: ', error.message);
        throw new Error('Failed to fetch booking');
      }
      throw error;
    }
  }


  async findBookingsByClient(clientId: string): Promise<Booking[]> {
    try {
      const bookings = await this.bookingModel.find({client: clientId});
      return bookings;
    } catch (error) {
      console.error('Error finding bookings by client: ', error.message);
      throw new Error('Failed to fetch bookings by client');
    }
  }


  async updateBookingById(bookId: string, booking: UpdateBookingDto): Promise<Booking> {
    try {
      console.log("Received bookId:", bookId);
      console.log("Received booking data:", booking);

      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }
      /* checking for booking */
      const bookingToUpdate = await this.bookingModel.findByIdAndUpdate(bookId, booking, {
        new: true, 
        runValidators: true 
      }).exec();
  
      if (!bookingToUpdate) {
        throw new NotFoundException("Booking not found")
      }
      
      console.log('Updated Booking', bookingToUpdate);
      return bookingToUpdate;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error updating booking by ID: ', error.message);
        throw new Error('Failed to update booking');
      }
      throw error;
    }
  }


  async deleteBookingById(bookId: string): Promise<Booking> {
    try {
      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }
  
      const deletedBooking = await this.bookingModel.findByIdAndDelete(bookId);
      if (!deletedBooking) {
        throw new NotFoundException("Booking not found");
      }
      console.log(deletedBooking)
      return deletedBooking;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error deleting booking by ID: ', error.message);
        throw new Error('Failed to delete booking');
      }
      throw error;
    }
  }


}
