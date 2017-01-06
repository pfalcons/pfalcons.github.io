---
layout: page
title: Tags
icon: fa-tags
permalink: /archive/tags/
---
{% comment%}
Here we generate all the tags.
{% endcomment%}

{% assign rawtags = "" %}
{% for post in site.posts %}
{% assign ttags = post.tags | join:'|' | append:'|' %}
{% assign rawtags = rawtags | append:ttags %}
{% endfor %}

{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}

{% for tag in rawtags %}
{% if tag != "" %}

{% if tags == "" %}
{% assign tags = tag | split:'|' %}
{% endif %}

{% unless tags contains tag %}
{% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
{% endunless %}
{% endif %}
{% endfor %}

<div class="posts">
  <ul class="list-inline">
    {% for tag in tags %}
    <li><a href="#{{ tag | slugify }}" class="label label-default"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag }}</a></li>
    {% endfor %}
  </ul>

  {% for tag in tags %}
  <h3 id="{{ tag | slugify }}"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag }}</h3>
  <ul>
    {% for post in site.posts %}
    {% if post.tags contains tag %}
    <li>
      <h4>
        <a href="{{ post.url }}">
          {{ post.title }}
        </a>
        <small>{{ post.date | date_to_string }}</small>
      </h4>
      <span>
        {% for tag in post.tags %}
        <a class="label label-default" href="/archive/tags/#{{ tag | slugify }}"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag }}</a>
        {% endfor %}
      </span>
    </li>
    {% endif %}
    {% endfor %}
  </ul>
  {% endfor %}
</div>
