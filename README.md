

# Overview
> This code is packaged for local development only.  The home screen tile consists of 1 page (currently).  The page structure is configurable as well as the components within the page.  Using the tileconig.json you can control the home page template and the components data sources.

To run locally
```
yarn && yarn dev
```

# Configuration
- tileconfig.json file controls the page layout and components used as well as data

# Page Templates

create page templates to control the structure of a page.  (src/pages/PageTemplates)
## HomePage.Template1.tsx

Contains a hero & tileDrawer component.

How To:  Replace the tileDrawer component with your own.
- create your own TileDrawer component within the component/TileDrawer folder
- update the tileconfig.json in the public folder (openData/openData/data/TileDrawer)
    - change the templateID to a different number
- in the Homepage.Template1(pages/PageTemplates) component update the renderTileDrawer switch statement with your templateID from the previous step and return your new component

How To: Replace the hero component with your own
- create your own Hero component with in the components/Hero folder
- update the tileconfig.json in the public folder (openData/openData/data/Hero)
    - change the templateID to a different number
- in the Homepage.Template (pages/PageTemplates) component update renderHero switch statement using the templateID from the previous step and return your new component

# Components

## Hero
- displays a list of accounts
- this component has an example of a desktop an native app stucture
    - using the container call isNativeApp render different html structure.

## Account Preview
- AccountCard.component
    - placeholder for hero account cards
    - load each card indvidually
- AccountPreview.template1
    - rendering of an account 

How To: Create your own account preview, using the current data contract
- create a new preview template under components/Account/AccountPreview
    - follow the naming convension AccountPreivew.template[#].component.tsx
    - use the exsiting IAccountCardPropModel as the props passed in
- alter the public/mock/demo_1.0.0.getAccountCards.json by updating an existing account to use your new previewTypeID
- update the AccountCard.component.tsx
    - add to the renderCard switch statement the previewTypeID from above and return your new preview component
## TileDrawer

- gets tile list from the the container call
- loads each tile individually using the tile.component

## Tile
- Tile.component
    - controls the initial rendering of a preview
    - determines if there is a tile summary and makes the call
    - re-renders the tile based on the previewTemplate

## Tile Preview    
- TilePreviewSmall.template1
- TilePreviewMedium.template2
- TilePreviewLarge.template3

How To: Create your own tile preview, using the current tile summary data contract
- create a new preview template under components/tiles
    - follow the naming convesion [YOUR NAME].template[4].component.tsx
    - us the existing TileSummary data contract
- add new entry to the TilePreview.enum
- alter one of the mock TileSummary.json files to include your new preview
    - add to the PreviewTypes array
- update the Tile.component.tsx
    - add to the renderTile switch statement, your new preview type
