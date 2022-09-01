React NextJS app that calculates the fuel cost for your next trip based on the selected vehicle. Note: vehicle, trip, and fuel data is based in US.

## Demo

[Click to view demo](https://fuel-trip-calculator.vercel.app/)

This project uses the following libraries/services:

- [PidgeonMaps](https://github.com/mariusandra/pigeon-maps) - for map markers, route
- [OpenRouteService](https://openrouteservice.org/) - for address lookup and suggestions, 100% Free!
- [pg](https://node-postgres.com/) - for Postgres DB connection
- [supabase](https://supabase.com/) - for free Postgres DB!
- [MUI](https://mui.com/)
- react-redux

## Installation

First, run the following:

```bash
cd fuel-trip-calculator
npm install
```

Create .env and populate with your own values. You can get your MAPKEY from [here](https://openrouteservice.org/dev/#/signup).

```bash
PGUSER=
PGPASSWORD=
PGHOST=
PGDATABASE=
PGPORT=
MAPKEY=
```

## Data Sample

Included in the source is a sample SQLite DB of the vehicle data required to run this app.
