# Google Apps Script Setup Guide for Native Reviews

This directory contains the Google Apps Script backend (`Code.gs`) that powers the native review system on the website.

## Quick Setup Steps (Takes ~2 minutes)

### 1. Open Your Google Sheet
- Open the Google Sheet where you want reviews stored (either your previous sheet from Google Forms, or a fresh Google Sheet).

### 2. Open Apps Script Editor
- In the top menu of Google Sheets, click: **Extensions** > **Apps Script**.

### 3. Paste the Code
- Select all text in `Code.gs` in the Apps Script editor and delete it.
- Open [`google-apps-script/Code.gs`](./Code.gs) from this project, copy the entire code, and paste it into the editor.
- Click the **Save** icon (disk symbol) or press `Ctrl + S`.

### 4. Deploy as a Web App
- Click the blue **Deploy** button at top-right -> select **New deployment**.
- In the modal, click the gear icon (⚙️) next to "Select type" and choose **Web app**.
- Configure the settings:
  - **Description**: `Native Reviews API`
  - **Execute as**: `Me (<your email address>)`
  - **Who has access**: `Anyone` *(Crucial: must be set to 'Anyone' so website visitors can read and post reviews without requiring a Google login)*.
- Click **Deploy**.
- Click **Authorize access**, select your Google account, click **Advanced** -> **Go to (Script name) (unsafe)** -> **Allow**.

### 5. Copy the Web App URL
- Copy the generated **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

### 6. Connect to Your Website
- In the `website/` directory, open or create `.env`:
  ```bash
  VITE_REVIEWS_API_URL=https://script.google.com/macros/s/<YOUR_SCRIPT_ID>/exec
  ```
- Restart the Vite dev server (`npm run dev` in `website/`) or rebuild for production.

---

## API Endpoints Reference

### GET `/exec`
Fetches reviews from the Google Sheet.

**Response**:
```json
{
  "success": true,
  "reviews": [
    {
      "name": "Rahul",
      "rating": 5,
      "review": "Amazing product and fast delivery!",
      "date": "2026-10-01"
    }
  ]
}
```

### POST `/exec`
Submits a new review to the Google Sheet.

**Payload**:
```json
{
  "name": "Rahul",
  "rating": 5,
  "review": "Amazing product and fast delivery!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "review": {
    "name": "Rahul",
    "rating": 5,
    "review": "Amazing product and fast delivery!",
    "date": "2026-10-01"
  }
}
```
