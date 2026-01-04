-- Insert sample restaurants
INSERT INTO public.restaurants (name, location, latitude, longitude, address, phone, opening_hours, seating_style, group_size, busy_hours, signature_dish, signature_price, signature_description, menu_items, images) VALUES
('Phở Gia Truyền', 'Hanoi Old Quarter', 21.0285, 105.8542, '49 Bat Dan St, Hoan Kiem', '+84 24 3828 4022', '6:00 AM - 10:00 PM', 'Low plastic stools', '1-6 people', '7-9 AM, 12-1 PM', 'Phở Tái Nạm', 65000, 'Slow-simmered beef bone broth with rare and well-done beef, rice noodles, herbs', 
 '[{"name":"Phở Bò","price":60000,"description":"Classic beef pho"},{"name":"Phở Gà","price":55000,"description":"Chicken pho"},{"name":"Nem Rán","price":40000,"description":"Fried spring rolls"}]',
 ARRAY['/vietnamese-beef-pho-noodle-soup.jpg']),

('Bún Chả Hương Liên', 'Hanoi Old Quarter', 21.0245, 105.8516, '24 Le Van Huu, Hai Ba Trung', '+84 24 3943 4106', '10:00 AM - 9:00 PM', 'Small tables', '2-4 people', '12-1:30 PM, 6-7 PM', 'Bún Chả Set', 70000, 'Grilled pork patties and slices with vermicelli, herbs, and dipping sauce',
 '[{"name":"Bún Chả","price":70000,"description":"Grilled pork with noodles"},{"name":"Nem Cua Bể","price":50000,"description":"Crab spring rolls"}]',
 ARRAY['/vietnamese-bun-cha-grilled-pork.jpg']),

('Cà Phê Giảng', 'Hanoi Old Quarter', 21.0311, 105.8516, '39 Nguyen Huu Huan, Hoan Kiem', '+84 98 989 2298', '7:00 AM - 11:00 PM', 'Cafe seating', '1-4 people', '3-5 PM', 'Cà Phê Trứng', 35000, 'Legendary egg coffee with whipped egg yolk and condensed milk',
 '[{"name":"Egg Coffee","price":35000,"description":"Vietnamese egg coffee"},{"name":"Coconut Coffee","price":38000,"description":"Coffee with coconut cream"}]',
 ARRAY['/vietnamese-egg-coffee.jpg']);

-- Insert sample dishes for each restaurant
INSERT INTO public.dishes (restaurant_id, name, description, price, category, is_signature, images)
SELECT 
  r.id,
  'Phở Bò',
  'Traditional Vietnamese beef noodle soup with aromatic broth',
  60000,
  'Main Course',
  TRUE,
  ARRAY['/vietnamese-beef-pho-noodle-soup.jpg']
FROM public.restaurants r WHERE r.name = 'Phở Gia Truyền';

INSERT INTO public.dishes (restaurant_id, name, description, price, category, is_signature, images)
SELECT 
  r.id,
  'Bún Chả',
  'Grilled pork with vermicelli noodles and fresh herbs',
  70000,
  'Main Course',
  TRUE,
  ARRAY['/vietnamese-bun-cha-grilled-pork.jpg']
FROM public.restaurants r WHERE r.name = 'Bún Chả Hương Liên';

INSERT INTO public.dishes (restaurant_id, name, description, price, category, is_signature, images)
SELECT 
  r.id,
  'Egg Coffee',
  'Rich Vietnamese coffee topped with creamy egg foam',
  35000,
  'Beverage',
  TRUE,
  ARRAY['/vietnamese-egg-coffee.jpg']
FROM public.restaurants r WHERE r.name = 'Cà Phê Giảng';
