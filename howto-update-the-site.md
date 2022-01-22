---
layout: default
title: 'HOWTO: Update The Site'
published: false

---
Let me guess, was the RAGBRAI route was just announced? It is too cold outside to hang out in spandex but you are just itching to show your excitement in some way. Hey, just a thought... Update the website!

Most content is pretty straightforward once you get into the backend at forestry.io, but there is some site content that was just too custom for forestry to handle. Let's walk through it.

## Homepage

This is "Welcome!" in the pages section of Forestry.

## Sidebar

It is all hard-coded baby! Includes twitter widget and countdown. Sorry, GitHub/Git for this for now.

## RAGBRAI/RAGBRAI Data

Scour the RAGBRAI.com website for the logo and save it to the site via Media with the year as the filename (e.g. 2006.png).

First head into RAGBRAI Data and find the upcoming year you want to update. Hopefully the data file has a few blank entries for years to come, otherwise you will have to find a non-forestry way (GitHub) of adding a year to the file. Enter all the details that the RAGBRAI announcement party gave you for now. This new data won't show anywhere however unless you create a RAGBRAI "page" with the same name (e.g. 2006). The image assumes it lives at /assets/images/ragbrai... so Forestry's Media won't probably upload it to the correct directory unless you are a hackerman.

## Quotes

Another piece of data is the quotes file. There is a Google Form to collect it, but then massaged (connect to member short names) and uploaded to GitHub as a .csv.

## Members

I stopped trying to keep up with the active/inactive roster stuff. The toggle still exists but everyone is a past member except for the co-owners.

**_Psst. Keep this file as a draft so it doesn't go "public" for the whole world to read._**