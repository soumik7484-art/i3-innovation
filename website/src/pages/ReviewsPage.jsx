import React, { useState, useEffect } from 'react';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_G5wEXgUgzC_XU6wUUcbHq3pwPWEucgvPn8Vdbh760xXLXnOFHoI7KcyKdCl7amE_m7HUX68zmkim/pub?output=csv';
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd4uFmibV3gLZUa4YEhSS_ws_6wGdodQeZ3k-A8ffMluNPYgw/viewform';

const staticReviews = [
  { name: 'Pieu Chatterjee', location: 'Kolkata, West Bengal', rating: 5, date: '20-Aug-2026', product: 'Cotton Polo T Shirt', tags: [], text: '' },
  { name: 'Sajal Mukherjee', location: 'Kolkata, West Bengal', rating: 5, date: '24-Sep-2026', product: 'Vmaxx PVC Rain Suit', tags: [], text: '' },
  { name: 'SOURADIP KARMAKAR', location: 'Bardhaman, West Bengal', rating: 5, date: '20-Jul-2026', product: 'Oversized T Shirt', tags: [], text: '' },
  { name: 'Sk', location: 'Howrah, West Bengal', rating: 5, date: '21-Sep-2026', product: '', tags: [], text: '' },
  { name: 'Himanshu Gupta', location: '24 Parganas, West Bengal', rating: 5, date: '18-Jul-2026', product: 'Rain Coat', tags: [], text: '' },
  { name: 'Jitendra Kumar Mandal', location: 'Forbesganj, Bihar', rating: 5, date: '10-Jun-2026', product: 'Men Corporate T Shirt', tags: ['Response', 'Quality', 'Delivery'], text: 'Everything is quite well.' },
  { name: 'Santosh Kumar', location: 'Jeypore, Odisha', rating: 5, date: '10-Jul-2026', product: 'Sports Jersey', tags: [], text: '' },
  { name: 'Niraj Kumar', location: 'Banka, Bihar', rating: 5, date: '22-Jun-2026', product: 'Cricket Unisex Sports Jersey', tags: [], text: '' },
  { name: 'MANAS', location: 'Sambalpur, Odisha', rating: 5, date: '30-Jul-2026', product: 'Rain Coat', tags: ['Response', 'Delivery'], text: 'Good' },
  { name: 'SUMESH PALEI', location: 'Barkot, Odisha', rating: 5, date: '22-May-2026', product: 'Skill Development Services', tags: [], text: '' },
  { name: 'Pradeep Kumar Gupta', location: 'Maharajganj, Bihar', rating: 5, date: '04-Feb-2026', product: 'Men Blazer', tags: [], text: '' },
  { name: 'Jitu', location: 'Naihati, West Bengal', rating: 5, date: '28-Apr-2026', product: 'Men Cotton Shirts', tags: [], text: '' },
  { name: 'Ak', location: 'Dumka, Jharkhand', rating: 5, date: '13-Jan-2026', product: 'Tracksuits', tags: ['Response'], text: '' },
  { name: 'MOUMITA', location: 'Hindusthan Cables Town, West Bengal', rating: 3, date: '02-Sep-2026', product: 'Hoodies Unisex', tags: [], text: '' },
  { name: 'Maharaja Suhel Dev University', location: 'Mubarakpur, Uttar Pradesh', rating: 5, date: '15-Dec-2025', product: 'Men Blazer', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Golam', location: 'Kolkata, West Bengal', rating: 5, date: '15-Dec-2025', product: 'School Uniform Frock', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Kiron Kumar Sardar', location: 'Siliguri, West Bengal', rating: 5, date: '11-Dec-2025', product: 'Designer Blazer', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Mira Bose', location: 'Kolkata, West Bengal', rating: 5, date: '08-Dec-2025', product: '', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Aniruddha Saha', location: 'Ashoknagar, West Bengal', rating: 5, date: '04-Dec-2025', product: 'School Tie', tags: [], text: '' },
  { name: 'Sayanii Ghosh', location: 'Kolkata, West Bengal', rating: 5, date: '23-Nov-2025', product: 'School Uniforms', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Soumyabrata Mondal', location: 'Kolkata, West Bengal', rating: 5, date: '23-Nov-2025', product: 'School Uniforms', tags: ['Response', 'Quality', 'Delivery'], text: '' },
  { name: 'Sayani Ghosh', location: 'Kolkata, West Bengal', rating: 5, date: '23-Nov-2025', product: 'School Uniforms', tags: [], text: '' },
  { name: 'Manisha Bose', location: 'North 24 Parganas, West Bengal', rating: 5, date: '23-Nov-2025', product: '', tags: [], text: '' },
  { name: 'Binayak Bose', location: 'Kolkata, West Bengal', rating: 5, date: '22-Nov-2025', product: 'School Uniforms', tags: [], text: '' },
  { name: 'Antara Misal', location: 'Buldana, Maharashtra', rating: 5, date: '22-Nov-2025', product: 'Girls School Uniform', tags: [], text: '' },
  { name: 'Tribhuwan Dewangan', location: 'Korba, Chhattisgarh', rating: 5, date: '15-Nov-2025', product: '', tags: ['Response'], text: '' },
  { name: 'Diptendu Mondal', location: 'Kolkata, West Bengal', rating: 5, date: '27-Oct-2025', product: 'Windcheater', tags: [], text: '' },
  { name: 'Innovative Fusion Co.', location: 'Cuttack, Odisha', rating: 5, date: '03-Oct-2025', product: 'Boys School Uniform', tags: [], text: '' },
  { name: 'Amar Banerjee', location: 'Kolkata, West Bengal', rating: 5, date: '09-Oct-2025', product: 'Cotton Polo T Shirt', tags: [], text: '' },
  { name: 'TARAKNATH', location: 'Asansol, West Bengal', rating: 5, date: '24-Sep-2025', product: 'School Sweater', tags: [], text: '' },
  { name: 'Rahul Basak', location: 'Kolkata, West Bengal', rating: 5, date: '25-Sep-2025', product: 'Men Poly Cotton T-Shirt', tags: ['Response', 'Quality', 'Delivery'], text: 'very good service provided. Mostly recommended.' },
  { name: 'ANADI', location: 'Berhampur, Odisha', rating: 5, date: '19-Sep-2025', product: 'Urea', tags: [], text: '' },
  { name: 'Akshay Kumar', location: 'Deoghar, Jharkhand', rating: 5, date: '13-Sep-2025', product: 'Boys Half Pant', tags: [], text: '' },
  { name: 'Samrat', location: 'Pandua, West Bengal', rating: 5, date: '03-Sep-2025', product: 'Cotton T-shirts', tags: [], text: '' },
  { name: 'Nurali Sk', location: 'Bankura, West Bengal', rating: 5, date: '02-Sep-2025', product: 'Printed T Shirts', tags: [], text: '' },
  { name: 'SUJATA GUIN', location: 'Murshidabad, West Bengal', rating: 5, date: '21-Aug-2025', product: 'Fleece Jacket', tags: [], text: '' },
  { name: 'Jipendra', location: 'Chhindwara, Madhya Pradesh', rating: 5, date: '26-Aug-2025', product: 'Round Neck Men T-Shirt', tags: [], text: '' },
  { name: 'Ashik Hasan', location: 'Malda, West Bengal', rating: 5, date: '04-Aug-2025', product: 'Track Pant', tags: [], text: '' },
  { name: 'MANOJ MANDAL', location: 'Asansol, West Bengal', rating: 5, date: '24-Jul-2025', product: 'Socks', tags: [], text: '' },
  { name: 'Suman Chalraborty', location: 'Bardhaman, West Bengal', rating: 5, date: '22-Jul-2025', product: 'Food Delivery Bags', tags: [], text: '' },
  { name: 'Firoj Md', location: 'Kolkata, West Bengal', rating: 5, date: '20-Jul-2025', product: 'Cotton T-shirts', tags: [], text: '' },
  { name: 'Abul Kalam Azad', location: 'Karimganj, Assam', rating: 5, date: '18-Jul-2025', product: 'Blank T Shirt', tags: [], text: '' },
  { name: 'Vivek Kumar', location: 'Siwan, Bihar', rating: 5, date: '12-Jul-2025', product: 'Round Neck Men T-Shirt', tags: [], text: '' },
  { name: 'Raju Banerjee', location: 'Siliguri, West Bengal', rating: 5, date: '11-Jul-2025', product: 'Sports Wear', tags: [], text: '' },
  { name: 'Junaid', location: 'Kolkata, West Bengal', rating: 5, date: '02-Jul-2025', product: 'Round Neck T Shirt', tags: [], text: '' },
  { name: 'Sahataj Hossain', location: 'Kankuria, West Bengal', rating: 5, date: '01-Jul-2025', product: 'Printed T Shirts', tags: [], text: '' },
  { name: 'Sushovan Chowdhury', location: 'Bardhaman, West Bengal', rating: 5, date: '27-Jun-2025', product: 'Men Poly Cotton T-Shirt', tags: [], text: '' },
  { name: 'Sikim Sk', location: 'Murshidabad, West Bengal', rating: 5, date: '27-Jun-2025', product: 'Blank T Shirt', tags: [], text: '' },
  { name: 'Joy Paul', location: 'Kolkata, West Bengal', rating: 5, date: '28-Jun-2025', product: 'Men Collar T-Shirt', tags: [], text: '' },
  { name: 'Manas Roy', location: 'Barjora, West Bengal', rating: 5, date: '24-Jun-2025', product: 'Cotton Men T-Shirt', tags: [], text: '' },
  { name: 'Subrat Nag', location: 'Delhi, Delhi', rating: 5, date: '24-Jun-2025', product: 'Boys School Uniform', tags: [], text: '' },
  { name: 'Dheeraj Kumar Singh', location: 'Singrauli, Madhya Pradesh', rating: 5, date: '24-Jun-2025', product: 'Raincoats & Rainsuits', tags: [], text: '' },
  { name: 'SAIKAT', location: 'India', rating: 5, date: '14-Jun-2025', product: 'Promotional T-Shirt', tags: [], text: '' },
  { name: 'KESHAV SEN SO SATISH SEN', location: 'Bhopal, Madhya Pradesh', rating: 5, date: '21-Jun-2025', product: 'Polo T Shirt', tags: [], text: '' },
  { name: 'Soumyadiproychowdhury', location: 'Chakdaha, West Bengal', rating: 5, date: '21-Jun-2025', product: 'Oversized T Shirt', tags: [], text: '' },
  { name: 'Supriyo Maity', location: 'Kalyanpur, West Bengal', rating: 5, date: '14-Jun-2025', product: 'Men Blazer', tags: [], text: '' },
  { name: 'Riya', location: 'New Delhi, Delhi', rating: 5, date: '28-Jun-2025', product: 'Cotton Men T-Shirt', tags: ['Response', 'Quality', 'Delivery'], text: 'Excellent' },
  { name: 'Subhankar Dey', location: 'Bally, West Bengal', rating: 5, date: '13-Jun-2025', product: 'Plain T Shirt', tags: [], text: '' },
  { name: 'ROMIT', location: 'Asansol, West Bengal', rating: 5, date: '13-Jun-2025', product: 'Printed T Shirts', tags: [], text: '' },
  { name: 'Vikash Kastoorbhai Pawar', location: 'Surat, Gujarat', rating: 5, date: '09-Jun-2025', product: 'Boys Half Pant', tags: [], text: 'Cooperative and perfect to business' },
  { name: 'Akash Maji', location: 'Howrah, West Bengal', rating: 5, date: '09-Jun-2025', product: 'Knitted Men T-Shirt', tags: [], text: '' },
  { name: 'Sandeep', location: 'Kolkata, West Bengal', rating: 5, date: '09-Jun-2025', product: 'Leggings', tags: ['Response'], text: 'Superb response and too too good Behavior' },
  { name: 'Ankit Mistri', location: 'Hooghly, West Bengal', rating: 5, date: '06-Jun-2025', product: 'Men Sublimation T-Shirt', tags: [], text: '' },
  { name: 'Arindam', location: 'Kolkata, West Bengal', rating: 5, date: '06-Jun-2025', product: 'T Shirts', tags: [], text: '' },
  { name: 'Sharad', location: 'Nashik, Maharashtra', rating: 5, date: '06-Jun-2025', product: 'Men Track Pants', tags: [], text: '' },
  { name: 'Alisha Khan', location: 'Rajmahal, Jharkhand', rating: 5, date: '06-Jun-2025', product: 'Blank T Shirt', tags: [], text: '' },
  { name: 'Om Chakraborty', location: 'South Dum Dum, West Bengal', rating: 5, date: '04-Jun-2025', product: 'Men Track Pants', tags: [], text: '' },
  { name: 'SK SOYAL', location: 'Bardhaman, West Bengal', rating: 5, date: '04-Jun-2025', product: 'Plain T Shirt', tags: ['Response', 'Quality'], text: "That's great 😃" },
  { name: 'Akkas Ali', location: 'Kamrup, Assam', rating: 5, date: '02-Jun-2025', product: 'Oversized T Shirt', tags: [], text: '' },
  { name: 'Srabanti Haldar', location: 'Kolkata, West Bengal', rating: 5, date: '30-May-2025', product: 'Blank Plain T Shirts', tags: [], text: '' },
  { name: 'Narender Kumbhakar', location: 'Jamshedpur, Jharkhand', rating: 5, date: '14-May-2025', product: 'Monogram', tags: [], text: '' },
  { name: 'Senniyammal Textail', location: 'Erode, Tamil Nadu', rating: 5, date: '10-Apr-2025', product: 'School Blazer', tags: [], text: '' },
  { name: 'Raj Des', location: 'Nagaon, Assam', rating: 5, date: '19-Apr-2025', product: 'Men Track Pants', tags: [], text: '' },
  { name: 'علي', location: 'Saudi Arabia', rating: 5, date: '18-Mar-2025', product: 'Round Neck T Shirt', tags: [], text: '' },
  { name: 'ANIL KUMAR SING', location: 'Balasore, Odisha', rating: 5, date: '02-Apr-2025', product: 'Men Sports Shorts', tags: [], text: 'Very good' },
  { name: 'Jahid', location: 'Bongoan, West Bengal', rating: 5, date: '27-Feb-2025', product: 'Track Pant', tags: [], text: '' },
  { name: 'Mozahid Gani', location: 'Tiruppur, Tamil Nadu', rating: 5, date: '27-Feb-2025', product: 'Cotton Black Track Pant For Mens, Solid', tags: [], text: '' },
  { name: 'Pathan Ji', location: 'Howrah, West Bengal', rating: 5, date: '20-Feb-2025', product: 'Men Coat', tags: [], text: '' },
  { name: 'Kizer Global Resources Private Limit', location: 'New Delhi, Delhi', rating: 5, date: '20-Jan-2025', product: 'Round Neck T Shirt', tags: [], text: '' },
  { name: 'Sujay Konra', location: 'Bardhaman, West Bengal', rating: 5, date: '12-Jan-2025', product: 'Men Tracksuit', tags: [], text: '' },
  { name: 'Yogesh Prabhudas Sangani', location: 'Jalna, Maharashtra', rating: 5, date: '10-Jan-2025', product: 'Customized School Uniforms', tags: [], text: '' },
  { name: 'Annu Mallick', location: 'Asansol, West Bengal', rating: 5, date: '04-Jan-2025', product: 'Cotton Men T-Shirt', tags: [], text: '' },
  { name: 'Jorden Jigmie Ghissing', location: 'Siliguri, West Bengal', rating: 5, date: '04-Jan-2025', product: 'Socks', tags: [], text: '' },
  { name: 'Vishal Halder', location: 'Kolkata, West Bengal', rating: 5, date: '02-Jan-2025', product: 'Leggings', tags: [], text: '' },
  { name: 'Sriram Koushik', location: 'Prakasam, Andhra Pradesh', rating: 5, date: '16-Dec-2024', product: 'Blank T Shirt', tags: [], text: '' },
  { name: 'Aryan', location: 'Purulia, West Bengal', rating: 5, date: '15-Dec-2024', product: 'Super Poly Tracksuit', tags: [], text: '' },
  { name: 'Sk Rahan', location: 'Rajpur Sonarpur, West Bengal', rating: 5, date: '08-Dec-2024', product: 'School Uniforms Blazers School Blazers', tags: [], text: '' },
  { name: 'Ketan Kumar', location: 'Rajgir, Bihar', rating: 5, date: '04-Dec-2024', product: 'Logo T Shirt', tags: [], text: '' },
  { name: 'IndiaMART Buyer', location: 'India', rating: 5, date: '29-Oct-2024', product: 'SCHOOL UNIFORM SET', tags: [], text: 'Great Satisfied.' },
  { name: 'Akash', location: 'Kolkata, West Bengal', rating: 5, date: '20-Oct-2024', product: 'Laptops Bags', tags: [], text: '' },
  { name: 'Sk Saheb Babu', location: 'Howrah, West Bengal', rating: 5, date: '18-Oct-2024', product: 'Blazers', tags: [], text: '' },
  { name: 'Niran Mitra', location: 'Sibsagar, Assam', rating: 5, date: '07-Oct-2024', product: 'Kids School Uniforms', tags: [], text: '' },
  { name: 'MAHIDUL ISLAM', location: 'Rajarhat Gopalpur, West Bengal', rating: 5, date: '24-Sep-2024', product: 'Girls School Uniform', tags: [], text: '' },
  { name: 'Baban', location: 'Durgapur, West Bengal', rating: 5, date: '13-Sep-2024', product: 'Men Custom T-Shirt', tags: [], text: '' },
  { name: 'Ujjwal Mandal', location: 'Kharagpur, West Bengal', rating: 5, date: '09-Sep-2024', product: 'Lycra Pant', tags: [], text: 'well' },
  { name: 'Nitesh Kumar', location: 'Auraiya, Uttar Pradesh', rating: 5, date: '03-Sep-2024', product: 'Men Polyester T Shirt', tags: [], text: '' },
  { name: 'Bindu Prasad', location: 'Hilsa, Bihar', rating: 5, date: '05-Aug-2024', product: 'Men Polyester T Shirt', tags: [], text: '' },
  { name: 'Suvo', location: 'Hapur, Uttar Pradesh', rating: 5, date: '29-Jul-2024', product: 'T Shirts', tags: [], text: '' },
  { name: 'Daulat Kumar', location: 'Bhojpur, Uttar Pradesh', rating: 5, date: '18-Jul-2024', product: 'Men Polyester T Shirt', tags: [], text: '' },
  { name: 'MUNMUN SARKAR', location: 'India', rating: 5, date: '10-Nov-2024', product: 'Men Shorts', tags: ['Delivery', 'Response', 'Quality'], text: 'Great experience' },
  { name: 'SOUNAVA', location: 'India', rating: 5, date: '10-Nov-2024', product: '', tags: ['Response', 'Quality', 'Delivery'], text: 'Best quality supplier' },
  { name: 'Subham', location: '24 Parganas, West Bengal', rating: 5, date: '29-Jun-2024', product: 'Cotton Men T-Shirt', tags: ['Response', 'Quality', 'Delivery'], text: 'Best company within West Bengal' },
  { name: 'Thedivinegrace', location: 'Pondicherry', rating: 5, date: '04-Feb-2024', product: 'Shantiniketan Bags', tags: [], text: 'Very good' },
  { name: 'SARFARAJ MONDAL', location: 'South 24 Parganas, West Bengal', rating: 5, date: '15-Jan-2024', product: 'Formal Blazer', tags: [], text: '' },
  { name: 'Soumya Ranjan Mahunta', location: 'Cuttack, Odisha', rating: 5, date: '29-Dec-2023', product: 'Men Tracksuit', tags: [], text: '' },
  { name: 'Arpit', location: 'Solan, Himachal Pradesh', rating: 5, date: '29-Sep-2023', product: 'School Sweater', tags: [], text: 'good' },
  { name: 'GUSTAVO', location: 'Raasi Cement Factory Wazirabad, Telangana', rating: 5, date: '12-Jun-2023', product: 'Poly Cotton T Shirts', tags: [], text: '' },
  { name: 'Sandip Ghosh', location: 'Kolkata, West Bengal', rating: 5, date: '12-Apr-2023', product: 'Custom T Shirt', tags: ['Response', 'Quality', 'Delivery'], text: 'wonderful' },
  { name: 'Sangath Hegde', location: 'Mumbai, Maharashtra', rating: 5, date: '02-Feb-2023', product: 'Uniform Pants', tags: [], text: '' },
  { name: 'Rajiv Sarkar', location: 'Kolkata, West Bengal', rating: 5, date: '02-Nov-2022', product: 'Disposable Sterile Surgical Gloves', tags: [], text: '' },
  { name: 'KING BACK', location: 'Kolkata, West Bengal', rating: 5, date: '20-Aug-2022', product: '', tags: ['Quality', 'Response', 'Delivery'], text: 'Very nice experience. Good communication and behavior..' },
  { name: 'SANTANU Ganguly', location: 'New Delhi, Delhi', rating: 5, date: '29-Aug-2022', product: 'PET Bottle Making Machine', tags: [], text: '' },
  { name: 'Smyle', location: 'Bhubaneswar, Odisha', rating: 5, date: '31-Jan-2022', product: 'Custom T Shirt', tags: ['Response'], text: 'Very polite behaviour!' },
  { name: 'Joydeep Paul', location: 'Kolkata, West Bengal', rating: 5, date: '05-Dec-2021', product: 'Pet Jar Blowing Machine', tags: [], text: '' },
  { name: 'Smriti', location: 'Muragachha, West Bengal', rating: 5, date: '26-Nov-2021', product: 'Automatic Touchless Hand Sanitizer Dispenser', tags: ['Response', 'Quality', 'Delivery'], text: 'Very responsive.' },
  { name: 'Rajiv', location: 'Kolkata, West Bengal', rating: 5, date: '26-Nov-2021', product: 'Automatic Touchless Hand Sanitizer Dispenser', tags: ['Response', 'Quality', 'Delivery'], text: 'Sound knowledge and very efficient about products. Great' },
  { name: 'PRASANTA KUMAR MURUNI', location: 'Kolkata, West Bengal', rating: 5, date: '27-Aug-2021', product: 'Men Short', tags: [], text: 'Very prompt service.. keep it up' },
  { name: 'IndiaMART Buyer', location: 'India', rating: 5, date: '06-Aug-2021', product: '', tags: [], text: 'Great experience, while dealing with them' },
  { name: 'Akram', location: 'Kolkata, West Bengal', rating: 5, date: '12-Sep-2021', product: '', tags: [], text: '' },
  { name: 'Itishree Samal', location: 'Anandapur, Odisha', rating: 5, date: '22-Jun-2024', product: 'School T Shirts', tags: [], text: '' },
  { name: 'Arijit', location: 'Bankura, West Bengal', rating: 5, date: '11-Jun-2024', product: 'Uniform Pants', tags: [], text: '' },
  { name: 'Dibyadevnaik', location: 'Bhubaneswar, Odisha', rating: 5, date: '30-Apr-2024', product: 'Nike Tracksuit', tags: [], text: '' },
  { name: 'Shomid', location: 'Kolkata, West Bengal', rating: 5, date: '05-Apr-2024', product: 'Men Custom T-Shirt', tags: [], text: '' },
  { name: 'Arshad', location: 'Kolkata, West Bengal', rating: 5, date: '03-Feb-2024', product: 'Track Pant', tags: [], text: '' },
  { name: 'VASIRPASHA', location: 'Wayanad, Kerala', rating: 5, date: '26-Dec-2023', product: 'Men Track Pants', tags: [], text: '' },
  { name: 'Abhimanyu Basu Mallick', location: 'Serampore, West Bengal', rating: 5, date: '19-Dec-2023', product: 'Fleece Hoodie', tags: [], text: '' },
  { name: 'Arif Khan', location: 'Cuttack, Odisha', rating: 5, date: '13-Nov-2023', product: 'Kids Socks', tags: [], text: '' },
  { name: 'Ambarish Naik', location: 'Tarbha, Odisha', rating: 5, date: '01-Sep-2023', product: 'School T Shirts', tags: [], text: '' },
  { name: 'Tapan Kumar Behera', location: 'Keonjhar, Odisha', rating: 5, date: '24-Aug-2023', product: '', tags: [], text: '' },
  { name: 'Dipankar', location: 'Kolkata, West Bengal', rating: 5, date: '21-Jul-2023', product: 'Food Delivery Bags', tags: [], text: '' },
  { name: 'Abhijit Biswas', location: 'Shillong, Meghalaya', rating: 5, date: '27-Dec-2022', product: 'Men Lower', tags: [], text: '' },
  { name: 'Shashikant Murmu', location: 'Jamtara, Jharkhand', rating: 5, date: '08-Oct-2022', product: 'School T Shirts', tags: [], text: '' },
  { name: 'SNEHASISH NAG', location: 'Barrackpore, West Bengal', rating: 5, date: '18-Apr-2022', product: 'Blank T Shirt', tags: [], text: '' },
  { name: 'Examination Gloves', location: 'Howrah, West Bengal', rating: 5, date: '21-Feb-2022', product: 'Disposable Gloves', tags: [], text: '' },
  { name: 'Avik Ghosh', location: 'Durgapur, West Bengal', rating: 5, date: '01-Feb-2022', product: 'Sublimation T Shirts', tags: [], text: '' },
  { name: 'Vimal Kumar', location: 'Chandigarh, Chandigarh', rating: 5, date: '01-Jan-2022', product: 'Men Short', tags: [], text: '' },
  { name: 'Deba De', location: 'Krishnanagar, West Bengal', rating: 5, date: '03-Nov-2021', product: 'Men Printed T Shirt', tags: [], text: '' },
  { name: 'Subhankar Das', location: 'Egra, West Bengal', rating: 5, date: '02-Oct-2021', product: 'Men Half Sleeve T-Shirt', tags: [], text: '' },
  { name: 'Rohit Singh', location: 'Kolkata, West Bengal', rating: 5, date: '04-Sep-2021', product: 'Men Polo T Shirt', tags: [], text: '' },
  { name: 'Sanjay', location: 'Patna, Bihar', rating: 5, date: '18-Aug-2026', product: 'Cotton T-shirts', tags: [], text: '' },
  { name: 'Suraj Mali', location: 'Bansbaria, West Bengal', rating: 5, date: '10-Jul-2026', product: 'Rain Coat', tags: [], text: '' },
  { name: 'AREN LEWIS PRIVATELIMITED', location: 'Haldia, West Bengal', rating: 5, date: '29-May-2026', product: 'Men Cotton Shorts', tags: [], text: '' },
  { name: 'Pranay', location: 'Kolkata, West Bengal', rating: 1, date: '09-Aug-2025', product: 'Cotton Men T-Shirt', tags: [], text: 'Bekar😑😖' },
  { name: 'Sk Aref Ali', location: 'Howrah, West Bengal', rating: 1, date: '23-Aug-2025', product: 'Men Socks', tags: [], text: '' },
  { name: 'Jahid Hossain Mondal', location: 'South 24 Parganas, West Bengal', rating: 1, date: '19-Apr-2025', product: 'Logo Polyester Custom Printed T Shirts', tags: [], text: '' },
  { name: 'Adit Kumar Roy', location: 'Kanchrapara, West Bengal', rating: 1, date: '09-Mar-2025', product: 'Round Neck Men T-Shirt', tags: [], text: '' },
  { name: 'Soumya Shree', location: 'Rourkela, Odisha', rating: 1, date: '18-Feb-2025', product: 'Skill Development Services', tags: [], text: '' },
  { name: 'Rajesh Ghosh', location: 'Jirat, West Bengal', rating: 1, date: '11-Feb-2025', product: 'Round Polyester Blank T Shirt, Half Sleeves, Plain', tags: [], text: '' },
  { name: 'Ar Nirmal', location: 'Kolkata, West Bengal', rating: 1, date: '10-Feb-2025', product: 'Men Wedding Suits', tags: [], text: '' },
  { name: 'SISHIR Sahoo', location: 'Bhushan Steel Plant Meramandali Township, Odisha', rating: 1, date: '17-Jan-2025', product: 'School T Shirts', tags: [], text: '' },
  { name: 'Sonam Mou', location: 'Panihati, West Bengal', rating: 1, date: '26-Dec-2024', product: '', tags: [], text: '' },
  { name: 'InderjeetSingh', location: 'Ganganagar, Rajasthan', rating: 1, date: '24-Nov-2024', product: 'Super Poly Tracksuit', tags: [], text: '' },
  { name: 'Sahabul Shah', location: 'Diamond Harbour, West Bengal', rating: 5, date: '22-Dec-2024', product: 'Cotton Men T-Shirt', tags: [], text: '' },
  { name: 'Binod', location: 'Asansol, West Bengal', rating: 1, date: '29-Sep-2024', product: 'Men Polyester T Shirt', tags: [], text: '' },
  { name: 'N M Lakhotia', location: 'Kolkata, West Bengal', rating: 5, date: '05-Sep-2024', product: 'School Socks', tags: [], text: '' },
  { name: 'Khairul Islam', location: 'Islampur, West Bengal', rating: 5, date: '23-Sep-2024', product: 'Polo Men T-Shirt', tags: [], text: '' },
  { name: 'REVANGE GAMER Singh', location: 'Patna, Bihar', rating: 5, date: '24-Jun-2024', product: 'Men T-Shirts', tags: [], text: '' },
  { name: 'Itishree Samal', location: 'Anandapur, Odisha', rating: 5, date: '22-Jun-2024', product: 'School T Shirts', tags: [], text: '' },
  { name: 'KAKOLI', location: 'Mumbai, Maharashtra', rating: 5, date: '28-Apr-2024', product: 'Ladies Purse', tags: [], text: '' },
  { name: 'Indranil Mukherjee', location: 'South 24 Parganas, West Bengal', rating: 5, date: '15-Apr-2024', product: 'Men Sublimation T-Shirt', tags: [], text: '' },
  { name: 'Nasim', location: 'Nasaratpur, West Bengal', rating: 5, date: '10-Apr-2024', product: 'Women Blazer', tags: [], text: '' },
  { name: 'Ranjita Swain', location: 'Bhubaneswar, Odisha', rating: 5, date: '12-Feb-2024', product: 'School T Shirts', tags: [], text: '' },
  { name: 'Kushram', location: 'Shillong, Meghalaya', rating: 5, date: '28-Nov-2023', product: 'Men Check Shirt', tags: [], text: '' },
  { name: 'Deepak Kumar Sharma', location: 'Dhanbad, Jharkhand', rating: 5, date: '20-Apr-2023', product: 'Girls School Shirt', tags: [], text: '' },
  { name: 'Ajah Halder', location: 'Kolkata, West Bengal', rating: 1, date: '21-Apr-2022', product: 'Formal Blazer', tags: [], text: '' },
  { name: 'Tanushri Maiti Bhowmik', location: 'Ghatal, West Bengal', rating: 1, date: '25-Jan-2022', product: 'Nitrile Gloves', tags: [], text: '' },
  { name: 'Rahul Mahata', location: 'Bankura, West Bengal', rating: 1, date: '25-Aug-2021', product: 'Sublimation T Shirts', tags: [], text: '' },
];

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes; }
      else if (line[i] === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += line[i]; }
    }
    values.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  }).filter(row => row['Name']).map(row => ({
    name: row['Name'],
    location: row['Location'] || '',
    rating: parseInt(row['Rating']) || 5,
    date: row['Timestamp'] ? new Date(row['Timestamp']).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    product: row['Product'] || '',
    tags: [],
    text: row['Review / Feedback'] || '',
  }));
}

