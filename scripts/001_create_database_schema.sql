-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'tourist' CHECK (role IN ('tourist', 'guide', 'restaurant')),
  is_guide BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tour guides table
CREATE TABLE IF NOT EXISTS public.tour_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  specialties TEXT[] NOT NULL DEFAULT '{}',
  experience_years INTEGER NOT NULL,
  bio TEXT,
  hourly_rate INTEGER NOT NULL,
  avatar_url TEXT,
  rating NUMERIC(3,2) DEFAULT 0,
  total_tours INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  address TEXT,
  phone TEXT,
  opening_hours TEXT,
  seating_style TEXT,
  group_size TEXT,
  busy_hours TEXT,
  signature_dish TEXT,
  signature_price NUMERIC(10,2),
  signature_description TEXT,
  menu_items JSONB DEFAULT '[]',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dishes/food items table
CREATE TABLE IF NOT EXISTS public.dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  category TEXT,
  images TEXT[] DEFAULT '{}',
  is_signature BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trips/playlists table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  cover_image TEXT,
  date DATE,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip dishes (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.trip_dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  dish_id UUID NOT NULL REFERENCES public.dishes(id) ON DELETE CASCADE,
  restaurant_name TEXT NOT NULL,
  notes TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, dish_id)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tourist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES public.tour_guides(id) ON DELETE CASCADE,
  tour_date DATE NOT NULL,
  tour_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  group_size INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  special_requests TEXT,
  extracted_info JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for tour_guides
CREATE POLICY "Anyone can view approved guides" ON public.tour_guides FOR SELECT USING (status = 'approved' OR user_id = auth.uid());
CREATE POLICY "Guides can update own profile" ON public.tour_guides FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Guides can insert own profile" ON public.tour_guides FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for restaurants
CREATE POLICY "Anyone can view restaurants" ON public.restaurants FOR SELECT USING (TRUE);
CREATE POLICY "Restaurant owners can update own restaurant" ON public.restaurants FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Restaurant owners can insert own restaurant" ON public.restaurants FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Restaurant owners can delete own restaurant" ON public.restaurants FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for dishes
CREATE POLICY "Anyone can view dishes" ON public.dishes FOR SELECT USING (TRUE);
CREATE POLICY "Restaurant owners can manage dishes" ON public.dishes 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.restaurants 
      WHERE restaurants.id = dishes.restaurant_id 
      AND restaurants.user_id = auth.uid()
    )
  );

-- RLS Policies for trips
CREATE POLICY "Users can view own trips" ON public.trips FOR SELECT USING (user_id = auth.uid() OR is_public = TRUE);
CREATE POLICY "Users can insert own trips" ON public.trips FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own trips" ON public.trips FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own trips" ON public.trips FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for trip_dishes
CREATE POLICY "Users can view dishes in accessible trips" ON public.trip_dishes 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = trip_dishes.trip_id 
      AND (trips.user_id = auth.uid() OR trips.is_public = TRUE)
    )
  );
CREATE POLICY "Users can manage dishes in own trips" ON public.trip_dishes 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = trip_dishes.trip_id 
      AND trips.user_id = auth.uid()
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings 
  FOR SELECT USING (
    tourist_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.tour_guides 
      WHERE tour_guides.id = bookings.guide_id 
      AND tour_guides.user_id = auth.uid()
    )
  );
CREATE POLICY "Tourists can create bookings" ON public.bookings FOR INSERT WITH CHECK (tourist_id = auth.uid());
CREATE POLICY "Booking participants can update bookings" ON public.bookings 
  FOR UPDATE USING (
    tourist_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.tour_guides 
      WHERE tour_guides.id = bookings.guide_id 
      AND tour_guides.user_id = auth.uid()
    )
  );

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON public.messages 
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Users can update own sent messages" ON public.messages FOR UPDATE USING (sender_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_tour_guides_status ON public.tour_guides(status);
CREATE INDEX IF NOT EXISTS idx_tour_guides_user_id ON public.tour_guides(user_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON public.restaurants(location);
CREATE INDEX IF NOT EXISTS idx_dishes_restaurant_id ON public.dishes(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_dishes_trip_id ON public.trip_dishes(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tourist_id ON public.bookings(tourist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guide_id ON public.bookings(guide_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
