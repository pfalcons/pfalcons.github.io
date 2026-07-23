---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: {{ .Date }}
draft: true
member_since: {{ now.Format "2006" }}
hometown: ''
twitter: ''
strava: ''
---
**{{ replace .File.ContentBaseName "-" " " | title }}** joined the Perineum Falcons in {{ now.Format "2006" }}.
