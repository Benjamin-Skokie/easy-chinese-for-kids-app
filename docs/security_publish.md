# Security And Publish Notes

This project is intended to stay a simple public website without:

- user login
- user accounts
- a database
- private user data

That decision keeps the security surface much smaller.

## Core Security Direction

- Publish as a static site whenever possible.
- Do not put API keys, tokens, passwords, or secrets in `index.html`, `app.js`, or any frontend file.
- Use a reputable static host such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.
- Use HTTPS.
- Protect GitHub, hosting, and domain accounts with strong passwords and MFA.

## What Input Is Safe Here

Simple child input is okay, for example:

- tapping buttons
- choosing answers
- typing a short number into the mini math game

That kind of input is fine because it is only used inside the browser for local interaction.

## Rules For User Input

If kids type or click inside the site:

- keep input short and limited
- validate input before using it
- never treat user input as HTML
- never insert raw user input into `innerHTML`
- never evaluate user input as code
- prefer `textContent`, form values, and explicit number parsing

For the mini math game specifically:

- accept only short numeric input
- keep length limits
- parse as a number
- show feedback only in the page
- do not send the input anywhere

## Current Risk Model

Right now the biggest real risks are:

- exposing secrets in frontend code
- weak passwords on hosting or domain accounts
- adding unsafe user-generated content later
- adding a backend later without updating the security plan

## If The Site Stays Static

If the site remains a static practice site:

- risk is relatively low
- there is no database to steal
- there are no accounts to compromise inside the app
- most security depends on safe deployment and account protection

## If The Project Grows Later

If we later add any of these:

- login
- saved progress
- teacher dashboards
- payments
- user uploads
- backend APIs

then the security plan must be reviewed again before launch.

## Pre-Publish Checklist

- confirm the site is still static
- confirm there are no secrets in the repo
- confirm HTTPS is enabled
- confirm hosting and domain accounts use MFA
- confirm user input is validated and not inserted as HTML
- confirm no unnecessary third-party scripts were added
