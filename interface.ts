interface BookingFetch {
   id: string;
   _id: string;
   bookingDate: string;
   user: User[];
   dentist: Dentist[];
   createdAt: string;
   __v: number;
}

interface Booking {
   id: string;
   _id: string;
   bookingDate: string;
   user: string;
   dentist: string;
   createdAt: string;
   __v: number;
}

interface DentistFetch {
   id: string;
   _id: string;
   name: string;
   year_of_experience: number;
   area_of_expertise: string;
   bookings: Booking[];
   createdAt: string;
   __v: number;
}

interface Dentist {
   id: string;
   _id: string;
   name: string;
   year_of_experience: number;
   area_of_expertise: string;
   createdAt: string;
   __v: number;
}

interface UserFetch {
   name: string;
   email: string;
   tel: string;
   role: string;
}
interface User {
   id: string;
   _id: string;
   name: string;
   email: string;
   tel_number: string;
   role: string;
   __v: number;
}

interface Log {
   _id: string;
   user: UserFetch;
   booking: Booking;
   actionType: string;
   createdAt: string;
   __v: number;
}