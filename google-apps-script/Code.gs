/**
 * Google Apps Script - E-commerce Native Reviews API
 * 
 * Instructions:
 * 1. Open your Google Sheet that stores reviews (e.g. linked to your previous Google Form or a fresh sheet).
 * 2. In the Google Sheets menu, click: Extensions > Apps Script
 * 3. Replace all existing contents of Code.gs with this entire script.
 * 4. Click 'Save' (floppy disk icon).
 * 5. Click the blue 'Deploy' button at the top right -> 'New deployment'.
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Fill in the deployment configuration:
 *      - Description: Native Reviews API v1
 *      - Execute as: Me (<your-email>)
 *      - Who has access: Anyone
 *    (IMPORTANT: Set 'Who has access' to 'Anyone' so visitors can fetch & submit reviews without logging into Google).
 * 8. Click 'Deploy', then click 'Authorize access' and approve permissions for your account.
 * 9. Copy the generated "Web app URL" (it will end with /exec).
 * 10. In your website's .env file (or website/.env), add:
 *      VITE_REVIEWS_API_URL=https://script.google.com/macros/s/<YOUR_SCRIPT_ID>/exec
 */

/**
 * Handle GET requests: Return existing reviews as JSON
 */
function doGet(e) {
  try {
    var sheet = getOrCreateReviewsSheet();
    var data = sheet.getDataRange().getValues();

    // Check if the sheet has only headers or is completely empty
    if (!data || data.length <= 1) {
      return jsonResponse({
        success: true,
        reviews: []
      });
    }

    // Inspect header row to dynamically locate columns
    var headers = data[0].map(function (h) {
      return String(h || '').trim().toLowerCase();
    });

    var timestampIdx = headers.findIndex(function (h) {
      return h.indexOf('time') !== -1 || h.indexOf('date') !== -1;
    });
    var nameIdx = headers.findIndex(function (h) {
      return h.indexOf('name') !== -1;
    });
    var ratingIdx = headers.findIndex(function (h) {
      return h.indexOf('rating') !== -1 || h.indexOf('star') !== -1;
    });
    var reviewIdx = headers.findIndex(function (h) {
      return h.indexOf('review') !== -1 || h.indexOf('feedback') !== -1 || h.indexOf('comment') !== -1;
    });
    var locationIdx = headers.findIndex(function (h) {
      return h.indexOf('location') !== -1 || h.indexOf('city') !== -1;
    });
    var productIdx = headers.findIndex(function (h) {
      return h.indexOf('product') !== -1;
    });

    // Fallbacks if headers didn't match standard names
    if (nameIdx === -1) nameIdx = 1;
    if (ratingIdx === -1) ratingIdx = 2;
    if (reviewIdx === -1) reviewIdx = 3;
    if (timestampIdx === -1) timestampIdx = 0;

    var reviews = [];
    var timeZone = Session.getScriptTimeZone() || 'Asia/Kolkata';

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var name = String(row[nameIdx] || '').trim();
      if (!name) continue; // Skip blank rows

      // Format date
      var rawDate = row[timestampIdx];
      var formattedDate = '';
      if (rawDate) {
        try {
          var d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            formattedDate = Utilities.formatDate(d, timeZone, 'yyyy-MM-dd');
          } else {
            formattedDate = String(rawDate).trim();
          }
        } catch (dateErr) {
          formattedDate = String(rawDate).trim();
        }
      }

      var rawRating = parseInt(row[ratingIdx], 10);
      var rating = (isNaN(rawRating) || rawRating < 1 || rawRating > 5) ? 5 : rawRating;
      var reviewText = String(row[reviewIdx] || '').trim();
      var location = (locationIdx !== -1 && row[locationIdx]) ? String(row[locationIdx]).trim() : '';
      var product = (productIdx !== -1 && row[productIdx]) ? String(row[productIdx]).trim() : '';

      reviews.push({
        name: name,
        rating: rating,
        review: reviewText,
        date: formattedDate,
        location: location,
        product: product
      });
    }

    return jsonResponse({
      success: true,
      reviews: reviews
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: 'Failed to retrieve reviews: ' + err.toString()
    });
  }
}

/**
 * Handle POST requests: Validate review data and append row to Google Sheet
 */
function doPost(e) {
  try {
    var payload = {};

    // 1. Parse JSON body (handles text/plain and application/json)
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for urlencoded data
        payload = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    // 2. Extract fields
    var name = String(payload.name || '').trim();
    var review = String(payload.review || payload.text || '').trim();
    var rating = parseInt(payload.rating, 10);
    var location = String(payload.location || '').trim();
    var product = String(payload.product || '').trim();

    // 3. Backend Validation Safeguards
    if (!name) {
      return jsonResponse({ success: false, message: 'Name is required' });
    }
    if (name.length > 100) {
      return jsonResponse({ success: false, message: 'Name must not exceed 100 characters' });
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return jsonResponse({ success: false, message: 'Rating must be an integer between 1 and 5' });
    }
    if (!review) {
      return jsonResponse({ success: false, message: 'Review text is required' });
    }
    if (review.length > 1000) {
      return jsonResponse({ success: false, message: 'Review must not exceed 1000 characters' });
    }

    // Basic sanitization: strip any HTML tags
    name = name.replace(/<[^>]*>?/gm, '');
    review = review.replace(/<[^>]*>?/gm, '');
    location = location.replace(/<[^>]*>?/gm, '');
    product = product.replace(/<[^>]*>?/gm, '');

    // 4. Save to Google Sheet
    var sheet = getOrCreateReviewsSheet();
    var timeZone = Session.getScriptTimeZone() || 'Asia/Kolkata';
    var now = new Date();
    var timestampStr = Utilities.formatDate(now, timeZone, 'dd/MM/yyyy HH:mm:ss');
    var dateStr = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd');

    // Make sure header exists if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Rating', 'Review / Feedback', 'Location', 'Product']);
    }

    sheet.appendRow([timestampStr, name, rating, review, location, product]);

    // 5. Return success JSON
    return jsonResponse({
      success: true,
      message: 'Review submitted successfully',
      review: {
        name: name,
        rating: rating,
        review: review,
        date: dateStr,
        location: location,
        product: product
      }
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: 'Server error: ' + err.toString()
    });
  }
}

/**
 * Locate existing reviews sheet or create/format default one
 */
function getOrCreateReviewsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Form Responses 1')
           || ss.getSheetByName('Form Responses')
           || ss.getSheetByName('Reviews')
           || ss.getSheets()[0];
  return sheet;
}

/**
 * Return JSON response formatted for Google Apps Script Web App
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
