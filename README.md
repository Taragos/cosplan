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

### Supabase

1. **Providing a Supabase-Instance:** The Supabase-part of the application can be provided in one of two ways: the free-tier of the official Supabase website or a self-hosted one.  
    - For the self-hosting variant, see: [Self-Hosting with Docker](https://supabase.com/docs/guides/self-hosting/docker).  
    - For the free-tier create an account at: [Sign In](https://supabase.com/dashboard/sign-in )
2. **Creating Database Structure:** After logging into your Supabase Dashboard, you can use the SQL-statements within the supabase folder to create the necessary tables.  

3. **Creating a Storage-Bucket:** Create a storage bucket called `images` following the [Storage Quickstart](https://supabase.com/docs/guides/storage/quickstart) tutorial. 

4. **Retrieve Client Variables:** Using the Supabase Dashboard, go to Settings > API and retrieve the Project URL and the Anon Project API Key.  
Add them to a file called `.env` in the following format:

    ```env
    PUBLIC_SUPABASE_URL="<URL>"
    PUBLIC_SUPABASE_ANON_KEY="<ANON_KEY>"
    ```

5. **Start the Application**

### Application

#### Developing

To start developing, clone the repository and execute the following commands:

```bash
npm install
npm run dev -- --open
```

#### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
