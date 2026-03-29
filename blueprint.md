# Project Blueprint: Global Futures Expert Pro

## Overview
A framework-less web application for global futures experts, providing real-time-like market summaries, volatility charts, news, and economic indicators. Built using Web Components, modern CSS, and vanilla JavaScript.

## Current Features & Design
- **Header Component**: Displays the application title, tagline, and the current date in a modern gradient style.
- **Asset Card Component**: Shows market data (USD/KRW, Gold, NDX 100) with dynamic line charts using Chart.js.
- **US Indicators Component**: Lists upcoming major US economic events with importance levels.
- **Korean News Component**: Displays a list of top 5 global market news items fetched dynamically from Investing.com RSS.
- **Responsive Design**: Uses CSS Grid and Flexbox for a layout that adapts to different screen sizes.
- **Modern Aesthetics**: Utilizes `oklch` color functions, deep shadows, and clean typography (Inter, Noto Sans KR).
- **Firebase Deployment**: Hosted on Firebase (agenda3-e5fc8.web.app).

## Planned Changes
1. **Dynamic News Fetching**: (Done) Replace hardcoded news data with a dynamic fetching mechanism.
2. **Fix Article Mismatch**: (Done) Ensure that clicking a news item leads to the correct article.
3. **Internal Article Detail View (Optional/Suggested)**: Instead of just external links, provide a more integrated experience if possible.
4. **Improved Data Consistency**: (Done) Align titles and links in the news component.

## Implementation Steps
1. **Research & Verify News Source**: Identify a reliable source for global market news (Investing.com RSS).
2. **Update `KoreanNews` Component**:
   - Implement an `async` fetch call in `connectedCallback`.
   - Update the UI with fetched data.
   - Ensure the link and title are correctly paired.
3. **Enhance Error Handling**: Add loading states and error messages if news fails to fetch.
4. **Validation**: Refresh the page multiple times to confirm news changes and verify all links.
5. **Firebase Deployment**: Configure `firebase.json` and `.firebaserc`, and deploy via `firebase deploy`.
