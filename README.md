# CosPlan

A small web application, based on sveltekit and supabase, for managing and communication cosplay project plans.

## Project Folder Structure

- **src**: Contains the source code of the sveltekit application
- **static**: Static/public content that is distributed alongside the built application
- **supabase**: Contains SQL Statements to recreate the supabase database structure

## Project Structure

As a SvelteKit application the source code is basically split into the two parts of Frontend and Backend, or Client-and Server-Side Code.  
The Server-Side-Only Code can be identified by the Suffix `.server.ts`.

## Setup

## Developing

To start developing, clone the repository and execute the following commands:

```bash
npm install
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