function Stars({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${sz} ${i <= rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function CircleProgress({ value, label }) {
  const r = 30, circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#e5e7eb" strokeWidth="7"/>
          <circle cx="40" cy="40" r={r} fill="none" stroke="#f59e0b" strokeWidth="7"
            strokeDasharray={circ} strokeDashoffset={circ - (value/100)*circ} strokeLinecap="round"/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-800">{value}%</span>
      </div>
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
  );
}

function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-4 text-gray-600 text-right">{star}</span>
      <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div className="h-2.5 rounded-full bg-green-500 transition-all duration-700" style={{ width: `${pct}%` }}/>
      </div>
      <span className="w-8 text-gray-500 text-xs">{pct}%</span>
    </div>
  );
}

const PAGE_SIZE = 10;

export default function ReviewsPage() {
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('Top Reviews');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(res => res.text())
      .then(text => { setDynamicReviews(parseCSV(text).reverse()); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSort = (val) => { setSort(val); setVisibleCount(PAGE_SIZE); };

  const allReviews = [...dynamicReviews, ...staticReviews];
  const totalRatings = allReviews.length;
  const avgRating = totalRatings > 0
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / totalRatings).toFixed(1)
    : '4.4';

  const breakdown = [5,4,3,2,1].map(star => ({
    star,
    count: allReviews.filter(r => r.rating === star).length,
  }));

  const sorted = [...allReviews].sort((a, b) => {
    if (sort === 'Top Reviews') return b.rating - a.rating;
    if (sort === 'Newest First') return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ratings &amp; Reviews</h1>

        {/* Summary */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-6 flex-1">
            <div className="flex flex-col items-center justify-center min-w-[120px]">
              <Stars rating={Math.round(parseFloat(avgRating))} size="lg"/>
              <div className="text-4xl font-bold text-gray-900 mt-2">{avgRating}<span className="text-lg text-gray-500 font-normal">/5</span></div>
              <p className="text-sm text-gray-500 mt-1">{totalRatings} Ratings</p>
            </div>
            <div className="flex-1 space-y-2 justify-center flex flex-col">
              {breakdown.map(({ star, count }) => (
                <RatingBar key={star} star={star} count={count} total={totalRatings}/>
              ))}
            </div>
          </div>
          <div className="hidden md:block w-px bg-gray-200"/>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-green-600 font-semibold text-sm mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              User Satisfaction
            </div>
            <div className="flex items-center gap-6">
              <CircleProgress value={98} label="Response"/>
              <CircleProgress value={97} label="Quality"/>
              <CircleProgress value={97} label="Delivery"/>
            </div>
          </div>
        </div>

        {/* Leave a Review + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Sort by</span>
            <select
              value={sort}
              onChange={e => handleSort(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400 bg-white"
            >
              <option>Top Reviews</option>
              <option>Newest First</option>
            </select>
          </div>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3B2C24] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#2A1F19] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            Leave a Review
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_,i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"/>
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"/>
                <div className="h-3 bg-gray-200 rounded w-2/3"/>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {!loading && (
          <div className="space-y-3">
            {visible.map((review, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                  <span className="font-bold text-gray-900 text-sm">{review.name}</span>
                  {review.location && (
                    <><span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{review.location}</span></>
                  )}
                  <Stars rating={review.rating}/>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-400 mb-2">
                  {review.date && <span>{review.date}</span>}
                  {review.product && (
                    <><span>|</span>
                    <span>Product Name : <span className="text-gray-600 font-medium">{review.product}</span></span></>
                  )}
                </div>
                {review.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {review.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {review.text && <p className="text-sm text-gray-700">{review.text}</p>}
              </div>
            ))}
          </div>
        )}

        {/* View More button */}
        {!loading && hasMore && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-3">Showing {visibleCount} of {sorted.length} reviews</p>
            <button
              onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 border border-[#3B2C24] text-[#3B2C24] font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-[#3B2C24] hover:text-white transition-colors"
            >
              View More Reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        )}

        {!loading && !hasMore && sorted.length > PAGE_SIZE && (
          <p className="mt-6 text-center text-xs text-gray-400">All {sorted.length} reviews shown</p>
        )}

      </div>
    </div>
  );
}
