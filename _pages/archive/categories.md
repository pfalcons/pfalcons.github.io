---
layout: page
title: Categories
weight: 2
icon: fa-folder
permalink: /archive/categories/
---
{% comment%}
Here we generate all the categories.
{% endcomment%}

{% assign rawcats = "" %}
{% for post in site.posts %}
{% assign tcats = post.category | join:'|' | append:'|' %}
{% assign rawcats = rawcats | append:tcats %}
{% endfor %}

{% assign rawcats = rawcats | split:'|' | sort %}

{% assign cats = "" %}

{% for cat in rawcats %}
{% if cat != "" %}

{% if cats == "" %}
{% assign cats = cat | split:'|' %}
{% endif %}

{% unless cats contains cat %}
{% assign cats = cats | join:'|' | append:'|' | append:cat | split:'|' %}
{% endunless %}
{% endif %}
{% endfor %}

<div class="posts">
<ul class="list-inline">
{% for ct in cats %}
<li><a href="#{{ ct | slugify }}" class="label label-default"> {{ ct }} </a></li>
{% endfor %}
<a href="#no-category" class="label label-default"> No Category </a>
</ul>

{% for ct in cats %}
<h3 id="{{ ct | slugify }}"><i class="fa fa-folder-open" aria-hidden="true"></i> {{ ct }}</h3>
<ul>
  {% for post in site.posts %}
  {% if post.category contains ct %}
  <li>
    <h4>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
      <small> - {{ post.date | date_to_string }}</small>
    </h4>
    <span>
      <ul class="list-inline">
      {% for tag in post.tags %}
        <li><a class="label label-default" href="/archive/tags/#{{ tag | slugify }}"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag }}</a></li>
      {% endfor %}
      </ul>
    </span>
  </li>
  {% endif %}
  {% endfor %}
</ul>
{% endfor %}

<h3 id="no-category"><i class="fa fa-folder-open" aria-hidden="true"></i> No Category</h3>
<ul>
  {% for post in site.posts %}
  {% unless post.category %}
  <li>
    <h4>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
      <small>{{ post.date | date_to_string }}</small>
    </h4>
    <span>
      <ul class="list-inline">
      {% for tag in post.tags %}
        <li><a class="label label-default" href="/archive/tags/#{{ tag | slugify }}"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag }}</a></li>
      {% endfor %}
      </ul>
    </span>
  </li>
  {% endunless %}
  {% endfor %}
</ul>

</div>
