#  Dental Clinic — Booking Page

Dental clinic landing page with an appointment form that sends bookings to the clinic's email.
No backend: the form posts to Formspree. React, Vite, Tailwind CSS, Framer Motion.

## Run
```bash
npm install
npm run dev
```

## Connect the form to an email
1. Create a free account on https://formspree.io
2. New Form → enter the clinic's email
3. Copy the form ID (the part after `/f/`) into `formspreeId` in `src/data/clinic.js`

With an empty `formspreeId` the form runs in demo mode and sends nothing.
