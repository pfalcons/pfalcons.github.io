---
layout: page
title: Archive
weight: 1
icon: fa-archive
permalink: /archive/
---
{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
