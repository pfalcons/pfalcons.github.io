---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: {{ .Date }}
draft: true
year: {{ now.Format "2006" }}
route: ''
miles: 0
total_climbing: 0
---
Summary of **{{ replace .File.ContentBaseName "-" " " | title }}**.
