import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './schemas/bookings.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../auth/schemas/client.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Query } from 'express-serve-static-core';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Types } from 'mongoose';


/* // example of creating a new booking 
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


/** 
 * UnavailableDateRange interface defines structure of an object 
 * representing a range  unavailable dates of unavailable dates. 
 * Props:`startDate` and `endDate`, (Date type) 
 * Used in `getUnavailableDates` method returning array of unavailable date ranges. 
*/
interface UnavailableDateRange {
  startDate: Date;
  endDate: Date;
}


@Injectable()
/**  
 * BookingsService class responsible handling bookings and interacting with the database.
 * Handles database operations related to bookings and interacts with the `Booking`/`Client` 
 * collections in the database using mongoose models.
 */
export class BookingsService {


/**
 * Constructor takes mongoose models and assigns them to class properties
 * @param bookingModel - `bookingModel` is a mongoose model for `Booking` schema. 
 * It performs database operations related to bookings.
 * @param clientModel - `clientModel` is a mongoose model for `Client` schema. 
 * It interacts with `Client` collection in the database.
 */
   constructor(
    @InjectModel(Booking.name)
    private bookingModel: mongoose.Model<Booking>,
    @InjectModel(Client.name)
    private clientModel: mongoose.Model<Client>,
  ) {}
  
  
/**
 * Function retrieves all bookings from the database 
 * and returns an array of`Booking` objects, 
 * Throws an error if the retrieval fails.
 * 
 * @returns Returns Promise that resolves to an array of `Booking` objects.
 */
 async findAll(): Promise<Booking[]> {
    // todo: add pagination funcationality breaking up content blocks into navigable pgs (finding bookings by emails or tags)  

    try {
      const bookings = await this.bookingModel.find();
      // checking booking
      // console.log('Getting all bookings:', JSON.stringify(bookings, null, 2));

      return bookings;
    } catch (error) {
      // console.error("Detailed Error:", error);
      console.error('Error fetching all bookings: ',error.message);
      throw new Error('Failed to fetch bookings');
    }
  }


/**
 * Function retrieves bookings from a model, 
 * extracts the start and end dates of each booking, 
 * logs unavailable dates, and returns them.
 * 
 * @returns an array of UnavailableDateRange objects.
 */
  async getUnavailableDates(): Promise<UnavailableDateRange[]> {
    const bookings = await this.bookingModel.find();

    /* extracting start and end dates of each booking */
    const unavailableDates: UnavailableDateRange[] = bookings.map(booking => {
      return {
        startDate: new Date(booking.bookingStartDate),
        endDate: new Date(booking.bookingEndDate),
      }
    });

    // logging unavailable dates
    console.log("Unavailable dates: ", unavailableDates)
    return unavailableDates;
  }


/**
 * Function retrieves bookings based on provided client ID.
 * 
 * @param {string} clientId - clientId represents unique identifier of client
 *                            Used to search for bookings associated with that client.
 * 
 * @returns Promise that resolves to an array of Booking objects.
 */
  async findBookingsByClient(clientId: string): Promise<Booking[]> {

    try {
      const bookings = await this.bookingModel.find({client: clientId});
      
      return bookings;
    } catch (error) {
      console.error('Error finding bookings by client: ', error.message);
      throw new Error('Failed to fetch bookings by client');
    }
  }

  
/**
 * Function creates new booking 
 * using provided booking/client information, 
 * then saves to database and returns created booking.
 * 
 * @param {CreateBookingDto} booking - booking `CreateBookingDto` object containing booking details
 *                                      props: `id`, `client`, `bookingStartDate`, `bookingEndDate`, `status`, and `notes`
 * @param {Client} client - `client` object that represents client making booking. 
 *                            props: `id` and `name`
 * 
 * @returns Promise that resolves to a Booking object.
 */
  async create(booking: CreateBookingDto, client: Client): Promise<Booking> {

    // console.log('Incoming booking object:', booking);
 
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
      // newBooking.attendees = booking.bookings[0].attendees; // implement later conatining attendees email addresses
      // newBooking.status = booking.status;  // implement later checking booking status

      await newBooking.save();
      console.log('New booking saved successfully');
      
      return newBooking;

    } catch (error) { 
      console.error('Error creating booking: ', error);
      throw new Error('Failed to create booking');
    }
  }


/**
 * Asynchronous function taking booking ID as input, 
 * validates the ID, checks if the booking exists, 
 * and returns booking if found.
 * 
 * @param {string} bookId - bookId represents the ID of booking.
 * 
 * @returns Promise that resolves to a Booking object.
 */
  async findBookingById(bookId: string): Promise<Booking> {

    try {

      // validating booking 
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      } 

      // checking booking 
      const booking = await this.bookingModel.findById(bookId);
      if (!booking) {
        throw new NotFoundException("Booking not found")
      }

      console.log("Booking found");
      return booking;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error fetching booking by ID: ', error.message);
        throw new Error('Failed to fetch booking');
      }
      throw error;
    }
  }


/**
 * Function updates booking in database 
 * using provided booking ID and data, 
 * and returns the updated booking.
 * 
 * @param {string} bookId - bookId represents ID of booking that needs to be updated.
 * @param {UpdateBookingDto} booking - booking `UpdateBookingDto` object containing updated booking information.
 * 
 * @returns a Promise that resolves to a Booking object.
 */
  async updateBookingById(bookId: string, booking: UpdateBookingDto): Promise<Booking> {

    try {

      // console.log("BookId and booking data:", bookId, booking);

      // validating booking 
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }

      // checking for booking 
      const bookingToUpdate = await this.bookingModel.findByIdAndUpdate(bookId, booking, {
        new: true, 
        runValidators: true 
      }).exec();
  
      if (!bookingToUpdate) {
        throw new NotFoundException("Booking not found")
      }
      
      console.log('Booking updated');
      return bookingToUpdate;
      
    } catch (error) {

      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error updating booking by ID: ', error.message);
        throw new Error('Failed to update booking');
      }
      throw error;
    }
  }


/**
 * Asynchronous function that deletes booking by ID,
 * performs validation checks, throwing appropriate exceptions if any,
 * 
 * @param {string} bookId - bookId represents the ID of the booking that needs to be deleted. 
 * 
 * @returns Promise that resolves to a Booking object.
 */
  async deleteBookingById(bookId: string): Promise<Booking> {

    try {

      // validating booking 
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }
  
      // deleting booking 
      const deletedBooking = await this.bookingModel.findByIdAndDelete(bookId);
      if (!deletedBooking) {
        throw new NotFoundException("Booking not found");
      }

      console.log("Booking deleted")
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
