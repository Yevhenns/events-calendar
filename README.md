# Welcome 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## About

1. Description:

   ● It's a mobile scheduling application that allows users to create, manage, and repeat events.

2. Functionality:

   ● Users can manage events on specific dates by clicking on the calendar.

   ● Available actions:

   - Create a new event – Enter an event name, set a time, and choose a repeat
     option.

   - Edit an existing event – Modify the name, repeat option, or time of an existing
     event.

   - Delete an event – Remove an event by clicking the delete button.

   ● Repeat options:

   - Weekly – The event recurs every week.

   - Bi-weekly – The event recurs every other week.

   - Monthly – The event recurs every month.

   ● Users must click the “Save” button to confirm event creation.

   ● Events and selected day are stored locally so that past data is retained when the app is restarted.

   ● Dates with scheduled events are highlighted with red dots.

3. Users are not able to:

   ● Create or manage events in the past (but they can view past events). "Edit" button is disabled.

   ● ⚠️(not implemented yet) Create overlapping events (events that have conflicting time slots).

4. Requirements:

   ● Tech stack:

   - React Native (Expo)

   - Redux-Toolkit

   - My own calendar

   - React Hook Form

   - Day.js

   - react-native-mask-text

   - react-native-toast-message

   ● The application is tested across two Expo-supported platforms: Android and Web. As long as I don't have IOS environment yet.
