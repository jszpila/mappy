# React Interview (DeckGL)

Welcome to the Synmax Frontend take home assessment! Take your time to explore the repository to familiarize yourself with it. In this interview, we will be asking you to accomplish to 2 tasks and 1 custom feature of your liking outside of those 2 tasks.

This assessment should take you 2 - 5 hours.

## Backstory

You are trying to create a map that allows the user to view all the charging stations and grocery stores in Washington, D.C. It seems like the application is only showing a blank map. Could you help me fix this?

## Rules and Restrictions

- You are free to add any MIT licensed libraries on the public npm registry
- You can change or add any files in this repository
- You're given a open-sourced GeoJSON Object. You must use the one provided.
  - `./src/data/groceryStores.js`
  - `./src/data/gasStations.js`
    - Source: catalog.data.gov
- You CANNOT use private repositories

## Tasks

- Create 1 Map Layer (Pick either Gas Stations or Grocery Stores)
  - Populate the geojson provided onto a map layer
  - Use `pointType: "circle"` is more than acceptable for this task
    - SVGs provided as icons (Free source: svgrepo.com)
- On clicking an individual gas station or grocery store on the map, the application should display a container on top of the map that gives the details of the selected individual point.
  - Could the application display multiple containers?
- Ability to toggle on/off for the map layer (Gas Station/Grocery Store)
- Free style: Add 1 additional feature/component of your liking that is relevant to this project

## Considerations

- Look into the library of `DeckGL` and `react-map-gl`
  - *✅*
- At what point do you consider using a component library?
  - *Depending on the needs of the project:*
    - *Are the UI concerns complex, heavily customized, or are we expected to be able to be integrate with third parties or white label our product This could go either way.*
    - *Do we use common UI components and practices with consistent branding across multiple products? We may want to use an internal component library.*
    - *Do we want to adhere to a common aesthetic, UX, theme, or design system such as Material UI? Then we should probably use a third-party library.*
- Can I open multiple containers?  
  - *Due to time contstraints, the app does not permit multiple open popups but this could could be implemented via instantiating and tracking an array of PopUp coponents.*
- If I wanted to add more map layers, would you code this differently?
  - *Rudimentary support for multiple layers has been implemented, but a more sophisticated and dynamic approach can be built upon this foundational code*
- `pointType: "circle"` is **acceptable**
  - *✅*

## See It In Action
[https://stuff.szpi.la/dev/mappy/](https://stuff.szpi.la/dev/mappy/)
<!--
## Submission

Two Options on submission:

  1. Github  
    - Add [ahinh@synmax.com](mailto:ahinh@synmax.com) as a contributor to your completed GitHub repository of this project  
    - Email your Github repository URL back to Synmax's recruiter (Preferred)

  2. Email & Zip  
    - Remove ./node_modules before submitting the repository  
    - Once you are ready for submission, please zip your file and name it `{Your First Name}{Your Last Name}_DeckGL_Interview.zip`
-->